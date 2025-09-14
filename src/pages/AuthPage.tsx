import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Chrome, Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ThemeToggle from '../components/ThemeToggle';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg p-4 transition-colors duration-500">
      <BackgroundAnimation />
      
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <Link to="/" title="Back to Home" className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ArrowLeft size={22} />
            </motion.div>
        </Link>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-light-border/50 dark:border-dark-border/50"
      >
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Bot size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-light-text dark:text-dark-text mb-2">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary mb-8">
            {isSignUp ? 'to start your journey with us.' : 'to continue your legal work.'}
          </p>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignUp ? 'signup' : 'login'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" size={18} />
                  <input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" size={18} />
                <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" size={18} />
                <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              </div>
              
              {!isSignUp && (
                <div className="text-right">
                  <button type="button" className="text-xs font-semibold text-purple-500 hover:underline focus:outline-none">
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white font-semibold rounded-lg shadow-lg"
                whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-light-border dark:border-dark-border" />
            <span className="mx-4 text-xs text-light-text-secondary dark:text-dark-text-secondary">OR</span>
            <hr className="flex-grow border-light-border dark:border-dark-border" />
          </div>

          <motion.button
            className="w-full flex items-center justify-center gap-3 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm font-medium text-light-text dark:text-dark-text"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Chrome size={18} />
            Continue with Google
          </motion.button>

          <p className="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary mt-8">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-purple-500 hover:underline">
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
