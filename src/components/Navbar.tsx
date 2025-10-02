import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-light-border/50 dark:border-dark-border/50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
            <Bot size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-light-text dark:text-dark-text">AI Legal Assistant</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">Home</Link>
          <Link to="/features" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">Pricing</Link>
          <Link to="/contact" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
