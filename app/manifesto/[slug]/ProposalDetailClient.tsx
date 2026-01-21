"use client";

import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface ProposalContent {
  id: number;
  title: string | null;
  description: string;
}

interface ProposalDetailClientProps {
  proposal: {
    id: number;
    uuid: string;
    title: string;
    description: string;
    serial: string;
    contents: ProposalContent[];
    created_at: string;
  } | null;
}

export default function ProposalDetailClient({ proposal }: ProposalDetailClientProps) {

  if (!proposal) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">প্রস্তাবনা পাওয়া যায়নি</h1>
          <Link href="/manifesto" className="text-red-600 hover:underline font-bold">
            প্রস্তাবনা পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Back Button */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/manifesto"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold transition-colors"
          >
            <FaArrowLeft />
            সব প্রস্তাবনায় ফিরে যান
          </Link>
        </div>
      </section>

      {/* Proposal Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              প্রস্তাবনা-{proposal.serial}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              {proposal.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {proposal.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {proposal.contents && proposal.contents.length > 0 ? (
            <div className="space-y-8">
              {proposal.contents.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200"
                >
                  {content.title && (
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                      {content.title}
                    </h2>
                  )}
                  <div
                    className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content.description }}
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: '1.75rem',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">কোনো বিষয়বস্তু পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

