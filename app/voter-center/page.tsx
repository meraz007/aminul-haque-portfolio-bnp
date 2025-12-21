"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaBuilding, 
  FaTimes,
  FaUser,
  FaGraduationCap,
  FaPrint
} from 'react-icons/fa';

interface Voter {
  id: number;
  uuid: string;
  name: string;
  address: string;
  nid: string;
  phone: string;
  center: string;
  educational_qualification: string | null;
  picture: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface VoterApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Voter[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
}

export default function VoterCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Voter[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://admin.aminul-haque.com/api/v1/voters?search=${encodeURIComponent(searchQuery)}`
      );
      
      const data: VoterApiResponse = await response.json();

      if (data.success && data.data.data.length > 0) {
        setSearchResults(data.data.data);
        setNotFound(false);
        setShowModal(true);
      } else {
        setSearchResults([]);
        setNotFound(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching voter data:', error);
      setSearchResults([]);
      setNotFound(true);
      setErrorMessage('সার্ভারে সংযোগ করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
      setShowModal(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePrint = () => {
    if (searchResults.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('পপআপ ব্লক করা হয়েছে। অনুগ্রহ করে পপআপ অনুমতি দিন।');
      return;
    }

    const votersHtml = searchResults.map((voter, index) => `
      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; page-break-inside: avoid;">
        ${searchResults.length > 1 ? `<h3 style="text-align: center; color: #1e40af; margin-bottom: 15px;">ভোটার #${index + 1}</h3>` : ''}
        
        <h4 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-bottom: 15px;">ব্যক্তিগত তথ্য</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; width: 30%;"><strong>নাম</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.name}</td>
          </tr>
          ${voter.nid ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>এনআইডি নম্বর</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.nid}</td>
          </tr>` : ''}
          ${voter.phone ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>মোবাইল নম্বর</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.phone}</td>
          </tr>` : ''}
          ${voter.educational_qualification ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>শিক্ষাগত যোগ্যতা</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.educational_qualification}</td>
          </tr>` : ''}
        </table>

        <h4 style="color: #1e293b; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-bottom: 15px;">ভোট কেন্দ্রের তথ্য</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; width: 30%;"><strong>ভোট কেন্দ্র</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.center}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>ঠিকানা</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.address}</td>
          </tr>
        </table>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ভোটার তথ্য - প্রিন্ট</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Noto Sans Bengali', 'Hind Siliguri', Arial, sans-serif;
              padding: 20px;
              color: #1e293b;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #3b82f6;
            }
            .header h1 {
              color: #1e40af;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #64748b;
              margin: 10px 0 0;
            }
            .notice {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin-top: 20px;
            }
            .notice h4 {
              color: #92400e;
              margin: 0 0 10px;
            }
            .notice ul {
              margin: 0;
              padding-left: 20px;
              color: #92400e;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 12px;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ভোট কেন্দ্র তথ্য</h1>
            <p>প্রিন্টের তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
          </div>
          
          ${votersHtml}
          
          <div class="notice">
            <h4>📋 গুরুত্বপূর্ণ নির্দেশনা</h4>
            <ul>
              <li>ভোট দিতে যাওয়ার সময় অবশ্যই আপনার জাতীয় পরিচয়পত্র সাথে নিন</li>
              <li>ভোট কেন্দ্রে যাওয়ার আগে সময়সূচী যাচাই করে নিন</li>
              <li>কোনো সমস্যা হলে ভোট কেন্দ্রের কর্মকর্তাদের সাথে যোগাযোগ করুন</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>আমিনুল হক - ভোটার সেবা কেন্দ্র</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handlePrintSingle = (voter: Voter) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('পপআপ ব্লক করা হয়েছে। অনুগ্রহ করে পপআপ অনুমতি দিন।');
      return;
    }

    const voterHtml = `
      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h4 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-bottom: 15px;">ব্যক্তিগত তথ্য</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; width: 30%;"><strong>নাম</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.name}</td>
          </tr>
          ${voter.nid ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>এনআইডি নম্বর</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.nid}</td>
          </tr>` : ''}
          ${voter.phone ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>মোবাইল নম্বর</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.phone}</td>
          </tr>` : ''}
          ${voter.educational_qualification ? `
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>শিক্ষাগত যোগ্যতা</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.educational_qualification}</td>
          </tr>` : ''}
        </table>

        <h4 style="color: #1e293b; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-bottom: 15px;">ভোট কেন্দ্রের তথ্য</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; width: 30%;"><strong>ভোট কেন্দ্র</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.center}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0;"><strong>ঠিকানা</strong></td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${voter.address}</td>
          </tr>
        </table>
      </div>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ভোটার তথ্য - ${voter.name}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Noto Sans Bengali', 'Hind Siliguri', Arial, sans-serif;
              padding: 20px;
              color: #1e293b;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #3b82f6;
            }
            .header h1 {
              color: #1e40af;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #64748b;
              margin: 10px 0 0;
            }
            .notice {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin-top: 20px;
            }
            .notice h4 {
              color: #92400e;
              margin: 0 0 10px;
            }
            .notice ul {
              margin: 0;
              padding-left: 20px;
              color: #92400e;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 12px;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ভোট কেন্দ্র তথ্য</h1>
            <p>প্রিন্টের তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
          </div>
          
          ${voterHtml}
          
          <div class="notice">
            <h4>📋 গুরুত্বপূর্ণ নির্দেশনা</h4>
            <ul>
              <li>ভোট দিতে যাওয়ার সময় অবশ্যই আপনার জাতীয় পরিচয়পত্র সাথে নিন</li>
              <li>ভোট কেন্দ্রে যাওয়ার আগে সময়সূচী যাচাই করে নিন</li>
              <li>কোনো সমস্যা হলে ভোট কেন্দ্রের কর্মকর্তাদের সাথে যোগাযোগ করুন</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>আমিনুল হক - ভোটার সেবা কেন্দ্র</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaMapMarkerAlt className="inline mr-2" />
              ভোটার সেবা
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ভোট কেন্দ্র খুঁজুন
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আপনার ভোট কেন্দ্র ও নির্বাচনী এলাকা সহজেই খুঁজে নিন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">ভোটার সেবায় আমরা</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                আপনার ভোট কেন্দ্র খুঁজতে আমরা সাহায্য করছি
              </h2>
              <section>
                <div className="mx-auto max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
                      {/* Search Form */}
                      <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                          <label className="block text-slate-700 font-bold mb-3 text-lg flex items-center gap-2 flex-wrap">
                            <FaSearch className="text-blue-600" />
                            <span>নাম / এনআইডি / মোবাইল নম্বর দিয়ে খুঁজুন</span>
                          </label>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="উদাহরণ: মোঃ কামাল হোসেন / 1002929220 / 1711951959"
                            className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSearching}
                          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                        >
                          {isSearching ? (
                            <>
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              খোঁজা হচ্ছে...
                            </>
                          ) : (
                            <>
                              <FaSearch />
                              খুঁজুন
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/aminul Haque/DSC01026.jpg"
                  alt="আমিনুল হক"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}


      {/* Modal for Search Results */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-black text-slate-900">
                  {notFound ? 'তথ্য পাওয়া যায়নি' : 'ভোট কেন্দ্র তথ্য'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSearchResults([]);
                    setNotFound(false);
                    setErrorMessage('');
                  }}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <FaTimes className="text-2xl text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {notFound ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
                  >
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">তথ্য পাওয়া যায়নি</h3>
                    <p className="text-red-600">
                      {errorMessage || 'দয়া করে আপনার তথ্য যাচাই করে আবার চেষ্টা করুন'}
                    </p>
                  </motion.div>
                ) : searchResults.length > 0 ? (
                  <>
                    {/* Success Message */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                      <div className="text-5xl mb-3">✅</div>
                      <h3 className="text-2xl font-bold text-green-800">
                        {searchResults.length === 1 ? 'তথ্য পাওয়া গেছে!' : `${searchResults.length} জন ভোটারের তথ্য পাওয়া গেছে!`}
                      </h3>
                    </div>

                    {searchResults.map((voter, index) => (
                      <div key={voter.id} className="space-y-4">
                        {searchResults.length > 1 && (
                          <div className="text-center">
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                              ভোটার #{index + 1}
                            </span>
                          </div>
                        )}

                    {/* Voter Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                      >
                        <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                            <FaUser className="text-blue-600" />
                          ব্যক্তিগত তথ্য
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl">
                              <p className="text-sm text-slate-600 mb-1">নাম</p>
                              <p className="text-lg font-bold text-slate-900">{voter.name}</p>
                            </div>
                            {voter.nid && (
                            <div className="p-4 bg-slate-50 rounded-xl">
                              <p className="text-sm text-slate-600 mb-1">এনআইডি নম্বর</p>
                                <p className="text-lg font-bold text-slate-900">{voter.nid}</p>
                            </div>
                          )}
                            {voter.phone && (
                            <div className="p-4 bg-slate-50 rounded-xl">
                              <p className="text-sm text-slate-600 mb-1">মোবাইল নম্বর</p>
                                <p className="text-lg font-bold text-slate-900">{voter.phone}</p>
                              </div>
                            )}
                            {voter.educational_qualification && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1 flex items-center gap-2">
                                  <FaGraduationCap className="text-blue-600" />
                                  শিক্ষাগত যোগ্যতা
                                </p>
                                <p className="text-lg font-bold text-slate-900">{voter.educational_qualification}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>

                        {/* Voting Center Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 * (index + 1) }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                        <FaBuilding className="text-emerald-600" />
                            ভোট কেন্দ্রের তথ্য
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-600">
                          <p className="text-sm text-slate-600 mb-1">ভোট কেন্দ্র</p>
                              <p className="text-xl font-black text-slate-900">{voter.center}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-600">
                          <p className="text-sm text-slate-600 mb-2">ঠিকানা</p>
                          <p className="text-base font-bold text-slate-900 flex items-start gap-3">
                            <FaMapMarkerAlt className="text-purple-600 mt-1 flex-shrink-0" />
                                {voter.address}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                        {/* Individual Print Button */}
                        {searchResults.length > 1 && (
                          <div className="flex justify-center mt-4">
                            <button
                              onClick={() => handlePrintSingle(voter)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center gap-2 text-sm"
                            >
                              <FaPrint />
                              এই ভোটারের তথ্য প্রিন্ট করুন
                            </button>
                          </div>
                        )}

                        {searchResults.length > 1 && index < searchResults.length - 1 && (
                          <hr className="border-slate-200 my-6" />
                        )}
                      </div>
                    ))}

                    {/* Important Notice */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5"
                    >
                      <h4 className="text-base font-bold text-amber-900 mb-2">📋 গুরুত্বপূর্ণ নির্দেশনা</h4>
                      <ul className="space-y-1.5 text-sm text-amber-800">
                        <li>• ভোট দিতে যাওয়ার সময় অবশ্যই আপনার জাতীয় পরিচয়পত্র সাথে নিন</li>
                        <li>• ভোট কেন্দ্রে যাওয়ার আগে সময়সূচী যাচাই করে নিন</li>
                        <li>• কোনো সমস্যা হলে ভোট কেন্দ্রের কর্মকর্তাদের সাথে যোগাযোগ করুন</li>
                      </ul>
                    </motion.div>
                  </>
                ) : null}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
                {searchResults.length > 0 && !notFound && (
                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <FaPrint />
                    {searchResults.length > 1 ? 'সকল প্রিন্ট করুন' : 'প্রিন্ট করুন'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSearchResults([]);
                    setNotFound(false);
                    setErrorMessage('');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
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
                সাহায্য প্রয়োজন?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                ভোট কেন্দ্র সম্পর্কিত কোন সমস্যা বা প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  যোগাযোগ করুন
                </a>
                <a
                  href="tel:+8801712345678"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  কল করুন
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

