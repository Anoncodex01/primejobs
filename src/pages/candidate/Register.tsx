import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const CandidateRegister: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+255',
    origin: '',
    medicalCondition: '',
    impairment: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countryCodes = [
    { code: '+255', country: 'Tanzania' },
    { code: '+254', country: 'Kenya' },
    { code: '+256', country: 'Uganda' },
    { code: '+250', country: 'Rwanda' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+61', country: 'Australia' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+27', country: 'South Africa' },
    { code: '+234', country: 'Nigeria' },
    { code: '+20', country: 'Egypt' }
  ];

  const origins = [
    'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'South Sudan',
    'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
    'India', 'China', 'South Africa', 'Nigeria', 'Egypt', 'Ghana',
    'Ethiopia', 'Morocco', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.origin) {
      newErrors.origin = 'Origin is required';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store basic user data in localStorage for demo
      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        isAuthenticated: true,
        registrationDate: new Date().toISOString()
      };
      
      localStorage.setItem('candidateUser', JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate('/candidate/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#114373] rounded-lg flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join thousands of candidates finding their dream jobs
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <div className="mt-1 flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="appearance-none block w-24 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-[#114373] focus:border-[#114373] bg-gray-50"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`appearance-none block flex-1 px-3 py-2 border border-l-0 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Origin Field */}
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                Origin *
              </label>
              <div className="mt-1">
                <select
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                    errors.origin ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your origin</option>
                  {origins.map((origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
              </div>
              {errors.origin && (
                <p className="mt-1 text-sm text-red-600">{errors.origin}</p>
              )}
            </div>

            {/* Medical Condition Field */}
            <div>
              <label htmlFor="medicalCondition" className="block text-sm font-medium text-gray-700">
                Any Medical Condition
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="medicalCondition"
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373]"
                  placeholder="Please specify any medical conditions (optional)"
                />
              </div>
            </div>

            {/* Impairment Field */}
            <div>
              <label htmlFor="impairment" className="block text-sm font-medium text-gray-700">
                Any Impairment
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="impairment"
                  name="impairment"
                  value={formData.impairment}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373]"
                  placeholder="Please specify any impairments (optional)"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373] ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-center">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                  className="h-4 w-4 text-[#114373] focus:ring-[#114373] border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="text-[#114373] hover:text-[#0d3559] underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#114373] hover:text-[#0d3559] underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {errors.submit}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#114373] hover:bg-[#0d3559] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#114373] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Create Account
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  setFormData({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@demo.com',
                    phone: '123456789',
                    countryCode: '+255',
                    origin: 'Tanzania',
                    medicalCondition: '',
                    impairment: '',
                    password: 'demo123',
                    confirmPassword: 'demo123',
                    acceptTerms: true
                  });
                }}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
              >
                <div className="font-medium text-gray-900">Software Developer</div>
                <div className="text-gray-600">john.doe@demo.com / demo123</div>
              </button>
              <button
                onClick={() => {
                  setFormData({
                    firstName: 'Sarah',
                    lastName: 'Johnson',
                    email: 'sarah.johnson@demo.com',
                    phone: '987654321',
                    countryCode: '+254',
                    origin: 'Kenya',
                    medicalCondition: '',
                    impairment: '',
                    password: 'demo123',
                    confirmPassword: 'demo123',
                    acceptTerms: true
                  });
                }}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
              >
                <div className="font-medium text-gray-900">UI/UX Designer</div>
                <div className="text-gray-600">sarah.johnson@demo.com / demo123</div>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/candidate/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#114373]"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister; 