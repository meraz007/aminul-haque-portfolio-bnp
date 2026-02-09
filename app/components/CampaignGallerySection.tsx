"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImages,
} from 'react-icons/fa';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';
import ImageLightbox from './ImageLightbox';

interface Album {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  status: string;
  media: Array<{
    id: number;
    uuid: string;
    path: string;
    type: string;
  }>;
}

const defaultColors = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-green-600',
  'from-purple-500 to-pink-600',
  'from-blue-500 to-cyan-600',
  'from-red-500 to-rose-600',
];

export default function CampaignGallerySection() {
  const { t, language } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchCmsPage('home', 'campaign-gallery').then(setCmsData);
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }

      if (language === 'bd') {
        const banglaPattern = /[০-৯]/;
        if (banglaPattern.test(dateString)) {
          return dateString.trim();
        }
        const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
        const day = toBanglaNumber(date.getDate());
        const month = months[date.getMonth()];
        const year = toBanglaNumber(date.getFullYear());
        return `${day} ${month} ${year}`;
      } else {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      }
    } catch {
      return dateString;
    }
  };

  const formatNumber = (num: number): string => {
    return language === 'bd' ? toBanglaNumber(num) : num.toString();
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/albums/list`, {
          cache: 'no-store',
        });

        if (response.ok) {
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
          } else if (data.data && Array.isArray(data.data)) {
            albumsData = data.data;
          }

          const activeAlbums = albumsData
            .filter((album: Album) => album.status === 'active')
            .slice(0, 6);

          setAlbums(activeAlbums);
        }
      } catch (err) {
        console.error('Error fetching albums:', err);
      } finally {
        setAlbumsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

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

  const sectionBadge = t('home.campaignGallery');
  const sectionTitle = cmsData?.title || t('home.dailyPrograms');
  const sectionDesc = cmsData?.description || t('home.galleryDesc');

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {sectionBadge}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              {sectionTitle}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {sectionDesc}
            </p>
          </motion.div>

          <div className="space-y-16">
            {albumsLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
                <p className="text-xl text-slate-600">{t('common.loading')}</p>
              </div>
            ) : albums.length > 0 ? (
              albums.map((album, idx) => {
                const allImages = album.media
                  .filter((media) => media.type === 'image')
                  .map((media) => media.path);

                const images = allImages.slice(0, 4);
                const remainingCount = allImages.length - 4;

                const color = defaultColors[idx % defaultColors.length];

                return (
                  <motion.div
                    key={album.uuid || album.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-3xl blur-2xl opacity-20`}></div>
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                      <div className="mb-8">
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                          {album.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className={`p-2 bg-gradient-to-r ${color} rounded-lg`}>
                              <FaCalendarAlt className="text-white" />
                            </div>
                            <span className="font-bold">{formatDate(album.date)}</span>
                          </div>
                          {album.location && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <div className={`p-2 bg-gradient-to-r ${color} rounded-lg`}>
                                <FaMapMarkerAlt className="text-white" />
                              </div>
                              <span>{album.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-slate-700">
                            <div className={`p-2 bg-gradient-to-r ${color} rounded-lg`}>
                              <FaImages className="text-white" />
                            </div>
                            <span>{formatNumber(allImages.length)} {t('common.photos')}</span>
                          </div>
                        </div>
                        {album.description && (
                          <p className="text-slate-600 text-lg leading-relaxed mt-4">
                            {album.description}
                          </p>
                        )}
                      </div>

                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map((image, imageIdx) => {
                            const isLastVisible = imageIdx === 3 && remainingCount > 0;

                            return (
                              <motion.div
                                key={imageIdx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: imageIdx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => openLightbox(image, allImages)}
                                className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-all"
                              >
                                <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-75 transition-all z-10`}></div>
                                <Image
                                  src={image}
                                  alt={`${album.name} - ${formatNumber(imageIdx + 1)}`}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                  loading="lazy"
                                />

                                {isLastVisible && (
                                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 group-hover:bg-black/80 transition-all">
                                    <div className="text-white text-center">
                                      <div className="text-4xl font-black mb-1">{formatNumber(remainingCount)}</div>
                                      <div className="text-sm font-semibold opacity-90">{t('common.morePhotos')}</div>
                                    </div>
                                  </div>
                                )}

                                {!isLastVisible && (
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
                                    <FaImages className="text-4xl text-white" />
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">{t('home.noAlbumsFound')}</p>
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <Link href="/gallery" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105">
              {t('home.viewFullGallery')} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

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
