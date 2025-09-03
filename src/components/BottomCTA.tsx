import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export const BottomCTA: FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundImage: `url('/hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#21446e]/80 via-[#1a3658]/80 to-[#21446e]/80"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto border border-white/20">
          <div className="text-center">
            {/* Main Content */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your 
              <span className="text-[#6db99f]"> HR Strategy?</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our comprehensive HR solutions can help you build a high-performing workforce, 
              optimize your organizational structure, and achieve your business objectives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-8 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-[#21446e] hover:bg-gray-100 px-12 py-5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center text-lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                Schedule a Consultation
              </Link>
              
              <Link 
                to="/solutions"
                className="border-2 border-white text-white hover:bg-white hover:text-[#21446e] px-12 py-5 rounded-full font-semibold transition-all duration-300 flex items-center text-lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Explore Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 