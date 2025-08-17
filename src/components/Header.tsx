import { FC, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Users, Menu, X } from 'lucide-react';

export const Header: FC = () => {
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [portalsDropdown, setPortalsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);
  
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerButton = document.getElementById('hamburger-button');
      
      if (mobileMenu && !mobileMenu.contains(event.target as Node) && 
          hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileCompanyOpen(false);
    setMobilePortalsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="max-w-7xl mx-auto px-6 py-2">
        <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-xl border border-white/20 flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img src="/logo.png" alt="Axia HR Advisory" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
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
                      to="/solutions"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors border-b border-gray-100"
                      onClick={() => setServicesDropdown(false)}
                    >
                      <div className="font-medium">All Solutions</div>
                      <div className="text-sm text-gray-500">Complete HR services overview</div>
                    </Link>
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
              
              <Link 
                to="/companies" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
              >
                Companies
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
                      to="/vision-mission"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                      onClick={() => setCompanyDropdown(false)}
                    >
                      <div className="font-medium">Vision, Mission & Values</div>
                      <div className="text-sm text-gray-500">Our guiding principles</div>
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

          {/* Desktop Login, Register, and Portals Dropdown */}
          <div className="hidden md:flex items-center gap-4">
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
                    to="/employer/register"
                    className="block px-4 py-3 text-gray-700 hover:bg-[#114373]/5 hover:text-[#114373] transition-colors"
                    onClick={() => setPortalsDropdown(false)}
                  >
                    <div className="font-medium">Employer Registration</div>
                    <div className="text-sm text-gray-500">Create new employer account</div>
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

          {/* Mobile Menu Button */}
          <button
            id="hamburger-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div 
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-2 px-6">
                  {/* Home */}
                  <Link
                    to="/"
                    className="block py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>

                  {/* Services */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                    >
                      Services
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        <Link
                          to="/solutions"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          All Solutions
                        </Link>
                        <Link
                          to="/services/talent-acquisition"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Talent Acquisition
                        </Link>
                        <Link
                          to="/services/performance-management"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Performance Management
                        </Link>
                        <Link
                          to="/services/training-development"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Training & Development
                        </Link>
                        <Link
                          to="/services/organizational-design"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Organizational Design
                        </Link>
                        <Link
                          to="/services/job-analysis"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Job Analysis & Compensation
                        </Link>
                        <Link
                          to="/services/visa-permits"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Visa & Permit Processing
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Find Jobs */}
                  <Link
                    to="/find-job"
                    className="block py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                    onClick={closeMobileMenu}
                  >
                    Find Jobs
                  </Link>

                  {/* Companies */}
                  <Link
                    to="/companies"
                    className="block py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                    onClick={closeMobileMenu}
                  >
                    Companies
                  </Link>

                  {/* Company */}
                  <div className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                      className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                    >
                      Company
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileCompanyOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        <Link
                          to="/about"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          About Us
                        </Link>
                        <Link
                          to="/vision-mission"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Vision, Mission & Values
                        </Link>
                        <Link
                          to="/contact"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Contact
                        </Link>
                        <Link
                          to="/career-hub"
                          className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                          onClick={closeMobileMenu}
                        >
                          Career Hub
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>

              {/* Mobile Authentication */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/candidate/login"
                    className="w-full border border-[#114373] bg-white text-[#114373] px-6 py-3 rounded-full hover:bg-[#114373]/5 transition-colors font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/candidate/register"
                    className="w-full bg-[#114373] text-white px-6 py-3 rounded-full hover:bg-[#0d3559] transition-colors font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>

                {/* Mobile Portals */}
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setMobilePortalsOpen(!mobilePortalsOpen)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#114373] transition-colors font-medium"
                  >
                    For employers
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobilePortalsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobilePortalsOpen && (
                    <div className="pl-4 space-y-2 mt-2">
                      <Link
                        to="/employer/login"
                        className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Employer Portal
                      </Link>
                      <Link
                        to="/employer/register"
                        className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Employer Registration
                      </Link>
                      <Link
                        to="/candidate/login"
                        className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Candidate Portal
                      </Link>
                      <Link
                        to="/admin/login"
                        className="block py-2 text-gray-600 hover:text-[#114373] transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Admin Portal
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 