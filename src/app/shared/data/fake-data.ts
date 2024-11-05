import { Option } from '../../features/jobs/job-search-filter/job-search-filter.component';
import { JobCard } from '../../features/jobs/interfaces/job-card';

export const fakeRoles: Option[] = [
  {
    label: 'Junior Front-end Developer',
    value: 'Junior Front-end Developer',
  },
  {
    label: 'Senior Front-end Developer',
    value: 'Senior Front-end Developer',
  },
  { label: 'Junior Back-end Developer', value: 'Junior Back-end Developer' },
  { label: 'Senior Back-end Developer', value: 'Senior Back-end Developer' },
  {
    label: 'Junior Full-stack Developer',
    value: 'Junior Full-stack Developer',
  },
  {
    label: 'Senior Full-stack Developer',
    value: 'Senior Full-stack Developer',
  },
  { label: 'Junior UI/UX Designer', value: 'Junior UI/UX Designer' },
  { label: 'Senior UI/UX Designer', value: 'Senior UI/UX Designer' },
  { label: 'Junior Mobile Developer', value: 'Junior Mobile Developer' },
];

export const fakeLocations: Option[] = [
  { label: 'London', value: 'London' },
  { label: 'New York', value: 'New York' },
  { label: 'Paris', value: 'Paris' },
  { label: 'Berlin', value: 'Berlin' },
  { label: 'Madrid', value: 'Madrid' },
  { label: 'Rome', value: 'Rome' },
  { label: 'Tokyo', value: 'Tokyo' },
];

export const fakeJobTypes: Option[] = [
  { label: 'Full-Time', value: 'fulltime' },
  { label: 'Part-Time', value: 'parttime' },
  { label: 'Contract', value: 'contract' },
];

export const fakeJobListingCards: JobCard[] = [
  {
    id: 1,
    title: 'Senior Front-end Developer',
    company: 'Tech Innovators Inc.',
    location: 'London, UK',
    date: new Date('2023-10-10'),
    jobType: 'Contract',
    description:
      'We are looking for a senior frontend developer with expertise in Angular to lead the development of our new web application.',
    salary: {
      currency: 'GBP',
      amount: [60000, 75000],
    },
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Global Solutions Ltd.',
    location: 'Manchester, UK',
    date: new Date('2023-09-15'),
    jobType: 'Permanent',
    description:
      'Join our backend team to build and maintain robust APIs supporting millions of users.',
    salary: {
      currency: 'GBP',
      amount: [50000, 65000],
    },
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Minds Studio',
    location: 'Bristol, UK',
    date: new Date('2023-09-25'),
    jobType: 'Contract',
    description:
      'We are seeking a creative UI/UX designer to enhance user experiences across our digital platforms.',
    salary: {
      currency: 'GBP',
      amount: [40000, 55000],
    },
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Group',
    location: 'Edinburgh, UK',
    date: new Date('2023-09-20'),
    jobType: 'Permanent',
    description:
      'Looking for an experienced DevOps engineer to streamline our cloud infrastructure and deployment processes.',
    salary: {
      currency: 'GBP',
      amount: [55000, 70000],
    },
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Birmingham, UK',
    date: new Date('2023-09-30'),
    jobType: 'Contract',
    description:
      'Join our data team to derive actionable insights from complex datasets and drive business decisions.',
    salary: {
      currency: 'GBP',
      amount: [60000, 80000],
    },
  },
];
