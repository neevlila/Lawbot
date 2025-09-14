import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { ChatSession } from '../types';

const SideNav: React.FC = () => {
  const { sessions, activeSessionId, startNewSession, loadSession, deleteSession, clearAllSessions, isSideNavOpen, toggleSideNav } = useChat();

  const variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const groupSessionsByDate = (sessions: ChatSession[]) => {
    const groups: { [key: string]: ChatSession[] } = {};
    sessions.forEach(session => {
      const now = new Date();
      const sessionDate = session.createdAt;
      let key = 'Older';

      const diffDays = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 0) key = 'Today';
      else if (diffDays === 1) key = 'Yesterday';
      else if (diffDays <= 7) key = 'Previous 7 Days';
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(session);
    });
    return groups;
  };

  const groupedSessions = groupSessionsByDate(sessions);
  const dateGroups = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'];

  return (
    <AnimatePresence>
      {isSideNavOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSideNav}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full w-72 bg-light-surface dark:bg-dark-surface z-50 flex flex-col shadow-2xl lg:relative lg:shadow-none"
          >
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-bold text-light-text dark:text-dark-text">Chat History</h2>
              <button onClick={toggleSideNav} className="lg:hidden text-light-text-secondary dark:text-dark-text-secondary">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-2 space-y-2">
              <motion.button
                onClick={startNewSession}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:to-blue-500 rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                New Chat
              </motion.button>
              <motion.button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
                    clearAllSessions();
                  }
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 bg-red-500/10 dark:bg-red-500/20 rounded-lg border border-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
                Clear All Chats
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <AnimatePresence>
                {dateGroups.map(group => (
                  groupedSessions[group] && (
                    <div key={group} className="mb-4">
                      <h3 className="px-2 py-1 text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">{group}</h3>
                      <AnimatePresence>
                        {groupedSessions[group].map(session => (
                          <motion.div
                            key={session.id}
                            layout
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, x: -20, transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            onClick={() => loadSession(session.id)}
                            className={`group flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer overflow-hidden ${
                              activeSessionId === session.id
                                ? 'bg-indigo-100 dark:bg-purple-500/20'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <MessageSquare size={16} className="text-light-text-secondary dark:text-dark-text-secondary flex-shrink-0" />
                              <span className="text-sm text-light-text dark:text-dark-text truncate">{session.title}</span>
                            </div>
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                              className="text-light-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100 hover:text-red-500 flex-shrink-0"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="p-4 border-t border-light-border dark:border-dark-border text-center">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Powered by Aurora AI
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideNav;
