import React, { useState } from 'react';
import { Compass, BookOpen, Award, Sparkles, Map, MapPin, X, ArrowRight, Activity, Castle } from 'lucide-react';

interface LandmarkNode {
  id: string;
  name: string;
  tamilName: string;
  dynasty: string;
  corridor: string;
  description: string;
  keyHighlight: string;
  revelation: string;
  x: number; // percentage coordinate on stylized map
  y: number;
}

interface LivingCulturalMapProps {
  onExplorePlace: (placeId: string) => void;
  isDark: boolean;
  t: any;
}

export const LivingCulturalMap: React.FC<LivingCulturalMapProps> = ({
  onExplorePlace,
  isDark,
  t,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('tanjore');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Cultural Landmark Nodes mapped to exact destinations in data.ts
  const landmarks: LandmarkNode[] = [
    {
      id: 'kanchipuram-temple',
      name: 'Kanchipuram Shrines',
      tamilName: 'காஞ்சிபுரம்',
      dynasty: 'Pallava Dynasty',
      corridor: 'Imperial Capital Route',
      description: 'The ancient City of a Thousand Temples, world-renowned for exquisite handcrafted raw silk weaves and sublime Dravidian structural stone temples dating back to the 6th century.',
      keyHighlight: 'Kailasanathar Temple structural framework',
      revelation: 'The Pallavas built with sandstone, carving monolithic shrines that inspired the architecture of Southeast Asia.',
      x: 65,
      y: 22,
    },
    {
      id: 'mahabalipuram-shore',
      name: 'Mamallapuram Shore Monoliths',
      tamilName: 'மகாபலிபுரம்',
      dynasty: 'Pallava Shoreline',
      corridor: 'Maritime Trade Route',
      description: 'A legendary ancient seaport, carved entirely out of coastal rock, featuring the oceanfront Shore Temple, five monolithic chariots, and giant open-air mythical bas-reliefs.',
      keyHighlight: 'Pancha Rathas & Arjuna’s Penance carvings',
      revelation: 'Its shore-guided ports exchanged ambassadors, silk, and stone-sculpture treaties with Ancient Rome, China, and Sri Lanka.',
      x: 74,
      y: 27,
    },
    {
      id: 'tanjore-big-temple',
      name: 'Thanjavur Great Temple',
      tamilName: 'தஞ்சாவூர்',
      dynasty: 'Imperial Chola Dynasty',
      corridor: 'Cauvery River Basin Corridor',
      description: 'The political and spiritual heart of the great Cholas, featuring Brihadeeswarar Temple - a 1,000-year-old architectural marvel engineered with a single 80-ton granite capstone.',
      keyHighlight: 'Great Living Chola Temples (UNESCO World Heritage)',
      revelation: 'The temple tower rises 216 feet, constructed using interlocking dry-stone masonry with absolutely no binding mortar.',
      x: 58,
      y: 54,
    },
    {
      id: 'meenakshi-madurai',
      name: 'Madurai Sangam Capital',
      tamilName: 'மதுரை',
      dynasty: 'Pandya Dynasty',
      corridor: 'Vaigai Heritage Corridor',
      description: 'One of the oldest continuously inhabited cities in the world, renowned for the central multi-towered Meenakshi Sundareswarar Temple complex and its role as the seat of Tamil Sangam Academies.',
      keyHighlight: 'Hall of Thousand Pillars & Musical Columns',
      revelation: 'Madurai was designed on a lotus-petal mandala plan with streets radiating outward from the central temple shrines.',
      x: 44,
      y: 68,
    },
    {
      id: 'rameshwaram-temple',
      name: 'Rameshwaram Maritime Trail',
      tamilName: 'இராமேஸ்வரம்',
      dynasty: 'Pandya / Sethupathi Guardians',
      corridor: 'Spiritual Horizon Bridge',
      description: 'Located on Pamban Island, this sacred coastal site features the Rameshwaram Temple, famous for housing the longest decorated stone-carved pillar galleries in the entire world.',
      keyHighlight: 'Historic 1212 carved pillar corridor',
      revelation: 'The carved limestone corridor measures over 640 feet in length, built above sea level using ancient ocean freighting craft.',
      x: 65,
      y: 78,
    },
    {
      id: 'chettinad-estates',
      name: 'Chettinad Palatial Mansions',
      tamilName: 'செட்டிநாடு',
      dynasty: 'Heritage Merchants Era',
      corridor: 'Traditional Homestead Trail',
      description: 'A culturally rich cluster of 96 villages, famous for its magnificent palatial mansions crafted with Burma teak, Italian marble, and hand-painted Athangudi clay tiles.',
      keyHighlight: 'Double-courtyard architectural ventilation',
      revelation: 'Walls were coated with a rare, highly polished egg-white plaster to reflect solar heat and sustain indoor coolness.',
      x: 51,
      y: 61,
    },
    {
      id: 'kanyakumari-shore',
      name: 'Kanyakumari Confluence',
      tamilName: 'கன்னியாகுமரி',
      dynasty: 'Chera / Venad Alliance',
      corridor: 'Cape Comorin Confluence',
      description: 'The southern peak of India where three massive oceans converge, featuring the monumental stone sculpture of the ancient philosopher-poet Thiruvalluvar standing tall on a rock island.',
      keyHighlight: '133-foot Thiruvalluvar Stone Monolith',
      revelation: 'The height of 133 feet symbolizes the 133 chapters of Thirukkural—the sacred Dravidian guide to humanitarian ethics.',
      x: 28,
      y: 91,
    },
    {
      id: 'nilgiris-ooty',
      name: 'Nilgiris Highlands & Tribes',
      tamilName: 'நீலகிரி',
      dynasty: 'Western Ghats Ecosystem',
      corridor: 'Highland Forest Corridor',
      description: 'Misty Blue mountains hosting ancient Toda tribal communities, Kurinji wild flowers that bloom once every 12 years, and historic steam tea locomotives.',
      keyHighlight: 'Tribal Toda embroidery & sacred dairy temples',
      revelation: 'The name Nilgiri literally translates to "Blue Mountains", named after the unique mauve bloom of the Strobilanthes kunthiana flower.',
      x: 18,
      y: 38,
    }
  ];

  const selectedNode = landmarks.find(l => l.id === selectedNodeId) || landmarks[2];

  return (
    <div className={`p-4 md:p-6 rounded-2xl border relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-[#030e1c] border-[#C8A25A]/20 text-white' 
        : 'bg-white border-[#C8A25A]/30 text-[#071C36] shadow-[0_8px_30px_rgba(7,28,54,0.06)]'
    }`}>
      
      {/* Ancient Manuscript Textured Guideline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
        {/* Animated grid fibers */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_1px,#C8A25A_1px),linear-gradient(to_right,transparent_1px,#C8A25A_1px)] bg-[size:16px_16px] animate-[pulse_60s_infinite]" />
        {/* Palm leaf line fibers */}
        <div className="absolute left-0 right-0 h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#000_8px,#000_10px)]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6">
        
        {/* Left Interactive Section: Stylized Vector Cultural Map */}
        <div className="flex-1 rounded-2xl bg-[#020b15] border border-[#C8A25A]/20 p-4 md:p-6 min-h-[380px] flex flex-col justify-between relative group shadow-inner">
          
          {/* Subtle Map Title and Coordinates */}
          <div className="flex justify-between items-center text-[#C8A25A] z-10 select-none">
            <div className="flex items-center gap-1.5 font-serif text-[10px] tracking-widest uppercase">
              <Compass className="w-4 h-4 animate-[spin_20s_infinite_linear]" />
              <span>Dravidian Cartography Ledger</span>
            </div>
            <span className="font-mono text-[8.5px] opacity-60">CORRIDORS TRACE: ACTIVE</span>
          </div>

          {/* SVG Container: Stylized Tamil Nadu Layout */}
          <div className="w-full h-[320px] relative mt-4">
            <svg 
              className="w-full h-full object-contain"
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle background lines showing coastal tides/ripples */}
              <g stroke="#C8A25A" strokeWidth="0.1" opacity="0.12">
                <circle cx="85" cy="50" r="10" fill="none" />
                <circle cx="85" cy="50" r="20" fill="none" strokeDasharray="1 1" />
                <circle cx="85" cy="50" r="30" fill="none" />
                <circle cx="30" cy="90" r="15" fill="none" />
                <circle cx="30" cy="90" r="25" fill="none" strokeDasharray="1 1" />
              </g>

              {/* Styled Golden Heritage Corridors (dashed connector lines) */}
              {/* Corridor 1: Northern Capital route (Kanchipuram <-> Mahabalipuram) */}
              <line 
                x1="65" y1="22" x2="74" y2="27" 
                stroke="#C8A25A" strokeWidth="0.35" strokeDasharray="1 0.75" 
                className="animate-[dash_10s_linear_infinite]" 
                opacity="0.8" 
              />
              {/* Corridor 2: Coastal trade route (Mahabalipuram -> Tanjore) */}
              <path 
                d="M 74,27 Q 72,40 58,54" 
                fill="none" stroke="#C8A25A" strokeWidth="0.3" strokeDasharray="1 1" 
                opacity="0.6" 
              />
              {/* Corridor 3: Dynasty Highway (Kanchipuram -> Tanjore) */}
              <line 
                x1="65" y1="22" x2="58" y2="54" 
                stroke="#C8A25A" strokeWidth="0.25" strokeDasharray="1 1.5" 
                opacity="0.5" 
              />
              {/* Corridor 4: Empire Link (Tanjore <-> Chettinad <-> Madurai) */}
              <path 
                d="M 58,54 L 51,61 L 44,68" 
                fill="none" stroke="#C8A25A" strokeWidth="0.4" 
                opacity="0.75" 
              />
              {/* Corridor 5: Southern Spice Route (Madurai -> Kanyakumari) */}
              <path 
                d="M 44,68 L 28,91" 
                fill="none" stroke="#C8A25A" strokeWidth="0.35" strokeDasharray="1 1" 
                opacity="0.7" 
              />
              {/* Corridor 6: Pilgrimage Bridge (Madurai <-> Rameshwaram) */}
              <line 
                x1="44" y1="68" x2="65" y2="78" 
                stroke="#C8A25A" strokeWidth="0.3" strokeDasharray="1 0.5" 
                opacity="0.75" 
              />
              {/* Corridor 7: Highland Passage (Nilgiris <-> Madurai) */}
              <path 
                d="M 18,38 C 22,50 35,60 44,68" 
                fill="none" stroke="#C8A25A" strokeWidth="0.25" strokeDasharray="1 1" 
                opacity="0.45" 
              />

              {/* Stylized background contour mesh representing the Tamil Nadu territory */}
              <g opacity="0.08" fill="none" stroke="#C8A25A" strokeWidth="0.15">
                <path d="M 40,10 C 60,10 70,15 75,22 C 80,30 85,45 80,55 C 75,65 72,75 70,82 C 68,89 57,92 50,90 C 40,88 32,95 28,93 C 24,91 22,85 20,78 C 18,71 14,60 16,50 C 18,40 25,32 30,25 C 35,18 35,10 40,10 Z" />
                <path d="M 43,15 C 58,15 67,20 72,25 C 76,32 80,44 76,52 C 73,61 70,70 68,76 C 66,82 56,86 50,84 C 42,82 35,88 32,86 C 29,84 27,80 25,74 C 23,68 19,58 21,50 C 23,42 29,35 34,29 C 39,23 39,15 43,15 Z" />
              </g>

              {/* Render Landmarker Interactive Nodes */}
              {landmarks.map(node => {
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;

                return (
                  <g 
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Pulsing selection outer aura rings */}
                    {isSelected && (
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="4" 
                        fill="none" 
                        stroke="#C8A25A" 
                        strokeWidth="0.4"
                        className="animate-ping" 
                        opacity="0.5" 
                      />
                    )}
                    {isHovered && (
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="3" 
                        fill="none" 
                        stroke="#C8A25A" 
                        strokeWidth="0.25"
                      />
                    )}

                    {/* Node Core circle */}
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={isSelected ? "1.6" : "1"} 
                      fill={isSelected ? "#C8A25A" : "#071C36"} 
                      stroke="#C8A25A" 
                      strokeWidth={isSelected ? "0.4" : "0.2"} 
                      className="transition-all duration-300"
                    />

                    {/* Small inner dot */}
                    {isSelected && (
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="0.5" 
                        fill="#071C36" 
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Float Labels near selected or hovered nodes on real map */}
            {landmarks.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              if (!isSelected && !isHovered) return null;

              return (
                <div 
                  key={`label-${node.id}`}
                  className="absolute pointer-events-none transition-all duration-300 ease-out z-10"
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -120%)'
                  }}
                >
                  <div className="bg-[#030e1c] border border-[#C8A25A] text-white rounded px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap shadow-xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
                    <span>{node.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick instructions Footer */}
          <div className="text-[9px] text-[#C8A25A]/70 font-sans tracking-widest uppercase text-center border-t border-[#C8A25A]/15 pt-2 flex items-center justify-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-[#C8A25A]" />
            <span>Interactive Map: Click any node to open custom chronicle blueprint</span>
          </div>
        </div>

        {/* Right Detail Pane: Cultural Chronicles for Selected Node */}
        <div className="w-full lg:w-[350px] flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header: Dynasty and Name */}
            <div className="border-b border-[#C8A25A]/15 pb-3">
              <span className="text-[9px] bg-[#C8A25A]/15 text-[#C8A25A] border border-[#C8A25A]/35 rounded px-2 py-0.5 font-bold uppercase tracking-widest">
                {selectedNode.dynasty}
              </span>
              <div className="flex justify-between items-baseline mt-1.5">
                <h3 className="font-serif text-xl font-bold tracking-wide text-[#C8A25A]">
                  {selectedNode.name}
                </h3>
                <span className="font-tamil font-black text-xs text-[#C8A25A]/60">
                  {selectedNode.tamilName}
                </span>
              </div>
              <p className="text-[10px] font-sans text-slate-400 opacity-60 flex items-center gap-1 mt-1 uppercase tracking-wider">
                <Compass className="w-3 h-3 text-[#C8A25A]" />
                <span>Corridor: {selectedNode.corridor}</span>
              </p>
            </div>

            {/* Core Narrative */}
            <div className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#071C36]/90'}`}>
              <span className="font-bold text-[#C8A25A] uppercase tracking-wider block text-[9.5px] mb-1">
                HISTORIC PROFILE
              </span>
              <p>{selectedNode.description}</p>
            </div>

            {/* Highlights Frame */}
            <div className="bg-[#020b15]/40 rounded-xl p-3 border border-[#C8A25A]/15 space-y-2">
              <div>
                <span className="font-extrabold text-[8px] text-[#C8A25A] uppercase tracking-widest block">
                  ARCHITECTURAL SOVEREIGNTY
                </span>
                <span className="text-[10.5px] font-semibold text-white/90">
                  {selectedNode.keyHighlight}
                </span>
              </div>
              <div className="border-t border-white/5 pt-1.5">
                <span className="font-extrabold text-[8px] text-emerald-400 uppercase tracking-widest block">
                  SACRED REVELATION
                </span>
                <span className="text-[10px] italic text-slate-300">
                  {selectedNode.revelation}
                </span>
              </div>
            </div>

          </div>

          {/* Call to Actions */}
          <div className="mt-4 pt-3 border-t border-[#C8A25A]/15 space-y-2">
            <button
              onClick={() => onExplorePlace(selectedNode.id)}
              className="w-full bg-[#C8A25A] hover:bg-[#A8813B] text-[#071C36] text-[10px] md:text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Inscribe Detailed Ledger</span>
            </button>
            <div className="text-[8.5px] text-slate-400/50 italic text-center">
              * Click ledger to open dynamic timelines and sovereign genealogies in parchment
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
