import { Component, inject, input } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobCard } from '../interfaces/job-card';
import { JobsStore } from '../state/jobs.store';

@Component({
    selector: 'app-job-card-listing',
    imports: [JobCardComponent],
    templateUrl: './job-card-listing.component.html',
    styleUrl: './job-card-listing.component.scss'
})
export class JobCardListingComponent {
  readonly store = inject(JobsStore);
  jobs = input<JobCard[]>();

  previewJob(id: number) {
    this.store.setSelectedJobId(id);
  }
}
