import { FC, useState } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Users,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Bell,
  MessageCircle,
  FileText,
  Image,
  Paperclip,
  Smile,
  Send as SendIcon,
  Archive,
  Flag,
  Reply,
  Forward,
  Copy,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'email' | 'sms' | 'whatsapp' | 'notification';
  subject: string;
  content: string;
  recipients: string[];
  sender: string;
  status: 'draft' | 'sent' | 'delivered' | 'failed';
  sentAt: string;
  readAt?: string;
  priority: 'low' | 'medium' | 'high';
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'welcome' | 'notification' | 'reminder' | 'marketing' | 'custom';
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

const Communications: FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      type: 'email',
      subject: 'Welcome to Axia HR Advisory',
      content: 'Thank you for registering with Axia HR Advisory. We look forward to helping you find your next opportunity.',
      recipients: ['john.doe@email.com'],
      sender: 'admin@axiahr.com',
      status: 'sent',
      sentAt: '2024-01-25 10:30 AM',
      readAt: '2024-01-25 11:15 AM',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'whatsapp',
      subject: 'Interview Reminder',
      content: 'Hi Sarah, this is a reminder that you have an interview scheduled for tomorrow at 2 PM.',
      recipients: ['+255123456789'],
      sender: 'admin@axiahr.com',
      status: 'delivered',
      sentAt: '2024-01-25 09:00 AM',
      priority: 'high'
    },
    {
      id: '3',
      type: 'sms',
      subject: 'Application Update',
      content: 'Your application has been reviewed and you have been shortlisted for the next round.',
      recipients: ['+255987654321'],
      sender: 'admin@axiahr.com',
      status: 'sent',
      sentAt: '2024-01-24 03:45 PM',
      priority: 'medium'
    }
  ];

  const emailTemplates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to Axia HR Advisory - {{candidate_name}}',
      content: `Dear {{candidate_name}},

Welcome to Axia HR Advisory! We're excited to have you join our platform.

Your account has been successfully created and you can now:
- Complete your profile
- Browse available job opportunities
- Apply for positions that match your skills

If you have any questions, please don't hesitate to contact our support team.

Best regards,
The Axia HR Advisory Team`,
      category: 'welcome',
      variables: ['candidate_name', 'company_name'],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25'
    },
    {
      id: '2',
      name: 'Interview Invitation',
      subject: 'Interview Invitation - {{position}} at {{company_name}}',
      content: `Dear {{candidate_name}},

We are pleased to invite you for an interview for the {{position}} position at {{company_name}}.

Interview Details:
- Date: {{interview_date}}
- Time: {{interview_time}}
- Location: {{interview_location}}
- Interviewer: {{interviewer_name}}

Please confirm your attendance by replying to this email.

Best regards,
{{company_name}} HR Team`,
      category: 'notification',
      variables: ['candidate_name', 'position', 'company_name', 'interview_date', 'interview_time', 'interview_location', 'interviewer_name'],
      createdAt: '2024-01-18',
      updatedAt: '2024-01-22'
    },
    {
      id: '3',
      name: 'Application Status Update',
      subject: 'Application Status Update - {{position}}',
      content: `Dear {{candidate_name}},

Thank you for your interest in the {{position}} position at {{company_name}}.

Your application status has been updated to: {{status}}

{{status_message}}

We will keep you informed of any further updates.

Best regards,
{{company_name}} HR Team`,
      category: 'notification',
      variables: ['candidate_name', 'position', 'company_name', 'status', 'status_message'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <Phone className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'notification':
        return <Bell className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'templates', name: 'Email Templates', icon: <FileText className="w-4 h-4" /> },
    { id: 'compose', name: 'Compose', icon: <Plus className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600">Manage messages, templates, and notifications</p>
        </div>
        <button
          onClick={() => setIsComposing(true)}
          className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Message
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
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                    />
                  </div>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent">
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="notification">Notification</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(message.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{message.subject}</h3>
                          <p className="text-sm text-gray-600">{message.recipients.join(', ')}</p>
                          <p className="text-xs text-gray-500">{message.sentAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
                <button className="px-3 py-1 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] text-sm flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  New Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-3">{template.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{template.category}</span>
                      <span className="text-xs text-gray-500">Updated: {template.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compose Tab */}
          {activeTab === 'compose' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <input
                    type="text"
                    placeholder="Enter email addresses, phone numbers, or select from contacts..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter subject..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                  <textarea
                    rows={8}
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#114373] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
                    <Image className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Save Draft
                  </button>
                  <button className="px-4 py-2 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <p className="text-gray-900">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <p className="text-gray-900">{selectedMessage.recipients.join(', ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sent At</label>
                  <p className="text-gray-900">{selectedMessage.sentAt}</p>
                </div>
                {selectedMessage.readAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Read At</label>
                    <p className="text-gray-900">{selectedMessage.readAt}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communications; 