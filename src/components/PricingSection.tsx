import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For individuals and small teams getting started.',
    features: [
      'Basic AI Chat',
      '10 Case Searches/mo',
      'Community Support',
    ],
    cta: 'Get Started',
    isFeatured: false,
  },
  {
    name: 'Professional',
    price: '$49',
    description: 'For growing teams and legal professionals.',
    features: [
      'Unlimited Case Searches',
      'Priority Email Support',
      'Case Summarization',
      'Document Analysis (Beta)',
    ],
    cta: 'Choose Plan',
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For large organizations with custom needs.',
    features: [
      'All Professional features',
      'Dedicated Account Manager',
      'On-premise Deployment Option',
      'Custom Integrations',
      '24/7 Phone Support',
    ],
    cta: 'Contact Sales',
    isFeatured: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Flexible Plans for Every Need
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Choose the right plan to unlock the full potential of AI-powered legal assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col ${
                plan.isFeatured
                  ? 'bg-light-surface dark:bg-dark-surface border-purple-500 shadow-2xl shadow-purple-500/10 lg:scale-105'
                  : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border hover:border-purple-500/50'
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">{plan.name}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 h-12">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-light-text dark:text-dark-text">{plan.price}</span>
                {plan.price !== 'Contact Us' && <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary">/ month</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
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
                to={plan.name === 'Enterprise' ? '/contact' : '/chatbot'}
                state={plan.name !== 'Enterprise' ? { startNew: true } : undefined}
                className="block"
              >
                <motion.div
                  className={`w-full text-center px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                    plan.isFeatured
                      ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white'
                      : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
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
