import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  PenTool,
  Shield,
  Lock,
  User,
  Calendar,
  Building2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface AgreementForm {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  tin: string;
  vrn: string;
  registrationNumber: string;
  agreementType: string;
  startDate: string;
  endDate: string;
  termsAccepted: boolean;
  digitalSignature: string;
}

interface Agreement {
  id: string;
  title: string;
  status: 'draft' | 'pending' | 'signed' | 'approved' | 'expired';
  createdAt: string;
  signedAt?: string;
  approvedAt?: string;
  expiresAt: string;
  companyName: string;
  contactPerson: string;
}

const Agreements: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [agreementGenerated, setAgreementGenerated] = useState(false);
  const [agreementSigned, setAgreementSigned] = useState(false);

  const [form, setForm] = useState<AgreementForm>({
    companyName: 'Apple Inc.',
    contactPerson: 'John Doe',
    email: 'john.doe@apple.com',
    phone: '+1234567890',
    address: '1 Apple Park Way',
    city: 'Cupertino',
    country: 'United States',
    tin: '12-3456789',
    vrn: 'VAT123456789',
    registrationNumber: 'REG123456789',
    agreementType: 'Standard Recruitment Agreement',
    startDate: '',
    endDate: '',
    termsAccepted: false,
    digitalSignature: ''
  });

  const [agreements] = useState<Agreement[]>([
    {
      id: '1',
      title: 'Standard Recruitment Agreement',
      status: 'pending',
      createdAt: '2024-01-15',
      expiresAt: '2024-02-15',
      companyName: 'Apple Inc.',
      contactPerson: 'John Doe'
    },
    {
      id: '2',
      title: 'Premium Recruitment Agreement',
      status: 'signed',
      createdAt: '2024-01-10',
      signedAt: '2024-01-12',
      approvedAt: '2024-01-13',
      expiresAt: '2025-01-10',
      companyName: 'Apple Inc.',
      contactPerson: 'John Doe'
    }
  ]);

  const handleInputChange = (field: keyof AgreementForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const generateAgreement = () => {
    setAgreementGenerated(true);
    setCurrentStep(2);
  };

  const signAgreement = () => {
    setAgreementSigned(true);
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for agreement submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/employer/dashboard');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'signed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'signed':
        return <PenTool className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/employer/dashboard" className="p-2 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agreements & Digital Signatures</h1>
            <p className="text-gray-600">Generate and manage your recruitment agreements</p>
          </div>
        </div>

        {/* Agreement Generation Process */}
        {!agreementGenerated && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate New Agreement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={form.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Type *
                </label>
                <select
                  value={form.agreementType}
                  onChange={(e) => handleInputChange('agreementType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  required
                >
                  <option value="Standard Recruitment Agreement">Standard Recruitment Agreement</option>
                  <option value="Premium Recruitment Agreement">Premium Recruitment Agreement</option>
                  <option value="Executive Search Agreement">Executive Search Agreement</option>
                  <option value="Contract Staffing Agreement">Contract Staffing Agreement</option>
                  <option value="Axia HR Advisory Agreement">Axia HR Advisory Agreement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Duration *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Agreement Security</h4>
                  <p className="text-sm text-blue-700">
                    All agreements are legally binding and will be securely stored. Once signed, 
                    agreements cannot be revoked without admin approval. A signed copy will be 
                    automatically sent to your email.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={generateAgreement}
                className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium"
              >
                Generate Agreement
              </button>
            </div>
          </div>
        )}

        {/* Agreement Preview */}
        {agreementGenerated && !agreementSigned && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Agreement Preview</h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">RECRUITMENT AGREEMENT</h3>
                <p className="text-gray-600">Between Axia HR Advisory and {form.companyName}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">1. PARTIES</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium text-gray-900">Axia HR Advisory Tanzania Limited</p>
                      <p className="text-sm text-gray-600">An offshoot of RM Finance Consulting Limited</p>
                      <p className="text-sm text-gray-600">Mezzanine floor, Urban Tower, Jamhuri Street</p>
                      <p className="text-sm text-gray-600">P.O BOX 75303, Dar es Salaam, Tanzania</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{form.companyName}</p>
                      <p className="text-sm text-gray-600">Client Company</p>
                      <p className="text-sm text-gray-600">{form.address}</p>
                      <p className="text-sm text-gray-600">{form.city}, {form.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">2. PLACEMENT FEE STRUCTURE</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Fee Calculation:</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Employee's one-month Gross Salary OR TSH 800,000/-, whichever is higher</li>
                        <li>• Fees are exclusive of VAT (prevailing rate applies)</li>
                        <li>• Deposit: TSH 600,000 payable upfront per recruitment position</li>
                        <li>• Deposit is deducted from total fee upon successful placement</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-2">Payment Terms:</h5>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Balance due upon candidate joining or contract signing (whichever earlier)</li>
                        <li>• Payment must be made within 15 days from invoice date</li>
                        <li>• Payment methods: Cash, Cheque, or Electronic Transfer</li>
                        <li>• Bank: Stanbic Bank Tanzania Limited</li>
                        <li>• Account: RM Financial Consulting Limited</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-2">Refund Policy:</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Full deposit refund if no suitable candidate within 1 month</li>
                        <li>• Client must review all CVs and conduct interviews for matching candidates</li>
                        <li>• Deposit forfeited if no interviews conducted for suitable candidates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">3. SERVICE GUARANTEE</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Three-month guarantee for placed candidates</li>
                      <li>• Free replacement within 21 working days if candidate leaves within 3 months</li>
                      <li>• Client must notify Agency in writing within 7 days of termination</li>
                      <li>• Replacement guarantee applies only to initial hire, not subsequent replacements</li>
                      <li>• Guarantee valid only if original invoice settled within 15 days</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">4. TIMELINE</h4>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Initial search and identification: 1-3 weeks</li>
                      <li>• Screening and interview coordination: 1-3 weeks</li>
                      <li>• Most recruitment processes completed within 2-6 weeks</li>
                      <li>• Timeline depends on candidate availability and role complexity</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">5. AGREEMENT TERMS</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      This agreement is effective from <strong>{form.startDate}</strong> to <strong>{form.endDate}</strong>.
                    </p>
                    <p className="text-sm text-gray-700">
                      The specific terms and conditions for the selected agreement type: <strong>{form.agreementType}</strong>.
                    </p>
                    <p className="text-sm text-gray-700">
                      All services, fees, and fee structure will be detailed in the service schedule attached to this agreement.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Axia HR Advisory Tanzania Limited</p>
                      <p className="text-sm text-gray-600">Authorized Signature</p>
                      <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Stamp:</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">{form.companyName}</p>
                      <p className="text-sm text-gray-600">Authorized Signature</p>
                      <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Stamp:</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setAgreementGenerated(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={signAgreement}
                className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium"
              >
                Proceed to Sign
              </button>
            </div>
          </div>
        )}

        {/* Digital Signature */}
        {agreementSigned && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Signature</h2>
            
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Digital Signature *
                </label>
                <div className="relative">
                  <input
                    type={showSignature ? 'text' : 'password'}
                    value={form.digitalSignature}
                    onChange={(e) => handleInputChange('digitalSignature', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Type your full name as digital signature"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignature(!showSignature)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showSignature ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">This will serve as your legally binding digital signature</p>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    required
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the terms and conditions of this agreement
                  </span>
                </label>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Important Notice</h4>
                    <p className="text-sm text-yellow-700">
                      By signing this agreement, you acknowledge that this is a legally binding document. 
                      Once signed, this agreement cannot be revoked without admin approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAgreementSigned(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Preview
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.termsAccepted || !form.digitalSignature}
                  className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign and Submit Agreement'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Agreements */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Existing Agreements</h2>
          
          <div className="space-y-4">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{agreement.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(agreement.status)}
                          {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                        </div>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Company:</span> {agreement.companyName}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {agreement.contactPerson}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {new Date(agreement.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Agreements; 