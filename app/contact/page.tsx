"use client";
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ContactForm from '../components/ContactForm';
import ChatWidget from '../components/ChatWidget';

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              যোগাযোগ করুন
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                আমাদের সাথে সংযুক্ত হন
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আপনার প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য যোগাযোগ করুন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: FaPhone,
                title: 'ফোন',
                value: '+৮৮০ ১৫৫২-১৬১৬১৬',
                subtext: 'সোম-শুক্র, ৯টা-৬টা',
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: FaEnvelope,
                title: 'ইমেইল',
                value: <>captainaminulhoque<br />dhaka16@gmail.com</>,
                subtext: '২৪ ঘণ্টার মধ্যে উত্তর',
                color: 'from-blue-500 to-purple-600',
              },
              {
                icon: FaMapMarkerAlt,
                title: 'অফিস',
                value: 'ডি/১৮৬, রোড- ডব্লিউ ৩, ইস্টার্ন হাউজিং ২য় পর্ব, পল্লবী, ঢাকা-১২১৬',
                // subtext: 'অ্যাপয়েন্টমেন্ট দ্বারা',
                color: 'from-purple-500 to-pink-600',
              },
            ].map((info, idx) => (
              <motion.div
                key={info.title}
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{info.title}</h3>
                  <p className={`text-2xl font-black mb-1 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                    {info.value}
                  </p>
                  <p className="text-slate-600 text-sm">{info.subtext}</p>
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
                  বার্তা পাঠান
                </h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Office Hours */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <FaClock className="text-2xl text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">অফিস সময়</h3>
                  </div>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex justify-between">
                      <span className="font-medium">সোমবার - শুক্রবার</span>
                      <span className="text-slate-900 font-bold">সকাল ৯:০০ - বিকাল ৬:০০ টা</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">শনিবার</span>
                      <span className="text-slate-900 font-bold">সকাল ১০:০০ - বিকাল ৪:০০ টা</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">রবিবার</span>
                      <span className="text-slate-500 font-bold">বন্ধ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">সোশ্যাল মিডিয়া</h3>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { icon: FaFacebook, color: 'from-blue-600 to-blue-700', link: 'https://www.facebook.com/AminulBd07' },
                      { icon: FaInstagram, color: 'from-pink-500 to-purple-600', link: 'https://www.instagram.com/captain_aminul_haque' },
                      { icon: FaXTwitter, color: 'from-gray-800 to-black', link: 'https://x.com/Aminulhaque1980' },
                      { icon: FaTiktok, color: 'from-gray-900 to-black', link: 'https://www.tiktok.com/@aminulhoqueofficial' },
                      { icon: FaYoutube, color: 'from-red-600 to-red-700', link: 'https://youtube.com/@captainaminulhaquedhaka16' },
                    ].map((social, idx) => (
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                  গুগল ম্যাপে দেখুন
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
