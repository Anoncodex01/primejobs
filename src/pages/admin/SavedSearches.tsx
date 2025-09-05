import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Save,
  Trash2,
  Edit,
  Play,
  Calendar,
  Users,
  Filter,
  Star,
  Clock,
  Plus,
  Eye,
  Copy,
  Download
} from 'lucide-react';
import { SavedSearch } from '../../types/premium';

const SavedSearches: FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [selectedSearches, setSelectedSearches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'lastUsed' | 'resultCount'>('lastUsed');

  useEffect(() => {
    // Load saved searches - replace with API call
    const mockSearches: SavedSearch[] = [
      {
        id: '1',
        name: 'Senior React Developers',
        employerId: 'emp1',
        searchCriteria: {
          keywords: 'React Developer',
          experienceRange: { min: 3, max: 10 },
          industry: 'technology',
          currentCity: 'Dar es Salaam',
          preferredLocation: 'Remote',
          willingToRelocate: true,
          education: { degree: 'bachelor', specialization: 'computer-science', university: '' },
          currentEmployer: '',
          pastEmployers: [],
          salaryRange: { min: 50000, max: 150000, currency: 'USD' },
          employmentType: ['full-time'],
          languages: [],
          lastActive: '30',
          profileUpdated: '',
          openToWork: true,
          hasAppliedToJobs: [],
          aiRecommended: false,
          gender: undefined,
          nationality: ''
        },
        createdAt: '2024-01-15',
        lastUsed: '2024-01-20',
        resultCount: 45
      },
      {
        id: '2',
        name: 'Marketing Managers in Nairobi',
        employerId: 'emp1',
        searchCriteria: {
          keywords: 'Marketing Manager',
          experienceRange: { min: 5, max: 15 },
          industry: 'marketing',
          currentCity: 'Nairobi',
          preferredLocation: 'Nairobi',
          willingToRelocate: false,
          education: { degree: 'master', specialization: 'marketing', university: '' },
          currentEmployer: '',
          pastEmployers: [],
          salaryRange: { min: 30000, max: 80000, currency: 'USD' },
          employmentType: ['full-time'],
          languages: [],
          lastActive: '7',
          profileUpdated: '',
          openToWork: true,
          hasAppliedToJobs: [],
          aiRecommended: false,
          gender: undefined,
          nationality: ''
        },
        createdAt: '2024-01-10',
        lastUsed: '2024-01-18',
        resultCount: 23
      },
      {
        id: '3',
        name: 'AI/ML Engineers',
        employerId: 'emp1',
        searchCriteria: {
          keywords: 'Machine Learning AI Python',
          experienceRange: { min: 2, max: 8 },
          industry: 'technology',
          currentCity: '',
          preferredLocation: 'Remote',
          willingToRelocate: true,
          education: { degree: 'master', specialization: 'computer-science', university: '' },
          currentEmployer: '',
          pastEmployers: [],
          salaryRange: { min: 60000, max: 120000, currency: 'USD' },
          employmentType: ['full-time', 'contract'],
          languages: [],
          lastActive: '14',
          profileUpdated: '',
          openToWork: true,
          hasAppliedToJobs: [],
          aiRecommended: true,
          gender: undefined,
          nationality: ''
        },
        createdAt: '2024-01-05',
        lastUsed: '2024-01-12',
        resultCount: 67
      }
    ];

    setSavedSearches(mockSearches);
  }, []);

  const filteredSearches = savedSearches
    .filter(search => 
      search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      search.searchCriteria.keywords.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'lastUsed':
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
        case 'resultCount':
          return b.resultCount - a.resultCount;
        default:
          return 0;
      }
    });

  const handleDeleteSearch = (searchId: string) => {
    if (window.confirm('Are you sure you want to delete this saved search?')) {
      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedSearches.length} saved searches?`)) {
      setSavedSearches(prev => prev.filter(search => !selectedSearches.includes(search.id)));
      setSelectedSearches([]);
    }
  };

  const handleSelectSearch = (searchId: string) => {
    setSelectedSearches(prev => 
      prev.includes(searchId) 
        ? prev.filter(id => id !== searchId)
        : [...prev, searchId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSearches.length === filteredSearches.length) {
      setSelectedSearches([]);
    } else {
      setSelectedSearches(filteredSearches.map(search => search.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Searches</h1>
          <p className="text-gray-600 mt-1">Manage your saved candidate search criteria</p>
        </div>
        <Link
          to="/admin/enhanced-search"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Search
        </Link>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search saved searches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lastUsed">Sort by Last Used</option>
              <option value="name">Sort by Name</option>
              <option value="createdAt">Sort by Created Date</option>
              <option value="resultCount">Sort by Result Count</option>
            </select>
          </div>
          
          {selectedSearches.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedSearches.length} selected
              </span>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedSearches.length === filteredSearches.length && filteredSearches.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">Select All</span>
        </div>
      </div>

      {/* Saved Searches List */}
      <div className="space-y-4">
        {filteredSearches.map((search) => (
          <div
            key={search.id}
            className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
              selectedSearches.includes(search.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedSearches.includes(search.id)}
                    onChange={() => handleSelectSearch(search.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{search.name}</h3>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <Users className="w-3 h-3" />
                        {search.resultCount} results
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Keywords:</span> {search.searchCriteria.keywords}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {search.searchCriteria.experienceRange.min}-{search.searchCriteria.experienceRange.max} years
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {search.searchCriteria.currentCity || 'Any'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Created {formatDate(search.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last used {getTimeAgo(search.lastUsed)}
                      </div>
                      {search.searchCriteria.aiRecommended && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Star className="w-3 h-3" />
                          AI Recommended
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/enhanced-search?load=${search.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Run Search"
                  >
                    <Play className="w-4 h-4" />
                  </Link>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Duplicate Search"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Export Search"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSearch(search.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Search"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSearches.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No saved searches found' : 'No saved searches yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Create your first saved search to quickly find candidates'
            }
          </p>
          {!searchTerm && (
            <Link
              to="/admin/enhanced-search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Search
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;
