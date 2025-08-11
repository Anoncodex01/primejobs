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
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  CheckSquare,
  Square,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Bell,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Settings,
  Share2
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  lastUpdated: string;
}

const Applications: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      appliedDate: '2024-01-15',
      status: 'applied',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      jobType: 'Full-time',
      experience: '5+ years',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'Startup Inc',
      appliedDate: '2024-01-20',
      status: 'shortlisted',
      location: 'Remote',
      salary: '$80k - $110k',
      jobType: 'Full-time',
      experience: '3+ years',
      lastUpdated: '2024-01-22'
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'Digital Agency',
      appliedDate: '2024-01-25',
      status: 'interviewed',
      location: 'New York, NY',
      salary: '$85k - $115k',
      jobType: 'Full-time',
      experience: '4+ years',
      lastUpdated: '2024-01-28'
    },
    {
      id: '4',
      jobTitle: 'Frontend Developer',
      company: 'E-commerce Platform',
      appliedDate: '2024-01-30',
      status: 'selected',
      location: 'Austin, TX',
      salary: '$75k - $100k',
      jobType: 'Full-time',
      experience: '2+ years',
      lastUpdated: '2024-02-01'
    },
    {
      id: '5',
      jobTitle: 'Backend Engineer',
      company: 'FinTech Solutions',
      appliedDate: '2024-02-05',
      status: 'rejected',
      location: 'Boston, MA',
      salary: '$95k - $130k',
      jobType: 'Full-time',
      experience: '6+ years',
      lastUpdated: '2024-02-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'selected':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <FileText className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckSquare className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <ThumbsUp className="w-4 h-4" />;
      case 'rejected':
        return <ThumbsDown className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    }
    if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Track all your job applications and their status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="company">Sort by Company</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({sortedApplications.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {sortedApplications.length} of {applications.length} applications</span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sortedApplications.map((application) => (
            <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.jobTitle}
                      </h3>
                      <p className="text-[#114373] font-medium mb-2">{application.company}</p>
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
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {application.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {application.jobType}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {application.experience}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>Applied: {formatDate(application.appliedDate)}</span>
                    <span>Updated: {formatDate(application.lastUpdated)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm">
                  <Eye className="w-4 h-4" />
                  View Job
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <Star className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sortedApplications.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
              Browse Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications; 