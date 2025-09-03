import React from 'react';
import ApplicationManagement from '../../components/admin/ApplicationManagement';

const ApplicationManagementPage: React.FC = () => {
  const handleApplicationUpdate = (application: any) => {
    console.log('Application updated:', application);
    // Handle application update
  };

  const handleInterviewScheduled = (applicationId: string, interviewDetails: any) => {
    console.log('Interview scheduled:', applicationId, interviewDetails);
    // Handle interview scheduling
  };

  const handleShortlistCandidate = (applicationId: string, reason: string) => {
    console.log('Candidate shortlisted:', applicationId, reason);
    // Handle candidate shortlisting
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Application Management</h1>
        <p className="text-gray-600">Review, shortlist, and manage candidate applications</p>
      </div>

      <ApplicationManagement
        onApplicationUpdate={handleApplicationUpdate}
        onInterviewScheduled={handleInterviewScheduled}
        onShortlistCandidate={handleShortlistCandidate}
      />
    </div>
  );
};

export default ApplicationManagementPage;
