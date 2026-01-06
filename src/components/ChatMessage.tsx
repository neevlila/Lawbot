import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import Logo from './Logo';

interface ChatMessageProps {
  message: Message;
  isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Expanded max-width for message bubbles */}
      <div className={`flex items-end gap-3 max-w-[95%] sm:max-w-4xl lg:max-w-5xl ${isBot ? '' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
          isBot 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
            : 'bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500'
        }`}>
          {isBot ? (
            <Logo className="w-6 h-6" />
          ) : (
            <User size={16} className="text-white" />
          )}
        </div>
        <motion.div
          className={`px-4 py-3 rounded-2xl shadow-md transition-colors duration-500 ${
            isBot
              ? 'bg-light-card dark:bg-dark-surface text-light-text dark:text-dark-text rounded-bl-none border border-light-border dark:border-dark-border'
              : 'bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:to-blue-500 text-white rounded-br-none'
          }`}
        >
          <div className="text-sm leading-relaxed break-words prose dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
