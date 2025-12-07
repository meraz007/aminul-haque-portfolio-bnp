"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaTools,
  FaTasks,
  FaCalendarAlt
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function VolunteerDashboardPage() {
  const { isAuthenticated, volunteer, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/volunteer/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </main>
    );
  }

  if (!isAuthenticated || !volunteer) {
    return null;
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              স্বেচ্ছাসেবক ড্যাশবোর্ড
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            আপনার প্রোফাইল এবং কাজের তথ্য দেখুন
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Personal Information */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
              <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FaUser className="text-emerald-600" />
                ব্যক্তিগত তথ্য
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider">
                      পুরো নাম
                    </label>
                    <p className="text-xl font-bold text-slate-900">
                      {volunteer.full_name}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <FaEnvelope className="text-emerald-600" />
                      ইমেইল
                    </label>
                    <p className="text-xl font-bold text-slate-900">
                      {volunteer.email}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <FaPhone className="text-emerald-600" />
                      মোবাইল
                    </label>
                    <p className="text-xl font-bold text-slate-900">
                      {volunteer.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Area Assignment */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
              <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FaMapMarkerAlt className="text-emerald-600" />
                এলাকা বরাদ্দ
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider">
                    জেলা
                  </label>
                  <p className="text-xl font-bold text-slate-900">
                    {volunteer.district || 'নির্ধারিত হয়নি'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider">
                    উপজেলা
                  </label>
                  <p className="text-xl font-bold text-slate-900">
                    {volunteer.upazila || 'নির্ধারিত হয়নি'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-slate-600 font-bold mb-2 text-sm uppercase tracking-wider">
                    ওয়ার্ড
                  </label>
                  <p className="text-xl font-bold text-slate-900">
                    {volunteer.ward || 'নির্ধারিত হয়নি'}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            {volunteer.skills && volunteer.skills.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <FaTools className="text-emerald-600" />
                  দক্ষতা
                </h2>
                <div className="flex flex-wrap gap-3">
                  {volunteer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Tasks */}
            {volunteer.preferred_tasks && volunteer.preferred_tasks.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <FaTasks className="text-emerald-600" />
                  পছন্দের কাজ
                </h2>
                <div className="flex flex-wrap gap-3">
                  {volunteer.preferred_tasks.map((task, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold text-sm"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {volunteer.availability && volunteer.availability.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <FaCalendarAlt className="text-emerald-600" />
                  উপলব্ধতা
                </h2>
                <div className="space-y-2">
                  {volunteer.availability.map((avail, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      {avail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Actions Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl text-white">
              <h3 className="text-2xl font-black mb-4">দ্রুত কাজ</h3>
              <div className="space-y-4">
                <a
                  href="/volunteer/tasks"
                  className="block px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  আমার কাজ দেখুন
                </a>
                <a
                  href="/volunteer"
                  className="block px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  প্রোফাইল আপডেট করুন
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

