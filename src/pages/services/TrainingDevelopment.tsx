import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Target,
  Users,
  CheckCircle,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Building2
} from 'lucide-react';

const TrainingDevelopment: FC = () => {
  const services = [
    {
      title: "Training Needs Assessment",
      description: "Identify skill gaps to align training with business goals.",
      icon: Target,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Customized Programs",
      description: "Tailored learning modules for your team's unique needs.",
      icon: BookOpen,
      color: "from-[#6db99f] to-[#5aa88a]"
    },
    {
      title: "Engaging Delivery",
      description: "Interactive classroom sessions and webinars designed for real-world impact.",
      icon: Users,
      color: "from-[#21446e] to-[#1a3658]"
    },
    {
      title: "Coaching & Mentoring",
      description: "Ongoing support to apply new skills effectively.",
      icon: MessageSquare,
      color: "from-[#6db99f] to-[#5aa88a]"
    },
    {
      title: "Evaluation & Improvement",
      description: "Measurable outcomes and continuous program refinement.",
      icon: TrendingUp,
      color: "from-[#21446e] to-[#1a3658]"
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
            Empowering People.
            <span className="block">Elevating Performance.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-12">
            At Axia, we help you build a future-ready workforce through targeted Training & Development solutions that enhance skills, boost productivity, and drive growth.
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
              Our Services
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

      {/* Main Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Building a 
                <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Future-Ready Workforce</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl">
                  Whether you're upskilling teams or nurturing leaders, our flexible formats—classroom or virtual—fit your needs.
                </p>
                
                <p>
                  Our training and development approach focuses on creating measurable impact through practical, real-world applications that drive immediate results.
                </p>
                
                <p>
                  We believe that effective learning happens when theory meets practice, and our programs are designed to ensure lasting behavioral change and skill development.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Flexible Formats</h4>
                    <p className="text-gray-600">Classroom or virtual sessions to fit your schedule</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Measurable Outcomes</h4>
                    <p className="text-gray-600">Track progress and measure training effectiveness</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Team Development</h4>
                    <p className="text-gray-600">Enhance collaboration and team performance</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">Leadership Growth</h4>
                    <p className="text-gray-600">Develop future leaders within your organization</p>
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
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Programs</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Tailored learning modules for your specific needs
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Interactive Sessions</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Engaging classroom and virtual learning experiences
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-xl flex items-center justify-center mb-4">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Coaching Support</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ongoing guidance to apply new skills effectively
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Continuous Improvement</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Regular evaluation and program refinement
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
              Unlock Your Team's 
              <span className="bg-gradient-to-r from-[#21446e] to-[#6db99f] bg-clip-text text-transparent"> Potential</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get in touch to explore our Training & Development solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/contact"
                className="group bg-gradient-to-r from-[#21446e] to-[#6db99f] hover:from-[#1a3658] hover:to-[#5aa88a] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/employer/login"
                className="group border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex items-center"
              >
                Explore Solutions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingDevelopment; 