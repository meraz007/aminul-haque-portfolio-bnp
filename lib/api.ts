import { IconType } from "react-icons";
import { waitForLanguageSync } from './languageSync';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';

// ─── Settings ──────────────────────────────────────────────

export interface SocialMedia {
  facebook: string | null;
  instagram: string | null;
  x_twitter: string | null;
  tiktok: string | null;
  youtube: string | null;
}

export interface SiteSettings {
  id: number;
  language: string;
  company_name: string | null;
  company_email: string | null;
  company_phone: string | null;
  company_address: string | null;
  company_info: string | null;
  footer_text: string | null;
  logo: string | null;
  common_logo: string | null;
  footer_logo: string | null;
  social_media: SocialMedia;
  linkedin: string | null;
  pinterest: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch site-wide settings from the /settings endpoint.
 */
export async function fetchSettings(): Promise<SiteSettings | null> {
  try {
    await waitForLanguageSync();
    const response = await fetch(`${API_BASE_URL}/settings`, { cache: 'no-store' });
    if (!response.ok) return null;

    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return null;
  }
}

// ─── Hear Your Voice / We Hear You Sections ─────────────────

export interface HearYourVoiceData {
  title: string | null;
  subtitle: string | null;
  main_image: string | null;
  content: string | null;
  quotes: string | null;
}

/** @deprecated Use fetchHearYourVoice('complaint-hear-your-voice') instead */
export type ComplaintHearYourVoice = HearYourVoiceData;

/**
 * Generic fetcher for "hear your voice" / "we hear you" style endpoints.
 * @param endpoint - e.g. 'complaint-hear-your-voice' or 'comments-we-hear-you'
 */
export async function fetchHearYourVoice(endpoint: string): Promise<HearYourVoiceData | null> {
  try {
    await waitForLanguageSync();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { cache: 'no-store' });
    if (!response.ok) return null;

    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return null;
  }
}

/** Shortcut: Fetch "Hear Your Voice" section data for the complaints page. */
export async function fetchComplaintHearYourVoice(): Promise<HearYourVoiceData | null> {
  return fetchHearYourVoice('complaint-hear-your-voice');
}

/** Shortcut: Fetch "We Hear You" section data for the comments page. */
export async function fetchCommentsWeHearYou(): Promise<HearYourVoiceData | null> {
  return fetchHearYourVoice('comments-we-hear-you');
}

// ─── Manifesto CMS (page content sections) ─────────────────

export interface ManifestoCmsHeader {
  title: string | null;
  subtitle: string | null;
  quotation_title: string | null;
  quotation_subtitle: string | null;
}

export interface ManifestoCmsPlans {
  title: string | null;
  subtitle: string | null;
  content: string | null;
  quotes: string | null;
}

export interface ManifestoCmsGreenBox {
  title: string | null;
  subtitle: string | null;
  short_title: string | null;
}

export interface ManifestoCmsConclusion {
  title: string | null;
  content: string | null;
  quotes: string | null;
  short_title_first: string | null;
  short_title_second: string | null;
  slogan: string | null;
  from_name: string | null;
}

export interface ManifestoCms {
  header: ManifestoCmsHeader;
  plans: ManifestoCmsPlans;
  green_box: ManifestoCmsGreenBox;
  conclusion: ManifestoCmsConclusion;
}

/**
 * Fetch manifesto page CMS content (header, plans, green_box, conclusion).
 */
export async function fetchManifestoCms(): Promise<ManifestoCms | null> {
  try {
    await waitForLanguageSync();
    const response = await fetch(`${API_BASE_URL}/manifesto-cms`, { cache: 'no-store' });
    if (!response.ok) return null;

    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error('Error fetching manifesto CMS:', err);
    return null;
  }
}

// ─── Manifestos ─────────────────────────────────────────────

export interface ManifestoItemApi {
  id: number;
  title: string;
  text_list: string[];
  order: number;
}

export interface ManifestoApi {
  id: number;
  uuid: string;
  main_title: string;
  second_title: string;
  status: string;
  items: ManifestoItemApi[];
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all manifestos from the /manifestos endpoint.
 */
export async function fetchManifestos(): Promise<ManifestoApi[]> {
  try {
    await waitForLanguageSync();
    const response = await fetch(`${API_BASE_URL}/manifestos`, { cache: 'no-store' });
    if (!response.ok) return [];

    const data = await response.json();
    if (data.success && data.data?.data && Array.isArray(data.data.data)) {
      return data.data.data.filter((m: ManifestoApi) => m.status === 'active');
    }
    return [];
  } catch (err) {
    console.error('Error fetching manifestos:', err);
    return [];
  }
}

// ─── CMS Pages ─────────────────────────────────────────────

export interface CmsPage {
  id: number;
  page_for: string;
  page_for_label: string;
  slug: string;
  slug_label: string;
  title: string | null;
  description: string | null;
  video_url: string | null;
  image_description: string | null;
  title_image: string | null;
  main_image: string | null;
  thumbnail: string | null;
  meta_title: string | null;
  meta_desc: string | null;
  meta_image: string | null;
  canonical_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch a CMS page by page_for and slug (unique combination).
 * Returns the first matching CMS page or null if not found.
 */
export async function fetchCmsPage(pageFor: string, slug: string): Promise<CmsPage | null> {
  try {
    await waitForLanguageSync();
    const response = await fetch(
      `${API_BASE_URL}/cms-pages?page_for=${encodeURIComponent(pageFor)}&slug=${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (data.success && data.data?.data?.length > 0) {
      return data.data.data[0];
    }

    return null;
  } catch (err) {
    console.error(`Error fetching CMS page (${pageFor}/${slug}):`, err);
    return null;
  }
}
