import { FC, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Building2, Users, Target, Shield } from 'lucide-react';

const Contact: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your HR? Let's discuss how Axia HR Advisory can help your organization.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600 text-lg">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service</label>
                    <select className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50">
                      <option value="">Choose a service</option>
                      <option value="talent-acquisition">Talent Acquisition</option>
                      <option value="performance-management">Performance Management</option>
                      <option value="training-development">Training & Development</option>
                      <option value="organizational-design">Organizational Design</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your HR needs..."
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6db99f] focus:border-[#6db99f] transition-all duration-300 group-hover:border-[#6db99f]/50 resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#21446e] to-[#6db99f] hover:from-[#1a3658] hover:to-[#5aa88a] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Phone</p>
                      <p className="text-gray-600 text-lg">+255 22 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Email</p>
                      <p className="text-gray-600 text-lg">info@axiahr.co.tz</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Office</p>
                      <p className="text-gray-600 text-lg">Mezzanine floor, Urban Tower</p>
                      <p className="text-gray-600 text-lg">Jamhuri Street, Dar es Salaam</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Business Hours</p>
                      <p className="text-gray-600 text-lg">Mon-Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-lg">Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              
              
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  };
  
  export default Contact; 