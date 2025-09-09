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
  Building,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface InterviewEvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evaluation: any) => void;
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
    // Basic Information
    candidateName: candidateName,
    jobTitle: jobTitle,
    interviewerName: '',
    interviewDate: interviewDate,
    interviewTime: '',
    interviewMode: 'online' as 'online' | 'physical' | 'hybrid',
    interviewDuration: '',
    
    // Candidate Information
    candidateEmail: '',
    candidatePhone: '',
    currentPosition: '',
    currentCompany: '',
    yearsOfExperience: '',
    
    // Technical Assessment (1-5 scale)
    technicalKnowledge: 0,
    problemSolving: 0,
    codingSkills: 0,
    systemDesign: 0,
    technicalCommunication: 0,
    
    // Soft Skills Assessment (1-5 scale)
    communicationSkills: 0,
    leadership: 0,
    teamwork: 0,
    adaptability: 0,
    timeManagement: 0,
    culturalFit: 0,
    
    // Behavioral Assessment
    motivation: 0,
    workEthic: 0,
    learningAbility: 0,
    stressManagement: 0,
    conflictResolution: 0,
    
    // Overall Ratings
    overallTechnicalRating: 0,
    overallSoftSkillsRating: 0,
    overallBehavioralRating: 0,
    overallRating: 0,
    
    // Detailed Comments
    technicalStrengths: '',
    technicalWeaknesses: '',
    softSkillsStrengths: '',
    softSkillsWeaknesses: '',
    behavioralObservations: '',
    specificExamples: '',
    
    // Interview Questions & Answers
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    question4: '',
    answer4: '',
    question5: '',
    answer5: '',
    
    // Candidate Questions
    candidateQuestions: '',
    candidateInterest: '',
    
    // Final Assessment
    strengths: '',
    areasForImprovement: '',
    additionalComments: '',
    salaryExpectations: '',
    availability: '',
    noticePeriod: '',
    
    // Recommendation
    recommendation: '' as 'strongly_recommended' | 'recommended' | 'can_be_considered' | 'not_recommended',
    recommendationReason: '',
    
    // Next Steps
    nextSteps: '',
    followUpRequired: false,
    followUpNotes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 6;

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRatingChange = (field: string, rating: number) => {
    setFormData(prev => ({ ...prev, [field]: rating }));
    
    // Auto-calculate overall ratings
    if (field.startsWith('technical')) {
      const technicalFields = ['technicalKnowledge', 'problemSolving', 'codingSkills', 'systemDesign', 'technicalCommunication'];
      const technicalRatings = technicalFields.map(f => f === field ? rating : formData[f as keyof typeof formData] as number);
      const avgTechnical = Math.round(technicalRatings.reduce((sum, r) => sum + r, 0) / technicalRatings.length);
      setFormData(prev => ({ ...prev, overallTechnicalRating: avgTechnical }));
    }
    
    if (field.startsWith('communication') || field.startsWith('leadership') || field.startsWith('teamwork') || 
        field.startsWith('adaptability') || field.startsWith('timeManagement') || field.startsWith('culturalFit')) {
      const softSkillsFields = ['communicationSkills', 'leadership', 'teamwork', 'adaptability', 'timeManagement', 'culturalFit'];
      const softSkillsRatings = softSkillsFields.map(f => f === field ? rating : formData[f as keyof typeof formData] as number);
      const avgSoftSkills = Math.round(softSkillsRatings.reduce((sum, r) => sum + r, 0) / softSkillsRatings.length);
      setFormData(prev => ({ ...prev, overallSoftSkillsRating: avgSoftSkills }));
    }
    
    if (field.startsWith('motivation') || field.startsWith('workEthic') || field.startsWith('learningAbility') || 
        field.startsWith('stressManagement') || field.startsWith('conflictResolution')) {
      const behavioralFields = ['motivation', 'workEthic', 'learningAbility', 'stressManagement', 'conflictResolution'];
      const behavioralRatings = behavioralFields.map(f => f === field ? rating : formData[f as keyof typeof formData] as number);
      const avgBehavioral = Math.round(behavioralRatings.reduce((sum, r) => sum + r, 0) / behavioralRatings.length);
      setFormData(prev => ({ ...prev, overallBehavioralRating: avgBehavioral }));
    }
    
    // Calculate overall rating
    const overallTechnical = formData.overallTechnicalRating || 0;
    const overallSoftSkills = formData.overallSoftSkillsRating || 0;
    const overallBehavioral = formData.overallBehavioralRating || 0;
    const overallAvg = Math.round((overallTechnical + overallSoftSkills + overallBehavioral) / 3);
    setFormData(prev => ({ ...prev, overallRating: overallAvg }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.interviewerName.trim()) {
      newErrors.interviewerName = 'Interviewer name is required';
    }
    
    if (!formData.interviewDate) {
      newErrors.interviewDate = 'Interview date is required';
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
      onSave(formData);
      onClose();
    }
  };

  const renderRatingStars = (field: string, value: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(field, star)}
            className="p-1"
          >
            <Star
              className={`w-5 h-5 ${
                star <= value
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {value > 0 ? `${value}/5` : 'Not rated'}
        </span>
      </div>
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Name</label>
                <input
                  type="text"
                  value={formData.candidateName}
                  onChange={(e) => handleInputChange('candidateName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer Name *</label>
                <input
                  type="text"
                  value={formData.interviewerName}
                  onChange={(e) => handleInputChange('interviewerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.interviewerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.interviewerName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date *</label>
                <input
                  type="date"
                  value={formData.interviewDate}
                  onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.interviewDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.interviewDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Time</label>
                <input
                  type="time"
                  value={formData.interviewTime}
                  onChange={(e) => handleInputChange('interviewTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Mode</label>
                <select
                  value={formData.interviewMode}
                  onChange={(e) => handleInputChange('interviewMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Duration</label>
                <input
                  type="text"
                  value={formData.interviewDuration}
                  onChange={(e) => handleInputChange('interviewDuration', e.target.value)}
                  placeholder="e.g., 45 minutes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Technical Assessment</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Technical Knowledge</label>
                {renderRatingStars('technicalKnowledge', formData.technicalKnowledge)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Problem Solving</label>
                {renderRatingStars('problemSolving', formData.problemSolving)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Coding Skills</label>
                {renderRatingStars('codingSkills', formData.codingSkills)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">System Design</label>
                {renderRatingStars('systemDesign', formData.systemDesign)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Technical Communication</label>
                {renderRatingStars('technicalCommunication', formData.technicalCommunication)}
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <label className="text-sm font-semibold text-gray-900">Overall Technical Rating</label>
                <div className="flex items-center gap-2">
                  {renderRatingStars('overallTechnicalRating', formData.overallTechnicalRating)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Strengths</label>
                <textarea
                  value={formData.technicalStrengths}
                  onChange={(e) => handleInputChange('technicalStrengths', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List technical strengths observed..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Weaknesses</label>
                <textarea
                  value={formData.technicalWeaknesses}
                  onChange={(e) => handleInputChange('technicalWeaknesses', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List technical areas for improvement..."
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Soft Skills Assessment</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Communication Skills</label>
                {renderRatingStars('communicationSkills', formData.communicationSkills)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Leadership</label>
                {renderRatingStars('leadership', formData.leadership)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Teamwork</label>
                {renderRatingStars('teamwork', formData.teamwork)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Adaptability</label>
                {renderRatingStars('adaptability', formData.adaptability)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Time Management</label>
                {renderRatingStars('timeManagement', formData.timeManagement)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Cultural Fit</label>
                {renderRatingStars('culturalFit', formData.culturalFit)}
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <label className="text-sm font-semibold text-gray-900">Overall Soft Skills Rating</label>
                <div className="flex items-center gap-2">
                  {renderRatingStars('overallSoftSkillsRating', formData.overallSoftSkillsRating)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills Strengths</label>
                <textarea
                  value={formData.softSkillsStrengths}
                  onChange={(e) => handleInputChange('softSkillsStrengths', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List soft skills strengths observed..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills Weaknesses</label>
                <textarea
                  value={formData.softSkillsWeaknesses}
                  onChange={(e) => handleInputChange('softSkillsWeaknesses', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List soft skills areas for improvement..."
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Behavioral Assessment</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Motivation</label>
                {renderRatingStars('motivation', formData.motivation)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Work Ethic</label>
                {renderRatingStars('workEthic', formData.workEthic)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Learning Ability</label>
                {renderRatingStars('learningAbility', formData.learningAbility)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Stress Management</label>
                {renderRatingStars('stressManagement', formData.stressManagement)}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Conflict Resolution</label>
                {renderRatingStars('conflictResolution', formData.conflictResolution)}
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <label className="text-sm font-semibold text-gray-900">Overall Behavioral Rating</label>
                <div className="flex items-center gap-2">
                  {renderRatingStars('overallBehavioralRating', formData.overallBehavioralRating)}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Behavioral Observations</label>
              <textarea
                value={formData.behavioralObservations}
                onChange={(e) => handleInputChange('behavioralObservations', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe behavioral observations and examples..."
              />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Interview Questions & Answers</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 1</label>
                <input
                  type="text"
                  value={formData.question1}
                  onChange={(e) => handleInputChange('question1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter question asked..."
                />
                <textarea
                  value={formData.answer1}
                  onChange={(e) => handleInputChange('answer1', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                  placeholder="Candidate's answer..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 2</label>
                <input
                  type="text"
                  value={formData.question2}
                  onChange={(e) => handleInputChange('question2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter question asked..."
                />
                <textarea
                  value={formData.answer2}
                  onChange={(e) => handleInputChange('answer2', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                  placeholder="Candidate's answer..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 3</label>
                <input
                  type="text"
                  value={formData.question3}
                  onChange={(e) => handleInputChange('question3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter question asked..."
                />
                <textarea
                  value={formData.answer3}
                  onChange={(e) => handleInputChange('answer3', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                  placeholder="Candidate's answer..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Questions</label>
              <textarea
                value={formData.candidateQuestions}
                onChange={(e) => handleInputChange('candidateQuestions', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Questions asked by the candidate..."
              />
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Final Assessment & Recommendation</h3>
            
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <label className="text-lg font-semibold text-gray-900">Overall Rating</label>
              <div className="flex items-center gap-2">
                {renderRatingStars('overallRating', formData.overallRating)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Strengths</label>
                <textarea
                  value={formData.strengths}
                  onChange={(e) => handleInputChange('strengths', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Key strengths of the candidate..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Improvement</label>
                <textarea
                  value={formData.areasForImprovement}
                  onChange={(e) => handleInputChange('areasForImprovement', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Areas where the candidate can improve..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
              <textarea
                value={formData.additionalComments}
                onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional observations or comments..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expectations</label>
                <input
                  type="text"
                  value={formData.salaryExpectations}
                  onChange={(e) => handleInputChange('salaryExpectations', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., $50,000 - $60,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2 weeks notice"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                <input
                  type="text"
                  value={formData.noticePeriod}
                  onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30 days"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Final Recommendation *</label>
              <select
                value={formData.recommendation}
                onChange={(e) => handleInputChange('recommendation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Recommendation</option>
                <option value="strongly_recommended">Strongly Recommended</option>
                <option value="recommended">Recommended</option>
                <option value="can_be_considered">Can be Considered</option>
                <option value="not_recommended">Not Recommended</option>
              </select>
              {errors.recommendation && (
                <p className="text-red-500 text-sm mt-1">{errors.recommendation}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation Reason</label>
              <textarea
                value={formData.recommendationReason}
                onChange={(e) => handleInputChange('recommendationReason', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Explain the reasoning behind your recommendation..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps</label>
              <textarea
                value={formData.nextSteps}
                onChange={(e) => handleInputChange('nextSteps', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are the next steps for this candidate?"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Interview Evaluation Form</h2>
              <p className="text-sm text-gray-600">Comprehensive candidate assessment</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Section {currentSection} of {totalSections}</span>
              <span>{Math.round((currentSection / totalSections) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentSection / totalSections) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderSection()}
          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              {currentSection > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentSection(currentSection - 1)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              {currentSection < totalSections ? (
                <button
                  type="button"
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Evaluation
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewEvaluationForm;