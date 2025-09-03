import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  User,
  Shield,
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Archive,
  Star,
  MessageCircle,
  Download,
  Send,
  EyeOff,
  Lock,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock as ClockIcon,
  AlertTriangle,
  Info,
  DollarSign,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  FileText as InvoiceIcon,
  Send as SendIcon,
  CheckCircle2,
  Clock as PendingIcon,
  Building2,
  Calendar as CalendarIcon
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  grossSalary: number;
  placementFee: number;
  deposit: number;
  balance: number;
  currency: string;
  status: 'deposit_paid' | 'candidate_placed' | 'balance_due' | 'paid' | 'overdue' | 'cancelled';
  invoiceDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  description: string;
  vatAmount: number;
  totalAmount: number;
  isUrgent: boolean;
  notes?: string;
  depositPaidDate?: string;
  candidateStartDate?: string;
}

const Invoices: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      jobTitle: 'Senior UI/UX Designer',
      grossSalary: 1200000,
      placementFee: 1200000,
      deposit: 600000,
      balance: 600000,
      currency: 'TZS',
      status: 'paid',
      invoiceDate: '2024-01-15',
      dueDate: '2024-01-30',
      paidDate: '2024-01-25',
      paymentMethod: 'Bank Transfer',
      description: 'Recruitment services for Senior UI/UX Designer position',
      vatAmount: 180000,
      totalAmount: 1380000,
      isUrgent: false,
      notes: 'Payment received on time',
      depositPaidDate: '2024-01-10',
      candidateStartDate: '2024-01-20'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      jobTitle: 'Software Engineer',
      grossSalary: 1500000,
      placementFee: 1500000,
      deposit: 600000,
      balance: 900000,
      currency: 'TZS',
      status: 'balance_due',
      invoiceDate: '2024-01-20',
      dueDate: '2024-02-05',
      description: 'Recruitment services for Software Engineer position',
      vatAmount: 225000,
      totalAmount: 1725000,
      isUrgent: false,
      depositPaidDate: '2024-01-15',
      candidateStartDate: '2024-01-25'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      jobTitle: 'Marketing Manager',
      grossSalary: 800000,
      placementFee: 800000,
      deposit: 600000,
      balance: 200000,
      currency: 'TZS',
      status: 'overdue',
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-25',
      description: 'Recruitment services for Marketing Manager position',
      vatAmount: 120000,
      totalAmount: 920000,
      isUrgent: true,
      notes: 'Payment overdue - follow up required',
      depositPaidDate: '2024-01-05',
      candidateStartDate: '2024-01-15'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      candidateName: 'Alex Thompson',
      candidateEmail: 'alex.thompson@email.com',
      jobTitle: 'Senior UI/UX Designer',
      grossSalary: 1800000,
      placementFee: 1800000,
      deposit: 600000,
      balance: 1200000,
      currency: 'TZS',
      status: 'candidate_placed',
      invoiceDate: '2024-01-25',
      dueDate: '2024-02-10',
      description: 'Recruitment services for Senior UI/UX Designer position',
      vatAmount: 270000,
      totalAmount: 2070000,
      isUrgent: false,
      depositPaidDate: '2024-01-20',
      candidateStartDate: '2024-01-30'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      candidateName: 'Lisa Wang',
      candidateEmail: 'lisa.wang@email.com',
      jobTitle: 'Product Manager',
      grossSalary: 2000000,
      placementFee: 2000000,
      deposit: 600000,
      balance: 1400000,
      currency: 'TZS',
      status: 'deposit_paid',
      invoiceDate: '2024-01-30',
      dueDate: '2024-02-15',
      description: 'Recruitment services for Product Manager position',
      vatAmount: 300000,
      totalAmount: 2300000,
      isUrgent: false,
      depositPaidDate: '2024-01-25'
    }
  ];

  const statuses = [
    { id: 'all', title: 'All Status', color: 'bg-gray-100 text-gray-800' },
    { id: 'pending', title: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'sent', title: 'Sent', color: 'bg-blue-100 text-blue-800' },
    { id: 'paid', title: 'Paid', color: 'bg-green-100 text-green-800' },
    { id: 'overdue', title: 'Overdue', color: 'bg-red-100 text-red-800' },
    { id: 'cancelled', title: 'Cancelled', color: 'bg-gray-100 text-gray-800' }
  ];

  const candidates = [
    { id: 'all', title: 'All Candidates' },
    { id: 'sarah', title: 'Sarah Johnson' },
    { id: 'michael', title: 'Michael Chen' },
    { id: 'emily', title: 'Emily Rodriguez' },
    { id: 'alex', title: 'Alex Thompson' },
    { id: 'lisa', title: 'Lisa Wang' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deposit_paid':
        return 'bg-blue-100 text-blue-800';
      case 'candidate_placed':
        return 'bg-purple-100 text-purple-800';
      case 'balance_due':
        return 'bg-yellow-100 text-yellow-800';
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
      case 'deposit_paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'candidate_placed':
        return <User className="w-4 h-4" />;
      case 'balance_due':
        return <Clock className="w-4 h-4" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    const matchesCandidate = selectedCandidate === 'all' || invoice.candidateName.toLowerCase().includes(selectedCandidate);
    
    return matchesSearch && matchesStatus && matchesCandidate;
  });

  const stats = [
    { 
      title: 'Total Invoices', 
      value: invoices.length, 
      icon: <InvoiceIcon className="w-5 h-5" />, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Total Amount', 
      value: formatCurrency(invoices.reduce((sum, inv) => sum + inv.totalAmount, 0), 'TZS'), 
      icon: <DollarSign className="w-5 h-5" />, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Paid', 
      value: invoices.filter(i => i.status === 'paid').length, 
      icon: <CheckCircle2 className="w-5 h-5" />, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Outstanding', 
      value: formatCurrency(invoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled').reduce((sum, inv) => sum + inv.balance, 0), 'TZS'), 
      icon: <TrendingUp className="w-5 h-5" />, 
      color: 'bg-orange-500' 
    }
  ];

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) 
        ? prev.filter(invoiceId => invoiceId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedInvoices(prev => 
      prev.length === filteredInvoices.length 
        ? []
        : filteredInvoices.map(invoice => invoice.id)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoicePreview(true);
  };

  return (
    <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices & Payments</h1>
            <p className="text-gray-600">Track invoice generation, payment status, and outstanding reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </button>
            <Link
              to="/employer/invoices/create"
              className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Generate Invoice
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Tracking Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900 mb-1">Payment Tracking Active</h3>
              <p className="text-sm text-green-700">
                Invoices are automatically generated when candidates are confirmed. Payment tracking includes invoice sent date, 
                payment status, and outstanding reports for comprehensive financial management.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search invoices, candidates, or invoice numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                {candidates.map(candidate => (
                  <option key={candidate.id} value={candidate.id}>{candidate.title}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.title}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="due">Due Soon</option>
                <option value="amount">Amount High-Low</option>
                <option value="candidate">Candidate A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Select All</span>
                </label>
                <span className="text-sm text-gray-500">
                  {filteredInvoices.length} invoices
                </span>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <div className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectInvoice(invoice.id)}
                    className="mt-1 rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                  />

                  {/* Invoice Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#114373] to-[#4ebf9e] rounded-lg flex items-center justify-center text-white">
                    <InvoiceIcon className="w-4 h-4" />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {invoice.invoiceNumber}
                        </h3>
                        <p className="text-[#114373] font-medium mb-1">{invoice.candidateName} - {invoice.jobTitle}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Invoice: {formatDate(invoice.invoiceDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Due: {formatDate(invoice.dueDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {formatCurrency(invoice.totalAmount, invoice.currency)}
                          </div>
                          {invoice.isUrgent && (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertTriangle className="w-4 h-4" />
                              Urgent
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(invoice.status)}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </div>
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-medium">{formatCurrency(invoice.totalAmount, invoice.currency)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tax</p>
                          <p className="font-medium">{formatCurrency(invoice.vatAmount, invoice.currency)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-medium">{formatCurrency(invoice.totalAmount, invoice.currency)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days Until Due</p>
                          <p className="font-medium">{getDaysUntilDue(invoice.dueDate)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Status */}
                    {invoice.status === 'paid' && invoice.paidDate && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Paid on {formatDate(invoice.paidDate)}
                          {invoice.paymentMethod && (
                            <span className="ml-2">via {invoice.paymentMethod}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {invoice.status === 'overdue' && (
                      <div className="mb-4 p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-red-700">
                          <AlertTriangle className="w-4 h-4" />
                          Payment overdue by {Math.abs(getDaysUntilDue(invoice.dueDate))} days
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {invoice.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">{invoice.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {invoice.candidateEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Receipt className="w-4 h-4" />
                          {invoice.description}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewInvoice(invoice)}
                          className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Invoice
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                        <button className="px-3 py-1 text-[#114373] hover:bg-[#114373]/10 rounded text-sm font-medium">
                          <Send className="w-4 h-4 mr-1" />
                          Send
                        </button>
                        <button className="px-3 py-1 bg-[#114373] text-white rounded hover:bg-[#0d3559] text-sm font-medium">
                          <CreditCard className="w-4 h-4 mr-1" />
                          Record Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredInvoices.length === 0 && (
            <div className="p-12 text-center">
              <InvoiceIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or generate a new invoice</p>
              <Link
                to="/employer/invoices/create"
                className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Generate Invoice
              </Link>
            </div>
          )}
        </div>

        {/* Invoice Preview Modal */}
        {showInvoicePreview && selectedInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Invoice Preview</h3>
                <button 
                  onClick={() => setShowInvoicePreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Invoice Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Invoice Number</p>
                      <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">{formatDate(selectedInvoice.invoiceDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Due Date</p>
                      <p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="font-medium">{selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Invoice Content</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Bill To:</h5>
                      <p className="text-sm text-gray-600">Apple Inc.</p>
                      <p className="text-sm text-gray-600">123 Business Street</p>
                      <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Service Details:</h5>
                      <p className="text-sm text-gray-600">{selectedInvoice.description}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedInvoice.totalAmount, selectedInvoice.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>{formatCurrency(selectedInvoice.vatAmount, selectedInvoice.currency)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(selectedInvoice.totalAmount, selectedInvoice.currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedInvoice.notes && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Notes</h4>
                    <p className="text-sm text-blue-700">{selectedInvoice.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button className="flex-1 px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559]">
                  <Send className="w-4 h-4 mr-2" />
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Invoices; 