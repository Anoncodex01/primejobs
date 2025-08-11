import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  FileText,
  Calendar,
  Award,
  Receipt,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  UserX,
  UserPlus,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  Download,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Target,
  Zap,
  RefreshCw,
  Bell,
  Star,
  Briefcase,
  GraduationCap,
  Shield,
  Settings,
  Plus,
  Edit,
  Trash2,
  Archive,
  Share2,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: JSX.Element;
  color: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'placed';
  appliedDate: string;
  lastActivity: string;
  skills: string[];
  experience: string;
  location: string;
  avatar?: string;
}

interface Placement {
  id: string;
  candidateName: string;
  companyName: string;
  position: string;
  placementDate: string;
  salary: string;
  commission: string;
  status: 'active' | 'completed' | 'terminated';
}

interface Invoice {
  id: string;
  clientName: string;
  amount: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  placementId: string;
}

const Dashboard: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedView, setSelectedView] = useState('overview');

  // Dashboard Statistics
  const stats: DashboardStats[] = [
    {
      title: 'Total Candidates',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Employers',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Applications',
      value: '3,456',
      change: '+18%',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Placements',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      title: 'Revenue',
      value: '$284,500',
      change: '+23%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-emerald-500'
    },
    {
      title: 'Pending Invoices',
      value: '23',
      change: '-3%',
      trend: 'down',
      icon: <Receipt className="w-6 h-6" />,
      color: 'bg-red-500'
    }
  ];

  // Recent Candidates
  const recentCandidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      status: 'shortlisted',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-20',
      skills: ['React', 'Node.js', 'Python'],
      experience: '5 years',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      status: 'interviewed',
      appliedDate: '2024-01-18',
      lastActivity: '2024-01-22',
      skills: ['Java', 'Spring', 'AWS'],
      experience: '7 years',
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 345-6789',
      status: 'selected',
      appliedDate: '2024-01-20',
      lastActivity: '2024-01-25',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '4 years',
      location: 'Austin, TX'
    }
  ];

  // Recent Placements
  const recentPlacements: Placement[] = [
    {
      id: '1',
      candidateName: 'Emily Rodriguez',
      companyName: 'Tech Corp',
      position: 'Senior Software Engineer',
      placementDate: '2024-01-15',
      salary: '$120,000',
      commission: '$12,000',
      status: 'active'
    },
    {
      id: '2',
      candidateName: 'David Kim',
      companyName: 'Startup Inc',
      position: 'Full Stack Developer',
      placementDate: '2024-01-10',
      salary: '$95,000',
      commission: '$9,500',
      status: 'active'
    }
  ];

  // Pending Invoices
  const pendingInvoices: Invoice[] = [
    {
      id: '1',
      clientName: 'Tech Corp',
      amount: '$12,000',
      dueDate: '2024-02-15',
      status: 'pending',
      placementId: '1'
    },
    {
      id: '2',
      clientName: 'Startup Inc',
      amount: '$9,500',
      dueDate: '2024-02-10',
      status: 'overdue',
      placementId: '2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'selected':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'placed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <UserPlus className="w-4 h-4" />;
      case 'shortlisted':
        return <UserCheck className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      case 'placed':
        return <Award className="w-4 h-4" />;
      default:
        return <UserPlus className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of recruitment pipeline and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Pipeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Candidate Pipeline</h3>
                <Link to="/admin/candidates" className="text-[#114373] hover:underline text-sm font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{candidate.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(candidate.status)}
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </div>
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Link
                to="/admin/candidates/add"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <UserPlus className="w-5 h-5 text-[#114373]" />
                <span className="text-sm font-medium">Add Candidate</span>
              </Link>
              <Link
                to="/admin/employers/add"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Building2 className="w-5 h-5 text-[#114373]" />
                <span className="text-sm font-medium">Add Employer</span>
              </Link>
              <Link
                to="/admin/interviews/schedule"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Calendar className="w-5 h-5 text-[#114373]" />
                <span className="text-sm font-medium">Schedule Interview</span>
              </Link>
              <Link
                to="/admin/invoices/create"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Receipt className="w-5 h-5 text-[#114373]" />
                <span className="text-sm font-medium">Create Invoice</span>
              </Link>
            </div>
          </div>

          {/* Recent Placements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Placements</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentPlacements.map((placement) => (
                <div key={placement.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{placement.candidateName}</h4>
                    <span className="text-sm text-green-600 font-medium">{placement.commission}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{placement.position}</p>
                  <p className="text-sm text-[#114373] font-medium">{placement.companyName}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>Placed: {formatDate(placement.placementDate)}</span>
                    <span>Salary: {placement.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Pending Invoices</h3>
            </div>
            <div className="p-6 space-y-4">
              {pendingInvoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{invoice.clientName}</h4>
                    <span className={`text-sm font-medium ${
                      invoice.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {invoice.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Due: {formatDate(invoice.dueDate)}</span>
                    <span className={`px-2 py-1 rounded ${
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HR Consultant Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">HR Consultant Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#114373] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Senior HR Consultant</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500">Placements</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4ebf9e] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">SJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">HR Consultant</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">18</p>
                  <p className="text-xs text-gray-500">Placements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Center */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Communication Center</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5 text-[#114373]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Call Candidate</p>
                  <p className="text-xs text-gray-500">Direct phone communication</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-[#114373]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Send Email</p>
                  <p className="text-xs text-gray-500">Professional email communication</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-5 h-5 text-[#114373]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">Instant messaging</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-5 h-5 text-[#114373]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Schedule Interview</p>
                  <p className="text-xs text-gray-500">Book interview slots</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 