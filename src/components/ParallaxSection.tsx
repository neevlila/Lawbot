import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, Search, Users } from 'lucide-react';

const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    { 
      icon: Shield, 
      title: 'Secure & Reliable', 
      description: 'Advanced encryption and secure data handling for all legal information.',
      gradient: 'from-green-400 to-emerald-500'
    },
    { 
      icon: Clock, 
      title: '24/7 Availability', 
      description: 'Round-the-clock assistance for urgent legal queries and case support.',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      icon: Search, 
      title: 'Intelligent Search', 
      description: 'AI-powered case search with natural language processing capabilities.',
      gradient: 'from-purple-400 to-pink-500'
    },
    { 
      icon: Users, 
      title: 'Expert Support', 
      description: 'Seamless escalation to human legal experts when needed.',
      gradient: 'from-orange-400 to-red-500'
    },
  ];

  return (
    <div id="features" ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Revolutionizing Legal Support
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Experience the future of legal assistance with our AI-powered chatbot, designed to streamline case management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group bg-light-card dark:bg-dark-card backdrop-blur-md rounded-2xl p-6 border border-light-border dark:border-dark-border transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={24} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">{feature.title}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
