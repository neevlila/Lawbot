import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to AI Legal Assistant. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.</p>

      <h2>2. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
      <ul>
        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the service.</li>
        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the service.</li>
        <li><strong>Chat Data:</strong> All conversations, queries, and case information you input into the chatbot are processed to provide the service. We may store this data to improve our AI models, but we take measures to anonymize it.</li>
      </ul>

      <h2>3. Use of Your Information</h2>
      <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Provide you with the AI-powered legal assistance.</li>
        <li>Improve our services and AI models.</li>
        <li>Monitor and analyze usage and trends to improve your experience.</li>
        <li>Notify you of updates to the service.</li>
      </ul>

      <h2>4. Security of Your Information</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
