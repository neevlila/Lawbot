import React from 'react';
import { Search, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: 'Ask Anything',
    desc: 'Type your legal question or case details in plain English.'
  },
  {
    icon: FileText,
    title: 'Get Instant Analysis',
    desc: 'Our AI analyzes laws and precedents to provide a comprehensive summary.'
  },
  {
    icon: Users,
    title: 'Private & Secure',
    desc: 'Your conversation is saved only on your device, ensuring complete privacy.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-light-surface/30 dark:bg-dark-surface/10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text">How It Works</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mt-2 text-sm md:text-base">
            Simple, fast, and secure legal assistance in three easy steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.08 }} className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg p-6 rounded-xl border border-light-border dark:border-dark-border text-center hover:border-purple-500/30 transition-colors">
              <div className="mx-auto w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                <step.icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg text-light-text dark:text-dark-text mb-2">{step.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
