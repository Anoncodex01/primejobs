import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight,
  Building2,
  Briefcase,
  Search,
  UserCheck,
  Zap,
  Lock,
  Handshake,
  Globe,
  Factory,
  Wifi,
  Heart,
  Truck,
  Hotel,
  Home,
  Zap as Energy,
  GraduationCap,
  Users as NGO
} from 'lucide-react';

const TalentAcquisition = () => {
  const coreOfferings = [
    {
      title: 'Executive Search',
      description: 'Recruitment for C-suite and senior leadership roles to drive strategic growth.',
      icon: Search,
      color: 'from-[#21446e] to-[#1a3658]'
    },
    {
      title: 'Board & Leadership Advisory',
      description: 'Support in building strong, future-ready boards and succession plans.',
      icon: Building2,
      color: 'from-[#6db99f] to-[#5aa88a]'
    },
    {
      title: 'End-to-End Recruitment',
      description: 'Talent solutions across all levels, from executives to entry-level roles.',
      icon: Users,
      color: 'from-[#21446e] to-[#1a3658]'
    },
    {
      title: 'Candidate Assessment & Reference Checks',
      description: 'Rigorous evaluations and thorough background verifications to ensure a strong match in skills, experience, and values.',
      icon: UserCheck,
      color: 'from-[#6db99f] to-[#5aa88a]'
    },
    {
      title: 'Agile, Customized Approach',
      description: 'Flexible, responsive, and aligned with your unique needs.',
      icon: Zap,
      color: 'from-[#21446e] to-[#1a3658]'
    },
    {
      title: 'Confidential & Ethical',
      description: 'Trusted processes backed by integrity and strict confidentiality.',
      icon: Lock,
      color: 'from-[#6db99f] to-[#5aa88a]'
    },
    {
      title: 'Reliable Talent Partner',
      description: 'Long-term partnerships built on trust and consistent delivery.',
      icon: Handshake,
      color: 'from-[#21446e] to-[#1a3658]'
    }
  ];

  const industries = [
    { name: 'Mining & Natural Resources', icon: Target },
    { name: 'Banking & Financial Services', icon: TrendingUp },
    { name: 'Technology & Digital', icon: Zap },
    { name: 'Consumer Goods & Retail', icon: Briefcase },
    { name: 'Industrial & Manufacturing', icon: Factory },
    { name: 'Telecommunications', icon: Wifi },
    { name: 'Healthcare & Life Sciences', icon: Heart },
    { name: 'Logistics & Supply Chain', icon: Truck },
    { name: 'Hospitality & Tourism', icon: Hotel },
    { name: 'Real Estate & Construction', icon: Home },
    { name: 'Energy & Utilities', icon: Energy },
    { name: 'Education & Training', icon: GraduationCap },
    { name: 'NGOs & Development Sector', icon: NGO }
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
            Strategic 
            <span className="block">Talent Acquisition</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-12">
            At Axia, we deliver tailored recruitment solutions with precision, discretion, and deep industry insight.
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

      {/* Core Offerings Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Our Core 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Offerings</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Axia, we deliver tailored recruitment solutions with precision, discretion, and deep industry insight.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreOfferings.map((offering, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${offering.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <offering.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{offering.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {offering.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Industry 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Expertise</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We bring deep sectoral insight and recruiting excellence across a wide range of industries:
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                    {industry.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-16 border border-gray-100">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Ready to Find Your Perfect 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Talent Match?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our talent acquisition expertise can help you build the team that drives your success.
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
                to="/solutions"
                className="group border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex items-center"
              >
                View All Solutions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentAcquisition;
