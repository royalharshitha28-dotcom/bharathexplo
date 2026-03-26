"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    itinerary: string[];
    likes: string[];
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    toggleItinerary: (placeName: string) => void;
    toggleLike: (placeName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [itinerary, setItinerary] = useState<string[]>([]);
    const [likes, setLikes] = useState<string[]>([]);

    useEffect(() => {
        // Simulate checking for persistent session
        const storedUser = localStorage.getItem('bharat_explorer_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedItinerary = localStorage.getItem('bharat_explorer_itinerary');
        if (storedItinerary) {
            setItinerary(JSON.parse(storedItinerary));
        }

        const storedLikes = localStorage.getItem('bharat_explorer_likes');
        if (storedLikes) {
            setLikes(JSON.parse(storedLikes));
        }

        setLoading(false);
    }, []);

    const toggleItinerary = (placeName: string) => {
        setItinerary(prev => {
            const newValue = prev.includes(placeName)
                ? prev.filter(p => p !== placeName)
                : [...prev, placeName];
            localStorage.setItem('bharat_explorer_itinerary', JSON.stringify(newValue));
            return newValue;
        });
    };

    const toggleLike = (placeName: string) => {
        setLikes(prev => {
            const newValue = prev.includes(placeName)
                ? prev.filter(p => p !== placeName)
                : [...prev, placeName];
            localStorage.setItem('bharat_explorer_likes', JSON.stringify(newValue));
            return newValue;
        });
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        // Simulate premium Google OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockUser = {
            uid: 'google-123',
            displayName: 'Aaryan Sharma',
            email: 'aaryan.sharma@gmail.com',
            photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aaryan'
        };
        
        setUser(mockUser);
        localStorage.setItem('bharat_explorer_user', JSON.stringify(mockUser));
        setLoading(false);
    };

    const signInWithEmail = async (email: string) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const name = email.split('@')[0];
        const mockUser = {
            uid: `email-${Date.now()}`,
            displayName: name.charAt(0).toUpperCase() + name.slice(1),
            email: email,
            photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        
        setUser(mockUser);
        localStorage.setItem('bharat_explorer_user', JSON.stringify(mockUser));
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null);
        localStorage.removeItem('bharat_explorer_user');
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            itinerary, 
            likes, 
            signInWithGoogle, 
            signInWithEmail, 
            signOut,
            toggleItinerary,
            toggleLike
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
