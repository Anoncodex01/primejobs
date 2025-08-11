import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const AdminSettings: FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure admin portal settings and preferences</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Settings</h3>
        <p className="text-gray-600">System configuration and preferences coming soon...</p>
      </div>
    </div>
  );
};

export default AdminSettings; 