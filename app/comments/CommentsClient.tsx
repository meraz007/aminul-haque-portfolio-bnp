"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaComment, FaUser, FaPaperPlane, FaClock, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';

interface Comment {
  id: number;
  uuid?: string;
  name: string;
  text: string;
  message?: string; // For backward compatibility
  date?: string;
  created_at?: string;
  likes?: number;
  status?: string;
}

interface CommentsClientProps {
  initialComments: Comment[];
}

export default function CommentsClient({ initialComments }: CommentsClientProps) {
  const { t, language } = useTranslation();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [formData, setFormData] = useState({
    name: '',
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll for updates every 10 seconds
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsRefreshing(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/comments`, {
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          console.error(`Failed to fetch comments: ${response.statusText}`);
          return;
        }

        const data = await response.json();

        let commentsData: any[] = [];
        if (Array.isArray(data)) {
          commentsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          commentsData = data.data;
        } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
          commentsData = data.data.data;
        } else if (data.comments && Array.isArray(data.comments)) {
          commentsData = data.comments;
        } else {
          console.error('Invalid API response format:', data);
          return;
        }

        const formatDate = (dateString?: string) => {
          if (!dateString) return '';
          try {
            const date = new Date(dateString);
            return date.toLocaleDateString(language === 'bd' ? 'bn-BD' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          } catch {
            return dateString;
          }
        };

        const mappedComments: Comment[] = commentsData
          .filter((comment: any) => comment.status === 'active' || !comment.status)
          .map((comment: any) => ({
            id: comment.id,
            uuid: comment.uuid,
            name: comment.name || t('comments.anonymous'),
            text: comment.text || comment.message || '',
            message: comment.text || comment.message || '',
            created_at: comment.created_at,
            date: formatDate(comment.created_at),
            likes: comment.likes || 0,
            status: comment.status,
          }))
          .sort((a, b) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
          });

        setComments(mappedComments);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Initial fetch after component mounts
    const interval = setInterval(fetchComments, 10000); // Poll every 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [language, t]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'bd' ? 'bn-BD' : 'en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
      const response = await fetch(`${apiBaseUrl}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim() || t('comments.anonymous'),
          text: formData.text.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to submit comment: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        const newComment: Comment = {
          id: result.data.id,
          uuid: result.data.uuid,
          name: result.data.name || t('comments.anonymous'),
          text: result.data.text,
          message: result.data.text, // For backward compatibility
          created_at: result.data.created_at,
          date: formatDate(result.data.created_at),
          likes: 0,
          status: result.data.status,
        };

        setComments([newComment, ...comments]);
        setFormData({ name: '', text: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: (comment.likes || 0) + 1 }
        : comment
    ));
  };

  const getCount = (count: number) => {
    return language === 'bd' ? toBanglaNumber(count) : count;
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-pink-100 text-pink-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaComment className="inline mr-2" />
              {t('comments.yourOpinion')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {t('comments.title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('comments.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/aminul Haque/complain.jpeg"
                  alt={t('hero.title')}
                  width={600}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-pink-600 font-bold text-sm uppercase tracking-wider">{t('comments.hearYou')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                {t('comments.opinionIsStrength')}
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed text-justify">
                <p>
                  {t('comments.welcomeText1')}
                </p>
                <p>
                  {t('comments.welcomeText2')}
                </p>
                <p className="font-semibold text-pink-700">
                  {t('comments.smallCommentBigChange')}
                </p>
              </div>
              <div className="mt-6 p-6 bg-pink-50 rounded-2xl border-l-4 border-pink-600">
                <p className="text-slate-700">
                  <strong className="text-pink-700">{t('comments.myPromise')}:</strong> {t('comments.promiseText')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Comment Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-20"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
                        <FaPaperPlane className="text-white text-xl" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">
                        {t('comments.newComment')}
                      </h2>
                    </div>

                    {submitted && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-center font-semibold shadow-lg">
                        ✓ {t('comments.commentAdded')}
                      </div>
                    )}

                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-center font-semibold">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          {t('comments.yourName')}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('comments.namePlaceholder')}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-pink-500 focus:outline-none transition-all"
                          disabled={loading}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {t('comments.nameHint')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          {t('comments.yourComment')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.text}
                          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                          required
                          rows={6}
                          placeholder={t('comments.commentPlaceholder')}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-pink-500 focus:outline-none transition-all resize-none"
                          disabled={loading}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>{t('comments.sending')}</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            {t('comments.sendComment')}
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comments Display */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                  {t('comments.allComments')}
                </h2>
                <p className="text-slate-600">
                  {getCount(comments.length)} {t('comments.commentsFound')}
                </p>
              </div>

              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                    <p className="text-slate-600 text-lg">{t('comments.noComments')}</p>
                  </div>
                ) : (
                  comments.map((comment, idx) => (
                    <motion.div
                      key={comment.id || comment.uuid || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
                      <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-bold text-slate-900 text-lg">
                                {comment.name || t('comments.anonymous')}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <FaClock className="text-xs" />
                                {comment.date || formatDate(comment.created_at) || t('comments.noDate')}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-700 text-lg leading-relaxed">
                          {comment.text || comment.message || ''}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {t('comments.opinionImportant')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {t('comments.ctaText')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
