"use client";

import { useState } from 'react';
import { Phone, X, ShieldAlert, LifeBuoy, Zap, Flame, UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emergencyNumbers = [
  { label: 'National Registry', number: '112', icon: <ShieldAlert className="w-5 h-5" />, color: 'bg-red-500' },
  { label: 'Police', number: '100', icon: <UserRound className="w-5 h-5" />, color: 'bg-blue-600' },
  { label: 'Ambulance', number: '102', icon: <LifeBuoy className="w-5 h-5" />, color: 'bg-green-600' },
  { label: 'Fire', number: '101', icon: <Flame className="w-5 h-5" />, color: 'bg-orange-600' },
  { label: 'Women Helpline', number: '1091', icon: <Zap className="w-5 h-5" />, color: 'bg-purple-600' },
  { label: 'Tourist Helpline', number: '1363', icon: <Phone className="w-5 h-5" />, color: 'bg-amber-600' },
];

export default function EmergencyFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="bg-red-600 p-4 text-white">
              <h3 className="font-bold flex items-center">
                <ShieldAlert className="w-5 h-5 mr-3" /> Emergency Contacts
              </h3>
              <p className="text-xs opacity-90 mt-1 uppercase tracking-tighter">India National Helplines</p>
            </div>
            <div className="p-2">
              {emergencyNumbers.map((item, idx) => (
                <motion.a
                  key={item.number}
                  href={`tel:${item.number}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center p-3 hover:bg-slate-50 rounded-2xl transition-all group"
                >
                  <div className={`${item.color} text-white p-2 rounded-xl mr-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{item.number}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-red-600 hover:bg-red-700 hover:scale-110 animate-pulse'
        } text-white`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
      </button>
    </div>
  );
}
