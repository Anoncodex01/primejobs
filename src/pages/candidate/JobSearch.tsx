import React, { FC, useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Building,
  GraduationCap,
  Calendar,
  Globe,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Sliders,
  RefreshCw,
  Eye,
  Bookmark,
  Share2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface JobFilters {
  keywords: string;
  location: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  jobType: string[];
  industry: string;
  functionalArea: string;
  education: string;
  roleLevel: string;
  companyType: string;
  postedDate: string;
  remoteWork: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  jobType: string;
  experience: string;
  industry: string;
  functionalArea: string;
  education: string;
  roleLevel: string;
  companyType: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isBookmarked: boolean;
  isApplied: boolean;
}

const JobSearch: FC = () => {
  const [filters, setFilters] = useState<JobFilters>({
    keywords: '',
    location: '',
    experience: '',
    salaryMin: 0,
    salaryMax: 100000,
    jobType: [],
    industry: '',
    functionalArea: '',
    education: '',
    roleLevel: '',
    companyType: '',
    postedDate: '',
    remoteWork: false
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter options
  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const industryOptions = [
    'Information Technology',
    'Finance & Banking',
    'Healthcare',
    'Manufacturing',
    'Retail & E-commerce',
    'Education',
    'Consulting',
    'Media & Entertainment',
    'Real Estate',
    'Transportation & Logistics',
    'Energy & Utilities',
    'Government & Public Sector',
    'Non-profit',
    'Other'
  ];

  const functionalAreaOptions = [
    'Human Resources',
    'Marketing & Sales',
    'Operations',
    'Engineering',
    'Finance & Accounting',
    'Customer Service',
    'Research & Development',
    'Quality Assurance',
    'Project Management',
    'Legal',
    'Administration',
    'Other'
  ];

  const educationOptions = [
    'High School',
    'Diploma',
    'Graduate',
    'Postgraduate',
    'MBA',
    'PhD',
    'Any'
  ];

  const roleLevelOptions = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Manager',
    'Director',
    'Executive',
    'C-Level'
  ];

  const companyTypeOptions = [
    'Startup',
    'MNC',
    'Private Limited',
    'Public Limited',
    'Government',
    'PSU',
    'NGO',
    'Other'
  ];

  const postedDateOptions = [
    { value: '24h', label: 'Last 24 hours' },
    { value: '3d', label: 'Last 3 days' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'all', label: 'All time' }
  ];

  useEffect(() => {
    // Mock job data
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        isRemote: true,
        salary: { min: 120000, max: 180000, currency: 'USD' },
        jobType: 'full-time',
        experience: '5+',
        industry: 'Information Technology',
        functionalArea: 'Engineering',
        education: 'Graduate',
        roleLevel: 'Senior Level',
        companyType: 'MNC',
        postedDate: '2024-01-15',
        description: 'We are looking for a Senior Software Engineer to join our team...',
        requirements: [
          '5+ years of experience in software development',
          'Strong knowledge of React, Node.js, and cloud technologies',
          'Experience with microservices architecture',
          'Excellent problem-solving skills'
        ],
        benefits: [
          'Competitive salary and benefits',
          'Remote work options',
          'Health insurance',
          'Professional development opportunities'
        ],
        isBookmarked: false,
        isApplied: false
      },
      {
        id: '2',
        title: 'HR Manager',
        company: 'InnovateTech Inc',
        location: 'New York, NY',
        isRemote: false,
        salary: { min: 80000, max: 120000, currency: 'USD' },
        jobType: 'full-time',
        experience: '3-5',
        industry: 'Information Technology',
        functionalArea: 'Human Resources',
        education: 'Postgraduate',
        roleLevel: 'Manager',
        companyType: 'Startup',
        postedDate: '2024-01-14',
        description: 'Join our growing HR team as an HR Manager...',
        requirements: [
          '3-5 years of HR experience',
          'Knowledge of employment laws and regulations',
          'Strong communication and interpersonal skills',
          'Experience with HRIS systems'
        ],
        benefits: [
          'Competitive salary',
          'Health and dental insurance',
          'Flexible work arrangements',
          'Career growth opportunities'
        ],
        isBookmarked: true,
        isApplied: false
      }
    ];

    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  const handleFilterChange = (field: keyof JobFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleJobType = (jobType: string) => {
    setFilters(prev => ({
      ...prev,
      jobType: prev.jobType.includes(jobType)
        ? prev.jobType.filter(type => type !== jobType)
        : [...prev.jobType, jobType]
    }));
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...jobs];

      if (filters.keywords) {
        const keywords = filters.keywords.toLowerCase();
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(keywords) ||
          job.company.toLowerCase().includes(keywords) ||
          job.description.toLowerCase().includes(keywords)
        );
      }

      if (filters.location) {
        const location = filters.location.toLowerCase();
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(location)
        );
      }

      if (filters.experience) {
        filtered = filtered.filter(job => job.experience === filters.experience);
      }

      if (filters.jobType.length > 0) {
        filtered = filtered.filter(job => filters.jobType.includes(job.jobType));
      }

      if (filters.industry) {
        filtered = filtered.filter(job => job.industry === filters.industry);
      }

      if (filters.functionalArea) {
        filtered = filtered.filter(job => job.functionalArea === filters.functionalArea);
      }

      if (filters.education) {
        filtered = filtered.filter(job => job.education === filters.education);
      }

      if (filters.roleLevel) {
        filtered = filtered.filter(job => job.roleLevel === filters.roleLevel);
      }

      if (filters.companyType) {
        filtered = filtered.filter(job => job.companyType === filters.companyType);
      }

      if (filters.remoteWork) {
        filtered = filtered.filter(job => job.isRemote);
      }

      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setFilters({
      keywords: '',
      location: '',
      experience: '',
      salaryMin: 0,
      salaryMax: 100000,
      jobType: [],
      industry: '',
      functionalArea: '',
      education: '',
      roleLevel: '',
      companyType: '',
      postedDate: '',
      remoteWork: false
    });
    setFilteredJobs(jobs);
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
          <p className="text-gray-600 mt-2">Search through thousands of job opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords / Job Title</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.keywords}
                  onChange={(e) => handleFilterChange('keywords', e.target.value)}
                  placeholder="e.g., Software Engineer, HR Manager"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="City, State, or Remote"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="">Any Experience</option>
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={applyFilters}
                className="w-full bg-[#114373] text-white py-2 px-4 rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Sliders className="w-4 h-4" />
            {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range (USD)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.salaryMin}
                    onChange={(e) => handleFilterChange('salaryMin', parseInt(e.target.value) || 0)}
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                  />
                  <input
                    type="number"
                    value={filters.salaryMax}
                    onChange={(e) => handleFilterChange('salaryMax', parseInt(e.target.value) || 100000)}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <div className="space-y-2">
                  {jobTypeOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(option.value)}
                        onChange={() => toggleJobType(option.value)}
                        className="text-[#114373] focus:ring-[#114373]"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Industry</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Functional Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Functional Area</label>
                <select
                  value={filters.functionalArea}
                  onChange={(e) => handleFilterChange('functionalArea', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Functional Area</option>
                  {functionalAreaOptions.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <select
                  value={filters.education}
                  onChange={(e) => handleFilterChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Education</option>
                  {educationOptions.map(education => (
                    <option key={education} value={education}>{education}</option>
                  ))}
                </select>
              </div>

              {/* Role Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Level</label>
                <select
                  value={filters.roleLevel}
                  onChange={(e) => handleFilterChange('roleLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Level</option>
                  {roleLevelOptions.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Company Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                <select
                  value={filters.companyType}
                  onChange={(e) => handleFilterChange('companyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Company Type</option>
                  {companyTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Posted Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posted Date</label>
                <select
                  value={filters.postedDate}
                  onChange={(e) => handleFilterChange('postedDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="">Any Time</option>
                  {postedDateOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Remote Work */}
              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.remoteWork}
                    onChange={(e) => handleFilterChange('remoteWork', e.target.checked)}
                    className="text-[#114373] focus:ring-[#114373]"
                  />
                  <span className="text-sm font-medium text-gray-700">Remote Work Only</span>
                </label>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {filteredJobs.length} jobs found
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear All
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#114373] mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching for jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      {job.isRemote && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          <Globe className="w-3 h-3" />
                          Remote
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.jobType}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getTimeAgo(job.postedDate)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {formatSalary(job.salary)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {job.experience} years
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {job.education}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{job.industry}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{job.functionalArea}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{job.roleLevel}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{job.companyType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        // Toggle bookmark functionality
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Add to bookmarks"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600" title="Share job">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] font-medium">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
