import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundAnimation: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      {/* Animated gradient orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl ${
          isDark 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
            : 'bg-gradient-to-r from-blue-200 to-purple-200'
        }`}
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl ${
          isDark 
            ? 'bg-gradient-to-r from-cyan-500 to-green-500' 
            : 'bg-gradient-to-r from-green-200 to-cyan-200'
        }`}
        animate={{ 
          x: [0, -100, 0], 
          y: [0, 50, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDark ? '#8b949e' : '#656d76'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? '#8b949e' : '#656d76'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
