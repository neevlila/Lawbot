import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, Search, Database } from 'lucide-react';

const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const features = [
    { 
      icon: Database, 
      title: '100% Local Storage', 
      description: 'We do not store your chats on any server. All data is saved locally in your browser for maximum privacy.',
      gradient: 'from-green-400 to-emerald-500'
    },
    { 
      icon: Clock, 
      title: 'Instant Answers', 
      description: 'Get immediate responses to your legal queries without waiting for appointments.',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      icon: Search, 
      title: 'Smart Analysis', 
      description: 'AI-powered search understands legal context and finds relevant case laws instantly.',
      gradient: 'from-purple-400 to-pink-500'
    },
    { 
      icon: Shield, 
      title: 'Secure & Private', 
      description: 'Since no data leaves your device to be stored, your confidential information remains yours.',
      gradient: 'from-orange-400 to-red-500'
    },
  ];

  return (
    <div id="features" ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Why Choose Us?
          </h2>
          <p className="text-base md:text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            The most private, accessible, and intelligent way to navigate the legal system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group bg-light-card dark:bg-dark-card backdrop-blur-md rounded-2xl p-6 border border-light-border dark:border-dark-border transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                <feature.icon size={24} className="text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">{feature.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
