import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { JobDetails } from '../interfaces/job-details';

@Component({
  selector: 'app-job-preview',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgForOf],
  templateUrl: './job-preview.component.html',
  styleUrl: './job-preview.component.scss',
})
export class JobPreviewComponent {
  public job: any = input<JobDetails>();
}
