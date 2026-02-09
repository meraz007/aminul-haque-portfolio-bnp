"use client";
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTiktok,
  FaGooglePlay,
  FaLinkedinIn,
  FaPinterestP,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';
import { useSettings } from '../contexts/SettingsProvider';

interface SocialLink {
  icon: IconType;
  color: string;
  url: string;
}

export default function SiteFooter() {
  const { t, language } = useTranslation();
  const { settings } = useSettings();

  const quickLinks = [
    { titleKey: 'footer.home', href: '/' },
    { titleKey: 'footer.aboutLink', href: '/about' },
    { titleKey: 'footer.programsLink', href: '/programs' },
    { titleKey: 'footer.visionLink', href: '/manifesto' },
    { titleKey: 'footer.galleryLink', href: '/gallery' },
    { titleKey: 'footer.contactLink', href: '/contact' },
  ];

  const services = [
    { titleKey: 'nav.voterCenter', href: '/voter-center' },
    { titleKey: 'nav.volunteer', href: '/volunteer' },
    { titleKey: 'nav.complaints', href: '/complaints' },
    { titleKey: 'nav.comments', href: '/comments' },
  ];

  const formatYear = (year: number) => {
    return language === 'bd' ? toBanglaNumber(year) : year.toString();
  };

  // Build social links from settings, falling back to hardcoded defaults
  const socialLinks: SocialLink[] = [];

  const fbUrl = settings?.social_media?.facebook ;
  if (fbUrl) socialLinks.push({ icon: FaFacebook, color: 'from-blue-600 to-blue-700', url: fbUrl });

  const igUrl = settings?.social_media?.instagram || 'https://www.instagram.com/captain_aminul_haque';
  if (igUrl) socialLinks.push({ icon: FaInstagram, color: 'from-pink-500 to-purple-600', url: igUrl });

  const xUrl = settings?.social_media?.x_twitter || 'https://x.com/Aminulhaque1980';
  if (xUrl) socialLinks.push({ icon: FaXTwitter, color: 'from-gray-800 to-black', url: xUrl });

  const tiktokUrl = settings?.social_media?.tiktok || 'https://www.tiktok.com/@aminulhoqueofficial';
  if (tiktokUrl) socialLinks.push({ icon: FaTiktok, color: 'from-gray-900 to-black', url: tiktokUrl });

  const ytUrl = settings?.social_media?.youtube || 'https://youtube.com/@captainaminulhaquedhaka16';
  if (ytUrl) socialLinks.push({ icon: FaYoutube, color: 'from-red-600 to-red-700', url: ytUrl });

  if (settings?.linkedin) {
    socialLinks.push({ icon: FaLinkedinIn, color: 'from-blue-700 to-blue-800', url: settings.linkedin });
  }

  if (settings?.pinterest) {
    socialLinks.push({ icon: FaPinterestP, color: 'from-red-600 to-red-700', url: settings.pinterest });
  }

  // Contact info from settings or hardcoded fallbacks
  const address = settings?.company_address
    || (language === 'bd'
      ? 'ডি/১৮৬, রোড- ডব্লিউ ৩, ইস্টার্ন হাউজিং ২য় পর্ব, পল্লবী, ঢাকা-১২১৬'
      : 'D/186, Road- W 3, Eastern Housing Phase 2, Pallabi, Dhaka-1216');

  const phone = settings?.company_phone
    || (language === 'bd' ? '+৮৮০ ১৫৫২-১৬১৬১৬' : '+880 1552-161616');

  const email = settings?.company_email || 'captainaminulhoquedhaka16@gmail.com';

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t-4 border-emerald-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-50"></div>
              </div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  {t('hero.title')}
                </div>
                <div className="text-xs font-semibold text-slate-600">{t('footer.servingPeople')}</div>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gradient-to-br ${social.color} text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-110`}
                  aria-label={t('footer.socialMedia')}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-emerald-500">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 hover:text-emerald-600 font-semibold transition-all hover:translate-x-2 inline-block"
                  >
                    → {t(link.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-blue-500">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-700 hover:text-blue-600 font-semibold transition-all hover:translate-x-2 inline-block"
                  >
                    → {t(service.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-purple-500">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold break-all">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="py-8 border-t border-slate-300">
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-700 font-bold text-center">
              {language === 'bd' ? 'আমাদের অফিসিয়াল অ্যাপ ডাউনলোড করুন' : 'Download Our Official App'}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.aminul_haque.portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <FaGooglePlay className="text-2xl" />
              <div className="text-left">
                <div className="text-xs opacity-90">{language === 'bd' ? 'ডাউনলোড করুন' : 'Get it on'}</div>
                <div className="text-lg font-black">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 font-semibold text-center md:text-left">
              © {formatYear(new Date().getFullYear())} <Link href="https://www.facebook.com/rkoshahedhossain" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                {language === 'bd' ? 'আর.কে.ও. শাহেদ' : 'R.K.O. Shahed'}
              </Link>। {t('footer.rights')}।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
