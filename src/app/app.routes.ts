import { Routes } from '@angular/router';
import { JobsComponent } from './features/jobs/jobs.component';
import {RegisterComponent} from './auth/features/register/register.component';
import {LoginComponent} from './auth/features/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
