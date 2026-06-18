export interface TranslationDictionary {
  appName: string;
  tagline: string;
  loginTitle: string;
  loginSubtitle: string;
  fullName: string;
  emailOrPhone: string;
  chooseInterests: string;
  preferredLanguage: string;
  preferredTheme: string;
  enterSystem: string;
  interestTemples: string;
  interestHeritage: string;
  interestNature: string;
  interestBeaches: string;
  interestHillStations: string;
  interestWildlife: string;
  interestFood: string;
  interestShopping: string;
  interestAdventure: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  myTripTitle: string;
  myTripSubtitle: string;
  activeItinerary: string;
  dayTitle: string;
  activitiesList: string;
  foodSuggestion: string;
  practicalTips: string;
  travelTime: string;
  historicalStories: string;
  historicalStoriesSubtitle: string;
  famousThings: string;
  famousPlaces: string;
  recommendedForYou: string;
  recommendedForYouSubtitle: string;
  currentFestivals: string;
  runningNow: string;
  emergencyTitle: string;
  emergencySubtitle: string;
  sosButton: string;
  sosAlertTitle: string;
  sosAlertSubtitle: string;
  closeSos: string;
  tourPlannerButton: string;
  tourPlannerTitle: string;
  tourPlannerSubtitle: string;
  aiChatbotTitle: string;
  askChatbot: string;
  presetsTitle: string;
  addLocationTitle: string;
  addLocationSubtitle: string;
  badgeLevel: string;
  points: string;
  verifiedCheckins: string;
  badges: string;
  guideMode: string;
  touristMode: string;
  authorityMode: string;
  themeDark: string;
  themeLight: string;
  logoutButton: string;
  viewDetails: string;
  bestVisitingHours: string;
  bestSeason: string;
  timings: string;
  entryFees: string;
  saveTrip: string;
  generatingPlan: string;
  supportLocalTitle: string;
  supportLocalSubtitle: string;
  pointsLeaderboard: string;

  // New keys for complete application translation
  tabDashboard: string;
  tabDiscover: string;
  tabEcoGems: string;
  tabFestivals: string;
  tabJournal: string;
  tabPassport: string;
  tabMyTrips: string;
  intelMapTitle: string;
  intelMapSubtitle: string;
  phoneStateTourist: string;
  phonePoliceDispatch: string;
  phoneMedicalAmbulance: string;
  telemetryActive: string;
  mapInteractiveTitle: string;
  mapInteractivePath: string;
  mapActiveWaypoint: string;
  mapOpenChronicles: string;
  mapDirections: string;
  mapStep: string;
  mapVisitHour: string;
  mapSelectDayFilter: string;
  mapAllCombinedDays: string;
  mapProjectionsScale: string;
  routeChartOffline: string;
  noActiveTravelEvents: string;
  detailDistrictLabel: string;
  detailEntryCosts: string;
  detailOpeningHours: string;
  detailOptimalSeason: string;
  detailBestVisitHours: string;
  detailCodexTitle: string;
  detailDynastyReign: string;
  detailArchStyle: string;
  detailHistLore: string;
  detailCelebratedElements: string;
  detailCulturalDepth: string;
  detailTimelineEvents: string;
  detailMythLegend: string;
  detailChronicledHist: string;
  detailLesserKnown: string;
  detailLocalEnterprise: string;
  detailTravelLogs: string;
  detailPostLog: string;
  detailRatingStars: string;
  detailBeatCrowdTip: string;
  detailLogEntryText: string;
  detailPostCertified: string;

  // My Trips & Festivals translations keys
  mytripsTitle: string;
  mytripsSubtitle: string;
  mytripsCreated: string;
  mytripsStartingFrom: string;
  mytripsDumpTitle: string;
  mytripsLocalCuisineOption: string;
  mytripsExpertTip: string;
  mytripsOpenMapDirections: string;
  mytripsViewDetailProfile: string;
  festivalsTrackerTitle: string;
  festivalsTrackerSubtitle: string;
  festivalsSignificanceLabel: string;
  festivalsDistrictLabel: string;
  festivalsAddItinerary: string;
  detailTimelineEventsDescription: string;
  detailLocalEnterpriseDescription: string;
  detailMultiplierLabel: string;
  detailConsciousLedger: string;

  // Search Explore translation keys
  exploreSearchPlaceholder: string;
  exploreCategoryLabel: string;
  exploreDistrictLabel: string;
  exploreBudgetLabel: string;
  exploreRegionLabel: string;
  exploreSearchButton: string;
  exploreResetButton: string;
  exploreResultsFound: string;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    appName: "TAMIRA",
    tagline: "Journey Through Living History",
    loginTitle: "TAMIRA",
    loginSubtitle: "An immersive digital gateway to Tamil Nadu's ancient civilization, dynamic cartography, and living stories.",
    fullName: "Full Name",
    emailOrPhone: "Email address or Mobile Number",
    chooseInterests: "Select Your Travel Interests",
    preferredLanguage: "Interface Language",
    preferredTheme: "Visual Interface Theme",
    enterSystem: "Securely Authenticate & Launch System",
    interestTemples: "Temples & Spiritual Shrines",
    interestHeritage: "UNESCO & Dynastic Heritage",
    interestNature: "Ecosystem Mangroves & Nature Reserves",
    interestBeaches: "Coastal Shore & Sunrises",
    interestHillStations: "Misty Mountain plateaus",
    interestWildlife: "Tiger & Elephant Sanctuaries",
    interestFood: "Traditional Chettinad & Local Eateries",
    interestShopping: "Handloom Silks & Metal Artisans",
    interestAdventure: "Western Ghats Hiking & Trails",
    dashboardTitle: "TAMIRA Control Gateway",
    dashboardSubtitle: "Your immersive operating hub for Tamil civilization — where history, geography, and storytelling converge.",
    myTripTitle: "My Trip Timeline",
    myTripSubtitle: "Active live route, dynamically simulated through your premium checkpoints.",
    activeItinerary: "Active Itinerary Planner",
    dayTitle: "Day",
    activitiesList: "Curated Historic Milestones",
    foodSuggestion: "Suggested Traditional Gastronomy",
    practicalTips: "Dravidian Heritage Insights & Beat-Crowd Tips",
    travelTime: "Travel Duration",
    historicalStories: "Historical Trip Stories",
    historicalStoriesSubtitle: "Sacred chronicled lore from Pandya, Chola, and Pallava dynasties.",
    famousThings: "Famous Native Elements",
    famousPlaces: "Famous Places to Explore",
    recommendedForYou: "Recommended Destinations Based on Interests",
    recommendedForYouSubtitle: "Smarter curation matching your selected priority focus filters.",
    currentFestivals: "Current Regional Festivals",
    runningNow: "RUNNING NOW IN CHOSEN AREA",
    emergencyTitle: "Emergency Support Contacts",
    emergencySubtitle: "Immediate state-police dispatch, tourist support desk, and medical ambulance triggers.",
    sosButton: "SOS DISTRESS ALARM",
    sosAlertTitle: "TAMIRA Emergency SOS Coordinates Locked",
    sosAlertSubtitle: "Immediate safety measures are ready to dispatch. Your location telemetry, medical record summary, and active support routes are being transmitted to the state center.",
    closeSos: "Cancel Distress Transmission",
    tourPlannerButton: "Launch AI Tour Planner",
    tourPlannerTitle: "Dynamic AI Route Architect",
    tourPlannerSubtitle: "Generate highly modular native itineraries based on your budget, starting city, and exact interests.",
    aiChatbotTitle: "Assistant: Vaigai",
    askChatbot: "Ask Vaigai about Tamil Nadu dynasties or hidden waterfalls...",
    presetsTitle: "Curated Inquiries",
    addLocationTitle: "Add Local Handloom / Artisan Hubs",
    addLocationSubtitle: "Contribute certified family workshops or native cooperatives to help tourists support local livelihoods.",
    badgeLevel: "Explore Badge",
    points: "Points Tracker",
    verifiedCheckins: "Checkins",
    badges: "Badges Earned",
    guideMode: "Local Guide",
    touristMode: "Tourist",
    authorityMode: "Authority View",
    themeDark: "Cosmic Twilight Dark",
    themeLight: "Ceramic Sand Light",
    logoutButton: "Exit Account",
    viewDetails: "Inscribe Detailed Ledger",
    bestVisitingHours: "Prime Hours",
    bestSeason: "Optimal Season",
    timings: "Open Timings",
    entryFees: "Entry Cost",
    saveTrip: "Save Generated Route to Hub (Earn +100 XP)",
    generatingPlan: "Architecting ancient trails...",
    supportLocalTitle: "Local Livelihood Impact Meter",
    supportLocalSubtitle: "Your real-time support score towards native artisans and traditional craft weavers.",
    pointsLeaderboard: "State Explorers Leaderboard",

    // New keys implementation
    tabDashboard: "Dashboard",
    tabDiscover: "Discover",
    tabEcoGems: "Eco-Gems",
    tabFestivals: "Festivals",
    tabJournal: "Journal",
    tabPassport: "Passport",
    tabMyTrips: "My Trip Timeline",
    intelMapTitle: "Smart Intel Map",
    intelMapSubtitle: "Click dynamic node pins to reload travel filters immediately:",
    phoneStateTourist: "State Tourist Hub",
    phonePoliceDispatch: "Police Dispatch",
    phoneMedicalAmbulance: "Medical Ambulance",
    telemetryActive: "Telemetry channel active via satellite corridors",
    mapInteractiveTitle: "Interactive Route Chart",
    mapInteractivePath: "Planned Pilgrimage Route",
    mapActiveWaypoint: "Active Waypoint details",
    mapOpenChronicles: "Explore Chronicles",
    mapDirections: "Directions",
    mapStep: "Step",
    mapVisitHour: "Visit Hour:",
    mapSelectDayFilter: "Select Day filter:",
    mapAllCombinedDays: "All Combined Days",
    mapProjectionsScale: "Projections: Mercator Scale",
    routeChartOffline: "Route Chart Offline",
    noActiveTravelEvents: "No active travel events logged for this selected day filter.",
    detailDistrictLabel: "DISTRICT",
    detailEntryCosts: "Entry Costs",
    detailOpeningHours: "Opening Hours",
    detailOptimalSeason: "Optimal Visiting Season",
    detailBestVisitHours: "Best Visit Hours",
    detailCodexTitle: "TAMIRA Chronicle Ledger",
    detailDynastyReign: "Dynasty Reign",
    detailArchStyle: "Architecture style",
    detailHistLore: "Historical lore",
    detailCelebratedElements: "Celebrated elements",
    detailCulturalDepth: "Cultural depth",
    detailTimelineEvents: "Timeline Chronological events",
    detailMythLegend: "Mythological Legend",
    detailChronicledHist: "Chronicled History",
    detailLesserKnown: "Lesser-Known facts",
    detailLocalEnterprise: "Local Heritage Enterprises & Artisans",
    detailTravelLogs: "Traveler Logs & Check-ins",
    detailPostLog: "Post a verified travel log",
    detailRatingStars: "Rating stars",
    detailBeatCrowdTip: "Beat-crowd practical tip",
    detailLogEntryText: "Log Entry text",
    detailPostCertified: "Post Certified Log",

    // My Trips & Festivals translations keys
    mytripsTitle: "Active Custom Route Blueprints",
    mytripsSubtitle: "Saved travel outlines, dynamically compiled through AI route simulations.",
    mytripsCreated: "Created",
    mytripsStartingFrom: "Starting from",
    mytripsDumpTitle: "Dump itinerary blueprint",
    mytripsLocalCuisineOption: "Local Cuisine Option",
    mytripsExpertTip: "Expert Tip",
    mytripsOpenMapDirections: "Open Map Directions",
    mytripsViewDetailProfile: "VIEW DETAIL PROFILE",
    festivalsTrackerTitle: "State Grand Festival Tracker",
    festivalsTrackerSubtitle: "Month-wise dynamic religious processions, harvest, and classical stone-stage dances.",
    festivalsSignificanceLabel: "Cultural Significance & Legend",
    festivalsDistrictLabel: "District location",
    festivalsAddItinerary: "Add to Itinerary",
    detailTimelineEventsDescription: "A chronicle review of major royal reigns & restoration events at this central site:",
    detailLocalEnterpriseDescription: "Supporting central handicraft artists, regional cooperatives, and family operators boosts local livelihoods",
    detailMultiplierLabel: "MULTIPLIER",
    detailConsciousLedger: "CONSCIOUS LEDGER",

    // Search Explore translation values
    exploreSearchPlaceholder: "Search temples, Dynastic relics, regions...",
    exploreCategoryLabel: "Category",
    exploreDistrictLabel: "District",
    exploreBudgetLabel: "Budget",
    exploreRegionLabel: "Region",
    exploreSearchButton: "Search Destinations",
    exploreResetButton: "Reset Filters",
    exploreResultsFound: "results match your search criteria"
  },
  ta: {
    appName: "தமிரா (TAMIRA)",
    tagline: "வாழ்ந்துகொண்டிருக்கும் வரலாற்றினூடே ஒரு பயணம்",
    loginTitle: "தமிரா (TAMIRA)",
    loginSubtitle: "தமிழ்ப் நாகரிகம், மாறும் கண்டுபிடிப்புகள் மற்றும் வரலாற்றுப் பதிவுகளுக்கான ஒரு நுழைவாயில்.",
    fullName: "முழு பெயர்",
    emailOrPhone: "மின்னஞ்சல் அல்லது அலைபேசி எண்",
    chooseInterests: "உங்கள் சுற்றுலா ஆர்வங்களைத் தேர்ந்தெடுக்கவும்",
    preferredLanguage: "அடைவு மொழி",
    preferredTheme: "காட்சி தீம்",
    enterSystem: "பாதுகாப்பாக அங்கீகரித்து கணினியை இயக்கவும்",
    interestTemples: "கோயில்கள் மற்றும் ஆன்மீகத்தலங்கள்",
    interestHeritage: "யுனெஸ்கோ மற்றும் வரலாற்று பாரம்பரியம்",
    interestNature: "சுற்றுச்சூழல் மற்றும் இயற்கை வளங்கள்",
    interestBeaches: "கடற்கரை மற்றும் சூரிய உதயம்",
    interestHillStations: "பனிமூட்ட மலைப் பகுதிகள்",
    interestWildlife: "புலிகள் மற்றும் யானைகள் சரணாலயங்கள்",
    interestFood: "பாரம்பரிய செட்டிநாடு மற்றும் உள்ளூர் உணவுகள்",
    interestShopping: "கைத்தறி பட்டு மற்றும் உலோக கைவினைஞர்கள்",
    interestAdventure: "மேற்கு தொடர்ச்சி மலை மலையேற்றம்",
    dashboardTitle: "தமிரா (TAMIRA) நுழைவாயில்",
    dashboardSubtitle: "தமிழ்ப் நாகரிகத்தின் நுழைவாயில் - வரலாறு, புவியியல் மற்றும் கதைசொல்லல் ஆகியவை இணையும் இடம்.",
    myTripTitle: "எனது பயண காலவரிசை",
    myTripSubtitle: "சுறுசுறுப்பான நேரடி வழித்தடம், உங்கள் சான்றளிக்கப்பட்ட சோதனைச் சாவடிகள் மூலம் மாறும் வகையில் உருவகப்படுத்தப்பட்டுள்ளது.",
    activeItinerary: "செயலில் உள்ள பயணத் திட்டமிடுபவர்",
    dayTitle: "நாள்",
    activitiesList: "க்யூரேட்டட் வரலாற்று மைல்கற்கள்",
    foodSuggestion: "பரிந்துரைக்கப்பட்ட பாரம்பரிய உணவுமுறை",
    practicalTips: "திராவிட பாரம்பரிய நுண்ணறிவு மற்றும் கூட்டத்தை தவிர்க்கும் குறிப்புகள்",
    travelTime: "பயண நேரம்",
    historicalStories: "வரலாற்றுப் பயணக் கதைகள்",
    historicalStoriesSubtitle: "பாண்டிய, சோழ, பல்லவ வம்சங்களின் புனிதமான வரலாற்று இதிகாசங்கள்.",
    famousThings: "பிரசித்தி பெற்ற பூர்வீக பொருட்கள்",
    famousPlaces: "ஆராய வேண்டிய பிரபலமான இடங்கள்",
    recommendedForYou: "உங்கள் ஆர்வங்களின் அடிப்படையிலான பரிந்துரைகள்",
    recommendedForYouSubtitle: "நீங்கள் தேர்ந்தெடுத்த முன்னுரிமை வடிப்பான்களுடன் பொருந்தக்கூடிய சிறந்த க்யூரேஷன்.",
    currentFestivals: "தற்போதைய பிராந்திய திருவிழாக்கள்",
    runningNow: "தேர்ந்தெடுக்கப்பட்ட பகுதியில் தற்போது நடைபெறுகிறது",
    emergencyTitle: "அவசரகால உதவி எண்கள்",
    emergencySubtitle: "உடனடி மாநில காவல்துறை அனுப்புதல், சுற்றுலா உதவி மையம் மற்றும் மருத்துவ ஆம்புலன்ஸ் தூண்டுதல்கள்.",
    sosButton: "அவசர ஆபத்து எச்சரிக்கை",
    sosAlertTitle: "டி.என்.எஸ்.டி.என் அவசர SOS ஆயத்தொலைவுகள் பூட்டப்பட்டன",
    sosAlertSubtitle: "உடனடி பாதுகாப்பு நடவடிக்கைகள் அனுப்ப தயாராக உள்ளன. உங்கள் இருப்பிட டெலிமெட்ரி, மருத்துவப் பதிவு சுருக்கம் மற்றும் செயலில் உள்ள ஆதரவு வழிகள் மாநில மையத்திற்கு அனுப்பப்படுகின்றன.",
    closeSos: "அவசர அறிவிப்பை ரத்துசெய்",
    tourPlannerButton: "AI பயணத் திட்டமிடுபவரைத் தொடங்கு",
    tourPlannerTitle: "மாறும் AI வழித்தட வடிவமைப்பாளர்",
    tourPlannerSubtitle: "உங்கள் வரவுசெலவுத் திட்டம், தொடங்கும் நகரம் மற்றும் துல்லியமான ஆர்வங்களின் அடிப்படையில் பயணத்திட்டத்தை உருவாக்கவும்.",
    aiChatbotTitle: "உதவியாளர்: வைகை",
    askChatbot: "தமிழ்நாட்டு வம்சங்கள் அல்லது மறைக்கப்பட்ட நீர்வீழ்ச்சிகள் பற்றி வைகையிடம் கேளுங்கள்...",
    presetsTitle: "பொதுவான கேள்விகள்",
    addLocationTitle: "உள்ளூர் கைத்தறி / கைவினைஞர்கள் மையங்களைச் சேர்க்கவும்",
    addLocationSubtitle: "சுற்றுலாப் பயணிகள் உள்ளூர் வாழ்வாதாரங்களை ஆதரிக்க சான்றளிக்கப்பட்ட பட்டறைகள் அல்லது கூட்டுறவுக் குழுக்களைப் பகிர்ந்து பங்களிக்கவும்.",
    badgeLevel: "சுற்றுலா பேட்ஜ்",
    points: "புள்ளிகள் கண்காணிப்பாளர்",
    verifiedCheckins: "சரிபார்க்கப்பட்ட வருகைகள்",
    badges: "பெற்ற பேட்ஜ்கள்",
    guideMode: "உள்ளூர் வழிகாட்டி",
    touristMode: "சுற்றுலாப் பயணி",
    authorityMode: "அதிகாரபூர்வ பார்வை",
    themeDark: "இருண்ட வானம்",
    themeLight: "வெண் மணல் வெளிச்சம்",
    logoutButton: "கணக்கிலிருந்து வெளியேறு",
    viewDetails: "விரிவான பதிவைப் பார்க்கவும்",
    bestVisitingHours: "சிறந்த பார்வையிடும் நேரம்",
    bestSeason: "பரிந்துரைக்கப்படும் பருவம்",
    timings: "திறக்கும் நேரம்",
    entryFees: "நுழைவு கட்டணம்",
    saveTrip: "வழியைச் சேமிக்கவும் (பெறுங்கள் +100 XP)",
    generatingPlan: "பழங்கால தடங்களை வடிவமைக்கிறது...",
    supportLocalTitle: "உள்ளூர் வாழ்வாதார தாக்க காட்டி",
    supportLocalSubtitle: "உள்ளூர் கைவினைஞர்கள் மற்றும் பாரம்பரிய கைத்தறி நெசவாளர்களை நீங்கள் ஆதரிக்கும் நிகழ்நேர மதிப்பெண்.",
    pointsLeaderboard: "மாநில ஆய்வாளர்கள் லீடர்போர்டு",

    // New keys implementation translated to Tamil
    tabDashboard: "கட்டுப்பாட்டு பலகை",
    tabDiscover: "கண்டறிதல்",
    tabEcoGems: "சுற்றுச்சூழல் இடங்கள்",
    tabFestivals: "திருவிழாக்கள்",
    tabJournal: "பயணக் குறிப்பேடு",
    tabPassport: "கடவுச்சீட்டு",
    tabMyTrips: "எனது பயண காலவரிசை",
    intelMapTitle: "ஸ்மார்ட் விவேக வரைபடம்",
    intelMapSubtitle: "நாடி முனைகளை அழுத்தி வடிப்பான்களை உடனடியாக ஏற்றவும்:",
    phoneStateTourist: "மாநில சுற்றுலா மையம்",
    phonePoliceDispatch: "காவல்துறை அனுப்புதல்",
    phoneMedicalAmbulance: "மருத்துவ ஆம்புலன்ஸ்",
    telemetryActive: "செயற்கைக்கோள் வழியாக டெலிமெட்ரி செயலில் உள்ளது",
    mapInteractiveTitle: "ஊடாடும் வழி வரைபடம்",
    mapInteractivePath: "திட்டமிடப்பட்ட புனித யாத்திரை வழித்தடம்",
    mapActiveWaypoint: "செயலில் உள்ள வழித்தட விவரங்கள்",
    mapOpenChronicles: "வரலாற்றை ஆராய்",
    mapDirections: "வழிசெலுத்தல்",
    mapStep: "படி",
    mapVisitHour: "பார்வையிடும் நேரம்:",
    mapSelectDayFilter: "நாளுக்கான வடிகட்டி:",
    mapAllCombinedDays: "அனைத்து நாட்களும்",
    mapProjectionsScale: "அளவு: மெர்கேட்டர் அளவுகோல்",
    routeChartOffline: "வழித்தடம் ஆஃப்லைனில் உள்ளது",
    noActiveTravelEvents: "தேர்ந்தெடுக்கப்பட்ட நாளில் செயலில் பயண நிகழ்வுகள் எதுவும் இல்லை.",
    detailDistrictLabel: "மாவட்டம்",
    detailEntryCosts: "நுழைவுக் கட்டணம்",
    detailOpeningHours: "திறக்கும் நேரம்",
    detailOptimalSeason: "சிறந்த பார்வையிடும் பருவம்",
    detailBestVisitHours: "சிறந்த நேரங்கள்",
    detailCodexTitle: "தமிரா வரலாற்று ஏடு",
    detailDynastyReign: "ஆட்சி செய்த வம்சம்",
    detailArchStyle: "கட்டடக்கலை பாணி",
    detailHistLore: "வரலாற்று இதிகாசம்",
    detailCelebratedElements: "பிரபலமான கூறுகள்",
    detailCulturalDepth: "சமூக-பண்பாட்டு ஆழம்",
    detailTimelineEvents: "காலவரிசை வரலாற்று நிகழ்வுகள்",
    detailMythLegend: "தொன்மக் கதை மற்றும் புராணம்",
    detailChronicledHist: "வரலாற்றுப் பதிவு",
    detailLesserKnown: "அரிய உண்மைகள்",
    detailLocalEnterprise: "உள்ளூர் பாரம்பரிய நிறுவனங்கள் & கைவினைஞர்கள்",
    detailTravelLogs: "பயணிகளின் பதிவுகள் & வருகைகள்",
    detailPostLog: "சரிபார்க்கப்பட்ட பயணப் பதிவை எழுது",
    detailRatingStars: "மதிப்பீட்டு நட்சத்திரங்கள்",
    detailBeatCrowdTip: "கூட்டத்தைத் தவிர்க்கும் நடைமுறை குறிப்பு",
    detailLogEntryText: "பதிவு உரை விவரம்",
    detailPostCertified: "சான்றளிக்கப்பட்ட பதிவை வெளியிடு",

    // My Trips & Festivals translations keys
    mytripsTitle: "செயலில் உள்ள தனிப்பயன் வரைபடங்கள்",
    mytripsSubtitle: "சேமிக்கப்பட்ட பயனுள்ள பயண காலவரிசைகள் மற்றும் AI தடம்சார் உருவகப்படுத்துதல்கள்.",
    mytripsCreated: "உருவாக்கப்பட்டது",
    mytripsStartingFrom: "தொடக்க இடம்",
    mytripsDumpTitle: "பயணத் திட்டத்தை நீக்கு",
    mytripsLocalCuisineOption: "உள்ளூர் உன்னத உணவுகள்",
    mytripsExpertTip: "நிபுணரின் அரிய குறிப்பு",
    mytripsOpenMapDirections: "வரைபடத்தில் வழியைக் காட்டு",
    mytripsViewDetailProfile: "விபரங்களை விரிவாகக் காண்",
    festivalsTrackerTitle: "மாநில பெரும் விழாக்கள் கண்காணிப்பாளர்",
    festivalsTrackerSubtitle: "மாதாந்திர கோயில் திருவிழாக்கள், அறுவடை கொண்டாட்டங்கள் மற்றும் பாரம்பரிய நடன நிகழ்ச்சிகள்.",
    festivalsSignificanceLabel: "பண்பாட்டு முக்கியத்துவம் & இதிகாசம்",
    festivalsDistrictLabel: "மாவட்டம்",
    festivalsAddItinerary: "பயணத் திட்டத்தில் சேர்",
    detailTimelineEventsDescription: "இந்த பிரதான தடத்தில் நிகழ்ந்த பெரிய மன்னர்களின் ஆட்சி மற்றும் புனரமைப்புகளின் காலவரிசை ஆய்வு:",
    detailLocalEnterpriseDescription: "உள்ளூர் கைவினை கலைஞர்கள், கூட்டுறவு சங்கங்கள் மற்றும் சிறு வணிகர்களுக்கு ஆதரவளிப்பது வாழ்வாதாரத்தை உயர்த்தும்",
    detailMultiplierLabel: "பெருக்கி",
    detailConsciousLedger: "விழிப்புணர்வு கணக்கு",

    // Search Explore translation values
    exploreSearchPlaceholder: "கோயில்கள், வம்சாவளி சின்னங்கள், பகுதிகளைத் தேடுங்கள்...",
    exploreCategoryLabel: "வகை",
    exploreDistrictLabel: "மாவட்டம்",
    exploreBudgetLabel: "பட்ஜெட்",
    exploreRegionLabel: "மண்டலம்",
    exploreSearchButton: "இடங்களைத் தேடுங்கள்",
    exploreResetButton: "வடிப்பான்களை மீட்டமை",
    exploreResultsFound: "இடங்கள் உங்கள் தேடல் அளவுகோல்களுடன் பொருந்துகின்றன"
  },
  hi: {
    appName: "तमिरा (TAMIRA)",
    tagline: "जीवंत इतिहास के माध्यम से यात्रा",
    loginTitle: "तमिरा (TAMIRA)",
    loginSubtitle: "तमिल सभ्यता, गतिशील खोज और ऐतिहासिक इतिहास के लिए एक व्यापक प्रवेश द्वार।",
    fullName: "पूरा नाम",
    emailOrPhone: "ईमेल पता या मोबाइल नंबर",
    chooseInterests: "अपनी यात्रा रुचियों का चयन करें",
    preferredLanguage: "इंटरफ़ेस भाषा",
    preferredTheme: "विज़ुअल इंटरफ़ेस थीम",
    enterSystem: "सुरक्षित रूप से प्रमाणित करें और सिस्टम लॉन्च करें",
    interestTemples: "मंदिर और आध्यात्मिक तीर्थस्थल",
    interestHeritage: "यूनेस्को और राजवंश विरासत",
    interestNature: "पारिस्थितिकी तंत्र मैंग्रोव और प्रकृति भंडार",
    interestBeaches: "तटीय तट और सूर्योदय",
    interestHillStations: "धुंधले पहाड़ी पठार",
    interestWildlife: "बाघ और हाथी अभयारण्य",
    interestFood: "पारंपरिक चेटिनाड और स्थानीय भोजनालय",
    interestShopping: "हथकरघा सिल्क और धातु शिल्पकार",
    interestAdventure: "पश्चिमी घाट लंबी पैदल यात्रा और ट्रेल्स",
    dashboardTitle: "तमिरा (TAMIRA) गेटवे",
    dashboardSubtitle: "तमिल सभ्यता के लिए आपका विज़ुअल कमान केंद्र - जहाँ इतिहास, भूगोल और कहानी कहने का संगम होता है।",
    myTripTitle: "मेरी यात्रा समयरेखा",
    myTripSubtitle: "सक्रिय लाइव मार्ग, आपके प्रीमियम चौकियों के माध्यम से गतिशील रूप से सिम्युलेटेड।",
    activeItinerary: "सक्रिय यात्रा कार्यक्रम योजनाकार",
    dayTitle: "दिन",
    activitiesList: "क्यूरेटेड ऐतिहासिक मील के पत्थर",
    foodSuggestion: "सुझाया गया पारंपरिक खान-पान",
    practicalTips: "द्रविड़ विरासत अंतर्दृष्टि और भीड़-बचाव युक्तियाँ",
    travelTime: "यात्रा अवधि",
    historicalStories: "ऐतिहासिक यात्रा कहानियाँ",
    historicalStoriesSubtitle: "पांड्य, चोल और पल्लव राजवंशों की पवित्र ऐतिहासिक गाथाएँ।",
    famousThings: "प्रसिद्ध स्थानीय वस्तुएं",
    famousPlaces: "खोजने के लिए प्रसिद्ध स्थान",
    recommendedForYou: "रुचियों के आधार पर अनुशंसित गंतव्य",
    recommendedForYouSubtitle: "आपके चयनित प्राथमिकता फोकस फिल्टर से मेल खाने वाला स्मार्ट क्यूरेशन।",
    currentFestivals: "वर्तमान क्षेत्रीय त्योहार",
    runningNow: "चयनित क्षेत्र में अभी चल रहा है",
    emergencyTitle: "आपातकालीन सहायता संपर्क",
    emergencySubtitle: "तत्काल राज्य-पुलिस प्रेषण, पर्यटक सहायता डेस्क और मेडिकल एम्बुलेंस ट्रिगर।",
    sosButton: "आपातकालीन डिस्ट्रेस अलार्म",
    sosAlertTitle: "टीएनएसटीएन आपातकालीन संकट समन्वयक बंद",
    sosAlertSubtitle: "तत्काल सुरक्षा उपाय प्रेषण के लिए तैयार हैं। आपका स्थान टेलीमेट्री, मेडिकल रिकॉर्ड सारांश, और सक्रिय सहायता मार्ग राज्य केंद्र को प्रेषित किए जा रहे हैं।",
    closeSos: "डिस्ट्रेस ट्रांसमिशन रद्द करें",
    tourPlannerButton: "एआई टूर प्लानर शुरू करें",
    tourPlannerTitle: "गतिशील एआई रूट आर्किटेक्चर",
    tourPlannerSubtitle: "अपने बजट, शुरुआती शहर और सटीक रुचियों के आधार पर अत्यधिक मॉड्यूलर स्थानीय यात्रा कार्यक्रम उत्पन्न करें।",
    aiChatbotTitle: "सहायक: वैगई",
    askChatbot: "तमिलनाडु राजवंशों या छिपे हुए झरनों के बारे में वैगई से पूछें...",
    presetsTitle: "अक्सर पूछे जाने वाले प्रश्न",
    addLocationTitle: "स्थानीय हथकरघा / शिल्पकार हब जोड़ें",
    addLocationSubtitle: "पर्यटकों को स्थानीय आजीविका का समर्थन करने में मदद करने के लिए प्रमाणित पारिवारिक कार्यशालाओं या मूल सहकारी समितियों का योगदान करें।",
    badgeLevel: "अन्वेषण बैज",
    points: "अंक ट्रैकर",
    verifiedCheckins: "सत्यापि चेक इन",
    badges: "अर्जित बैज",
    guideMode: "स्थानीय गाइड",
    touristMode: "पर्यटक",
    authorityMode: "प्राधिकरण दृश्य",
    themeDark: "कॉस्मिक डार्क",
    themeLight: "चीनी मिट्टी रेत रोशनी",
    logoutButton: "खाता बंद करें",
    viewDetails: "विस्तृत बहीखाता देखें",
    bestVisitingHours: "सर्वोत्तम समय",
    bestSeason: "सर्वोत्तम मौसम",
    timings: "खुलने का समय",
    entryFees: "प्रवेश शुल्क",
    saveTrip: "मार्ग सहेजें (प्राप्त करें +100 XP)",
    generatingPlan: "प्राचीन ट्रेल्स को डिजाइन किया जा रहा है...",
    supportLocalTitle: "स्थानीय आजीविका प्रभाव मीटर",
    supportLocalSubtitle: "स्थानीय शिल्पकारों और पारंपरिक हथकरघा बुनकरों के प्रति आपका वास्तविक समय समर्थन स्कोर।",
    pointsLeaderboard: "राज्य अन्वेषक लीडरबोर्ड",

    // New keys implementation translated to Hindi
    tabDashboard: "डैशबोर्ड",
    tabDiscover: "खोजें",
    tabEcoGems: "पर्यावरण स्थल",
    tabFestivals: "त्यौहार",
    tabJournal: "यात्रा डायरी",
    tabPassport: "पासपोर्ट",
    tabMyTrips: "मेरी यात्रा समयरेखा",
    intelMapTitle: "स्मार्ट इंटेल मानचित्र",
    intelMapSubtitle: "फोकस फ़िल्टर लोड करने के लिए मानचित्र नोड्स पर क्लिक करें:",
    phoneStateTourist: "राज्य पर्यटन केंद्र",
    phonePoliceDispatch: "पुलिस प्रेषण",
    phoneMedicalAmbulance: "चिकित्सा एम्बुलेंस",
    telemetryActive: "सैटेलाइट द्वारा टेलीमेट्री सक्रिय है",
    mapInteractiveTitle: "इंटरएक्टिव रूट चार्ट",
    mapInteractivePath: "नियोजित तीर्थयात्रा मार्ग",
    mapActiveWaypoint: "सक्रिय मार्ग बिंदु विवरण",
    mapOpenChronicles: "इतिहास की खोज करें",
    mapDirections: "दिशा-निर्देश",
    mapStep: "चरण",
    mapVisitHour: "यात्रा का समय:",
    mapSelectDayFilter: "दिन का चयन करें:",
    mapAllCombinedDays: "सभी संयुक्त दिन",
    mapProjectionsScale: "प्रक्षेपण: मर्केटर पैमाना",
    routeChartOffline: "Route Chart ऑफ़लाइन है",
    noActiveTravelEvents: "इस चयनित दिन के लिए कोई सक्रिय यात्रा कार्यक्रम नहीं है।",
    detailDistrictLabel: "जिला",
    detailEntryCosts: "प्रवेश शुल्क",
    detailOpeningHours: "खुलने का समय",
    detailOptimalSeason: "सर्वोत्तम मौसम",
    detailBestVisitHours: "सर्वोत्तम समय",
    detailCodexTitle: "तमिरा ऐतिहासिक इतिहास ग्रंथ",
    detailDynastyReign: "राजवंश शासन",
    detailArchStyle: "वास्तुकला शैली",
    detailHistLore: "ऐतिहासिक गाथा",
    detailCelebratedElements: "प्रसिद्ध तत्व",
    detailCulturalDepth: "सांस्कृतिक गहराई",
    detailTimelineEvents: "कालानुक्रमिक कार्यक्रम",
    detailMythLegend: "पौराणिक कथा",
    detailChronicledHist: "क्रॉनिकल्ड इतिहास",
    detailLesserKnown: "अल्प-ज्ञात तथ्य",
    detailLocalEnterprise: "स्थानीय विरासत उद्यम और कारीगर",
    detailTravelLogs: "यात्री लॉग और चेक-इन",
    detailPostLog: "एक सत्यापित यात्रा विवरण पोस्ट करें",
    detailRatingStars: "रेटिंग स्टार",
    detailBeatCrowdTip: "भीड़-बचाव व्यावहारिक सलाह",
    detailLogEntryText: "लॉग प्रविष्टि पाठ",
    detailPostCertified: "प्रमाणित लॉग पोस्ट करें",

    // My Trips & Festivals translations keys
    mytripsTitle: "सक्रिय कस्टम रूट ब्लूप्रिंट",
    mytripsSubtitle: "सहेजी गई यात्रा रूपरेखा, एआई रूट सिमुलेशन के माध्यम से गतिशील रूप से संकलित।",
    mytripsCreated: "निर्मित",
    mytripsStartingFrom: "स्थान से",
    mytripsDumpTitle: "यात्रा कार्यक्रम को हटा दें",
    mytripsLocalCuisineOption: "स्थानीय व्यंजन विकल्प",
    mytripsExpertTip: "विशेषज्ञ सलाह",
    mytripsOpenMapDirections: "मानचित्र दिशा-निर्देश खोलें",
    mytripsViewDetailProfile: "विस्तृत विवरण देखें",
    festivalsTrackerTitle: "राज्य भव्य त्योहार ट्रैकर",
    festivalsTrackerSubtitle: "माह-वार गतिशील धार्मिक जुलूस, फसल उत्सव और शास्त्रीय पत्थर-मंच नृत्य।",
    festivalsSignificanceLabel: "सांस्कृतिक महत्व और पौराणिक कथा",
    festivalsDistrictLabel: "जिला स्थान",
    festivalsAddItinerary: "यात्रा कार्यक्रम में जोड़ें",
    detailTimelineEventsDescription: "इस मुख्य स्थल पर प्रमुख राजसी शासन और जीर्णोद्धार की घटनाओं की कालानुक्रमिक समीक्षा:",
    detailLocalEnterpriseDescription: "स्थानीय हस्तशिल्प कलाकारों, क्षेत्रीय सहकारी समितियों और लघु व्यवसायों का समर्थन करना आजीविका को बढ़ावा देता है",
    detailMultiplierLabel: "गुणक",
    detailConsciousLedger: "सचेत बहीखाता",

    // Search Explore translation values
    exploreSearchPlaceholder: "मंदिरों, राजवंशों के अवशेषों, क्षेत्रों की खोज करें...",
    exploreCategoryLabel: "श्रेणी",
    exploreDistrictLabel: "जिला",
    exploreBudgetLabel: "बजट",
    exploreRegionLabel: "क्षेत्र",
    exploreSearchButton: "स्थानों की खोज करें",
    exploreResetButton: "फ़िल्टर रीसेट करें",
    exploreResultsFound: "स्थान आपकी खोज मानदंडों से मेल खाते हैं"
  }
};
