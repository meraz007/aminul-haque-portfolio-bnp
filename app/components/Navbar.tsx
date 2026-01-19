"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';

// Nav items with translation keys
const navItems = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/aminul-manifesto', labelKey: 'nav.manifesto' },
  { href: '/programs', labelKey: 'nav.programs' },
  { 
    labelKey: 'nav.policy',
    hasDropdown: true,
    dropdownItems: [
      { href: '/manifesto', labelKey: 'nav.sportsdev' },
      { href: '/bnp-31-point', labelKey: 'nav.bnp31' },
      { href: '/bnp-19-point', labelKey: 'nav.bnp19' },
    ]
  },
  { 
    labelKey: 'nav.media',
    hasDropdown: true,
    dropdownItems: [
      { href: '/gallery', labelKey: 'nav.gallery' },
      { href: '/kheladhula', labelKey: 'nav.sports' },
      { href: '/events', labelKey: 'nav.events' },
      { href: '/press-release', labelKey: 'nav.pressRelease' },
      { href: '/surveys', labelKey: 'nav.surveys' },
    ]
  },
  { 
    labelKey: 'nav.service',
    hasDropdown: true,
    dropdownItems: [
      { href: '/voter-center', labelKey: 'nav.voterCenter' },
      { href: '/volunteer', labelKey: 'nav.volunteer' },
      { href: '/complaints', labelKey: 'nav.complaints' },
      { href: '/comments', labelKey: 'nav.comments' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Use i18n context
  const { language, setLanguage, t, isChangingLanguage } = useTranslation();

  // Toggle language handler
  const toggleLanguage = () => {
    const newLanguage = language === 'bd' ? 'en' : 'bd';
    setLanguage(newLanguage);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 xl:space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all"></div>
            </div>
            <div>
              <div className="text-lg xl:text-xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </div>
              <div className="text-[10px] xl:text-xs font-semibold text-slate-600 hidden sm:block">
                {t('hero.subtitle')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-wrap">
            {navItems.map((item) => {
              if (item.hasDropdown && item.dropdownItems) {
                const isDropdownActive = item.dropdownItems.some(dropItem => pathname === dropItem.href);
                const translatedLabel = t(item.labelKey);
                return (
                  <div
                    key={item.labelKey}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.labelKey)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`relative px-3 xl:px-4 py-2 font-bold text-xs xl:text-sm transition-all rounded-lg flex items-center gap-1 xl:gap-2 ${
                        isDropdownActive
                          ? 'text-white'
                          : 'text-slate-700 hover:text-emerald-600'
                      }`}
                    >
                      {isDropdownActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap">{translatedLabel}</span>
                      <FaChevronDown className={`relative z-10 text-xs transition-transform ${openDropdown === item.labelKey ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.labelKey && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 min-w-[140px] z-50"
                        >
                          {item.dropdownItems.map((dropItem) => {
                            const isActive = pathname === dropItem.href;
                            return (
                              <Link
                                key={dropItem.href}
                                href={dropItem.href}
                                className={`block px-4 py-3 font-bold text-sm transition-all ${
                                  isActive
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                                }`}
                              >
                                {t(dropItem.labelKey)}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`relative px-3 xl:px-4 py-2 font-bold text-xs xl:text-sm transition-all rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Toggle & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              disabled={isChangingLanguage}
              className="relative w-20 h-9 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-inner disabled:opacity-70"
              aria-label="Toggle language"
            >
              {/* Background labels */}
              <div className="absolute inset-0 flex items-center justify-between px-2.5 text-xs font-bold pointer-events-none">
                <span className={`transition-colors duration-300 z-10 ${language === 'bd' ? 'text-white' : 'text-slate-500'}`}>
                  বাং
                </span>
                <span className={`transition-colors duration-300 z-10 ${language === 'en' ? 'text-white' : 'text-slate-500'}`}>
                  EN
                </span>
              </div>
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-1 w-9 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg"
                animate={{ x: language === 'en' ? 40 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              {isChangingLanguage && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>

            <Link
              href="/contact"
              className="px-4 xl:px-6 py-2 xl:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs xl:text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile: Language Toggle & Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              disabled={isChangingLanguage}
              className="relative flex items-center gap-1 px-3 py-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all disabled:opacity-70"
              aria-label="Toggle language"
            >
              <AnimatePresence mode="wait">
                {language === 'bd' ? (
                  <motion.span
                    key="bd"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-bold text-emerald-600"
                  >
                    বাংলা
                  </motion.span>
                ) : (
                  <motion.span
                    key="en"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-bold text-emerald-600"
                  >
                    EN
                  </motion.span>
                )}
              </AnimatePresence>
              {isChangingLanguage && (
                <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6 text-slate-900" />
              ) : (
                <FaBars className="h-6 w-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  if (item.hasDropdown && item.dropdownItems) {
                    const isMobileDropdownOpen = openMobileDropdown === item.labelKey;
                    const translatedLabel = t(item.labelKey);
                    return (
                      <div key={item.labelKey} className="space-y-1">
                        <button
                          onClick={() => setOpenMobileDropdown(isMobileDropdownOpen ? null : item.labelKey)}
                          className="w-full flex items-center justify-between px-4 py-2 font-bold text-sm text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all"
                        >
                          <span>{translatedLabel}</span>
                          <FaChevronDown className={`text-xs transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 ml-4">
                                {item.dropdownItems.map((dropItem) => {
                                  const isActive = pathname === dropItem.href;
                                  return (
                                    <Link
                                      key={dropItem.href}
                                      href={dropItem.href}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setOpenMobileDropdown(null);
                                      }}
                                      className={`block px-6 py-3 font-bold rounded-xl transition-all ${
                                        isActive
                                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                      }`}
                                    >
                                      {t(dropItem.labelKey)}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className={`block px-4 py-3 font-bold rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenMobileDropdown(null);
                  }}
                  className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl text-center shadow-lg"
                >
                  {t('nav.contactUs')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
