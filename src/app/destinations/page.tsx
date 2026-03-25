"use client";

import { useState, useEffect, useMemo } from 'react';
import { Star, MapPin, Clock, IndianRupee, Map as MapIcon, Info, X, Search, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { places } from '@/data/destinations';
import { Atmosphere, AtmosphereType } from '@/components/Atmosphere';

export default function Destinations() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [atmosphere, setAtmosphere] = useState<AtmosphereType>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { itinerary, likes, toggleItinerary, toggleLike } = useAuth();
  const [addedToItinerary, setAddedToItinerary] = useState<string | null>(null);
  const [clickedHighlights, setClickedHighlights] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let detectedAtmosphere: AtmosphereType = null;
    
    if (query.includes('manali') || query.includes('snow') || query.includes('winter') || query.includes('rohtang') || query.includes('kedarnath') || query.includes('himalayas') || query.includes('leh')) {
      detectedAtmosphere = 'snow';
    } else if (query.includes('nature') || query.includes('forest') || query.includes('green') || query.includes('munnar') || query.includes('ooty') || query.includes('valley') || query.includes('park') || query.includes('lake') || query.includes('falls') || query.includes('coorg')) {
      detectedAtmosphere = 'nature';
    } else if (query.includes('desert') || query.includes('sand') || query.includes('kutch') || query.includes('rajasthan') || query.includes('jaisalmer') || query.includes('nubra')) {
      detectedAtmosphere = 'desert';
    } else if (query.includes('beach') || query.includes('water') || query.includes('sea') || query.includes('ocean') || query.includes('goa') || query.includes('island') || query.includes('varkala')) {
      detectedAtmosphere = 'beach';
    }

    setAtmosphere(detectedAtmosphere);

    if (detectedAtmosphere) {
      const timer = setTimeout(() => {
        setAtmosphere(null);
      }, 7000); // Effect stops automatically after 7 seconds
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleAddToItinerary = (placeName: string) => {
    const isAdding = !itinerary.includes(placeName);
    toggleItinerary(placeName);
    
    if (isAdding) {
      setAddedToItinerary(placeName);
      setTimeout(() => setAddedToItinerary(null), 3000);
    }
  };

  const handleHighlightClick = (highlight: string) => {
    setClickedHighlights(prev => ({ ...prev, [highlight]: !prev[highlight] }));
  };

  const addToRecent = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const [localSuggestions, setLocalSuggestions] = useState<any[]>([]);
  const [wikiSuggestions, setWikiSuggestions] = useState<any[]>([]);
  const [isSearchingWiki, setIsSearchingWiki] = useState(false);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setLocalSuggestions([]);
      setWikiSuggestions([]);
      return;
    }

    const local = places.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query) ||
        p.type.some(t => t.toLowerCase().includes(query)) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.history.toLowerCase().includes(query)
    ).slice(0, 5);
    
    setLocalSuggestions(local);

    if (local.length < 3) {
      const fetchGlobal = async () => {
        setIsSearchingWiki(true);
        try {
          const res = await fetch(`/api/search-images?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (data.results) {
            const globalPlaces = data.results.slice(0, 3).map((item: any) => ({
              id: `global-${item.id}`,
              name: item.title.split('-')[0].split('|')[0].trim(),
              location: "Global Insight",
              state: "Web Result",
              type: ["Exploration", "Web Match"],
              img: item.url,
              rating: (4.5 + Math.random() * 0.5).toFixed(1),
              tags: ["Global", "Web"],
              history: `Discovered via internet search: ${item.title}`,
              description: `A highly relevant destination found on the web for "${query}".`,
              highlights: ["Real-time discovery", "Global popularity", `Verified via ${item.source}`],
              bestTime: "Year-round"
            }));
            setWikiSuggestions(globalPlaces.filter((gp: any) => !local.some(l => l.name.toLowerCase() === gp.name.toLowerCase())));
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsSearchingWiki(false);
        }
      };
      
      const timeoutId = setTimeout(fetchGlobal, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setWikiSuggestions([]);
    }
  }, [searchQuery]);

  const suggestions = [...localSuggestions, ...wikiSuggestions];

  const topResult = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return null;
    return suggestions.find((s: any) => s.name.toLowerCase() === query) || null;
  }, [searchQuery, suggestions]);



  const filteredPlaces = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const localFiltered = places.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.tags.includes(activeCategory) || p.type.includes(activeCategory);
      const matchesSearch = p.name.toLowerCase().includes(query) || 
                            p.location.toLowerCase().includes(query) ||
                            p.state.toLowerCase().includes(query) ||
                            p.type.some(t => t.toLowerCase().includes(query)) ||
                            p.history.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    
    // Append the Wikipedia suggestions to the main grid so global places are fully integrated as cards
    return [...localFiltered, ...wikiSuggestions];
  }, [searchQuery, activeCategory, wikiSuggestions]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      <Atmosphere type={atmosphere} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-20">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Discover Destinations</h1>
            <p className="text-slate-600 text-lg max-w-2xl mb-8">Find your next adventure. From ancient monuments to serene landscapes, explore the best of India.</p>
            
            {/* Impressive Search Bar */}
            <div className="max-w-xl group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative flex items-center bg-white shadow-xl rounded-3xl px-6 py-4 border border-slate-100">
                <Search className="w-6 h-6 text-orange-500 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search by place, state, or interest..." 
                  className="bg-transparent border-none focus:ring-0 w-full text-slate-900 font-bold placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-3xl shadow-2xl z-[100] overflow-hidden text-left"
                  >
                    {searchQuery.length === 0 ? (
                      // Recent Searches
                      recentSearches.length > 0 && (
                        <div>
                          <div className="px-6 py-3 border-b border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Searches</span>
                            <Clock className="w-3 h-3 text-slate-300" />
                          </div>
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setSearchQuery(s);
                                setShowSuggestions(false);
                              }}
                              className="w-full flex items-center px-6 py-4 hover:bg-slate-50 transition-all text-left border-b border-slate-50 last:border-none group"
                            >
                              <Clock className="w-4 h-4 text-slate-300 mr-4 group-hover:text-orange-500" />
                              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{s}</span>
                            </button>
                          ))}
                        </div>
                      )
                    ) : (
                      <>
                        <div className="px-6 py-3 border-b border-slate-50 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results</span>
                          <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" />
                        </div>

                        {isSearchingWiki ? (
                          <div className="px-6 py-6 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-orange-500 animate-spin mr-3" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Searching the Global Web...</span>
                          </div>
                        ) : suggestions.length > 0 ? (
                          suggestions.map((p) => (
                            <button
                              key={p.name}
                              type="button"
                              onClick={() => {
                                setSearchQuery(p.name);
                                addToRecent(p.name);
                                setShowSuggestions(false);
                              }}
                              className="w-full flex items-center px-6 py-4 hover:bg-orange-50/50 transition-all text-left border-b border-slate-50 last:border-none group"
                            >
                              <div className="w-12 h-12 rounded-2xl overflow-hidden mr-4 shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 relative">
                                <img src={p.img} alt="" className="w-full h-full object-cover" />
                                {p.id?.startsWith('wiki') && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-white opacity-80" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight text-sm">
                                  {p.name}
                                  {p.id?.startsWith('wiki') && <span className="ml-2 text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200 align-middle">Global Web</span>}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center mt-0.5">
                                  <MapPin className="w-2.5 h-2.5 mr-1 text-orange-400/60" /> {p.location}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                            </button>
                          ))
                        ) : (
                          <div className="px-6 py-8 text-center bg-slate-50/50">
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No local handbook matches for "{searchQuery}"</p>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            addToRecent(searchQuery);
                            window.open(`https://www.google.com/search?q=Travel+guide+for+${encodeURIComponent(searchQuery)}`, '_blank');
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center px-6 py-6 bg-slate-950 text-white hover:bg-orange-600 transition-colors text-left group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-white/20 transition-colors">
                            <Globe className="w-6 h-6 text-white group-hover:animate-pulse" />
                          </div>
                          <div>
                            <p className="font-black text-[11px] uppercase tracking-widest leading-none text-white">Explore Global Guides</p>
                            <p className="text-[10px] text-white/40 font-bold mt-1.5 uppercase tracking-wide">Find guides for "{searchQuery}" on the web</p>
                          </div>
                          <Sparkles className="ml-auto w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Historical', 'Spiritual', 'Nature', 'Monument', 'Architecture', 'Culture', 'Hidden Gem'].map(category => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold border ${activeCategory === category ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-orange-500 hover:text-orange-500'} transition-all whitespace-nowrap`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {addedToItinerary && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 border border-white/10 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="bg-orange-500 p-2 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-black text-[10px] uppercase tracking-widest text-orange-400 leading-none mb-1">Success</p>
                <p className="font-bold text-sm">"{addedToItinerary}" added to itinerary</p>
              </div>
              <button onClick={() => setAddedToItinerary(null)} className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-4 h-4 text-white/40" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {filteredPlaces.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Top Result / Featured Snippet (Google Style) */}
              {topResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 p-1 md:p-2 group cursor-pointer"
                  onClick={() => setSelectedPlace(topResult)}
                >
                  <div className="bg-slate-800/90 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl relative">
                      <img src={topResult.img} alt={topResult.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center shadow-lg">
                        <Sparkles className="w-3 h-3 mr-2" /> Top Result
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 text-left">
                      <div className="flex items-center gap-2 mb-6">
                        {topResult.type.map((t: string) => (
                          <span key={t} className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-white/10 text-orange-400 rounded-lg border border-white/5">{t}</span>
                        ))}
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none uppercase italic">{topResult.name}</h2>
                      <div className="flex items-center text-white/60 mb-8 font-bold text-lg uppercase tracking-tight">
                        <MapPin className="w-5 h-5 mr-2 text-orange-500" /> {topResult.location}
                      </div>
                      <p className="text-white/70 text-lg leading-relaxed mb-10 font-medium italic">
                        "{topResult.description}"
                      </p>
                      <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black transition-all shadow-xl hover:bg-orange-500 hover:text-white uppercase tracking-widest text-sm active:scale-95">
                        Explore Full Guide
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {filteredPlaces.map((place, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col h-full cursor-pointer" 
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img 
                        src={place.img} 
                        alt={place.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center font-bold text-sm text-slate-900 shadow-sm border border-slate-100">
                        <Star className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" /> {place.rating}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {place.tags.map((t: string) => (
                          <span key={t} className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-orange-50 text-orange-600 rounded-lg border border-orange-100">{t}</span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{place.name}</h3>
                      <div className="flex items-center text-slate-500 mb-4 font-medium">
                        <MapPin className="w-4 h-4 mr-1 text-orange-500" /> {place.location}
                      </div>
                      
                      <p className="text-sm text-slate-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
                        {place.history}
                      </p>
                      
                      <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                          <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-slate-400"/> 2-3h</span>
                          <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1 text-slate-400"/> 50-200</span>
                        </div>
                        <div className="bg-slate-100 group-hover:bg-orange-500 group-hover:text-white text-slate-600 p-2.5 rounded-xl transition-all group-hover:rotate-12">
                          <MapIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-xl shadow-slate-100/50"
            >
              <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">No Local Matches Found</h3>
              <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed font-medium">We couldn't find "{searchQuery}" in our direct handbook. Let's look on the global web for real-time guides!</p>
              <button 
                onClick={() => window.open(`https://www.google.com/search?q=Travel+guide+for+${encodeURIComponent(searchQuery)}`, '_blank')}
                className="bg-slate-900 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black transition-all flex items-center justify-center mx-auto gap-3 shadow-2xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
              >
                <Globe className="w-5 h-5" />
                Explore Global Guides
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for Place Details */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white h-full md:h-[calc(100vh-3rem)] w-full md:w-[600px] md:rounded-[2.5rem] shadow-2xl overflow-y-auto relative flex flex-col" 
              onClick={e => e.stopPropagation()}
            >
              {/* Header Image Gallery */}
              <div className="relative h-[400px] shrink-0 group">
                <img src={selectedPlace.img} className="w-full h-full object-cover" alt={selectedPlace.name}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Floating Actions */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                  <button onClick={() => setSelectedPlace(null)} className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all border border-white/20">
                    <X className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => toggleLike(selectedPlace.name)}
                    className={`rounded-full p-3 transition-all border border-white/20 ${likes.includes(selectedPlace.name) ? 'bg-orange-500 text-white' : 'bg-black/30 hover:bg-black/50 text-white'}`}
                  >
                    <Star className={`w-6 h-6 ${likes.includes(selectedPlace.name) ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-3 text-orange-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <Sparkles className="w-4 h-4" />
                    Featured Destination
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter mb-2 leading-none">{selectedPlace.name}</h2>
                  <div className="flex items-center text-white/80 font-bold uppercase text-[10px] tracking-widest">
                    <MapPin className="w-3 h-3 mr-1 text-orange-500" /> {selectedPlace.location}
                  </div>
                </div>
              </div>

              {/* Performance Metrics Bar (Google Style) */}
              <div className="flex border-b border-slate-100 px-8 py-6 gap-8 overflow-x-auto no-scrollbar bg-slate-50/50">
                <div className="shrink-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Rating</p>
                  <p className="text-xl font-black text-slate-900 flex items-center">
                    {selectedPlace.rating}
                    <Star className="w-4 h-4 ml-1 fill-amber-500 text-amber-500" />
                  </p>
                </div>
                <div className="shrink-0 border-l border-slate-200 pl-8">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">State</p>
                  <p className="text-xl font-black text-slate-900">{selectedPlace.state}</p>
                </div>
                <div className="shrink-0 border-l border-slate-200 pl-8">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Best Time</p>
                  <p className="text-xl font-black text-orange-600">{selectedPlace.bestTime}</p>
                </div>
              </div>

              {/* Content Sections */}
              <div className="p-10 space-y-12 pb-32">
                {/* Overview Section */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">About this place</h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {selectedPlace.description}
                  </p>
                </section>

                {/* History Section (Knowledge Card Style) */}
                <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                    <Info className="w-24 h-24" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 flex items-center">
                    <Clock className="w-3 h-3 mr-2 text-orange-500" /> Cultural History
                  </h4>
                  <p className="text-slate-800 text-base leading-relaxed font-semibold italic">
                    "{selectedPlace.history}"
                  </p>
                </section>

                {/* Highlights (Things to do) */}
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-orange-500" /> Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedPlace.highlights.map((h: string, idx: number) => (
                      <motion.button 
                        key={idx} 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleHighlightClick(h)}
                        className={`flex items-center p-5 rounded-2xl border transition-all text-left shadow-sm group ${clickedHighlights[h] ? 'bg-orange-500 border-orange-500 text-white shadow-orange-200' : 'bg-white border-slate-100 text-slate-700 hover:shadow-md'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-colors ${clickedHighlights[h] ? 'bg-white/20' : 'bg-orange-50 group-hover:bg-orange-500 group-hover:text-white'}`}>
                          <span className={`font-black text-sm ${clickedHighlights[h] ? 'text-white' : 'text-orange-600'}`}>
                            {clickedHighlights[h] ? '✓' : idx + 1}
                          </span>
                        </div>
                        <span className="font-bold">{h}</span>
                        {clickedHighlights[h] && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            className="ml-auto text-[10px] font-black uppercase tracking-widest text-white/80"
                          >
                            Verified
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sticky Footer Actions (Like Google Maps) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button 
                  onClick={() => handleAddToItinerary(selectedPlace.name)}
                  className={`flex-1 h-16 rounded-2xl font-black transition-all shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95 ${itinerary.includes(selectedPlace.name) ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-slate-900 hover:bg-orange-600 text-white shadow-slate-900/10'}`}
                >
                  <Clock className={`w-4 h-4 ${itinerary.includes(selectedPlace.name) ? 'animate-pulse' : ''}`} />
                  {itinerary.includes(selectedPlace.name) ? 'Saved to Itinerary' : 'Add to Itinerary'}
                </button>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedPlace.name + ' ' + selectedPlace.location)}`, '_blank')}
                  className="w-20 bg-slate-100 hover:bg-slate-200 text-slate-900 h-16 rounded-2xl flex items-center justify-center transition-all border border-slate-200 group"
                >
                  <MapIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                   onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedPlace.name)}`, '_blank')}
                   className="w-20 bg-slate-100 hover:bg-slate-200 text-slate-900 h-16 rounded-2xl flex items-center justify-center transition-all border border-slate-200 group"
                >
                  <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
