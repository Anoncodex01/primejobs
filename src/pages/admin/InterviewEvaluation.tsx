import { FC, useState } from 'react';
import {
  User,
  Calendar,
  Clock,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  Save,
  Send,
  Building2,
  MapPin,
  DollarSign,
  Award,
  Users,
  TrendingUp,
  Target,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

interface InterviewEvaluation {
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  interviewerName: string;
  
  // Personal Information
  currentSalary: string;
  expectedSalary: string;
  
  // Technical Skills (1-5 scale)
  technicalSkills: number;
  problemSolving: number;
  communicationSkills: number;
  experience: number;
  culturalFit: number;
  leadership: number; // New field
  
  // Overall Assessment
  strengths: string;
  weaknesses: string;
  recommendations: string;
  
  // Final Recommendation
  recommendation: 'recommended' | 'strongly_recommended' | 'not_recommended';
  
  // Additional Comments
  additionalComments: string;
}

const InterviewEvaluation: FC = () => {
  const [evaluation, setEvaluation] = useState<InterviewEvaluation>({
    candidateName: '',
    position: '',
    interviewDate: '',
    interviewTime: '',
    interviewerName: '',
    currentSalary: '',
    expectedSalary: '',
    technicalSkills: 0,
    problemSolving: 0,
    communicationSkills: 0,
    experience: 0,
    culturalFit: 0,
    leadership: 0,
    strengths: '',
    weaknesses: '',
    recommendations: '',
    recommendation: 'recommended',
    additionalComments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof InterviewEvaluation, value: any) => {
    setEvaluation(prev => ({ ...prev, [field]: value }));
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Not Rated';
    }
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1: return 'text-red-600';
      case 2: return 'text-orange-600';
      case 3: return 'text-yellow-600';
      case 4: return 'text-blue-600';
      case 5: return 'text-green-600';
      default: return 'text-gray-400';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store evaluation in localStorage for demo
      const evaluations = JSON.parse(localStorage.getItem('interviewEvaluations') || '[]');
      evaluations.push({
        ...evaluation,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('interviewEvaluations', JSON.stringify(evaluations));
      
      alert('Interview evaluation submitted successfully!');
      // Reset form
      setEvaluation({
        candidateName: '',
        position: '',
        interviewDate: '',
        interviewTime: '',
        interviewerName: '',
        currentSalary: '',
        expectedSalary: '',
        technicalSkills: 0,
        problemSolving: 0,
        communicationSkills: 0,
        experience: 0,
        culturalFit: 0,
        leadership: 0,
        strengths: '',
        weaknesses: '',
        recommendations: '',
        recommendation: 'recommended',
        additionalComments: ''
      });
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('Error submitting evaluation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingStars = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`p-1 rounded hover:bg-gray-100 ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
      <span className={`ml-2 text-sm font-medium ${getRatingColor(rating)}`}>
        {getRatingLabel(rating)}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Evaluation Form</h1>
          <p className="text-gray-600">
            Complete this evaluation form after conducting the interview. This will be shared with the client.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidate Name *
                </label>
                <input
                  type="text"
                  value={evaluation.candidateName}
                  onChange={(e) => handleInputChange('candidateName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter candidate name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={evaluation.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter position title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Date *
                </label>
                <input
                  type="date"
                  value={evaluation.interviewDate}
                  onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Time *
                </label>
                <input
                  type="time"
                  value={evaluation.interviewTime}
                  onChange={(e) => handleInputChange('interviewTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current/Last Salary *
                </label>
                <input
                  type="text"
                  value={evaluation.currentSalary}
                  onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., TZS 2,500,000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary *
                </label>
                <input
                  type="text"
                  value={evaluation.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., TZS 3,000,000"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interviewer Name *
                </label>
                <input
                  type="text"
                  value={evaluation.interviewerName}
                  onChange={(e) => handleInputChange('interviewerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Assessment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Assessment</h2>
            <p className="text-sm text-gray-600 mb-6">Rate the candidate on a scale of 1-5 (1=Poor, 5=Excellent)</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Technical Skills</h3>
                  <p className="text-xs text-gray-500">Knowledge and proficiency in required technical areas</p>
                </div>
                <RatingStars 
                  rating={evaluation.technicalSkills} 
                  onRatingChange={(rating) => handleInputChange('technicalSkills', rating)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Problem Solving</h3>
                  <p className="text-xs text-gray-500">Ability to analyze and solve complex problems</p>
                </div>
                <RatingStars 
                  rating={evaluation.problemSolving} 
                  onRatingChange={(rating) => handleInputChange('problemSolving', rating)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Communication Skills</h3>
                  <p className="text-xs text-gray-500">Verbal and written communication abilities</p>
                </div>
                <RatingStars 
                  rating={evaluation.communicationSkills} 
                  onRatingChange={(rating) => handleInputChange('communicationSkills', rating)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Experience</h3>
                  <p className="text-xs text-gray-500">Relevant work experience and background</p>
                </div>
                <RatingStars 
                  rating={evaluation.experience} 
                  onRatingChange={(rating) => handleInputChange('experience', rating)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Cultural Fit</h3>
                  <p className="text-xs text-gray-500">Alignment with company culture and values</p>
                </div>
                <RatingStars 
                  rating={evaluation.culturalFit} 
                  onRatingChange={(rating) => handleInputChange('culturalFit', rating)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Leadership</h3>
                  <p className="text-xs text-gray-500">Leadership potential and team management skills</p>
                </div>
                <RatingStars 
                  rating={evaluation.leadership} 
                  onRatingChange={(rating) => handleInputChange('leadership', rating)} 
                />
              </div>
            </div>
          </div>

          {/* Detailed Assessment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Assessment</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Strengths *
                </label>
                <textarea
                  value={evaluation.strengths}
                  onChange={(e) => handleInputChange('strengths', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List the candidate's key strengths and positive attributes..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas for Improvement *
                </label>
                <textarea
                  value={evaluation.weaknesses}
                  onChange={(e) => handleInputChange('weaknesses', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Identify areas where the candidate could improve..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendations *
                </label>
                <textarea
                  value={evaluation.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide specific recommendations for the candidate..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Final Recommendation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Final Recommendation</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Recommendation *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommendation"
                      value="strongly_recommended"
                      checked={evaluation.recommendation === 'strongly_recommended'}
                      onChange={(e) => handleInputChange('recommendation', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">Strongly Recommended</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommendation"
                      value="recommended"
                      checked={evaluation.recommendation === 'recommended'}
                      onChange={(e) => handleInputChange('recommendation', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">Recommended</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommendation"
                      value="not_recommended"
                      checked={evaluation.recommendation === 'not_recommended'}
                      onChange={(e) => handleInputChange('recommendation', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">Not Recommended</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={evaluation.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional comments or observations..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
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
                  Submit Evaluation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewEvaluation;
