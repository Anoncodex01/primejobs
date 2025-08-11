import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Globe,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

interface CompanyProfileForm {
  companyName: string;
  businessType: string;
  industry: string;
  foundedYear: string;
  employeeCount: string;
  website: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  contactPerson: string;
  tin: string;
  vrn: string;
  registrationNumber: string;
  taxOffice: string;
  businessLicense: string;
  description: string;
}

const CompanyProfile: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTin, setShowTin] = useState(false);
  const [showVrn, setShowVrn] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    businessLicense: null,
    taxCertificate: null,
    registrationCertificate: null
  });

  const [form, setForm] = useState<CompanyProfileForm>({
    companyName: '',
    businessType: '',
    industry: '',
    foundedYear: '',
    employeeCount: '',
    website: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    contactPerson: '',
    tin: '',
    vrn: '',
    registrationNumber: '',
    taxOffice: '',
    businessLicense: '',
    description: ''
  });

  const handleInputChange = (field: keyof CompanyProfileForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for profile submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/employer/agreements');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Company details and contact information' },
    { number: 2, title: 'Legal & Tax Information', description: 'TIN, VRN, and business registration' },
    { number: 3, title: 'Document Upload', description: 'Upload required documents for verification' },
    { number: 4, title: 'Review & Submit', description: 'Review and submit for verification' }
  ];

  const businessTypes = [
    'Private Limited Company',
    'Public Limited Company',
    'Partnership',
    'Sole Proprietorship',
    'Non-Profit Organization',
    'Government Agency',
    'Other'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Consulting',
    'Real Estate',
    'Transportation',
    'Entertainment',
    'Other'
  ];

  const employeeCounts = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/employer/dashboard" className="p-2 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile Setup</h1>
            <p className="text-gray-600">Complete your company profile to start posting jobs</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-[#114373] text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-[#114373]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
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
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    value={form.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founded Year
                  </label>
                  <input
                    type="number"
                    value={form.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <select
                    value={form.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="">Select employee count</option>
                    {employeeCounts.map(count => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Describe your company, mission, and values..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={form.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Full name"
                      required
                    />
                  </div>
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
                      placeholder="contact@company.com"
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
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="e.g., United States"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="e.g., New York"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Street address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Legal & Tax Information */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal & Tax Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TIN (Tax Identification Number) *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showTin ? 'text' : 'password'}
                      value={form.tin}
                      onChange={(e) => handleInputChange('tin', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter TIN"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowTin(!showTin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showTin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your TIN will be securely stored and encrypted</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VRN (VAT Registration Number)
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showVrn ? 'text' : 'password'}
                      value={form.vrn}
                      onChange={(e) => handleInputChange('vrn', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter VRN (if applicable)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowVrn(!showVrn)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showVrn ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Required if your business is VAT registered</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Registration Number *
                  </label>
                  <input
                    type="text"
                    value={form.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Enter registration number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Office *
                  </label>
                  <input
                    type="text"
                    value={form.taxOffice}
                    onChange={(e) => handleInputChange('taxOffice', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="e.g., IRS, HMRC"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License Number
                  </label>
                  <input
                    type="text"
                    value={form.businessLicense}
                    onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Enter license number (if applicable)"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Identity Verification</h4>
                    <p className="text-sm text-blue-700">
                      Your TIN and business registration information will be verified by our team to ensure 
                      compliance and authenticity. This process typically takes 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Upload</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#114373] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.businessLicense ? uploadedFiles.businessLicense.name : 'Upload business license'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('businessLicense', file);
                      }}
                      className="hidden"
                      id="businessLicense"
                      required
                    />
                    <label htmlFor="businessLicense" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">Choose file</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Certificate *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#114373] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.taxCertificate ? uploadedFiles.taxCertificate.name : 'Upload tax certificate'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('taxCertificate', file);
                      }}
                      className="hidden"
                      id="taxCertificate"
                      required
                    />
                    <label htmlFor="taxCertificate" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">Choose file</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Certificate *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#114373] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.registrationCertificate ? uploadedFiles.registrationCertificate.name : 'Upload registration certificate'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('registrationCertificate', file);
                      }}
                      className="hidden"
                      id="registrationCertificate"
                      required
                    />
                    <label htmlFor="registrationCertificate" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">Choose file</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Document Requirements</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• All documents must be in PDF, JPG, or PNG format</li>
                      <li>• Maximum file size: 5MB per document</li>
                      <li>• Documents must be clearly legible and up-to-date</li>
                      <li>• All documents will be securely stored and encrypted</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Company Name:</span>
                        <p className="font-medium">{form.companyName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Business Type:</span>
                        <p className="font-medium">{form.businessType}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Industry:</span>
                        <p className="font-medium">{form.industry}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Contact Person:</span>
                        <p className="font-medium">{form.contactPerson}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">TIN:</span>
                        <p className="font-medium">{showTin ? form.tin : '••••••••••'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">VRN:</span>
                        <p className="font-medium">{form.vrn ? (showVrn ? form.vrn : '••••••••••') : 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Registration Number:</span>
                        <p className="font-medium">{form.registrationNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Tax Office:</span>
                        <p className="font-medium">{form.taxOffice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                  <div className="space-y-2">
                    {Object.entries(uploadedFiles).map(([key, file]) => (
                      <div key={key} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-sm text-gray-600">{file ? file.name : 'Not uploaded'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Verification Process</h4>
                  <p className="text-sm text-blue-700">
                    Your company profile will be reviewed by our verification team. This process typically takes 1-2 business days. 
                    You will receive an email notification once your profile is approved and you can start posting jobs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-4">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
  );
};

export default CompanyProfile; 