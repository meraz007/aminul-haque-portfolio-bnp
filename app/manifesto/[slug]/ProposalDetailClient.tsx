"use client";

import { motion } from 'framer-motion';
import { FaArrowLeft, FaFilePdf, FaDownload } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface ProposalDetailClientProps {
  proposal: {
    id: number;
    uuid: string;
    pdf: string;
    bang_title: string;
    bang_description: string;
    serial: string;
  } | null;
}

export default function ProposalDetailClient({ proposal }: ProposalDetailClientProps) {
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(2.0); // Higher scale for better quality document preview
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  const pdfDocRef = useRef<any>(null);
  const renderTasksRef = useRef<{ [key: number]: any }>({});
  const renderedPagesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!proposal?.pdf || typeof window === 'undefined') return;

    const loadPdf = async () => {
      try {
        setPdfLoading(true);
        setPdfError(false);

        // Dynamically import PDF.js only on client side
        const pdfjsLib = await import('pdfjs-dist');
        
        // Set up PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        // Use API proxy route to bypass CORS
        const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(proposal.pdf)}`;
        const loadingTask = pdfjsLib.getDocument(proxyUrl);
        const pdf = await loadingTask.promise;
        pdfDocRef.current = pdf;
        
        // Reset rendered pages when new PDF loads
        renderedPagesRef.current.clear();
        renderTasksRef.current = {};
        
        setNumPages(pdf.numPages);
        setPdfLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setPdfError(true);
        setPdfLoading(false);
      }
    };

    loadPdf();
  }, [proposal?.pdf]);

  const renderPage = async (pageNum: number) => {
    if (!pdfDocRef.current || typeof window === 'undefined') return;
    
    // Skip if already rendered
    if (renderedPagesRef.current.has(pageNum)) return;
    
    try {
      const pdf = pdfDocRef.current;
      const page = await pdf.getPage(pageNum);
      const canvas = canvasRefs.current[pageNum];
      
      if (!canvas) return;

      // Cancel any previous render task for this page
      if (renderTasksRef.current[pageNum]) {
        renderTasksRef.current[pageNum].cancel();
        delete renderTasksRef.current[pageNum];
      }

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTasksRef.current[pageNum] = renderTask;
      
      await renderTask.promise;
      
      // Mark as rendered
      renderedPagesRef.current.add(pageNum);
      delete renderTasksRef.current[pageNum];
    } catch (error) {
      // Ignore cancellation errors
      if (error instanceof Error && error.name === 'RenderingCancelledException') {
        return;
      }
      console.error(`Error rendering page ${pageNum}:`, error);
    }
  };

  useEffect(() => {
    if (!pdfDocRef.current || numPages === 0) return;

    // Reset rendered pages when scale changes
    renderedPagesRef.current.clear();
    
    // Cancel all ongoing render tasks
    Object.values(renderTasksRef.current).forEach((task) => {
      if (task) task.cancel();
    });
    renderTasksRef.current = {};

    // Render all pages after a short delay to ensure canvas elements are mounted
    const timer = setTimeout(() => {
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        renderPage(pageNum);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cancel all render tasks on cleanup
      Object.values(renderTasksRef.current).forEach((task) => {
        if (task) task.cancel();
      });
    };
  }, [numPages, scale]);

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

  const handleDownload = () => {
    if (proposal.pdf) {
      const link = document.createElement('a');
      link.href = proposal.pdf;
      link.download = `${proposal.bang_title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Back Button */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-6xl">
          <Link 
            href="/manifesto"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold transition-colors"
          >
            <FaArrowLeft />
            সব প্রস্তাবনায় ফিরে যান
          </Link>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-8 px-4 pb-20 bg-slate-100">
        <div className="mx-auto max-w-6xl">
          {pdfLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                <p className="text-xl text-slate-600">PDF লোড হচ্ছে...</p>
              </div>
            </div>
          )}

          {pdfError && (
            <div className="text-center py-20">
              <FaFilePdf className="mx-auto text-6xl text-slate-400 mb-4" />
              <p className="text-xl text-red-600 mb-4">PDF লোড করতে সমস্যা হয়েছে</p>
              {proposal.pdf && (
                <a
                  href={proposal.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
                >
                  নতুন ট্যাবে খুলুন
                </a>
              )}
            </div>
          )}

          {proposal.pdf && !pdfError && !pdfLoading && numPages > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              {/* Canvas Container - Document preview style */}
              <div className="flex flex-col items-center gap-8">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                  <div
                    key={pageNum}
                    className="w-full flex justify-center"
                  >
                    {/* Document page container */}
                    <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden" style={{ 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      maxWidth: '100%'
                    }}>
                      <canvas
                        ref={(el) => {
                          if (el) {
                            canvasRefs.current[pageNum] = el;
                            // Only set the ref, rendering will be handled by useEffect
                          } else {
                            // Clean up when canvas is unmounted
                            delete canvasRefs.current[pageNum];
                            if (renderTasksRef.current[pageNum]) {
                              renderTasksRef.current[pageNum].cancel();
                              delete renderTasksRef.current[pageNum];
                            }
                            renderedPagesRef.current.delete(pageNum);
                          }
                        }}
                        className="block w-full h-auto"
                        style={{ 
                          display: 'block',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {!proposal.pdf && (
            <div className="text-center py-20">
              <FaFilePdf className="mx-auto text-6xl text-slate-400 mb-4" />
              <p className="text-xl text-slate-600">PDF পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

