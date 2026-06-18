import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../translations';
import { MessageSquare, X, Send, Sparkles, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

interface VaigaiChatbotProps {
  currentLang: 'en' | 'ta' | 'hi';
  theme: 'dark' | 'light';
}

export default function VaigaiChatbot({
  currentLang,
  theme
}: VaigaiChatbotProps) {
  const t = TRANSLATIONS[currentLang];
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: currentLang === 'ta'
        ? "வணக்கம்! நான் **வைகை**, உங்கள் தமிழ் பண்பாட்டு சுற்றுலா உதவியாளர். தஞ்சை கோயில் ரகசியங்கள், செட்டிநாடு உணவு வகைகள், அல்லது ஊட்டி மலைச்சாரல் பற்றி என்னிடம் கேளுங்கள்!"
        : currentLang === 'hi'
          ? "नमस्ते! मैं **वैगई** हूँ, आपकी तमिलनाडु सांस्कृतिक यात्रा सहायक। द्रविड़ वास्तुकला, चेटिनाड भोजन, या छिपे झरनों के बारे में मुझसे कुछ भी पूछें!"
          : "Welcome! I am **Vaigai**, your cultural operating system assistant. Ask me anything about Chola architectural secrets, Chettinad food hotspots, or hidden waterfalls!"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isChatLoading, isOpen]);

  useEffect(() => {
    setChatMessages([
      {
        sender: 'assistant',
        text: currentLang === 'ta'
          ? "வணக்கம்! நான் **வைகை**, உங்கள் தமிழ் பண்பாட்டு சுற்றுலா உதவியாளர். தஞ்சை கோயில் ரகசியங்கள், செட்டிநாடு உணவு வகைகள், அல்லது ஊட்டி மலைச்சாரல் பற்றி என்னிடம் கேளுங்கள்!"
          : currentLang === 'hi'
            ? "नमस्ते! मैं **वैगई** हूँ, आपकी तमिलनाडु सांस्कृतिक यात्रा सहायक। द्रविड़ वास्तुकला, चेटिनाड भोजन, या छिपे झरनों के बारे में मुझसे कुछ भी पूछें!"
            : "Welcome! I am **Vaigai**, your cultural operating system assistant. Ask me anything about Chola architectural secrets, Chettinad food hotspots, or hidden waterfalls!"
      }
    ]);
  }, [currentLang]);

  const chatPresets = [
    currentLang === 'ta' ? "சிதம்பரம் நடராஜர் ஆலயம் சிறப்புகள்" : currentLang === 'hi' ? "चेटिनाड के सर्वश्रेष्ठ भोजन" : "What food should I try in Chettinad?",
    currentLang === 'ta' ? "கோயம்புத்தூர் அருகே நீர்வீழ்ச்சிகள்" : currentLang === 'hi' ? "कोयंबटूर के पास झरने" : "Suggest hidden waterfalls near Coimbatore",
    currentLang === 'ta' ? "மறைக்கப்பட்ட சுற்றுலா இடங்கள்" : currentLang === 'hi' ? "भीड़भाड़ से मुक्त विरासत स्थल" : "Show less crowded heritage sites"
  ];

  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim()) return;
    
    // Append user message
    setChatMessages(prev => [...prev, { sender: 'user', text: msgText }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msgText }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'assistant', text: data.text }]);
    } catch (e) {
      console.error(e);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: currentLang === 'ta'
            ? "மன்னிக்கவும், வைகை செயற்கை நுண்ணறிவு இணைப்பில் ஒரு தற்காலிக தடை ஏற்பட்டது. Chola/Pandya மன்னர்கள் பற்றி தொடர்ந்து வினவுங்கள்!"
            : currentLang === 'hi'
              ? "क्षमा करें, वैगई नेटवर्क विफलता के कारण प्रतिक्रिया देने में असमर्थ है। कृपया दोबारा प्रयास करें।"
              : "Apologies, I encountered a brief sync interruption. Let me search my local database to assist you on Tamil dynasties!"
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Chat Window panel */}
      {isOpen && (
        <div className={`w-80 md:w-96 h-[500px] mb-4 rounded-3xl border shadow-2xl flex flex-col backdrop-blur-2xl overflow-hidden transition-all duration-300 transform scale-100 ${
          isDark 
            ? 'bg-[#001730]/95 border-white/10 text-white' 
            : 'bg-white/95 border-amber-900/15 text-slate-800 shadow-xl shadow-amber-900/10'
        }`}>
          {/* Chat Window Header */}
          <div className="p-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]"></div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[#001F3F] text-xs">
                  {t.aiChatbotTitle}
                </h4>
                <span className="text-[9px] text-[#001F3F]/70 font-bold block leading-none">Culture Operating System</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#001F3F]/60 hover:text-[#001F3F] transition-colors p-1 rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messaging logs */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin"
          >
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] border leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37]/35 text-white rounded-tr-none ml-auto'
                      : isDark
                        ? 'bg-white/5 border-white/5 rounded-tl-none text-white/95'
                        : 'bg-slate-50 border-slate-200/60 rounded-tl-none text-slate-800 shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.text.split('**').map((part, index) =>
                      index % 2 === 1 ? <strong key={index} className="text-[#D4AF37] font-extrabold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 text-[11px] text-white/50 w-[70%]">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="ml-1 text-[10px]">Consulting ancient scrolls...</span>
              </div>
            )}
          </div>

          {/* Chat presets quick suggestions */}
          <div className="px-4 py-2 bg-black/20 border-t border-white/5 shrink-0 text-[10px] space-y-1">
            <span className="text-white/40 block font-bold text-[9px] uppercase tracking-wider">{t.presetsTitle}</span>
            <div className="flex flex-col gap-1 text-left">
              {chatPresets.map(preset => (
                <button
                  key={preset}
                  onClick={() => handleSendMessage(preset)}
                  className="text-left py-1 text-white/60 hover:text-[#D4AF37] truncate font-bold text-[10.5px] leading-none"
                >
                  ✦ "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input form */}
          <div className="p-3 bg-black/25 border-t border-white/5 shrink-0 flex gap-2">
            <input
              type="text"
              placeholder={t.askChatbot}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
              className={`flex-1 bg-transparent px-4 py-2.5 rounded-xl text-xs outline-none focus:border-[#D4AF37]/50 border ${
                isDark ? 'border-white/10 text-white' : 'border-slate-300 text-slate-800'
              }`}
            />
            <button
              onClick={() => handleSendMessage(chatInput)}
              className="w-10 h-10 bg-[#D4AF37] hover:opacity-90 text-[#001F3F] rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating launcher Bubble with glowing effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#001F3F] rounded-full flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30 border-2 border-white/15 hover:scale-105 active:scale-95 transition-all relative group cursor-pointer"
        title="Vaigai AI Companion"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[3]" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-[#001f3f] rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-[#001f3f] rounded-full"></span>
          </>
        )}
      </button>
    </div>
  );
}
