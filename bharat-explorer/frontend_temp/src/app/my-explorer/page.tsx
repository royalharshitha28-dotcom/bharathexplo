"use client";

import { useAuth } from '@/context/AuthContext';
import { places } from '@/data/destinations';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Clock, IndianRupee, Trash2, Heart, Sparkles, ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MyExplorer() {
    const { itinerary, likes, toggleItinerary, toggleLike } = useAuth();
    const [activeTab, setActiveTab] = useState<'itinerary' | 'likes'>('itinerary');

    const itineraryPlaces = places.filter(p => itinerary.includes(p.name));
    const likedPlaces = places.filter(p => likes.includes(p.name));

    const currentPlaces = activeTab === 'itinerary' ? itineraryPlaces : likedPlaces;

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">My Explorer</h1>
                        <p className="text-slate-500 font-medium text-lg">Your curated collection of Bharat's wonders.</p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                        <button 
                            onClick={() => setActiveTab('itinerary')}
                            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'itinerary' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Itinerary ({itineraryPlaces.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('likes')}
                            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'likes' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Favorites ({likedPlaces.length})
                        </button>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {currentPlaces.length > 0 ? (
                            currentPlaces.map((place, i) => (
                                <motion.div
                                    key={place.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group"
                                >
                                    <div className="relative h-64">
                                        <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-6 right-6 flex gap-2">
                                            <button 
                                                onClick={() => toggleLike(place.name)}
                                                className={`p-3 rounded-full backdrop-blur-md transition-all ${likes.includes(place.name) ? 'bg-orange-500 text-white' : 'bg-black/20 text-white border border-white/20'}`}
                                            >
                                                <Heart className={`w-5 h-5 ${likes.includes(place.name) ? 'fill-white' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            {place.tags.slice(0, 2).map((t: string) => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">{t}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{place.name}</h3>
                                        <p className="text-slate-500 text-sm font-bold flex items-center mb-6">
                                            <MapPin className="w-4 h-4 mr-1 text-orange-500" /> {place.location}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <button 
                                                onClick={() => toggleItinerary(place.name)}
                                                className={`flex items-center space-x-2 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'itinerary' ? 'text-rose-500 hover:text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Remove</span>
                                            </button>
                                            
                                            <Link href="/destinations" className="bg-slate-900 text-white p-3 rounded-xl hover:bg-orange-500 transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-32 text-center"
                            >
                                <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                    <Compass className="w-10 h-10 text-slate-300" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Nothing here yet</h2>
                                <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto">Start exploring Bharat and save your favorite spots to build your dream itinerary!</p>
                                <Link 
                                    href="/destinations"
                                    className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-xl active:scale-95"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Explore Destination
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
