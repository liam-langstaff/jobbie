import { Component, inject } from '@angular/core';
import {
  Filter,
  JobSearchFilterComponent,
} from './job-search-filter/job-search-filter.component';
import { JobCardListingComponent } from './job-card-listing/job-card-listing.component';
import {
  fakeFullJobDetails,
  fakeJobListingCards,
} from '../../shared/data/fake-data';
import { BehaviorSubject, delay, map, startWith, Subject, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobPreviewComponent } from './job-preview/job-preview.component';
import { AsyncPipe } from '@angular/common';
import { JobsStore } from './state/jobs.store';

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
  readonly store = inject(JobsStore);

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
    startWith(fakeJobListingCards),
    tap((filteredJobs) => {
      // if (filteredJobs.length > 0) {
      this.store.setJobCards(filteredJobs);
      console.log(this.store.jobs());
      this.selectedJob$$.next(filteredJobs[0]?.id); // selectt the first job if any job matches
      // }
    }),
  );

  selectedJob$$ = new Subject<number>();
  selectedJob$ = this.selectedJob$$.pipe(
    startWith(fakeFullJobDetails[0].id),
    tap(() => this.isLoading$.next(true)),
    delay(1000),
    map((jobId) => {
      const job = fakeFullJobDetails.find((job) => job.id === jobId);
      this.store.updateSelectedJobId(job?.id as number);
      return job;
    }),
    tap(() => this.isLoading$.next(false)),
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
