import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp, Users, Building2 } from 'lucide-react';

export const News: FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'The Future of Remote Work in Tanzania',
      excerpt: 'Exploring how Tanzanian companies are adapting to hybrid work models and the impact on talent acquisition strategies.',
      category: 'Industry Insights',
      date: 'March 15, 2024',
      readTime: '5 min read',
      icon: TrendingUp,
      color: 'from-[#6db99f] to-[#5aa88a]'
    },
    {
      id: 2,
      title: 'Building Inclusive Workplaces in East Africa',
      excerpt: 'Best practices for creating diverse and inclusive work environments that drive innovation and business success.',
      category: 'Diversity & Inclusion',
      date: 'March 12, 2024',
      readTime: '4 min read',
      icon: Users,
      color: 'from-[#21446e] to-[#1a3658]'
    },
    {
      id: 3,
      title: 'Strategic HR Planning for Business Growth',
      excerpt: 'How organizations can align their HR strategies with business objectives to achieve sustainable growth.',
      category: 'Strategic HR',
      date: 'March 10, 2024',
      readTime: '6 min read',
      icon: Building2,
      color: 'from-[#6db99f] to-[#5aa88a]'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest 
            <span className="text-[#21446e]"> Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in HR and talent management.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <article key={item.id} className="group">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="/hero.jpg" 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-[#6db99f]">{item.category}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#21446e] transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.readTime}</span>
                      <div className="flex items-center text-[#21446e] font-medium group-hover:text-[#6db99f] transition-colors duration-300">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center bg-[#21446e] hover:bg-[#1a3658] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}; 