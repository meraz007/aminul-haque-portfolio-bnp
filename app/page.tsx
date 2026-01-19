"use client";

import Link from 'next/link';
import Hero from './components/Hero';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import WelcomeModal from './components/WelcomeModal';
import ImageLightbox from './components/ImageLightbox';
import { 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaNewspaper, 
  FaExclamationTriangle,
  FaChartLine,
  FaFileAlt,
  FaFlag,
  FaCalendarAlt,
  FaImages,
  FaQuoteLeft
} from 'react-icons/fa';
import Image from 'next/image';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from './i18n/I18nProvider';

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

interface Quote {
  id: number;
  status: string;
  quotes: string;
  writer: string;
}

export default function Home() {
  const { t, language } = useTranslation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Format date based on language
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
    } catch (error) {
      return dateString;
    }
  };

  const formatNumber = (num: number): string => {
    return language === 'bd' ? toBanglaNumber(num) : num.toString();
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
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

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
        const response = await fetch(`${apiBaseUrl}/quotes`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          
          let quotesData: Quote[] = [];
          if (data.success && data.data && Array.isArray(data.data)) {
            quotesData = data.data;
          } else if (Array.isArray(data)) {
            quotesData = data;
          }

          const activeQuotes = quotesData
            .filter((quote: Quote) => quote.status === 'active');
          
          setQuotes(activeQuotes);
        }
      } catch (err) {
        console.error('Error fetching quotes:', err);
      } finally {
        setQuotesLoading(false);
      }
    };

    fetchQuotes();
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

  const manifestos = [
    {
      titleKey: "home.aminulManifesto",
      descKey: "home.aminulManifestoDesc",
      icon: FaFileAlt,
      color: "from-emerald-500 to-green-600",
      link: "/aminul-manifesto"
    },
    {
      titleKey: "home.bnp31Points",
      descKey: "home.bnp31Desc",
      icon: FaFlag,
      color: "from-red-500 to-orange-600",
      link: "/bnp-31-point"
    },
    {
      titleKey: "home.bnp19Points",
      descKey: "home.bnp19Desc",
      icon: FaChartLine,
      color: "from-green-500 to-emerald-600",
      link: "/bnp-19-point"
    },
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <WelcomeModal />
      <Hero />

      {/* Manifesto Highlights */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {t('home.ourPromise')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              {t('home.manifestoPrograms')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.manifestoDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              {manifestos.map((manifesto, idx) => (
                <motion.div
                  key={manifesto.titleKey}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${manifesto.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all`}></div>
                  <Link href={manifesto.link} className="relative block bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-4 md:p-5 bg-gradient-to-br ${manifesto.color} rounded-2xl`}>
                        <manifesto.icon className="text-3xl md:text-4xl text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
                          {t(manifesto.titleKey)}
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                          {t(manifesto.descKey)}
                        </p>
                        <div className={`inline-flex items-center gap-2 font-bold bg-gradient-to-r ${manifesto.color} bg-clip-text text-transparent group-hover:gap-3 transition-all text-sm md:text-base`}>
                          {t('home.viewDetails')} <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative lg:sticky lg:top-24"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/AyL-WF3Uryo"
                    title={t('hero.title')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {t('home.campaignGallery')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              {t('home.dailyPrograms')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.galleryDesc')}
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
                            // Check if this is the 4th image and there are more images
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

      {/* Quotes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {t('home.inspiration')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              {t('home.quotesTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.quotesDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/aminul Haque/quotes.jpeg"
                    alt={t('hero.title')}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {quotesLoading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-slate-600">{t('common.loading')}</p>
                </div>
              ) : quotes.length > 0 ? (
                quotes.map((quote, idx) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all"
                  >
                    <div className="absolute top-4 left-4 text-indigo-200">
                      <FaQuoteLeft className="text-4xl" />
                    </div>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-4 relative z-10 pl-8">
                      &ldquo;{quote.quotes}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                      <p className="text-sm font-bold text-indigo-600">{quote.writer}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-600">{t('home.noQuotesFound')}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {t('home.quickServices')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              {t('home.onlineServices')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.servicesDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all"></div>
              <Link href="/voter-center" className="relative block bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 p-5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6 w-fit">
                    <FaMapMarkerAlt className="text-4xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{t('home.findVoterCenter')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {t('home.voterCenterDesc')}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                    {t('home.findNow')} <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all"></div>
              <Link href="/complaints" className="relative block bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 p-5 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6 w-fit">
                    <FaExclamationTriangle className="text-4xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{t('home.fileComplaint')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {t('home.complaintDesc')}
                  </p>
                  <div className="flex items-center gap-2 text-red-600 font-bold group-hover:gap-3 transition-all">
                    {t('home.fileNow')} <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all"></div>
              <Link href="/press-release" className="relative block bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 p-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-6 w-fit">
                    <FaNewspaper className="text-4xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{t('home.pressRelease')}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {t('home.pressReleaseDesc')}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all">
                    {t('home.viewAllReleases')} <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-12 md:p-16 shadow-2xl text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10"
              >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                  {t('home.changeTogether')}
                </h2>
                <p className="text-xl md:text-2xl text-emerald-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                  {t('home.ctaDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="px-10 py-5 bg-white text-emerald-600 font-black text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:-translate-y-1">
                    {t('hero.contactUs')}
                  </Link>
                  <Link href="/about" className="px-10 py-5 bg-emerald-700 text-white font-black text-lg rounded-xl border-2 border-white hover:bg-emerald-800 transition-all transform hover:scale-105 hover:-translate-y-1">
                    {t('hero.learnMore')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
