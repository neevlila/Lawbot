import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ChatSession, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';

interface ChatContextType {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isSideNavOpen: boolean;
  startNewSession: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllSessions: () => void;
  addMessage: (text: string) => void;
  toggleSideNav: () => void;
  isBotTyping: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const initialBotMessage: Message = {
  id: uuidv4(),
  text: 'Hello! I am Aurora, your AI Legal Assistant. How may I assist you today?',
  sender: 'bot',
  timestamp: new Date(),
};

// --- Gemini API Setup ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.");
}
// -------------------------

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const startNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [initialBotMessage],
      createdAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem('chatSessions');
      if (storedSessions) {
        const parsedSessions: ChatSession[] = JSON.parse(storedSessions).map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          messages: s.messages.map((m: any) => ({...m, timestamp: new Date(m.timestamp)}))
        }));
        if (parsedSessions.length > 0) {
          setSessions(parsedSessions);
          setActiveSessionId(parsedSessions[0].id);
        } else {
          startNewSession();
        }
      } else {
        startNewSession();
      }
    } catch (error) {
      console.error("Failed to parse chat sessions from localStorage", error);
      startNewSession();
    }
  }, [startNewSession]);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    } else {
      localStorage.removeItem('chatSessions');
    }
  }, [sessions]);

  const loadSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId);
    if (window.innerWidth < 1024) {
      setIsSideNavOpen(false);
    }
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prevSessions => {
      const remainingSessions = prevSessions.filter(s => s.id !== sessionId);
      if (activeSessionId === sessionId) {
        if (remainingSessions.length > 0) {
          setActiveSessionId(remainingSessions[0].id);
        } else {
          startNewSession();
        }
      }
      return remainingSessions;
    });
  }, [activeSessionId, startNewSession]);
  
  const clearAllSessions = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [initialBotMessage],
      createdAt: new Date(),
    };
    setSessions([newSession]);
    setActiveSessionId(newSession.id);
  }, []);

  const addMessage = useCallback(async (text: string) => {
    if (!activeSessionId) return;

    const userMessage: Message = { id: uuidv4(), text, sender: 'user', timestamp: new Date() };

    let historyForApi: Content[] = [];
    
    setSessions(prev => {
        const activeSession = prev.find(s => s.id === activeSessionId);
        if (!activeSession) return prev;

        const messagesForHistory = [...activeSession.messages, userMessage];
        const historyStartIndex = messagesForHistory.length > 1 && messagesForHistory[0].sender === 'bot' ? 1 : 0;
        
        historyForApi = messagesForHistory
          .slice(historyStartIndex)
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          } as Content));

        const updatedTitle = activeSession.title === 'New Chat'
          ? text.substring(0, 30) + (text.length > 30 ? '...' : '')
          : activeSession.title;

        return prev.map(session =>
          session.id === activeSessionId
            ? { ...session, messages: [...session.messages, userMessage], title: updatedTitle }
            : session
        );
    });

    setIsBotTyping(true);

    try {
      if (!genAI) {
        throw new Error("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // We remove the last user message from history because sendMessage will add it.
      const chat = model.startChat({ history: historyForApi.slice(0, -1) });
      const result = await chat.sendMessage(text);
      const response = result.response;
      const botResponseText = response.text();

      const prefixedResponse = "So these are the steps which will be legal as per your case. " + botResponseText;

      const botMessage: Message = { id: uuidv4(), text: prefixedResponse, sender: 'bot', timestamp: new Date() };
      
      setSessions(prev => prev.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, botMessage] }
          : session
      ));

    } catch (error) {
      console.error("Gemini API call failed:", error);

      let specificError = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
          specificError = "The provided API key is not valid. Please check your .env file and ensure that billing is enabled for your Google Cloud project.";
        } else if (error.message.includes("429")) {
          specificError = "I'm experiencing high traffic right now. Please wait a moment and try again.";
        } else if (error.message.includes("400")) {
          specificError = "There was an issue with the request. It might have been blocked by the content safety filter. Please try rephrasing your message.";
        } else if (error.message.includes("500")) {
          specificError = "The AI service is currently unavailable. Please try again later.";
        } else if (error.message.includes("fetch failed")) {
          specificError = "I'm having trouble connecting to the network. Please check your internet connection.";
        } else if (error.message.includes("not configured")) {
          specificError = "The Gemini API key has not been configured. Please add it to your .env file.";
        }
      }

      const errorMessage: Message = {
        id: uuidv4(),
        text: `Sorry, I'm having trouble connecting to my brain right now. ${specificError}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setSessions(prev => prev.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, errorMessage] }
          : session
      ));
    } finally {
      setIsBotTyping(false);
    }
  }, [activeSessionId]);

  const toggleSideNav = useCallback(() => setIsSideNavOpen(prev => !prev), []);

  return (
    <ChatContext.Provider value={{ sessions, activeSessionId, isSideNavOpen, startNewSession, loadSession, deleteSession, addMessage, toggleSideNav, isBotTyping, clearAllSessions }}>
      {children}
    </ChatContext.Provider>
  );
};
