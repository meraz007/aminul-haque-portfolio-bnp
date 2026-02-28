import { cookies } from 'next/headers';
import type { Language } from './types';

const DEFAULT_LANGUAGE: Language = 'bd';
const COOKIE_NAME = 'lang';
const API_URL = 'https://admin.aminul-haque.com/api/v1/settings/change-language';

export async function getServerLang(): Promise<Language> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get(COOKIE_NAME);
  
  if (langCookie?.value === 'en' || langCookie?.value === 'bd') {
    return langCookie.value;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Sync the backend API language setting to match the user's cookie.
 * Call this in the root layout BEFORE any server components fetch data,
 * so the backend returns content in the correct language.
 */
export async function syncBackendLanguage(language: Language): Promise<void> {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
      cache: 'no-store',
    });
  } catch {
    // Ignore errors — the backend might be temporarily unavailable.
    // Client-side sync in I18nProvider will also attempt this.
  }
}


