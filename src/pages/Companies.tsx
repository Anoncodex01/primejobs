import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import {
  Search,
  Filter,
  MapPin,
  Users,
  Building2,
  Globe,
  ChevronRight,
  Grid,
  List,
  Briefcase,
  Calendar,
  ArrowRight,
  Star,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronDown,
  X
} from 'lucide-react';

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  employeeCount: string;
  location: string;
  founded: string;
  website: string;
  rating?: number;
  activeJobs: number;
  featured?: boolean;
  companyType: 'Startup' | 'Corporate' | 'Foreign MNC' | 'Local MNC';
  reviews?: number;
}

const Companies: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCompanyType, setSelectedCompanyType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const companies: Company[] = [
    {
      id: 1,
      name: 'Apple',
      logo: '/company-logos/apple-14.svg',
      description: 'Personal banking, Corporate banking, Business banking, Investment banking, Private Clients, and Wealth creation.',
      industry: 'Technology',
      employeeCount: '10,001+ employees',
      location: 'Cupertino, California',
      founded: '1976',
      website: 'http://www.apple.com',
      rating: 4.8,
      activeJobs: 12,
      featured: true,
      companyType: 'Foreign MNC',
      reviews: 1247
    },
    {
      id: 2,
      name: 'Spotify',
      logo: '/company-logos/spotify-2.svg',
      description: 'Leading music streaming platform providing access to millions of songs and podcasts worldwide.',
      industry: 'Entertainment',
      employeeCount: '1,001-5,000 employees',
      location: 'Stockholm, Sweden',
      founded: '2006',
      website: 'http://www.spotify.com',
      rating: 4.6,
      activeJobs: 8,
      companyType: 'Startup',
      reviews: 892
    },
    {
      id: 3,
      name: 'Slack',
      logo: '/company-logos/slack-new-logo.svg',
      description: 'Team collaboration platform that transforms the way organizations communicate and work together.',
      industry: 'Technology',
      employeeCount: '11-50 employees',
      location: 'San Francisco, CA',
      founded: '2009',
      website: 'http://www.slack.com',
      rating: 4.4,
      activeJobs: 5,
      companyType: 'Startup',
      reviews: 456
    },
    {
      id: 4,
      name: 'Amazon Web Services',
      logo: '/company-logos/amazon-web-services-2.svg',
      description: 'Comprehensive cloud computing platform offering scalable and reliable infrastructure services.',
      industry: 'Cloud Computing',
      employeeCount: '10,001+ employees',
      location: 'Seattle, Washington',
      founded: '2006',
      website: 'http://www.aws.amazon.com',
      rating: 4.7,
      activeJobs: 15,
      featured: true,
      companyType: 'Foreign MNC',
      reviews: 2156
    },
    {
      id: 5,
      name: 'CNBC',
      logo: '/company-logos/cnbc-1.svg',
      description: 'Leading business news and financial information network providing real-time market coverage.',
      industry: 'Media',
      employeeCount: '1,001-5,000 employees',
      location: 'Englewood Cliffs, NJ',
      founded: '1989',
      website: 'http://www.cnbc.com',
      rating: 4.3,
      activeJobs: 6,
      companyType: 'Corporate',
      reviews: 678
    },
    {
      id: 6,
      name: 'CRDB Bank',
      logo: '/company-logos/crdb-bank.svg',
      description: 'Leading commercial bank in Tanzania providing comprehensive financial services.',
      industry: 'Banking',
      employeeCount: '5,001-10,000 employees',
      location: 'Dar es Salaam, Tanzania',
      founded: '1996',
      website: 'http://www.crdb.co.tz',
      rating: 4.5,
      activeJobs: 18,
      featured: true,
      companyType: 'Local MNC',
      reviews: 945
    },
    {
      id: 7,
      name: 'Facebook',
      logo: '/company-logos/facebook-2020-1-1.svg',
      description: 'Social media platform connecting billions of people worldwide through innovative technology.',
      industry: 'Technology',
      employeeCount: '10,001+ employees',
      location: 'Menlo Park, CA',
      founded: '2004',
      website: 'http://www.facebook.com',
      rating: 4.2,
      activeJobs: 22,
      companyType: 'Foreign MNC',
      reviews: 3421
    },
    {
      id: 8,
      name: 'Fiverr',
      logo: '/company-logos/fiverr-1.svg',
      description: 'Global marketplace connecting businesses with freelancers offering digital services.',
      industry: 'Marketplace',
      employeeCount: '1,001-5,000 employees',
      location: 'Tel Aviv, Israel',
      founded: '2010',
      website: 'http://www.fiverr.com',
      rating: 4.1,
      activeJobs: 9,
      companyType: 'Startup',
      reviews: 567
    },
    {
      id: 9,
      name: 'Forbes',
      logo: '/company-logos/forbes-2.svg',
      description: 'Leading business magazine and media company covering entrepreneurship and leadership.',
      industry: 'Media',
      employeeCount: '501-1,000 employees',
      location: 'New York, NY',
      founded: '1917',
      website: 'http://www.forbes.com',
      rating: 4.4,
      activeJobs: 7,
      companyType: 'Corporate',
      reviews: 789
    },
    {
      id: 10,
      name: 'Grab',
      logo: '/company-logos/grab-2.svg',
      description: 'Southeast Asian super app providing transportation, food delivery, and financial services.',
      industry: 'Transportation',
      employeeCount: '5,001-10,000 employees',
      location: 'Singapore',
      founded: '2012',
      website: 'http://www.grab.com',
      rating: 4.3,
      activeJobs: 11,
      companyType: 'Startup',
      reviews: 1234
    },
    {
      id: 11,
      name: 'MTN',
      logo: '/company-logos/mtn-new-logo.svg',
      description: 'Leading telecommunications company providing mobile and digital services across Africa.',
      industry: 'Telecommunications',
      employeeCount: '10,001+ employees',
      location: 'Johannesburg, South Africa',
      founded: '1994',
      website: 'http://www.mtn.com',
      rating: 4.6,
      activeJobs: 14,
      featured: true,
      companyType: 'Foreign MNC',
      reviews: 1678
    },
    {
      id: 12,
      name: 'Udemy',
      logo: '/company-logos/udemy-2.svg',
      description: 'Online learning platform offering courses from expert instructors worldwide.',
      industry: 'Education',
      employeeCount: '1,001-5,000 employees',
      location: 'San Francisco, CA',
      founded: '2010',
      website: 'http://www.udemy.com',
      rating: 4.5,
      activeJobs: 8,
      companyType: 'Startup',
      reviews: 892
    }
  ];

  // Categories with company counts
  const categories = [
    { id: 'all', name: 'All Companies', count: companies.length },
    { id: 'technology', name: 'Technology', count: companies.filter(c => c.industry === 'Technology').length },
    { id: 'startup', name: 'Startups', count: companies.filter(c => c.companyType === 'Startup').length },
    { id: 'banking', name: 'Banking & Finance', count: companies.filter(c => c.industry === 'Banking').length },
    { id: 'media', name: 'Media & Entertainment', count: companies.filter(c => c.industry === 'Media' || c.industry === 'Entertainment').length },
    { id: 'telecom', name: 'Telecommunications', count: companies.filter(c => c.industry === 'Telecommunications').length },
    { id: 'education', name: 'Education', count: companies.filter(c => c.industry === 'Education').length }
  ];

  const industries = ['all', 'Technology', 'Entertainment', 'Cloud Computing', 'Media', 'Banking', 'Marketplace', 'Transportation', 'Telecommunications', 'Education'];
  const locations = ['all', 'Cupertino, California', 'Stockholm, Sweden', 'San Francisco, CA', 'Seattle, Washington', 'Englewood Cliffs, NJ', 'Dar es Salaam, Tanzania', 'Menlo Park, CA', 'Tel Aviv, Israel', 'New York, NY', 'Singapore', 'Johannesburg, South Africa'];
  const companyTypes = ['all', 'Startup', 'Corporate', 'Foreign MNC', 'Local MNC'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'technology' && company.industry === 'Technology') ||
                           (selectedCategory === 'startup' && company.companyType === 'Startup') ||
                           (selectedCategory === 'banking' && company.industry === 'Banking') ||
                           (selectedCategory === 'media' && (company.industry === 'Media' || company.industry === 'Entertainment')) ||
                           (selectedCategory === 'telecom' && company.industry === 'Telecommunications') ||
                           (selectedCategory === 'education' && company.industry === 'Education');
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'all' || company.location === selectedLocation;
    const matchesCompanyType = selectedCompanyType === 'all' || company.companyType === selectedCompanyType;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesLocation && matchesCompanyType;
  });

  const appliedFiltersCount = [selectedIndustry, selectedLocation, selectedCompanyType].filter(f => f !== 'all').length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Companies Actively Hiring
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Discover top companies across various industries and find your next career opportunity
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search companies by name, industry, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#21446e] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedCategory === category.id && <Check className="w-4 h-4" />}
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">All Filters</h3>
                    {appliedFiltersCount > 0 && (
                      <span className="bg-[#21446e] text-white text-xs px-2 py-1 rounded-full">
                        Applied ({appliedFiltersCount})
                      </span>
                    )}
                  </div>

                  {/* Company Type Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Company Type</h4>
                    <div className="space-y-2">
                      {companyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="companyType"
                            value={type}
                            checked={selectedCompanyType === type}
                            onChange={(e) => setSelectedCompanyType(e.target.value)}
                            className="w-4 h-4 text-[#21446e] border-gray-300 focus:ring-[#21446e]"
                          />
                          <span className="text-gray-700">
                            {type === 'all' ? 'All Types' : type}
                            {type !== 'all' && (
                              <span className="text-gray-500 ml-1">
                                ({companies.filter(c => c.companyType === type).length})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search Location"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21446e] focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {locations.slice(0, 6).map((location) => (
                        <label key={location} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="location"
                            value={location}
                            checked={selectedLocation === location}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="w-4 h-4 text-[#21446e] border-gray-300 focus:ring-[#21446e]"
                          />
                          <span className="text-gray-700">
                            {location === 'all' ? 'All Locations' : location}
                            {location !== 'all' && (
                              <span className="text-gray-500 ml-1">
                                ({companies.filter(c => c.location === location).length})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                      {locations.length > 6 && (
                        <button className="text-[#21446e] text-sm font-medium">
                          +{locations.length - 6} more
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Industry Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Industry</h4>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search Industry"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21446e] focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {industries.slice(0, 6).map((industry) => (
                        <label key={industry} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="industry"
                            value={industry}
                            checked={selectedIndustry === industry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-4 h-4 text-[#21446e] border-gray-300 focus:ring-[#21446e]"
                          />
                          <span className="text-gray-700">
                            {industry === 'all' ? 'All Industries' : industry}
                            {industry !== 'all' && (
                              <span className="text-gray-500 ml-1">
                                ({companies.filter(c => c.industry === industry).length})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                      {industries.length > 6 && (
                        <button className="text-[#21446e] text-sm font-medium">
                          +{industries.length - 6} more
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {appliedFiltersCount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedIndustry('all');
                        setSelectedLocation('all');
                        setSelectedCompanyType('all');
                      }}
                      className="w-full text-[#21446e] text-sm font-medium hover:underline"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{filteredCompanies.length}</span> companies
                    </p>
                    {appliedFiltersCount > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Filter className="w-4 h-4" />
                        <span>Filtered results</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCompanies.map((company) => (
                    <div key={company.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                            <img 
                              src={company.logo} 
                              alt={`${company.name} logo`}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                            {company.rating && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="font-medium text-gray-700">{company.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {company.reviews} reviews
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>

                      {/* Company Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {company.companyType}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {company.industry}
                        </span>
                        {company.founded && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            Founded: {company.founded}
                          </span>
                        )}
                        {company.featured && (
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Company Info */}
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{company.employeeCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{company.activeJobs} active jobs</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          to={`/company/${company.id}`}
                          className="flex-1 bg-[#21446e] text-white py-3 px-4 rounded-xl hover:bg-[#1a3658] transition-colors font-medium text-center"
                        >
                          View Profile
                        </Link>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {filteredCompanies.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Companies; 