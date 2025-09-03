import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  Building2,
  Eye,
  Plus,
  ArrowRight,
  CheckSquare,
  XCircle,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award
} from 'lucide-react';
import { EmployerDashboard as DashboardType, DashboardActivity } from '../../types/employer';

const EmployerDashboard: FC = () => {
  const [dashboard, setDashboard] = useState<DashboardType>({
    totalJobRequirements: 5,
    pendingApprovals: 2,
    activeJobPostings: 3,
    totalApplications: 24,
    shortlistedCandidates: 8,
    interviewsScheduled: 6,
    placements: 2,
    outstandingInvoices: 1,
    recentActivity: [
      {
        id: '1',
        type: 'job_submitted',
        title: 'Senior Software Engineer',
        description: 'Job requirement submitted for approval',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        relatedId: 'job-1'
      },
      {
        id: '2',
        type: 'candidate_shortlisted',
        title: 'John Doe',
        description: 'Candidate shortlisted for Software Engineer position',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        relatedId: 'candidate-1'
      },
      {
        id: '3',
        type: 'interview_scheduled',
        title: 'Marketing Manager Interview',
        description: 'Interview scheduled for tomorrow at 2:00 PM',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        relatedId: 'interview-1'
      },
      {
        id: '4',
        type: 'placement_made',
        title: 'Sarah Johnson',
        description: 'Successfully placed as HR Assistant',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        relatedId: 'placement-1'
      }
    ]
  });

  const [accountStatus, setAccountStatus] = useState<'pending' | 'approved' | 'suspended'>('approved');
  const [agreementSigned, setAgreementSigned] = useState(true);
  const [profileStatus, setProfileStatus] = useState<'pending' | 'approved' | 'incomplete'>('approved');

  // Set profile status to approved for full access
  useEffect(() => {
    setProfileStatus('approved');
  }, []);

  const stats = [
    {
      title: "Job Requirements",
      value: dashboard.totalJobRequirements,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/employer/job-postings"
    },
    {
      title: "Pending Approvals",
      value: dashboard.pendingApprovals,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-yellow-500",
      link: "/employer/job-postings"
    },
    {
      title: "Active Postings",
      value: dashboard.activeJobPostings,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-500",
      link: "/employer/job-postings"
    },
    {
      title: "Total Applications",
      value: dashboard.totalApplications,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/employer/applications"
    },
    {
      title: "Shortlisted",
      value: dashboard.shortlistedCandidates,
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-indigo-500",
      link: "/employer/applications"
    },
    {
      title: "Interviews",
      value: dashboard.interviewsScheduled,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-orange-500",
      link: "/employer/interviews"
    },
    {
      title: "Placements",
      value: dashboard.placements,
      icon: <Award className="w-6 h-6" />,
      color: "bg-emerald-500",
      link: "/employer/placements"
    },
    {
      title: "Outstanding Invoices",
      value: dashboard.outstandingInvoices,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-red-500",
      link: "/employer/invoices"
    }
  ];

  const getActivityIcon = (type: DashboardActivity['type']) => {
    switch (type) {
      case 'job_submitted':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'job_approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'application_received':
        return <Users className="w-5 h-5 text-purple-500" />;
      case 'candidate_shortlisted':
        return <UserCheck className="w-5 h-5 text-indigo-500" />;
      case 'interview_scheduled':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'placement_made':
        return <Award className="w-5 h-5 text-emerald-500" />;
      case 'invoice_sent':
        return <DollarSign className="w-5 h-5 text-red-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };



  // Show approval pending message if account is not approved
  if (accountStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Pending Approval</h2>
          <p className="text-gray-600 mb-6">
            Your employer account is currently under review. You'll receive an email notification once your account is approved.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Next Steps:</strong> Sign the agreement to complete your account activation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show suspended message if account is suspended
  if (accountStatus === 'suspended') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Suspended</h2>
          <p className="text-gray-600 mb-6">
            Your employer account has been suspended. Please contact our support team for assistance.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Contact:</strong> support@axiahr.com or call +255 123 456 789
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's an overview of your recruitment activities.</p>
            </div>
            <div className="flex items-center space-x-4">
              {!agreementSigned && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                  <p className="text-sm text-yellow-800">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Agreement pending signature
                  </p>
                </div>
              )}
              <Link
                to="/employer/create-job"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Job Requirement
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboard.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
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
                <div className="mt-6">
                  <Link
                    to="/employer/applications"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                  >
                    View all activity
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/employer/create-job"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Submit Job Requirement</span>
                </Link>
                <Link
                  to="/employer/applications"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 mr-3 text-purple-500" />
                  <span>Review Applications</span>
                </Link>
                <Link
                  to="/employer/interviews"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                  <span>Schedule Interviews</span>
                </Link>
                <Link
                  to="/employer/invoices"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <DollarSign className="w-5 h-5 mr-3 text-red-500" />
                  <span>View Invoices</span>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Account Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Agreement</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckSquare className="w-3 h-3 mr-1" />
                      Signed
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="text-sm text-gray-900">Today, 9:30 AM</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    to="/employer/company-profile"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 