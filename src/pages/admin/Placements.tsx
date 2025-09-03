import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
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
  Building2,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

interface Placement {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  companyName: string;
  status: 'active' | 'completed' | 'terminated' | 'pending';
  placementDate: string;
  startDate: string;
  salary: string;
  commission: string;
  commissionPaid: boolean;
  location: string;
  recruiter: string;
  notes: string;
}

const Placements: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);

  const placements: Placement[] = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Corp',
      status: 'active',
      placementDate: '2024-01-15',
      startDate: '2024-02-01',
      salary: '$120,000',
      commission: '$12,000',
      commissionPaid: true,
      location: 'San Francisco, CA',
      recruiter: 'Sarah Johnson',
      notes: 'Great placement, candidate is performing well'
    },
    {
      id: '2',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@email.com',
      jobTitle: 'Full Stack Developer',
      companyName: 'Startup Inc',
      status: 'active',
      placementDate: '2024-01-10',
      startDate: '2024-01-25',
      salary: '$95,000',
      commission: '$9,500',
      commissionPaid: false,
      location: 'New York, NY',
      recruiter: 'Mike Chen',
      notes: 'Fast-growing company, good cultural fit'
    },
    {
      id: '3',
      candidateName: 'Mike Chen',
      candidateEmail: 'mike.chen@email.com',
      jobTitle: 'React Developer',
      companyName: 'Digital Agency',
      status: 'completed',
      placementDate: '2023-12-15',
      startDate: '2024-01-02',
      salary: '$85,000',
      commission: '$8,500',
      commissionPaid: true,
      location: 'Austin, TX',
      recruiter: 'Emily Rodriguez',
      notes: 'Successfully completed contract period'
    },
    {
      id: '4',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.r@email.com',
      jobTitle: 'Frontend Developer',
      companyName: 'E-commerce Platform',
      status: 'terminated',
      placementDate: '2023-11-20',
      startDate: '2023-12-01',
      salary: '$75,000',
      commission: '$7,500',
      commissionPaid: true,
      location: 'Seattle, WA',
      recruiter: 'David Kim',
      notes: 'Terminated due to company restructuring'
    },
    {
      id: '5',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      jobTitle: 'Backend Engineer',
      companyName: 'FinTech Solutions',
      status: 'pending',
      placementDate: '2024-01-25',
      startDate: '2024-02-15',
      salary: '$110,000',
      commission: '$11,000',
      commissionPaid: false,
      location: 'Chicago, IL',
      recruiter: 'Lisa Wang',
      notes: 'Pending background check completion'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'terminated':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <Award className="w-4 h-4" />;
      case 'terminated':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
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

  const filteredPlacements = placements.filter(placement => {
    const matchesSearch = placement.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || placement.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || placement.companyName === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const sortedPlacements = [...filteredPlacements].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.placementDate).getTime() - new Date(a.placementDate).getTime();
    }
    if (sortBy === 'candidate') {
      return a.candidateName.localeCompare(b.candidateName);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'commission') {
      return parseInt(b.commission.replace('$', '').replace(',', '')) - parseInt(a.commission.replace('$', '').replace(',', ''));
    }
    return 0;
  });

  const handleSelectPlacement = (placementId: string) => {
    setSelectedPlacements(prev => 
      prev.includes(placementId) 
        ? prev.filter(id => id !== placementId)
        : [...prev, placementId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPlacements.length === sortedPlacements.length) {
      setSelectedPlacements([]);
    } else {
      setSelectedPlacements(sortedPlacements.map(p => p.id));
    }
  };

  return (
    
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Placements</h1>
            <p className="text-gray-600">Track successful placements and commissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <Link
              to="/admin/placements/add"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Placement
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
                    placeholder="Search placements..."
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
                  <option value="completed">Completed</option>
                  <option value="terminated">Terminated</option>
                  <option value="pending">Pending</option>
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
                  <option value="commission">Sort by Commission</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPlacements.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedPlacements.length} placement(s) selected
                </span>
                <button
                  onClick={() => setSelectedPlacements([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">
                  Mark Complete
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placements List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Placements ({sortedPlacements.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {sortedPlacements.length} of {placements.length} placements</span>
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
                      checked={selectedPlacements.length === sortedPlacements.length && sortedPlacements.length > 0}
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
                    Financial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPlacements.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPlacements.includes(placement.id)}
                        onChange={() => handleSelectPlacement(placement.id)}
                        className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {placement.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{placement.candidateName}</div>
                          <div className="text-sm text-gray-500">{placement.candidateEmail}</div>
                          <div className="text-xs text-gray-400">{placement.recruiter}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{placement.jobTitle}</div>
                        <div className="text-sm text-[#114373] font-medium">{placement.companyName}</div>
                        <div className="text-xs text-gray-500">{placement.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{placement.salary}</div>
                        <div className="text-sm text-green-600 font-medium">{placement.commission}</div>
                        <div className={`text-xs ${placement.commissionPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                          {placement.commissionPaid ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(placement.status).split(' ')[0]} mr-2`}></div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(placement.status)}`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(placement.status)}
                            {placement.status.charAt(0).toUpperCase() + placement.status.slice(1)}
                          </div>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div>Placed: {formatDate(placement.placementDate)}</div>
                        <div>Start: {formatDate(placement.startDate)}</div>
                      </div>
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
          
          {sortedPlacements.length === 0 && (
            <div className="p-12 text-center">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No placements found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Link
                to="/admin/placements/add"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Add Placement
              </Link>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Placements; 