import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Target, ArrowRight } from 'lucide-react';

export const WhyChooseUs: FC = () => {
  const features = [
    {
      id: 'local-expertise',
      title: 'Local Expertise',
      description: 'Deep understanding of Tanzania\'s business landscape, labor laws, and cultural nuances to provide relevant solutions.',
      icon: Star,
      color: 'from-[#6db99f] to-[#5aa88a]'
    },
    {
      id: 'proven-track-record',
      title: 'Proven Track Record',
      description: 'Successfully supported diverse industry sectors with measurable results and long-term partnerships.',
      icon: Users,
      color: 'from-[#21446e] to-[#1a3658]'
    },
    {
      id: 'tailored-solutions',
      title: 'Tailored Solutions',
      description: 'Customized approaches that align with your specific business goals, culture, and organizational needs.',
      icon: Target,
      color: 'from-[#6db99f] to-[#5aa88a]'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose 
            <span className="text-[#21446e]"> Axia HR?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bring a unique combination of expertise, innovation, and local market knowledge to deliver exceptional HR solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="text-center group">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 