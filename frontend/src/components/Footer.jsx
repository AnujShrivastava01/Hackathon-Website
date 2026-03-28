import React from 'react';
import { Terminal } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = ({ event }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Project', links: [{ name: 'Home', href: '#home' }, { name: 'About', href: '#about' }, { name: 'Agenda', href: '#agenda' }] },
    { title: 'Help', links: [{ name: 'FAQs', href: '#faqs' }, { name: 'Contact', href: '#contact' }, { name: 'Schedule', href: '#schedule' }] },
    { title: 'Company', links: [{ name: 'Privacy Policy', href: '#' }, { name: 'Terms of Service', href: '#' }, { name: 'Code of Conduct', href: '#' }] },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: event?.socialLinks?.twitter || '#' },
    { icon: FaLinkedin, href: event?.socialLinks?.linkedin || '#' },
    { icon: FaGithub, href: event?.socialLinks?.github || '#' },
    { icon: FaInstagram, href: event?.socialLinks?.instagram || '#' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                {event?.name?.charAt(0) || 'H'}
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{event?.name || 'Hackathon Portal'}</span>
            </div>
            <p className="max-w-xs text-slate-500 text-lg leading-relaxed mb-8">
              Empowering the next generation of builders, designers, and visionaries to create the future, one hack at a time.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 underline underline-offset-8 decoration-primary-500/50">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="text-slate-500 hover:text-primary-500 transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-slate-600 text-sm">
           <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Terminal size={16} />
              <span>Built with passion by &copy; {currentYear} {event?.name || 'Hackathon Team'}. All rights reserved.</span>
           </div>
           <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
