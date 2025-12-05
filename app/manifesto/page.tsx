"use client";
import { motion } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Proposal {
  id: number;
  uuid: string;
  pdf: string;
  bang_title: string;
  bang_description: string;
  serial: string;
}

interface ManifestoPoint {
  number: string;
  title: string;
  description: string;
  color: string;
  pdfUrl: string;
  uuid: string;
}

// Default color gradients for proposals
const defaultColors = [
  'from-emerald-500 to-green-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
  'from-teal-500 to-cyan-600',
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-green-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
  'from-teal-500 to-cyan-600',
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-green-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
];

export default function ManifestoPage() {
  const router = useRouter();
  const [manifestoPoints, setManifestoPoints] = useState<ManifestoPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        const response = await fetch(`${apiBaseUrl}/proposal`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch proposals: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle the API response structure: { success: true, data: { data: [...] } }
        let proposalsData: Proposal[] = [];
        if (data.success && data.data) {
          if (Array.isArray(data.data)) {
            proposalsData = data.data;
          } else if (data.data.data && Array.isArray(data.data.data)) {
            proposalsData = data.data.data;
          }
        } else if (Array.isArray(data)) {
          proposalsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          proposalsData = data.data;
        }

        // Map API proposals to manifesto points
        const mappedPoints: ManifestoPoint[] = proposalsData.map((proposal: Proposal, index: number) => ({
          number: proposal.serial || String(index + 1),
          title: proposal.bang_title || '',
          description: proposal.bang_description || '',
          color: defaultColors[index % defaultColors.length],
          pdfUrl: proposal.pdf || '',
          uuid: proposal.uuid || proposal.id.toString(),
        }));

        setManifestoPoints(mappedPoints);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch proposals');
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleViewDetails = (uuid: string) => {
    router.push(`/manifesto/${uuid}`);
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaFileAlt className="inline mr-2" />
              আমাদের রূপকল্প
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                বিএনপির ১৮ দফা রূপকল্প
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              ক্রীড়া বিষয়ক উন্নয়ন পরিকল্পনা
            </p>
          </motion.div>
        </div>
      </section>


      {/* Manifesto Points */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              প্রস্তাবনা সমূহ
            </h2>
            <p className="text-xl text-slate-600">
              ক্রীড়া খাতের সার্বিক উন্নয়নে আমাদের প্রতিশ্রুতি
            </p>
          </motion.div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-xl text-slate-600">লোড হচ্ছে...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-xl text-red-600 mb-4">ত্রুটি: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {!loading && !error && manifestoPoints.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">কোনো প্রস্তাবনা পাওয়া যায়নি</p>
            </div>
          )}

          {!loading && !error && manifestoPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manifestoPoints.map((point, idx) => (
                <motion.div
                  key={`${point.number}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${point.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all`}></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-slate-200 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-end mb-4">
                      <div className={`px-3 py-1 bg-gradient-to-r ${point.color} text-white font-black rounded-full text-sm`}>
                        প্রস্তাবনা-{point.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-4 flex-1">
                      {point.description}
                    </p>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(point.uuid)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${point.color} text-white font-bold rounded-xl hover:shadow-xl transition-all transform hover:scale-105`}
                    >
                      বিস্তারিত
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
                আমাদের প্রতিশ্রুতি
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                বাংলাদেশের ক্রীড়া খাতকে আন্তর্জাতিক মানে উন্নীত করতে আমরা প্রতিশ্রুতিবদ্ধ। 
                প্রতিটি খেলোয়াড়ের স্বপ্ন পূরণে আমরা সর্বাত্মক সহযোগিতা করব।
              </p>
              <button className="px-10 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105">
                সম্পূর্ণ রূপকল্প ডাউনলোড করুন
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

