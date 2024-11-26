import { Routes } from '@angular/router';
import { JobsComponent } from './features/jobs/jobs.component';
import { RegisterComponent } from './auth/features/register/register.component';
import { LoginComponent } from './auth/features/login/login.component';
import { HiringComponent } from './features/hiring/hiring.component';
import { CreateListingComponent } from './features/hiring/create-listing/create-listing.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsComponent },
  {
    path: 'hiring',
    children: [
      { path: '', component: HiringComponent },
      {
        path: 'create/listing',
        component: CreateListingComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
