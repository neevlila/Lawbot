import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-light-surface dark:bg-dark-surface shadow-sm text-light-text dark:text-dark-text'
        : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
    }`;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-light-border/50 dark:border-dark-border/50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 text-light-accent dark:text-dark-accent">
            <Logo />
          </div>
          <span className="font-bold text-lg text-light-text dark:text-dark-text">AI Legal Assistant</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 bg-light-card/80 dark:bg-dark-card/80 p-1 rounded-full border border-light-border dark:border-dark-border">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/features" className={navLinkClasses}>Features</NavLink>
          <NavLink to="/pricing" className={navLinkClasses}>Pricing</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
