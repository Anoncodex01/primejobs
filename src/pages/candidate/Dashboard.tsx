import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  User,
  Building2,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Archive,
  Star,
  MessageCircle,
  Download,
  Send,
  EyeOff,
  Lock,
  Award,
  ThumbsUp,
  ThumbsDown,
  Upload,
  Camera,
  GraduationCap,
  Briefcase,
  DollarSign,
  Globe,
  BookOpen,
  Save,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  CheckSquare,
  Square,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Bell,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Settings
} from 'lucide-react';

interface CandidateProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentEmployer: string;
  industry: string;
  education: string;
  skills: string[];
  experience: number;
  currentSalary: number;
  expectedSalary: number;
  location: string;
  preferredLocations: string[];
  resumeUrls: string[];
  photoUrl?: string;
  status: 'active' | 'inactive' | 'placed';
  registrationDate: string;
  lastUpdated: string;
}

const CandidatePortal: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    password: '',
    confirmPassword: '',
    currentEmployer: 'Tech Corp',
    industry: 'Technology',
    education: 'Bachelor\'s Degree',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    experience: 5,
    currentSalary: 75000,
    expectedSalary: 90000,
    location: 'San Francisco, CA',
    preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote'],
    bio: 'Experienced software engineer with 5+ years in full-stack development...'
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Media & Entertainment',
    'Real Estate',
    'Transportation',
    'Energy',
    'Government',
    'Non-profit',
    'Other'
  ];

  const educationLevels = [
    'High School',
    'Associate\'s Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Professional Certification',
    'Other'
  ];

  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Denver, CO',
    'Atlanta, GA',
    'Miami, FL',
    'Remote',
    'Other'
  ];

  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'SQL', 'NoSQL',
    'Machine Learning', 'Data Analysis', 'Project Management', 'Agile',
    'Scrum', 'Leadership', 'Communication', 'Problem Solving', 'Team Work'
  ];

  const applications = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      appliedDate: '2024-01-15',
      status: 'applied',
      location: 'San Francisco, CA',
      salary: '$90k - $120k'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'Startup Inc',
      appliedDate: '2024-01-20',
      status: 'shortlisted',
      location: 'Remote',
      salary: '$80k - $110k'
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'Digital Agency',
      appliedDate: '2024-01-25',
      status: 'interviewed',
      location: 'New York, NY',
      salary: '$85k - $115k'
    }
  ];

  const stats = [
    {
      title: 'Total Applications',
      value: '12',
      change: '+3',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Shortlisted',
      value: '5',
      change: '+2',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Interviews',
      value: '3',
      change: '+1',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Profile Views',
      value: '47',
      change: '+12',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-orange-500',
      trend: 'up'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'selected':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <FileText className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckSquare className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <ThumbsUp className="w-4 h-4" />;
      case 'rejected':
        return <ThumbsDown className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleLocationAdd = (location: string) => {
    if (!formData.preferredLocations.includes(location)) {
      setFormData(prev => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, location]
      }));
    }
  };

  const handleLocationRemove = (location: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(l => l !== location)
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
        <p className="text-gray-600">Track your job applications and manage your career profile</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
              <Link to="/candidate-applications" className="text-[#114373] hover:underline text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {applications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{application.jobTitle}</h4>
                    <p className="text-[#114373] font-medium mb-2">{application.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {application.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {application.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied {formatDate(application.appliedDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </div>
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal; 