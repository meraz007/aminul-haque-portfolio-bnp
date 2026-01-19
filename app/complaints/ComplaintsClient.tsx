"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaUser, 
  FaPhone,
   FaIdCard, 
   FaMapMarkerAlt, 
   FaList,
   FaFileAlt, 
   FaCamera, 
   FaPaperPlane,
    FaCheckCircle 
  } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from '../i18n/I18nProvider';

interface Category {
  id: number;
  name: string;
}

interface ComplaintsClientProps {
  categories: Category[];
}

export default function ComplaintsClient({ categories }: ComplaintsClientProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    voterId: '',
    area: '',
    thana: '',
    ward: '',
    category: '',
    description: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const thanas = [
    'উত্তরা',
    'মিরপুর',
    'গুলশান',
    'ধানমন্ডি',
    'মোহাম্মদপুর',
    'মতিঝিল',
    'রমনা',
    'বনানী',
    'কল্যাণপুর',
    'বাড্ডা',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null); // Clear error when user starts typing
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Map form fields to API fields
      formDataToSend.append('complain_user_name', formData.name.trim());
      formDataToSend.append('complain_user_phone', formData.mobile.trim());
      
      // NID number (optional)
      if (formData.voterId.trim()) {
        formDataToSend.append('nid_number', formData.voterId.trim());
      }
      
      // Combine area, thana, and ward into complain_area
      const areaParts = [formData.area, formData.thana, formData.ward]
        .filter(part => part.trim())
        .join(', ');
      formDataToSend.append('complain_area', areaParts || formData.area);
      
      // Category ID
      if (formData.category) {
        formDataToSend.append('complain_category_id', formData.category);
      }
      
      // Status (default: 1)
      formDataToSend.append('status', '1');
      
      // Message/Description
      formDataToSend.append('message', formData.description.trim());
      
      // Handle file uploads (API might accept single file or multiple)
      // If multiple files, we'll send the first one or combine them
      if (files.length > 0) {
        // Send the first file (or you can loop through all files if API supports multiple)
        formDataToSend.append('file', files[0]);
      }

      const response = await fetch(`${apiBaseUrl}/complains`, {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, browser will set it with boundary for FormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to submit complaint: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            mobile: '',
            voterId: '',
            area: '',
            thana: '',
            ward: '',
            category: '',
            description: '',
          });
          setFiles([]);
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaExclamationTriangle className="inline mr-2" />
              {t('complaints.publicComplaints')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {t('complaints.title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t('complaints.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/aminul Haque/complain.jpeg"
                  alt={t('hero.title')}
                  width={600}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
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
              <span className="text-red-600 font-bold text-sm uppercase tracking-wider">{t('complaints.hearYourVoice')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                {t('complaints.alwaysReady')}
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>
                  {t('complaints.welcomeText1')}
                </p>
                <p>
                  {t('complaints.welcomeText2')}
                </p>
                <p className="font-semibold text-red-700">
                  {t('complaints.togetherImprove')}
                </p>
              </div>
              <div className="mt-6 p-6 bg-red-50 rounded-2xl border-l-4 border-red-600">
                <p className="text-slate-700">
                  <strong className="text-red-700">{t('complaints.promise')}:</strong> {t('complaints.promiseText')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {isSubmitted && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center"
            >
              <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-800 mb-3">{t('complaints.complaintSubmitted')}</h3>
              <p className="text-lg text-green-700">
                {t('complaints.complaintRecorded')}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center"
            >
              <FaExclamationTriangle className="text-6xl text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-red-800 mb-3">{t('complaints.errorTitle')}</h3>
              <p className="text-lg text-red-700 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold"
              >
                {t('common.ok')}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Complaint Form */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-center font-semibold">
                    {error}
                  </div>
                )}
                {/* Name */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaUser className="text-red-600" />
                    {t('complaints.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('complaints.enterFullName')}
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                    required
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaPhone className="text-red-600" />
                    {t('complaints.mobileNumber')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="০১৭xxxxxxxx"
                    pattern="[0-9]{11}"
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                    required
                  />
                </div>

                {/* Voter ID / NID (Optional) */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaIdCard className="text-red-600" />
                    {t('complaints.voterIdNid')} <span className="text-slate-400 text-sm font-normal">({t('complaints.optional')})</span>
                  </label>
                  <input
                    type="text"
                    name="voterId"
                    value={formData.voterId}
                    onChange={handleInputChange}
                    placeholder={t('complaints.voterIdPlaceholder')}
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                  />
                </div>

                {/* Location - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Area */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-600" />
                      {t('complaints.area')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder={t('complaints.areaName')}
                      className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                      required
                    />
                  </div>

                  {/* Thana */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-3 text-lg">
                      {t('complaints.thana')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="thana"
                      value={formData.thana}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                      required
                    >
                      <option value="">{t('complaints.selectThana')}</option>
                      {thanas.map((thana) => (
                        <option key={thana} value={thana}>
                          {thana}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ward */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-3 text-lg">
                      {t('complaints.wardNo')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder={t('complaints.wardNo')}
                      className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaList className="text-red-600" />
                    {t('complaints.complaintType')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg"
                    required
                  >
                    <option value="">{t('complaints.selectType')}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaFileAlt className="text-red-600" />
                    {t('complaints.complaintDetails')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('complaints.detailsPlaceholder')}
                    rows={6}
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition-all text-lg resize-none"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    {t('complaints.detailsHint')}
                  </p>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2">
                    <FaCamera className="text-red-600" />
                    {t('complaints.evidence')} <span className="text-slate-400 text-sm font-normal">({t('complaints.maxFiles')})</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-red-500 transition-all">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      id="file-upload"
                      disabled={files.length >= 5}
                    />
                    <label
                      htmlFor="file-upload"
                      className={`cursor-pointer ${files.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaCamera className="text-5xl text-slate-400 mx-auto mb-4" />
                      <p className="text-lg text-slate-600 font-semibold mb-2">
                        {t('complaints.uploadImages')}
                      </p>
                      <p className="text-sm text-slate-500">
                        {t('complaints.clickOrDrag')}
                      </p>
                    </label>
                  </div>

                  {/* File Preview */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                        >
                          <div className="flex items-center gap-3">
                            <FaCamera className="text-red-600" />
                            <div>
                              <p className="font-semibold text-slate-900">{file.name}</p>
                              <p className="text-sm text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all font-semibold"
                          >
                            {t('common.delete')}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      {t('common.submitting')}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      {t('complaints.submitComplaint')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
              <FaExclamationTriangle />
              {t('complaints.importantInfo')}
            </h3>
            <ul className="space-y-3 text-amber-800 text-lg">
              <li>• {t('complaints.info1')}</li>
              <li>• {t('complaints.info2')}</li>
              <li>• {t('complaints.info3')}</li>
              <li>• {t('complaints.info4')}</li>
              <li>• {t('complaints.info5')}</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                {t('complaints.needDirectContact')}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {t('complaints.urgentMatters')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+8801552161616"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  {t('common.callUs')}
                </a>
                <a
                  href="/contact"
                  className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105"
                >
                  {t('complaints.contactForm')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
