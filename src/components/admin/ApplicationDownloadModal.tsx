import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  File,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ApplicationDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: string;
  candidateName?: string;
  jobTitle?: string;
}

const ApplicationDownloadModal: React.FC<ApplicationDownloadModalProps> = ({
  isOpen,
  onClose,
  candidateId,
  candidateName = '',
  jobTitle = ''
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'word' | 'text'>('pdf');
  const [includeCV, setIncludeCV] = useState(true);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [includeReferences, setIncludeReferences] = useState(true);
  const [includeEvaluation, setIncludeEvaluation] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This would integrate with actual download functionality
      const fileName = `${candidateName || candidateId}_application.${selectedFormat}`;
      
      // Create a mock download link
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
        `Candidate Application\n\n` +
        `Candidate ID: ${candidateId}\n` +
        `Name: ${candidateName}\n` +
        `Job Title: ${jobTitle}\n` +
        `Format: ${selectedFormat.toUpperCase()}\n` +
        `Includes CV: ${includeCV ? 'Yes' : 'No'}\n` +
        `Includes Photo: ${includePhoto ? 'Yes' : 'No'}\n` +
        `Includes References: ${includeReferences ? 'Yes' : 'No'}\n` +
        `Includes Evaluation: ${includeEvaluation ? 'Yes' : 'No'}\n\n` +
        `This is a mock download. In a real implementation, this would generate the actual application document.`
      )}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert(`Application downloaded successfully as ${fileName}`);
      onClose();
    } catch (error) {
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: <File className="w-5 h-5" /> },
    { value: 'word', label: 'Word Document', icon: <File className="w-5 h-5" /> },
    { value: 'text', label: 'Plain Text', icon: <FileText className="w-5 h-5" /> }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Download Application</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {candidateName && `Candidate: ${candidateName}`} {jobTitle && `• ${jobTitle}`}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Download Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedFormat === option.value
                      ? 'border-[#114373] bg-[#114373] bg-opacity-5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedFormat === option.value}
                    onChange={(e) => setSelectedFormat(e.target.value as any)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <span className="text-[#114373] mr-2">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Content Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Include in Download
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeCV}
                  onChange={(e) => setIncludeCV(e.target.checked)}
                  className="mr-3"
                />
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                <span>Candidate CV/Resume</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includePhoto}
                  onChange={(e) => setIncludePhoto(e.target.checked)}
                  className="mr-3"
                />
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>Candidate Photo</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeReferences}
                  onChange={(e) => setIncludeReferences(e.target.checked)}
                  className="mr-3"
                />
                <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span>Reference Details</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeEvaluation}
                  onChange={(e) => setIncludeEvaluation(e.target.checked)}
                  className="mr-3"
                />
                <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span>Interview Evaluation (if available)</span>
              </label>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Privacy Notice</p>
                <p>
                  This download will include all candidate information. Ensure you have proper authorization 
                  to access and share this data according to privacy regulations.
                </p>
              </div>
            </div>
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
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDownloadModal;
