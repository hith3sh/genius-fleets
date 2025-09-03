import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Send, X, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { agentSDK } from "@/agents";

export default function FleetAnalystWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && !conversation) {
      initializeConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (conversation) {
      const unsubscribe = agentSDK.subscribeToConversation(conversation.id, (data) => {
        setMessages(data.messages || []);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [conversation]);

  const initializeConversation = async () => {
    try {
      setError(null);
      const newConversation = await agentSDK.createConversation({
        agent_name: "fleet_analyst",
        metadata: {
          name: "Fleet Analytics Chat",
          description: "Chat with Genius, your AI Fleet Analyst"
        }
      });
      setConversation(newConversation);

      // Send initial greeting
      setTimeout(() => {
        agentSDK.addMessage(newConversation, {
          role: "user",
          content: "Hello Genius! Give me an overview of our fleet."
        });
      }, 500);
    } catch (error) {
      console.error("Error initializing conversation:", error);
      setError("Failed to connect to AI agent. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversation || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    try {
      await agentSDK.addMessage(conversation, {
        role: "user",
        content: inputMessage.trim()
      });
      setInputMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message) => {
    const isUser = message.role === 'user';
    return (
      <div key={message.id} style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{
          maxWidth: '85%',
          padding: '8px 12px',
          borderRadius: '12px',
          background: isUser ? '#7c3aed' : '#f3f4f6',
          color: isUser ? 'white' : '#374151',
          fontSize: '14px',
          lineHeight: '1.4',
          whiteSpace: 'pre-wrap'
        }}>
          {message.content}
          <div style={{
            fontSize: '10px',
            opacity: 0.7,
            marginTop: '4px',
            textAlign: 'right'
          }}>
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #7c3aed, #a855f7)',
            border: 'none',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          <BrainCircuit style={{ width: '24px', height: '24px', color: 'white' }} />
        </button>
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: '#10b981',
          color: 'white',
          fontSize: '10px',
          padding: '2px 6px',
          borderRadius: '12px',
          animation: 'pulse 2s infinite'
        }}>
          AI
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      <div style={{
        width: isMinimized ? '320px' : '400px',
        height: isMinimized ? '64px' : '550px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.2)',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(to right, #7c3aed, #a855f7)',
          color: 'white',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrainCircuit style={{ width: '24px', height: '24px' }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>Fleet Analyst AI</div>
              {!isMinimized && (
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  Genius • {conversation ? 'Connected' : 'Connecting...'}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMinimized ? <Maximize2 style={{ width: '16px', height: '16px' }} /> : <Minimize2 style={{ width: '16px', height: '16px' }} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div style={{ height: '470px', display: 'flex', flexDirection: 'column' }}>
            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              background: 'linear-gradient(to bottom, #fafafa, #ffffff)'
            }}>
              {error && (
                <div style={{
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#dc2626'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '14px' }}>{error}</span>
                </div>
              )}

              {messages.length === 0 && !error ? (
                <div style={{ textAlign: 'center', marginTop: '60px', color: '#6b7280' }}>
                  <BrainCircuit style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.5 }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                    Connecting to Genius...
                  </h3>
                  <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Your AI Fleet Analyst is initializing
                  </p>
                </div>
              ) : (
                <div>
                  {messages.map(renderMessage)}
                  {isLoading && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        background: '#f3f4f6',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#7c3aed',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }} />
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#7c3aed',
                            animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                          }} />
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#7c3aed',
                            animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                          }} />
                          <span style={{ marginLeft: '8px' }}>Genius is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #e5e7eb',
              background: 'white'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Genius about your fleet..."
                  disabled={isLoading || !conversation}
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    maxHeight: '100px',
                    padding: '10px 12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !conversation}
                  style={{
                    background: (!inputMessage.trim() || isLoading || !conversation) ? '#d1d5db' : 'linear-gradient(to right, #7c3aed, #a855f7)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px',
                    cursor: (!inputMessage.trim() || isLoading || !conversation) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Send style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: 'white'
                  }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}