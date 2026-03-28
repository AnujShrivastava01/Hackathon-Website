import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactInfo = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-4 mb-8">
    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-primary-500/20 transition-smooth">
      <Icon className="text-primary-400 w-6 h-6" />
    </div>
    <div className="flex flex-col">
       <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</span>
       <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors uppercase">{value}</span>
    </div>
  </div>
);

const Contact = ({ event }) => {
  const socialLinks = [
    { icon: FaTwitter, href: event?.socialLinks?.twitter || '#' },
    { icon: FaLinkedin, href: event?.socialLinks?.linkedin || '#' },
    { icon: FaGithub, href: event?.socialLinks?.github || '#' },
    { icon: FaInstagram, href: event?.socialLinks?.instagram || '#' },
  ];

  return (
    <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
       {/* Visual Accent */}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
             
             <div className="flex flex-col">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-primary-500 mb-4 block">Get In Touch</span>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-12">Contact Us.</h2>
                
                <ContactInfo icon={Mail} label="Email Address" value={event?.contactEmail || 'hackathon@example.com'} />
                <ContactInfo icon={Phone} label="Contact Phone" value={event?.contactPhone || '+1 (555) 000-0000'} />
                <ContactInfo icon={MapPin} label="Event Venue" value={event?.venue || 'Silicon Valley, CA'} />

                <div className="flex items-center space-x-6 mt-12 mb-12 md:mb-0">
                   {socialLinks.map((social, idx) => (
                     <a 
                       key={idx} 
                       href={social.href} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all transform hover:scale-110 active:scale-95 duration-200"
                     >
                       <social.icon size={20} />
                     </a>
                   ))}
                </div>
             </div>

             <div className="bg-slate-900 border border-white/10 p-12 rounded-3xl relative overflow-hidden group">
                {/* Visual Glass Effect Background */}
                <div className="absolute inset-0 z-0 bg-primary-500/5 blur-[80px] -right-20 -bottom-20 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
                    <div className="flex -space-x-4 mb-8">
                       {[1,2,3,4].map((i) => (
                         <div key={i} className="w-16 h-16 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-xl ring-2 ring-primary-500/20">
                            <img src={`https://i.pravatar.cc/150?u=${i*100}`} alt="Hacker" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                       ))}
                       <div className="w-16 h-16 rounded-full border-4 border-slate-900 bg-primary-500 flex items-center justify-center shadow-xl ring-2 ring-primary-500/20 text-white font-black text-sm">
                          +50
                       </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">Ready to Make Your Mark?</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm mx-auto">
                       Join our community of over 500+ developers and start your journey today.
                    </p>

                    <a 
                       href={event?.registrationLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="btn-primary w-full max-w-sm flex items-center justify-center space-x-3 !py-4"
                    >
                       <span>Register For Event</span>
                       <ArrowRight size={20}/>
                    </a>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};

export default Contact;
