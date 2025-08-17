import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Partners: FC = () => {
  const partners = [
    { name: 'Amazon Web Services', logo: '/company-logos/amazon-web-services-2.svg' },
    { name: 'Apple', logo: '/company-logos/apple-14.svg' },
    { name: 'CNBC', logo: '/company-logos/cnbc-1.svg' },
    { name: 'CRDB Bank', logo: '/company-logos/crdb-bank.svg' },
    { name: 'Facebook', logo: '/company-logos/facebook-2020-1-1.svg' },
    { name: 'Fiverr', logo: '/company-logos/fiverr-1.svg' },
    { name: 'Forbes', logo: '/company-logos/forbes-2.svg' },
    { name: 'Grab', logo: '/company-logos/grab-2.svg' },
    { name: 'MTN', logo: '/company-logos/mtn-new-logo.svg' },
    { name: 'Slack', logo: '/company-logos/slack-new-logo.svg' },
    { name: 'Spotify', logo: '/company-logos/spotify-2.svg' },
    { name: 'Tesla', logo: '/tesla.svg' },
    { name: 'Udemy', logo: '/company-logos/udemy-2.svg' },
    { name: 'Viber', logo: '/company-logos/viber-icon.svg' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our 
            <span className="text-[#21446e]"> Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Trusted by leading companies across various industries worldwide
          </p>
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 bg-[#21446e] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1a3658] transition-colors"
          >
            View All Companies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center mb-12">
          {partners.map((partner, index) => (
            <Link 
              key={partner.name} 
              to="/companies"
              className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-12 w-auto max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for Your Next Career Move?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore opportunities with our partner companies and discover your perfect role
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/companies"
                className="bg-[#21446e] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1a3658] transition-colors flex items-center justify-center gap-2"
              >
                Browse Companies
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/find-job"
                className="border-2 border-[#21446e] text-[#21446e] px-8 py-3 rounded-xl font-semibold hover:bg-[#21446e] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Find Jobs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 