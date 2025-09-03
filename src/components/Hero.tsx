import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, TrendingUp, Shield, CheckCircle } from 'lucide-react';

export const Hero: FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#6db99f]/10 via-transparent to-[#21446e]/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#21446e] rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#6db99f] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#21446e] rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center space-y-8">
          
        

          {/* Main Heading */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Your Strategic HR</span>
              <br />
              <span className="text-[#21446e]">Recruitment Partner</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Connecting exceptional talent with leading organizations across Tanzania. We specialize in strategic recruitment and HR advisory services that drive business success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/candidate/register"
              className="bg-[#21446e] hover:bg-[#1a3658] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Your CV
            </Link>
            <Link 
              to="/employer/login"
              className="border-2 border-[#21446e] text-[#21446e] hover:bg-[#21446e] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Hire Talent
            </Link>
          </div>

          {/* Video */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video 
                src="/video/interview.mp4" 
                className="w-full h-[500px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-sm rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
      </div>
    </div>
  );
};
