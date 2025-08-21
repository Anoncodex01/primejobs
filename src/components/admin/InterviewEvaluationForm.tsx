import React, { useState } from 'react';
import {
  X,
  Star,
  FileText,
  Download,
  Save,
  AlertCircle,
  User,
  Calendar,
  Clock,
  Building
} from 'lucide-react';
import { InterviewEvaluation } from '../../types/employer';

interface InterviewEvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evaluation: Omit<InterviewEvaluation, 'id' | 'evaluatedBy' | 'evaluatedAt'>) => void;
  candidateId: string;
  jobId: string;
  candidateName?: string;
  jobTitle?: string;
  interviewDate?: string;
}

const InterviewEvaluationForm: React.FC<InterviewEvaluationFormProps> = ({
  isOpen,
  onClose,
  onSave,
  candidateId,
  jobId,
  candidateName = '',
  jobTitle = '',
  interviewDate = ''
}) => {
  const [formData, setFormData] = useState({
    interviewerName: '',
    interviewDate: interviewDate,
    interviewMode: 'online' as 'online' | 'physical',
    
    // Ratings (Above/Satisfactory/Below/Unsatisfactory)
    technicalSkills: '' as 'above' | 'satisfactory' | 'below' | 'unsatisfactory',
    communication: '' as 'above' | 'satisfactory' | 'below' | 'unsatisfactory',
    leadership: '' as 'above' | 'satisfactory' | 'below' | 'unsatisfactory',
    culturalFit: '' as 'above' | 'satisfactory' | 'below' | 'unsatisfactory',
    overallRating: '' as 'above' | 'satisfactory' | 'below' | 'unsatisfactory',
    
    // Comments
    strengths: '',
    weaknesses: '',
    comments: '',
    
    // Final recommendation
    recommendation: '' as 'rejected' | 'can_be_considered' | 'recommended' | 'strongly_recommended'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRatingChange = (field: string, rating: number) => {
    setFormData(prev => ({ ...prev, [field]: rating }));
    
    // Auto-calculate overall rating as average of other ratings
    if (field !== 'overallRating') {
      const ratings = {
        technicalSkills: field === 'technicalSkills' ? rating : formData.technicalSkills,
        communication: field === 'communication' ? rating : formData.communication,
        culturalFit: field === 'culturalFit' ? rating : formData.culturalFit
      };
      
      const validRatings = Object.values(ratings).filter(r => r > 0);
      if (validRatings.length > 0) {
        const average = Math.round(validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length);
        setFormData(prev => ({ ...prev, overallRating: average }));
      }
    }
  };

         const validateForm = () => {
         const newErrors: Record<string, string> = {};
     
         if (!formData.interviewerName.trim()) {
           newErrors.interviewerName = 'Interviewer name is required';
         }
     
         if (!formData.interviewDate) {
           newErrors.interviewDate = 'Interview date is required';
         }
     
         if (!formData.technicalSkills) {
           newErrors.technicalSkills = 'Technical skills rating is required';
         }
     
         if (!formData.communication) {
           newErrors.communication = 'Communication rating is required';
         }
     
         if (!formData.leadership) {
           newErrors.leadership = 'Leadership rating is required';
         }
     
         if (!formData.culturalFit) {
           newErrors.culturalFit = 'Cultural fit rating is required';
         }

    if (!formData.strengths.trim()) {
      newErrors.strengths = 'Strengths are required';
    }

    if (!formData.weaknesses.trim()) {
      newErrors.weaknesses = 'Weaknesses are required';
    }

    if (!formData.comments.trim()) {
      newErrors.comments = 'Comments are required';
    }

    if (!formData.recommendation) {
      newErrors.recommendation = 'Final recommendation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
                 const evaluation: Omit<InterviewEvaluation, 'id' | 'evaluatedBy' | 'evaluatedAt'> = {
             candidateId,
             jobId,
             interviewerName: formData.interviewerName,
             interviewDate: formData.interviewDate,
             interviewMode: formData.interviewMode,
             technicalSkills: formData.technicalSkills,
             communication: formData.communication,
             leadership: formData.leadership,
             culturalFit: formData.culturalFit,
             overallRating: formData.overallRating,
             strengths: formData.strengths,
             weaknesses: formData.weaknesses,
             comments: formData.comments,
             recommendation: formData.recommendation,
             isSubmittedToClient: false
           };

      onSave(evaluation);
      onClose();
      
      // Reset form
      setFormData({
        interviewerName: '',
        interviewDate: interviewDate,
        interviewMode: 'online',
        technicalSkills: 0,
        communication: 0,
        culturalFit: 0,
        overallRating: 0,
        strengths: '',
        weaknesses: '',
        comments: '',
        recommendation: '' as any
      });
      setErrors({});
    }
  };

  const generatePDF = () => {
    // This would integrate with a PDF generation library
    // For now, we'll just show a success message
    alert('PDF generation would be implemented here with a library like jsPDF or similar');
  };

         const RatingSelect: React.FC<{
         rating: string;
         onRatingChange: (rating: 'above' | 'satisfactory' | 'below' | 'unsatisfactory') => void;
         error?: string;
       }> = ({ rating, onRatingChange, error }) => (
         <div>
           <select
             value={rating}
             onChange={(e) => onRatingChange(e.target.value as any)}
             className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
               error ? 'border-red-500' : 'border-gray-300'
             }`}
           >
             <option value="">Select rating</option>
             <option value="above">Above</option>
             <option value="satisfactory">Satisfactory</option>
             <option value="below">Below</option>
             <option value="unsatisfactory">Unsatisfactory</option>
           </select>
           {error && (
             <p className="mt-1 text-sm text-red-600 flex items-center">
               <AlertCircle className="w-4 h-4 mr-1" />
               {error}
             </p>
           )}
         </div>
       );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Interview Evaluation Form</h3>
              <p className="text-sm text-gray-600 mt-1">
                {candidateName && `Candidate: ${candidateName}`} {jobTitle && `• ${jobTitle}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Interview Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Interviewer Name
                </label>
                <input
                  type="text"
                  value={formData.interviewerName}
                  onChange={(e) => handleInputChange('interviewerName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                    errors.interviewerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter interviewer name"
                />
                {errors.interviewerName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.interviewerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Interview Date
                </label>
                <input
                  type="date"
                  value={formData.interviewDate}
                  onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                    errors.interviewDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.interviewDate && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.interviewDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Mode
                </label>
                <select
                  value={formData.interviewMode}
                  onChange={(e) => handleInputChange('interviewMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
                >
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">Candidate Assessment</h4>
            
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Skills
                </label>
                <RatingSelect
                  rating={formData.technicalSkills}
                  onRatingChange={(rating) => handleInputChange('technicalSkills', rating)}
                  error={errors.technicalSkills}
                />
              </div>
     
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Skills
                </label>
                <RatingSelect
                  rating={formData.communication}
                  onRatingChange={(rating) => handleInputChange('communication', rating)}
                  error={errors.communication}
                />
              </div>
     
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leadership
                </label>
                <RatingSelect
                  rating={formData.leadership}
                  onRatingChange={(rating) => handleInputChange('leadership', rating)}
                  error={errors.leadership}
                />
              </div>
     
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cultural Fit & Attitude
                </label>
                <RatingSelect
                  rating={formData.culturalFit}
                  onRatingChange={(rating) => handleInputChange('culturalFit', rating)}
                  error={errors.culturalFit}
                />
              </div>
     
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating
                </label>
                <RatingSelect
                  rating={formData.overallRating}
                  onRatingChange={(rating) => handleInputChange('overallRating', rating)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Based on overall assessment
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Detailed Assessment</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Strengths
              </label>
              <textarea
                value={formData.strengths}
                onChange={(e) => handleInputChange('strengths', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.strengths ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the candidate's key strengths and positive attributes..."
              />
              {errors.strengths && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.strengths}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas for Improvement
              </label>
              <textarea
                value={formData.weaknesses}
                onChange={(e) => handleInputChange('weaknesses', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.weaknesses ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe areas where the candidate could improve..."
              />
              {errors.weaknesses && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.weaknesses}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.comments ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Any additional observations, concerns, or recommendations..."
              />
              {errors.comments && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.comments}
                </p>
              )}
            </div>
          </div>

          {/* Final Recommendation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Recommendation
            </label>
            <select
              value={formData.recommendation}
              onChange={(e) => handleInputChange('recommendation', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                errors.recommendation ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select recommendation</option>
              <option value="strongly_recommended">Strongly Recommended</option>
              <option value="recommended">Recommended</option>
              <option value="can_be_considered">Can be Considered</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.recommendation && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.recommendation}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={generatePDF}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Generate PDF
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Evaluation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewEvaluationForm;
