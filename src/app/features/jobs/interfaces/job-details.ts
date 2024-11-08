import { JobCard } from './job-card';

export interface JobDetails extends JobCard {
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}
