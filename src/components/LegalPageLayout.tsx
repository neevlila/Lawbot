import React from 'react';
import { motion } from 'framer-motion';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-light-border dark:border-dark-border max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-8 border-b border-light-border dark:border-dark-border pb-4">
          {title}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary prose-p:leading-relaxed prose-headings:text-light-text dark:prose-headings:text-dark-text">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPageLayout;
