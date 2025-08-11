import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  TrendingUp,
  Award,
  FileText,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';

const TalentAcquisition: FC = () => {
  const services = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Executive Search",
      description: "Specialized recruitment for senior leadership positions",
      features: [
        "C-level and senior management roles",
        "Industry-specific expertise",
        "Confidential search process",
        "Comprehensive background verification"
      ],
      timeline: "4-8 weeks",
      successRate: "95%"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mass Recruitment",
      description: "Large-scale hiring for multiple positions",
      features: [
        "Bulk hiring solutions",
        "Streamlined screening process",
        "Assessment centers",
        "Onboarding support"
      ],
      timeline: "2-4 weeks",
      successRate: "90%"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Technical Hiring",
      description: "Specialized recruitment for technical roles",
      features: [
        "IT and engineering positions",
        "Technical skill assessment",
        "Portfolio evaluation",
        "Technical interview coordination"
      ],
      timeline: "3-6 weeks",
      successRate: "88%"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Industry Specialization",
      description: "Sector-specific recruitment expertise",
      features: [
        "Banking and finance",
        "Manufacturing and logistics",
        "Healthcare and pharmaceuticals",
        "Technology and innovation"
      ],
      timeline: "3-5 weeks",
      successRate: "92%"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Needs Assessment",
      description: "Understanding your requirements, company culture, and specific role needs",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Market Research",
      description: "Analyzing the talent market and identifying potential candidates",
      icon: <Search className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Candidate Sourcing",
      description: "Proactive search and passive candidate engagement",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Screening & Assessment",
      description: "Comprehensive evaluation of skills, experience, and cultural fit",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "05",
      title: "Client Presentation",
      description: "Presenting shortlisted candidates with detailed profiles",
      icon: <Award className="w-6 h-6" />
    },
    {
      step: "06",
      title: "Interview Coordination",
      description: "Managing the interview process and feedback collection",
      icon: <Clock className="w-6 h-6" />
    },
    {
      step: "07",
      title: "Offer & Onboarding",
      description: "Supporting offer negotiations and smooth onboarding",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Efficiency",
      description: "Reduce time-to-hire by up to 60% with our streamlined process"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous screening ensures only the best candidates reach you"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Cost Effectiveness",
      description: "Optimize recruitment costs while improving hire quality"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Market Access",
      description: "Access to passive candidates and niche talent pools"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "TechCorp Tanzania",
      content: "Axia HR Advisory's executive search service helped us find the perfect CTO within 6 weeks. Their understanding of our technical requirements was exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Manufacturing Plus",
      content: "Their mass recruitment service for our factory expansion was outstanding. We hired 50 qualified workers in just 3 weeks.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "CEO",
      company: "Innovate Solutions",
      content: "The technical hiring team at Axia HR Advisory understands the tech industry deeply. They found us exceptional developers who fit our culture perfectly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-900" />
              </div>
              <span className="text-blue-200 font-medium">Talent Acquisition</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Find the Perfect
              <span className="text-blue-300 block">Talent for Your Business</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive recruitment solutions from executive search to mass hiring. 
              We connect exceptional talent with outstanding opportunities across Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/employer/login"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Start Hiring
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                Get Consultation
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
              Our Talent Acquisition Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From executive search to mass recruitment, we provide specialized solutions 
              tailored to your unique hiring needs and industry requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-600 text-white rounded-lg p-3 w-fit mb-6">
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
              Our Proven Recruitment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures quality hires and successful placements 
              while maintaining transparency throughout the process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="text-blue-600 mb-3 flex justify-center">
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
              Why Choose Our Talent Acquisition Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of working with a specialized recruitment partner 
              that understands your business and the local talent market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-xl p-6 mb-6 w-fit mx-auto">
                  <div className="text-blue-600">
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
              Hear from our clients about their experience with our talent acquisition services.
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
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Talent?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your hiring needs and how our talent acquisition services 
            can help you build the perfect team for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/employer/login"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              Start Hiring Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Axia HR Advisory</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for comprehensive talent acquisition solutions in Tanzania.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Executive Search</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mass Recruitment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Technical Hiring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Industry Specialization</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mezzanine floor, Urban Tower, Jamhuri Street, Dar es Salaam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+255 22 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@axiahr.co.tz</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Axia HR Advisory Tanzania Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentAcquisition; 