import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Layers } from 'lucide-react';

const AgendaCard = ({ agenda, idx }) => {
  const fills = ['bg-white', 'bg-highlight-teal/40', 'bg-highlight-blue/50'];
  return (
    <motion.div
      initial={{ opacity: 0, x: idx % 2 === 0 ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.45 }}
      viewport={{ once: true }}
      className={`relative neo-card p-10 border-[3px] ${fills[idx % fills.length]}`}
    >
      <div className="absolute top-4 right-6 font-heading text-6xl text-ink/10 pointer-events-none select-none">
        {agenda.day}
      </div>

      <div className="flex flex-col mb-8 relative">
        <div className="inline-block w-fit px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-highlight-purple border-2 border-ink shadow-neo-sm mb-3">
          Phase {idx + 1}
        </div>
        <h3 className="text-3xl font-heading text-ink normal-case tracking-wide">{agenda.title}</h3>
      </div>

      <p className="text-lg text-ink/85 leading-relaxed max-w-lg mb-8 font-medium">{agenda.description}</p>

      <div className="inline-flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-ink font-bold uppercase tracking-widest text-xs">
          <Calendar size={18} className="text-ink" strokeWidth={2.5} />
          <span>Day {agenda.day}</span>
        </div>
        <div className="flex items-center gap-2 text-ink font-bold uppercase tracking-widest text-xs">
          <Layers size={18} className="text-ink" strokeWidth={2.5} />
          <span>{agenda.phase}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Agenda = ({ agendas = [] }) => {
  return (
    <section id="agenda" className="section-padding bg-bg border-t-4 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] bg-accent border-2 border-ink shadow-neo-sm mb-4">
              Event journey
            </span>
            <h2 className="text-4xl md:text-6xl font-heading text-ink">The agenda</h2>
          </div>
          <p className="max-w-md text-ink/80 text-lg font-medium md:mb-1 border-l-4 border-ink pl-4">
            From spark to demo — three beats that keep you moving without drowning in process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {agendas.length > 0 ? (
            agendas.map((item, idx) => (
              <AgendaCard key={item._id || idx} agenda={item} idx={idx} />
            ))
          ) : (
            <div className="neo-card border-[3px] border-dashed border-ink bg-white/80 p-12 text-center shadow-neo-sm lg:col-span-2">
              <p className="text-lg font-medium text-ink/70">Agenda phases will appear here once added in the admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Agenda;
