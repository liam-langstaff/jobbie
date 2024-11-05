export interface JobCard {
  id: number;
  title: string;
  company: string;
  location: string;
  date: Date;
  jobType: 'Contract' | 'Permanent' | 'Temporary'; // Adjusted to be more flexible
  description: string;
  salary: {
    currency: string;
    amount: [number, number];
  };
}
