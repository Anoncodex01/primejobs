import React, { FC, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Building2,
  FileText,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Bell,
  Shield,
  DollarSign,
  AlertCircle,
  Search
} from 'lucide-react';

interface EmployerLayoutProps {
  children: ReactNode;
}

const EmployerLayout: FC<EmployerLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileStatus, setProfileStatus] = useState<'pending' | 'approved' | 'incomplete'>('incomplete');

  const location = useLocation();

  // Check profile status on component mount
  React.useEffect(() => {
    const profileComplete = localStorage.getItem('employerProfileComplete');
    if (profileComplete === 'pending') {
      setProfileStatus('pending');
    } else if (profileComplete === 'approved') {
      setProfileStatus('approved');
    } else {
      // Set to approved for full access
      setProfileStatus('approved');
    }
  }, []);

  const navigation = [
    {
      name: 'Agreements',
      href: '/employer/agreements',
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname === '/employer/agreements'
    },
    {
      name: 'Dashboard',
      href: '/employer/dashboard',
      icon: <Building2 className="w-5 h-5" />,
      current: location.pathname === '/employer/dashboard'
    },
    {
      name: 'Company Profile',
      href: '/employer/company-profile',
      icon: <Building2 className="w-5 h-5" />,
      current: location.pathname === '/employer/company-profile'
    },
    {
      name: 'Job Postings',
      href: '/employer/jobs',
      icon: <FileText className="w-5 h-5" />,
      current: location.pathname.includes('/employer/job')
    },
    {
      name: 'Applications',
      href: '/employer/applications',
      icon: <Users className="w-5 h-5" />,
      current: location.pathname === '/employer/applications'
    },
    {
      name: 'Candidate Search',
      href: '/employer/candidate-search',
      icon: <Search className="w-5 h-5" />,
      current: location.pathname === '/employer/candidate-search'
    },
    {
      name: 'Saved Searches',
      href: '/employer/saved-searches',
      icon: <Search className="w-5 h-5" />,
      current: location.pathname === '/employer/saved-searches'
    },
    {
      name: 'Interviews',
      href: '/employer/interviews',
      icon: <Calendar className="w-5 h-5" />,
      current: location.pathname === '/employer/interviews'
    },
    {
      name: 'Placements',
      href: '/employer/placements',
      icon: <CheckCircle className="w-5 h-5" />,
      current: location.pathname === '/employer/placements'
    },
    {
      name: 'Reference Check',
      href: '/employer/reference-check',
      icon: <Shield className="w-5 h-5" />,
      current: location.pathname === '/employer/reference-check'
    },
    {
      name: 'Invoices',
      href: '/employer/invoices',
      icon: <DollarSign className="w-5 h-5" />,
      current: location.pathname === '/employer/invoices'
    },
    {
      name: 'Analytics',
      href: '/employer/analytics',
      icon: <TrendingUp className="w-5 h-5" />,
      current: location.pathname === '/employer/analytics'
    },
    {
      name: 'Settings',
      href: '/employer/settings',
      icon: <Settings className="w-5 h-5" />,
      current: location.pathname === '/employer/settings'
    }
  ];

  const handleLogout = () => {
    window.location.href = '/employer/login';
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
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Employer Portal</h1>
                <p className="text-xs text-gray-500">Apple Inc.</p>
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
              to="/employer/company-profile"
              className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Building2 className="w-5 h-5" />
              Company Profile
            </Link>
            <Link
              to="/employer/job/create"
              className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Quick Post
            </Link>
            <Link
              to="/employer/enhanced-job-posting"
              className="flex items-center gap-3 px-3 py-2 bg-[#114373] text-white rounded-lg text-sm font-medium hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Enhanced Posting
            </Link>
          </div>

          {/* User section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@apple.com</p>
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

export default EmployerLayout; 