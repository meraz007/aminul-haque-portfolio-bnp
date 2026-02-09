"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/I18nProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaExternalLinkAlt, FaTimes, FaSpinner } from 'react-icons/fa';

interface Tournament {
  id: number;
  title: string;
  sports_name: string;
  sports_icon: string;
  thumbnail: string;
  image: string;
  description: string;
  start_date: string;
  registration_deadline: string;
  location: string;
  participant: string;
  registration_link: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TournamentApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Tournament[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
}

export default function TournamentClient() {
  const { t, language } = useTranslation();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/tournaments`);
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        const data: TournamentApiResponse = await response.json();
        if (data.success) {
          setTournaments(data.data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch tournaments');
        }
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <>
      {/* Tournament Cards Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {t('tournament.activeTournaments')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaSpinner className="text-5xl text-emerald-500 mx-auto mb-4 animate-spin" />
              <p className="text-xl text-slate-500">{t('common.loading')}</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaTrophy className="text-6xl text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-red-500">{error}</p>
            </motion.div>
          ) : tournaments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaTrophy className="text-6xl text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-500">{t('tournament.noTournaments')}</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
                    {/* Card Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={tournament.thumbnail}
                        alt={tournament.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Sport Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-sm font-bold shadow-lg">
                          {tournament.sports_icon && (
                            <Image
                              src={tournament.sports_icon}
                              alt={tournament.sports_name}
                              width={20}
                              height={20}
                              className="w-5 h-5"
                              unoptimized
                            />
                          )}
                          {tournament.sports_name}
                        </span>
                      </div>

                      {/* Trophy Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                          <FaTrophy className="text-amber-800 text-xl" />
                        </div>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
                          {tournament.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Description */}
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {tournament.description}
                      </p>

                      {/* Info Items */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaCalendarAlt className="text-emerald-600 text-sm" />
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">{t('tournament.startDate')}</span>
                            <span className="font-semibold text-slate-700">
                              {tournament.start_date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaClock className="text-red-600 text-sm" />
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">{t('tournament.registrationDeadline')}</span>
                            <span className="font-semibold text-red-600">
                              {tournament.registration_deadline}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaMapMarkerAlt className="text-blue-600 text-sm" />
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">{t('tournament.location')}</span>
                            <span className="font-semibold text-slate-700">
                              {tournament.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaUsers className="text-purple-600 text-sm" />
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">{t('tournament.participants')}</span>
                            <span className="font-semibold text-slate-700">
                              {tournament.participant}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Join Button */}
                      <button
                        onClick={() => setSelectedTournament(tournament)}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <FaTrophy className="group-hover:rotate-12 transition-transform" />
                        {t('tournament.joinNow')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for Tournament Details */}
      <AnimatePresence>
        {selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTournament(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={selectedTournament.image}
                  alt={selectedTournament.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaTimes className="text-xl text-white" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {selectedTournament.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {t('tournament.registerViaForm')}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <p className="text-slate-600 text-sm">
                    {selectedTournament.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <FaCalendarAlt />
                      <span className="text-xs font-medium">{t('tournament.startDate')}</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {selectedTournament.start_date}
                    </span>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-600 mb-1">
                      <FaClock />
                      <span className="text-xs font-medium">{t('tournament.registrationDeadline')}</span>
                    </div>
                    <span className="font-bold text-red-600">
                      {selectedTournament.registration_deadline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <FaMapMarkerAlt />
                      <span className="text-xs font-medium">{t('tournament.location')}</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {selectedTournament.location}
                    </span>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <FaUsers />
                      <span className="text-xs font-medium">{t('tournament.participants')}</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {selectedTournament.participant}
                    </span>
                  </div>
                </div>

                {/* Google Form Button */}
                {selectedTournament.registration_link && (
                  <a
                    href={selectedTournament.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaExternalLinkAlt />
                    {t('tournament.joinNow')}
                  </a>
                )}

                <p className="text-center text-slate-400 text-sm mt-4">
                  {language === 'bd'
                    ? 'গুগল ফর্ম নতুন ট্যাবে খুলবে'
                    : 'Google Form will open in a new tab'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
