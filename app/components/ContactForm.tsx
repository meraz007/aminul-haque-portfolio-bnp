"use client";
import { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
      const response = await fetch(`${apiBaseUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          text: form.message.trim(), // Map message to text for API
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to submit contact form: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // Reset form on success
        setForm({ name: '', email: '', message: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit contact form. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-4xl text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('contactForm.messageSent')}</h3>
        <p className="text-slate-600">
          {t('contactForm.thankYouMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-center font-semibold">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-900">
          {t('contactForm.fullName')} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <FaUser />
          </div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t('contactForm.namePlaceholder')}
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-900">
          {t('contactForm.emailAddress')} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t('contactForm.emailPlaceholder')}
          />
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-900">
          {t('contactForm.yourMessage')} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 text-slate-400">
            <FaCommentDots />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            disabled={loading}
            className="w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={t('contactForm.messagePlaceholder')}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>{t('contactForm.sending')}</span>
          </>
        ) : (
          <>
            <FaPaperPlane />
            {t('contactForm.sendMessage')}
          </>
        )}
      </button>
    </form>
  );
}
