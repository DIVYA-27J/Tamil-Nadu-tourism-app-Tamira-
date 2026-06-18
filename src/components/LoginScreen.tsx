import React, { useState } from 'react';
import { TRANSLATIONS } from '../translations';
import { Sparkles, Globe, Moon, Sun, Key, Compass, BookOpen, Activity, Waves, Mountain, Utensils, ShoppingBag } from 'lucide-react';
import { TamiraLogo } from './TamiraLogo';

interface LoginScreenProps {
  onLogin: (user: {
    name: string;
    email: string;
    interests: string[];
    lang: 'en' | 'ta' | 'hi';
    theme: 'dark' | 'light';
  }) => void;
  currentLang: 'en' | 'ta' | 'hi';
  onChangeLang: (lang: 'en' | 'ta' | 'hi') => void;
  currentTheme: 'dark' | 'light';
  onChangeTheme: (theme: 'dark' | 'light') => void;
}

export default function LoginScreen({
  onLogin,
  currentLang,
  onChangeLang,
  currentTheme,
  onChangeTheme
}: LoginScreenProps) {
  const t = TRANSLATIONS[currentLang];
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Temples', 'Heritage']);

  const categories = [
    { id: 'Temples', label: t.interestTemples, icon: Compass },
    { id: 'Heritage Sites', label: t.interestHeritage, icon: BookOpen },
    { id: 'Wildlife', label: t.interestWildlife, icon: Activity },
    { id: 'Beaches', label: t.interestBeaches, icon: Waves },
    { id: 'Hill Stations', label: t.interestHillStations, icon: Mountain },
    { id: 'Food', label: t.interestFood, icon: Utensils },
    { id: 'Shopping', label: t.interestShopping, icon: ShoppingBag },
    { id: 'Adventure', label: t.interestAdventure, icon: Compass }
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(prev => prev.filter(x => x !== id));
    } else {
      setSelectedInterests(prev => [...prev, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({
      name,
      email: email || 'visitor@tnstn.gov',
      interests: selectedInterests,
      lang: currentLang,
      theme: currentTheme
    });
  };

  const isDark = currentTheme === 'dark';

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-500 ${isDark ? 'bg-[#071C36] text-white' : 'bg-[#F4E9D2] text-[#071C36]'}`}>
      
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[80vw] h-[80vh] rounded-full blur-[140px] ${isDark ? 'bg-[#0a294d]' : 'bg-[#C8A25A]/20'}`}></div>
        <div className={`absolute bottom-[-5%] right-[-5%] w-[65vw] h-[65vh] rounded-full blur-[110px] opacity-25 ${isDark ? 'bg-[#C8A25A]' : 'bg-[#071C36]/10'}`}></div>
      </div>

      {/* Language / Theme floating switcher top right */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
        {/* Language select */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-[#C8A25A]/30 text-[#071C36] shadow-sm'}`}>
          <Globe className="w-3.5 h-3.5 text-[#C8A25A]" />
          <select
            value={currentLang}
            onChange={(e) => onChangeLang(e.target.value as 'en' | 'ta' | 'hi')}
            className="bg-transparent outline-none cursor-pointer font-bold text-xs"
          >
            <option value="en" className="text-black">English</option>
            <option value="ta" className="text-black font-tamil">தமிழ்</option>
            <option value="hi" className="text-black">हिन्दी</option>
          </select>
        </div>

        {/* Theme select */}
        <button
          onClick={() => onChangeTheme(isDark ? 'light' : 'dark')}
          className={`p-2.5 rounded-full border transition-all ${isDark ? 'bg-black/30 border-white/10 text-[#C8A25A] hover:bg-white/5' : 'bg-white border-[#C8A25A]/30 text-[#071C36] shadow-sm hover:bg-slate-50'}`}
          title={isDark ? t.themeLight : t.themeDark}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Main card */}
      <div className={`mt-10 max-w-xl w-full rounded-2xl p-6 md:p-8 backdrop-blur-xl border relative z-10 transition-all shadow-[0_12px_40px_rgba(7,28,54,0.15)] ${isDark ? 'bg-[#030e1c]/80 border-[#C8A25A]/20 text-white' : 'bg-white/95 border-[#C8A25A]/40 text-[#071C36]'}`}>
        
        <div className="text-center space-y-2.5 mb-6">
          <TamiraLogo size={110} className="mb-2" />
          <p className={`text-xs max-w-md mx-auto leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-[#071C36]/80'}`}>
            {t.loginSubtitle || "An immersive digital gateway to Tamil Nadu's ancient civilization."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#C8A25A]/80 mb-1.5">
                {t.fullName} *
              </label>
              <input
                type="text"
                required
                placeholder="E.g. Meenakshi Sundaram"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-xs md:text-sm outline-none font-semibold transition-all ${isDark ? 'bg-black/35 border border-white/10 text-white focus:border-[#C8A25A]' : 'bg-slate-100 border border-slate-200 text-[#071C36] focus:border-[#C8A25A]'}`}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#C8A25A]/80 mb-1.5">
                {t.emailOrPhone}
              </label>
              <input
                type="text"
                placeholder="E.g. meenakshi@example.com or +91 944..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-xs md:text-sm outline-none font-semibold transition-all ${isDark ? 'bg-black/35 border border-white/10 text-white focus:border-[#C8A25A]' : 'bg-slate-100 border border-slate-200 text-[#071C36] focus:border-[#C8A25A]'}`}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#C8A25A]/80">
              {t.chooseInterests}
            </label>
            
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => {
                const active = selectedInterests.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleInterest(cat.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all outline-none ${
                      active
                        ? 'bg-[#C8A25A]/15 border-[#C8A25A] text-[#C8A25A]'
                        : isDark
                          ? 'bg-black/25 border-white/5 text-white/70 hover:bg-white/5'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <cat.icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#C8A25A]' : 'text-slate-400'}`} />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#C8A25A] to-[#A8813B] hover:opacity-95 text-[#071C36] font-black text-xs md:text-sm uppercase tracking-widest rounded-xl shadow-xl shadow-[#C8A25A]/10 hover:shadow-[#C8A25A]/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            {t.enterSystem}
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] text-slate-400/50 font-bold tracking-widest uppercase">
          ✦ TAMIRA • DIGITAL OS TO TAMIL CIVILIZATION • v3.0 ✦
        </div>

      </div>
    </div>
  );
}
