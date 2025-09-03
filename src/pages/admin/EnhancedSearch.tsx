import React from 'react';
import EnhancedCandidateSearch from '../../components/admin/EnhancedCandidateSearch';
import type { SearchResult } from '../../types/premium';

const EnhancedSearch: React.FC = () => {
  const handleSearch = (results: SearchResult[]) => {
    console.log('Search results:', results);
    // Handle search results
  };

  const handleSaveSearch = (search: any) => {
    console.log('Saving search:', search);
    // Handle saving search
  };

  const handleAddToTalentPool = (candidateIds: string[], poolId: string) => {
    console.log('Adding candidates to talent pool:', candidateIds, poolId);
    // Handle adding to talent pool
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enhanced Candidate Search</h1>
        <p className="text-gray-600">Premium search with advanced filters and AI recommendations</p>
      </div>

      <EnhancedCandidateSearch
        isAdmin={true}
        isPremium={true}
        onSearch={handleSearch}
        onSaveSearch={handleSaveSearch}
        onAddToTalentPool={handleAddToTalentPool}
      />
    </div>
  );
};

export default EnhancedSearch;
