"use client";
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaHeart, 
  FaFutbol, 
  FaHome, 
  FaHands,
  FaUsers,
  FaBook,
  FaMedal,
  FaHospital,
  FaUniversity,
  FaFlag,
  FaHandHoldingHeart,
  FaBolt,
  FaBriefcase,
  FaCamera,
  FaWifi
} from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';
import { IconType } from 'react-icons';

export default function AminulManifestoPage() {
  const { t } = useTranslation();

  // Manifesto sections with translation keys
  const manifestoSections: {
    id: string;
    icon: IconType;
    titleKey: string;
    color: string;
    contentKeys: string[];
  }[] = [
    {
      id: 'rehabilitation',
      icon: FaHome,
      titleKey: 'aminulManifesto.sections.rehabilitation.title',
      color: 'from-blue-600 to-indigo-700',
      contentKeys: ['aminulManifesto.sections.rehabilitation.content1']
    },
    {
      id: 'urdu-community',
      icon: FaUsers,
      titleKey: 'aminulManifesto.sections.urduCommunity.title',
      color: 'from-violet-500 to-purple-600',
      contentKeys: ['aminulManifesto.sections.urduCommunity.content1']
    },
    {
      id: 'education-quality',
      icon: FaBook,
      titleKey: 'aminulManifesto.sections.educationQuality.title',
      color: 'from-sky-500 to-blue-600',
      contentKeys: [
        'aminulManifesto.sections.educationQuality.content1',
        'aminulManifesto.sections.educationQuality.content2'
      ]
    },
    {
      id: 'scholarship',
      icon: FaMedal,
      titleKey: 'aminulManifesto.sections.scholarship.title',
      color: 'from-amber-500 to-yellow-600',
      contentKeys: ['aminulManifesto.sections.scholarship.content1']
    },
    {
      id: 'healthcare',
      icon: FaHospital,
      titleKey: 'aminulManifesto.sections.healthcare.title',
      color: 'from-rose-500 to-red-600',
      contentKeys: [
        'aminulManifesto.sections.healthcare.content1',
        'aminulManifesto.sections.healthcare.content2',
        'aminulManifesto.sections.healthcare.content3'
      ]
    },
    {
      id: 'higher-education',
      icon: FaUniversity,
      titleKey: 'aminulManifesto.sections.higherEducation.title',
      color: 'from-indigo-500 to-blue-600',
      contentKeys: ['aminulManifesto.sections.higherEducation.content1']
    },
    {
      id: 'nationalization',
      icon: FaFlag,
      titleKey: 'aminulManifesto.sections.nationalization.title',
      color: 'from-emerald-600 to-green-700',
      contentKeys: ['aminulManifesto.sections.nationalization.content1']
    },
    {
      id: 'shelter',
      icon: FaHandHoldingHeart,
      titleKey: 'aminulManifesto.sections.shelter.title',
      color: 'from-pink-500 to-rose-600',
      contentKeys: ['aminulManifesto.sections.shelter.content1']
    },
    {
      id: 'utilities',
      icon: FaBolt,
      titleKey: 'aminulManifesto.sections.utilities.title',
      color: 'from-yellow-500 to-amber-600',
      contentKeys: ['aminulManifesto.sections.utilities.content1']
    },
    {
      id: 'employment',
      icon: FaBriefcase,
      titleKey: 'aminulManifesto.sections.employment.title',
      color: 'from-teal-500 to-emerald-600',
      contentKeys: ['aminulManifesto.sections.employment.content1']
    },
    {
      id: 'sports-academy',
      icon: FaFutbol,
      titleKey: 'aminulManifesto.sections.sportsAcademy.title',
      color: 'from-green-500 to-teal-600',
      contentKeys: ['aminulManifesto.sections.sportsAcademy.content1']
    },
    {
      id: 'religious-harmony',
      icon: FaHands,
      titleKey: 'aminulManifesto.sections.religiousHarmony.title',
      color: 'from-purple-500 to-violet-600',
      contentKeys: ['aminulManifesto.sections.religiousHarmony.content1']
    },
    {
      id: 'security',
      icon: FaCamera,
      titleKey: 'aminulManifesto.sections.security.title',
      color: 'from-slate-600 to-zinc-700',
      contentKeys: ['aminulManifesto.sections.security.content1']
    },
    {
      id: 'digital',
      icon: FaWifi,
      titleKey: 'aminulManifesto.sections.digital.title',
      color: 'from-cyan-500 to-sky-600',
      contentKeys: ['aminulManifesto.sections.digital.content1']
    }
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFileAlt className="inline mr-2" />
              {t('aminulManifesto.heroTag')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {t('aminulManifesto.heroTitle')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('aminulManifesto.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="text-center mb-8">
                <FaHeart className="text-6xl text-emerald-600 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-slate-900 mb-4">{t('aminulManifesto.myIdentity')}</h2>
              </div>
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>{t('aminulManifesto.introText1')}</p>
                <p>{t('aminulManifesto.introText2')}</p>
                <p>{t('aminulManifesto.introText3')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Sections */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              {t('aminulManifesto.myPromises')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('aminulManifesto.promisesSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-8">
            {manifestoSections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-all bg-gradient-to-r ${section.color}`}></div>
                <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${section.color} rounded-2xl flex-shrink-0`}>
                      <section.icon className="text-4xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                        {t(section.titleKey)}
                      </h3>
                      <div className="space-y-4">
                        {section.contentKeys.map((contentKey, pIdx) => (
                          <p key={pIdx} className="text-lg text-slate-700 leading-relaxed">
                            {t(contentKey)}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Commitment */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {t('aminulManifesto.myCommitment')}
              </h2>
              <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
                <p>{t('aminulManifesto.commitmentIntro')}</p>
                <p>{t('aminulManifesto.commitmentText')}</p>
                <p className="text-2xl font-black text-emerald-600 mt-8">
                  {t('aminulManifesto.commitmentQuote')}
                </p>
                <p className="text-lg text-slate-600 mt-6">
                  {t('aminulManifesto.commitmentConclusion')}
                </p>
                <div className="mt-8 text-3xl font-black text-emerald-600">
                  - {t('hero.title')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
