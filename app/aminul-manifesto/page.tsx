"use client";
import { motion } from 'framer-motion';
import { FaFileAlt, FaCheck, FaHeart, FaUsers, FaGraduationCap, FaSeedling, FaHospital, FaRoad } from 'react-icons/fa';

export default function AminulManifestoPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFileAlt className="inline mr-2" />
              আমাদের প্রতিশ্রুতি
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                আমিনুল ভাইয়ের ইশতেহার
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              জনগণের জন্য, জনগণের দ্বারা - একটি সমৃদ্ধ ভবিষ্যতের রূপরেখা
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="text-center mb-8">
                <FaHeart className="text-6xl text-emerald-600 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-slate-900 mb-4">আমার দৃষ্টিভঙ্গি</h2>
              </div>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                আমি বিশ্বাস করি যে প্রতিটি নাগরিকের মৌলিক অধিকার নিশ্চিত করা এবং একটি ন্যায়সংগত সমাজ গড়ে তোলা আমাদের প্রথম দায়িত্ব। 
                আমার ইশতেহার তৈরি হয়েছে জনগণের সাথে সরাসরি কথা বলে, তাদের সমস্যা শুনে এবং তাদের স্বপ্ন বুঝে।
              </p>
              <p className="text-xl text-slate-700 leading-relaxed">
                ফুটবল মাঠে যেমন আমি গোল রক্ষা করেছি, তেমনি জনগণের স্বার্থ রক্ষা করা আমার প্রতিশ্রুতি। 
                এই ইশতেহার শুধু প্রতিশ্রুতির তালিকা নয়, এটি আমার জীবনের অঙ্গীকার।
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Promises */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              মূল প্রতিশ্রুতি সমূহ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FaGraduationCap,
                title: 'শিক্ষা ব্যবস্থার উন্নয়ন',
                color: 'from-blue-500 to-cyan-600',
                points: [
                  'প্রতিটি এলাকায় মানসম্পন্ন শিক্ষা প্রতিষ্ঠান',
                  'মেধাবী শিক্ষার্থীদের জন্য বৃত্তি কর্মসূচি',
                  'শিক্ষকদের প্রশিক্ষণ ও পেশাগত উন্নয়ন',
                  'ডিজিটাল শিক্ষা ব্যবস্থা চালু',
                ]
              },
              {
                icon: FaHospital,
                title: 'স্বাস্থ্য সেবার উন্নতি',
                color: 'from-red-500 to-pink-600',
                points: [
                  'বিনামূল্যে প্রাথমিক স্বাস্থ্য সেবা',
                  'প্রতি ওয়ার্ডে কমিউনিটি ক্লিনিক',
                  'মাসিক স্বাস্থ্য ক্যাম্প আয়োজন',
                  'জরুরি চিকিৎসায় দ্রুত সেবা',
                ]
              },
              {
                icon: FaSeedling,
                title: 'কৃষি ও কৃষক কল্যাণ',
                color: 'from-green-500 to-emerald-600',
                points: [
                  'কৃষকদের ন্যায্য মূল্য নিশ্চিত করা',
                  'আধুনিক কৃষি প্রযুক্তি সহায়তা',
                  'কৃষি ঋণে সুদমুক্ত সুবিধা',
                  'কৃষি বীমা কর্মসূচি চালু',
                ]
              },
              {
                icon: FaRoad,
                title: 'অবকাঠামো উন্নয়ন',
                color: 'from-amber-500 to-orange-600',
                points: [
                  'রাস্তা-ঘাট মেরামত ও উন্নয়ন',
                  'নিরাপদ পানি সরবরাহ নিশ্চিত',
                  'যথাযথ নিষ্কাশন ব্যবস্থা',
                  'প্রতিটি এলাকায় বিদ্যুৎ সরবরাহ',
                ]
              },
              {
                icon: FaUsers,
                title: 'যুব উন্নয়ন',
                color: 'from-purple-500 to-pink-600',
                points: [
                  'দক্ষতা উন্নয়ন প্রশিক্ষণ কর্মসূচি',
                  'স্টার্টআপ ও উদ্যোক্তাদের সহায়তা',
                  'খেলাধুলা ও সাংস্কৃতিক কর্মকাণ্ড',
                  'কর্মসংস্থান সৃষ্টিতে বিশেষ উদ্যোগ',
                ]
              },
              {
                icon: FaHeart,
                title: 'সামাজিক নিরাপত্তা',
                color: 'from-rose-500 to-red-600',
                points: [
                  'বয়স্ক ভাতা বৃদ্ধি',
                  'বিধবা ও প্রতিবন্ধীদের সহায়তা',
                  'দরিদ্র পরিবারের জন্য খাদ্য সহায়তা',
                  'মহিলা ও শিশু সুরক্ষা কর্মসূচি',
                ]
              },
            ].map((promise, idx) => (
              <motion.div
                key={promise.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl transition-all border border-slate-200">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${promise.color} rounded-xl mb-6`}>
                    <promise.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{promise.title}</h3>
                  <ul className="space-y-3">
                    {promise.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <FaCheck className="text-emerald-600 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 text-center">
              বাস্তবায়ন পরিকল্পনা
            </h2>
            <div className="space-y-6">
              {[
                { period: 'প্রথম ১০০ দিন', tasks: 'জরুরি সমস্যা চিহ্নিতকরণ ও দ্রুত সমাধানের উদ্যোগ' },
                { period: 'প্রথম ৬ মাস', tasks: 'শিক্ষা ও স্বাস্থ্য খাতে অবকাঠামো উন্নয়ন শুরু' },
                { period: 'প্রথম ১ বছর', tasks: 'সকল কর্মসূচির পূর্ণ বাস্তবায়ন ও নিয়মিত পরিবীক্ষণ' },
                { period: 'চলমান', tasks: 'জনগণের মতামত নিয়ে ক্রমাগত উন্নয়ন ও সংশোধন' },
              ].map((timeline, idx) => (
                <motion.div
                  key={timeline.period}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
                >
                  <div className="flex-shrink-0 w-32 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black rounded-xl text-center">
                    {timeline.period}
                  </div>
                  <p className="text-lg text-slate-700 flex-1">{timeline.tasks}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Commitment */}
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
                আমার অঙ্গীকার
              </h2>
              <p className="text-2xl text-slate-700 leading-relaxed mb-8">
                "আমি প্রতিশ্রুতিবদ্ধ যে এই ইশতেহারের প্রতিটি পয়েন্ট বাস্তবায়নে আমি সর্বোচ্চ চেষ্টা করব। 
                জনগণের বিশ্বাস আমার সবচেয়ে বড় সম্পদ এবং তাদের সেবা করাই আমার একমাত্র লক্ষ্য।"
              </p>
              <div className="text-3xl font-black text-emerald-600">- আমিনুল হক</div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}





