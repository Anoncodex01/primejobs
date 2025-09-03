import { FC, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Building2,
  Award,
  DollarSign,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Filter,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface KPIMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  target: string;
  status: 'on-track' | 'ahead' | 'behind' | 'at-risk';
  icon: JSX.Element;
  color: string;
}

interface PerformanceData {
  period: string;
  candidates: number;
  employers: number;
  placements: number;
  revenue: number;
  satisfaction: number;
  responseTime: number;
}

const Performance: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const kpiMetrics: KPIMetric[] = [
    {
      id: '1',
      name: 'Placement Success Rate',
      value: '91%',
      change: 5.2,
      changeType: 'increase',
      target: '85%',
      status: 'ahead',
      icon: <Award className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      id: '2',
      name: 'Average Time to Place',
      value: '45 days',
      change: -3.1,
      changeType: 'decrease',
      target: '50 days',
      status: 'ahead',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      id: '3',
      name: 'Candidate Satisfaction',
      value: '4.8/5',
      change: 0.2,
      changeType: 'increase',
      target: '4.5/5',
      status: 'ahead',
      icon: <Star className="w-6 h-6" />,
      color: 'text-yellow-600'
    },
    {
      id: '4',
      name: 'Employer Satisfaction',
      value: '4.6/5',
      change: 0.1,
      changeType: 'increase',
      target: '4.5/5',
      status: 'on-track',
      icon: <Building2 className="w-6 h-6" />,
      color: 'text-purple-600'
    },
    {
      id: '5',
      name: 'Response Time',
      value: '2.3 hours',
      change: -0.5,
      changeType: 'decrease',
      target: '4 hours',
      status: 'ahead',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-indigo-600'
    },
    {
      id: '6',
      name: 'Revenue Growth',
      value: '+23%',
      change: 23.0,
      changeType: 'increase',
      target: '15%',
      status: 'ahead',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-emerald-600'
    }
  ];

  const performanceData: PerformanceData[] = [
    { period: 'Jan', candidates: 65, employers: 12, placements: 8, revenue: 45000, satisfaction: 4.5, responseTime: 3.2 },
    { period: 'Feb', candidates: 78, employers: 15, placements: 12, revenue: 52000, satisfaction: 4.6, responseTime: 2.8 },
    { period: 'Mar', candidates: 90, employers: 18, placements: 15, revenue: 48000, satisfaction: 4.7, responseTime: 2.5 },
    { period: 'Apr', candidates: 85, employers: 20, placements: 18, revenue: 61000, satisfaction: 4.8, responseTime: 2.3 },
    { period: 'May', candidates: 95, employers: 22, placements: 20, revenue: 58000, satisfaction: 4.8, responseTime: 2.2 },
    { period: 'Jun', candidates: 89, employers: 25, placements: 22, revenue: 72000, satisfaction: 4.8, responseTime: 2.3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead':
        return 'bg-green-100 text-green-800';
      case 'on-track':
        return 'bg-blue-100 text-blue-800';
      case 'behind':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'decrease':
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600">Track KPIs and performance metrics</p>
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
          <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpiMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-gray-100 rounded-lg ${metric.color}`}>
                {metric.icon}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(metric.status)}`}>
                {metric.status.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center gap-1">
                {getChangeIcon(metric.changeType)}
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Target: {metric.target}</p>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Placement Success Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Placement Success Trend</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Placement success chart would go here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">91%</p>
                <p className="text-sm text-gray-600">Current Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-gray-600">Target</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">+5.2%</p>
                <p className="text-sm text-gray-600">Improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Response Time Analysis</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Response time chart would go here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">2.3h</p>
                <p className="text-sm text-gray-600">Average</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">4h</p>
                <p className="text-sm text-gray-600">Target</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">-42.5%</p>
                <p className="text-sm text-gray-600">Improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Performance Overview</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Candidates</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Employers</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Placements</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Satisfaction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((data, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{data.period}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{data.candidates}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{data.employers}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{data.placements}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">${data.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{data.satisfaction}/5</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{data.responseTime}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Placement Success Rate</span>
              </div>
              <span className="text-sm font-bold text-green-600">91%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Response Time</span>
              </div>
              <span className="text-sm font-bold text-blue-600">2.3h</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium">Candidate Satisfaction</span>
              </div>
              <span className="text-sm font-bold text-yellow-600">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium">Employer Satisfaction</span>
              </div>
              <span className="text-sm font-bold text-red-600">4.6/5</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Time to Place</span>
              </div>
              <span className="text-sm font-bold text-orange-600">45 days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Candidate Retention</span>
              </div>
              <span className="text-sm font-bold text-purple-600">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance; 