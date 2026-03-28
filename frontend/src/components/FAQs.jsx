import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';

const FAQItem = ({ faq, idx }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 border border-white/10 rounded-2xl overflow-hidden transition-smooth ${isOpen ? 'bg-primary-500/5 border-primary-500/30' : 'bg-slate-900/50 hover:bg-slate-800/80 hover:border-white/20'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-primary-400' : 'text-white'}`}>
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-white/10 text-slate-400'}`}>
           {isOpen ? <Minus size={18}/> : <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300"/>}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-8 pb-8 pt-0 text-lg text-slate-400 leading-relaxed max-w-3xl">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs = ({ faqs }) => {
  const defaultFAQs = [
    { question: 'Who can participate?', answer: 'Anyone! Students, professional developers, designers, and hobbyists are all welcome. You can join as a team (up to 4 members) or individually.' },
    { question: 'What is the registration fee?', answer: 'The hackathon is completely free to attend. We provide food, swag, and access to all tools and mentorship sessions.' },
    { question: 'How do I join a team?', answer: 'During the registration process, you can specify your teammate names or indicate if you are looking for a team. We will have a team-building session on the first day to help everyone connect.' },
    { question: 'What do I need to bring?', answer: 'Bring your laptop, charger, and a creative mind! If you are staying overnight, you might want to bring some personal essentials.' },
    { question: 'What if I have never hacked before?', answer: 'Dont worry! We have workshops and mentors to help you get started. Hackathons are the best place to learn new skills.' },
  ];

  const data = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section id="faqs" className="py-32 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20 space-y-4">
           <span className="text-xs font-bold tracking-[0.4em] uppercase text-primary-500 block">Got Questions?</span>
           <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Common Inquiries.</h2>
           <p className="text-slate-500 text-lg">Everything you need to know about participating in our event.</p>
        </div>

        <div className="space-y-4">
          {data.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
