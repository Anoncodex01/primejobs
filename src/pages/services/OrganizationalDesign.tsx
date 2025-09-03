import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ArrowRight,
  Target,
  Users,
  CheckCircle,
  BarChart3,
  Map,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const OrganizationalDesign: FC = () => {
  const services = [
    {
      title: "Organizational assessments",
      description: "Comprehensive evaluation of your current structure and operations",
      icon: BarChart3,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Structure and role realignment",
      description: "Optimize roles and responsibilities for maximum efficiency",
      icon: Users,
      color: "from-[#6db99f] to-[#5aa88a]"
    },
    {
      title: "Scalable operating models",
      description: "Design flexible structures that grow with your business",
      icon: Building2,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Strategic planning frameworks",
      description: "Develop clear roadmaps for achieving your business objectives",
      icon: Target,
      color: "from-[#6db99f] to-[#5aa88a]"
    },
    {
      title: "Implementation roadmaps",
      description: "Step-by-step guidance for successful organizational change",
      icon: Map,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Change management support",
      description: "Ensure smooth transitions and employee buy-in throughout the process",
      icon: TrendingUp,
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
            Building Strong Foundations.
            <span className="block">Shaping Future Success.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-12">
            At Axia, we help businesses design agile, scalable structures and strategic plans that drive growth and resilience—whether you're starting up or scaling up.
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

      {/* Our Approach Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our 
                <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Approach</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl">
                  We collaborate closely with leadership to assess your current setup, identify inefficiencies, and uncover growth opportunities.
                </p>
                
                <p>
                  Our solutions are practical, tailored, and aligned with your goals. We understand that every organization is unique, and we design solutions that fit your specific needs and challenges.
                </p>
                
                <p>
                  We empower your business to adapt, collaborate, and thrive in a changing world.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Collaborative Process</h4>
                    <p className="text-gray-600">Work closely with your leadership team</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Goal-Aligned</h4>
                    <p className="text-gray-600">Solutions tailored to your objectives</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Practical Solutions</h4>
                    <p className="text-gray-600">Implementable and results-driven</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Growth Focused</h4>
                    <p className="text-gray-600">Designed for scalability and success</p>
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
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Evaluate current structure and identify opportunities
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategy</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Develop clear plans aligned with business goals
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Map className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Execute changes with structured roadmaps
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Optimization</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Continuous improvement and adaptation
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

      {/* What We Offer Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              What We Offer
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-16 border border-gray-100">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Let's Shape Your 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Future—Together</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact us to start your transformation journey.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/contact"
                className="group bg-gradient-to-r from-[#21446e] to-[#6db99f] hover:from-[#1a3658] hover:to-[#5aa88a] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
              >
                Start Your Journey
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

export default OrganizationalDesign; 