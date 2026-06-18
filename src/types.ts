export type DestinationCategory =
  | 'Temples'
  | 'Heritage Sites'
  | 'Beaches'
  | 'Waterfalls'
  | 'Hill Stations'
  | 'Wildlife'
  | 'Adventure'
  | 'Museums'
  | 'Food'
  | 'Shopping'
  | 'Photography Spots'
  | 'Cultural Attractions'
  | 'Family Attractions';

export interface TimelineEvent {
  year: string;
  event: string;
}

export interface HistoricalHub {
  history: string;
  whyFamous: string;
  architecture: string;
  dynasty: string;
  culturalImportance: string;
  timeline: TimelineEvent[];
}

export interface StoryMode {
  legend: string;
  historicalStory: string;
  importantFacts: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  tips: string;
  date: string;
  category?: string;
  helpfulCount: number;
}

export interface CrowdIntelligence {
  currentCrowd: 'Low' | 'Medium' | 'High';
  predictedCrowd: { [hour: string]: 'Low' | 'Medium' | 'High' };
  peakHours: string;
  peakDays: string;
  bestTime: string;
  alternativePlaces: string[];
}

export interface PublicServices {
  police: { name: string; contact: string; distance: string };
  hospital: { name: string; contact: string; distance: string };
  pharmacy: { name: string; contact: string; distance: string };
  atm: { name: string; location: string };
  toilets: { status: 'Clean' | 'Average'; location: string };
  fuel: { name: string; distance: string };
  railway: { name: string; distance: string };
  bus: { name: string; distance: string };
}

export interface LocalBusiness {
  id: string;
  name: string;
  type: 'Artisan' | 'Handicraft' | 'Vendor' | 'Restaurant' | 'Traditional Market';
  specialty: string;
  owner: string;
  description: string;
  impactScore: number; // local impact rating scale
  imageUrl?: string;
}

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  description: string;
  district: string;
  rating: number;
  imageUrl: string;
  isHiddenGem: boolean;
  budgetLevel: 'Budget' | 'Moderate' | 'Premium';
  crowdLevel: 'Low' | 'Medium' | 'High';
  accessibility: boolean;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  travelDuration: string;
  travelStyle: 'Cultural' | 'Heritage' | 'Nature' | 'Foodie' | 'Spiritual' | 'Adventure' | 'Family';
  entryFees: string;
  timings: string;
  bestSeason: string;
  bestVisitingHours: string;
  hiddenGemScore?: number; // 0-100
  authenticityScore?: number; // 0-100
  popularityIndex?: number; // 0-100
  localImpactScore?: number; // 0-100
  coordinates: { lat: number; lng: number };
  historyHub: HistoricalHub;
  storyMode: StoryMode;
  reviews: Review[];
  crowdIntelligence: CrowdIntelligence;
  publicServices: PublicServices;
  localEconomy: LocalBusiness[];
}

export interface Festival {
  id: string;
  name: string;
  category: 'Temple Festivals' | 'Cultural Festivals' | 'Music Festivals' | 'Dance Festivals' | 'Food Festivals' | 'Village Festivals' | 'Seasonal Celebrations';
  description: string;
  history: string;
  significance: string;
  schedule: string;
  district: string;
  date: string; // "YYYY-MM-DD" style or Tamil month name
  duration: string;
  photos: string[];
  travelInformation: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    placeName: string;
    activityDescription: string;
    foodSuggestion?: string;
    tips?: string;
    travelTime?: string;
    location?: string;
    imageUrl?: string;
  }[];
}

export interface Trip {
  id: string;
  name: string;
  startingLocation: string;
  budget: 'Budget' | 'Moderate' | 'Premium';
  numberOfDays: number;
  interests: string[];
  travelStyle: string;
  crowdPreference: 'Quiet' | 'Lively' | 'No Preference';
  itinerary: ItineraryDay[];
  savedPlaces: string[]; // Destination IDs
  createdAt: string;
}

export interface JournalMemory {
  id: string;
  photoUrl?: string;
  note: string;
  experience: string;
  rating: number;
  date: string;
  placeId: string;
  placeName: string;
}

export interface DigitalTravelBook {
  tripId: string;
  tripName: string;
  summary: string;
  memories: JournalMemory[];
  badgesEarned: string[];
  placesVisitedCount: number;
  districtsExploredCount: number;
  completedDate: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'Temple Explorer' | 'Heritage Guardian' | 'Festival Enthusiast' | 'Nature Explorer' | 'Food Adventurer' | 'Tamil Nadu Expert';
  icon: string; // Lucide icon name
  unlockedAt?: string;
}

export interface UserStats {
  districtsExplored: string[];
  placesVisited: string[];
  festivalsAttended: string[];
  hiddenGemsFound: string[];
  points: number;
  badges: Badge[];
}

export interface LocalImpactMeter {
  localBusinessesSupported: number;
  artisansSupported: number;
  communityProjectsSupported: number;
}
