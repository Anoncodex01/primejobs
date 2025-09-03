import React from 'react';
import AxiaJobPosting from '../../components/admin/AxiaJobPosting';

const JobPosting: React.FC = () => {
  const handleJobPosted = (job: any) => {
    console.log('Job posted:', job);
    // Handle job posting
  };

  const handleJobUpdated = (job: any) => {
    console.log('Job updated:', job);
    // Handle job update
  };

  const handleJobDeleted = (jobId: string) => {
    console.log('Job deleted:', jobId);
    // Handle job deletion
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Axia Job Posting Management</h1>
        <p className="text-gray-600">Create, manage, and approve job postings for internal and external employers</p>
      </div>

      <AxiaJobPosting
        onJobPosted={handleJobPosted}
        onJobUpdated={handleJobUpdated}
        onJobDeleted={handleJobDeleted}
      />
    </div>
  );
};

export default JobPosting;
