import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  Plus,
  X
} from 'lucide-react';

interface JobForm {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  experience: string;
  education: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  deadline: string;
  workModel: string;
}

const CreateJob: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState<JobForm>({
    title: '',
    company: 'Apple Inc.',
    location: '',
    jobType: 'Full-Time',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    experience: '',
    education: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    deadline: '',
    workModel: 'Remote'
  });

  const handleInputChange = (field: keyof JobForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof JobForm, index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof JobForm) => {
    setForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof JobForm, index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/employer/agreements');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Job title and company details' },
    { number: 2, title: 'Job Details', description: 'Description, requirements, and responsibilities' },
    { number: 3, title: 'Review & Submit', description: 'Review and submit for approval' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/employer/dashboard" className="p-2 text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
      </div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.number 
                  ? 'bg-[#114373] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-[#114373]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="e.g., Senior UI/UX Designer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="e.g., Remote, San Francisco, New York"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  value={form.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Model *
                </label>
                <select
                  value={form.workModel}
                  onChange={(e) => handleInputChange('workModel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  value={form.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (6-10 years)</option>
                  <option value="Executive">Executive (10+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education *
                </label>
                <select
                  value={form.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={form.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="number"
                  value={form.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="Min salary"
                />
                <input
                  type="number"
                  value={form.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="Max salary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Job Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements *
                </label>
                {form.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter a requirement"
                      required
                    />
                    {form.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="flex items-center gap-2 text-[#114373] hover:text-[#0d3559] text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities
                </label>
                {form.responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter a responsibility"
                    />
                    {form.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('responsibilities', index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('responsibilities')}
                  className="flex items-center gap-2 text-[#114373] hover:text-[#0d3559] text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Responsibility
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>
                {form.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter a benefit"
                    />
                    {form.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('benefits', index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('benefits')}
                  className="flex items-center gap-2 text-[#114373] hover:text-[#0d3559] text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Benefit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Job Title:</span>
                      <p className="font-medium">{form.title}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Company:</span>
                      <p className="font-medium">{form.company}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location:</span>
                      <p className="font-medium">{form.location}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Job Type:</span>
                      <p className="font-medium">{form.jobType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Salary Range:</span>
                      <p className="font-medium">
                        {form.salaryMin && form.salaryMax 
                          ? `${form.currency} ${form.salaryMin} - ${form.salaryMax}`
                          : 'Not specified'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {form.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#114373] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">{form.description}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
                <p className="text-sm text-blue-700">
                  Your job posting will be reviewed by Axia HR Advisory team before being published. 
                  You will receive a notification once it's approved and live on the platform.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-4">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJob; 