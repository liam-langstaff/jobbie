import { Component, inject, input, output } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobCard } from '../interfaces/job-card';
import { JobsStore } from '../state/jobs.store';

@Component({
  selector: 'app-job-card-listing',
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: './job-card-listing.component.html',
  styleUrl: './job-card-listing.component.scss',
})
export class JobCardListingComponent {
  readonly store = inject(JobsStore);
  jobs = input<JobCard[]>();
  onSelectJob = output<number>();

  previewJob(id: number) {
    this.onSelectJob.emit(id);
    this.store.updateSelectedJobId(id);
  }
}
