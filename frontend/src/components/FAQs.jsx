import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`mb-4 border-[3px] border-ink overflow-hidden shadow-neo transition-all duration-200 ${
        isOpen ? 'bg-highlight-blue/50' : 'bg-white hover:bg-highlight-yellow/30'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
      >
        <span className={`text-lg font-bold font-sans normal-case tracking-normal ${isOpen ? 'text-ink' : 'text-ink'}`}>
          {faq.question}
        </span>
        <div
          className={`w-10 h-10 border-2 border-ink flex items-center justify-center shrink-0 shadow-neo-sm ${
            isOpen ? 'bg-accent rotate-180' : 'bg-white'
          } transition-transform duration-200`}
        >
          {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-0 text-ink/85 text-base leading-relaxed max-w-3xl border-t-2 border-ink/20 font-medium">
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
    { question: 'Who can participate?', answer: 'Students, professionals, designers, and curious builders. Solo or in teams (up to four) — we help match people on day one if needed.' },
    { question: 'What is the registration fee?', answer: 'HackOcean is free to attend. Food, swag, and workspace access are covered by our partners.' },
    { question: 'How do I join a team?', answer: 'List teammates when you register, or show up solo and join the team formation block at kick-off.' },
    { question: 'What should I bring?', answer: 'Laptop, charger, and anything you need to stay comfortable for a long sprint. We provide Wi‑Fi, power, and caffeine diplomacy.' },
    { question: 'What if I have never hacked before?', answer: 'That is the point. Workshops and mentors are there so your first ship happens in good company.' },
  ];

  const data = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section id="faqs" className="section-padding bg-bg border-t-4 border-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.35em] bg-ink text-white border-2 border-ink shadow-neo-sm">
            FAQs
          </span>
          <h2 className="text-4xl md:text-7xl font-heading text-ink">Common questions</h2>
          <p className="text-ink/80 text-lg font-medium">Straight answers — no corporate fog.</p>
        </div>

        <div>
          {data.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
