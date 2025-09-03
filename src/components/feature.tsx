import { FC } from 'react';
import { Link } from 'react-router-dom';

interface JobListing {
  title: string;
  location: string;
  postedDays: number;
}

interface CompanyCard {
  id: number;
  name: string;
  logo: string;
  description: string;
  category: string;
  employeeCount: string;
  headquarters: string;
  jobs: JobListing[];
}

export const JobCategories: FC = () => {
  const companies: CompanyCard[] = [
    {
      id: 1,
      name: "Apple",
      logo: "/company-logos/apple-14.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Technology",
      employeeCount: "10,001+ employees",
      headquarters: "Cupertino, California",
      jobs: [
        {
          title: "Software Engineer",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 8
        },
        {
          title: "Product Manager",
          location: "Arusha, Arusha",
          postedDays: 5
        },
        {
          title: "UI/UX Designer",
          location: "Kahama, Kahama",
          postedDays: 2
        }
      ]
    },
    {
      id: 2,
      name: "Spotify",
      logo: "/company-logos/spotify-2.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Entertainment",
      employeeCount: "10,001+ employees",
      headquarters: "Stockholm, Sweden",
      jobs: [
        {
          title: "Frontend Developer",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 13
        },
        {
          title: "Backend Engineer",
          location: "Mwanza, Mwanza",
          postedDays: 13
        },
        {
          title: "Data Scientist",
          location: "Mwanza, Mwanza",
          postedDays: 13
        }
      ]
    },
    {
      id: 3,
      name: "Slack",
      logo: "/company-logos/slack-new-logo.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Communication",
      employeeCount: "1,001-5,000 employees",
      headquarters: "San Francisco, CA",
      jobs: [
        {
          title: "DevOps Engineer",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 8
        },
        {
          title: "Sales Manager",
          location: "Lake Zone, Lake Zone",
          postedDays: 8
        },
        {
          title: "Customer Success Manager",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 2
        }
      ]
    },
    {
      id: 4,
      name: "Amazon Web Services",
      logo: "/company-logos/amazon-web-services-2.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Cloud Computing",
      employeeCount: "10,001+ employees",
      headquarters: "Seattle, Washington",
      jobs: [
        {
          title: "Cloud Architect",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 6
        },
        {
          title: "Solutions Engineer",
          location: "Arusha, Arusha",
          postedDays: 4
        },
        {
          title: "Security Specialist",
          location: "Kahama, Kahama",
          postedDays: 1
        }
      ]
    },
    {
      id: 5,
      name: "Udemy",
      logo: "/company-logos/udemy-2.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Education",
      employeeCount: "1,001-5,000 employees",
      headquarters: "San Francisco, CA",
      jobs: [
        {
          title: "Content Creator",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 10
        },
        {
          title: "Learning Designer",
          location: "Mwanza, Mwanza",
          postedDays: 7
        },
        {
          title: "Course Instructor",
          location: "Lake Zone, Lake Zone",
          postedDays: 3
        }
      ]
    },
    {
      id: 6,
      name: "MTN",
      logo: "/company-logos/mtn-new-logo.svg",
      description: "Leading technology solutions provider in Tanzania",
      category: "Telecommunications",
      employeeCount: "10,001+ employees",
      headquarters: "Johannesburg, South Africa",
      jobs: [
        {
          title: "Network Engineer",
          location: "Dar es Salaam, Dar es Salaam",
          postedDays: 9
        },
        {
          title: "Mobile Developer",
          location: "Arusha, Arusha",
          postedDays: 6
        },
        {
          title: "Business Analyst",
          location: "Kahama, Kahama",
          postedDays: 4
        }
      ]
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20" />
      
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#114373]/10 text-[#114373] rounded-full text-sm font-medium mb-4">
              ✨ Featured Companies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top companies actively hiring
            </h2>
            
          </div>

          {/* Companies Grid */}
          <div className="max-w-6xl mx-auto">

            {/* Companies Grid - Two Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {companies.map((company, index) => (
                <div 
                  key={company.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Company Logo and Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {company.description}
                      </p>
                    </div>
                  </div>

                  {/* Company Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {company.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {company.employeeCount}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {company.headquarters}
                    </span>
                  </div>

                  {/* Job Listings */}
                  <div className="space-y-3 mb-6">
                    {company.jobs.map((job, jobIndex) => (
                      <div key={jobIndex} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="text-[#114373] font-medium text-sm mb-1">
                          {job.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {job.location} • Posted {job.postedDays} days ago
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Profile Button */}
                  <Link 
                    to={`/company/${company.id}`}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium block text-center"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* View All Companies Button */}
          <div className="text-center mt-16">
            <Link 
              to="/companies"
              className="inline-block border-2 border-[#114373] text-[#114373] px-10 py-4 rounded-xl hover:bg-[#114373]/5 transition-all duration-200 font-semibold text-lg hover:shadow-lg"
            >
              View all companies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};