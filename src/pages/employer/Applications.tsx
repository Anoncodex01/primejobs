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
  Video,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
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
  FileText as CVIcon,
  MessageSquare,
  Calendar as CalendarIcon,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock as ClockIcon,
  AlertTriangle,
  Info
} from 'lucide-react';

interface Application {
  id: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'reference-check' | 'hired';
  matchScore: number;
  skills: string[];
  experience: string;
  education: string;
  cvUrl: string;
  coverLetter?: string;
  interviewDate?: string;
  interviewFeedback?: string;
  evaluationScore?: number;
  referenceCheckStatus?: 'pending' | 'completed' | 'failed';
  invoiceStatus?: 'pending' | 'sent' | 'paid' | 'overdue';
  privacyLevel: 'anonymous' | 'contact-visible' | 'full-access';
}

const Applications: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);

  const applications: Application[] = [
    {
      id: '1',
      candidateFirstName: 'Sarah',
      candidateLastName: 'Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      candidatePhone: '+1 (555) 123-4567',
      jobTitle: 'Senior UI/UX Designer',
      appliedDate: '2024-01-15',
      status: 'shortlisted',
      matchScore: 92,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      experience: '5 years',
      education: 'Bachelor in Design',
      cvUrl: '/cvs/sarah-johnson-cv.pdf',
      coverLetter: 'Experienced designer passionate about creating user-centered solutions...',
      interviewDate: '2024-01-25',
      interviewFeedback: 'Strong portfolio, excellent communication skills. Recommended for next round.',
      evaluationScore: 4,
      privacyLevel: 'anonymous'
    },
    {
      id: '2',
      candidateFirstName: 'Michael',
      candidateLastName: 'Chen',
      candidateEmail: 'michael.chen@email.com',
      candidatePhone: '+1 (555) 234-5678',
      jobTitle: 'Software Engineer',
      appliedDate: '2024-01-18',
      status: 'interviewed',
      matchScore: 88,
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
      experience: '3 years',
      education: 'Computer Science',
      cvUrl: '/cvs/michael-chen-cv.pdf',
      interviewDate: '2024-01-22',
      interviewFeedback: 'Technical skills are excellent. Good problem-solving approach.',
      evaluationScore: 4,
      referenceCheckStatus: 'pending',
      privacyLevel: 'contact-visible'
    },
    {
      id: '3',
      candidateFirstName: 'Emily',
      candidateLastName: 'Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      candidatePhone: '+1 (555) 345-6789',
      jobTitle: 'Marketing Manager',
      appliedDate: '2024-01-20',
      status: 'selected',
      matchScore: 95,
      skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Social Media'],
      experience: '4 years',
      education: 'Marketing Degree',
      cvUrl: '/cvs/emily-rodriguez-cv.pdf',
      interviewDate: '2024-01-24',
      interviewFeedback: 'Outstanding candidate. Strong strategic thinking and execution skills.',
      evaluationScore: 5,
      referenceCheckStatus: 'completed',
      invoiceStatus: 'sent',
      privacyLevel: 'full-access'
    },
    {
      id: '4',
      candidateFirstName: 'David',
      candidateLastName: 'Kim',
      candidateEmail: 'david.kim@email.com',
      candidatePhone: '+1 (555) 456-7890',
      jobTitle: 'Product Manager',
      appliedDate: '2024-01-16',
      status: 'rejected',
      matchScore: 75,
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
      experience: '6 years',
      education: 'MBA',
      cvUrl: '/cvs/david-kim-cv.pdf',
      interviewDate: '2024-01-21',
      interviewFeedback: 'Good experience but not aligned with our current needs.',
      evaluationScore: 2,
      privacyLevel: 'anonymous'
    },
    {
      id: '5',
      candidateFirstName: 'Lisa',
      candidateLastName: 'Wang',
      candidateEmail: 'lisa.wang@email.com',
      candidatePhone: '+1 (555) 567-8901',
      jobTitle: 'Data Analyst',
      appliedDate: '2024-01-19',
      status: 'reference-check',
      matchScore: 90,
      skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
      experience: '2 years',
      education: 'Statistics Degree',
      cvUrl: '/cvs/lisa-wang-cv.pdf',
      interviewDate: '2024-01-23',
      interviewFeedback: 'Excellent analytical skills. Strong technical background.',
      evaluationScore: 4,
      referenceCheckStatus: 'completed',
      privacyLevel: 'contact-visible'
    },
    {
      id: '6',
      candidateFirstName: 'Alex',
      candidateLastName: 'Thompson',
      candidateEmail: 'alex.thompson@email.com',
      candidatePhone: '+1 (555) 678-9012',
      jobTitle: 'Senior UI/UX Designer',
      appliedDate: '2024-01-17',
      status: 'hired',
      matchScore: 94,
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'Design Systems'],
      experience: '7 years',
      education: 'Design Degree',
      cvUrl: '/cvs/alex-thompson-cv.pdf',
      interviewDate: '2024-01-26',
      interviewFeedback: 'Exceptional designer with strong portfolio. Perfect cultural fit.',
      evaluationScore: 5,
      referenceCheckStatus: 'completed',
      invoiceStatus: 'paid',
      privacyLevel: 'full-access'
    }
  ];

  const statuses = [
    { id: 'all', title: 'All Applications', color: 'bg-gray-100 text-gray-800' },
    { id: 'applied', title: 'Applied', color: 'bg-blue-100 text-blue-800' },
    { id: 'shortlisted', title: 'Shortlisted', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'interviewed', title: 'Interviewed', color: 'bg-purple-100 text-purple-800' },
    { id: 'selected', title: 'Selected', color: 'bg-green-100 text-green-800' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-800' },
    { id: 'reference-check', title: 'Reference Check', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'hired', title: 'Hired', color: 'bg-emerald-100 text-emerald-800' }
  ];

  const jobs = [
    { id: 'all', title: 'All Jobs' },
    { id: 'designer', title: 'Senior UI/UX Designer' },
    { id: 'engineer', title: 'Software Engineer' },
    { id: 'marketing', title: 'Marketing Manager' },
    { id: 'product', title: 'Product Manager' },
    { id: 'analyst', title: 'Data Analyst' }
  ];

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <FileText className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckSquare className="w-4 h-4" />;
      case 'interviewed':
        return <CalendarIcon className="w-4 h-4" />;
      case 'selected':
        return <ThumbsUp className="w-4 h-4" />;
      case 'rejected':
        return <ThumbsDown className="w-4 h-4" />;
      case 'reference-check':
        return <Shield className="w-4 h-4" />;
      case 'hired':
        return <Award className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPrivacyIcon = (level: string) => {
    switch (level) {
      case 'anonymous':
        return <EyeOff className="w-4 h-4" />;
      case 'contact-visible':
        return <Eye className="w-4 h-4" />;
      case 'full-access':
        return <Lock className="w-4 h-4" />;
      default:
        return <EyeOff className="w-4 h-4" />;
    }
  };

  const getPrivacyLabel = (level: string) => {
    switch (level) {
      case 'anonymous':
        return 'Anonymous CV';
      case 'contact-visible':
        return 'Contact Visible';
      case 'full-access':
        return 'Full Access';
      default:
        return 'Anonymous CV';
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
    const matchesJob = selectedJob === 'all' || application.jobTitle.toLowerCase().includes(selectedJob);
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const stats = [
    { title: 'Total Applications', value: applications.length, icon: <FileText className="w-5 h-5" />, color: 'bg-blue-500' },
    { title: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, icon: <CheckSquare className="w-5 h-5" />, color: 'bg-yellow-500' },
    { title: 'Interviewed', value: applications.filter(a => a.status === 'interviewed').length, icon: <CalendarIcon className="w-5 h-5" />, color: 'bg-purple-500' },
    { title: 'Hired', value: applications.filter(a => a.status === 'hired').length, icon: <Award className="w-5 h-5" />, color: 'bg-emerald-500' }
  ];

  const handleSelectApplication = (id: string) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedApplications(prev => 
      prev.length === filteredApplications.length 
        ? []
        : filteredApplications.map(app => app.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRatingStars = (score?: number) => {
    if (!score) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setShowContactInfo(true);
  };

  const handleEvaluateCandidate = (application: Application) => {
    setSelectedApplication(application);
    setShowEvaluationForm(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Manage candidate applications and CVs with privacy protection</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Email
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Privacy Protection Active</h3>
            <p className="text-sm text-blue-700">
              CVs are displayed with first names only for privacy. Contact details are hidden until you request access. 
              All applications are processed automatically with email notifications.
            </p>
          </div>
        </div>
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
                placeholder="Search candidates, jobs, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
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
              <option value="match">Best Match</option>
              <option value="name">Name A-Z</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <span className="text-sm text-gray-500">
                {filteredApplications.length} applications
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
                <Building2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Applications */}
        <>
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(application.id)}
                    onChange={() => handleSelectApplication(application.id)}
                    className="mt-1 rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />

                  {/* Privacy Level Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#114373] to-[#4ebf9e] rounded-lg flex items-center justify-center text-white">
                    {getPrivacyIcon(application.privacyLevel)}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {application.candidateFirstName} {application.privacyLevel === 'anonymous' ? '***' : application.candidateLastName}
                        </h3>
                        <p className="text-[#114373] font-medium mb-1">{application.jobTitle}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied {formatDate(application.appliedDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {application.experience} experience
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            {getPrivacyLabel(application.privacyLevel)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {application.matchScore}% match
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {application.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {application.skills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            +{application.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interview Details */}
                    {application.interviewDate && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CalendarIcon className="w-4 h-4" />
                          Interviewed on {formatDate(application.interviewDate)}
                          {application.evaluationScore && (
                            <div className="flex items-center gap-1 ml-2">
                              {getRatingStars(application.evaluationScore)}
                            </div>
                          )}
                        </div>
                        {application.interviewFeedback && (
                          <p className="text-sm text-blue-600 mt-1">{application.interviewFeedback}</p>
                        )}
                      </div>
                    )}

                    {/* Reference Check Status */}
                    {application.referenceCheckStatus && (
                      <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-indigo-700">
                          <Shield className="w-4 h-4" />
                          Reference Check: {application.referenceCheckStatus.charAt(0).toUpperCase() + application.referenceCheckStatus.slice(1)}
                        </div>
                      </div>
                    )}

                    {/* Invoice Status */}
                    {application.invoiceStatus && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <FileText className="w-4 h-4" />
                          Invoice: {application.invoiceStatus.charAt(0).toUpperCase() + application.invoiceStatus.slice(1)}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {application.privacyLevel !== 'anonymous' && (
                          <>
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {application.candidateEmail}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {application.candidatePhone}
                            </div>
                          </>
                        )}
                        {application.privacyLevel === 'anonymous' && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <EyeOff className="w-4 h-4" />
                            Contact details hidden for privacy
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewApplication(application)}
                          className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View CV
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                        {application.status === 'interviewed' && (
                          <button 
                            onClick={() => handleEvaluateCandidate(application)}
                            className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Evaluate
                          </button>
                        )}
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact
                        </button>
                        <button className="px-3 py-1 bg-[#114373] text-white rounded hover:bg-[#0d3559] text-sm font-medium">
                          <Send className="w-4 h-4 mr-1" />
                          Shortlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later</p>
            </div>
          )}
        </>

        {/* Privacy Information Modal */}
        {showContactInfo && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <button 
                  onClick={() => setShowContactInfo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{selectedApplication.candidateFirstName} {selectedApplication.candidateLastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedApplication.candidateEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{selectedApplication.candidatePhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium">{selectedApplication.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Education</p>
                  <p className="font-medium">{selectedApplication.education}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </button>
                <button className="flex-1 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Evaluation Form Modal */}
        {showEvaluationForm && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Candidate Evaluation Form</h3>
                <button 
                  onClick={() => setShowEvaluationForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Candidate</p>
                  <p className="font-medium">{selectedApplication.candidateFirstName} {selectedApplication.candidateLastName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Position</p>
                  <p className="font-medium">{selectedApplication.jobTitle}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Interview Date</p>
                  <p className="font-medium">{selectedApplication.interviewDate ? formatDate(selectedApplication.interviewDate) : 'Not scheduled'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Evaluation Score</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-2xl text-gray-300 hover:text-yellow-400">
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Feedback</label>
                  <textarea 
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Provide detailed feedback about the candidate's performance..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                  <div className="flex gap-3">
                    <label className="flex items-center">
                      <input type="radio" name="decision" value="selected" className="mr-2" />
                      <span>Selected</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="decision" value="rejected" className="mr-2" />
                      <span>Rejected</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="decision" value="shortlisted" className="mr-2" />
                      <span>Shortlisted for another round</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Any additional notes or recommendations..."
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="flex-1 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]">
                  Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications; 