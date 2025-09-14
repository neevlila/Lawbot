import React from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import { BarChart, FileText, MessageSquare, Users } from 'lucide-react';

const additionalFeatures = [
    {
        icon: FileText,
        title: "Document Summarization",
        description: "Instantly get concise summaries of lengthy legal documents, saving hours of reading time.",
    },
    {
        icon: BarChart,
        title: "Case Analytics",
        description: "Visualize case data and trends with our interactive analytics dashboard to make informed decisions.",
    },
    {
        icon: MessageSquare,
        title: "Contextual Chat History",
        description: "Our AI remembers your previous conversations, providing context-aware follow-up assistance.",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Share case information and AI insights with your team members securely within the platform.",
    },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
          Powerful Features
        </h1>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          Everything you need to supercharge your legal workflow.
        </p>
      </motion.div>
      
      <ParallaxSection />

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalFeatures.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg p-6 rounded-2xl border border-light-border dark:border-dark-border"
                >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <feature.icon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">{feature.title}</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">{feature.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
