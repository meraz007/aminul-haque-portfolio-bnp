"use client";
import { motion } from 'framer-motion';
import { FaFutbol, FaTrophy, FaMedal, FaFlag, FaStar, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              আমাদের সম্পর্কে
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                আমিনুল হক
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              বাংলাদেশের কিংবদন্তি গোলরক্ষক
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">ব্যক্তিগত তথ্য</span>
              <h2 className="text-5xl font-black text-slate-900 mt-3 mb-6">
                মোহাম্মদ আমিনুল হক
              </h2>
              <div className="space-y-4 text-lg text-slate-700">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFlag className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">জন্ম তারিখ</p>
                    <p>৫ অক্টোবর ১৯৮০ (বয়স ৪৫)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFlag className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">জন্মস্থান</p>
                    <p>ভোলা, বাংলাদেশ</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaFutbol className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">অবস্থান</p>
                    <p>গোলরক্ষক</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <FaMedal className="text-2xl text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">উচ্চতা</p>
                    <p>১.৮৫ মিটার (৬ ফুট ১ ইঞ্চি)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/aminul Haque/DSC01131.jpg"
                  alt="আমিনুল হক"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              জীবনী
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>
                  <strong>আমিনুল হক</strong> (জন্ম ৫ অক্টোবর ১৯৮০) একজন প্রাক্তন বাংলাদেশী পেশাদার ফুটবলার যিনি গোলরক্ষক হিসেবে খেলেছেন। তাকে বাংলাদেশের অন্যতম সেরা ফুটবলার হিসেবে বিবেচনা করা হয় এবং <strong>"বাংলাদেশের প্রতিনিধিত্বকারী সর্বশ্রেষ্ঠ গোলরক্ষক"</strong> হিসেবে চিহ্নিত করা হয়েছে।
                </p>
                <p>
                  বাংলাদেশ জাতীয় দলের প্রাক্তন কোচ গিওর্গি কোটানের মতে, আমিনুল তার দেখা সেরা গোলরক্ষকদের একজন। আমিনুলের অবস্থানগত বোধ এবং খেলা বোঝার ক্ষমতা তাকে দক্ষিণ এশিয়ার ফুটবল ইতিহাসের অন্যতম সেরা গোলরক্ষক করে তুলেছে।
                </p>
                <p>
                  ইএসপিএন স্টারের শেবি সিং পরামর্শ দিয়েছিলেন যে আমিনুল সঠিক প্রশিক্ষণের মাধ্যমে ইংল্যান্ডেও আরও ভালো লীগে খেলার যোগ্য। আমিনুল এমএসপিসিসি সিটি ক্লাবের একজন খেলোয়াড় এবং ১৯৯৪ সালে মোহামেডান এসসি-র হয়ে ঢাকা প্রিমিয়ার ডিভিশন লীগে তার ক্যারিয়ার শুরু করেন।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Stats */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              ক্যারিয়ার পরিসংখ্যান
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaFlag, label: 'আন্তর্জাতিক ম্যাচ', value: '৫৬', color: 'from-emerald-500 to-green-600' },
              { icon: FaTrophy, label: 'ক্লাব শিরোপা', value: '১৫+', color: 'from-blue-500 to-cyan-600' },
              { icon: FaMedal, label: 'ক্যারিয়ার বছর', value: '২০', color: 'from-purple-500 to-pink-600' },
              { icon: FaStar, label: 'বিশেষ সম্মাননা', value: '৫+', color: 'from-amber-500 to-orange-600' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center border border-slate-200">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                    <stat.icon className="text-3xl text-white" />
                  </div>
                  <div className="text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career & Honors Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              ক্যারিয়ার ও সম্মাননা
            </h2>
            <p className="text-xl text-slate-600">
              একজন কিংবদন্তি খেলোয়াড়ের যাত্রা
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 via-blue-200 to-purple-200 hidden md:block"></div>

            <div className="space-y-12">
              {[
                {
                  date: '১৯৯৪–১৯৯৫',
                  title: 'মোহামেডান এসসি',
                  description: 'ঢাকা প্রিমিয়ার ডিভিশন লীগে ক্যারিয়ার শুরু',
                  badge: 'ক্লাব',
                  badgeColor: 'bg-emerald-100 text-emerald-700',
                  align: 'left',
                },
                {
                  date: '১৯৯৭–১৯৯৮',
                  title: 'মুক্তিযোদ্ধা সংসদ',
                  description: 'প্রথম লীগ শিরোপা এবং মোহননগরী কাপ জয়',
                  badge: 'ক্লাব',
                  badgeColor: 'bg-blue-100 text-blue-700',
                  align: 'right',
                },
                {
                  date: '১৯৯৯-২০০০',
                  title: 'ঢাকা আবাহনী',
                  description: 'ফেডারেশন কাপ এবং জাতীয় লীগ শিরোপা',
                  badge: 'ক্লাব',
                  badgeColor: 'bg-purple-100 text-purple-700',
                  align: 'left',
                },
                {
                  date: '২০০৩',
                  title: 'SAFF চ্যাম্পিয়নশিপ বিজয়',
                  description: 'টুর্নামেন্টের সেরা গোলরক্ষক - বাংলাদেশের প্রথম SAFF চ্যাম্পিয়নশিপ জয়ে গুরুত্বপূর্ণ ভূমিকা',
                  badge: 'সম্মাননা',
                  badgeColor: 'bg-amber-100 text-amber-700',
                  align: 'right',
                },
                {
                  date: '২০০৮-২০১০',
                  title: 'মোহামেডান এসসি',
                  description: '২০০৯ সুপার কাপ জয় এবং সেরা গোলরক্ষক পুরষ্কার',
                  badge: 'ক্লাব',
                  badgeColor: 'bg-rose-100 text-rose-700',
                  align: 'left',
                },
                {
                  date: '২০১০',
                  title: 'দক্ষিণ এশীয় গেমস স্বর্ণপদক',
                  description: 'অধিনায়ক হিসেবে বাংলাদেশ অনূর্ধ্ব-২৩ দলকে স্বর্ণপদক জেতানোর নেতৃত্ব',
                  badge: 'সম্মাননা',
                  badgeColor: 'bg-yellow-100 text-yellow-700',
                  align: 'right',
                },
                {
                  date: '২০১১–২০১২',
                  title: 'শেখ জামাল ডিসি',
                  description: 'প্রিমিয়ার লীগ এবং ফেডারেশন কাপ শিরোপা',
                  badge: 'ক্লাব',
                  badgeColor: 'bg-teal-100 text-teal-700',
                  align: 'left',
                },
                {
                  date: '২০০৩-২০১২',
                  title: 'ফেডারেশন কাপ চ্যাম্পিয়ন',
                  description: '৫ বার ফেডারেশন কাপ জয় - বিভিন্ন ক্লাবের হয়ে অসাধারণ পারফরম্যান্স',
                  badge: 'পুরস্কার',
                  badgeColor: 'bg-indigo-100 text-indigo-700',
                  align: 'right',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex items-center ${
                    item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                    <div className="w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-lg"></div>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[38%] ${item.align === 'left' ? 'md:ml-[100px]' : 'md:mr-[100px]'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm text-slate-500 font-semibold">{item.date}</span>
                        <span className={`px-3 py-1 ${item.badgeColor} rounded-full text-xs font-bold uppercase tracking-wider`}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Career */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              আন্তর্জাতিক ক্যারিয়ার
            </h2>
            <p className="text-xl text-slate-600">
              ১৯৯৮ থেকে ২০১০ সাল পর্যন্ত বাংলাদেশ জাতীয় দলের প্রতিনিধিত্ব
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200"
            >
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>
                  আমিনুল ১৯৯৮ থেকে ২০১০ সাল পর্যন্ত বাংলাদেশ জাতীয় দলের প্রতিনিধিত্ব করেছেন। তিনি প্রায় <strong>৫৬ বার</strong> ক্যাপিং করেছিলেন, যার মধ্যে তিনি ২০০৬, ২০০৮, ২০০৯ এবং ২০১০ সালে তার দেশের অধিনায়কত্ব করেছিলেন।
                </p>
                <p>
                  <strong>২০০৩ সালের SAFF চ্যাম্পিয়নশিপ:</strong> পেনাল্টি শুটআউটের সময়, তিনি আশরাফ লুথফির একটি গুরুত্বপূর্ণ শট রক্ষা করেন, যার ফলে বাংলাদেশ তাদের প্রথম SAFF চ্যাম্পিয়নশিপ জিততে পারে। আমিনুলকে টুর্নামেন্টের সেরা গোলরক্ষকও মনোনীত করা হয়।
                </p>
                <p>
                  <strong>২০১০ সালের দক্ষিণ এশীয় গেমস:</strong> তিনি বাংলাদেশ অনূর্ধ্ব-২৩ দলকে স্বর্ণপদক জেতানোর নেতৃত্ব দিয়েছিলেন।
                </p>
                <p>
                  আন্তর্জাতিক পর্যায়ে তার পারফরম্যান্স নিউক্যাসল ইউনাইটেড এবং আল হিলাল এসএফসির মতো ক্লাবগুলির কাছ থেকেও আগ্রহ আকর্ষণ করেছিল।
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Life */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              জীবনের প্রথমার্ধ
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>
                  ভোলায় জন্মগ্রহণকারী আমিনুল তার শৈশবের বেশিরভাগ সময় ঢাকায় কাটিয়েছেন, মোহাম্মদ এমরান এবং মনওয়ারা বেগমের ছেলে। তিন ভাইয়ের মধ্যে তিনি সবার ছোট। তার ভাই মইনুল হক, যিনি তার চেয়ে দশ বছরের বড়, তিনিও ঢাকা প্রিমিয়ার ডিভিশন ফুটবল লীগে খেলেছেন।
                </p>
                <p>
                  চতুর্থ শ্রেণীতে পড়ার সময়, আমিনুল কোচ ইমতিয়াজের অধীনে এমএসপিসিসি সিটি ক্লাবে প্রশিক্ষণ শুরু করেন। মিরপুরের আলুবদী গ্রামে একটি স্থানীয় টুর্নামেন্টে সিটি ক্লাবের জুনিয়র দলের হয়ে খেলার সময়, আমিনুল তার পারফর্মেন্সের জন্য ১৫০ টাকা পেয়েছিলেন।
                </p>
                <p>
                  ১৯৯৩ সালে, তিনি সিটি ক্লাবের সাথে পাইওনিয়ার ফুটবল লীগে অংশগ্রহণ করেন এবং লীগের প্রথম পর্বে টানা নয়টি ক্লিনশিট ধরে রাখতে সক্ষম হন।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Political Career */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              রাজনৈতিক জীবন
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              জনসেবায় নতুন অধ্যায়
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p className="text-xl font-semibold text-slate-900">
                    ফুটবল ক্যারিয়ার শেষে আমিনুল হক রাজনৈতিক অঙ্গনে প্রবেশ করেন এবং জনগণের সেবায় নিজেকে নিয়োজিত করেন।
                  </p>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-l-4 border-red-600">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                      <FaFlag className="text-red-600" />
                      বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)
                    </h3>
                    <p>
                      আমিনুল হক <strong>বাংলাদেশ জাতীয়তাবাদী দলের ঢাকা উত্তর সিটি ইউনিটের সদস্য সচিব</strong> হিসেবে যোগদান করেছেন এবং দলের হয়ে কাজ করছেন।
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="font-semibold text-slate-900 mb-3">রাজনৈতিক সংগ্রাম:</p>
                    <p>
                      ২০০৯-২০২৪ সালের প্রাক্তন প্রধানমন্ত্রী শেখ হাসিনার শাসনামলে, দুটি পৃথক নাশকতার ঘটনার কারণে তাকে <strong>২০২৩ সালের ১ নভেম্বর গ্রেপ্তার</strong> করা হয়েছিল। কয়েক মাস কারাভোগের পর পরে তাকে মুক্তি দেওয়া হয়।
                    </p>
                  </div>
                  <p>
                    রাজনৈতিক জীবনেও আমিনুল হক তার ফুটবল ক্যারিয়ারের মতোই সাহসী এবং দৃঢ়প্রতিজ্ঞ। তিনি জনগণের অধিকার এবং গণতন্ত্রের জন্য লড়াই চালিয়ে যাচ্ছেন।
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
