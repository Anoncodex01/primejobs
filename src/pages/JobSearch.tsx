import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Filter, Grid, List, Bookmark, MessageCircle, Clock, Users, Bell, TrendingUp, Briefcase, Star, Eye, Heart, Building2 } from 'lucide-react';

interface JobCard {
  id: number;
  company: string;
  logo: string;
  title: string;
  location: string;
  jobType: string;
  workModel: string;
  experience: string;
  postedDays: number;
  applicants: number;
  salary: string;
  description: string;
}

const JobSearch: FC = () => {
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('Custom');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 6000]);

  const jobTypes = [
    { name: 'All', count: 1000 },
    { name: 'Contract', count: 600 },
    { name: 'Full Time', count: 120 },
    { name: 'Part Time', count: 190 },
    { name: 'Internship', count: 140 }
  ];

  const salaryRanges = [
    { name: 'Less than $1000', count: 150 },
    { name: '$1000 - $4000', count: 450 },
    { name: 'More than $1000', count: 400 }
  ];

  const jobs: JobCard[] = [
    {
      id: 1,
      company: 'Apple',
      logo: '/company-logos/apple-14.svg',
      title: 'UI/UX Designer',
      location: 'Jakarta, Indonesia',
      jobType: 'Full Time',
      workModel: 'Hybrid',
      experience: '1-2 years',
      postedDays: 2,
      applicants: 160,
      salary: '$800/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    },
    {
      id: 2,
      company: 'Spotify',
      logo: '/company-logos/spotify-2.svg',
      title: 'Graphic Designer',
      location: 'Jakarta, Indonesia',
      jobType: 'Part Time',
      workModel: 'Remote',
      experience: '2-3 years',
      postedDays: 0.5,
      applicants: 149,
      salary: '$650/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    },
    {
      id: 3,
      company: 'Slack',
      logo: '/company-logos/slack-new-logo.svg',
      title: 'Management Business',
      location: 'Jakarta, Indonesia',
      jobType: 'Full Time',
      workModel: 'Onsite',
      experience: '1 years',
      postedDays: 1,
      applicants: 150,
      salary: '$500/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    },
    {
      id: 4,
      company: 'Amazon Web Services',
      logo: '/company-logos/amazon-web-services-2.svg',
      title: 'Content Creator',
      location: 'Jakarta, Indonesia',
      jobType: 'Full Time',
      workModel: 'Hybrid',
      experience: '2 years',
      postedDays: 0.33,
      applicants: 139,
      salary: '$700/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    },
    {
      id: 5,
      company: 'CNBC Indonesia',
      logo: '/company-logos/cnbc-1.svg',
      title: 'Videographer',
      location: 'Jakarta, Indonesia',
      jobType: 'Contract',
      workModel: 'Onsite',
      experience: '3-5 years',
      postedDays: 1,
      applicants: 78,
      salary: '$900/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    },
    {
      id: 6,
      company: 'MTN',
      logo: '/company-logos/mtn-new-logo.svg',
      title: 'Content Creator',
      location: 'Jakarta, Indonesia',
      jobType: 'Full Time',
      workModel: 'Remote',
      experience: '1-2 years',
      postedDays: 4,
      applicants: 203,
      salary: '$750/month',
      description: 'The User Experience Designer position exists to create compelling and elegant digital user experiences through design.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Job Title, Company, or Any"
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Add Country or City"
                  className="w-64 pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-48 pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent appearance-none bg-white">
                  <option>Custom</option>
                  <option>$0 - $1000</option>
                  <option>$1000 - $4000</option>
                  <option>$4000+</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border-none bg-transparent text-[#114373] font-medium">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Salary High to Low</option>
                  <option>Salary Low to High</option>
                </select>
              </div>
              <button className="bg-[#114373] text-white px-8 py-4 rounded-lg hover:bg-[#0d3559] transition-colors font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-16 mt-8">
        <div className="flex gap-8">
          {/* Left Filter Panel */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                <button className="text-[#114373] text-sm hover:underline">Clear All</button>
              </div>

              {/* Job Type Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Job Type</h4>
                <div className="space-y-3">
                  {jobTypes.map((type) => (
                    <label key={type.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedJobType === type.name}
                        onChange={() => setSelectedJobType(type.name)}
                        className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {type.name} ({type.count})
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-3 text-sm text-gray-700">Open to Remote</span>
                  </label>
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Salary Range</h4>
                  <button className="text-[#114373] text-sm hover:underline">Reset</button>
                </div>
                <div className="space-y-3">
                  {salaryRanges.map((range) => (
                    <label key={range.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSalaryRange === range.name}
                        onChange={() => setSelectedSalaryRange(range.name)}
                        className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                      />
                      <span className="ml-3 text-sm text-gray-700">{range.name}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSalaryRange === 'Custom'}
                      onChange={() => setSelectedSalaryRange('Custom')}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-3 text-sm text-gray-700">Custom</span>
                  </label>
                  {selectedSalaryRange === 'Custom' && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={salaryRange[0]}
                          onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-500">to</span>
                        <input
                          type="number"
                          value={salaryRange[1]}
                          onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Job Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">1000+ Jobs Found</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select className="text-sm border-none bg-transparent text-[#114373] font-medium">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Salary High to Low</option>
                    <option>Salary Low to High</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#114373] text-white' : 'text-gray-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#114373] text-white' : 'text-gray-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Job Cards Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
                  {/* Bookmark Icon */}
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-[#114373]">
                    <Bookmark className="w-5 h-5" />
                  </button>

                  {/* Company Logo and Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src={job.logo} alt={`${job.company} logo`} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{job.company}</h3>
                      <Link to={`/job/${job.id}`} className="block">
                        <p className="text-xl font-bold text-gray-900 mb-1 hover:text-[#114373] transition-colors">{job.title}</p>
                      </Link>
                      <p className="text-sm text-gray-600 mb-1">{job.location}</p>
                      <p className="text-xs text-gray-500">Match with your needs</p>
                    </div>
                  </div>

                  {/* Job Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {job.jobType}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {job.workModel}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {job.experience}
                    </span>
                  </div>

                  {/* Posted Time & Applicants */}
                  <div className="text-sm text-gray-500 mb-4">
                    <span>
                      {job.postedDays < 1 
                        ? `${Math.round(job.postedDays * 24)} hours` 
                        : job.postedDays === 1 
                          ? '1 day ago' 
                          : `${job.postedDays} day ago`
                      }
                    </span>
                    <span className="mx-2">•</span>
                    <span>{job.applicants} Applicants</span>
                  </div>

                  {/* Salary and Apply Button Row */}
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="font-semibold text-[#114373] text-lg">
                        <span className="text-gray-900">$</span>
                        {job.salary.replace('$', '').replace('/month', '')}
                        <span className="text-gray-500 text-sm">/month</span>
                      </p>
                    </div>
                    <Link to={`/job/${job.id}`}>
                      <button className="bg-[#114373] text-white py-2 px-6 rounded-lg hover:bg-[#0d3559] transition-colors font-medium">
                        View Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch; 