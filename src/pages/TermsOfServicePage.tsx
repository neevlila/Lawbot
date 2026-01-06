import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const TermsOfServicePage: React.FC = () => {
  return (
    <LegalPageLayout title="Terms of Service">
      <p>Last updated: {new Date().toLocaleDateString('en-IN')}</p>

      <h2>1. Agreement to Terms</h2>
      <p>By using our AI Legal Assistant services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, do not use the services. The information provided by the AI is for informational purposes only and does not constitute legal advice.</p>

      <h2>2. User Accounts</h2>
      <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>

      <h2>3. Disclaimer</h2>
      <p>The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance. AI Legal Assistant does not warrant that the information provided by the chatbot is accurate, reliable, or correct; that the service will meet your requirements; or that the service will be available at any particular time or location, uninterrupted or secure.</p>

      <h2>4. Limitation of Liability</h2>
      <p>In no event shall AI Legal Assistant, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service. The output of the AI is not a substitute for professional legal advice from a qualified lawyer.</p>
    </LegalPageLayout>
  );
};

export default TermsOfServicePage;
