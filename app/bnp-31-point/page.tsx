"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaFlag, FaCheck } from 'react-icons/fa';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

export default function BNP31PointPage() {
  const { t, language } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [endCmsData, setEndCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('bnp-31-point', 'national-program').then(setCmsData);
    fetchCmsPage('bnp-31-point', 'end-section').then(setEndCmsData);
  }, []);

  const getPointNumber = (num: number) => {
    return language === 'bd' ? toBanglaNumber(num) : num.toString();
  };

  const points = Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    titleKey: `bnp31Point.points.p${i + 1}.title`,
    contentKey: `bnp31Point.points.p${i + 1}.content`
  }));

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFlag className="inline mr-2" />
              {t('bnp31Point.heroTag')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {cmsData?.title || t('bnp31Point.heroTitle')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {cmsData?.description || t('bnp31Point.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200"
          >
            <FaFileAlt className="text-6xl text-red-600 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-900 mb-6 text-center">{t('bnp31Point.introTitle')}</h2>
            <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">{t('bnp31Point.introSubtitle')}
            </h3>
            <p className="text-xl text-slate-700 leading-relaxed mb-6 text-center">
              {t('bnp31Point.introText1')}
            </p>
            <p className="text-xl text-slate-700 leading-relaxed text-center">
              {t('bnp31Point.introText2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 31 Points List */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-[74rem]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('bnp31Point.pointsTitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {points.map((point, idx) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 12) * 0.05 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg mb-3">
                      {getPointNumber(point.id)}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {t(point.titleKey)}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    {t(point.contentKey)}
                  </p>
                </div>
              </motion.div>
            ))}
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
                {endCmsData?.title || t('bnp31Point.ctaTitle')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {endCmsData?.description || t('bnp31Point.ctaText')}
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105"
              >
                {t('bnp31Point.ctaButton')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
