"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaStar, FaPlay } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950"
    >
      {/* Animated Background Gradient Mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-40"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-linear-to-r from-pink-500 to-orange-500 rounded-full blur-3xl"
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-emerald-400/30"
          >
            <FaStar className="text-yellow-400 animate-pulse" />
            <span className="text-emerald-300 font-semibold text-sm">
              জনগণের সেবায় নিবেদিত
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaStar className="text-yellow-400 text-xs" />
            </motion.div>
          </motion.div>

          {/* Main Heading with 3D Text Effect */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl font-black leading-none"
            >
              <span className="block text-white text-3d">সত্যিকারের</span>
              <motion.span
                className="block mt-2 bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                পরিবর্তন
              </motion.span>
              <span className="block mt-2 text-white text-glow">
                আপনার জীবনে
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-slate-300 text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              শিক্ষা, কৃষি, শিল্প ও সংস্কৃতির মাধ্যমে আমাদের জনগণকে ক্ষমতায়ন
              করা। বাংলাদেশের উজ্জ্বল ভবিষ্যৎ গড়তে{" "}
              <span className="text-emerald-400 font-bold">
                আমাদের সাথে যুক্ত হন।
              </span>
            </motion.p>
          </div>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="group relative px-8 py-5 bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-emerald-600 to-cyan-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  আরও জানুন
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent)",
                  }}
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/programs"
                className="group px-8 py-5 glass text-white font-bold rounded-2xl border-2 border-emerald-400/50 hover:border-emerald-400 transition-all backdrop-blur-xl"
              >
                <span className="flex items-center gap-2 text-lg">
                  <FaPlay className="text-emerald-400" />
                  কর্মসূচি দেখুন
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-slate-700/50"
          >
            {[
              { value: "৫০K+", label: "জনগণ সেবায়" },
              { value: "১৫K+", label: "ছাত্র উপকৃত" },
              { value: "৫০+", label: "সফল প্রকল্প" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl md:text-4xl font-black text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - 3D Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative perspective-1000"
        >
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-4 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-[3rem] blur-3xl"
          />

          {/* Main Card */}
          <motion.div
            className="relative glass rounded-[3rem] p-4 border-2 border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-[2.5rem] overflow-hidden">
              {/* Image */}
              <motion.img
                src="/aminul_haque.jpg"
                alt="আমিনুল হক"
                className="w-full h-[600px] object-cover"
                style={{
                  transform: "translateZ(50px)",
                }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-8 left-8 right-8 glass-dark rounded-2xl p-6 backdrop-blur-xl"
              >
                <div className="text-2xl font-black text-white mb-1">
                  আমিনুল হক
                </div>
                <div className="text-emerald-400 font-semibold">
                  রাজনৈতিক নেতা | সমাজ সংস্কারক
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 glass rounded-2xl p-4 backdrop-blur-xl"
          >
            <div className="text-4xl">🇧🇩</div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 backdrop-blur-xl"
          >
            <div className="text-4xl">⭐</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm font-semibold">Scroll</span>
          <motion.div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
