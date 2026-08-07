import { PopupItem, EventItem, NewsArticle } from '../types';
import { UPCOMING_EVENTS, LATEST_NEWS } from './schoolData';

const POPUPS_STORAGE_KEY = 'lpa_school_popups_v2';
const EVENTS_STORAGE_KEY = 'lpa_school_events_v2';
const NEWS_STORAGE_KEY = 'lpa_school_news_v2';

export const DEFAULT_POPUPS: PopupItem[] = [
  {
    id: 'popup-template-1',
    title: '2026–2027 Parents Orientation & Campus Tour',
    popupType: 'template',
    isActive: true,
    tagline: 'Admissions & Open House',
    dateTime: 'Tuesday, August 25, 2026 | 10:00 AM ~ 12:00 PM',
    location: 'Main Auditorium & STEM Innovation Center, LPA Campus',
    targetAudience: 'Prospective Nursery to Grade 10 Students & Parents',
    description: 'Join us to explore Life-Prep Academy’s progressive constructivist curriculum, inquiry-based learning framework, and 2026–2027 admissions procedure.',
    ctaText: 'Apply for Admissions Online',
    ctaAction: 'admissions',
    themeStyle: 'blue-gold',
    createdAt: new Date().toISOString()
  },
  {
    id: 'popup-image-2',
    title: '2026 STEM & Creative Science Expo Announcement',
    popupType: 'image',
    isActive: true,
    badgeText: 'NOTICE',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'STEM & Science Expo Official Poster',
    clickUrl: 'tour',
    createdAt: new Date().toISOString()
  }
];

// Helper to get popups from localStorage or default
export function getStoredPopups(): PopupItem[] {
  try {
    const raw = localStorage.getItem(POPUPS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(DEFAULT_POPUPS));
      return DEFAULT_POPUPS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored popups', e);
    return DEFAULT_POPUPS;
  }
}

export function saveStoredPopups(popups: PopupItem[]) {
  try {
    localStorage.setItem(POPUPS_STORAGE_KEY, JSON.stringify(popups));
    // Trigger custom event so active popups on front page update in real-time
    window.dispatchEvent(new Event('popups_updated'));
  } catch (e) {
    console.error('Failed to save popups', e);
  }
}

// Helper to get academic events
export function getStoredEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(UPCOMING_EVENTS));
      return UPCOMING_EVENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return UPCOMING_EVENTS;
  }
}

export function saveStoredEvents(events: EventItem[]) {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('events_updated'));
  } catch (e) {
    console.error('Failed to save events', e);
  }
}

// Helper to get news articles
export function getStoredNews(): NewsArticle[] {
  try {
    const raw = localStorage.getItem(NEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(LATEST_NEWS));
      return LATEST_NEWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return LATEST_NEWS;
  }
}

export function saveStoredNews(news: NewsArticle[]) {
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    window.dispatchEvent(new Event('news_updated'));
  } catch (e) {
    console.error('Failed to save news', e);
  }
}
