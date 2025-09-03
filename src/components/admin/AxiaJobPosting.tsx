import React, { FC, useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  GraduationCap,
  Briefcase,
  Users,
  Target,
  Star,
  Save,
  Send,
  Copy,
  Download,
  Upload,
  Image,
  Sparkles,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  RefreshCw,
  FileText,
  ExternalLink,
  X
} from 'lucide-react';
import { getAllJobTitles, getJobCategories, getJobTitlesByCategory } from '../../utils/jobData';
import { getAllCountries, getRegionsByCountry, getCitiesByRegion } from '../../utils/globalData';

interface JobPosting {
  id: string;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string;
  skillsNeeded: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
    currency: 'TZS' | 'USD';
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: string;
  educationLevel: string;
  postedDate: string;
  lastDateToApply: string;
  status: 'draft' | 'pending' | 'approved' | 'published' | 'expired' | 'closed';
  employerId?: string;
  employerName?: string;
  isExternal: boolean;
  applicationCount: number;
  shortlistedCount: number;
  aiEnhanced: boolean;
  aiGeneratedImages: string[];
  adminNotes: string;
  approvalDate?: string;
  approvedBy?: string;
}

interface AxiaJobPostingProps {
  onJobPosted: (job: JobPosting) => void;
  onJobUpdated: (job: JobPosting) => void;
  onJobDeleted: (jobId: string) => void;
}

const AxiaJobPosting: FC<AxiaJobPostingProps> = ({
  onJobPosted,
  onJobUpdated,
  onJobDeleted
}) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showAIEnhancement, setShowAIEnhancement] = useState(false);

  // Form states
  const [formData, setFormData] = useState<Partial<JobPosting>>({
    jobTitle: '',
    jobDescription: '',
    jobRequirements: '',
    skillsNeeded: [],
    location: '',
    salaryRange: { min: 0, max: 0, currency: 'TZS' },
    employmentType: 'full-time',
    experienceLevel: '',
    educationLevel: '',
    lastDateToApply: '',
    isExternal: false,
    employerId: '',
    employerName: '',
    aiEnhanced: false,
    aiGeneratedImages: [],
    adminNotes: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Options
  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7-10 years)' },
    { value: 'lead', label: 'Lead (10+ years)' }
  ];

  const educationLevelOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'certification', label: 'Professional Certification' }
  ];

  const currencyOptions = [
    { value: 'TZS', label: 'Tanzanian Shilling (TZS)' },
    { value: 'USD', label: 'US Dollar (USD)' }
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    // Mock data - replace with API call
    setJobs([
      {
        id: '1',
        jobTitle: 'Senior Software Engineer',
        jobDescription: 'We are looking for a Senior Software Engineer...',
        jobRequirements: '5+ years of experience in software development...',
        skillsNeeded: ['React', 'Node.js', 'Python', 'AWS'],
        location: 'Dar es Salaam, Tanzania',
        salaryRange: { min: 5000000, max: 8000000, currency: 'TZS' },
        employmentType: 'full-time',
        experienceLevel: 'senior',
        educationLevel: 'bachelor',
        postedDate: '2024-01-15',
        lastDateToApply: '2024-02-15',
        status: 'published',
        isExternal: false,
        applicationCount: 25,
        shortlistedCount: 8,
        aiEnhanced: true,
        aiGeneratedImages: ['image1.jpg', 'image2.jpg'],
        adminNotes: 'Approved for publication'
      }
    ]);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skillsNeeded?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsNeeded: [...(prev.skillsNeeded || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded?.filter(s => s !== skill) || []
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const jobData: JobPosting = {
        id: editingJob?.id || Date.now().toString(),
        ...formData,
        postedDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        applicationCount: 0,
        shortlistedCount: 0,
        aiGeneratedImages: formData.aiGeneratedImages || [],
        adminNotes: formData.adminNotes || ''
      } as JobPosting;

      if (editingJob) {
        onJobUpdated(jobData);
        setJobs(prev => prev.map(job => job.id === jobData.id ? jobData : job));
      } else {
        onJobPosted(jobData);
        setJobs(prev => [...prev, jobData]);
      }

      setShowCreateForm(false);
      setEditingJob(null);
      setCurrentStep(1);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        jobRequirements: '',
        skillsNeeded: [],
        location: '',
        salaryRange: { min: 0, max: 0, currency: 'TZS' },
        employmentType: 'full-time',
        experienceLevel: '',
        educationLevel: '',
        lastDateToApply: '',
        isExternal: false,
        employerId: '',
        employerName: '',
        aiEnhanced: false,
        aiGeneratedImages: [],
        adminNotes: ''
      });
    } catch (error) {
      console.error('Failed to save job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setFormData(job);
    setShowCreateForm(true);
    setCurrentStep(1);
  };

  const handleDelete = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      onJobDeleted(jobId);
      setJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  const handleApprove = (job: JobPosting) => {
    const updatedJob = {
      ...job,
      status: 'approved' as const,
      approvalDate: new Date().toISOString().split('T')[0],
      approvedBy: 'Admin User' // Get from context
    };
    onJobUpdated(updatedJob);
    setJobs(prev => prev.map(j => j.id === job.id ? updatedJob : j));
  };

  const handlePublish = (job: JobPosting) => {
    const updatedJob = {
      ...job,
      status: 'published' as const
    };
    onJobUpdated(updatedJob);
    setJobs(prev => prev.map(j => j.id === job.id ? updatedJob : j));
  };

  const handleClose = (job: JobPosting) => {
    const updatedJob = {
      ...job,
      status: 'closed' as const
    };
    onJobUpdated(updatedJob);
    setJobs(prev => prev.map(j => j.id === job.id ? updatedJob : j));
  };

  const handleAIEnhancement = async () => {
    setIsLoading(true);
    try {
      // Mock AI enhancement - replace with actual AI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData(prev => ({
        ...prev,
        aiEnhanced: true,
        aiGeneratedImages: ['ai-enhanced-1.jpg', 'ai-enhanced-2.jpg'],
        jobDescription: prev.jobDescription + '\n\n[AI Enhanced: Added relevant industry context and improved readability]'
      }));
      
      setShowAIEnhancement(false);
    } catch (error) {
      console.error('AI enhancement failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Axia Job Posting Management</h1>
          <p className="text-gray-600">Create, manage, and approve job postings for internal and external employers</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Job Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="published">Published</option>
            <option value="expired">Expired</option>
            <option value="closed">Closed</option>
          </select>
          <button
            onClick={loadJobs}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Job Postings ({filteredJobs.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(job.status)}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </div>
                    </span>
                    {job.aiEnhanced && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Enhanced
                        </div>
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.employmentType}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {job.experienceLevel}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {job.educationLevel}
                    </div>
                  </div>

                  {job.salaryRange.min > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <DollarSign className="w-4 h-4" />
                      {job.salaryRange.currency === 'TZS' 
                        ? `TZS ${job.salaryRange.min.toLocaleString('en-TZ')} - ${job.salaryRange.max.toLocaleString('en-TZ')}`
                        : `USD ${job.salaryRange.min.toLocaleString('en-US')} - ${job.salaryRange.max.toLocaleString('en-US')}`
                      }
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Deadline: {new Date(job.lastDateToApply).toLocaleDateString()}
                    </div>
                    {job.isExternal && (
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.employerName}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applicationCount} Applications
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {job.shortlistedCount} Shortlisted
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  {job.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(job)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}
                  
                  {job.status === 'approved' && (
                    <button
                      onClick={() => handlePublish(job)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Publish
                    </button>
                  )}
                  
                  {job.status === 'published' && (
                    <button
                      onClick={() => handleClose(job)}
                      className="px-3 py-1 text-xs font-medium text-white bg-gray-600 rounded hover:bg-gray-700"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Job Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                  </h3>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          placeholder="e.g., Senior Software Engineer"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="e.g., Dar es Salaam, Tanzania"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employment Type *
                        </label>
                        <select
                          value={formData.employmentType}
                          onChange={(e) => handleInputChange('employmentType', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {employmentTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Level
                        </label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Experience Level</option>
                          {experienceLevelOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Education Level
                        </label>
                        <select
                          value={formData.educationLevel}
                          onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Education Level</option>
                          {educationLevelOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Date to Apply *
                        </label>
                        <input
                          type="date"
                          value={formData.lastDateToApply}
                          onChange={(e) => handleInputChange('lastDateToApply', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.isExternal}
                            onChange={(e) => handleInputChange('isExternal', e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">External Employer Job</span>
                        </label>
                      </div>
                    </div>

                    {formData.isExternal && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employer ID
                          </label>
                          <input
                            type="text"
                            value={formData.employerId}
                            onChange={(e) => handleInputChange('employerId', e.target.value)}
                            placeholder="Employer ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employer Name
                          </label>
                          <input
                            type="text"
                            value={formData.employerName}
                            onChange={(e) => handleInputChange('employerName', e.target.value)}
                            placeholder="Employer Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Job Description & Requirements</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description *
                      </label>
                      <textarea
                        value={formData.jobDescription}
                        onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                        rows={6}
                        placeholder="Provide a detailed description of the role, responsibilities, and what the candidate will be doing..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Requirements *
                      </label>
                      <textarea
                        value={formData.jobRequirements}
                        onChange={(e) => handleInputChange('jobRequirements', e.target.value)}
                        rows={4}
                        placeholder="List the specific requirements, qualifications, and experience needed..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills Needed
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleSkillAdd}
                          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.skillsNeeded?.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                            <button
                              onClick={() => handleSkillRemove(skill)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Salary & Compensation</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={formData.salaryRange?.currency}
                          onChange={(e) => handleInputChange('salaryRange', {
                            ...formData.salaryRange,
                            currency: e.target.value as 'TZS' | 'USD'
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {currencyOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Salary
                        </label>
                        <input
                          type="number"
                          value={formData.salaryRange?.min || ''}
                          onChange={(e) => handleInputChange('salaryRange', {
                            ...formData.salaryRange,
                            min: Number(e.target.value)
                          })}
                          placeholder="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Salary
                        </label>
                        <input
                          type="number"
                          value={formData.salaryRange?.max || ''}
                          onChange={(e) => handleInputChange('salaryRange', {
                            ...formData.salaryRange,
                            max: Number(e.target.value)
                          })}
                          placeholder="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Salary Information</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Salary range is optional. You can leave these fields empty if you prefer not to disclose salary information.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Review & AI Enhancement</h4>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Job Summary</h5>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div><strong>Title:</strong> {formData.jobTitle}</div>
                        <div><strong>Location:</strong> {formData.location}</div>
                        <div><strong>Type:</strong> {formData.employmentType}</div>
                        <div><strong>Experience:</strong> {formData.experienceLevel}</div>
                        <div><strong>Education:</strong> {formData.educationLevel}</div>
                        <div><strong>Deadline:</strong> {formData.lastDateToApply}</div>
                        {formData.salaryRange?.min > 0 && (
                          <div><strong>Salary:</strong> {formData.salaryRange.currency} {formData.salaryRange.min} - {formData.salaryRange.max}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes
                      </label>
                      <textarea
                        value={formData.adminNotes}
                        onChange={(e) => handleInputChange('adminNotes', e.target.value)}
                        rows={3}
                        placeholder="Any internal notes or comments about this job posting..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">AI Enhancement</span>
                      </div>
                      <p className="text-sm text-purple-800 mb-3">
                        Use AI to enhance your job posting with relevant images and improved content.
                      </p>
                      <button
                        onClick={handleAIEnhancement}
                        disabled={isLoading || formData.aiEnhanced}
                        className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        {formData.aiEnhanced ? 'AI Enhanced' : 'Enhance with AI'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {currentStep < 4 ? (
                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {isLoading ? 'Saving...' : 'Save Job Posting'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AxiaJobPosting;
