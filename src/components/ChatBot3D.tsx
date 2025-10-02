import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatBot3DProps {
  isTyping: boolean;
  isListening: boolean;
}

const ChatBot3D: React.FC<ChatBot3DProps> = ({ isTyping, isListening }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 w-16 h-16 lg:w-20 lg:h-20 group">
      {/* Pulse Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full pointer-events-none`}
        style={{
          boxShadow: isDark
            ? '0 0 0 0 rgba(168,85,247,0.4)'
            : '0 0 0 0 rgba(99,102,241,0.3)',
        }}
        animate={{
          boxShadow: [
            isDark
              ? '0 0 0 0 rgba(168,85,247,0.4)'
              : '0 0 0 0 rgba(99,102,241,0.3)',
            isDark
              ? '0 0 0 16px rgba(168,85,247,0)'
              : '0 0 0 16px rgba(99,102,241,0)',
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative w-full h-full cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        animate={isListening ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glassmorphism Button */}
        <div className={`absolute inset-0 rounded-full p-1 shadow-xl border border-white/10 ${isDark ? 'bg-gradient-to-br from-purple-700/60 via-blue-900/40 to-cyan-800/30' : 'bg-gradient-to-br from-indigo-200/60 via-blue-100/40 to-cyan-100/30'} backdrop-blur-md`}>
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <MessageCircle size={28} className={isDark ? "text-purple-400" : "text-indigo-500"} />
          </div>
        </div>

        {/* Tooltip on hover */}
        <div className="absolute left-1/2 -top-10 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <div className="bg-light-card dark:bg-dark-card text-xs px-3 py-1 rounded shadow-lg border border-light-border dark:border-dark-border font-medium">
            Chat with Aurora
          </div>
        </div>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-light-border dark:border-dark-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex space-x-1">
                {[0, 0.2, 0.4].map(delay => (
                  <motion.div
                    key={delay}
                    className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-indigo-400'}`}
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ChatBot3D;
