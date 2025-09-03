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
  User,
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
  ChevronDown,
  MessageCircle,
  Globe,
  BookOpen,
  Search,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  FileText as FileTextIcon,
  Award as AwardIcon,
  DollarSign as DollarSignIcon,
  Clock as ClockIcon,
  AlertTriangle,
  CheckSquare,
  Square,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Upload,
  Camera,
  Save,
  Eye as EyeIcon2,
  EyeOff as EyeOffIcon2,
  ArrowRight,
  ArrowLeft,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Bell as BellIcon,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon,
  Target as TargetIcon2,
  BarChart3 as BarChart3Icon,
  Settings as SettingsIcon
} from 'lucide-react';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: JSX.Element;
  color: string;
  link?: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  whatsapp?: {
    countryCode: string;
    number: string;
  };
  status: 'new' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'placed';
  appliedDate: string;
  lastActivity: string;
  skills: string[];
  experience: string;
  location: string;
  avatar?: string;
  nationality: string;
  currentCompany?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  education: Array<{
    degree: string;
    specialization: string;
    institute: string;
    yearOfPassing: string;
    isHighestQualification: boolean;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
}

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
  companyDetails?: {
    businessType: string;
    employeeCount: string;
    annualRevenue: string;
    foundedYear: string;
  };
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

interface RecentActivity {
  id: string;
  type: 'candidate_registered' | 'employer_registered' | 'job_posted' | 'application_submitted' | 'interview_scheduled' | 'placement_made' | 'invoice_generated' | 'profile_updated';
  title: string;
  description: string;
  timestamp: Date;
  relatedId: string;
  userType: 'candidate' | 'employer' | 'admin';
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
      color: 'bg-blue-500',
      link: '/admin/candidates'
    },
    {
      title: 'Active Employers',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-green-500',
      link: '/admin/employers'
    },
    {
      title: 'Applications',
      value: '3,456',
      change: '+18%',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500',
      link: '/admin/applications'
    },
    {
      title: 'Placements',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-orange-500',
      link: '/admin/placements'
    },
    {
      title: 'Revenue',
      value: '$284,500',
      change: '+23%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-emerald-500',
      link: '/admin/invoices'
    },
    {
      title: 'Pending Invoices',
      value: '23',
      change: '-3%',
      trend: 'down',
      icon: <Receipt className="w-6 h-6" />,
      color: 'bg-red-500',
      link: '/admin/invoices'
    }
  ];

  // Recent Candidates with comprehensive data
  const recentCandidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      whatsapp: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      status: 'shortlisted',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-20',
      skills: ['React', 'Node.js', 'Python'],
      experience: '5 years',
      location: 'San Francisco, CA',
      nationality: 'American',
      currentCompany: 'Tech Corp',
      expectedSalary: '$120,000',
      noticePeriod: '30 days',
      education: [
        {
          degree: 'Bachelor of Science',
          specialization: 'Computer Science',
          institute: 'Stanford University',
          yearOfPassing: '2019',
          isHighestQualification: true
        }
      ],
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Professional' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 234-5678'
      },
      status: 'interviewed',
      appliedDate: '2024-01-18',
      lastActivity: '2024-01-22',
      skills: ['Java', 'Spring', 'AWS'],
      experience: '7 years',
      location: 'New York, NY',
      nationality: 'Canadian',
      currentCompany: 'Finance Inc',
      expectedSalary: '$140,000',
      noticePeriod: '60 days',
      education: [
        {
          degree: 'Master of Science',
          specialization: 'Software Engineering',
          institute: 'MIT',
          yearOfPassing: '2017',
          isHighestQualification: true
        }
      ],
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'French', proficiency: 'Professional' }
      ]
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 345-6789'
      },
      status: 'selected',
      appliedDate: '2024-01-20',
      lastActivity: '2024-01-25',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '4 years',
      location: 'Austin, TX',
      nationality: 'Chinese',
      currentCompany: 'Startup Inc',
      expectedSalary: '$95,000',
      noticePeriod: '15 days',
      education: [
        {
          degree: 'Bachelor of Engineering',
          specialization: 'Computer Engineering',
          institute: 'University of Texas',
          yearOfPassing: '2020',
          isHighestQualification: true
        }
      ],
      languages: [
        { name: 'English', proficiency: 'Professional' },
        { name: 'Mandarin', proficiency: 'Native' }
      ]
    }
  ];

  // Recent Employers with comprehensive data
  const recentEmployers: Employer[] = [
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
      notes: 'Great client, pays on time',
      profileStatus: 'approved',
      companyDetails: {
        businessType: 'Private Limited Company',
        employeeCount: '500-1000',
        annualRevenue: '$50M - $100M',
        foundedYear: '2010'
      }
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
      notes: 'Fast-growing company',
      profileStatus: 'approved',
      companyDetails: {
        businessType: 'Private Limited Company',
        employeeCount: '50-200',
        annualRevenue: '$10M - $50M',
        foundedYear: '2018'
      }
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
      notes: 'Creative environment',
      profileStatus: 'approved',
      companyDetails: {
        businessType: 'Partnership',
        employeeCount: '100-500',
        annualRevenue: '$20M - $50M',
        foundedYear: '2015'
      }
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

  // Recent Activities
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'candidate_registered',
      title: 'New Candidate Registration',
      description: 'John Doe registered as a new candidate',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      relatedId: 'candidate-1',
      userType: 'candidate'
    },
    {
      id: '2',
      type: 'employer_registered',
      title: 'New Employer Registration',
      description: 'Tech Corp registered as a new employer',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      relatedId: 'employer-1',
      userType: 'employer'
    },
    {
      id: '3',
      type: 'job_posted',
      title: 'New Job Posted',
      description: 'Senior Software Engineer position posted by Tech Corp',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      relatedId: 'job-1',
      userType: 'employer'
    },
    {
      id: '4',
      type: 'application_submitted',
      title: 'Application Submitted',
      description: 'Sarah Johnson applied for Senior Software Engineer',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      relatedId: 'application-1',
      userType: 'candidate'
    },
    {
      id: '5',
      type: 'interview_scheduled',
      title: 'Interview Scheduled',
      description: 'Interview scheduled for Mike Chen with Digital Agency',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      relatedId: 'interview-1',
      userType: 'admin'
    },
    {
      id: '6',
      type: 'placement_made',
      title: 'Placement Made',
      description: 'Emily Rodriguez placed at Tech Corp as Senior Software Engineer',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      relatedId: 'placement-1',
      userType: 'admin'
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'candidate_registered':
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      case 'employer_registered':
        return <Building2 className="w-4 h-4 text-green-500" />;
      case 'job_posted':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'application_submitted':
        return <FileText className="w-4 h-4 text-orange-500" />;
      case 'interview_scheduled':
        return <Calendar className="w-4 h-4 text-indigo-500" />;
      case 'placement_made':
        return <Award className="w-4 h-4 text-emerald-500" />;
      case 'invoice_generated':
        return <Receipt className="w-4 h-4 text-red-500" />;
      case 'profile_updated':
        return <Edit className="w-4 h-4 text-gray-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of recruitment pipeline and performance metrics</p>
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
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Top Menu / Quick Access */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link
            to="/admin/enhanced-search"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Search className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">Candidate Search</span>
          </Link>
          <Link
            to="/admin/job-posting"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Post a Job</span>
          </Link>
          <Link
            to="/admin/application-management"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FileText className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Review Applications</span>
          </Link>
          <Link
            to="/admin/communications"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Messages</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-8 h-8 text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </Link>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link || '#'}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Activities & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <Link to="/admin/activities" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Management Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Job Management</h2>
                <Link to="/admin/job-management" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Pending Approval</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-900">12</p>
                  <Link to="/admin/job-management/pending" className="text-xs text-yellow-700 hover:text-yellow-900">
                    Review Now →
                  </Link>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Active Jobs</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">89</p>
                  <Link to="/admin/job-management/approved" className="text-xs text-green-700 hover:text-green-900">
                    View All →
                  </Link>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Flagged Jobs</span>
                  </div>
                  <p className="text-2xl font-bold text-red-900">3</p>
                  <Link to="/admin/job-management/flagged" className="text-xs text-red-700 hover:text-red-900">
                    Review Issues →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Application Workflow Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Application Workflow</h2>
                <Link to="/admin/application-management" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Pending Review</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">24</p>
                  <Link to="/admin/application-management" className="text-xs text-blue-700 hover:text-blue-900">
                    Review Now →
                  </Link>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Shortlisted</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">18</p>
                  <Link to="/admin/application-management/shortlist" className="text-xs text-purple-700 hover:text-purple-900">
                    View All →
                  </Link>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Interviews</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">12</p>
                  <Link to="/admin/application-management/interviews" className="text-xs text-orange-700 hover:text-orange-900">
                    Schedule →
                  </Link>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Submitted</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">8</p>
                  <Link to="/admin/application-management/submit" className="text-xs text-green-700 hover:text-green-900">
                    View All →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Candidates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Candidates</h2>
                <Link to="/admin/candidates" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                          <span className="text-xs text-gray-500">{candidate.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Contact Buttons */}
                      <a
                        href={`mailto:${candidate.email}`}
                        className="p-2 text-gray-500 hover:text-blue-600"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${candidate.phone.countryCode}${candidate.phone.number.replace(/\D/g, '')}`}
                        className="p-2 text-gray-500 hover:text-green-600"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      {candidate.whatsapp && (
                        <a
                          href={`https://wa.me/${candidate.whatsapp.countryCode.replace('+', '')}${candidate.whatsapp.number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-green-600"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        to={`/admin/candidates/${candidate.id}`}
                        className="p-2 text-gray-500 hover:text-[#114373]"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Employers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Employers</h2>
                <Link to="/admin/employers" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentEmployers.map((employer) => (
                  <div key={employer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{employer.name}</h3>
                        <p className="text-sm text-gray-600">{employer.contactPerson}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            employer.status === 'active' ? 'bg-green-100 text-green-800' :
                            employer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {employer.status}
                          </span>
                          <span className="text-xs text-gray-500">{employer.industry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${employer.email}`}
                        className="p-2 text-gray-500 hover:text-blue-600"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${employer.phone.replace(/\D/g, '')}`}
                        className="p-2 text-gray-500 hover:text-green-600"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/admin/employers/${employer.id}`}
                        className="p-2 text-gray-500 hover:text-[#114373]"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Recent Data */}
        <div className="space-y-8">
          {/* Content Moderation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Content Moderation</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Auto-detection Logs</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">3 items flagged today</p>
                  <Link to="/admin/content-moderation/logs" className="text-xs text-yellow-700 hover:text-yellow-900">
                    Review Now →
                  </Link>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Banned Keywords</span>
                  </div>
                  <p className="text-sm text-red-700 mb-2">12 rules active</p>
                  <Link to="/admin/content-moderation/keywords" className="text-xs text-red-700 hover:text-red-900">
                    Manage Rules →
                  </Link>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Manual Review</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">5 items pending</p>
                  <Link to="/admin/content-moderation/review" className="text-xs text-blue-700 hover:text-blue-900">
                    Review Queue →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Monetization & Billing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Monetization & Billing</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Subscription Plans</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">3 active plans</p>
                  <Link to="/admin/billing/plans" className="text-xs text-green-700 hover:text-green-900">
                    Manage Plans →
                  </Link>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Receipt className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Payment History</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">45 transactions</p>
                  <Link to="/admin/billing/payments" className="text-xs text-blue-700 hover:text-blue-900">
                    View All →
                  </Link>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Promo Codes</span>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">8 active codes</p>
                  <Link to="/admin/billing/promos" className="text-xs text-purple-700 hover:text-purple-900">
                    Manage Codes →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <Link
                  to="/admin/candidates/new"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Add Candidate</p>
                    <p className="text-sm text-gray-600">Register new candidate</p>
                  </div>
                </Link>
                
                <Link
                  to="/admin/employers/new"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Add Employer</p>
                    <p className="text-sm text-gray-600">Register new employer</p>
                  </div>
                </Link>
                
                <Link
                  to="/admin/job-requirements"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Job Requirements</p>
                    <p className="text-sm text-gray-600">Review pending jobs</p>
                  </div>
                </Link>
                
                <Link
                  to="/admin/interviews"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Schedule Interview</p>
                    <p className="text-sm text-gray-600">Manage interviews</p>
                  </div>
                </Link>
                
                <Link
                  to="/admin/invoices"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Receipt className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Generate Invoice</p>
                    <p className="text-sm text-gray-600">Create new invoice</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Placements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Placements</h2>
                <Link to="/admin/placements" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPlacements.map((placement) => (
                  <div key={placement.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{placement.candidateName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        placement.status === 'active' ? 'bg-green-100 text-green-800' :
                        placement.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {placement.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{placement.position}</p>
                    <p className="text-sm text-gray-600 mb-2">{placement.companyName}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Salary: {placement.salary}</span>
                      <span className="text-green-600 font-medium">Commission: {placement.commission}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pending Invoices</h2>
                <Link to="/admin/invoices" className="text-[#114373] hover:text-[#0d3559] text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingInvoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{invoice.clientName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-1">{invoice.amount}</p>
                    <p className="text-sm text-gray-600">Due: {formatDate(invoice.dueDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };
  
export default Dashboard; 