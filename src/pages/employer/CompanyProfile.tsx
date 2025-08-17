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
  // Company Details
  companyName: string;
  businessType: string;
  industry: string;
  subIndustry: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue: string;
  companyStage: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Legal & Tax Information
  tin: string;
  vrn: string;
  registrationNumber: string;
  taxOffice: string;
  businessLicense: string;
  legalEntityName: string;
  registeredAddress: string;
}

interface UploadedFiles {
  businessLicense: File | null;
  taxCertificate: File | null;
  registrationCertificate: File | null;
}

const CompanyProfile: FC = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTin, setShowTin] = useState(false);
  const [showVrn, setShowVrn] = useState(false);

  const [form, setForm] = useState<CompanyProfileForm>({
    // Company Details
    companyName: userData.companyName || '',
    businessType: '',
    industry: '',
    subIndustry: '',
    foundedYear: '',
    employeeCount: '',
    annualRevenue: '',
    companyStage: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    
    // Legal & Tax Information
    tin: '',
    vrn: '',
    registrationNumber: '',
    taxOffice: '',
    businessLicense: '',
    legalEntityName: '',
    registeredAddress: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    businessLicense: null,
    taxCertificate: null,
    registrationCertificate: null
  });

  const handleInputChange = (field: keyof CompanyProfileForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: keyof UploadedFiles, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set profile as pending for admin review
      localStorage.setItem('employerProfileComplete', 'pending');
      localStorage.setItem('employerProfileData', JSON.stringify(form));
      
      // Redirect to dashboard with pending status
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Profile submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Company Details', description: 'Basic company information and structure' },
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

  const subIndustries = {
    'Technology': ['Software Development', 'IT Services', 'Cybersecurity', 'Artificial Intelligence', 'E-commerce', 'Fintech', 'Edtech', 'Healthtech'],
    'Healthcare': ['Pharmaceuticals', 'Medical Devices', 'Healthcare Services', 'Mental Health', 'Telemedicine', 'Biotechnology'],
    'Finance': ['Banking', 'Insurance', 'Investment', 'Accounting', 'Financial Services', 'Cryptocurrency'],
    'Manufacturing': ['Automotive', 'Electronics', 'Textiles', 'Food & Beverage', 'Chemicals', 'Aerospace'],
    'Retail': ['Fashion', 'Electronics', 'Grocery', 'Home & Garden', 'Luxury Goods', 'Online Retail'],
    'Education': ['K-12', 'Higher Education', 'Online Learning', 'Corporate Training', 'Special Education'],
    'Consulting': ['Management Consulting', 'IT Consulting', 'Financial Consulting', 'HR Consulting', 'Strategy Consulting'],
    'Real Estate': ['Residential', 'Commercial', 'Property Management', 'Construction', 'Architecture'],
    'Transportation': ['Logistics', 'Freight', 'Passenger Transport', 'Supply Chain', 'Warehousing'],
    'Entertainment': ['Media', 'Gaming', 'Sports', 'Music', 'Film & TV', 'Events'],
    'Other': ['Agriculture', 'Energy', 'Non-profit', 'Government', 'Legal Services']
  };

  const employeeCounts = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const annualRevenueRanges = [
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M - $50M',
    '$50M - $100M',
    '$100M+'
  ];

  const companyStages = [
    'Startup',
    'Early Stage',
    'Growth Stage',
    'Established',
    'Mature',
    'Enterprise'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your company profile to start posting jobs
          </h1>
          <p className="text-gray-600">
            Provide your company details to get verified and start hiring
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.number
                    ? 'bg-[#114373] border-[#114373] text-white'
                    : currentStep === step.number
                    ? 'bg-[#114373] border-[#114373] text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-[#114373]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center flex-1">
                <h3 className={`text-sm font-medium ${
                  currentStep === step.number ? 'text-[#114373]' : 'text-gray-500'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Company Details */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Details</h2>
              <p className="text-gray-600 mb-6">Basic company information and structure</p>
              
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
                    placeholder="Enter your company name"
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
                    Sub-Industry
                  </label>
                  <select
                    value={form.subIndustry}
                    onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    disabled={!form.industry}
                  >
                    <option value="">Select sub-industry</option>
                    {form.industry && subIndustries[form.industry as keyof typeof subIndustries]?.map(subIndustry => (
                      <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
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
                    Number of Employees *
                  </label>
                  <select
                    value={form.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
                  >
                    <option value="">Select employee count</option>
                    {employeeCounts.map(count => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue
                  </label>
                  <select
                    value={form.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="">Select revenue range</option>
                    {annualRevenueRanges.map(revenue => (
                      <option key={revenue} value={revenue}>{revenue}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Stage
                  </label>
                  <select
                    value={form.companyStage}
                    onChange={(e) => handleInputChange('companyStage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="">Select company stage</option>
                    {companyStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
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
              <p className="text-gray-600 mb-6">TIN, VRN, and business registration</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TIN (Tax Identification Number) *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={form.tin}
                      onChange={(e) => handleInputChange('tin', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter TIN"
                      required
                    />
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
                      type="text"
                      value={form.vrn}
                      onChange={(e) => handleInputChange('vrn', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter VRN (if applicable)"
                    />
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
                    Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={form.legalEntityName}
                    onChange={(e) => handleInputChange('legalEntityName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Legal entity name (if different from company name)"
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registered Address
                  </label>
                  <textarea
                    value={form.registeredAddress}
                    onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    placeholder="Legal registered address (if different from business address)"
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
              <p className="text-gray-600 mb-6">Upload required documents for verification</p>
              
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
              <p className="text-gray-600 mb-6">Review your information and submit for verification</p>
              
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
                        <span className="text-sm text-gray-500">Employee Count:</span>
                        <p className="font-medium">{form.employeeCount}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Location:</span>
                        <p className="font-medium">{form.city}, {form.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">TIN:</span>
                        <p className="font-medium">{form.tin}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">VRN:</span>
                        <p className="font-medium">{form.vrn || 'Not provided'}</p>
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
    </div>
  );
};

export default CompanyProfile; 