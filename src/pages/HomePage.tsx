import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ParallaxSection from '../components/ParallaxSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ParallaxSection />
      
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-6">
            Ready to Transform Your Legal Workflow?
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust our AI assistant for efficient case management and instant support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <motion.div
                className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Trial
              </motion.div>
            </Link>
            <Link to="/pricing">
              <motion.div
                className="group relative w-full sm:w-auto px-8 py-4 bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm text-light-text dark:text-dark-text rounded-xl font-semibold text-lg border border-light-border dark:border-dark-border overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">View Pricing</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;
