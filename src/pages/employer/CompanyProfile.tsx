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
  isPoBox: boolean;
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
  companyProfile: File | null;
  companyLogo: File | null;
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
    isPoBox: false,
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
    registrationCertificate: null,
    companyProfile: null,
    companyLogo: null
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
    'Agriculture & Agribusiness',
    'Automotive & Transport',
    'Banking & Financial Services',
    'Construction & Real Estate',
    'Consulting & Advisory',
    'Education & Training',
    'Energy, Oil & Gas',
    'Engineering & Manufacturing',
    'Entertainment, Media & Advertising',
    'FMCG (Fast-Moving Consumer Goods)',
    'Healthcare & Pharmaceuticals',
    'Hospitality, Travel & Tourism',
    'Information Technology & Software',
    'Logistics & Supply Chain',
    'Mining & Metals',
    'NGO & Non-Profit Organizations',
    'Professional Services (Legal, Audit, Accounting)',
    'Public Sector & Government',
    'Retail & E-commerce',
    'Telecommunications',
    'Textiles, Apparel & Fashion',
    'Utilities & Infrastructure',
    'Others (Specify)'
  ];

  const subIndustries = {
    'Agriculture & Agribusiness': ['Crop Production', 'Livestock & Poultry', 'Dairy Farming', 'Agritech / Agri-Engineering', 'Agro-processing & Packaging', 'Fisheries & Aquaculture'],
    'Automotive & Transport': ['Vehicle Manufacturing', 'Auto Parts & Accessories', 'Car Dealerships & Sales', 'Public Transport Services', 'Freight & Passenger Transport', 'Aviation & Airlines', 'Marine & Shipping'],
    'Banking & Financial Services': ['Commercial Banking', 'Investment Banking', 'Insurance & Reinsurance', 'Microfinance Institutions', 'Asset & Wealth Management', 'Fintech & Digital Payments'],
    'Construction & Real Estate': ['Residential Construction', 'Commercial Construction', 'Infrastructure Development', 'Property Development', 'Real Estate Agencies', 'Facilities Management'],
    'Consulting & Advisory': ['Management Consulting', 'HR & Recruitment Consulting', 'Financial Advisory', 'IT & Technology Consulting', 'Legal & Compliance Consulting', 'Strategy & Operations Consulting'],
    'Education & Training': ['Schools & Universities', 'Vocational Training Institutes', 'Corporate Training Providers', 'Online Learning / EdTech', 'Research & Development Institutions'],
    'Energy, Oil & Gas': ['Oil Exploration & Production', 'Gas Distribution & Supply', 'Renewable Energy (Solar, Wind, Hydro)', 'Power Generation & Distribution', 'Energy Equipment & Services'],
    'Engineering & Manufacturing': ['Heavy Machinery & Industrial Equipment', 'Electrical & Electronics', 'Chemical & Process Engineering', 'Food & Beverage Manufacturing', 'Metal & Steel Fabrication', 'Consumer Goods Manufacturing'],
    'Entertainment, Media & Advertising': ['Television & Broadcasting', 'Film Production & Distribution', 'Music & Performing Arts', 'Publishing & Print Media', 'Advertising & Marketing Agencies', 'Digital Media & Influencer Marketing'],
    'FMCG (Fast-Moving Consumer Goods)': ['Beverages (Soft Drinks, Juices)', 'Packaged Foods', 'Personal Care & Cosmetics', 'Household Products', 'Tobacco & Confectionery'],
    'Healthcare & Pharmaceuticals': ['Hospitals & Clinics', 'Pharmaceuticals Manufacturing', 'Medical Devices & Equipment', 'Health Insurance', 'Biotechnology', 'Wellness & Fitness'],
    'Hospitality, Travel & Tourism': ['Hotels & Resorts', 'Restaurants & Catering', 'Airlines & Travel Agencies', 'Tour Operators', 'Cruise Lines', 'Event Management'],
    'Information Technology & Software': ['Software Development', 'IT Services & Support', 'Cloud Computing & Data Centers', 'Cybersecurity', 'Artificial Intelligence & Machine Learning', 'E-commerce Platforms'],
    'Logistics & Supply Chain': ['Warehousing & Distribution', 'Freight Forwarding', 'Courier & Express Services', 'Port & Terminal Operations', 'Cold Chain Logistics', 'Third-Party Logistics (3PL)'],
    'Mining & Metals': ['Gold Mining', 'Diamond & Gemstones', 'Coal Mining', 'Iron & Steel', 'Non-ferrous Metals (Copper, Aluminum)', 'Quarrying & Aggregates'],
    'NGO & Non-Profit Organizations': ['International NGOs', 'Community Development Organizations', 'Human Rights & Advocacy', 'Environmental NGOs', 'Humanitarian Aid & Relief', 'Foundations & Trusts'],
    'Professional Services (Legal, Audit, Accounting)': ['Law Firms', 'Tax Advisory', 'Audit & Assurance', 'Accounting & Bookkeeping', 'Corporate Governance Advisory'],
    'Public Sector & Government': ['Ministries & Government Departments', 'Regulatory Authorities', 'Public Healthcare Institutions', 'Education Boards & Universities', 'Defense & Security', 'Local Government Authorities'],
    'Retail & E-commerce': ['Supermarkets & Hypermarkets', 'Fashion & Apparel Retail', 'Electronics & Appliances Retail', 'Online Marketplaces', 'Specialty Retail (Books, Furniture, Jewelry)'],
    'Telecommunications': ['Mobile Network Operators', 'Internet Service Providers', 'Satellite Communications', 'Data & Cloud Services', 'Telecom Equipment Manufacturing'],
    'Textiles, Apparel & Fashion': ['Textile Mills & Weaving', 'Apparel Manufacturing', 'Footwear & Accessories', 'Fashion Design Houses', 'Luxury & Lifestyle Brands'],
    'Utilities & Infrastructure': ['Water Supply & Treatment', 'Power Transmission & Distribution', 'Waste Management & Recycling', 'Road & Highway Development', 'Ports & Airports Infrastructure'],
    'Others (Specify)': ['Custom Industry']
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
              
              {/* Company Logo - Centered Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo *
                </label>
                <div className="flex flex-col items-center gap-4">
                  {uploadedFiles.companyLogo ? (
                    <img 
                      src={URL.createObjectURL(uploadedFiles.companyLogo)} 
                      alt="Company Logo" 
                      className="w-20 h-20 object-contain rounded-full border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('companyLogo', file);
                      }}
                      className="hidden"
                      id="companyLogo"
                      required
                    />
                    <label htmlFor="companyLogo" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">
                        {uploadedFiles.companyLogo ? 'Change Logo' : 'Choose file'}
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, SVG files up to 5MB</p>
                    {uploadedFiles.companyLogo && (
                      <p className="text-xs text-gray-600 mt-1">{uploadedFiles.companyLogo.name}</p>
                    )}
                  </div>
                </div>
              </div>

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
                    Sub-Industry *
                  </label>
                  {form.industry && form.industry !== 'Others (Specify)' ? (
                    <select
                      value={form.subIndustry}
                      onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      required
                    >
                      <option value="">Select sub-industry</option>
                      {subIndustries[form.industry as keyof typeof subIndustries]?.map(subIndustry => (
                        <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
                      ))}
                    </select>
                  ) : form.industry === 'Others (Specify)' ? (
                    <input
                      type="text"
                      value={form.subIndustry}
                      onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="Enter your specific industry"
                      required
                    />
                  ) : (
                    <select
                      value={form.subIndustry}
                      onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      disabled
                    >
                      <option value="">Select industry first</option>
                    </select>
                  )}
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
                    Annual Revenue *
                  </label>
                  <select
                    value={form.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    required
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
                    Website *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                      placeholder="https://www.example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Profile/Brochure
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#114373] transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload company profile, brochure, or presentation
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('companyProfile', file);
                      }}
                      className="hidden"
                      id="companyProfile"
                    />
                    <label htmlFor="companyProfile" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">Choose file</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, PPT files up to 10MB</p>
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
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isPoBox"
                        checked={form.isPoBox}
                        onChange={(e) => handleInputChange('isPoBox', e.target.checked.toString())}
                        className="w-4 h-4 text-[#114373] border-gray-300 rounded focus:ring-[#114373]"
                      />
                      <label htmlFor="isPoBox" className="text-sm text-gray-700">
                        This is a PO Box address
                      </label>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                        placeholder={form.isPoBox ? "PO Box number" : "Street address"}
                        required
                      />
                    </div>
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
                    Company Profile/Brochure *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#114373] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {uploadedFiles.companyProfile ? uploadedFiles.companyProfile.name : 'Upload company profile or brochure'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('companyProfile', file);
                      }}
                      className="hidden"
                      id="companyProfile"
                      required
                    />
                    <label htmlFor="companyProfile" className="cursor-pointer">
                      <span className="text-[#114373] hover:text-[#0d3559] font-medium">Choose file</span>
                    </label>
                  </div>
                </div>

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
                    <h4 className="font-medium text-yellow-900 mb-1">File Requirements</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Company Logo: JPG, PNG, SVG format (max 5MB)</li>
                      <li>• Company Profile: PDF, DOC, DOCX, PPT, PPTX format (max 10MB)</li>
                      <li>• Legal Documents: PDF, JPG, or PNG format (max 5MB per document)</li>
                      <li>• All files must be clearly legible and up-to-date</li>
                      <li>• All files will be securely stored and encrypted</li>
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
                        <span className="text-sm text-gray-500">Sub-Industry:</span>
                        <p className="font-medium">{form.subIndustry || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Website:</span>
                        <p className="font-medium">{form.website}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Employee Count:</span>
                        <p className="font-medium">{form.employeeCount}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Annual Revenue:</span>
                        <p className="font-medium">{form.annualRevenue}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Address:</span>
                        <p className="font-medium">
                          {form.isPoBox ? `PO Box ${form.address}` : form.address}
                        </p>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Company Logo:</span>
                      <span className="text-sm text-gray-600">{uploadedFiles.companyLogo ? uploadedFiles.companyLogo.name : 'Not uploaded'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Company Profile:</span>
                      <span className="text-sm text-gray-600">{uploadedFiles.companyProfile ? uploadedFiles.companyProfile.name : 'Not uploaded'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Business License:</span>
                      <span className="text-sm text-gray-600">{uploadedFiles.businessLicense ? uploadedFiles.businessLicense.name : 'Not uploaded'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Tax Certificate:</span>
                      <span className="text-sm text-gray-600">{uploadedFiles.taxCertificate ? uploadedFiles.taxCertificate.name : 'Not uploaded'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Registration Certificate:</span>
                      <span className="text-sm text-gray-600">{uploadedFiles.registrationCertificate ? uploadedFiles.registrationCertificate.name : 'Not uploaded'}</span>
                    </div>
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