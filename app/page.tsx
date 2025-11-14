"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaGraduationCap,
  FaSeedling,
  FaPalette,
  FaUsers,
  FaArrowRight,
  FaChartLine,
  FaHeart,
  FaTrophy,
  FaQuoteLeft,
  FaPlay,
} from "react-icons/fa";
import Hero from "./components/Hero";
import TestimonialCarousel from "./components/TestimonialCarousel";
import WelcomeModal from "./components/WelcomeModal";
import ParticleBackground from "./components/ParticleBackground";
import MagneticCursor from "./components/MagneticCursor";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <main className="relative bg-slate-950">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Magnetic Cursor */}
      <MagneticCursor />

      <WelcomeModal />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section - Floating Cards */}
      <section className="relative py-32 px-4 -mt-32 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaUsers,
                label: "জনগণ সেবায়",
                value: "৫০,০০০+",
                color: "from-emerald-500 to-green-500",
                delay: 0,
              },
              {
                icon: FaGraduationCap,
                label: "ছাত্র উপকৃত",
                value: "১৫,০০০+",
                color: "from-blue-500 to-cyan-500",
                delay: 0.1,
              },
              {
                icon: FaSeedling,
                label: "কৃষক সহায়তা",
                value: "৮,০০০+",
                color: "from-amber-500 to-orange-500",
                delay: 0.2,
              },
              {
                icon: FaTrophy,
                label: "সফল প্রকল্প",
                value: "৫০+",
                color: "from-purple-500 to-pink-500",
                delay: 0.3,
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: stat.delay,
                  type: "spring",
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative perspective-1000"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.5,
                  }}
                  className={`absolute -inset-2 bg-linear-to-r ${stat.color} rounded-3xl blur-2xl`}
                />

                {/* Card */}
                <div className="relative glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform-3d hover-lift">
                  <div
                    className={`inline-flex p-5 bg-linear-to-br ${stat.color} rounded-2xl mb-6 shadow-2xl`}
                  >
                    <stat.icon className="text-4xl text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: stat.delay + 0.3,
                      type: "spring",
                    }}
                    className="text-5xl font-black bg-linear-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-3"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-300 font-bold text-lg">
                    {stat.label}
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section - Cinematic Reveal */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="relative mx-auto max-w-7xl" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-8 py-3 glass-dark backdrop-blur-xl text-emerald-400 rounded-full font-bold text-sm uppercase tracking-wider mb-6 border border-emerald-500/30"
            >
              আমাদের রূপকল্প
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-black mb-8">
              <span className="block text-white text-3d">একটি উন্নত</span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent text-glow"
              >
                বাংলাদেশ
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              শিক্ষা, কৃষি, শিল্প ও সংস্কৃতিতে টেকসই উন্নয়নের মাধ্যমে একটি
              সমৃদ্ধ ও ন্যায়সংগত সমাজ গড়ে তোলা আমাদের লক্ষ্য।
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaGraduationCap,
                title: "শিক্ষা বিপ্লব",
                description:
                  "প্রতিটি শিশুর জন্য বিশ্বমানের শিক্ষা নিশ্চিত করা এবং ডিজিটাল সাক্ষরতা বৃদ্ধি",
                color: "from-emerald-500 to-green-500",
                delay: 0.2,
              },
              {
                icon: FaSeedling,
                title: "কৃষি আধুনিকীকরণ",
                description:
                  "আধুনিক প্রযুক্তি ও স্মার্ট ফার্মিং এর মাধ্যমে কৃষকদের ক্ষমতায়ন",
                color: "from-blue-500 to-cyan-500",
                delay: 0.4,
              },
              {
                icon: FaPalette,
                title: "সংস্কৃতি সংরক্ষণ",
                description:
                  "আমাদের ঐতিহ্য রক্ষা করে শিল্পী ও সাংস্কৃতিক কর্মীদের সহায়তা প্রদান",
                color: "from-purple-500 to-pink-500",
                delay: 0.6,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item.delay }}
                whileHover={{ y: -15, rotateY: 5 }}
                className="group perspective-1000"
              >
                <div className="relative glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform-3d h-full">
                  {/* Icon with Glow */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block mb-6"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                      }}
                      className={`absolute inset-0 bg-linear-to-r ${item.color} rounded-2xl blur-xl`}
                    />
                    <div
                      className={`relative p-6 bg-linear-to-br ${item.color} rounded-2xl shadow-2xl`}
                    >
                      <item.icon className="text-5xl text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-glow transition-all">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {item.description}
                  </p>

                  {/* Read More Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 5 }}
                    className="flex items-center gap-2 mt-6 text-emerald-400 font-bold"
                  >
                    <span>আরও জানুন</span>
                    <FaArrowRight className="text-sm" />
                  </motion.div>

                  {/* Card Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, ${item.color}, transparent)`,
                      filter: "blur(20px)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 px-4 -mt-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaUsers, label: 'জনগণ সেবায়', value: '৫০,০০০+', color: 'from-emerald-500 to-green-600' },
              { icon: FaGraduationCap, label: 'ছাত্র উপকৃত', value: '১৫,০০০+', color: 'from-blue-500 to-cyan-600' },
              { icon: FaSeedling, label: 'কৃষক সহায়তা', value: '৮,০০০+', color: 'from-amber-500 to-orange-600' },
              { icon: FaTrophy, label: 'সফল প্রকল্প', value: '৫০+', color: 'from-purple-500 to-pink-600' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                    <stat.icon className="text-3xl text-white" />
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-semibold">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Vision Section */}
      {/* <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              আমাদের রূপকল্প
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              একটি উন্নত <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">বাংলাদেশ</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              শিক্ষা, কৃষি, শিল্প ও সংস্কৃতিতে টেকসই উন্নয়নের মাধ্যমে একটি সমৃদ্ধ ও ন্যায়সংগত সমাজ গড়ে তোলা আমাদের লক্ষ্য।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/aminul_haque.jpg"
                  alt="আমিনুল হক"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-4xl font-black text-slate-900">
                জনগণের সেবায় নিবেদিত
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                আমিনুল হক দীর্ঘদিন ধরে বাংলাদেশের সাধারণ মানুষের জীবনমান উন্নয়নে কাজ করে যাচ্ছেন। তার নেতৃত্বে শিক্ষা, কৃষি এবং সংস্কৃতি ক্ষেত্রে অসংখ্য সফল কর্মসূচি বাস্তবায়িত হয়েছে।
              </p>
              <div className="space-y-4">
                {[
                  { icon: FaGraduationCap, text: 'শিক্ষা প্রতিষ্ঠান উন্নয়ন ও বৃত্তি কর্মসূচি' },
                  { icon: FaSeedling, text: 'কৃষক সহায়তা ও আধুনিক কৃষি প্রযুক্তি' },
                  { icon: FaPalette, text: 'সংস্কৃতি সংরক্ষণ ও শিল্পীদের সহায়তা' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                      <item.icon className="text-2xl text-white" />
                    </div>
                    <span className="font-semibold text-slate-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Video/Manifesto Section - Cinematic */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-linear-to-br from-rose-900 via-slate-900 to-purple-900"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-3 glass-dark backdrop-blur-xl text-rose-400 rounded-full font-bold text-sm uppercase tracking-wider mb-6 border border-rose-500/30"
            >
              আমাদের ইশতেহার
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white text-3d mb-4">
                উন্নত আগামীর
              </span>
              <span className="block bg-linear-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent text-glow">
                রূপকল্প
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              আমাদের বিস্তৃত নির্বাচনী ইশতেহার দেখুন এবং জানুন কীভাবে আমরা একটি
              সমৃদ্ধ, অন্তর্ভুক্তিমূলক বাংলাদেশ গড়ছি
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group perspective-1000"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-8 bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 rounded-[3rem] blur-3xl"
            />

            {/* Video Container */}
            <div className="relative glass-dark backdrop-blur-xl rounded-[3rem] p-3 border-2 border-white/10 transform-3d group-hover:scale-[1.02] transition-transform duration-500">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/AyL-WF3Uryo"
                    title="আমিনুল হকের নির্বাচনী প্রচারণা"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Play Button Overlay Effect */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-emerald-500/20 blur-xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/manifesto"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-lg rounded-2xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <FaPlay className="relative z-10" />
                <span className="relative z-10">সম্পূর্ণ ইশতেহার পড়ুন</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-10 py-5 glass-dark backdrop-blur-xl text-white font-black text-lg rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all"
              >
                কর্মসূচি দেখুন
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              আমাদের কর্মসূচি
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              পরিবর্তনের <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">উদ্যোগ</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaGraduationCap,
                title: 'শিক্ষা অগ্রাধিকার',
                description: 'প্রতিটি শিশুর জন্য মানসম্পন্ন শিক্ষা নিশ্চিত করা',
                color: 'from-emerald-500 to-green-600',
              },
              {
                icon: FaSeedling,
                title: 'কৃষি উন্নয়ন',
                description: 'কৃষকদের জন্য আধুনিক প্রযুক্তি ও সহায়তা',
                color: 'from-blue-500 to-cyan-600',
              },
              {
                icon: FaPalette,
                title: 'শিল্প ও সংস্কৃতি',
                description: 'ঐতিহ্য সংরক্ষণ ও শিল্পীদের ক্ষমতায়ন',
                color: 'from-purple-500 to-pink-600',
              },
              {
                icon: FaUsers,
                title: 'যুব নেতৃত্ব',
                description: 'তরুণদের দক্ষতা উন্নয়ন ও প্রশিক্ষণ',
                color: 'from-amber-500 to-orange-600',
              },
            ].map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${program.color} rounded-xl mb-6`}>
                    <program.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{program.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{program.description}</p>
                  <button className={`mt-6 inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                    আরও জানুন <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials - Immersive */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-950 via-slate-900 to-pink-950" />

        {/* Animated Orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-3 glass-dark backdrop-blur-xl text-purple-400 rounded-full font-bold text-sm uppercase tracking-wider mb-6 border border-purple-500/30"
            >
              জনগণের মতামত
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white text-3d mb-4">সাফল্যের</span>
              <span className="block bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent text-glow">
                গল্প
              </span>
            </h2>
          </motion.div>

          <TestimonialCarousel
            testimonials={[
              {
                quote:
                  "আমিনুল হক আমাদের এলাকায় শিক্ষার মান উন্নয়নে অসাধারণ কাজ করেছেন। তার বৃত্তি কর্মসূচির কারণে আমার সন্তান উচ্চশিক্ষা গ্রহণ করতে পারছে।",
                author: "করিম উদ্দিন",
                role: "গ্রামীণ শিক্ষক",
                rating: 5,
              },
              {
                quote:
                  "কৃষি সমবায় প্রকল্পের মাধ্যমে আমরা আমাদের ফসলের ন্যায্য মূল্য পাচ্ছি। আমিনুল হকের নেতৃত্বে আমরা সংগঠিত হয়েছি এবং আমাদের জীবনযাত্রা উন্নত হয়েছে।",
                author: "রহিমা খাতুন",
                role: "কৃষক",
                rating: 5,
              },
              {
                quote:
                  "যুব নেতৃত্ব প্রশিক্ষণ প্রোগ্রাম আমার জীবন বদলে দিয়েছে। আজ আমি নিজের একটি সামাজিক উদ্যোগ চালাচ্ছি এবং সমাজে অবদান রাখতে পারছি।",
                author: "সাকিব হাসান",
                role: "উদ্যোক্তা",
                rating: 5,
              },
              {
                quote:
                  "সাংস্কৃতিক কর্মসূচির মাধ্যমে আমাদের ঐতিহ্যবাহী শিল্পকলা রক্ষা পাচ্ছে। স্থানীয় শিল্পীরা এখন তাদের প্রতিভা প্রদর্শনের সুযোগ পাচ্ছেন।",
                author: "নাসিমা আক্তার",
                role: "লোক শিল্পী",
                rating: 5,
              },
              {
                quote:
                  "আমিনুল হকের দূরদর্শী নেতৃত্বে আমাদের অঞ্চলে অনেক উন্নয়ন হয়েছে। তিনি সাধারণ মানুষের কথা শোনেন এবং তাদের সমস্যার সমাধান করেন।",
                author: "আব্দুল করিম",
                role: "সমাজসেবক",
                rating: 5,
              },
            ]}
          />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              ক্যাম্পেইন গ্যালারি
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              মুহূর্ত{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ক্যাপচার
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={
                    idx % 2 === 0
                      ? "/aminul_haque.jpg"
                      : "/aminul_nomination_post.webp"
                  }
                  alt={`গ্যালারি ছবি ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105">
              সম্পূর্ণ গ্যালারি দেখুন <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-rose-100 text-rose-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              সর্বশেষ আপডেট
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              খবর ও{" "}
              <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                গল্প
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "গ্রামীণ শিক্ষা উন্নয়ন",
                category: "শিক্ষা",
                color: "from-emerald-500 to-green-600",
              },
              {
                title: "কৃষক সমবায় সাফল্য",
                category: "কৃষি",
                color: "from-blue-500 to-cyan-600",
              },
              {
                title: "সাংস্কৃতিক উৎসব",
                category: "সংস্কৃতি",
                color: "from-purple-500 to-pink-600",
              },
            ].map((post, idx) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${post.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all`}
                ></div>
                <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-slate-200">
                  <div className={`h-48 bg-gradient-to-br ${post.color}`}></div>
                  <div className="p-6">
                    <span
                      className={`inline-block px-3 py-1 bg-gradient-to-r ${post.color} text-white text-xs font-bold rounded-full mb-3`}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      আমাদের সর্বশেষ উদ্যোগ এবং সফলতার গল্প পড়ুন...
                    </p>
                    <button
                      className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${post.color} bg-clip-text text-transparent`}
                    >
                      আরও পড়ুন <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                একসাথে পরিবর্তন আনি
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                আপনার সহযোগিতায় আমরা আরও বেশি মানুষের জীবনে ইতিবাচক পরিবর্তন
                আনতে পারি
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  যোগাযোগ করুন
                </button>
                <button className="px-8 py-4 bg-slate-100 text-slate-900 font-bold text-lg rounded-xl hover:bg-slate-200 transition-all">
                  আরও জানুন
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
