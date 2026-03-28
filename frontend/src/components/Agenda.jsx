import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Layers, Clock } from 'lucide-react';

const AgendaCard = ({ agenda, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:border-primary-500/50 transition-smooth"
  >
    <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/5 group-hover:text-primary-500/10 transition-colors">
       {agenda.day}
    </div>
    
    <div className="flex flex-col mb-8">
      <div className="text-xs font-black uppercase tracking-[0.2em] text-primary-500 mb-2">Phase {idx + 1}</div>
      <h3 className="text-3xl font-black text-white group-hover:text-primary-400 transition-colors">{agenda.title}</h3>
    </div>
    
    <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-8">{agenda.description}</p>
    
    <div className="inline-flex items-center space-x-6">
       <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <Calendar size={18} className="text-primary-500"/>
          <span>Day {agenda.day}</span>
       </div>
       <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
         <Layers size={18} className="text-primary-500"/>
         <span>{agenda.phase}</span>
       </div>
    </div>
  </motion.div>
);

const Agenda = ({ agendas }) => {
  // Fallback default data if none fetched from backend
  const defaultAgendas = [
    { day: 1, title: 'Concept & Ideation', phase: 'Pre-Hack', description: 'Form teams, brainstorm crazy ideas, and define your MVP goals. Start architectural planning and environment setup.' },
    { day: 2, title: 'Development Sprint', phase: 'Execution', description: 'Diving deep into code. Implementation of core features, database modeling, and initial UI/UX polish.' },
    { day: 3, title: 'Refine & Finalize', phase: 'Polish', description: 'Testing, debugging, and final feature additions. Preparing project demos and video submissions.' },
  ];

  const data = agendas && agendas.length > 0 ? agendas : defaultAgendas;

  return (
    <section id="agenda" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-primary-500 mb-4 block">Event Journey</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">The Agenda.</h2>
          </div>
          <p className="max-w-md text-slate-500 text-lg md:mb-2">A high-level view of our phases. Journey from an idea to a working prototype in record time.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           {data.map((item, idx) => (
             <AgendaCard key={idx} agenda={item} idx={idx} />
           ))}
        </div>
      </div>
    </section>
  );
};

export default Agenda;
