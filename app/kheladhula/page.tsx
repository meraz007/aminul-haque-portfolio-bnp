"use client";
import { motion } from 'framer-motion';
import { FaFutbol } from 'react-icons/fa';
import KheladhulaClient from './KheladhulaClient';
import { useTranslation } from '../i18n/I18nProvider';

export default function KheladhulaPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFutbol className="inline mr-2" />
              {t('kheladhula.heroTag')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {t('kheladhula.heroTitle')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('kheladhula.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kheladhula Client Component */}
      <KheladhulaClient />
    </main>
  );
}
