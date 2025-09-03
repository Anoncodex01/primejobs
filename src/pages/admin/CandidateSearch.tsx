import React, { FC, useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Code,
  Award,
  Settings,
  Globe,
  Calendar,
  Star,
  Clock,
  Building,
  User,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Sliders,
  RefreshCw,
  Download,
  Eye,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

interface SearchFilters {
  // Basic Details
  keywords: string;
  totalExperienceMin: number;
  totalExperienceMax: number;
  currentLocation: string;
  preferredLocations: string[];
  nationality: string;
  gender: string;
  ageMin: number;
  ageMax: number;
  
  // Employment Details
  currentCompany: string;
  previousCompanies: string;
  industry: string;
  functionalArea: string;
  designation: string;
  currentRoleDurationMin: number;
  currentRoleDurationMax: number;
  rolesResponsibilities: string;
  keyAchievements: string;
  
  // Education Details
  highestQualification: string;
  degrees: string[];
  specialization: string;
  institute: string;
  yearOfPassingMin: number;
  yearOfPassingMax: number;
  certifications: string[];
  
  // Key Skills
  skillKeywords: string[];
  skillProficiency: string;
  skillExperienceMin: number;
  skillExperienceMax: number;
  
  // Compensation & Notice Period
  currentSalaryMin: number;
  currentSalaryMax: number;
  expectedSalaryMin: number;
  expectedSalaryMax: number;
  noticePeriod: string;
  
  // Projects & IT Skills
  projectKeywords: string[];
  toolsTechnologies: string[];
  itSkills: string[];
  
  // Accomplishments
  accomplishmentCertifications: string[];
  awardsRecognitions: string;
  languages: string[];
  
  // Job Preferences
  jobType: string;
  departmentPreference: string;
  willingnessToRelocate: string;
  workPermit: string;
  travelFlexibility: boolean;
  
  // Online Presence
  linkedinProfile: string;
}

interface Candidate {
  id: string;
  // Basic Details
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  nationality: string;
  currentLocation: {
    city: string;
    state: string;
    country: string;
  };
  preferredLocations: string[];
  
  // Employment Details
  totalExperience: {
    years: number;
    months: number;
  };
  currentEmployment?: {
    companyName: string;
    designation: string;
    fromDate: string;
    industry: string;
    functionalArea: string;
    rolesResponsibilities: string;
    keyAchievements: string;
  };
  previousEmployments: Array<{
    companyName: string;
    designation: string;
    fromDate: string;
    toDate: string;
    industry: string;
    functionalArea: string;
  }>;
  
  // Education Details
  education: Array<{
    degree: string;
    specialization: string;
    institute: string;
    yearOfPassing: string;
    isHighestQualification: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuingBody: string;
    yearOfCompletion: string;
  }>;
  
  // Skills & Projects
  itSkills: Array<{
    name: string;
    proficiency: string;
    yearsOfExperience: number;
  }>;
  projects: Array<{
    title: string;
    description: string;
    toolsTechnologies: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  
  // Compensation
  currentCTC: number;
  expectedCTC: number;
  noticePeriod: string;
  
  // Profile Content
  resumeHeadline: string;
  profileSummary: string;
  
  // Job Preferences
  jobPreferences: {
    jobType: string;
    department: string;
    willingnessToRelocate: boolean;
    relocationLocations?: string[];
    workPermit?: string;
    travelFlexibility: boolean;
  };
  
  // Online Presence
  onlinePresence: {
    linkedin?: string;
  };
  
  // Accomplishments
  accomplishments: Array<{
    type: string;
    title: string;
    description: string;
    year: string;
  }>;
  
  // CV and Photo uploads (Admin only)
  cvFile?: {
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  };
  photoFile?: {
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  };
}

const CandidateSearch: FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    // Basic Details
    keywords: '',
    totalExperienceMin: 0,
    totalExperienceMax: 50,
    currentLocation: '',
    preferredLocations: [],
    nationality: '',
    gender: '',
    ageMin: 18,
    ageMax: 65,
    
    // Employment Details
    currentCompany: '',
    previousCompanies: '',
    industry: '',
    functionalArea: '',
    designation: '',
    currentRoleDurationMin: 0,
    currentRoleDurationMax: 20,
    rolesResponsibilities: '',
    keyAchievements: '',
    
    // Education Details
    highestQualification: '',
    degrees: [],
    specialization: '',
    institute: '',
    yearOfPassingMin: 1990,
    yearOfPassingMax: 2024,
    certifications: [],
    
    // Key Skills
    skillKeywords: [],
    skillProficiency: '',
    skillExperienceMin: 0,
    skillExperienceMax: 20,
    
    // Compensation & Notice Period
    currentSalaryMin: 0,
    currentSalaryMax: 500000,
    expectedSalaryMin: 0,
    expectedSalaryMax: 500000,
    noticePeriod: '',
    
    // Projects & IT Skills
    projectKeywords: [],
    toolsTechnologies: [],
    itSkills: [],
    
    // Accomplishments
    accomplishmentCertifications: [],
    awardsRecognitions: '',
    languages: [],
    
    // Job Preferences
    jobType: '',
    departmentPreference: '',
    willingnessToRelocate: '',
    workPermit: '',
    travelFlexibility: false,
    
    // Online Presence
    linkedinProfile: ''
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showCandidateModal, setShowCandidateModal] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail',
    'Consulting', 'Media & Entertainment', 'Real Estate', 'Transportation', 'Energy',
    'Banking', 'Media', 'Government', 'Non-profit', 'Other'
  ];

  const functionalAreas = [
    'Software Development', 'Data Science', 'Product Management', 'Marketing',
    'Sales', 'Human Resources', 'Finance', 'Operations', 'Customer Service',
    'Engineering', 'Research & Development', 'Quality Assurance', 'Project Management'
  ];

  const qualifications = [
    'Diploma', 'Graduate', 'Postgraduate', 'PhD'
  ];

  const degrees = [
    'B.Com', 'B.Tech', 'B.Sc', 'B.A', 'B.E', 'MBA', 'M.Tech', 'M.Sc', 'M.A',
    'PhD', 'Diploma', 'Certificate', 'Other'
  ];

  const specializations = [
    'Computer Science', 'Finance', 'Marketing', 'Human Resources', 'Engineering',
    'Data Science', 'Business Administration', 'Economics', 'Psychology',
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Other'
  ];

  const noticePeriods = [
    'Immediate', '15 days', '30 days', '60 days', '90 days', 'Custom'
  ];

  const jobTypes = [
    'Permanent', 'Contract', 'Internship', 'Freelance'
  ];

  const departments = [
    'Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance',
    'Operations', 'Customer Service', 'Research & Development', 'Quality Assurance'
  ];

  const skillProficiencies = [
    'Beginner', 'Intermediate', 'Expert'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean',
    'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Italian', 'Dutch', 'Other'
  ];

  const relocationOptions = [
    'Yes', 'No', 'Specific Locations'
  ];

  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        // Basic Details
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-123-4567',
        age: 28,
        gender: 'male',
        nationality: 'American',
        currentLocation: { city: 'San Francisco', state: 'California', country: 'United States' },
        preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX'],
        
        // Employment Details
        totalExperience: { years: 5, months: 3 },
        currentEmployment: {
          companyName: 'TechCorp Solutions',
          designation: 'Senior Software Engineer',
          fromDate: '2022-01-15',
          industry: 'Technology',
          functionalArea: 'Software Development',
          rolesResponsibilities: 'Lead development of microservices architecture, mentor junior developers',
          keyAchievements: 'Reduced system downtime by 40%, improved team productivity by 25%'
        },
        previousEmployments: [
          {
            companyName: 'InnovateTech Inc',
            designation: 'Software Engineer',
            fromDate: '2020-03-01',
            toDate: '2021-12-31',
            industry: 'Technology',
            functionalArea: 'Mobile Development'
          },
          {
            companyName: 'Digital Solutions Ltd',
            designation: 'Junior Developer',
            fromDate: '2019-06-01',
            toDate: '2020-02-28',
            industry: 'Digital Marketing',
            functionalArea: 'Web Development'
          }
        ],
        
        // Education Details
        education: [
          {
            degree: 'B.Tech',
            specialization: 'Computer Science',
            institute: 'Stanford University',
            yearOfPassing: '2019',
            isHighestQualification: true
          },
          {
            degree: 'High School Diploma',
            specialization: 'Science',
            institute: 'San Francisco High School',
            yearOfPassing: '2015',
            isHighestQualification: false
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Solutions Architect',
            issuingBody: 'Amazon Web Services',
            yearOfCompletion: '2023'
          },
          {
            name: 'Google Cloud Professional Developer',
            issuingBody: 'Google',
            yearOfCompletion: '2022'
          }
        ],
        
        // Skills & Projects
        itSkills: [
          { name: 'React', proficiency: 'Expert', yearsOfExperience: 4 },
          { name: 'Node.js', proficiency: 'Expert', yearsOfExperience: 3 },
          { name: 'Python', proficiency: 'Intermediate', yearsOfExperience: 2 }
        ],
        projects: [
          {
            title: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform with payment integration and inventory management.',
            toolsTechnologies: 'React, Node.js, MongoDB, Stripe'
          },
          {
            title: 'Mobile App Development',
            description: 'Developed cross-platform mobile applications for iOS and Android.',
            toolsTechnologies: 'React Native, Firebase, Redux'
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Expert' },
          { name: 'Spanish', proficiency: 'Intermediate' }
        ],
        
        // Compensation
        currentCTC: 120000,
        expectedCTC: 150000,
        noticePeriod: '30 days',
        
        // Profile Content
        resumeHeadline: 'Senior Software Engineer with 5+ years experience in Full-Stack Development',
        profileSummary: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers.',
        
        // Job Preferences
        jobPreferences: {
          jobType: 'Permanent',
          department: 'Engineering',
          willingnessToRelocate: true,
          relocationLocations: ['New York', 'Seattle', 'Austin'],
          workPermit: 'US Citizen',
          travelFlexibility: true
        },
        
        // Online Presence
        onlinePresence: {
          linkedin: 'https://linkedin.com/in/johndoe'
        },
        
        // Accomplishments
        accomplishments: [
          {
            type: 'award',
            title: 'Employee of the Year',
            description: 'Recognized for outstanding performance and leadership',
            year: '2023'
          },
          {
            type: 'certification',
            title: 'AWS Solutions Architect',
            description: 'Professional cloud architecture certification',
            year: '2023'
          }
        ],
        
        // CV and Photo uploads (Admin only)
        cvFile: {
          name: 'John_Doe_CV.pdf',
          url: '/sample-cv.pdf',
          type: 'application/pdf',
          uploadedAt: '2024-01-15T10:30:00Z'
        },
        photoFile: {
          name: 'john_doe_photo.jpg',
          url: '/sample-photo.jpg',
          type: 'image/jpeg',
          uploadedAt: '2024-01-15T10:30:00Z'
        }
      }
    ];

    setCandidates(mockCandidates);
    setFilteredCandidates(mockCandidates);
  }, []);

  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...candidates];

    // Basic Details Filters
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.fullName.toLowerCase().includes(keywords) ||
        candidate.resumeHeadline.toLowerCase().includes(keywords) ||
        candidate.profileSummary.toLowerCase().includes(keywords) ||
        candidate.currentEmployment?.rolesResponsibilities.toLowerCase().includes(keywords) ||
        candidate.currentEmployment?.keyAchievements.toLowerCase().includes(keywords) ||
        candidate.itSkills.some(skill => skill.name.toLowerCase().includes(keywords)) ||
        candidate.projects.some(project => project.title.toLowerCase().includes(keywords) || project.description.toLowerCase().includes(keywords)) ||
        candidate.accomplishments.some(acc => acc.title.toLowerCase().includes(keywords) || acc.description.toLowerCase().includes(keywords))
      );
    }

    if (filters.totalExperienceMin > 0 || filters.totalExperienceMax < 50) {
      filtered = filtered.filter(candidate => {
        const totalExp = candidate.totalExperience.years + candidate.totalExperience.months / 12;
        return totalExp >= filters.totalExperienceMin && totalExp <= filters.totalExperienceMax;
      });
    }

    if (filters.currentLocation) {
      const location = filters.currentLocation.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.currentLocation.city.toLowerCase().includes(location) ||
        candidate.currentLocation.state.toLowerCase().includes(location) ||
        candidate.currentLocation.country.toLowerCase().includes(location)
      );
    }

    if (filters.preferredLocations.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.preferredLocations.some(location =>
          candidate.preferredLocations.some(pref => pref.toLowerCase().includes(location.toLowerCase()))
        )
      );
    }

    if (filters.nationality) {
      filtered = filtered.filter(candidate =>
        candidate.nationality.toLowerCase().includes(filters.nationality.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(candidate => candidate.gender === filters.gender);
    }

    if (filters.ageMin > 18 || filters.ageMax < 65) {
      filtered = filtered.filter(candidate =>
        candidate.age >= filters.ageMin && candidate.age <= filters.ageMax
      );
    }

    // Employment Details Filters
    if (filters.currentCompany) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.companyName.toLowerCase().includes(filters.currentCompany.toLowerCase())
      );
    }

    if (filters.previousCompanies) {
      const companies = filters.previousCompanies.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.previousEmployments.some(emp => emp.companyName.toLowerCase().includes(companies))
      );
    }

    if (filters.industry) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.industry === filters.industry ||
        candidate.previousEmployments.some(emp => emp.industry === filters.industry)
      );
    }

    if (filters.functionalArea) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.functionalArea === filters.functionalArea ||
        candidate.previousEmployments.some(emp => emp.functionalArea === filters.functionalArea)
      );
    }

    if (filters.designation) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.designation.toLowerCase().includes(filters.designation.toLowerCase()) ||
        candidate.previousEmployments.some(emp => emp.designation.toLowerCase().includes(filters.designation.toLowerCase()))
      );
    }

    if (filters.currentRoleDurationMin > 0 || filters.currentRoleDurationMax < 20) {
      filtered = filtered.filter(candidate => {
        if (!candidate.currentEmployment?.fromDate) return false;
        const fromDate = new Date(candidate.currentEmployment.fromDate);
        const now = new Date();
        const durationYears = (now.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        return durationYears >= filters.currentRoleDurationMin && durationYears <= filters.currentRoleDurationMax;
      });
    }

    if (filters.rolesResponsibilities) {
      const roles = filters.rolesResponsibilities.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.rolesResponsibilities.toLowerCase().includes(roles)
      );
    }

    if (filters.keyAchievements) {
      const achievements = filters.keyAchievements.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.keyAchievements.toLowerCase().includes(achievements)
      );
    }

    // Education Details Filters
    if (filters.highestQualification) {
      filtered = filtered.filter(candidate =>
        candidate.education.some(edu => 
          edu.isHighestQualification && 
          (edu.degree.includes(filters.highestQualification) || 
           (filters.highestQualification === 'Graduate' && ['B.Tech', 'B.Sc', 'B.A', 'B.Com', 'B.E'].includes(edu.degree)) ||
           (filters.highestQualification === 'Postgraduate' && ['M.Tech', 'M.Sc', 'M.A', 'MBA'].includes(edu.degree)))
        )
      );
    }

    if (filters.degrees.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.degrees.every(degree =>
          candidate.education.some(edu => edu.degree.includes(degree))
        )
      );
    }

    if (filters.specialization) {
      filtered = filtered.filter(candidate =>
        candidate.education.some(edu => edu.specialization.toLowerCase().includes(filters.specialization.toLowerCase()))
      );
    }

    if (filters.institute) {
      filtered = filtered.filter(candidate =>
        candidate.education.some(edu => edu.institute.toLowerCase().includes(filters.institute.toLowerCase()))
      );
    }

    if (filters.yearOfPassingMin > 1990 || filters.yearOfPassingMax < 2024) {
      filtered = filtered.filter(candidate =>
        candidate.education.some(edu => {
          const year = parseInt(edu.yearOfPassing);
          return year >= filters.yearOfPassingMin && year <= filters.yearOfPassingMax;
        })
      );
    }

    if (filters.certifications.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.certifications.every(cert =>
          candidate.certifications.some(candidateCert => candidateCert.name.toLowerCase().includes(cert.toLowerCase()))
        )
      );
    }

    // Key Skills Filters
    if (filters.skillKeywords.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.skillKeywords.every(skill =>
          candidate.itSkills.some(candidateSkill =>
            candidateSkill.name.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (filters.skillProficiency) {
      filtered = filtered.filter(candidate =>
        candidate.itSkills.some(skill => skill.proficiency === filters.skillProficiency)
      );
    }

    if (filters.skillExperienceMin > 0 || filters.skillExperienceMax < 20) {
      filtered = filtered.filter(candidate =>
        candidate.itSkills.some(skill => 
          skill.yearsOfExperience >= filters.skillExperienceMin && 
          skill.yearsOfExperience <= filters.skillExperienceMax
        )
      );
    }

    // Compensation & Notice Period Filters
    if (filters.currentSalaryMin > 0 || filters.currentSalaryMax < 500000) {
      filtered = filtered.filter(candidate =>
        candidate.currentCTC >= filters.currentSalaryMin &&
        candidate.currentCTC <= filters.currentSalaryMax
      );
    }

    if (filters.expectedSalaryMin > 0 || filters.expectedSalaryMax < 500000) {
      filtered = filtered.filter(candidate =>
        candidate.expectedCTC >= filters.expectedSalaryMin &&
        candidate.expectedCTC <= filters.expectedSalaryMax
      );
    }

    if (filters.noticePeriod) {
      filtered = filtered.filter(candidate => candidate.noticePeriod === filters.noticePeriod);
    }

    // Projects & IT Skills Filters
    if (filters.projectKeywords.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.projectKeywords.every(keyword =>
          candidate.projects.some(project => 
            project.title.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      );
    }

    if (filters.toolsTechnologies.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.toolsTechnologies.every(tool =>
          candidate.projects.some(project => 
            project.toolsTechnologies.toLowerCase().includes(tool.toLowerCase())
          )
        )
      );
    }

    if (filters.itSkills.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.itSkills.every(skill =>
          candidate.itSkills.some(candidateSkill => 
            candidateSkill.name.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Accomplishments Filters
    if (filters.accomplishmentCertifications.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.accomplishmentCertifications.every(cert =>
          candidate.accomplishments.some(acc => 
            acc.type === 'certification' && acc.title.toLowerCase().includes(cert.toLowerCase())
          )
        )
      );
    }

    if (filters.awardsRecognitions) {
      const awards = filters.awardsRecognitions.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.accomplishments.some(acc => 
          acc.title.toLowerCase().includes(awards) || acc.description.toLowerCase().includes(awards)
        )
      );
    }

    if (filters.languages.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.languages.every(lang =>
          candidate.languages.some(candidateLang => 
            candidateLang.name.toLowerCase().includes(lang.toLowerCase())
          )
        )
      );
    }

    // Job Preferences Filters
    if (filters.jobType) {
      filtered = filtered.filter(candidate => candidate.jobPreferences.jobType === filters.jobType);
    }

    if (filters.departmentPreference) {
      filtered = filtered.filter(candidate => candidate.jobPreferences.department === filters.departmentPreference);
    }

    if (filters.willingnessToRelocate) {
      if (filters.willingnessToRelocate === 'Yes') {
        filtered = filtered.filter(candidate => candidate.jobPreferences.willingnessToRelocate === true);
      } else if (filters.willingnessToRelocate === 'No') {
        filtered = filtered.filter(candidate => candidate.jobPreferences.willingnessToRelocate === false);
      }
    }

    if (filters.workPermit) {
      filtered = filtered.filter(candidate =>
        candidate.jobPreferences.workPermit?.toLowerCase().includes(filters.workPermit.toLowerCase())
      );
    }

    if (filters.travelFlexibility !== undefined) {
      filtered = filtered.filter(candidate => candidate.jobPreferences.travelFlexibility === filters.travelFlexibility);
    }

    // Online Presence Filters
    if (filters.linkedinProfile) {
      filtered = filtered.filter(candidate =>
        candidate.onlinePresence.linkedin?.toLowerCase().includes(filters.linkedinProfile.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
  };

  const clearFilters = () => {
    setFilters({
      // Basic Details
      keywords: '',
      totalExperienceMin: 0,
      totalExperienceMax: 50,
      currentLocation: '',
      preferredLocations: [],
      nationality: '',
      gender: '',
      ageMin: 18,
      ageMax: 65,
      
      // Employment Details
      currentCompany: '',
      previousCompanies: '',
      industry: '',
      functionalArea: '',
      designation: '',
      currentRoleDurationMin: 0,
      currentRoleDurationMax: 20,
      rolesResponsibilities: '',
      keyAchievements: '',
      
      // Education Details
      highestQualification: '',
      degrees: [],
      specialization: '',
      institute: '',
      yearOfPassingMin: 1990,
      yearOfPassingMax: 2024,
      certifications: [],
      
      // Key Skills
      skillKeywords: [],
      skillProficiency: '',
      skillExperienceMin: 0,
      skillExperienceMax: 20,
      
      // Compensation & Notice Period
      currentSalaryMin: 0,
      currentSalaryMax: 500000,
      expectedSalaryMin: 0,
      expectedSalaryMax: 500000,
      noticePeriod: '',
      
      // Projects & IT Skills
      projectKeywords: [],
      toolsTechnologies: [],
      itSkills: [],
      
      // Accomplishments
      accomplishmentCertifications: [],
      awardsRecognitions: '',
      languages: [],
      
      // Job Preferences
      jobType: '',
      departmentPreference: '',
      willingnessToRelocate: '',
      workPermit: '',
      travelFlexibility: false,
      
      // Online Presence
      linkedinProfile: ''
    });
    setFilteredCandidates(candidates);
  };

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidate Search</h1>
              <p className="text-gray-600 mt-2">Find the perfect candidates for your job openings</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search candidates by keywords, skills, experience..."
              value={filters.keywords}
              onChange={(e) => handleFilterChange('keywords', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={applyFilters}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Basic Details */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (Years)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.totalExperienceMin}
                        onChange={(e) => handleFilterChange('totalExperienceMin', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.totalExperienceMax}
                        onChange={(e) => handleFilterChange('totalExperienceMax', parseInt(e.target.value) || 50)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                    <input
                      type="text"
                      value={filters.currentLocation}
                      onChange={(e) => handleFilterChange('currentLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, State, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                    <input
                      type="text"
                      value={filters.preferredLocations.join(', ')}
                      onChange={(e) => handleFilterChange('preferredLocations', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Location1, Location2 (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                    <input
                      type="text"
                      value={filters.nationality}
                      onChange={(e) => handleFilterChange('nationality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter nationality"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.ageMin}
                        onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value) || 18)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.ageMax}
                        onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value) || 65)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Employment Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                    <input
                      type="text"
                      value={filters.currentCompany}
                      onChange={(e) => handleFilterChange('currentCompany', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Companies</label>
                    <input
                      type="text"
                      value={filters.previousCompanies}
                      onChange={(e) => handleFilterChange('previousCompanies', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Company names"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={filters.industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Functional Area</label>
                    <select
                      value={filters.functionalArea}
                      onChange={(e) => handleFilterChange('functionalArea', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Functional Area</option>
                      {functionalAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      value={filters.designation}
                      onChange={(e) => handleFilterChange('designation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Job title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Role Duration (Years)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.currentRoleDurationMin}
                        onChange={(e) => handleFilterChange('currentRoleDurationMin', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.currentRoleDurationMax}
                        onChange={(e) => handleFilterChange('currentRoleDurationMax', parseInt(e.target.value) || 20)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roles & Responsibilities</label>
                    <input
                      type="text"
                      value={filters.rolesResponsibilities}
                      onChange={(e) => handleFilterChange('rolesResponsibilities', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Keywords in roles"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
                    <input
                      type="text"
                      value={filters.keyAchievements}
                      onChange={(e) => handleFilterChange('keyAchievements', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Keywords in achievements"
                    />
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification</label>
                    <select
                      value={filters.highestQualification}
                      onChange={(e) => handleFilterChange('highestQualification', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Qualification</option>
                      {qualifications.map(qual => (
                        <option key={qual} value={qual}>{qual}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degrees</label>
                    <input
                      type="text"
                      value={filters.degrees.join(', ')}
                      onChange={(e) => handleFilterChange('degrees', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="B.Tech, MBA (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <input
                      type="text"
                      value={filters.specialization}
                      onChange={(e) => handleFilterChange('specialization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Computer Science, Finance"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute/University</label>
                    <input
                      type="text"
                      value={filters.institute}
                      onChange={(e) => handleFilterChange('institute', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="University name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.yearOfPassingMin}
                        onChange={(e) => handleFilterChange('yearOfPassingMin', parseInt(e.target.value) || 1990)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="From"
                      />
                      <input
                        type="number"
                        value={filters.yearOfPassingMax}
                        onChange={(e) => handleFilterChange('yearOfPassingMax', parseInt(e.target.value) || 2024)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="To"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <input
                      type="text"
                      value={filters.certifications.join(', ')}
                      onChange={(e) => handleFilterChange('certifications', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="AWS, PMP (comma separated)"
                    />
                  </div>
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Key Skills
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Keywords</label>
                    <input
                      type="text"
                      value={filters.skillKeywords.join(', ')}
                      onChange={(e) => handleFilterChange('skillKeywords', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="React, Node.js, Python (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Proficiency</label>
                    <select
                      value={filters.skillProficiency}
                      onChange={(e) => handleFilterChange('skillProficiency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Proficiency</option>
                      {skillProficiencies.map(proficiency => (
                        <option key={proficiency} value={proficiency}>{proficiency}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Experience (Years)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.skillExperienceMin}
                        onChange={(e) => handleFilterChange('skillExperienceMin', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.skillExperienceMax}
                        onChange={(e) => handleFilterChange('skillExperienceMax', parseInt(e.target.value) || 20)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Compensation & Notice Period */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Compensation & Notice Period
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary (USD)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.currentSalaryMin}
                        onChange={(e) => handleFilterChange('currentSalaryMin', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.currentSalaryMax}
                        onChange={(e) => handleFilterChange('currentSalaryMax', parseInt(e.target.value) || 500000)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary (USD)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.expectedSalaryMin}
                        onChange={(e) => handleFilterChange('expectedSalaryMin', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.expectedSalaryMax}
                        onChange={(e) => handleFilterChange('expectedSalaryMax', parseInt(e.target.value) || 500000)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                    <select
                      value={filters.noticePeriod}
                      onChange={(e) => handleFilterChange('noticePeriod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Notice Period</option>
                      {noticePeriods.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Projects & IT Skills */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Projects & IT Skills
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Keywords</label>
                    <input
                      type="text"
                      value={filters.projectKeywords.join(', ')}
                      onChange={(e) => handleFilterChange('projectKeywords', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ERP, Marketing Campaign (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tools/Technologies</label>
                    <input
                      type="text"
                      value={filters.toolsTechnologies.join(', ')}
                      onChange={(e) => handleFilterChange('toolsTechnologies', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="SAP, AutoCAD, Python (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IT Skills</label>
                    <input
                      type="text"
                      value={filters.itSkills.join(', ')}
                      onChange={(e) => handleFilterChange('itSkills', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Programming, Database (comma separated)"
                    />
                  </div>
                </div>
              </div>

              {/* Accomplishments */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Accomplishments
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <input
                      type="text"
                      value={filters.accomplishmentCertifications.join(', ')}
                      onChange={(e) => handleFilterChange('accomplishmentCertifications', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CFA, PMP, SAP (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Awards & Recognitions</label>
                    <input
                      type="text"
                      value={filters.awardsRecognitions}
                      onChange={(e) => handleFilterChange('awardsRecognitions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Keywords in awards"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <input
                      type="text"
                      value={filters.languages.join(', ')}
                      onChange={(e) => handleFilterChange('languages', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="English, Spanish (comma separated)"
                    />
                  </div>
                </div>
              </div>

              {/* Job Preferences */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Job Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      value={filters.jobType}
                      onChange={(e) => handleFilterChange('jobType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Job Type</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department Preference</label>
                    <select
                      value={filters.departmentPreference}
                      onChange={(e) => handleFilterChange('departmentPreference', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Willingness to Relocate</label>
                    <select
                      value={filters.willingnessToRelocate}
                      onChange={(e) => handleFilterChange('willingnessToRelocate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any</option>
                      {relocationOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Permit</label>
                    <input
                      type="text"
                      value={filters.workPermit}
                      onChange={(e) => handleFilterChange('workPermit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Country-specific permit"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Flexibility</label>
                    <select
                      value={filters.travelFlexibility ? 'true' : 'false'}
                      onChange={(e) => handleFilterChange('travelFlexibility', e.target.value === 'true')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Online Presence */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Online Presence
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={filters.linkedinProfile}
                      onChange={(e) => handleFilterChange('linkedinProfile', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="LinkedIn URL keywords"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {filteredCandidates.length} candidates found
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                selectedCandidates.includes(candidate.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => toggleCandidateSelection(candidate.id)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {candidate.resumeHeadline}
                        </h3>
                        <p className="text-gray-600">
                          {candidate.currentLocation.city}, {candidate.currentLocation.state}, {candidate.currentLocation.country}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                        <p className="text-sm text-gray-600">
                          {candidate.totalExperience.years} years {candidate.totalExperience.months} months
                        </p>
                        {candidate.currentEmployment && (
                          <p className="text-sm text-gray-600">
                            Currently at {candidate.currentEmployment.companyName}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {candidate.itSkills.slice(0, 3).map(skill => (
                            <span
                              key={skill.name}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {skill.name} ({skill.proficiency})
                            </span>
                          ))}
                          {candidate.itSkills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{candidate.itSkills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Compensation</h4>
                        <p className="text-sm text-gray-600">
                          Current: ${candidate.currentCTC.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Expected: ${candidate.expectedCTC.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Notice: {candidate.noticePeriod}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Profile Summary</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {candidate.profileSummary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button 
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setShowCandidateModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="View Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600" title="Contact Candidate">
                      <Mail className="w-4 h-4" />
                    </button>
                    {candidate.onlinePresence.linkedin && (
                      <a
                        href={candidate.onlinePresence.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="LinkedIn Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Candidate Detail Modal */}
        {showCandidateModal && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Candidate Full Profile</h3>
                  <button
                    onClick={() => {
                      setShowCandidateModal(false);
                      setSelectedCandidate(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Header with Photo */}
                <div className="flex items-start gap-6">
                  {selectedCandidate.photoFile && (
                    <div className="flex-shrink-0">
                      <img
                        src={selectedCandidate.photoFile.url}
                        alt="Candidate Photo"
                        className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = '/logo.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.fullName}</h2>
                    <p className="text-lg text-gray-600">{selectedCandidate.resumeHeadline}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>{selectedCandidate.email}</span>
                      <span>{selectedCandidate.phone}</span>
                      <span>{selectedCandidate.age} years old</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {selectedCandidate.currentLocation.city}, {selectedCandidate.currentLocation.state}, {selectedCandidate.currentLocation.country}
                    </div>
                  </div>
                </div>

                {/* CV Download */}
                {selectedCandidate.cvFile && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">CV Document</h4>
                        <p className="text-sm text-blue-700">{selectedCandidate.cvFile.name}</p>
                        <p className="text-xs text-blue-600">
                          Uploaded: {new Date(selectedCandidate.cvFile.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <a
                        href={selectedCandidate.cvFile.url}
                        download
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download CV
                      </a>
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.age} years old</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedCandidate.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.nationality}</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Experience</label>
                      <p className="text-sm text-gray-900">
                        {selectedCandidate.totalExperience.years} years {selectedCandidate.totalExperience.months} months
                      </p>
                    </div>
                    {selectedCandidate.currentEmployment && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Employment</label>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-900">{selectedCandidate.currentEmployment.companyName}</p>
                          <p className="text-sm text-gray-600">{selectedCandidate.currentEmployment.designation}</p>
                          <p className="text-sm text-gray-600">{selectedCandidate.currentEmployment.industry} - {selectedCandidate.currentEmployment.functionalArea}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.itSkills.map(skill => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill.name} ({skill.proficiency}) - {skill.yearsOfExperience} years
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compensation */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Compensation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current CTC</label>
                      <p className="text-sm text-gray-900">${selectedCandidate.currentCTC.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expected CTC</label>
                      <p className="text-sm text-gray-900">${selectedCandidate.expectedCTC.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notice Period</label>
                      <p className="text-sm text-gray-900">{selectedCandidate.noticePeriod}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Profile Summary</h4>
                  <p className="text-sm text-gray-700">{selectedCandidate.profileSummary}</p>
                </div>

                {/* Online Presence */}
                {selectedCandidate.onlinePresence.linkedin && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Online Presence</h4>
                    <a
                      href={selectedCandidate.onlinePresence.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    This is the full admin view. Employers will see a privacy-protected version.
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowCandidateModal(false);
                        setSelectedCandidate(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Contact Candidate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;
