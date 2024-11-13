import { JobCard } from '../interfaces/job-card';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { JobDetails } from '../interfaces/job-details';
import { fakeFullJobDetails } from '../../../shared/data/fake-data';

type JobsState = {
  isLoading: boolean;
  selectedJobId: number | undefined;
  jobs: JobCard[];
  selectedJobDetails: JobDetails | undefined;
};

export const initialState: JobsState = {
  isLoading: true,
  selectedJobId: undefined,
  jobs: [],
  selectedJobDetails: undefined,
};

export const JobsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateSelectedJobId(jobId: number): void {
      patchState(store, () => ({ isLoading: true, selectedJobId: jobId }));
    },
    setJobCards(jobs: JobCard[]): void {
      patchState(store, () => ({ jobs: [...jobs] }));
    },
    setSelectedJobDetails(details: JobDetails): void {
      patchState(store, { selectedJobDetails: details, isLoading: false });
    },
    fetchJobDetails(jobId: number): void {
      const selectedJobDetails = fakeFullJobDetails.find(
        (job) => job.id === jobId,
      );
      if (selectedJobDetails) {
        setTimeout(() => {
          this.setSelectedJobDetails(selectedJobDetails);
        }, 2000);
      }
    },
  })),
);
