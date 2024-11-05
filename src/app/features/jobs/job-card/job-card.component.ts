import { Component, input } from '@angular/core';
import { JobCard } from '../interfaces/job-card';
import { CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [NgIf, DecimalPipe, CurrencyPipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  job = input<JobCard>();
}
