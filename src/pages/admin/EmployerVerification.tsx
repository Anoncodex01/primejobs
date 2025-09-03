import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Download,
  Upload,
  Star,
  Briefcase,
  DollarSign,
  Users,
  FileText,
  Globe,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  FileCheck,
  FileX,
  CheckSquare,
  Square
} from 'lucide-react';

interface EmployerVerification {
  id: string;
  employerId: string;
  employerName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  contactPerson: string;
  submittedDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'requires_info';
  verificationType: 'new_registration' | 'profile_update' | 'renewal';
  documents: Array<{
    name: string;
    type: 'business_license' | 'tax_certificate' | 'company_registration' | 'identity_proof' | 'other';
    status: 'pending' | 'approved' | 'rejected';
    uploadedAt: string;
    notes?: string;
  }>;
  verificationNotes: string;
  assignedTo?: string;
  lastUpdated: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const EmployerVerification: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [verificationTypeFilter, setVerificationTypeFilter] = useState<string>('all');
  const [selectedVerifications, setSelectedVerifications] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<EmployerVerification | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const verifications: EmployerVerification[] = [
    {
      id: '1',
      employerId: 'EMP001',
      employerName: 'Tech Corp',
      email: 'hr@techcorp.com',
      phone: '+1 (555) 123-4567',
      website: 'www.techcorp.com',
      industry: 'Technology',
      location: 'San Francisco, CA',
      contactPerson: 'Sarah Johnson',
      submittedDate: '2024-01-20',
      status: 'pending',
      verificationType: 'new_registration',
      documents: [
        {
          name: 'Business License.pdf',
          type: 'business_license',
          status: 'pending',
          uploadedAt: '2024-01-20'
        },
        {
          name: 'Tax Certificate.pdf',
          type: 'tax_certificate',
          status: 'pending',
          uploadedAt: '2024-01-20'
        },
        {
          name: 'Company Registration.pdf',
          type: 'company_registration',
          status: 'pending',
          uploadedAt: '2024-01-20'
        }
      ],
      verificationNotes: 'New technology company seeking to post software engineering positions. All required documents submitted.',
      assignedTo: 'Admin User',
      lastUpdated: '2024-01-20',
      priority: 'medium'
    },
    {
      id: '2',
      employerId: 'EMP002',
      employerName: 'Startup Inc',
      email: 'careers@startupinc.com',
      phone: '+1 (555) 234-5678',
      website: 'www.startupinc.com',
      industry: 'Technology',
      location: 'New York, NY',
      contactPerson: 'Mike Chen',
      submittedDate: '2024-01-18',
      status: 'under_review',
      verificationType: 'profile_update',
      documents: [
        {
          name: 'Updated Business License.pdf',
          type: 'business_license',
          status: 'approved',
          uploadedAt: '2024-01-18'
        },
        {
          name: 'New Tax Certificate.pdf',
          type: 'tax_certificate',
          status: 'pending',
          uploadedAt: '2024-01-18'
        }
      ],
      verificationNotes: 'Updating company information and expanding job postings. Tax certificate needs verification.',
      assignedTo: 'Admin User',
      lastUpdated: '2024-01-19',
      priority: 'high'
    },
    {
      id: '3',
      employerId: 'EMP003',
      employerName: 'Digital Agency',
      email: 'jobs@digitalagency.com',
      phone: '+1 (555) 345-6789',
      website: 'www.digitalagency.com',
      industry: 'Marketing',
      location: 'Austin, TX',
      contactPerson: 'Emily Rodriguez',
      submittedDate: '2024-01-15',
      status: 'requires_info',
      verificationType: 'new_registration',
      documents: [
        {
          name: 'Business License.pdf',
          type: 'business_license',
          status: 'approved',
          uploadedAt: '2024-01-15'
        },
        {
          name: 'Tax Certificate.pdf',
          type: 'tax_certificate',
          status: 'rejected',
          uploadedAt: '2024-01-15',
          notes: 'Document expired, needs current version'
        }
      ],
      verificationNotes: 'Marketing agency seeking to hire creative professionals. Tax certificate is expired and needs renewal.',
      assignedTo: 'Admin User',
      lastUpdated: '2024-01-17',
      priority: 'medium'
    },
    {
      id: '4',
      employerId: 'EMP004',
      employerName: 'E-commerce Platform',
      email: 'talent@ecommerce.com',
      phone: '+1 (555) 456-7890',
      website: 'www.ecommerce.com',
      industry: 'E-commerce',
      location: 'Seattle, WA',
      contactPerson: 'David Kim',
      submittedDate: '2024-01-10',
      status: 'approved',
      verificationType: 'new_registration',
      documents: [
        {
          name: 'Business License.pdf',
          type: 'business_license',
          status: 'approved',
          uploadedAt: '2024-01-10'
        },
        {
          name: 'Tax Certificate.pdf',
          type: 'tax_certificate',
          status: 'approved',
          uploadedAt: '2024-01-10'
        },
        {
          name: 'Company Registration.pdf',
          type: 'company_registration',
          status: 'approved',
          uploadedAt: '2024-01-10'
        }
      ],
      verificationNotes: 'E-commerce platform verified and approved. Ready to post positions.',
      assignedTo: 'Admin User',
      lastUpdated: '2024-01-12',
      priority: 'low'
    },
    {
      id: '5',
      employerId: 'EMP005',
      employerName: 'FinTech Solutions',
      email: 'hr@fintech.com',
      phone: '+1 (555) 567-8901',
      website: 'www.fintech.com',
      industry: 'Finance',
      location: 'Chicago, IL',
      contactPerson: 'Lisa Wang',
      submittedDate: '2024-01-05',
      status: 'rejected',
      verificationType: 'renewal',
      documents: [
        {
          name: 'Business License.pdf',
          type: 'business_license',
          status: 'rejected',
          uploadedAt: '2024-01-05',
          notes: 'License expired and company status unclear'
        },
        {
          name: 'Tax Certificate.pdf',
          type: 'tax_certificate',
          status: 'rejected',
          uploadedAt: '2024-01-05',
          notes: 'Tax compliance issues detected'
        }
      ],
      verificationNotes: 'Company has compliance issues and expired licenses. Rejected until resolved.',
      assignedTo: 'Admin User',
      lastUpdated: '2024-01-08',
      priority: 'urgent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'under_review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'requires_info':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'under_review':
        return <Eye className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'requires_info':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || verification.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || verification.priority === priorityFilter;
    const matchesType = verificationTypeFilter === 'all' || verification.verificationType === verificationTypeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  const sortedVerifications = [...filteredVerifications].sort((a, b) => {
    // Sort by priority first, then by date
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
  });

  const handleSelectVerification = (verificationId: string) => {
    setSelectedVerifications(prev => 
      prev.includes(verificationId) 
        ? prev.filter(id => id !== verificationId)
        : [...prev, verificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVerifications.length === sortedVerifications.length) {
      setSelectedVerifications([]);
    } else {
      setSelectedVerifications(sortedVerifications.map(v => v.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for verifications:`, selectedVerifications);
    setSelectedVerifications([]);
    setShowBulkActions(false);
  };

  const handleVerificationAction = (verificationId: string, action: string) => {
    console.log(`Action: ${action} for verification:`, verificationId);
    // In real app, call API to update verification status
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Verification</h1>
          <p className="text-gray-600">Review and verify employer registrations and profile updates</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
            <Shield className="w-4 h-4 mr-2" />
            Verification Guidelines
          </button>
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
                  placeholder="Search employers..."
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
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="requires_info">Requires Info</option>
              </select>
            </div>
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <select
                value={verificationTypeFilter}
                onChange={(e) => setVerificationTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="new_registration">New Registration</option>
                <option value="profile_update">Profile Update</option>
                <option value="renewal">Renewal</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedVerifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedVerifications.length} verification(s) selected
              </span>
              <button
                onClick={() => setSelectedVerifications([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200"
              >
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
              >
                Reject All
              </button>
              <button
                onClick={() => handleBulkAction('assign')}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
              >
                Assign Reviewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Verifications ({sortedVerifications.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {sortedVerifications.length} of {verifications.length} verifications</span>
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
                    checked={selectedVerifications.length === sortedVerifications.length && sortedVerifications.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedVerifications.includes(verification.id)}
                      onChange={() => handleSelectVerification(verification.id)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{verification.employerName}</div>
                        <div className="text-sm text-gray-500">{verification.contactPerson}</div>
                        <div className="text-xs text-gray-400">{verification.industry} • {verification.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(verification.status)}`}>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(verification.status)}
                          {verification.status.replace('_', ' ').charAt(0).toUpperCase() + verification.status.replace('_', ' ').slice(1)}
                        </div>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                      {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {verification.verificationType.replace('_', ' ').charAt(0).toUpperCase() + verification.verificationType.replace('_', ' ').slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {verification.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-1">
                          {getDocumentStatusIcon(doc.status)}
                          <span className="text-xs text-gray-500">
                            {doc.type.replace('_', ' ').charAt(0).toUpperCase() + doc.type.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(verification.submittedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedVerification(verification);
                          setShowDetailModal(true);
                        }}
                        className="text-[#114373] hover:text-[#0d3559]"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {verification.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerificationAction(verification.id, 'approve')}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerificationAction(verification.id, 'reject')}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
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
        
        {sortedVerifications.length === 0 && (
          <div className="p-12 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Verification Detail Modal */}
      {showDetailModal && selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Verification Details</h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedVerification(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Employer Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Employer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <p className="text-sm text-gray-900">{selectedVerification.employerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                    <p className="text-sm text-gray-900">{selectedVerification.contactPerson}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedVerification.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedVerification.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <p className="text-sm text-gray-900">{selectedVerification.website}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                    <p className="text-sm text-gray-900">{selectedVerification.industry}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900">{selectedVerification.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                    <p className="text-sm text-gray-900">
                      {selectedVerification.verificationType.replace('_', ' ').charAt(0).toUpperCase() + selectedVerification.verificationType.replace('_', ' ').slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Documents</h4>
                <div className="space-y-3">
                  {selectedVerification.documents.map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getDocumentStatusIcon(doc.status)}
                          <div>
                            <h5 className="font-medium text-gray-900">{doc.name}</h5>
                            <p className="text-sm text-gray-600">
                              {doc.type.replace('_', ' ').charAt(0).toUpperCase() + doc.type.replace('_', ' ').slice(1)}
                            </p>
                            <p className="text-xs text-gray-500">Uploaded: {formatDate(doc.uploadedAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                      {doc.notes && (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm text-yellow-800">{doc.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Notes */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Notes</h4>
                <p className="text-gray-700">{selectedVerification.verificationNotes}</p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Verification Submitted</p>
                      <p className="text-xs text-gray-500">{formatDate(selectedVerification.submittedDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Updated</p>
                      <p className="text-xs text-gray-500">{formatDate(selectedVerification.lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Assigned to: {selectedVerification.assignedTo || 'Unassigned'}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedVerification(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedVerification.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Approve Verification
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Reject Verification
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Request More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerVerification;
