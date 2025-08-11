import { Job } from '../types/jobs';
import { Link } from 'react-router-dom';
import { FiClock, FiDollarSign } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 group hover:border-blue-100 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        </div>
        <span className={`inline-block px-3 py-1 text-sm rounded-full ${
          job.type === 'Full-Time' ? 'text-blue-600 bg-blue-50' :
          job.type === 'Part-Time' ? 'text-purple-600 bg-purple-50' :
          'text-blue-600 bg-blue-50'
        }`}>
          {job.type}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">{job.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1.5">
          <FiClock className="w-4 h-4" />
          <span>{job.daysRemaining} Days remaining</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiDollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={job.company.logo}
            alt={`${job.company.name} logo`}
            className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1"
          />
          <div>
            <h4 className="font-medium text-gray-900">{job.company.name}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <IoLocationOutline className="w-4 h-4" />
              <span>{job.company.location}</span>
            </div>
          </div>
        </div>
        <Link to={`/job/${job.id}`}>
          <button className="px-5 py-2 text-blue-600 hover:text-white bg-white hover:bg-blue-600 rounded-full border border-blue-100 hover:border-transparent transition-all duration-300 text-sm">
            View now
          </button>
        </Link>
      </div>
    </div>
  );
}; 