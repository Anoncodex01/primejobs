import { FC, useState } from 'react';
import {
  Settings,
  Shield,
  Users,
  Bell,
  Globe,
  Database,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Activity,
  BarChart3,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Target,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

interface SystemSettings {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  supportEmail: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  language: string;
}

interface SecuritySettings {
  passwordMinLength: number;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorAuth: boolean;
  ipWhitelist: string[];
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  newCandidateAlerts: boolean;
  newEmployerAlerts: boolean;
  placementAlerts: boolean;
  invoiceAlerts: boolean;
  systemAlerts: boolean;
}

interface UserSettings {
  allowCandidateRegistration: boolean;
  allowEmployerRegistration: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  requireProfileCompletion: boolean;
  autoApproveCandidates: boolean;
  autoApproveEmployers: boolean;
}

const AdminSettings: FC = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Axia HR Advisory',
    siteUrl: 'https://axiahr.com',
    adminEmail: 'admin@axiahr.com',
    supportEmail: 'support@axiahr.com',
    timezone: 'Africa/Dar_es_Salaam',
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD',
    language: 'English'
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelist: []
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    newCandidateAlerts: true,
    newEmployerAlerts: true,
    placementAlerts: true,
    invoiceAlerts: true,
    systemAlerts: true
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    allowCandidateRegistration: true,
    allowEmployerRegistration: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    requireProfileCompletion: true,
    autoApproveCandidates: false,
    autoApproveEmployers: false
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemSettingChange = (field: keyof SystemSettings, value: string) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecuritySettingChange = (field: keyof SecuritySettings, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationSettingChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleUserSettingChange = (field: keyof UserSettings, value: boolean) => {
    setUserSettings(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'system', name: 'System Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'users', name: 'User Management', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#114373] text-[#114373]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={systemSettings.siteName}
                    onChange={(e) => handleSystemSettingChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                  <input
                    type="url"
                    value={systemSettings.siteUrl}
                    onChange={(e) => handleSystemSettingChange('siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={systemSettings.adminEmail}
                    onChange={(e) => handleSystemSettingChange('adminEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={systemSettings.supportEmail}
                    onChange={(e) => handleSystemSettingChange('supportEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={systemSettings.timezone}
                    onChange={(e) => handleSystemSettingChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={systemSettings.dateFormat}
                    onChange={(e) => handleSystemSettingChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={systemSettings.currency}
                    onChange={(e) => handleSystemSettingChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TZS">TZS (TSh)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={systemSettings.language}
                    onChange={(e) => handleSystemSettingChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Swahili">Swahili</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                  <input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => handleSecuritySettingChange('passwordMinLength', parseInt(e.target.value))}
                    min="6"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="480"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                    min="3"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Password Requirements</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireSpecialChars}
                      onChange={(e) => handleSecuritySettingChange('requireSpecialChars', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require special characters</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireNumbers}
                      onChange={(e) => handleSecuritySettingChange('requireNumbers', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require numbers</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireUppercase}
                      onChange={(e) => handleSecuritySettingChange('requireUppercase', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => handleSecuritySettingChange('twoFactorAuth', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable two-factor authentication</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => handleNotificationSettingChange('emailNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => handleNotificationSettingChange('smsNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.whatsappNotifications}
                      onChange={(e) => handleNotificationSettingChange('whatsappNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">WhatsApp notifications</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Alert Types</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.newCandidateAlerts}
                      onChange={(e) => handleNotificationSettingChange('newCandidateAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">New candidate registrations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.newEmployerAlerts}
                      onChange={(e) => handleNotificationSettingChange('newEmployerAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">New employer registrations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.placementAlerts}
                      onChange={(e) => handleNotificationSettingChange('placementAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Successful placements</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.invoiceAlerts}
                      onChange={(e) => handleNotificationSettingChange('invoiceAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Invoice updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemAlerts}
                      onChange={(e) => handleNotificationSettingChange('systemAlerts', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">System alerts</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* User Management Settings */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Registration Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.allowCandidateRegistration}
                      onChange={(e) => handleUserSettingChange('allowCandidateRegistration', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow candidate registration</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.allowEmployerRegistration}
                      onChange={(e) => handleUserSettingChange('allowEmployerRegistration', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow employer registration</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Verification Requirements</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.requireEmailVerification}
                      onChange={(e) => handleUserSettingChange('requireEmailVerification', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require email verification</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.requirePhoneVerification}
                      onChange={(e) => handleUserSettingChange('requirePhoneVerification', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require phone verification</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.requireProfileCompletion}
                      onChange={(e) => handleUserSettingChange('requireProfileCompletion', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require profile completion</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Approval Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.autoApproveCandidates}
                      onChange={(e) => handleUserSettingChange('autoApproveCandidates', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Auto-approve candidates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userSettings.autoApproveEmployers}
                      onChange={(e) => handleUserSettingChange('autoApproveEmployers', e.target.checked)}
                      className="rounded border-gray-300 text-[#114373] focus:ring-[#114373]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Auto-approve employers</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 