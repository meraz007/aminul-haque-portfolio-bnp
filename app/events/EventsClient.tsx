"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

// Convert Bengali numerals to English numerals
function convertBengaliToEnglish(bengaliStr: string): string {
  const bengaliToEnglish: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  
  return bengaliStr.split('').map(char => bengaliToEnglish[char] || char).join('');
}

function parseBengaliDate(dateStr: string): Date {
  const englishDateStr = convertBengaliToEnglish(dateStr);
  
  const cleaned = englishDateStr.replace(/\s+/g, ' ').trim();
  return new Date(cleaned);
}

interface Event {
  id: number;
  uuid: string;
  title: string;
  event_date_time: string;
  event_date_time_formatted: string;
  address: string;
  description: string;
  image: string | null;
  map_embed?: string;
  status: string;
}

interface EventsClientProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsClient({ upcomingEvents: initialUpcomingEvents, pastEvents: initialPastEvents }: EventsClientProps) {
  const { t, language } = useTranslation();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(initialUpcomingEvents);
  const [pastEvents, setPastEvents] = useState<Event[]>(initialPastEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [endCmsData, setEndCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('events', 'our-activities').then(setCmsData);
    fetchCmsPage('events', 'end-section').then(setEndCmsData);
  }, []);

  // Poll for updates every 10 seconds
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsRefreshing(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/events`, {
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          console.error(`Failed to fetch events: ${response.statusText}`);
          return;
        }

        const data = await response.json();

        let eventsData: any[] = [];
        if (Array.isArray(data)) {
          eventsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          eventsData = data.data;
        } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
          eventsData = data.data.data;
        } else if (data.events && Array.isArray(data.events)) {
          eventsData = data.events;
        } else {
          console.error('Invalid API response format:', data);
          return;
        }

        const activeEvents = eventsData.filter((event: any) => event.status === 'active' || !event.status);
        const now = new Date();

        const upcoming: Event[] = [];
        const past: Event[] = [];

        activeEvents.forEach((event: any) => {
          if (!event.event_date_time) return;

          const eventDateTime = parseBengaliDate(event.event_date_time);
          if (isNaN(eventDateTime.getTime())) return;

          const mappedEvent: Event = {
            id: event.id,
            uuid: event.uuid,
            title: event.title,
            event_date_time: event.event_date_time,
            event_date_time_formatted: event.event_date_time_formatted,
            address: event.address,
            description: event.description || '',
            image: event.image,
            map_embed: event.map_embed,
            status: event.status,
          };

          const eventTime = eventDateTime.getTime();
          const nowTime = now.getTime();

          if (eventTime >= nowTime) {
            upcoming.push(mappedEvent);
          } else {
            past.push(mappedEvent);
          }
        });

        upcoming.sort((a, b) => {
          const dateA = parseBengaliDate(a.event_date_time).getTime();
          const dateB = parseBengaliDate(b.event_date_time).getTime();
          return dateA - dateB;
        });

        past.sort((a, b) => {
          const dateA = parseBengaliDate(a.event_date_time).getTime();
          const dateB = parseBengaliDate(b.event_date_time).getTime();
          return dateB - dateA;
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Initial fetch after component mounts
    const interval = setInterval(fetchEvents, 10000); // Poll every 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Helper function to extract date and time from formatted string
  const parseDateTime = (formatted: string) => {
    if (!formatted) return { date: '', time: '' };
    
    // Format: "13 Jan, 2026 01:00 PM" or "06 Jan, 2026 11:00 AM"
    // Try to parse the formatted string
    try {
      const parts = formatted.trim().split(' ');
      if (parts.length >= 5) {
        // Format: "13 Jan, 2026 01:00 PM"
        const date = `${parts[0]} ${parts[1]} ${parts[2]}`; // "13 Jan, 2026" (removing comma)
        const time = `${parts[3]} ${parts[4]}`; // "01:00 PM"
        return { date, time };
      } else if (parts.length >= 3) {
        // Fallback: just return the formatted string as date
        return { date: formatted, time: '' };
      }
    } catch (e) {
      console.error('Error parsing date:', e);
    }
    return { date: formatted, time: '' };
  };

  // Helper function to strip HTML tags for description preview
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  // Format date input value (YYYY-MM-DD) to Bengali format
  const formatDateInputToBengali = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const months = language === 'bd' 
        ? ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const day = language === 'bd' ? toBanglaNumber(date.getDate()) : date.getDate();
      const month = months[date.getMonth()];
      const year = language === 'bd' ? toBanglaNumber(date.getFullYear()) : date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Filter events by title and date
  const filteredEvents = (() => {
    let events = filter === 'upcoming' ? upcomingEvents : pastEvents;

    // Filter by title
    if (titleFilter.trim()) {
      const searchTerm = titleFilter.trim().toLowerCase();
      events = events.filter((event) => {
        return event.title.toLowerCase().includes(searchTerm);
      });
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const filterDateStart = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
      const filterDateEnd = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate(), 23, 59, 59);

      events = events.filter((event) => {
        if (!event.event_date_time) return false;
        const eventDateTime = parseBengaliDate(event.event_date_time);
        if (isNaN(eventDateTime.getTime())) return false;
        
        const eventDate = new Date(eventDateTime.getFullYear(), eventDateTime.getMonth(), eventDateTime.getDate());
        return eventDate >= filterDateStart && eventDate <= filterDateEnd;
      });
    }

    return events;
  })();

  const displayEvents = filteredEvents;

  const getEventCount = (count: number) => {
    return language === 'bd' ? toBanglaNumber(count) : count;
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaCalendarAlt className="inline mr-2" />
              {t('events.ourActivities')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {cmsData?.title || t('events.allEvents')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {cmsData?.description || t('events.viewAllEvents')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Type Filter (Upcoming/Past) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                filter === 'upcoming'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 shadow-lg'
              }`}
            >
              {t('events.upcoming')} ({getEventCount(upcomingEvents.length)})
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                filter === 'past'
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-xl'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-500 hover:text-slate-600 shadow-lg'
              }`}
            >
              {t('events.past')} ({getEventCount(pastEvents.length)})
            </button>
          </motion.div>

          {/* Title and Date Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200"
          >
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-6 text-lg">
              <FaFilter />
              <span>{t('events.filterOptions')}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Title Filter */}
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">
                  {t('events.titleFilter')}
                </label>
                <input
                  type="text"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  placeholder={t('events.searchEventTitle')}
                  className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-emerald-500 focus:outline-none shadow-lg text-slate-700"
                />
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-slate-700 font-bold mb-2 text-sm">
                  {t('events.dateFilter')}
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-emerald-500 focus:outline-none shadow-lg text-slate-700"
                />
              </div>
            </div>

            {/* Filter Summary and Clear Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-600 font-medium">
                {getEventCount(filteredEvents.length)} {t('events.eventsFound')}
                {dateFilter && ` (${t('events.dateFilter')}: ${formatDateInputToBengali(dateFilter)})`}
                {titleFilter && ` (${t('events.titleFilter')}: ${titleFilter})`}
              </div>
              {(titleFilter || dateFilter) && (
                <button
                  onClick={() => {
                    setTitleFilter('');
                    setDateFilter('');
                  }}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all shadow-lg"
                >
                  {t('events.clearAllFilters')}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event, idx) => {
              const { date, time } = parseDateTime(event.event_date_time_formatted);
              const description = stripHtml(event.description);
              
              return (
                <motion.div
                  key={event.uuid || event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <EventCard
                    title={event.title}
                    date={date}
                    time={time}
                    location={event.address}
                    description={description}
                    slug={event.id.toString()}
                    isPast={filter === 'past'}
                    hasVideo={false}
                    image={event.image || undefined}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {displayEvents.length === 0 && (
            <div className="text-center py-20">
              <FaCalendarAlt className="text-6xl text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                {t('events.noEvents')}
              </h3>
              <p className="text-slate-500 mb-4">
                {(titleFilter || dateFilter) 
                  ? t('events.noEventsForFilter')
                  : filter === 'upcoming' 
                    ? t('events.upcomingEventsComingSoon')
                    : t('events.noPastEvents')}
              </p>
              {(titleFilter || dateFilter) && (
                <button
                  onClick={() => {
                    setTitleFilter('');
                    setDateFilter('');
                  }}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all"
                >
                  {t('events.clearAllFilters')}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {endCmsData?.title || t('events.learnAboutEvents')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {endCmsData?.description || t('events.latestUpdates')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  {t('nav.contactUs')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
