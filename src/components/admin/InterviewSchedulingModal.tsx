import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  Link,
  Send,
  AlertCircle
} from 'lucide-react';
import { InterviewDetails } from '../../types/employer';

interface InterviewSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (interviewDetails: Omit<InterviewDetails, 'id' | 'scheduledBy' | 'scheduledAt'>) => void;
  candidateId: string;
  jobId: string;
}

const InterviewSchedulingModal: React.FC<InterviewSchedulingModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
  candidateId,
  jobId
}) => {
  const [formData, setFormData] = useState({
    interviewDate: '',
    interviewTime: '',
    interviewerNames: [''],
    interviewMode: 'online' as 'online' | 'physical',
    meetingLink: '',
    location: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInterviewerChange = (index: number, value: string) => {
    const newInterviewers = [...formData.interviewerNames];
    newInterviewers[index] = value;
    setFormData(prev => ({ ...prev, interviewerNames: newInterviewers }));
  };

  const addInterviewer = () => {
    setFormData(prev => ({
      ...prev,
      interviewerNames: [...prev.interviewerNames, '']
    }));
  };

  const removeInterviewer = (index: number) => {
    if (formData.interviewerNames.length > 1) {
      const newInterviewers = formData.interviewerNames.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, interviewerNames: newInterviewers }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.interviewDate) {
      newErrors.interviewDate = 'Interview date is required';
    }

    if (!formData.interviewTime) {
      newErrors.interviewTime = 'Interview time is required';
    }

    if (formData.interviewerNames.some(name => !name.trim())) {
      newErrors.interviewerNames = 'All interviewer names are required';
    }

    if (formData.interviewMode === 'online' && !formData.meetingLink) {
      newErrors.meetingLink = 'Meeting link is required for online interviews';
    }

    if (formData.interviewMode === 'physical' && !formData.location) {
      newErrors.location = 'Location is required for physical interviews';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const interviewDetails: Omit<InterviewDetails, 'id' | 'scheduledBy' | 'scheduledAt'> = {
        candidateId,
        jobId,
        interviewDate: formData.interviewDate,
        interviewTime: formData.interviewTime,
        interviewerNames: formData.interviewerNames.filter(name => name.trim()),
        interviewMode: formData.interviewMode,
        meetingLink: formData.meetingLink || undefined,
        location: formData.location || undefined,
        status: 'scheduled',
        notes: formData.notes || undefined
      };

      onSchedule(interviewDetails);
      onClose();
      
      // Reset form
      setFormData({
        interviewDate: '',
        interviewTime: '',
        interviewerNames: [''],
        interviewMode: 'online',
        meetingLink: '',
        location: '',
        notes: ''
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Schedule Interview</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Interview Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                min={new Date().toISOString().split('T')[0]}
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
                <Clock className="w-4 h-4 inline mr-2" />
                Interview Time
              </label>
              <input
                type="time"
                value={formData.interviewTime}
                onChange={(e) => handleInputChange('interviewTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.interviewTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.interviewTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.interviewTime}
                </p>
              )}
            </div>
          </div>

          {/* Interviewers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Interviewers
            </label>
            <div className="space-y-2">
              {formData.interviewerNames.map((interviewer, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={interviewer}
                    onChange={(e) => handleInterviewerChange(index, e.target.value)}
                    placeholder={`Interviewer ${index + 1} name`}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                      errors.interviewerNames ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formData.interviewerNames.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInterviewer(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInterviewer}
                className="text-[#114373] hover:text-[#0d3559] text-sm font-medium"
              >
                + Add Interviewer
              </button>
            </div>
            {errors.interviewerNames && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.interviewerNames}
              </p>
            )}
          </div>

          {/* Interview Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Mode
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="online"
                  checked={formData.interviewMode === 'online'}
                  onChange={(e) => handleInputChange('interviewMode', e.target.value)}
                  className="mr-2"
                />
                <Video className="w-4 h-4 mr-1" />
                Online (Zoom/Teams)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="physical"
                  checked={formData.interviewMode === 'physical'}
                  onChange={(e) => handleInputChange('interviewMode', e.target.value)}
                  className="mr-2"
                />
                <MapPin className="w-4 h-4 mr-1" />
                Physical (Office)
              </label>
            </div>
          </div>

          {/* Meeting Link or Location */}
          {formData.interviewMode === 'online' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 inline mr-2" />
                Meeting Link
              </label>
              <input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                placeholder="https://zoom.us/j/123456789"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.meetingLink ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.meetingLink && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.meetingLink}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Office Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Office address or room number"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-[#114373] focus:border-[#114373] ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional instructions or notes for the candidate..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#114373] focus:border-[#114373]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
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
              <Send className="w-4 h-4" />
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewSchedulingModal;
