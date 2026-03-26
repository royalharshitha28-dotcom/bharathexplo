"use client";

import { motion } from 'framer-motion';
import { Star, MapPin, Coffee, Wifi, Tv, Wind, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Hotels() {
    const [activeTab, setActiveTab] = useState('Luxury');

    const hotels = [
        {
            name: "The Taj Mahal Palace",
            location: "Mumbai, Maharashtra",
            price: "₹25,000",
            rating: 5.0,
            type: "Luxury",
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            features: ["Ocean View", "Historical", "Spa"]
        },
        {
            name: "Oberoi Amarvilas",
            location: "Agra, Uttar Pradesh",
            price: "₹35,000",
            rating: 4.9,
            type: "Luxury",
            img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
            features: ["Taj View", "Pool", "Fine Dining"]
        },
        {
            name: "Rambagh Palace",
            location: "Jaipur, Rajasthan",
            price: "₹45,000",
            rating: 5.0,
            type: "Heritage",
            img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            features: ["Palace Stay", "Garden", "Royal Service"]
        },
        {
            name: "Umaid Bhawan",
            location: "Jodhpur, Rajasthan",
            price: "₹50,000",
            rating: 4.9,
            type: "Heritage",
            img: "https://images.unsplash.com/photo-1564501049412-61c2a114864a?w=800&q=80",
            features: ["Architecture", "Museum", "Luxury"]
        },
        {
            name: "Wildflower Hall",
            location: "Shimla, Himachal",
            price: "₹20,000",
            rating: 4.8,
            type: "Resort",
            img: "https://images.unsplash.com/photo-1551882547-ff43c33ff783?w=800&q=80",
            features: ["Mountain View", "Hiking", "Silence"]
        },
        {
            name: "Kumarakom Lake Resort",
            location: "Kumarakom, Kerala",
            price: "₹18,000",
            rating: 4.7,
            type: "Resort",
            img: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?w=800&q=80",
            features: ["Backwaters", "Ayurveda", "Private Pool"]
        }
    ];

    const filteredHotels = activeTab === 'All' ? hotels : hotels.filter(h => h.type === activeTab);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Premium Stays</h1>
                        <p className="text-slate-600 text-lg max-w-2xl">Experience world-class hospitality in the most iconic hotels across India.</p>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'Luxury', 'Heritage', 'Resort'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-sm
                                    ${activeTab === tab 
                                        ? 'bg-orange-600 text-white shadow-orange-200 ring-4 ring-orange-50' 
                                        : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center shadow-lg">
                                    <Star className="w-4 h-4 text-orange-500 fill-current" />
                                    <span className="ml-1.5 font-bold text-slate-800">{hotel.rating}</span>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-orange-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-2xl text-sm font-bold shadow-lg">
                                        {hotel.type}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{hotel.name}</h3>
                                    <p className="text-orange-600 font-black text-lg">{hotel.price}/night</p>
                                </div>
                                <div className="flex items-center text-slate-500 mb-6 text-sm">
                                    <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                    {hotel.location}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {hotel.features.map(feature => (
                                        <span key={feature} className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-4 gap-4 py-4 border-t border-slate-100">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                            <Wifi className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                            <Coffee className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                            <Tv className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                            <Wind className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-4 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 group">
                                    Book Now
                                    <ShieldCheck className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
