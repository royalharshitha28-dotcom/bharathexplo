"use client";

import { useState } from 'react';
import { Sparkles, Send, MapPin, Calendar, Compass, Shield, Phone, AlertTriangle, ArrowLeft, Download, Share2, Star, Clock, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Planner() {
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState(3);
    const [interests, setInterests] = useState<string[]>([]);
    const [plan, setPlan] = useState<any>(null);

    const toggleInterest = (interest: string) => {
        setInterests(prev => 
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const [saved, setSaved] = useState(false);

    const generatePlan = async () => {
        if (!destination.trim()) return;
        setLoading(true);
        
        try {
            // Simulate generation delay for realism
            await new Promise(resolve => setTimeout(resolve, 1800));
            
            const selectedInterests = interests.length > 0 ? interests : ['Heritage', 'Nature'];
            
            // Smart template-based itinerary generator
            const timeSlots = ['Morning', 'Afternoon', 'Evening'];
            const activityTemplates: Record<string, string[]> = {
                Heritage: [
                    `Morning: Visit the historic old town and iconic monuments of ${destination}`,
                    `Afternoon: Explore ancient forts and heritage museums`,
                    `Afternoon: Guided tour of UNESCO-listed heritage sites`,
                    `Morning: Photography walk through heritage districts`,
                ],
                Nature: [
                    `Morning: Sunrise trek through scenic landscapes near ${destination}`,
                    `Afternoon: Nature walk and birdwatching at local sanctuaries`,
                    `Morning: Boat ride through serene backwaters`,
                    `Evening: Sunset point viewing and nature photography`,
                ],
                Divine: [
                    `Morning: Visit the most revered temples and shrines of ${destination}`,
                    `Evening: Attend the mesmerizing evening aarti ceremony`,
                    `Morning: Meditation session at a peaceful ashram`,
                    `Afternoon: Explore spiritual ghats and sacred tanks`,
                ],
                Foodie: [
                    `Morning: Breakfast at a famous local dhaba`,
                    `Afternoon: Street food tour through the old market of ${destination}`,
                    `Evening: Rooftop dinner with local cuisine tasting`,
                    `Afternoon: Spice market tour and cooking class`,
                ],
                Adventure: [
                    `Morning: Thrilling adventure sports — rafting or rock climbing near ${destination}`,
                    `Afternoon: Jeep safari or cycling tour through rugged terrain`,
                    `Morning: Zip-lining or paragliding with panoramic views`,
                    `Afternoon: Off-road exploration to hidden waterfalls`,
                ],
                Photos: [
                    `Morning: Golden hour photography at the most scenic spots`,
                    `Afternoon: Portrait session in traditional markets and alleys`,
                    `Evening: Blue hour shoot at the iconic landmarks of ${destination}`,
                    `Morning: Architectural photography tour of old city`,
                ],
            };

            const dayTitles = [
                `Arrival & First Impressions`,
                `Deep Cultural Dive`,
                `Hidden Gems & Local Life`,
                `Adventure & Exploration`,
                `Culinary Journey`,
                `Sacred Spaces & Sunset`,
                `Relaxation & Departure`,
                `Off the Beaten Path`,
                `Farewell to ${destination}`,
                `Memories to Last Forever`,
            ];

            const dayDescriptions = [
                `Begin your journey with the sights and sounds that make ${destination} unforgettable`,
                `Immerse yourself in the rich culture and traditions that define this remarkable place`,
                `Discover the secret spots and authentic experiences only locals know about`,
                `Push your limits and create thrilling memories in and around ${destination}`,
                `Let the flavors of ${destination} tell the story of its people and heritage`,
                `Connect with the spiritual soul of ${destination} as the sun sets`,
                `Savour the last moments in ${destination} before heading home`,
                `Venture beyond the tourist trail to find the real ${destination}`,
                `A perfect final day to soak in everything ${destination} has to offer`,
                `One last adventure before saying goodbye to this incredible destination`,
            ];

            const itinerary = Array.from({ length: duration }, (_, i) => {
                const activities: string[] = [];
                const pool: string[] = selectedInterests.flatMap(
                    (interest) => activityTemplates[interest] || []
                );
                
                // Get 3 unique activities per day
                const shuffled = [...pool].sort(() => Math.random() - 0.5);
                for (let j = 0; j < 3 && j < shuffled.length; j++) {
                    activities.push(shuffled[j]);
                }
                if (activities.length < 3) {
                    activities.push(`Evening: Leisurely stroll exploring the streets of ${destination}`);
                }

                return {
                    day: i + 1,
                    title: dayTitles[i] || `Day ${i + 1} in ${destination}`,
                    description: dayDescriptions[i] || `Another wonderful day exploring ${destination}`,
                    activities,
                };
            });

            const plan = {
                plan_title: `${duration}-Day Journey to ${destination}`,
                itinerary,
                safety_info: {
                    police: '100 / 112',
                    ambulance: '102',
                    fire: '101',
                    tips: [
                        'Keep your belongings secure in crowded areas.',
                        'Use official transport apps or prepaid taxis.',
                        'Carry a physical map and a power bank.',
                        'Inform someone of your itinerary daily.',
                    ],
                    local_advice: `When visiting ${destination}, respect local customs and dress modestly at religious sites.`,
                },
            };

            setPlan(plan);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadItinerary = async () => {
        if (!plan) return;
        try {
            // Dynamically import html2pdf to prevent SSR and Window errors
            const html2pdf = (await import('html2pdf.js')).default;
            
            // Create a clean HTML template to bypass html2canvas Tailwind CSS parsing errors (like 'lab()' color format)
            const htmlContent = `
                <div style="font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span style="font-size: 12px; font-weight: 800; background: #ffedd5; color: #ea580c; padding: 4px 12px; border-radius: 8px; text-transform: uppercase; letter-spacing: 2px;">Custom Itinerary</span>
                        <h1 style="color: #0f172a; font-size: 32px; font-weight: 900; text-transform: uppercase; margin-top: 15px; margin-bottom: 10px;">
                            ${plan.plan_title}
                        </h1>
                        <hr style="border: none; border-bottom: 2px solid #f1f5f9; width: 100px; margin: 0 auto;" />
                    </div>
                    
                    ${plan.itinerary.map((d: any) => `
                        <div style="margin-bottom: 30px; background: #fffcf8; padding: 25px; border-radius: 16px; border: 1px solid #ffedd5;">
                            <h2 style="color: #ea580c; font-size: 20px; font-weight: 900; text-transform: uppercase; margin-top: 0; margin-bottom: 8px;">Day ${d.day}: ${d.title}</h2>
                            <p style="margin-top: 0; margin-bottom: 20px; font-style: italic; font-weight: 500; color: #64748b;">"${d.description}"</p>
                            
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${d.activities.map((a: string) => `
                                    <div style="background: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #f1f5f9; display: flex;">
                                        <div style="flex: 1;">
                                            <span style="display: block; font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">${a.split(':')[0] || 'Activity'}</span>
                                            <span style="font-weight: 700; color: #334155;">${a.split(':').slice(1).join(':') || a}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                    
                    <div style="margin-top: 40px; padding: 30px; background: #0f172a; color: white; border-radius: 20px;">
                        <h2 style="color: #f97316; margin-top: 0; font-size: 20px; font-weight: 900; text-transform: uppercase;">🛡️ Safety Hub</h2>
                        
                        <div style="display: flex; gap: 20px; margin-top: 20px; margin-bottom: 25px;">
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); flex: 1;">
                                <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Police</div>
                                <div style="font-size: 18px; font-weight: 900;">${plan.safety_info.police}</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); flex: 1;">
                                <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Medical</div>
                                <div style="font-size: 18px; font-weight: 900;">${plan.safety_info.ambulance}</div>
                            </div>
                        </div>
                        
                        <h3 style="color: #fdba74; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Pro Tips</h3>
                        <ul style="margin: 0 0 25px 0; padding-left: 20px; font-size: 14px; color: rgba(255,255,255,0.8);">
                            ${plan.safety_info.tips.map((t: string) => `<li style="margin-bottom: 8px;">${t}</li>`).join('')}
                        </ul>
                        
                        <div style="background: rgba(234, 88, 12, 0.15); padding: 20px; border-radius: 12px; border: 1px solid rgba(234, 88, 12, 0.2); font-style: italic; font-size: 14px; font-weight: 500; color: #ffedd5;">
                            "${plan.safety_info.local_advice}"
                        </div>
                    </div>
                </div>
            `;

            const opt = {
                margin:       0.5,
                filename:     `${plan.plan_title.replace(/\s+/g, '_').toLowerCase()}_notes.pdf`,
                image:        { type: 'jpeg' as const, quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(htmlContent).save();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Could not generate PDF. Please make sure the itinerary is fully loaded.");
        }
    };

    const saveJourney = () => {
        if (!plan) return;
        const existing = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
        localStorage.setItem('savedItineraries', JSON.stringify([...existing, plan]));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center">
                        <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-600/20 mr-5">
                            <Sparkles className="text-white w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">AI Travel Planner</h1>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Geni-Powered Personalized Itineraries</p>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!plan ? (
                        <motion.div 
                            key="input-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 -z-0 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="relative z-10 space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                            <MapPin className="w-4 h-4 mr-2 text-orange-500" /> Destination
                                        </label>
                                        <input 
                                            type="text" 
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder="Where to? (e.g. Udaipur, Meghalaya)" 
                                            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-0 focus:border-orange-500/50 outline-none transition-all text-lg font-bold placeholder:text-slate-300" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                            <Calendar className="w-4 h-4 mr-2 text-orange-500" /> Trip Duration
                                        </label>
                                        <div className="grid grid-cols-4 gap-3">
                                            {[3, 5, 7, 10].map(d => (
                                                <button 
                                                    key={d}
                                                    onClick={() => setDuration(d)}
                                                    className={`p-4 rounded-2xl font-black transition-all border-2 ${duration === d ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-orange-200'}`}
                                                >
                                                    {d}D
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Compass className="w-4 h-4 mr-2 text-orange-500" /> Travel Vibe & Interests
                                    </label>
                                    <div className="flex gap-3 flex-wrap">
                                        {['Heritage', 'Nature', 'Divine', 'Foodie', 'Adventure', 'Photos'].map(i => (
                                            <button 
                                                key={i} 
                                                onClick={() => toggleInterest(i)}
                                                className={`px-8 py-4 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-tighter ${interests.includes(i) ? 'bg-orange-500 border-orange-500 text-white shadow-xl shadow-orange-500/20' : 'bg-white border-slate-100 text-slate-400 hover:border-orange-200 hover:text-orange-500'}`}
                                            >
                                                {i}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={generatePlan}
                                    disabled={loading || !destination.trim()}
                                    className="w-full bg-slate-900 text-white font-black py-6 rounded-[2rem] hover:bg-orange-600 disabled:bg-slate-200 transition-all transform hover:-translate-y-2 shadow-2xl flex justify-center items-center text-xl mt-8 tracking-widest uppercase group"
                                >
                                    {loading ? (
                                        <span className="flex items-center"><Sparkles className="animate-spin w-6 h-6 mr-4" /> Crafting Your Magic...</span>
                                    ) : (
                                        <><Send className="w-6 h-6 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Build My Journey</>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="itinerary-display"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-10"
                        >
                            <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200 border border-orange-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500 opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 relative z-10">
                                    <div>
                                        <span className="text-[10px] font-black px-3 py-1 bg-orange-100 text-orange-600 rounded-lg mb-4 inline-block uppercase tracking-widest border border-orange-200 italic">Custom Itinerary</span>
                                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">{plan.plan_title}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                        <button onClick={downloadItinerary} className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm group" title="Download Text File">
                                            <Download className="w-6 h-6 group-active:scale-95 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div id="itinerary-content" className="grid lg:grid-cols-3 gap-12 relative z-10 p-4 bg-white rounded-[2rem]">
                                    <div className="lg:col-span-2 space-y-12">
                                        {plan.itinerary.map((day: any, i: number) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={day.day} 
                                                className="relative pl-12 border-l-2 border-slate-100 group"
                                            >
                                                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-white border-4 border-orange-500 rounded-full group-hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20"></div>
                                                <div className="mb-4">
                                                    <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em]">Day {day.day}</span>
                                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mt-1">{day.title}</h3>
                                                </div>
                                                <p className="text-slate-500 font-medium leading-relaxed mb-6 italic">"{day.description}"</p>
                                                
                                                <div className="grid gap-4">
                                                    {day.activities.map((activity: string, idx: number) => (
                                                        <div key={idx} className="flex bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group/card">
                                                            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mr-6 text-orange-500 font-black shrink-0 border border-slate-100">
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{activity.split(':')[0] || 'Morning'}</span>
                                                                <span className="text-slate-700 font-bold leading-snug">{activity.split(':').slice(1).join(':') || activity}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="space-y-8">
                                        {/* Safety Section */}
                                        <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group border border-white/5">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                                            
                                            <div className="flex items-center mb-8">
                                                <Shield className="w-8 h-8 text-orange-500 mr-4" />
                                                <h4 className="text-xl font-black uppercase tracking-tighter">Safety Hub</h4>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                        <Phone className="w-4 h-4 text-orange-500 mb-2" />
                                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest text-[8px]">Police</div>
                                                        <div className="text-lg font-black">{plan.safety_info.police}</div>
                                                    </div>
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                        <Utensils className="w-4 h-4 text-orange-500 mb-2" />
                                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest text-[8px]">Medical</div>
                                                        <div className="text-lg font-black">{plan.safety_info.ambulance}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4 pt-4 border-t border-white/10">
                                                    <div className="flex items-center text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-[8px]">
                                                        <AlertTriangle className="w-3 h-3 mr-2" /> Pro Tips
                                                    </div>
                                                    {plan.safety_info.tips.map((tip: string, idx: number) => (
                                                        <div key={idx} className="flex text-xs text-white/70 font-medium">
                                                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3 mt-1.5 shrink-0"></div>
                                                            {tip}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-orange-600/10 p-5 rounded-2xl border border-orange-600/20 mt-4 italic text-xs text-orange-100/90 font-medium">
                                                    {plan.safety_info.local_advice}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Best Time Info */}
                                        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                                            <div className="flex items-center mb-6">
                                                <Clock className="w-6 h-6 text-orange-500 mr-3" />
                                                <h4 className="text-lg font-black uppercase tracking-tighter">Best Vibes</h4>
                                            </div>
                                            <div className="flex items-center p-4 bg-orange-50 rounded-2xl">
                                                <Star className="w-5 h-5 text-orange-500 mr-3 fill-orange-500" />
                                                <span className="text-xs font-bold text-orange-900">Recommended months: Oct - March</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center relative z-10">
                                    <button 
                                        onClick={() => setPlan(null)} 
                                        className="flex items-center text-slate-400 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-900 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Planner
                                    </button>
                                    <button 
                                        onClick={saveJourney}
                                        disabled={saved}
                                        className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center ${saved ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white hover:bg-orange-600'}`}
                                    >
                                        {saved ? <><Sparkles className="w-4 h-4 mr-2" /> Saved!</> : 'Save Journey'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
