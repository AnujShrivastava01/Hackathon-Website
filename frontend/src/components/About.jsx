import React from 'react';
import { Layers, Code2, Cpu, Sparkles, Lightbulb, Terminal, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRIZE_TIERS } from '../constants';

const BRAND = 'HackOcean';

const accentFrames = [
  'bg-highlight-blue border-ink',
  'bg-highlight-teal border-ink',
  'bg-highlight-pink border-ink',
  'bg-highlight-purple border-ink',
  'bg-highlight-yellow border-ink',
  'bg-white border-ink',
];

const TRACK_ICONS = [Layers, Code2, Cpu, Sparkles, Lightbulb, Terminal];

const prizeAccent = [
  'bg-highlight-yellow border-ink',
  'bg-highlight-teal border-ink',
  'bg-highlight-pink border-ink',
];

const TrackCard = ({ title, description, delay, frameIdx, iconIdx }) => {
  const Icon = TRACK_ICONS[iconIdx % TRACK_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className={`neo-card p-8 border-[3px] ${accentFrames[frameIdx % accentFrames.length]}`}
    >
      <div className="w-14 h-14 bg-white border-2 border-ink shadow-neo-sm flex items-center justify-center mb-6">
        <Icon className="text-ink w-8 h-8" strokeWidth={2.2} />
      </div>
      <h3 className="text-2xl font-heading text-ink mb-4 normal-case tracking-normal">{title}</h3>
      <p className="text-ink/80 text-base leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
};

const About = ({ event, tracks = [] }) => {
  const brand = event?.name || BRAND;

  return (
    <section id="about" className="section-padding relative overflow-hidden border-t-4 border-ink bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tracks */}
        <div className="text-left mb-16 max-w-4xl">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-ink text-white border-2 border-ink shadow-neo-sm mb-4">
            Tracks
          </span>
          <h2 className="text-4xl md:text-6xl font-heading text-ink leading-[1.1]">
            Build where you belong —{' '}
            <span className="inline-block px-2 bg-highlight-teal border-[3px] border-ink shadow-neo-sm mt-2 sm:mt-0">
              pick your track
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tracks.length > 0 ? (
            tracks.map((track, idx) => (
              <TrackCard
                key={track._id}
                title={track.title}
                description={track.description}
                delay={idx * 0.08}
                frameIdx={idx}
                iconIdx={idx}
              />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 neo-card border-[3px] border-ink border-dashed bg-white/80 p-10 text-center shadow-neo-sm">
              <p className="text-ink/70 font-medium text-lg">
                Hack tracks will appear here soon. Admins can add them from the dashboard.
              </p>
            </div>
          )}
        </div>

        {/* Prize pool */}
        <div className="mb-20">
          <div className="text-left mb-10 max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-ink text-white border-2 border-ink shadow-neo-sm mb-4">
              Prize pool
            </span>
            <h2 className="text-3xl md:text-5xl font-heading text-ink leading-[1.1]">
              Win big for{' '}
              <span className="inline-block px-2 bg-highlight-yellow border-[3px] border-ink shadow-neo-sm mt-2 sm:mt-0">
                shipping real projects
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRIZE_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.place}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className={`neo-card p-8 border-[3px] ${prizeAccent[idx % prizeAccent.length]} flex flex-col`}
              >
                <div className="w-14 h-14 bg-white border-2 border-ink shadow-neo-sm flex items-center justify-center mb-6">
                  <Trophy className="text-ink w-8 h-8" strokeWidth={2.2} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-ink/70 mb-1">{tier.label}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-ink mb-4">{tier.place} place</p>
                <p className="text-3xl md:text-4xl font-heading text-ink mt-auto">
                  {tier.currency}
                  {tier.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative bg-highlight-blue border-[3px] border-ink shadow-neo-lg p-10 md:p-12">
          <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-highlight-pink border-[3px] border-ink shadow-neo-sm rotate-6 -z-10 hidden sm:block" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-heading text-ink mb-6 normal-case tracking-wide">
                Empowering builders at {brand}
              </h4>
              <p className="text-ink/85 text-lg leading-relaxed mb-8 font-medium">
                {event?.description ||
                  `${brand} is an open arena to prototype fast, try new stacks, and get guidance from people who have shipped before.`}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white font-bold text-xs">
                    1
                  </span>
                  <span className="text-ink/90 font-medium">Mentorship across tracks and stacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white font-bold text-xs">
                    2
                  </span>
                  <span className="text-ink/90 font-medium">Room to experiment without the corporate polish police.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-white font-bold text-xs">
                    3
                  </span>
                  <span className="text-ink/90 font-medium">A community that stays in touch after the hack ends.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-64 h-64 bg-accent border-[3px] border-ink shadow-neo flex flex-col items-center justify-center rotate-2 hover:rotate-0 transition-transform duration-300">
                <span className="font-heading text-6xl text-ink mb-2">48h</span>
                <span className="text-ink font-bold uppercase tracking-widest text-sm px-2 text-center border-t-2 border-ink pt-3">
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
