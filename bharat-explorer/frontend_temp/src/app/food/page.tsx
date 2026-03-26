"use client";

import { useState } from 'react';
import { Coffee, MapPin, Star, Utensils, Search, Filter, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Food() {
    const [searchQuery, setSearchQuery] = useState('');
    const [internetResults, setInternetResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setHasSearched(false);
            setInternetResults([]);
            return;
        }

        setIsSearching(true);
        setHasSearched(true);
        try {
            const res = await fetch(`/api/search-images?q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setInternetResults(data.results || []);
        } catch (error) {
            console.error("Failed to fetch internet results:", error);
            setInternetResults([]);
        }
        setIsSearching(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Food Background */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1711153419402-336ee48f2138?auto=format&fit=crop&w=1920" 
                        alt="Indian Food Background" 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center justify-center p-4 bg-orange-500/20 backdrop-blur-xl rounded-2xl mb-6 border border-white/10">
                            <Utensils className="w-8 h-8 text-orange-400" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase drop-shadow-2xl">
                            Culinary Journey
                        </h1>
                        <p className="text-white/90 text-xl font-medium leading-relaxed italic mb-12 drop-shadow-lg">
                            "India's culture is reflected in its flavours." Explore the diverse, vibrant soul of Indian cuisine.
                        </p>

                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-[2.6rem] blur opacity-25 group-focus-within:opacity-50 transition-opacity duration-500"></div>
                            <div className="relative flex">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Which flavor are you looking for today?" 
                                    className="w-full pl-16 pr-40 py-6 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-slate-400 font-bold text-lg transition-all shadow-2xl"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        if (!e.target.value.trim()) setHasSearched(false);
                                    }}
                                />
                                <button type="submit" disabled={isSearching} className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 outline-none text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50">
                                    {isSearching ? "..." : "Search"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                {hasSearched ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                                Discoveries for "{searchQuery}"
                            </h2>
                            <p className="text-slate-500 font-medium italic">
                                We've handpicked the most authentic visual matches for your craving!
                            </p>
                        </div>
                        
                        {isSearching ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {internetResults.length > 0 ? internetResults.map((item: any, i: number) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="relative rounded-[2rem] overflow-hidden group shadow-lg bg-slate-100 cursor-pointer aspect-square"
                                    >
                                        <img 
                                            src={item.url} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <h3 className="font-bold text-white text-sm md:text-base capitalize line-clamp-2">
                                                {item.title.replace(/\.(jpeg|jpg|png|gif)/i, '')}
                                            </h3>
                                            <div className="mt-2 flex items-center text-[10px] md:text-xs text-orange-400 font-black uppercase tracking-widest">
                                                {item.source}
                                            </div>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-slate-100 border-dashed">
                                        <p className="text-slate-400 font-bold italic">No visual matches found yet. Try searching for "Masala Dosa" or "Butter Chicken"!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-20">
                        {[
                            { title: "Regional Classics", desc: "Discover authentic dishes from every Indian state.", icon: <MapPin className="w-6 h-6 text-orange-500" /> },
                            { title: "Street Icons", desc: "Explore the vibrant world of famous Indian street food.", icon: <Utensils className="w-6 h-6 text-orange-500" /> },
                            { title: "Sweet Soul", desc: "Indulge in the legendary desserts of the subcontinent.", icon: <Star className="w-6 h-6 text-orange-500" /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 text-center"
                            >
                                <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tighter">{item.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
