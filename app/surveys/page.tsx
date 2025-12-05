"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaClipboardList, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

interface Survey {
  id: number;
  uuid: string;
  status: string;
  image?: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
        
        // Try different endpoint variations
        let response: Response | null = null;
        const endpoints = [
          `${apiBaseUrl}/surveys`,
          `${apiBaseUrl}/survey`,
          `${apiBaseUrl}/surveys/list`,
        ];
        
        for (const url of endpoints) {
          try {
            response = await fetch(url, {
              cache: 'no-store',
              headers: {
                'Accept': 'application/json',
              },
            });
            
            if (response.ok) {
              console.log(`Successfully fetched from: ${url}`);
              break;
            } else if (response.status !== 404) {
              // If it's not 404, break and handle the error
              break;
            }
          } catch (fetchError) {
            console.warn(`Failed to fetch from ${url}:`, fetchError);
            continue;
          }
        }
        
        if (!response) {
          throw new Error('Failed to fetch from any endpoint');
        }

        if (!response || !response.ok) {
          let errorMessage = `Failed to fetch surveys (${response?.status || 'unknown'}): ${response?.statusText || 'Unknown error'}`;
          
          if (response) {
            try {
              const errorText = await response.text();
              console.error('API Error Response:', errorText);
              
              if (errorText) {
                try {
                  const errorData = JSON.parse(errorText);
                  if (errorData.message) {
                    errorMessage = errorData.message;
                  } else if (errorData.error) {
                    errorMessage = errorData.error;
                  }
                } catch {
                  if (errorText.length < 200) {
                    errorMessage = errorText;
                  }
                }
              }
            } catch (parseError) {
              console.error('Error parsing error response:', parseError);
            }
          }
          
          console.error(errorMessage);
          setSurveys([]);
          return;
        }

        const data = await response.json();
        console.log('Surveys API Response:', data);
        
        // Handle the API response structure
        let surveysData: Survey[] = [];
        if (data.success && data.data && Array.isArray(data.data)) {
          surveysData = data.data;
        } else if (Array.isArray(data)) {
          surveysData = data;
        } else if (data.data && Array.isArray(data.data)) {
          surveysData = data.data;
        }

        // Filter only active surveys
        const activeSurveys = surveysData.filter((survey: Survey) => survey.status === 'active');
        
        setSurveys(activeSurveys);
      } catch (error) {
        console.error('Error loading surveys:', error);
        setSurveys([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-bold">লোড হচ্ছে...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaClipboardList className="inline mr-2" />
              জরিপ ও মতামত
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                জরিপ সমূহ
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আপনার মূল্যবান মতামত দিন এবং পরিবর্তনে অংশ নিন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Surveys Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          {surveys.length === 0 ? (
            <div className="text-center py-20">
              <FaClipboardList className="text-6xl text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                কোন জরিপ নেই
              </h3>
              <p className="text-slate-500">
                শীঘ্রই নতুন জরিপ যুক্ত করা হবে
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {surveys.map((survey, idx) => (
                <motion.div
                  key={survey.uuid || survey.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-slate-200 overflow-hidden h-full flex flex-col">
                    {/* Thumbnail */}
                    {survey.image && (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                        <Image
                          src={survey.image}
                          alt={survey.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2">
                        {survey.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                        {survey.description}
                      </p>
                      
                      <Link
                        href={`/surveys/${survey.uuid || survey.id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 group-hover:gap-3"
                      >
                        জরিপ দেখুন <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-2xl text-center border border-slate-200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                আপনার মতামত গুরুত্বপূর্ণ
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                আমাদের জরিপে অংশগ্রহণ করে আপনার মূল্যবান মতামত দিন এবং পরিবর্তনে অংশ নিন
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  যোগাযোগ করুন
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

