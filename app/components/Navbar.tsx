"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { href: '/', label: 'হোম' },
  { href: '/about', label: 'সম্পর্কে' },
  { href: '/aminul-manifesto', label: 'ইশতেহার' },
  { href: '/programs', label: 'কর্মসূচি' },
  { 
    label: 'পলিসি',
    hasDropdown: true,
    dropdownItems: [
      { href: '/manifesto', label: 'রূপকল্প' },
      { href: '/bnp-31-point', label: 'বিএনপির ৩১ দফা' },
      { href: '/bnp-19-point', label: 'বিএনপির ১৯ দফা' },
    ]
  },
  { 
    label: 'তথ্য ও মিডিয়া',
    hasDropdown: true,
    dropdownItems: [
      { href: '/gallery', label: 'গ্যালারি' },
      { href: '/events', label: 'ইভেন্ট' },
      { href: '/press-release', label: 'প্রেস রিলিজ' },
      { href: '/surveys', label: 'জরিপ' },
    ]
  },
  { 
    label: 'সেবা',
    hasDropdown: true,
    dropdownItems: [
      { href: '/voter-center', label: 'ভোট কেন্দ্র' },
      { href: '/volunteer', label: 'স্বেচ্ছাসেবক' },
      { href: '/complaints', label: 'অভিযোগ' },
      { href: '/comments', label: 'মন্তব্য' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, volunteer, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
    setOpenUserDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 xl:space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all"></div>
              {/* <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-black">আহ</span>
              </div> */}
            </div>
            <div>
              <div className="text-lg xl:text-xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                আমিনুল হক
              </div>
              <div className="text-[10px] xl:text-xs font-semibold text-slate-600 hidden sm:block">জনগণের সেবায় নিবেদিত</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-wrap">
            {navItems.map((item) => {
              if (item.hasDropdown && item.dropdownItems) {
                const isDropdownActive = item.dropdownItems.some(dropItem => pathname === dropItem.href);
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
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
                      <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                      <FaChevronDown className={`relative z-10 text-xs transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.label && (
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
                                {dropItem.label}
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
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button / User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setOpenUserDropdown(!openUserDropdown)}
                  className="flex items-center gap-2 px-4 xl:px-6 py-2 xl:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs xl:text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  <FaUser />
                  {volunteer?.full_name || 'User'}
                  <FaChevronDown className={`text-xs transition-transform ${openUserDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openUserDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 min-w-[200px] z-50"
                      onMouseLeave={() => setOpenUserDropdown(false)}
                    >
                      <Link
                        href="/volunteer/dashboard"
                        onClick={() => setOpenUserDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 font-bold text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                      >
                        <FaUser />
                        প্রোফাইল
                      </Link>
                      <Link
                        href="/volunteer/tasks"
                        onClick={() => setOpenUserDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 font-bold text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                      >
                        <FaTasks />
                        স্বেচ্ছাসেবক কাজ
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 font-bold text-sm text-red-600 hover:bg-red-50 transition-all"
                      >
                        <FaSignOutAlt />
                        লগআউট
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/volunteer/login"
                  className="px-4 xl:px-6 py-2 xl:py-3 bg-slate-100 text-slate-700 font-bold text-xs xl:text-sm rounded-xl hover:bg-slate-200 transition-all whitespace-nowrap"
                >
                  লগইন
                </Link>
                <Link
                  href="/contact"
                  className="px-4 xl:px-6 py-2 xl:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs xl:text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  যোগাযোগ
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6 text-slate-900" />
            ) : (
              <FaBars className="h-6 w-6 text-slate-900" />
            )}
          </button>
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
                    const isMobileDropdownOpen = openMobileDropdown === item.label;
                    return (
                      <div key={item.label} className="space-y-1">
                        <button
                          onClick={() => setOpenMobileDropdown(isMobileDropdownOpen ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-2 font-bold text-sm text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all"
                        >
                          <span>{item.label}</span>
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
                                      {dropItem.label}
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
                      {item.label}
                    </Link>
                  );
                })}
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/volunteer/dashboard"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className="block px-4 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-center"
                    >
                      <FaUser className="inline mr-2" />
                      প্রোফাইল
                    </Link>
                    <Link
                      href="/volunteer/tasks"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className="block px-4 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-center"
                    >
                      <FaTasks className="inline mr-2" />
                      স্বেচ্ছাসেবক কাজ
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className="w-full block px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-center"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      লগআউট
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/volunteer/login"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className="block px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-center"
                    >
                      লগইন
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileDropdown(null);
                      }}
                      className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl text-center shadow-lg"
                    >
                      যোগাযোগ করুন
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
