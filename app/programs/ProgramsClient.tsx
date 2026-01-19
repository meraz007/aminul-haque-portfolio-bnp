"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '../i18n/I18nProvider';

interface Program {
  id?: string | number;
  title: string;
  tagline?: string;
  description: string;
  color?: string;
  image?: string;
}

interface ProgramsClientProps {
  programs: Program[];
  error?: string | null;
}

const defaultColors = [
  'from-red-500 to-rose-600', 'from-teal-500 to-cyan-600', 'from-pink-500 to-rose-600',
  'from-indigo-500 to-purple-600', 'from-emerald-500 to-green-600', 'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600', 'from-orange-500 to-red-600',
];

export default function ProgramsClient({ programs: initialPrograms, error: initialError }: ProgramsClientProps) {
  const { t } = useTranslation();
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [error, setError] = useState<string | null>(initialError || null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll for updates every 10 seconds
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsRefreshing(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
        const response = await fetch(`${apiBaseUrl}/programs`, {
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch programs: ${response.statusText}`);
        }

        const data = await response.json();

        let programsData: any[] = [];
        if (Array.isArray(data)) {
          programsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          programsData = data.data;
        } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
          programsData = data.data.data;
        } else if (data.programs && Array.isArray(data.programs)) {
          programsData = data.programs;
        } else {
          console.error('API Response:', data);
          throw new Error('Invalid API response format');
        }

        const mappedPrograms: Program[] = programsData.map((program: any, index: number) => {
          let imageUrl = '/aminul_haque.jpg';
          if (program.image) {
            const image = program.image.trim();
            if (image.startsWith('http://') || image.startsWith('https://')) {
              const baseStorageUrl = 'https://admin.arsonconsultancy.org/storage';
              const baseStorageUrlHttp = 'http://admin.arsonconsultancy.org/storage';
              if (image !== baseStorageUrl && image !== baseStorageUrlHttp && image.length > baseStorageUrl.length) {
                imageUrl = image;
              }
            } else if (image.startsWith('/')) {
              imageUrl = image;
            } else if (image) {
              imageUrl = image.startsWith('storage/') || image.startsWith('/storage/')
                ? `https://admin.arsonconsultancy.org/${image.replace(/^\//, '')}`
                : image;
            }
          }
          const description = program.bangla_description || program.description || program.details || '';
          return {
            id: program.id || program.uuid,
            title: program.main_title || program.title || 'Untitled Program',
            tagline: program.second_title || program.tagline || program.subtitle || '',
            description: description,
            color: program.color || defaultColors[index % defaultColors.length],
            image: imageUrl,
          };
        });

        setPrograms(mappedPrograms);
        setError(null);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load programs');
      } finally {
        setIsRefreshing(false);
      }
    };

    // Initial fetch after component mounts
    const interval = setInterval(fetchPrograms, 10000); // Poll every 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              {t('programs.ourPrograms')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('programs.creatingChange')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('programs.programsDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {error && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center bg-red-50 rounded-2xl p-8 max-w-md">
                <p className="text-red-600 font-bold mb-4">{t('common.error')}: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t('common.retry')}
                </button>
              </div>
            </div>
          )}
          
          {!error && programs.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-slate-600 font-bold text-xl">{t('programs.noProgramsFound')}</p>
              </div>
            </div>
          )}
          
          {!error && programs.map((program, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={program.id || program.title || idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all`}></div>
                <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl transition-all border border-slate-200">
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all h-[400px]">
                        <Image
                          src={program.image || ''}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-500"
                          unoptimized
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                      <div className={`${isEven ? 'md:pr-4' : 'md:pl-4'}`}>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                          {program.title}
                        </h2>
                        {program.tagline && (
                          <p className={`text-lg md:text-xl font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent mb-4`}>
                            {program.tagline}
                          </p>
                        )}
                        <div 
                          className="text-slate-700 text-base md:text-lg leading-relaxed prose prose-slate max-w-none"
                          dangerouslySetInnerHTML={{ __html: program.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
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
                {t('programs.bePartOfChange')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {t('programs.joinPrograms')}
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105">
                {t('nav.contactUs')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
