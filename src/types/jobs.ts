export type JobType = 'Full-Time' | 'Part-Time' | 'Contract Base';

export interface Job {
  id: string;
  title: string;
  type: JobType;
  description: string;
  daysRemaining: number;
  salary: string;
  company: {
    name: string;
    logo: string;
    location: string;
  };
  isSaved?: boolean;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'UI/UX Designer',
    type: 'Contract Base',
    description: 'We are looking for UI/UX Designer',
    daysRemaining: 5,
    salary: 'Negotiable',
    company: {
      name: 'Upwork',
      logo: '/company-logos/fiverr-1.svg',
      location: 'Remote'
    }
  },
  {
    id: '2',
    title: 'Software Engineer',
    type: 'Full-Time',
    description: 'We are looking for Entry level Software Engineer',
    daysRemaining: 15,
    salary: '30k - 40k',
    company: {
      name: 'Apple',
      logo: '/company-logos/amazon-web-services-2.svg',
      location: 'Canada'
    }
  },
  {
    id: '3',
    title: 'Sr. UI/UX Designer',
    type: 'Contract Base',
    description: 'We are looking for UI/UX Designer',
    daysRemaining: 5,
    salary: '30k - 40k',
    company: {
      name: 'Figma',
      logo: '/company-logos/slack-new-logo.svg',
      location: 'Australia'
    }
  },
  {
    id: '4',
    title: 'Marketing Officer',
    type: 'Full-Time',
    description: 'We are looking for Mid-level Marketing Officer',
    daysRemaining: 10,
    salary: '35k - 40k',
    company: {
      name: 'Apple',
      logo: '/company-logos/apple-14.svg',
      location: 'U.S.A'
    }
  },
  {
    id: '5',
    title: 'Data Analyst',
    type: 'Part-Time',
    description: 'We are looking for Data Analyst Expert',
    daysRemaining: 20,
    salary: '50K - 80k',
    company: {
      name: 'Viber',
      logo: '/company-logos/viber-icon.svg',
      location: 'London'
    }
  },
  {
    id: '6',
    title: 'Design Director',
    type: 'Full-Time',
    description: 'We are looking for Design Director',
    daysRemaining: 8,
    salary: '110k - 130k',
    company: {
      name: 'Snapshot.inc',
      logo: '/company-logos/grab-2.svg',
      location: 'U.S.A'
    }
  },
  {
    id: '7',
    title: 'Product Designer',
    type: 'Full-Time',
    description: 'We are looking for Product Designer',
    daysRemaining: 22,
    salary: '25k - 45k',
    company: {
      name: 'Quora',
      logo: '/company-logos/cnbc-1.svg',
      location: 'Remote'
    }
  },
  {
    id: '8',
    title: 'Fronted Developer',
    type: 'Part-Time',
    description: 'We are looking for Fronted Developer',
    daysRemaining: 5,
    salary: '62K - 70k',
    company: {
      name: 'Spotify',
      logo: '/company-logos/spotify-2.svg',
      location: 'Las Vegas'
    }
  },
  {
    id: '9',
    title: 'Data Architect',
    type: 'Full-Time',
    description: 'We are looking for Data Architect',
    daysRemaining: 8,
    salary: '150k - 180k',
    company: {
      name: 'Twitter',
      logo: '/company-logos/mtn-new-logo.svg',
      location: 'Switzerland'
    }
  }
]; 