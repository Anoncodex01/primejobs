import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Star,
  Bookmark,
  Eye,
  Send,
  Filter,
  SortAsc,
  MoreHorizontal,
  Calendar,
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Download,
  Mail,
  Share2,
  Trash2
} from 'lucide-react';

interface SavedJob {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  postedDate: string;
  savedDate: string;
  description: string;
  isActive: boolean;
}

const SavedJobs: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('date');

  const savedJobs: SavedJob[] = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      jobType: 'Full-time',
      experience: '5+ years',
      postedDate: '2024-01-10',
      savedDate: '2024-01-15',
      description: 'We are looking for a Senior Software Engineer to join our growing team...',
      isActive: true
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'Startup Inc',
      location: 'Remote',
      salary: '$80k - $110k',
      jobType: 'Full-time',
      experience: '3+ years',
      postedDate: '2024-01-12',
      savedDate: '2024-01-18',
      description: 'Join our dynamic team as a Full Stack Developer...',
      isActive: true
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      salary: '$85k - $115k',
      jobType: 'Full-time',
      experience: '4+ years',
      postedDate: '2024-01-15',
      savedDate: '2024-01-20',
      description: 'We are seeking a talented React Developer...',
      isActive: true
    },
    {
      id: '4',
      jobTitle: 'Frontend Developer',
      company: 'E-commerce Platform',
      location: 'Austin, TX',
      salary: '$75k - $100k',
      jobType: 'Full-time',
      experience: '2+ years',
      postedDate: '2024-01-08',
      savedDate: '2024-01-12',
      description: 'Help us build amazing user experiences...',
      isActive: false
    },
    {
      id: '5',
      jobTitle: 'Backend Engineer',
      company: 'FinTech Solutions',
      location: 'Boston, MA',
      salary: '$95k - $130k',
      jobType: 'Full-time',
      experience: '6+ years',
      postedDate: '2024-01-05',
      savedDate: '2024-01-10',
      description: 'Join our backend team to build scalable solutions...',
      isActive: true
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
    }
    if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }
    if (sortBy === 'salary') {
      return parseInt(b.salary.split('$')[1].split('k')[0]) - parseInt(a.salary.split('$')[1].split('k')[0]);
    }
    return 0;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600">Your bookmarked job opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search saved jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="date">Sort by Date Saved</option>
                <option value="company">Sort by Company</option>
                <option value="salary">Sort by Salary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Saved Jobs ({sortedJobs.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {sortedJobs.length} of {savedJobs.length} saved jobs</span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sortedJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.jobTitle}
                      </h3>
                      <p className="text-[#114373] font-medium mb-2">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!job.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                          Expired
                        </span>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.experience}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Posted: {formatDate(job.postedDate)}</span>
                    <span>Saved: {formatDate(job.savedDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm">
                  <Eye className="w-4 h-4" />
                  View Job
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <Mail className="w-4 h-4" />
                  Apply Now
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sortedJobs.length === 0 && (
          <div className="p-12 text-center">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs found</h3>
            <p className="text-gray-600 mb-6">Start saving jobs you're interested in</p>
            <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
              Browse Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs; 