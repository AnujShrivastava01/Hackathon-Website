import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Terminal } from 'lucide-react';
import HeroUnderwater from './HeroUnderwater';
import { REGISTRATION_URL } from '../constants';

const BRAND = 'HackOcean';

const Hero = ({ event }) => {
  const registerHref = REGISTRATION_URL;
  const title = event?.name || BRAND;
  const parts = title.trim().split(/\s+/);
  const lastWord = parts.length > 1 ? parts[parts.length - 1] : null;
  const leadWords = parts.length > 1 ? parts.slice(0, -1).join(' ') : null;

  return (
    <section id="home" className="relative flex flex-col min-h-screen overflow-x-hidden pt-24 pb-0">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-24 left-[8%] w-16 h-16 rounded-full bg-highlight-pink border-[3px] border-ink shadow-neo-sm -rotate-6" />
        <div className="absolute bottom-[38%] left-[12%] w-12 h-12 bg-highlight-purple border-[3px] border-ink shadow-neo-sm rotate-12 hidden sm:block" />
        <div className="absolute top-40 right-[5%] w-20 h-10 bg-highlight-yellow border-[3px] border-ink shadow-neo-sm rotate-3" />
        <div className="absolute top-1/2 right-[20%] w-24 h-24 rounded-full bg-highlight-blue/80 border-[3px] border-ink shadow-neo -rotate-12 hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white border-[3px] border-highlight-teal shadow-neo-sm">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-ink">
                Build · Ship · Celebrate
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-ink mb-6 leading-[1.05]">
              {lastWord ? (
                <>
                  <span className="mr-2 sm:mr-3">{leadWords}</span>
                  <span className="inline-block mt-2 sm:mt-0 px-3 py-1 bg-accent border-[3px] border-ink shadow-neo align-middle">
                    {lastWord}
                  </span>
                </>
              ) : (
                <span className="inline-block px-3 py-1 bg-accent border-[3px] border-ink shadow-neo">
                  {title}
                </span>
              )}
            </h1>

            <p className="max-w-xl text-lg text-ink/85 mb-10 leading-relaxed font-medium border-l-4 border-ink pl-4">
              {event?.description ||
                'Dive into 48 hours of building, mentorship, and community. HackOcean is where ideas meet execution — bold borders, bolder ideas.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={registerHref}
                className="btn-neo text-base !py-4 px-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register now
                <ArrowRight size={20} strokeWidth={2.5} />
              </a>
              <a href="#about" className="btn-neo-secondary text-base !py-4 px-8">
                Learn more
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute -bottom-4 -left-4 w-40 h-24 bg-highlight-blue/90 border-[3px] border-ink rounded-full shadow-neo -z-10 hidden sm:block" />
            <div className="relative w-full max-w-md bg-highlight-teal border-[3px] border-ink shadow-neo-lg p-4 pb-8">
              <div className="absolute -top-2 -right-2 w-14 h-8 bg-accent border-[3px] border-ink shadow-neo-sm rotate-6 z-10" />
              <div className="bg-white border-2 border-ink aspect-[4/3] flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="flex gap-3 text-ink">
                  <Code size={36} strokeWidth={2.5} />
                  <Cpu size={36} strokeWidth={2.5} />
                  <Terminal size={36} strokeWidth={2.5} />
                </div>
                <p className="font-heading text-2xl sm:text-3xl text-center px-4">{title}</p>
                <div className="w-full h-12 flex items-end justify-center gap-1 px-8 bg-bg/80 border-t-2 border-ink">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-6 border-2 border-ink ${i === 2 ? 'bg-accent' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center mt-3 text-xs font-bold uppercase tracking-widest text-ink">
                Your hack starts here
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <HeroUnderwater />
    </section>
  );
};

export default Hero;
