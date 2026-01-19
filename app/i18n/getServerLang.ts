import { cookies } from 'next/headers';
import type { Language } from './types';

const DEFAULT_LANGUAGE: Language = 'bd';
const COOKIE_NAME = 'lang';

export async function getServerLang(): Promise<Language> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get(COOKIE_NAME);
  
  if (langCookie?.value === 'en' || langCookie?.value === 'bd') {
    return langCookie.value;
  }
  
  return DEFAULT_LANGUAGE;
}


