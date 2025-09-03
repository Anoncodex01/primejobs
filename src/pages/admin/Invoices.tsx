import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceGenerator from '../../components/admin/InvoiceGenerator';
import {
  Receipt,
  Search,
  Filter,
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Plus,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  employerName: string;
  candidateName: string;
  jobTitle: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  commission: number;
  recruiter: string;
}

const Invoices: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);

  const handleInvoiceGenerated = (invoice: any) => {
    console.log('Invoice generated:', invoice);
    // Handle invoice generation
    setShowInvoiceGenerator(false);
  };

  const handleInvoiceUpdated = (invoice: any) => {
    console.log('Invoice updated:', invoice);
    // Handle invoice update
  };

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      employerName: 'Tech Corp',
      candidateName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      amount: 12000,
      status: 'paid',
      dueDate: '2024-01-15',
      issuedDate: '2024-01-01',
      paidDate: '2024-01-10',
      commission: 1200,
      recruiter: 'Sarah Johnson'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      employerName: 'Startup Inc',
      candidateName: 'Jane Smith',
      jobTitle: 'Product Manager',
      amount: 15000,
      status: 'pending',
      dueDate: '2024-02-15',
      issuedDate: '2024-02-01',
      commission: 1500,
      recruiter: 'Mike Chen'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      employerName: 'Digital Agency',
      candidateName: 'Bob Wilson',
      jobTitle: 'UX Designer',
      amount: 10000,
      status: 'overdue',
      dueDate: '2024-01-30',
      issuedDate: '2024-01-15',
      commission: 1000,
      recruiter: 'Lisa Wang'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      employerName: 'E-commerce Platform',
      candidateName: 'Alice Brown',
      jobTitle: 'Frontend Developer',
      amount: 9000,
      status: 'paid',
      dueDate: '2024-02-10',
      issuedDate: '2024-01-25',
      paidDate: '2024-02-05',
      commission: 900,
      recruiter: 'David Kim'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      employerName: 'FinTech Solutions',
      candidateName: 'Charlie Davis',
      jobTitle: 'Backend Engineer',
      amount: 18000,
      status: 'cancelled',
      dueDate: '2024-02-20',
      issuedDate: '2024-02-05',
      commission: 1800,
      recruiter: 'Emily Rodriguez'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime();
    }
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600">Manage invoices and payment tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowInvoiceGenerator(!showInvoiceGenerator)}
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showInvoiceGenerator ? 'Hide Generator' : 'Create Invoice'}
            </button>
          </div>
        </div>

        {/* Invoice Generator */}
        {showInvoiceGenerator && (
          <div className="mb-6">
            <InvoiceGenerator
              onInvoiceGenerated={handleInvoiceGenerated}
              onInvoiceUpdated={handleInvoiceUpdated}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-yellow-600">5 invoices</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-600">2 invoices</span>
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
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
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Invoices ({sortedInvoices.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {sortedInvoices.length} of {invoices.length} invoices</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employer & Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-gray-500">{invoice.recruiter}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.employerName}</div>
                        <div className="text-sm text-[#114373] font-medium">{invoice.candidateName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.jobTitle}</div>
                        <div className="text-sm text-gray-500">Commission: {formatCurrency(invoice.commission)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(invoice.status).split(' ')[0]} mr-2`}></div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(invoice.status)}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </div>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div>Issued: {formatDate(invoice.issuedDate)}</div>
                        <div>Due: {formatDate(invoice.dueDate)}</div>
                        {invoice.paidDate && (
                          <div className="text-green-600">Paid: {formatDate(invoice.paidDate)}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-[#114373] hover:text-[#0d3559]">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Mail className="w-4 h-4" />
                        </button>
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
          
          {sortedInvoices.length === 0 && (
            <div className="p-12 text-center">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Link
                to="/admin/invoices/create"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors"
              >
                Create Invoice
              </Link>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Invoices; 