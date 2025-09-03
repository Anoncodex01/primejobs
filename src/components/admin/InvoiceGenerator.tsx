import React, { FC, useState } from 'react';
import { axiaCompanyInfo, getVATAmount, getTotalWithVAT, formatCurrency } from '../../utils/companyInfo';
import {
  Download,
  Mail,
  Send,
  Edit,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Building,
  User,
  FileText,
  Printer
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  employerId: string;
  employerName: string;
  employerEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  currency: 'TZS' | 'USD';
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes: string;
  adminNotes: string;
  isApproved: boolean;
  approvedBy?: string;
  approvedDate?: string;
}

interface InvoiceGeneratorProps {
  onInvoiceGenerated: (invoice: Invoice) => void;
  onInvoiceUpdated: (invoice: Invoice) => void;
}

const InvoiceGenerator: FC<InvoiceGeneratorProps> = ({
  onInvoiceGenerated,
  onInvoiceUpdated
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    employerId: '',
    employerName: '',
    employerEmail: '',
    items: [],
    currency: 'TZS',
    notes: '',
    adminNotes: '',
    isApproved: false
  });

  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.unitPrice > 0) {
      const item: InvoiceItem = {
        id: Date.now().toString(),
        description: newItem.description,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        amount: newItem.quantity * newItem.unitPrice
      };

      setFormData(prev => ({
        ...prev,
        items: [...(prev.items || []), item]
      }));

      setNewItem({ description: '', quantity: 1, unitPrice: 0 });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId) || []
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items?.reduce((sum, item) => sum + item.amount, 0) || 0;
    const vatAmount = getVATAmount(subtotal);
    const total = getTotalWithVAT(subtotal);

    return { subtotal, vatAmount, total };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { subtotal, vatAmount, total } = calculateTotals();
      
      const invoiceData: Invoice = {
        id: editingInvoice?.id || Date.now().toString(),
        invoiceNumber: formData.invoiceNumber || `INV-${Date.now()}`,
        date: formData.date || new Date().toISOString().split('T')[0],
        dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
        employerId: formData.employerId || '',
        employerName: formData.employerName || '',
        employerEmail: formData.employerEmail || '',
        items: formData.items || [],
        subtotal,
        vatAmount,
        total,
        currency: formData.currency || 'TZS',
        status: 'draft',
        notes: formData.notes || '',
        adminNotes: formData.adminNotes || '',
        isApproved: false
      };

      if (editingInvoice) {
        onInvoiceUpdated(invoiceData);
      } else {
        onInvoiceGenerated(invoiceData);
      }

      setShowForm(false);
      setEditingInvoice(null);
      setFormData({
        invoiceNumber: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        employerId: '',
        employerName: '',
        employerEmail: '',
        items: [],
        currency: 'TZS',
        notes: '',
        adminNotes: '',
        isApproved: false
      });
    } catch (error) {
      console.error('Failed to save invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = (invoice: Invoice) => {
    const updatedInvoice = {
      ...invoice,
      isApproved: true,
      approvedBy: 'Admin User',
      approvedDate: new Date().toISOString().split('T')[0]
    };
    onInvoiceUpdated(updatedInvoice);
  };

  const { subtotal, vatAmount, total } = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Generator</h1>
          <p className="text-gray-600">Create and manage invoices with VAT calculation</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Create Invoice
        </button>
      </div>

      {/* Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Number
              </label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                placeholder="Auto-generated"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="TZS">Tanzanian Shilling (TZS)</option>
                <option value="USD">US Dollar (USD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer ID
              </label>
              <input
                type="text"
                value={formData.employerId}
                onChange={(e) => handleInputChange('employerId', e.target.value)}
                placeholder="Employer ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Name
              </label>
              <input
                type="text"
                value={formData.employerName}
                onChange={(e) => handleInputChange('employerName', e.target.value)}
                placeholder="Employer Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Email
              </label>
              <input
                type="email"
                value={formData.employerEmail}
                onChange={(e) => handleInputChange('employerEmail', e.target.value)}
                placeholder="employer@company.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Invoice Items</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Service description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Price
                </label>
                <input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleAddItem}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Item
            </button>

            {/* Items List */}
            {formData.items && formData.items.length > 0 && (
              <div className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 mb-2">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Unit Price</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  
                  {formData.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 last:border-b-0">
                      <div className="col-span-6">{item.description}</div>
                      <div className="col-span-2 text-center">{item.quantity}</div>
                      <div className="col-span-2 text-right">
                        {formatCurrency(item.unitPrice, formData.currency || 'TZS')}
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-between">
                        {formatCurrency(item.amount, formData.currency || 'TZS')}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(subtotal, formData.currency || 'TZS')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (18%):</span>
                  <span className="font-medium">{formatCurrency(vatAmount, formData.currency || 'TZS')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(total, formData.currency || 'TZS')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Visible to Employer)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                placeholder="Additional notes for the employer..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes (Internal)
              </label>
              <textarea
                value={formData.adminNotes}
                onChange={(e) => handleInputChange('adminNotes', e.target.value)}
                rows={3}
                placeholder="Internal notes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </div>
      )}

      {/* Company Information Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Axia HR Advisory & Recruitment</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{axiaCompanyInfo.address}</p>
              <p>{axiaCompanyInfo.poBox}</p>
              <p>{axiaCompanyInfo.city}, {axiaCompanyInfo.country}</p>
              <p>VAT: {axiaCompanyInfo.vat}</p>
              <p>TIN: {axiaCompanyInfo.tin}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Bank Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Account Name:</strong> {axiaCompanyInfo.bankDetails.accountName}</p>
              <p><strong>Bank:</strong> {axiaCompanyInfo.bankDetails.bankName}</p>
              <p><strong>USD Account:</strong> {axiaCompanyInfo.bankDetails.usdAccount}</p>
              <p><strong>TZS Account:</strong> {axiaCompanyInfo.bankDetails.tzsAccount}</p>
              <p><strong>Swift Code:</strong> {axiaCompanyInfo.bankDetails.swiftCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
