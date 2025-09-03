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
  MessageSquare,
  Calendar as CalendarIcon,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock as ClockIcon,
  AlertTriangle,
  Info
} from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  interviewType: 'video' | 'phone' | 'onsite';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  interviewer: string;
  location: string;
  meetingLink?: string;
  notes: string;
  rating?: number;
  feedback?: string;
  stage: 'first-round' | 'second-round' | 'final-round' | 'technical' | 'hr';
}

const Interviews: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('upcoming');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([]);

  const interviews: Interview[] = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      candidatePhone: '+1 (555) 123-4567',
      jobTitle: 'Senior UI/UX Designer',
      interviewType: 'video',
      status: 'scheduled',
      scheduledDate: '2024-01-25',
      scheduledTime: '10:00 AM',
      duration: '45 minutes',
      interviewer: 'John Smith',
      location: 'Zoom Meeting',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'First round interview focusing on design portfolio and user experience approach.',
      stage: 'first-round'
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      candidatePhone: '+1 (555) 234-5678',
      jobTitle: 'Software Engineer',
      interviewType: 'onsite',
      status: 'completed',
      scheduledDate: '2024-01-20',
      scheduledTime: '2:00 PM',
      duration: '60 minutes',
      interviewer: 'Lisa Wang',
      location: 'Conference Room A',
      notes: 'Technical interview covering algorithms, system design, and coding challenges.',
      rating: 4,
      feedback: 'Strong technical skills, good communication. Recommended for next round.',
      stage: 'technical'
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      candidatePhone: '+1 (555) 345-6789',
      jobTitle: 'Marketing Manager',
      interviewType: 'phone',
      status: 'cancelled',
      scheduledDate: '2024-01-22',
      scheduledTime: '11:30 AM',
      duration: '30 minutes',
      interviewer: 'David Kim',
      location: 'Phone Call',
      notes: 'Initial screening call to discuss experience and salary expectations.',
      stage: 'first-round'
    },
    {
      id: '4',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      candidatePhone: '+1 (555) 456-7890',
      jobTitle: 'Product Manager',
      interviewType: 'video',
      status: 'rescheduled',
      scheduledDate: '2024-01-28',
      scheduledTime: '3:00 PM',
      duration: '45 minutes',
      interviewer: 'Sarah Johnson',
      location: 'Google Meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Final round interview with product team lead.',
      stage: 'final-round'
    },
    {
      id: '5',
      candidateName: 'Lisa Wang',
      candidateEmail: 'lisa.wang@email.com',
      candidatePhone: '+1 (555) 567-8901',
      jobTitle: 'Data Analyst',
      interviewType: 'onsite',
      status: 'no-show',
      scheduledDate: '2024-01-18',
      scheduledTime: '1:00 PM',
      duration: '45 minutes',
      interviewer: 'Michael Chen',
      location: 'Conference Room B',
      notes: 'Technical interview focusing on SQL, Python, and data analysis skills.',
      stage: 'technical'
    },
    {
      id: '6',
      candidateName: 'Alex Thompson',
      candidateEmail: 'alex.thompson@email.com',
      candidatePhone: '+1 (555) 678-9012',
      jobTitle: 'Senior UI/UX Designer',
      interviewType: 'video',
      status: 'scheduled',
      scheduledDate: '2024-01-26',
      scheduledTime: '9:00 AM',
      duration: '60 minutes',
      interviewer: 'Emily Rodriguez',
      location: 'Microsoft Teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/123456',
      notes: 'Second round interview with design team. Portfolio review and design challenge.',
      stage: 'second-round'
    }
  ];

  const interviewTypes = [
    { id: 'all', title: 'All Types' },
    { id: 'video', title: 'Video Call' },
    { id: 'phone', title: 'Phone Call' },
    { id: 'onsite', title: 'On-site' }
  ];

  const statuses = [
    { id: 'all', title: 'All Status', color: 'bg-gray-100 text-gray-800' },
    { id: 'scheduled', title: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100 text-green-800' },
    { id: 'cancelled', title: 'Cancelled', color: 'bg-red-100 text-red-800' },
    { id: 'rescheduled', title: 'Rescheduled', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'no-show', title: 'No Show', color: 'bg-gray-100 text-gray-800' }
  ];

  const stages = [
    { id: 'all', title: 'All Stages' },
    { id: 'first-round', title: 'First Round' },
    { id: 'second-round', title: 'Second Round' },
    { id: 'final-round', title: 'Final Round' },
    { id: 'technical', title: 'Technical' },
    { id: 'hr', title: 'HR' }
  ];

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'rescheduled':
        return <AlertCircle className="w-4 h-4" />;
      case 'no-show':
        return <User className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <PhoneIcon className="w-4 h-4" />;
      case 'onsite':
        return <LocationIcon className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus;
    const matchesType = selectedType === 'all' || interview.interviewType === selectedType;
    const matchesStage = selectedStage === 'all' || interview.stage === selectedStage;
    
    return matchesSearch && matchesStatus && matchesType && matchesStage;
  });

  const stats = [
    { title: 'Total Interviews', value: interviews.length, icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { title: 'Scheduled', value: interviews.filter(i => i.status === 'scheduled').length, icon: <Clock className="w-5 h-5" />, color: 'bg-blue-500' },
    { title: 'Completed', value: interviews.filter(i => i.status === 'completed').length, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-green-500' },
    { title: 'This Week', value: interviews.filter(i => {
      const interviewDate = new Date(i.scheduledDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return interviewDate >= today && interviewDate <= weekFromNow;
    }).length, icon: <Calendar className="w-5 h-5" />, color: 'bg-purple-500' }
  ];

  const handleSelectInterview = (id: string) => {
    setSelectedInterviews(prev => 
      prev.includes(id) 
        ? prev.filter(interviewId => interviewId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedInterviews(prev => 
      prev.length === filteredInterviews.length 
        ? []
        : filteredInterviews.map(interview => interview.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const interviewDate = new Date(dateString);
    const diffTime = interviewDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
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
            to="/employer/interviews/schedule"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Interview
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
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
                placeholder="Search candidates, jobs, or interviewers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {interviewTypes.map(type => (
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
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {stages.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.title}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              <option value="upcoming">Upcoming</option>
              <option value="recent">Most Recent</option>
              <option value="candidate">Candidate A-Z</option>
              <option value="interviewer">Interviewer A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedInterviews.length === filteredInterviews.length && filteredInterviews.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <span className="text-sm text-gray-500">
                {filteredInterviews.length} interviews
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
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded ${viewMode === 'calendar' ? 'bg-[#114373] text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interviews */}
        <>
          <div className="divide-y divide-gray-200">
            {filteredInterviews.map((interview) => (
              <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedInterviews.includes(interview.id)}
                    onChange={() => handleSelectInterview(interview.id)}
                    className="mt-1 rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />

                  {/* Interview Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#114373] to-[#4ebf9e] rounded-lg flex items-center justify-center text-white">
                    {getInterviewTypeIcon(interview.interviewType)}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {interview.candidateName}
                        </h3>
                        <p className="text-[#114373] font-medium mb-1">{interview.jobTitle}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(interview.scheduledDate)} at {formatTime(interview.scheduledTime)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {interview.interviewer}
                          </div>
                          <div className="flex items-center gap-1">
                            {getInterviewTypeIcon(interview.interviewType)}
                            {interview.interviewType.charAt(0).toUpperCase() + interview.interviewType.slice(1)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(interview.status)}
                            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                          </div>
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Interview Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#114373]">
                          {getDaysUntil(interview.scheduledDate)}
                        </p>
                        <p className="text-xs text-gray-500">Days Until</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700">
                          {interview.stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-xs text-gray-500">Stage</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700">{interview.location}</p>
                        <p className="text-xs text-gray-500">Location</p>
                      </div>
                      <div className="text-center">
                        {interview.rating ? (
                          <div className="flex justify-center">
                            {getRatingStars(interview.rating)}
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-gray-400">-</p>
                        )}
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {interview.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-2">{interview.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {interview.candidateEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {interview.candidatePhone}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {interview.meetingLink && (
                          <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                            <Video className="w-4 h-4 mr-1" />
                            Join
                          </button>
                        )}
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </button>
                        <button className="px-3 py-1 bg-[#114373] text-white rounded hover:bg-[#0d3559] text-sm font-medium">
                          <Send className="w-4 h-4 mr-1" />
                          Send Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredInterviews.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or schedule a new interview</p>
              <Link
                to="/employer/interviews/schedule"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Schedule Interview
              </Link>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Interviews; 