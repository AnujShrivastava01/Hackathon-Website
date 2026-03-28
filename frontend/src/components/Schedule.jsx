import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity, Zap } from 'lucide-react';

const ScheduleItem = ({ schedule, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className="flex items-start mb-12 relative last:mb-0 group"
  >
    {/* Line Accent */}
    <div className="absolute left-[26px] top-10 bottom-[-48px] w-px bg-white/10 group-last:hidden"></div>
    
    <div className="w-12 h-12 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center flex-shrink-0 z-10 mr-8 group-hover:border-primary-500/50 group-hover:bg-primary-500/5 transition-smooth">
       <Activity size={20} className="text-primary-500"/>
    </div>
    
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
       <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-3 mb-2">
             <Clock size={16} className="text-slate-500"/>
             <span className="text-xs font-black uppercase tracking-widest text-slate-500">{schedule.time}</span>
          </div>
          <h4 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary-400 transition-colors">{schedule.activity}</h4>
          <p className="max-w-xl text-slate-500 text-lg leading-relaxed">{schedule.description}</p>
       </div>
       
       <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Day {schedule.day}
       </div>
    </div>
  </motion.div>
);

const Schedule = ({ schedules }) => {
  const defaultSchedules = [
    { time: '09:00 AM', activity: 'Hackathon Kick-off', description: 'Opening ceremony, keynote speakers, and challenge reveal. Start of the 48-hour hacking window.', day: 1 },
    { time: '11:00 AM', activity: 'Team Ideation & Design', description: 'Collaborate with your team to finalize product roadmap and initial logic designs.', day: 1 },
    { time: '01:00 PM', activity: 'Technical Mentorship', description: 'One-on-one sessions with developers from top-tier tech companies to debug and architectural peer review.', day: 1 },
    { time: '02:00 PM', activity: 'Mid-Hack Check-in', description: 'Product progress review and early prototype demonstrations. Feedback from community.', day: 2 },
    { time: '08:00 PM', activity: 'Final Submission', description: 'All projects must be pushed to GitHub and listed on the portal for judging.', day: 3 },
  ];

  const data = schedules && schedules.length > 0 ? schedules : defaultSchedules;

  return (
    <section id="schedule" className="py-32 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-24">
           <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary-500 mb-4 block">Event Timeline</span>
           <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">The Schedule.</h2>
        </div>

        <div className="relative">
           {data.map((item, idx) => (
             <ScheduleItem key={idx} schedule={item} idx={idx} />
           ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
