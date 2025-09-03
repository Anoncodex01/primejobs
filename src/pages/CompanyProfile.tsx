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
  Clock,
  Star,
  ExternalLink,
  ArrowRight,
  Mail,
  Phone,
  Award,
  TrendingUp
} from 'lucide-react';

interface JobListing {
  id: number;
  title: string;
  location: string;
  deadline: string;
  salary: string;
  type: string;
  experience: string;
  postedDays: number;
}

interface SimilarCompany {
  id: number;
  name: string;
  logo: string;
  industry: string;
  employeeCount: string;
  location: string;
  activeJobs: number;
}

const CompanyProfile: FC = () => {
  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState<'jobs' | 'about'>('jobs');

  // Mock company data - in real app this would come from API based on companyId
  const company = {
    id: 1,
    name: 'Apple',
    logo: '/company-logos/apple-14.svg',
    description: 'Personal banking, Corporate banking, Business banking, Investment banking, Private Clients, and Wealth creation.',
    industry: 'Technology',
    location: 'Cupertino, California',
    website: 'http://www.apple.com',
    founded: '1976',
    teamSize: '10,001+',
    linkedin: 'https://linkedin.com/company/apple',
    rating: 4.8,
    totalReviews: 1247,
    email: 'careers@apple.com',
    phone: '+1 (408) 996-1010',
    mission: 'To bring the best user experience to its customers through innovative hardware, software, and services.',
    benefits: ['Health Insurance', '401(k) Matching', 'Flexible Work Hours', 'Professional Development', 'Stock Options'],
    culture: 'Innovation-driven culture focused on design excellence and user experience.',
    activeJobs: 12
  };

  const jobs: JobListing[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'Cupertino, California',
      deadline: 'Aug 19, 2025',
      salary: '$120,000 - $180,000',
      type: 'Full-time',
      experience: '5+ years',
      postedDays: 2
    },
    {
      id: 2,
      title: 'Product Manager - iOS',
      location: 'Cupertino, California',
      deadline: 'Aug 25, 2025',
      salary: '$140,000 - $200,000',
      type: 'Full-time',
      experience: '7+ years',
      postedDays: 5
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'San Francisco, CA',
      deadline: 'Aug 18, 2025',
      salary: '$100,000 - $150,000',
      type: 'Full-time',
      experience: '3+ years',
      postedDays: 1
    },
    {
      id: 4,
      title: 'Data Scientist',
      location: 'Cupertino, California',
      deadline: 'Aug 30, 2025',
      salary: '$130,000 - $190,000',
      type: 'Full-time',
      experience: '4+ years',
      postedDays: 8
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      location: 'Austin, Texas',
      deadline: 'Sep 5, 2025',
      salary: '$110,000 - $170,000',
      type: 'Full-time',
      experience: '6+ years',
      postedDays: 12
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      location: 'Cupertino, California',
      deadline: 'Aug 22, 2025',
      salary: '$80,000 - $120,000',
      type: 'Full-time',
      experience: '2+ years',
      postedDays: 3
    }
  ];

  const similarCompanies: SimilarCompany[] = [
    {
      id: 2,
      name: 'Spotify',
      logo: '/company-logos/spotify-2.svg',
      industry: 'Entertainment',
      employeeCount: '1,001-5,000 employees',
      location: 'Stockholm, Sweden',
      activeJobs: 8
    },
    {
      id: 3,
      name: 'Slack',
      logo: '/company-logos/slack-new-logo.svg',
      industry: 'Technology',
      employeeCount: '11-50 employees',
      location: 'San Francisco, CA',
      activeJobs: 5
    },
    {
      id: 4,
      name: 'Amazon Web Services',
      logo: '/company-logos/amazon-web-services-2.svg',
      industry: 'Cloud Computing',
      employeeCount: '10,001+ employees',
      location: 'Seattle, Washington',
      activeJobs: 15
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Company Hero Section */}
        <section className="bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Company Logo and Basic Info */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">{company.name}</h1>
                  <p className="text-xl text-white/90 mb-4 max-w-2xl">{company.description}</p>
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-300 fill-current" />
                      <span className="font-semibold">{company.rating}</span>
                      <span>({company.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:ml-auto flex flex-col gap-3">
                <Link
                  to="/find-job"
                  className="bg-white text-[#21446e] px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  View All Jobs
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#21446e] transition-colors flex items-center justify-center gap-2"
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                        activeTab === 'jobs' 
                          ? 'text-[#21446e] border-b-2 border-[#21446e]' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Jobs ({company.activeJobs})
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                        activeTab === 'about' 
                          ? 'text-[#21446e] border-b-2 border-[#21446e]' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="w-5 h-5" />
                        About
                      </div>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'jobs' ? (
                      <div className="space-y-4">
                        {jobs.map((job) => (
                          <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {job.salary}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {job.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Experience: {job.experience}</span>
                                  <span>Posted {job.postedDays} days ago</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                  <Bookmark className="w-5 h-5" />
                                </button>
                                <Link
                                  to={`/job/${job.id}`}
                                  className="bg-[#21446e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3658] transition-colors font-medium"
                                >
                                  Apply Now
                                </Link>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Application deadline: {job.deadline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Mission */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                          <p className="text-gray-700 leading-relaxed">{company.mission}</p>
                        </div>

                        {/* Culture */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Culture</h3>
                          <p className="text-gray-700 leading-relaxed">{company.culture}</p>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {company.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-[#6db99f]" />
                                <span className="text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-gray-400" />
                              <a href={`mailto:${company.email}`} className="text-[#21446e] hover:underline">
                                {company.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-gray-400" />
                              <a href={`tel:${company.phone}`} className="text-[#21446e] hover:underline">
                                {company.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-gray-400" />
                              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#21446e] hover:underline">
                                {company.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Overview */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Company Overview</h3>
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
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{company.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Active Jobs</p>
                        <p className="font-medium text-gray-900">{company.activeJobs}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Connect</p>
                        <a href={company.linkedin} className="font-medium text-[#21446e] hover:underline">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Similar Companies */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Companies</h3>
                  <div className="space-y-4">
                    {similarCompanies.map((similarCompany) => (
                      <div key={similarCompany.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img src={similarCompany.logo} alt={`${similarCompany.name} logo`} className="w-6 h-6 object-contain" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{similarCompany.name}</h4>
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
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{similarCompany.activeJobs} active jobs</span>
                          </div>
                        </div>
                        <Link
                          to={`/company/${similarCompany.id}`}
                          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium block"
                        >
                          View Profile
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyProfile; 