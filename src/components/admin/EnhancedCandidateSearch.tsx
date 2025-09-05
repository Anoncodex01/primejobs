import { FC, useState, useEffect } from 'react';
import {
  Search,
  Star,
  Save,
  MessageCircle,
  Phone,
  Mail,
  Eye,
  Bookmark,
  Target,
  CheckCircle,
  Sliders,
  RefreshCw
} from 'lucide-react';
import { EnhancedCandidateSearch as EnhancedCandidateSearchType, SavedSearch, TalentPool, SearchResult } from '../../types/premium';
import { getAllJobTitles, getJobCategories, getJobTitlesByCategory } from '../../utils/jobData';
import { getAllCountries, getAllCities } from '../../utils/globalData';

interface EnhancedCandidateSearchProps {
  isAdmin: boolean;
  isPremium: boolean;
  onSearch: (results: SearchResult[]) => void;
  onSaveSearch: (search: Omit<SavedSearch, 'id' | 'createdAt' | 'lastUsed' | 'resultCount'>) => void;
  onAddToTalentPool: (candidateIds: string[], poolId: string) => void;
}

const EnhancedCandidateSearch: FC<EnhancedCandidateSearchProps> = ({
  isAdmin,
  isPremium,
  onSearch,
  onSaveSearch,
  onAddToTalentPool
}) => {
  const [searchCriteria, setSearchCriteria] = useState<EnhancedCandidateSearchType>({
    keywords: '',
    experienceRange: { min: 0, max: 20 },
    industry: '',
    jobFunction: '',
    role: '',
    currentCity: '',
    preferredLocation: '',
    willingToRelocate: false,
    education: { degree: '', specialization: '', university: '' },
    currentEmployer: '',
    pastEmployers: [],
    salaryRange: { min: 0, max: 1000000, currency: 'TZS' },
    employmentType: [],
    languages: [],
    lastActive: '',
    profileUpdated: '',
    openToWork: false,
    hasAppliedToJobs: [],
    aiRecommended: false,
    gender: undefined,
    nationality: ''
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [talentPools, setTalentPools] = useState<TalentPool[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Filter options
  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-8', label: '5-8 years' },
    { value: '8-12', label: '8-12 years' },
    { value: '12+', label: '12+ years' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const currencyOptions = [
    { value: 'TZS', label: 'Tanzanian Shilling (TZS)' },
    { value: 'USD', label: 'US Dollar (USD)' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const activityOptions = [
    { value: '1', label: 'Last 24 hours' },
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  useEffect(() => {
    // Load saved searches and talent pools
    loadSavedSearches();
    loadTalentPools();
  }, []);

  const loadSavedSearches = () => {
    // Mock data - replace with API call
    setSavedSearches([
      {
        id: '1',
        name: 'Senior Developers',
        employerId: 'emp1',
        searchCriteria: searchCriteria,
        createdAt: '2024-01-01',
        lastUsed: '2024-01-15',
        resultCount: 45
      }
    ]);
  };

  const loadTalentPools = () => {
    // Mock data - replace with API call
    setTalentPools([
      {
        id: '1',
        name: 'Top Developers',
        employerId: 'emp1',
        description: 'High-potential developers for future roles',
        candidates: ['cand1', 'cand2', 'cand3'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    ]);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Mock search - replace with API call
      const results: SearchResult[] = [
        {
          candidateId: 'cand1',
          relevanceScore: 95,
          matchReasons: ['Skills match', 'Experience level', 'Location preference'],
          isPremium: true,
          canContact: isPremium || isAdmin
        }
      ];
      
      setSearchResults(results);
      onSearch(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      onSaveSearch({
        name: searchName,
        employerId: 'emp1', // Get from context
        searchCriteria: searchCriteria
      });
    }
  };

  const handleAddToTalentPool = (poolId: string) => {
    if (selectedCandidates.length > 0) {
      onAddToTalentPool(selectedCandidates, poolId);
      setSelectedCandidates([]);
    }
  };

  const handleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === searchResults.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(searchResults.map(r => r.candidateId));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enhanced Candidate Search</h2>
            <p className="text-sm text-gray-600 mt-1">
              {isPremium ? 'Premium Search with Advanced Filters & AI Recommendations' : 'Basic Search Available'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {savedSearches.length > 0 && (
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const search = savedSearches.find(s => s.id === e.target.value);
                      if (search) {
                        setSearchCriteria(search.searchCriteria);
                      }
                    }
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Load Saved Search</option>
                  {savedSearches.map(search => (
                    <option key={search.id} value={search.id}>
                      {search.name} ({search.resultCount} results)
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isPremium && (
              <button
                onClick={handleSaveSearch}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Search
              </button>
            )}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Sliders className="w-4 h-4" />
              {showAdvancedFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="p-6">
        {/* Basic Search */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (Job titles, skills, certifications, tools)
              </label>
              <input
                type="text"
                value={searchCriteria.keywords}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="e.g., React Developer, AWS, PMP Certification"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Range
              </label>
              <select
                value={`${searchCriteria.experienceRange.min}-${searchCriteria.experienceRange.max}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  setSearchCriteria(prev => ({
                    ...prev,
                    experienceRange: { min, max: max || 20 }
                  }));
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={searchCriteria.industry}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Industries</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="education">Education</option>
                <option value="consulting">Consulting</option>
                <option value="media">Media & Entertainment</option>
                <option value="real-estate">Real Estate</option>
                <option value="transportation">Transportation</option>
                <option value="energy">Energy</option>
                <option value="government">Government</option>
                <option value="non-profit">Non-profit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-6 border-t border-gray-200 pt-6">
            {/* Location & Relocation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current City
                </label>
                <select
                  value={searchCriteria.currentCity}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, currentCity: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Current City</option>
                  {getAllCities().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Location
                </label>
                <select
                  value={searchCriteria.preferredLocation}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, preferredLocation: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Preferred Location</option>
                  <option value="Remote">Remote</option>
                  {getAllCities().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchCriteria.willingToRelocate}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, willingToRelocate: e.target.checked }))}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Willing to Relocate</span>
                </label>
              </div>
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree Level
                </label>
                <select
                  value={searchCriteria.education.degree}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    education: { ...prev.education, degree: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Degree</option>
                  <option value="high-school">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="certification">Professional Certification</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={searchCriteria.education.specialization}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    education: { ...prev.education, specialization: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Specialization</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="information-technology">Information Technology</option>
                  <option value="business-administration">Business Administration</option>
                  <option value="engineering">Engineering</option>
                  <option value="medicine">Medicine</option>
                  <option value="law">Law</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="human-resources">Human Resources</option>
                  <option value="accounting">Accounting</option>
                  <option value="economics">Economics</option>
                  <option value="psychology">Psychology</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University/Institute
                </label>
                <select
                  value={searchCriteria.education.university}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    education: { ...prev.education, university: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any University</option>
                  <option value="university-of-dar-es-salaam">University of Dar es Salaam</option>
                  <option value="ardhi-university">Ardhi University</option>
                  <option value="muhimbili-university">Muhimbili University</option>
                  <option value="sokoine-university">Sokoine University</option>
                  <option value="university-of-dodoma">University of Dodoma</option>
                  <option value="open-university">Open University of Tanzania</option>
                  <option value="university-of-nairobi">University of Nairobi</option>
                  <option value="strathmore-university">Strathmore University</option>
                  <option value="makerere-university">Makerere University</option>
                  <option value="university-of-cape-town">University of Cape Town</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Employment & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Employer
                </label>
                <input
                  type="text"
                  value={searchCriteria.currentEmployer}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, currentEmployer: e.target.value }))}
                  placeholder="e.g., Google, Microsoft"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <div className="space-y-2">
                  {employmentTypeOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={searchCriteria.employmentType.includes(option.value as any)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSearchCriteria(prev => ({
                              ...prev,
                              employmentType: [...prev.employmentType, option.value as any]
                            }));
                          } else {
                            setSearchCriteria(prev => ({
                              ...prev,
                              employmentType: prev.employmentType.filter(type => type !== option.value)
                            }));
                          }
                        }}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={searchCriteria.salaryRange.currency}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    salaryRange: { ...prev.salaryRange, currency: e.target.value as 'TZS' | 'USD' }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range (Min)
                </label>
                <input
                  type="number"
                  value={searchCriteria.salaryRange.min}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    salaryRange: { ...prev.salaryRange, min: Number(e.target.value) }
                  }))}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range (Max)
                </label>
                <input
                  type="number"
                  value={searchCriteria.salaryRange.max}
                  onChange={(e) => setSearchCriteria(prev => ({
                    ...prev,
                    salaryRange: { ...prev.salaryRange, max: Number(e.target.value) }
                  }))}
                  placeholder="1000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Premium Filters (Admin Only) */}
            {isAdmin && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Admin-Only Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={searchCriteria.gender || ''}
                      onChange={(e) => setSearchCriteria(prev => ({ 
                        ...prev, 
                        gender: e.target.value as 'male' | 'female' | 'other' | undefined 
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Gender</option>
                      {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality
                    </label>
                    <select
                      value={searchCriteria.nationality}
                      onChange={(e) => setSearchCriteria(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Nationality</option>
                      {getAllCountries().map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Activity & Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Active
                </label>
                <select
                  value={searchCriteria.lastActive}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, lastActive: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Time</option>
                  {activityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchCriteria.openToWork}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, openToWork: e.target.checked }))}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Open to Work</span>
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchCriteria.aiRecommended}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, aiRecommended: e.target.checked }))}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">AI Recommended</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2 px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {isSearching ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {isSearching ? 'Searching...' : 'Search Candidates'}
            </button>
            <button
              onClick={() => setSearchCriteria({
                keywords: '',
                experienceRange: { min: 0, max: 20 },
                industry: '',
                jobFunction: '',
                role: '',
                currentCity: '',
                preferredLocation: '',
                willingToRelocate: false,
                education: { degree: '', specialization: '', university: '' },
                currentEmployer: '',
                pastEmployers: [],
                salaryRange: { min: 0, max: 1000000, currency: 'TZS' },
                employmentType: [],
                languages: [],
                lastActive: '',
                profileUpdated: '',
                openToWork: false,
                hasAppliedToJobs: [],
                aiRecommended: false,
                gender: undefined,
                nationality: ''
              })}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
          
          {isPremium && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Premium Search Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Search Results ({searchResults.length})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {selectedCandidates.length === searchResults.length ? 'Deselect All' : 'Select All'}
                </button>
                {selectedCandidates.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => handleAddToTalentPool(e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="">Add to Talent Pool</option>
                      {talentPools.map(pool => (
                        <option key={pool.id} value={pool.id}>
                          {pool.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.candidateId}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(result.candidateId)}
                      onChange={() => handleCandidateSelection(result.candidateId)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">Candidate #{result.candidateId}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {result.relevanceScore}% Match
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {result.isPremium ? 'Premium' : 'Basic'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {result.matchReasons.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    {result.canContact && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Phone className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCandidateSearch;
