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
  ExternalLink,
  Shield,
  Lock
} from 'lucide-react';

interface SearchFilters {
  // Basic Details
  keywords: string;
  totalExperienceMin: number;
  totalExperienceMax: number;
  currentLocation: string;
  preferredLocations: string[];
  
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
}

interface Candidate {
  id: string;
  // Professional Information Only (No Personal Details)
  resumeHeadline: string;
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
  
  // Accomplishments
  accomplishments: Array<{
    type: string;
    title: string;
    description: string;
    year: string;
  }>;
  
  // Privacy Protected - No personal contact info
}

const EmployerCandidateSearch: FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    // Basic Details
    keywords: '',
    totalExperienceMin: 0,
    totalExperienceMax: 50,
    currentLocation: '',
    preferredLocations: [],
    
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
    travelFlexibility: false
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
    // Mock data with only professional information
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        resumeHeadline: 'Senior Software Engineer with 5+ years experience in Full-Stack Development',
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
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Solutions Architect',
            issuingBody: 'Amazon Web Services',
            yearOfCompletion: '2023'
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
        
        // Accomplishments
        accomplishments: [
          {
            type: 'award',
            title: 'Employee of the Year',
            description: 'Recognized for outstanding performance and leadership',
            year: '2023'
          }
        ]
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

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.resumeHeadline.toLowerCase().includes(keywords) ||
        candidate.profileSummary.toLowerCase().includes(keywords) ||
        candidate.currentEmployment?.rolesResponsibilities.toLowerCase().includes(keywords) ||
        candidate.currentEmployment?.keyAchievements.toLowerCase().includes(keywords) ||
        candidate.itSkills.some(skill => skill.name.toLowerCase().includes(keywords))
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

    if (filters.industry) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.industry === filters.industry
      );
    }

    if (filters.functionalArea) {
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.functionalArea === filters.functionalArea
      );
    }

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

    if (filters.jobType) {
      filtered = filtered.filter(candidate => candidate.jobPreferences.jobType === filters.jobType);
    }

    if (filters.skillKeywords.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.skillKeywords.every(skill =>
          candidate.itSkills.some(candidateSkill =>
            candidateSkill.name.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    setFilteredCandidates(filtered);
  };

  const clearFilters = () => {
    setFilters({
      keywords: '',
      totalExperienceMin: 0,
      totalExperienceMax: 50,
      currentLocation: '',
      industry: '',
      functionalArea: '',
      designation: '',
      currentSalaryMin: 0,
      currentSalaryMax: 500000,
      expectedSalaryMin: 0,
      expectedSalaryMax: 500000,
      noticePeriod: '',
      jobType: '',
      skillKeywords: [],
      skillProficiency: ''
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
              <p className="text-gray-600 mt-2">Find qualified candidates for your job openings</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <Shield className="w-4 h-4" />
                <span>Privacy Protected - No personal information shared</span>
              </div>
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
              {/* Experience & Location */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experience & Location
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
                    <select
                      value={filters.currentLocation}
                      onChange={(e) => handleFilterChange('currentLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Any Location</option>
                      <option value="Remote">Remote</option>
                      <option value="Dar es Salaam">Dar es Salaam</option>
                      <option value="Nairobi">Nairobi</option>
                      <option value="Kampala">Kampala</option>
                      <option value="Kigali">Kigali</option>
                      <option value="New York">New York</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="London">London</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Sydney">Sydney</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Johannesburg">Johannesburg</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Accra">Accra</option>
                      <option value="Addis Ababa">Addis Ababa</option>
                    </select>
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
                </div>
              </div>

              {/* Compensation & Skills */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Compensation & Skills
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
                      title="View Professional Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600" title="Request Contact">
                      <Mail className="w-4 h-4" />
                    </button>
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

        {/* Candidate Detail Modal - Privacy Protected */}
        {showCandidateModal && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">Professional Profile</h3>
                    <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      <Shield className="w-4 h-4" />
                      Privacy Protected
                    </div>
                  </div>
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
                {/* Professional Header */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.resumeHeadline}</h2>
                  <p className="text-gray-600 mt-2">
                    {selectedCandidate.currentLocation.city}, {selectedCandidate.currentLocation.state}, {selectedCandidate.currentLocation.country}
                  </p>
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

                {/* Privacy Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Privacy Protected</h5>
                      <p className="text-sm text-blue-700">
                        Personal information (name, contact details, photo) is not shared with employers. 
                        Contact us to request candidate information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Professional information only. Personal details protected.
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
                      Request Contact
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

export default EmployerCandidateSearch;
