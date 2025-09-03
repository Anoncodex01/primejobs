import { FC } from 'react';
import { Shield, XCircle, CheckCircle } from 'lucide-react';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const TrustFeatures: FC = () => {
  const features: FeatureCard[] = [
    {
      id: 1,
      title: "Authenticity",
      description: "Access only genuine job listings from trusted employers",
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Ad-Free",
      description: "Enjoy a clean, distraction-free job search experience",
      icon: <XCircle className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Fraud-Free",
      description: "Apply with confidence, knowing all job posts are verified and safe",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Providing employers and job seekers a trusted space to connect
          </h2>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#4ebf9e] to-[#114373] mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-[#4ebf9e] to-[#114373] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                {feature.id}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-[#4ebf9e] to-[#114373] rounded-lg flex items-center justify-center mb-4">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
       
      </div>
    </section>
  );
}; 