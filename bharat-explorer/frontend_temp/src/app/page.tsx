"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Compass, Sparkles, MapPin, Search, X, Map as MapIcon, Globe, ArrowRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Atmosphere, AtmosphereType } from '@/components/Atmosphere';
import { AnimatePresence, motion } from 'framer-motion';
import { places } from '@/data/destinations';

const InteractiveMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full rounded-2xl bg-slate-200 animate-pulse flex items-center justify-center text-slate-500 font-medium">Loading Interactive Map...</div>
});

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('');
  const [atmosphere, setAtmosphere] = useState<AtmosphereType>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    // ... atmosphere logic ...
    if (query.includes('manali') || query.includes('snow') || query.includes('winter') || query.includes('rohtang') || query.includes('kedarnath') || query.includes('himalayas') || query.includes('leh')) {
      setAtmosphere('snow');
    } else if (query.includes('nature') || query.includes('forest') || query.includes('green') || query.includes('munnar') || query.includes('ooty') || query.includes('valley') || query.includes('park') || query.includes('lake') || query.includes('falls') || query.includes('coorg')) {
      setAtmosphere('nature');
    } else if (query.includes('desert') || query.includes('sand') || query.includes('kutch') || query.includes('rajasthan') || query.includes('jaisalmer') || query.includes('nubra')) {
      setAtmosphere('desert');
    } else if (query.includes('beach') || query.includes('water') || query.includes('sea') || query.includes('ocean') || query.includes('goa') || query.includes('island') || query.includes('varkala')) {
      setAtmosphere('beach');
    } else {
      setAtmosphere(null);
    }
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return places
      .filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query) ||
        p.type.some(t => t.toLowerCase().includes(query)) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.history.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/destinations?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Atmosphere type={atmosphere} />
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
            alt="India Landscape"
            className="w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-medium mb-8">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>AI-Powered Travel Guide for India</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight leading-tight">
            Discover the Soul of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Bharat</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 mb-10 max-w-3xl mx-auto drop-shadow-md font-medium">
            Your smart companion to explore historical monuments, spiritual retreats, and hidden gems across India.
          </p>

          {/* Impressive Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto group relative mb-10 z-30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl px-6 py-4">
              <Search className="w-6 h-6 text-orange-400 mr-4" />
              <input 
                type="text" 
                placeholder="Search by monument, city, or state..." 
                className="bg-transparent border-none focus:ring-0 w-full text-white font-bold placeholder:text-white/60 text-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2">
                  <X className="w-4 h-4 text-white/60" />
                </button>
              )}
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs">
                Search
              </button>
            </div>

            <AnimatePresence>
              {showSuggestions && (searchQuery.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-3xl border border-slate-100 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-[100] overflow-hidden text-left"
                >
                  <div className="px-6 py-3 border-b border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results</span>
                    <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" />
                  </div>

                  {suggestions.length > 0 ? (
                    suggestions.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => {
                          setSearchQuery(p.name);
                          setShowSuggestions(false);
                        }}
                        className="w-full flex items-center px-6 py-4 hover:bg-orange-50/50 transition-all text-left border-b border-slate-50 last:border-none group"
                      >
                        <div className="w-12 h-12 rounded-2xl overflow-hidden mr-4 shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                          <img src={p.img} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight text-sm">{p.name}</p>
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
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Trending Section (Google Style) */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] w-full mb-2">Trending Destinations</span>
            {['Varanasi', 'Munnar', 'Hampi', 'Rajasthan Forts', 'Kerala Nature'].map(trend => (
              <button
                key={trend}
                onClick={() => {
                  setSearchQuery(trend);
                  router.push(`/destinations?q=${encodeURIComponent(trend)}`);
                }}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white/80 font-bold text-xs transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 group"
              >
                <Sparkles className="w-3 h-3 text-orange-400 group-hover:rotate-12 transition-transform" />
                {trend}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-xl">
              All Destinations <Compass className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/plan" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-xl">
              Create AI Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Map Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore the Map</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Discover destinations by category, view real-time crowd predictions, and uncover hidden gems nearby.</p>
        </div>

        <InteractiveMap />
      </section>

      {/* Feature Highlights Mockup */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Smart Travel AI", desc: "Get personalized itineraries based on your specific interests, budget, and time.", icon: Sparkles },
              { title: "Meet the Locals", desc: "Connect with verified locals for authentic experiences, street food, and hidden spots.", icon: MapPin },
              { title: "Cultural Insights", desc: "Dive deep with AI-generated cultural summaries and historical significance of monuments.", icon: Compass }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
