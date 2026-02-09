"use client";

import { useState, useEffect } from 'react';
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
import { toBanglaNumber } from '@/lib/utils';
import { useTranslation } from '../i18n/I18nProvider';
import { fetchCmsPage, type CmsPage } from '@/lib/api';

// Sample data for Bangladesh districts, upazilas, and wards
const districts = [
  { id: 'dhaka', name: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'chittagong', name: 'চট্টগ্রাম', nameEn: 'Chittagong' },
  { id: 'sylhet', name: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'rajshahi', name: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'khulna', name: 'খুলনা', nameEn: 'Khulna' },
  { id: 'barisal', name: 'বরিশাল', nameEn: 'Barisal' },
  { id: 'rangpur', name: 'রংপুর', nameEn: 'Rangpur' },
  { id: 'mymensingh', name: 'ময়মনসিংহ', nameEn: 'Mymensingh' },
];

const upazilasByDistrict: { [key: string]: { bd: string[], en: string[] } } = {
  dhaka: {
    bd: ['গুলশান', 'ধানমন্ডি', 'মিরপুর', 'উত্তরা', 'ঢাকা সদর', 'সাভার', 'কেরানীগঞ্জ'],
    en: ['Gulshan', 'Dhanmondi', 'Mirpur', 'Uttara', 'Dhaka Sadar', 'Savar', 'Keraniganj']
  },
  chittagong: {
    bd: ['কক্সবাজার', 'চট্টগ্রাম সদর', 'হাটহাজারী', 'রাউজান', 'ফটিকছড়ি'],
    en: ['Cox\'s Bazar', 'Chittagong Sadar', 'Hathazari', 'Raozan', 'Fatikchhari']
  },
  sylhet: {
    bd: ['সিলেট সদর', 'বালাগঞ্জ', 'বিয়ানীবাজার', 'বিশ্বনাথ', 'বালাগঞ্জ'],
    en: ['Sylhet Sadar', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Balaganj']
  },
  rajshahi: {
    bd: ['রাজশাহী সদর', 'বোয়ালিয়া', 'পবা', 'দুপচাঁচিয়া'],
    en: ['Rajshahi Sadar', 'Boalia', 'Paba', 'Durgapur']
  },
  khulna: {
    bd: ['খুলনা সদর', 'দাকোপ', 'ডুমুরিয়া', 'দিঘলিয়া'],
    en: ['Khulna Sadar', 'Dakop', 'Dumuria', 'Dighulia']
  },
  barisal: {
    bd: ['বরিশাল সদর', 'বাবুগঞ্জ', 'বাকেরগঞ্জ', 'বানারীপাড়া'],
    en: ['Barisal Sadar', 'Babuganj', 'Bakerganj', 'Banaripara']
  },
  rangpur: {
    bd: ['রংপুর সদর', 'বদরগঞ্জ', 'গঙ্গাচড়া', 'কাউনিয়া'],
    en: ['Rangpur Sadar', 'Badarganj', 'Gangachara', 'Kaunia']
  },
  mymensingh: {
    bd: ['ময়মনসিংহ সদর', 'গফরগাঁও', 'গৌরীপুর', 'ঈশ্বরগঞ্জ'],
    en: ['Mymensingh Sadar', 'Gafargaon', 'Gouripur', 'Ishwarganj']
  },
};

const skillsData = {
  bd: [
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
  ],
  en: [
    'Computer/Technology',
    'Education/Training',
    'Healthcare',
    'Social Work',
    'Media/Promotion',
    'Event Management',
    'Translation',
    'Graphic Design',
    'Photography',
    'Video Editing',
    'Writing',
    'Others'
  ]
};

const preferredTasksData = {
  bd: [
    'ক্যাম্পেইন সহায়তা',
    'ইভেন্ট আয়োজন',
    'সামাজিক যোগাযোগ',
    'ডেটা এন্ট্রি',
    'ফোন কল',
    'দরজায় দরজায় প্রচারণা',
    'সামাজিক মিডিয়া ব্যবস্থাপনা',
    'সামগ্রিক সহায়তা',
    'অন্যান্য'
  ],
  en: [
    'Campaign Support',
    'Event Organization',
    'Social Communication',
    'Data Entry',
    'Phone Calls',
    'Door-to-Door Canvassing',
    'Social Media Management',
    'General Support',
    'Others'
  ]
};

const availabilityOptionsData = {
  bd: [
    { id: 'weekday-morning', label: 'সপ্তাহের দিন (সকাল ৯টা-১২টা)' },
    { id: 'weekday-afternoon', label: 'সপ্তাহের দিন (দুপুর ১২টা-৫টা)' },
    { id: 'weekday-evening', label: 'সপ্তাহের দিন (সন্ধ্যা ৫টা-৮টা)' },
    { id: 'weekend-morning', label: 'সপ্তাহান্তে (সকাল ৯টা-১২টা)' },
    { id: 'weekend-afternoon', label: 'সপ্তাহান্তে (দুপুর ১২টা-৫টা)' },
    { id: 'weekend-evening', label: 'সপ্তাহান্তে (সন্ধ্যা ৫টা-৮টা)' },
    { id: 'flexible', label: 'নমনীয় সময়' },
  ],
  en: [
    { id: 'weekday-morning', label: 'Weekdays (9 AM - 12 PM)' },
    { id: 'weekday-afternoon', label: 'Weekdays (12 PM - 5 PM)' },
    { id: 'weekday-evening', label: 'Weekdays (5 PM - 8 PM)' },
    { id: 'weekend-morning', label: 'Weekends (9 AM - 12 PM)' },
    { id: 'weekend-afternoon', label: 'Weekends (12 PM - 5 PM)' },
    { id: 'weekend-evening', label: 'Weekends (5 PM - 8 PM)' },
    { id: 'flexible', label: 'Flexible Hours' },
  ]
};

export default function VolunteerPage() {
  const { t, language } = useTranslation();
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
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);

  useEffect(() => {
    fetchCmsPage('volunteer', 'become-volunteer').then(setCmsData);
  }, []);

  const skills = language === 'bd' ? skillsData.bd : skillsData.en;
  const preferredTasks = language === 'bd' ? preferredTasksData.bd : preferredTasksData.en;
  const availabilityOptions = language === 'bd' ? availabilityOptionsData.bd : availabilityOptionsData.en;
  const wards = Array.from({ length: 9 }, (_, i) => language === 'bd' ? `ওয়ার্ড ${toBanglaNumber(i + 1)}` : `Ward ${i + 1}`);

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
      newErrors.fullName = t('volunteer.nameRequired');
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = t('volunteer.mobileRequired');
    } else if (!/^01[3-9]\d{8}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = t('volunteer.validMobile');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('volunteer.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('volunteer.validEmail');
    }
    if (!formData.district) {
      newErrors.district = t('volunteer.districtRequired');
    }
    if (!formData.upazila) {
      newErrors.upazila = t('volunteer.upazilaRequired');
    }
    if (!formData.ward) {
      newErrors.ward = t('volunteer.wardRequired');
    }
    if (formData.skills.length === 0) {
      newErrors.skills = t('volunteer.skillsRequired');
    }
    if (formData.preferredTasks.length === 0) {
      newErrors.preferredTasks = t('volunteer.tasksRequired');
    }
    if (formData.availability.length === 0) {
      newErrors.availability = t('volunteer.availabilityRequired');
    }
    if (!formData.password.trim()) {
      newErrors.password = t('volunteer.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('volunteer.passwordMinLength');
    }
    if (!formData.passwordConfirmation.trim()) {
      newErrors.passwordConfirmation = t('volunteer.confirmPasswordRequired');
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = t('volunteer.passwordMismatch');
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
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
      
      // Map availability IDs to labels
      const availabilityLabels = formData.availability.map((id) => {
        const option = availabilityOptions.find((opt) => opt.id === id);
        return option ? option.label : id;
      });

      // Get district name from ID
      const districtData = districts.find((d) => d.id === formData.district);
      const districtName = districtData ? (language === 'bd' ? districtData.name : districtData.nameEn) : formData.district;

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
      setSubmitError(error instanceof Error ? error.message : t('volunteer.submissionError'));
    } finally {
      setSubmitting(false);
    }
  };

  const getAvailableUpazilas = () => {
    if (!formData.district) return [];
    const data = upazilasByDistrict[formData.district];
    if (!data) return [];
    return language === 'bd' ? data.bd : data.en;
  };

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
                {t('volunteer.thankYou')}
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                {t('volunteer.applicationSubmitted')}
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
                {t('volunteer.newApplication')}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              {t('volunteer.becomeVolunteer')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {cmsData?.title || t('volunteer.volunteerRegistration')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {cmsData?.description || t('volunteer.joinUsDesc')}
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
                    {t('volunteer.personalInfo')}
                  </h2>
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                        <FaUser className="text-emerald-600" />
                        {t('volunteer.fullName')} <span className="text-red-500">*</span>
                      </label>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.fullName}</p>
                      )}
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder={t('volunteer.enterFullName')}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                        <FaPhone className="text-emerald-600" />
                        {t('volunteer.mobileNumber')} <span className="text-red-500">*</span>
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
                        {t('volunteer.emailAddress')} <span className="text-red-500">*</span>
                      </label>
                      {errors.email && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.email}</p>
                      )}
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('contactForm.emailPlaceholder')}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        {t('volunteer.password')} <span className="text-red-500">*</span>
                      </label>
                      {errors.password && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.password}</p>
                      )}
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={t('volunteer.passwordPlaceholder')}
                        className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                        required
                      />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        {t('volunteer.confirmPassword')} <span className="text-red-500">*</span>
                      </label>
                      {errors.passwordConfirmation && (
                        <p className="text-red-500 text-sm font-bold mb-2">{errors.passwordConfirmation}</p>
                      )}
                      <input
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}
                        placeholder={t('volunteer.confirmPasswordPlaceholder')}
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
                    {t('volunteer.area')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* District */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        {t('volunteer.district')} <span className="text-red-500">*</span>
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
                        <option value="">{t('volunteer.selectDistrict')}</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {language === 'bd' ? district.name : district.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        {t('volunteer.upazila')} <span className="text-red-500">*</span>
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
                        <option value="">{t('volunteer.selectUpazila')}</option>
                        {getAvailableUpazilas().map((upazila) => (
                          <option key={upazila} value={upazila}>
                            {upazila}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ward */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-3 text-lg">
                        {t('volunteer.ward')} <span className="text-red-500">*</span>
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
                        <option value="">{t('volunteer.selectWard')}</option>
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
                    {t('volunteer.skills')}
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
                    {t('volunteer.preferredTasks')}
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
                    {t('volunteer.availability')}
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
                        {t('common.submitting')}
                      </>
                    ) : (
                      t('volunteer.submitApplication')
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
                    {t('common.reset')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
