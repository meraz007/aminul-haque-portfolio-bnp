"use client";

import { motion } from "framer-motion";
import {
  FaClock,
  FaFacebook,
  FaWhatsapp,
  FaLink,
  FaArrowLeft,
  FaVideo,
  FaImage,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/I18nProvider";

interface PressReleaseDetailClientProps {
  pressRelease: {
    title: string;
    summary: string;
    date: string;
    fullDescription: string;
    images: string[];
    videos?: any[];
    reporterName?: string;
    categories?: any[];
    published_by: {
      name: string;
      email: string;
    };
    news_links: any[];
  } | null;
}

export default function PressReleaseDetailClient({
  pressRelease,
}: PressReleaseDetailClientProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  console.log("PressReleaseDetailClient received pressRelease:", pressRelease);

  if (!pressRelease) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            প্রেস রিলিজ পাওয়া যায়নি
          </h1>
          <Link href="/press-release" className="text-blue-600 hover:underline">
            {t("pressReleaseDetail.backToPage")}
          </Link>
        </div>
      </main>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const title = encodeURIComponent(pressRelease.title);
    const url = encodeURIComponent(currentUrl);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Back Button */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/press-release"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
          >
            <FaArrowLeft />
            {t("pressReleaseDetail.backToAll")}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-3 px-3">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Metadata Cards Section - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Date Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-md">
                      <FaClock className="text-lg" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                        {t("pressReleaseDetail.publishedOn")}
                      </p>
                      <p className="text-lg font-bold text-slate-900 mt-2">
                        {pressRelease.date}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Published By Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-3 border border-cyan-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl text-white shadow-md">
                      <svg
                        className="text-lg w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5m-15-4h12m-12 4v8m12-8v4m0-4h4.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                        Published By
                      </p>
                      <p className="text-lg font-bold text-slate-900 mt-2 truncate">
                        {pressRelease.published_by.name}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 truncate">
                        {pressRelease.published_by.email}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Reporter Name Card */}
                {pressRelease.reporterName && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-md">
                        <svg
                          className="text-lg w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 10a3 3 0 100-6 3 3 0 000 6z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                          {t("pressReleaseDetail.reporter")}
                        </p>
                        <p className="text-lg font-bold text-slate-900 mt-2">
                          {pressRelease.reporterName}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* News Links Card */}
                {pressRelease.news_links &&
                  pressRelease.news_links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-3 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white shadow-md">
                          <FaLink className="text-lg" />
                        </div>
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest pt-3">
                          {t("pressReleaseDetail.newsLink")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 items-center">
                        {pressRelease.news_links.map((link, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.4 + index * 0.05,
                            }}
                            className="flex items-center gap-1"
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium text-xs transition-colors"
                              title={link.title || link.url}
                            >
                              <FaLink className="text-xs group-hover:rotate-12 transition-transform" />
                              <span className="underline hover:no-underline">
                                {link.title ||
                                  link.url.split("//")[1]?.split("/")[0]}
                              </span>
                            </a>
                            {index < pressRelease.news_links.length - 1 && (
                              <span className="text-slate-400">,</span>
                            )}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {pressRelease.title}
            </h1>

            {/* Summary */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              {pressRelease.summary}
            </p>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-200">
              <span className="font-bold text-slate-700">
                {t("pressReleaseDetail.share")}
              </span>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all transform hover:scale-105 font-medium"
              >
                <FaFacebook />
                Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 font-medium"
              >
                <FaXTwitter />X
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-all transform hover:scale-105 font-medium"
              >
                <FaWhatsapp />
                WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 font-medium"
              >
                <FaLink />
                {copied
                  ? t("pressReleaseDetail.copied")
                  : t("pressReleaseDetail.copyLink")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {pressRelease.images && pressRelease.images.length > 0 && (
        <section className="py-8 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={pressRelease.images[0]}
                alt={pressRelease.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Description */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200"
          >
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pressRelease.fullDescription }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#334155",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Additional Images */}
      {pressRelease.images && pressRelease.images.length > 1 && (
        <section className="py-12 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <FaImage className="text-blue-600" />
              {t("pressReleaseDetail.moreImages")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressRelease.images
                .slice(1)
                .map((image: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl h-64"
                  >
                    <Image
                      src={image}
                      alt={`${pressRelease.title} - Image ${idx + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      unoptimized
                      loading="lazy"
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Audio/Video */}
      {pressRelease.videos && pressRelease.videos.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <FaVideo className="text-red-600" />
              {pressRelease.videos[0]?.type === "audio"
                ? t("pressReleaseDetail.audio")
                : t("pressReleaseDetail.video")}
            </h2>
            <div className="space-y-8">
              {pressRelease.videos.map((video: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200"
                >
                  {video.title && (
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900">
                        {video.title}
                      </h3>
                    </div>
                  )}
                  {video.type === "audio" ? (
                    <div className="p-8">
                      <audio controls className="w-full">
                        <source src={video.url} type="audio/mpeg" />
                        <source src={video.url} type="audio/mp3" />
                        {t("pressReleaseDetail.audioNotSupported")}
                      </audio>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      {video.url.includes("youtube.com") ||
                      video.url.includes("youtu.be") ? (
                        <iframe
                          src={video.url}
                          title={video.title || `Video ${idx + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls className="w-full h-full">
                          <source src={video.url} type="video/mp4" />
                          {t("pressReleaseDetail.videoNotSupported")}
                        </video>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Again Section */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-slate-200">
              <h3 className="text-3xl font-black text-slate-900 mb-6">
                {t("pressReleaseDetail.shareThisRelease")}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaFacebook className="text-xl" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaXTwitter className="text-xl" />X
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#22C55E] transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  WhatsApp
                </button>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 font-bold shadow-lg"
                >
                  <FaLink className="text-xl" />
                  {copied
                    ? t("pressReleaseDetail.copied")
                    : t("pressReleaseDetail.copyLink")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to List */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/press-release"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
          >
            <FaArrowLeft />
            {t("pressReleaseDetail.viewAllReleases")}
          </Link>
        </div>
      </section>
    </main>
  );
}
