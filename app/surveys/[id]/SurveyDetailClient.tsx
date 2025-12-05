"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';

interface Question {
  id: number;
  survey_id: number;
  question_type: string;
  question_text: string;
  options: Array<{
    id: number;
    question_id: number;
    option_text: string;
  }>;
  formatted_options: string[];
}

interface Survey {
  id: number;
  uuid: string;
  status: string;
  image?: string;
  title: string;
  description: string;
  questions: Question[];
}

interface SurveyDetailClientProps {
  survey: Survey | null;
}

export default function SurveyDetailClient({ survey }: SurveyDetailClientProps) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    answers: Record<string, string>;
    name: string;
    email: string;
    phone: string;
    area: string;
  }>({
    answers: {},
    name: '',
    email: '',
    phone: '',
    area: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: number | string, value: string) => {
    const idStr = questionId.toString();
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [idStr]: value,
      },
    }));
    // Clear error for this question
    if (errors[idStr]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[idStr];
        return newErrors;
      });
    }
  };

  const handleInputChange = (field: 'name' | 'email' | 'phone' | 'area', value: string) => {
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'নাম আবশ্যক';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'ইমেইল আবশ্যক';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা লিখুন';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'ফোন নম্বর আবশ্যক';
    }
    if (!formData.area.trim()) {
      newErrors.area = 'এলাকা আবশ্যক';
    }

    // Validate required questions (all questions are required by default)
    if (survey) {
      survey.questions.forEach((question) => {
        if (!formData.answers[question.id.toString()]) {
          newErrors[question.id.toString()] = 'এই প্রশ্নের উত্তর আবশ্যক';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !survey) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
      
      // Format answers array according to API requirements
      const answers = survey.questions.map((question, index) => ({
        survey_id: survey.id,
        question_id: question.id,
        answer_text: formData.answers[question.id.toString()] || '',
      }));

      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      
      // Append answers array
      answers.forEach((answer, index) => {
        formDataToSend.append(`answers[${index}][survey_id]`, answer.survey_id.toString());
        formDataToSend.append(`answers[${index}][question_id]`, answer.question_id.toString());
        formDataToSend.append(`answers[${index}][answer_text]`, answer.answer_text);
      });

      const response = await fetch(`${apiBaseUrl}/survey/answer/store`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit survey' }));
        throw new Error(errorData.message || `Failed to submit survey: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to submit survey');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError(error instanceof Error ? error.message : 'জরিপ জমা দেওয়ার সময় একটি ত্রুটি হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  if (!survey) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">জরিপ পাওয়া যায়নি</h2>
            <p className="text-slate-600 mb-6">আপনি যে জরিপটি খুঁজছেন তা পাওয়া যায়নি।</p>
            <Link
              href="/surveys"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <FaArrowLeft /> জরিপ তালিকায় ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
                আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে। আপনার মূল্যবান মতামতের জন্য আমরা কৃতজ্ঞ।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/surveys"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <FaArrowLeft /> অন্যান্য জরিপ দেখুন
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ answers: {}, name: '', email: '', phone: '', area: '' });
                    setErrors({});
                    setSubmitError(null);
                  }}
                  className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  আবার জমা দিন
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/surveys"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold mb-6 transition-all"
          >
            <FaArrowLeft /> জরিপ তালিকায় ফিরে যান
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
              {survey.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {survey.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      {survey.image && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-slate-200"
            >
              <Image
                src={survey.image}
                alt={survey.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Survey Form */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
            {/* Questions */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <FaQuestionCircle className="text-emerald-600" />
                প্রশ্নসমূহ
              </h2>
              <div className="space-y-8">
                {survey.questions.map((question, idx) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="border-b border-slate-200 pb-8 last:border-b-0"
                  >
                    <label className="block text-lg font-bold text-slate-900 mb-4">
                      {question.question_text}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    {errors[question.id.toString()] && (
                      <p className="text-red-500 text-sm font-bold mb-2">{errors[question.id.toString()]}</p>
                    )}
                    {question.question_type === 'multiple' && question.formatted_options && question.formatted_options.length > 0 ? (
                      <div className="space-y-3">
                        {question.formatted_options.map((option, optIdx) => (
                          <label
                            key={optIdx}
                            className="flex items-center p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 cursor-pointer transition-all group"
                          >
                            <input
                              type="radio"
                              name={question.id.toString()}
                              value={option}
                              checked={formData.answers[question.id.toString()] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
                            />
                            <span className="ml-3 text-slate-700 font-semibold group-hover:text-emerald-600 transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={formData.answers[question.id.toString()] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="আপনার উত্তর লিখুন..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700 font-medium"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8 border-t-2 border-slate-200 pt-8">
              <h2 className="text-3xl font-black text-slate-900 mb-6">ব্যক্তিগত তথ্য</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-slate-900 mb-2">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.name}</p>
                  )}
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-900 mb-2">
                    ইমেইল <span className="text-red-500">*</span>
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.email}</p>
                  )}
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="আপনার ইমেইল লিখুন"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-900 mb-2">
                    ফোন নম্বর <span className="text-red-500">*</span>
                  </label>
                  {errors.phone && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.phone}</p>
                  )}
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-900 mb-2">
                    এলাকা <span className="text-red-500">*</span>
                  </label>
                  {errors.area && (
                    <p className="text-red-500 text-sm font-bold mb-2">{errors.area}</p>
                  )}
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="আপনার এলাকা লিখুন"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 font-bold">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
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
                  'জমা দিন'
                )}
              </button>
              <Link
                href="/surveys"
                className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-center"
              >
                বাতিল করুন
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}


