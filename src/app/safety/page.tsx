"use client";

import { ShieldAlert, ShieldCheck, MapPin, Phone, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Safety() {
  const tips = [
    { title: "Universal Number", desc: "112 is the single emergency number in India for Police, Ambulance, and Fire services.", icon: <ShieldAlert className="text-red-500" /> },
    { title: "Tourist Helpline", desc: "Call 1363 for 24x7 multi-lingual tourist assistance provided by the Ministry of Tourism.", icon: <Info className="text-blue-500" /> },
    { title: "Safe Transportation", desc: "Use licensed taxis, app-based cabs (Uber/Ola), or prepaid taxis from airports/stations.", icon: <MapPin className="text-green-500" /> },
    { title: "Keep Documents", desc: "Always carry a digital and physical copy of your passport, visa, and travel insurance.", icon: <ShieldCheck className="text-amber-500" /> },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-full mb-6">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Travel Safely in India</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Your safety is our top priority. Here's a comprehensive guide to emergency contacts and safety tips for your journey.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
              <Phone className="w-6 h-6 mr-3 text-red-600" /> Key Hotlines
            </h2>
            <div className="space-y-6">
              <Hotline number="112" label="National Emergency" sub="Police, Fire, Ambulance" />
              <Hotline number="100" label="Police" />
              <Hotline number="102" label="Ambulance" />
              <Hotline number="101" label="Fire Service" />
              <Hotline number="1091" label="Women Helpline" />
              <Hotline number="1363" label="Tourist Helpline" />
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center px-4">
              <AlertCircle className="w-6 h-6 mr-3 text-orange-500" /> Safety Tips for Travelers
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {tips.map((tip, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-slate-50 w-max rounded-xl mb-4">
                    {tip.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{tip.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-20 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ShieldCheck className="w-6 h-6 mr-3 text-orange-400" /> Travel Insurance
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We strongly recommend all travelers to have comprehensive travel insurance covering medical emergencies, theft, and travel delays. Ensure your policy covers the specific activities you plan to enjoy (e.g., trekking in the Himalayas).
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Recommended Providers
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hotline({ number, label, sub }: { number: string; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-red-50 transition-colors group">
      <div>
        <p className="text-slate-900 font-bold tracking-tight">{label}</p>
        {sub && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{sub}</p>}
      </div>
      <a href={`tel:${number}`} className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
        {number}
      </a>
    </div>
  );
}
