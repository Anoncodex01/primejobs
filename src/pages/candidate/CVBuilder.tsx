import { FC, useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  Edit,
  Save,
  Plus,
  Trash2,
  Upload,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Twitter,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
}

const CVBuilder: FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'editor' | 'preview'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [cvData, setCvData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Led development of microservices architecture, improved system performance by 40%, mentored junior developers'
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        company: 'Startup Inc',
        location: 'Remote',
        startDate: '2020-03',
        endDate: '2021-12',
        description: 'Built and maintained web applications using React and Node.js, collaborated with cross-functional teams'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California',
        location: 'Berkeley, CA',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-06'
      }
    ]
  });

  const templates: CVTemplate[] = [
    {
      id: '1',
      name: 'Modern Professional',
      description: 'Clean and modern design perfect for tech professionals',
      preview: 'modern',
      category: 'modern'
    },
    {
      id: '2',
      name: 'Classic Executive',
      description: 'Traditional format suitable for senior positions',
      preview: 'classic',
      category: 'classic'
    },
    {
      id: '3',
      name: 'Creative Portfolio',
      description: 'Eye-catching design for creative professionals',
      preview: 'creative',
      category: 'creative'
    },
    {
      id: '4',
      name: 'Minimal Clean',
      description: 'Simple and elegant minimalist design',
      preview: 'minimal',
      category: 'minimal'
    }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI CV Builder</h1>
          <p className="text-gray-600">Create professional resumes with AI assistance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Choose Template
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'editor'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Edit Content
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preview'
                  ? 'border-[#114373] text-[#114373]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preview & Download
            </button>
          </nav>
        </div>
      </div>

      {/* Template Selection */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-[#114373] shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="p-6">
                <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                  {selectedTemplate === template.id && (
                    <CheckCircle className="w-5 h-5 text-[#114373]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CV Editor */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={cvData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={cvData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={cvData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
              </div>
              <div className="p-6">
                <textarea
                  value={cvData.summary}
                  onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="Write a compelling professional summary..."
                />
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                  </h1>
                  <p className="text-gray-600">{cvData.personalInfo.email} | {cvData.personalInfo.phone}</p>
                  <p className="text-gray-600">{cvData.personalInfo.location}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                  <p className="text-gray-700 text-sm">{cvData.summary}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Work Experience</h2>
                  {cvData.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <span className="text-sm text-gray-600">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-[#114373] font-medium text-sm mb-1">{exp.company}</p>
                      <p className="text-gray-700 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview & Download */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Final Preview</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto">
              {/* CV Content */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                </h1>
                <p className="text-gray-600 mb-1">{cvData.personalInfo.email}</p>
                <p className="text-gray-600 mb-1">{cvData.personalInfo.phone}</p>
                <p className="text-gray-600">{cvData.personalInfo.location}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                  Work Experience
                </h2>
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#114373] font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVBuilder; 