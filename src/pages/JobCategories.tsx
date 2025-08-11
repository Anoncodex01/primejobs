import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import {
  Monitor,
  Briefcase,
  Lightbulb,
  Network,
  Settings,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface JobCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  jobCount: number;
  color: string;
}

const JobCategories: FC = () => {
  const categories: JobCategory[] = [
    {
      id: 1,
      name: 'IT/Computer',
      icon: <Monitor className="w-6 h-6" />,
      jobCount: 48,
      color: 'bg-[#114373]'
    },
    {
      id: 2,
      name: 'Financial Associate',
      icon: <Briefcase className="w-6 h-6" />,
      jobCount: 36,
      color: 'bg-[#4ebf9e]'
    },
    {
      id: 3,
      name: 'Advertising / Media',
      icon: <Lightbulb className="w-6 h-6" />,
      jobCount: 52,
      color: 'bg-[#114373]'
    },
    {
      id: 4,
      name: 'Office Executive',
      icon: <Network className="w-6 h-6" />,
      jobCount: 16,
      color: 'bg-[#4ebf9e]'
    },
    {
      id: 5,
      name: 'Engineer/ Architect',
      icon: <Settings className="w-6 h-6" />,
      jobCount: 28,
      color: 'bg-[#114373]'
    },
    {
      id: 6,
      name: 'Garments',
      icon: <TrendingUp className="w-6 h-6" />,
      jobCount: 85,
      color: 'bg-[#4ebf9e]'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-[#114373]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Job Categories</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Let's help you choose the category
            </h1>
            <p className="text-gray-600">
              Select a job category to explore available opportunities
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/job-search?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-[#114373]/20">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.jobCount} Jobs
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for?
            </p>
            <Link
              to="/job-search"
              className="inline-flex items-center px-6 py-3 bg-[#114373] text-white rounded-lg hover:bg-[#0d3559] transition-colors font-medium"
            >
              Browse All Jobs
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobCategories; 