import React, { FC, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Download,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Globe,
  User,
  Building,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  whatsapp?: {
    countryCode: string;
    number: string;
  };
  status: 'new' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'placed';
  appliedDate: string;
  lastActivity: string;
  skills: string[];
  experience: string;
  location: string;
  currentSalary: string;
  expectedSalary: string;
  education: string;
  avatar?: string;
  notes: string;
  nationality: string;
  currentCompany?: string;
  noticePeriod?: string;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
}

const CandidateProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockCandidate: Candidate = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      whatsapp: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      status: 'shortlisted',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-20',
      skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
      experience: '5 years',
      location: 'San Francisco, CA',
      currentSalary: '$80,000',
      expectedSalary: '$100,000',
      education: 'Bachelor\'s Degree',
      notes: 'Strong technical skills, good communication, team player with leadership potential. Has experience in both frontend and backend development. Good cultural fit for our team.',
      nationality: 'American',
      currentCompany: 'Tech Corp',
      noticePeriod: '30 days',
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Professional' }
      ]
    };

    setCandidate(mockCandidate);
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shortlisted':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'interviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'selected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'placed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <User className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <Star className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'placed':
        return <Award className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    // In real app, call API to delete candidate
    console.log('Deleting candidate:', id);
    setShowDeleteModal(false);
    navigate('/admin/candidates');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#114373]"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Candidate Not Found</h1>
          <p className="text-gray-600 mb-6">The candidate you're looking for doesn't exist.</p>
          <Link
            to="/admin/candidates"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
          >
            Back to Candidates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/candidates"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                <p className="text-gray-600 mt-1">Candidate Profile</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/candidates/${candidate.id}/edit`}
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-700">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
                <p className="text-gray-600">{candidate.currentCompany || 'Available'}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border mt-3 ${getStatusColor(candidate.status)}`}>
                  {getStatusIcon(candidate.status)}
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <a
                  href={`mailto:${candidate.email}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <a
                  href={`tel:${candidate.phone.countryCode.replace('+', '')}${candidate.phone.number.replace(/\D/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                {candidate.whatsapp && (
                  <a
                    href={`https://wa.me/${candidate.whatsapp.countryCode.replace('+', '')}${candidate.whatsapp.number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
              </div>

              {/* Quick Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{candidate.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{candidate.education}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{candidate.nationality}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Notice: {candidate.noticePeriod}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="space-y-2">
                {candidate.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{language.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-sm text-gray-900">{candidate.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{candidate.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">
                    {candidate.phone.countryCode} {candidate.phone.number}
                  </p>
                </div>
                {candidate.whatsapp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                    <p className="text-sm text-gray-900">
                      {candidate.whatsapp.countryCode} {candidate.whatsapp.number}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nationality</label>
                  <p className="text-sm text-gray-900">{candidate.nationality}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Company</label>
                  <p className="text-sm text-gray-900">{candidate.currentCompany || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notice Period</label>
                  <p className="text-sm text-gray-900">{candidate.noticePeriod}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-sm text-gray-900">{candidate.location}</p>
                </div>
              </div>
            </div>

            {/* Compensation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compensation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Salary</label>
                  <p className="text-sm text-gray-900">{candidate.currentSalary}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
                  <p className="text-sm text-gray-900">{candidate.expectedSalary}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-sm text-gray-900">{candidate.experience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <p className="text-sm text-gray-900">{candidate.education}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3>
              <p className="text-gray-700">{candidate.notes}</p>
            </div>

            {/* Application Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                    <p className="text-xs text-gray-500">{formatDate(candidate.appliedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Activity</p>
                    <p className="text-xs text-gray-500">{formatDate(candidate.lastActivity)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Candidate</h3>
                <p className="text-sm text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{candidate.name}</strong>? This will permanently remove their profile and all associated data.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;
