"use client";

import { motion } from 'framer-motion';
import { FaClock, FaFacebook, FaWhatsapp, FaLink, FaArrowLeft, FaVideo, FaImage } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n/I18nProvider';

interface PressReleaseDetailClientProps {
  pressRelease: {
    title: string;
    summary: string;
    date: string;
    fullDescription: string;
    images: string[];
    videos?: any[];
    newsLink?: string;
    reporterName?: string;
    categories?: any[];
  } | null;
}

export default function PressReleaseDetailClient({ pressRelease }: PressReleaseDetailClientProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!pressRelease) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">প্রেস রিলিজ পাওয়া যায়নি</h1>
          <Link href="/press-release" className="text-blue-600 hover:underline">
            {t('pressReleaseDetail.backToPage')}
          </Link>
        </div>
      </main>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    const title = encodeURIComponent(pressRelease.title);
    const url = encodeURIComponent(currentUrl);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Back Button */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-4xl">
          <Link 
            href="/press-release"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
          >
            <FaArrowLeft />
            {t('pressReleaseDetail.backToAll')}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Date */}
            <div className="flex items-center gap-2 text-slate-600 mb-6">
              <FaClock />
              <span className="font-medium">{pressRelease.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {pressRelease.title}
            </h1>

            {/* Summary */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              {pressRelease.summary}
            </p>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-200">
              <span className="font-bold text-slate-700">{t('pressReleaseDetail.share')}</span>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all transform hover:scale-105 font-medium"
              >
                <FaFacebook />
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 font-medium"
              >
                <FaXTwitter />
                X
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-all transform hover:scale-105 font-medium"
              >
                <FaWhatsapp />
                WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 font-medium"
              >
                <FaLink />
                {copied ? t('pressReleaseDetail.copied') : t('pressReleaseDetail.copyLink')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {pressRelease.images && pressRelease.images.length > 0 && (
        <section className="py-8 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={pressRelease.images[0]}
                alt={pressRelease.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Description */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pressRelease.fullDescription }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: '#334155'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Additional Images */}
      {pressRelease.images && pressRelease.images.length > 1 && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <FaImage className="text-blue-600" />
              {t('pressReleaseDetail.moreImages')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressRelease.images.slice(1).map((image: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl h-64"
                >
                  <Image
                    src={image}
                    alt={`${pressRelease.title} - Image ${idx + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    unoptimized
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audio/Video */}
      {pressRelease.videos && pressRelease.videos.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <FaVideo className="text-red-600" />
              {pressRelease.videos[0]?.type === 'audio' ? t('pressReleaseDetail.audio') : t('pressReleaseDetail.video')}
            </h2>
            <div className="space-y-8">
              {pressRelease.videos.map((video: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200"
                >
                  {video.title && (
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900">{video.title}</h3>
                    </div>
                  )}
                  {video.type === 'audio' ? (
                    <div className="p-8">
                      <audio controls className="w-full">
                        <source src={video.url} type="audio/mpeg" />
                        <source src={video.url} type="audio/mp3" />
                        {t('pressReleaseDetail.audioNotSupported')}
                      </audio>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      {video.url.includes('youtube.com') || video.url.includes('youtu.be') ? (
                        <iframe
                          src={video.url}
                          title={video.title || `Video ${idx + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls className="w-full h-full">
                          <source src={video.url} type="video/mp4" />
                          {t('pressReleaseDetail.videoNotSupported')}
                        </video>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* External News Link */}
      {pressRelease.newsLink && (
        <section className="py-8 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center"
            >
              <p className="text-slate-700 mb-4 font-semibold">{t('pressReleaseDetail.readOriginalNews')}</p>
              <a
                href={pressRelease.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                <FaLink />
                {t('pressReleaseDetail.newsLink')}
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Share Again Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-slate-200">
              <h3 className="text-3xl font-black text-slate-900 mb-6">
                {t('pressReleaseDetail.shareThisRelease')}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaFacebook className="text-xl" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaXTwitter className="text-xl" />
                  X
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#22C55E] transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  WhatsApp
                </button>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaLink className="text-xl" />
                  {copied ? t('pressReleaseDetail.copied') : t('pressReleaseDetail.copyLink')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to List */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Link 
            href="/press-release"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
          >
            <FaArrowLeft />
            {t('pressReleaseDetail.viewAllReleases')}
          </Link>
        </div>
      </section>
    </main>
  );
}


