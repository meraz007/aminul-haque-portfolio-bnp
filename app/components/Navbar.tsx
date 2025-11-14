"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaBars, FaTimes, FaStar, FaRocket } from "react-icons/fa";

const navItems = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "সম্পর্কে" },
  { href: "/programs", label: "কর্মসূচি" },
  { href: "/manifesto", label: "রূপকল্প" },
  { href: "/gallery", label: "গ্যালারি" },
  { href: "/blog", label: "ব্লগ" },
  { href: "/comments", label: "মন্তব্য" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-dark backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Enhanced with 3D Effect */}
          <Link
            href="/"
            className="flex items-center space-x-3 group relative z-50"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-lg opacity-50"
              />

              {/* Logo Box */}
              <div className="relative w-14 h-14 bg-linear-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-2xl transform-3d">
                <motion.span
                  animate={{ rotateY: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-white text-2xl font-black"
                >
                  আহ
                </motion.span>
              </div>
            </motion.div>

            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-black bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              >
                আমিনুল হক
              </motion.div>
              <div className="text-xs font-semibold text-emerald-300">
                জনগণের সেবায় নিবেদিত
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Glassmorphic Pills */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 glass-dark rounded-full px-2 py-2 backdrop-blur-xl border border-white/10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-5 py-2.5 font-bold text-sm transition-all rounded-full group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 rounded-full shadow-lg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full blur-md"
                        />
                      </motion.div>
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button - Animated */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-2xl overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundSize: "200% 200%" }}
                />

                <FaRocket className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="relative z-10">যোগাযোগ</span>

                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 glass-dark rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl border border-white/10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-40 md:hidden glass-dark backdrop-blur-2xl"
            >
              {/* Background Gradient Animation */}
              <div className="absolute inset-0 gradient-mesh opacity-30"></div>

              <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-4">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-center py-5 px-8 text-2xl font-black rounded-2xl transition-all ${
                          isActive
                            ? "glass text-white border-2 border-emerald-400 shadow-2xl"
                            : "text-slate-300 hover:text-white hover:glass"
                        }`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="w-full pt-6"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-5 px-8 bg-linear-to-r from-emerald-500 to-cyan-500 text-white text-2xl font-black rounded-2xl shadow-2xl"
                  >
                    যোগাযোগ করুন
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
