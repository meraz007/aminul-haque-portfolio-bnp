"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Volunteer {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  district: string;
  upazila: string;
  ward: string;
  skills?: string[];
  preferred_tasks?: string[];
  availability?: string[];
}

interface AuthContextType {
  volunteer: Volunteer | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('volunteer_token');
    const storedVolunteer = localStorage.getItem('volunteer_data');

    if (storedToken && storedVolunteer) {
      try {
        setToken(storedToken);
        setVolunteer(JSON.parse(storedVolunteer));
      } catch (error) {
        console.error('Error parsing stored volunteer data:', error);
        localStorage.removeItem('volunteer_token');
        localStorage.removeItem('volunteer_data');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - accepts any email and password
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create mock volunteer data
    const mockVolunteer: Volunteer = {
      id: 1,
      full_name: email.split('@')[0] || 'স্বেচ্ছাসেবক',
      email: email,
      mobile: '01700000000',
      district: 'ঢাকা',
      upazila: 'ধানমন্ডি',
      ward: 'ওয়ার্ড ১',
      skills: ['কম্পিউটার/প্রযুক্তি', 'শিক্ষা/প্রশিক্ষণ', 'সামাজিক কাজ'],
      preferred_tasks: ['ক্যাম্পেইন সহায়তা', 'ইভেন্ট আয়োজন', 'সামাজিক যোগাযোগ'],
      availability: ['সপ্তাহের দিন (সকাল ৯টা-১২টা)', 'সপ্তাহান্তে (দুপুর ১২টা-৫টা)'],
    };

    const mockToken = 'mock_token_' + Date.now();
    
    setToken(mockToken);
    setVolunteer(mockVolunteer);
    localStorage.setItem('volunteer_token', mockToken);
    localStorage.setItem('volunteer_data', JSON.stringify(mockVolunteer));
  };

  const logout = () => {
    setVolunteer(null);
    setToken(null);
    localStorage.removeItem('volunteer_token');
    localStorage.removeItem('volunteer_data');
  };

  return (
    <AuthContext.Provider
      value={{
        volunteer,
        token,
        isAuthenticated: !!volunteer && !!token,
        login,
        logout,
        loading,
      }}
    >
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

