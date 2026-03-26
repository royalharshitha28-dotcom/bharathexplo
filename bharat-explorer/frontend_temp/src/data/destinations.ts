export interface Place {
  name: string;
  location: string;
  state: string;
  type: string[];
  rating: number;
  img: string;
  tags: string[];
  history: string;
  description: string;
  highlights: string[];
  bestTime: string;
}

export const places: Place[] = [
  // NORTH INDIA
  { 
    name: "Taj Mahal", 
    location: "Agra, Uttar Pradesh", 
    state: "Uttar Pradesh",
    type: ["Monument", "Wonder", "Architecture"],
    rating: 4.9, 
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200", 
    tags: ["Historical", "Monument", "Architecture"],
    history: "A UNESCO World Heritage site built by Shah Jahan in memory of his wife Mumtaz Mahal.",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India.",
    highlights: ["Sunrise view", "Marble architecture", "River Yamuna backdrop"],
    bestTime: "October to March"
  },
  { 
    name: "Varanasi Ghats", 
    location: "Varanasi, Uttar Pradesh", 
    state: "Uttar Pradesh",
    type: ["Sacred", "River", "Culture"],
    rating: 4.8, 
    img: "https://images.unsplash.com/photo-1706186568052-ce7990870b68?auto=format&fit=crop&w=1200", 
    tags: ["Spiritual", "Culture", "Sacred"],
    history: "One of the oldest living cities in the world, dedicated to Lord Shiva.",
    description: "Varanasi is a city on the Ganges river in northern India that has a central place in pilgrimage, death, and mourning in the Hindu world.",
    highlights: ["Ganga Aarti", "Boat Ride", "Golden Temple"],
    bestTime: "November to February"
  },
  { 
    name: "Munnar Tea Gardens", 
    location: "Idukki, Kerala", 
    state: "Kerala",
    type: ["Nature", "Hill Station", "Plantation"],
    rating: 4.9, 
    img: "https://images.unsplash.com/photo-1723214520491-7f90eeda2cdd?auto=format&fit=crop&w=1200", 
    tags: ["Nature", "Relaxation", "Hill Station"],
    history: "Originally a summer resort of the erstwhile British Government in South India.",
    description: "Munnar is a town and hill station located in the Idukki district of the southwestern Indian state of Kerala.",
    highlights: ["Eravikulam National Park", "Anamudi Peak", "Tea Museum"],
    bestTime: "September to March"
  },
  { 
    name: "Ooty (Nilgiris)", 
    location: "Nilgiris, Tamil Nadu", 
    state: "Tamil Nadu",
    type: ["Nature", "Hill Station", "Nilgiris"],
    rating: 4.8, 
    img: "https://images.unsplash.com/photo-1708526183947-6d529e790065?auto=format&fit=crop&w=1200", 
    tags: ["Nature", "Hill Station", "Nilgiris"],
    history: "Known as Udhagamandalam, it was the summer capital of the Madras Presidency.",
    description: "Udhagamandalam is a town and municipality in the Nilgiris district of the Indian state of Tamil Nadu.",
    highlights: ["Toy Train", "Botanical Garden", "Ooty Lake"],
    bestTime: "April to June"
  },
  { 
    name: "Hawa Mahal", 
    location: "Jaipur, Rajasthan", 
    state: "Rajasthan",
    type: ["Palace", "Architecture", "Heritage"],
    rating: 4.7, 
    img: "https://images.unsplash.com/photo-1617516202907-ff75846e6667?auto=format&fit=crop&w=1200", 
    tags: ["Historical", "Architecture", "Heritage"],
    history: "Built by Maharaja Sawai Pratap Singh in 1799 in the form of Krishna's crown.",
    description: "Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace.",
    highlights: ["Jharokhas (Windows)", "Pink Sandstone", "Royal View"],
    bestTime: "October to March"
  },
  { 
    name: "Golden Temple", 
    location: "Amritsar, Punjab", 
    state: "Punjab",
    type: ["Sacred", "Temple", "Architecture"],
    rating: 5.0, 
    img: "https://images.unsplash.com/photo-1623059508779-2542c6e83753?auto=format&fit=crop&w=1200", 
    tags: ["Spiritual", "Culture", "Architecture"],
    history: "The holiest Gurdwara of Sikhism, built around a man-made pool.",
    description: "The Golden Temple, also known as Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India.",
    highlights: ["Amrit Sarovar", "Langar (Community Meal)", "Gold Leafing"],
    bestTime: "October to March"
  },
  { 
    name: "Ruins of Hampi", 
    location: "Hampi, Karnataka", 
    state: "Karnataka",
    type: ["Historical", "Ruins", "UNESCO"],
    rating: 4.9, 
    img: "https://images.unsplash.com/photo-1616606484004-5ef3cc46e39d?auto=format&fit=crop&w=1200", 
    tags: ["Historical", "Architecture", "Heritage"],
    history: "The capital of the Vijayanagara Empire in the 14th century.",
    description: "Hampi is an ancient village in the south Indian state of Karnataka. It's dotted with numerous ruined temple complexes.",
    highlights: ["Virupaksha Temple", "Stone Chariot", "Tungabhadra River"],
    bestTime: "October to February"
  },
  { 
    name: "Jaisalmer Fort", 
    location: "Jaisalmer, Rajasthan", 
    state: "Rajasthan",
    type: ["Fort", "Desert", "UNESCO"],
    rating: 4.8, 
    img: "https://images.unsplash.com/photo-1732022648903-737e66c18b08?auto=format&fit=crop&w=1200", 
    tags: ["Historical", "Architecture", "Heritage"],
    history: "Known as the 'Golden Fort,' built in 1156 AD by the Rajput Rawal Jaisal.",
    description: "Jaisalmer Fort is situated in the city of Jaisalmer, in the Indian state of Rajasthan. It is one of the very few 'living forts'.",
    highlights: ["Sand Dune Safari", "Gadisar Lake", "Patwon Ki Haveli"],
    bestTime: "November to March"
  },
  { 
    name: "Alleppey Backwaters", 
    location: "Alappuzha, Kerala", 
    state: "Kerala",
    type: ["Nature", "Water", "Houseboat"],
    rating: 4.9, 
    img: "https://images.unsplash.com/photo-1707893013488-51672ef83425?auto=format&fit=crop&w=1200", 
    tags: ["Nature", "Relaxation", "Canals"],
    history: "A historical trade hub known as the 'Venice of the East'.",
    description: "Alappuzha is a city in the Indian state of Kerala. It is famous for its backwaters and houseboats.",
    highlights: ["Houseboat Cruise", "Vembanad Lake", "Paddy Fields"],
    bestTime: "September to March"
  },
  { 
    name: "Red Fort", 
    location: "Old Delhi", 
    state: "Delhi",
    type: ["Fort", "Monument", "Architecture"],
    rating: 4.8, 
    img: "https://images.unsplash.com/photo-1685790582503-1b2762d95407?auto=format&fit=crop&w=1200", 
    tags: ["Historical", "Monument", "Heritage"],
    history: "Built by Shah Jahan when he shifted his capital from Agra to Delhi.",
    description: "The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.",
    highlights: ["Diwan-i-Aam", "Lahori Gate", "Sound & Light Show"],
    bestTime: "October to March"
  }
];
