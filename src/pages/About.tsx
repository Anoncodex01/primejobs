import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Target,
  Award,
  Heart,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Building2,
  Globe,
  TrendingUp,
  Star
} from 'lucide-react';

const About: FC = () => {
  const team = [
    {
      name: "Sarah Johnson",
      position: "Managing Director",
      experience: "15+ years in HR",
      expertise: "Strategic HR Management",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      position: "Head of Recruitment",
      experience: "12+ years in recruitment",
      expertise: "Executive Search & Talent Acquisition",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      position: "HR Consultant",
      experience: "10+ years in consulting",
      expertise: "Performance Management & Training",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      position: "Operations Manager",
      experience: "8+ years in operations",
      expertise: "Process Optimization & Client Relations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Integrity",
      description: "We operate with the highest ethical standards and transparency in all our dealings."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "We strive for excellence in every service we provide and every interaction we have."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Partnership",
      description: "We build long-term partnerships based on trust, mutual respect, and shared success."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously innovate our processes and solutions to meet evolving business needs."
    }
  ];

  const achievements = [
    { number: "500+", label: "Successful Placements", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Client Companies", icon: <Building2 className="w-6 h-6" /> },
    { number: "95%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "10+", label: "Years of Experience", icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About Axia HR Advisory
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in transforming HR excellence across Tanzania. 
              We combine local expertise with international best practices to drive business success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower organizations across Tanzania with strategic HR solutions that drive growth, 
                enhance productivity, and create sustainable competitive advantages through exceptional 
                talent management and organizational development.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the leading HR advisory firm in Tanzania, recognized for excellence in talent 
                acquisition, organizational development, and strategic HR consulting that transforms 
                businesses and drives economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded as an offshoot of RM Finance Consulting Limited, Axia HR Advisory was established 
                with a clear vision: to transform how organizations approach human resource management 
                in Tanzania.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Over the past decade, we've grown from a small recruitment agency to a comprehensive 
                HR advisory firm, serving clients across various industries including technology, 
                finance, manufacturing, healthcare, and more.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our success is built on deep local knowledge, international best practices, and an 
                unwavering commitment to delivering exceptional results for our clients.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Axia HR Advisory?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                    <p className="text-gray-600">Deep understanding of Tanzanian business environment and labor laws</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Proven Track Record</h4>
                    <p className="text-gray-600">500+ successful placements and 95% client satisfaction rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Comprehensive Solutions</h4>
                    <p className="text-gray-600">End-to-end HR services from recruitment to organizational development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Approach</h4>
                    <p className="text-gray-600">Tailored solutions that align with your unique business needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every relationship we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-xl p-6 mb-6 w-fit mx-auto">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional HR solutions 
              and driving your business success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                <p className="text-sm text-gray-500">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence and client success.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
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
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how Axia HR Advisory can help your organization achieve its goals 
            through strategic human resource management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/employer/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 