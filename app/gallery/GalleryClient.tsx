"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaImages, FaTimes, FaChevronLeft, FaChevronRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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

interface GalleryEvent {
  id: number;
  uuid: string;
  date: string;
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

// Format date from YYYY-MM-DD to Bengali format
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
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
  const [albums, setAlbums] = useState<GalleryEvent[]>([]);
  const [allAlbums, setAllAlbums] = useState<GalleryEvent[]>([]); // Store all albums for client-side pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate paginated albums using useMemo for immediate updates
  const paginatedAlbums = useMemo(() => {
    if (allAlbums.length === 0) return [];
    
    const perPage = 5;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return allAlbums.slice(startIndex, endIndex);
  }, [currentPage, allAlbums]);

  // Update pagination meta and albums when allAlbums or currentPage changes
  useEffect(() => {
    if (allAlbums.length > 0) {
      const perPage = 5;
      const totalPages = Math.ceil(allAlbums.length / perPage);
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      setPaginationMeta({
        current_page: currentPage,
        last_page: totalPages,
        total: allAlbums.length,
        per_page: perPage,
        from: startIndex + 1,
        to: Math.min(endIndex, allAlbums.length),
      });
    }
  }, [currentPage, allAlbums]);

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
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        
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
            // Get only image media
            const images = album.media
              .filter((media) => media.type === 'image')
              .map((media) => media.path);

            return {
              id: album.id,
              uuid: album.uuid,
              date: formatDate(album.date),
              location: album.location || '',
              title: album.bang_name || '',
              description: album.bang_description || '',
              images: images,
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
  }, [allAlbums.length]);

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
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-slate-600">লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xl text-red-600 mb-4">ত্রুটি: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </section>
    );
  }

  // Only show empty message if we've finished loading and have no albums at all
  if (!loading && allAlbums.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xl text-slate-600">কোনো অ্যালবাম পাওয়া যায়নি</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl space-y-16">
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
                      <span>{event.images.length} ফটো</span>
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
                      <img
                        src={image}
                        alt={`${event.title} - ছবি ${imageIdx + 1}`}
                        className="w-full h-full object-cover"
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
            !loading && allAlbums.length > 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">এই পাতায় কোনো অ্যালবাম নেই</p>
              </div>
            )
          )}
        </div>

        {/* Pagination - Only show if there are more than 5 albums */}
        {paginationMeta && paginationMeta.total > 5 && paginationMeta.last_page > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <FaAngleLeft />
              পূর্ববর্তী
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
              পরবর্তী
              <FaAngleRight />
            </button>
          </div>
        )}

      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Navigation Buttons */}
            {currentEventImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                >
                  <FaChevronRight className="text-2xl" />
                </button>
              </>
            )}

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-lg text-white rounded-full font-bold">
              {currentImageIndex + 1} / {currentEventImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
