import React, { FC, useState } from 'react';
import { Search, MapPin } from 'lucide-react';

// Commented out the old hero section
/*
// ... (old Hero component code) ...
*/

// New modern hero section based on the screenshot
export const Hero: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-white">
      {/* Enhanced Gradient Background with More #21446e */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#21446e]/40 via-[#6db99f]/20 to-[#21446e]/35"></div>
      {/* Very Light Overlay */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center mb-8 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg text-gray-800">
          The leading job platform designed to boost your career journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join a growing network of industry-specific job sites designed to connect you with the right opportunities and accelerate your career
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl border border-gray-200 flex items-center p-2 animate-fadeIn">
          
          {/* Job/Company/Industry Input */}
          <div className="flex-1 relative">
            <div className="flex items-center px-6 py-4">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title / Company / Industry" 
                className="flex-1 text-gray-700 placeholder-gray-500 focus:outline-none text-lg bg-transparent"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-gray-300 mx-2" />

          {/* Location Input */}
          <div className="flex-1">
            <div className="flex items-center px-6 py-4">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state or zip" 
                className="flex-1 text-gray-700 placeholder-gray-500 focus:outline-none text-lg bg-transparent"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#21446e] hover:bg-[#1a3658] text-white p-4 rounded-full transition-colors ml-2 shadow-lg">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="relative z-10 mt-16 text-center">
        <p className="text-gray-500 mb-8 text-sm uppercase tracking-wider font-medium">
          TRUSTED BY LEADING COMPANIES WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 text-gray-400">
          <div className="font-bold text-xl tracking-wide">DELL</div>
          <div className="font-semibold text-lg">T-Mobile</div>
          <div className="font-bold text-xl">Google</div>
          <div className="font-semibold text-lg">Bootstrap</div>
          <div className="font-bold text-xl">Tesla</div>
        </div>
      </div>
    </div>
  );
};
