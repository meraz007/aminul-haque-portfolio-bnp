"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PressReleaseCard from '../components/PressReleaseCard';
import { FaNewspaper, FaBullhorn } from 'react-icons/fa';

interface NewsDetail {
  id: number;
  title: string;
  description: string;
  image_small?: string;
  image_medium?: string;
  image_large?: string;
  image_original?: string;
}

interface News {
  id: number;
  uuid: string;
  slug: string;
  status: string;
  news_datetime: string;
  details: NewsDetail[];
}

export default function PressReleasePage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/news`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Handle the API response structure
        let newsData: News[] = [];
        if (data.success && data.data) {
          if (data.data.data && Array.isArray(data.data.data)) {
            newsData = data.data.data;
          } else if (Array.isArray(data.data)) {
            newsData = data.data;
          }
        } else if (Array.isArray(data)) {
          newsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          newsData = data.data;
        }

        // Filter only active news
        const activeNews = newsData.filter((item: News) => item.status === 'active');
        
        setNews(activeNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Map news to press release format
  const pressReleases = news.map((item) => {
    const firstDetail = item.details && item.details.length > 0 ? item.details[0] : null;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com';
    
    // Build image URL - check if it's already a full URL or needs base URL
    let imageUrl = '/aminul_haque.jpg'; // Fallback image
    if (firstDetail?.image_large) {
      imageUrl = firstDetail.image_large.startsWith('http') 
        ? firstDetail.image_large 
        : `${apiBaseUrl}/${firstDetail.image_large}`;
    } else if (firstDetail?.image_medium) {
      imageUrl = firstDetail.image_medium.startsWith('http')
        ? firstDetail.image_medium
        : `${apiBaseUrl}/${firstDetail.image_medium}`;
    } else if (firstDetail?.image_original) {
      imageUrl = firstDetail.image_original.startsWith('http')
        ? firstDetail.image_original
        : `${apiBaseUrl}/${firstDetail.image_original}`;
    }
    
    // Extract text from HTML description and create summary
    const descriptionText = firstDetail?.description 
      ? firstDetail.description.replace(/<[^>]*>/g, '').trim()
      : '';
    const summary = descriptionText.length > 150 
      ? descriptionText.substring(0, 150) + '...'
      : descriptionText || 'সংবাদের বিবরণ';
    
    return {
      title: firstDetail?.title || 'সংবাদ',
      summary: summary,
      date: item.news_datetime || '',
      slug: item.slug || item.uuid,
      image: imageUrl,
    };
  });

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaBullhorn className="inline mr-2" />
              সর্বশেষ সংবাদ
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                প্রেস রিলিজ
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আমাদের কার্যক্রম এবং উদ্যোগ সম্পর্কে সর্বশেষ আপডেট
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-xl text-slate-600">লোড হচ্ছে...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-600 mb-4">ত্রুটি: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          ) : pressReleases.length === 0 ? (
            <div className="text-center py-20">
              <FaNewspaper className="text-6xl text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                কোন সংবাদ নেই
              </h3>
              <p className="text-slate-500">
                শীঘ্রই নতুন সংবাদ যুক্ত করা হবে
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressReleases.map((release, idx) => (
                <motion.div
                  key={release.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <PressReleaseCard {...release} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact for Press Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <FaNewspaper className="text-5xl text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                মিডিয়া যোগাযোগ
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                সাংবাদিক এবং মিডিয়া সংস্থাগুলির জন্য, অনুগ্রহ করে আমাদের প্রেস অফিসের সাথে যোগাযোগ করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:press@aminulhaque.com"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
                >
                  ইমেইল পাঠান
                </a>
                <a
                  href="/contact"
                  className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105"
                >
                  যোগাযোগ ফর্ম
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

