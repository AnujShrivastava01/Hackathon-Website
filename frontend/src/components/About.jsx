import React from 'react';
import {
  Globe,
  Brain,
  Smartphone,
  Landmark,
  Leaf,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PRIZE_TIERS } from '../constants';

const BRAND = 'HackOcean';

const TRACK_ICONS = [Globe, Brain, Smartphone, Landmark, Leaf, Sparkles];

const accentFrames = [
  'bg-highlight-blue border-ink',
  'bg-highlight-teal border-ink',
  'bg-highlight-pink border-ink',
  'bg-highlight-purple border-ink',
  'bg-highlight-yellow border-ink',
  'bg-white border-ink',
];

/** Bento grid: 12 columns on large screens */
const trackGridAreas = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-12',
];

const prizeAccent = [
  'bg-highlight-yellow border-ink',
  'bg-highlight-teal border-ink',
  'bg-highlight-pink border-ink',
];

const TrackCard = ({ title, description, delay, frameIdx, iconIdx, index, layoutClass, featured }) => {
  const Icon = TRACK_ICONS[iconIdx % TRACK_ICONS.length];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, type: 'spring', stiffness: 380, damping: 28 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden border-[3px] border-ink shadow-neo transition-shadow duration-200 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] ${accentFrames[frameIdx % accentFrames.length]} ${layoutClass} ${
        featured ? 'min-h-[min(320px,42vh)] lg:min-h-[300px]' : 'min-h-[260px] lg:min-h-[280px]'
      }`}
    >
      {/* Giant watermark index */}
      <span
        className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[7rem] leading-none text-ink/[0.07] transition-colors group-hover:text-ink/[0.11] md:text-[9rem]"
        aria-hidden
      >
        {num}
      </span>

      <div className="relative z-[1] flex h-full flex-col p-6 md:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className={`flex items-center justify-center border-2 border-ink bg-white shadow-neo-sm transition-transform duration-200 group-hover:rotate-[-4deg] ${
              featured ? 'h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]' : 'h-14 w-14'
            }`}
          >
            <Icon
              className={`text-ink ${featured ? 'h-9 w-9 md:h-10 md:w-10' : 'h-8 w-8'}`}
              strokeWidth={2.2}
            />
          </div>
          <span className="shrink-0 border-2 border-ink bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow-neo-sm">
            Track · {num}
          </span>
        </div>

        <h3
          className={`font-heading font-normal normal-case tracking-wide text-ink ${
            featured ? 'mb-4 text-3xl md:text-4xl' : 'mb-3 text-2xl md:text-3xl'
          }`}
        >
          {title}
        </h3>
        <p
          className={`max-w-prose text-ink/85 font-medium leading-relaxed ${
            featured ? 'text-base md:text-lg' : 'text-sm md:text-base'
          }`}
        >
          {description}
        </p>

        {/* Bottom accent bar */}
        <div className="mt-auto pt-6">
          <div className="h-1 w-12 border-2 border-ink bg-ink transition-all duration-300 group-hover:w-24 group-hover:bg-highlight-pink" />
        </div>
      </div>
    </motion.article>
  );
};

const About = ({ event, tracks = [] }) => {
  const brand = event?.name || BRAND;

  return (
    <section id="about" className="section-padding relative overflow-hidden border-t-4 border-ink bg-bg">
      {/* Soft depth field behind tracks */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(90, 163, 196, 0.2) 0%, transparent 45%),
            radial-gradient(circle at 88% 12%, rgba(255, 209, 102, 0.18) 0%, transparent 40%),
            radial-gradient(circle at 70% 85%, rgba(255, 105, 180, 0.12) 0%, transparent 42%)`,
        }}
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tracks */}
        <div className="mb-14 max-w-4xl text-left md:mb-16">
          <span className="mb-4 inline-block border-2 border-ink bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-neo-sm">
            Tracks
          </span>
          <h2 className="text-4xl font-heading leading-[1.08] text-ink md:text-6xl md:leading-[1.05]">
            Six lanes. One{' '}
            <span className="relative inline-block">
              <span className="relative z-[1] inline-block border-[3px] border-ink bg-highlight-teal px-2 py-0.5 shadow-neo-sm">
                weekend odyssey
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium text-ink/75">
            Pick the depth you want to dive—mentors, judging, and prizes align with every lane below.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
          {tracks.length > 0 ? (
            tracks.map((track, idx) => (
              <TrackCard
                key={track._id}
                title={track.title}
                description={track.description}
                delay={idx * 0.06}
                frameIdx={idx}
                iconIdx={idx}
                index={idx}
                layoutClass={trackGridAreas[Math.min(idx, trackGridAreas.length - 1)]}
                featured={idx === 0}
              />
            ))
          ) : (
            <div className="neo-card border-[3px] border-dashed border-ink bg-white/80 p-12 text-center shadow-neo-sm lg:col-span-12">
              <p className="text-lg font-medium text-ink/70">Loading tracks…</p>
            </div>
          )}
        </div>

        {/* Prize pool */}
        <div className="mb-20">
          <div className="mb-10 max-w-4xl text-left">
            <span className="mb-4 inline-block border-2 border-ink bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-neo-sm">
              Prize pool
            </span>
            <h2 className="text-3xl font-heading leading-[1.1] text-ink md:text-5xl">
              Win big for{' '}
              <span className="mt-2 inline-block border-[3px] border-ink bg-highlight-yellow px-2 py-0.5 shadow-neo-sm sm:mt-0">
                shipping real projects
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PRIZE_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.place}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className={`neo-card flex flex-col border-[3px] p-8 ${prizeAccent[idx % prizeAccent.length]}`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center border-2 border-ink bg-white shadow-neo-sm">
                  <Trophy className="h-8 w-8 text-ink" strokeWidth={2.2} />
                </div>
                <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-ink/70">{tier.label}</p>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-ink">{tier.place} place</p>
                <p className="mt-auto font-heading text-3xl text-ink md:text-4xl">
                  {tier.currency}
                  {tier.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative border-[3px] border-ink bg-highlight-blue p-10 shadow-neo-lg md:p-12">
          <div className="absolute -bottom-3 -right-3 -z-10 hidden h-24 w-24 rotate-6 border-[3px] border-ink bg-highlight-pink shadow-neo-sm sm:block" />

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h4 className="mb-6 font-heading text-3xl normal-case tracking-wide text-ink">
                Empowering builders at {brand}
              </h4>
              <p className="mb-8 text-lg font-medium leading-relaxed text-ink/85">
                {event?.description ||
                  `${brand} is an open arena to prototype fast, try new stacks, and get guidance from people who have shipped before.`}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white text-xs font-bold">
                    1
                  </span>
                  <span className="font-medium text-ink/90">Mentorship across tracks and stacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white text-xs font-bold">
                    2
                  </span>
                  <span className="font-medium text-ink/90">Room to experiment without the corporate polish police.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white text-xs font-bold">
                    3
                  </span>
                  <span className="font-medium text-ink/90">A community that stays in touch after the hack ends.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="flex h-64 w-64 rotate-2 flex-col items-center justify-center border-[3px] border-ink bg-accent shadow-neo transition-transform duration-300 hover:rotate-0">
                <span className="font-heading text-6xl text-ink mb-2">48h</span>
                <span className="border-t-2 border-ink px-2 pt-3 text-center text-sm font-bold uppercase tracking-widest text-ink">
                  Of shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
