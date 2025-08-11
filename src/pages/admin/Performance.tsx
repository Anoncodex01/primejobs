import { FC } from 'react';
import { Target } from 'lucide-react';

const Performance: FC = () => {
  return (
    
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
            <p className="text-gray-600">Track HR consultant performance and KPIs</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Management</h3>
          <p className="text-gray-600">HR consultant performance tracking coming soon...</p>
        </div>
      </div>
    
  );
};

export default Performance; 