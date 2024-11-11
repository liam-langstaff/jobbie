import { JobCard } from '../interfaces/job-card';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type JobsState = {
  selectedJobId: number | undefined;
  jobs: JobCard[];
};

export const initialState: JobsState = {
  selectedJobId: undefined,
  jobs: [],
};

export const JobsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateSelectedJobId(jobId: number): void {
      patchState(store, () => ({ selectedJobId: jobId }));
    },
  })),
);
