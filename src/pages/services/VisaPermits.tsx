import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ArrowRight,
  Target,
  Users,
  CheckCircle,
  FileText,
  Shield,
  TrendingUp,
  Building2,
  MapPin
} from 'lucide-react';

const VisaPermits: FC = () => {
  const services = [
    {
      title: "Work Permits",
      description: "Comprehensive work permit processing for international talent",
      icon: FileText,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Residence Permits",
      description: "Long-term residence permit applications and renewals",
      icon: MapPin,
      color: "from-[#6db99f] to-[#5aa88a]"
    },
    {
      title: "Business Passes",
      description: "Business visa and permit processing for corporate needs",
      icon: Building2,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Compliance Support",
      description: "Ensure all immigration requirements are met and maintained",
      icon: Shield,
      color: "from-[#6db99f] to-[#5aa88a]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Expanding Talent.
            <span className="block">Ensuring Compliance.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-12">
            At Axia, we support your global talent strategy by sourcing exceptional candidates beyond local borders. Our services go beyond recruitment—we handle the entire immigration process, including work permits, residence permits, and business passes, ensuring a smooth, compliant, and stress-free onboarding experience for your international hires.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="group bg-white text-[#21446e] px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/employer/login"
              className="group border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#21446e] transition-all duration-300 flex items-center"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Our Immigration Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Simplifying 
                <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Cross-Border Hiring</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl">
                  Partner with us to simplify cross-border hiring and stay focused on growth.
                </p>
                
                <p>
                  We understand the complexities of international recruitment and immigration processes. Our comprehensive approach ensures that your global talent acquisition strategy is not only successful but also compliant with all regulatory requirements.
                </p>
                
                <p>
                  From initial candidate sourcing to final permit approval, we handle every step of the process, allowing you to focus on your core business objectives while we manage the administrative complexities.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">End-to-End Support</h4>
                    <p className="text-gray-600">Complete immigration process management</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Compliance Focus</h4>
                    <p className="text-gray-600">Ensure all regulatory requirements are met</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Global Talent</h4>
                    <p className="text-gray-600">Access exceptional candidates worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Stress-Free Process</h4>
                    <p className="text-gray-600">Smooth onboarding for international hires</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Reach</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Access talent from around the world
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Documentation</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Complete visa and permit processing
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ensure regulatory requirements are met
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Onboarding</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Smooth transition for international hires
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#6db99f]/20 to-[#21446e]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-[#21446e]/20 to-[#6db99f]/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-16 border border-gray-100">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Partner With Us to 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Simplify Cross-Border Hiring</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stay focused on growth while we handle the complexities of international recruitment and immigration.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/contact"
                className="group bg-gradient-to-r from-[#21446e] to-[#6db99f] hover:from-[#1a3658] hover:to-[#5aa88a] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/employer/login"
                className="group border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex items-center"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaPermits; 