import { FC } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor,
  Briefcase,
  Lightbulb,
  Users,
  Settings,
  TrendingUp,
  Mail,
  Network
} from 'lucide-react';

interface CategoryCard {
  id: number;
  title: string;
  jobCount: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export const JobCategories: FC = () => {
  const categories: CategoryCard[] = [
    {
      id: 1,
      title: "IT/Computer",
      jobCount: 48,
      icon: <Mail className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#114373]"
    },
    {
      id: 2,
      title: "Financial Associate",
      jobCount: 36,
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#4ebf9e]"
    },
    {
      id: 3,
      title: "Advertising / Media",
      jobCount: 52,
      icon: <Lightbulb className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#114373]"
    },
    {
      id: 4,
      title: "Office Executive",
      jobCount: 16,
      icon: <Network className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#4ebf9e]"
    },
    {
      id: 5,
      title: "Engineer/ Architect",
      jobCount: 28,
      icon: <Settings className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#114373]"
    },
    {
      id: 6,
      title: "Garments",
      jobCount: 85,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-white",
      bgColor: "bg-[#4ebf9e]"
    }
  ];

  return (
    <div className="relative w-full bg-white">
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's help you choose the category
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/job-search?category=${encodeURIComponent(category.title)}`}
                className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
              >
                {/* Category Icon */}
                <div className={`flex items-center justify-center w-10 h-10 ${category.bgColor} rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>

                {/* Category Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {category.title}
                </h3>

                {/* Job Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-normal text-gray-500">
                    {category.jobCount} Jobs
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 