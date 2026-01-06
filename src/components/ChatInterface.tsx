import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Gavel, FileText, Mail } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import Logo from './Logo';

const ChatInterface: React.FC = () => {
  const { sessions, activeSessionId, addMessage, isBotTyping } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const isNewChat = activeSession?.messages.length === 1 && activeSession.messages[0].sender === 'bot';

  const quickPrompts = [
    { text: 'Summarize this contract', icon: FileText, desc: 'Get key points and risks' },
    { text: 'Breach of contract cases', icon: Gavel, desc: 'Find relevant precedents' },
    { text: 'Draft a legal notice', icon: Mail, desc: 'Create a formal response' },
    { text: 'Explain copyright law', icon: Sparkles, desc: 'Understand IP rights' },
  ];

  const insertPrompt = (p: string) => {
    addMessage(p);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [activeSession?.messages, isBotTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    addMessage(inputText);
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-light-card/50 dark:bg-dark-card/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-light-border/50 dark:border-dark-border/50 transition-colors duration-500 relative">
      
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar bg-light-surface/30 dark:bg-dark-bg/30 relative">
        {isNewChat ? (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 max-w-2xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Logo className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                How can I help you today?
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                I can help you analyze documents, find case laws, or draft legal correspondence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
              {quickPrompts.map((prompt, idx) => (
                <motion.button
                  key={prompt.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  onClick={() => insertPrompt(prompt.text)}
                  className="flex items-start gap-4 p-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 text-left group"
                >
                  <div className="p-2 rounded-lg bg-light-surface dark:bg-dark-surface group-hover:bg-purple-500/10 transition-colors">
                    <prompt.icon size={20} className="text-light-text-secondary dark:text-dark-text-secondary group-hover:text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">{prompt.text}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{prompt.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {/* Expanded width to reduce side gaps */}
            <motion.div
              key={activeSessionId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-[95%] xl:max-w-7xl mx-auto"
            >
              {activeSession?.messages.map((message, index) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isLastMessage={index === activeSession.messages.length - 1} 
                />
              ))}
              {isBotTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
                  <div className="flex items-end gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-blue-500">
                      <Logo className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-light-card dark:bg-dark-surface rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2 border border-light-border dark:border-dark-border">
                      <div className="flex space-x-1">
                        {[0, 0.2, 0.4].map(delay => (
                          <motion.div 
                            key={delay} 
                            className="w-1.5 h-1.5 bg-purple-500 rounded-full" 
                            animate={{ y: [-2, 2, -2] }} 
                            transition={{ duration: 1, repeat: Infinity, delay }} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-light-surface/30 dark:bg-dark-bg/30">
        {/* Expanded width to match chat area */}
        <div className="max-w-[95%] xl:max-w-7xl mx-auto">
          <div className="relative flex items-end gap-2 bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500 transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about a legal case..."
              className="flex-1 pl-3 py-3 bg-transparent border-none text-light-text dark:text-dark-text focus:ring-0 focus:outline-none resize-none text-sm max-h-[120px] custom-scrollbar placeholder:text-light-text-secondary/50 dark:placeholder:text-dark-text-secondary/50"
              rows={1}
            />
            <motion.button
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
              disabled={!inputText.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={18} />
            </motion.button>
          </div>
          <div className="mt-2 text-center">
             <p className="text-[10px] text-light-text-secondary/60 dark:text-dark-text-secondary/40">
               AI can make mistakes. Please verify important legal information.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
