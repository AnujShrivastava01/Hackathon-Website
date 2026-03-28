import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { REGISTRATION_URL } from '../constants';

const BRAND = 'HackOcean';

const ContactInfo = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="w-12 h-12 bg-accent border-2 border-ink shadow-neo-sm flex items-center justify-center shrink-0">
      <Icon className="text-ink w-6 h-6" strokeWidth={2.2} />
    </div>
    <div>
      <span className="text-xs font-bold uppercase tracking-widest text-ink/60 block mb-1">{label}</span>
      <span className="text-xl font-bold text-ink uppercase">{value}</span>
    </div>
  </div>
);

const Contact = ({ event }) => {
  const registerHref = REGISTRATION_URL;
  const socialLinks = [
    { icon: FaTwitter, href: event?.socialLinks?.twitter || '#', bg: 'bg-ink' },
    { icon: FaLinkedin, href: event?.socialLinks?.linkedin || '#', bg: 'bg-highlight-blue' },
    { icon: FaGithub, href: event?.socialLinks?.github || '#', bg: 'bg-highlight-purple' },
    { icon: FaInstagram, href: event?.socialLinks?.instagram || '#', bg: 'bg-highlight-pink' },
  ];

  return (
    <section id="contact" className="section-padding bg-white border-t-4 border-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.35em] bg-highlight-teal border-2 border-ink shadow-neo-sm mb-4">
              Reach out
            </span>
            <h2 className="text-4xl md:text-7xl font-heading text-ink mb-12">Contact</h2>

            <ContactInfo icon={Mail} label="Email" value={event?.contactEmail || 'hello@hackocean.dev'} />
            <ContactInfo icon={Phone} label="Phone" value={event?.contactPhone || '+1 (555) 000-0000'} />
            <ContactInfo icon={MapPin} label="Venue" value={event?.venue || 'TBA — we will sticker the map here'} />

            <div className="flex flex-wrap gap-3 mt-10">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 ${social.bg} border-2 border-ink shadow-neo-sm flex items-center justify-center text-white hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="neo-card p-10 md:p-12 border-[3px] bg-highlight-blue relative">
            <div className="absolute -top-3 -left-3 px-3 py-1 bg-ink text-white text-[10px] font-bold uppercase tracking-widest border-2 border-ink shadow-neo-sm -rotate-2">
              {BRAND}
            </div>

            <div className="flex flex-col items-center text-center pt-4">
              <div className="flex -space-x-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full border-[3px] border-ink bg-white overflow-hidden shadow-neo-sm"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${i * 100}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-[3px] border-ink bg-accent flex items-center justify-center shadow-neo-sm font-heading text-lg text-ink">
                  +50
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-heading text-ink mb-4 normal-case tracking-wide">
                Ready to ship?
              </h3>
              <p className="text-ink/85 text-lg font-medium mb-10 max-w-sm">
                Grab a spot, bring your laptop, and make something you are proud to demo.
              </p>

              <a
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink w-full max-w-sm flex items-center justify-center gap-3 !py-4 rounded-none border-[3px]"
              >
                <span>Register for {event?.name || BRAND}</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
