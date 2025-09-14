export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'case' | 'escalation';
}

export interface LegalCase {
  id: string;
  title: string;
  caseNumber: string;
  status: 'active' | 'closed' | 'pending';
  department: string;
  date: string;
  summary: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}
