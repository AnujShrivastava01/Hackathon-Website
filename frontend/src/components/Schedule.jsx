import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity } from 'lucide-react';

const ScheduleItem = ({ schedule, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.06, duration: 0.4 }}
    viewport={{ once: true }}
    className="flex items-start mb-10 relative last:mb-0 group"
  >
    <div className="absolute left-[25px] top-12 bottom-[-40px] w-[3px] bg-ink group-last:hidden" />

    <div className="w-12 h-12 border-[3px] border-ink bg-highlight-yellow shadow-neo-sm flex items-center justify-center shrink-0 z-10 mr-6 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
      <Activity size={20} className="text-ink" strokeWidth={2.5} />
    </div>

    <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 neo-card p-6 border-[3px] bg-white">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock size={16} className="text-ink" />
          <span className="text-xs font-bold uppercase tracking-widest text-ink/70">{schedule.time}</span>
        </div>
        <h4 className="text-2xl font-heading text-ink mb-2 normal-case tracking-wide">{schedule.activity}</h4>
        <p className="max-w-xl text-ink/80 text-base leading-relaxed font-medium">{schedule.description || '—'}</p>
      </div>

      <div className="inline-flex items-center px-4 py-2 bg-highlight-teal border-2 border-ink shadow-neo-sm text-xs font-bold uppercase tracking-widest text-ink shrink-0 self-start md:self-center">
        Day {schedule.day}
      </div>
    </div>
  </motion.div>
);

const Schedule = ({ schedules = [] }) => {
  return (
    <section id="schedule" className="section-padding bg-white border-t-4 border-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20 space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] bg-highlight-pink border-2 border-ink shadow-neo-sm">
            Event timeline
          </span>
          <h2 className="text-4xl md:text-7xl font-heading text-ink">The schedule</h2>
        </div>

        <div className="relative pl-2">
          {schedules.length > 0 ? (
            schedules.map((item, idx) => (
              <ScheduleItem key={item._id || idx} schedule={item} idx={idx} />
            ))
          ) : (
            <div className="neo-card border-[3px] border-dashed border-ink bg-bg p-12 text-center shadow-neo-sm">
              <p className="text-lg font-medium text-ink/70">Schedule slots will appear here once added in the admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
