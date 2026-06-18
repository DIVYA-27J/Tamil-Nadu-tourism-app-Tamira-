import { Destination, Festival, Badge } from './types';

export const DISTRICTS = [
  { name: 'Chennai', region: 'North', description: 'The Gateway to the South, blending golden beaches with ancient churches and modern tech.' },
  { name: 'Madurai', region: 'South', description: 'Thoonga Nagaram—the city that never sleeps, centered around the majestic Meenakshi Temple.' },
  { name: 'Thanjavur', region: 'Central', description: 'The Rice Bowl of Tamil Nadu and cradle of magnificent Chola architecture, arts, and bronze casting.' },
  { name: 'Nilgiris', region: 'West', description: 'The Blue Mountains, famed for misty tea gardens, colonial heritage, and cooler climes.' },
  { name: 'Coimbatore', region: 'West', description: 'The Manchester of South India, adjacent to pristine Western Ghat forests and cotton lands.' },
  { name: 'Kanyakumari', region: 'South', description: 'The Land\'s End, where three seas meet beneath spectacular sunrise, sunset, and sea-rock memorials.' },
  { name: 'Ramanathapuram', region: 'South', description: 'The sacred island of Rameswaram, long sandy bridges, and the silent ruins of Dhanushkodi.' },
  { name: 'Sivaganga', region: 'Central', description: 'Famed for Chettinad cuisine, palatial mansions, and traditional tile craftsmanship.' },
  { name: 'Trichy', region: 'Central', description: 'Rockfort fortresses rising over the Kaveri river, historic shrines, and educational heritage.' },
  { name: 'Kanchipuram', region: 'North', description: 'The city of a thousand temples and world-famous hand-woven mulberry silk sarees.' }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'meenakshi-madurai',
    name: 'Meenakshi Amman Temple',
    category: 'Temples',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai. Famed for its 14 staggering gopurams encrusted with thousands of colorful mythological figures.',
    district: 'Madurai',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010b423b971?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: false,
    budgetLevel: 'Budget',
    crowdLevel: 'High',
    accessibility: true,
    region: 'South',
    travelDuration: 'Half Day',
    travelStyle: 'Spiritual',
    entryFees: 'Free (Special Darshan is ₹50-₹100)',
    timings: '05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM',
    bestSeason: 'October to March (Pleasant weather & Chithirai festival)',
    bestVisitingHours: '05:30 AM (Morning Puja) or 08:30 PM (Night sequence)',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    historyHub: {
      history: 'Originally built by Pandya King Kulasekhara Pandyan, and majorly expanded during the Nayak dynasty in the 16th and 17th centuries under King Thirumalai Nayak.',
      whyFamous: 'Renowned for its sheer architectural scale, the Hall of Thousand Pillars (each depicting sculpted divine forms), and the golden lotus pond.',
      architecture: 'Dravidian Temple Architecture with immense concentric enclosures, massive gopurams (gate towers), and intricate monolithic granite sculptures.',
      dynasty: 'Pandya and Nayak Dynasties',
      culturalImportance: 'An active center of religious pilgrimage, traditional Carnatic music and dance, and the mythological legend of Goddess Meenakshi joining Lord Sundareswarar.',
      timeline: [
        { year: '6th Century BCE', event: 'First foundation during Sangam era by Pandya monarchs.' },
        { year: '1310 AD', event: 'Heavily plundered by the Delhi Sultanate general Malik Kafur.' },
        { year: '1559 AD', event: 'Reconstruction and dramatic expansion spearheaded by Vishwanatha Nayak.' },
        { year: '1623 AD', event: 'Thirumalai Nayak builds the majestic outer halls and Puthu Mandapam.' }
      ]
    },
    storyMode: {
      legend: 'According to legend, King Malayadhwaja Pandya performed a holy fire sacrifice. Goddess Meenakshi emerged from the flames as a three-breasted girl, destined to rule. When she encountered Lord Shiva on Mount Kailash, her third breast vanished as prophesied, identifying him as her consort.',
      historicalStory: 'During British rule, Collector Francis Blackburn protected the temple assets, and even gifted golden ornaments to Goddess Meenakshi, showcasing deep intercultural respect that survives in Madurai lore.',
      importantFacts: [
        { text: 'The temple comprises exactly 14 gopurams, with the southern tower being the tallest at 170.9 ft.' },
        { text: 'The Hall of a Thousand Pillars actually has 985 exquisitely carved granite pillars, each producing musical notes when tapped.' },
        { text: 'The central shrine is covered in solid gold plates, visible from surrounding visual lookouts.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r1', user: 'Aditya Iyer', rating: 5, comment: 'Breathtaking work of art. The carvings on the main southern gopuram are absolutely stellar.', tips: 'Go early at 5:00 AM to beat the queue and witness the morning milk puja.', date: '2026-05-12', helpfulCount: 42 },
      { id: 'r2', user: 'Elena Rostova', rating: 4.8, comment: 'Exquisite atmosphere. The Thousand Pillar hall feels like stepping into a magical limestone maze.', tips: 'Ensure you dress respectfully covering shoulders and legs. Footwear must be deposited outside.', date: '2026-06-01', helpfulCount: 28 }
    ],
    crowdIntelligence: {
      currentCrowd: 'High',
      predictedCrowd: {
        '06:00': 'Medium',
        '09:00': 'High',
        '12:00': 'High',
        '15:00': 'Medium',
        '18:00': 'High',
        '21:00': 'Medium'
      },
      peakHours: '09:00 AM - 12:00 PM & 06:00 PM - 08:30 PM',
      peakDays: 'Saturdays, Sundays, and Pradosham days',
      bestTime: '05:30 AM - 07:00 AM',
      alternativePlaces: ['Thirumalai Nayakkar Mahal', 'Koodal Azhagar Temple', 'Vandiyur Mariamman Teppakulam']
    },
    publicServices: {
      police: { name: 'Temple Police Booth', contact: '+91 452 234 4011', distance: '0.1 km' },
      hospital: { name: 'Grace Kennett Hospital', contact: '+91 452 230 1901', distance: '1.8 km' },
      pharmacy: { name: 'Apollo Pharmacy Central', contact: '1800 102 0555', distance: '0.3 km' },
      atm: { name: 'State Bank of India ATM - East Tower', location: 'Adjacent to East Gate Entry' },
      toilets: { status: 'Clean', location: 'Within the Tourist Information Centre near West Gate' },
      fuel: { name: 'Indian Oil Retailer Madurai Central', distance: '1.2 km' },
      railway: { name: 'Madurai Junction Railway Station (MDU)', distance: '1.5 km' },
      bus: { name: 'Periyar Bus Stand', distance: '1.1 km' }
    },
    localEconomy: [
      { id: 'mad-b1', name: 'Sundaram Woodcraft Guild', type: 'Artisan', specialty: 'Hand-carved rosewood miniature temple carvings', owner: 'Sundaramurthy A.', description: 'A family-legacy shop crafting miniature replicas of the Madurai Chariot for 4 generations.', impactScore: 92 },
      { id: 'mad-b2', name: 'Madurai Sungudi Saree weavers Coop', type: 'Handicraft', specialty: 'Tie-dyed Sungudi cotton sarees', owner: 'Mangalagiri Weaver Community', description: 'Traditional weavers preserving tie-dye methods unique to Madurai district.', impactScore: 98 },
      { id: 'mad-b3', name: 'Murugan Idli Shop', type: 'Restaurant', specialty: 'Fluffy idlis with four types of spicy chutney', owner: 'M. Sangeethan', description: 'Authentic city food stop employing over 50 local kitchen workers.', impactScore: 89 }
    ]
  },
  {
    id: 'brihadeeswarar-thanjavur',
    name: 'Brihadeeswarar Temple',
    category: 'Heritage Sites',
    description: 'Known as the Big Temple (Peruvudaiyar Kovil), it is a magnificent testament to Chola architecture, commissioned by Raja Raja Chola I. Part of the UNESCO World Heritage Site "Great Living Chola Temples".',
    district: 'Thanjavur',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: false,
    budgetLevel: 'Budget',
    crowdLevel: 'Medium',
    accessibility: true,
    region: 'Central',
    travelDuration: 'Half Day',
    travelStyle: 'Heritage',
    entryFees: 'Free (No entry charge, camera tickets ₹50)',
    timings: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
    bestSeason: 'November to February (Cool breeze and temple festival)',
    bestVisitingHours: '04:30 PM - 06:15 PM (Stunning golden hours lighting the vimana)',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    historyHub: {
      history: 'Completed in 1010 AD, the temple celebrated its 1000th year of existence in 2010. Built entirely of granite, although no quarry is situated within 100 km.',
      whyFamous: 'Famous for its 216-foot vimana tower capped with an 80-ton single granite monolithic stone (Kumbam) and containing a massive monolithic Nandi statue.',
      architecture: 'Pure Chola Dravidian architecture, featuring massive monumental enclosures, interlocking dry-masonry locks, and classical murals.',
      dynasty: 'Imperial Chola Dynasty',
      culturalImportance: 'Cradle of Bharatanatyam dance (ancient inscriptions list names of 400 temple dancers) and Chola bronze sculpting techniques.',
      timeline: [
        { year: '1004 AD', event: 'Raja Raja Chola I lays the foundation stone.' },
        { year: '1010 AD', event: 'Construction completes, gilded copper pot is placed atop the Vimana.' },
        { year: '1500 AD', event: 'Nayak rulers add the massive Nandi shrine and perimeter fortifications.' },
        { year: '1987 AD', event: 'Declared a UNESCO World Heritage Site.' }
      ]
    },
    storyMode: {
      legend: 'Local stories recount how the massive 80-ton Kumbam stone was transported to the top of the 216-foot vimana. Engineers designed a continuous earthen ramp starting 6 kilometers away from Sarapallam village, enabling elephants to drag the monolith up.',
      historicalStory: 'The extensive inscriptions on the temple walls describe every donor, down to shepherds who provided oil for lamps, showing the democratic records kept by Chola administrators.',
      importantFacts: [
        { text: 'The main vimana (tower) is built such that its shadow never falls on the ground at noon during equinoxes.' },
        { text: 'It is built of over 130,000 tons of granite, transported without trucks or heavy modern machinery.' },
        { text: 'The monolithic bull statue (Nandi) at the entry is carved from a single dense dark block, measuring 12 feet high.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r3', user: 'Harish R.', rating: 5, comment: 'The scale of this structure transcends human understanding. The engineering is unparalleled.', tips: 'Walk along the outer colonnades to inspect the Chola-era frescos and inscriptions.', date: '2026-04-18', helpfulCount: 56 },
      { id: 'r4', user: 'Maya Lin', rating: 4.9, comment: 'UNESCO listing is fully earned. Watching the sunset turn the granite vimana orange is spiritual.', tips: 'Hire a registered government guide near the ticket window; their stories are worth every rupee.', date: '2026-05-30', helpfulCount: 39 }
    ],
    crowdIntelligence: {
      currentCrowd: 'Medium',
      predictedCrowd: {
        '06:00': 'Low',
        '09:00': 'Medium',
        '12:00': 'High',
        '15:00': 'Low',
        '18:00': 'High',
        '21:00': 'Low'
      },
      peakHours: '10:00 AM - 12:00 PM & 05:00 PM - 07:30 PM',
      peakDays: 'Sundays, Maha Shivaratri, and Pradosham',
      bestTime: '04:30 PM - 06:00 PM',
      alternativePlaces: ['Thanjavur Royal Palace', 'Saraswathi Mahal Library', 'Gangaikonda Cholapuram']
    },
    publicServices: {
      police: { name: 'Thanjavur Town Police Station', contact: '04362 230 120', distance: '0.4 km' },
      hospital: { name: 'Raja Mirasdar Government Hospital', contact: '04362 230 415', distance: '1.1 km' },
      pharmacy: { name: 'MedPlus Thanjavur West', contact: '04362 277 888', distance: '0.5 km' },
      atm: { name: 'ICICI Bank ATM', location: 'Outside Northern gopuram' },
      toilets: { status: 'Clean', location: 'Near tourist garden ticket block' },
      fuel: { name: 'Bharat Petroleum Station', distance: '0.8 km' },
      railway: { name: 'Thanjavur Junction (TJ)', distance: '2.0 km' },
      bus: { name: 'Old Bus Stand Room', distance: '1.2 km' }
    },
    localEconomy: [
      { id: 'thj-b1', name: 'Maratha Painting Atelier', type: 'Artisan', specialty: 'Thanjavur Gold-Foil Paintings', owner: 'Ramanujam Raju', description: 'Master workshop utilizing 22k pure gold foil and precious stones on teak boards.', impactScore: 96 },
      { id: 'thj-b2', name: 'Thalaiyaatti Bommai Toys Shop', type: 'Handicraft', specialty: 'Thanjavur Terracotta bobblehead dolls', owner: 'Muthu Selvam', description: 'Crafting the traditional clay dancing dolls that pivot elegantly on copper points.', impactScore: 94 },
      { id: 'thj-b3', name: 'Chola Art Bronze Casting', type: 'Artisan', specialty: 'Lost-wax system bronze idols', owner: 'Swamimalai Radhakrishna Sthapati', description: 'Direct Chola-line sculptors employing lost-wax casting of divine panchaloha figures.', impactScore: 99 }
    ]
  },
  {
    id: 'shore-temple-mahabalipuram',
    name: 'Shore Temple (Mahabalipuram)',
    category: 'Heritage Sites',
    description: 'An elegant rock-cut architectural marvel overlooking the crashing waves of the Bay of Bengal. Built during the reign of Narasimhavarman II (Rajasimha) of the Pallava dynasty.',
    district: 'Chennai',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1581335048243-7f3e8f8a1cae?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: false,
    budgetLevel: 'Moderate',
    crowdLevel: 'High',
    accessibility: true,
    region: 'North',
    travelDuration: 'Full Day',
    travelStyle: 'Heritage',
    entryFees: '₹40 (Indians), ₹600 (Foreigners)',
    timings: '06:00 AM - 06:00 PM',
    bestSeason: 'Winter (November to February)',
    bestVisitingHours: '06:00 AM - 07:30 AM (Sun rising directly from the ocean)',
    coordinates: { lat: 12.6166, lng: 80.1931 },
    historyHub: {
      history: 'Built in the late 7th century, it is one of the oldest structural stone temples in South India. It stood sentinel as an dynamic port landmark for incoming merchants on East Asian maritime trade routes.',
      whyFamous: 'Renowned for resisting centuries of harsh salt-laden sea winds, featuring the three shrines honoring Lord Shiva and Lord Vishnu.',
      architecture: 'Pallava rock-carved masonry displaying early Dravidian tiers, featuring high reliefs, sculpted stone lions, and circular columns.',
      dynasty: 'Pallava Dynasty',
      culturalImportance: 'A critical maritime node connecting ancient India with Southeast Asia; the backdrop for the famous Mahabalipuram Dance Festival.',
      timeline: [
        { year: '680 AD', event: 'Pallava King Rajasimha begins carving stone structures directly on the shoreline.' },
        { year: '715 AD', event: 'Shiva Lingam installed and temple dedicated as trade route beacon.' },
        { year: '1200 AD', event: 'Visited by Marco Polo who termed Mahabalipuram the home of Seven Pagodas.' },
        { year: '2004 AD', event: 'Tsunami waves wash off sand buildup, revealing additional submerged granite structures.' }
      ]
    },
    storyMode: {
      legend: 'Ancient mariners referred to Mahabalipuram as "The Seven Pagodas". Folk legend says that six magnificent temples were claimed by the jealous ocean deity, leaving only the Shore Temple standing as the sole survivor.',
      historicalStory: 'During the tragic 2004 Indian Ocean Tsunami, as the sea receded just before the giant wave hit, local fisherman saw a long row of carved granite rocks and stone statues rise from the seabed, confirming old legendary accounts.',
      importantFacts: [
        { text: 'Unlike most temple gopurams of later times, this structural vimana is built completely from local stone quarries.' },
        { text: 'A carved stone monolith of a lion holds a miniature shrine of Goddess Durga inside its hollowed chest.' },
        { text: 'The temple comprises three shrines, uniquely facing both east to face the sunrise and west.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r5', user: 'Divya S.', rating: 4.8, comment: 'Stunning sight. Sitting on the lawns with sea breeze and seeing stones carved 1300 years ago is humbling.', tips: 'Go early! By 10 AM, the heat on the stone tiles makes walking barefoot unbearable.', date: '2026-03-24', helpfulCount: 19 }
    ],
    crowdIntelligence: {
      currentCrowd: 'High',
      predictedCrowd: {
        '06:00': 'Low',
        '09:00': 'Medium',
        '12:00': 'High',
        '15:00': 'High',
        '18:00': 'High',
        '21:00': 'Low'
      },
      peakHours: '11:00 AM - 04:30 PM',
      peakDays: 'Saturdays, Sundays, and public holidays',
      bestTime: '06:00 AM - 08:00 AM',
      alternativePlaces: ['Five Rathas', 'Arjuna\'s Penance', 'Krishna\'s Butterball']
    },
    publicServices: {
      police: { name: 'Mahabalipuram Police Station', contact: '044 2744 2226', distance: '0.8 km' },
      hospital: { name: 'Mahabalipuram General Clinic', contact: '044 2744 2333', distance: '1.2 km' },
      pharmacy: { name: 'Thulasi Drug Store', contact: '044 2744 2901', distance: '0.7 km' },
      atm: { name: 'Canara Bank ATM', location: 'Facing Main Beach Road' },
      toilets: { status: 'Clean', location: 'Behind tourist parking bay' },
      fuel: { name: 'HP Fuel Station ECR', distance: '2.5 km' },
      railway: { name: 'Chengalpattu Junction', distance: '29.0 km' },
      bus: { name: 'Mahabalipuram Bus Stop', distance: '0.9 km' }
    },
    localEconomy: [
      { id: 'mhb-b1', name: 'Siddhartha Stone Sculptures', type: 'Artisan', specialty: 'Monolithic granite sculpture carvings', owner: 'M. Elumalai Sthapathy', description: 'Award-winning master carvers providing handmade idols for temples worldwide.', impactScore: 97 },
      { id: 'mhb-b2', name: 'Bay of Bengal Seashell crafts', type: 'Vendor', specialty: 'Nacre table mirrors and shell jewelry', owner: 'Karpagam S.', description: 'Beach vendor supporting coastal fisherwomen collectives.', impactScore: 85 }
    ]
  },
  {
    id: 'pichavaram-mangrove',
    name: 'Pichavaram Mangrove Forests',
    category: 'Wildlife',
    description: 'The world\'s second largest mangrove forest, Pichavaram is a unique biodiversity ecosystem with thousands of islands separated by a sprawling network of shallow water channels.',
    district: 'Central',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: true,
    budgetLevel: 'Moderate',
    crowdLevel: 'Low',
    accessibility: false,
    region: 'Central',
    travelDuration: 'Full Day',
    travelStyle: 'Nature',
    entryFees: '₹20 (Forest entry), Rowboat ₹200, Motorboat ₹400',
    timings: '08:00 AM - 05:00 PM',
    bestSeason: 'October to February (Excellent weather and migratory birds)',
    bestVisitingHours: '08:00 AM - 10:00 AM (Serene birdwatching opportunities)',
    coordinates: { lat: 11.4284, lng: 79.7820 },
    historyHub: {
      history: 'A critical marine ecosystem that has stood as a natural shield against massive storms, and was anciently cited in Tamil Sangam poetry as the "Mullai and Marutham" coastal forest border.',
      whyFamous: 'Renowned for its rare Rhizophora root mangroves and narrow water tunnels canopying the rowboats.',
      architecture: 'Natural biological architecture composed of aerial roots projecting above water level like ancient arches.',
      dynasty: 'Chola Coastland',
      culturalImportance: 'Local fishing communities hold deep ancestral rights here and manage the tourist eco-boats, creating a model of sustainable ecotourism.',
      timeline: [
        { year: '1200 AD', event: 'Used by Chola naval units as camouflage outposts.' },
        { year: '1970 AD', event: 'Recognized by the Forest Department as a protected nature reserve.' },
        { year: '2004 AD', event: 'Acts as life saver; mangroves drop speed of tsunami waves, saving nearby villages.' }
      ]
    },
    storyMode: {
      legend: 'Traditional fishers tell the story of the Forest Deity "Pichai Ayyanar" who lives deep within the mangrove core. It is said that anyone lost in the maze of channels will hear distant drumming that safely leads them back to land.',
      historicalStory: 'During the 2004 Indian Ocean Tsunami, while open coastlands suffered heavy damage, the 1100-hectare Pichavaram forest absorbed over 80% of the wave energy, becoming a global study model for environmental protection.',
      importantFacts: [
        { text: 'Features over 400 species of rare flora and fauna, including migrant birds coming from Siberia.' },
        { text: 'The mangroves sit in a shallow lagoon separated from the Bay of Bengal by a long, dynamic sand bar.' },
        { text: 'Water depth averages less than 3 feet across most inner canopied channels.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r6', user: 'Rohan Bose', rating: 4.7, comment: 'A natural wonderland. The rowboat ride into the narrow branch tunnels is peaceful and surreal.', tips: 'Request the boatman to take you deep into the narrow "Canopy Lines"—it costs a bit extra but is completely worth it.', date: '2026-05-10', helpfulCount: 33 }
    ],
    crowdIntelligence: {
      currentCrowd: 'Low',
      predictedCrowd: {
        '08:00': 'Low',
        '10:00': 'Low',
        '12:00': 'Medium',
        '14:00': 'Medium',
        '16:00': 'Low'
      },
      peakHours: '11:30 AM - 02:00 PM',
      peakDays: 'Sundays and Pongal holidays',
      bestTime: '08:00 AM - 09:30 AM',
      alternativePlaces: ['Chidambaram Natarajar Temple', 'Sirkazhi Temple', 'Poompuhar Beach']
    },
    publicServices: {
      police: { name: 'Killai Police Station', contact: '+91 4144 261 224', distance: '2.5 km' },
      hospital: { name: 'Chidambaram Medical College Hospital', contact: '+91 4144 238 001', distance: '14.0 km' },
      pharmacy: { name: 'EcoCare Pharmacy Killai', contact: 'N/A', distance: '2.5 km' },
      atm: { name: 'SBI ATM - Killai Branch', location: 'Killai Market Rd' },
      toilets: { status: 'Average', location: 'Near Forest Eco-Tourism Office jetty' },
      fuel: { name: 'Indian Oil Outlet Killai', distance: '3.0 km' },
      railway: { name: 'Chidambaram Junction Railway Station', distance: '15.0 km' },
      bus: { name: 'Killai Bus Station', distance: '2.6 km' }
    },
    localEconomy: [
      { id: 'pic-b1', name: 'Killai Fishermen Boating Coop', type: 'Traditional Market', specialty: 'Rowboat ecotours', owner: 'Community Owned', description: 'A cooperative of local fishers who transitioned to boat guides to support their livelihoods.', impactScore: 100 },
      { id: 'pic-b2', name: 'Amma Coastal Mess', type: 'Restaurant', specialty: 'Spicy clay-pot crab and mangrove mudfish fry', owner: 'Selvi Karuppannan', description: 'A home-style eatery near the jetty employing local single mothers.', impactScore: 92 }
    ],
    hiddenGemScore: 95,
    authenticityScore: 98,
    popularityIndex: 30,
    localImpactScore: 99
  },
  {
    id: 'dhanushkodi-ghost-town',
    name: 'Dhanushkodi (Lost Land)',
    category: 'Heritage Sites',
    description: 'An abandoned ghost town at the south-eastern tip of Pamban Island, situated between the Bay of Bengal and Indian Ocean. Overlooked by the legendary Ram Setu land bridge.',
    district: 'Ramanathapuram',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: true,
    budgetLevel: 'Moderate',
    crowdLevel: 'Low',
    accessibility: true,
    region: 'South',
    travelDuration: 'Full Day',
    travelStyle: 'Adventure',
    entryFees: 'Free (Vehicle access charges apply)',
    timings: '06:00 AM - 05:00 PM (Strict border security check at sunset)',
    bestSeason: 'November to February (Cool trade winds)',
    bestVisitingHours: '06:00 AM (Spectacular sunrise behind the blue horizon)',
    coordinates: { lat: 9.1762, lng: 79.4447 },
    historyHub: {
      history: 'Once a bustling, prosperous port city with direct boat services to Sri Lanka, Dhanushkodi was completely destroyed by a catastrophic super-cyclone in December 1964, and declared unfit for human habitation.',
      whyFamous: 'Famed for its skeletal ruins of a railway terminal, church, and school remaining erect amidst the shifting sands at land\'s end.',
      architecture: 'Colonial Anglo-Indian architecture ruined and preserved by nature\'s elements.',
      dynasty: 'British India / Sethupathi Kings',
      culturalImportance: 'According to the Ramayana epic, this is where Lord Rama broke the mythical bridge with his bow (Dhanush-Kodi) after defeating King Ravana.',
      timeline: [
        { year: '1914 AD', event: 'Direct railway lines and ferry system connect Chennai to Sri Lanka via Dhanushkodi.' },
        { year: '1964 AD', event: 'A devastating cyclone with 280km/h winds submerges the town, claiming over 1,800 lives.' },
        { year: '2017 AD', event: 'The Indian Government builds a beautiful coastal national highway to land\'s end.' }
      ]
    },
    storyMode: {
      legend: 'After his victory, Lord Rama broke the holy land bridge "Ram Setu" with the tip of his bow at the request of Vibhishana, the new king of Sri Lanka, giving the town its name "Dhanushkodi" (meaning bow\'s end).',
      historicalStory: 'On the fateful night of December 22, 1964, Pamban-Dhanushkodi passenger train No. 653 was hit by the giant tidal waves just yards away from the terminal. The entire train was swept into the sea, showing the absolute power of nature.',
      importantFacts: [
        { text: 'It contains the narrowest land border between India and Sri Lanka—just 18 kilometers of shallow water coral reefs.' },
        { text: 'Ruined bricks of the church show coral stones used in build structures due to local island materials.' },
        { text: 'Only a handful of local shore fishers still live here in small thatched huts without electricity.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r7', user: 'Vignesh K.', rating: 5, comment: 'Words cannot describe the feeling of standing on a narrow strip of road with roaring oceans on both sides.', tips: 'Visit using a two-wheeler early in the morning. Stop by the ruins to support local shell artisans.', date: '2026-06-03', helpfulCount: 48 }
    ],
    crowdIntelligence: {
      currentCrowd: 'Low',
      predictedCrowd: {
        '06:00': 'Low',
        '09:00': 'Medium',
        '12:00': 'Medium',
        '15:00': 'Medium',
        '17:00': 'Low'
      },
      peakHours: '10:00 AM - 03:00 PM',
      peakDays: 'Sundays and religious holidays (Maha Shivaratri)',
      bestTime: '06:00 AM - 08:30 AM',
      alternativePlaces: ['Ramanathaswamy Temple Rameswaram', 'Dr. APJ Abdul Kalam Memorial', 'Pamban Rail Bridge']
    },
    publicServices: {
      police: { name: 'Dhanushkodi Police Outpost', contact: '100', distance: '2.0 km' },
      hospital: { name: 'Rameswaram Government Hospital', contact: '+91 4573 221 212', distance: '19.0 km' },
      pharmacy: { name: 'Ramesh Pharmacy Central', contact: 'N/A', distance: '18.0 km' },
      atm: { name: 'No ATMs here', location: 'Nearest ATMs are in Rameswaram Main Town' },
      toilets: { status: 'Average', location: 'At the end of National Highway parking point' },
      fuel: { name: 'Nearest Petrol Bunk - Rameswaram Entry', distance: '17.0 km' },
      railway: { name: 'Rameswaram Railway Station', distance: '18.0 km' },
      bus: { name: 'Local Tamil Nadu Govt Bus No. 3', distance: '0.1 km' }
    },
    localEconomy: [
      { id: 'dhn-b1', name: 'Selvam\'s Seashell Shop', type: 'Vendor', specialty: 'Custom engraved conch and natural seashells', owner: 'Selvamani P.', description: 'Local shore-resident selling shells harvested after rough monsoons.', impactScore: 92 },
      { id: 'dhn-b2', name: 'Coastal Fish Fry Stalls', type: 'Vendor', specialty: 'Fresh ocean catches fried in homemade spices', owner: 'Fisherwomen Welfare Group', description: 'Local stalls serving fresh catch of fish directly from boats.', impactScore: 88 }
    ],
    hiddenGemScore: 98,
    authenticityScore: 100,
    popularityIndex: 25,
    localImpactScore: 94
  },
  {
    id: 'ooty-lake-nilgiris',
    name: 'Ooty Lake & Boat House',
    category: 'Hill Stations',
    description: 'An expansive artificial lake constructed by John Sullivan in 1824, nestled amidst giant eucalyptus trees in the heart of the Nilgiris hill country.',
    district: 'Nilgiris',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    isHiddenGem: false,
    budgetLevel: 'Moderate',
    crowdLevel: 'High',
    accessibility: true,
    region: 'West',
    travelDuration: 'Full Day',
    travelStyle: 'Nature',
    entryFees: '₹15 (Indians), Bot rentals ₹240 - ₹500',
    timings: '09:00 AM - 06:00 PM',
    bestSeason: 'March to June (Summer Blossom Festival)',
    bestVisitingHours: '09:00 AM (Misty morning calm before the crowd starts)',
    coordinates: { lat: 11.4089, lng: 76.6896 },
    historyHub: {
      history: 'Built by British administrator John Sullivan, who dammed mountain streams to provide storage for irrigation; eventually adapted as a leisure lake.',
      whyFamous: 'Famous for its picturesque boating options, surrounding pine pineforest, and colonial toy train rides running alongside the banks.',
      architecture: 'British Colonial landscape engineering utilizing natural valleys to form deep reservoirs.',
      dynasty: 'East India Company Era',
      culturalImportance: 'The focal visual icon of Ooty, featured in countless Indian films; central hub for summer tourism.',
      timeline: [
        { year: '1824 AD', event: 'John Sullivan completes the construction of Ooty Lake.' },
        { year: '1973 AD', event: 'Taken over by Tamil Nadu Tourism Development Corporation (TTDC) for commercial boating.' },
        { year: '1995 AD', event: 'Launch of Ooty lake eco-conservation protocols to protect mountain freshwater streams.' }
      ]
    },
    storyMode: {
      legend: 'The Toda tribes, who are indigenous to the Nilgiris, held the waters of this high plateau sacred and believed their gods bathed in the early morning mountain fog over the waters.',
      historicalStory: 'John Sullivan, captivated by the cold, misty climate of the Nilgiris, bought lands from the Toda chiefs for nominal prices and introduced tea seeds from China, starting the monumental Nilgiris tea revolution.',
      importantFacts: [
        { text: 'The lake was originally much broader, covering large portions of what is now the Ooty colonial Race Course.' },
        { text: 'Boaters can choose between self-pedaled boats, rowboats, or massive fast motorboats.' },
        { text: 'It sits at an impressive elevation of 2,240 meters above mean sea level.' }
      ].map(f => f.text)
    },
    reviews: [
      { id: 'r8', user: 'Sandra M.', rating: 4.5, comment: 'Beautiful scenery, although it can get extremely crowded during May weekends.', tips: 'Rent a paddle boat and navigate near the opposite bank where the tall eucalyptus trees throw deep blue shadows.', date: '2026-05-18', helpfulCount: 16 }
    ],
    crowdIntelligence: {
      currentCrowd: 'High',
      predictedCrowd: {
        '09:00': 'Medium',
        '11:00': 'High',
        '13:00': 'High',
        '15:00': 'High',
        '17:00': 'High'
      },
      peakHours: '11:00 AM - 04:30 PM',
      peakDays: 'Weekends, Summer holidays, and Puja holidays',
      bestTime: '09:00 AM - 10:30 AM',
      alternativePlaces: ['Pykara Lake', 'Avalanche Lake', 'Emerald Lake']
    },
    publicServices: {
      police: { name: 'Ooty Town Police HQ', contact: '+91 423 244 4022', distance: '1.5 km' },
      hospital: { name: 'Ooty Government Area Hospital', contact: '+91 423 244 2412', distance: '2.0 km' },
      pharmacy: { name: 'Nilgiris Pharmacy Block', contact: 'N/A', distance: '0.8 km' },
      atm: { name: 'State Bank of India ATM', location: 'Right at Boat House Main gate' },
      toilets: { status: 'Average', location: 'Inside boat club complex' },
      fuel: { name: 'HP Petrol Pump Charring Cross', distance: '2.5 km' },
      railway: { name: 'Udagamandalam Toy Railway Station (Ooty)', distance: '0.6 km' },
      bus: { name: 'Ooty Central Bus Terminal', distance: '0.8 km' }
    },
    localEconomy: [
      { id: 'oot-b1', name: 'Nilgiris Honey & Toda Embroidery', type: 'Handicraft', specialty: 'Red-and-black geometric Toda hand embroidery shawls', owner: 'Sinthamani Toda Craft Coop', description: 'Direct outlet supporting Toda tribal women artisans keeping ancient weave patterns alive.', impactScore: 99 },
      { id: 'oot-b2', name: 'Ooty Chocolate Factory', type: 'Vendor', specialty: 'Homemade dark truffles and rum-raisin chocolates', owner: 'James Wilson Shop', description: 'Famous cottage industry employing local tea estate workers for manual chocolate wrapping.', impactScore: 87 }
    ]
  }
];

export const FESTIVALS: Festival[] = [
  {
    id: 'pongal-harvest',
    name: 'Thai Pongal (Harvest Festival)',
    category: 'Seasonal Celebrations',
    description: 'The premier harvest celebration of the Tamil people, dedicated to the Sun God (Surya) and livestock for a bountiful agricultural yield over the year.',
    history: 'Dating back to the Sangam era (200 BCE - 300 CE), Pongal was historically celebrated as Margazhi Nonbu, where young girls prayed for rain and prosperity.',
    significance: 'Signifies the onset of the Tamil month "Thai" (considered highly auspicious) and symbolizes the boiling over of milk and rice as a precursor to unbounded wealth.',
    schedule: 'Day 1: Bhogi Pongal, Day 2: Thai Pongal, Day 3: Mattu Pongal (Honoring bulls), Day 4: Kaanum Pongal (Family meets)',
    district: 'All Districts (Most authentic in rural Madurai, Thanjavur, & Alanganallur)',
    date: 'January 14 to January 17 (Every Year)',
    duration: '4 Days',
    photos: ['https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=800&q=80'],
    travelInformation: 'The best experience is joining standard village homestays around Madurai or Thanjavur. Trains sell out 4 months in advance. Tourists can watch Jallikattu (bull-taming event) in Alanganallur on Jan 16.'
  },
  {
    id: 'chithirai-madurai',
    name: 'Chithirai Festival (Madurai)',
    category: 'Temple Festivals',
    description: 'A spectacular, month-long Chithirai Brahmotsavam celebration that reunites the entire temple city of Madurai in divine joy.',
    history: 'Historically established by King Thirumalai Nayak to unite two opposing religious cults—Shaivites and Vaishnavites—by staging the celestial marriage of Shiva and Vishnu sister goddess.',
    significance: 'Re-enacts the holy cosmic union of Goddess Meenakshi with Lord Sundareswarar, and Lord Alagar crossing the holy Vaigai River in golden robes.',
    schedule: 'Day 5: Coronation, Day 10: Celestial Marriage (Thirukalyanam), Day 11: Massive Temple Chariot procession, Day 12: Lord Alagar entering Vaigai river',
    district: 'Madurai',
    date: 'April - May (Based on Tamil Solar Calendar)',
    duration: '15 Days',
    photos: ['https://images.unsplash.com/photo-1600100397608-f010b423b971?auto=format&fit=crop&w=800&q=80'],
    travelInformation: 'The city accommodates over 1 million tourists during this period. Booking rooms near the Town Hall Road or West Veli street must be completed early. Public transport is heavily diverted; travelers will have to walk.'
  },
  {
    id: 'natyanjali-chidambaram',
    name: 'Natyanjali Dance Festival',
    category: 'Dance Festivals',
    description: 'An annual Indian classical dance extravaganza staged within the majestic columns of the Chidambaram Natarajar Temple.',
    history: 'Initiated in 1981 to pay direct artistic homage to Lord Nataraja—the Lord of cosmic dance—inside the gold-roofed temple shrine.',
    significance: 'Brings together elite dancers from across India to perform Bharatanatyam, Kathak, Odissi, and Kuchipudi directly on the stone stage.',
    schedule: 'Performances run every evening from 06:00 PM to midnight, coinciding with Maha Shivaratri',
    district: 'Central',
    date: 'February - March (Coinciding with Maha Shivaratri night)',
    duration: '5 Days',
    photos: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'],
    travelInformation: 'Chidambaram is a 4-hour drive from Chennai along the Scenic East Coast Road. Free entry tickets are available at the Natarajar Temple desk, but tourists should arrive by 05:00 PM to secure visual seats near the stage.'
  }
];

export const BADGES: Badge[] = [
  { id: 'temp-exp', title: 'Temple Explorer', description: 'Visits at least 3 historical temples of Tamil Nadu.', category: 'Temple Explorer', icon: 'Sun' },
  { id: 'her-guard', title: 'Heritage Guardian', description: 'Check into 2 UNESCO World Heritage sites.', category: 'Heritage Guardian', icon: 'Shield' },
  { id: 'fest-enth', title: 'Festival Enthusiast', description: 'Attend or save an authentic regional festival.', category: 'Festival Enthusiast', icon: 'Sparkles' },
  { id: 'nat-exp', title: 'Nature Explorer', description: 'Navigate coastal mangroves or high mountain lakes.', category: 'Nature Explorer', icon: 'Compass' },
  { id: 'food-adv', title: 'Food Adventurer', description: 'Examine authentic local businesses & traditional eateries.', category: 'Food Adventurer', icon: 'Utensils' },
  { id: 'tn-expert', title: 'Tamil Nadu Expert', description: 'Claim 5 or more badges to become a Certified Explorer.', category: 'Tamil Nadu Expert', icon: 'Award' }
];

export const DEMO_ANALYTICS = {
  mostVisited: [
    { name: 'Meenakshi Amman Temple', count: 18450 },
    { name: 'Brihadeeswarar Temple', count: 14200 },
    { name: 'Shore Temple', count: 12100 },
    { name: 'Ooty Lake', count: 9800 },
    { name: 'Pichavaram Mangrove', count: 4200 },
    { name: 'Dhanushkodi ruins', count: 3500 }
  ],
  underexplored: [
    { name: 'Pichavaram Mangrove', potential: 85, district: 'Cuddalore/Central' },
    { name: 'Dhanushkodi Lost Town', potential: 90, district: 'Ramanathapuram' },
    { name: 'Sittanavasal Rock Cave Shrines', potential: 78, district: 'Pudukkottai' },
    { name: 'Megamalai Mist Valleys', potential: 88, district: 'Theni' },
    { name: 'Courttalam Hill Cascades', potential: 82, district: 'Tenkasi' }
  ],
  trends: [
    { month: 'Jan', spiritual: 9500, heritage: 8000, nature: 5400 },
    { month: 'Feb', spiritual: 8200, heritage: 9000, nature: 6200 },
    { month: 'Mar', spiritual: 7000, heritage: 7500, nature: 5000 },
    { month: 'Apr', spiritual: 12000, heritage: 6500, nature: 4100 },
    { month: 'May', spiritual: 6500, heritage: 7000, nature: 14000 },
    { month: 'Jun', spiritual: 5800, heritage: 5200, nature: 11000 }
  ]
};
