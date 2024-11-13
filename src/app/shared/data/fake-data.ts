import { Option } from '../../features/jobs/job-search-filter/job-search-filter.component';
import { JobCard } from '../../features/jobs/interfaces/job-card';
import { JobDetails } from '../../features/jobs/interfaces/job-details';

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

export const fakeFullJobDetails: JobDetails[] = [
  {
    id: 1,
    title: 'Senior Front-end Developer',
    company: 'Tech Innovators Inc.',
    location: 'London, UK',
    date: new Date('2023-10-10'),
    jobType: 'Contract',
    description:
      'We are looking for a senior frontend developer with expertise in Angular to lead the development of our new web application. The role requires a high level of understanding in modern front-end frameworks and developer tools. You will work closely with our design team to create a seamless user experience. As the senior frontend developer, you will also be responsible for optimizing web applications for maximum speed and scalability. You should be proficient in writing clean, modular, and well-documented code. Additionally, you will mentor junior developers, conduct code reviews, and ensure adherence to best practices and industry standards. Collaboration with the backend development team will be crucial to integrate APIs and other services seamlessly.<br><br> Experience with state management libraries, such as NgRx, and familiarity with CI/CD pipelines will be highly beneficial. The ideal candidate will have a proactive approach to problem-solving and a penchant for learning and adapting to new technologies. Strong communication skills are essential, as you will regularly liaise with stakeholders to understand the technical requirements and deliver high-quality solutions. This is an exciting opportunity to contribute to a dynamic team and play a pivotal role in the growth and success of our innovative projects.',
    salary: {
      currency: 'GBP',
      amount: [60000, 75000],
    },
    responsibilities: [
      'Lead the development of a new web application using Angular.',
      'Collaborate with UX/UI designers to translate designs into functional user interfaces.',
      'Optimize applications for maximum speed and scalability.',
      'Mentor and guide junior developers, providing code reviews and feedback.',
      'Ensure the technical feasibility of UI/UX designs.',
      'Conduct code reviews to ensure high code quality and standards.',
      'Stay current with the latest front-end technologies and best practices, integrating them into the project.',
    ],
    requirements: [
      '5+ years of experience in front-end development.',
      'Expertise in Angular and TypeScript.',
      'Strong understanding of HTML, CSS, and JavaScript.',
      'Experience with front-end build tools and package managers such as Webpack and npm.',
      'Understanding of responsive design principles and techniques.',
      'Excellent problem-solving skills and attention to detail.',
      'Strong communication and collaboration skills, with experience working in agile teams.',
    ],
    benefits: [
      'Competitive salary within the range of GBP 60,000 - 75,000.',
      'Flexible working hours and ability to work remotely.',
      'Health insurance and wellness programs.',
      'Opportunities for professional growth and development.',
      'Access to cutting-edge technologies and tools.',
      'Collaborative and innovative work environment.',
      'Regular team-building activities and social events.',
    ],
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Global Solutions Ltd.',
    location: 'Manchester, UK',
    date: new Date('2023-09-15'),
    jobType: 'Permanent',
    description:
      'Join our backend team to build and maintain robust APIs supporting millions of users. You will be tasked with ensuring the security and scalability of our applications. The role involves collaborating with front-end developers and other stakeholders to deliver high-quality software solutions.',
    salary: {
      currency: 'GBP',
      amount: [50000, 65000],
    },
    responsibilities: [
      'Design, develop, and maintain APIs that support millions of users.',
      'Ensure the security, scalability, and performance of backend systems.',
      'Collaborate with front-end developers to integrate user-facing elements with server-side logic.',
      'Optimize database queries and performance to handle large datasets.',
      'Implement and maintain CI/CD pipelines for automated testing and deployment.',
      'Monitor server health and performance, addressing any issues promptly.',
      'Write and maintain comprehensive documentation for backend services.',
    ],
    requirements: [
      'Proven experience as a backend developer.',
      'Strong knowledge of server-side languages such as Node.js, Python, or Java.',
      'Experience with database management systems, particularly SQL and NoSQL databases.',
      'Understanding of RESTful API design principles and best practices.',
      'Familiarity with version control systems, particularly Git.',
      'Solid understanding of network protocols and security principles.',
      'Ability to work both independently and collaboratively in a team environment.',
    ],
    benefits: [
      'Competitive salary within the range of GBP 50,000 - 65,000.',
      'Health, dental, and vision insurance plans.',
      'Pension schemes and retirement plans.',
      'Opportunities for career advancement and professional development.',
      'Access to cutting-edge technology and tools.',
      'Collaborative and inclusive work culture.',
      'Work-life balance initiatives including flexible working hours.',
      'Company-sponsored social events and team outings.',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Minds Studio',
    location: 'Bristol, UK',
    date: new Date('2023-09-25'),
    jobType: 'Contract',
    description:
      'We are seeking a creative UI/UX designer to enhance user experiences across our digital platforms. You will be responsible for designing intuitive interfaces and conducting user research, helping to shape the visual and interactive aspects of our products.',
    salary: {
      currency: 'GBP',
      amount: [40000, 55000],
    },
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.',
      'Develop and maintain design systems and style guides to ensure consistency.',
      'Conduct user research, usability testing, and gather feedback to inform design decisions.',
      'Collaborate with product managers, engineers, and other stakeholders to understand requirements and constraints.',
      'Advocate for user-centered design principles and best practices within the team.',
      'Stay updated on the latest design trends, tools, and technologies.',
      'Prepare and present design concepts and solutions to stakeholders for feedback and approval.',
    ],
    requirements: [
      'A solid portfolio showcasing UI/UX design work for web and mobile applications.',
      'Proficiency with design tools such as Figma, Sketch, Adobe XD, or similar.',
      'Strong understanding of user-centered design principles, information architecture, and accessibility standards.',
      'Experience with user research methodologies and usability testing.',
      'Excellent visual design skills with a keen eye for detail.',
      'Strong communication and presentation skills, with the ability to articulate design decisions effectively.',
      'Ability to work both independently and as part of a collaborative team.',
    ],
    benefits: [
      'Competitive salary within the range of GBP 40,000 - 55,000.',
      'Flexible working hours and the option to work remotely.',
      'Access to professional development resources and training.',
      'Collaborative and creative work environment.',
      'Opportunities to work on diverse and challenging projects.',
      'Regular team-building activities and company events.',
      'Supportive and inclusive company culture.',
      'Health and wellness programs.',
    ],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Group',
    location: 'Edinburgh, UK',
    date: new Date('2023-09-20'),
    jobType: 'Permanent',
    description:
      'We are looking for an experienced DevOps engineer to streamline our cloud infrastructure and deployment processes. Your role will involve maintaining and optimizing our cloud systems, ensuring high availability and performance.',
    salary: {
      currency: 'GBP',
      amount: [55000, 70000],
    },
    responsibilities: [
      'Manage and maintain cloud infrastructure on platforms such as AWS, Azure, or Google Cloud.',
      'Automate deployment processes using tools such as Jenkins, Ansible, or Terraform.',
      'Monitor system performance, availability, and security, and respond to incidents promptly.',
      'Work closely with development teams to ensure seamless integration and delivery.',
      'Implement and maintain CI/CD pipelines to automate testing and deployment processes.',
      'Optimize resource usage and cost-efficiency of cloud environments.',
      'Write and maintain documentation for infrastructure and processes.',
    ],
    requirements: [
      'Proven experience as a DevOps Engineer or similar role.',
      'Hands-on experience with cloud platforms such as AWS, Azure, or Google Cloud.',
      'Knowledge of automation tools such as Jenkins, Ansible, Terraform, or similar.',
      'Experience with containerization technologies such as Docker and Kubernetes.',
      'Solid understanding of network, security, and infrastructure best practices.',
      'Strong scripting skills in languages such as Bash, Python, or Go.',
      'Excellent problem-solving skills and attention to detail.',
    ],
    benefits: [
      'Competitive salary within the range of GBP 55,000 - 70,000.',
      'Health, dental, and vision insurance plans.',
      'Retirement savings plans and pension contributions.',
      'Opportunities for career advancement and continuous learning.',
      'Access to the latest technology and tools.',
      'Collaborative and innovative work environment.',
      'Flexible working hours and remote work options.',
      'Company-sponsored travel and conferences.',
    ],
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Birmingham, UK',
    date: new Date('2023-09-30'),
    jobType: 'Contract',
    description:
      'Join our data team to derive actionable insights from complex datasets and drive business decisions. Your work will help us understand trends, improve customer experiences, and optimize operational efficiency.',
    salary: {
      currency: 'GBP',
      amount: [60000, 80000],
    },
    responsibilities: [
      'Analyze large datasets to identify patterns and insights.',
      'Develop predictive models and machine learning algorithms to solve business problems.',
      'Collaborate with business stakeholders to understand their needs and provide data-driven solutions.',
      'Prepare and present findings through detailed reports and data visualizations.',
      'Implement data collection, processing, and cleaning procedures to ensure data quality.',
      'Stay up-to-date with the latest developments in data science and machine learning.',
      'Document methodologies and code for reproducibility and knowledge sharing.',
    ],
    requirements: [
      'Proven experience as a Data Scientist or similar role.',
      'Strong background in statistics, mathematics, and data analysis.',
      'Proficiency with data analysis tools such as Python, R, SQL, or similar.',
      'Experience with machine learning libraries and frameworks such as scikit-learn, TensorFlow, or similar.',
      'Understanding of data visualization tools such as Tableau, PowerBI, or similar.',
      'Excellent problem-solving skills and analytical thinking.',
      'Strong communication skills and the ability to present complex findings in a clear and concise manner.',
    ],
    benefits: [
      'Competitive salary within the range of GBP 60,000 - 80,000.',
      'Flexible working hours and remote work options.',
      'Health, dental, and vision insurance plans.',
      'Professional development and training opportunities.',
      'Collaborative and innovative work environment.',
      'Access to state-of-the-art technology and tools.',
      'Company-sponsored research and conference opportunities.',
      'Work-life balance initiatives and wellness programs.',
    ],
  },
];
