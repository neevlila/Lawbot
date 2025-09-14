import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-sm rounded-full text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium mb-8 border border-purple-500/20 dark:border-purple-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="mr-2 text-purple-500" />
            AI-Powered Legal Assistant
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight">
            Legal{' '}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Support
            </span>
            <br />
            Redefined
          </h1>
          
          <motion.p
            className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience intelligent legal case management with our 24/7 AI assistant. 
            Streamline queries, search cases, and get instant expert guidance.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/chatbot" state={{ startNew: true }}>
            <motion.div
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white rounded-xl font-semibold text-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-purple-600 dark:via-blue-600 dark:to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start Conversation</span>
            </motion.div>
          </Link>
          <Link to="/features">
            <motion.div
              className="group relative w-full sm:w-auto px-8 py-4 bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm text-light-text dark:text-dark-text rounded-xl font-semibold text-lg border border-light-border dark:border-dark-border overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Learn More</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
