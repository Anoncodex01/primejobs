import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  CreditCard,
  Building,
  User,
  FileText,
  Receipt
} from 'lucide-react';

interface BillingRecord {
  id: string;
  invoiceNumber: string;
  employerName: string;
  employerEmail: string;
  amount: number;
  currency: 'TZS' | 'USD';
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  issueDate: string;
  paymentDate?: string;
  description: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

const Billing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const billingRecords: BillingRecord[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      employerName: 'Tech Corp',
      employerEmail: 'hr@techcorp.com',
      amount: 500000,
      currency: 'TZS',
      status: 'paid',
      dueDate: '2024-01-15',
      issueDate: '2024-01-01',
      paymentDate: '2024-01-20',
      description: 'Premium membership fee - Q1 2024',
      items: [
        { name: 'Premium Membership', quantity: 1, unitPrice: 500000, total: 500000 }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      employerName: 'Startup Inc',
      employerEmail: 'careers@startupinc.com',
      amount: 2000,
      currency: 'USD',
      status: 'overdue',
      dueDate: '2024-01-25',
      issueDate: '2024-01-10',
      description: 'Job posting package - 5 positions',
      items: [
        { name: 'Job Posting Package', quantity: 5, unitPrice: 400, total: 2000 }
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      employerName: 'Digital Agency',
      employerEmail: 'jobs@digitalagency.com',
      amount: 750000,
      currency: 'TZS',
      status: 'sent',
      dueDate: '2024-01-30',
      issueDate: '2024-01-15',
      description: 'Recruitment service fee',
      items: [
        { name: 'Recruitment Service', quantity: 1, unitPrice: 750000, total: 750000 }
      ]
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      employerName: 'E-commerce Platform',
      employerEmail: 'talent@ecommerce.com',
      amount: 1500,
      currency: 'USD',
      status: 'draft',
      dueDate: '2024-02-15',
      issueDate: '2024-01-20',
      description: 'Premium candidate search access',
      items: [
        { name: 'Premium Search Access', quantity: 1, unitPrice: 1500, total: 1500 }
      ]
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      employerName: 'FinTech Solutions',
      employerEmail: 'hr@fintech.com',
      amount: 1200000,
      currency: 'TZS',
      status: 'cancelled',
      dueDate: '2024-01-20',
      issueDate: '2024-01-05',
      description: 'Full recruitment service package',
      items: [
        { name: 'Full Recruitment Package', quantity: 1, unitPrice: 1200000, total: 1200000 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'sent':
        return <Clock className="w-4 h-4" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <XCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TZS') {
      return `TZS ${amount.toLocaleString()}`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredRecords = billingRecords.filter(record => {
    const matchesSearch = record.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'this_month' && new Date(record.issueDate).getMonth() === new Date().getMonth()) ||
                       (dateFilter === 'last_month' && new Date(record.issueDate).getMonth() === new Date().getMonth() - 1);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalOutstanding = billingRecords.filter(r => r.status === 'sent' || r.status === 'overdue').reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = billingRecords.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);
  const totalDraft = billingRecords.filter(r => r.status === 'draft').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
          <p className="text-gray-600">Manage invoices, billing records, and payment tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalOutstanding, 'TZS')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalPaid, 'TZS')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalDraft, 'TZS')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Building className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{billingRecords.length}</p>
            </div>
          </div>
        </div>
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
                  placeholder="Search by invoice number, employer, or email..."
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
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Records List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Billing Records ({filteredRecords.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredRecords.length} of {billingRecords.length} records
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
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{record.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.employerName}</div>
                        <div className="text-sm text-gray-500">{record.employerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(record.amount, record.currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </div>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(record.issueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(record.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-[#114373] hover:text-[#0d3559]" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-blue-600" title="Edit Invoice">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="p-12 text-center">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No billing records found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
