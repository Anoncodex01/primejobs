import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';

const navigation = [
  { name: 'Posted Today', href: '/find-job?filter=today' },
  { name: 'Posted Yesterday', href: '/find-job?filter=yesterday' },
  { name: 'Posted in the Last Week (Last 7 days)', href: '/find-job?filter=week' },
  { name: 'Posted in the Last Month (Last 30 days)', href: '/find-job?filter=month' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Telegram', icon: Send, href: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#114373] text-white relative overflow-hidden">
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
        {/* Top Section - Job Posting Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-[#4ebf9e] transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Bottom Section - Service Information and Copyright */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Service Provider Information */}
          <div className="space-y-4">
            <p className="text-white/80 text-sm font-medium">Service provided by</p>
            <div className="flex items-start gap-4">
              {/* Axia HR Advisory Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <span className="text-[#114373] font-bold text-lg">A</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Axia HR Advisory</div>
                  <div className="text-white/70 text-sm">Recruitment | HR Solutions | Advisory</div>
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Axia HR Advisory provides end-to-end recruitment management solutions, 
              streamlining candidate applications, interview processes, placement tracking, 
              and invoice management for businesses.
            </p>
          </div>

          {/* Right Side - Social Media and Copyright */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
            
            {/* Axia HR Advisory Logo and Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-[#114373] font-bold text-lg">A</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Axia HR Advisory</div>
                <div className="text-white/70 text-sm">HR Solutions | Advisory | Management</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">© 2025 all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 