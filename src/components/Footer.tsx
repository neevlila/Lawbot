import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm py-8"
    >
      <div className="container mx-auto px-4 text-center text-light-text-secondary dark:text-dark-text-secondary">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/privacy-policy" className="hover:text-light-text dark:hover:text-dark-text transition-colors text-sm">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-light-text dark:hover:text-dark-text transition-colors text-sm">Terms of Service</Link>
          <Link to="/contact" className="hover:text-light-text dark:hover:text-dark-text transition-colors text-sm">Contact</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} AI Legal Assistant By The Schedulers.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
