"use client";

import { MessageCircle, ShieldCheck, MapPin, Search, MoreHorizontal, Info, Verified, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function MeetLocals() {
    const [searchQuery, setSearchQuery] = useState('');
    
    const guides = [
        { id: 1, name: 'Rahul S.', city: 'Jaipur', active: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80', status: 'Online • Verified Jaipur Guide', tag: 'Expert' },
        { id: 2, name: 'Anjali D.', city: 'Varanasi', active: false, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80', status: 'Away • Spiritual Expert', tag: 'Top Rated' },
        { id: 3, name: 'Kiran M.', city: 'Kerala', active: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', status: 'Offline • Backwater Specialist', tag: 'Verified' },
        { id: 4, name: 'Vikram K.', city: 'Delhi', active: false, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', status: 'Away • History Buff', tag: 'Popular' }
    ];

    const filteredGuides = guides.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-5 bg-orange-100 text-orange-600 rounded-[2rem] mb-8 shadow-inner">
                        <MessageCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">Local Insights</h1>
                    <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed italic">
                      "To know a place, talk to its people." Connect with our safety-verified local guides for a journey that goes beyond the guidebooks.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8 h-[750px] relative">
                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col"
                    >
                        <div className="p-8 border-b border-slate-100 bg-white">
                            <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-6">Safety Verified Guides</h3>
                            <div className="relative group">
                                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Find a city..." 
                                    className="w-full bg-slate-50 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold text-slate-700 border-2 border-transparent focus:border-orange-500/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
                            <AnimatePresence>
                                {filteredGuides.map((guide, i) => (
                                    <motion.div 
                                        layout
                                        key={guide.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`p-5 rounded-[2rem] cursor-pointer flex items-center transition-all mb-2 ${guide.active ? 'bg-orange-50/50 border border-orange-100/50' : 'hover:bg-slate-50'}`}
                                    >
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-200 mr-4 overflow-hidden border-2 border-white shadow-md">
                                                <img src={guide.img} alt={guide.name} className="w-full h-full object-cover" />
                                            </div>
                                            {guide.active && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-black text-sm text-slate-900 flex items-center mb-0.5 uppercase tracking-tighter">
                                                {guide.name} <ShieldCheck className="w-3.5 h-3.5 text-blue-500 ml-1.5" />
                                            </div>
                                            <div className="text-[10px] text-slate-500 flex items-center font-bold uppercase tracking-widest leading-none">
                                                <MapPin className="w-3 h-3 mr-1 text-orange-500" /> {guide.city}
                                            </div>
                                        </div>
                                        {guide.active && (
                                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Chat Window */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-3 bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden relative"
                    >
                        <div className="p-8 border-b border-slate-50 bg-white/80 backdrop-blur-xl flex items-center justify-between z-10">
                            <div className="flex items-center">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 mr-6 overflow-hidden shadow-xl border-2 border-white group relative">
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" alt="Rahul" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                </div>
                                <div>
                                    <div className="font-black text-slate-900 flex items-center text-2xl tracking-tighter uppercase mb-0.5">
                                        Rahul S. <Verified className="w-5 h-5 text-blue-500 ml-2" />
                                    </div>
                                    <div className="text-xs text-green-600 font-black flex items-center uppercase tracking-widest italic drop-shadow-sm">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                        Online • Verified Platinum Guide
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm">
                                    <Info className="w-6 h-6" />
                                </button>
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm">
                                    <MoreHorizontal className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-10 space-y-10 overflow-y-auto bg-gradient-to-b from-white to-slate-50/50 relative z-0 custom-scrollbar">
                            {/* Date Divider */}
                            <div className="flex justify-center mb-8">
                                <span className="text-[10px] font-black text-slate-400 bg-white px-5 py-2 rounded-full border border-slate-100 shadow-sm uppercase tracking-[0.2em] italic">Tuesday, March 19</span>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white border border-slate-100 text-slate-800 p-6 rounded-[2rem] rounded-tl-sm max-w-lg shadow-sm text-[15px] font-medium leading-relaxed relative">
                                    Namaste! Welcome to Jaipur! I've been guiding here for 12 years. Let me know if you need any uncrowded spots near Hawa Mahal or the best street food hubs. 🕌✨
                                    <div className="text-[9px] text-slate-300 mt-4 font-black text-right uppercase tracking-widest italic">10:42 AM • Seen</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-end"
                            >
                                <div className="bg-slate-900 text-white p-6 rounded-[2rem] rounded-tr-sm max-w-lg shadow-2xl shadow-slate-900/10 text-[15px] font-medium leading-relaxed relative">
                                    Yes please! Searching for the best view for photography without the usual tourist crowds.
                                    <div className="text-[9px] text-white/30 mt-4 font-black uppercase tracking-widest italic text-right">10:45 AM</div>
                                    <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-start pt-4"
                            >
                                <div className="flex-shrink-0 mr-4 self-end mb-2">
                                    <div className="w-8 h-8 rounded-xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-orange-500/20">
                                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-100 text-slate-800 p-6 rounded-[2rem] rounded-bl-sm max-w-lg shadow-sm text-[15px] font-medium leading-relaxed">
                                    Go to the "Wind View Cafe" opposite the monument. Order a hot spice chai, and head to their hidden top terrace. Best sunset view guaranteed! I'll ping you the GPS coordinates. ☕📸
                                    <div className="text-[9px] text-slate-300 mt-4 font-black text-right uppercase tracking-widest italic">10:46 AM</div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="p-8 bg-white/80 backdrop-blur-xl z-10 border-t border-slate-50">
                            <div className="flex items-center bg-slate-50 border-2 border-transparent focus-within:border-orange-500/20 focus-within:bg-white rounded-[2rem] p-2 transition-all shadow-inner relative group">
                                <input 
                                    type="text" 
                                    placeholder="Type your curious questions here..." 
                                    className="flex-1 p-4 px-6 bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-300" 
                                />
                                <button className="bg-slate-900 text-white p-4 px-8 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-600/30 hover:-translate-y-1 transition-all flex items-center group/send">
                                    Send
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
