import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { JobDetails } from '../interfaces/job-details';
import {SkeletonModule} from 'primeng/skeleton';

@Component({
  selector: 'app-job-preview',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgForOf, SkeletonModule],
  templateUrl: './job-preview.component.html',
  styleUrl: './job-preview.component.scss',
})
export class JobPreviewComponent {
  isLoading = input<boolean>(false);
  public job: any = input<JobDetails>();
}
