import React from 'react';
import { Target, Users, Zap, Briefcase, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const BRAND = 'HackOcean';

const accentFrames = [
  'bg-highlight-blue border-ink',
  'bg-highlight-teal border-ink',
  'bg-highlight-pink border-ink',
  'bg-highlight-purple border-ink',
  'bg-highlight-yellow border-ink',
  'bg-white border-ink',
];

const FeatureCard = ({ icon: Icon, title, description, delay, frameIdx }) => (
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

const About = ({ event }) => {
  const brand = event?.name || BRAND;

  const features = [
    { icon: Target, title: 'Industry relevance', description: 'Work on real-world challenges with mentors from teams who ship daily.' },
    { icon: Users, title: 'Network & connect', description: 'Meet builders, designers, and creators who care about craft and community.' },
    { icon: Zap, title: 'Accelerated learning', description: 'Short feedback loops, workshops, and hands-on help when you are stuck.' },
    { icon: Briefcase, title: 'Career opportunities', description: 'Show your work to sponsors and partners looking for sharp talent.' },
    { icon: Award, title: 'Recognition & prizes', description: 'Compete for prizes while showing what you can ship in a weekend.' },
    { icon: Globe, title: 'Impact & community', description: 'Join a crew that keeps building after the closing ceremony.' },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden border-t-4 border-ink bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 max-w-4xl">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-ink text-white border-2 border-ink shadow-neo-sm mb-4">
            The mission
          </span>
          <h2 className="text-4xl md:text-6xl font-heading text-ink leading-[1.1]">
            More than a code fest —{' '}
            <span className="inline-block px-2 bg-highlight-pink border-[3px] border-ink shadow-neo-sm mt-2 sm:mt-0">
              human creativity
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} delay={idx * 0.08} frameIdx={idx} />
          ))}
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
