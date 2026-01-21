"use client";
import { motion } from 'framer-motion';
import { FaFutbol, FaTrophy, FaMedal, FaFlag, FaStar, FaAward } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from '../i18n/I18nProvider';

export default function AboutPage() {
  const { t } = useTranslation();

  // Timeline data with translation keys
  const timelineItems = [
    {
      dateKey: 'about.timeline.mohammedan1994.date',
      titleKey: 'about.timeline.mohammedan1994.title',
      descriptionKey: 'about.timeline.mohammedan1994.description',
      badge: 'about.club',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      align: 'left' as const,
    },
    {
      dateKey: 'about.timeline.muktijoddha.date',
      titleKey: 'about.timeline.muktijoddha.title',
      descriptionKey: 'about.timeline.muktijoddha.description',
      badge: 'about.club',
      badgeColor: 'bg-blue-100 text-blue-700',
      align: 'right' as const,
    },
    {
      dateKey: 'about.timeline.abahani.date',
      titleKey: 'about.timeline.abahani.title',
      descriptionKey: 'about.timeline.abahani.description',
      badge: 'about.club',
      badgeColor: 'bg-purple-100 text-purple-700',
      align: 'left' as const,
    },
    {
      dateKey: 'about.timeline.saff2003.date',
      titleKey: 'about.timeline.saff2003.title',
      descriptionKey: 'about.timeline.saff2003.description',
      badge: 'about.honor',
      badgeColor: 'bg-amber-100 text-amber-700',
      align: 'right' as const,
    },
    {
      dateKey: 'about.timeline.mohammedan2008.date',
      titleKey: 'about.timeline.mohammedan2008.title',
      descriptionKey: 'about.timeline.mohammedan2008.description',
      badge: 'about.club',
      badgeColor: 'bg-rose-100 text-rose-700',
      align: 'left' as const,
    },
    {
      dateKey: 'about.timeline.sagames2010.date',
      titleKey: 'about.timeline.sagames2010.title',
      descriptionKey: 'about.timeline.sagames2010.description',
      badge: 'about.honor',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      align: 'right' as const,
    },
    {
      dateKey: 'about.timeline.sheikhjamal.date',
      titleKey: 'about.timeline.sheikhjamal.title',
      descriptionKey: 'about.timeline.sheikhjamal.description',
      badge: 'about.club',
      badgeColor: 'bg-teal-100 text-teal-700',
      align: 'left' as const,
    },
    {
      dateKey: 'about.timeline.federationcup.date',
      titleKey: 'about.timeline.federationcup.title',
      descriptionKey: 'about.timeline.federationcup.description',
      badge: 'about.award',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      align: 'right' as const,
    },
  ];

  // Career stats with translation keys
  const careerStats = [
    { icon: FaFlag, labelKey: 'about.internationalMatches', valueKey: 'about.internationalMatchesValue', color: 'from-emerald-500 to-green-600' },
    { icon: FaTrophy, labelKey: 'about.clubTitles', valueKey: 'about.clubTitlesValue', color: 'from-blue-500 to-cyan-600' },
    { icon: FaMedal, labelKey: 'about.careerYears', valueKey: 'about.careerYearsValue', color: 'from-purple-500 to-pink-600' },
    { icon: FaStar, labelKey: 'about.specialHonors', valueKey: 'about.specialHonorsValue', color: 'from-amber-500 to-orange-600' },
  ];
  
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              {t('about.aboutUs')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('about.legendaryGoalkeeper')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">{t('about.personalInfo')}</span>
              <h2 className="text-5xl font-black text-slate-900 mt-3 mb-6">
                {t('about.fullName')}
              </h2>
              <div className="space-y-4 text-lg text-slate-700">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFlag className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">{t('about.birthDate')}</p>
                    <p>{t('about.birthDateValue')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFlag className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">{t('about.birthPlace')}</p>
                    <p>{t('about.birthPlaceValue')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFutbol className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">{t('about.position')}</p>
                    <p>{t('about.positionValue')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaMedal className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">{t('about.height')}</p>
                    <p>{t('about.heightValue')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/aminul Haque/about.jpeg"
                  alt={t('about.fullName')}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.biography')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>{t('about.biographyText1')}</p>
                <p>{t('about.biographyText2')}</p>
                <p>{t('about.biographyText3')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Stats */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.careerStats')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerStats.map((stat, idx) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border border-slate-200">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                    <stat.icon className="text-3xl text-white" />
                  </div>
                  <div className="text-5xl font-black text-slate-900 mb-2">{t(stat.valueKey)}</div>
                  <div className="text-slate-600 font-medium">{t(stat.labelKey)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career & Honors Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.careerHonors')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('about.legendaryJourney')}
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 via-blue-200 to-purple-200 hidden md:block"></div>

            <div className="space-y-12">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex items-center ${
                    item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                    <div className="w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-lg"></div>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[38%] ${item.align === 'left' ? 'md:ml-[100px]' : 'md:mr-[100px]'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm text-slate-500 font-semibold">{t(item.dateKey)}</span>
                        <span className={`px-3 py-1 ${item.badgeColor} rounded-full text-xs font-bold uppercase tracking-wider`}>
                          {t(item.badge)}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {t(item.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Career */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.internationalCareer')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('about.internationalCareerDesc')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200"
            >
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>{t('about.internationalCareerText1')}</p>
                <p><strong>{t('about.internationalCareerText2')}</strong></p>
                <p><strong>{t('about.internationalCareerText3')}</strong></p>
                <p>{t('about.internationalCareerText4')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Life */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.earlyLife')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>{t('about.earlyLifeText1')}</p>
                <p>{t('about.earlyLifeText2')}</p>
                <p>{t('about.earlyLifeText3')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Political Career */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {t('about.politicalLife')}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('about.newChapter')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p className="text-xl font-semibold text-slate-900">
                    {t('about.politicalIntro')}
                  </p>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-l-4 border-red-600">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                      <FaFlag className="text-red-600" />
                      {t('about.bnpMember')}
                    </h3>
                    <p>{t('about.bnpRole')}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="font-semibold text-slate-900 mb-3">{t('about.politicalStruggle')}</p>
                    <p>{t('about.politicalStruggleText')}</p>
                  </div>
                  <p>{t('about.politicalConclusion')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
