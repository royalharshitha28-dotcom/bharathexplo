"use client";

import { motion } from 'framer-motion';
import { Train, Plane, Bus, Car, ArrowRight, Shield, Clock, MapPin } from 'lucide-react';

export default function Transport() {
    const transportModes = [
        {
            mode: "Indian Railways",
            title: "The Lifeline of India",
            description: "From the ultra-modern Vande Bharat Express to the luxury Maharajas' Express, experience the diverse landscapes of India by rail.",
            icon: <Train className="w-8 h-8 text-orange-500" />,
            img: "https://images.unsplash.com/photo-1628144527410-a4ba57eff3ef?auto=format&fit=crop&w=1200",
            features: ["Wide Network", "Budget Friendly", "Vande Bharat"],
            availability: "National"
        },
        {
            mode: "Domestic Flights",
            title: "Fly High Across India",
            description: "Quick and efficient travel between major cities with world-class airports and a wide range of airlines including Air India and Indigo.",
            icon: <Plane className="w-8 h-8 text-blue-500" />,
            img: "https://images.unsplash.com/photo-1624562821266-3339f8e0d9da?auto=format&fit=crop&w=1200",
            features: ["Time Saving", "Lounge Access", "Major Cities"],
            availability: "Urban"
        },
        {
            mode: "Interstate Bus",
            title: "Roadways Connectivity",
            description: "State-run and private luxury Volvo buses connecting every corner of the country through an extensive highway network.",
            icon: <Bus className="w-8 h-8 text-green-500" />,
            img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
            features: ["Last Mile", "Night Travel", "Sleeper"],
            availability: "Regional"
        },
        {
            mode: "Local Transport",
            title: "The Soul of Indian Cities",
            description: "Navigate the vibrant streets of Indian cities with iconic auto-rickshaws, e-rickshaws, and the legendary yellow taxis that define the urban character.",
            icon: <Car className="w-8 h-8 text-yellow-500" />,
            img: "https://images.unsplash.com/photo-1708699195956-92ad68a8abae?auto=format&fit=crop&w=1200",
            features: ["Auto Rickshaws", "Local Taxis", "E-Rickshaws"],
            availability: "Local"
        }
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-center">Travel Facilities</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto text-center">Explore the most efficient and comfortable ways to traverse the incredible landscapes of Bharat.</p>
                </div>

                <div className="space-y-12">
                    {transportModes.map((transport, index) => (
                        <motion.div
                            key={transport.mode}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="lg:w-1/2 relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-rose-400 rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                    <img src={transport.img} alt={transport.mode} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                        <div className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
                                            {transport.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">{transport.mode}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                                    <MapPin className="w-4 h-4" />
                                    <span>{transport.availability}</span>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900">{transport.title}</h3>
                                <p className="text-slate-600 text-lg leading-relaxed">{transport.description}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {transport.features.map(feature => (
                                        <div key={feature} className="flex items-center space-x-2 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                                            <Shield className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-bold text-slate-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <button className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 transition-all group">
                                        <span>Plan Journey</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Quick Info Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "24/7 Support", desc: "Round-the-clock assistance for all your travel bookings.", icon: <Clock className="w-6 h-6 text-orange-500" /> },
                        { title: "Verified Partners", desc: "We only partner with highly-rated transport providers.", icon: <Shield className="w-6 h-6 text-orange-500" /> },
                        { title: "Easy Cancellations", desc: "Simple and hassle-free cancellation policies.", icon: <ArrowRight className="w-6 h-6 text-orange-500" /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/50 backdrop-blur-md border border-white p-8 rounded-3xl text-center shadow-lg shadow-slate-100">
                            <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-slate-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
