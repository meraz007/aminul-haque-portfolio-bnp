"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-6"
        >
          <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider">
            জনগণের সেবায়
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900">
            সত্যিকারের পরিবর্তন
            <br />
            <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              আপনার জীবনে
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-prose leading-relaxed">
            শিক্ষা, কৃষি, শিল্প ও সংস্কৃতির মাধ্যমে আমাদের জনগণকে ক্ষমতায়ন করা। বাংলাদেশের উজ্জ্বল ভবিষ্যৎ গড়তে আমাদের সাথে যুক্ত হন।
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-xl hover:bg-emerald-700 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              আরও জানুন
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/aminul_haque.jpg"
              alt="আমিনুল হক"
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
