export interface PremiumMembership {
  id: string;
  employerId: string;
  plan: 'basic' | 'premium' | 'enterprise';
  startDate: string;
  endDate: string;
  isActive: boolean;
  features: PremiumFeature[];
  price: number;
  currency: 'TZS' | 'USD';
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface EnhancedCandidateSearch {
  // Basic Search
  keywords: string;
  experienceRange: {
    min: number;
    max: number;
  };
  
  // Industry & Function
  industry: string;
  jobFunction: string;
  role: string;
  
  // Location
  currentCity: string;
  preferredLocation: string;
  willingToRelocate: boolean;
  
  // Education
  education: {
    degree: string;
    specialization: string;
    university: string;
  };
  
  // Employment
  currentEmployer: string;
  pastEmployers: string[];
  
  // Compensation
  salaryRange: {
    min: number;
    max: number;
    currency: 'TZS' | 'USD';
  };
  
  // Employment Type
  employmentType: ('full-time' | 'part-time' | 'contract' | 'freelance')[];
  
  // Languages
  languages: string[];
  
  // Profile Activity
  lastActive: string;
  profileUpdated: string;
  
  // Work Status
  openToWork: boolean;
  
  // Applications
  hasAppliedToJobs: string[];
  
  // AI Recommendations
  aiRecommended: boolean;
  
  // Premium Features (Admin Only)
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  origin?: string;
  
  // Search Management
  savedSearchId?: string;
  talentPoolId?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  employerId: string;
  searchCriteria: EnhancedCandidateSearch;
  createdAt: string;
  lastUsed: string;
  resultCount: number;
}

export interface TalentPool {
  id: string;
  name: string;
  employerId: string;
  description: string;
  candidates: string[]; // Candidate IDs
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  candidateId: string;
  relevanceScore: number;
  matchReasons: string[];
  isPremium: boolean;
  canContact: boolean;
}

export interface DirectOutreach {
  id: string;
  candidateId: string;
  employerId: string;
  type: 'email' | 'whatsapp' | 'call' | 'inmail';
  subject: string;
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'replied' | 'failed';
  sentAt: string;
  readAt?: string;
  repliedAt?: string;
}
