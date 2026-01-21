"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';
import ImageLightbox from '../components/ImageLightbox';
import { FaCalendarAlt, FaMapMarkerAlt, FaImages, FaAngleLeft, FaAngleRight, FaFilter } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from '../i18n/I18nProvider';

interface Album {
  id: number;
  uuid: string;
  bang_name: string;
  bang_description: string;
  date: string;
  location: string;
  status: string;
  media_count: number;
  media: Array<{
    id: number;
    uuid: string;
    path: string;
    type: string;
  }>;
}

interface KheladhulaEvent {
  id: number;
  uuid: string;
  date: string;
  originalDate?: string; // Store original date string for filtering
  location: string;
  title: string;
  description: string;
  images: string[];
  color: string;
}

// Default color gradients for albums
const defaultColors = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-green-600',
  'from-purple-500 to-pink-600',
  'from-blue-500 to-cyan-600',
  'from-rose-500 to-red-600',
  'from-teal-500 to-cyan-600',
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-600',
];

// Month keys for translation
const monthKeys = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export default function KheladhulaClient() {
  const { t, language } = useTranslation();
  const [events, setEvents] = useState<KheladhulaEvent[]>([]);
  const [allEvents, setAllEvents] = useState<KheladhulaEvent[]>([]); // Store all events for client-side pagination
  const [filteredEvents, setFilteredEvents] = useState<KheladhulaEvent[]>([]); // Filtered events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dataFilter, setDataFilter] = useState<string>('');

  // Format date from YYYY-MM-DD to localized format
  const formatDate = useCallback((dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthKey = monthKeys[date.getMonth()];
      const month = t(`kheladhula.months.${monthKey}`);
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  }, [t]);

  // Parse date back to Date object
  const parseDateToObject = useCallback((originalDate: string): Date => {
    try {
      if (originalDate) {
        return new Date(originalDate);
      }
      return new Date();
    } catch {
      return new Date();
    }
  }, []);

  // Format date input value (YYYY-MM-DD) to localized format
  const formatDateInputToLocalized = useCallback((dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthKey = monthKeys[date.getMonth()];
      const month = t(`kheladhula.months.${monthKey}`);
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  }, [t]);

  // Filter events by all criteria (date, title, and data/description)
  const filterEventsByDate = useMemo(() => {
    let filtered = allEvents;

    // Filter by date
    if (selectedDate) {
      const filterDate = new Date(selectedDate);
      const filterDateStart = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
      const filterDateEnd = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate(), 23, 59, 59);

      filtered = filtered.filter((event) => {
        const eventDate = parseDateToObject(event.originalDate || '');
        return eventDate >= filterDateStart && eventDate <= filterDateEnd;
      });
    }

    // Filter by title
    if (titleFilter.trim()) {
      const searchTerm = titleFilter.trim().toLowerCase();
      filtered = filtered.filter((event) => {
        return event.title.toLowerCase().includes(searchTerm);
      });
    }

    // Filter by data/description
    if (dataFilter.trim()) {
      const searchTerm = dataFilter.trim().toLowerCase();
      filtered = filtered.filter((event) => {
        return event.description.toLowerCase().includes(searchTerm) ||
               event.location.toLowerCase().includes(searchTerm);
      });
    }

    return filtered;
  }, [allEvents, selectedDate, titleFilter, dataFilter, parseDateToObject]);

  // Update filtered events when filter changes
  useEffect(() => {
    setFilteredEvents(filterEventsByDate);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filterEventsByDate]);

  // Calculate paginated events using useMemo for immediate updates
  const paginatedEvents = useMemo(() => {
    if (filteredEvents.length === 0) return [];
    
    const perPage = 5;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [currentPage, filteredEvents]);

  // Update pagination meta and events when filteredEvents or currentPage changes
  useEffect(() => {
    if (filteredEvents.length > 0) {
      const perPage = 5;
      const totalPages = Math.ceil(filteredEvents.length / perPage);
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      setPaginationMeta({
        current_page: currentPage,
        last_page: totalPages,
        total: filteredEvents.length,
        per_page: perPage,
        from: startIndex + 1,
        to: Math.min(endIndex, filteredEvents.length),
      });
    } else {
      setPaginationMeta(null);
    }
  }, [currentPage, filteredEvents]);

  // Update events state when paginatedEvents changes
  useEffect(() => {
    setEvents(paginatedEvents);
  }, [paginatedEvents]);

  // Fetch all events once on mount
  useEffect(() => {
    const fetchEvents = async () => {
      // If we already have all events, skip fetch
      if (allEvents.length > 0) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
        
        // Always fetch all albums without pagination parameters
        const url = `${apiBaseUrl}/sports/list`;
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          let errorMessage = `Failed to fetch events (${response.status}): ${response.statusText}`;
          
          try {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            
            if (errorText) {
              try {
                const errorData = JSON.parse(errorText);
                if (errorData.message) {
                  errorMessage = errorData.message;
                } else if (errorData.error) {
                  errorMessage = errorData.error;
                } else if (errorData.errors) {
                  errorMessage = JSON.stringify(errorData.errors);
                }
              } catch {
                if (errorText.length < 200) {
                  errorMessage = errorText;
                }
              }
            }
          } catch (parseError) {
            console.error('Error parsing error response:', parseError);
          }
          
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Handle the API response structure: { success: true, data: { data: [...] } }
        let albumsData: Album[] = [];
        
        if (data.success && data.data) {
          if (data.data.data && Array.isArray(data.data.data)) {
            albumsData = data.data.data;
          } else if (Array.isArray(data.data)) {
            albumsData = data.data;
          }
        } else if (Array.isArray(data)) {
          albumsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          albumsData = data.data;
        }

        // Filter only active albums and map to kheladhula events
        const mappedEvents: KheladhulaEvent[] = albumsData
          .filter((album: Album) => album.status === 'active')
          .map((album: Album, index: number) => {
            // Get only image media
            const images = album.media
              .filter((media) => media.type === 'image')
              .map((media) => media.path);

            return {
              id: album.id,
              uuid: album.uuid,
              date: album.date, // Store raw date, format when displaying
              originalDate: album.date,
              location: album.location || '',
              title: album.bang_name || '',
              description: album.bang_description || '',
              images: images,
              color: defaultColors[index % defaultColors.length],
            };
          });

        // Store all events for client-side pagination
        setAllEvents(mappedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [allEvents.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (image: string, eventImages: string[]) => {
    setSelectedImage(image);
    setCurrentEventImages(eventImages);
    setCurrentImageIndex(eventImages.indexOf(image));
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = (currentImageIndex - 1 + currentEventImages.length) % currentEventImages.length;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentEventImages[newIndex]);
    } else {
      const newIndex = (currentImageIndex + 1) % currentEventImages.length;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentEventImages[newIndex]);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-slate-600">{t('kheladhula.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-red-600 mb-4">{t('kheladhula.error')} {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
          >
            {t('kheladhula.tryAgain')}
          </button>
        </div>
      </section>
    );
  }

  // Only show empty message if we've finished loading and have no events at all
  if (!loading && allEvents.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-slate-600">{t('kheladhula.noEvents')}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filters Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-6 text-lg">
                <FaFilter />
                <span>{t('kheladhula.filterOptions')}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date Filter */}
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm">
                    {t('kheladhula.dateFilter')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-amber-500 focus:outline-none shadow-lg text-slate-700"
                  />
                </div>

                {/* Title Filter */}
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm">
                    {t('kheladhula.titleFilter')}
                  </label>
                  <input
                    type="text"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    placeholder={t('kheladhula.searchTitle')}
                    className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-amber-500 focus:outline-none shadow-lg text-slate-700"
                  />
                </div>
              </div>

              {/* Filter Summary and Clear Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 font-medium">
                  {filteredEvents.length} {t('kheladhula.eventsFound')}
                  {selectedDate && ` (${t('kheladhula.date')}: ${formatDateInputToLocalized(selectedDate)})`}
                  {titleFilter && ` (${t('kheladhula.title')}: ${titleFilter})`}
                  {dataFilter && ` (${t('kheladhula.description')}: ${dataFilter})`}
                </div>
                {(selectedDate || titleFilter || dataFilter) && (
                  <button
                    onClick={() => {
                      setSelectedDate('');
                      setTitleFilter('');
                      setDataFilter('');
                    }}
                    className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all shadow-lg"
                  >
                    {t('kheladhula.clearAllFilters')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {events.length > 0 ? (
            events.map((event, idx) => (
            <motion.div
              key={`${event.uuid || event.id}-${currentPage}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20`}></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                {/* Event Header */}
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                        <FaCalendarAlt className="text-white" />
                      </div>
                      <span className="font-bold">{formatDate(event.originalDate || event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                        <FaMapMarkerAlt className="text-white" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                        <FaImages className="text-white" />
                      </div>
                      <span>{event.images.length} {t('kheladhula.photos')}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mt-4">
                    {event.description}
                  </p>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.images.map((image, imageIdx) => (
                    <motion.div
                      key={imageIdx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openLightbox(image, event.images)}
                      className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-75 transition-all z-10`}></div>
                      <Image
                        src={image}
                        alt={`${event.title} - ${t('kheladhula.image')} ${imageIdx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
                        <FaImages className="text-4xl text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            ))
          ) : (
            !loading && filteredEvents.length > 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">{t('kheladhula.noEventsOnPage')}</p>
              </div>
            )
          )}
          {!loading && filteredEvents.length === 0 && allEvents.length > 0 && (selectedDate || titleFilter || dataFilter) && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">{t('kheladhula.noEventsForFilter')}</p>
              <button
                onClick={() => {
                  setSelectedDate('');
                  setTitleFilter('');
                  setDataFilter('');
                }}
                className="mt-4 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
              >
                {t('kheladhula.clearAllFilters')}
              </button>
            </div>
          )}

          {/* Pagination - Only show if there are more than 5 filtered events */}
          {paginationMeta && paginationMeta.total > 5 && paginationMeta.last_page > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <FaAngleLeft />
              {t('kheladhula.previous')}
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === paginationMeta.last_page ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationMeta.last_page}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {t('kheladhula.next')}
              <FaAngleRight />
            </button>
          </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        selectedImage={selectedImage}
        images={currentEventImages}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNavigate={navigateImage}
      />
    </>
  );
}
