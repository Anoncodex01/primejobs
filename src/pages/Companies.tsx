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
  List
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
}

const Companies: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      website: 'http://www.apple.com'
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
      website: 'http://www.spotify.com'
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
      website: 'http://www.slack.com'
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
      website: 'http://www.aws.amazon.com'
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
      website: 'http://www.cnbc.com'
    },
    {
      id: 6,
      name: 'MTN',
      logo: '/company-logos/mtn-new-logo.svg',
      description: 'Leading telecommunications company providing mobile and digital services across Africa.',
      industry: 'Telecommunications',
      employeeCount: '10,001+ employees',
      location: 'Johannesburg, South Africa',
      founded: '1994',
      website: 'http://www.mtn.com'
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
      website: 'http://www.facebook.com'
    },
    {
      id: 8,
      name: 'Forbes',
      logo: '/company-logos/forbes-2.svg',
      description: 'Global media company focusing on business, investing, technology, entrepreneurship, leadership, and lifestyle.',
      industry: 'Media',
      employeeCount: '1,001-5,000 employees',
      location: 'New York, NY',
      founded: '1917',
      website: 'http://www.forbes.com'
    },
    {
      id: 9,
      name: 'Grab',
      logo: '/company-logos/grab-2.svg',
      description: 'Leading super app in Southeast Asia offering transportation, food delivery, and financial services.',
      industry: 'Transportation',
      employeeCount: '1,001-5,000 employees',
      location: 'Singapore',
      founded: '2012',
      website: 'http://www.grab.com'
    },
    {
      id: 10,
      name: 'Fiverr',
      logo: '/company-logos/fiverr-1.svg',
      description: 'Global online marketplace for freelance services connecting businesses with talented professionals.',
      industry: 'Marketplace',
      employeeCount: '501-1,000 employees',
      location: 'Tel Aviv, Israel',
      founded: '2010',
      website: 'http://www.fiverr.com'
    },
    {
      id: 11,
      name: 'Udemy',
      logo: '/company-logos/udemy-2.svg',
      description: 'Online learning platform offering courses from expert instructors worldwide.',
      industry: 'Education',
      employeeCount: '1,001-5,000 employees',
      location: 'San Francisco, CA',
      founded: '2010',
      website: 'http://www.udemy.com'
    },
    {
      id: 12,
      name: 'Viber',
      logo: '/company-logos/viber-icon.svg',
      description: 'Messaging and VoIP app providing free calls and messages to users worldwide.',
      industry: 'Technology',
      employeeCount: '501-1,000 employees',
      location: 'Luxembourg',
      founded: '2010',
      website: 'http://www.viber.com'
    }
  ];

  const industries = ['all', 'Technology', 'Entertainment', 'Cloud Computing', 'Media', 'Telecommunications', 'Transportation', 'Marketplace', 'Education'];
  const locations = ['all', 'Cupertino, California', 'Stockholm, Sweden', 'San Francisco, CA', 'Seattle, Washington', 'Englewood Cliffs, NJ', 'Johannesburg, South Africa', 'Menlo Park, CA', 'New York, NY', 'Singapore', 'Tel Aviv, Israel', 'Luxembourg'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'all' || company.location === selectedLocation;
    
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-[#114373]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Companies</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Companies</h1>
            <p className="text-gray-600">Discover top companies actively hiring and find your next opportunity</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-[#114373] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-[#114373] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Filtered results</span>
            </div>
          </div>

          {/* Companies Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={company.logo} alt={`${company.name} logo`} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{company.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{company.employeeCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{company.website}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/company/${company.id}`}
                    className="w-full bg-[#114373] text-white py-3 px-4 rounded-lg hover:bg-[#0d3559] transition-colors font-medium text-center block"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={company.logo} alt={`${company.name} logo`} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{company.name}</h3>
                      <p className="text-gray-600 mb-3">{company.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{company.industry}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{company.employeeCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{company.website}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/company/${company.id}`}
                      className="bg-[#114373] text-white py-3 px-6 rounded-lg hover:bg-[#0d3559] transition-colors font-medium"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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
      </main>
    </div>
  );
};

export default Companies; 