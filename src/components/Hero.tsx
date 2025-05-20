import React, { FC, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

const filterOptions: FilterOption[] = [
  { label: "Junior level (incl. internship)", value: "junior" },
  { label: "Mid-level", value: "mid" },
  { label: "Senior level", value: "senior" },
  { label: "Level not specified", value: "not-specified" },
  { label: "All levels", value: "all" },
  { label: "Full-Time", value: "full-time" },
  { label: "Part-Time", value: "part-time" },
  { label: "Consultancy (part-time or full-time)", value: "consultancy" },
  { label: "Volunteer (part-time or full-time)", value: "volunteer" }
];

export const Hero: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Design");

  return (
    <div className="relative min-h-screen w-full">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://cube.webuildthemes.com/assets/images/job-board-1.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        {/* Main heading */}
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            We help you discover
            <br />
            <span className="bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] text-transparent bg-clip-text">
              the jobs 
            </span>
          </h1>
        </div>

        {/* Search box */}
        <div className="w-full max-w-3xl mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-xl flex items-center p-1.5">
            {/* Category dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-6 py-3 border-r border-gray-200 hover:bg-gray-50 rounded-l-full transition-colors group"
              >
                <span className="text-gray-700 font-medium mr-2">{selectedFilter}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.label);
                        setIsOpen(false);
                      }}
                      className="w-full px-6 py-2.5 text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search input */}
            <div className="flex-1 px-6">
              <input 
                type="text" 
                placeholder="Desired position" 
                className="w-full py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
              />
            </div>

            {/* Search button */}
            <button className="bg-gradient-to-r from-[#002bff] via-[#0077ff] to-[#00ffff] text-white px-12 py-3 rounded-full transition-all duration-300 font-medium text-lg mx-1.5 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]">
              Search
            </button>
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="text-center mt-16">
          <p className="text-white/80 mb-6 text-xs uppercase tracking-wider font-medium">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            <img src="https://cube.webuildthemes.com/assets/images/logo/logo-1-white.svg" alt="Company 1" className="h-5 w-auto opacity-90" />
            <img src="https://cube.webuildthemes.com/assets/images/logo/logo-2-white.svg" alt="Company 2" className="h-5 w-auto opacity-90" />
            <img src="https://cube.webuildthemes.com/assets/images/logo/logo-3-white.svg" alt="Company 3" className="h-5 w-auto opacity-90" />
            <img src="https://cube.webuildthemes.com/assets/images/logo/logo-4-white.svg" alt="Company 4" className="h-5 w-auto opacity-90" />
            <img src="https://cube.webuildthemes.com/assets/images/logo/logo-5-white.svg" alt="Company 5" className="h-5 w-auto opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};