import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Calculator, 
  UserCheck, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export const Solutions: FC = () => {
  const services = [
    {
      id: 'talent-acquisition',
      title: 'Talent Acquisition',
      description: 'Strategic recruitment solutions to find and attract top talent that aligns with your organizational culture and business objectives.',
      icon: Users,
      color: 'from-[#6db99f] to-[#5aa88a]',
      link: '/services/talent-acquisition'
    },
    {
      id: 'training-development',
      title: 'Training & Development',
      description: 'Comprehensive learning programs designed to enhance employee skills, boost productivity, and drive organizational growth.',
      icon: GraduationCap,
      color: 'from-[#21446e] to-[#1a3658]',
      link: '/services/training-development'
    },
    {
      id: 'organizational-design',
      title: 'Organizational Design & Strategic Planning',
      description: 'Optimize your organizational structure and develop strategic frameworks that support business goals and operational efficiency.',
      icon: Building2,
      color: 'from-[#6db99f] to-[#5aa88a]',
      link: '/services/organizational-design'
    },
    {
      id: 'job-analysis',
      title: 'Job Analysis & Compensation Services',
      description: 'Data-driven job analysis and competitive compensation strategies to ensure fair pay and attract the right talent.',
      icon: Calculator,
      color: 'from-[#21446e] to-[#1a3658]',
      link: '/services/job-analysis'
    },
    {
      id: 'recruitment-retention',
      title: 'Employee Recruitment, Selection & Retention',
      description: 'End-to-end recruitment processes and retention strategies to build and maintain high-performing teams.',
      icon: UserCheck,
      color: 'from-[#6db99f] to-[#5aa88a]',
      link: '/services/recruitment-retention'
    },
    {
      id: 'performance-management',
      title: 'Performance Management',
      description: 'Comprehensive performance evaluation systems and improvement strategies to maximize employee potential.',
      icon: TrendingUp,
      color: 'from-[#21446e] to-[#1a3658]',
      link: '/services/performance-management'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#6db99f]/10 text-[#6db99f] px-4 py-2 rounded-full text-sm font-medium border border-[#6db99f]/20 mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            Our Solutions
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive HR 
            <span className="text-[#21446e]"> Solutions</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From talent acquisition to organizational development, we provide end-to-end HR solutions that drive business success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group">
                <Link 
                  to={service.link}
                  className="block h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-[#6db99f]/20"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#21446e] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-[#21446e] font-medium group-hover:text-[#6db99f] transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link 
            to="/solutions"
            className="inline-flex items-center bg-[#21446e] hover:bg-[#1a3658] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Solutions
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}; 