import React from 'react';
import { motion } from 'framer-motion';
import PricingSection from '../components/PricingSection';

const PricingPage: React.FC = () => {
  return (
    <div className="pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
          Our Pricing
        </h1>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          Simple, transparent pricing for teams of all sizes.
        </p>
      </motion.div>
      <PricingSection />
    </div>
  );
};

export default PricingPage;
