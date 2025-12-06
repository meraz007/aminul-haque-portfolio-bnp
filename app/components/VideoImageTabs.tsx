"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaImage, FaTimes } from 'react-icons/fa';

// Helper function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  // If already an embed URL, return as is
  if (url.includes('youtube.com/embed')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // Standard YouTube URLs: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  }
  // Short URLs: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  // Mobile URLs: https://m.youtube.com/watch?v=VIDEO_ID
  else if (url.includes('m.youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

// Helper function to get thumbnail from YouTube URL
function getYouTubeThumbnail(url: string): string {
  let videoId = '';
  
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  } else if (url.includes('m.youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1]?.split('?')[0] || '';
  }
  
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
}

export default function VideoImageTabs() {
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 1,
      title: 'Political Campaign Video',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual YouTube URL
    },
    {
      id: 2,
      title: 'Community Outreach',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual YouTube URL
    },
    {
      id: 3,
      title: 'Education Program Launch',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual YouTube URL
    },
  ];

  const images = [
    { src: '/aminul_haque.jpg', alt: 'Event 1' },
    { src: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=800&h=600&fit=crop', alt: 'Event 2' },
    { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop', alt: 'Event 3' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', alt: 'Event 4' },
    { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', alt: 'Event 5' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', alt: 'Event 6' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-center gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('video')}
          className={`relative px-6 py-3 text-lg font-semibold transition-colors ${
            activeTab === 'video'
              ? 'text-green-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FaPlay className="mr-2 inline" />
          Videos
          {activeTab === 'video' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`relative px-6 py-3 text-lg font-semibold transition-colors ${
            activeTab === 'image'
              ? 'text-green-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FaImage className="mr-2 inline" />
          Images
          {activeTab === 'image' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700"
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'video' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const thumbnail = getYouTubeThumbnail(video.youtubeUrl);
                const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
                
                return (
                  <div key={video.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer hover:shadow-md transition">
                    <div 
                      className="relative aspect-video bg-slate-100"
                      onClick={() => setSelectedVideo(embedUrl)}
                    >
                      <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=800&h=450&fit=crop'}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                        <button className="rounded-full bg-green-700 p-4 text-white shadow-lg hover:bg-green-800 transition">
                          <FaPlay className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900">{video.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white transition"
                aria-label="Close video"
              >
                <FaTimes className="h-5 w-5" />
              </button>
              <iframe
                src={selectedVideo}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

