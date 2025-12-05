"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    
    if (!hasSeenModal) {
      // Show modal only if user hasn't seen it before
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    // Mark that user has seen the modal
    localStorage.setItem('hasSeenWelcomeModal', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-auto h-full max-w-[90vw] flex items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 hover:rotate-90"
                aria-label="বন্ধ করুন"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Image Container */}
              <img
                src="/aminul_nomination_post.webp"
                alt="আমিনুল হক মনোনয়ন পোস্ট"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

