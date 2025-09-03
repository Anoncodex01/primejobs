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
  TrendingUp,
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
  Shield,
  CheckSquare,
  Square,
  MessageSquare,
  Calendar as CalendarIcon,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock as ClockIcon,
  AlertTriangle,
  Info,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  status: 'active' | 'pending' | 'draft' | 'expired' | 'paused';
  postedDate: string;
  deadline: string;
  applicants: number;
  views: number;
  description: string;
  requirements: string[];
  workModel: string;
  experience: string;
  education: string;
}

const JobPostings: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'Senior UI/UX Designer',
      company: 'Apple Inc.',
      location: 'Remote',
      jobType: 'Full-Time',
      salary: '$80,000 - $120,000',
      status: 'active',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      applicants: 24,
      views: 156,
      description: 'We are looking for a talented Senior UI/UX Designer to join our creative team...',
      requirements: ['5+ years experience', 'Figma proficiency', 'Portfolio required'],
      workModel: 'Remote',
      experience: '5+ years',
      education: 'Bachelor\'s degree'
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Apple Inc.',
      location: 'San Francisco, CA',
      jobType: 'Full-Time',
      salary: '$90,000 - $130,000',
      status: 'pending',
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      applicants: 18,
      views: 89,
      description: 'Join our engineering team to build scalable applications...',
      requirements: ['3+ years experience', 'React/Node.js', 'AWS knowledge'],
      workModel: 'Hybrid',
      experience: '3+ years',
      education: 'Computer Science degree'
    },
    {
      id: '3',
      title: 'Marketing Manager',
      company: 'Apple Inc.',
      location: 'New York, NY',
      jobType: 'Full-Time',
      salary: '$70,000 - $100,000',
      status: 'draft',
      postedDate: '2024-01-25',
      deadline: '2024-02-25',
      applicants: 0,
      views: 0,
      description: 'Lead our marketing initiatives and drive brand awareness...',
      requirements: ['5+ years experience', 'Digital marketing', 'Analytics skills'],
      workModel: 'On-site',
      experience: '5+ years',
      education: 'Marketing degree'
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'Apple Inc.',
      location: 'Austin, TX',
      jobType: 'Contract',
      salary: '$60,000 - $85,000',
      status: 'expired',
      postedDate: '2023-12-01',
      deadline: '2024-01-01',
      applicants: 12,
      views: 67,
      description: 'Analyze data and provide insights to drive business decisions...',
      requirements: ['2+ years experience', 'SQL/Python', 'Statistical analysis'],
      workModel: 'Remote',
      experience: '2+ years',
      education: 'Statistics/Data Science'
    },
    {
      id: '5',
      title: 'Product Manager',
      company: 'Apple Inc.',
      location: 'Cupertino, CA',
      jobType: 'Full-Time',
      salary: '$100,000 - $150,000',
      status: 'paused',
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      applicants: 8,
      views: 45,
      description: 'Lead product strategy and development for our core products...',
      requirements: ['7+ years experience', 'Product strategy', 'User research'],
      workModel: 'On-site',
      experience: '7+ years',
      education: 'Business/Engineering degree'
    }
  ];

  const jobTypes = [
    { id: 'all', title: 'All Types' },
    { id: 'full-time', title: 'Full-Time' },
    { id: 'part-time', title: 'Part-Time' },
    { id: 'contract', title: 'Contract' },
    { id: 'internship', title: 'Internship' }
  ];

  const statuses = [
    { id: 'all', title: 'All Status', color: 'bg-gray-100 text-gray-800' },
    { id: 'active', title: 'Active', color: 'bg-green-100 text-green-800' },
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'draft', title: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { id: 'expired', title: 'Expired', color: 'bg-red-100 text-red-800' },
    { id: 'paused', title: 'Paused', color: 'bg-blue-100 text-blue-800' }
  ];

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'expired':
        return <XCircle className="w-4 h-4" />;
      case 'paused':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesJobType = selectedJobType === 'all' || job.jobType.toLowerCase() === selectedJobType;
    
    return matchesSearch && matchesStatus && matchesJobType;
  });

  const stats = [
    { title: 'Total Jobs', value: jobPostings.length, icon: <FileText className="w-5 h-5" />, color: 'bg-blue-500' },
    { title: 'Active Jobs', value: jobPostings.filter(j => j.status === 'active').length, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-green-500' },
    { title: 'Total Applicants', value: jobPostings.reduce((sum, job) => sum + job.applicants, 0), icon: <Users className="w-5 h-5" />, color: 'bg-purple-500' },
    { title: 'Total Views', value: jobPostings.reduce((sum, job) => sum + job.views, 0), icon: <Eye className="w-5 h-5" />, color: 'bg-indigo-500' }
  ];

  const handleSelectJob = (id: string) => {
    setSelectedJobs(prev => 
      prev.includes(id) 
        ? prev.filter(jobId => jobId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(prev => 
      prev.length === filteredJobs.length 
        ? []
        : filteredJobs.map(job => job.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600">Manage and track your job postings</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/employer/job/create"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search job titles or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type.id} value={type.id}>{type.title}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.title}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="applicants">Most Applicants</option>
              <option value="views">Most Views</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Postings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <span className="text-sm text-gray-500">
                {filteredJobs.length} job postings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#114373] text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#114373] text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Job Postings */}
        <>
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleSelectJob(job.id)}
                    className="mt-1 rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />

                  {/* Job Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#114373] to-[#4ebf9e] rounded-lg flex items-center justify-center text-white">
                    <FileText className="w-6 h-6" />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Posted {formatDate(job.postedDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(job.status)}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </div>
                        </span>
                        <div className="relative">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          {/* Dropdown Menu */}
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px] hidden group-hover:block">
                            <div className="p-1">
                              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              {job.status === 'active' && (
                                <>
                                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    Edit Job
                                  </button>
                                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                    Remove Job
                                  </button>
                                </>
                              )}
                              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2">
                                <Copy className="w-4 h-4" />
                                Duplicate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#114373]">{job.applicants}</p>
                        <p className="text-xs text-gray-500">Applicants</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700">{job.views}</p>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700">{job.jobType}</p>
                        <p className="text-xs text-gray-500">Job Type</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700">{getDaysRemaining(job.deadline)}</p>
                        <p className="text-xs text-gray-500">Days Left</p>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.workModel}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Deadline: {formatDate(job.deadline)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Copy className="w-4 h-4 mr-1" />
                          Duplicate
                        </button>
                        <button className="px-3 py-1 bg-[#114373] text-white rounded hover:bg-[#0d3559] text-sm font-medium">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Applications
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new job posting</p>
              <Link
                to="/employer/job/create"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post New Job
              </Link>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default JobPostings; 