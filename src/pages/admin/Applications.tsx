import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
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
  Calendar,
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
  ChevronDown
} from 'lucide-react';

interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  companyName: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastUpdated: string;
  location: string;
  salary: string;
  experience: string;
  skills: string[];
  notes: string;
}

const Applications: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  const applications: Application[] = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Corp',
      status: 'shortlisted',
      appliedDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      experience: '5 years',
      skills: ['React', 'Node.js', 'Python'],
      notes: 'Strong technical background'
    },
    {
      id: '2',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@email.com',
      jobTitle: 'Full Stack Developer',
      companyName: 'Startup Inc',
      status: 'interviewed',
      appliedDate: '2024-01-18',
      lastUpdated: '2024-01-22',
      location: 'New York, NY',
      salary: '$80k - $110k',
      experience: '7 years',
      skills: ['Java', 'Spring', 'AWS'],
      notes: 'Excellent problem-solving skills'
    },
    {
      id: '3',
      candidateName: 'Mike Chen',
      candidateEmail: 'mike.chen@email.com',
      jobTitle: 'React Developer',
      companyName: 'Digital Agency',
      status: 'selected',
      appliedDate: '2024-01-20',
      lastUpdated: '2024-01-25',
      location: 'Austin, TX',
      salary: '$85k - $115k',
      experience: '4 years',
      skills: ['Python', 'Django', 'PostgreSQL'],
      notes: 'Great team player'
    },
    {
      id: '4',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.r@email.com',
      jobTitle: 'Frontend Developer',
      companyName: 'E-commerce Platform',
      status: 'rejected',
      appliedDate: '2024-01-25',
      lastUpdated: '2024-01-28',
      location: 'Seattle, WA',
      salary: '$75k - $100k',
      experience: '3 years',
      skills: ['JavaScript', 'React', 'TypeScript'],
      notes: 'Not a good cultural fit'
    },
    {
      id: '5',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      jobTitle: 'Backend Engineer',
      companyName: 'FinTech Solutions',
      status: 'applied',
      appliedDate: '2024-01-30',
      lastUpdated: '2024-01-30',
      location: 'Chicago, IL',
      salary: '$95k - $130k',
      experience: '6 years',
      skills: ['C#', '.NET', 'SQL Server'],
      notes: 'Recently applied, under review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shortlisted':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'interviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'selected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'withdrawn':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <FileText className="w-4 h-4" />;
      case 'shortlisted':
        return <UserCheck className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      case 'withdrawn':
        return <XCircle className="w-4 h-4" />;
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

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || application.companyName === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
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

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedApplications.length === sortedApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(sortedApplications.map(a => a.id));
    }
  };

  return (
    
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600">Track and manage all job applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <Link
              to="/admin/applications/add"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Application
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
                    placeholder="Search applications..."
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
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
              <div>
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  <option value="all">All Companies</option>
                  <option value="Tech Corp">Tech Corp</option>
                  <option value="Startup Inc">Startup Inc</option>
                  <option value="Digital Agency">Digital Agency</option>
                  <option value="E-commerce Platform">E-commerce Platform</option>
                  <option value="FinTech Solutions">FinTech Solutions</option>
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
        {selectedApplications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedApplications.length} application(s) selected
                </span>
                <button
                  onClick={() => setSelectedApplications([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200">
                  Shortlist
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                  Reject
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

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
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedApplications.length === sortedApplications.length && sortedApplications.length > 0}
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={() => handleSelectApplication(application.id)}
                        className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {application.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.candidateName}</div>
                          <div className="text-sm text-gray-500">{application.candidateEmail}</div>
                          <div className="text-xs text-gray-400">{application.experience}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                        <div className="text-sm text-[#114373] font-medium">{application.companyName}</div>
                        <div className="text-xs text-gray-500">{application.salary}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(application.status).split(' ')[0]} mr-2`}></div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(application.status)}`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(application.status)}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {application.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.appliedDate)}
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
          
          {sortedApplications.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Link
                to="/admin/applications/add"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Add Application
              </Link>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Applications; 