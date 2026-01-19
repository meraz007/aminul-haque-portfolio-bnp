export type Language = 'bd' | 'en';

// Recursive type to support deeply nested translation objects
export type DictionaryValue = string | { [key: string]: DictionaryValue };
export type Dictionary = { [key: string]: DictionaryValue };

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  isChangingLanguage: boolean;
}


