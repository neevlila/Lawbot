import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { ChatSession, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

// NOTE: The Google Generative AI client is a Node-oriented library and must not be imported
// at module load time in the browser (it can break the client bundle). We dynamically import
// it inside `addMessage` only when an API key is configured. Use a loose Content type here.
type Content = any;
let genAI: any = null;

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
  // Ephemeral suggestion data (not persisted to localStorage)
  suggestionsBySession: Record<string, string[]>;
  clearSuggestionsForSession: (sessionId: string) => void;
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
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
if (!apiKey) {
  console.warn("Gemini API key not found. Add VITE_GEMINI_API_KEY to your .env to enable AI responses.");
}
// -------------------------

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  // Initialize sidebar state based on screen width (closed on mobile by default)
  const [isSideNavOpen, setIsSideNavOpen] = useState(() => window.innerWidth >= 1024);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [suggestionsBySession, setSuggestionsBySession] = useState<Record<string, string[]>>({});
  const isInitialized = useRef(false);

  const setSuggestionsForSession = useCallback((sessionId: string, suggestions: string[]) => {
    setSuggestionsBySession(prev => ({ ...prev, [sessionId]: suggestions }));
  }, []);

  const clearSuggestionsForSession = useCallback((sessionId: string) => {
    setSuggestionsBySession(prev => {
      const copy = { ...prev };
      delete copy[sessionId];
      return copy;
    });
  }, []);

  const startNewSession = useCallback(() => {
    setSessions(prev => {
      // Check if the most recent session is "empty" (only has the initial bot greeting)
      // If so, reuse it instead of creating a new one.
      const mostRecentSession = prev[0];
      if (mostRecentSession && mostRecentSession.messages.length === 1 && mostRecentSession.messages[0].sender === 'bot') {
        setActiveSessionId(mostRecentSession.id);
        return prev;
      }

      // Otherwise, create a new session
      const newSession: ChatSession = {
        id: uuidv4(),
        title: 'New Chat',
        messages: [initialBotMessage],
        createdAt: new Date(),
      };
      setActiveSessionId(newSession.id);
      return [newSession, ...prev];
    });
  }, []);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

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
  }, []); 

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
          const newSession: ChatSession = {
            id: uuidv4(),
            title: 'New Chat',
            messages: [initialBotMessage],
            createdAt: new Date(),
          };
          setActiveSessionId(newSession.id);
          return [newSession];
        }
      }
      return remainingSessions;
    });
  }, [activeSessionId]);
  
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
    
    // 1. Calculate history synchronously from current sessions state
    const currentSession = sessions.find(s => s.id === activeSessionId);
    const previousMessages = currentSession ? currentSession.messages : [];
    
    // Filter out the initial bot greeting if it exists, to keep context clean
    const historyStartIndex = previousMessages.length > 0 && previousMessages[0].sender === 'bot' ? 1 : 0;
    
    historyForApi = previousMessages
      .slice(historyStartIndex)
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

    setSessions(prev => {
        const activeSession = prev.find(s => s.id === activeSessionId);
        if (!activeSession) return prev;

        const updatedTitle = activeSession.title === 'New Chat'
          ? text.substring(0, 30) + (text.length > 30 ? '...' : '')
          : activeSession.title;

        return prev.map(session =>
          session.id === activeSessionId
            ? { ...session, messages: [...session.messages, userMessage], title: updatedTitle }
            : session
        );
    });

    // Clear ephemeral suggestions when the user takes an explicit action
    if (activeSessionId) {
      clearSuggestionsForSession(activeSessionId);
    }

    setIsBotTyping(true);

    try {
      // Dynamically import & initialize Gemini client at call-time to avoid bundling issues
      if (!genAI) {
        if (!apiKey) {
          throw new Error("not configured");
        }
        try {
          const module = await import('@google/generative-ai');
          const GoogleGenerativeAI = module.GoogleGenerativeAI;
          genAI = new GoogleGenerativeAI(apiKey);
        } catch (impErr) {
          console.error('Dynamic import of @google/generative-ai failed:', impErr);
          throw new Error('not configured');
        }
      }

      // UPDATED MODEL TO gemini-2.5-flash
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a legal assistant. Provide concise, direct answers. Do not repeat the user's question or the chat history in your response. Use Markdown formatting for clarity. Format lists properly."
      });
      
      const chat = model.startChat({ history: historyForApi });
      const result = await chat.sendMessage(text);
      const response = result.response;
      const botResponseText = response.text();

      const botMessage: Message = { id: uuidv4(), text: botResponseText, sender: 'bot', timestamp: new Date(), type: 'text' };
      
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
          specificError = "The provided API key is not valid. Please check your .env file.";
        } else if (error.message.includes("429")) {
          specificError = "I'm experiencing high traffic right now. Please wait a moment and try again.";
        } else if (error.message.includes("400")) {
          specificError = "There was an issue with the request. Please try rephrasing your message.";
        } else if (error.message.includes("500")) {
          specificError = "The AI service is currently unavailable. Please try again later.";
        } else if (error.message.includes("fetch failed")) {
          specificError = "I'm having trouble connecting to the network. Please check your internet connection.";
        } else if (error.message.includes("not configured")) {
          specificError = "The Gemini API key has not been configured. Please add it to your .env file.";
        } else if (error.message.includes("404")) {
           specificError = "The AI model is currently unavailable. Please check the model configuration.";
        }
      }

      const errorMessage: Message = {
        id: uuidv4(),
        text: `Sorry — I couldn't get a response just now. ${specificError}`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'case',
      };

      setSessions(prev => prev.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, errorMessage] }
          : session
      ));
    } finally {
      setIsBotTyping(false);
    }
  }, [activeSessionId, sessions]);

  const toggleSideNav = useCallback(() => setIsSideNavOpen(prev => !prev), []);

  return (
    <ChatContext.Provider value={{ sessions, activeSessionId, isSideNavOpen, startNewSession, loadSession, deleteSession, addMessage, toggleSideNav, isBotTyping, clearAllSessions, suggestionsBySession, clearSuggestionsForSession }}>
      {children}
    </ChatContext.Provider>
  );
};
