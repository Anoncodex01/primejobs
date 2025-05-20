import { FC, useState } from 'react';
import { jobs } from '../types/jobs';

interface FilterState {
  grades: string;
  employmentType: string;
  location: string;
  postedDate: string;
}

const FindJob: FC = () => {
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    grades: '',
    employmentType: '',
    location: '',
    postedDate: ''
  });

  const handleFilterClick = (filterName: string) => {
    if (showDropdown === filterName) {
      setShowDropdown(null);
    } else {
      setShowDropdown(filterName);
    }
  };

  const handleFilterSelect = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setShowDropdown(null);
  };

  const filterOptions = {
    grades: [
      'Junior level (incl. internship)',
      'Mid-level',
      'Senior level',
      'Level not specified'
    ],
    employmentType: [
      'Consultancy (part-time or full-time)',
      'Full-Time',
      'Part-Time',
      'Volunteer (part-time or full-time)'
    ],
    location: [
      'National (Tanzania, United Republic of)',
      'Ungujaal (Tanzania mainland)',
      'National (Zanzibar)',
      'Arusha',
      'Dar es Salaam',
      'Dodoma',
      'Geita',
      'Iringa',
      'Kagera',
      'Kigoma',
      'Kilimanjaro',
      'Lindi',
      'Manyara',
      'Mara',
      'Mbeya',
      'Morogoro',
      'Mtwara',
      'Mwanza',
      'Pemba',
      'Pwani',
      'Rukwa',
      'Ruvuma',
      'Shinyanga',
      'Simiyu',
      'Singida',
      'Tabora',
      'Tanga',
      'Unguja'
    ],
    postedDate: [
      'Posted Today',
      'Posted Yesterday',
      'Posted in the Last Week (Last 7 days)',
      'Posted in the Last Month (Last 30 days)'
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-2.5 text-black border border-gray-300 hover:bg-gray-50 transition-colors">
            Organisations
          </button>
          <div className="relative">
            <button 
              onClick={() => handleFilterClick('grades')}
              className={`px-6 py-2.5 text-black border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 ${showDropdown === 'grades' ? 'bg-gray-50' : ''}`}
            >
              <span>Grades</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown === 'grades' && (
              <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-2">
                  {filterOptions.grades.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect('grades', option)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => handleFilterClick('employmentType')}
              className={`px-6 py-2.5 text-black border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 ${showDropdown === 'employmentType' ? 'bg-gray-50' : ''}`}
            >
              <span>Employment Type</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown === 'employmentType' && (
              <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-2">
                  {filterOptions.employmentType.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect('employmentType', option)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => handleFilterClick('location')}
              className={`px-6 py-2.5 text-black border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 ${showDropdown === 'location' ? 'bg-gray-50' : ''}`}
            >
              <span>Location(s)/ Region(s)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown === 'location' && (
              <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                <div className="py-2">
                  {filterOptions.location.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect('location', option)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => handleFilterClick('postedDate')}
              className={`px-6 py-2.5 text-black border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 ${showDropdown === 'postedDate' ? 'bg-gray-50' : ''}`}
            >
              <span>Posted Date</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown === 'postedDate' && (
              <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-2">
                  {filterOptions.postedDate.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterSelect('postedDate', option)}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Count and Remote Toggle */}
        <div className="mb-8">
          <p className="text-gray-900 text-lg mb-4">9 jobs match your search</p>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${showRemoteOnly ? 'bg-blue-600' : 'bg-gray-200'}`}
                onClick={() => setShowRemoteOnly(!showRemoteOnly)}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${showRemoteOnly ? 'translate-x-6 ml-1' : 'translate-x-0 ml-1'}`} />
              </div>
              <span className="text-gray-900">Show only remote and hybrid positions</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-8">
          {/* Left Column - Job Listings */}
          <div className="flex-1">
            <div className="space-y-8">
              {jobs.slice(0, 10).map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {job.type === 'Full-Time' && (
                          <span className="px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded">NEW</span>
                        )}
                        <h3 className="text-lg font-medium text-blue-600 hover:text-blue-700">
                          {job.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-2">We are looking for Data Analyst Expert We are looking for Data Analyst Expert </p>
                      <div className="flex flex-col gap-y-1 mb-2">
                        <h4 className="font-semibold text-gray-900 leading-tight">{job.company.name}</h4>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18.75A8.75 8.75 0 1 1 20.75 12 8.76 8.76 0 0 1 12 20.75Z"/>
                            <path d="M17.29 8.29a1 1 0 0 0-1.41 0l-4.3 4.3-1.3-1.29a1 1 0 0 0-1.41 1.41l2 2a1 1 0 0 0 1.41 0l5-5a1 1 0 0 0 0-1.41Z"/>
                          </svg>
                          <span className="text-black font-medium text-sm">Verified organisation</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{job.company.location}</span>
                      </div>
                    </div>
                    <img 
                      src={job.company.logo} 
                      alt={`${job.company.name} logo`}
                      className="w-24 h-auto object-contain"
                    />
                  </div>
                </div>
              ))}
              {jobs.length > 10 && (
                <div className="flex justify-center mt-8">
                  <button className="px-6 py-2 border-2 border-teal-700 text-teal-700 font-bold rounded-lg bg-white hover:bg-teal-50 transition">
                    Show more
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Recruiting CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl p-6 text-white shadow-md flex flex-col items-start">
              <h2 className="text-xl font-bold mb-2">Recruiting?</h2>
              <p className="mb-4">Post a job and reach professionals looking for opportunities</p>
              <button className="w-full px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition">Post a job</button>
            </div>
            {/* Feedback Card */}
            <div className="bg-gray-50 rounded-2xl p-6 text-gray-900 shadow-md flex flex-col items-start">
              <h2 className="text-xl font-bold mb-2">Help us improve!</h2>
              <p className="mb-4 text-gray-600">Your feedback matters! Let us know how we can make your job search better</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Share your suggestions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJob;