import { Component, inject } from '@angular/core';
import {
  Filter,
  JobSearchFilterComponent,
} from './job-search-filter/job-search-filter.component';
import { JobCardListingComponent } from './job-card-listing/job-card-listing.component';
import { fakeJobListingCards } from '../../shared/data/fake-data';
import { BehaviorSubject, map, startWith, Subject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobPreviewComponent } from './job-preview/job-preview.component';
import { JobsStore } from './state/jobs.store';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    JobSearchFilterComponent,
    JobCardListingComponent,
    JobPreviewComponent,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  readonly store = inject(JobsStore);

  // TODO: Add filtering to BE
  private readonly _filteredJobs$$: Subject<Filter> = new Subject();
  private readonly _filteredJobs$ = this._filteredJobs$$.pipe(
    map((filters) => {
      const { role, location, jobTypes, salaryRange } = filters;
      return fakeJobListingCards.filter((job) => {
        const roleMatches = role
          ? job.title.toLowerCase().includes(role.toLowerCase())
          : true;

        const locationMatches = location
          ? job.location.toLowerCase().includes(location.toLowerCase())
          : true;

        const jobTypeMatches =
          jobTypes && jobTypes.length > 0
            ? jobTypes
                .map((jt) => jt.toLowerCase())
                .includes(job.jobType.toLowerCase())
            : true;

        const salaryMatches = salaryRange
          ? (salaryRange.low === null ||
              job.salary.amount[0] >= salaryRange.low) &&
            (salaryRange.high === null ||
              job.salary.amount[1] <= salaryRange.high)
          : true;

        return (
          roleMatches && locationMatches && jobTypeMatches && salaryMatches
        );
      });
    }),
    startWith(fakeJobListingCards),
    tap((filteredJobs) => {
      this.store.setJobCards(filteredJobs);
      this.store.setSelectedJobId(filteredJobs[0]?.id);
    }),
  );

  filteredJobs = toSignal(this._filteredJobs$);

  onFilterChange(filters: Filter) {
    this._filteredJobs$$.next(filters);
  }
}
