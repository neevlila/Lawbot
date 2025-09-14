import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';

const ChatInterface: React.FC = () => {
  const { sessions, activeSessionId, addMessage, isBotTyping } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [activeSession?.messages, isBotTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    addMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-light-card/50 dark:bg-dark-card/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-light-border/50 dark:border-dark-border/50 transition-colors duration-500">
      
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar bg-light-surface/30 dark:bg-dark-bg/30">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSessionId} // This animates the entire chat list on session change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-4"
          >
            {activeSession?.messages.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLastMessage={index === activeSession.messages.length - 1} 
              />
            ))}
            {isBotTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-light-card dark:bg-dark-surface rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 border border-light-border dark:border-dark-border">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-blue-500">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="flex space-x-1">
                    {[0, 0.2, 0.4].map(delay => (
                      <motion.div 
                        key={delay} 
                        className="w-1.5 h-1.5 bg-purple-500 rounded-full" 
                        animate={{ y: [-1, 1, -1] }} 
                        transition={{ duration: 1, repeat: Infinity, delay }} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-light-border/50 dark:border-dark-border/50 bg-light-surface/30 dark:bg-dark-bg/30">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about a case..."
            className="flex-1 pl-4 pr-4 py-3 bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all duration-300 custom-scrollbar"
            rows={1}
            style={{ maxHeight: '120px' }}
          />
          <motion.button
            onClick={handleSendMessage}
            className="w-11 h-11 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white rounded-full disabled:opacity-40 disabled:scale-100 flex-shrink-0 flex items-center justify-center shadow-lg"
            disabled={!inputText.trim()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
