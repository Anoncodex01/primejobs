import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  Users,
  Briefcase
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  status: 'active' | 'inactive' | 'expired' | 'draft';
  postedDate: string;
  applications: number;
  shortlisted: number;
}

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'Dar es Salaam, Tanzania',
      type: 'Full-time',
      salary: 'TZS 3,000,000 - 5,000,000',
      status: 'active',
      postedDate: '2024-01-15',
      applications: 45,
      shortlisted: 8
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Startup Inc',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      salary: 'USD 4,000 - 6,000',
      status: 'active',
      postedDate: '2024-01-10',
      applications: 32,
      shortlisted: 5
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'Digital Agency',
      location: 'Kampala, Uganda',
      type: 'Contract',
      salary: 'USD 3,000 - 4,500',
      status: 'active',
      postedDate: '2024-01-08',
      applications: 28,
      shortlisted: 6
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'FinTech Solutions',
      location: 'Kigali, Rwanda',
      type: 'Full-time',
      salary: 'USD 5,000 - 7,000',
      status: 'expired',
      postedDate: '2023-12-20',
      applications: 38,
      shortlisted: 7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
          <p className="text-gray-600">View and manage all job postings across the platform</p>
        </div>
        <Link
          to="/admin/job-posting"
          className="flex items-center gap-2 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Jobs ({filteredJobs.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Posted: {job.postedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applications} applications
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {job.shortlisted} shortlisted
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600" title="Edit Job">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600" title="Delete Job">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Link
              to="/admin/job-posting"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Post Your First Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
