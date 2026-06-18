import React from 'react';
import { Map, MapPin, X, Info, Compass, ExternalLink, Clock, BookOpen } from 'lucide-react';
import { Trip } from '../types';

interface TripRouteMapProps {
  isDark: boolean;
  trip: Trip;
  activeDay: number; // Selected day number (e.g. 1, 2) or -1 for "All Days"
  selectedPoint: { act: any; index: number; dayNum: number; x: number; y: number } | null;
  setSelectedPoint: (pt: { act: any; index: number; dayNum: number; x: number; y: number } | null) => void;
  displayPlaceDetail: (id: string) => void;
  resolveActivityAssets: (act: any) => {
    location: string;
    imageUrl: string;
    isMatched: boolean;
    matchingId: string;
    mapsUrl: string;
    coordinates?: { lat: number; lng: number };
  };
  t: any;
  currentLang?: 'en' | 'ta' | 'hi';
}

const getTranslatedDistrictName = (name: string, lang?: string) => {
  if (lang === 'ta') {
    if (name === 'Chennai') return 'சென்னை';
    if (name === 'Kanchipuram') return 'காஞ்சிபுரம்';
    if (name === 'Nilgiris') return 'நீலகிரி';
    if (name === 'Coimbatore') return 'கோவை';
    if (name === 'Thanjavur') return 'தஞ்சாவூர்';
    if (name === 'Trichy') return 'திருச்சி';
    if (name === 'Sivaganga') return 'சிவகங்கை';
    if (name === 'Madurai') return 'மதுரை';
    if (name === 'Ramanathapuram') return 'இராமநாதபுரம்';
    if (name === 'Kanyakumari') return 'கன்னியாகுமரி';
  } else if (lang === 'hi') {
    if (name === 'Chennai') return 'चेन्नई';
    if (name === 'Kanchipuram') return 'कांचीपुरम';
    if (name === 'Nilgiris') return 'नीलगिरी';
    if (name === 'Coimbatore') return 'कोयंबटूर';
    if (name === 'Thanjavur') return 'तंजावुर';
    if (name === 'Trichy') return 'त्रिची';
    if (name === 'Sivaganga') return 'शिवगंगा';
    if (name === 'Madurai') return 'मदुरै';
    if (name === 'Ramanathapuram') return 'रामनाथपुरम';
    if (name === 'Kanyakumari') return 'कन्याकुमारी';
  }
  return name;
};

const DISTRICT_MAP_NODES = [
  { name: 'Chennai', id: 'Chennai', x: 260, y: 70, d: 'M 240,60 L 270,70 L 265,95 L 245,85 Z' },
  { name: 'Kanchipuram', id: 'Kanchipuram', x: 220, y: 100, d: 'M 210,80 L 245,85 L 235,120 L 195,110 Z' },
  { name: 'Nilgiris', id: 'Nilgiris', x: 50, y: 180, d: 'M 30,160 L 70,165 L 85,190 L 40,210 Z' },
  { name: 'Coimbatore', id: 'Coimbatore', x: 70, y: 240, d: 'M 50,210 L 95,200 L 110,260 L 60,270 Z' },
  { name: 'Thanjavur', id: 'Thanjavur', x: 210, y: 270, d: 'M 180,240 L 225,250 L 235,290 L 175,295 Z' },
  { name: 'Trichy', id: 'Trichy', x: 175, y: 250, d: 'M 150,220 L 190,230 L 180,270 L 135,255 Z' },
  { name: 'Sivaganga', id: 'Sivaganga', x: 180, y: 310, d: 'M 170,290 L 210,285 L 200,325 L 160,320 Z' },
  { name: 'Madurai', id: 'Madurai', x: 140, y: 320, d: 'M 115,290 L 165,295 L 155,340 L 110,335 Z' },
  { name: 'Ramanathapuram', id: 'Ramanathapuram', x: 210, y: 360, d: 'M 190,340 L 240,350 L 210,380 L 170,360 Z' },
  { name: 'Kanyakumari', id: 'Kanyakumari', x: 100, y: 440, d: 'M 85,410 L 115,415 L 105,455 L 75,440 Z' }
];

export const TripRouteMap: React.FC<TripRouteMapProps> = ({
  isDark,
  trip,
  activeDay,
  selectedPoint,
  setSelectedPoint,
  displayPlaceDetail,
  resolveActivityAssets,
  t,
  currentLang
}) => {

  // Projection maths: Convert coordinates to (320, 480) map canvas space
  const getProjectedCoords = (lat: number, lng: number) => {
    const rawX = 100 + (lng - 77.5385) * 58.56;
    const rawY = 440 - (lat - 8.0883) * 74.08;
    return {
      x: Math.round(Math.max(25, Math.min(295, rawX))),
      y: Math.round(Math.max(25, Math.min(455, rawY)))
    };
  };

  // Compile map waypoints based on current day selection
  const waypoints = React.useMemo(() => {
    let result: { act: any; index: number; dayNum: number; x: number; y: number; details: any }[] = [];
    
    trip.itinerary.forEach((day) => {
      // If a specific day is selected, filter out other days
      if (activeDay !== -1 && day.day !== activeDay) return;
      
      day.activities.forEach((act, idx) => {
        const assets = resolveActivityAssets(act);
        const lat = assets.coordinates?.lat || 11.0;
        const lng = assets.coordinates?.lng || 78.5;
        const { x, y } = getProjectedCoords(lat, lng);
        
        result.push({
          act,
          index: idx + 1,
          dayNum: day.day,
          x,
          y,
          details: assets
        });
      });
    });

    return result;
  }, [trip, activeDay, resolveActivityAssets]);

  // Create path lines SVG format
  const pathData = React.useMemo(() => {
    if (waypoints.length < 2) return '';
    return waypoints.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`;
    }, '');
  }, [waypoints]);

  return (
    <div className={`p-4 rounded-3xl border flex flex-col h-full relative transition-all duration-300 ${
      isDark 
        ? 'bg-[#001f3f]/50 border-white/10 text-white shadow-2xl backdrop-blur-md'
        : 'bg-[#F9F1DC] border-amber-900/20 text-amber-950 shadow-lg shadow-amber-900/5'
    }`}>
      
      {/* Map Header details info */}
      <div className="flex justify-between items-start border-b border-amber-900/10 dark:border-white/10 pb-2 mb-3">
        <div>
          <h4 className="text-xs uppercase font-black tracking-widest text-[#D4AF37] flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            {t.mapInteractiveTitle || 'Interactive Route Chart'}
          </h4>
          <span className="text-[10px] opacity-60">
            {activeDay === -1 
              ? (t.mapInteractivePath || 'Complete multi-day travel path') 
              : `${t.dayTitle || 'Day'} ${activeDay} ${t.mapActiveWaypoint || 'route highlights'} • ${waypoints.length} ${t.tabDiscover || 'destinations'}`}
          </span>
        </div>
        
        <span className="text-[9px] uppercase bg-amber-900/10 dark:bg-white/10 px-2 py-0.5 rounded border border-amber-900/20 dark:border-white/15 font-bold font-sans">
          {t.mapProjectionsScale || 'Projections: Mercator Scale'}
        </span>
      </div>

      {/* SVG Canvas Map Wrapper */}
      <div className="flex-1 min-h-[300px] relative bg-black/15 rounded-2xl border border-amber-900/5 dark:border-white/5 overflow-hidden flex items-center justify-center p-2">
        
        <svg viewBox="0 0 320 480" className="w-[95%] h-[95%] select-none drop-shadow-md">
          {/* Background Grid Lines */}
          <g stroke="rgba(212, 175, 55, 0.04)" strokeWidth="0.5" strokeDasharray="3,3">
            {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map((gridY) => (
              <line key={`gridY-${gridY}`} x1="0" y1={gridY} x2="320" y2={gridY} />
            ))}
            {[40, 80, 120, 160, 200, 240, 280].map((gridX) => (
              <line key={`gridX-${gridX}`} x1={gridX} y1="0" x2={gridX} y2="480" />
            ))}
          </g>

          {/* District boundary polygon paths for classical geofenced look */}
          <g>
            {DISTRICT_MAP_NODES.map((node) => {
              // Highlighting district if any of current day's active waypoints fall inside it
              const isDistrictVisited = waypoints.some(
                (wp) => wp.details.location.toLowerCase().includes(node.name.toLowerCase())
              );

              return (
                <path
                  key={`bg-dist-${node.id}`}
                  d={node.d}
                  fill={isDistrictVisited ? '#D4AF37' : '#FFFFFF'}
                  fillOpacity={isDistrictVisited ? '0.14' : '0.03'}
                  stroke={isDistrictVisited ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="1"
                  strokeDasharray={isDistrictVisited ? 'none' : '2,2'}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Distant general districts reference names */}
          <g opacity="0.3" pointerEvents="none" className="font-sans font-bold text-[7.5px]" fill={isDark ? '#FFFFFF' : '#783A0B'}>
            {DISTRICT_MAP_NODES.map((node) => (
              <text key={`lbl-${node.id}`} x={node.x} y={node.y - 2} textAnchor="middle" className="opacity-60 font-medium">
                {getTranslatedDistrictName(node.name, currentLang)}
              </text>
            ))}
          </g>

          {/* Travel path line rendering */}
          {pathData && (
            <g>
              {/* Outer glow stroke path */}
              <path
                d={pathData}
                fill="none"
                stroke="rgba(212, 175, 55, 0.25)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Core interactive route path */}
              <path
                d={pathData}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4,4"
              />
            </g>
          )}

          {/* Path waypoint dots & labels */}
          <g>
            {waypoints.map((wp, idx) => {
              const isPointSelected = selectedPoint && selectedPoint.act.placeName === wp.act.placeName;

              return (
                <g 
                  key={`waypoint-${idx}`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedPoint(wp)}
                >
                  {/* Rippling glow effect on hover or select */}
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r={isPointSelected ? 12 : 8}
                    fill={isPointSelected ? '#50C878' : '#D4AF37'}
                    fillOpacity={isPointSelected ? '0.35' : '0.15'}
                    className={`${isPointSelected ? 'animate-ping' : ''}`}
                    style={{ animationDuration: '2.5s' }}
                  />

                  {/* Outer circle outline */}
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r={isPointSelected ? 7 : 5}
                    fill={isPointSelected ? '#50C878' : '#D4AF37'}
                    stroke={isDark ? '#001f3f' : '#fff'}
                    strokeWidth="1.2"
                    className="transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Sequence numeric marker */}
                  <text
                    x={wp.x}
                    y={wp.y + 2.2}
                    textAnchor="middle"
                    fill={isDark ? '#000000' : '#FFFFFF'}
                    fontSize="6.5"
                    fontWeight="black"
                    className="font-sans pointer-events-none"
                  >
                    {wp.index}
                  </text>

                  {/* Elegant floating tooltip label text */}
                  <text
                    x={wp.x}
                    y={wp.y - 10}
                    textAnchor="middle"
                    fill={isPointSelected ? '#D4AF37' : isDark ? 'rgba(255,255,255,0.8)' : '#5C3A21'}
                    fontSize="8"
                    fontWeight={isPointSelected ? 'black' : 'semibold'}
                    className="paint-order-stroke stroke-[2px] stroke-black/50 dark:stroke-[#001f3f]/80 pointer-events-none transition-all"
                  >
                    {wp.act.placeName.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Selected waypoint details popover banner overlays inside map */}
        {selectedPoint && (
          <div className="absolute inset-x-3 bottom-3 p-3 bg-black/85 backdrop-blur-lg border border-[#D4AF37]/35 rounded-2xl flex flex-col gap-2 shadow-2xl transition-all duration-300 text-xs text-white">
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-start gap-2">
                <img 
                  src={selectedPoint.details.imageUrl} 
                  alt={selectedPoint.act.placeName} 
                  className="w-12 h-12 rounded-lg object-cover border border-white/10" 
                />
                <div>
                  <span className="text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] font-black px-1.5 py-0.2 rounded uppercase">
                    {t.mapStep || 'Step'} {selectedPoint.index} • {t.dayTitle || 'Day'} {selectedPoint.dayNum}
                  </span>
                  <h5 className="font-bold text-white text-xs mt-0.5">{selectedPoint.act.placeName}</h5>
                   <span className="text-[10px] text-white/50 block font-mono flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>{t.mapVisitHour || 'Visit Hour:'} {selectedPoint.act.time}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPoint(null)}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>

            <p className="text-white/80 text-[10.5px] leading-relaxed text-justify line-clamp-2 italic">
              "{selectedPoint.act.activityDescription}"
            </p>

            <div className="flex gap-2 font-sans pt-1 border-t border-white/5 shrink-0">
              {selectedPoint.details.isMatched && (
                <button
                  type="button"
                  onClick={() => displayPlaceDetail(selectedPoint.details.matchingId)}
                  className="flex-1 py-1.5 bg-[#D4AF37] hover:bg-yellow-500 text-[#001F3F] font-black text-[9px] uppercase tracking-wide rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.mapOpenChronicles || 'Explore Chronicles'}</span>
                </button>
              )}
              <a
                href={selectedPoint.details.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[9px] uppercase rounded-md transition-all border border-white/10"
              >
                <Map className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.mapDirections || 'Directions'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Empty placeholder warning if route represents no waypoints */}
        {waypoints.length === 0 && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-2">
            <MapPin className="w-8 h-8 text-[#D4AF37] animate-bounce" />
            <span className="font-bold text-xs uppercase text-[#D4AF37]">{t.routeChartOffline || 'Route Chart Offline'}</span>
            <p className="text-[10.5px] opacity-70 max-w-xs">{t.noActiveTravelEvents || 'No active travel events logged for this selected day filter.'}</p>
          </div>
        )}
      </div>

      {/* Dynamic legend indicator labels */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] opacity-75 py-2 border-t border-amber-900/10 dark:border-white/10 font-sans shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-full bg-[#D4AF37] border border-[#D4AF37]/50 block"></span>
          <span>{t.mapInteractivePath || 'Planned Pilgrimage Route'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#50C878] block"></span>
          <span>{t.mapActiveWaypoint || 'Active Waypoint details'}</span>
        </div>
      </div>

    </div>
  );
};
