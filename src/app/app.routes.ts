import { Routes } from '@angular/router';
import { JobsComponent } from './features/jobs/jobs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsComponent, pathMatch: 'full' },
];
