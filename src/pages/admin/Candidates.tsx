import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Download,
  Upload,
  Star,
  Briefcase,
  GraduationCap,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  whatsapp?: {
    countryCode: string;
    number: string;
  };
  status: 'new' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected' | 'placed';
  appliedDate: string;
  lastActivity: string;
  skills: string[];
  experience: string;
  location: string;
  currentSalary: string;
  expectedSalary: string;
  education: string;
  avatar?: string;
  notes: string;
  nationality: string;
  currentCompany?: string;
  noticePeriod?: string;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
}

const Candidates: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      whatsapp: {
        countryCode: '+1',
        number: '(555) 123-4567'
      },
      status: 'shortlisted',
      appliedDate: '2024-01-15',
      lastActivity: '2024-01-20',
      skills: ['React', 'Node.js', 'Python'],
      experience: '5 years',
      location: 'San Francisco, CA',
      currentSalary: '$80,000',
      expectedSalary: '$100,000',
      education: 'Bachelor\'s Degree',
      notes: 'Strong technical skills, good communication',
      nationality: 'American',
      currentCompany: 'Tech Corp',
      noticePeriod: '30 days',
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Professional' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 234-5678'
      },
      status: 'interviewed',
      appliedDate: '2024-01-18',
      lastActivity: '2024-01-22',
      skills: ['Java', 'Spring', 'AWS'],
      experience: '7 years',
      location: 'New York, NY',
      currentSalary: '$95,000',
      expectedSalary: '$120,000',
      education: 'Master\'s Degree',
      notes: 'Excellent problem-solving skills',
      nationality: 'Canadian',
      currentCompany: 'Finance Inc',
      noticePeriod: '60 days',
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'French', proficiency: 'Professional' }
      ]
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 345-6789'
      },
      status: 'new',
      appliedDate: '2024-01-20',
      lastActivity: '2024-01-25',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '4 years',
      location: 'Austin, TX',
      currentSalary: '$75,000',
      expectedSalary: '$90,000',
      education: 'Bachelor\'s Degree',
      notes: 'Great team player, quick learner',
      nationality: 'American',
      currentCompany: 'Startup Inc',
      noticePeriod: '15 days',
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Mandarin', proficiency: 'Professional' }
      ]
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 456-7890'
      },
      status: 'placed',
      appliedDate: '2024-01-10',
      lastActivity: '2024-01-15',
      skills: ['JavaScript', 'React', 'TypeScript'],
      experience: '3 years',
      location: 'Seattle, WA',
      currentSalary: '$70,000',
      expectedSalary: '$85,000',
      education: 'Bachelor\'s Degree',
      notes: 'Successfully placed at Tech Corp',
      nationality: 'Mexican',
      currentCompany: 'Tech Corp',
      noticePeriod: 'Immediate',
      languages: [
        { name: 'English', proficiency: 'Professional' },
        { name: 'Spanish', proficiency: 'Native' }
      ]
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: {
        countryCode: '+1',
        number: '(555) 567-8901'
      },
      status: 'rejected',
      appliedDate: '2024-01-25',
      lastActivity: '2024-01-28',
      skills: ['C#', '.NET', 'SQL Server'],
      experience: '6 years',
      location: 'Chicago, IL',
      currentSalary: '$85,000',
      expectedSalary: '$110,000',
      education: 'Bachelor\'s Degree',
      notes: 'Not a good cultural fit',
      nationality: 'Korean',
      currentCompany: 'Enterprise Corp',
      noticePeriod: '60 days',
      languages: [
        { name: 'English', proficiency: 'Professional' },
        { name: 'Korean', proficiency: 'Native' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shortlisted':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'interviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'selected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'placed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <UserPlus className="w-4 h-4" />;
      case 'shortlisted':
        return <UserCheck className="w-4 h-4" />;
      case 'interviewed':
        return <Calendar className="w-4 h-4" />;
      case 'selected':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      case 'placed':
        return <Star className="w-4 h-4" />;
      default:
        return <UserPlus className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'experience') {
      return parseInt(b.experience) - parseInt(a.experience);
    }
    return 0;
  });

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === sortedCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(sortedCandidates.map(c => c.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedCandidates);
    setSelectedCandidates([]);
    setShowBulkActions(false);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage all candidate profiles and applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <Link
            to="/admin/candidates/add"
            className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates..."
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
                <option value="new">New</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="placed">Placed</option>
              </select>
            </div>
            <div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Austin">Austin</option>
                <option value="Seattle">Seattle</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedCandidates.length} candidate(s) selected
              </span>
              <button
                onClick={() => setSelectedCandidates([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction('shortlist')}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200"
              >
                Shortlist
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidates List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Candidates ({sortedCandidates.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {sortedCandidates.length} of {candidates.length} candidates</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.length === sortedCandidates.length && sortedCandidates.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleSelectCandidate(candidate.id)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.email}</div>
                        <div className="text-xs text-gray-400">
                          {typeof candidate.phone === 'string' 
                            ? candidate.phone 
                            : `${candidate.phone.countryCode} ${candidate.phone.number}`
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(candidate.status).split(' ')[0]} mr-2`}></div>
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(candidate.status)}
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </div>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {candidate.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(candidate.appliedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/candidates/${candidate.id}`}
                        className="text-[#114373] hover:text-[#0d3559]"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                                              <a
                          href={`tel:${typeof candidate.phone === 'string' 
                            ? candidate.phone.replace(/\D/g, '') 
                            : `${candidate.phone.countryCode.replace('+', '')}${candidate.phone.number.replace(/\D/g, '')}`
                          }`}
                          className="text-gray-600 hover:text-green-600"
                          title="Call"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      <a
                        href={`mailto:${candidate.email}`}
                        className="text-gray-600 hover:text-blue-600"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      {candidate.whatsapp && (
                        <a
                          href={`https://wa.me/${candidate.whatsapp.countryCode.replace('+', '')}${candidate.whatsapp.number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-green-600"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedCandidates.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Link
              to="/admin/candidates/add"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              Add Candidate
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates; 