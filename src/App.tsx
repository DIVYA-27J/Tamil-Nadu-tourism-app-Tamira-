import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  BarChart3,
  Search,
  Filter,
  Sparkles,
  PhoneCall,
  User,
  Heart,
  Share2,
  Download,
  Plus,
  Trash2,
  TrendingUp,
  Map,
  Layers,
  AlertTriangle,
  Info,
  Clock,
  Coins,
  ShieldCheck,
  Star,
  Globe,
  ChevronRight,
  ChevronLeft,
  X,
  MessageSquare,
  LogOut,
  Moon,
  Sun,
  Shield,
  Utensils
} from 'lucide-react';

import { DESTINATIONS, FESTIVALS, DISTRICTS, BADGES, DEMO_ANALYTICS } from './data';
import { Destination, Festival, Badge, Trip, JournalMemory, DestinationCategory } from './types';
import { TRANSLATIONS } from './translations';
import { getTranslatedDestination } from './translationsDestinations';
import { TamiraLogo } from './components/TamiraLogo';
import { LivingCulturalMap } from './components/LivingCulturalMap';

// Modular Subcomponents
import LoginScreen from './components/LoginScreen';
import EmergencyContacts from './components/EmergencyContacts';
import HistoricalStories from './components/HistoricalStories';
import VaigaiChatbot from './components/VaigaiChatbot';
import { TripRouteMap } from './components/TripRouteMap';
import ManuscriptBook from './components/ManuscriptBook';

export default function App() {
  // Authentication State Gate
  const [user, setUser] = useState<{
    name: string;
    email: string;
    interests: string[];
    lang: 'en' | 'ta' | 'hi';
    theme: 'dark' | 'light';
  } | null>(() => {
    const saved = localStorage.getItem('tnstn_authenticated_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Interface language & Theme states synchronizing
  const [currentLang, setCurrentLang] = useState<'en' | 'ta' | 'hi'>(() => {
    const saved = localStorage.getItem('tnstn_lang');
    return (saved as 'en' | 'ta' | 'hi') || 'en';
  });
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('tnstn_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Apply visual theme to the html wrapper body
  useEffect(() => {
    if (user) {
      setCurrentLang(user.lang);
      setCurrentTheme(user.theme);
    }
  }, [user]);

  // Sync back language/theme choices to LocalStorage
  const handleLangChange = (lang: 'en' | 'ta' | 'hi') => {
    setCurrentLang(lang);
    localStorage.setItem('tnstn_lang', lang);
    if (user) {
      const updated = { ...user, lang };
      setUser(updated);
      localStorage.setItem('tnstn_authenticated_user', JSON.stringify(updated));
    }
  };

  const handleThemeChange = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    localStorage.setItem('tnstn_theme', theme);
    if (user) {
      const updated = { ...user, theme };
      setUser(updated);
      localStorage.setItem('tnstn_authenticated_user', JSON.stringify(updated));
    }
  };

  // Main UI Navigation Tabs
  // 'dashboard' | 'explore' | 'planner' | 'gems' | 'festivals' | 'journal' | 'passport' | 'mytrips'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedRole, setSelectedRole] = useState<'Tourist' | 'Local Guide' | 'Tourism Authority'>('Tourist');

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Temporary / Draft filter values
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [tempSelectedCategory, setTempSelectedCategory] = useState<string>('All');
  const [tempSelectedDistrict, setTempSelectedDistrict] = useState<string>('All');
  const [tempSelectedBudget, setTempSelectedBudget] = useState<string>('All');
  const [tempSelectedRegion, setTempSelectedRegion] = useState<string>('All');

  // Sync draft filters when active variables are changed from outside (e.g. from the map selection)
  useEffect(() => {
    setTempSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setTempSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setTempSelectedDistrict(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    setTempSelectedBudget(selectedBudget);
  }, [selectedBudget]);

  useEffect(() => {
    setTempSelectedRegion(selectedRegion);
  }, [selectedRegion]);

  const hasExplorePendingChanges = 
    tempSearchQuery !== searchQuery ||
    tempSelectedCategory !== selectedCategory ||
    tempSelectedDistrict !== selectedDistrict ||
    tempSelectedBudget !== selectedBudget ||
    tempSelectedRegion !== selectedRegion;

  const handleApplyExploreFilters = () => {
    setSearchQuery(tempSearchQuery);
    setSelectedCategory(tempSelectedCategory);
    setSelectedDistrict(tempSelectedDistrict);
    setSelectedBudget(tempSelectedBudget);
    setSelectedRegion(tempSelectedRegion);
  };

  const handleResetExploreFilters = () => {
    setTempSearchQuery('');
    setTempSelectedCategory('All');
    setTempSelectedDistrict('All');
    setTempSelectedBudget('All');
    setTempSelectedRegion('All');

    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setSelectedBudget('All');
    setSelectedRegion('All');
  };

  // Localized labels helper
  const getCategoryLabel = (cat: string) => {
    if (currentLang === 'ta') {
      if (cat === 'All') return 'அனைத்து பிரிவுகள்';
      if (cat === 'Temples') return 'கோயில்கள்';
      if (cat === 'Heritage Sites') return 'பாரம்பரிய இடங்கள்';
      if (cat === 'Wildlife') return 'வனவிலங்கு';
      if (cat === 'Hill Stations') return 'மலை வாழிடங்கள்';
      if (cat === 'Beaches') return 'கடற்கரைகள்';
    } else if (currentLang === 'hi') {
      if (cat === 'All') return 'सभी श्रेणियां';
      if (cat === 'Temples') return 'मंदिर';
      if (cat === 'Heritage Sites') return 'विरासत स्थल';
      if (cat === 'Wildlife') return 'वन्यजीव';
      if (cat === 'Hill Stations') return 'पर्वतीय स्थल';
      if (cat === 'Beaches') return 'समुद्र तट';
    }
    if (cat === 'All') return 'All Categories';
    return cat;
  };

  const getBudgetLabel = (b: string) => {
    if (currentLang === 'ta') {
      if (b === 'All') return 'அனைத்து பட்ஜெட்டுகள்';
      if (b === 'Budget') return 'பட்ஜெட்';
      if (b === 'Moderate') return 'மிதமானது';
      if (b === 'Premium') return 'பிரீமியம்';
    } else if (currentLang === 'hi') {
      if (b === 'All') return 'सभी बजट';
      if (b === 'Budget') return 'बजट';
      if (b === 'Moderate') return 'मध्यम';
      if (b === 'Premium') return 'प्रीमियम';
    }
    if (b === 'All') return 'All Budgets';
    return b;
  };

  const getRegionLabel = (r: string) => {
    if (currentLang === 'ta') {
      if (r === 'All') return 'அனைத்து மண்டலங்கள்';
      if (r === 'North') return 'வடக்கு';
      if (r === 'South') return 'தெற்கு';
      if (r === 'Central') return 'மத்திய';
      if (r === 'West') return 'மேற்கு';
    } else if (currentLang === 'hi') {
      if (r === 'All') return 'सभी क्षेत्र';
      if (r === 'North') return 'उत्तर';
      if (r === 'South') return 'दक्षिण';
      if (r === 'Central') return 'मध्य';
      if (r === 'West') return 'पश्चिम';
    }
    if (r === 'All') return 'All Regions';
    return r;
  };

  // Specs Sheet Detail Modal
  const [viewDetailId, setViewDetailId] = useState<string | null>(null);
  const [bookPage, setBookPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedTripDay, setSelectedTripDay] = useState<{ [tripId: string]: number }>({});
  const [selectedPoint, setSelectedPoint] = useState<{ [tripId: string]: { act: any; index: number; dayNum: number; x: number; y: number } | null }>({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Active saved itineraries workspace
  const [savedTrips, setSavedTrips] = useState<Trip[]>([
    {
      id: 'default-trip',
      name: 'Spiritual Central Tamil Nadu',
      startingLocation: 'Chennai',
      budget: 'Moderate',
      numberOfDays: 3,
      interests: ['Temples', 'Heritage'],
      travelStyle: 'Spiritual',
      crowdPreference: 'Quiet',
      savedPlaces: ['meenakshi-madurai', 'brihadeeswarar-thanjavur'],
      createdAt: '2026-06-15',
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Madurai & Sacred Entry',
          activities: [
            {
              time: '05:30 AM',
              placeName: 'Meenakshi Amman Temple',
              activityDescription: 'Attend the divine milk puja. Admire the Southern Gopuram depicting over 1,500 carved ceramic and plaster deities.',
              foodSuggestion: 'Hot fluffy idlis with traditional peanut chutney at Murugan Idli Shop.',
              tips: 'Dress code is strictly traditional; surrender footwear at the East Gate kiosk.',
              travelTime: '15 mins transit'
            },
            {
              time: '04:00 PM',
              placeName: 'Thirumalai Nayakkar Palace',
              activityDescription: 'Witness the grand white Roman-styled pillars and internal arena built in 1636 AD.',
              foodSuggestion: 'A glass of cold Jigarthanda, Madurai\'s signature almond gum milk dessert.',
              tips: 'Secure the evening light-and-sound show tickets near the main courtyard entry.',
              travelTime: '20 mins local guide rickshaw'
            }
          ]
        },
        {
          day: 2,
          title: 'The Grandeur of Thanjavur',
          activities: [
            {
              time: '09:00 AM',
              placeName: 'Brihadeeswarar Temple',
              activityDescription: 'Walk the extensive inner courtyard made entirely of granite blocks dry-locked without mortar.',
              foodSuggestion: 'Classic central-district vegetarian meals served on banana leaves.',
              tips: 'Examine the 1000-year old inscriptions identifying low-income workers and administrative rules.',
              travelTime: '2 hours interdistrict driving'
            }
          ]
        }
      ]
    }
  ]);
  const [activeTripId, setActiveTripId] = useState<string>('default-trip');

  // Input states for Trip Planner
  const [plannerStart, setPlannerStart] = useState('Chennai');
  const [plannerDays, setPlannerDays] = useState(3);
  const [plannerBudget, setPlannerBudget] = useState<'Budget' | 'Moderate' | 'Premium'>('Moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Temples', 'Heritage', 'Hidden Gems']);
  const [plannerStyle, setPlannerStyle] = useState('Spiritual');
  const [plannerCrowd, setPlannerCrowd] = useState<'Quiet' | 'Lively' | 'No Preference'>('Quiet');
  const [planningResponse, setPlanningResponse] = useState<any | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  // Passport system (Checkins & Points)
  const [userPoints, setUserPoints] = useState(650);
  const [visitedPlaces, setVisitedPlaces] = useState<string[]>(['meenakshi-madurai']);
  const [foundGems, setFoundGems] = useState<string[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(['temp-exp']);

  // Travel Journal
  const [journalMemories, setJournalMemories] = useState<JournalMemory[]>([
    {
      id: 'm1',
      placeId: 'meenakshi-madurai',
      placeName: 'Meenakshi Amman Temple',
      note: 'The morning chants at 5:45 AM were mystical. The sound of bells ringing off the stone pillars was unforgettable.',
      experience: 'Wander around the southern visual lookout to inspect the heights of Meenakshis tower.',
      rating: 5,
      date: '2026-06-12',
      photoUrl: 'https://images.unsplash.com/photo-1600100397608-f010b423b971?auto=format&fit=crop&w=400&q=80'
    }
  ]);
  const [newJournalNote, setNewJournalNote] = useState('');
  const [newJournalExp, setNewJournalExp] = useState('');
  const [newJournalPlace, setNewJournalPlace] = useState('meenakshi-madurai');
  const [newJournalRating, setNewJournalRating] = useState(5);
  const [newJournalPhoto, setNewJournalPhoto] = useState('');

  // Guide Contributions
  const [guideNewName, setGuideNewName] = useState('');
  const [guideNewType, setGuideNewType] = useState('Artisan');
  const [guideNewSpecial, setGuideNewSpecial] = useState('');
  const [guideNewDist, setGuideNewDist] = useState('Nilgiris');
  const [guideNewDesc, setGuideNewDesc] = useState('');
  const [guideListings, setGuideListings] = useState<any[]>([
    { id: 'g1', name: 'Ooty Organic Eucalyptus Oil Distillery', district: 'Nilgiris', type: 'Artisan', specialty: 'Handcrafted raw extracts', description: 'Generational family farming unit distilling purest Nilgiri extracts.' }
  ]);

  // Modals
  const [showSosAlert, setShowSosAlert] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewTips, setReviewTips] = useState('');

  // Helper map district selections
  const [selectedMapDistrict, setSelectedMapDistrict] = useState<string | null>(null);

  // SVG nodes for TN Map boundaries representation
  const districtMapNodes = [
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

  // Language setup shortcut helper
  const t = TRANSLATIONS[currentLang];

  // Localized Destinations dynamic mapping
  const localizedDestinations = useMemo(() => {
    return DESTINATIONS.map(d => getTranslatedDestination(d, currentLang));
  }, [currentLang]);

  // Filter place helper
  const selectedDest = useMemo(() => {
    return localizedDestinations.find(d => d.id === viewDetailId);
  }, [localizedDestinations, viewDetailId]);

  // Authenticate user login action
  const handleUserLogin = (userInfo: {
    name: string;
    email: string;
    interests: string[];
    lang: 'en' | 'ta' | 'hi';
    theme: 'dark' | 'light';
  }) => {
    setUser(userInfo);
    localStorage.setItem('tnstn_authenticated_user', JSON.stringify(userInfo));
    setActiveTab('dashboard'); // Default to newly structured Dashboard
  };

  const handleLogout = () => {
    localStorage.removeItem('tnstn_authenticated_user');
    setUser(null);
  };

  // Navigation page changer
  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Redirect without sliding down
  };

  // Launch modal specifications detail sheet
  const displayPlaceDetail = (placeId: string) => {
    setViewDetailId(placeId);
    setBookPage(1);
  };

  // Helper to resolve location, map search, and image URL for any trip activity
  const resolveActivityAssets = (act: any) => {
    let location = act.location || '';
    let imageUrl = act.imageUrl || '';
    let isMatched = false;
    let matchingId = '';

    // Search for a match in DESTINATIONS
    const match = localizedDestinations.find(d => 
      d.name.toLowerCase().includes(act.placeName.toLowerCase()) || 
      act.placeName.toLowerCase().includes(d.name.toLowerCase()) ||
      d.id.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0])
    );

    if (match) {
      if (!location) location = `${match.name}, ${match.district}`;
      if (!imageUrl) imageUrl = match.imageUrl;
      matchingId = match.id;
      isMatched = true;
    } else {
      if (!location) {
        location = act.location || 'Tamil Nadu, India';
      }
      if (!imageUrl) {
        const lowerName = act.placeName.toLowerCase();
        if (lowerName.includes('temple') || lowerName.includes('kovil') || lowerName.includes('shrine')) {
          imageUrl = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80';
        } else if (lowerName.includes('beach') || lowerName.includes('coast') || lowerName.includes('sea') || lowerName.includes('sunset')) {
          imageUrl = 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80';
        } else if (lowerName.includes('palace') || lowerName.includes('mansion') || lowerName.includes('fort') || lowerName.includes('heritage')) {
          imageUrl = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80';
        } else if (lowerName.includes('fall') || lowerName.includes('forest') || lowerName.includes('mangrove') || lowerName.includes('nature') || lowerName.includes('valley')) {
          imageUrl = 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=600&q=80';
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80';
        }
      }
    }

    let coordinates = match?.coordinates;
    if (!coordinates) {
      const lowerName = act.placeName.toLowerCase();
      if (lowerName.includes('madurai')) {
        coordinates = { lat: 9.9252, lng: 78.1198 };
      } else if (lowerName.includes('chennai')) {
        coordinates = { lat: 13.0827, lng: 80.2707 };
      } else if (lowerName.includes('thanjavur')) {
        coordinates = { lat: 10.7870, lng: 79.1378 };
      } else if (lowerName.includes('nilgiris') || lowerName.includes('ooty')) {
        coordinates = { lat: 11.4102, lng: 76.6950 };
      } else if (lowerName.includes('coimbatore')) {
        coordinates = { lat: 11.0168, lng: 76.9558 };
      } else if (lowerName.includes('kanyakumari')) {
        coordinates = { lat: 8.0883, lng: 77.5385 };
      } else if (lowerName.includes('rameswaram')) {
        coordinates = { lat: 9.2876, lng: 79.3129 };
      } else if (lowerName.includes('trichy') || lowerName.includes('tiruchirappalli')) {
        coordinates = { lat: 10.7905, lng: 78.7047 };
      } else if (lowerName.includes('kanchipuram')) {
        coordinates = { lat: 12.8342, lng: 79.7036 };
      } else {
        let hash = 0;
        for (let i = 0; i < act.placeName.length; i++) {
          hash = act.placeName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const lat = 9.0 + (Math.abs(hash % 40) / 10);
        const lng = 77.0 + (Math.abs((hash >> 4) % 30) / 10);
        coordinates = { lat, lng };
      }
    }

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.placeName + ', Tamil Nadu, India')}`;

    return {
      location,
      imageUrl,
      isMatched,
      matchingId,
      mapsUrl,
      coordinates
    };
  };

  // AIS Tour Itinerary generator trigger
  const generateTripPlan = async () => {
    setIsPlanning(true);
    setPlanningResponse(null);

    const payload = {
      startingLocation: plannerStart,
      budget: plannerBudget,
      numberOfDays: plannerDays,
      interests: selectedInterests,
      travelStyle: plannerStyle,
      crowdPreference: plannerCrowd
    };

    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setPlanningResponse(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlanning(false);
    }
  };

  const saveGeneratedTripToHub = () => {
    if (!planningResponse) return;
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      name: `AI Curated Route from ${plannerStart} (${plannerDays} Days)`,
      startingLocation: plannerStart,
      budget: plannerBudget,
      numberOfDays: plannerDays,
      interests: selectedInterests,
      travelStyle: plannerStyle,
      crowdPreference: plannerCrowd,
      savedPlaces: planningResponse.itinerary.map((d: any) => d.activities[0]?.placeName || '').filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
      itinerary: planningResponse.itinerary
    };

    setSavedTrips(prev => [...prev, newTrip]);
    setActiveTripId(newTrip.id);
    changeTab('mytrips');
    setUserPoints(prev => prev + 100);
    if (!unlockedBadges.includes('fest-enth')) {
      setUnlockedBadges(prev => [...prev, 'fest-enth']);
    }
  };

  // Checked-In Checkbox Passport game loop
  const toggleCheckedInPlace = (placeId: string) => {
    if (visitedPlaces.includes(placeId)) {
      setVisitedPlaces(prev => prev.filter(x => x !== placeId));
    } else {
      setVisitedPlaces(prev => [...prev, placeId]);
      setUserPoints(prev => prev + 150);

      // Collectible achievement badges logic
      const target = localizedDestinations.find(d => d.id === placeId);
      if (target?.isHiddenGem && !foundGems.includes(placeId)) {
        setFoundGems(prev => [...prev, placeId]);
        if (!unlockedBadges.includes('nat-exp')) {
          setUnlockedBadges(prev => [...prev, 'nat-exp']);
        }
      }

      if (visitedPlaces.length + 1 >= 3 && !unlockedBadges.includes('temp-exp')) {
        setUnlockedBadges(prev => [...prev, 'temp-exp']);
      }
    }
  };

  // Submit Community reviews
  const submitReview = () => {
    if (!reviewComment.trim() || !viewDetailId) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      user: user ? user.name : 'Anonymous Traveller',
      rating: reviewRating,
      comment: reviewComment,
      tips: reviewTips,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    // Push local reviews immediately onto detail view
    if (selectedDest) {
      selectedDest.reviews = [newRev, ...selectedDest.reviews];
    }

    setReviewComment('');
    setReviewTips('');
    setUserPoints(prev => prev + 50);
    alert('Thank you for contributing to the Tamil Nadu heritage network!');
  };

  // Submit Journey reflection
  const submitJournalMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalNote.trim()) return;

    const target = localizedDestinations.find(d => d.id === newJournalPlace);
    const newMemory: JournalMemory = {
      id: `m-${Date.now()}`,
      placeId: newJournalPlace,
      placeName: target ? target.name : 'Vaikai Region Heritage',
      note: newJournalNote,
      experience: newJournalExp || 'Traditional local architecture analysis.',
      rating: newJournalRating,
      date: new Date().toISOString().split('T')[0],
      photoUrl: newJournalPhoto || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'
    };

    setJournalMemories(prev => [newMemory, ...prev]);
    setNewJournalNote('');
    setNewJournalExp('');
    setNewJournalPhoto('');
    setUserPoints(prev => prev + 80);
    alert('Memory locked safely inside your Digital Travel Book!');
  };

  // Guides adding new locations
  const createGuideListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideNewName.trim()) return;

    const newListing = {
      id: `g-${Date.now()}`,
      name: guideNewName,
      type: guideNewType,
      specialty: guideNewSpecial || 'Handloom traditional crafts',
      district: guideNewDist,
      description: guideNewDesc || 'Generational artisan workshop preserving native heritage.'
    };

    setGuideListings(prev => [newListing, ...prev]);
    setGuideNewName('');
    setGuideNewSpecial('');
    setGuideNewDesc('');
    setUserPoints(prev => prev + 120);
    alert('Local experience listed successfully for travellers!');
  };

  // Filter conditions
  const filteredDestinations = localizedDestinations.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query) ||
                        item.district.toLowerCase().includes(query);
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    const matchBudget = selectedBudget === 'All' || item.budgetLevel === selectedBudget;
    const matchRegion = selectedRegion === 'All' || item.region === selectedRegion;

    return matchSearch && matchCategory && matchDistrict && matchBudget && matchRegion;
  });

  // Render Gate Check: Show login registration first when not logged in
  if (!user) {
    return (
      <LoginScreen
        onLogin={handleUserLogin}
        currentLang={currentLang}
        onChangeLang={handleLangChange}
        currentTheme={currentTheme}
        onChangeTheme={handleThemeChange}
      />
    );
  }

  const isDark = currentTheme === 'dark';

  return (
    <div className={`w-full min-h-screen font-sans selection:bg-[#D4AF37]/40 relative overflow-x-hidden flex flex-col transition-all duration-300 ${
      isDark ? 'bg-[#001f3f] text-white' : 'bg-[#FAF9F5] text-slate-900'
    }`}>
      
      {/* Visual Ambient Blur mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45 overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full blur-[140px] ${isDark ? 'bg-[#003366]' : 'bg-amber-100/30'}`}></div>
        <div className={`absolute bottom-[-5%] right-[-5%] w-[45vw] h-[45vh] rounded-full blur-[110px] opacity-25 ${isDark ? 'bg-[#D4AF37]' : 'bg-orange-100/40'}`}></div>
      </div>

      {/* Distress SOS Overlay Modal */}
      {showSosAlert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-red-950/90 border-2 border-red-500 rounded-3xl p-6 md:p-8 max-w-xl w-full text-center relative shadow-2xl backdrop-blur-2xl text-white">
            <button 
              onClick={() => setShowSosAlert(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-red-400 mb-2 uppercase tracking-wide">
              {t.sosAlertTitle}
            </h2>
            <p className="text-xs text-white/80 max-w-md mx-auto mb-6 leading-relaxed">
              {t.sosAlertSubtitle}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a href="tel:18004253111" className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-bold text-xs transition-all shadow-lg text-white">
                <PhoneCall className="w-4 h-4" />
                State Hub: 1800-425-3111
              </a>
              <a href="tel:100" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-2xl font-bold text-xs text-white">
                <PhoneCall className="w-4 h-4 text-red-400" />
                State Police Dispatch: 100
              </a>
              <a href="tel:108" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-2xl font-bold text-xs text-white">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Ambulance service: 108
              </a>
              <div className="p-3 bg-white/5 rounded-2xl text-[10px] flex items-center justify-center gap-2 border border-white/5 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Live Satellite Lock On
              </div>
            </div>
            
            <button 
              onClick={() => setShowSosAlert(false)}
              className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase"
            >
              {t.closeSos}
            </button>
          </div>
        </div>
      )}

      {/* Top Header Navigation bar */}
      <header className={`relative z-10 border-b backdrop-blur-md transition-colors ${
        isDark ? 'border-white/10 bg-black/20' : 'border-slate-200/80 bg-white/60'
      }`}>
        <div className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between">
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => changeTab('dashboard')}>
            <TamiraLogo size={46} inline={true} />
            <div className="hidden md:block">
              <span className="text-[8px] font-bold text-[#C8A25A] bg-[#C8A25A]/10 border border-[#C8A25A]/25 rounded px-2 py-0.5 uppercase tracking-widest relative -top-0.5">
                PRO PORTAL
              </span>
            </div>
          </div>

          {/* Desktop nav tabs */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
            {['dashboard', 'explore', 'planner', 'gems', 'festivals', 'journal', 'passport', 'mytrips'].map((tab) => (
              <button
                key={tab}
                onClick={() => changeTab(tab)}
                className={`hover:text-[#D4AF37] transition-all pb-1 relative cursor-pointer ${
                  activeTab === tab ? 'text-[#D4AF37]' : isDark ? 'text-white/70' : 'text-slate-700'
                }`}
              >
                {tab === 'dashboard' ? t.tabDashboard : tab === 'explore' ? t.tabDiscover : tab === 'gems' ? t.tabEcoGems : tab === 'festivals' ? t.tabFestivals : tab === 'journal' ? t.tabJournal : tab === 'passport' ? t.tabPassport : tab === 'mytrips' ? t.tabMyTrips : tab === 'planner' ? t.activeItinerary : tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full"></span>}
              </button>
            ))}
          </nav>

          {/* Config switches and logout */}
          <div className="flex items-center gap-3">
            {/* Lang dropdown */}
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[11px] font-bold ${
              isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'
            }`}>
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={currentLang}
                onChange={(e) => handleLangChange(e.target.value as 'en' | 'ta' | 'hi')}
                className="bg-transparent outline-none cursor-pointer font-bold text-[10px] uppercase text-inherit"
              >
                <option value="en" className="text-black">EN</option>
                <option value="ta" className="text-black">தமிழ்</option>
                <option value="hi" className="text-black">हिन्दी</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => handleThemeChange(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark ? 'bg-black/20 border-white/5 text-[#D4AF37]' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Points Indicator */}
            <div 
              onClick={() => changeTab('passport')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-black cursor-pointer shadow-inner border transition-all ${
                isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]' : 'bg-amber-100/40 border-amber-300 text-amber-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{userPoints} pts</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark ? 'bg-black/20 border-white/5 text-slate-400 hover:text-red-400' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-red-500'
              }`}
              title={t.logoutButton}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-12 gap-6 relative z-10">
        
        {/* Mobile quick tabs carousel */}
        <div className="col-span-12 lg:hidden flex gap-2 overflow-x-auto pb-3 border-b border-white/10 mb-2 scrollbar-none">
          {['dashboard', 'explore', 'planner', 'gems', 'festivals', 'journal', 'passport', 'mytrips'].map((tab) => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-[#D4AF37] text-[#001f3f]' 
                  : isDark ? 'border border-white/10 text-white/70 bg-black/10' : 'border border-slate-200 text-slate-700 bg-white'
              }`}
            >
              {tab === 'dashboard' ? t.tabDashboard : tab === 'explore' ? t.tabDiscover : tab === 'gems' ? t.tabEcoGems : tab === 'festivals' ? t.tabFestivals : tab === 'journal' ? t.tabJournal : tab === 'passport' ? t.tabPassport : tab === 'mytrips' ? t.tabMyTrips : tab === 'planner' ? t.activeItinerary : tab}
            </button>
          ))}
        </div>

        {/* LEFT COLUMN: Map Navigation and District Select */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          
          {/* District Select interactive map node */}
          <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
          }`}>
            <h3 className="text-xs font-black uppercase text-[#D4AF37] tracking-widest mb-1">
              {t.intelMapTitle || 'Smart Intel Map'}
            </h3>
            <p className="text-[11px] opacity-60 mb-4">{t.intelMapSubtitle || 'Click dynamic node pins to reload travel filters immediately:'}</p>

            {/* Dynamic District representation SVG */}
            <div className="w-full h-64 bg-black/30 rounded-2xl relative border border-white/5 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 320 480" className="w-[85%] h-[90%] select-none">
                {districtMapNodes.map((node) => (
                  <path
                    key={node.id}
                    d={node.d}
                    fill={selectedDistrict === node.id || selectedMapDistrict === node.id ? '#D4AF37' : '#FFFFFF'}
                    fillOpacity={selectedDistrict === node.id || selectedMapDistrict === node.id ? '0.35' : '0.07'}
                    stroke={selectedDistrict === node.id || selectedMapDistrict === node.id ? '#D4AF37' : 'rgba(255,255,255,0.15)'}
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all hover:fill-[#D4AF37] hover:fill-opacity-50"
                    onClick={() => {
                      setSelectedDistrict(node.id);
                      setSelectedMapDistrict(node.id);
                      changeTab('explore');
                    }}
                  />
                ))}

                {districtMapNodes.map((node) => (
                  <g key={`pin-${node.id}`} className="cursor-pointer" onClick={() => {
                    setSelectedDistrict(node.id);
                    setSelectedMapDistrict(node.id);
                    changeTab('explore');
                  }}>
                    <circle cx={node.x} cy={node.y} r="4.5" fill="#D4AF37" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx={node.x} cy={node.y} r="3" fill={selectedDistrict === node.id ? '#50C878' : '#D4AF37'} />
                    <text x={node.x + 6} y={node.y + 4} fill="white" fontStyle="bold" fontSize="8" className="pointer-events-none drop-shadow-md">
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>

              {selectedDistrict !== 'All' && (
                <button
                  onClick={() => { setSelectedDistrict('All'); setSelectedMapDistrict(null); }}
                  className="absolute bottom-2.5 right-2.5 bg-white/10 border border-white/20 text-white hover:bg-white/25 transition-all rounded-xl px-2.5 py-1 text-[9px] font-black"
                >
                  Reset Map
                </button>
              )}
            </div>
          </div>

          {/* Role selector panel */}
          <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
          }`}>
            <h3 className="text-xs font-black uppercase text-[#D4AF37] mb-3">Operating Access Role</h3>
            <div className="flex flex-col gap-1.5 p-1 bg-black/20 rounded-2xl text-[11px] font-black text-center">
              <button
                onClick={() => setSelectedRole('Tourist')}
                className={`py-2 rounded-xl transition-all ${selectedRole === 'Tourist' ? 'bg-[#D4AF37] text-[#001F3F]' : 'text-inherit/60 opacity-70 hover:opacity-100'}`}
              >
                Tourist Mode
              </button>
              <button
                onClick={() => setSelectedRole('Local Guide')}
                className={`py-2 rounded-xl transition-all ${selectedRole === 'Local Guide' ? 'bg-[#D4AF37] text-[#001F3F]' : 'text-inherit/60 opacity-70 hover:opacity-100'}`}
              >
                Local Guide Mode
              </button>
              <button
                onClick={() => setSelectedRole('Tourism Authority')}
                className={`py-2 rounded-xl transition-all ${selectedRole === 'Tourism Authority' ? 'bg-[#D4AF37] text-[#001F3F]' : 'text-inherit/60 opacity-70 hover:opacity-100'}`}
              >
                State Authority View
              </button>
            </div>
          </div>

        </aside>

        {/* CENTER COLUMN: Stage screen logic */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          
          {/* SCREEN 1: THE RESTRUCTURED MAIN TOURISM DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Dynamic Welcome display header and Living Cultural Map Hero */}
              <div className="space-y-4">
                <div className={`p-6 md:p-8 rounded-2xl border relative overflow-hidden flex flex-col justify-end backdrop-blur-xl ${
                  isDark ? 'bg-gradient-to-br from-[#071C36] to-[#030e1c] border-[#C8A25A]/20' : 'bg-gradient-to-br from-[#F4E9D2] to-[#FAF5E6] border-[#C8A25A]/30 shadow-sm'
                }`}>
                  {/* Subtle decorative manuscript background texture */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_1px,#C8A25A_1px),linear-gradient(to_right,transparent_1px,#C8A25A_1px)] bg-[size:20px_20px]" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3.5">
                      <span className="px-2.5 py-1 text-[8.5px] font-black tracking-widest text-[#C8A25A] bg-black/40 backdrop-blur-md rounded-full border border-[#C8A25A]/35 uppercase">
                        Vanakam, {user.name}!
                      </span>
                      <span className="px-2.5 py-1 text-[8.5px] font-bold text-center text-emerald-400 bg-emerald-950/40 backdrop-blur-md rounded-full border border-emerald-500/20 uppercase tracking-wider">
                        TAMIL CIVILIZATION GATEWAY ACTIVE
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif font-extrabold tracking-wide text-[#C8A25A] mb-2 uppercase">
                      {t.dashboardTitle || "TAMIRA Control Gateway"}
                    </h1>
                    <p className={`text-xs md:text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-[#071C36]'}`}>
                      {t.dashboardSubtitle || "Your immersive digital gateway to Tamil Nadu's ancient civilization—where history, geography, and storytelling converge."}
                    </p>
                  </div>
                </div>

                {/* LIVING CULTURAL MAP OF TAMIL NADU HERO */}
                <LivingCulturalMap isDark={isDark} t={t} onExplorePlace={displayPlaceDetail} />
              </div>

              {/* CORE DASHBOARD: "My Trip" timeline component */}
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                      {t.myTripTitle}
                    </h2>
                    <p className="text-xs opacity-50">{t.myTripSubtitle}</p>
                  </div>
                  {/* Tour Planner Switch Link */}
                  <button
                    onClick={() => changeTab('planner')}
                    className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:opacity-90 text-[#001F3F] font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.tourPlannerButton}</span>
                  </button>
                </div>

                {/* Simulated Trip Checklist progress */}
                {savedTrips.length > 0 ? (
                  <div className="space-y-4">
                    {/* Active Route label */}
                    <div className="p-3.5 bg-black/20 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-white/40 uppercase font-black">Currently active route:</span>
                        <h4 className="font-bold text-[#D4AF37] text-xs mt-0.5">{savedTrips.find(st => st.id === activeTripId)?.name || savedTrips[0].name}</h4>
                      </div>
                      <div className="text-[10px] bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold uppercase shrink-0">
                        {savedTrips.find(st => st.id === activeTripId)?.budget} LEVEL BUDGET
                      </div>
                    </div>

                    {/* Step timeline milestones */}
                    <div className="relative pl-6 border-l border-white/10 space-y-5">
                      {(savedTrips.find(st => st.id === activeTripId) || savedTrips[0]).itinerary.map((dayData) => (
                        <div key={dayData.day} className="relative">
                          {/* Dot marker */}
                          <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] border-2 border-[#001F3F] shadow-[0_0_8px_#D4AF37]"></span>
                          
                          <div>
                            <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-wider">{t.dayTitle} {dayData.day} • {dayData.title}</span>
                            
                            <div className="grid grid-cols-1 gap-4 mt-2">
                              {dayData.activities.map((act, actIdx) => {
                                const { location, imageUrl, mapsUrl, isMatched, matchingId } = resolveActivityAssets(act);
                                return (
                                  <div key={actIdx} className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 justify-between leading-normal transition-all duration-300 ${
                                    isDark ? 'bg-black/25 border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-200 hover:shadow-sm'
                                  }`}>
                                    <div className="flex-1 space-y-2">
                                      <div className="flex justify-between items-start gap-2">
                                        <h5 
                                          onClick={() => {
                                            const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                            displayPlaceDetail(targetId);
                                          }}
                                          className="font-black text-xs md:text-sm hover:text-[#D4AF37] hover:underline cursor-pointer transition-colors text-inherit flex items-center gap-1.5"
                                        >
                                          <Award className="w-4 h-4 text-[#C8A25A] shrink-0" />
                                          <span>{act.placeName}</span>
                                        </h5>
                                        <span className="text-[10px] opacity-40 font-bold shrink-0">{act.time}</span>
                                      </div>
                                      <p className="text-[11px] opacity-85 leading-relaxed">
                                        {act.activityDescription}
                                      </p>

                                      <div className="mt-3 pt-2 px-1 border-t border-white/5 flex flex-col gap-1.5 text-[10px]">
                                        {act.foodSuggestion && (
                                          <div className="flex items-center gap-1.5 text-orange-400 font-semibold leading-none">
                                            <Utensils className="w-3.5 h-3.5" />
                                            <span>{t.foodSuggestion}: {act.foodSuggestion}</span>
                                          </div>
                                        )}
                                        {act.tips && (
                                          <div className="text-[#D4AF37] italic leading-tight flex items-start gap-1">
                                            <Info className="w-3.5 h-3.5 text-[#C8A25A] mt-0.5 shrink-0" />
                                            <span>{t.practicalTips}: {act.tips}</span>
                                          </div>
                                        )}
                                      </div>

                                      {/* Location and Map Attachment */}
                                      <div className="flex flex-wrap items-center gap-2 pt-1">
                                        <span className="inline-flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                                          <MapPin className="w-3 h-3 text-[#C8A25A]" />
                                          <span>{location}</span>
                                        </span>
                                        <a 
                                          href={mapsUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-[9px] bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full font-medium transition-all cursor-pointer animate-pulse"
                                        >
                                          <Map className="w-3 h-3 text-sky-400 shrink-0" />
                                          <span>Explore Map</span>
                                        </a>
                                      </div>
                                    </div>

                                    {/* Image Attachment */}
                                    {imageUrl && (
                                      <div 
                                        onClick={() => {
                                          const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                          displayPlaceDetail(targetId);
                                        }}
                                        className="w-full md:w-36 h-24 rounded-xl overflow-hidden relative shrink-0 shadow-inner group border border-white/5 cursor-pointer"
                                      >
                                        <img src={imageUrl} alt={act.placeName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <span className="text-[9px] bg-black/80 font-black text-[#D4AF37] px-1.5 py-0.5 rounded">VIEW DETAILS</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs opacity-55">No trips set up. Press generate tour planner button above to create one!</p>
                )}
              </div>

              {/* CORE DASHBOARD: "Historical Trip Stories" Slider/Accordion */}
              <HistoricalStories
                currentLang={currentLang}
                theme={currentTheme}
                onExplorePlace={displayPlaceDetail}
              />

              {/* CORE DASHBOARD: Category-wise destinations matching chosen interest categories */}
              <div className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
              }`}>
                <div>
                  <h2 className="text-lg font-black tracking-tight">
                    {t.recommendedForYou}
                  </h2>
                  <p className="text-xs opacity-50">{t.recommendedForYouSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DESTINATIONS.filter(d => 
                    user.interests.includes(d.category) || 
                    user.interests.some(interest => d.category.includes(interest)) ||
                    d.rating >= 4.8
                  ).slice(0, 4).map((d) => {
                    // Check if there is a festival currently running in this district place
                    const matchingFest = FESTIVALS.find(f => f.district === d.district);

                    return (
                      <div 
                        key={d.id}
                        onClick={() => displayPlaceDetail(d.id)}
                        className={`rounded-2xl border overflow-hidden p-3 transition-all transform hover:scale-[1.01] hover:border-[#D4AF37]/50 active:scale-95 group flex flex-col h-full cursor-pointer ${
                          isDark ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="h-32 rounded-xl overflow-hidden relative shrink-0">
                          <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8.5px] text-[#D4AF37] border border-[#D4AF37]/20 font-black tracking-widest uppercase">
                            {d.district}
                          </span>
                        </div>
                        
                        <div className="p-2 flex-1 flex flex-col justify-between mt-1">
                          <div>
                            <h4 className="font-extrabold text-xs group-hover:text-[#D4AF37] transition-colors">{d.name}</h4>
                            <p className="text-[10px] opacity-65 leading-relaxed line-clamp-2 mt-1">{d.description}</p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-white/5 flex flex-col gap-2 shrink-0">
                            {/* Dynamic Running Festival attachment */}
                            {matchingFest ? (
                              <div className="bg-orange-500/10 border border-orange-500/20 p-1.5 rounded-lg text-[9px] text-orange-400 font-bold block animate-pulse">
                                <Calendar className="w-3 h-3 text-orange-400 inline-block -mt-0.5" /> {t.currentFestivals}: {matchingFest.name} ({matchingFest.date})
                              </div>
                            ) : (
                              <div className="text-[9px] text-emerald-400 font-black uppercase tracking-wider block">
                                <ShieldCheck className="w-3 h-3 text-emerald-400 inline-block -mt-0.5" /> SERENE ATMOSPHERE COCOON
                              </div>
                            )}

                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span className="text-amber-500 font-bold shrink-0 text-xs flex items-center gap-0.5">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <span>{d.rating}</span>
                              </span>
                              <span className="opacity-50">{d.budgetLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CORE DASHBOARD: Emergency contacts corner card */}
              <EmergencyContacts
                currentLang={currentLang}
                theme={currentTheme}
                onTriggerSos={() => setShowSosAlert(true)}
              />

            </div>
          )}

          {/* SCREEN 2: ALL DESTINATIONS DISCOVER / FILTER HUB */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              
              {/* Search filter panel */}
              <div className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
              }`}>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t.exploreSearchPlaceholder || "Search temples, Dynastic relics, regions..."}
                    value={tempSearchQuery}
                    onChange={(e) => setTempSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleApplyExploreFilters();
                    }}
                    className={`w-full pl-11 pr-4 py-3 text-xs md:text-sm rounded-2xl outline-none focus:border-[#D4AF37]/50 border ${
                      isDark ? 'bg-black/35 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* Filters grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[10.5px] font-black uppercase tracking-wider">
                  <div>
                    <span className="block opacity-40 text-[9px] mb-1">{t.exploreCategoryLabel || 'Category'}</span>
                    <select
                      value={tempSelectedCategory}
                      onChange={(e) => setTempSelectedCategory(e.target.value)}
                      className={`w-full p-2 rounded-xl outline-none border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-150 border-slate-200'}`}
                    >
                      <option value="All">{getCategoryLabel('All')}</option>
                      <option value="Temples">{getCategoryLabel('Temples')}</option>
                      <option value="Heritage Sites">{getCategoryLabel('Heritage Sites')}</option>
                      <option value="Wildlife">{getCategoryLabel('Wildlife')}</option>
                      <option value="Hill Stations">{getCategoryLabel('Hill Stations')}</option>
                      <option value="Beaches">{getCategoryLabel('Beaches')}</option>
                    </select>
                  </div>

                  <div>
                    <span className="block opacity-40 text-[9px] mb-1">{t.exploreDistrictLabel || 'District'}</span>
                    <select
                      value={tempSelectedDistrict}
                      onChange={(e) => setTempSelectedDistrict(e.target.value)}
                      className={`w-full p-2 rounded-xl outline-none border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-150 border-slate-200'}`}
                    >
                      <option value="All">
                        {currentLang === 'ta' ? 'அனைத்து மாவட்டங்கள்' : currentLang === 'hi' ? 'सभी जिले' : 'All Districts'}
                      </option>
                      {DISTRICTS.map(d => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block opacity-40 text-[9px] mb-1">{t.exploreBudgetLabel || 'Budget'}</span>
                    <select
                      value={tempSelectedBudget}
                      onChange={(e) => setTempSelectedBudget(e.target.value)}
                      className={`w-full p-2 rounded-xl outline-none border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-150 border-slate-200'}`}
                    >
                      <option value="All">{getBudgetLabel('All')}</option>
                      <option value="Budget">{getBudgetLabel('Budget')}</option>
                      <option value="Moderate">{getBudgetLabel('Moderate')}</option>
                      <option value="Premium">{getBudgetLabel('Premium')}</option>
                    </select>
                  </div>

                  <div>
                    <span className="block opacity-40 text-[9px] mb-1">{t.exploreRegionLabel || 'Region'}</span>
                    <select
                      value={tempSelectedRegion}
                      onChange={(e) => setTempSelectedRegion(e.target.value)}
                      className={`w-full p-2 rounded-xl outline-none border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-150 border-slate-200'}`}
                    >
                      <option value="All">{getRegionLabel('All')}</option>
                      <option value="North">{getRegionLabel('North')}</option>
                      <option value="South">{getRegionLabel('South')}</option>
                      <option value="Central">{getRegionLabel('Central')}</option>
                      <option value="West">{getRegionLabel('West')}</option>
                    </select>
                  </div>
                </div>

                {/* Manual Search Option Button Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/40 dark:border-white/5">
                  <div className="text-[11px] leading-relaxed opacity-60">
                    {hasExplorePendingChanges ? (
                      <span className="text-[#D4AF37] font-semibold animate-pulse flex items-center gap-1">
                        ✨ {currentLang === 'ta' ? 'வடிப்பான்கள் மாறின - தேடலை அழுத்தவும்' : currentLang === 'hi' ? 'फ़िल्टर बदले गए हैं - खोजें पर क्लिक करें' : 'Filter parameters changed. Click Search.'}
                      </span>
                    ) : (
                      <span>
                        {filteredDestinations.length} {t.exploreResultsFound || "results match your search criteria"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetExploreFilters}
                      disabled={
                        !searchQuery && 
                        selectedCategory === 'All' && 
                        selectedDistrict === 'All' && 
                        selectedBudget === 'All' && 
                        selectedRegion === 'All' && 
                        !tempSearchQuery && 
                        tempSelectedCategory === 'All' && 
                        tempSelectedDistrict === 'All' && 
                        tempSelectedBudget === 'All' && 
                        tempSelectedRegion === 'All'
                      }
                      className="flex-grow sm:flex-grow-0 text-center py-2 px-4 rounded-xl text-xs font-bold border border-slate-300 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t.exploreResetButton || 'Reset Filters'}
                    </button>

                    <button
                      onClick={handleApplyExploreFilters}
                      className={`flex-grow sm:flex-grow-0 text-center py-2 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-1.5 ${
                        hasExplorePendingChanges 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] text-black shadow-amber-500/10 scale-[1.03] ring-2 ring-[#D4AF37]/50'
                          : 'bg-[#D4AF37] text-black hover:bg-[#BCA02B]'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5 text-black stroke-[3]" />
                      {t.exploreSearchButton || 'Search Destinations'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Destinations Outputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredDestinations.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => displayPlaceDetail(item.id)}
                    className={`rounded-3xl border-2 overflow-hidden p-5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between group relative active:scale-98 ${
                      isDark 
                        ? 'bg-[#071C36]/90 border-[#C8A25A]/25 text-white hover:border-[#C8A25A]/60 shadow-[0_20px_45px_rgba(0,0,0,0.5)]' 
                        : 'bg-[#FAF5E6] border-[#C8A25A]/30 text-amber-950 hover:border-[#C8A25A]/60 shadow-[0_15px_35px_rgba(139,115,85,0.12)]'
                    }`}
                  >
                    {/* Gold corner accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C8A25A]/30 pointer-events-none rounded-tl"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C8A25A]/30 pointer-events-none rounded-tr"></div>
                    
                    <div className="space-y-3.5">
                      {/* Heritage Image Frame */}
                      <div className="h-44 rounded-2xl overflow-hidden relative border border-[#C8A25A]/20 shadow-md">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 pointer-events-none select-none" 
                        />
                        {item.isHiddenGem && (
                          <span className="absolute top-3 left-3 font-sans text-[8.5px] dark:bg-emerald-950/90 dark:border-emerald-500/30 bg-emerald-100 border border-emerald-600/40 px-2.5 py-1 rounded-lg text-emerald-800 dark:text-emerald-300 font-extrabold uppercase tracking-widest shadow-md">
                            Preserved Gem
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[8px] text-[#C8A25A] border border-[#C8A25A]/35 font-sans font-black shadow-md uppercase tracking-wider">
                          {item.region} Region
                        </span>
                      </div>

                      {/* Text details */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] tracking-widest font-black uppercase text-[#C8A25A] font-sans">
                            {item.district} DISTRICT
                          </span>
                          <span className="text-amber-500 font-bold shrink-0 text-xs flex items-center gap-0.5 font-sans">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {item.rating}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base md:text-lg tracking-tight group-hover:text-[#C8A25A] transition-colors leading-tight">
                          {item.name}
                        </h4>

                        {/* Historical dynasty indicator */}
                        <p className="text-[10px] font-sans font-extrabold text-[#b8860b] uppercase tracking-wide">
                          Dynasty: {item.historyHub.dynasty}
                        </p>

                        <p className={`text-xs leading-relaxed text-justify font-manuscript line-clamp-3 ${
                          isDark ? 'text-white/80' : 'text-amber-950/90'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Museum Explore CTA Footer */}
                    <div className="mt-5 pt-3.5 border-t border-amber-900/10 flex justify-between items-center text-[10.5px] font-sans font-black uppercase tracking-wider text-[#C8A25A]">
                      <span className="flex items-center gap-1.5 bg-[#C8A25A]/10 px-3 py-1 rounded-lg hover:bg-[#C8A25A]/25 transition-colors border border-[#C8A25A]/15">
                        Read Codex Ledger
                      </span>
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-medium">{item.category}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* SCREEN 3: TOUR PLANNER GENERATOR */}
          {activeTab === 'planner' && (
            <div className={`p-6 md:p-8 rounded-3xl border backdrop-blur-xl space-y-6 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
            }`}>
              <div>
                <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  {t.tourPlannerTitle}
                </h2>
                <p className="text-xs opacity-50">{t.tourPlannerSubtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/50 mb-1.5">Starting City / Point</label>
                  <input
                    type="text"
                    value={plannerStart}
                    onChange={(e) => setPlannerStart(e.target.value)}
                    className={`w-full p-3 rounded-2xl outline-none focus:border-[#D4AF37] border ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/50 mb-1.5">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={plannerDays}
                    onChange={(e) => setPlannerDays(Number(e.target.value))}
                    className={`w-full p-3 rounded-2xl outline-none focus:border-[#D4AF37] border ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/50 mb-1.5">Budget Level</label>
                  <select
                    value={plannerBudget}
                    onChange={(e) => setPlannerBudget(e.target.value as any)}
                    className={`w-full p-3 rounded-2xl outline-none border ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  >
                    <option value="Budget">Budget level</option>
                    <option value="Moderate">Moderate level</option>
                    <option value="Premium">Premium luxury level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/50 mb-1.5">Travel Mood Style</label>
                  <select
                    value={plannerStyle}
                    onChange={(e) => setPlannerStyle(e.target.value)}
                    className={`w-full p-3 rounded-2xl outline-none border ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  >
                    <option value="Spiritual">Spiritual / Sacred</option>
                    <option value="Heritage">Heritage / Dynastic</option>
                    <option value="Nature">Eco-Nature / Wildlife</option>
                    <option value="Foodie">Culinary / Indigenous Food</option>
                    <option value="Adventure">Adventure / Western hiking</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateTripPlan}
                disabled={isPlanning}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#001F3F] font-black text-xs uppercase tracking-widest rounded-2xl hover:opacity-95 transform active:scale-95 transition-all shadow-xl shadow-amber-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPlanning ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping"></span>
                    <span>{t.generatingPlan}</span>
                  </>
                ) : (
                  <>
                    <span>➔ {t.tourPlannerButton}</span>
                  </>
                )}
              </button>

              {/* Output planner itinerary result */}
              {planningResponse && (
                <div className={`p-5 rounded-3xl border space-y-4 animate-fade-in ${
                  isDark ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">Architected Timeline Summary</span>
                    <p className="text-xs leading-relaxed italic opacity-85 mt-1 font-semibold">"{planningResponse.summary}"</p>
                  </div>

                  <div className="relative pl-5 border-l border-[#D4AF37]/30 space-y-4">
                    {planningResponse.itinerary.map((day: any) => (
                      <div key={day.day}>
                        <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-wider">{t.dayTitle} {day.day} • {day.title}</span>
                        <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                          {day.activities.map((act: any, idx: number) => {
                            const { location, imageUrl, mapsUrl, isMatched, matchingId } = resolveActivityAssets(act);
                            return (
                              <div key={idx} className="p-4 bg-black/20 border border-white/5 rounded-xl text-xs flex flex-col md:flex-row justify-between gap-4 transition-all duration-300 hover:border-[#D4AF37]/30">
                                <div className="flex-1 space-y-2">
                                  <div className="flex justify-between items-center font-bold">
                                    <h6 
                                      onClick={() => {
                                        const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                        displayPlaceDetail(targetId);
                                      }}
                                      className="hover:text-[#D4AF37] hover:underline cursor-pointer transition-colors flex items-center gap-1.5"
                                    >
                                      <Award className="w-4 h-4 text-[#C8A25A] shrink-0" />
                                      <span>{act.placeName}</span>
                                    </h6>
                                    <span className="text-[10px] opacity-40 font-mono">{act.time}</span>
                                  </div>
                                  <p className="opacity-75 text-[11px] leading-relaxed">{act.activityDescription}</p>
                                  <div className="text-[10px] text-[#D4AF37] space-y-1">
                                    {act.foodSuggestion && (
                                      <div>
                                        <Utensils className="w-3 h-3 text-orange-400 inline-block -mt-0.5 mr-1" />
                                        <span>Food Option: {act.foodSuggestion}</span>
                                      </div>
                                    )}
                                    {act.tips && (
                                      <div className="text-[#D4AF37] opacity-95">
                                        <Info className="w-3 h-3 text-[#C8A25A] inline-block -mt-0.5 mr-1" />
                                        <span>Expert Tip: {act.tips}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Location and Map Actions */}
                                  <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="inline-flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                                      <MapPin className="w-2.5 h-2.5 text-[#C8A25A]" />
                                      <span>{location}</span>
                                    </span>
                                    <a 
                                      href={mapsUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-white border border-[#D4AF37]/35 px-2.5 py-0.5 rounded-full font-normal transition-all cursor-pointer"
                                    >
                                      <Map className="w-3 h-3 text-[#D4AF37] shrink-0" />
                                      <span>Open Map</span>
                                    </a>
                                  </div>
                                </div>
                                
                                {/* Image Attachment */}
                                {imageUrl && (
                                  <div 
                                    onClick={() => {
                                      const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                      displayPlaceDetail(targetId);
                                    }}
                                    className="w-full md:w-36 h-24 rounded-xl overflow-hidden relative shrink-0 shadow-inner group border border-white/5 cursor-pointer"
                                  >
                                    <img src={imageUrl} alt={act.placeName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <span className="text-[9px] bg-black/80 font-black text-[#D4AF37] px-1.5 py-0.5 rounded">VIEW ARTIFACTS</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={saveGeneratedTripToHub}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md mt-4 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{t.saveTrip}</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* SCREEN 4: HIDDEN ECO GEMS LISTING */}
          {activeTab === 'gems' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5'
              }`}>
                <h2 className="text-xl font-bold tracking-tight text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Preserved Heritage Eco-Gems
                </h2>
                <p className="text-xs opacity-50">Low-footprint biodiverse reserves, ghost ruins, and isolated mountain plateau communities.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {localizedDestinations.filter(item => item.isHiddenGem).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => displayPlaceDetail(item.id)}
                    className={`p-5 rounded-3xl border flex flex-col sm:flex-row gap-5 transition-all transform hover:scale-[1.01] cursor-pointer group ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200/60 shadow-md shadow-amber-900/5 select-none'
                    }`}
                  >
                    <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0 relative">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-emerald-400">ECO POTENTIAL: {item.hiddenGemScore}%</span>
                          <span className="text-[10.5px] opacity-40 font-bold">{item.district} DISTRICT</span>
                        </div>
                        <h3 className="font-extrabold text-base mt-1 group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                        <p className="text-xs opacity-70 leading-relaxed mt-1.5 text-justify">{item.description}</p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-bold mt-2 gap-2">
                        <span className="text-[#D4AF37]">Authenticity Rate: {item.authenticityScore}%</span>
                        <div className="flex gap-1.5">
                          <span className="bg-emerald-900/40 text-[#50C878] border border-[#50C878]/25 text-[9px] px-2.5 py-0.5 rounded">
                            Local Support Score: {item.localImpactScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* SCREEN 5: FESTIVAL TRACKER */}
          {activeTab === 'festivals' && (() => {
            const localizedFestivals = FESTIVALS.map((f) => {
              if (currentLang === 'ta') {
                if (f.id === 'pongal-harvest') {
                  return {
                    ...f,
                    name: 'தைப்பொங்கல் (அறுவடை திருவிழா)',
                    category: 'அறுவடை கொண்டாட்டங்கள்',
                    description: 'சூரிய பகவானுக்கும் உழவுக்கு உற்ற துணையாக விளங்கிய கால்நடைகளுக்கும் நன்றி செலுத்தும் விதமாக தமிழர்களால் கொண்டாடப்படும் முதன்மையான அறுவடைத் திருநாள்.',
                    significance: 'தை மாதப் பிறப்பைக் குறிக்கிறது, "தை பிறந்தால் வழி பிறக்கும்" என்ற முதுமொழிக்கேற்ப வீட்டில் பால் பொங்குவது போல் செல்வம் பொங்கிப் பெருகும் என்பதை அடையாளப்படுத்துகிறது.',
                    date: 'ஜனவரி 14 முதல் ஜனவரி 17 வரை (ஒவ்வொரு ஆண்டும்)',
                    duration: '4 நாட்கள்',
                    district: 'அனைத்து மாவட்டங்களும் (மதுரை, தஞ்சாவூர் மற்றும் அலங்காநல்லூர் கிராமப்புறங்களில் மிகவும் உன்னதமானது)'
                  };
                }
                if (f.id === 'chithirai-madurai') {
                  return {
                    ...f,
                    name: 'சித்திரைத் திருவிழா (மதுரை)',
                    category: 'கோயில் திருவிழாக்கள்',
                    description: 'மதுரை மாநகரையே தெய்வீக மகிழ்ச்சியில் ஒன்றிணைக்கும் ஒரு அற்புதமான, ஒரு மாத கால சித்திரை பிரம்மோற்சவக் கொண்டாட்டம்.',
                    significance: 'மீனாட்சி அம்மன் - சுந்தரேசுவரர் தெய்வீக திருக்கல்யாணம் மற்றும் அழகர் தங்கக் குதிரை வாகனத்தில் வைகை ஆற்றில் இறங்கும் வைபவத்தை மீண்டும் கண்முன்னே நிறுத்துகிறது.',
                    date: 'ஏப்ரல் - மே (தமிழ் சூரிய நாட்காட்டியின்படி)',
                    duration: '15 நாட்கள்',
                    district: 'மதுரை'
                  };
                }
                if (f.id === 'natyanjali-chidambaram') {
                  return {
                    ...f,
                    name: 'நாட்டியாஞ்சலி நடன விழா',
                    category: 'நடனத் திருவிழாக்கள்',
                    description: 'சிதம்பரம் நடராஜர் ஆலயத்தின் கம்பீரமான கல் தூண்களுக்கு நடுவே அரங்கேறும் வருடாந்திர இந்திய பாரம்பரிய நடன விழா.',
                    significance: 'பொன்னம்பலமாகிய சித்சபையில் பிரபஞ்ச நடனக் கடவுளான நடராஜப் பெருமானுக்கு பரதநாட்டியம், கதக், ஒடிசி போன்ற கலைகள் மூலம் கலைஞர்கள் செலுத்தும் நேரடி அஞ்சலி.',
                    date: 'பிப்ரவரி - மார்ச் (மகா சிவராத்திரி இரவு)',
                    duration: '5 நாட்கள்',
                    district: 'சிதம்பரம்'
                  };
                }
              } else if (currentLang === 'hi') {
                if (f.id === 'pongal-harvest') {
                  return {
                    ...f,
                    name: 'थाई पोंगल (फसल उत्सव)',
                    category: 'फसल उत्सव',
                    description: 'सूर्य देव और पशुधन को धन्यवाद देने के लिए तमिल लोगों द्वारा मनाया जाने वाला सबसे प्रमुख फसल उत्सव।',
                    significance: 'शुभ तमिल महीने "थाई" की शुरुआत का प्रतीक है और यह समृद्धि और खुशहाली के प्रतीक के रूप में दूध और चावल के उबाल का प्रतीक है।',
                    date: '14 जनवरी से 17 जनवरी (हर साल)',
                    duration: '4 दिन',
                    district: 'सभी जिले (ग्रामीण मदुरै, तंजावुर और अलंगानेल्लूर में सबसे प्रामाणिक)'
                  };
                }
                if (f.id === 'chithirai-madurai') {
                  return {
                    ...f,
                    name: 'चित्तिरै महोत्सव (मदुरै)',
                    category: 'मंदिर उत्सव',
                    description: 'एक शानदार, महीने भर चलने वाला चित्तिरै ब्रह्मोत्सव जो मदुरै के पूरे मंदिर शहर को दिव्य आनंद में एकजुट करता है।',
                    significance: 'देवी मीनाक्षी के भगवान सुंदरेश्वर के साथ पवित्र लौकिक विवाह और भगवान अलगर के सुनहरे वस्त्रों में पवित्र वैगई नदी को पार करने के दृश्यों को प्रदर्शित करता है।',
                    date: 'अप्रैल - मई (तमिल सौर कैलेंडर के आधार पर)',
                    duration: '15 दिन',
                    district: 'मदुरै'
                  };
                }
                if (f.id === 'natyanjali-chidambaram') {
                  return {
                    ...f,
                    name: 'नाट्यांजलि नृत्य उत्सव',
                    category: 'नृत्य महोत्सव',
                    description: 'चिदंबरम नटराजन मंदिर के राजसी खंभों के भीतर आयोजित एक वार्षिक भारतीय शास्त्रीय नृत्य उत्सव।',
                    significance: 'स्वर्ण-गुंबद वाले मंदिर के भीतर ब्रह्मांडीय नृत्य के देवता - भगवान नटराज को श्रद्धांजलि देने के लिए पूरे भारत के उत्कृष्ट नर्तकों को एक साथ लाता है।',
                    date: 'फरवरी - मार्च (महाशिवरात्रि की रात)',
                    duration: '5 दिन',
                    district: 'चिदंबरम'
                  };
                }
              }
              return f;
            });

            return (
              <div className="space-y-6">
                
                <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md shadow-amber-900/5'
                }`}>
                  <h2 className="text-xl font-bold tracking-tight text-[#D4AF37] flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {t.festivalsTrackerTitle || 'State Grand Festival Tracker'}
                  </h2>
                  <p className="text-xs opacity-50">
                    {t.festivalsTrackerSubtitle || 'Month-wise dynamic religious processions, harvest, and classical stone-stage dances.'}
                  </p>
                </div>

                {/* Festivals timeline list */}
                <div className="space-y-4">
                  {localizedFestivals.map((f) => {
                    const alertMessage = currentLang === 'ta' 
                      ? `${f.name} அட்டவணை ஒருங்கிணைப்புகள் வெற்றிகரமாக உங்கள் நாட்காட்டியில் சேர்க்கப்பட்டது.`
                      : currentLang === 'hi'
                        ? `${f.name} अनुसूची विवरण आपके कैलेंडर में सफलतापूर्वक जोड़ा गया।`
                        : `Added ${f.name} schedule coordinates inside your calendar.`;

                    return (
                      <div key={f.id} className={`p-5 rounded-3xl border space-y-4 ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-150'
                      }`}>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">{f.date} ({f.duration})</span>
                            <h3 className="font-extrabold text-base mt-1">{f.name}</h3>
                            <span className="text-[9px] px-2.5 py-1 text-white/50 bg-black/20 rounded border border-white/5 mt-1.5 inline-block uppercase tracking-wider font-bold">{f.category}</span>
                          </div>

                          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 relative border border-white/5 shadow-md">
                            <img src={f.photos[0]} alt="Festival" className="w-full h-full object-cover" />
                          </div>
                        </div>

                        <p className="text-xs opacity-80 leading-relaxed text-justify">{f.description}</p>

                        <div className={`p-3.5 rounded-2xl space-y-1.5 text-xs ${
                          isDark ? 'bg-black/25 border-white/5' : 'bg-slate-50 border-slate-200/60'
                        }`}>
                          <div className="font-bold text-[#D4AF37]">
                            ⚖️ {t.festivalsSignificanceLabel || 'Cultural Significance & Legend'}
                          </div>
                          <p className="opacity-70 text-[11px] leading-relaxed italic">"{f.significance}"</p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-bold">
                          <span className="opacity-60">{t.festivalsDistrictLabel || 'District location'}: {f.district}</span>
                          <button 
                            onClick={() => {
                              alert(alertMessage);
                            }}
                            className="bg-white/10 hover:bg-white/20 hover:text-white text-inherit/80 py-2 px-4 rounded-xl text-[10px] font-bold border border-white/10 transition-all cursor-pointer"
                          >
                            {t.festivalsAddItinerary || 'Add to Itinerary'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })()}

          {/* SCREEN 6: JOURNAL */}
          {activeTab === 'journal' && (
            <div className="space-y-6">
              
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md shadow-amber-900/5'
              }`}>
                <h2 className="text-xl font-bold tracking-tight text-[#D4AF37] flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Log Travel Heritage Reflections
                </h2>
                <p className="text-xs opacity-50">Log and back up authentic local memories to earn points toward collector badges.</p>

                <form onSubmit={submitJournalMemory} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-white/50 mb-1.5">Where did you visit?</label>
                    <select
                      value={newJournalPlace}
                      onChange={(e) => setNewJournalPlace(e.target.value)}
                      className={`w-full p-3 rounded-2xl outline-none font-bold text-xs ${
                        isDark ? 'bg-black/35 border-white/10 text-white' : 'bg-slate-100 border'
                      }`}
                    >
                      {localizedDestinations.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-black text-white/50 mb-1.5">Simulate photo upload (image url)</label>
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/..." 
                        value={newJournalPhoto}
                        onChange={(e) => setNewJournalPhoto(e.target.value)}
                        className={`w-full p-2.5 rounded-2xl outline-none text-xs ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-black text-white/50 mb-1.5">Rating (1-5)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={newJournalRating}
                        onChange={(e) => setNewJournalRating(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-2xl outline-none font-bold text-center text-xs ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-black text-white/50 mb-1.5">Write your emotion or reflection:</label>
                    <textarea 
                      placeholder="Share elements of regional folklore or local guides that impacted you..."
                      value={newJournalNote}
                      onChange={(e) => setNewJournalNote(e.target.value)}
                      className={`w-full p-3 rounded-2xl outline-none text-xs resize-none ${isDark ? 'bg-black/35 border-white/10' : 'bg-slate-100 border'}`}
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D4AF37] hover:opacity-95 text-[#001F3F] font-black text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/10"
                  >
                    Commit Inscription to Journal
                  </button>
                </form>
              </div>

              {/* Journal list output */}
              <div className="space-y-4">
                {journalMemories.map((m) => (
                  <div key={m.id} className={`p-5 rounded-3xl border space-y-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-black text-[#D4AF37] uppercase">{m.date}</span>
                        <h4 className="font-extrabold text-sm">{m.placeName}</h4>
                      </div>
                      <div className="flex gap-1 text-[#D4AF37]">
                        {Array.from({ length: m.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed italic opacity-85">"{m.note}"</p>

                    {m.photoUrl && (
                      <div className="h-44 rounded-2xl overflow-hidden border border-white/5">
                        <img src={m.photoUrl} alt="Journey memo" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* SCREEN 7: PASSPORT SYSTEM AND LEADERBOARD GAMIFICATION */}
          {activeTab === 'passport' && (
            <div className="space-y-6">
              
              <div className={`p-6 rounded-3xl border text-center space-y-4 backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md shadow-amber-900/5'
              }`}>
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Award className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="text-xl font-black">{t.loginTitle} Passport</h2>
                  <p className="text-xs opacity-50 max-w-sm mx-auto mt-1">Acquire points, verify physical temple checkins, explore hidden spots, and unlock collector status badges.</p>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-black/25 p-4 rounded-2xl max-w-sm mx-auto border border-white/5 text-center text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 block">Total XP</span>
                    <span className="text-lg font-black text-[#D4AF37] block mt-0.5">{userPoints}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 block">Checkins</span>
                    <span className="text-lg font-black text-emerald-400 block mt-0.5">{visitedPlaces.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 block">Badges</span>
                    <span className="text-lg font-black text-blue-400 block mt-0.5">{unlockedBadges.length}</span>
                  </div>
                </div>
              </div>

              {/* Achievements collectible lists */}
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md shadow-amber-900/5'
              }`}>
                <h3 className="text-xs font-black uppercase text-[#D4AF37] tracking-widest mb-4">Historical Exploration Badges</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  {BADGES.map((b) => {
                    const active = unlockedBadges.includes(b.id);
                    return (
                      <div 
                        key={b.id}
                        className={`p-4 rounded-2xl border flex gap-3 items-center transition-all ${
                          active 
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-inherit font-bold' 
                            : 'opacity-50 bg-black/20 border-white/5 font-medium'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                          active ? 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]' : 'bg-white/5 border-white/10 text-white/20'
                        }`}>
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-[#D4AF37] text-[11px]">{b.title}</h4>
                            {active && <span className="text-[8px] bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded font-black tracking-widest">UNLOCKED</span>}
                          </div>
                          <p className="text-[10px] opacity-60 mt-0.5">{b.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Checkins passport controls ledger */}
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md'
              }`}>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] mb-4">Inscribe Verified Check-Ins (Verify Visited Places)</h3>
                
                <div className="space-y-2.5">
                  {localizedDestinations.map((d) => {
                    const checkedIdx = visitedPlaces.includes(d.id);
                    return (
                      <div key={d.id} className="flex justify-between items-center text-xs p-3.5 rounded-2xl bg-black/20 border border-white/5 font-semibold">
                        <div className="flex items-center gap-2.5">
                          <input 
                            type="checkbox" 
                            checked={checkedIdx}
                            onChange={() => toggleCheckedInPlace(d.id)}
                            className="w-4.5 h-4.5 accent-[#D4AF37] rounded cursor-pointer"
                          />
                          <span>{d.name} ({d.district})</span>
                        </div>
                        <span className="text-[#D4AF37] text-[10px] bg-[#D4AF37]/15 px-2 py-0.5 rounded-md font-bold shrink-0">
                          {checkedIdx ? 'VERIFIED ✓' : 'CHECK IN (+150 XP)'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* SCREEN 8: TRIP HUB LISTINGS IN DETAIL */}
          {activeTab === 'mytrips' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200/80 shadow-md shadow-amber-900/5'
              }`}>
                <h2 className="text-xl font-bold tracking-tight text-[#D4AF37]">
                  {t.mytripsTitle || 'Active Custom Route Blueprints'}
                </h2>
                <p className="text-xs opacity-50">
                  {t.mytripsSubtitle || 'Saved travel outlines, dynamically compiled through AI route simulations.'}
                </p>
              </div>

              {savedTrips.map((tr) => {
                const activeDay = selectedTripDay[tr.id] || 1;

                return (
                  <div key={tr.id} className={`p-5 rounded-3xl border space-y-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-150 shadow-sm'}`}>
                    {/* Header info */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <h3 className="font-extrabold text-base">{tr.name}</h3>
                        <span className="text-[10px] opacity-40">
                          {t.mytripsCreated || 'Created'} {tr.createdAt} • {t.mytripsStartingFrom || 'Starting from'} {tr.startingLocation}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setSavedTrips(prev => prev.filter(x => x.id !== tr.id));
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title={t.mytripsDumpTitle || 'Dump itinerary blueprint'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day Selection Nav Pills Row */}
                    <div className="flex flex-wrap items-center gap-1.5 py-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] mr-1">{t.mapSelectDayFilter || 'Select Day filter:'}</span>
                      <button
                        onClick={() => {
                          setSelectedTripDay(prev => ({ ...prev, [tr.id]: -1 }));
                          setSelectedPoint(prev => ({ ...prev, [tr.id]: null }));
                        }}
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wide border cursor-pointer transition-all ${
                          (selectedTripDay[tr.id] === -1)
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-black/20 hover:bg-black/40 text-stone-300 border-white/10 text-white'
                        }`}
                      >
                        {t.mapAllCombinedDays || 'All Combined Days'}
                      </button>
                      {tr.itinerary.map((day) => (
                        <button
                          key={day.day}
                          onClick={() => {
                            setSelectedTripDay(prev => ({ ...prev, [tr.id]: day.day }));
                            setSelectedPoint(prev => ({ ...prev, [tr.id]: null }));
                          }}
                          className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide border cursor-pointer transition-all ${
                            (selectedTripDay[tr.id] === day.day || (!selectedTripDay[tr.id] && day.day === 1))
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-black/20 hover:bg-black/40 text-stone-300 border-white/10 text-white'
                          }`}
                        >
                          {t.dayTitle || 'Day'} {day.day}
                        </button>
                      ))}
                    </div>

                    {/* Highly Polished Interactive Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                      {/* Left: SVG map section */}
                      <div className="lg:col-span-5 h-[450px]">
                        <TripRouteMap
                          isDark={isDark}
                          trip={tr}
                          activeDay={activeDay}
                          selectedPoint={selectedPoint[tr.id] || null}
                          setSelectedPoint={(pt) => setSelectedPoint(prev => ({ ...prev, [tr.id]: pt }))}
                          displayPlaceDetail={displayPlaceDetail}
                          resolveActivityAssets={resolveActivityAssets}
                          t={t}
                          currentLang={currentLang}
                        />
                      </div>

                      {/* Right: Dynamic day timeline list */}
                      <div className="lg:col-span-7 h-[450px] overflow-y-auto pr-1 space-y-4 custom-scrollbar">
                        <div className="relative pl-5 border-l border-[#D4AF37]/35 space-y-4">
                          {tr.itinerary
                            .filter((day) => activeDay === -1 || day.day === activeDay)
                            .map((day) => (
                              <div key={day.day}>
                                <h4 className="text-xs font-black text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/20 inline-block mb-3">
                                  {t.dayTitle} {day.day} • {day.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-2.5 mt-2">
                                  {day.activities.map((act, idx) => {
                                    const { location, imageUrl, mapsUrl, isMatched, matchingId, coordinates } = resolveActivityAssets(act);
                                    const isActSelected = selectedPoint[tr.id]?.act.placeName === act.placeName;

                                    return (
                                      <div 
                                        key={idx} 
                                        onClick={() => setSelectedPoint(prev => ({
                                          ...prev,
                                          [tr.id]: {
                                            act,
                                            index: idx + 1,
                                            dayNum: day.day,
                                            x: 0, // handled dynamically by the SVG projections
                                            y: 0,
                                            details: { location, imageUrl, mapsUrl, isMatched, matchingId, coordinates }
                                          }
                                        }))}
                                        className={`p-4 bg-black/20 border text-xs flex flex-col md:flex-row justify-between gap-4 transition-all duration-300 rounded-xl cursor-pointer ${
                                          isActSelected 
                                            ? 'border-[#50C878] shadow-[0_0_12px_rgba(80,200,120,0.2)] bg-[#50C878]/10' 
                                            : 'border-white/5 hover:border-[#D4AF37]/30 hover:bg-black/35'
                                        }`}
                                      >
                                        <div className="flex-1 space-y-2">
                                          <div className="flex justify-between items-center font-bold">
                                            <h5 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                                displayPlaceDetail(targetId);
                                              }}
                                              className="hover:text-[#D4AF37] hover:underline cursor-pointer transition-colors flex items-center gap-1.5 text-[11.5px]"
                                            >
                                              <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-[9.5px] flex items-center justify-center font-black">
                                                {idx + 1}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                {act.placeName}
                                              </span>
                                            </h5>
                                            <span className="opacity-40">{act.time}</span>
                                          </div>
                                          <p className="opacity-70 leading-relaxed text-[11px]">{act.activityDescription}</p>
                                          
                                          <div className="flex flex-col gap-1 text-[10px] text-[#D4AF37]">
                                            {act.foodSuggestion && (
                                              <span className="flex items-center gap-1">
                                                <Utensils className="w-3 h-3 text-[#D4AF37]" />
                                                <span>{t.mytripsLocalCuisineOption || 'Local Cuisine Option'}: {act.foodSuggestion}</span>
                                              </span>
                                            )}
                                            {act.tips && (
                                              <span className="flex items-center gap-1">
                                                <Info className="w-3 h-3 text-[#D4AF37]" />
                                                <span>{t.mytripsExpertTip || 'Expert Tip'}: {act.tips}</span>
                                              </span>
                                            )}
                                          </div>

                                          {/* Location and Map Actions */}
                                          <div className="flex flex-wrap items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                                            <span className="inline-flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
                                              <MapPin className="w-2.5 h-2.5" />
                                              {location}
                                            </span>
                                            <a 
                                              href={mapsUrl} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 text-white border border-[#D4AF37]/35 px-2 py-0.5 rounded-full font-normal transition-all cursor-pointer"
                                            >
                                              <Map className="w-2.5 h-2.5 text-[#D4AF37]" />
                                              {t.mytripsOpenMapDirections || 'Open Map Directions'}
                                            </a>
                                          </div>
                                        </div>

                                        {/* Image Attachment */}
                                        {imageUrl && (
                                          <div 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const targetId = isMatched ? matchingId : (DESTINATIONS.find(d => d.name.toLowerCase().includes(act.placeName.toLowerCase().split(' ')[0]))?.id || 'meenakshi-madurai');
                                              displayPlaceDetail(targetId);
                                            }}
                                            className="w-full md:w-36 h-24 rounded-xl overflow-hidden relative shrink-0 shadow-inner group border border-white/5 cursor-pointer"
                                          >
                                            <img src={imageUrl} alt={act.placeName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                                            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                              <span className="text-[9px] bg-black/80 font-black text-[#D4AF37] px-1.5 py-0.5 rounded">{t.mytripsViewDetailProfile || 'VIEW DETAIL PROFILE'}</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>

        {/* RIGHT COLUMN: Interactive Status Widgets */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          
          {/* Support Local Economy Metric Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 backdrop-blur-xl">
            <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-widest mb-1">{t.supportLocalTitle}</h3>
            <p className="text-[11px] opacity-75 mb-4 leading-relaxed font-semibold">{t.supportLocalSubtitle}</p>
            
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="opacity-70 text-[10px] uppercase">Traditional Artisans Sponsored</span>
                  <span className="text-[#D4AF37]">12 workshops</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="opacity-70 text-[10px] uppercase font-black">Rural Weaver Allocations</span>
                  <span className="text-emerald-400">18 cooperative leads</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#50C878] h-full w-[70%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* District Guide Add Local Experiences component (Guides Mode) */}
          {selectedRole === 'Local Guide' && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/35 rounded-3xl p-5 backdrop-blur-xl space-y-4 animate-fade-in text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="font-extrabold text-white text-xs uppercase tracking-widest">{t.addLocationTitle}</h3>
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed">{t.addLocationSubtitle}</p>
              
              <form onSubmit={createGuideListing} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="E.g. Swamimalai Bronze Workshop" 
                  value={guideNewName}
                  onChange={(e) => setGuideNewName(e.target.value)}
                  required
                  className={`w-full p-2.5 rounded-xl text-[11px] outline-none border ${isDark ? 'bg-black/35 border-white/10' : 'bg-white border-slate-300'}`}
                />
                
                <input 
                  type="text" 
                  placeholder="Artisan / Handloom specialty" 
                  value={guideNewSpecial}
                  onChange={(e) => setGuideNewSpecial(e.target.value)}
                  required
                  className={`w-full p-2.5 rounded-xl text-[11px] outline-none border ${isDark ? 'bg-black/35 border-white/10' : 'bg-white border-slate-300'}`}
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={guideNewType}
                    onChange={(e) => setGuideNewType(e.target.value)}
                    className="p-2 bg-black/40 border border-white/10 rounded-xl text-[10px]"
                  >
                    <option value="Artisan">Artisan</option>
                    <option value="Handicraft">Handicraft</option>
                    <option value="Traditional Market">Trad Market</option>
                    <option value="Restaurant">Eatery</option>
                  </select>

                  <select
                    value={guideNewDist}
                    onChange={(e) => setGuideNewDist(e.target.value)}
                    className="p-2 bg-black/40 border border-white/10 rounded-xl text-[10px]"
                  >
                    {DISTRICTS.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-emerald-600 text-white font-black rounded-xl text-[10px] uppercase transition-colors hover:bg-emerald-700 cursor-pointer"
                >
                  Confirm Listing
                </button>
              </form>
            </div>
          )}

          {/* Local guide listings output list */}
          <div className="space-y-3 font-semibold text-xs text-inherit">
            <h4 className="text-[10px] uppercase opacity-40 font-black tracking-widest pl-1">Native Handloom & Crafts listed ({guideListings.length})</h4>
            {guideListings.map(lst => (
              <div 
                key={lst.id} 
                className={`p-3.5 rounded-2xl border flex flex-col gap-1 text-[11px] font-medium leading-relaxed ${
                  isDark ? 'bg-black/30 border-white/5 text-white/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-[#D4AF37] font-black">{lst.type}</span>
                  <span className="opacity-45 text-[9px] uppercase font-bold">{lst.district} district</span>
                </div>
                <h5 className="font-extrabold text-[#D4AF37] mt-1.5">{lst.name}</h5>
                <p className="opacity-70 mt-1">{lst.description}</p>
                <span className="text-[10px] opacity-50 italic mt-1.5">Specialty: {lst.specialty}</span>
              </div>
            ))}
          </div>

        </aside>

      </main>

      {/* DETAILED LEDGER SPECS MODAL SHEET (OVERLAY) - DESIGNED AS A BEAUTIFUL FLIPPABLE BOOK OF CHRONICLES */}
      {viewDetailId && selectedDest && (() => {
        return (
          <ManuscriptBook
            viewDetailId={viewDetailId}
            selectedDest={selectedDest}
            currentLang={currentLang}
            theme={currentTheme}
            onClose={() => setViewDetailId(null)}
            reviewComment={reviewComment}
            setReviewComment={setReviewComment}
            reviewRating={reviewRating}
            setReviewRating={setReviewRating}
            reviewTips={reviewTips}
            setReviewTips={setReviewTips}
            submitReview={submitReview}
          />
        );
        // Legacy local function bypassed
        const renderPageContent = (pageNum: number) => {
          switch (pageNum) {
            case 1:
              return (
                <div className="space-y-4 font-serif text-amber-950 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter I: Sanctuary Profile</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 1</span>
                    </div>

                    <div className="h-40 rounded-xl overflow-hidden relative border border-amber-950/15 shadow-md">
                      <img src={selectedDest.imageUrl} alt={selectedDest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
                        <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#D4AF37] bg-black/45 px-1.5 py-0.5 rounded border border-[#D4AF37]/25">
                          {selectedDest.district} {t.detailDistrictLabel || 'DISTRICT'} • {selectedDest.category}
                        </span>
                        <h3 className="text-xs md:text-sm font-black text-white mt-1 uppercase tracking-wide">{selectedDest.name}</h3>
                      </div>
                    </div>

                    <p className="text-[11px] md:text-xs text-amber-950/90 italic leading-relaxed border-l-2 border-[#D4AF37] pl-3">
                      "{selectedDest.description}"
                    </p>
                  </div>

                  <div className="bg-[#eedcaf]/25 p-3 rounded-lg border border-amber-950/10 text-[11px] space-y-2 mt-2">
                    <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[9px] border-b border-amber-950/10 pb-1 flex items-center gap-1">⏱️ {t.timings || 'Travel Ledger & Timings'}</h4>
                    <ul className="space-y-1 font-medium">
                      <li>• {t.detailEntryCosts || 'Entry Costs'}: <span className="font-bold text-amber-950">{selectedDest.entryFees}</span></li>
                      <li>• {t.detailOpeningHours || 'Opening Hours'}: <span className="font-bold text-amber-950">{selectedDest.timings}</span></li>
                      <li>• {t.detailOptimalSeason || 'Optimal Visiting Season'}: <span className="font-bold text-amber-950">{selectedDest.bestSeason}</span></li>
                      <li>• {t.detailBestVisitHours || 'Best Visit Hours'}: <span className="font-bold text-amber-1000">{selectedDest.bestVisitingHours}</span></li>
                    </ul>
                  </div>
                </div>
              );
            case 2:
              return (
                <div className="space-y-4 font-serif text-amber-950 flex flex-col justify-between h-full">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter II: {t.detailDynastyReign || 'Royal Lineage'}</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 2</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                      <div className="bg-[#eedcaf]/15 p-2 rounded border border-amber-950/5">
                        <h4 className="font-bold text-amber-900 uppercase tracking-widest text-[8.5px] flex items-center gap-1"><Award className="w-3 h-3 text-amber-800" /> {t.detailDynastyReign || 'Dynastic Sovereigns'}</h4>
                        <p className="mt-0.5 font-bold text-[#b8860b]">{selectedDest.historyHub.dynasty}</p>
                      </div>

                      <div className="bg-[#eedcaf]/15 p-2 rounded border border-amber-950/5">
                        <h4 className="font-bold text-amber-900 uppercase tracking-widest text-[8.5px] flex items-center gap-1"><Compass className="w-3 h-3 text-amber-800" /> {t.detailArchStyle || 'Architectural Framework'}</h4>
                        <p className="mt-0.5 font-bold text-[#b8860b]">{selectedDest.historyHub.architecture}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] md:text-xs leading-relaxed text-justify">
                      <div className="border-t border-amber-900/10 pt-2">
                        <h4 className="font-black text-amber-950/80 uppercase tracking-wide text-[9px] mb-0.5">{t.detailHistLore || 'Dynastic Chronicles'}</h4>
                        <p className="text-amber-900/95">{selectedDest.historyHub.history}</p>
                      </div>

                      <div className="border-t border-amber-900/10 pt-2">
                        <h4 className="font-black text-amber-950/80 uppercase tracking-wide text-[9px] mb-0.5">{t.detailCelebratedElements || 'Structural Grandeur & Renown'}</h4>
                        <p className="text-amber-900/95">{selectedDest.historyHub.whyFamous}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedDest.historyHub.culturalImportance && (
                    <div className="border-t border-amber-900/10 pt-2 text-[10.5px]">
                      <span className="font-bold block text-amber-900 uppercase tracking-wider text-[8.5px] flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-800" /> {t.detailCulturalDepth || 'Socio-Cultural Legacy'}:</span>
                      <p className="italic text-amber-900/90 mt-0.5 leading-relaxed text-justify">{selectedDest.historyHub.culturalImportance}</p>
                    </div>
                  )}
                </div>
              );
            case 3:
              return (
                <div className="space-y-4 font-serif text-amber-950 h-full flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter III: {t.detailTimelineEvents || 'Era Timeline'}</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 3</span>
                    </div>

                    <p className="text-[10px] text-amber-950/70 italic">{t.detailTimelineEventsDescription || 'A chronicle review of major royal reigns & restoration events at this central site:'}</p>

                    <div className="space-y-3 text-justify">
                      {selectedDest.historyHub.timeline.map((line, idx) => (
                        <div key={idx} className="flex gap-3 items-start pl-3.5 border-l-2 border-amber-700 text-[11px]">
                          <span className="font-extrabold text-amber-800 shrink-0 font-sans">{line.year}</span>
                          <p className="text-amber-950 leading-relaxed font-serif">{line.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            case 4:
              return (
                <div className="space-y-4 font-serif text-amber-950 flex flex-col justify-between h-full">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter IV: {t.detailMythLegend || 'Legends & Lore'}</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 4</span>
                    </div>

                    <div className="space-y-3 text-[11px] text-justify leading-relaxed">
                      <div className="bg-[#eedcaf]/20 p-2.5 rounded-lg border border-amber-950/10">
                        <h4 className="font-extrabold text-amber-900 uppercase text-[8.5px] tracking-wider mb-0.5 flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-800" /> {t.detailMythLegend || 'Sacred Mythology'}</h4>
                        <p className="italic text-amber-900 font-serif leading-relaxed">"{selectedDest.storyMode.legend}"</p>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-amber-900 uppercase text-[8.5px] tracking-wider mb-0.5 flex items-center gap-1"><BookOpen className="w-3 h-3 text-amber-800" /> {t.detailChronicledHist || 'Local Folklore Accounts'}</h4>
                        <p className="text-amber-950/95">{selectedDest.storyMode.historicalStory}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-amber-900/10 pt-2">
                    <h4 className="font-extrabold text-amber-900 mb-1 uppercase text-[8.5px] tracking-wider flex items-center gap-1"><Info className="w-3 h-3 text-amber-800" /> {t.detailLesserKnown || 'Landmark Revelations'}</h4>
                    <ul className="space-y-1 list-disc pl-3 text-[10.5px] text-amber-900/90 font-sans">
                      {selectedDest.storyMode.importantFacts.map((fact, idx) => (
                        <li key={idx} className="leading-snug">{fact}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            case 5:
              return (
                <div className="space-y-4 font-serif text-amber-950 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter V: {t.detailLocalEnterprise || 'Native Guilds'}</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 5</span>
                    </div>

                    <p className="text-[11px] text-amber-950/70 italic text-justify leading-relaxed">{t.detailLocalEnterpriseDescription || 'Supporting central handicraft artists, regional cooperatives, and family operators boosts local livelihoods:'}</p>
                    
                    <div className="space-y-3">
                      {selectedDest.localEconomy.map(biz => (
                        <div key={biz.id} className="p-2.5 bg-[#eedcaf]/15 border border-amber-950/5 rounded-xl space-y-1.5 text-[11px] flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[8.5px] font-sans">
                            <span className="font-extrabold text-amber-800 bg-amber-800/10 px-1.5 py-0.2 rounded uppercase">{biz.type}</span>
                            <span className="text-emerald-700 font-extrabold">{t.detailMultiplierLabel || 'MULTIPLIER'}: {biz.impactScore}%</span>
                          </div>
                          <h4 className="font-black text-amber-950 text-xs">{biz.name}</h4>
                          <p className="text-[10.5px] leading-relaxed text-amber-900/95 text-justify font-serif">{biz.description}</p>
                          <div className="pt-1.5 border-t border-amber-900/5 text-[9px] text-amber-800 font-bold flex justify-between font-sans">
                            <span>{t.famousThings || 'Specialty'}: {biz.specialty}</span>
                            <span>{currentLang === 'ta' ? 'மேலாளர்' : currentLang === 'hi' ? 'प्रबंधक' : 'Manager'}: {biz.owner}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            case 6:
              return (
                <div className="space-y-4 font-serif text-amber-950 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-amber-900/10 pb-1.5">
                      <span className="text-[10px] bg-amber-950/10 text-amber-950 border border-amber-950/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Chapter VI: {t.detailTravelLogs || 'Traveler Echoes'}</span>
                      <span className="text-[11px] font-bold text-amber-950/60 font-sans">p. 6</span>
                    </div>

                    <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1 scrollbar-thin">
                      {selectedDest.reviews.map(rev => (
                        <div key={rev.id} className="bg-[#eedcaf]/10 p-2.5 rounded-lg border border-amber-950/5 space-y-1 text-justify text-[10.5px]">
                          <div className="flex justify-between items-center font-sans">
                            <span className="font-extrabold text-amber-950 flex items-center gap-1"><User className="w-3.5 h-3.5 text-amber-800" /> {rev.user}</span>
                            <span className="text-amber-700 font-extrabold">★ {rev.rating}/5</span>
                          </div>
                          <p className="italic text-amber-900 font-serif">"{rev.comment}"</p>
                          {rev.tips && (
                            <p className="text-[9.5px] bg-amber-100 text-amber-950 p-1 rounded font-sans leading-snug">
                              <strong>{t.practicalTips || 'Advice'}:</strong> {rev.tips}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inscribe travel logs form inside page 6 */}
                  <div className="p-3 bg-[#eedcaf]/20 rounded-xl border border-amber-950/10 space-y-2 text-[10px] text-amber-950 shrink-0">
                    <h4 className="font-extrabold text-amber-950 uppercase text-[8.5px] tracking-wide border-b border-amber-950/10 pb-1 flex items-center justify-between">
                      <span>{t.detailPostLog || 'Inscribe Travel Advices'} (+50 XP)</span>
                      <span className="text-[#a57a14] font-black">★ {t.detailConsciousLedger || 'CONSCIOUS LEDGER'}</span>
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2 font-sans">
                      <div>
                        <span className="text-[8.5px] text-amber-900/70 block font-bold">{t.detailRatingStars || 'Rating (1-5)'}</span>
                        <input 
                          type="number"
                          min="1"
                          max="5"
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full bg-white border border-amber-900/20 rounded px-1.5 py-0.5 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[8.5px] text-amber-900/70 block font-bold">{t.detailBeatCrowdTip || 'Practical Advice'}</span>
                        <input 
                          type="text"
                          placeholder={currentLang === 'ta' ? 'சீக்கிரம் செல்லுங்கள், உடைக்குறிப்பு...' : currentLang === 'hi' ? 'जल्दी जाएं, पोशाक नियम...' : 'Go early, dress code...'}
                          value={reviewTips}
                          onChange={(e) => setReviewTips(e.target.value)}
                          className="w-full bg-white border border-amber-900/20 rounded px-1.5 py-0.5"
                        />
                      </div>
                    </div>

                    <div className="font-sans">
                      <span className="text-[8.5px] text-amber-900/70 block font-bold">{t.detailLogEntryText || 'Chronicle Memory Note'}</span>
                      <textarea 
                        placeholder={currentLang === 'ta' ? 'கட்டிடக்கலை அல்லது கைவினைஞர்கள் பற்றிய குறிப்புகள்...' : currentLang === 'hi' ? 'वास्तुकला या स्थानीय शिल्पकारों के बारे में लिखें...' : 'Inscribe notes on classical architecture or craftsmen guilds...'}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full bg-white border border-amber-900/20 rounded px-1.5 py-0.5"
                        rows={2}
                      />
                    </div>

                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        submitReview();
                      }}
                      className="w-full py-1 bg-amber-950 text-amber-50 font-bold uppercase text-[9px] rounded shadow hover:bg-amber-900 cursor-pointer transition-colors"
                    >
                      {t.detailPostCertified || 'Post Chronicle Entry'}
                    </button>
                  </div>
                </div>
              );
            default:
              return null;
          }
        };

        const handlePrevPage = (e: React.MouseEvent) => {
          e.stopPropagation();
          setBookPage(prev => {
            const step = isMobile ? 1 : 2;
            return Math.max(1, prev - step);
          });
        };

        const handleNextPage = (e: React.MouseEvent) => {
          e.stopPropagation();
          setBookPage(prev => {
            const step = isMobile ? 1 : 2;
            return Math.min(6, prev + step);
          });
        };

        const leftPageNum = bookPage % 2 === 1 ? bookPage : bookPage - 1;
        const rightPageNum = leftPageNum + 1;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            {/* Real medieval leather open book cover */}
            <div className={`bg-[#2a1405] border-8 border-[#170b02] rounded-3xl max-w-5xl w-full my-4 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col h-[92vh] md:h-[84vh] text-amber-950 font-serif`}>
              
              {/* Gold corners decorative protectors */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl pointer-events-none"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br pointer-events-none"></div>

              {/* Royal Ribbon binder header bar */}
              <div className="flex items-center justify-between gap-3 py-3 px-5 bg-[#170b02] text-amber-50 border-b border-amber-950/30 rounded-t-2xl shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] text-[11px] md:text-xs font-black uppercase tracking-widest font-sans flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.detailCodexTitle || 'Codex of Antiquity'}: {selectedDest.name}</span>
                </div>
                <button 
                  onClick={() => setViewDetailId(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#001F3F] text-white flex items-center justify-center transition-all cursor-pointer z-30 font-sans"
                >
                  ✕
                </button>
              </div>

              {/* Classical silk bookmark ribbons selection bar */}
              <div className="flex flex-wrap items-center justify-center gap-1 py-1.5 px-4 bg-[#3d1d07] border-b border-amber-950/40 z-10 shrink-0">
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
                      onClick={() => setBookPage(p.num)}
                      className={`px-2.5 py-1 text-[9px] font-sans font-bold uppercase transition-all rounded flex items-center justify-center gap-1 ${
                        isActive
                          ? 'bg-[#D4AF37] text-amber-950 font-black shadow scale-102 border-b border-amber-900'
                          : 'bg-amber-950/40 text-amber-100/60 hover:text-white hover:bg-amber-950/60'
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>

              {/* Inner book parchment canvas */}
              <div className="flex-1 bg-[#F9F1DC] m-2 pb-3 pt-3 px-3 md:px-7 rounded-xl relative overflow-y-auto scrollbar-thin shadow-inner flex flex-col justify-between">
                
                {/* Pages columns grid */}
                <div className="flex-1 md:grid md:grid-cols-2 md:gap-10 relative min-h-0 pt-1 pb-4">
                  
                  {/* Spine central shadow simulation */}
                  <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 via-black/25 to-black/5 z-20 pointer-events-none transform -translate-x-1/2"></span>

                  {/* LEFT PAGE - on desktop shows left page, on mobile shows activePage */}
                  <div className="flex flex-col justify-between pr-0 md:pr-4 min-h-0 border-b md:border-b-0 md:border-r border-amber-900/10 pb-4 md:pb-0">
                    {renderPageContent(isMobile ? bookPage : leftPageNum)}
                  </div>

                  {/* RIGHT PAGE - hidden on mobile, on desktop shows rightPageNum */}
                  <div className="hidden md:flex flex-col justify-between pl-4 min-h-0">
                    {rightPageNum <= 6 ? renderPageContent(rightPageNum) : (
                      <div className="text-center py-20 text-xs font-serif text-amber-900/40">End of Chronicles</div>
                    )}
                  </div>

                </div>

                {/* Footer book turning coordinates pagination buttons */}
                <div className="border-t border-amber-950/15 pt-2 flex justify-between items-center text-xs font-sans text-amber-900/80 font-bold tracking-wide shrink-0">
                  <button
                    onClick={handlePrevPage}
                    disabled={bookPage <= 1}
                    className="flex items-center gap-1.5 px-3 py-1 rounded border border-amber-950/15 hover:bg-amber-950/5 disabled:opacity-45 transition-all text-[11px] font-sans"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev Page
                  </button>

                  <span className="font-serif italic text-amber-950/70 text-[11px]">
                    {isMobile 
                      ? `Page ${bookPage} of 6`
                      : `Spread ${Math.ceil(leftPageNum / 2)} of 3`}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={isMobile ? bookPage >= 6 : bookPage >= 5}
                    className="flex items-center gap-1.5 px-3 py-1 rounded border border-amber-950/15 hover:bg-amber-950/5 disabled:opacity-45 transition-all text-[11px] font-sans"
                  >
                    Next Page
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* Floating chatbot attachment overlay */}
      <VaigaiChatbot
        currentLang={currentLang}
        theme={currentTheme}
      />

      {/* Footer bar */}
      <footer className={`relative z-10 border-t mt-12 shrink-0 transition-colors ${
        isDark ? 'border-white/10 bg-black/40' : 'border-slate-200/80 bg-slate-100/60'
      }`}>
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold">
          <div className="flex items-center gap-4 text-white/50 uppercase tracking-widest text-[9px]">
            <button 
              onClick={() => setShowSosAlert(true)}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors animate-pulse cursor-pointer font-black"
            >
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block"></span>
              {t.sosButton}
            </button>
            <span className="opacity-30 flex">|</span>
            <span>State Emergency Command Desk: 1800-425-3111</span>
          </div>

          <div className="flex items-center gap-2 text-[#C8A25A] uppercase tracking-wider">
            <span>TAMIRA — Journey Through Living History</span>
            <span className="text-white/40 text-[8.5px] lowercase italic">v3.0 • Verified Live</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
