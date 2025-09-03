import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components';
import {
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Building2,
  Globe,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle,
  Star
} from 'lucide-react';

interface JobDetails {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    description: string;
    industry: string;
    employeeCount: string;
    location: string;
    website: string;
    founded: string;
  };
  type: string;
  location: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  applicants: number;
  experience: string;
  education: string;
}

const JobView: FC = () => {
  const { jobId } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock job data - in real app this would come from API
  const job: JobDetails = {
    id: jobId || '1',
    title: 'Senior UI/UX Designer',
    company: {
      name: 'Apple',
      logo: '/company-logos/apple-14.svg',
      description: 'Leading technology company creating innovative products that enrich people\'s lives.',
      industry: 'Technology',
      employeeCount: '10,001+ employees',
      location: 'Cupertino, California',
      website: 'https://www.apple.com',
      founded: '1976'
    },
    type: 'Full-Time',
    location: 'Remote',
    salary: '$80,000 - $120,000',
    deadline: '2024-02-15',
    description: 'We are looking for a talented Senior UI/UX Designer to join our creative team. You will be responsible for creating user-centered designs by understanding business requirements, user feedback, and research insights.',
    requirements: [
      '5+ years of experience in UI/UX design',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio demonstrating user-centered design solutions',
      'Experience with user research and usability testing',
      'Knowledge of design systems and component libraries',
      'Excellent communication and collaboration skills'
    ],
    responsibilities: [
      'Create user-centered designs by understanding business requirements',
      'Create user flows, wireframes, prototypes and mockups',
      'Translate requirements into style guides, design systems, design patterns and attractive user interfaces',
      'Create original graphic designs (e.g. images, sketches and tables)',
      'Identify and troubleshoot UX problems (e.g. responsiveness)',
      'Collaborate with product managers and engineers to implement attractive designs'
    ],
    benefits: [
      'Competitive salary and benefits package',
      'Flexible work arrangements',
      'Professional development opportunities',
      'Health, dental, and vision insurance',
      '401(k) matching program',
      'Generous paid time off'
    ],
    postedDate: '2024-01-15',
    applicants: 24,
    experience: '5+ years',
    education: 'Bachelor\'s degree in Design or related field'
  };

  const formatDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day remaining';
    return `${diffDays} days remaining`;
  };

  const formatPostedDate = (date: string) => {
    const postedDate = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - postedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-[#114373]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/job-search" className="hover:text-[#114373]">Jobs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{job.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Job Header */}
              <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <p className="text-xl text-gray-600 mb-4">{job.company.name}</p>
                      
                      {/* Job Tags */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#114373]/10 text-[#114373] rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-[#4ebf9e]/10 text-[#4ebf9e] rounded-full text-sm font-medium">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {job.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-3 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'bg-[#114373] text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-semibold text-gray-900">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-semibold text-gray-900">{formatDeadline(job.deadline)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Applicants</p>
                      <p className="font-semibold text-gray-900">{job.applicants}</p>
                    </div>
                  </div>
                </div>

                {/* Posted Info */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {formatPostedDate(job.postedDate)}</span>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                
                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#4ebf9e] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#4ebf9e] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-[#114373] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0 space-y-6">
              {/* Apply Button */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-[#114373] text-white py-4 px-6 rounded-lg hover:bg-[#0d3559] transition-colors font-semibold text-lg mb-4"
                >
                  Apply Now
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {job.applicants} people have applied for this job
                </p>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium text-gray-900">{job.company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Company Size</p>
                      <p className="font-medium text-gray-900">{job.company.employeeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{job.company.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={job.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-[#114373] hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-1">UI/UX Designer</h4>
                      <p className="text-sm text-gray-600 mb-2">Spotify • Remote</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">$60k - 80k</span>
                        <Link to="/job/2" className="text-[#114373] text-sm font-medium hover:underline">
                          View Job
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobView; 