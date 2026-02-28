"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import type { Language, I18nContextType, Dictionary } from "./types";
import { getDictionarySync, getTranslation } from "./getDictionary";
import { markLanguageSynced } from "@/lib/languageSync";

const COOKIE_NAME = "lang";
const STORAGE_KEY = "lang";
const API_URL =
  "https://admin.aminul-haque.com/api/v1/settings/change-language";
const DEFAULT_LANGUAGE: Language = "bd";

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

export function I18nProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Derive dictionary from language so content always matches toggle (no stale frame)
  const dictionary = useMemo(() => getDictionarySync(language), [language]);

  // On mount: sync with localStorage, ensure cookie is correct, and sync backend language.
  // This is critical: the backend API serves CMS content based on a global language setting.
  // We must ensure the backend language matches the client's chosen language BEFORE any
  // CMS data is fetched by child components. The markLanguageSynced() call unblocks
  // all API functions that await waitForLanguageSync().
  useEffect(() => {
    const storedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    let targetLang: Language = language; // language === initialLanguage on first render

    if (storedLang && (storedLang === "bd" || storedLang === "en")) {
      targetLang = storedLang;
      if (storedLang !== language) {
        setLanguageState(storedLang);
        setCookie(COOKIE_NAME, storedLang);
      }
    } else {
      // First-time visitor: persist initial language so server and client stay in sync
      localStorage.setItem(STORAGE_KEY, language);
      setCookie(COOKIE_NAME, language);
    }

    // Always sync backend language on mount to prevent mixed-language content.
    // This ensures the backend returns CMS data in the correct language when
    // child components fetch it.
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: targetLang }),
    })
      .catch((err) => {
        console.error("Failed to sync backend language:", err);
      })
      .finally(() => {
        markLanguageSynced();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Translation function
  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      return getTranslation(dictionary, key, params);
    },
    [dictionary],
  );

  // Set language with API call
  const setLanguage = useCallback(
    async (newLang: Language) => {
      if (newLang === language) return;

      const previousLang = language;
      setIsChangingLanguage(true);

      // Optimistic update
      setLanguageState(newLang);
      setCookie(COOKIE_NAME, newLang);
      localStorage.setItem(STORAGE_KEY, newLang);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language: newLang }),
        });

        if (!response.ok) {
          throw new Error("API call failed");
        }

        // Reload page after successful language change
        window.location.reload();
      } catch (error) {
        console.error("Failed to change language:", error);
        // Revert on failure
        setLanguageState(previousLang);
        setCookie(COOKIE_NAME, previousLang);
        localStorage.setItem(STORAGE_KEY, previousLang);
      } finally {
        setIsChangingLanguage(false);
      }
    },
    [language],
  );

  return (
    <I18nContext.Provider
      value={{ language, setLanguage, t, isChangingLanguage }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// Hook for client components
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

// Alias for convenience
export const useT = useTranslation;
