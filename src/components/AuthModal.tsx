"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const { signInWithGoogle, signInWithEmail } = useAuth();

    const handleGoogleSignIn = async () => {
        setLocalLoading(true);
        try {
            await signInWithGoogle();
            onClose();
        } finally {
            setLocalLoading(false);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLocalLoading(true);
        try {
            await signInWithEmail(email);
            onClose();
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden border border-slate-100"
                    >
                        <div className="relative p-8 md:p-12">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl mb-6">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                                    {mode === 'login' ? 'Welcome Back' : 'Join the Club'}
                                </h2>
                                <p className="text-slate-500 font-medium mt-2 italic">
                                    Unlock the best of Bharat Explorer
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleGoogleSignIn}
                                    disabled={localLoading}
                                    className="w-full flex items-center justify-center space-x-3 py-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-orange-500 hover:bg-orange-50/30 transition-all font-bold group"
                                >
                                    {localLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.25.81-.59z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            <span className="text-slate-700">Continue with Google</span>
                                        </>
                                    )}
                                </button>

                                <div className="relative py-4 flex items-center">
                                    <div className="flex-grow border-t border-slate-100"></div>
                                    <span className="flex-shrink mx-4 text-slate-300 text-xs font-black uppercase tracking-widest">Or Gmail</span>
                                    <div className="flex-grow border-t border-slate-100"></div>
                                </div>

                                <form onSubmit={handleEmailSignIn} className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                            <input 
                                                type="email" 
                                                placeholder="Enter your Gmail address"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 font-bold placeholder:text-slate-300 transition-all"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                            <input 
                                                type="password" 
                                                placeholder="Password"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 font-bold placeholder:text-slate-300 transition-all"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={localLoading}
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {localLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Start Exploring</span>}
                                    </button>
                                </form>
                            </div>

                            <div className="mt-8 text-center">
                                <button 
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    className="text-slate-500 font-bold text-sm hover:text-orange-600 transition-colors"
                                >
                                    {mode === 'login' ? "Don't have an account? Join Now" : "Already a member? Sign In"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-loose">
                                By continuing, you agree to our <span className="text-slate-900">Terms of Service</span> and <span className="text-slate-900">Privacy Policy</span>.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
