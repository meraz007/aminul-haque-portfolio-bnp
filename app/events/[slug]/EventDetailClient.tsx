"use client";

import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaArrowLeft, FaVideo, FaEnvelope, FaSms, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n/I18nProvider';

interface EventDetailClientProps {
  event: any;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  const { t } = useTranslation();

  if (!event) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">{t('eventDetail.eventNotFound')}</h1>
          <Link href="/events" className="text-emerald-600 hover:underline font-bold">
            {t('eventDetail.backToEventsPage')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Back Button */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/events"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            <FaArrowLeft />
            {t('eventDetail.backToAllEvents')}
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      {event.image && (
        <section className="py-8 px-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px]"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover bg-slate-50"
                unoptimized
                loading="lazy"
              />
              {event.isPast && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-slate-600 text-white rounded-full font-bold shadow-lg">
                  {t('eventDetail.completedEvent')}
                </div>
              )}
              {!event.isPast && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-emerald-600 text-white rounded-full font-bold shadow-lg">
                  {t('eventDetail.upcomingEvent')}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Event Details */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {event.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold border border-emerald-200">
                <FaCalendar className="text-xl" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold border border-blue-200">
                <FaClock className="text-xl" />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-200">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-2xl text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{event.location}</h3>
                  <p className="text-slate-700">{event.fullAddress}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: '#334155'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600" />
              {t('eventDetail.eventLocation')}
            </h2>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={event.mapLocation.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos (For Past Events) */}
      {event.isPast && event.hasVideo && event.videos && event.videos.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <FaVideo className="text-red-600" />
                {t('eventDetail.eventVideos')}
              </h2>
              <div className="space-y-8">
                {event.videos.map((video: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200"
                  >
                    {video.title && (
                      <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <FaVideo className="text-red-600" />
                          {video.title}
                        </h3>
                      </div>
                    )}
                    <div className="aspect-video">
                      <iframe
                        src={video.url}
                        title={video.title || `Video ${idx + 1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Confirmation Info (For Upcoming Events) */}
      {/* {!event.isPast && event.confirmationMessage && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-200"
            >
              <div className="flex items-start gap-4">
                <FaCheckCircle className="text-3xl text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-3">
                    স্বয়ংক্রিয় নিশ্চিতকরণ
                    <FaEnvelope className="text-emerald-600" />
                    <FaSms className="text-blue-600" />
                  </h3>
                  <p className="text-lg text-slate-700">
                    {event.confirmationMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )} */}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {t('eventDetail.forMoreInfo')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {t('eventDetail.contactForDetails')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  {t('eventDetail.contactUs')}
                </a>
                <Link
                  href="/events"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all transform hover:scale-105"
                >
                  {t('eventDetail.viewAllEvents')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


