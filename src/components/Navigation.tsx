"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Map as MapIcon, Calendar, Coffee, MessageCircle, User, ShieldAlert, Hotel, Bus, LogOut, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md text-slate-900 py-2' : 'bg-transparent text-white py-4'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-orange-500 text-white p-2 rounded-lg">
                                <Compass className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight">Bharat Explorer</span>
                        </Link>

                        <div className="hidden lg:flex space-x-6 items-center">
                            <NavLink href="/destinations" icon={<MapIcon className="w-4 h-4" />} text="Destinations" />
                            <NavLink href="/hotels" icon={<Hotel className="w-4 h-4" />} text="Hotels" />
                            <NavLink href="/transport" icon={<Bus className="w-4 h-4" />} text="Transport" />
                            <NavLink href="/plan" icon={<Calendar className="w-4 h-4" />} text="AI Planner" />
                            <NavLink href="/food" icon={<Coffee className="w-4 h-4" />} text="Local Food" />
                            <NavLink href="/my-explorer" icon={<Sparkles className="w-4 h-4" />} text="My Trips" />
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="relative" ref={menuRef}>
                                    <button 
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-2 p-1.5 bg-slate-800/10 backdrop-blur-md rounded-full hover:bg-orange-500/10 transition-all border border-transparent hover:border-orange-500/20"
                                    >
                                        <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-orange-500/30" />
                                        <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-900 shadow-orange-900/5"
                                            >
                                                <div className="p-5 bg-slate-50 border-b border-slate-100">
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated</p>
                                                    <p className="font-black text-slate-900 truncate">{user.displayName}</p>
                                                    <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
                                                </div>
                                                <div className="p-2 space-y-1">
                                                    <Link 
                                                        href="/my-explorer"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-700"
                                                    >
                                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                                        <span>My Trips & Favorites</span>
                                                    </Link>
                                                    <button className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm text-slate-700">
                                                        <Settings className="w-4 h-4" />
                                                        <span>Account Settings</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            signOut();
                                                            setIsUserMenuOpen(false);
                                                        }}
                                                        className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-rose-50 text-rose-600 transition-colors font-bold text-sm"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest transition-all ${scrolled ? 'bg-slate-900 text-white hover:bg-orange-600' : 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white'}`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <Link href={href} className="flex items-center space-x-2 font-bold text-sm hover:text-orange-500 transition-colors uppercase tracking-wide">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
            <span>{text}</span>
        </Link>
    );
}
