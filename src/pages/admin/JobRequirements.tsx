import { FC, useState, useEffect } from 'react';
import {
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Search,
  Filter,
  AlertCircle,
  User,
  EyeOff
} from 'lucide-react';
import { JobRequirement } from '../../types/employer';

interface JobRequirementWithEmployer extends JobRequirement {
  employer: {
    id: string;
    companyName: string;
    email: string;
  };
}

const JobRequirements: FC = () => {
  const [jobRequirements, setJobRequirements] = useState<JobRequirementWithEmployer[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobRequirementWithEmployer[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobRequirementWithEmployer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for job requirements
  useEffect(() => {
    const mockJobRequirements: JobRequirementWithEmployer[] = [
      {
        id: '1',
        employerId: 'emp1',
        position: 'Senior Software Engineer',
        jobDescription: 'We are looking for an experienced software engineer to join our development team...',
        jobRequirements: '5+ years of experience in React, Node.js, and TypeScript. Strong problem-solving skills...',
        location: 'Dar es Salaam, Tanzania',
        salaryRange: {
          min: 2000000,
          max: 3500000,
          currency: 'TZS'
        },
        viewToCandidates: true,
        testPaper: {
          file: new File([''], 'technical_test.pdf'),
          fileName: 'Technical Assessment.pdf',
          hasAnswerSheet: true
        },
        status: 'submitted',
        submittedAt: new Date('2024-01-15'),
        employer: {
          id: 'emp1',
          companyName: 'Tech Solutions Ltd',
          email: 'hr@techsolutions.co.tz'
        }
      },
      {
        id: '2',
        employerId: 'emp2',
        position: 'Marketing Manager',
        jobDescription: 'Lead our marketing initiatives and develop strategies to increase brand awareness...',
        jobRequirements: 'Bachelor\'s degree in Marketing, 3+ years experience in digital marketing...',
        location: 'Nairobi, Kenya',
        salaryRange: {
          min: 150000,
          max: 250000,
          currency: 'USD'
        },
        viewToCandidates: false,
        status: 'submitted',
        submittedAt: new Date('2024-01-14'),
        employer: {
          id: 'emp2',
          companyName: 'Global Marketing Agency',
          email: 'careers@globalmarketing.com'
        }
      },
      {
        id: '3',
        employerId: 'emp3',
        position: 'Financial Analyst',
        jobDescription: 'Analyze financial data and prepare reports for senior management...',
        jobRequirements: 'CPA certification, 4+ years in financial analysis, Excel expertise...',
        location: 'Kampala, Uganda',
        salaryRange: {
          min: 3000000,
          max: 4500000,
          currency: 'TZS'
        },
        viewToCandidates: true,
        status: 'approved',
        submittedAt: new Date('2024-01-13'),
        approvedAt: new Date('2024-01-14'),
        employer: {
          id: 'emp3',
          companyName: 'Finance Corp',
          email: 'hr@financecorp.com'
        }
      }
    ];

    setJobRequirements(mockJobRequirements);
    setFilteredJobs(mockJobRequirements);
  }, []);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = jobRequirements;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [jobRequirements, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'published':
        return <Eye className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleApprove = async (jobId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJobRequirements(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'approved' as const, approvedAt: new Date() }
          : job
      ));
      
      if (selectedJob?.id === jobId) {
        setSelectedJob(prev => prev ? { ...prev, status: 'approved' as const, approvedAt: new Date() } : null);
      }
    } catch (error) {
      console.error('Error approving job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (jobId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJobRequirements(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'rejected' as const }
          : job
      ));
      
      if (selectedJob?.id === jobId) {
        setSelectedJob(prev => prev ? { ...prev, status: 'rejected' as const } : null);
      }
    } catch (error) {
      console.error('Error rejecting job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (jobId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJobRequirements(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'published' as const, publishedAt: new Date() }
          : job
      ));
      
      if (selectedJob?.id === jobId) {
        setSelectedJob(prev => prev ? { ...prev, status: 'published' as const, publishedAt: new Date() } : null);
      }
    } catch (error) {
      console.error('Error publishing job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePublicAd = (job: JobRequirementWithEmployer) => {
    const salaryText = job.viewToCandidates 
      ? `**Salary Range:** ${job.salaryRange.currency} ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}`
      : `**Salary:** Competitive (details available upon application)`;

    return `**${job.position}**

**About the Role:**
${job.jobDescription}

**Requirements:**
${job.jobRequirements}

${salaryText}

**Location:** ${job.location}

**Employment Type:** Full-time

We are seeking a talented and experienced ${job.position} to join our dynamic team. This is an exciting opportunity to work with a leading organization and contribute to our continued success.

**What We Offer:**
- Competitive salary package
- Professional development opportunities
- Collaborative work environment
- Growth potential

If you meet the requirements and are interested in this position, please apply through our platform.`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Requirements Review</h1>
          <p className="text-gray-600">
            Review and approve job requirements submitted by employers. Client names will be hidden when published.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobRequirements.filter(job => job.status === 'submitted').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobRequirements.filter(job => job.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobRequirements.filter(job => job.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobRequirements.filter(job => job.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by position, location, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="submitted">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Requirements List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job Requirements</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        <span className="ml-1 capitalize">{job.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-1">{job.employer.companyName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>
                          {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                                         <div className="flex items-center text-sm text-gray-500">
                       <Calendar className="w-4 h-4 mr-2" />
                       <span>Submitted: {job.submittedAt?.toLocaleDateString()}</span>
                     </div>
                     {job.testPaper && (
                       <div className="flex items-center text-sm text-blue-600 mt-1">
                         <FileText className="w-4 h-4 mr-2" />
                         <span>Test Paper: {job.testPaper.fileName}</span>
                         {job.testPaper.hasAnswerSheet && (
                           <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                             With Answer Sheet
                           </span>
                         )}
                       </div>
                     )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </button>
                    
                    {job.status === 'submitted' && (
                      <>
                        <button
                          onClick={() => handleApprove(job.id)}
                          disabled={isLoading}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(job.id)}
                          disabled={isLoading}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </>
                    )}
                    
                    {job.status === 'approved' && (
                      <button
                        onClick={() => handlePublish(job.id)}
                        disabled={isLoading}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="p-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No job requirements found</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Job Requirement Details</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Job Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Position:</span>
                        <p className="font-medium">{selectedJob.position}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Location:</span>
                        <p className="font-medium">{selectedJob.location}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Salary Range:</span>
                        <p className="font-medium">
                          {selectedJob.salaryRange.currency} {selectedJob.salaryRange.min.toLocaleString()} - {selectedJob.salaryRange.max.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Visible to Candidates:</span>
                        <p className="font-medium">{selectedJob.viewToCandidates ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information (Hidden from Public)</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Company Name:</span>
                        <p className="font-medium">{selectedJob.employer.companyName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Contact Email:</span>
                        <p className="font-medium">{selectedJob.employer.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedJob.status)}`}>
                          {getStatusIcon(selectedJob.status)}
                          <span className="ml-1 capitalize">{selectedJob.status}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Submitted:</span>
                        <p className="font-medium">{selectedJob.submittedAt?.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.jobDescription}</p>
                  </div>
                </div>
                
                {/* Job Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Requirements</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.jobRequirements}</p>
                  </div>
                </div>
                
                {/* Public Advertisement Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Advertisement Preview</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeOff className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Client name will be hidden in public posting</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                      {generatePublicAd(selectedJob)}
                    </pre>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  {selectedJob.status === 'submitted' && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedJob.id)}
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(selectedJob.id)}
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  
                  {selectedJob.status === 'approved' && (
                    <button
                      onClick={() => handlePublish(selectedJob.id)}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Publish to Portal
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRequirements;
