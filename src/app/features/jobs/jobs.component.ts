import { Component } from '@angular/core';
import {
  Filter,
  JobSearchFilterComponent,
} from './job-search-filter/job-search-filter.component';
import { JobCardListingComponent } from './job-card-listing/job-card-listing.component';
import {
  fakeFullJobDetails,
  fakeJobListingCards,
} from '../../shared/data/fake-data';
import {BehaviorSubject, delay, map, startWith, Subject, tap} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobPreviewComponent } from './job-preview/job-preview.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    JobSearchFilterComponent,
    JobCardListingComponent,
    JobPreviewComponent,
    AsyncPipe,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    tap((filteredJobs) => {
      if (filteredJobs.length > 0) {
        this.selectedJob$$.next(filteredJobs[0].id); // selectt the first job if any job matches
      }
    }),
  );

  selectedJob$$ = new Subject<number>();
  selectedJob$ = this.selectedJob$$.pipe(
    tap(() => this.isLoading$.next(true)),
    delay(1000),
    map((jobId) => fakeFullJobDetails.find((job) => job.id === jobId)),
    tap(() => this.isLoading$.next(false)),
    startWith(fakeFullJobDetails[0]),
  );

  selectedJob = toSignal(this.selectedJob$);
  filteredJobs = toSignal(this._filteredJobs$);

  onFilterChange(filters: Filter) {
    this._filteredJobs$$.next(filters);
  }

  protected readonly fakeJobListingCards = fakeJobListingCards;

  previewJob(jobId: number) {
    this.selectedJob$$.next(jobId);
  }
}
