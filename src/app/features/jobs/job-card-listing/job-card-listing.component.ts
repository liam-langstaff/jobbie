import { Component, input } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobCard } from '../interfaces/job-card';

@Component({
  selector: 'app-job-card-listing',
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: './job-card-listing.component.html',
  styleUrl: './job-card-listing.component.scss',
})
export class JobCardListingComponent {
  jobs = input<JobCard[]>();
}
