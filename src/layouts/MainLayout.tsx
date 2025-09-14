import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <Navbar />
      <BackgroundAnimation />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
