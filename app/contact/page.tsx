"use client";
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl text-center">
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
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: FaPhone,
                title: 'ফোন',
                value: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
                subtext: 'সোম-শুক্র, ৯টা-৬টা',
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: FaEnvelope,
                title: 'ইমেইল',
                value: 'info@aminulhaque.bd',
                subtext: '২৪ ঘণ্টার মধ্যে উত্তর',
                color: 'from-blue-500 to-purple-600',
              },
              {
                icon: FaMapMarkerAlt,
                title: 'অফিস',
                value: 'ঢাকা, বাংলাদেশ',
                subtext: 'অ্যাপয়েন্টমেন্ট দ্বারা',
                color: 'from-purple-500 to-pink-600',
              },
            ].map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${info.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border border-slate-200">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${info.color} rounded-xl mb-4 shadow-lg`}>
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
                      <span className="text-slate-900 font-bold">৯:০০ - ৬:০০ অপরাহ্ন</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">শনিবার</span>
                      <span className="text-slate-900 font-bold">১০:০০ - ৪:০০ অপরাহ্ন</span>
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
                  <div className="flex gap-4">
                    {[
                      { icon: FaFacebook, color: 'from-blue-600 to-blue-700' },
                      { icon: FaTwitter, color: 'from-sky-500 to-blue-600' },
                      { icon: FaInstagram, color: 'from-pink-500 to-purple-600' },
                    ].map((social, idx) => (
                      <button
                        key={idx}
                        className={`p-4 bg-gradient-to-br ${social.color} rounded-xl text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110`}
                      >
                        <social.icon className="text-2xl" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl overflow-hidden border border-slate-200">
              <div className="w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl text-cyan-600 mx-auto mb-4" />
                  <p className="text-xl text-slate-700 font-semibold">মানচিত্র শীঘ্রই আসছে</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
