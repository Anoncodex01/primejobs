import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Download,
  Upload,
  Star,
  Briefcase,
  DollarSign,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Video,
  ExternalLink
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  companyName: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  interviewDate: string;
  interviewTime: string;
  duration: string;
  type: 'phone' | 'video' | 'onsite';
  interviewer: string;
  location: string;
  notes: string;
  feedback?: string;
  rating?: number;
}

const Interviews: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([]);

  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Corp',
      status: 'scheduled',
      interviewDate: '2024-02-15',
      interviewTime: '10:00 AM',
      duration: '1 hour',
      type: 'video',
      interviewer: 'Sarah Johnson',
      location: 'Zoom Meeting',
      notes: 'Technical interview focusing on React and Node.js'
    },
    {
      id: '2',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@email.com',
      jobTitle: 'Full Stack Developer',
      companyName: 'Startup Inc',
      status: 'completed',
      interviewDate: '2024-02-10',
      interviewTime: '2:00 PM',
      duration: '1.5 hours',
      type: 'onsite',
      interviewer: 'Mike Chen',
      location: 'New York Office',
      notes: 'Great technical skills, good communication',
      feedback: 'Excellent problem-solving abilities',
      rating: 4.5
    },
    {
      id: '3',
      candidateName: 'Mike Chen',
      candidateEmail: 'mike.chen@email.com',
      jobTitle: 'React Developer',
      companyName: 'Digital Agency',
      status: 'cancelled',
      interviewDate: '2024-02-12',
      interviewTime: '11:00 AM',
      duration: '1 hour',
      type: 'phone',
      interviewer: 'Emily Rodriguez',
      location: 'Phone Call',
      notes: 'Candidate requested reschedule'
    },
    {
      id: '4',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.r@email.com',
      jobTitle: 'Frontend Developer',
      companyName: 'E-commerce Platform',
      status: 'rescheduled',
      interviewDate: '2024-02-18',
      interviewTime: '3:00 PM',
      duration: '1 hour',
      type: 'video',
      interviewer: 'David Kim',
      location: 'Google Meet',
      notes: 'Rescheduled from Feb 12 due to conflict'
    },
    {
      id: '5',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      jobTitle: 'Backend Engineer',
      companyName: 'FinTech Solutions',
      status: 'scheduled',
      interviewDate: '2024-02-20',
      interviewTime: '9:00 AM',
      duration: '2 hours',
      type: 'onsite',
      interviewer: 'Lisa Wang',
      location: 'Chicago Office',
      notes: 'Technical + behavioral interview'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'rescheduled':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'rescheduled':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'onsite':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesType = typeFilter === 'all' || interview.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime();
    }
    if (sortBy === 'candidate') {
      return a.candidateName.localeCompare(b.candidateName);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'company') {
      return a.companyName.localeCompare(b.companyName);
    }
    return 0;
  });

  const handleSelectInterview = (interviewId: string) => {
    setSelectedInterviews(prev => 
      prev.includes(interviewId) 
        ? prev.filter(id => id !== interviewId)
        : [...prev, interviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInterviews.length === sortedInterviews.length) {
      setSelectedInterviews([]);
    } else {
      setSelectedInterviews(sortedInterviews.map(i => i.id));
    }
  };

  return (
    
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <Link
              to="/admin/interviews/schedule"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Interview
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search interviews..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="phone">Phone</option>
                  <option value="video">Video</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="candidate">Sort by Candidate</option>
                  <option value="status">Sort by Status</option>
                  <option value="company">Sort by Company</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedInterviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedInterviews.length} interview(s) selected
                </span>
                <button
                  onClick={() => setSelectedInterviews([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">
                  Mark Complete
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                  Cancel
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interviews List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Interviews ({sortedInterviews.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {sortedInterviews.length} of {interviews.length} interviews</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedInterviews.length === sortedInterviews.length && sortedInterviews.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job & Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interview Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedInterviews.includes(interview.id)}
                        onChange={() => handleSelectInterview(interview.id)}
                        className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {interview.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{interview.candidateName}</div>
                          <div className="text-sm text-gray-500">{interview.candidateEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{interview.jobTitle}</div>
                        <div className="text-sm text-[#114373] font-medium">{interview.companyName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(interview.type)}
                          <span className="text-sm text-gray-900">{interview.type}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(interview.interviewDate)} at {interview.interviewTime}
                        </div>
                        <div className="text-xs text-gray-400">
                          {interview.duration} • {interview.interviewer}
                        </div>
                        <div className="text-xs text-gray-400">
                          {interview.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(interview.status).split(' ')[0]} mr-2`}></div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(interview.status)}`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(interview.status)}
                            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                          </div>
                        </span>
                      </div>
                      {interview.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">{interview.rating}/5</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-[#114373] hover:text-[#0d3559]">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedInterviews.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Link
                to="/admin/interviews/schedule"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Schedule Interview
              </Link>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Interviews; 