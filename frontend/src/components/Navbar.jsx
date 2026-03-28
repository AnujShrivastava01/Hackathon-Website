import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { REGISTRATION_URL } from '../constants';

const BRAND = 'HackOcean';

const Navbar = () => {
  const registerHref = REGISTRATION_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoTitle = BRAND;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 border-b-4 border-ink shadow-neo-sm py-1' : 'bg-transparent border-b-4 border-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-3 shrink-0 z-10 group">
            <div className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-full border-[3px] border-ink bg-white p-0.5 shadow-neo-sm overflow-hidden transition-all group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5">
              <img
                src="/logo.png"
                alt="HackOcean"
                width="48"
                height="48"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-ink font-heading text-xl md:text-2xl uppercase tracking-widest leading-none">
                {logoTitle}
              </span>
              <span className="text-ink font-bold text-[10px] md:text-xs uppercase tracking-widest bg-highlight-teal inline-block px-1.5 py-0.5 border-2 border-ink mt-0.5 -rotate-1 self-start shadow-neo-sm">
                Hackathon
              </span>
            </div>
          </a>

          <div className="hidden lg:flex flex-1 justify-center px-4">
            <div className="flex items-center bg-white border-[3px] border-ink shadow-neo px-1 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 xl:px-4 py-2 font-bold uppercase text-xs xl:text-sm text-ink border-2 border-transparent hover:bg-highlight-yellow hover:border-ink hover:shadow-neo-sm hover:-translate-y-0.5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 z-10">
            <a
              href={registerHref}
              className="btn-neo py-2.5 px-5 text-xs lg:text-sm whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 border-2 border-ink bg-white shadow-neo-sm text-ink"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-4 border-ink bg-white shadow-neo"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-ink font-bold uppercase block px-3 py-3 border-2 border-transparent hover:border-ink hover:bg-highlight-blue"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={registerHref}
                onClick={() => setIsOpen(false)}
                className="btn-neo w-full text-center mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
