"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaArrowRight,
  FaChartLine,
  FaFileAlt,
  FaFlag,
} from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

const manifestos = [
  {
    titleKey: "home.aminulManifesto",
    descKey: "home.aminulManifestoDesc",
    icon: FaFileAlt,
    color: "from-emerald-500 to-green-600",
    link: "/aminul-manifesto"
  },
  {
    titleKey: "home.bnp31Points",
    descKey: "home.bnp31Desc",
    icon: FaFlag,
    color: "from-red-500 to-orange-600",
    link: "/bnp-31-point"
  },
  {
    titleKey: "home.bnp19Points",
    descKey: "home.bnp19Desc",
    icon: FaChartLine,
    color: "from-green-500 to-emerald-600",
    link: "/bnp-19-point"
  },
];

export default function ManifestoHighlightsSection() {
  const { t } = useTranslation();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('home', 'manifesto-programs').then(setCmsData);
  }, []);

  const sectionTitle = cmsData?.title || t('home.manifestoPrograms');
  const sectionDesc = cmsData?.description || t('home.manifestoDesc');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
            {t('home.ourPromise')}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {sectionDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            {manifestos.map((manifesto, idx) => (
              <motion.div
                key={manifesto.titleKey}
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
                        {t(manifesto.titleKey)}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                        {t(manifesto.descKey)}
                      </p>
                      <div className={`inline-flex items-center gap-2 font-bold bg-gradient-to-r ${manifesto.color} bg-clip-text text-transparent group-hover:gap-3 transition-all text-sm md:text-base`}>
                        {t('home.viewDetails')} <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

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
                  title={t('hero.title')}
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
  );
}
