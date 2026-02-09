"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ContactForm from '../components/ContactForm';
import ChatWidget from '../components/ChatWidget';
import { useTranslation } from '../i18n/I18nProvider';
import { useSettings } from '../contexts/SettingsProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';
import Image from 'next/image';

export default function ContactPage() {
  const { t, language } = useTranslation();
  const { settings } = useSettings();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('contact', 'contact-us').then(setCmsData);
  }, []);

  const phone = settings?.company_phone
    || (language === 'bd' ? '+৮৮০ ১৫৫২-১৬১৬১৬' : '+880 1552-161616');

  const email = settings?.company_email || 'captainaminulhoquedhaka16@gmail.com';

  const address = settings?.company_address
    || (language === 'bd'
      ? 'ডি/১৮৬, রোড- ডব্লিউ ৩, ইস্টার্ন হাউজিং ২য় পর্ব, পল্লবী, ঢাকা-১২১৬'
      : 'D/186, Road- W 3, Eastern Housing Phase 2, Pallabi, Dhaka-1216');

  const contactInfo = [
    {
      icon: FaPhone,
      titleKey: 'contact.phone',
      value: phone,
      subtextKey: 'contact.monFri',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: FaEnvelope,
      titleKey: 'contact.email',
      value: email,
      subtextKey: 'contact.replyTime',
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: FaMapMarkerAlt,
      titleKey: 'contact.office',
      value: address,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  // Build social links from settings with fallbacks
  const socialLinks: { icon: IconType; color: string; link: string }[] = [];

  const fbUrl = settings?.social_media?.facebook || 'https://www.facebook.com/AminulBd07';
  if (fbUrl) socialLinks.push({ icon: FaFacebook, color: 'from-blue-600 to-blue-700', link: fbUrl });

  const igUrl = settings?.social_media?.instagram || 'https://www.instagram.com/captain_aminul_haque';
  if (igUrl) socialLinks.push({ icon: FaInstagram, color: 'from-pink-500 to-purple-600', link: igUrl });

  const xUrl = settings?.social_media?.x_twitter || 'https://x.com/Aminulhaque1980';
  if (xUrl) socialLinks.push({ icon: FaXTwitter, color: 'from-gray-800 to-black', link: xUrl });

  const tiktokUrl = settings?.social_media?.tiktok || 'https://www.tiktok.com/@aminulhoqueofficial';
  if (tiktokUrl) socialLinks.push({ icon: FaTiktok, color: 'from-gray-900 to-black', link: tiktokUrl });

  const ytUrl = settings?.social_media?.youtube || 'https://youtube.com/@captainaminulhaquedhaka16';
  if (ytUrl) socialLinks.push({ icon: FaYoutube, color: 'from-red-600 to-red-700', link: ytUrl });

  if (settings?.linkedin) socialLinks.push({ icon: FaLinkedinIn, color: 'from-blue-700 to-blue-800', link: settings.linkedin });
  if (settings?.pinterest) socialLinks.push({ icon: FaPinterestP, color: 'from-red-600 to-red-700', link: settings.pinterest });

  const officeStatus = {
    bd: 'সর্বদা খোলা',
    en: 'Always Open'
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              {t('contact.title')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {cmsData?.title || t('contact.subtitle')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {cmsData?.description || t('contact.description')}
            </p>
          </motion.div>
        </div>
      </section>
       {/* Constituency Map */}
       <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                <FaMapMarkerAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {language === 'bd' ? 'ঢাকা-১৬ নির্বাচনী এলাকা' : 'Dhaka-16 Constituency'}
              </h3>
            </div>
            <div className="relative w-full aspect-square max-w-md mx-auto py-6">
              <Image
                src="/aminul Haque/ঢাকা-১৬.svg.png"
                alt={language === 'bd' ? 'ঢাকা-১৬ নির্বাচনী এলাকার মানচিত্র' : 'Dhaka-16 Constituency Map'}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-600 text-sm mt-4">
              {language === 'bd'
                ? 'পল্লবী ও রুপনগর থানা এলাকা'
                : 'Pallabi & Rupnagar Police Station Area'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${info.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border border-slate-200 h-full flex flex-col justify-center">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${info.color} rounded-xl mb-4 shadow-lg mx-auto`}>
                    <info.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t(info.titleKey)}</h3>
                  <p className={`text-2xl font-black mb-1 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                    {info.value}
                  </p>
                  {info.subtextKey && (
                    <p className="text-slate-600 text-sm">{t(info.subtextKey)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6">
                  {t('contact.sendMessage')}
                </h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours - Always Open */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                      <FaClock className="text-2xl text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">{t('contact.officeHours')}</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                      <span className="text-2xl font-black text-white">
                        {language === 'bd' ? officeStatus.bd : officeStatus.en}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-4">
                      {language === 'bd' ? '২৪/৭ আপনার সেবায়' : '24/7 At Your Service'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">{t('contact.socialMedia')}</h3>
                  <div className="flex gap-4 flex-wrap">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 bg-gradient-to-br ${social.color} rounded-xl text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110`}
                      >
                        <social.icon className="text-2xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl overflow-hidden border border-slate-200">
              <div className="w-full h-96 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.352089!3d23.823917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI2LjEiTiA5MMKwMjEnMDcuNSJF!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=23.823917,90.352089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <FaMapMarkerAlt className="text-lg" />
                  {t('contact.viewOnMap')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  );
}
