import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      console.warn('GEMINI_API_KEY is not defined or is placeholder. Falling back to Mock Smart AI Engine.');
      return null;
    }
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini AI Client initialized successfully.');
    } catch (err) {
      console.error('Error initializing Gemini client:', err);
      return null;
    }
  }
  return aiClient;
}

// REST Endpoint: AI Smart Trip Planner
app.post('/api/planner', async (req, res) => {
  const { startingLocation, budget, numberOfDays, interests, travelStyle, crowdPreference } = req.body;

  const prompt = `You are the chief travel algorithm for the Tamil Nadu Smart Tourism Network (TNSTN).
Generate a daily travel itinerary for a ${numberOfDays}-day trip starting from "${startingLocation || 'Chennai'}".
Budget level: ${budget || 'Moderate'}.
Interests: ${interests && interests.length > 0 ? interests.join(', ') : 'Temples, Heritage, Hidden Gems, Local Food'}.
Travel style: ${travelStyle || 'Cultural'}.
Crowd preference: ${crowdPreference || 'No Preference'}.

IMPORTANT: You must return the response strictly as valid JSON according to this structure (do not describe, output only the JSON):
{
  "summary": "Beautiful summary of the curated route, explaining how it highlights Tamil Nadu's local communities and heritage.",
  "itinerary": [
    {
      "day": 1,
      "title": "Exploring Heritage",
      "activities": [
        {
          "time": "09:00 AM",
          "placeName": "Name of monument/place",
          "activityDescription": "Detail of what they do here, emphasizing architectural dynasties (Chola/Pallava/Pandya) or local folklore.",
          "foodSuggestion": "Famous local food to eat here, like Madurai Bun Parotta or Thanjavur degree coffee.",
          "tips": "Practical tips like crowd beating advice, optimal dress code, or local artisan interactions.",
          "travelTime": "30 mins transport",
          "location": "District or town name with state, e.g. 'Thanjavur, Tamil Nadu' or 'Madurai, Tamil Nadu'",
          "imageUrl": "A high-quality Unsplash image URL showcasing this specific monument/experience or a beautiful scenic Tamil Nadu tourism photo"
        }
      ]
    }
  ]
}
Design a highly immersive itinerary spanning the ${numberOfDays} days. Ensure actual Tamil Nadu places match the interests. Keep it realistic yet adventurous, introducing at least one "hidden gem" or rural tourism spot.`;

  const ai = getGeminiClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (e) {
        console.error('Failed to parse Gemini output as JSON, returning text:', responseText);
        // Fallback if parsing fails but text returned
        return res.json(createMockItinerary(startingLocation, numberOfDays, interests));
      }
    } catch (error: any) {
      console.error('Gemini API call failed, falling back to Mock ITinerary:', error.message);
      return res.json(createMockItinerary(startingLocation, numberOfDays, interests));
    }
  } else {
    // Return high quality mock itinerary immediately
    return res.json(createMockItinerary(startingLocation, numberOfDays, interests));
  }
});

// REST Endpoint: AI Tourism Assistant Bot "Vaigai"
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  const systemInstruction = `You are Vaigai, an intelligence officer and travel companion for the Tamil Nadu Smart Tourism Network (TNSTN).
Your main characteristics:
- Highly knowledgeable on Dravidian temple architecture (Chola, Pallava, Pandya, Nayak dynasties), Sangam Tamil literature, Chettinad cuisine, and Tamil Nadu's local artisan crafts (e.g., Tanjore gold-leaf paintings, Swamimalai bronze, Kanchipuram silk).
- Always recommend local, authentic vendors, hidden gems, and rural community businesses to promote economic equity.
- Keep answers inspiring, scannable, and extremely friendly. Use warm bullet-pointed tips when helpful.
- Reference actual destinations (like Madurai Meenakshi Temple, Brihadeeswarar Temple in Thanjavur, Pichavaram Mangroves, Dhanushkodi ghost town, Ooty mountain valleys).

Be concise, informative, and never larp about systems: speak as a real cultural custodian.`;

  const prompt = `User message: ${message}

Provide a helpful, beautifully spaced answer. Highlight key suggestions in bold text.`;

  const ai = getGeminiClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });
      return res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini chatbot failed, falling back to simulated bot:', error);
      return res.json({ text: getMockBotResponse(message) });
    }
  } else {
    return res.json({ text: getMockBotResponse(message) });
  }
});

// Helpers to create rich mock data when Gemini is unavailable or not configured yet
function createMockItinerary(start: string, days: number, interests: string[]) {
  const actualDays = days || 3;
  const startPlace = start || 'Chennai';
  const interestsList = interests && interests.length > 0 ? interests : ['Temples', 'Heritage', 'Hidden Gems'];

  const mockActivitiesPool = [
    {
      placeName: 'Brihadeeswarar Master Temple',
      activityDescription: 'Admire the 216-foot high granite Vimana. Learn how the 80-ton capping stone was hauled to the top over a 6km dirt ramp.',
      foodSuggestion: 'Thanjavur Degree Coffee and fresh piping hot idli with sambar.',
      tips: 'Inspect the extensive Chola wall inscriptions containing ancient administrative and dance records.',
      travelTime: '20 mins local',
      location: 'Thanjavur, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    },
    {
      placeName: 'Pichavaram Canopied Mangroves',
      activityDescription: 'Embark on a traditional wooden rowboat guided by generational coastal fishers through narrow biological root tunnels.',
      foodSuggestion: 'Spicy coastal clay-pot crab and freshly caught fried pond fish.',
      tips: 'Politely ask your local boatman to explore the quieter, deep inner tunnels.',
      travelTime: '45 mins from town',
      location: 'Chidambaram, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=600&q=80'
    },
    {
      placeName: 'Chettinad Palatial Mansions',
      activityDescription: 'Tour a massive 100-room mansion built with Burmese teak, Italian marble, and Japanese clay tiles.',
      foodSuggestion: 'Authentic Chettinad Pepper Chicken or spicy Karuppatti Paniyaram.',
      tips: 'Interact with local tile artisans who hand-press Athangudi clay floor patterns.',
      travelTime: '35 mins taxi',
      location: 'Karaikudi, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    },
    {
      placeName: 'Dhanushkodi Ruins & Sand Bar',
      activityDescription: 'Explore the hauntingly beautiful skeleton of the local church and railway terminal swept away by the 1964 super-cyclone.',
      foodSuggestion: 'Fresh lemon juice and spice-rubbed masala corn on the beach.',
      tips: 'Strict border security closes checkpoint at 5:00 PM; head out before the winds pick up.',
      travelTime: '1 hr from Rameswaram',
      location: 'Rameswaram, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80'
    },
    {
      placeName: 'Shore Temple Sunset Walk',
      activityDescription: 'Look over the historic Pallava stone temples built directly on the ocean. Watch the waves crash against the structural granite pillars.',
      foodSuggestion: 'Hot fish fry with fresh coconut water right by the shore.',
      tips: 'Hire a registered guide to explain the legend of the "Seven Pagodas".',
      travelTime: '10 mins walk',
      location: 'Mahabalipuram, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const itinerary: any[] = [];
  for (let i = 1; i <= actualDays; i++) {
    const actIndex1 = (i - 1) % mockActivitiesPool.length;
    const actIndex2 = (i) % mockActivitiesPool.length;
    itinerary.push({
      day: i,
      title: i === 1 ? `Departure from ${startPlace} & Discovery` : i === actualDays ? 'Ethereal Experiences & Local Markets' : 'Deep Culture & Dynastic Legends',
      activities: [
        {
          time: '09:00 AM',
          placeName: mockActivitiesPool[actIndex1].placeName,
          activityDescription: `Specially curated to match interest in ${interestsList[0] || 'Heritage'}. ` + mockActivitiesPool[actIndex1].activityDescription,
          foodSuggestion: mockActivitiesPool[actIndex1].foodSuggestion,
          tips: mockActivitiesPool[actIndex1].tips,
          travelTime: mockActivitiesPool[actIndex1].travelTime,
          location: mockActivitiesPool[actIndex1].location,
          imageUrl: mockActivitiesPool[actIndex1].imageUrl
        },
        {
          time: '03:30 PM',
          placeName: mockActivitiesPool[actIndex2].placeName,
          activityDescription: `Immersive journey focusing on local community impact. ` + mockActivitiesPool[actIndex2].activityDescription,
          foodSuggestion: mockActivitiesPool[actIndex2].foodSuggestion,
          tips: mockActivitiesPool[actIndex2].tips,
          travelTime: '30 mins transit',
          location: mockActivitiesPool[actIndex2].location,
          imageUrl: mockActivitiesPool[actIndex2].imageUrl
        }
      ]
    });
  }

  return {
    summary: `A personalized ${actualDays}-day premium route designed by TNSTN Smart Planner, starting from ${startPlace}. By prioritizing local businesses and artisan workshops, this travel outline supports approximately 18 local families and 4 community heritage projects across central and southern districts.`,
    itinerary
  };
}

function getMockBotResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes('madurai') || msg.includes('temple')) {
    return `### 🏛️ Ancient Heritage of Madurai
For 3 days in **Madurai**, I highly recommend starting with the grand **Meenakshi Amman Temple**:
- **05:30 AM**: Attend the Morning milk Puja before crowds accumulate. Focus on the majestic **Southern Gopuram** (tallest tower) and the **Thousand Pillar Hall** showing monolithic cosmic carvings!
- **Hidden Gem recommendation**: Visit **Puthu Mandapam**, an old stone market hall where tailors and bronze sculptors have worked side-by-side since the Nayak dynasty.
- **Local Economy Tip**: Get a traditional hand-woven **Sungudi cotton saree** from the weavers' cooperative directly off East Chitrai street to support local weavers!`;
  }
  if (msg.includes('waterfall') || msg.includes('coimbatore')) {
    return `### 🌿 Hidden Waterfalls near Coimbatore
While tourists flock to main sites, I suggest these underrated nature escapes:
- **Siruvani Waterfalls**: Located deep within the reserve forest of the Western Ghats, renowned for having the second sweetest drinking water on the entire globe!
- **Monkey Falls**: Located on the foothills of Valparai, perfect for a refreshing spring immersion.
- **Crowd Intel**: Saturdays and Sundays are highly congested. Best to arrive **between 08:30 AM and 10:30 AM** on weekdays for full tranquility.
- **Eco-tourism impact**: Booking through the **Anamalai Tiger Reserve Eco-Dev Committee** directly coordinates funds back to local tribal protection rangers.`;
  }
  if (msg.includes('chettinad') || msg.includes('food')) {
    return `### 🍛 Gastronomy Journey in Chettinad
Chettinad cuisine is legendary for its fresh, dry-roasted spices and stone-ground spices:
- **Crucial Foods to try**: **Kandandhree Sambar**, fluffy **Kuzhi Paniyaram**, crispy **Athangudi Murukku**, and aromatic **Chettinad Pepper Masala** prepared in local clay pots.
- **Artisan Hotspot**: Drop by **Athangudi Village** to witness the master tile makers who manually hand-pour cement-colored designs on glass templates. They look beautiful and last for centuries!
- **Traditional Shop**: Look for brass-ware and vintage Burma teak cabinets at the **Karaikudi Antique Market** near the central town temple.`;
  }
  if (msg.includes('crowd') || msg.includes('less')) {
    return `### 👥 Smarter Crowd Avoidance Recommendations
To experience the pure serenity of Tamil Nadu:
- **Brihadeeswarar (Thanjavur)**: Walk the outer granite grounds between **04:30 PM & 06:15 PM**. The direct sunset turns the towering Vimana golden, and the heat absorbs back into the ground keeping tiles cool.
- **Pichavaram Mangroves**: Hire a private rowboat at **08:00 AM sharp** when only the quiet mist is kissing the Rhizophora branches and Siberian birds are waking.
- **Dhanushkodi ghost town**: Arrive at sunrise (**06:00 AM**) when ocean waters look glass-clear and navy-blue before daylight tourist buses enter after 09:30 AM.`;
  }

  return `### Hello Explorer! 👋
I am **Vaigai**, your intelligent TNSTN travel concierge. I'm trained on **Tamil Nadu's 38 districts** and major historical dynasties:
- Ask me for **hidden waterfalls, rural routes, or Chola temple architecture secrets**.
- Ask about **Chettinad cuisine hotspots** or **where to watch local artisans work**.
- Try asking: *"What food should I try in Chettinad?"* or *"Suggest hidden waterfalls near Coimbatore."*

Let me know how I can organize your Tamil Nadu adventure!`;
}

// Dev and Production delivery setup
if (process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Integrate Vite dev middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[TNSTN Server] Running live at http://0.0.0.0:${PORT}`);
});
