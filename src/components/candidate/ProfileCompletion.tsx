import React, { FC, useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  DollarSign,
  Type,
  Code,
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Plus,
  X,
  BookOpen,
  Award,
  Monitor,
  Globe,
  MapPin,
  Clock,
  Star
} from 'lucide-react';

interface ProfileCompletionProps {
  profile: any;
  onUpdate: (updates: any) => void;
  onComplete: () => void;
  onClose: () => void;
}

const ProfileCompletion: FC<ProfileCompletionProps> = ({ profile, onUpdate, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(profile);

  const steps = [
    { id: 1, title: 'Personal Information', icon: User, completed: profile.profileCompletion.personalInfo },
    { id: 2, title: 'Employment Details', icon: Briefcase, completed: profile.profileCompletion.employment },
    { id: 3, title: 'Education & Certifications', icon: GraduationCap, completed: profile.profileCompletion.education },
    { id: 4, title: 'Salary & Notice Period', icon: DollarSign, completed: profile.profileCompletion.salary },
    { id: 5, title: 'Profile Content', icon: Type, completed: profile.profileCompletion.profileContent },
    { id: 6, title: 'Skills & Projects', icon: Code, completed: profile.profileCompletion.skills },
    { id: 7, title: 'Preferences & Online Presence', icon: Settings, completed: profile.profileCompletion.preferences }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    if (currentStep === steps.length) {
      onComplete();
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onUpdate={setFormData} />;
      case 2:
        return <EmploymentStep formData={formData} onUpdate={setFormData} />;
      case 3:
        return <EducationStep formData={formData} onUpdate={setFormData} />;
      case 4:
        return <SalaryStep formData={formData} onUpdate={setFormData} />;
      case 5:
        return <ProfileContentStep formData={formData} onUpdate={setFormData} />;
      case 6:
        return <SkillsStep formData={formData} onUpdate={setFormData} />;
      case 7:
        return <PreferencesStep formData={formData} onUpdate={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center ${step.completed ? 'text-green-600' : currentStep === step.id ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed ? 'bg-green-100 text-green-600' : 
                      currentStep === step.id ? 'bg-blue-100 text-blue-600' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className="ml-2 text-sm font-medium hidden md:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${step.completed ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
            
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {currentStep === steps.length ? 'Complete Profile' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
const PersonalInfoStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <User className="w-5 h-5" />
      Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => onUpdate({ ...formData, fullName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onUpdate({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  </div>
);

const EmploymentStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <Briefcase className="w-5 h-5" />
      Employment Details
    </h3>
    <p className="text-gray-600">Your employment information has been completed. You can edit it in the main profile section.</p>
  </div>
);

const EducationStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <GraduationCap className="w-5 h-5" />
      Education & Certifications
    </h3>
    <div className="space-y-4">
      {formData.education.map((edu: any, index: number) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[index].degree = e.target.value;
                  onUpdate({ ...formData, education: updatedEducation });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                value={edu.specialization}
                onChange={(e) => {
                  const updatedEducation = [...formData.education];
                  updatedEducation[index].specialization = e.target.value;
                  onUpdate({ ...formData, education: updatedEducation });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SalaryStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <DollarSign className="w-5 h-5" />
      Salary & Notice Period
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current CTC (USD)</label>
        <input
          type="number"
          value={formData.currentCTC}
          onChange={(e) => onUpdate({ ...formData, currentCTC: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected CTC (USD)</label>
        <input
          type="number"
          value={formData.expectedCTC}
          onChange={(e) => onUpdate({ ...formData, expectedCTC: parseInt(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
        <select
          value={formData.noticePeriod}
          onChange={(e) => onUpdate({ ...formData, noticePeriod: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Notice Period</option>
          <option value="Immediate">Immediate</option>
          <option value="15 days">15 days</option>
          <option value="30 days">30 days</option>
          <option value="60 days">60 days</option>
          <option value="90 days">90 days</option>
        </select>
      </div>
    </div>
  </div>
);

const ProfileContentStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <Type className="w-5 h-5" />
      Profile Content
    </h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Resume Headline</label>
        <input
          type="text"
          value={formData.resumeHeadline}
          onChange={(e) => onUpdate({ ...formData, resumeHeadline: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Senior Software Engineer with 5+ years experience"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Summary</label>
        <textarea
          value={formData.profileSummary}
          onChange={(e) => onUpdate({ ...formData, profileSummary: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your background, achievements, and career aspirations..."
        />
      </div>
    </div>
  </div>
);

const SkillsStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <Code className="w-5 h-5" />
      Skills & Projects
    </h3>
    <div className="space-y-4">
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-2">IT Skills</h4>
        {formData.itSkills.map((skill: any, index: number) => (
          <div key={skill.id} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => {
                const updatedSkills = [...formData.itSkills];
                updatedSkills[index].name = e.target.value;
                onUpdate({ ...formData, itSkills: updatedSkills });
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Skill name"
            />
            <select
              value={skill.proficiency}
              onChange={(e) => {
                const updatedSkills = [...formData.itSkills];
                updatedSkills[index].proficiency = e.target.value;
                onUpdate({ ...formData, itSkills: updatedSkills });
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PreferencesStep: FC<{ formData: any; onUpdate: (data: any) => void }> = ({ formData, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <Settings className="w-5 h-5" />
      Preferences & Online Presence
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
        <select
          value={formData.jobPreferences.jobType}
          onChange={(e) => onUpdate({
            ...formData,
            jobPreferences: { ...formData.jobPreferences, jobType: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
        <input
          type="url"
          value={formData.onlinePresence.linkedin || ''}
          onChange={(e) => onUpdate({
            ...formData,
            onlinePresence: { ...formData.onlinePresence, linkedin: e.target.value }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
    </div>
  </div>
);

export default ProfileCompletion;
