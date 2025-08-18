import { FC, useState, useEffect } from 'react';
import {
  User,
  FileText,
  Eye,
  Download,
  Search,
  Filter,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Mail,
  Shield,
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  Star
} from 'lucide-react';

interface CandidateApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  cv: File | null;
  photograph: File | null;
  coverLetter: string;
  consentToDataProcessing: boolean;
  consentToClientSharing: boolean;
  submittedAt: string;
  clientSafeVersion: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    cv: File | null;
    photograph: File | null;
    coverLetter: string;
  };
}

const CandidateApplications: FC = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<CandidateApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [viewMode, setViewMode] = useState<'admin' | 'client'>('admin');
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null);

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = JSON.parse(localStorage.getItem('candidateApplications') || '[]');
    setApplications(storedApplications);
    setFilteredApplications(storedApplications);
  }, []);

  useEffect(() => {
    // Filter applications based on search and position
    let filtered = applications;
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedPosition) {
      filtered = filtered.filter(app => app.position === selectedPosition);
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchTerm, selectedPosition]);

  const getPositions = () => {
    const positions = applications.map(app => app.position);
    return [...new Set(positions)];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewApplication = (application: CandidateApplication) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  const getApplicationData = (application: CandidateApplication) => {
    return viewMode === 'admin' ? application : application.clientSafeVersion;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
              <p className="text-gray-600">
                Review and manage candidate applications. Toggle between admin and client view modes.
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">View Mode:</span>
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('admin')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      viewMode === 'admin'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Shield className="w-4 h-4 inline mr-1" />
                    Admin
                  </button>
                  <button
                    onClick={() => setViewMode('client')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      viewMode === 'client'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Applications
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by name or position..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Position
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Positions</option>
                {getPositions().map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedPosition('');
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
              {viewMode === 'client' && (
                <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  Client View - Personal Info Protected
                </span>
              )}
            </h2>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedPosition 
                  ? 'Try adjusting your search criteria.'
                  : 'No applications have been submitted yet.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => {
                const appData = getApplicationData(application);
                return (
                  <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {viewMode === 'admin' ? (
                              `${application.firstName} ${application.lastName}`
                            ) : (
                              '[REDACTED]'
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{appData.position}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(application.submittedAt)}
                            </span>
                            {viewMode === 'admin' && (
                              <>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {application.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {application.phone}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {application.cv && (
                          <button
                            onClick={() => {/* Handle CV download */}}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Download CV"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleViewApplication(application)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 inline mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Details
                  {viewMode === 'client' && (
                    <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Client View
                    </span>
                  )}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">
                        {viewMode === 'admin' 
                          ? `${selectedApplication.firstName} ${selectedApplication.lastName}`
                          : '[REDACTED]'
                        }
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">
                        {viewMode === 'admin' ? selectedApplication.email : '[REDACTED]'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900">
                        {viewMode === 'admin' ? selectedApplication.phone : '[REDACTED]'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <p className="text-gray-900">{selectedApplication.position}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted</label>
                      <p className="text-gray-900">{formatDate(selectedApplication.submittedAt)}</p>
                    </div>
                  </div>
                </div>
                
                                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                   <div className="space-y-3">
                                           <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium">CV/Resume</span>
                        </div>
                        {selectedApplication.cv && (
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Photograph</span>
                      </div>
                      {selectedApplication.photograph && (
                        <button className="text-green-600 hover:text-green-700 text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
                             <div className="mt-6">
                 <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Letter</h3>
                 <div className="p-4 bg-gray-50 rounded-lg">
                   <p className="text-gray-700 whitespace-pre-wrap">
                     {selectedApplication.coverLetter || 'No cover letter provided.'}
                   </p>
                 </div>
               </div>
              
              {viewMode === 'admin' && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Consent Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      {selectedApplication.consentToDataProcessing ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm">Data Processing Consent</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedApplication.consentToClientSharing ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm">Client Sharing Consent</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {/* Handle application actions */}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Process Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateApplications;
