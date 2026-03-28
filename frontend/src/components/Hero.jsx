import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroUnderwater from './HeroUnderwater';
import { DEFAULT_HERO_CAROUSEL, resolveRegistrationHref } from '../constants';

const BRAND = 'HackOcean';

const AUTO_MS = 6000;

const Hero = ({ event }) => {
  const registerHref = resolveRegistrationHref(event);
  const title = event?.name || BRAND;
  const parts = title.trim().split(/\s+/);
  const lastWord = parts.length > 1 ? parts[parts.length - 1] : null;
  const leadWords = parts.length > 1 ? parts.slice(0, -1).join(' ') : null;

  const slides = useMemo(() => {
    const raw = event?.heroCarousel;
    let list = Array.isArray(raw) && raw.length > 0 ? raw : DEFAULT_HERO_CAROUSEL;
    const mapped = list
      .filter((s) => s?.url && String(s.url).trim())
      .map((s, i) => ({
        key: `${s.url}-${i}`,
        url: String(s.url).trim(),
        caption: (s.caption && String(s.caption).trim()) || '',
      }));
    return mapped.length > 0 ? mapped : DEFAULT_HERO_CAROUSEL.filter((s) => s?.url).map((s, i) => ({
      key: `${s.url}-${i}`,
      url: String(s.url).trim(),
      caption: (s.caption && String(s.caption).trim()) || '',
    }));
  }, [event?.heroCarousel]);

  const [index, setIndex] = useState(0);
  const len = Math.max(slides.length, 1);

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len]
  );

  useEffect(() => {
    setIndex((i) => (i >= slides.length ? 0 : i));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [go, slides.length]);

  const slide = slides[index] || slides[0];

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-x-hidden pb-0 pt-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[8%] top-24 -rotate-6 h-10 w-10 rounded-full border-[3px] border-ink bg-highlight-pink shadow-neo-sm sm:h-12 sm:w-12" />
        <div className="absolute bottom-[38%] left-[12%] hidden h-9 w-9 rotate-12 border-[3px] border-ink bg-highlight-purple shadow-neo-sm sm:block" />
        <div className="absolute right-[5%] top-40 h-7 w-14 rotate-3 border-[3px] border-ink bg-highlight-yellow shadow-neo-sm sm:h-8 sm:w-16" />
        <div className="absolute right-[20%] top-1/2 -rotate-12 hidden h-14 w-14 rounded-full border-[3px] border-ink bg-highlight-blue/75 shadow-neo sm:block lg:h-16 lg:w-16" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-block border-[3px] border-highlight-teal bg-white px-4 py-2 shadow-neo-sm">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-ink md:text-sm">Build · Ship · Celebrate</span>
            </div>

            <h1 className="mb-6 font-heading text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              {lastWord ? (
                <>
                  <span className="mr-2 sm:mr-3">{leadWords}</span>
                  <span className="mt-2 inline-block border-[3px] border-ink bg-accent px-3 py-1 align-middle shadow-neo sm:mt-0">
                    {lastWord}
                  </span>
                </>
              ) : (
                <span className="inline-block border-[3px] border-ink bg-accent px-3 py-1 shadow-neo">{title}</span>
              )}
            </h1>

            <p className="mb-10 max-w-xl border-l-4 border-ink pl-4 text-lg font-medium leading-relaxed text-ink/85">
              {event?.description ||
                'Dive into 48 hours of building, mentorship, and community. HackOcean is where ideas meet execution — bold borders, bolder ideas.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href={registerHref} className="btn-neo !py-4 px-8 text-base" target="_blank" rel="noopener noreferrer">
                Register now
                <ArrowRight size={20} strokeWidth={2.5} />
              </a>
              <a href="#about" className="btn-neo-secondary !py-4 px-8 text-base">
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
            {/* Reduced backdrop shapes */}
            <div className="absolute -bottom-2 -left-2 -z-10 hidden h-14 w-24 rounded-full border-[3px] border-ink bg-highlight-blue/85 shadow-neo sm:block" />
            <div className="relative w-full max-w-md border-[3px] border-ink bg-highlight-teal pb-6 pl-3 pr-3 pt-3 shadow-neo-lg sm:pb-7 sm:pl-4 sm:pr-4 sm:pt-4">
              <div className="absolute -right-1 -top-1 z-10 h-5 w-10 rotate-6 border-2 border-ink bg-accent shadow-neo-sm sm:h-6 sm:w-11" />

              <div className="relative flex min-h-[260px] flex-col overflow-hidden border-2 border-ink bg-white sm:min-h-[300px]">
                <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-bg/60 px-2 py-1.5 sm:px-3 sm:py-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink shadow-neo-sm transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:h-9 sm:w-9"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>
                  <span className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-ink/70">
                    {index + 1} / {slides.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink shadow-neo-sm transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:h-9 sm:w-9"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="relative min-h-[200px] flex-1 bg-ink/[0.04] sm:min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {slide && (
                      <motion.div
                        key={slide.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={slide.url}
                          alt={slide.caption || `Hackathon highlight ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                        {slide.caption ? (
                          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-ink bg-white/95 px-3 py-2">
                            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-ink sm:text-xs">{slide.caption}</p>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-1.5 border-t-2 border-ink bg-bg/80 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
                  {slides.map((s, i) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={
                        i === index
                          ? 'h-2 w-7 border-2 border-ink bg-accent shadow-neo-sm transition-all sm:h-2.5 sm:w-8'
                          : 'h-2 w-2 border-2 border-ink bg-white transition-all hover:bg-highlight-teal/40 sm:h-2.5 sm:w-2.5'
                      }
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-center text-xs font-bold uppercase tracking-widest text-ink">Your hack starts here</p>
            </div>
          </motion.div>
        </div>
      </div>

      <HeroUnderwater />
    </section>
  );
};

export default Hero;
