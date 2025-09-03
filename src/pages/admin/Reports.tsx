import { FC, useState } from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  FileText,
  Award,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Download as DownloadIcon,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Briefcase,
  GraduationCap,
  MapPin,
  Globe,
  Activity
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: 'candidates' | 'employers' | 'placements' | 'revenue' | 'performance';
  period: string;
  data: any;
  lastUpdated: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

const Reports: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for reports
  const reports: ReportData[] = [
    {
      id: '1',
      title: 'Candidate Registration Trends',
      type: 'candidates',
      period: 'Last 30 days',
      data: {
        total: 1247,
        new: 89,
        active: 1158,
        placed: 156,
        trend: '+12%'
      },
      lastUpdated: '2024-01-25 10:30 AM'
    },
    {
      id: '2',
      title: 'Employer Activity Report',
      type: 'employers',
      period: 'Last 30 days',
      data: {
        total: 89,
        active: 67,
        new: 12,
        jobsPosted: 45,
        placements: 23,
        trend: '+8%'
      },
      lastUpdated: '2024-01-25 10:30 AM'
    },
    {
      id: '3',
      title: 'Placement Success Rate',
      type: 'placements',
      period: 'Last 30 days',
      data: {
        total: 156,
        successful: 142,
        failed: 14,
        successRate: '91%',
        avgTime: '45 days',
        trend: '+5%'
      },
      lastUpdated: '2024-01-25 10:30 AM'
    },
    {
      id: '4',
      title: 'Revenue Analytics',
      type: 'revenue',
      period: 'Last 30 days',
      data: {
        total: '$284,500',
        collected: '$245,200',
        pending: '$39,300',
        avgCommission: '$1,823',
        trend: '+23%'
      },
      lastUpdated: '2024-01-25 10:30 AM'
    },
    {
      id: '5',
      title: 'Performance Metrics',
      type: 'performance',
      period: 'Last 30 days',
      data: {
        avgTimeToPlace: '45 days',
        candidateSatisfaction: '4.8/5',
        employerSatisfaction: '4.6/5',
        responseTime: '2.3 hours',
        trend: '+15%'
      },
      lastUpdated: '2024-01-25 10:30 AM'
    }
  ];

  // Chart data for visualizations
  const candidateTrends: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Registrations',
        data: [65, 78, 90, 85, 95, 89],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2
      },
      {
        label: 'Placements',
        data: [12, 15, 18, 20, 22, 25],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2
      }
    ]
  };

  const revenueData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 61000, 58000, 72000],
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2
      }
    ]
  };

  const industryDistribution = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Manufacturing', 'Other'],
    datasets: [{
      data: [35, 25, 15, 12, 8, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(107, 114, 128, 0.8)'
      ]
    }]
  };

  const handleGenerateReport = (reportId: string) => {
    setIsLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would download the report
      console.log(`Generating report: ${reportId}`);
    }, 2000);
  };

  const handleExportData = (format: 'pdf' | 'excel' | 'csv') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Exporting data in ${format} format`);
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
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
            onClick={() => handleExportData('pdf')}
            disabled={isLoading}
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:opacity-50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,247</h3>
          <p className="text-sm text-gray-600">Total Candidates</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">89</h3>
          <p className="text-sm text-gray-600">Active Employers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">156</h3>
          <p className="text-sm text-gray-600">Placements</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$284,500</h3>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Candidate Registration Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Candidate Registration Trends</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Chart visualization would go here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">89</p>
                <p className="text-sm text-gray-600">New This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">25</p>
                <p className="text-sm text-gray-600">Placements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Revenue chart would go here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">$284,500</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">$39,300</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Industry Distribution</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Pie chart would go here</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Technology</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Finance</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Healthcare</span>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
              <button className="text-[#114373] hover:text-[#0d3559]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Avg Time to Place</span>
                </div>
                <span className="text-sm font-bold text-gray-900">45 days</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium">Candidate Satisfaction</span>
                </div>
                <span className="text-sm font-bold text-gray-900">4.8/5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <span className="text-sm font-bold text-gray-900">91%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Response Time</span>
                </div>
                <span className="text-sm font-bold text-gray-900">2.3 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Reports List */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detailed Reports</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {report.type === 'candidates' && <Users className="w-5 h-5 text-blue-600" />}
                    {report.type === 'employers' && <Building2 className="w-5 h-5 text-green-600" />}
                    {report.type === 'placements' && <Award className="w-5 h-5 text-orange-600" />}
                    {report.type === 'revenue' && <DollarSign className="w-5 h-5 text-emerald-600" />}
                    {report.type === 'performance' && <Target className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.period} • Last updated: {report.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:opacity-50 text-sm flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Generate
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 