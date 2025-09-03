import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  User,
  Shield,
  CheckSquare,
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
  Clock as ClockIcon,
  AlertTriangle,
  Info,
  FileCheck,
  FileX,
  FileText as FormIcon,
  Send as SendIcon,
  CheckCircle2,
  Clock as PendingIcon,
  Building2
} from 'lucide-react';

interface ReferenceCheck {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  status: 'pending' | 'sent' | 'completed' | 'failed' | 'expired';
  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  refereeCompany: string;
  refereePosition: string;
  formSentDate: string;
  formCompletedDate?: string;
  formExpiryDate: string;
  referenceScore?: number;
  referenceFeedback?: string;
  formUrl: string;
  isUrgent: boolean;
}

const ReferenceCheck: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<ReferenceCheck | null>(null);

  const referenceChecks: ReferenceCheck[] = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      jobTitle: 'Senior UI/UX Designer',
      status: 'completed',
      refereeName: 'John Smith',
      refereeEmail: 'john.smith@company.com',
      refereePhone: '+1 (555) 123-4567',
      refereeCompany: 'Design Studio Inc.',
      refereePosition: 'Design Director',
      formSentDate: '2024-01-20',
      formCompletedDate: '2024-01-22',
      formExpiryDate: '2024-01-27',
      referenceScore: 4,
      referenceFeedback: 'Sarah is an excellent designer with strong problem-solving skills. She consistently delivered high-quality work and was a great team player.',
      formUrl: '/forms/reference-check-1.pdf',
      isUrgent: false
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      jobTitle: 'Software Engineer',
      status: 'sent',
      refereeName: 'Lisa Wang',
      refereeEmail: 'lisa.wang@techcorp.com',
      refereePhone: '+1 (555) 234-5678',
      refereeCompany: 'TechCorp Solutions',
      refereePosition: 'Senior Engineer',
      formSentDate: '2024-01-23',
      formExpiryDate: '2024-01-30',
      formUrl: '/forms/reference-check-2.pdf',
      isUrgent: true
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      jobTitle: 'Marketing Manager',
      status: 'pending',
      refereeName: 'David Kim',
      refereeEmail: 'david.kim@marketingpro.com',
      refereePhone: '+1 (555) 345-6789',
      refereeCompany: 'Marketing Pro Agency',
      refereePosition: 'Marketing Director',
      formSentDate: '2024-01-25',
      formExpiryDate: '2024-02-01',
      formUrl: '/forms/reference-check-3.pdf',
      isUrgent: false
    },
    {
      id: '4',
      candidateName: 'Alex Thompson',
      candidateEmail: 'alex.thompson@email.com',
      jobTitle: 'Senior UI/UX Designer',
      status: 'failed',
      refereeName: 'Maria Garcia',
      refereeEmail: 'maria.garcia@designhub.com',
      refereePhone: '+1 (555) 456-7890',
      refereeCompany: 'Design Hub',
      refereePosition: 'Creative Director',
      formSentDate: '2024-01-18',
      formExpiryDate: '2024-01-25',
      referenceScore: 2,
      referenceFeedback: 'Alex struggled with meeting deadlines and required significant supervision.',
      formUrl: '/forms/reference-check-4.pdf',
      isUrgent: false
    },
    {
      id: '5',
      candidateName: 'Lisa Wang',
      candidateEmail: 'lisa.wang@email.com',
      jobTitle: 'Data Analyst',
      status: 'expired',
      refereeName: 'Robert Johnson',
      refereeEmail: 'robert.johnson@dataanalytics.com',
      refereePhone: '+1 (555) 567-8901',
      refereeCompany: 'Data Analytics Corp',
      refereePosition: 'Data Science Manager',
      formSentDate: '2024-01-15',
      formExpiryDate: '2024-01-22',
      formUrl: '/forms/reference-check-5.pdf',
      isUrgent: false
    }
  ];

  const statuses = [
    { id: 'all', title: 'All Status', color: 'bg-gray-100 text-gray-800' },
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'sent', title: 'Sent', color: 'bg-blue-100 text-blue-800' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100 text-green-800' },
    { id: 'failed', title: 'Failed', color: 'bg-red-100 text-red-800' },
    { id: 'expired', title: 'Expired', color: 'bg-gray-100 text-gray-800' }
  ];

  const candidates = [
    { id: 'all', title: 'All Candidates' },
    { id: 'sarah', title: 'Sarah Johnson' },
    { id: 'michael', title: 'Michael Chen' },
    { id: 'emily', title: 'Emily Rodriguez' },
    { id: 'alex', title: 'Alex Thompson' },
    { id: 'lisa', title: 'Lisa Wang' }
  ];

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <PendingIcon className="w-4 h-4" />;
      case 'sent':
        return <SendIcon className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <PendingIcon className="w-4 h-4" />;
    }
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

  const filteredChecks = referenceChecks.filter(check => {
    const matchesSearch = check.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.refereeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus;
    const matchesCandidate = selectedCandidate === 'all' || check.candidateName.toLowerCase().includes(selectedCandidate);
    
    return matchesSearch && matchesStatus && matchesCandidate;
  });

  const stats = [
    { title: 'Total Checks', value: referenceChecks.length, icon: <FileCheck className="w-5 h-5" />, color: 'bg-blue-500' },
    { title: 'Pending', value: referenceChecks.filter(c => c.status === 'pending').length, icon: <PendingIcon className="w-5 h-5" />, color: 'bg-yellow-500' },
    { title: 'Completed', value: referenceChecks.filter(c => c.status === 'completed').length, icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-green-500' },
    { title: 'Failed', value: referenceChecks.filter(c => c.status === 'failed').length, icon: <XCircle className="w-5 h-5" />, color: 'bg-red-500' }
  ];

  const handleSelectCheck = (id: string) => {
    setSelectedChecks(prev => 
      prev.includes(id) 
        ? prev.filter(checkId => checkId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedChecks(prev => 
      prev.length === filteredChecks.length 
        ? []
        : filteredChecks.map(check => check.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewForm = (check: ReferenceCheck) => {
    setSelectedCheck(check);
    setShowFormPreview(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reference Checks</h1>
          <p className="text-gray-600">Manage candidate reference checks and form tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <Link
            to="/employer/reference-check/create"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Reference Check
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

      {/* Reference Check Notice */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-indigo-900 mb-1">Auto-Generated Reference Check Forms</h3>
            <p className="text-sm text-indigo-700">
              Reference check forms are automatically generated and sent to candidate referees. 
              Completed forms are stored and emailed to you for review. Final candidate status is updated based on reference checks.
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
                placeholder="Search candidates, referees, or jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
            >
              {candidates.map(candidate => (
                <option key={candidate.id} value={candidate.id}>{candidate.title}</option>
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
              <option value="expiry">Expiring Soon</option>
              <option value="candidate">Candidate A-Z</option>
              <option value="referee">Referee A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reference Checks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedChecks.length === filteredChecks.length && filteredChecks.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
              <span className="text-sm text-gray-500">
                {filteredChecks.length} reference checks
              </span>
            </div>
          </div>
        </div>

        {/* Reference Checks */}
        <div className="divide-y divide-gray-200">
          {filteredChecks.map((check) => (
            <div key={check.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedChecks.includes(check.id)}
                  onChange={() => handleSelectCheck(check.id)}
                  className="mt-1 rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                />

                {/* Status Icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-[#114373] to-[#4ebf9e] rounded-lg flex items-center justify-center text-white">
                  {getStatusIcon(check.status)}
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {check.candidateName}
                      </h3>
                      <p className="text-[#114373] font-medium mb-1">{check.jobTitle}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Referee: {check.refereeName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {check.refereeCompany}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Sent {formatDate(check.formSentDate)}
                        </div>
                        {check.isUrgent && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            Urgent
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(check.status)}
                          {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                        </div>
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Referee Details */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Referee Name</p>
                        <p className="font-medium">{check.refereeName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Position</p>
                        <p className="font-medium">{check.refereePosition}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Company</p>
                        <p className="font-medium">{check.refereeCompany}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium">{check.refereeEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Status */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FormIcon className="w-4 h-4" />
                          Form Sent: {formatDate(check.formSentDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Expires: {formatDate(check.formExpiryDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {getDaysUntilExpiry(check.formExpiryDate)} days left
                        </div>
                      </div>
                      {check.referenceScore && (
                        <div className="flex items-center gap-1">
                          {getRatingStars(check.referenceScore)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reference Feedback */}
                  {check.referenceFeedback && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{check.referenceFeedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {check.refereeEmail}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {check.refereePhone}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewForm(check)}
                        className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Form
                      </button>
                      <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                      <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                        <Send className="w-4 h-4 mr-1" />
                        Resend
                      </button>
                      <button className="px-3 py-1 bg-[#114373] text-white rounded hover:bg-[#0d3559] text-sm font-medium">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact Referee
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChecks.length === 0 && (
          <div className="p-12 text-center">
            <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reference checks found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new reference check</p>
            <Link
              to="/employer/reference-check/create"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Reference Check
            </Link>
          </div>
        )}
      </div>

      {/* Form Preview Modal */}
      {showFormPreview && selectedCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reference Check Form Preview</h3>
              <button 
                onClick={() => setShowFormPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Form Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Candidate</p>
                    <p className="font-medium">{selectedCheck.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p className="font-medium">{selectedCheck.jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Referee</p>
                    <p className="font-medium">{selectedCheck.refereeName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Company</p>
                    <p className="font-medium">{selectedCheck.refereeCompany}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Reference Check Form</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How long did the candidate work with you?</label>
                    <p className="text-sm text-gray-600">[Auto-generated question]</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What was the candidate's role and responsibilities?</label>
                    <p className="text-sm text-gray-600">[Auto-generated question]</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate the candidate's performance?</label>
                    <p className="text-sm text-gray-600">[Auto-generated question with rating scale]</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Would you recommend this candidate?</label>
                    <p className="text-sm text-gray-600">[Auto-generated question]</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional comments</label>
                    <p className="text-sm text-gray-600">[Auto-generated open-ended question]</p>
                  </div>
                </div>
              </div>

              {selectedCheck.referenceFeedback && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Reference Feedback</h4>
                  <p className="text-sm text-blue-700">{selectedCheck.referenceFeedback}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Download Form
              </button>
              <button className="flex-1 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]">
                <Send className="w-4 h-4 mr-2" />
                Send to Referee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceCheck; 