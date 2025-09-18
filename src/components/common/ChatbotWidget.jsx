
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, Bot, BrainCircuit } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InvokeLLM } from '@/api/integrations';
import { agentSDK } from '@/agents';
import MessageBubble from '../agents/MessageBubble'; // Using the advanced message bubble
import { useAuth } from '@/contexts/AuthContext';

const faqData = `
<section id="al-jisr-faq" aria-labelledby="aj-faq-title">
  <h2 id="aj-faq-title">Al Jisr Car Rental – FAQ</h2>
  <dl>
    <dt>What is the minimum age to rent a car?</dt>
    <dd>21 years for most cars, 25 for luxury cars.</dd>

    <dt>What driving licence do I need as a UAE resident?</dt>
    <dd>A valid UAE driving licence held for at least 6 months.</dd>

    <dt>What licence do I need as a tourist?</dt>
    <dd>Your home-country licence and an International Driving Permit.</dd>

    <dt>How much is the security deposit?</dt>
    <dd>AED 1,000 to 5,000, held on a credit card depending on the car you choose.</dd>

    <dt>When will I get my deposit back?</dt>
    <dd>Within 25 days after fines or pending checks are cleared.</dd>

    <dt>How are rental charges calculated?</dt>
    <dd>Daily or monthly rates, with 5% VAT included.</dd>

    <dt>What insurance is included?</dt>
    <dd>Basic comprehensive insurance.</dd>

    <dt>Can I get extra insurance?</dt>
    <dd>Yes, Collision Damage Waiver (CDW) or Super CDW.</dd>

    <dt>Is there an excess or deductible?</dt>
    <dd>Yes, from AED 1,000 depending on the car and policy.</dd>

    <dt>Do I need a police report for claims?</dt>
    <dd>Yes, a police report is mandatory for all claims.</dd>

    <dt>What is the mileage limit?</dt>
    <dd>200 km per day, 6,000 km per month.</dd>

    <dt>What if I exceed the mileage limit?</dt>
    <dd>Extra charges apply per kilometre. Varies based on the car you choose.</dd>

    <dt>What is the fuel policy?</dt>
    <dd>Return the car with the same fuel level as pickup.</dd>

    <dt>Who pays traffic fines?</dt>
    <dd>The renter is fully responsible.</dd>

    <dt>How much are Salik toll charges?</dt>
    <dd>AED 5 per gate, plus admin fee.</dd>

    <dt>Are parking fines or black points included in rental price?</dt>
    <dd>No, all fines are charged to the renter.</dd>

    <dt>Is delivery available?</dt>
    <dd>Yes, in-city delivery costs AED 125 per trip.</dd>

    <dt>Do you deliver to airports or other cities?</dt>
    <dd>Yes, but higher fees or one-way charges may apply.</dd>

    <dt>Is delivery free?</dt>
    <dd>Sometimes for monthly rentals.</dd>

    <dt>Can I drive the rental car off-road?</dt>
    <dd>No, off-roading and desert driving are not allowed.</dd>

    <dt>Can I use the car for Uber or Careem?</dt>
    <dd>No, commercial use is prohibited.</dd>

    <dt>Can I cross borders with the car?</dt>
    <dd>No, unless approved by the rental provider.</dd>

    <dt>Can I smoke in the car?</dt>
    <dd>No, smoking or vaping is prohibited.</dd>

    <dt>What should I do if I have an accident?</dt>
    <dd>Call the police and rental company immediately.</dd>

    <dt>Is a police report required for accidents?</dt>
    <dd>Yes, or you will be fully liable for damages.</dd>

    <dt>Will I get a replacement car?</dt>
    <dd>Yes, at extra charges.</dd>

    <dt>Can young or new drivers rent a car?</dt>
    <dd>Yes, but may face extra charges or higher deposits.</dd>

    <dt>Can I get CDW or SCDW if I am a new driver?</dt>
    <dd>Yes.</dd>

    <dt>What is your cancellation policy?</dt>
    <dd>Early return may allow a partial refund. Cancellation fees may apply.</dd>

    <dt>What happens if I do not show up on time?</dt>
    <dd>The booking may be cancelled after 2 hours with no refund.</dd>

    <dt>What are the types of cars available?</dt>
    <dd>We have Economy, Hatch Back, Luxury, SUV and Sports cars.</dd>

    <dt>Do you drop and pick up the car from Airport?</dt>
    <dd>Yes, we do drop and pick-up from the airport. It will cost AED 250 per side.</dd>
  </dl>
</section>
`;

export default function ChatbotWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false); // Changed from isTyping
  const [language, setLanguage] = useState('Arabic'); // Default to Arabic
  const [isListening, setIsListening] = useState(false);
  const [isLastInputVoice, setIsLastInputVoice] = useState(false);
  const recognitionRef = useRef(null);

  // New state for agent integration
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]); // Initialized as empty, content set in useEffect

  // --- Greetings, Titles, and Placeholders ---
  const publicGreetings = {
    'Arabic': "مرحباً! أنا سلمى، كيف يمكنني مساعدتك اليوم مع الجسر لتأجير السيارات؟",
    'English': "Hi! I am Janet, How can I assist you today with Al Jisr Car Rental?",
    'Russian': "Привет! Я Джанет, чем могу помочь вам сегодня с Al Jisr Car Rental?",
    'Hindi': "नमस्ते! मैं जेनेट हूँ, आज मैं अल जिसर कार रेंटल के साथ आपकी किस प्रकार सहायता कर सकती हूँ?"
  };
  const analystGreeting = "Hello! I'm Genius, your Fleet Analyst. Ask me anything about your fleet data.";

  const publicTitles = {
    'Arabic': "سلمى – مساعدتك",
    'English': "Janet - Your Assistant",
    'Russian': "Джанет – ваш помощник",
    'Hindi': "जेनेट – आपकी सहायक"
  };
  const analystTitle = "Genius - Fleet Analyst";

  const languageLabels = {
    'Arabic': "العربية",
    'English': "English",
    'Russian': "Русский",
    'Hindi': "हिन्दी / اردو"
  };

  const publicPlaceholders = {
    'Arabic': "اكتب رسالتك أو اضغط على الميكروفون للتحدث....",
    'English': "Type your message or press mic to speak....",
    'Russian': "Введите сообщение или нажмите на микрофон, чтобы говорить....",
    'Hindi': "अपना संदेश लिखें या बोलने के लिए माइक दबाएं...."
  };
  const analystPlaceholder = "Ask about revenue, booked vehicles, etc...";

  const langCodeMap = {
    'Arabic': 'ar-SA',
    'English': 'en-US',
    'Russian': 'ru-RU',
    'Hindi': 'hi-IN'
  };

  const languageOrder = ['Arabic', 'English', 'Russian', 'Hindi'];
  
  const iconUrl = "/api/files/base44-prod/public/b357bafe5_IAMONLINEstatic.jpg";
  const logoUrl = "/api/files/base44-prod/public/4492b025e_AlJisrCarRentals.png";


  useEffect(() => {
    // Reset and set initial message when widget opens or user/language changes
    if (isOpen) {
      if (user) {
        // Authenticated user mode
        setMessages([{ role: 'assistant', content: analystGreeting }]);
        // Create a new agent conversation when opening the widget
        agentSDK.createConversation({
          agent_name: "fleet_analyst",
          metadata: { name: `Analyst Chat - ${user.full_name}` }
        }).then(setConversation);
      } else {
        // Public mode
        setMessages([{ role: 'assistant', content: publicGreetings[language] }]);
        setConversation(null); // Ensure conversation is null for public mode
      }
    } else {
      // Clear messages when widget closes
      setMessages([]);
      setConversation(null);
    }
  }, [isOpen, user, language, publicGreetings]); // Added publicGreetings to deps to avoid stale closure

  useEffect(() => {
    // Subscribe to agent conversation updates
    if (conversation) {
        const unsubscribe = agentSDK.subscribeToConversation(conversation.id, (data) => {
            // Transform messages from agent SDK format if necessary, or ensure MessageBubble handles it.
            // Assuming agent SDK messages are compatible with { role, content }
            setMessages(data.messages || []);
        });
        return () => unsubscribe();
    }
  }, [conversation]);

  const speak = (text, lang) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Sorry, your browser doesn't support text-to-speech.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCodeMap[lang] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (inputText.trim() === '' || isSending || isListening) return;

    const textToSend = inputText;
    setInputText('');
    setIsSending(true);
    
    if (user && conversation) {
        // AGENT MODE for logged-in users
        // Messages will be updated via the subscription from agentSDK.addMessage
        await agentSDK.addMessage(conversation, { role: 'user', content: textToSend });
    } else {
        // PUBLIC FAQ MODE for guests
        const newUserMessage = { role: 'user', content: textToSend };
        
        // Add user message and a loading message to the chat
        setMessages(prev => [...prev, newUserMessage, { role: 'assistant', isLoading: true }]);
        
        const botName = language === 'Arabic' ? 'Salma' : 'Janet';
        const prompt = `
          You are ${botName}, a helpful assistant for Al Jisr Car Rental. 
          Answer the user's question based ONLY on the FAQ information provided below.
          If the answer isn't in the information, politely state that you cannot find the answer and suggest contacting support.
          Keep your answers concise and friendly.
          IMPORTANT: You MUST formulate your answer in the following language: ${language}.

          --- FAQ Information ---
          ${faqData}
          --- End of FAQ Information ---

          User's question: "${textToSend}"
        `;

        try {
            const response = await InvokeLLM({ prompt });
            setMessages(prev => prev.map(m => m.isLoading ? { role: 'assistant', content: response } : m));
            if (isLastInputVoice) {
              speak(response, language);
            }
        } catch (error) {
            console.error("Error invoking LLM:", error);
            setMessages(prev => prev.map(m => m.isLoading ? { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." } : m));
        }
    }
    
    setIsSending(false);
    setIsLastInputVoice(false); // Reset flag
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    // Stop any ongoing speech synthesis before starting recognition
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = langCodeMap[language] || 'en-US'; // Use public language for mic input even in agent mode for consistency
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
      setInputText(transcript);
      setIsLastInputVoice(true); // Flag that this input originated from voice
    };

    recognitionRef.current.start();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-sm h-[80vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200/50 z-[100]"
            dir={!user && language === 'Arabic' ? 'rtl' : 'ltr'}
          >
            <header className="p-4 border-b bg-gray-50 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center ring-1 ring-gray-200">
                    {user ? <BrainCircuit className="w-5 h-5 text-teal-600" /> : <img src={logoUrl} alt="Logo" className="w-6 h-6 object-contain" />}
                  </div>
                  <h3 className="font-semibold text-gray-800">{user ? analystTitle : publicTitles[language]}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {!user && (
                <RadioGroup value={language} onValueChange={setLanguage} className="flex items-center justify-around">
                  {languageOrder.map(lang => (
                    <div key={lang} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang} id={lang} />
                      <Label htmlFor={lang} className="text-xs font-medium">{languageLabels[lang]}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-br from-rose-50 via-purple-100 to-blue-100">
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={{ ...msg, language: language }} />
              ))}
              {isSending && user && ( // Show "Genius is thinking..." only in analyst mode when sending
                  <div className="flex justify-start">
                      <div className="p-2 text-xs text-slate-500">Genius is thinking...</div>
                  </div>
              )}
            </div>

            <footer className="p-3 border-t bg-gray-50 rounded-b-2xl flex items-center gap-2">
              <input
                type="text"
                placeholder={user ? analystPlaceholder : publicPlaceholders[language]}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value)
                  setIsLastInputVoice(false); // If user types, it's not voice input
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                dir={!user && language === 'Arabic' ? 'rtl' : 'ltr'}
                lang={!user && language === 'Arabic' ? 'ar' : 'en'}
                disabled={isSending || isListening}
              />
               <button 
                  onClick={handleMicClick} 
                  className={`p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors ${isListening ? 'animate-pulse bg-red-200 text-red-600' : ''}`} 
                  disabled={isSending}
                >
                  <Mic className="w-5 h-5" />
                </button>
              <button onClick={handleSend} className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors" disabled={isSending || !inputText.trim()}>
                <Send className="w-5 h-5" />
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="fixed bottom-6 right-6 z-[100] cursor-pointer group"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <img 
          src={iconUrl} 
          alt="AI Chatbot" 
          className="w-20 h-20 rounded-full object-cover bg-white shadow-2xl border-4 border-white/50 transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
    </>
  );
}
