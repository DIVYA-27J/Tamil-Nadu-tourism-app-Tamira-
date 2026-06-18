import React from 'react';
import { TRANSLATIONS } from '../translations';
import { PhoneCall, AlertTriangle, ShieldCheck, MapPin, X } from 'lucide-react';

interface EmergencyContactsProps {
  currentLang: 'en' | 'ta' | 'hi';
  theme: 'dark' | 'light';
  onTriggerSos: () => void;
}

export default function EmergencyContacts({
  currentLang,
  theme,
  onTriggerSos
}: EmergencyContactsProps) {
  const t = TRANSLATIONS[currentLang];
  const isDark = theme === 'dark';

  return (
    <div className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${
      isDark 
        ? 'bg-red-950/20 border-red-500/30' 
        : 'bg-red-50/70 border-red-200 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
        <h3 className={`font-black uppercase tracking-wider text-xs ${isDark ? 'text-red-400' : 'text-red-750'}`}>
          {t.emergencyTitle}
        </h3>
      </div>
      <p className="text-[11px] text-white/60 mb-4 leading-relaxed">
        {t.emergencySubtitle}
      </p>

      <div className="space-y-3">
        {/* SOS DISTRESS TRIGGER */}
        <button
          onClick={onTriggerSos}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
        >
          <PhoneCall className="w-4 h-4" />
          {t.sosButton}
        </button>

        {/* HELPLINE CHANNELS */}
        <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
          <a
            href="tel:18004253111"
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-black/25 border-white/5 hover:bg-white/5 text-white/80' 
                : 'bg-white border-slate-200 text-slate-800 shadow-xs hover:bg-slate-50'
            }`}
          >
            <span>{t.phoneStateTourist || 'State Tourist Hub'}</span>
            <span className="text-[#D4AF37] font-black">1800-425-3111</span>
          </a>

          <a
            href="tel:100"
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-black/25 border-white/5 hover:bg-white/5 text-white/80' 
                : 'bg-white border-slate-200 text-slate-800 shadow-xs hover:bg-slate-50'
            }`}
          >
            <span>{t.phonePoliceDispatch || 'Police Dispatch'}</span>
            <span className="text-red-500 font-bold">100</span>
          </a>

          <a
            href="tel:108"
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-black/25 border-white/5 hover:bg-white/5 text-white/80' 
                : 'bg-white border-slate-200 text-slate-800 shadow-xs hover:bg-slate-50'
            }`}
          >
            <span>{t.phoneMedicalAmbulance || 'Medical Ambulance'}</span>
            <span className="text-emerald-500 font-bold">108</span>
          </a>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-red-500/10 flex items-center gap-2 text-[9px] text-white/40">
        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>{t.telemetryActive || 'Telemetry channel active via satellite corridors'}</span>
      </div>
    </div>
  );
}
