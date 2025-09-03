import { FC, useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Star,
  Eye,
  Download,
  Filter,
  Search,
  MapPin,
  Building2,
  Clock,
  Award,
  UserCheck,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface Placement {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  company: string;
  placementDate: string;
  salary: string;
  commission: string;
  status: 'active' | 'completed' | 'terminated';
  contractType: string;
  location: string;
  startDate: string;
  endDate?: string;
  performance: number;
  notes: string;
}

const Placements: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const placements: Placement[] = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      candidatePhone: '+1 (555) 123-4567',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      placementDate: '2024-01-15',
      salary: '$95,000',
      commission: '$4,750',
      status: 'active',
      contractType: 'Full-time',
      location: 'San Francisco, CA',
      startDate: '2024-02-01',
      performance: 4.8,
      notes: 'Excellent performance, great team fit'
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      candidatePhone: '+1 (555) 234-5678',
      jobTitle: 'Product Manager',
      company: 'Startup Inc',
      placementDate: '2024-01-10',
      salary: '$110,000',
      commission: '$5,500',
      status: 'active',
      contractType: 'Full-time',
      location: 'Remote',
      startDate: '2024-01-25',
      performance: 4.5,
      notes: 'Strong leadership skills, adapting well'
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      candidatePhone: '+1 (555) 345-6789',
      jobTitle: 'UX Designer',
      company: 'Design Studio',
      placementDate: '2023-12-20',
      salary: '$85,000',
      commission: '$4,250',
      status: 'completed',
      contractType: 'Contract',
      location: 'New York, NY',
      startDate: '2024-01-05',
      endDate: '2024-06-30',
      performance: 4.9,
      notes: 'Project completed successfully'
    },
    {
      id: '4',
      candidateName: 'David Kim',
      candidateEmail: 'david.kim@email.com',
      candidatePhone: '+1 (555) 456-7890',
      jobTitle: 'Data Scientist',
      company: 'Analytics Corp',
      placementDate: '2023-11-15',
      salary: '$120,000',
      commission: '$6,000',
      status: 'active',
      contractType: 'Full-time',
      location: 'Boston, MA',
      startDate: '2023-12-01',
      performance: 4.2,
      notes: 'Good technical skills, improving communication'
    },
    {
      id: '5',
      candidateName: 'Lisa Thompson',
      candidateEmail: 'lisa.thompson@email.com',
      candidatePhone: '+1 (555) 567-8901',
      jobTitle: 'Marketing Manager',
      company: 'Brand Agency',
      placementDate: '2023-10-30',
      salary: '$90,000',
      commission: '$4,500',
      status: 'terminated',
      contractType: 'Full-time',
      location: 'Los Angeles, CA',
      startDate: '2023-11-15',
      endDate: '2024-03-15',
      performance: 3.5,
      notes: 'Position eliminated due to restructuring'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <Award className="w-4 h-4" />;
      case 'terminated':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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
                         placement.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || placement.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedPlacements = [...filteredPlacements].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.placementDate).getTime() - new Date(a.placementDate).getTime();
      case 'name':
        return a.candidateName.localeCompare(b.candidateName);
      case 'salary':
        return parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, ''));
      case 'performance':
        return b.performance - a.performance;
      default:
        return 0;
    }
  });

  const totalCommission = placements.reduce((sum, placement) => 
    sum + parseFloat(placement.commission.replace(/[^0-9.]/g, '')), 0
  );

  const activePlacements = placements.filter(p => p.status === 'active').length;
  const completedPlacements = placements.filter(p => p.status === 'completed').length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Placements</h1>
          <p className="text-gray-600">Track your successful job placements and candidates</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Placements</p>
              <p className="text-2xl font-bold text-gray-900">{placements.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Placements</p>
              <p className="text-2xl font-bold text-green-600">{activePlacements}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{completedPlacements}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-gray-900">${totalCommission.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="terminated">Terminated</option>
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
                <option value="salary">Sort by Salary</option>
                <option value="performance">Sort by Performance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

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
        
        <div className="divide-y divide-gray-200">
          {sortedPlacements.map((placement) => (
            <div key={placement.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {placement.candidateName}
                      </h3>
                      <p className="text-[#114373] font-medium mb-2">{placement.jobTitle}</p>
                      <p className="text-gray-600 text-sm">{placement.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(placement.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(placement.status)}
                          {placement.status.charAt(0).toUpperCase() + placement.status.slice(1)}
                        </div>
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Placed: {formatDate(placement.placementDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Salary: {placement.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {placement.contractType}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {placement.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Performance: {placement.performance}/5.0
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Commission: {placement.commission}
                    </div>
                  </div>
                  
                  {placement.notes && (
                    <p className="text-sm text-gray-600 mb-3 italic">"{placement.notes}"</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Contact
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <FileText className="w-4 h-4" />
                  Documents
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <ExternalLink className="w-4 h-4" />
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sortedPlacements.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No placements found</h3>
            <p className="text-gray-600 mb-6">Start tracking your successful job placements</p>
            <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
              Create Placement
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Placements; 