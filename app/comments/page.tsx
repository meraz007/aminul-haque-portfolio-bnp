"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaComment, FaUser, FaPaperPlane, FaClock, FaHeart } from 'react-icons/fa';

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
  likes: number;
}

// Sample initial comments
const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    name: 'আনোনিমাস',
    message: 'আমিনুল হক আমাদের এলাকার জন্য অনেক কাজ করেছেন। তার নেতৃত্বে আমরা উন্নতি দেখছি।',
    date: 'নভেম্বর ১২, ২০২৫',
    likes: 24
  },
  {
    id: 2,
    name: 'রহিম',
    message: 'শিক্ষা ক্ষেত্রে তার অবদান প্রশংসনীয়। আমাদের গ্রামে নতুন স্কুল প্রতিষ্ঠায় তিনি সাহায্য করেছেন।',
    date: 'নভেম্বর ১১, ২০২৫',
    likes: 18
  },
  {
    id: 3,
    name: 'ফাতেমা',
    message: 'কৃষকদের জন্য তার কর্মসূচি খুবই উপকারী। আমার পরিবার এর থেকে অনেক সাহায্য পেয়েছে।',
    date: 'নভেম্বর ১০, ২০২৫',
    likes: 31
  },
  {
    id: 4,
    name: 'রহিম',
    message: 'শিক্ষা ক্ষেত্রে তার অবদান প্রশংসনীয়। আমাদের গ্রামে নতুন স্কুল প্রতিষ্ঠায় তিনি সাহায্য করেছেন।',
    date: 'নভেম্বর ১১, ২০২৫',
    likes: 18
  },
  {
    id: 5,
    name: 'আনোনিমাস',
    message: 'আমিনুল হক আমাদের এলাকার জন্য অনেক কাজ করেছেন। তার নেতৃত্বে আমরা উন্নতি দেখছি।',
    date: 'নভেম্বর ১২, ২০২৫',
    likes: 24
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: formData.name.trim() || 'আনোনিমাস',
      message: formData.message.trim(),
      date: new Date().toLocaleDateString('bn-BD', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      likes: 0
    };

    setComments([newComment, ...comments]);
    setFormData({ name: '', message: '' });
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-pink-100 text-pink-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaComment className="inline mr-2" />
              আপনার মতামত
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                মন্তব্য করুন
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আপনার চিন্তা, মতামত এবং পরামর্শ আমাদের সাথে শেয়ার করুন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/aminul_haque.jpg"
                  alt="আমিনুল হক"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-pink-600 font-bold text-sm uppercase tracking-wider">আপনার কথা শুনি</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                আপনার মতামত আমার শক্তি
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>
                  প্রিয় এলাকাবাসী, আপনাদের মতামত, পরামর্শ এবং চিন্তাভাবনা আমার কাছে অত্যন্ত মূল্যবান।
                </p>
                <p>
                  জনগণের প্রতিনিধি হিসেবে আমার দায়িত্ব হলো আপনাদের কথা শোনা এবং সেই অনুযায়ী কাজ করা। আপনাদের প্রতিটি মন্তব্য আমাকে আরও ভালো কাজ করতে অনুপ্রাণিত করে।
                </p>
                <p className="font-semibold text-pink-700">
                  আপনার ছোট একটি মন্তব্যও বড় পরিবর্তন আনতে পারে - তাই নিঃসংকোচে আপনার মতামত জানান।
                </p>
              </div>
              <div className="mt-6 p-6 bg-pink-50 rounded-2xl border-l-4 border-pink-600">
                <p className="text-slate-700">
                  <strong className="text-pink-700">আমার প্রতিশ্রুতি:</strong> প্রতিটি মন্তব্য পড়া হবে এবং আপনার পরামর্শগুলি আমাদের কাজে প্রতিফলিত করার চেষ্টা করা হবে।
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: FaComment, label: 'মোট মন্তব্য', value: comments.length, color: 'from-blue-500 to-cyan-600' },
              { icon: FaUser, label: 'অংশগ্রহণকারী', value: comments.length, color: 'from-pink-500 to-rose-600' },
              { icon: FaHeart, label: 'মোট পছন্দ', value: comments.reduce((sum, c) => sum + c.likes, 0), color: 'from-red-500 to-pink-600' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
          </div> */}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Comment Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-20"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
                        <FaPaperPlane className="text-white text-xl" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">
                        নতুন মন্তব্য
                      </h2>
                    </div>

                    {submitted && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-center font-semibold shadow-lg">
                        ✓ আপনার মন্তব্য যুক্ত হয়েছে!
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          আপনার নাম (ঐচ্ছিক)
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="নাম লিখুন অথবা খালি রাখুন"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-pink-500 focus:outline-none transition-all"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          * খালি রাখলে 'আনোনিমাস' হিসেবে দেখাবে
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          আপনার মন্তব্য <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={6}
                          placeholder="আপনার মতামত লিখুন..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-pink-500 focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105"
                      >
                        <FaPaperPlane />
                        মন্তব্য পাঠান
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comments Display */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                  সকল মন্তব্য
                </h2>
                <p className="text-slate-600">
                  {comments.length} টি মন্তব্য পাওয়া গেছে
                </p>
              </div>

              <div className="space-y-6">
                {comments.map((comment, idx) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FaUser className="text-white" />
                          </div> */}
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">
                              {comment.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <FaClock className="text-xs" />
                              {comment.date}
                            </div>
                          </div>
                        </div>
                        {/* <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        >
                          <FaHeart />
                          <span className="font-bold">{comment.likes}</span>
                        </button> */}
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed">
                        {comment.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                আপনার মতামত গুরুত্বপূর্ণ
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                আপনার প্রতিটি মন্তব্য আমাদের আরও ভালো সেবা প্রদানে সাহায্য করে। নিঃসংকোচে আপনার মতামত শেয়ার করুন।
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
