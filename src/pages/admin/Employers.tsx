import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
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
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Globe,
  ExternalLink
} from 'lucide-react';

interface Employer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'verified' | 'profile_pending';
  industry: string;
  location: string;
  website: string;
  contactPerson: string;
  totalJobs: number;
  activeJobs: number;
  totalPlacements: number;
  joinedDate: string;
  lastActivity: string;
  notes: string;
  profileStatus?: 'incomplete' | 'pending' | 'approved';
}

const Employers: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedEmployers, setSelectedEmployers] = useState<string[]>([]);

  const employers: Employer[] = [
    {
      id: '1',
      name: 'Tech Corp',
      email: 'hr@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      industry: 'Technology',
      location: 'San Francisco, CA',
      website: 'www.techcorp.com',
      contactPerson: 'Sarah Johnson',
      totalJobs: 15,
      activeJobs: 8,
      totalPlacements: 12,
      joinedDate: '2023-01-15',
      lastActivity: '2024-01-20',
      notes: 'Great client, pays on time'
    },
    {
      id: '2',
      name: 'Startup Inc',
      email: 'careers@startupinc.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      industry: 'Technology',
      location: 'New York, NY',
      website: 'www.startupinc.com',
      contactPerson: 'Mike Chen',
      totalJobs: 8,
      activeJobs: 3,
      totalPlacements: 5,
      joinedDate: '2023-03-20',
      lastActivity: '2024-01-18',
      notes: 'Fast-growing company'
    },
    {
      id: '3',
      name: 'Digital Agency',
      email: 'jobs@digitalagency.com',
      phone: '+1 (555) 345-6789',
      status: 'verified',
      industry: 'Marketing',
      location: 'Austin, TX',
      website: 'www.digitalagency.com',
      contactPerson: 'Emily Rodriguez',
      totalJobs: 12,
      activeJobs: 6,
      totalPlacements: 8,
      joinedDate: '2023-02-10',
      lastActivity: '2024-01-22',
      notes: 'Creative environment'
    },
    {
      id: '4',
      name: 'E-commerce Platform',
      email: 'talent@ecommerce.com',
      phone: '+1 (555) 456-7890',
      status: 'profile_pending',
      industry: 'E-commerce',
      location: 'Seattle, WA',
      website: 'www.ecommerce.com',
      contactPerson: 'David Kim',
      totalJobs: 0,
      activeJobs: 0,
      totalPlacements: 0,
      joinedDate: '2024-01-05',
      lastActivity: '2024-01-15',
      notes: 'Profile submitted, awaiting approval',
      profileStatus: 'pending'
    },
    {
      id: '5',
      name: 'FinTech Solutions',
      email: 'hr@fintech.com',
      phone: '+1 (555) 567-8901',
      status: 'inactive',
      industry: 'Finance',
      location: 'Chicago, IL',
      website: 'www.fintech.com',
      contactPerson: 'Lisa Wang',
      totalJobs: 20,
      activeJobs: 0,
      totalPlacements: 15,
      joinedDate: '2022-11-15',
      lastActivity: '2023-12-10',
      notes: 'On hold due to budget cuts'
    },
    {
      id: '6',
      name: 'New Startup',
      email: 'hr@newstartup.com',
      phone: '+1 (555) 678-9012',
      status: 'profile_pending',
      industry: 'Technology',
      location: 'Boston, MA',
      website: 'www.newstartup.com',
      contactPerson: 'Alex Thompson',
      totalJobs: 0,
      activeJobs: 0,
      totalPlacements: 0,
      joinedDate: '2024-01-25',
      lastActivity: '2024-01-25',
      notes: 'Profile incomplete, needs completion',
      profileStatus: 'incomplete'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'verified':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'profile_pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'verified':
        return <Star className="w-4 h-4" />;
      case 'profile_pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || employer.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleApproveProfile = (employerId: string) => {
    // In a real app, this would make an API call
    console.log(`Approving profile for employer ${employerId}`);
    // Update localStorage to simulate approval
    localStorage.setItem('employerProfileComplete', 'approved');
    // You would typically update the employer status in your database here
  };

  const handleRejectProfile = (employerId: string) => {
    // In a real app, this would make an API call
    console.log(`Rejecting profile for employer ${employerId}`);
    // You would typically update the employer status in your database here
  };

  const sortedEmployers = [...filteredEmployers].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'placements') {
      return b.totalPlacements - a.totalPlacements;
    }
    return 0;
  });

  const handleSelectEmployer = (employerId: string) => {
    setSelectedEmployers(prev => 
      prev.includes(employerId) 
        ? prev.filter(id => id !== employerId)
        : [...prev, employerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployers.length === sortedEmployers.length) {
      setSelectedEmployers([]);
    } else {
      setSelectedEmployers(sortedEmployers.map(e => e.id));
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employers</h1>
          <p className="text-gray-600">Manage all employer accounts and relationships</p>
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
            to="/admin/employers/add"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employer
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="profile_pending">Profile Pending</option>
              </select>
            </div>
            <div>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="placements">Sort by Placements</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedEmployers.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedEmployers.length} employer(s) selected
              </span>
              <button
                onClick={() => setSelectedEmployers([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">
                Activate
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                Deactivate
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employers List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Employers ({sortedEmployers.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {sortedEmployers.length} of {employers.length} employers</span>
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
                    checked={selectedEmployers.length === sortedEmployers.length && sortedEmployers.length > 0}
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
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployers.map((employer) => (
                <tr key={employer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedEmployers.includes(employer.id)}
                      onChange={() => handleSelectEmployer(employer.id)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#114373] rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                        <div className="text-sm text-gray-500">{employer.email}</div>
                        <div className="text-xs text-gray-400">{employer.contactPerson}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(employer.status).split(' ')[0]} mr-2`}></div>
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(employer.status)}`}>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(employer.status)}
                          {employer.status === 'profile_pending' ? 'Profile Pending' : employer.status.charAt(0).toUpperCase() + employer.status.slice(1)}
                        </div>
                      </span>
                    </div>
                    {employer.profileStatus && (
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          employer.profileStatus === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : employer.profileStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          Profile: {employer.profileStatus.charAt(0).toUpperCase() + employer.profileStatus.slice(1)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employer.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{employer.activeJobs}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-500">{employer.totalJobs}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium">{employer.totalPlacements}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(employer.joinedDate)}
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
                        <Globe className="w-4 h-4" />
                      </button>
                      
                      {/* Profile Approval Buttons */}
                      {employer.status === 'profile_pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveProfile(employer.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Approve Profile"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleRejectProfile(employer.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Reject Profile"
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
        
        {sortedEmployers.length === 0 && (
          <div className="p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Link
              to="/admin/employers/add"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              Add Employer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employers; 