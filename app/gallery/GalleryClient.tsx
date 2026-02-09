"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaImages, FaTimes, FaAngleLeft, FaAngleRight, FaFilter, FaSearch } from 'react-icons/fa';
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
  media_count: string;
  is_for_home: number;
  media: Array<{
    id: number;
    uuid: string;
    path: string | null;
    type: string | null;
    mime: string;
    youtube_url: string | null;
    video_thumbnail: string | null;
  }>;
}

interface MediaItem {
  path: string | null;
  youtube_url: string | null;
  video_thumbnail: string | null;
  type: string | null;
  mime: string;
}

interface GalleryEvent {
  id: number;
  uuid: string;
  date: string;
  location: string;
  title: string;
  description: string;
  images: string[];
  media: MediaItem[];
  color: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
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

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function GalleryClient() {
  const { t, language } = useTranslation();
  const [albums, setAlbums] = useState<GalleryEvent[]>([]);
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

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  // Applied filters (only update on submit/apply)
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedDate, setAppliedDate] = useState('');

  const mapAlbums = useCallback((albumsData: Album[]): GalleryEvent[] => {
    return albumsData
      .filter((album) => album.status === 'active')
      .map((album, index) => {
        const mediaItems: MediaItem[] = album.media.map((media) => ({
          path: media.path || null,
          youtube_url: media.youtube_url || null,
          video_thumbnail: media.video_thumbnail || null,
          type: media.type || null,
          mime: media.mime || '',
        }));

        const images = mediaItems
          .filter((media) => !media.youtube_url && media.path && (media.mime?.startsWith('image/') || media.type === 'image'))
          .map((media) => media.path!);

        return {
          id: album.id,
          uuid: album.uuid,
          date: album.date || '',
          location: album.location || '',
          title: album.name || '',
          description: album.description || '',
          images,
          media: mediaItems.filter((m) => m.path || m.youtube_url),
          color: defaultColors[index % defaultColors.length],
        };
      });
  }, []);

  const fetchAlbums = useCallback(async (page: number, search: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';

      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (search.trim()) params.set('search', search.trim());
      if (date.trim()) params.set('date', date.trim());

      const url = `${apiBaseUrl}/albums/list?${params.toString()}`;

      const response = await fetch(url, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        let errorMessage = `Failed to fetch albums (${response.status}): ${response.statusText}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              if (errorData.message) errorMessage = errorData.message;
            } catch { /* use default */ }
          }
        } catch { /* use default */ }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      let albumsData: Album[] = [];
      if (data.success && data.data) {
        if (data.data.data && Array.isArray(data.data.data)) {
          albumsData = data.data.data;
        } else if (Array.isArray(data.data)) {
          albumsData = data.data;
        }
      } else if (Array.isArray(data)) {
        albumsData = data;
      }

      const mapped = mapAlbums(albumsData);
      setAlbums(mapped);

      // Set pagination meta from API
      if (data.data?.meta) {
        setPaginationMeta({
          current_page: data.data.meta.current_page,
          last_page: data.data.meta.last_page,
          total: data.data.meta.total,
          per_page: data.data.meta.per_page,
          from: data.data.meta.from || 0,
          to: data.data.meta.to || 0,
        });
      } else {
        setPaginationMeta(null);
      }
    } catch (err) {
      console.error('Error fetching albums:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch albums');
      setAlbums([]);
      setPaginationMeta(null);
    } finally {
      setLoading(false);
    }
  }, [mapAlbums]);

  // Fetch on mount and when page or applied filters change
  useEffect(() => {
    fetchAlbums(currentPage, appliedSearch, appliedDate);
  }, [currentPage, appliedSearch, appliedDate, fetchAlbums]);

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setAppliedSearch(searchInput);
    setAppliedDate(dateInput);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setDateInput('');
    setCurrentPage(1);
    setAppliedSearch('');
    setAppliedDate('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const hasActiveFilters = appliedSearch || appliedDate;

  if (loading && albums.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-slate-600">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (error && albums.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-red-600 mb-4">{t('common.error')}: {error}</p>
          <button
            onClick={() => fetchAlbums(currentPage, appliedSearch, appliedDate)}
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
          >
            {t('common.retry')}
          </button>
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
                <span>{t('gallery.filterOptions')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Title/Search Filter */}
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm">
                    {t('gallery.titleFilter')}
                  </label>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                    placeholder={t('gallery.searchTitle')}
                    className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-amber-500 focus:outline-none shadow-lg text-slate-700"
                  />
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-sm">
                    {t('gallery.dateFilter')}
                  </label>
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl font-bold border-2 border-slate-300 focus:border-amber-500 focus:outline-none shadow-lg text-slate-700"
                  />
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 font-medium">
                  {paginationMeta
                    ? <>{language === 'bd' ? toBanglaNumber(paginationMeta.total) : paginationMeta.total} {t('gallery.albumsFound')}</>
                    : !loading && <>{language === 'bd' ? '০' : '0'} {t('gallery.albumsFound')}</>
                  }
                  {loading && <span className="ml-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></span>}
                </div>
                <div className="flex gap-3">
                  {(searchInput || dateInput || hasActiveFilters) && (
                    <button
                      onClick={handleClearFilters}
                      className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all shadow-lg"
                    >
                      {t('gallery.clearAllFilters')}
                    </button>
                  )}
                  <button
                    onClick={handleApplyFilters}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    <FaSearch />
                    {language === 'bd' ? 'খুঁজুন' : 'Search'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Albums List */}
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
                      {event.date && (
                        <div className="flex items-center gap-2 text-slate-700">
                          <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                            <FaCalendarAlt className="text-white" />
                          </div>
                          <span className="font-bold">{event.date}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-700">
                          <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                            <FaMapMarkerAlt className="text-white" />
                          </div>
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-700">
                        <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg`}>
                          <FaImages className="text-white" />
                        </div>
                        <span>{language === 'bd' ? toBanglaNumber(event.media.length) : event.media.length} {t('common.media')}</span>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-slate-600 text-lg leading-relaxed mt-4">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.media.map((mediaItem, mediaIdx) => {
                      const isVideo = !!mediaItem.youtube_url;
                      const imageSrc = isVideo ? mediaItem.video_thumbnail : mediaItem.path;

                      if (!imageSrc || imageSrc === 'https://admin.aminul-haque.com/storage') return null;

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
                            alt={isVideo
                              ? `${event.title} - ${language === 'bd' ? 'ভিডিও' : 'Video'} ${language === 'bd' ? toBanglaNumber(mediaIdx + 1) : (mediaIdx + 1)}`
                              : `${event.title} - ${language === 'bd' ? 'ছবি' : 'Photo'} ${language === 'bd' ? toBanglaNumber(mediaIdx + 1) : (mediaIdx + 1)}`
                            }
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
            !loading && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">
                  {hasActiveFilters ? t('gallery.noAlbumsForFilter') : t('gallery.noAlbumsFound')}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
                  >
                    {t('gallery.clearAllFilters')}
                  </button>
                )}
              </div>
            )
          )}

          {/* Pagination */}
          {paginationMeta && paginationMeta.last_page > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                <FaAngleLeft />
                {t('common.previous')}
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((page) => {
                  const showPage =
                    page === 1 ||
                    page === paginationMeta.last_page ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage) {
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
                      disabled={loading}
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
                disabled={currentPage === paginationMeta.last_page || loading}
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
