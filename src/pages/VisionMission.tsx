import React from 'react';
import { Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#21446e] via-[#6db99f] to-[#21446e] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Vision, Mission & Values</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Driving organizational success through innovative HR solutions and unwavering commitment to excellence
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#6db99f] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To be the leading HR advisory firm in Tanzania and East Africa, recognized for our innovative approach to talent management and our commitment to building sustainable, high-performing organizations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where every organization has access to world-class HR solutions that drive growth, foster innovation, and create meaningful work environments where people thrive and businesses flourish.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="bg-[#21446e] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Vision Statement</h3>
                <p className="text-gray-600 italic">
                  "Empowering organizations to achieve their full potential through strategic HR excellence and innovative talent solutions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="bg-[#6db99f] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Mission Statement</h3>
                <p className="text-gray-600 italic">
                  "To provide comprehensive HR solutions that enable organizations to attract, develop, and retain top talent while fostering a culture of excellence and continuous improvement."
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#21446e] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We are committed to delivering exceptional HR services that address the unique challenges faced by modern businesses in Tanzania and beyond.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#6db99f] w-6 h-6 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <p className="text-gray-600">Simplify complex talent management processes</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#6db99f] w-6 h-6 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <p className="text-gray-600">Build high-performing, engaged teams</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#6db99f] w-6 h-6 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <p className="text-gray-600">Align HR strategies with business objectives</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#6db99f] w-6 h-6 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <p className="text-gray-600">Support organizational growth and evolution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our relationships with clients, partners, and each other
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#21446e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, delivering exceptional quality and exceeding expectations in all our services and interactions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#6db99f] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with the highest ethical standards, maintaining transparency, honesty, and trust in all our relationships.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#21446e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and innovation, continuously developing new approaches and solutions to meet evolving business needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#6db99f] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Partnership</h3>
              <p className="text-gray-600">
                We build lasting partnerships with our clients, working collaboratively to understand their unique challenges and deliver tailored solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#21446e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Results-Driven</h3>
              <p className="text-gray-600">
                We focus on delivering measurable outcomes and tangible results that contribute to our clients' success and growth.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#6db99f] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Empathy</h3>
              <p className="text-gray-600">
                We approach our work with empathy and understanding, recognizing the human element in every HR decision and organizational challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#21446e] via-[#6db99f] to-[#21446e] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your HR Strategy?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Let's work together to build the workforce that drives your success
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-[#21446e] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a 
              href="/solutions" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#21446e] transition-colors"
            >
              Explore Our Solutions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission; 