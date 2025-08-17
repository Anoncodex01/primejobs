import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  FileText, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Solutions = () => {
  const services = [
    {
      icon: Users,
      title: "Talent Acquisition",
      description: "Strategic recruitment and hiring solutions to find the perfect candidates for your organization.",
      features: [
        "Executive search and leadership hiring",
        "Mass recruitment campaigns",
        "Candidate screening and assessment",
        "Employer branding strategies",
        "Recruitment process optimization"
      ],
      link: "/services/talent-acquisition",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Performance Management",
      description: "Comprehensive KPI systems and evaluation frameworks to drive optimal performance.",
      features: [
        "Performance appraisal systems",
        "KPI development and tracking",
        "360-degree feedback programs",
        "Performance improvement plans",
        "Recognition and reward systems"
      ],
      link: "/services/performance-management",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Training & Development",
      description: "Customized learning and skill development programs to enhance employee capabilities.",
      features: [
        "Leadership development programs",
        "Technical skills training",
        "Soft skills workshops",
        "E-learning platform solutions",
        "Training needs assessment"
      ],
      link: "/services/training-development",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Organizational Design",
      description: "Strategic structure optimization and process improvement for enhanced efficiency.",
      features: [
        "Organizational structure analysis",
        "Process optimization",
        "Change management support",
        "Workforce planning",
        "Strategic HR planning"
      ],
      link: "/services/organizational-design",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "Job Analysis & Compensation",
      description: "Comprehensive salary analysis and benefits optimization for competitive positioning.",
      features: [
        "Job description development",
        "Salary benchmarking",
        "Compensation structure design",
        "Benefits package optimization",
        "Pay equity analysis"
      ],
      link: "/services/job-analysis",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Visa & Permit Processing",
      description: "Streamlined immigration and work permit services for international talent.",
      features: [
        "Work permit applications",
        "Visa processing support",
        "Immigration compliance",
        "Document preparation",
        "Legal consultation"
      ],
      link: "/services/visa-permits",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#21446e] via-[#6db99f] to-[#21446e] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our HR Solutions</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive HR services designed to transform your organization's talent management strategy and drive sustainable growth
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-12 h-12" />
                    <Link 
                      to={service.link}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90">{service.description}</p>
                </div>
                
                <div className="p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={service.link}
                    className="inline-flex items-center mt-6 text-[#21446e] font-semibold hover:text-[#6db99f] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Axia HR?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring a unique combination of expertise, innovation, and local market knowledge to deliver exceptional HR solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#6db99f] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Local Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Tanzania's business landscape, labor laws, and cultural nuances to provide relevant solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#21446e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Proven Track Record</h3>
              <p className="text-gray-600">
                Successfully supported diverse industry sectors with measurable results and long-term partnerships.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#6db99f] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Tailored Solutions</h3>
              <p className="text-gray-600">
                Customized approaches that align with your specific business goals, culture, and organizational needs.
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
            Let's discuss how our solutions can help you build a high-performing workforce and achieve your business objectives
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-[#21446e] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation
            </a>
            <a 
              href="/about" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#21446e] transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions; 