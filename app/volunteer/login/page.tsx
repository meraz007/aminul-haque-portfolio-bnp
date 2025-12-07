"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function VolunteerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push('/volunteer/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                  স্বেচ্ছাসেবক লগইন
                </span>
              </h1>
              <p className="text-slate-600 text-lg">
                আপনার অ্যাকাউন্টে প্রবেশ করুন
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

              {/* Password Field */}
              <div>
                <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                  <FaLock className="text-emerald-600" />
                  পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="আপনার পাসওয়ার্ড"
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/volunteer/forget-password"
                  className="text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
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
                    লগইন করা হচ্ছে...
                  </>
                ) : (
                  <>
                    লগইন করুন
                    <FaArrowRight />
                  </>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-slate-600">
                  অ্যাকাউন্ট নেই?{' '}
                  <Link
                    href="/volunteer"
                    className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                  >
                    নিবন্ধন করুন
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

