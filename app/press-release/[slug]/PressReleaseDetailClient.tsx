"use client";

import { motion } from 'framer-motion';
import { FaClock, FaFacebook, FaWhatsapp, FaLink, FaArrowLeft, FaVideo, FaImage } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { useState } from 'react';

interface PressReleaseDetailClientProps {
  pressRelease: any;
}

export default function PressReleaseDetailClient({ pressRelease }: PressReleaseDetailClientProps) {
  const [copied, setCopied] = useState(false);

  if (!pressRelease) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">প্রেস রিলিজ পাওয়া যায়নি</h1>
          <Link href="/press-release" className="text-blue-600 hover:underline">
            প্রেস রিলিজ পেজে ফিরে যান
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
            সব প্রেস রিলিজে ফিরে যান
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
              <span className="font-bold text-slate-700">শেয়ার করুন:</span>
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
                {copied ? 'কপি হয়েছে!' : 'লিংক কপি'}
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
              <img
                src={pressRelease.images[0]}
                alt={pressRelease.title}
                className="w-full h-auto object-cover"
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
              আরও ছবি
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressRelease.images.slice(1).map((image: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={image}
                    alt={`${pressRelease.title} - Image ${idx + 2}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos */}
      {pressRelease.videos && pressRelease.videos.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <FaVideo className="text-red-600" />
              ভিডিও
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
                  <div className="aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title || `Video ${idx + 1}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              ))}
            </div>
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
                এই প্রেস রিলিজ শেয়ার করুন
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
                  {copied ? 'কপি হয়েছে!' : 'লিংক কপি'}
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
            সব প্রেস রিলিজ দেখুন
          </Link>
        </div>
      </section>
    </main>
  );
}


