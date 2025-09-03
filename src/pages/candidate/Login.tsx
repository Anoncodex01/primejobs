import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Info
} from 'lucide-react';

const CandidateLogin: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token
      localStorage.setItem('authToken', 'candidate-token');
      localStorage.setItem('userType', 'candidate');
      
      // Redirect to dashboard
      navigate('/candidate/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const fillDemoCredentials = (type: 'developer' | 'designer' | 'manager') => {
    const credentials = {
      developer: { email: 'john.developer@example.com', password: 'demo123' },
      designer: { email: 'sarah.designer@example.com', password: 'demo123' },
      manager: { email: 'mike.manager@example.com', password: 'demo123' }
    };
    
    setLoginData(credentials[type]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Axia HR Advisory" className="h-12 w-auto" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your candidate account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373]"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#114373] focus:border-[#114373]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#114373] focus:ring-[#114373] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#114373] hover:text-[#0d3559]">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#114373] hover:bg-[#0d3559] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#114373] disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-medium text-blue-900">Demo Credentials</h3>
            </div>
            <p className="text-xs text-blue-700 mb-3">
              Use these credentials to test the platform:
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('developer')}
                className="w-full text-left p-2 bg-white border border-blue-200 rounded text-xs hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">👨‍💻 Software Developer</div>
                <div className="text-blue-700">john.developer@example.com / demo123</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('designer')}
                className="w-full text-left p-2 bg-white border border-blue-200 rounded text-xs hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">🎨 UI/UX Designer</div>
                <div className="text-blue-700">sarah.designer@example.com / demo123</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('manager')}
                className="w-full text-left p-2 bg-white border border-blue-200 rounded text-xs hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">👔 Project Manager</div>
                <div className="text-blue-700">mike.manager@example.com / demo123</div>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/candidate/register" className="text-[#114373] hover:text-[#0d3559] font-medium">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin; 