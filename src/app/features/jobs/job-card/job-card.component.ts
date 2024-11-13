import { Component, inject, input } from '@angular/core';
import { JobCard } from '../interfaces/job-card';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { JobsStore } from '../state/jobs.store';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [NgIf, CurrencyPipe, NgClass],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  public readonly store = inject(JobsStore);
  job = input<JobCard>();
}
