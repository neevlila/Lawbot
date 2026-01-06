import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-8 pb-12">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mb-6"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-sm rounded-full text-light-text-secondary dark:text-dark-text-secondary text-xs sm:text-sm font-medium mb-6 border border-purple-500/20 dark:border-purple-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <ShieldCheck size={14} className="mr-2 text-green-500" />
            100% Private • Local Storage Only
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight tracking-tight">
            Legal Support, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Reimagined & Private
            </span>
          </h1>
          
          <motion.p
            className="text-base sm:text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your personal AI legal expert. Get instant answers, summary analysis, and drafting help. 
            <span className="block mt-2 font-medium text-light-text dark:text-dark-text opacity-80">
              No database. No tracking. Your chats stay on your device.
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/chatbot" state={{ startNew: true }}>
            <motion.div
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-purple-600 dark:via-blue-600 dark:to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/20 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles size={18} /> Start Free Chat
              </span>
            </motion.div>
          </Link>
          <Link to="/features">
            <motion.div
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm text-light-text dark:text-dark-text rounded-xl font-semibold text-lg border border-light-border dark:border-dark-border overflow-hidden"
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
