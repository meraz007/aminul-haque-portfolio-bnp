import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  rating?: number;
  isActive?: boolean;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  image = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  rating = 5,
  isActive = false,
}: TestimonialCardProps) {
  return (
    <div className={`relative rounded-3xl bg-white p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 ${isActive ? 'scale-100' : 'scale-95 opacity-80'}`}>
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-green-700 opacity-10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Quote Icon */}
        <div className="mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
            <FaQuoteLeft className="text-2xl text-white" />
          </div>
        </div>

        {/* Quote Text */}
        <p className="text-slate-700 text-lg leading-relaxed mb-6">
          "{quote}"
        </p>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(rating)].map((_, idx) => (
            <FaStar key={idx} className="text-yellow-400 text-lg" />
          ))}
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={author}
            className="w-14 h-14 rounded-full object-cover ring-4 ring-green-100"
          />
          <div>
            <div className="font-bold text-slate-900 text-lg">{author}</div>
            <div className="text-sm text-slate-600">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


