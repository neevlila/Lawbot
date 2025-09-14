import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          We'd love to hear from you. Please fill out the form below or contact us directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Email</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">General Inquiries</p>
                    <a href="mailto:nneev223@gmail.com" className="text-light-accent dark:text-dark-accent hover:underline">nneev223@gmail.com</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Phone</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">Mon-Fri, 9am-5pm</p>
                    <a href="tel:+1234567890" className="text-light-accent dark:text-dark-accent hover:underline">+91 7778005753</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Office</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">Vastrapur lake, Ahmedabad, Guj, India</p>
                </div>
            </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg p-8 rounded-2xl border border-light-border dark:border-dark-border"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">First Name</label>
                <input type="text" id="firstName" className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-light-text dark:text-dark-text" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">Last Name</label>
                <input type="text" id="lastName" className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-light-text dark:text-dark-text" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-light-text dark:text-dark-text" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">Message</label>
              <textarea id="message" rows={5} className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none text-light-text dark:text-dark-text"></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
