import { FC } from 'react';
import { Code, Briefcase, PenTool, LineChart, ShoppingBag, Megaphone } from 'lucide-react';

interface CategoryCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  gradient: string;
}

export const JobCategories: FC = () => {
  const categories: CategoryCard[] = [
    {
      title: "Development",
      count: 420,
      icon: <Code className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: "Business",
      count: 230,
      icon: <Briefcase className="w-6 h-6" />,
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      title: "Design",
      count: 180,
      icon: <PenTool className="w-6 h-6" />,
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      title: "Marketing",
      count: 150,
      icon: <LineChart className="w-6 h-6" />,
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "Sales",
      count: 250,
      icon: <ShoppingBag className="w-6 h-6" />,
      gradient: "from-indigo-600 to-blue-500"
    },
    {
      title: "Advertising",
      count: 125,
      icon: <Megaphone className="w-6 h-6" />,
      gradient: "from-cyan-600 to-blue-500"
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#002bff]/10 to-[#00ffff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[#002bff]/10 to-[#00ffff]/10 rounded-full blur-3xl" />

      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Job Categories
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#002bff] to-[#00ffff] mx-auto rounded-full" />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Content */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-500">
                      {category.count} jobs available
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gradient-to-r from-[#002bff] to-[#00ffff] group-hover:rotate-12 transition-all duration-300">
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                      →
                    </span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#002bff]/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};