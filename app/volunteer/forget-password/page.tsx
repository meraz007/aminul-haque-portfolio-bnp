"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Mock password reset - just simulate delay and show success
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 text-center">
              <div className="inline-flex p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6">
                <FaCheckCircle className="text-6xl text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                ইমেইল পাঠানো হয়েছে
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                আপনার ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইমেইল চেক করুন।
              </p>
              <Link
                href="/volunteer/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                <FaArrowLeft />
                লগইন পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  পাসওয়ার্ড রিসেট
                </span>
              </h1>
              <p className="text-slate-600 text-lg">
                আপনার ইমেইল ঠিকানায় পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হবে
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                  <FaEnvelope className="text-emerald-600" />
                  ইমেইল <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার@ইমেইল.com"
                  className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                  required
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    রিসেট লিঙ্ক পাঠান
                    <FaEnvelope />
                  </>
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-4">
                <Link
                  href="/volunteer/login"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                >
                  <FaArrowLeft />
                  লগইন পেজে ফিরে যান
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

