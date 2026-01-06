import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ChatbotPage from './pages/ChatbotPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="transition-colors duration-700 ease-in-out">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Route>
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
