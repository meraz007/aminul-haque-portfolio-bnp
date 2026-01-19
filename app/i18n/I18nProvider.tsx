"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Language, I18nContextType, Dictionary } from './types';
import { getDictionarySync, getTranslation } from './getDictionary';

const COOKIE_NAME = 'lang';
const STORAGE_KEY = 'lang';
const API_URL = 'https://admin.aminul-haque.com/api/v1/settings/change-language';

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Cookie helper
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

interface I18nProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export function I18nProvider({ children, initialLanguage = 'bd' }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [dictionary, setDictionary] = useState<Dictionary>(() => getDictionarySync(initialLanguage));
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Sync dictionary when language changes
  useEffect(() => {
    setDictionary(getDictionarySync(language));
  }, [language]);

  // On mount, check localStorage for any mismatch (client-side hydration)
  useEffect(() => {
    const storedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (storedLang && (storedLang === 'bd' || storedLang === 'en') && storedLang !== language) {
      setLanguageState(storedLang);
      setCookie(COOKIE_NAME, storedLang);
    }
  }, []);

  // Translation function
  const t = useCallback((key: string, params?: Record<string, string>): string => {
    return getTranslation(dictionary, key, params);
  }, [dictionary]);

  // Set language with API call
  const setLanguage = useCallback(async (newLang: Language) => {
    if (newLang === language) return;
    
    const previousLang = language;
    setIsChangingLanguage(true);
    
    // Optimistic update
    setLanguageState(newLang);
    setCookie(COOKIE_NAME, newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: newLang }),
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }
      
      // Reload page after successful language change
      window.location.reload();
    } catch (error) {
      console.error('Failed to change language:', error);
      // Revert on failure
      setLanguageState(previousLang);
      setCookie(COOKIE_NAME, previousLang);
      localStorage.setItem(STORAGE_KEY, previousLang);
    } finally {
      setIsChangingLanguage(false);
    }
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isChangingLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook for client components
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

// Alias for convenience
export const useT = useTranslation;

