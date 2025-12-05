import Link from 'next/link';
import { FaArrowRight, FaClock, FaNewspaper, FaImage } from 'react-icons/fa';

export default function PressReleaseCard({
  title,
  summary,
  date,
  image,
  slug,
  hasVideo,
}: {
  title: string;
  summary: string;
  date: string;
  image?: string;
  slug: string;
  hasVideo?: boolean;
}) {
  return (
    <article className="group h-full flex flex-col rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all"></div>
      <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all h-full flex flex-col border border-slate-200">
        {/* Image Section */}
        {image && (
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {hasVideo && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <span>🎥</span>
                ভিডিও
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-bold">
              <FaNewspaper />
              প্রেস রিলিজ
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock />
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
            {summary}
          </p>

          {/* Read More Link */}
          <Link 
            href={`/press-release/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:opacity-80 transition-all"
          >
            সম্পূর্ণ পড়ুন
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

