import { FC } from 'react';
import { PieChart } from 'lucide-react';

const Reports: FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate detailed reports and analytics</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
        <p className="text-gray-600">Comprehensive reporting and analytics coming soon...</p>
      </div>
    </div>
  );
};

export default Reports; 