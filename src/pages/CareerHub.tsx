import React from 'react';
import { ArrowRight, Calendar, User, BookOpen, TrendingUp, Users, Clock } from 'lucide-react';

const news = [
  {
    id: 1,
    image: '/careerhub-1.jpg',
    date: '4th June 2025',
    author: 'PrimeJobs Team',
    authorUrl: '#',
    tag: 'CAREER TIPS',
    title: 'Webinar: "The Future of Remote Work in Africa"',
    excerpt: 'Join us for a live webinar on remote work trends, opportunities, and challenges for African professionals.',
    link: '#',
    readTime: '5 min read'
  },
  {
    id: 2,
    image: '/careerhub-2.jpg',
    date: '21st May 2025',
    author: 'Jane Doe',
    authorUrl: '#',
    tag: 'INTERVIEW',
    title: 'How to Ace Your Next Job Interview',
    excerpt: 'Discover proven strategies and tips to stand out and succeed in your next job interview.',
    link: '#',
    readTime: '8 min read'
  },
  {
    id: 3,
    image: '/careerhub-3.jpg',
    date: '13th May 2025',
    author: 'PrimeJobs Team',
    authorUrl: '#',
    tag: 'CV WRITING',
    title: 'Crafting a Winning CV: What Employers Look For',
    excerpt: 'Learn how to create a CV that gets noticed by top employers in Tanzania and beyond.',
    link: '#',
    readTime: '6 min read'
  }
];

const latestNews = [
  'Webinar: "The Future of Remote Work in Africa"',
  'How to Ace Your Next Job Interview',
  'Crafting a Winning CV: What Employers Look For',
];

const recentBlogs = [
  '5 Ways to Boost Your Career in 2025',
  'Remote Work: Pros and Cons',
  'How to Network Effectively Online',
];

const CareerHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-32 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tips, and resources to accelerate your career growth and professional development
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#21446e]/10 to-[#6db99f]/10 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-[#21446e]/30" />
                  </div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <a href={item.authorUrl} className="text-[#21446e] hover:text-[#6db99f] transition-colors font-medium">
                          {item.author}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white text-xs font-semibold uppercase tracking-wide">
                        {item.tag}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-[#21446e] transition-colors cursor-pointer leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                    <a 
                      href={item.link} 
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#21446e] to-[#6db99f] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#21446e] to-[#6db99f] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Latest News</h3>
            </div>
            <ul className="space-y-4">
              {latestNews.map((title, idx) => (
                <li key={idx} className="group">
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className="text-gray-800 font-medium group-hover:text-[#21446e] transition-colors">
                      {title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#21446e] transition-colors" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <a href="#" className="inline-flex items-center gap-2 text-[#21446e] font-semibold hover:text-[#6db99f] transition-colors">
                More news
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6db99f] to-[#21446e] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recent Blog Posts</h3>
            </div>
            <ul className="space-y-4">
              {recentBlogs.map((title, idx) => (
                <li key={idx} className="group">
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className="text-gray-800 font-medium group-hover:text-[#21446e] transition-colors">
                      {title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#21446e] transition-colors" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <a href="#" className="inline-flex items-center gap-2 text-[#21446e] font-semibold hover:text-[#6db99f] transition-colors">
                View all posts
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CareerHub; 