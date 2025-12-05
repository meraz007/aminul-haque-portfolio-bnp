import Link from 'next/link';
import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';

const categoryColors: { [key: string]: string } = {
  'শিক্ষা': 'from-emerald-500 to-green-600',
  'কৃষি': 'from-blue-500 to-cyan-600',
  'সংস্কৃতি': 'from-purple-500 to-pink-600',
  'যুব উন্নয়ন': 'from-amber-500 to-orange-600',
  'সম্প্রদায়': 'from-rose-500 to-red-600',
  'default': 'from-slate-500 to-slate-600',
};

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  category,
  href,
}: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  href: string;
}) {
  const colorGradient = categoryColors[category] || categoryColors['default'];

  return (
    <article className="group h-full flex flex-col rounded-2xl overflow-hidden relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${colorGradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all`}></div>
      <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all h-full flex flex-col border border-slate-200">
        {/* Category Badge */}
        <div className={`relative bg-gradient-to-br ${colorGradient} px-6 py-8`}>
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg">
              <FaTag className="text-xs" />
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1.5">
              <FaClock />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaUser />
              {author}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
            {excerpt}
          </p>

          {/* Read More Link */}
          <Link 
            href={href} 
            className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${colorGradient} bg-clip-text text-transparent hover:opacity-80 transition-all`}
          >
            আরও পড়ুন 
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
