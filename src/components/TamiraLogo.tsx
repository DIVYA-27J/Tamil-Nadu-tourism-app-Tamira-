import React from 'react';

interface TamiraLogoProps {
  className?: string;
  size?: number;
  inline?: boolean;
}

export const TamiraLogo: React.FC<TamiraLogoProps> = ({
  className = '',
  size = 120,
  inline = false,
}) => {
  return (
    <div className={`flex ${inline ? 'flex-row items-center gap-4' : 'flex-col items-center'} ${className}`}>
      {/* Dynamic Museum-Grade Circular Seal SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_12px_rgba(200,162,90,0.15)] select-none"
      >
        <defs>
          {/* Majestic Sand Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C173" />
            <stop offset="30%" stopColor="#C8A25A" />
            <stop offset="70%" stopColor="#A8813B" />
            <stop offset="100%" stopColor="#DFBA6B" />
          </linearGradient>
          
          {/* Inner Shadow & Glow Effects */}
          <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#071C36" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#041224" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020B15" stopOpacity="1" />
          </radialGradient>

          {/* Curved Text Path */}
          <path
            id="textPathTop"
            d="M 60,200 A 140,140 0 1,1 340,200"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 340,200 A 140,140 0 0,1 60,200"
            fill="none"
          />
        </defs>

        {/* Seal Dark Background */}
        <circle cx="200" cy="200" r="185" fill="url(#sealGlow)" stroke="url(#goldGradient)" strokeWidth="1" />
        
        {/* Outer Fine Beaded Border */}
        <circle cx="200" cy="200" r="176" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.85" />
        
        {/* Main Solid Inner Ring */}
        <circle cx="200" cy="200" r="168" stroke="url(#goldGradient)" strokeWidth="2.5" opacity="0.95" />
        
        {/* Dynamic Compass Rose Ticks */}
        {/* North */}
        <path d="M 200,10 L 200,32" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 194,32 L 200,18 L 206,32 Z" fill="url(#goldGradient)" />
        {/* South */}
        <path d="M 200,390 L 200,368" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        {/* East */}
        <path d="M 390,200 L 368,200" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        {/* West */}
        <path d="M 10,200 L 32,200" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />

        {/* Compass Diagonal Subtle Axes */}
        <line x1="85" y1="85" x2="115" y2="115" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
        <line x1="315" y1="85" x2="285" y2="115" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
        <line x1="85" y1="315" x2="115" y2="285" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
        <line x1="315" y1="315" x2="285" y2="285" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />

        {/* Inner concentric ring framing the core contents */}
        <circle cx="200" cy="200" r="124" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.5" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="118" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.7" />

        {/* Circular text top: "யாதும் ஊரே யாவரும் கேளிர்" ("To us all towns are one, all men our kin") */}
        <text fontFamily="Cinzel, 'Noto Sans Tamil', serif" fontSize="17.5" fontWeight="600" fill="url(#goldGradient)" letterSpacing="2px">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            யாதும் ஊரே யாவரும் கேளிர்
          </textPath>
        </text>

        {/* Circular text bottom: "MAPS • CHRONICLES • CIVILIZATION" */}
        <text fontFamily="Cinzel, serif" fontSize="11" fontWeight="700" fill="url(#goldGradient)" letterSpacing="4.5px" opacity="0.9">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            • MAPS • CHRONICLES • CIVILIZATION •
          </textPath>
        </text>

        {/* CENTRAL ARTWORK CONTENT CONTAINER */}
        <g opacity="0.95">
          {/* 1. Simplified, elegant abstract geo-silhouette path representing Tamil Nadu */}
          <path
            d="M 215,100 
               C 225,100 232,108 238,115 
               C 245,123 255,128 250,140 
               C 246,149 253,155 258,162 
               C 264,170 270,180 265,190 
               C 260,200 252,208 248,220 
               C 243,235 240,250 230,265 
               C 224,272 216,280 205,282 
               C 195,284 192,275 188,266 
               C 184,258 175,255 178,242 
               C 180,230 165,225 160,215 
               C 155,205 162,195 166,185 
               C 170,175 165,165 174,155 
               C 182,146 180,138 185,128
               C 190,118 200,110 210,102 Z"
            fill="#071C36"
            fillOpacity="0.45"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            strokeLinejoin="round"
            className="transition-all duration-700"
          />

          {/* 2. Abstract fine palm-leaf manuscript lines representing history */}
          <g opacity="0.4" stroke="url(#goldGradient)" strokeWidth="0.75">
            <line x1="165" y1="130" x2="235" y2="130" />
            <line x1="155" y1="150" x2="245" y2="150" />
            <line x1="150" y1="170" x2="250" y2="170" />
            <line x1="145" y1="190" x2="255" y2="190" />
            <line x1="150" y1="210" x2="250" y2="210" />
            <line x1="155" y1="230" x2="245" y2="230" />
            <line x1="168" y1="250" x2="232" y2="250" />
          </g>

          {/* 3. Central Temple Vimana / Shrine Symbolism - highly abstract, clean luxury lines */}
          <g transform="translate(180, 115) scale(0.65)" stroke="url(#goldGradient)" fill="none" strokeWidth="1.5">
            {/* Base platform */}
            <rect x="15" y="80" width="30" height="6" rx="1.5" fill="url(#goldGradient)" fillOpacity="0.1" />
            <rect x="10" y="86" width="40" height="4" rx="1" />
            
            {/* Tier 1 */}
            <path d="M 18,80 L 18,62 L 42,62 L 42,80 Z" />
            <line x1="24" y1="62" x2="24" y2="80" />
            <line x1="30" y1="62" x2="30" y2="80" />
            <line x1="36" y1="62" x2="36" y2="80" />
            
            {/* Tier 2 */}
            <path d="M 21,62 L 21,48 L 39,48 L 39,62 Z" />
            <line x1="26" y1="48" x2="26" y2="62" />
            <line x1="30" y1="48" x2="30" y2="62" />
            <line x1="34" y1="48" x2="34" y2="62" />
            
            {/* Tier 3 Dome (Shikhara) */}
            <path d="M 23,48 Q 30,28 37,48 Z" />
            
            {/* Kalasam Finial */}
            <line x1="30" y1="28" x2="30" y2="18" strokeWidth="2" />
            <circle cx="30" cy="18" r="2.5" fill="url(#goldGradient)" />
          </g>

          {/* 4. Elegant Kolam Geometric Diamond Knot (Sikku Kolam Inspiration) representing convergence */}
          <path
            d="M 200,208 
               L 218,226 
               L 200,244 
               L 182,226 Z
               
               M 200,208
               Q 200,195 210,195
               Q 220,195 220,208
               Q 220,221 200,221
               
               M 200,244
               Q 200,257 190,257
               Q 180,257 180,244
               Q 180,231 200,231
               
               M 218,226
               Q 231,226 231,216
               Q 231,206 218,206
               Q 205,206 205,226
               
               M 182,226
               Q 169,226 169,236
               Q 169,246 182,246
               Q 195,246 195,226"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Small dots representing Kolam lattice structure */}
          <circle cx="200" cy="208" r="2" fill="url(#goldGradient)" />
          <circle cx="218" cy="226" r="2" fill="url(#goldGradient)" />
          <circle cx="200" cy="244" r="2" fill="url(#goldGradient)" />
          <circle cx="182" cy="226" r="2" fill="url(#goldGradient)" />
          <circle cx="200" cy="226" r="2.5" fill="url(#goldGradient)" />
        </g>
      </svg>

      {/* Elegant Serif Typography Label Block */}
      {inline ? (
        <div className="text-left flex flex-col justify-center">
          <h1 className="text-base md:text-lg font-extrabold tracking-[0.2em] text-[#C8A25A] font-serif uppercase leading-none">
            TAMIRA
          </h1>
          <p className="text-[6.5px] md:text-[7px] tracking-[0.18em] font-sans text-[#F4E9D2]/50 uppercase font-medium mt-1">
            JOURNEY THROUGH LIVING HISTORY
          </p>
        </div>
      ) : (
        <div className="text-center mt-3 animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-[0.25em] text-[#C8A25A] font-serif uppercase">
            TAMIRA
          </h1>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A25A] to-transparent mx-auto my-1.5 opacity-60" />
          <p className="text-[10px] tracking-[0.3em] font-sans text-[#F4E9D2]/75 uppercase font-medium">
            JOURNEY THROUGH LIVING HISTORY
          </p>
        </div>
      )}
    </div>
  );
};
