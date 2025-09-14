// Fleet Analyst Agent SDK - Mock implementation for development
// This provides a working interface while AI agent functionality is being developed

class MockAgentSDK {
  constructor() {
    this.conversations = [];
    this.subscribers = new Map();
    this.messageIdCounter = 1;
  }

  // Generate mock conversation ID
  generateId() {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate mock message ID
  generateMessageId() {
    return `msg_${this.messageIdCounter++}`;
  }

  // List conversations for an agent
  async listConversations({ agent_name }) {
    try {
      // Return conversations for this agent
      return this.conversations.filter(conv => conv.agent_name === agent_name);
    } catch (error) {
      console.error('Error listing conversations:', error);
      return [];
    }
  }

  // Create a new conversation
  async createConversation({ agent_name, metadata = {} }) {
    try {
      const conversation = {
        id: this.generateId(),
        agent_name,
        metadata: {
          name: metadata.name || `Analysis ${new Date().toLocaleString()}`,
          description: metadata.description || 'Fleet Analytics Conversation',
          ...metadata
        },
        messages: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      this.conversations.unshift(conversation);
      
      // Send initial AI greeting
      setTimeout(() => {
        this.addMessage(conversation, {
          role: 'assistant',
          content: `Hello! I'm Genius, your AI Fleet Analyst. I can help you analyze your fleet data, answer questions about vehicle performance, bookings, maintenance, and provide insights to optimize your operations.\n\nWhat would you like to know about your fleet today?`
        });
      }, 1000);

      return conversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  // Add a message to a conversation
  async addMessage(conversation, message) {
    try {
      const newMessage = {
        id: this.generateMessageId(),
        role: message.role,
        content: message.content,
        timestamp: new Date().toISOString(),
        ...message
      };

      // Find the conversation and add the message
      const conv = this.conversations.find(c => c.id === conversation.id);
      if (conv) {
        conv.messages.push(newMessage);
        conv.updated_at = new Date().toISOString();

        // Notify subscribers
        this.notifySubscribers(conversation.id, conv);

        // If user message, generate AI response
        if (message.role === 'user') {
          setTimeout(() => {
            this.generateAIResponse(conversation, message.content);
          }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s
        }
      }

      return newMessage;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  // Generate AI response (mock)
  async generateAIResponse(conversation, userMessage) {
    try {
      const responses = this.getContextualResponse(userMessage);
      const response = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      const conv = this.conversations.find(c => c.id === conversation.id);
      if (conv) {
        conv.messages.push(aiMessage);
        conv.updated_at = new Date().toISOString();
        this.notifySubscribers(conversation.id, conv);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  }

  // Get contextual responses based on user input
  getContextualResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('fleet') && message.includes('status')) {
      return [
        "Based on your current fleet data, you have several vehicles in active service. Here's what I can tell you:\n\n• **Active Vehicles**: Most of your fleet is currently available for booking\n• **Maintenance Status**: Some vehicles are due for scheduled maintenance\n• **Utilization**: Your fleet utilization rate appears to be healthy\n\nWould you like me to analyze specific aspects like maintenance schedules, booking patterns, or revenue performance?",
        "Your fleet status shows good overall health. I can see vehicles across different categories with varying utilization rates. Key insights:\n\n• Several vehicles have high booking rates\n• Maintenance schedules are mostly up to date\n• Revenue per vehicle varies significantly\n\nWhat specific metrics would you like me to dive deeper into?"
      ];
    }

    if (message.includes('maintenance') || message.includes('service')) {
      return [
        "Looking at your maintenance data, I can provide several insights:\n\n• **Upcoming Services**: You have vehicles approaching their service intervals\n• **Cost Analysis**: Maintenance costs have been within expected ranges\n• **Preventive Care**: Regular maintenance is helping avoid major repairs\n\nWould you like me to identify which vehicles need immediate attention or analyze maintenance cost trends?",
        "Your maintenance tracking shows a proactive approach. Here's what stands out:\n\n• Most vehicles are on schedule for regular services\n• Some high-mileage vehicles may need more frequent attention\n• Maintenance costs are predictable and manageable\n\nShall I create a priority list for upcoming maintenance needs?"
      ];
    }

    if (message.includes('booking') || message.includes('reservation')) {
      return [
        "Analyzing your booking patterns, I notice:\n\n• **Peak Periods**: Weekends and holidays show higher demand\n• **Popular Vehicles**: Certain vehicle types are booked more frequently\n• **Duration Trends**: Most bookings are for 2-7 day periods\n\nWould you like me to analyze booking trends by vehicle type, customer segments, or seasonal patterns?",
        "Your booking data reveals interesting trends:\n\n• Customer preferences lean toward specific vehicle categories\n• Booking lead times vary by season\n• Revenue per booking has been stable\n\nI can provide detailed analysis on booking optimization or customer behavior patterns. What interests you most?"
      ];
    }

    if (message.includes('revenue') || message.includes('profit') || message.includes('income')) {
      return [
        "Revenue analysis shows:\n\n• **Total Performance**: Your fleet is generating consistent revenue\n• **Vehicle ROI**: Some vehicles significantly outperform others\n• **Seasonal Trends**: Revenue peaks during holiday periods\n\nI can break down revenue by vehicle, customer type, or time period. What specific analysis would be most valuable?",
        "Financial performance indicators look positive:\n\n• Revenue per vehicle varies but trends upward\n• High-demand vehicles are your top earners\n• Operational costs are well-controlled\n\nShould I analyze profit margins, identify underperforming assets, or forecast future revenue?"
      ];
    }

    if (message.includes('customer') || message.includes('client')) {
      return [
        "Customer insights from your data:\n\n• **Repeat Customers**: You have a strong base of returning clients\n• **Booking Patterns**: Customer preferences are identifiable\n• **Satisfaction Indicators**: Low complaint rates suggest good service\n\nWould you like me to analyze customer segments, loyalty patterns, or identify opportunities for growth?",
        "Your customer base shows healthy characteristics:\n\n• Mix of individual and corporate clients\n• Good customer retention rates\n• Diverse booking preferences\n\nI can provide deeper analysis on customer lifetime value, segment profitability, or expansion opportunities."
      ];
    }

    // Default responses for general queries
    return [
      "I'd be happy to help analyze your fleet data! I can provide insights on:\n\n• **Fleet Status & Utilization**\n• **Maintenance & Service Schedules**\n• **Booking Patterns & Trends**\n• **Revenue & Profitability**\n• **Customer Analytics**\n\nWhat specific area would you like me to focus on?",
      "Great question! As your Fleet Analyst, I can dive deep into various aspects of your operations. I can analyze:\n\n• Vehicle performance and utilization\n• Financial metrics and profitability\n• Customer behavior and preferences\n• Operational efficiency opportunities\n• Predictive maintenance needs\n\nWhat would be most valuable for your business right now?",
      "I'm here to help optimize your fleet operations! Based on the data available, I can provide analysis and recommendations on fleet management, customer satisfaction, revenue optimization, and operational efficiency.\n\nWhat specific challenge or opportunity would you like me to investigate?"
    ];
  }

  // Subscribe to conversation updates
  subscribeToConversation(conversationId, callback) {
    if (!this.subscribers.has(conversationId)) {
      this.subscribers.set(conversationId, new Set());
    }
    
    this.subscribers.get(conversationId).add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(conversationId);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(conversationId);
        }
      }
    };
  }

  // Notify subscribers of conversation updates
  notifySubscribers(conversationId, conversation) {
    const callbacks = this.subscribers.get(conversationId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(conversation);
        } catch (error) {
          console.error('Error in conversation subscriber:', error);
        }
      });
    }
  }

  // Legacy chat method for backward compatibility
  async chat() {
    throw new Error('Use createConversation and addMessage instead of chat method');
  }
}

// Create singleton instance
export const agentSDK = new MockAgentSDK();