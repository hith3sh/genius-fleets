
import React, { useState, useEffect, useRef } from 'react';
import { agentSDK } from '@/agents';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Plus, BrainCircuit, MessageSquare, Loader2, Mic } from 'lucide-react';
import MessageBubble from '../components/agents/MessageBubble';

export default function FleetAnalyst() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const agentName = 'fleet_analyst';

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (currentConversation) {
      const unsubscribe = agentSDK.subscribeToConversation(currentConversation.id, (data) => {
        setMessages(data.messages);
        scrollToBottom();
      });

      return () => unsubscribe();
    }
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    setIsLoading(true);
    const convos = await agentSDK.listConversations({ agent_name: agentName });
    setConversations(convos);
    if (convos.length > 0) {
      selectConversation(convos[0]);
    } else {
      handleNewConversation();
    }
    setIsLoading(false);
  };

  const handleNewConversation = async () => {
    const newConvo = await agentSDK.createConversation({
      agent_name: agentName,
      metadata: { name: `Analysis ${new Date().toLocaleString()}` },
    });
    setConversations([newConvo, ...conversations]);
    selectConversation(newConvo);
  };

  const selectConversation = (convo) => {
    setCurrentConversation(convo);
    setMessages(convo.messages || []);
  };

  const handleSendMessage = async () => {
    console.log('Sending message:', newMessage);
    console.log('Current conversation:', currentConversation);
    console.log('Is sending:', isSending);
    
    if (!newMessage.trim() || !currentConversation || isSending) return;

    setIsSending(true);
    try {
      await agentSDK.addMessage(currentConversation, {
        role: 'user',
        content: newMessage,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsSending(false);
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewMessage(transcript);
    };

    recognitionRef.current.start();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
        <span className="ml-2 text-slate-600">Loading AI Analyst...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      <div className="w-72 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-violet-600" />
            Conversations
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => selectConversation(convo)}
              className={`w-full text-left px-4 py-3 text-sm truncate ${
                currentConversation?.id === convo.id ? 'bg-violet-100 text-violet-800 font-semibold' : 'hover:bg-slate-100'
              }`}
            >
              {convo.metadata?.name || 'New Conversation'}
            </button>
          ))}
        </div>
        <div className="p-4 border-t">
          <Button onClick={handleNewConversation} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-violet-600" />
          <div>
            <h1 className="text-xl font-bold">Fleet Analyst "Genius"</h1>
            <p className="text-sm text-slate-500">
              Ask questions about your fleet status, bookings, and revenue.
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t">
          {/* Debug info */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: isLoading={String(isLoading)}, isSending={String(isSending)}, isListening={String(isListening)}, 
            hasConversation={String(!!currentConversation)}, messageLength={newMessage.length}
          </div>
          <div className="flex items-center gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => {
                console.log('Input changed:', e.target.value);
                setNewMessage(e.target.value);
              }}
              placeholder="Ask Genius, or press the mic to speak..."
              className="flex-1 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onFocus={() => console.log('Textarea focused')}
              onBlur={() => console.log('Textarea blurred')}
              rows={2}
              disabled={isListening || isSending}
            />
            <Button
              type="button"
              onClick={handleMicClick}
              variant="outline"
              size="icon"
              className={`flex-shrink-0 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100'}`}
              disabled={isSending}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={isSending || !newMessage.trim()}
              size="icon"
              className="flex-shrink-0"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
