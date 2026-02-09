"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

interface Quote {
  id: number;
  status: string;
  quotes: string;
  writer: string;
}

export default function InspirationSection() {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(true);

  useEffect(() => {
    fetchCmsPage('home', 'inspiration').then(setCmsData);
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
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

          const activeQuotes = quotesData.filter(
            (quote: Quote) => quote.status === 'active'
          );

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

  const sectionTitle = cmsData?.title || t('home.quotesTitle');
  const sectionDesc = cmsData?.description || t('home.quotesDesc');
  const sectionImage = cmsData?.title_image || '/aminul Haque/quotes.jpeg';

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {sectionDesc}
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
                  src={sectionImage}
                  alt={sectionTitle || t('hero.title')}
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized
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
                    <p className="text-sm font-bold text-indigo-600">
                      {quote.writer}
                    </p>
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
  );
}
