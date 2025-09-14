import { faker } from '@faker-js/faker';
import { LegalCase, FAQ } from '../types';

export const mockCases: LegalCase[] = Array.from({ length: 15 }, (_, i) => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(4),
  caseNumber: `CASE-${faker.number.int({ min: 1000, max: 9999 })}`,
  status: faker.helpers.arrayElement(['active', 'closed', 'pending']) as LegalCase['status'],
  department: faker.helpers.arrayElement(['Criminal', 'Civil', 'Corporate', 'Family', 'Tax']),
  date: faker.date.recent({ days: 365 }).toLocaleDateString('en-IN'),
  summary: faker.lorem.paragraph(2),
  priority: faker.helpers.arrayElement(['high', 'medium', 'low']) as LegalCase['priority'],
}));

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How can I file a new legal case?',
    answer: 'To file a new legal case, you need to submit the required documents through our online portal or visit the departmental office. The process typically takes 2-3 business days for initial review.',
    category: 'Filing',
    tags: ['case filing', 'documents', 'process']
  },
  {
    id: '2',
    question: 'What is the status of my pending case?',
    answer: 'You can check your case status by entering your case number in the search function. The system will display current status, next hearing date, and any pending actions.',
    category: 'Status',
    tags: ['case status', 'tracking', 'updates']
  },
  {
    id: '3',
    question: 'How long does it take to resolve a case?',
    answer: 'Case resolution time varies depending on complexity. Simple cases may take 30-60 days, while complex cases can take 6-12 months. Priority cases are expedited.',
    category: 'Timeline',
    tags: ['duration', 'resolution', 'timeline']
  },
  {
    id: '4',
    question: 'Can I get legal aid assistance?',
    answer: 'Legal aid is available for eligible individuals based on income criteria. You can apply through our legal aid desk or online portal. Assessment usually takes 5-7 business days.',
    category: 'Legal Aid',
    tags: ['legal aid', 'assistance', 'eligibility']
  },
  {
    id: '5',
    question: 'How do I appeal a court decision?',
    answer: 'Appeals must be filed within 30 days of the judgment. Submit your appeal with supporting documents and fees. The appellate process typically takes 3-6 months.',
    category: 'Appeals',
    tags: ['appeal', 'court decision', 'timeline']
  }
];

export const predefinedResponses = {
  greeting: [
    'Hello! I\'m your AI Legal Assistant. How can I help you today?',
    'Welcome to Legal Support! I\'m here to assist with your legal queries.',
    'Hi there! I\'m ready to help you with legal case information and guidance.'
  ],
  caseSearch: [
    'I\'ll help you search for case information. Please provide a case number or keywords.',
    'Let me find that case information for you. What details can you provide?',
    'I can search our database for case details. What would you like to look up?'
  ],
  escalation: [
    'I understand this requires human assistance. Let me connect you with our legal team.',
    'This query needs specialized attention. I\'ll escalate this to our legal experts.',
    'I\'ll forward this to our human staff for detailed assistance.'
  ]
};
