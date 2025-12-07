"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaTools, 
  FaTasks, 
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';

// Sample data for Bangladesh districts, upazilas, and wards
const districts = [
  { id: 'dhaka', name: 'ঢাকা' },
  { id: 'chittagong', name: 'চট্টগ্রাম' },
  { id: 'sylhet', name: 'সিলেট' },
  { id: 'rajshahi', name: 'রাজশাহী' },
  { id: 'khulna', name: 'খুলনা' },
  { id: 'barisal', name: 'বরিশাল' },
  { id: 'rangpur', name: 'রংপুর' },
  { id: 'mymensingh', name: 'ময়মনসিংহ' },
];

const upazilasByDistrict: { [key: string]: string[] } = {
  dhaka: ['গুলশান', 'ধানমন্ডি', 'মিরপুর', 'উত্তরা', 'ঢাকা সদর', 'সাভার', 'কেরানীগঞ্জ'],
  chittagong: ['কক্সবাজার', 'চট্টগ্রাম সদর', 'হাটহাজারী', 'রাউজান', 'ফটিকছড়ি'],
  sylhet: ['সিলেট সদর', 'বালাগঞ্জ', 'বিয়ানীবাজার', 'বিশ্বনাথ', 'বালাগঞ্জ'],
  rajshahi: ['রাজশাহী সদর', 'বোয়ালিয়া', 'পবা', 'দুপচাঁচিয়া'],
  khulna: ['খুলনা সদর', 'দাকোপ', 'ডুমুরিয়া', 'দিঘলিয়া'],
  barisal: ['বরিশাল সদর', 'বাবুগঞ্জ', 'বাকেরগঞ্জ', 'বানারীপাড়া'],
  rangpur: ['রংপুর সদর', 'বদরগঞ্জ', 'গঙ্গাচড়া', 'কাউনিয়া'],
  mymensingh: ['ময়মনসিংহ সদর', 'গফরগাঁও', 'গৌরীপুর', 'ঈশ্বরগঞ্জ'],
};

const wards = Array.from({ length: 9 }, (_, i) => `ওয়ার্ড ${i + 1}`);

const skills = [
  'কম্পিউটার/প্রযুক্তি',
  'শিক্ষা/প্রশিক্ষণ',
  'স্বাস্থ্যসেবা',
  'সামাজিক কাজ',
  'মিডিয়া/প্রচারণা',
  'ইভেন্ট ব্যবস্থাপনা',
  'অনুবাদ',
  'গ্রাফিক ডিজাইন',
  'ফটোগ্রাফি',
  'ভিডিও সম্পাদনা',
  'লেখালেখি',
  'অন্যান্য'
];

const preferredTasks = [
  'ক্যাম্পেইন সহায়তা',
  'ইভেন্ট আয়োজন',
  'সামাজিক যোগাযোগ',
  'ডেটা এন্ট্রি',
  'ফোন কল',
  'দরজায় দরজায় প্রচারণা',
  'সামাজিক মিডিয়া ব্যবস্থাপনা',
  'সামগ্রিক সহায়তা',
  'অন্যান্য'
];

const availabilityOptions = [
  { id: 'weekday-morning', label: 'সপ্তাহের দিন (সকাল ৯টা-১২টা)' },
  { id: 'weekday-afternoon', label: 'সপ্তাহের দিন (দুপুর ১২টা-৫টা)' },
  { id: 'weekday-evening', label: 'সপ্তাহের দিন (সন্ধ্যা ৫টা-৮টা)' },
  { id: 'weekend-morning', label: 'সপ্তাহান্তে (সকাল ৯টা-১২টা)' },
  { id: 'weekend-afternoon', label: 'সপ্তাহান্তে (দুপুর ১২টা-৫টা)' },
  { id: 'weekend-evening', label: 'সপ্তাহান্তে (সন্ধ্যা ৫টা-৮টা)' },
  { id: 'flexible', label: 'নমনীয় সময়' },
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    district: '',
    upazila: '',
    ward: '',
    skills: [] as string[],
    preferredTasks: [] as string[],
    availability: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleDistrictChange = (districtId: string) => {
    setFormData((prev) => ({
      ...prev,
      district: districtId,
      upazila: '', // Reset upazila when district changes
      ward: '', // Reset ward when district changes
    }));
  };

  const handleCheckboxChange = (field: 'skills' | 'preferredTasks' | 'availability', value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'নাম আবশ্যক';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'মোবাইল নম্বর আবশ্যক';
    } else if (!/^01[3-9]\d{8}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'ইমেইল আবশ্যক';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }
    if (!formData.district) {
      newErrors.district = 'জেলা নির্বাচন করুন';
    }
    if (!formData.upazila) {
      newErrors.upazila = 'উপজেলা নির্বাচন করুন';
    }
    if (!formData.ward) {
      newErrors.ward = 'ওয়ার্ড নির্বাচন করুন';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'অন্তত একটি দক্ষতা নির্বাচন করুন';
    }
    if (formData.preferredTasks.length === 0) {
      newErrors.preferredTasks = 'অন্তত একটি কাজ নির্বাচন করুন';
    }
    if (formData.availability.length === 0) {
      newErrors.availability = 'অন্তত একটি সময় নির্বাচন করুন';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'পাসওয়ার্ড আবশ্যক';
    } else if (formData.password.length < 6) {
      newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }
    if (!formData.passwordConfirmation.trim()) {
      newErrors.passwordConfirmation = 'পাসওয়ার্ড নিশ্চিতকরণ আবশ্যক';
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'পাসওয়ার্ড মিলছে না';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
      
      // Map availability IDs to labels
      const availabilityLabels = formData.availability.map((id) => {
        const option = availabilityOptions.find((opt) => opt.id === id);
        return option ? option.label : id;
      });

      // Get district name from ID
      const districtName = districts.find((d) => d.id === formData.district)?.name || formData.district;

      // Prepare payload according to API structure
      const payload = {
        full_name: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        district: districtName,
        upazila: formData.upazila,
        ward: formData.ward,
        skills: formData.skills,
        preferred_tasks: formData.preferredTasks,
        availability: availabilityLabels,
      };

      const response = await fetch(`${apiBaseUrl}/volunteers/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit volunteer application' }));
        throw new Error(errorData.message || `Failed to submit: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to submit volunteer application');
      }
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setSubmitError(error instanceof Error ? error.message : 'আবেদন জমা দেওয়ার সময় একটি ত্রুটি হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  const availableUpazilas = formData.district ? upazilasByDistrict[formData.district] || [] : [];

  if (submitted) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl border border-slate-200">
              <div className="inline-flex p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6">
                <FaCheckCircle className="text-6xl text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                ধন্যবাদ!
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                আপনার স্বেচ্ছাসেবক আবেদন সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    mobile: '',
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    district: '',
                    upazila: '',
                    ward: '',
                    skills: [],
                    preferredTasks: [],
                    availability: [],
                  });
                  setErrors({});
                  setSubmitError(null);
                }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

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
              স্বেচ্ছাসেবক হন
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                স্বেচ্ছাসেবক নিবন্ধন
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              পরিবর্তনে অংশ নিন - আমাদের সাথে স্বেচ্ছাসেবক হন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <FaUser className="text-emerald-600" />
                    ব্যক্তিগত তথ্য
                  </h2>
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                        <FaUser className="text-emerald-600" />
                        পুরো নাম <span className="text-red-500">*</span>
                      </label>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.fullName}</p>
                      )}
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                        <FaPhone className="text-emerald-600" />
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                      </label>
                      {errors.mobile && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.mobile}</p>
                      )}
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                        <FaEnvelope className="text-emerald-600" />
                        ইমেইল <span className="text-red-500">*</span>
                      </label>
                      {errors.email && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.email}</p>
                      )}
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="আপনার@ইমেইল.com"
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        পাসওয়ার্ড <span className="text-red-500">*</span>
                      </label>
                      {errors.password && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.password}</p>
                      )}
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        পাসওয়ার্ড নিশ্চিতকরণ <span className="text-red-500">*</span>
                      </label>
                      {errors.passwordConfirmation && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.passwordConfirmation}</p>
                      )}
                      <input
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}
                        placeholder="পাসওয়ার্ড আবার লিখুন"
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Area Section */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-600" />
                    এলাকা
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* District */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        জেলা <span className="text-red-500">*</span>
                      </label>
                      {errors.district && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.district}</p>
                      )}
                      <select
                        value={formData.district}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      >
                        <option value="">জেলা নির্বাচন করুন</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        উপজেলা <span className="text-red-500">*</span>
                      </label>
                      {errors.upazila && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.upazila}</p>
                      )}
                      <select
                        value={formData.upazila}
                        onChange={(e) => handleInputChange('upazila', e.target.value)}
                        disabled={!formData.district}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      >
                        <option value="">উপজেলা নির্বাচন করুন</option>
                        {availableUpazilas.map((upazila) => (
                          <option key={upazila} value={upazila}>
                            {upazila}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ward */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        ওয়ার্ড <span className="text-red-500">*</span>
                      </label>
                      {errors.ward && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.ward}</p>
                      )}
                      <select
                        value={formData.ward}
                        onChange={(e) => handleInputChange('ward', e.target.value)}
                        disabled={!formData.upazila}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      >
                        <option value="">ওয়ার্ড নির্বাচন করুন</option>
                        {wards.map((ward) => (
                          <option key={ward} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <FaTools className="text-emerald-600" />
                    দক্ষতা
                  </h2>
                  {errors.skills && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.skills}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleCheckboxChange('skills', skill)}
                          className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-2 rounded"
                        />
                        <span className="ml-3 text-slate-700 font-semibold group-hover:text-emerald-600 transition-colors">
                          {skill}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Tasks Section */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <FaTasks className="text-emerald-600" />
                    পছন্দের কাজ
                  </h2>
                  {errors.preferredTasks && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.preferredTasks}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {preferredTasks.map((task) => (
                      <label
                        key={task}
                        className="flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferredTasks.includes(task)}
                          onChange={() => handleCheckboxChange('preferredTasks', task)}
                          className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-2 rounded"
                        />
                        <span className="ml-3 text-slate-700 font-semibold group-hover:text-emerald-600 transition-colors">
                          {task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Section */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <FaCalendarAlt className="text-emerald-600" />
                    উপলব্ধতা
                  </h2>
                  {errors.availability && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.availability}</p>
                  )}
                  <div className="space-y-3">
                    {availabilityOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={formData.availability.includes(option.id)}
                          onChange={() => handleCheckboxChange('availability', option.id)}
                          className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-2 rounded"
                        />
                        <span className="ml-3 text-slate-700 font-semibold group-hover:text-emerald-600 transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <p className="text-red-600 font-bold">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        জমা দেওয়া হচ্ছে...
                      </>
                    ) : (
                      'আবেদন জমা দিন'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        mobile: '',
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                        district: '',
                        upazila: '',
                        ward: '',
                        skills: [],
                        preferredTasks: [],
                        availability: [],
                      });
                      setErrors({});
                      setSubmitError(null);
                    }}
                    className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    রিসেট করুন
                  </button>
                </div>
                
                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-slate-600">
                    ইতিমধ্যে নিবন্ধিত?{' '}
                    <Link
                      href="/volunteer/login"
                      className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                    >
                      লগইন করুন
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

