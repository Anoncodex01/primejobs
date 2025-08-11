import { FC, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Users } from 'lucide-react';

export const Header: FC = () => {
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [portalsDropdown, setPortalsDropdown] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const portalsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdown(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyDropdown(false);
      }
      if (portalsRef.current && !portalsRef.current.contains(event.target as Node)) {
        setPortalsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="max-w-7xl mx-auto px-6 py-2">
        <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Axia HR Advisory" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Home
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => {
                    setServicesDropdown(!servicesDropdown);
                    setCompanyDropdown(false);
                    setPortalsDropdown(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link 
                      to="/services/talent-acquisition"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Talent Acquisition</div>
                      <div className="text-sm text-gray-500">Recruitment & hiring solutions</div>
                    </Link>
                    <Link 
                      to="/services/performance-management"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Performance Management</div>
                      <div className="text-sm text-gray-500">KPI & evaluation systems</div>
                    </Link>
                    <Link 
                      to="/services/training-development"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Training & Development</div>
                      <div className="text-sm text-gray-500">Learning & skill development</div>
                    </Link>
                    <Link 
                      to="/services/organizational-design"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Organizational Design</div>
                      <div className="text-sm text-gray-500">Structure & process optimization</div>
                    </Link>
                    <Link 
                      to="/services/job-analysis"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Job Analysis & Compensation</div>
                      <div className="text-sm text-gray-500">Salary & benefits analysis</div>
                    </Link>
                    <Link 
                      to="/services/visa-permits"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">Visa & Permit Processing</div>
                      <div className="text-sm text-gray-500">Immigration & work permits</div>
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/find-job" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Find Jobs
              </Link>
              
              {/* Company Dropdown */}
              <div className="relative" ref={companyRef}>
                <button
                  onClick={() => {
                    setCompanyDropdown(!companyDropdown);
                    setServicesDropdown(false);
                    setPortalsDropdown(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform ${companyDropdown ? 'rotate-180' : ''}`} />
                </button>
                {companyDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link 
                      to="/about"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setCompanyDropdown(false)}
                    >
                      <div className="font-medium">About Us</div>
                      <div className="text-sm text-gray-500">Our story & mission</div>
                    </Link>
                    <Link 
                      to="/contact"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setCompanyDropdown(false)}
                    >
                      <div className="font-medium">Contact</div>
                      <div className="text-sm text-gray-500">Get in touch</div>
                    </Link>
                    <Link 
                      to="/career-hub"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setCompanyDropdown(false)}
                    >
                      <div className="font-medium">Career Hub</div>
                      <div className="text-sm text-gray-500">Resources & insights</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Login, Register, and Portals Dropdown */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <Link 
              to="/candidate/login" 
              className="border border-[#114373] bg-white text-[#114373] px-6 py-2 rounded-full hover:bg-[#114373]/5 transition-colors font-medium text-sm"
            >
              Login
            </Link>
            
            {/* Register Button */}
            <Link 
              to="/candidate/register" 
              className="bg-[#114373] text-white px-6 py-2 rounded-full hover:bg-[#0d3559] transition-colors font-medium text-sm"
            >
              Register
            </Link>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Portals Dropdown */}
            <div className="relative" ref={portalsRef}>
              <button
                onClick={() => {
                  setPortalsDropdown(!portalsDropdown);
                  setServicesDropdown(false);
                  setCompanyDropdown(false);
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                For employers
                <ChevronDown className={`w-4 h-4 transition-transform ${portalsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {portalsDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link 
                    to="/employer/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                    onClick={() => setPortalsDropdown(false)}
                  >
                    <div className="font-medium">Employer Portal</div>
                    <div className="text-sm text-gray-500">Post jobs & manage hiring</div>
                  </Link>
                  <Link 
                    to="/candidate/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                    onClick={() => setPortalsDropdown(false)}
                  >
                    <div className="font-medium">Candidate Portal</div>
                    <div className="text-sm text-gray-500">Find jobs & apply</div>
                  </Link>
                  <Link 
                    to="/admin/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                    onClick={() => setPortalsDropdown(false)}
                  >
                    <div className="font-medium">Admin Portal</div>
                    <div className="text-sm text-gray-500">System administration</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}; 