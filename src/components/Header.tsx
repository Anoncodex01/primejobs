import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div className="fixed top-4 left-40 right-40 z-50">
      <header className="bg-white rounded-full shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Prime Jobs" 
                  className="h-8 w-auto object-contain" 
                />
              </a>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/find-job" 
                className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group"
              >
                Browse Jobs
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </a>
              <a 
                href="/career-hub" 
                className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group"
              >
                Career Hub
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </a>
              <a 
                href="/post-job" 
                className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group"
              >
                Post a Job (For Employers)
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </a>
              <a 
                href="/contact" 
                className="relative text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group"
              >
                Contact Us
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </a>
            </nav>

            {/* Action Button */}
            <div>
              <a 
                href="/find-job" 
                className="bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] text-white px-8 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
              >
                Find Job
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}; 