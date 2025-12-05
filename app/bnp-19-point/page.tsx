"use client";
import { motion } from 'framer-motion';
import { FaFileAlt, FaFlag } from 'react-icons/fa';

export default function BNP19PointPage() {
  const points = [
    {
      title: 'সর্বতোভাবে দেশের স্বাধীনতা, অখন্ডতা এবং সার্বভৌমত্ব রক্ষা করা',
      content: 'সর্বতোভাবে দেশের স্বাধীনতা, অখন্ডতা এবং সার্বভৌমত্ব রক্ষা করা।'
    },
    {
      title: 'শাসনতন্ত্রের চারটি মূলনীতি জাতীয় জীবনে সর্বাত্মক প্রতিফলন',
      content: 'শাসনতন্ত্রের চারটি মূলনীতি, অর্থাৎ সর্বশক্তিমান আল্লাহর প্রতি সর্বাত্মক বিশ্বাস ও আস্থা, গণতন্ত্র, জাতীয়তাবাদ, সামাজিক ও অর্থনৈতিক ন্যায়বিচার সমাজতন্ত্র জাতীয় জীবনে সর্বাত্মক প্রতিফলন।'
    },
    {
      title: 'সর্ব উপায়ে নিজেদেরকে একটি আত্মনির্ভরশীল জাতি হিসাবে গঠন করা',
      content: 'সর্ব উপায়ে নিজেদেরকে একটি আত্মনির্ভরশীল জাতি হিসাবে গঠন করা।'
    },
    {
      title: 'প্রশাসনের সর্বস্তরে জনগণের অংশগ্রহণ নিশ্চিত করা',
      content: 'প্রশাসনের সর্বস্তরে, উন্নয়ন কার্যক্রমে ও আইন শৃঙ্খলা রক্ষার ব্যাপারে জনগণের অংশগ্রহণ নিশ্চিত করা।'
    },
    {
      title: 'কৃষি উন্নয়ন এর মাধ্যমে গ্রামীন তথা জাতীয় অর্থনীতিকে জোরদার করা',
      content: 'সর্বোচ্চ অগ্রাধিকার এর ভিত্তিতে কৃষি উন্নয়ন এর মাধ্যমে গ্রামীন তথা জাতীয় অর্থনীতিকে জোরদার করা।'
    },
    {
      title: 'দেশকে খাদ্যে স্বয়ংসম্পূর্ণ করা',
      content: 'দেশকে খাদ্যে স্বয়ংসম্পূর্ণ করা এবং কেউ যেন ক্ষুধার্ত না থাকে তা নিশ্চিত করা।'
    },
    {
      title: 'সকলের জন্য অন্তত মোটা কাপড় নিশ্চিত করা',
      content: 'দেশে কাপড় এর উৎপাদন বাড়িয়ে সকলের জন্য অন্তত মোটা কাপড় নিশ্চিত করা।'
    },
    {
      title: 'যথাসম্ভব গৃহায়ণ ব্যবস্থা করা',
      content: 'কোন নাগরিক যেন গৃহহীন না থাকে তার যথাসম্ভব গৃহায়ণ ব্যবস্থা করা।'
    },
    {
      title: 'দেশকে নিরক্ষরতার অভিশাপ থেকে মুক্ত করা',
      content: 'দেশকে নিরক্ষরতার অভিশাপ থেকে মুক্ত করা।'
    },
    {
      title: 'সকল দেশবাসীর জন্য নূন্যতম চিকিৎসার ব্যবস্থা করা',
      content: 'সকল দেশবাসীর জন্য নূন্যতম চিকিৎসার ব্যবস্থা করা।'
    },
    {
      title: 'সমাজে নারীর যথাযোগ্য মর্যাদা প্রতিষ্ঠা এবং যুবসমাজকে সুসংহত করা',
      content: 'সমাজে নারীর যথাযোগ্য মর্যাদা প্রতিষ্ঠা করা এবং যুবসমাজকে সুসংহত করে জাতি গঠনে উদ্বুদ্ধ করা।'
    },
    {
      title: 'বেসরকারি খাতে প্রয়োজনীয় উৎসাহ প্রদান',
      content: 'দেশের অর্থনৈতিক উন্নয়নে বেসরকারি খাতে প্রয়োজনীয় উৎসাহ প্রদান দান।'
    },
    {
      title: 'শ্রমিকদের অবস্থার উন্নতি সাধন এবং সুস্থ শ্রমিক-মালিক সম্পর্ক গড়ে তোলা',
      content: 'শ্রমিকদের অবস্থার উন্নতি সাধন এবং উৎপাদন বৃদ্ধির স্বার্থে সুস্থ শ্রমিক-মালিক সম্পর্ক গড়ে তোলা।'
    },
    {
      title: 'সরকারী চাকরিজীবীদের মধ্যে জনসেবা ও দেশ গঠনের মনোবৃত্তি উৎসাহিত করা',
      content: 'সরকারী চাকরিজীবীদের মধ্যে জনসেবা ও দেশ গঠনের মনোবৃত্তি উৎসাহিত করা এবং তাদের আর্থিক অবস্থার উন্নয়ন করা।'
    },
    {
      title: 'জনসংখ্যা বিস্ফোরণ রোধ করা',
      content: 'জনসংখ্যা বিস্ফোরণ রোধ করা।'
    },
    {
      title: 'সকল বিদেশী রাষ্ট্রের সাথে সমতার ভিত্তিতে বন্ধুত্ব গড়ে তোলা',
      content: 'সকল বিদেশী রাষ্ট্রের সাথে সমতার ভিত্তিতে বন্ধুত্ব গড়ে তোলা এবং মুসলিম দেশ গুলোর সাথে সম্পর্ক জোরদার করা।'
    },
    {
      title: 'প্রশাসন বিকেন্দ্রীকরণ এবং স্থানীয় সরকারকে শক্তিশালী করা',
      content: 'প্রশাসন এবং উন্নয়ন ব্যবস্থা বিকেন্দ্রীকরণ এবং স্থানীয় সরকারকে শক্তিশালী করা।'
    },
    {
      title: 'দুর্নীতিমুক্ত, ন্যায়নীতি ভিত্তিক সমাজ ব্যবস্থা কায়েম করা',
      content: 'দুর্নীতিমুক্ত, ন্যায়নীতি ভিত্তিক সমাজ ব্যবস্থা কায়েম করা।'
    },
    {
      title: 'সকল নাগরিকের অধিকার পূর্ণ সংরক্ষণ এবং জাতীয় ঐক্য ও সংহতি সুদৃঢ় করা',
      content: 'ধর্ম, গোত্র ও বর্ণ নির্বিশেষে সকল নাগরিকের অধিকার পূর্ণ সংরক্ষণ করা এবং জাতীয় ঐক্য ও সংহতি সুদৃঢ় করা।'
    }
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFlag className="inline mr-2" />
              ঐতিহাসিক কর্মসূচি
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                বিএনপি'র ১৯ দফা কর্মসূচি
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto mb-4">
              শহীদ প্রেসিডেন্ট জিয়াউর রহমান
            </p>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              দেশের আর্থ-সামাজিক মুক্তির লক্ষ্যে প্রণীত
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200"
          >
            <FaFileAlt className="text-6xl text-green-600 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-900 mb-6 text-center">ঐতিহাসিক ১৯ দফা</h2>
            <p className="text-xl text-slate-700 leading-relaxed text-center">
              শহীদ প্রেসিডেন্ট জিয়াউর রহমান বাংলাদেশের আর্থ-সামাজিক মুক্তির লক্ষ্যে ১৯ দফা কর্মসূচি প্রণয়ন করেছিলেন। 
              এই কর্মসূচি জাতির উন্নয়ন ও সমৃদ্ধির দিক-নির্দেশনা প্রদান করে এবং আজও এর প্রাসঙ্গিকতা অটুট রয়েছে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* 19 Points List */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-[74rem]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              ১৯ দফা কর্মসূচি
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 12) * 0.05 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg mb-3">
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    {point.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                জিয়ার আদর্শ আমাদের পথ
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                শহীদ প্রেসিডেন্ট জিয়াউর রহমানের দেখানো পথে বাংলাদেশের উন্নয়ন ও সমৃদ্ধি অর্জন করতে আমরা প্রতিশ্রুতিবদ্ধ
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                যোগাযোগ করুন
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

