import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ArrowLeft } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import ThemeToggle from '../components/ThemeToggle';
import BackgroundAnimation from '../components/BackgroundAnimation';
import SideNav from '../components/SideNav';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import Logo from '../components/Logo'; // <-- Add this import

const ChatbotPageContent: React.FC = () => {
  const { toggleSideNav, isSideNavOpen, startNewSession } = useChat();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.startNew) {
      startNewSession();
      // Clean up the state to prevent re-triggering on refresh or back navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state, startNewSession]);

  return (
    <div className="h-screen flex flex-col bg-light-bg dark:bg-dark-bg transition-colors duration-500 overflow-hidden">
      <BackgroundAnimation />
      
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border sticky top-0 z-30 flex-shrink-0"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleSideNav}
                className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={22} />
              </motion.button>
              <div className="flex items-center gap-3">
                {/* Replace icon+text with Logo */}
                <div className="w-8 h-8">
                  <Logo />
                </div>
                <h1 className="text-lg font-bold text-light-text dark:text-dark-text hidden sm:block">AI Legal Assistant</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link to="/" title="Back to Home" className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text transition-colors">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ArrowLeft size={22} />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 flex overflow-hidden">
        <SideNav />
        <motion.div 
          className="flex-1 p-4 overflow-hidden"
          animate={{
            paddingLeft: isSideNavOpen && window.innerWidth >= 1024 ? '1rem' : '1rem',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <ChatInterface />
        </motion.div>
      </main>
    </div>
  );
}

const ChatbotPage: React.FC = () => {
  return (
    <ChatProvider>
      <ChatbotPageContent />
    </ChatProvider>
  );
};

export default ChatbotPage;
