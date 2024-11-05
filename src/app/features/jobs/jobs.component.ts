import { Component, inject } from '@angular/core';
import {
  Filter,
  JobSearchFilterComponent,
} from './job-search-filter/job-search-filter.component';
import { JobCardListingComponent } from './job-card-listing/job-card-listing.component';
import { FilterService } from 'primeng/api';
import { JobCard } from './interfaces/job-card';
import { fakeJobListingCards } from '../../shared/data/fake-data';
import { map, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [JobSearchFilterComponent, JobCardListingComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  private readonly _filterService: FilterService = inject(FilterService);
  filteredOptions: JobCard[] = [...fakeJobListingCards];
  private readonly _filteredJobs$$: Subject<Filter> = new Subject();
  private readonly _filteredJobs$ = this._filteredJobs$$.pipe(
    map((filters) => {
      const { role, location, jobTypes, salaryRange } = filters;
      return fakeJobListingCards.filter((job) => {
        const roleMatches = role
          ? job.title.toLowerCase().includes(role.toLowerCase())
          : true;
        // const locationMatches = location
        //   ? job.location.toLowerCase() === location.toLowerCase()
        //   : true;
        const jobTypeMatches =
          jobTypes && jobTypes.length > 0
            ? jobTypes.includes(job.jobType.toLowerCase())
            : true;
        const salaryMatches =
          job.salary.amount[0] >= salaryRange.low &&
          job.salary.amount[1] <= salaryRange.high;

        return roleMatches && jobTypeMatches && salaryMatches;
      });
    }),
  );

  filteredJobs = toSignal(this._filteredJobs$);

  onFilterChange(filters: Filter) {
    this._filteredJobs$$.next(filters);
    console.log(this.filteredOptions);
  }

  protected readonly fakeJobListingCards = fakeJobListingCards;
}
