import React from 'react';
import { Target, Users, Zap, Briefcase, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:bg-slate-800/80 transition-smooth group"
  >
    <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-primary-400 w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{title}</h3>
    <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
  </motion.div>
);

const About = ({ event }) => {
  const features = [
    { icon: Target, title: "Industry Relevance", description: "Work on real-world challenges alongside mentors from top companies and build solutions." },
    { icon: Users, title: "Network & Connect", description: "Meet like-minded developers and designers from across the globe and form lasting bonds." },
    { icon: Zap, title: "Accelerated Learning", description: "Intense hacking followed by feedback loops and expert mentorship to supercharge your skills." },
    { icon: Briefcase, title: "Career Opportunities", description: "Sponsors are always looking for top talent. Showcase your work to potential recruiters." },
    { icon: Award, title: "Recognition & Prizes", description: "Compete for substantial prizes while showcasing your innovation and craftsmanship." },
    { icon: Globe, title: "Impact & Community", description: "Join a growing community focused on solving tomorrow's problems today through technology." },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-20 max-w-4xl">
           <span className="text-xs font-black tracking-[0.2em] uppercase text-primary-500 mb-4 block">The Mission</span>
           <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.15]">
             More Than Just A Code Fest. <br /> It's A Showcase of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-500">Human Creativity.</span>
           </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx} 
              {...feature} 
              delay={idx * 0.15}
            />
          ))}
        </div>
        
        <div className="bg-primary-500/5 border border-primary-500/20 rounded-3xl p-12 relative overflow-hidden group">
           <div className="absolute inset-0 z-0">
             <div className="absolute ring-1 ring-primary-500/20 rounded-full w-[400px] h-[400px] blur-[80px] -top-20 -right-20"></div>
           </div>
           
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h4 className="text-3xl font-bold text-white mb-6 leading-tight">Empowering Visionaries and Builders to Shape the Future.</h4>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  The {event?.name} is designed to provide an open environment where you can prototype ideas, experiment with new technologies, and receive guidance from experts.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500/10 rounded flex items-center justify-center">
                       <Zap className="text-primary-500 w-4 h-4"/>
                    </div>
                    <span className="text-slate-300 font-medium">Expert mentorship across multiple tracks.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500/10 rounded flex items-center justify-center">
                       <Award className="text-primary-500 w-4 h-4"/>
                    </div>
                    <span className="text-slate-300 font-medium">Global recognition for innovative solutions.</span>
                  </div>
                   <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500/10 rounded flex items-center justify-center">
                       <Users className="text-primary-500 w-4 h-4"/>
                    </div>
                    <span className="text-slate-300 font-medium">Networking with top-tier companies and mentors.</span>
                  </div>
                </div>
             </div>
             
             <div className="relative flex justify-center">
                <div className="w-64 h-64 bg-slate-800 rounded-3xl border border-white/5 flex flex-col items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-smooth">
                   <span className="text-primary-500 text-6xl font-black mb-2 tracking-tighter">48h</span>
                   <span className="text-slate-400 uppercase font-black tracking-widest text-sm">Of Intensive Code</span>
                </div>
                {/* Visual Accent */}
                <div className="absolute -top-10 -left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl border border-white/5 animate-bounce"></div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
