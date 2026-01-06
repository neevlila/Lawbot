import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals.',
    features: [
      'Unlimited AI Chat',
      'Local Data Storage',
      'Basic Legal Summaries',
      'No Login Required'
    ],
    cta: 'Start Chatting',
    isFeatured: true,
  },
  {
    name: 'Pro (Coming Soon)',
    price: '$19',
    description: 'For professionals.',
    features: [
      'Document Upload & Analysis',
      'Export to PDF/Word',
      'Citation Search',
      'Priority Support',
    ],
    cta: 'Join Waitlist',
    isFeatured: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Simple Pricing
          </h2>
          <p className="text-base text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Start for free. Upgrade when you need more power.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col ${
                plan.isFeatured
                  ? 'bg-light-surface dark:bg-dark-surface border-purple-500 shadow-2xl shadow-purple-500/10 scale-105 z-10'
                  : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border hover:border-purple-500/50'
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">{plan.name}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-light-text dark:text-dark-text">{plan.price}</span>
                {plan.price !== 'Contact Us' && <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">/ month</span>}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center bg-green-500/10 dark:bg-green-500/20 rounded-full flex-shrink-0">
                      <Check size={12} className="text-green-500" />
                    </div>
                    <span className="text-sm text-light-text dark:text-dark-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.cta === 'Join Waitlist' ? '/contact' : '/chatbot'}
                state={plan.cta === 'Start Chatting' ? { startNew: true } : undefined}
                className="block"
              >
                <motion.div
                  className={`w-full text-center px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                    plan.isFeatured
                      ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white hover:brightness-110'
                      : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
