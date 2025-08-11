import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Calendar,
  DollarSign,
  MapPin
} from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  company: string;
  status: 'active' | 'pending' | 'draft' | 'expired';
  applicants: number;
  postedDate: string;
  deadline: string;
  location: string;
  salary: string;
}

const EmployerDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      change: '+2',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Applicants',
      value: '1,247',
      change: '+156',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      change: '+3',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Placements',
      value: '5',
      change: '+1',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const recentJobs: JobPosting[] = [
    {
      id: 1,
      title: 'Senior UI/UX Designer',
      company: 'Apple Inc.',
      status: 'active',
      applicants: 24,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      location: 'Remote',
      salary: '$80k - $120k'
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Apple Inc.',
      status: 'pending',
      applicants: 18,
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      location: 'San Francisco',
      salary: '$90k - $130k'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Apple Inc.',
      status: 'draft',
      applicants: 0,
      postedDate: '2024-01-25',
      deadline: '2024-02-25',
      location: 'New York',
      salary: '$70k - $100k'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Apple Inc.</h2>
        <p className="text-gray-600">Manage your recruitment process and track your hiring progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/employer/job/create"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#114373] hover:bg-[#114373]/5 transition-colors"
          >
            <div className="w-10 h-10 bg-[#114373] rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Post New Job</p>
              <p className="text-sm text-gray-600">Create a new job posting</p>
            </div>
          </Link>
          
          <Link
            to="/employer/applications"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#114373] hover:bg-[#114373]/5 transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">View Applications</p>
              <p className="text-sm text-gray-600">Review candidate applications</p>
            </div>
          </Link>
          
          <Link
            to="/employer/agreements"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#114373] hover:bg-[#114373]/5 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Agreements</p>
              <p className="text-sm text-gray-600">View and manage contracts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Job Postings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Job Postings</h3>
            <Link
              to="/employer/jobs"
              className="text-[#114373] hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location} • {job.salary}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.applicants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/employer/job/${job.id}`}
                      className="text-[#114373] hover:text-[#0d3559] mr-4"
                    >
                      View
                    </Link>
                    <Link
                      to={`/employer/job/${job.id}/edit`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 