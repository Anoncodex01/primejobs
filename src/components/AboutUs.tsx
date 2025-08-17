import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, TrendingUp, Shield, CheckCircle, ArrowRight, Star } from 'lucide-react';

export const AboutUs: FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="inline-flex items-center bg-[#6db99f]/10 text-[#6db99f] px-4 py-2 rounded-full text-sm font-medium border border-[#6db99f]/20 mb-6">
            <Users className="w-4 h-4 mr-2" />
            About Axia HR
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Redefining HR Solutions for 
            <span className="text-[#21446e]"> Modern Businesses</span>
          </h2>

          {/* Brief Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A proud subsidiary of RM Financial Consulting Limited, we launched in 2022 with a bold vision to transform how organizations attract, retain, and empower top talent in Tanzania and beyond.
          </p>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Recruitment</h3>
            <p className="text-gray-600">Tailored hiring solutions that align with your business objectives and culture.</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#21446e] to-[#1a3658] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Talent Management</h3>
            <p className="text-gray-600">Building high-performing teams that drive business success and growth.</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6db99f] to-[#5aa88a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">HR Advisory</h3>
            <p className="text-gray-600">Expert guidance to simplify complexities and optimize your HR processes.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#21446e] mb-2">2022</div>
              <div className="text-sm text-gray-600 font-medium">Established</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6db99f] mb-2">500+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#21446e] mb-2">98%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6db99f] mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Industries Served</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link 
            to="/about"
            className="inline-flex items-center bg-[#21446e] hover:bg-[#1a3658] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Learn More About Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}; 