import { FC, useState } from 'react';
import { User, FileText, Camera, Upload, Save, Send, Shield } from 'lucide-react';

interface CandidateApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  cv: File | null;
  photograph: File | null;
  coverLetter: string;
  consentToDataProcessing: boolean;
  consentToClientSharing: boolean;
}

const ApplicationForm: FC = () => {
  const [application, setApplication] = useState<CandidateApplication>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    cv: null,
    photograph: null,
    coverLetter: '',
    consentToDataProcessing: false,
    consentToClientSharing: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CandidateApplication, value: any) => {
    setApplication(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const applications = JSON.parse(localStorage.getItem('candidateApplications') || '[]');
      applications.push({
        ...application,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        clientSafeVersion: {
          ...application,
          firstName: '[REDACTED]',
          lastName: '[REDACTED]',
          email: '[REDACTED]',
          phone: '[REDACTED]'
        }
      });
      localStorage.setItem('candidateApplications', JSON.stringify(applications));
      
      alert('Application submitted successfully! Your personal information will be protected when shared with clients.');
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Form</h1>
          <p className="text-gray-600">
            Complete this form to apply for positions. Your personal information will be protected when shared with clients.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                Private - Not shared with clients
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={application.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={application.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={application.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={application.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position Applying For *
                </label>
                <input
                  type="text"
                  value={application.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CV/Resume *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                      <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleInputChange('cv', file);
                        }
                      }}
                      className="hidden"
                      id="cv"
                      required
                    />
                                      <label htmlFor="cv" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose CV file
                      </span>
                    </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photograph *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleInputChange('photograph', file);
                      }
                    }}
                    className="hidden"
                    id="photograph"
                    required
                  />
                  <label htmlFor="photograph" className="cursor-pointer">
                    <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Choose photo
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Cover Letter</h2>
            <textarea
              value={application.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a cover letter explaining why you're interested in this position..."
            />
          </div>

          {/* Privacy Consent */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Consent
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentToDataProcessing"
                  checked={application.consentToDataProcessing}
                  onChange={(e) => handleInputChange('consentToDataProcessing', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  required
                />
                <label htmlFor="consentToDataProcessing" className="text-sm text-gray-700">
                  I consent to the processing of my personal data for recruitment purposes. My personal information will be automatically removed when shared with clients.
                </label>
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentToClientSharing"
                  checked={application.consentToClientSharing}
                  onChange={(e) => handleInputChange('consentToClientSharing', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  required
                />
                <label htmlFor="consentToClientSharing" className="text-sm text-gray-700">
                  I consent to my professional information, CV, and photograph being shared with potential employers, with my personal details automatically protected.
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
