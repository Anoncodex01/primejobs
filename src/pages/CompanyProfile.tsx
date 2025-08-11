import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components';
import { 
  ChevronRight, 
  Briefcase, 
  MapPin, 
  Globe, 
  Calendar, 
  DollarSign, 
  Bookmark,
  Linkedin,
  Users,
  Building2,
  Clock
} from 'lucide-react';

interface JobListing {
  id: number;
  title: string;
  location: string;
  deadline: string;
  salary: string;
}

interface SimilarCompany {
  id: number;
  name: string;
  logo: string;
  industry: string;
  employeeCount: string;
  location: string;
}

const CompanyProfile: FC = () => {
  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState<'jobs' | 'about'>('jobs');

  const company = {
    name: 'Apple',
    logo: '/company-logos/apple-14.svg',
    description: 'Personal banking, Corporate banking, Business banking, Investment banking, Private Clients, and Wealth creation.',
    industry: 'Technology',
    location: 'Cupertino, California',
    website: 'http://www.apple.com',
    founded: '1976',
    teamSize: '10,001+',
    linkedin: 'https://linkedin.com/company/apple'
  };

  const jobs: JobListing[] = [
    {
      id: 1,
      title: 'Customer Service Team Leader',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Aug 19, 2025',
      salary: 'Negotiable'
    },
    {
      id: 2,
      title: 'Branch Manager - IT Plaza, Ohio Street',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Aug 19, 2025',
      salary: 'Negotiable'
    },
    {
      id: 3,
      title: 'Branch Manager',
      location: 'Dar es Salaam, Tanzania',
      deadline: 'Aug 18, 2025',
      salary: 'Negotiable'
    },
    {
      id: 4,
      title: 'Branch Manager',
      location: 'Kahama, Tanzania',
      deadline: 'Aug 18, 2025',
      salary: 'Negotiable'
    }
  ];

  const similarCompanies: SimilarCompany[] = [
    {
      id: 1,
      name: 'Spotify',
      logo: '/company-logos/spotify-2.svg',
      industry: 'Entertainment',
      employeeCount: '1,001-5,000 employees',
      location: 'Stockholm, Sweden'
    },
    {
      id: 2,
      name: 'Slack',
      logo: '/company-logos/slack-new-logo.svg',
      industry: 'Technology',
      employeeCount: '11-50 employees',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      name: 'Amazon Web Services',
      logo: '/company-logos/amazon-web-services-2.svg',
      industry: 'Cloud Computing',
      employeeCount: '10,001+ employees',
      location: 'Seattle, Washington'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#114373]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/job-search" className="hover:text-[#114373]">Companies</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{company.name}</span>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Company Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
              <div className="flex items-start gap-6">
                {/* Company Logo */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img src={company.logo} alt={`${company.name} logo`} className="w-12 h-12 object-contain" />
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{company.name}</h1>
                  <p className="text-gray-600 mb-4 leading-relaxed">{company.description}</p>
                  
                  {/* Company Tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <Globe className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{company.website}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'jobs'
                        ? 'border-[#114373] text-[#114373]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Jobs
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'about'
                        ? 'border-[#114373] text-[#114373]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    About
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'jobs' ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Open Positions</h2>
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <img src={company.logo} alt={`${company.name} logo`} className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Application Deadline: {job.deadline}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                              Save
                            </button>
                            <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium">
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">About {company.name}</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Standard Bank Group is a leading African financial services group with operations in 20 countries across Africa and other selected emerging markets. We offer a comprehensive range of banking and financial services to personal, commercial, corporate and institutional clients.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Companies */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Companies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarCompanies.map((similarCompany) => (
                  <div key={similarCompany.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img src={similarCompany.logo} alt={`${similarCompany.name} logo`} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{similarCompany.name}</h3>
                        <p className="text-sm text-gray-500">{similarCompany.industry}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{similarCompany.employeeCount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{similarCompany.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Profile
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-medium text-gray-900">{company.founded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Team Size</p>
                    <p className="font-medium text-gray-900">{company.teamSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium text-gray-900">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Connect</p>
                    <a href={company.linkedin} className="font-medium text-[#114373] hover:underline">
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{company.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default CompanyProfile; 