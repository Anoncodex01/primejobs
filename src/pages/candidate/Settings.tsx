import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  MapPin,
  DollarSign,
  Upload,
  Camera,
  FileText,
  Save,
  XCircle,
  Eye,
  EyeOff,
  Briefcase,
  Clock,
  Star,
  Settings,
  Bell,
  Lock,
  Shield,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const CandidateSettings: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button className="px-4 py-2 bg-[#4ebf9e] text-white rounded-lg hover:bg-[#3da88a] transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Employer</label>
                    <input
                      type="text"
                      value={formData.currentEmployer}
                      onChange={(e) => handleInputChange('currentEmployer', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    >
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.currentSalary}
                          onChange={(e) => handleInputChange('currentSalary', parseInt(e.target.value))}
                          disabled={!isEditing}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.expectedSalary}
                          onChange={(e) => handleInputChange('expectedSalary', parseInt(e.target.value))}
                          disabled={!isEditing}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent disabled:bg-gray-100"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#114373] text-white rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="text-white hover:text-red-200"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {commonSkills.filter(skill => !formData.skills.includes(skill)).map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillAdd(skill)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Preferred Locations */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Locations</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.preferredLocations.map((location, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#4ebf9e] text-white rounded-full text-sm flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      {location}
                      {isEditing && (
                        <button
                          onClick={() => handleLocationRemove(location)}
                          className="text-white hover:text-red-200"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {locations.filter(location => !formData.preferredLocations.includes(location)).map(location => (
                      <button
                        key={location}
                        onClick={() => handleLocationAdd(location)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                      >
                        + {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Profile Photo</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload a passport-size photograph</p>
                    <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </button>
                  </div>

                  {/* CV Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Resume/CV</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload your latest resume or CV</p>
                    <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Personal Info</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Professional Info</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Skills</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Documents</span>
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Overall Progress</span>
                <span className="text-sm font-medium text-[#114373]">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#114373] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                  <p className="text-xs text-gray-600">Who can see your profile</p>
                </div>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Employers Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-600">Job alerts and updates</p>
                </div>
                <button className="w-10 h-6 bg-[#114373] rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-600">Text message alerts</p>
                </div>
                <button className="w-10 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Change Password</p>
                    <p className="text-xs text-gray-600">Update your password</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-Factor Auth</p>
                    <p className="text-xs text-gray-600">Add extra security</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSettings; 