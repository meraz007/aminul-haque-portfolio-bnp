"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

export default function CtaSection() {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('home', 'end-section').then(setCmsData);
  }, []);

  const sectionTitle = cmsData?.title || t('home.changeTogether');
  const sectionDesc = cmsData?.description || t('home.ctaDesc');

  return (
    <section className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                {sectionTitle}
              </h2>
              <p className="text-xl md:text-2xl text-emerald-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                {sectionDesc}
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
  );
}
