import React, { useState } from 'react';
import { TRANSLATIONS } from '../translations';
import { Award, BookOpen, MapPin, ChevronRight } from 'lucide-react';

interface StoryItem {
  id: string;
  dynasty: string;
  title: string;
  narrative: string;
  famousPlaceName: string;
  famousPlaceId: string;
  famousThings: string[];
  imageUrl: string;
  era: string;
}

interface HistoricalStoriesProps {
  currentLang: 'en' | 'ta' | 'hi';
  theme: 'dark' | 'light';
  onExplorePlace: (placeId: string) => void;
}

export default function HistoricalStories({
  currentLang,
  theme,
  onExplorePlace
}: HistoricalStoriesProps) {
  const t = TRANSLATIONS[currentLang];
  const isDark = theme === 'dark';

  const storiesList: StoryItem[] = [
    {
      id: 'chola-legend',
      dynasty: currentLang === 'ta' ? 'சோழ வಂசம்' : currentLang === 'hi' ? 'चोल राजवंश' : 'Imperial Chola Dynasty',
      title: currentLang === 'ta' ? 'தஞ்சை பெருவுடையார் கோபுர ரகசியம்' : currentLang === 'hi' ? 'तंजावुर विमाना का निर्माण रहस्य' : 'The 80-Ton Monolith Vimana Ascent',
      narrative: currentLang === 'ta' 
        ? 'மாமன்னன் இராஜராஜ சோழனால் கி.பி. 1010 இல் கட்டப்பட்ட தஞ்சை பெரிய கோவில் ஒரு பொறியியல் அதிசயம். 80 டன் எடை கொண்ட ஒற்றைக்கல் சிகரத்தை கோபுரத்தின் உச்சிக்கு ஏற்ற 6 கிலோமீட்டர் நீளமுள்ள சரிவு பாதை பயன்படுத்தியதாக சோழ வரலாற்று பதிவுகள் கூறுகின்றன.'
        : currentLang === 'hi'
          ? 'राजा राजा चोल प्रथम द्वारा १०१० ईस्वी में निर्मित बृहदीश्वर मंदिर एक बेजोड़ स्थापत्य कला है। ८० टन वजनी ग्रेनाइट कुंबम को २१६ फीट ऊंचे विमान के ऊपर खींचने के लिए हाथियों का सहारा लेकर ६ किलोमीटर लंबा एक विशाल मिट्टी का रैंप बनाया गया था।'
          : 'Completed in 1010 AD by Raja Raja Chola I, the Brihadeeswarar Vimana stands as a dry-masonry masterpiece. Lacking heavy mechanics, royal engineers spent years sculpting an earthen dynamic ramp starting 6 kilometers away in Sarapallam village for giant elephants to haul the monolithic 80-ton dome.',
      famousPlaceName: currentLang === 'ta' ? 'தஞ்சாவூர் பிரகதீஸ்வரர் ஆலயம்' : currentLang === 'hi' ? 'बृहदीश्वर मंदिर' : 'Brihadeeswarar Temple',
      famousPlaceId: 'brihadeeswarar-thanjavur',
      famousThings: currentLang === 'ta' 
        ? ['தஞ்சாவூர் தட்டை ஓவியம்', 'பஞ்சலோகா சோழ வெண்கலம்', 'தலையாட்டி பொம்மை'] 
        : currentLang === 'hi' 
          ? ['तंजावुर चित्रकारी', 'पंचलोहा कांस्य मूर्तियां', 'थालैयात्ती बोम्मई'] 
          : ['Tanjore Gold Paintings', 'Swamimalai Lost-wax Bronze', 'Thanjavur Dancing Dolls'],
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      era: '1010 AD'
    },
    {
      id: 'pandya-legend',
      dynasty: currentLang === 'ta' ? 'பாண்டிய வம்சம்' : currentLang === 'hi' ? 'पांड्य - नायक राजवंश' : 'Pandya & Nayak Dynasties',
      title: currentLang === 'ta' ? 'மீனாட்சி அம்மன் தாமரை இதழ் தலைநகரம்' : currentLang === 'hi' ? 'मदुरै मीनाक्षी कमल-पंखुड़ी विन्यास' : 'Symmetrical Lotus-Petal Citadel',
      narrative: currentLang === 'ta'
        ? 'புனித வைகை ஆற்றின் கரையில் அமைந்த மதுரை, மீனாட்சி அம்மன் ஆலயத்தைச் சுற்றிலும் தாமரை இதழ்கள் போன்ற வடிவில் வட்டமாய் திட்டமிடப்பட்ட நகரம். நாயக்க ஆட்சி காலத்தில் மன்னர் திருமலை நாயக்கரால் இது வடிவியல் ரீதியாக முழுமையாக்கப்பட்டது.'
        : currentLang === 'hi'
          ? 'मदुरै का ऐतिहासिक शहर मीनाक्षी अम्मन मंदिर को मुख्य केंद्र मानकर चारों ओर कमल की पंखुड़ियों की भांति सुंदर ज्यामितीय पथों पर विकसित किया गया है। १६वीं शताब्दी में नायक राजा थिरुमलाई नायक ने इसका विस्तार किया।'
          : 'According to mythological legend, Madurai evolved radially around Goddess Meenakshi’s divine fire-temple. King Thirumalai Nayak in the 17th century expanded the perimeter streets using concentric lotus-petal geometries, keeping temple central sights visible from any quadrant.',
      famousPlaceName: currentLang === 'ta' ? 'மதுரை மீனாட்சி அம்மன் ஆலயம்' : currentLang === 'hi' ? 'मीनाक्षी अम्मन मंदिर' : 'Meenakshi Amman Temple',
      famousPlaceId: 'meenakshi-madurai',
      famousThings: currentLang === 'ta'
        ? ['சுங்குடி காட்டன் புடவைகள்', 'மதுரை ஜிகர்தண்டா', 'பழமைவாய்ந்த மர தேர் சிலைகள்']
        : currentLang === 'hi'
          ? ['सुंगुडी सूती साड़ी', 'मदुरै जिगरथंडा', 'चंदन की काष्ठ नक्काशी']
          : ['Sungudi Tie-dye Cotton Sarees', 'Almond-gum Jigarthanda', 'Teak Chariot Replicas'],
      imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010b423b971?auto=format&fit=crop&w=800&q=80',
      era: '1623 AD'
    },
    {
      id: 'pallava-legend',
      dynasty: currentLang === 'ta' ? 'பல்லவ வம்சம்' : currentLang === 'hi' ? 'पल्लव राजवंश' : 'Maritime Pallava Dynasty',
      title: currentLang === 'ta' ? 'மாமல்லபுரத்தின் ஏழு கோபுர மாளிகைகள்' : currentLang === 'hi' ? 'महाबलीपुरम के सात पगोंडा का रहस्य' : 'The Atlantis of the Seven Pagodas',
      narrative: currentLang === 'ta'
        ? 'மாமல்லபுரம் கடற்கரை கோவில் பல்லவ கடல் வர்த்தகத்தின் ஒளிவிளக்காக இருந்தது. பழங்கால மாலுமிகள் இங்கு ஏழு பிரமாண்ட கோபுரங்கள் திகழக் கண்டனர்; கடல் தேவனின் கோபத்தால் ஆறு கோபுரங்கள் ஆழக்கடலில் மூழ்கி, இன்று ஒரே ஒரு கடற்கரை கோவில் எஞ்சியுள்ளது.'
        : currentLang === 'hi'
          ? 'पल्लव बंदरगाह महाबलीपुरम को पुराने नाविक सात पैगोडा का निवास कहते थे। पौराणिक चर्चा है कि महासागरीय लहरों ने छह सुंदर मंदिरों को समुद्र के भीतर लील लिया, और केवल सातवां तट मंदिर आज लहरों के थपेड़े सहते हुए अडिग खड़ा है।'
          : 'Constructed by King Rajasimha, the coastal Shore Temple served as a vital maritime beacon. Early trade logs recount "Seven Pagodas" shining on the harbor; six were claimed by the tempestuous sea deity, leaving the coastal Shore Temple as the sole glorious survivor.',
      famousPlaceName: currentLang === 'ta' ? 'மாமல்லபுரம் கடற்கரைக் கோயில்' : currentLang === 'hi' ? 'महाबलीपुरम तट मंदिर' : 'Shore Temple (Mahabalipuram)',
      famousPlaceId: 'shore-temple-mahabalipuram',
      famousThings: currentLang === 'ta'
        ? ['கருங்கல் ஒற்றைக்கல் சிற்பங்கள்', 'கடல் கிளிஞ்சல் கைவினை']
        : currentLang === 'hi'
          ? ['अखंड पत्थर मूर्तियां', 'शंख और समुद्री सीपों की माला']
          : ['Monolithic Stone Carvings', 'Bay of Bengal Seashell crafts'],
      imageUrl: 'https://images.unsplash.com/photo-1581335048243-7f3e8f8a1cae?auto=format&fit=crop&w=800&q=80',
      era: '700 AD'
    }
  ];

  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const currentStory = storiesList[activeStoryIdx];

  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5';

  return (
    <div className={`p-6 md:p-8 rounded-3xl border backdrop-blur-xl ${cardBg}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/25 text-[#D4AF37]">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{t.historicalStories}</h2>
          <p className="text-xs opacity-50">{t.historicalStoriesSubtitle}</p>
        </div>
      </div>

      {/* Story Tabs Selection */}
      <div className="flex gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto scrollbar-none">
        {storiesList.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => setActiveStoryIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeStoryIdx === idx
                ? 'bg-[#D4AF37] text-[#001F3F] scale-[1.02] shadow-md shadow-[#D4AF37]/20'
                : 'border border-white/10 hover:bg-white/5'
            }`}
          >
            {st.dynasty}
          </button>
        ))}
      </div>

      {/* Selected Story Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[9px] font-black tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full uppercase">
              {currentStory.dynasty}
            </span>
            <span className="text-[10px] opacity-40 font-bold">{currentStory.era}</span>
          </div>

          <h3 className="text-lg md:text-xl font-extrabold text-white leading-tight">
            {currentStory.title}
          </h3>

          <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-white/85' : 'text-slate-800'}`}>
            {currentStory.narrative}
          </p>

          <div className="pt-2">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37] mb-2">{t.famousThings}</h4>
            <div className="flex flex-wrap gap-1.5">
              {currentStory.famousThings.map(thing => (
                <span
                  key={thing}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                    isDark 
                      ? 'bg-black/30 border-white/5 text-white/80' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  ✦ {thing}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase font-bold text-white/40 block">{t.famousPlaces}</span>
              <span className="text-xs font-bold text-white block mt-0.5">{currentStory.famousPlaceName}</span>
            </div>
            <button
              onClick={() => onExplorePlace(currentStory.famousPlaceId)}
              className="flex items-center gap-1 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] hover:text-white border border-[#D4AF37]/35 py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer"
            >
              {currentLang === 'ta' ? 'கண்டறி' : currentLang === 'hi' ? 'खोजें' : 'Discover'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Illustration Image */}
        <div className="h-64 md:h-80 rounded-3xl overflow-hidden relative border border-white/5 shadow-xl group">
          <img
            src={currentStory.imageUrl}
            alt={currentStory.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white/95 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            {currentStory.famousPlaceName}
          </div>
        </div>
      </div>
    </div>
  );
}
