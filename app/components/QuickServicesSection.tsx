"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaNewspaper,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

export default function QuickServicesSection() {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('home', 'quick-services').then(setCmsData);
  }, []);

  const sectionTitle = cmsData?.title || t('home.onlineServices');
  const sectionDesc = cmsData?.description || t('home.servicesDesc');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {sectionDesc}
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
  );
}
