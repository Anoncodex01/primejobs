import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Award,
  FileText,
  Building2,
  Globe,
  BarChart3,
  UserCheck,
  GraduationCap
} from 'lucide-react';

const PerformanceManagement: FC = () => {
  const services = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "KPI Development",
      description: "Design and implement key performance indicators aligned with business objectives",
      features: [
        "Strategic KPI framework design",
        "SMART goal setting methodology",
        "Performance measurement systems",
        "Real-time tracking dashboards"
      ],
      timeline: "2-4 weeks",
      successRate: "92%"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "360° Performance Reviews",
      description: "Comprehensive multi-source feedback and evaluation systems",
      features: [
        "Multi-rater assessment tools",
        "Anonymous feedback collection",
        "Comprehensive evaluation reports",
        "Action planning support"
      ],
      timeline: "3-6 weeks",
      successRate: "88%"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Performance Coaching",
      description: "One-on-one coaching to improve individual and team performance",
      features: [
        "Individual performance coaching",
        "Team development sessions",
        "Leadership coaching",
        "Performance improvement plans"
      ],
      timeline: "Ongoing",
      successRate: "95%"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Succession Planning",
      description: "Strategic talent development and leadership pipeline planning",
      features: [
        "Leadership competency mapping",
        "Talent assessment and development",
        "Career path planning",
        "Knowledge transfer strategies"
      ],
      timeline: "4-8 weeks",
      successRate: "90%"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Assessment & Analysis",
      description: "Evaluate current performance management practices and identify gaps",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Design performance management framework aligned with business goals",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "03",
      title: "System Implementation",
      description: "Deploy performance management tools and processes",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Training & Development",
      description: "Train managers and employees on new performance systems",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      step: "05",
      title: "Monitoring & Evaluation",
      description: "Track performance metrics and system effectiveness",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      step: "06",
      title: "Continuous Improvement",
      description: "Refine and optimize performance management processes",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Improved Productivity",
      description: "Increase team productivity by up to 25% with clear performance expectations"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Employee Engagement",
      description: "Boost employee engagement and retention through regular feedback"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Alignment",
      description: "Ensure all employees work towards common organizational objectives"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Talent Development",
      description: "Identify and develop high-potential employees for leadership roles"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "TechCorp Tanzania",
      content: "The performance management system implemented by Axia HR Advisory transformed how we evaluate and develop our team. Productivity increased by 30%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Manufacturing Plus",
      content: "Their 360° review process helped us identify leadership gaps and develop a strong succession plan. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "CEO",
      company: "Innovate Solutions",
      content: "The performance coaching sessions improved our management team's effectiveness significantly. Great ROI on this investment.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-900" />
              </div>
              <span className="text-green-200 font-medium">Performance Management</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Optimize Your
              <span className="text-green-300 block">Team Performance</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive performance management solutions that drive productivity, 
              engagement, and organizational success through strategic evaluation and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/employer/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-900 transition-colors flex items-center justify-center gap-2"
              >
                Start Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Performance Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From KPI development to succession planning, we provide comprehensive solutions 
              to optimize your team's performance and drive organizational success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="bg-green-600 text-white rounded-lg p-3 w-fit mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Timeline:</span>
                      <span className="font-semibold text-gray-900 ml-1">{service.timeline}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="font-semibold text-green-600 ml-1">{service.successRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Performance Management Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to implementing effective performance management 
              systems that drive results and organizational growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="text-green-600 mb-3 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Performance Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your organization with data-driven performance management 
              that delivers measurable results and sustainable growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-xl p-6 mb-6 w-fit mx-auto">
                  <div className="text-green-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our clients about their experience with our performance management services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                  <div className="text-sm text-green-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Optimize Your Team Performance?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our performance management solutions can help your organization 
            achieve its goals and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/employer/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-900 transition-colors flex items-center justify-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceManagement; 