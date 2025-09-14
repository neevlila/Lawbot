import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatBot3DProps {
  isTyping: boolean;
  isListening: boolean;
}

const ChatBot3D: React.FC<ChatBot3DProps> = ({ isTyping, isListening }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 w-16 h-16 lg:w-20 lg:h-20">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isListening ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main Button */}
        <div className={`absolute inset-0 rounded-full p-0.5 shadow-lg ${isDark ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500' : 'bg-gradient-to-r from-indigo-400 to-blue-400'}`}>
          <div className="w-full h-full bg-light-card dark:bg-dark-card rounded-full flex items-center justify-center">
            <MessageCircle size={24} className={isDark ? "text-purple-500" : "text-indigo-500"} />
          </div>
        </div>

        {/* Pulse Ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${isDark ? 'border-purple-500/30' : 'border-indigo-500/30'}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-light-card dark:bg-dark-card backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-light-border dark:border-dark-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex space-x-1">
              {[0, 0.2, 0.4].map(delay => (
                <motion.div
                  key={delay}
                  className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-purple-500' : 'bg-indigo-500'}`}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatBot3D;
