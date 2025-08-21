import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  Send,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ApplicationWorkflow, ApplicationStage, InterviewDetails, InterviewEvaluation } from '../../types/employer';
import InterviewSchedulingModal from '../../components/admin/InterviewSchedulingModal';
import InterviewEvaluationForm from '../../components/admin/InterviewEvaluationForm';
import ApplicationDownloadModal from '../../components/admin/ApplicationDownloadModal';

const ApplicationWorkflowPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'shortlisted' | 'interviews' | 'evaluations' | 'submissions'>('applications');
  const [workflows, setWorkflows] = useState<ApplicationWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApplicationWorkflow | null>(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<{ candidateId: string; jobId: string } | null>(null);
  const [selectedCandidateForEvaluation, setSelectedCandidateForEvaluation] = useState<{ candidateId: string; jobId: string; candidateName?: string; jobTitle?: string; interviewDate?: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockWorkflows: ApplicationWorkflow[] = [
      {
        id: '1',
        jobId: 'job1',
        candidateId: 'candidate1',
        currentStage: 'applications_received',
        stages: [
          {
            id: 'stage1',
            candidateId: 'candidate1',
            jobId: 'job1',
            stage: 'applications_received',
            status: 'active',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-15T10:00:00Z',
            source: 'direct_application'
          }
        ],
        isLiked: false,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        jobId: 'job1',
        candidateId: 'candidate2',
        currentStage: 'shortlisted',
        stages: [
          {
            id: 'stage2a',
            candidateId: 'candidate2',
            jobId: 'job1',
            stage: 'applications_received',
            status: 'completed',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-14T09:00:00Z',
            source: 'direct_application'
          },
          {
            id: 'stage2b',
            candidateId: 'candidate2',
            jobId: 'job1',
            stage: 'shortlisted',
            status: 'active',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-15T11:00:00Z',
            source: 'direct_application'
          }
        ],
        isLiked: true,
        createdAt: '2024-01-14T09:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z'
      },
      {
        id: '3',
        jobId: 'job1',
        candidateId: 'candidate3',
        currentStage: 'interview_scheduled',
        stages: [
          {
            id: 'stage3a',
            candidateId: 'candidate3',
            jobId: 'job1',
            stage: 'applications_received',
            status: 'completed',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-13T08:00:00Z',
            source: 'database_search'
          },
          {
            id: 'stage3b',
            candidateId: 'candidate3',
            jobId: 'job1',
            stage: 'shortlisted',
            status: 'completed',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-14T10:00:00Z',
            source: 'database_search'
          },
          {
            id: 'stage3c',
            candidateId: 'candidate3',
            jobId: 'job1',
            stage: 'interview_scheduled',
            status: 'active',
            movedBy: 'Recruiter 1',
            movedAt: '2024-01-15T12:00:00Z',
            source: 'database_search'
          }
        ],
        interviewDetails: {
          id: 'interview1',
          candidateId: 'candidate3',
          jobId: 'job1',
          interviewDate: '2024-01-20',
          interviewTime: '14:00',
          interviewerNames: ['John Smith', 'Sarah Johnson'],
          interviewMode: 'online',
          meetingLink: 'https://zoom.us/j/123456789',
          status: 'scheduled',
          scheduledBy: 'Recruiter 1',
          scheduledAt: '2024-01-15T12:00:00Z'
        },
        isLiked: true,
        createdAt: '2024-01-13T08:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
      }
    ];
    setWorkflows(mockWorkflows);
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'applications_received': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'interviewed': return 'bg-green-100 text-green-800';
      case 'no_show': return 'bg-red-100 text-red-800';
      case 'submitted_to_client': return 'bg-indigo-100 text-indigo-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      case 'saved_for_future': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

         const getStageIcon = (stage: string) => {
         switch (stage) {
           case 'applications_received': return <Users className="w-4 h-4" />;
           case 'shortlisted': return <UserCheck className="w-4 h-4" />;
           case 'interview_scheduled': return <Calendar className="w-4 h-4" />;
           case 'interviewed': return <CheckCircle className="w-4 h-4" />;
           case 'no_show': return <XCircle className="w-4 h-4" />;
           case 'submitted_to_client': return <Send className="w-4 h-4" />;
           case 'rejected': return <XCircle className="w-4 h-4" />;
           case 'saved_for_future': return <Star className="w-4 h-4" />;
           default: return <Users className="w-4 h-4" />;
         }
       };

       const getRatingColor = (rating: string) => {
         switch (rating) {
           case 'above': return 'bg-green-100 text-green-800';
           case 'satisfactory': return 'bg-blue-100 text-blue-800';
           case 'below': return 'bg-yellow-100 text-yellow-800';
           case 'unsatisfactory': return 'bg-red-100 text-red-800';
           default: return 'bg-gray-100 text-gray-800';
         }
       };

  const moveToStage = (workflowId: string, newStage: ApplicationStage['stage']) => {
    setWorkflows(prev => prev.map(workflow => {
      if (workflow.id === workflowId) {
        const newStageObj: ApplicationStage = {
          id: `stage_${Date.now()}`,
          candidateId: workflow.candidateId,
          jobId: workflow.jobId,
          stage: newStage,
          status: 'active',
          movedBy: 'Current Recruiter',
          movedAt: new Date().toISOString(),
          source: 'direct_application'
        };

        // Mark previous stage as completed
        const updatedStages = workflow.stages.map(stage => ({
          ...stage,
          status: 'completed' as const
        }));

        return {
          ...workflow,
          currentStage: newStage,
          stages: [...updatedStages, newStageObj],
          updatedAt: new Date().toISOString()
        };
      }
      return workflow;
    }));
  };

  const scheduleInterview = (interviewDetails: Omit<InterviewDetails, 'id' | 'scheduledBy' | 'scheduledAt'>) => {
    const newInterview: InterviewDetails = {
      ...interviewDetails,
      id: `interview_${Date.now()}`,
      scheduledBy: 'Current Recruiter',
      scheduledAt: new Date().toISOString()
    };

    setWorkflows(prev => prev.map(workflow => {
      if (workflow.candidateId === interviewDetails.candidateId && workflow.jobId === interviewDetails.jobId) {
        return {
          ...workflow,
          interviewDetails: newInterview,
          currentStage: 'interview_scheduled' as ApplicationStage['stage'],
          updatedAt: new Date().toISOString()
        };
      }
      return workflow;
    }));
  };

  const saveEvaluation = (evaluation: Omit<InterviewEvaluation, 'id' | 'evaluatedBy' | 'evaluatedAt'>) => {
    const newEvaluation: InterviewEvaluation = {
      ...evaluation,
      id: `evaluation_${Date.now()}`,
      evaluatedBy: 'Current Recruiter',
      evaluatedAt: new Date().toISOString()
    };

    setWorkflows(prev => prev.map(workflow => {
      if (workflow.candidateId === evaluation.candidateId && workflow.jobId === evaluation.jobId) {
        return {
          ...workflow,
          interviewEvaluation: newEvaluation,
          currentStage: 'interviewed' as ApplicationStage['stage'],
          updatedAt: new Date().toISOString()
        };
      }
      return workflow;
    }));
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.candidateId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === 'all' || workflow.currentStage === filterStage;
    return matchesSearch && matchesFilter;
  });

  const getWorkflowsByStage = (stage: string) => {
    return filteredWorkflows.filter(workflow => workflow.currentStage === stage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Workflow</h1>
          <p className="mt-2 text-gray-600">Manage candidate applications through the recruitment pipeline</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
              >
                <option value="all">All Stages</option>
                <option value="applications_received">Applications Received</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="interviewed">Interviewed</option>
                <option value="no_show">No Show</option>
                <option value="submitted_to_client">Submitted to Client</option>
                <option value="rejected">Rejected</option>
                <option value="saved_for_future">Saved for Future</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workflow Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Applications Received */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Applications Received</h3>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('applications_received').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {getWorkflowsByStage('applications_received').map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage="applications_received"
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>

          {/* Shortlisted */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Shortlisted</h3>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('shortlisted').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {getWorkflowsByStage('shortlisted').map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage="shortlisted"
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>

          {/* Interview Scheduled */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Interview Scheduled</h3>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('interview_scheduled').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {getWorkflowsByStage('interview_scheduled').map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage="interview_scheduled"
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>

          {/* Interviewed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Interviewed</h3>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('interviewed').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {getWorkflowsByStage('interviewed').map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage="interviewed"
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>

          {/* Submitted to Client */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Submitted to Client</h3>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('submitted_to_client').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {getWorkflowsByStage('submitted_to_client').map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage="submitted_to_client"
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>

          {/* Rejected/Saved */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Rejected/Saved</h3>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2 py-1 rounded-full">
                  {getWorkflowsByStage('rejected').length + getWorkflowsByStage('saved_for_future').length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[...getWorkflowsByStage('rejected'), ...getWorkflowsByStage('saved_for_future')].map((workflow) => (
                <ApplicationCard
                  key={workflow.id}
                  workflow={workflow}
                  onViewDetails={() => setSelectedWorkflow(workflow)}
                  onMoveToStage={(stage) => moveToStage(workflow.id, stage)}
                  currentStage={workflow.currentStage}
                  getStageColor={getStageColor}
                  getStageIcon={getStageIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

             {/* Modals */}
       {selectedWorkflow && (
         <ApplicationDetailsModal
           workflow={selectedWorkflow}
           onClose={() => setSelectedWorkflow(null)}
           onMoveToStage={(stage) => {
             moveToStage(selectedWorkflow.id, stage);
             setSelectedWorkflow(null);
           }}
           onShowDownloadModal={() => setShowDownloadModal(true)}
           onShowInterviewModal={(candidateId, jobId) => {
             setSelectedCandidateForInterview({ candidateId, jobId });
             setShowInterviewModal(true);
           }}
           onShowEvaluationModal={(candidateId, jobId, candidateName, jobTitle, interviewDate) => {
             setSelectedCandidateForEvaluation({ candidateId, jobId, candidateName, jobTitle, interviewDate });
             setShowEvaluationModal(true);
           }}
           getStageColor={getStageColor}
         />
       )}

       {/* Interview Scheduling Modal */}
       {showInterviewModal && selectedCandidateForInterview && (
         <InterviewSchedulingModal
           isOpen={showInterviewModal}
           onClose={() => {
             setShowInterviewModal(false);
             setSelectedCandidateForInterview(null);
           }}
           onSchedule={scheduleInterview}
           candidateId={selectedCandidateForInterview.candidateId}
           jobId={selectedCandidateForInterview.jobId}
         />
       )}

       {/* Interview Evaluation Modal */}
       {showEvaluationModal && selectedCandidateForEvaluation && (
         <InterviewEvaluationForm
           isOpen={showEvaluationModal}
           onClose={() => {
             setShowEvaluationModal(false);
             setSelectedCandidateForEvaluation(null);
           }}
           onSave={saveEvaluation}
           candidateId={selectedCandidateForEvaluation.candidateId}
           jobId={selectedCandidateForEvaluation.jobId}
           candidateName={selectedCandidateForEvaluation.candidateName}
           jobTitle={selectedCandidateForEvaluation.jobTitle}
           interviewDate={selectedCandidateForEvaluation.interviewDate}
         />
       )}

       {/* Application Download Modal */}
       {showDownloadModal && selectedWorkflow && (
         <ApplicationDownloadModal
           isOpen={showDownloadModal}
           onClose={() => setShowDownloadModal(false)}
           candidateId={selectedWorkflow.candidateId}
           candidateName={`Candidate ${selectedWorkflow.candidateId}`}
           jobTitle={`Job ${selectedWorkflow.jobId}`}
         />
       )}
    </div>
  );
};

// Application Card Component
interface ApplicationCardProps {
  workflow: ApplicationWorkflow;
  onViewDetails: () => void;
  onMoveToStage: (stage: ApplicationStage['stage']) => void;
  currentStage: string;
  getStageColor: (stage: string) => string;
  getStageIcon: (stage: string) => React.ReactNode;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  workflow,
  onViewDetails,
  onMoveToStage,
  currentStage,
  getStageColor,
  getStageIcon
}) => {
  const [showActions, setShowActions] = useState(false);

  const getNextStages = (currentStage: string): ApplicationStage['stage'][] => {
    switch (currentStage) {
      case 'applications_received':
        return ['shortlisted', 'rejected', 'saved_for_future'];
      case 'shortlisted':
        return ['interview_scheduled', 'rejected', 'saved_for_future'];
      case 'interview_scheduled':
        return ['interviewed', 'no_show'];
      case 'interviewed':
        return ['submitted_to_client', 'rejected', 'saved_for_future'];
      default:
        return [];
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">Candidate {workflow.candidateId}</h4>
          <p className="text-sm text-gray-600">Job ID: {workflow.jobId}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStageColor(currentStage)}`}>
              {getStageIcon(currentStage)}
              {currentStage.replace('_', ' ')}
            </span>
            {workflow.isLiked && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                <Star className="w-3 h-3" />
                Liked
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              <div className="p-2">
                <button
                  onClick={onViewDetails}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                
                {getNextStages(currentStage).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      onMoveToStage(stage);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Move to {stage.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Updated: {new Date(workflow.updatedAt).toLocaleDateString()}</span>
        <span>Source: {workflow.stages[0]?.source.replace('_', ' ')}</span>
      </div>
    </div>
  );
};

// Application Details Modal Component
interface ApplicationDetailsModalProps {
  workflow: ApplicationWorkflow;
  onClose: () => void;
  onMoveToStage: (stage: ApplicationStage['stage']) => void;
  onShowDownloadModal: () => void;
  onShowInterviewModal: (candidateId: string, jobId: string) => void;
  onShowEvaluationModal: (candidateId: string, jobId: string, candidateName: string, jobTitle: string, interviewDate?: string) => void;
  getStageColor: (stage: string) => string;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  workflow,
  onClose,
  onMoveToStage,
  onShowDownloadModal,
  onShowInterviewModal,
  onShowEvaluationModal,
  getStageColor
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'interview' | 'evaluation'>('details');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'details', label: 'Details' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'interview', label: 'Interview' },
                { id: 'evaluation', label: 'Evaluation' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#114373] text-[#114373]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Candidate Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Candidate ID:</span>
                      <span className="font-medium">{workflow.candidateId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job ID:</span>
                      <span className="font-medium">{workflow.jobId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Stage:</span>
                      <span className="font-medium">{workflow.currentStage.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{workflow.isLiked ? 'Liked' : 'Not Liked'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={onShowDownloadModal}
                      className="w-full px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                    >
                      Download Application
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      View CV
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      View References
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Application Timeline</h4>
              <div className="space-y-4">
                {workflow.stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#114373] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{stage.stage.replace('_', ' ')}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(stage.stage)}`}>
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Moved by {stage.movedBy} on {new Date(stage.movedAt).toLocaleDateString()}
                      </p>
                      {stage.notes && (
                        <p className="text-sm text-gray-500 mt-1">{stage.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Interview Details</h4>
                <button 
                  onClick={() => onShowInterviewModal(workflow.candidateId, workflow.jobId)}
                  className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                >
                  Schedule Interview
                </button>
              </div>
              
              {workflow.interviewDetails ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{workflow.interviewDetails.interviewDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">{workflow.interviewDetails.interviewTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mode</p>
                      <p className="font-medium capitalize">{workflow.interviewDetails.interviewMode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium capitalize">{workflow.interviewDetails.status}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Interviewers</p>
                      <p className="font-medium">{workflow.interviewDetails.interviewerNames.join(', ')}</p>
                    </div>
                    {workflow.interviewDetails.meetingLink && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Meeting Link</p>
                        <a href={workflow.interviewDetails.meetingLink} className="text-[#114373] hover:underline">
                          {workflow.interviewDetails.meetingLink}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No interview scheduled yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'evaluation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Interview Evaluation</h4>
                <button 
                  onClick={() => onShowEvaluationModal(
                    workflow.candidateId, 
                    workflow.jobId,
                    `Candidate ${workflow.candidateId}`,
                    `Job ${workflow.jobId}`,
                    workflow.interviewDetails?.interviewDate
                  )}
                  className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]"
                >
                  Fill Evaluation
                </button>
              </div>
              
              {workflow.interviewEvaluation ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Technical Skills</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(workflow.interviewEvaluation!.technicalSkills)}`}>
                        {workflow.interviewEvaluation!.technicalSkills.charAt(0).toUpperCase() + workflow.interviewEvaluation!.technicalSkills.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Communication</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(workflow.interviewEvaluation!.communication)}`}>
                        {workflow.interviewEvaluation!.communication.charAt(0).toUpperCase() + workflow.interviewEvaluation!.communication.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Leadership</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(workflow.interviewEvaluation!.leadership)}`}>
                        {workflow.interviewEvaluation!.leadership.charAt(0).toUpperCase() + workflow.interviewEvaluation!.leadership.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cultural Fit</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(workflow.interviewEvaluation!.culturalFit)}`}>
                        {workflow.interviewEvaluation!.culturalFit.charAt(0).toUpperCase() + workflow.interviewEvaluation!.culturalFit.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overall Rating</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(workflow.interviewEvaluation!.overallRating)}`}>
                        {workflow.interviewEvaluation!.overallRating.charAt(0).toUpperCase() + workflow.interviewEvaluation!.overallRating.slice(1)}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Recommendation</p>
                      <p className="font-medium capitalize">
                        {workflow.interviewEvaluation.recommendation.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Comments</p>
                      <p className="text-sm">{workflow.interviewEvaluation.comments}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No evaluation completed yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationWorkflowPage;
