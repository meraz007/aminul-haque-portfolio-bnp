import type { Language, Dictionary } from './types';

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  bd: () => import('../locales/bd.json').then((module) => module.default),
  en: () => import('../locales/en.json').then((module) => module.default),
};

export async function getDictionary(lang: Language): Promise<Dictionary> {
  return dictionaries[lang]();
}

// Synchronous version for client-side (dictionaries are cached after first load)
import bdDict from '../locales/bd.json';
import enDict from '../locales/en.json';

export function getDictionarySync(lang: Language): Dictionary {
  return lang === 'bd' ? bdDict : enDict;
}

// Helper to get nested value from dictionary
export function getTranslation(dict: Dictionary, key: string, params?: Record<string, string>): string {
  const keys = key.split('.');
  let value: unknown = dict;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key as fallback
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Handle parameter interpolation: {{name}} -> value
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || `{{${paramKey}}}`);
  }
  
  return value;
}


