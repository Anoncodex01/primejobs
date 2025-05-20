import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';

const navigation = [
  { name: 'Posted Today', href: '/find-job?filter=today' },
  { name: 'Posted Yesterday', href: '/find-job?filter=yesterday' },
  { name: 'Posted in the Last Week (Last 7 days)', href: '/find-job?filter=week' },
  { name: 'Posted in the Last Month (Last 30 days)', href: '/find-job?filter=month' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/primejobstz' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/primejobtz/' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/primejobstz' },
  { name: 'Telegram', icon: Send, href: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-blue-100 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Service Provider Info */}
          <div className="space-y-4">
            <p className="text-blue-200 text-sm">Service provided by</p>
            <div className="flex items-center gap-4">
              <img src="/primejobs.png" alt="Prime Expertise" className="h-10" />
              <p className="text-sm text-blue-100">
                PrimeJobs is currently hosted by Prime Expertise. As we grow and evolve, 
                we look forward to establishing ourselves as an independent platform 
                dedicated to connecting talent with opportunities.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <img src="/primeexpert.png" alt="ReliefWeb" className="h-10" />
              <p className="text-sm text-blue-200">© 2025 all rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 