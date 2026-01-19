"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaImages, FaTimes, FaAngleLeft, FaAngleRight, FaFilter } from 'react-icons/fa';
import ImageLightbox from '../components/ImageLightbox';
import Image from 'next/image';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';

interface Album {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  status: string;
  media_count: number;
  media: Array<{
    id: number;
    uuid: string;
    path: string | null;
    type: string | null;
    youtube_url: string | null;
    video_thumbnail: string | null;
  }>;
}

interface MediaItem {
  path: string | null;
  youtube_url: string | null;
  video_thumbnail: string | null;
  type: string | null;
}

interface GalleryEvent {
  id: number;
  uuid: string;
  date: string;
  originalDate?: string; // Store original date string for filtering
  location: string;
  title: string;
  description: string;
  images: string[];
  media: MediaItem[]; // Store all media items (images and videos)
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

// Format date - handles both YYYY-MM-DD and already formatted Bangla dates
const formatDate = (dateString: string, language: 'bd' | 'en'): string => {
  if (!dateString) return '';
  
  // Check if date is already in Bangla format (contains Bangla characters)
  const banglaPattern = /[০-৯]/;
  if (banglaPattern.test(dateString) && language === 'bd') {
    return dateString.trim(); // Already in Bangla, return as-is
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Invalid date, return original
    }
    
    if (language === 'en') {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } else {
      const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
      const day = toBanglaNumber(date.getDate());
      const month = months[date.getMonth()];
      const year = toBanglaNumber(date.getFullYear());
      return `${day} ${month} ${year}`;
    }
  } catch (error) {
    return dateString;
  }
};

// Convert Bangla number string to English number
const fromBanglaNumber = (str: string): number => {
  const banglaDigits: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  const englishStr = str.split('').map(char => banglaDigits[char] || char).join('');
  return parseInt(englishStr);
};

// Parse Bengali formatted date back to Date object
const parseBengaliDate = (bengaliDate: string, originalDate: string): Date => {
  try {
    // Try to use original date string if available (if it's in YYYY-MM-DD format)
    if (originalDate && /^\d{4}-\d{2}-\d{2}/.test(originalDate)) {
      return new Date(originalDate);
    }
    
    // Fallback: parse Bengali date (handles both full and short month names)
    const months: { [key: string]: number } = {
      'জানুয়ারি': 0, 'জানু': 0, 'ফেব্রুয়ারি': 1, 'ফেব': 1, 'মার্চ': 2,
      'এপ্রিল': 3, 'এপ্রি': 3, 'মে': 4, 'জুন': 5, 'জুলাই': 6, 'জুল': 6,
      'আগস্ট': 7, 'আগ': 7, 'সেপ্টেম্বর': 8, 'সেপ্টে': 8, 'সেপ': 8,
      'অক্টোবর': 9, 'অক্টো': 9, 'নভেম্বর': 10, 'নভে': 10, 'ডিসেম্বর': 11, 'ডিসে': 11,
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    // Clean the date string and split
    const cleanDate = bengaliDate.replace(/,/g, '').trim();
    const parts = cleanDate.split(/\s+/);
    
    if (parts.length >= 3) {
      const day = fromBanglaNumber(parts[0]);
      const monthKey = parts[1];
      const month = months[monthKey];
      const year = fromBanglaNumber(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return new Date();
  } catch (error) {
    return new Date();
  }
};

// Format date input value (YYYY-MM-DD) to Bengali format
const formatDateInputToBengali = (dateString: string, language: 'bd' | 'en'): string => {
  try {
    const date = new Date(dateString);
    if (language === 'en') {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } else {
      const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
      const day = toBanglaNumber(date.getDate());
      const month = months[date.getMonth()];
      const year = toBanglaNumber(date.getFullYear());
      return `${day} ${month} ${year}`;
    }
  } catch (error) {
    return dateString;
  }
};

interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export default function GalleryClient() {
  const { t, language } = useTranslation();
  const [albums, setAlbums] = useState<GalleryEvent[]>([]);
  const [allAlbums, setAllAlbums] = useState<GalleryEvent[]>([]); // Store all albums for client-side pagination
  const [filteredAlbums, setFilteredAlbums] = useState<GalleryEvent[]>([]); // Filtered albums
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dataFilter, setDataFilter] = useState<string>('');

  // Filter albums by all criteria (date, title, and data/description)
  const filterAlbumsByDate = useMemo(() => {
    let filtered = allAlbums;

    // Filter by date
    if (selectedDate) {
      const filterDate = new Date(selectedDate);
      const filterDateStart = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
      const filterDateEnd = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate(), 23, 59, 59);

      filtered = filtered.filter((album) => {
        const albumDate = parseBengaliDate(album.date, album.originalDate || '');
        return albumDate >= filterDateStart && albumDate <= filterDateEnd;
      });
    }

    // Filter by title
    if (titleFilter.trim()) {
      const searchTerm = titleFilter.trim().toLowerCase();
      filtered = filtered.filter((album) => {
        return album.title.toLowerCase().includes(searchTerm);
      });
    }

    // Filter by data/description
    if (dataFilter.trim()) {
      const searchTerm = dataFilter.trim().toLowerCase();
      filtered = filtered.filter((album) => {
        return album.description.toLowerCase().includes(searchTerm) ||
               album.location.toLowerCase().includes(searchTerm);
      });
    }

    return filtered;
  }, [allAlbums, selectedDate, titleFilter, dataFilter]);

  // Update filtered albums when filter changes
  useEffect(() => {
    setFilteredAlbums(filterAlbumsByDate);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filterAlbumsByDate]);

  // Calculate paginated albums using useMemo for immediate updates
  const paginatedAlbums = useMemo(() => {
    if (filteredAlbums.length === 0) return [];
    
    const perPage = 5;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredAlbums.slice(startIndex, endIndex);
  }, [currentPage, filteredAlbums]);

  // Update pagination meta and albums when filteredAlbums or currentPage changes
  useEffect(() => {
    if (filteredAlbums.length > 0) {
      const perPage = 5;
      const totalPages = Math.ceil(filteredAlbums.length / perPage);
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      setPaginationMeta({
        current_page: currentPage,
        last_page: totalPages,
        total: filteredAlbums.length,
        per_page: perPage,
        from: startIndex + 1,
        to: Math.min(endIndex, filteredAlbums.length),
      });
    } else {
      setPaginationMeta(null);
    }
  }, [currentPage, filteredAlbums]);

  // Update albums state when paginatedAlbums changes
  useEffect(() => {
    setAlbums(paginatedAlbums);
  }, [paginatedAlbums]);

  // Fetch all albums once on mount
  useEffect(() => {
    const fetchAlbums = async () => {
      // If we already have all albums, skip fetch
      if (allAlbums.length > 0) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
        
        // Always fetch all albums without pagination parameters
        const url = `${apiBaseUrl}/albums/list`;
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          // Get error details
          let errorMessage = `Failed to fetch albums (${response.status}): ${response.statusText}`;
          
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
                // If not JSON, use the text as error message
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

        // Filter only active albums and map to gallery events
        const mappedAlbums: GalleryEvent[] = albumsData
          .filter((album: Album) => album.status === 'active')
          .map((album: Album, index: number) => {
            // Process all media items (images and videos)
            const mediaItems: MediaItem[] = album.media.map((media) => ({
              path: media.path || null,
              youtube_url: media.youtube_url || null,
              video_thumbnail: media.video_thumbnail || null,
              type: media.type || null,
            }));

            // Get image paths for backward compatibility and lightbox
            const images = mediaItems
              .filter((media) => !media.youtube_url && media.path)
              .map((media) => media.path!);

            return {
              id: album.id,
              uuid: album.uuid,
              date: formatDate(album.date, language),
              originalDate: album.date, // Store original date for filtering
              location: album.location || '',
              title: album.name || '',
              description: album.description || '',
              images: images,
              media: mediaItems,
              color: defaultColors[index % defaultColors.length],
            };
          });

        // Store all albums for client-side pagination
        setAllAlbums(mappedAlbums);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch albums');
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [allAlbums.length, language]);

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

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const openVideoModal = (youtubeUrl: string) => {
    setSelectedVideoUrl(youtubeUrl);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideoUrl(null);
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-slate-600">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-red-600 mb-4">{t('common.error')}: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
          >
            {t('common.retry')}
          </button>
        </div>
      </section>
    );
  }

  // Only show empty message if we've finished loading and have no albums at all
  if (!loading && allAlbums.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-slate-600">{t('gallery.noAlbumsFound')}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Filters Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-6 text-lg">
                <FaFilter />
                <span>{t('gallery.filterOptions')}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date Filter */}
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm">
                    {t('gallery.dateFilter')}
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
                    {t('gallery.titleFilter')}
                  </label>
                  <input
                    type="text"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    placeholder={t('gallery.searchTitle')}
                    className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-amber-500 focus:outline-none shadow-lg text-slate-700"
                  />
                </div>
              </div>

              {/* Filter Summary and Clear Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 font-medium">
                  {language === 'bd' ? toBanglaNumber(filteredAlbums.length) : filteredAlbums.length} {t('gallery.albumsFound')}
                  {selectedDate && ` (${language === 'bd' ? 'তারিখ' : 'Date'}: ${formatDateInputToBengali(selectedDate, language)})`}
                  {titleFilter && ` (${language === 'bd' ? 'শিরোনাম' : 'Title'}: ${titleFilter})`}
                  {dataFilter && ` (${language === 'bd' ? 'বিবরণ' : 'Description'}: ${dataFilter})`}
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
                    {t('gallery.clearAllFilters')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {albums.length > 0 ? (
            albums.map((event, idx) => (
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
                      <span className="font-bold">{event.date}</span>
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
                      <span>{language === 'bd' ? toBanglaNumber(event.media.length) : event.media.length} {t('common.media')}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mt-4">
                    {event.description}
                  </p>
                </div>

                {/* Media Grid (Images and Videos) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.media.map((mediaItem, mediaIdx) => {
                    const isVideo = !!mediaItem.youtube_url;
                    const imageSrc = isVideo ? mediaItem.video_thumbnail : mediaItem.path;
                    
                    if (!imageSrc) return null;

                    return (
                      <motion.div
                        key={mediaIdx}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          if (isVideo && mediaItem.youtube_url) {
                            openVideoModal(mediaItem.youtube_url);
                          } else if (mediaItem.path) {
                            openLightbox(mediaItem.path, event.images);
                          }
                        }}
                        className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-75 transition-all z-10 ${isVideo ? 'bg-black/50' : ''}`}></div>
                        <Image
                          src={imageSrc}
                          alt={isVideo ? `${event.title} - ${language === 'bd' ? 'ভিডিও' : 'Video'} ${language === 'bd' ? toBanglaNumber(mediaIdx + 1) : (mediaIdx + 1)}` : `${event.title} - ${language === 'bd' ? 'ছবি' : 'Photo'} ${language === 'bd' ? toBanglaNumber(mediaIdx + 1) : (mediaIdx + 1)}`}
                          fill
                          className="object-cover"
                          unoptimized
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
                          {isVideo ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                              <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">YouTube</span>
                            </div>
                          ) : (
                            <FaImages className="text-4xl text-white" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            ))
          ) : (
            !loading && filteredAlbums.length > 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">{t('gallery.noAlbumsOnPage')}</p>
              </div>
            )
          )}
          {!loading && filteredAlbums.length === 0 && allAlbums.length > 0 && (selectedDate || titleFilter || dataFilter) && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">{t('gallery.noAlbumsForFilter')}</p>
              <button
                onClick={() => {
                  setSelectedDate('');
                  setTitleFilter('');
                  setDataFilter('');
                }}
                className="mt-4 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
              >
                {t('gallery.clearAllFilters')}
              </button>
            </div>
          )}

          {/* Pagination - Only show if there are more than 5 filtered albums */}
          {paginationMeta && paginationMeta.total > 5 && paginationMeta.last_page > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <FaAngleLeft />
              {t('common.previous')}
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
                    {language === 'bd' ? toBanglaNumber(page) : page}
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
              {t('common.next')}
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

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && selectedVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {getYouTubeVideoId(selectedVideoUrl) && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideoUrl)}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
