import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../types/jobs';
import { JobCard } from './JobCard';
import { 
  PenTool, 
  Search, 
  BarChart3, 
  FileText, 
  ChefHat,
  Monitor,
  Heart,
  Building2,
  Truck,
  Factory,
  CreditCard
} from 'lucide-react';

export const ExploreJobs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All', icon: null, active: true },
    { id: 'IT Services', name: 'IT Services', icon: <Monitor className="w-4 h-4" /> },
    { id: 'Technology', name: 'Technology', icon: <Monitor className="w-4 h-4" /> },
    { id: 'Healthcare', name: 'Healthcare & Life Sciences', icon: <Heart className="w-4 h-4" /> },
    { id: 'Infrastructure', name: 'Infrastructure, Transport & Real Estate', icon: <Building2 className="w-4 h-4" /> },
    { id: 'Manufacturing', name: 'Manufacturing & Production', icon: <Factory className="w-4 h-4" /> },
    { id: 'BFSI', name: 'BFSI', icon: <CreditCard className="w-4 h-4" /> }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Jobs
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-2 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-[#114373] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.icon && (
                  <span className={`mr-2 ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {category.icon}
                  </span>
                )}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/job-search"
            className="inline-flex items-center px-6 py-3 text-[#114373] hover:text-[#0d3559] border border-[#114373]/20 rounded-lg hover:border-[#114373]/30 transition-colors bg-white"
          >
            All listings
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}; 