import { FC, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Briefcase,
  MapPin,
  Building2,
  Filter,
  Download
} from 'lucide-react';

interface AnalyticsData {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalViews: number;
  conversionRate: number;
  averageTimeToHire: number;
  totalSpent: number;
  monthlyGrowth: number;
}

interface JobPerformance {
  id: string;
  title: string;
  applications: number;
  views: number;
  conversionRate: number;
  status: string;
}

const Analytics: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const analyticsData: AnalyticsData = {
    totalJobs: 24,
    activeJobs: 18,
    totalApplications: 156,
    totalViews: 2847,
    conversionRate: 5.5,
    averageTimeToHire: 12,
    totalSpent: 2400,
    monthlyGrowth: 15.3
  };

  const jobPerformance: JobPerformance[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      applications: 45,
      views: 234,
      conversionRate: 19.2,
      status: 'active'
    },
    {
      id: '2',
      title: 'Product Manager',
      applications: 32,
      views: 189,
      conversionRate: 16.9,
      status: 'active'
    },
    {
      id: '3',
      title: 'UX Designer',
      applications: 28,
      views: 156,
      conversionRate: 17.9,
      status: 'active'
    },
    {
      id: '4',
      title: 'Data Scientist',
      applications: 23,
      views: 134,
      conversionRate: 17.2,
      status: 'active'
    },
    {
      id: '5',
      title: 'Marketing Manager',
      applications: 18,
      views: 98,
      conversionRate: 18.4,
      status: 'active'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your recruitment performance and insights</p>
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
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalJobs}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+{analyticsData.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalApplications}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalSpent)}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">-3.5%</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Applications Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Applications Trend</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Applications</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[12, 18, 15, 22, 19, 25, 28, 32, 29, 35, 31, 38].map((value, index) => (
              <div key={index} className="flex-1 bg-blue-100 rounded-t" style={{ height: `${(value / 40) * 100}%` }}>
                <div className="bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Job Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Jobs</h3>
            <button className="text-sm text-[#114373] hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {jobPerformance.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                    <span>{job.applications} applications</span>
                    <span>{job.views} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{job.conversionRate}%</p>
                  <p className="text-xs text-gray-500">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Time to Hire */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Average Time to Hire</h3>
              <p className="text-sm text-gray-600">Days from posting to hire</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{analyticsData.averageTimeToHire}</p>
            <p className="text-sm text-gray-600">days</p>
          </div>
        </div>

        {/* Application Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Application Sources</h3>
              <p className="text-sm text-gray-600">Where candidates come from</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Job Boards</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Direct Applications</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Referrals</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Social Media</span>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>

        {/* Cost per Hire */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Cost per Hire</h3>
              <p className="text-sm text-gray-600">Average cost to hire</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(100)}</p>
            <p className="text-sm text-gray-600">per candidate</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-[#114373] hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New application received</p>
              <p className="text-xs text-gray-600">Sarah Johnson applied for Senior Software Engineer</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Job post viewed</p>
              <p className="text-xs text-gray-600">Product Manager post reached 50 views</p>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Send className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Interview scheduled</p>
              <p className="text-xs text-gray-600">Interview scheduled with Michael Chen</p>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 