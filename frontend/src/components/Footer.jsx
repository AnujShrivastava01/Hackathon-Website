import React from 'react';
import { Terminal } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const BRAND = 'HackOcean';

const Footer = ({ event }) => {
  const currentYear = new Date().getFullYear();
  const title = BRAND;

  const footerLinks = [
    { title: 'Event', links: [{ name: 'Home', href: '#home' }, { name: 'About', href: '#about' }, { name: 'Agenda', href: '#agenda' }] },
    { title: 'Help', links: [{ name: 'FAQs', href: '#faqs' }, { name: 'Contact', href: '#contact' }, { name: 'Schedule', href: '#schedule' }] },
    { title: 'Legal', links: [{ name: 'Privacy', href: '#' }, { name: 'Terms', href: '#' }, { name: 'Code of conduct', href: '#' }] },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: event?.socialLinks?.twitter || '#' },
    { icon: FaLinkedin, href: event?.socialLinks?.linkedin || '#' },
    { icon: FaGithub, href: event?.socialLinks?.github || '#' },
    { icon: FaInstagram, href: event?.socialLinks?.instagram || '#' },
  ];

  return (
    <footer className="bg-bg border-t-4 border-ink pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 shrink-0 rounded-full border-[3px] border-ink bg-white p-0.5 shadow-neo-sm overflow-hidden">
                <img
                  src="/logo.png"
                  alt="HackOcean"
                  width="44"
                  height="44"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>
              <span className="text-xl font-heading uppercase tracking-widest text-ink">{title}</span>
            </div>
            <p className="max-w-sm text-ink/80 text-base leading-relaxed mb-8 font-medium">
              A neobrutalist hackathon experience — loud borders, soft landings, and room for every builder who shows up.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-11 h-11 border-2 border-ink bg-white shadow-neo-sm flex items-center justify-center text-ink hover:bg-accent hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-ink mb-6 inline-block border-b-4 border-accent pb-1">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="text-ink/75 hover:text-ink font-medium transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t-2 border-ink flex flex-col md:flex-row items-center justify-between gap-4 text-ink/70 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Terminal size={16} strokeWidth={2.5} />
            <span>
              © {currentYear} {title}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-ink hover:underline underline-offset-4">
              Security
            </a>
            <a href="#" className="hover:text-ink hover:underline underline-offset-4">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
