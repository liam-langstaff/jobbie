import { Routes } from '@angular/router';
import { JobsComponent } from './features/jobs/jobs.component';

export const routes: Routes = [
  { path: '', component: JobsComponent, pathMatch: 'full' },
];
