import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Compass, 
  BookOpen, 
  Award, 
  Star, 
  MapPin, 
  Clock, 
  Coins, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Utensils 
} from 'lucide-react';
import { Destination } from '../types';
import { TRANSLATIONS } from '../translations';
import { DESTINATIONS } from '../data';

interface ManuscriptBookProps {
  viewDetailId: string;
  selectedDest: Destination;
  currentLang: 'en' | 'ta' | 'hi';
  theme: 'dark' | 'light';
  onClose: () => void;
  reviewComment: string;
  setReviewComment: (val: string) => void;
  reviewRating: number;
  setReviewRating: (val: number) => void;
  reviewTips: string;
  setReviewTips: (val: string) => void;
  submitReview: () => void;
}

export default function ManuscriptBook({
  selectedDest,
  currentLang,
  theme,
  onClose,
  reviewComment,
  setReviewComment,
  reviewRating,
  setReviewRating,
  reviewTips,
  setReviewTips,
  submitReview
}: ManuscriptBookProps) {
  const t = TRANSLATIONS[currentLang];
  const isDark = theme === 'dark';

  const [bookPage, setBookPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive device check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync index boundaries on resize
  useEffect(() => {
    if (!isMobile && bookPage % 2 === 0) {
      setBookPage(prev => Math.max(1, prev - 1));
    }
  }, [isMobile, bookPage]);

  // Find related heritage sites in same district or category
  const relatedSites = DESTINATIONS.filter(
    d => d.id !== selectedDest.id && (d.district === selectedDest.district || d.category === selectedDest.category)
  ).slice(0, 2);

  const handlePrevPage = () => {
    if (isFlipping || bookPage <= 1) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setBookPage(prev => {
      const step = isMobile ? 1 : 2;
      return Math.max(1, prev - step);
    });
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleNextPage = () => {
    if (isFlipping) return;
    const maxPage = 6;
    if (isMobile && bookPage >= maxPage) return;
    if (!isMobile && bookPage >= maxPage - 1) return;
    
    setFlipDirection('next');
    setIsFlipping(true);
    setBookPage(prev => {
      const step = isMobile ? 1 : 2;
      return Math.min(maxPage, prev + step);
    });
    setTimeout(() => setIsFlipping(false), 600);
  };

  const jumpToPage = (pageNum: number) => {
    if (isFlipping) return;
    if (pageNum === bookPage) return;
    
    setFlipDirection(pageNum > bookPage ? 'next' : 'prev');
    setIsFlipping(true);
    
    let target = pageNum;
    if (!isMobile && pageNum % 2 === 0) {
      target = pageNum - 1;
    }
    setBookPage(target);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const leftPageNum = bookPage % 2 === 1 ? bookPage : bookPage - 1;
  const rightPageNum = leftPageNum + 1;

  // Render individual page contents with strict non-scrolling constraints
  const renderPageContent = (pageNum: number) => {
    switch (pageNum) {
      case 1:
        // Page 1: Hero Cover, Sanctuary Profile and Historical Essence with Dropped Capital
        const firstLetter = selectedDest.description.charAt(0);
        const remainingDesc = selectedDest.description.substring(1);

        return (
          <div className="flex flex-col justify-between h-full space-y-3 text-amber-950 font-serif">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter I: Divine Sanctuary
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 1</span>
              </div>

              {/* Museum Exhibit Hero Card */}
              <div className="h-40 rounded-xl overflow-hidden relative border border-amber-950/15 shadow-md group">
                <img 
                  src={selectedDest.imageUrl} 
                  alt={selectedDest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#C8A25A] bg-black/45 px-1.5 py-0.5 rounded border border-[#C8A25A]/25 font-sans">
                      {selectedDest.district} {t.detailDistrictLabel || 'DISTRICT'}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#C8A25A] bg-black/45 px-1.5 py-0.5 rounded border border-[#C8A25A]/25 font-sans">
                      {selectedDest.category}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-black text-white mt-1 uppercase tracking-wide font-serif">{selectedDest.name}</h3>
                </div>
              </div>

              {/* Historical Essence Narrative */}
              <div>
                <span className="text-[9px] uppercase font-bold text-amber-900/60 font-sans tracking-widest block mb-1">
                  Historical Essence
                </span>
                <p className="text-[11px] md:text-xs text-amber-950/90 leading-relaxed text-justify font-manuscript">
                  <span className="text-3xl text-amber-800 float-left font-serif font-bold pr-2 leading-none mt-1 select-none">
                    {firstLetter}
                  </span>
                  {remainingDesc}
                </p>
              </div>
            </div>

            {/* Quick Ledger Timings */}
            <div className="bg-[#eedcaf]/25 p-2.5 rounded-lg border border-amber-950/10 text-[10px] space-y-1.5 shrink-0">
              <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[8px] border-b border-amber-950/10 pb-0.5 flex items-center gap-1 font-sans">
                <Clock className="w-3 h-3 text-[#C8A25A]" />
                {t.timings || 'Travel Ledger & Timings'}
              </h4>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-sans text-amber-900/90 font-medium">
                <li>• {t.detailEntryCosts || 'Entry Costs'}: <span className="font-bold text-amber-950">{selectedDest.entryFees}</span></li>
                <li>• {t.detailOpeningHours || 'Opening'}: <span className="font-bold text-amber-950">{selectedDest.timings}</span></li>
                <li>• {t.detailOptimalSeason || 'Season'}: <span className="font-bold text-amber-950">{selectedDest.bestSeason}</span></li>
                <li>• {t.detailBestVisitHours || 'Best Hour'}: <span className="font-bold text-amber-950">{selectedDest.bestVisitingHours}</span></li>
              </ul>
            </div>
          </div>
        );

      case 2:
        // Page 2: Dynastic Lineage & Structural Grandeur
        return (
          <div className="flex flex-col justify-between h-full space-y-3 text-amber-950 font-serif">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter II: Royal Heritage
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 2</span>
              </div>

              {/* Dynastic Metadata Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-[#eedcaf]/15 p-2 rounded border border-amber-950/5 flex flex-col justify-between">
                  <span className="text-amber-900 font-sans font-bold uppercase tracking-widest text-[8px] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#C8A25A]" />
                    Sovereign Reign
                  </span>
                  <p className="mt-1 font-bold text-[#b8860b]">{selectedDest.historyHub.dynasty}</p>
                </div>

                <div className="bg-[#eedcaf]/15 p-2 rounded border border-amber-950/5 flex flex-col justify-between">
                  <span className="text-amber-900 font-sans font-bold uppercase tracking-widest text-[8px] flex items-center gap-1">
                    <Compass className="w-3 h-3 text-[#C8A25A]" />
                    Architecture
                  </span>
                  <p className="mt-1 font-bold text-[#b8860b]">{selectedDest.historyHub.architecture}</p>
                </div>
              </div>

              {/* Chronicles & Architecture Section */}
              <div className="space-y-2 text-[11px] leading-relaxed text-justify font-manuscript">
                <div className="border-t border-amber-900/15 pt-1.5">
                  <h4 className="font-bold text-amber-950/80 uppercase tracking-wide text-[8.5px] font-sans mb-0.5">Dynastic Chronicles</h4>
                  <p className="text-amber-900/90 font-medium">{selectedDest.historyHub.history}</p>
                </div>

                <div className="border-t border-amber-900/15 pt-1.5">
                  <h4 className="font-bold text-amber-950/80 uppercase tracking-wide text-[8.5px] font-sans mb-0.5">Structural Grandeur & Renown</h4>
                  <p className="text-amber-900/90 font-medium">{selectedDest.historyHub.whyFamous}</p>
                </div>
              </div>
            </div>

            {/* Cultural Significance Footer */}
            {selectedDest.historyHub.culturalImportance && (
              <div className="border-t border-amber-900/10 pt-1.5 text-[10.5px] shrink-0 font-manuscript">
                <span className="font-bold block text-amber-900 uppercase tracking-wider text-[8px] font-sans">Socio-Cultural Legacy</span>
                <p className="italic text-amber-900/90 mt-0.5 leading-relaxed text-justify">
                  "{selectedDest.historyHub.culturalImportance}"
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        // Page 3: Historical Chronology Timeline Page
        return (
          <div className="flex flex-col justify-between h-full space-y-3 text-amber-950 font-serif">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter III: Timeline
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 3</span>
              </div>

              <span className="text-[8px] uppercase tracking-widest font-bold text-amber-900/60 font-sans block mb-1">
                Era Chronology of Reigns & Restorations
              </span>

              {/* Timeline Items */}
              <div className="space-y-2 text-justify">
                {selectedDest.historyHub.timeline.map((line, idx) => (
                  <div key={idx} className="flex gap-2 items-start pl-2.5 border-l-2 border-[#C8A25A] text-[10.5px] font-manuscript">
                    <span className="font-sans font-black text-amber-800 shrink-0 text-[10px] bg-amber-100 px-1 py-0.2 rounded border border-amber-900/10">
                      {line.year}
                    </span>
                    <p className="text-amber-950 leading-relaxed font-semibold">{line.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Motifs Frame Decoration */}
            <div className="pt-2 border-t border-amber-950/10 flex justify-center items-center h-8 shrink-0">
              <span className="text-amber-800 text-[10px] flex items-center gap-1.5 font-serif select-none">
                ❦ • ⚜ • ❦
              </span>
            </div>
          </div>
        );

      case 4:
        // Page 4: Sacred Lore, Mythology & Revelations
        return (
          <div className="flex flex-col justify-between h-full space-y-3 text-amber-950 font-serif">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter IV: Legends & Lore
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 4</span>
              </div>

              {/* Sacred Legend Display */}
              <div className="bg-[#eedcaf]/20 p-2.5 rounded-lg border border-[#C8A25A]/35 shadow-inner">
                <h4 className="font-bold text-amber-900 uppercase text-[8px] tracking-wider mb-1 font-sans flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#C8A25A]" />
                  Sacred Mythology
                </h4>
                <p className="italic text-amber-900 font-manuscript leading-relaxed text-[11px] text-justify font-medium">
                  "{selectedDest.storyMode.legend}"
                </p>
              </div>

              {/* Folklore section */}
              <div>
                <h4 className="font-bold text-amber-900 uppercase text-[8px] tracking-widest mb-0.5 font-sans">Folklore Accounts & Local Narrative</h4>
                <p className="text-amber-950/95 leading-relaxed text-[11px] text-justify font-manuscript font-medium">
                  {selectedDest.storyMode.historicalStory}
                </p>
              </div>
            </div>

            {/* Landmark Revelations */}
            <div className="border-t border-amber-900/15 pt-1.5 shrink-0">
              <h4 className="font-bold text-amber-900 mb-1 uppercase text-[8px] tracking-wide font-sans flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C8A25A]" />
                Landmark Revelations
              </h4>
              <ul className="space-y-0.5  pl-3.5 list-disc text-[10px] text-amber-900/90 font-sans">
                {selectedDest.storyMode.importantFacts.slice(0, 3).map((fact, idx) => (
                  <li key={idx} className="leading-tight font-medium">{fact}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 5:
        // Page 5: Native Guilds & Sustainable Economy
        return (
          <div className="flex flex-col justify-between h-full space-y-3 text-amber-950 font-serif">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter V: Sustainable Guilds
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 5</span>
              </div>

              <p className="text-[10px] md:text-[10.5px] text-amber-950/80 italic text-justify leading-relaxed font-manuscript">
                Supporting swami bronze sculptors, swannery cooperatives, or weaver associations protects cultural memory and empowers local artisan families:
              </p>

              {/* Guild Vendors Cards Grid */}
              <div className="space-y-2">
                {selectedDest.localEconomy.slice(0, 2).map((biz) => (
                  <div 
                    key={biz.id} 
                    className="p-2 bg-[#eedcaf]/15 border border-[#C8A25A]/25 rounded-lg space-y-1 text-[10.5px] flex flex-col justify-between shadow-xs transition-hover hover:border-[#C8A25A]/50 font-serif"
                  >
                    <div className="flex justify-between items-center text-[7.5px] font-sans">
                      <span className="font-extrabold text-white bg-amber-900 border border-[#C8A25A]/30 px-1.5 py-0.2 rounded uppercase">
                        {biz.type}
                      </span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                        <Coins className="w-2.5 h-2.5" />
                        MULTIPLIER: {biz.impactScore}%
                      </span>
                    </div>
                    <h4 className="font-bold text-amber-950 text-xs font-serif leading-tight">{biz.name}</h4>
                    <p className="text-[10px] leading-relaxed text-amber-900/90 text-justify font-manuscript font-medium line-clamp-2">
                      {biz.description}
                    </p>
                    <div className="pt-1 mt-0.5 border-t border-amber-900/5 text-[8.5px] text-amber-800 font-bold flex justify-between font-sans shrink-0">
                      <span>Specialty: {biz.specialty}</span>
                      <span>Custodian: {biz.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Heritage Sites inside Page 5 */}
            <div className="border-t border-amber-900/15 pt-1.5 shrink-0">
              <span className="text-amber-900 font-sans font-bold uppercase tracking-widest text-[8px] block mb-1">
                Related Heritage Sites
              </span>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-sans">
                {relatedSites.map(site => (
                  <div 
                    key={site.id}
                    className="p-1 px-1.5 rounded-md bg-amber-950/5 border border-amber-950/10 flex flex-col justify-between cursor-pointer hover:bg-amber-900/10"
                    onClick={() => jumpToPage(1)}
                  >
                    <span className="font-bold text-amber-950 truncate">{site.name}</span>
                    <span className="text-[8px] text-amber-800/80 truncate font-semibold">{site.district}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        // Page 6: Conscious traveler logs / review feedback & log creation
        return (
          <div className="flex flex-col justify-between h-full space-y-3.5 text-amber-950 font-serif">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center border-b border-amber-900/10 pb-1">
                <span className="text-[9px] bg-amber-950/10 text-amber-900 border border-amber-950/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                  Chapter VI: Traveler Echoes
                </span>
                <span className="text-[10px] font-bold text-amber-950/40 font-sans">folio 6</span>
              </div>

              {/* Compact Reviews Stream - no scrollbars inside page contents */}
              <div className="space-y-1.5 max-h-[140px] overflow-hidden pr-0.5">
                {selectedDest.reviews.slice(0, 2).map((rev) => (
                  <div key={rev.id} className="bg-[#eedcaf]/10 p-2 rounded border border-amber-950/10 space-y-1 text-justify text-[10px] font-serif">
                    <div className="flex justify-between items-center font-sans">
                      <span className="font-extrabold text-amber-950 flex items-center gap-1">
                        <User className="w-2.5 h-2.5 text-amber-800" />
                        {rev.user}
                      </span>
                      <span className="text-amber-700 font-extrabold flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-700 text-amber-700" />
                        {rev.rating}/5
                      </span>
                    </div>
                    <p className="italic text-amber-900 font-manuscript font-semibold">"{rev.comment}"</p>
                    {rev.tips && (
                      <p className="text-[9px] bg-amber-950/10 text-amber-950 p-1 rounded font-sans leading-snug font-medium">
                        <strong>Advice:</strong> {rev.tips}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive log submission - designed compactly with no nested scrollbars */}
            <div className="p-2.5 bg-[#eedcaf]/15 rounded-lg border border-[#C8A25A]/35 space-y-1.5 text-[9px] text-amber-950 shrink-0 font-sans">
              <h4 className="font-extrabold text-amber-950 uppercase text-[8px] tracking-wide border-b border-amber-950/10 pb-1 flex items-center justify-between">
                <span>Inscribe Travel Advices (+50 XP)</span>
                <span className="text-[#a57a14] font-black flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  CONSCIOUS LEDGER
                </span>
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[8px] text-amber-900/70 block font-bold">Rating (1-5)</span>
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-white/70 border border-amber-900/20 rounded px-1 py-0.5 font-bold outline-none focus:border-amber-900 text-[9px]"
                  />
                </div>
                <div>
                  <span className="text-[8px] text-amber-900/70 block font-bold">Practical Advice</span>
                  <input 
                    type="text"
                    placeholder="E.g., early details, clothing..."
                    value={reviewTips}
                    onChange={(e) => setReviewTips(e.target.value)}
                    className="w-full bg-white/70 border border-amber-900/20 rounded px-1 py-0.5 outline-none focus:border-amber-900 text-[9px]"
                  />
                </div>
              </div>

              <div>
                <span className="text-[8px] text-amber-900/70 block font-bold">Chronicle Memory Note</span>
                <textarea 
                  placeholder="Inscribe findings on dynastic stone works..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-white/70 border border-amber-900/20 rounded px-1.5 py-0.5 outline-none focus:border-amber-900 text-[9px]"
                  rows={2}
                />
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  submitReview();
                }}
                className="w-full py-1 bg-amber-950 text-amber-50 font-bold uppercase text-[8.5px] rounded shadow-md hover:bg-amber-900 cursor-pointer transition-colors relative z-20"
              >
                Inscribe Certified Chronicle
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Turn page logic animations variables
  const pageTransitionNext = {
    rotateY: [0, -180],
    transition: { duration: 0.6, ease: "easeInOut" }
  };
  const pageTransitionPrev = {
    rotateY: [-180, 0],
    transition: { duration: 0.6, ease: "easeInOut" }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
      
      {/* Outer Open Leather Hardcover casing */}
      <div className="bg-[#1f1105] border-[7px] border-[#120a03] rounded-3xl max-w-5xl w-full relative shadow-[0_15px_50px_-5px_rgba(0,0,0,0.95)] flex flex-col h-[94vh] md:h-[86vh] text-amber-950 font-serif">
        
        {/* Metal corners decorative protectors */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C8A25A]/40 rounded-tl pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C8A25A]/40 rounded-tr pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C8A25A]/40 rounded-bl pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C8A25A]/40 rounded-br pointer-events-none"></div>

        {/* Top Header leather binder ribbon bar */}
        <div className="flex items-center justify-between gap-3 py-3 px-5 bg-[#120a03] text-amber-50 border-b border-amber-950/20 rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#C8A25A] text-[10px] md:text-xs font-black uppercase tracking-widest font-sans flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {t.detailCodexTitle || 'Codex of Antiquity'}: {selectedDest.name}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#C8A25A] hover:text-[#001730] text-white flex items-center justify-center transition-all cursor-pointer z-30 font-sans border border-white/10"
          >
            ✕
          </button>
        </div>

        {/* Parchment Ribbons index tab navigator */}
        <div className="flex flex-wrap items-center justify-center gap-1 py-1.5 px-4 bg-[#331c0a] border-b border-amber-950/30 z-10 shrink-0">
          {[
            { num: 1, title: 'I: Overview' },
            { num: 2, title: 'II: Lineage' },
            { num: 3, title: 'III: Timeline' },
            { num: 4, title: 'IV: Folklore' },
            { num: 5, title: 'V: Guilds' },
            { num: 6, title: 'VI: Echoes' }
          ].map(p => {
            const isActive = isMobile ? bookPage === p.num : (leftPageNum === p.num || rightPageNum === p.num);
            return (
              <button
                key={p.num}
                onClick={() => jumpToPage(p.num)}
                className={`px-3 py-0.5 text-[8.5px] font-sans font-bold uppercase transition-all rounded cursor-pointer ${
                  isActive
                    ? 'bg-[#C8A25A] text-amber-950 font-extrabold shadow scale-102 border-b-2 border-amber-900/40'
                    : 'bg-amber-950/30 text-amber-100/60 hover:text-white hover:bg-amber-950/50'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        {/* 3D Parchment Spreads Viewport */}
        <div className="flex-1 bg-[#FAF5E6] hover:shadow-[inset_0_0_40px_rgba(30,17,5,0.06)] m-2.5 pb-3 pt-3 px-3 md:px-7 rounded-xl relative shadow-inner flex flex-col justify-between overflow-hidden border border-amber-950/10">
          
          <div className="flex-1 relative min-h-0 pt-0.5 pb-4 overflow-hidden">
            
            {/* Center Spine Hinge Shadings */}
            <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-black/20 to-transparent z-30 pointer-events-none transform -translate-x-1/2"></span>
            
            {/* Active Spread presentation */}
            <div className="w-full h-full md:grid md:grid-cols-2 md:gap-10 relative overflow-hidden">
              
              {/* Left Page rendering space */}
              <div className="h-full flex flex-col justify-between pr-0 md:pr-5 min-h-0 border-b md:border-b-0 md:border-r border-amber-950/15 pb-4 md:pb-0 overflow-hidden">
                {renderPageContent(isMobile ? bookPage : leftPageNum)}
              </div>

              {/* Right Page rendering space (Desktop only) */}
              <div className="hidden md:flex h-full flex-col justify-between pl-5 min-h-0 overflow-hidden">
                {rightPageNum <= 6 ? (
                  renderPageContent(rightPageNum)
                ) : (
                  <div className="text-center py-20 text-xs font-serif text-amber-900/30 select-none">
                    End of Codex of antiqueness
                  </div>
                )}
              </div>

              {/* 3D Page Curl Fold Sheets (Framer Motion Overlays) */}
              <AnimatePresence mode="wait">
                {isFlipping && (
                  <motion.div
                    className="absolute inset-x-0 inset-y-0 z-40 pointer-events-none md:grid md:grid-cols-2 md:gap-10 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Dummy left background */}
                    <div className="h-full bg-transparent"></div>

                    {/* Flipping page sheet container */}
                    <motion.div 
                      className="h-full overflow-hidden bg-[#FAF5E6] border-l border-amber-950/15 p-5 relative shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex flex-col justify-between"
                      style={{
                        originX: 0,
                        backfaceVisibility: 'hidden',
                        perspective: 1500
                      }}
                      animate={flipDirection === 'next' ? pageTransitionNext : pageTransitionPrev}
                    >
                      {/* Curl page lighting shadow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Temporary representation content during turn */}
                      {renderPageContent(flipDirection === 'next' ? (isMobile ? bookPage : rightPageNum) : bookPage)}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Corner lifting grab-drag helper regions (Simulating custom page curling interaction) */}
              <motion.div 
                drag="x" 
                dragConstraints={{ left: -140, right: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.01 }}
                onDrag={(event, info) => {
                  if (info.offset.x < -100 && !isFlipping) {
                    handleNextPage();
                  }
                }}
                className="absolute shrink-0 bottom-1 right-1 w-14 h-14 bg-gradient-to-br from-transparent to-amber-900/10 cursor-pointer rounded-br-lg z-30 flex items-end justify-end p-1 hover:to-amber-900/25 transition-colors border-r border-b border-amber-900/5 group"
                title="Drag or slide from corner to flip page"
              >
                {/* Visual curled corner fold */}
                <div className="w-4 h-4 bg-amber-900/20 rotate-45 border-l border-t border-[#C8A25A]/60 shadow-lg origin-bottom-right translate-x-1.5 translate-y-1.5 transform duration-300 group-hover:scale-110"></div>
              </motion.div>

              <motion.div 
                drag="x" 
                dragConstraints={{ left: 0, right: 140 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.01 }}
                onDrag={(event, info) => {
                  if (info.offset.x > 100 && !isFlipping) {
                    handlePrevPage();
                  }
                }}
                className="absolute shrink-0 bottom-1 left-1 w-14 h-14 bg-gradient-to-bl from-transparent to-amber-900/10 cursor-pointer rounded-bl-lg z-30 flex items-end justify-start p-1 hover:to-amber-900/25 transition-colors border-l border-b border-amber-900/5 group"
                title="Drag or slide from corner to flip page"
              >
                {/* Visual curled corner fold left */}
                <div className="w-4 h-4 bg-amber-900/20 -rotate-45 border-r border-t border-[#C8A25A]/60 shadow-lg origin-bottom-left -translate-x-1.5 translate-y-1.5 transform duration-300 group-hover:scale-110"></div>
              </motion.div>

            </div>

          </div>

          {/* Footer Ledger Turning & Pagination Controls */}
          <div className="border-t border-amber-950/15 pt-2 flex justify-between items-center text-[10px] font-sans text-amber-900/70 font-bold tracking-wide shrink-0 font-sans">
            <button
              onClick={handlePrevPage}
              disabled={bookPage <= 1 || isFlipping}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-amber-950/20 hover:bg-amber-950/5 disabled:opacity-45 transition-all font-bold cursor-pointer font-sans"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev Page
            </button>

            <span className="font-serif italic text-amber-950/60 font-medium">
              {isMobile 
                ? `Page ${bookPage} / 6`
                : `Spread ${Math.ceil(leftPageNum / 2)} / 3`}
            </span>

            <button
              onClick={handleNextPage}
              disabled={(isMobile ? bookPage >= 6 : bookPage >= 5) || isFlipping}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-amber-950/20 hover:bg-amber-950/5 disabled:opacity-45 transition-all font-bold cursor-pointer font-sans"
            >
              Next Page
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
