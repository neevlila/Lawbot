import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ParallaxSection from '../components/ParallaxSection';
import HowItWorks from '../components/HowItWorks';
import ClientLogos from '../components/ClientLogos';

import { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AI Legal Assistant — Home';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'AI-powered legal assistant for case search, summaries, and document analysis. Try our demo or start a free trial.');
  }, []);

  return (
    <>
      <HeroSection />
      <ParallaxSection />
      <HowItWorks />
      <ClientLogos />
    </>
  );
};

export default HomePage;
