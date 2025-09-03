import React, { FC, useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Users,
  FileText,
  Download,
  Send,
  Edit,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLocation: string;
  candidateExperience: number;
  candidateEducation: string;
  candidateSkills: string[];
  appliedDate: string;
  status: 'applied' | 'reviewing' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  cvUrl: string;
  coverLetter: string;
  isFromDatabase: boolean;
  previousApplications: string[];
  adminNotes: string;
  shortlistReason: string;
  interviewScheduled?: string;
  interviewMode?: 'in-person' | 'video' | 'phone';
  interviewVenue?: string;
}

interface ApplicationManagementProps {
  onApplicationUpdate: (application: Application) => void;
  onInterviewScheduled: (applicationId: string, interviewDetails: any) => void;
  onShortlistCandidate: (applicationId: string, reason: string) => void;
}

const ApplicationManagement: FC<ApplicationManagementProps> = ({
  onApplicationUpdate,
  onInterviewScheduled,
  onShortlistCandidate
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API calls
  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter, jobFilter]);

  const loadApplications = () => {
    // Mock data - replace with API call
    setApplications([
      {
        id: '1',
        jobId: 'job1',
        jobTitle: 'Senior Software Engineer',
        candidateId: 'cand1',
        candidateName: 'John Doe',
        candidateEmail: 'john.doe@email.com',
        candidatePhone: '+255 123 456 789',
        candidateLocation: 'Dar es Salaam, Tanzania',
        candidateExperience: 5,
        candidateEducation: 'Bachelor\'s Degree',
        candidateSkills: ['React', 'Node.js', 'Python', 'AWS'],
        appliedDate: '2024-01-15',
        status: 'applied',
        cvUrl: '/cv/john-doe.pdf',
        coverLetter: 'I am excited to apply for this position...',
        isFromDatabase: false,
        previousApplications: [],
        adminNotes: '',
        shortlistReason: ''
      },
      {
        id: '2',
        jobId: 'job1',
        jobTitle: 'Senior Software Engineer',
        candidateId: 'cand2',
        candidateName: 'Jane Smith',
        candidateEmail: 'jane.smith@email.com',
        candidatePhone: '+255 987 654 321',
        candidateLocation: 'Nairobi, Kenya',
        candidateExperience: 7,
        candidateEducation: 'Master\'s Degree',
        candidateSkills: ['React', 'Angular', 'Java', 'Docker'],
        appliedDate: '2024-01-16',
        status: 'shortlisted',
        cvUrl: '/cv/jane-smith.pdf',
        coverLetter: 'With my extensive experience...',
        isFromDatabase: true,
        previousApplications: ['job2', 'job3'],
        adminNotes: 'Strong technical background, good communication skills',
        shortlistReason: 'Excellent technical skills and relevant experience'
      }
    ]);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (jobFilter !== 'all') {
      filtered = filtered.filter(app => app.jobId === jobFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    
    const application = updatedApplications.find(app => app.id === applicationId);
    if (application) {
      onApplicationUpdate(application);
    }
  };

  const handleShortlist = (application: Application) => {
    setSelectedApplication(application);
    setShowShortlistModal(true);
  };

  const handleShortlistSubmit = (reason: string) => {
    if (selectedApplication) {
      const updatedApplication = {
        ...selectedApplication,
        status: 'shortlisted' as const,
        shortlistReason: reason
      };
      
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id ? updatedApplication : app
      ));
      
      onShortlistCandidate(selectedApplication.id, reason);
      setShowShortlistModal(false);
      setSelectedApplication(null);
    }
  };

  const handleInterviewSchedule = (application: Application) => {
    setSelectedApplication(application);
    setShowInterviewModal(true);
  };

  const handleInterviewSubmit = (interviewDetails: any) => {
    if (selectedApplication) {
      const updatedApplication = {
        ...selectedApplication,
        status: 'interviewed' as const,
        interviewScheduled: interviewDetails.date,
        interviewMode: interviewDetails.mode,
        interviewVenue: interviewDetails.venue
      };
      
      setApplications(prev => prev.map(app => 
        app.id === selectedApplication.id ? updatedApplication : app
      ));
      
      onInterviewScheduled(selectedApplication.id, interviewDetails);
      setShowInterviewModal(false);
      setSelectedApplication(null);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === 'shortlist') {
      selectedApplications.forEach(appId => {
        const application = applications.find(app => app.id === appId);
        if (application) {
          handleShortlist(application);
        }
      });
    } else if (action === 'reject') {
      selectedApplications.forEach(appId => {
        handleStatusChange(appId, 'rejected');
      });
    }
    setSelectedApplications([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'interviewed': return 'bg-purple-100 text-purple-800';
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <FileText className="w-4 h-4" />;
      case 'reviewing': return <Clock className="w-4 h-4" />;
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />;
      case 'interviewed': return <Calendar className="w-4 h-4" />;
      case 'selected': return <Star className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const sendInterviewEmail = (application: Application) => {
    const emailTemplate = `Dear ${application.candidateName},

Thank you for sharing your CV for the ${application.jobTitle} role through our portal. After reviewing your profile, we are pleased to invite you for an interview as part of the selection process.

Interview Schedule:
Date: [Insert Date]
Time: [Insert Time]
Mode: [In-person / Online – link to be shared if virtual]
Venue: Axia HR Advisory & Recruitment, Mezzanine Floor, Urban Rose Hotel & Apartments, Jamhuri/Asia Street, P.O.Box 75303, Dar es Salaam, Tanzania

Kindly confirm your availability at the earliest. If the proposed time is not suitable, please let us know so we can try to arrange an alternative.

We look forward to your participation and wish you the very best.

Best regards,
Axia HR Advisory & Recruitment Team`;

    // Open email client with template
    window.open(`mailto:${application.candidateEmail}?subject=Interview Invitation - ${application.jobTitle}&body=${encodeURIComponent(emailTemplate)}`);
  };

  const sendShortlistEmail = (application: Application) => {
    const emailTemplate = `Dear ${application.candidateName},

Thank you for sharing your CV with us earlier through our portal. We are pleased to inform you that your profile has now been shortlisted for the role of ${application.jobTitle}.

Please find the job details here: [Insert Job Post Link]

We would like to invite you for an interview as per the schedule below:
Date: [Insert Date]
Time: [Insert Time]
Mode: [In-person / Online – link if virtual]
Venue: Axia HR Advisory & Recruitment, Mezzanine Floor, Urban Rose Hotel & Apartments, Jamhuri/Asia Street, P.O.Box 75303, Dar es Salaam, Tanzania

Kindly confirm your availability at the earliest. If the above time does not work for you, please let us know so that we may arrange an alternative.

We look forward to your participation and wish you success in the process.

Best regards,
Axia HR Advisory & Recruitment Team`;

    // Open email client with template
    window.open(`mailto:${application.candidateEmail}?subject=Shortlisted for ${application.jobTitle}&body=${encodeURIComponent(emailTemplate)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
          <p className="text-gray-600">Review and manage candidate applications</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedApplications.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction('shortlist')}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Shortlist Selected ({selectedApplications.length})
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Reject Selected
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by candidate name, job title, or email..."
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
            <option value="applied">Applied</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Jobs</option>
            <option value="job1">Senior Software Engineer</option>
            <option value="job2">Product Manager</option>
          </select>
          <button
            onClick={loadApplications}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Applications ({filteredApplications.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredApplications.map((application) => (
            <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(application.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedApplications(prev => [...prev, application.id]);
                        } else {
                          setSelectedApplications(prev => prev.filter(id => id !== application.id));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{application.candidateName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </div>
                    </span>
                    {application.isFromDatabase && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Database Candidate
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {application.jobTitle}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.candidateLocation}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {application.candidateExperience} years
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {application.candidateEducation}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Applied: {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {application.candidateEmail}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {application.candidatePhone}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {application.candidateSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {application.shortlistReason && (
                    <div className="bg-green-50 p-3 rounded-lg mb-3">
                      <div className="text-sm text-green-800">
                        <strong>Shortlist Reason:</strong> {application.shortlistReason}
                      </div>
                    </div>
                  )}

                  {application.adminNotes && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="text-sm text-gray-800">
                        <strong>Admin Notes:</strong> {application.adminNotes}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => window.open(application.cvUrl, '_blank')}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View CV"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sendInterviewEmail(application)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Send Interview Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => sendShortlistEmail(application)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Send Shortlist Email"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  
                  {application.status === 'applied' && (
                    <button
                      onClick={() => handleShortlist(application)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Shortlist
                    </button>
                  )}
                  
                  {application.status === 'shortlisted' && (
                    <button
                      onClick={() => handleInterviewSchedule(application)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Schedule Interview
                    </button>
                  )}
                  
                  {application.status === 'applied' && (
                    <button
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shortlist Modal */}
      {showShortlistModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shortlist Candidate
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please provide a reason for shortlisting {selectedApplication.candidateName} for the {selectedApplication.jobTitle} position.
                </p>
                <textarea
                  placeholder="Enter shortlist reason..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => setSelectedApplication(prev => prev ? { ...prev, shortlistReason: e.target.value } : null)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleShortlistSubmit(selectedApplication.shortlistReason)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => setShowShortlistModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Schedule Modal */}
      {showInterviewModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Schedule Interview
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule an interview for {selectedApplication.candidateName} for the {selectedApplication.jobTitle} position.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setSelectedApplication(prev => prev ? { ...prev, interviewScheduled: e.target.value } : null)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Mode
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setSelectedApplication(prev => prev ? { ...prev, interviewMode: e.target.value as any } : null)}
                    >
                      <option value="in-person">In-person</option>
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Venue
                    </label>
                    <input
                      type="text"
                      placeholder="Axia HR Advisory & Recruitment, Mezzanine Floor, Urban Rose Hotel & Apartments, Jamhuri/Asia Street, P.O.Box 75303, Dar es Salaam, Tanzania"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setSelectedApplication(prev => prev ? { ...prev, interviewVenue: e.target.value } : null)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleInterviewSubmit({
                    date: selectedApplication.interviewScheduled || '',
                    mode: selectedApplication.interviewMode || 'in-person',
                    venue: selectedApplication.interviewVenue || ''
                  })}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;
