import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu } from 'lucide-react';

const Hero = ({ event }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Dynamic Background Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-primary-500/20 blur-[120px] rounded-full top-[-10%] right-[-10%] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full bottom-[-10%] left-[-10%]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 text-sm font-medium text-primary-400">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
            <span>Registration for {event?.name || 'Hackathon'} Is Now Live!</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
            {event?.name || 'INNOVATE THE FUTURE'}
          </h1>
          
          <p className="max-w-2xl text-xl text-slate-400 mb-10 leading-relaxed mx-auto">
            {event?.description || 'Build, innovate, and create the next big thing. Join developers, designers, and visionaries for 48 hours of intense hacking and collaboration.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href={event?.registrationLink} 
              className="btn-primary text-lg !py-4 px-10 shadow-lg shadow-primary-500/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
            <a 
              href="#about" 
              className="btn-outline text-lg !py-4 px-10"
            >
              Learn More
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
             <div className="flex items-center space-x-2">
               <Code size={20} className="text-primary-500"/>
               <span className="text-sm font-semibold tracking-wider uppercase">Code</span>
             </div>
             <div className="flex items-center space-x-2">
               <Cpu size={20} className="text-primary-500"/>
               <span className="text-sm font-semibold tracking-wider uppercase">Future</span>
             </div>
             <div className="flex items-center space-x-2">
               <Terminal size={20} className="text-primary-500"/>
               <span className="text-sm font-semibold tracking-wider uppercase">Terminal</span>
             </div>
              <div className="flex items-center space-x-2">
               <Terminal size={20} className="text-primary-500"/>
               <span className="text-sm font-semibold tracking-wider uppercase">Creativity</span>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Smooth transition to next section */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-40">
        <span className="text-xs font-bold tracking-widest uppercase mb-4">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
