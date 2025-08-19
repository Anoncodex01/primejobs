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
  keywords: string;
  totalExperienceMin: number;
  totalExperienceMax: number;
  currentLocation: string;
  nationality: string;
  gender: string;
  ageMin: number;
  ageMax: number;
  currentCompany: string;
  industry: string;
  functionalArea: string;
  designation: string;
  currentSalaryMin: number;
  currentSalaryMax: number;
  expectedSalaryMin: number;
  expectedSalaryMax: number;
  noticePeriod: string;
  jobType: string;
  skillKeywords: string[];
  skillProficiency: string;
}

interface Candidate {
  id: string;
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
  totalExperience: {
    years: number;
    months: number;
  };
  currentEmployment?: {
    companyName: string;
    designation: string;
    industry: string;
    functionalArea: string;
    rolesResponsibilities: string;
    keyAchievements: string;
  };
  itSkills: Array<{
    name: string;
    proficiency: string;
    yearsOfExperience: number;
  }>;
  currentCTC: number;
  expectedCTC: number;
  noticePeriod: string;
  resumeHeadline: string;
  profileSummary: string;
  jobPreferences: {
    jobType: string;
    department: string;
  };
  onlinePresence: {
    linkedin?: string;
  };
}

const CandidateSearch: FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: '',
    totalExperienceMin: 0,
    totalExperienceMax: 50,
    currentLocation: '',
    nationality: '',
    gender: '',
    ageMin: 18,
    ageMax: 65,
    currentCompany: '',
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

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail',
    'Consulting', 'Media & Entertainment', 'Real Estate', 'Transportation', 'Energy'
  ];

  const functionalAreas = [
    'Software Development', 'Data Science', 'Product Management', 'Marketing',
    'Sales', 'Human Resources', 'Finance', 'Operations', 'Customer Service'
  ];

  const noticePeriods = [
    'Immediate', '15 days', '30 days', '60 days', '90 days', 'Custom'
  ];

  const jobTypes = [
    'Permanent', 'Contract', 'Internship', 'Freelance'
  ];

  const skillProficiencies = [
    'Beginner', 'Intermediate', 'Expert'
  ];

  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-123-4567',
        age: 28,
        gender: 'male',
        nationality: 'American',
        currentLocation: { city: 'San Francisco', state: 'California', country: 'United States' },
        totalExperience: { years: 5, months: 3 },
        currentEmployment: {
          companyName: 'TechCorp Solutions',
          designation: 'Senior Software Engineer',
          industry: 'Technology',
          functionalArea: 'Software Development',
          rolesResponsibilities: 'Lead development of microservices architecture, mentor junior developers',
          keyAchievements: 'Reduced system downtime by 40%, improved team productivity by 25%'
        },
        itSkills: [
          { name: 'React', proficiency: 'Expert', yearsOfExperience: 4 },
          { name: 'Node.js', proficiency: 'Expert', yearsOfExperience: 3 }
        ],
        currentCTC: 120000,
        expectedCTC: 150000,
        noticePeriod: '30 days',
        resumeHeadline: 'Senior Software Engineer with 5+ years experience in Full-Stack Development',
        profileSummary: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies.',
        jobPreferences: {
          jobType: 'Permanent',
          department: 'Engineering'
        },
        onlinePresence: {
          linkedin: 'https://linkedin.com/in/johndoe'
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

    if (filters.ageMin > 18 || filters.ageMax < 65) {
      filtered = filtered.filter(candidate =>
        candidate.age >= filters.ageMin && candidate.age <= filters.ageMax
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(candidate => candidate.gender === filters.gender);
    }

    if (filters.nationality) {
      filtered = filtered.filter(candidate => candidate.nationality === filters.nationality);
    }

    if (filters.currentCompany) {
      const company = filters.currentCompany.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.currentEmployment?.companyName.toLowerCase().includes(company)
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
      nationality: '',
      gender: '',
      ageMin: 18,
      ageMax: 65,
      currentCompany: '',
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
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Mail className="w-4 h-4" />
                    </button>
                    {candidate.onlinePresence.linkedin && (
                      <a
                        href={candidate.onlinePresence.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600"
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
      </div>
    </div>
  );
};

export default CandidateSearch;
