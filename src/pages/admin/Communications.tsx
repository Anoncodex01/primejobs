import { FC } from 'react';
import { MessageSquare } from 'lucide-react';

const Communications: FC = () => {
  return (
    
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
            <p className="text-gray-600">Manage all communications with candidates and employers</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Communication Center</h3>
          <p className="text-gray-600">Centralized communication management coming soon...</p>
        </div>
      </div>
    
  );
};

export default Communications; 