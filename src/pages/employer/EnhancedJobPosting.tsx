import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  User,
  Building2,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Archive,
  Star,
  MessageCircle,
  Download,
  Send,
  EyeOff,
  Lock,
  Award,
  ThumbsUp,
  ThumbsDown,
  Upload,
  Camera,
  GraduationCap,
  Briefcase,
  DollarSign,
  Globe,
  BookOpen,
  Save,
  Share2,
  Settings,
  Target,
  TrendingUp,
  BarChart3,
  Users as UsersIcon,
  Eye as EyeIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  DollarSign as DollarSignIcon,
  Clock as ClockIcon,
  CheckSquare,
  Square,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Globe as GlobeIcon,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  experience: string;
  education: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  postedDate: string;
  deadline: string;
  status: 'draft' | 'active' | 'paused' | 'closed';
  platforms: string[];
  views: number;
  applications: number;
  isUrgent: boolean;
  isRemote: boolean;
  isFeatured: boolean;
}

const EnhancedJobPosting: FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'design' | 'platforms' | 'analytics'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [jobData, setJobData] = useState<JobPosting>({
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
      period: 'yearly'
    },
    experience: '5+ years',
    education: 'Bachelor\'s Degree',
    description: 'We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions and mentoring junior developers.',
    requirements: [
      '5+ years of experience in software development',
      'Strong knowledge of React, Node.js, and Python',
      'Experience with cloud platforms (AWS, Azure)',
      'Excellent problem-solving and communication skills',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    responsibilities: [
      'Design and develop scalable software solutions',
      'Collaborate with cross-functional teams',
      'Mentor junior developers',
      'Participate in code reviews',
      'Contribute to technical architecture decisions'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Professional development opportunities',
      '401(k) matching',
      'Unlimited PTO'
    ],
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    status: 'active',
    platforms: ['LinkedIn', 'Indeed', 'Glassdoor', 'Company Website'],
    views: 1247,
    applications: 89,
    isUrgent: true,
    isRemote: true,
    isFeatured: true
  });

  const jobTypes = [
    { id: 'full-time', title: 'Full Time' },
    { id: 'part-time', title: 'Part Time' },
    { id: 'contract', title: 'Contract' },
    { id: 'internship', title: 'Internship' }
  ];

  const platforms = [
    { id: 'linkedin', title: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
    { id: 'indeed', title: 'Indeed', icon: <GlobeIcon className="w-4 h-4" /> },
    { id: 'glassdoor', title: 'Glassdoor', icon: <GlobeIcon className="w-4 h-4" /> },
    { id: 'monster', title: 'Monster', icon: <GlobeIcon className="w-4 h-4" /> },
    { id: 'careerbuilder', title: 'CareerBuilder', icon: <GlobeIcon className="w-4 h-4" /> },
    { id: 'company-website', title: 'Company Website', icon: <Building2 className="w-4 h-4" /> },
    { id: 'twitter', title: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
    { id: 'facebook', title: 'Facebook', icon: <Facebook className="w-4 h-4" /> }
  ];

  const handleInputChange = (field: string, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalaryChange = (field: 'min' | 'max', value: number) => {
    setJobData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills', value: string[]) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhanced Job Posting</h1>
          <p className="text-gray-600">Design and publish professional job advertisements</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#4ebf9e] text-white rounded-lg hover:bg-[#3da88a] transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Publish Job
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Details
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'design'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Design & Content
            </button>
            <button
              onClick={() => setActiveTab('platforms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'platforms'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Platform Distribution
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Job Details Tab */}
      {activeTab === 'details' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <select
                    value={jobData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Senior Software Engineer">Senior Software Engineer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Administrative Assistant">Administrative Assistant</option>
                    <option value="Customer Service Representative">Customer Service Representative</option>
                    <option value="Sales Representative">Sales Representative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={jobData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="e.g., Tech Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={jobData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    <option value="Dar es Salaam, Tanzania">Dar es Salaam, Tanzania</option>
                    <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                    <option value="Kampala, Uganda">Kampala, Uganda</option>
                    <option value="Kigali, Rwanda">Kigali, Rwanda</option>
                    <option value="Arusha, Tanzania">Arusha, Tanzania</option>
                    <option value="Mwanza, Tanzania">Mwanza, Tanzania</option>
                    <option value="Dodoma, Tanzania">Dodoma, Tanzania</option>
                    <option value="Mombasa, Kenya">Mombasa, Kenya</option>
                    <option value="Kisumu, Kenya">Kisumu, Kenya</option>
                    <option value="Jinja, Uganda">Jinja, Uganda</option>
                    <option value="Mbale, Uganda">Mbale, Uganda</option>
                    <option value="Butare, Rwanda">Butare, Rwanda</option>
                    <option value="Gitarama, Rwanda">Gitarama, Rwanda</option>
                    <option value="Remote">Remote</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={jobData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    {jobTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required</label>
                    <input
                      type="text"
                      value={jobData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="e.g., 5+ years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      value={jobData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="e.g., Bachelor's Degree"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Salary & Benefits</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={jobData.salary.currency}
                      onChange={(e) => handleSalaryChange('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="TZS">TZS (TSh)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {jobData.salary.currency === 'USD' ? '$' : 'TSh'}
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={jobData.salary.min}
                          onChange={(e) => handleSalaryChange('min', parseInt(e.target.value) || 0)}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {jobData.salary.currency === 'USD' ? '$' : 'TSh'}
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={jobData.salary.max}
                          onChange={(e) => handleSalaryChange('max', parseInt(e.target.value) || 0)}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                  <textarea
                    rows={6}
                    value={jobData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobData.isRemote}
                      onChange={(e) => handleInputChange('isRemote', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remote Work</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobData.isUrgent}
                      onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Urgent Hiring</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={jobData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured Job</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Design & Content Tab */}
      {activeTab === 'design' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Design & Content</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Requirements */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Requirements</h3>
                <div className="space-y-2">
                  {jobData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const newReqs = [...jobData.requirements];
                          newReqs[index] = e.target.value;
                          handleArrayChange('requirements', newReqs);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newReqs = jobData.requirements.filter((_, i) => i !== index);
                          handleArrayChange('requirements', newReqs);
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newReqs = [...jobData.requirements, ''];
                      handleArrayChange('requirements', newReqs);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Requirement
                  </button>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Responsibilities</h3>
                <div className="space-y-2">
                  {jobData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => {
                          const newResps = [...jobData.responsibilities];
                          newResps[index] = e.target.value;
                          handleArrayChange('responsibilities', newResps);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newResps = jobData.responsibilities.filter((_, i) => i !== index);
                          handleArrayChange('responsibilities', newResps);
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newResps = [...jobData.responsibilities, ''];
                      handleArrayChange('responsibilities', newResps);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Responsibility
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits</h3>
                <div className="space-y-2">
                  {jobData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => {
                          const newBenefits = [...jobData.benefits];
                          newBenefits[index] = e.target.value;
                          handleArrayChange('benefits', newBenefits);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newBenefits = jobData.benefits.filter((_, i) => i !== index);
                          handleArrayChange('benefits', newBenefits);
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newBenefits = [...jobData.benefits, ''];
                      handleArrayChange('benefits', newBenefits);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Required Skills</h3>
                <div className="space-y-2">
                  {jobData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...jobData.skills];
                          newSkills[index] = e.target.value;
                          handleArrayChange('skills', newSkills);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newSkills = jobData.skills.filter((_, i) => i !== index);
                          handleArrayChange('skills', newSkills);
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newSkills = [...jobData.skills, ''];
                      handleArrayChange('skills', newSkills);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Distribution Tab */}
      {activeTab === 'platforms' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Platform Distribution</h2>
            <p className="text-gray-600 mt-1">Select platforms to publish your job posting for maximum visibility</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <label key={platform.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jobData.platforms.includes(platform.title)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newPlatforms = [...jobData.platforms, platform.title];
                        handleInputChange('platforms', newPlatforms);
                      } else {
                        const newPlatforms = jobData.platforms.filter(p => p !== platform.title);
                        handleInputChange('platforms', newPlatforms);
                      }
                    }}
                    className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />
                  <div className="ml-3 flex items-center">
                    {platform.icon}
                    <span className="ml-2 text-sm font-medium text-gray-900">{platform.title}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job Performance Analytics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Total Views</p>
                    <p className="text-2xl font-bold text-blue-900">{jobData.views.toLocaleString()}</p>
                  </div>
                  <EyeIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Applications</p>
                    <p className="text-2xl font-bold text-green-900">{jobData.applications}</p>
                  </div>
                  <UsersIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {((jobData.applications / jobData.views) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Performance</h3>
                <div className="space-y-3">
                  {jobData.platforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{platform}</span>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Job Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Posted Date</span>
                    <span className="text-sm text-gray-600">{formatDate(jobData.postedDate)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Deadline</span>
                    <span className="text-sm text-gray-600">{formatDate(jobData.deadline)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {jobData.status.charAt(0).toUpperCase() + jobData.status.slice(1)}
                    </span>
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

export default EnhancedJobPosting; 