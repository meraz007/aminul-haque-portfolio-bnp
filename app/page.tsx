"use client";

import Link from 'next/link';
import Hero from './components/Hero';
import { motion } from 'framer-motion';
import WelcomeModal from './components/WelcomeModal';
import { useState, useEffect } from 'react';
// import TestimonialCarousel from './components/TestimonialCarousel';
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

interface Album {
  id: number;
  uuid: string;
  bang_name: string;
  bang_description: string;
  date: string;
  location: string;
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

// Format date to Bengali
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

interface Quote {
  id: number;
  status: string;
  quotes: string;
  writer: string;
}

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/albums/list`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          
          // Handle the API response structure
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

          // Filter active albums and take first 3
          const activeAlbums = albumsData
            .filter((album: Album) => album.status === 'active')
            .slice(0, 3);
          
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

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/quotes`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          
          // Handle the API response structure
          let quotesData: Quote[] = [];
          if (data.success && data.data && Array.isArray(data.data)) {
            quotesData = data.data;
          } else if (Array.isArray(data)) {
            quotesData = data;
          }

          // Filter only active quotes
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

  const manifestos = [
    {
      title: "আমিনুল ভাইয়ের ইশতেহার",
      description: "জনগণের জন্য, জনগণের দ্বারা - একটি সমৃদ্ধ ভবিষ্যৎ",
      icon: FaFileAlt,
      color: "from-emerald-500 to-green-600",
      link: "/aminul-manifesto"
    },
    {
      title: "বিএনপির ৩১ দফা",
      description: "রাষ্ট্র কাঠামো মেরামত ও গণতান্ত্রিক সংস্কার",
      icon: FaFlag,
      color: "from-red-500 to-orange-600",
      link: "/bnp-31-point"
    },
    {
      title: "বিএনপির ১৯ দফা",
      description: "শহীদ প্রেসিডেন্ট জিয়াউর রহমানের ঐতিহাসিক কর্মসূচি",
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
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              আমাদের প্রতিশ্রুতি
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              ইশতেহার ও <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">কর্মসূচি</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              জনগণের জন্য, জনগণের দ্বারা - আমাদের ইশতেহার ও কর্মসূচি দেখুন
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side: Manifestos - Vertical Stack */}
            <div className="space-y-6">
              {manifestos.map((manifesto, idx) => (
                <motion.div
                  key={manifesto.title}
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
                          {manifesto.title}
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                          {manifesto.description}
                        </p>
                        <div className={`inline-flex items-center gap-2 font-bold bg-gradient-to-r ${manifesto.color} bg-clip-text text-transparent group-hover:gap-3 transition-all text-sm md:text-base`}>
                          বিস্তারিত দেখুন <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Video Embed */}
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
                    title="আমিনুল হকের নির্বাচনী প্রচারণা"
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
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              ক্যাম্পেইন গ্যালারি
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              মুহূর্ত <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">ক্যাপচার</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              জনগণের সাথে আমাদের যাত্রার অবিস্মরণীয় মুহূর্তগুলো
            </p>
          </motion.div>

          <div className="space-y-16">
            {albumsLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
                <p className="text-xl text-slate-600">লোড হচ্ছে...</p>
              </div>
            ) : albums.length > 0 ? (
              albums.map((album, idx) => {
                // Get only image media
                const images = album.media
                  .filter((media) => media.type === 'image')
                  .map((media) => media.path)
                  .slice(0, 8); // Show max 8 images

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
                      {/* Event Header */}
                      <div className="mb-8">
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                          {album.bang_name}
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
                            <span>{images.length} ফটো</span>
                          </div>
                        </div>
                        {album.bang_description && (
                          <p className="text-slate-600 text-lg leading-relaxed mt-4">
                            {album.bang_description}
                          </p>
                        )}
                      </div>

                      {/* Images Grid */}
                      {images.length > 0 && (
                        <div className={`grid grid-cols-2 ${images.length <= 4 ? 'md:grid-cols-4' : 'md:grid-cols-4'} gap-4`}>
                          {images.map((image, imageIdx) => (
                            <motion.div
                              key={imageIdx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: imageIdx * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              className="group relative cursor-pointer rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-all"
                            >
                              <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-75 transition-all z-10`}></div>
                              <img
                                src={image}
                                alt={`${album.bang_name} - ছবি ${imageIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
                                <FaImages className="text-4xl text-white" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-slate-600">কোনো অ্যালবাম পাওয়া যায়নি</p>
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <Link href="/gallery" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105">
              সম্পূর্ণ গ্যালারি দেখুন <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              অনুপ্রেরণা
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">উক্তি</span> ও <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">বাণী</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              জনগণের জন্য, জনগণের সাথে - আমিনুল হকের অনুপ্রেরণাদায়ক বাণী
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
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
                    src="/aminul_haque.jpg"
                    alt="আমিনুল হক"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Quotes Section */}
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
                  <p className="text-slate-600">লোড হচ্ছে...</p>
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
                      "{quote.quotes}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                      <p className="text-sm font-bold text-indigo-600">{quote.writer}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-600">কোনো উক্তি পাওয়া যায়নি</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Programs Section */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              আমাদের কাজ
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              মূল <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">কর্মসূচি</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              ঢাকাকে আরও বাসযোগ্য ও সমৃদ্ধ করতে আমাদের পাঁচটি মূল ক্ষেত্র
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyPrograms.map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all`}></div>
                <Link href={program.link} className="relative block bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full hover:-translate-y-2">
                  <div className={`inline-flex p-5 bg-gradient-to-br ${program.color} rounded-2xl mb-6`}>
                    <program.icon className="text-4xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-lg font-bold text-slate-500 mb-4">
                    {program.subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                    বিস্তারিত দেখুন <FaArrowRight />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Quick Services Section - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              দ্রুত সেবা
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              অনলাইন <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">সেবা সমূহ</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              ঘরে বসেই পাবেন দ্রুত ও কার্যকর সেবা
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
                  <h3 className="text-2xl font-black text-slate-900 mb-3">ভোট কেন্দ্র খুঁজুন</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    আপনার এনআইডি, মোবাইল নম্বর বা এলাকার নাম দিয়ে সহজেই আপনার ভোট কেন্দ্রের অবস্থান খুঁজে নিন
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                    এখনই খুঁজুন <FaArrowRight />
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
                  <h3 className="text-2xl font-black text-slate-900 mb-3">অভিযোগ দাখিল</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    আপনার সমস্যা ও অভিযোগ জানান। আমরা সমাধানে প্রতিশ্রুতিবদ্ধ এবং দ্রুত ব্যবস্থা নিতে প্রস্তুত
                  </p>
                  <div className="flex items-center gap-2 text-red-600 font-bold group-hover:gap-3 transition-all">
                    অভিযোগ করুন <FaArrowRight />
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
                  <h3 className="text-2xl font-black text-slate-900 mb-3">প্রেস রিলিজ</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    আমাদের সর্বশেষ প্রেস রিলিজ, ঘোষণা এবং কার্যক্রম সম্পর্কে জানুন এবং মিডিয়া কভারেজ দেখুন
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all">
                    সব রিলিজ দেখুন <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              জনগণের মতামত
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              সাফল্যের <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">গল্প</span>
            </h2>
          </motion.div>
          <TestimonialCarousel 
            testimonials={[
              {
                quote: 'আমিনুল হক আমাদের এলাকায় শিক্ষার মান উন্নয়নে অসাধারণ কাজ করেছেন। তার বৃত্তি কর্মসূচির কারণে আমার সন্তান উচ্চশিক্ষা গ্রহণ করতে পারছে।',
                author: 'করিম উদ্দিন',
                role: 'গ্রামীণ শিক্ষক',
                rating: 5
              },
              {
                quote: 'কৃষি সমবায় প্রকল্পের মাধ্যমে আমরা আমাদের ফসলের ন্যায্য মূল্য পাচ্ছি। আমিনুল হকের নেতৃত্বে আমরা সংগঠিত হয়েছি এবং আমাদের জীবনযাত্রা উন্নত হয়েছে।',
                author: 'রহিমা খাতুন',
                role: 'কৃষক',
                rating: 5
              },
              {
                quote: 'যুব নেতৃত্ব প্রশিক্ষণ প্রোগ্রাম আমার জীবন বদলে দিয়েছে। আজ আমি নিজের একটি সামাজিক উদ্যোগ চালাচ্ছি এবং সমাজে অবদান রাখতে পারছি।',
                author: 'সাকিব হাসান',
                role: 'উদ্যোক্তা',
                rating: 5
              },
              {
                quote: 'সাংস্কৃতিক কর্মসূচির মাধ্যমে আমাদের ঐতিহ্যবাহী শিল্পকলা রক্ষা পাচ্ছে। স্থানীয় শিল্পীরা এখন তাদের প্রতিভা প্রদর্শনের সুযোগ পাচ্ছেন।',
                author: 'নাসিমা আক্তার',
                role: 'লোক শিল্পী',
                rating: 5
              },
              {
                quote: 'আমিনুল হকের দূরদর্শী নেতৃত্বে আমাদের অঞ্চলে অনেক উন্নয়ন হয়েছে। তিনি সাধারণ মানুষের কথা শোনেন এবং তাদের সমস্যার সমাধান করেন।',
                author: 'আব্দুল করিম',
                role: 'সমাজসেবক',
                rating: 5
              },
            ]}
          />
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
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
                  একসাথে পরিবর্তন আনি
                </h2>
                <p className="text-xl md:text-2xl text-emerald-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                  আপনার সহযোগিতায় আমরা আরও বেশি মানুষের জীবনে ইতিবাচক পরিবর্তন আনতে পারি। আমাদের সাথে যুক্ত হয়ে একটি সমৃদ্ধ বাংলাদেশ গড়ুন।
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="px-10 py-5 bg-white text-emerald-600 font-black text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:-translate-y-1">
                    যোগাযোগ করুন
                  </Link>
                  <Link href="/about" className="px-10 py-5 bg-emerald-700 text-white font-black text-lg rounded-xl border-2 border-white hover:bg-emerald-800 transition-all transform hover:scale-105 hover:-translate-y-1">
                    আরও জানুন
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
