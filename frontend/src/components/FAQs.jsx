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

const FAQs = ({ faqs = [] }) => {
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
          {faqs.length > 0 ? (
            faqs.map((faq) => <FAQItem key={faq._id} faq={faq} />)
          ) : (
            <div className="border-[3px] border-dashed border-ink bg-white p-12 text-center shadow-neo-sm">
              <p className="text-lg font-medium text-ink/70">FAQs will appear here once added in the admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
