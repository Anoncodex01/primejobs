import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  Award,
  ChevronRight
} from 'lucide-react';

const PerformanceManagement: FC = () => {
  const services = [
    "Setting clear goals and expectations aligned with your strategic vision",
    "Providing ongoing feedback and coaching to foster continuous growth",
    "Addressing performance challenges promptly and constructively",
    "Designing impactful reward and recognition programs to motivate excellence",
    "Conducting structured performance evaluations to guide improvement and development"
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
            Elevating Employee Performance.
            <span className="block">Driving Business Growth.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-12">
            Effective performance management is key to building a high-performing workforce and achieving long-term organizational goals. At Axia HR Advisory, we work closely with you to create a performance-driven culture that supports both individual and business success.
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
              Our Services Include
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#21446e] to-[#1a3658]' : 'from-[#6db99f] to-[#5aa88a]'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {service}
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
                Building High-Performing Teams That 
                <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Drive Success</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl">
                  By strengthening these core areas, we help your employees perform at their best—and stay committed to your organization's future.
                </p>
                
                <p>
                  Our performance management approach focuses on creating a culture of continuous improvement, where every team member understands their role in achieving organizational objectives.
                </p>
                
                <p>
                  We believe that effective performance management is not just about evaluation, but about creating an environment where employees can thrive and contribute to their fullest potential.
                </p>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Goal Setting</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Clear, measurable objectives aligned with business strategy
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Tracking</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Real-time monitoring and progress evaluation
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Coaching</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Individual and team development support
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recognition</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Reward systems that motivate excellence
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
              Ready to Transform Your 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Performance Management?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact us today to learn how we can support your performance management needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/contact"
                className="group bg-gradient-to-r from-[#21446e] to-[#6db99f] hover:from-[#1a3658] hover:to-[#5aa88a] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/employer/login"
                className="group border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex items-center"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceManagement; 