"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaTasks, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaExclamationCircle,
  FaSpinner,
  FaCheckCircle,
  FaClock,
  FaPlayCircle
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

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

export default function VolunteerTasksPage() {
  const { isAuthenticated, volunteer, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/volunteer/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    // Mock data - simulate API delay
    setLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock tasks data
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'ক্যাম্পেইন প্রচারণা',
        description: 'স্থানীয় এলাকায় ক্যাম্পেইন প্রচারণা করুন এবং জনগণের সাথে যোগাযোগ করুন',
        deadline: '2024-12-31',
        priority: 'high',
        location: 'ধানমন্ডি, ঢাকা',
        status: 'pending',
      },
      {
        id: 2,
        title: 'ইভেন্ট আয়োজন',
        description: 'স্থানীয় ইভেন্ট আয়োজন করুন এবং অংশগ্রহণকারীদের নিবন্ধন করুন',
        deadline: '2024-12-25',
        priority: 'medium',
        location: 'গুলশান, ঢাকা',
        status: 'in_progress',
      },
      {
        id: 3,
        title: 'সামাজিক মিডিয়া প্রচারণা',
        description: 'সামাজিক মিডিয়া প্ল্যাটফর্মে আমাদের কর্মসূচি প্রচার করুন',
        deadline: '2024-12-20',
        priority: 'high',
        location: 'অনলাইন',
        status: 'pending',
      },
      {
        id: 4,
        title: 'ভোটার নিবন্ধন সহায়তা',
        description: 'স্থানীয় ভোটারদের নিবন্ধন প্রক্রিয়ায় সহায়তা করুন',
        deadline: '2024-12-15',
        priority: 'medium',
        location: 'মিরপুর, ঢাকা',
        status: 'completed',
      },
    ];
    
    setTasks(mockTasks);
    setLoading(false);
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

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              আমার কাজ
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            আপনার বরাদ্দকৃত কাজের তালিকা
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                filter === filterOption
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md'
              }`}
            >
              {filterOption === 'all' ? 'সব' : 
               filterOption === 'pending' ? 'বিচারাধীন' :
               filterOption === 'in_progress' ? 'চলমান' : 'সম্পন্ন'}
            </button>
          ))}
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <FaExclamationCircle className="text-red-600 text-2xl" />
              <p className="text-red-600 font-bold">{error}</p>
            </div>
          </div>
        )}

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 text-center"
          >
            <FaTasks className="text-6xl text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              কোনো কাজ নেই
            </h3>
            <p className="text-slate-600">
              {filter === 'all' 
                ? 'আপনার জন্য এখনো কোনো কাজ বরাদ্দ করা হয়নি'
                : `এই বিভাগে কোনো কাজ নেই`}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/volunteer/tasks/${task.id}`}>
                  <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 hover:shadow-3xl transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-black text-slate-900 flex-1">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        {getStatusIcon(task.status)}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                      {task.description}
                    </p>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaCalendarAlt className="text-emerald-600" />
                        <span className="font-semibold">শেষ তারিখ:</span>
                        <span>{new Date(task.deadline).toLocaleDateString('bn-BD')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaMapMarkerAlt className="text-emerald-600" />
                        <span className="font-semibold">অবস্থান:</span>
                        <span>{task.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-4 py-2 rounded-xl font-bold text-sm border-2 ${getPriorityColor(task.priority)}`}>
                          অগ্রাধিকার: {getPriorityLabel(task.priority)}
                        </span>
                        <span className={`px-4 py-2 rounded-xl font-bold text-sm border-2 ${getStatusColor(task.status)}`}>
                          {getStatusLabel(task.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

