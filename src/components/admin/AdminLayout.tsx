import { FC, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Building2,
  Briefcase,
  Award,
  BookOpen,
  Eye,
  Download,
  Plus,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Star,
  ChevronRight,
  BarChart3,
  Users,
  TrendingUp,
  Target,
  Shield,
  MessageSquare,
  Phone,
  Mail,
  FileCheck,
  Receipt,
  PieChart,
  Activity,
  UserCheck,
  UserX,
  UserPlus,
  TrendingDown,
  AlertCircle,
  CheckSquare,
  XCircle,
  ExternalLink,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Archive,
  Share2,
  Copy,
  Send,
  Save,
  RefreshCw,
  Zap,
  AlertTriangle,
  Info,
  HelpCircle,
  Lock,
  Database,
  Server,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  Volume2,
  Volume1,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  CameraOff,
  Image,
  ImageOff,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderEdit,
  FolderSearch,
  HardDrive,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudOff,
  CloudDownload,
  CloudUpload
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      current: location.pathname === '/admin/dashboard'
    },
    {
      name: 'Candidates',
      href: '/admin/candidates',
      icon: <Users className="w-5 h-5" />,
      current: location.pathname === '/admin/candidates'
    },
            {
          name: 'Candidate Search',
          href: '/admin/candidate-search',
          icon: <Search className="w-5 h-5" />,
          current: location.pathname === '/admin/candidate-search'
        },
        {
          name: 'Application Workflow',
          href: '/admin/application-workflow',
          icon: <Users className="w-5 h-5" />,
          current: location.pathname === '/admin/application-workflow'
        },
    {
      name: 'Employers',
      href: '/admin/employers',
      icon: <Building2 className="w-5 h-5" />,
      current: location.pathname === '/admin/employers'
    },
    {
      name: 'Job Requirements',
      href: '/admin/job-requirements',
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname === '/admin/job-requirements'
    },
    {
      name: 'Interview Evaluation',
      href: '/admin/interview-evaluation',
      icon: <UserCheck className="w-5 h-5" />,
      current: location.pathname === '/admin/interview-evaluation'
    },
    {
      name: 'Applications',
      href: '/admin/applications',
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname === '/admin/applications'
    },
    {
      name: 'Interviews',
      href: '/admin/interviews',
      icon: <Calendar className="w-5 h-5" />,
      current: location.pathname === '/admin/interviews'
    },
    {
      name: 'Placements',
      href: '/admin/placements',
      icon: <Award className="w-5 h-5" />,
      current: location.pathname === '/admin/placements'
    },
    {
      name: 'Invoices',
      href: '/admin/invoices',
      icon: <Receipt className="w-5 h-5" />,
      current: location.pathname === '/admin/invoices'
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: <PieChart className="w-5 h-5" />,
      current: location.pathname === '/admin/reports'
    },
    {
      name: 'Communications',
      href: '/admin/communications',
      icon: <MessageSquare className="w-5 h-5" />,
      current: location.pathname === '/admin/communications'
    },
    {
      name: 'Performance',
      href: '/admin/performance',
      icon: <Target className="w-5 h-5" />,
      current: location.pathname === '/admin/performance'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
      current: location.pathname === '/admin/settings'
    }
  ];

  const handleLogout = () => {
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#114373] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
                <p className="text-xs text-gray-500">Axia HR Advisory</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-[#114373] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            <Link
              to="/admin/candidates/add"
              className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Add Candidate
            </Link>
            <Link
              to="/admin/employers/add"
              className="flex items-center gap-3 px-3 py-2 bg-[#114373] text-white rounded-lg text-sm font-medium hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Employer
            </Link>
          </div>

          {/* User section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">AD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@axiahr.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 