"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaArrowRight, FaVideo } from 'react-icons/fa';
import { useTranslation } from '@/app/i18n/I18nProvider';

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  slug,
  isPast = false,
  hasVideo = false,
  image,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slug: string;
  isPast?: boolean;
  hasVideo?: boolean;
  image?: string;
}) {
  const { t } = useTranslation();
  
  return (
    <article className="group h-full flex flex-col rounded-2xl overflow-hidden relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${isPast ? 'from-slate-500 to-slate-600' : 'from-emerald-500 to-green-600'} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>
      <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-slate-200 overflow-hidden">
        {/* Image/Header */}
        {image ? (
          <div className="relative w-full h-64 bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
              loading="lazy"
            />
            {isPast && hasVideo && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 z-10">
                <FaVideo />
                {t('eventCard.videoAvailable')}
              </div>
            )}
            {!isPast && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-lg z-10">
                {t('eventCard.comingSoon')}
              </div>
            )}
            {isPast && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-600 text-white rounded-full text-xs font-bold shadow-lg z-10">
                {t('eventCard.completed')}
              </div>
            )}
          </div>
        ) : (
          <div className={`relative h-64 bg-gradient-to-br ${isPast ? 'from-slate-100 to-slate-200' : 'from-emerald-50 to-green-50'} flex items-center justify-center`}>
            <FaCalendar className={`text-6xl ${isPast ? 'text-slate-400' : 'text-emerald-300'}`} />
            {isPast && hasVideo && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 z-10">
                <FaVideo />
                {t('eventCard.videoAvailable')}
              </div>
            )}
            {!isPast && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-lg z-10">
                {t('eventCard.comingSoon')}
              </div>
            )}
            {isPast && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-600 text-white rounded-full text-xs font-bold shadow-lg z-10">
                {t('eventCard.completed')}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Date & Time */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold">
              <FaCalendar />
              {date}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-bold">
              <FaClock />
              {time}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 ${isPast ? 'text-slate-700' : 'text-slate-900'}`}>
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-2 text-slate-600 mb-4">
            <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
            <span className="text-sm line-clamp-2">{location}</span>
          </div>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3 text-sm">
            {description}
          </p>

          {/* View Details Link */}
          <Link 
            href={`/events/${slug}`}
            className={`inline-flex items-center gap-2 text-sm font-bold ${isPast ? 'text-slate-600 hover:text-slate-800' : 'text-emerald-600 hover:text-emerald-700'} transition-all`}
          >
            {t('eventCard.viewDetails')}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}