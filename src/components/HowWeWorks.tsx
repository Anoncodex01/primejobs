import { UserPlus, ShieldCheck, Ban } from 'lucide-react';

interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
    title: "Authenticity",
    description: "Access only genuine job listings from trusted employers"
  },
  {
    icon: <Ban className="w-7 h-7 text-white" />,
    title: "Ad-Free",
    description: "Enjoy a clean, distraction-free job search experience"
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
    title: "Fraud-Free",
    description: "Apply with confidence, knowing all job posts are verified and safe"
  }
];

const StepCard = ({ step, index }: { step: Step; index: number }) => (
  <div className="flex flex-col items-center text-center group relative">
    {/* Icon container with gradient and number indicator */}
    <div className="relative">
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium z-10">
        {index + 1}
      </div>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#002bff] to-[#00ffff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {step.icon}
      </div>
    </div>

    {/* Text content */}
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      {step.title}
    </h3>
    <p className="text-gray-600 text-lg max-w-sm">
      {step.description}
    </p>
  </div>
);

export const HowWeWorks = () => {
  return (
    <div className="w-full bg-gray-50/80">
      {/* Background Decorations */}
      <div className="absolute left-0 w-full h-full">
        <div className="absolute top-0 left-1/3 w-[60rem] h-[60rem] bg-gradient-to-r from-[#002bff]/5 to-[#00ffff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[60rem] h-[60rem] bg-gradient-to-r from-[#002bff]/5 to-[#00ffff]/5 rounded-full blur-3xl" />
      </div>

      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">
            Connecting talent to opportunities, authentically and safely providing employers and job seekers a trusted space to connect

</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#002bff] to-[#00ffff] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};