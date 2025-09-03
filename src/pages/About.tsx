import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, TrendingUp, Shield, CheckCircle, Star, Award, ChevronRight, Building2, Users2, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#21446e] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#21446e] font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-[#6db99f]/10 text-[#6db99f] px-4 py-2 rounded-full text-sm font-medium border border-[#6db99f]/20 mb-6">
              <Building2 className="w-4 h-4 mr-2" />
              About Axia HR
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining HR Solutions for 
              <span className="text-[#21446e]"> Modern Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A proud subsidiary of RM Financial Consulting Limited, we launched in 2022 with a bold vision to transform how organizations attract, retain, and empower top talent in Tanzania and beyond.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#21446e] mb-2">2022</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6db99f] mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#21446e] mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6db99f] mb-2">50+</div>
              <div className="text-gray-600">Industries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Building High-Performing Teams That Drive Success
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  In today's competitive and evolving economy, people are your greatest asset — and your biggest challenge. That's where we come in. We simplify the complexities of talent management, helping you build high-performing teams that are engaged, agile, and aligned with your business goals.
                </p>
                
                <p>
                  From leadership hiring to strategic HR partnerships, we've supported diverse industry sectors with a unique blend of insight, empathy, and entrepreneurial drive. Whether you're scaling up or evolving, Axia HR is your trusted partner in building the workforce that drives your success.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#6db99f]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#6db99f]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Strategic Approach</h4>
                    <p className="text-sm text-gray-600">Data-driven solutions aligned with business objectives</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#21446e]/10 rounded-full flex items-center justify-center">
                    <Users2 className="w-4 h-4 text-[#21446e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Team</h4>
                    <p className="text-sm text-gray-600">Experienced HR professionals with local expertise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#6db99f]/10 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#6db99f]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Local Knowledge</h4>
                    <p className="text-sm text-gray-600">Deep understanding of Tanzania's business landscape</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#21446e]/10 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-[#21446e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Proven Results</h4>
                    <p className="text-sm text-gray-600">Measurable outcomes and long-term partnerships</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#21446e]/5 to-[#6db99f]/5 rounded-3xl p-8 border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Talent Acquisition</h3>
                    <p className="text-sm text-gray-600">
                      Strategic recruitment and hiring solutions
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Management</h3>
                    <p className="text-sm text-gray-600">
                      KPI systems and evaluation frameworks
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Training & Development</h3>
                    <p className="text-sm text-gray-600">
                      Comprehensive learning programs
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizational Design</h3>
                    <p className="text-sm text-gray-600">
                      Structure optimization services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose 
              <span className="text-[#21446e]"> Axia HR?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring a unique combination of expertise, innovation, and local market knowledge to deliver exceptional HR solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Local Expertise</h3>
              <p className="text-gray-600 text-center">
                Deep understanding of Tanzania's business landscape, labor laws, and cultural nuances to provide relevant solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Proven Track Record</h3>
              <p className="text-gray-600 text-center">
                Successfully supported diverse industry sectors with measurable results and long-term partnerships.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Tailored Solutions</h3>
              <p className="text-gray-600 text-center">
                Customized approaches that align with your specific business goals, culture, and organizational needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your HR Strategy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's work together to build the workforce that drives your success
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-[#21446e] hover:bg-[#1a3658] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Today
            </Link>
            <Link 
              to="/solutions"
              className="border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 