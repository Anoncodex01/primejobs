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
  ChevronRight
} from 'lucide-react';

interface CandidateLayoutProps {
  children: ReactNode;
}

const CandidateLayout: FC<CandidateLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/candidate/dashboard',
      icon: <User className="w-5 h-5" />,
      current: location.pathname === '/candidate/dashboard'
    },
    {
      name: 'My Applications',
      href: '/candidate/applications',
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname === '/candidate/applications'
    },
    {
      name: 'Job Search',
      href: '/candidate/job-search',
      icon: <Search className="w-5 h-5" />,
      current: location.pathname === '/candidate/job-search'
    },
    {
      name: 'AI CV Builder',
      href: '/candidate/cv-builder',
      icon: <BookOpen className="w-5 h-5" />,
      current: location.pathname === '/candidate/cv-builder'
    },
    {
      name: 'Saved Jobs',
      href: '/candidate/saved-jobs',
      icon: <Star className="w-5 h-5" />,
      current: location.pathname === '/candidate/saved-jobs'
    },
            {
          name: 'Profile',
          href: '/candidate/profile',
          icon: <User className="w-5 h-5" />,
          current: location.pathname === '/candidate/profile'
        },

    {
      name: 'Settings',
      href: '/candidate/settings',
      icon: <Settings className="w-5 h-5" />,
      current: location.pathname === '/candidate/settings'
    }
  ];

  const handleLogout = () => {
    window.location.href = '/candidate-login';
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#114373] rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Candidate Portal</h1>
                <p className="text-xs text-gray-500">John Doe</p>
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
              to="/job-search"
              className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Search className="w-5 h-5" />
              Find Jobs
            </Link>
          </div>

          {/* User section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@email.com</p>
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
      <div className="flex-1 flex flex-col">
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
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout; 