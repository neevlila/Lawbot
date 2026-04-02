import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'AI Legal Assistant — Contact';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Contact the AI Legal Assistant team for support and feedback.');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: apiKey,
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: 'New Contact Form Submission — LawBot',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-light-text dark:text-dark-text transition-all duration-200 placeholder:text-light-text-secondary/40 dark:placeholder:text-dark-text-secondary/40';

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          We'd love to hear from you. Fill out the form below or reach us directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
          className="space-y-8"
        >
          {[
            {
              icon: Mail,
              title: 'Email',
              sub: 'General Inquiries',
              content: <a href="mailto:nneev223@gmail.com" className="text-light-accent dark:text-dark-accent hover:underline">nneev223@gmail.com</a>,
            },
            {
              icon: Phone,
              title: 'Phone',
              sub: 'Mon–Fri, 9am–5pm',
              content: <a href="tel:+917778005753" className="text-light-accent dark:text-dark-accent hover:underline">+91 7778005753</a>,
            },
            {
              icon: MapPin,
              title: 'Office',
              sub: 'Vastrapur Lake, Ahmedabad, Gujarat, India',
              content: null,
            },
          ].map(({ icon: Icon, title, sub, content }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">{title}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{sub}</p>
                {content}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeInOut' }}
          className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg p-8 rounded-2xl border border-light-border dark:border-dark-border"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={36} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">Message Sent!</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <motion.button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 rounded-lg border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-light-text-secondary dark:text-dark-text-secondary">
                      First Name <span className="text-purple-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="John"
                      className={inputClass}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-light-text-secondary dark:text-dark-text-secondary">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Doe"
                      className={inputClass}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-light-text-secondary dark:text-dark-text-secondary">
                    Email <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={inputClass}
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-light-text-secondary dark:text-dark-text-secondary">
                    Message <span className="text-purple-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={`${inputClass} resize-none`}
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
                    >
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02, filter: status === 'loading' ? 'none' : 'brightness(1.1)' }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-light-text-secondary/50 dark:text-dark-text-secondary/40">
                  We'll respond within 24 hours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
