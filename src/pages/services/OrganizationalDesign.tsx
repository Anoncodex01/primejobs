import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';

const OrganizationalDesign: FC = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-900" />
              </div>
              <span className="text-orange-200 font-medium">Organizational Design</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Organizational
              <span className="text-orange-300 block">Design</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Strategic organizational structure and planning to optimize your business 
              operations and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-orange-900 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Organizational Design Services
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            This page is under development. Our comprehensive organizational design services 
            will be available soon.
          </p>
          <Link
            to="/contact"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Contact Us for More Information
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrganizationalDesign; 