"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft,
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaPlayCircle,
  FaUpload,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  location: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export default function TaskDetailPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state for completing task
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [completionNotes, setCompletionNotes] = useState('');
  const [newStatus, setNewStatus] = useState<'in_progress' | 'completed'>('in_progress');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/volunteer/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated && taskId) {
      fetchTask();
    }
  }, [isAuthenticated, taskId]);

  const fetchTask = async () => {
    // Mock data - simulate API delay
    setLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock tasks data based on taskId
    const mockTasks: { [key: string]: Task } = {
      '1': {
        id: 1,
        title: 'ক্যাম্পেইন প্রচারণা',
        description: 'স্থানীয় এলাকায় ক্যাম্পেইন প্রচারণা করুন এবং জনগণের সাথে যোগাযোগ করুন। এই কাজের জন্য আপনাকে নির্দিষ্ট এলাকায় গিয়ে জনগণের সাথে কথা বলতে হবে এবং আমাদের কর্মসূচি সম্পর্কে জানাতে হবে।',
        deadline: '2024-12-31',
        priority: 'high',
        location: 'ধানমন্ডি, ঢাকা',
        status: 'pending',
      },
      '2': {
        id: 2,
        title: 'ইভেন্ট আয়োজন',
        description: 'স্থানীয় ইভেন্ট আয়োজন করুন এবং অংশগ্রহণকারীদের নিবন্ধন করুন। এই ইভেন্টে আপনাকে স্থানীয় জনগণকে আমন্ত্রণ জানাতে হবে এবং ইভেন্টের সকল ব্যবস্থাপনা করতে হবে।',
        deadline: '2024-12-25',
        priority: 'medium',
        location: 'গুলশান, ঢাকা',
        status: 'in_progress',
      },
      '3': {
        id: 3,
        title: 'সামাজিক মিডিয়া প্রচারণা',
        description: 'সামাজিক মিডিয়া প্ল্যাটফর্মে আমাদের কর্মসূচি প্রচার করুন। ফেসবুক, টুইটার এবং অন্যান্য প্ল্যাটফর্মে আমাদের বার্তা ছড়িয়ে দিন।',
        deadline: '2024-12-20',
        priority: 'high',
        location: 'অনলাইন',
        status: 'pending',
      },
      '4': {
        id: 4,
        title: 'ভোটার নিবন্ধন সহায়তা',
        description: 'স্থানীয় ভোটারদের নিবন্ধন প্রক্রিয়ায় সহায়তা করুন। ভোটারদের নিবন্ধন ফরম পূরণ করতে সাহায্য করুন।',
        deadline: '2024-12-15',
        priority: 'medium',
        location: 'মিরপুর, ঢাকা',
        status: 'completed',
      },
    };
    
    const taskData = mockTasks[taskId] || {
      id: parseInt(taskId),
      title: 'ক্যাম্পেইন প্রচারণা',
      description: 'স্থানীয় এলাকায় ক্যাম্পেইন প্রচারণা করুন এবং জনগণের সাথে যোগাযোগ করুন।',
      deadline: '2024-12-31',
      priority: 'high',
      location: 'ধানমন্ডি, ঢাকা',
      status: 'pending',
    };
    
    setTask(taskData);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setEvidenceFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStatusUpdate = async () => {
    if (!task) return;

    setSubmitting(true);
    setSubmitError(null);

    // Mock status update - simulate API delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local task state
      setTask(prev => prev ? { ...prev, status: newStatus } : null);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/volunteer/tasks');
      }, 2000);
    } catch (err) {
      setSubmitError('Failed to update task status');
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-emerald-600" />;
      case 'in_progress':
        return <FaPlayCircle className="text-blue-600" />;
      case 'pending':
        return <FaClock className="text-slate-600" />;
      default:
        return <FaClock className="text-slate-600" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'উচ্চ';
      case 'medium':
        return 'মধ্যম';
      case 'low':
        return 'নিম্ন';
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'সম্পন্ন';
      case 'in_progress':
        return 'চলমান';
      case 'pending':
        return 'বিচারাধীন';
      default:
        return status;
    }
  };

  if (authLoading || loading) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-emerald-600 mx-auto mb-4" />
          <p className="text-xl font-bold text-slate-700">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !task) {
    return null;
  }

  if (success) {
    return (
      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200">
            <div className="inline-flex p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6">
              <FaCheckCircle className="text-6xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              সফল!
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              কাজের অবস্থা সফলভাবে আপডেট করা হয়েছে
            </p>
            <p className="text-sm text-slate-500">
              কাজের তালিকায় ফিরে যাচ্ছে...
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-20 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/volunteer/tasks"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors"
        >
          <FaArrowLeft />
          কাজের তালিকায় ফিরে যান
        </Link>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <FaExclamationCircle className="text-red-600 text-2xl" />
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          </div>
        )}

        {/* Task Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 flex-1">
              {task.title}
            </h1>
            <div className="flex items-center gap-2 ml-4">
              {getStatusIcon(task.status)}
            </div>
          </div>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {task.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3 text-slate-700">
              <FaCalendarAlt className="text-emerald-600 text-xl" />
              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-slate-500">শেষ তারিখ</p>
                <p className="text-xl font-bold">{new Date(task.deadline).toLocaleDateString('bn-BD')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-700">
              <FaMapMarkerAlt className="text-emerald-600 text-xl" />
              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-slate-500">অবস্থান</p>
                <p className="text-xl font-bold">{task.location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-4 py-2 rounded-xl font-bold text-sm border-2 ${getPriorityColor(task.priority)}`}>
              অগ্রাধিকার: {getPriorityLabel(task.priority)}
            </span>
            <span className={`px-4 py-2 rounded-xl font-bold text-sm border-2 ${getStatusColor(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
          </div>
        </motion.div>

        {/* Update Status Form */}
        {task.status !== 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              কাজের অবস্থা আপডেট করুন
            </h2>

            <div className="space-y-6">
              {/* Status Selection */}
              <div>
                <label className="block text-slate-700 font-bold mb-3 text-lg">
                  নতুন অবস্থা <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setNewStatus('in_progress')}
                    className={`px-6 py-4 rounded-xl font-bold transition-all border-2 ${
                      newStatus === 'in_progress'
                        ? 'bg-blue-100 text-blue-700 border-blue-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <FaPlayCircle className="inline mr-2" />
                    চলমান
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStatus('completed')}
                    className={`px-6 py-4 rounded-xl font-bold transition-all border-2 ${
                      newStatus === 'completed'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <FaCheckCircle className="inline mr-2" />
                    সম্পন্ন
                  </button>
                </div>
              </div>

              {/* Completion Notes (only for completed) */}
              {newStatus === 'completed' && (
                <>
                  <div>
                    <label className="block text-slate-700 font-bold mb-3 text-lg">
                      সম্পন্নকরণ নোট (ঐচ্ছিক)
                    </label>
                    <textarea
                      value={completionNotes}
                      onChange={(e) => setCompletionNotes(e.target.value)}
                      placeholder="কাজ সম্পন্ন করার বিষয়ে বিস্তারিত লিখুন..."
                      rows={5}
                      className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-lg"
                    />
                  </div>

                  {/* Evidence Upload */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-3 text-lg">
                      প্রমাণ/প্রমাণপত্র (ছবি, ভিডিও, ডকুমেন্ট)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6">
                      <input
                        type="file"
                        id="evidence-upload"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="evidence-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <FaUpload className="text-4xl text-emerald-600 mb-3" />
                        <p className="text-slate-700 font-bold mb-1">
                          ফাইল আপলোড করুন
                        </p>
                        <p className="text-sm text-slate-500">
                          ছবি, ভিডিও, বা ডকুমেন্ট
                        </p>
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {evidenceFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {evidenceFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                          >
                            <span className="text-slate-700 font-semibold flex-1 truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-3 text-red-600 hover:text-red-700 transition-colors"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Submit Error */}
              {submitError && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-red-600 font-bold">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleStatusUpdate}
                disabled={submitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    আপডেট করা হচ্ছে...
                  </>
                ) : (
                  <>
                    অবস্থা আপডেট করুন
                    <FaCheckCircle />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Already Completed Message */}
        {task.status === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 text-center"
          >
            <FaCheckCircle className="text-6xl text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-emerald-900 mb-2">
              কাজ সম্পন্ন হয়েছে
            </h3>
            <p className="text-emerald-700">
              এই কাজটি ইতিমধ্যে সম্পন্ন করা হয়েছে
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

