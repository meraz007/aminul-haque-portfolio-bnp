"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaBuilding,
  FaTimes,
  FaUser,
  FaPrint,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import { toBanglaNumber, toEnglishNumber } from "@/lib/utils";
import { useTranslation } from "../i18n/I18nProvider";

interface Voter {
  id: number;
  uuid: string;
  name: string;
  address: string;
  voter_number: string;
  voter_number_bangla: string;
  center: string;
  status: string;
  list_for: string;
  voter_area: string;
  voter_area_number: string;
  ward: string;
  profession: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  date_of_birth_bangla: string;
  serial_number: string | null;
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
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [fatherNameQuery, setFatherNameQuery] = useState("");
  const [dateOfBirthQuery, setDateOfBirthQuery] = useState("");
  const [voterAreaQuery, setVoterArea] = useState("");
  const [wardQuery, setWardQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Voter[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVoters, setTotalVoters] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [voterAreas, setVoterAreas] = useState<string[]>([]);
  const [apiWards, setApiWards] = useState<string[]>([]);

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterDropdown]);


  const buildSearchUrl = (page: number = 1) => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (fatherNameQuery) params.append("father_name", fatherNameQuery);
    if (dateOfBirthQuery) params.append("date_of_birth", dateOfBirthQuery);
    if (wardQuery) params.append("ward", wardQuery);
    if (voterAreaQuery) params.append("voter_area", voterAreaQuery);
    params.append("page", page.toString());
    return `https://admin.aminul-haque.com/api/v1/voters?${params.toString()}`;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setErrorMessage("");
    setCurrentPage(1);
    setSearchResults([]);

    try {
      const response = await fetch(buildSearchUrl(1));
      const data: VoterApiResponse = await response.json();

      if (data.success && data.data.data.length > 0) {
        setSearchResults(data.data.data);
        setTotalVoters(data.data.meta.total);
        setHasNextPage(data.data.links.next !== null);
        setCurrentPage(data.data.meta.current_page);
        setNotFound(false);
        setShowModal(true);
      } else {
        setSearchResults([]);
        setTotalVoters(0);
        setHasNextPage(false);
        setNotFound(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching voter data:", error);
      setSearchResults([]);
      setTotalVoters(0);
      setHasNextPage(false);
      setNotFound(true);
      setErrorMessage(t("voterCenter.serverConnectionError"));
      setShowModal(true);
    } finally {
      setIsSearching(false);
    }
  };

  const loadMoreVoters = async () => {
    if (isLoadingMore || !hasNextPage) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const response = await fetch(buildSearchUrl(nextPage));
      const data: VoterApiResponse = await response.json();

      if (data.success && data.data.data.length > 0) {
        setSearchResults((prev) => [...prev, ...data.data.data]);
        setTotalVoters(data.data.meta.total);
        setHasNextPage(data.data.links.next !== null);
        setCurrentPage(data.data.meta.current_page);
      }
    } catch (error) {
      console.error("Error loading more voters:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const modalContent = modalContentRef.current;
    if (!modalContent || !showModal) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = modalContent;
      // Load more when user scrolls to bottom (with 100px threshold)
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        hasNextPage &&
        !isLoadingMore
      ) {
        loadMoreVoters();
      }
    };

    modalContent.addEventListener("scroll", handleScroll);
    return () => modalContent.removeEventListener("scroll", handleScroll);
  }, [showModal, hasNextPage, isLoadingMore, currentPage]);

  const handlePrint = () => {
    if (searchResults.length === 0) return;

    const votersHtml = searchResults
      .map(
        (voter, index) => `
      <div style="margin-bottom: 30px; border: 3px solid #006A4E; border-radius: 12px; page-break-inside: avoid; overflow: hidden;">
        ${searchResults.length > 1 ? `<div style="background: #006A4E; color: white; text-align: center; padding: 8px; font-weight: bold;">${t("voterCenter.voter")} #${language === "bd" ? toBanglaNumber(index + 1) : index + 1}</div>` : ""}
        
        <!-- Banner Image -->
        <div style="width: 100%; background: linear-gradient(135deg, #006A4E 0%, #00A86B 100%); padding: 20px; text-align: center;">
          <img src="/aminul Haque/hero.jpeg" alt="Aminul Haque" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; object-fit: cover; object-position: center top; margin-bottom: 10px;" />
          <h2 style="color: white; margin: 0; font-size: 24px;">আমিনুল হক</h2>
          <p style="color: #90EE90; margin: 5px 0 0; font-size: 14px;">ধানের শীষে ভোট দিন</p>
        </div>

        <!-- Slogan Section -->
        <div style="background: linear-gradient(to right, #FFF8DC, #FFFACD); padding: 15px; text-align: center; border-bottom: 2px solid #006A4E;">
          <p style="color: #C41E3A; font-weight: bold; margin: 0; font-size: 16px;">আমিনুল হক এর সালাম নিন, ধানের শীষে ভোট দিন।</p>
          <p style="color: #006A4E; font-weight: bold; margin: 5px 0 0; font-size: 14px;">তারুণ্যের প্রথম ভোট, ধানের শীষের পক্ষে হোক।</p>
        </div>

        <!-- Voting Center Header -->
        <div style="background: #006A4E; color: white; padding: 12px 20px; font-weight: bold; font-size: 16px;">
          ${language === "bd" ? "কেন্দ্রঃ" : "Center:"} ${voter.center}
        </div>

        <!-- Voter Details -->
        <div style="padding: 20px; background: white;">
          <div style="line-height: 2; font-size: 15px; color: #333;">
            ${voter.voter_area_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "সিরিয়াল নাম্বারঃ" : "Serial No:"}</strong> ${voter.voter_area_number}</p>` : ""}
            ${voter.serial_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "সিরিয়াল নম্বরঃ" : "Serial Number:"}</strong> ${voter.serial_number}</p>` : ""}
            <p style="margin: 0;"><strong>${language === "bd" ? "নামঃ" : "Name:"}</strong> ${voter.name}</p>
            ${voter.voter_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "ভোটার নং-" : "Voter No:"}</strong> ${language === "bd" ? voter.voter_number_bangla : voter.voter_number}</p>` : ""}
            ${voter.date_of_birth ? `<p style="margin: 0;"><strong>${language === "bd" ? "জন্ম তারিখঃ" : "DOB:"}</strong> ${language === "bd" ? voter.date_of_birth_bangla : voter.date_of_birth}</p>` : ""}
            ${voter.father_name ? `<p style="margin: 0;"><strong>${language === "bd" ? "পিতা" : "Father:"}</strong> ${voter.father_name}</p>` : ""}
            ${voter.mother_name ? `<p style="margin: 0;"><strong>${language === "bd" ? "মাতাঃ" : "Mother:"}</strong> ${voter.mother_name}</p>` : ""}
            ${voter.address ? `<p style="margin: 0;"><strong>${language === "bd" ? "ঠিকানাঃ" : "Address:"}</strong> ${voter.address}</p>` : ""}
            ${voter.voter_area ? `<p style="margin: 0;"><strong>${language === "bd" ? "এলাকাঃ" : "Area:"}</strong> ${voter.voter_area}</p>` : ""}
            ${voter.ward ? `<p style="margin: 0;"><strong>${language === "bd" ? "ওয়ার্ডঃ" : "Ward:"}</strong> ${voter.ward}</p>` : ""}
          </div>
        </div>

      </div>
    `,
      )
      .join("");

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) {
      alert(t("voterCenter.popupBlocked"));
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t("voterCenter.votingCenterInfo")} - ${t("common.print")}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Noto Sans Bengali', 'Hind Siliguri', Arial, sans-serif;
              padding: 20px;
              color: #1e293b;
              background: #f5f5f5;
            }
            @media print {
              body { 
                padding: 0; 
                background: white;
              }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${votersHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
  };

  const handlePrintSingle = (voter: Voter) => {
    const voterHtml = `
      <div style="border: 3px solid #006A4E; border-radius: 12px; overflow: hidden;">
        <!-- Banner Image -->
        <div style="width: 100%; background: linear-gradient(135deg, #006A4E 0%, #00A86B 100%); padding: 20px; text-align: center;">
          <img src="/aminul Haque/hero.jpeg" alt="Aminul Haque" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; object-fit: cover; object-position: center top; margin-bottom: 10px;" />
          <h2 style="color: white; margin: 0; font-size: 24px;">আমিনুল হক</h2>
          <p style="color: #90EE90; margin: 5px 0 0; font-size: 14px;">ধানের শীষে ভোট দিন</p>
        </div>

        <!-- Slogan Section -->
        <div style="background: linear-gradient(to right, #FFF8DC, #FFFACD); padding: 15px; text-align: center; border-bottom: 2px solid #006A4E;">
          <p style="color: #C41E3A; font-weight: bold; margin: 0; font-size: 16px;">আমিনুল হক এর সালাম নিন, ধানের শীষে ভোট দিন।</p>
          <p style="color: #006A4E; font-weight: bold; margin: 5px 0 0; font-size: 14px;">তারুণ্যের প্রথম ভোট, ধানের শীষের পক্ষে হোক।</p>
        </div>

        <!-- Voting Center Header -->
        <div style="background: #006A4E; color: white; padding: 12px 20px; font-weight: bold; font-size: 16px;">
          ${language === "bd" ? "কেন্দ্রঃ" : "Center:"} ${voter.center}
        </div>

        <!-- Voter Details -->
        <div style="padding: 20px; background: white;">
          <div style="line-height: 2; font-size: 15px; color: #333;">
            ${voter.voter_area_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "সিরিয়াল নাম্বারঃ" : "Serial No:"}</strong> ${voter.voter_area_number}</p>` : ""}
            ${voter.serial_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "সিরিয়াল নম্বরঃ" : "Serial Number:"}</strong> ${voter.serial_number}</p>` : ""}
            <p style="margin: 0;"><strong>${language === "bd" ? "নামঃ" : "Name:"}</strong> ${voter.name}</p>
            ${voter.voter_number ? `<p style="margin: 0;"><strong>${language === "bd" ? "ভোটার নং-" : "Voter No:"}</strong> ${language === "bd" ? voter.voter_number_bangla : voter.voter_number}</p>` : ""}
            ${voter.date_of_birth ? `<p style="margin: 0;"><strong>${language === "bd" ? "জন্ম তারিখঃ" : "DOB:"}</strong> ${language === "bd" ? voter.date_of_birth_bangla : voter.date_of_birth}</p>` : ""}
            ${voter.father_name ? `<p style="margin: 0;"><strong>${language === "bd" ? "পিতা" : "Father:"}</strong> ${voter.father_name}</p>` : ""}
            ${voter.mother_name ? `<p style="margin: 0;"><strong>${language === "bd" ? "মাতাঃ" : "Mother:"}</strong> ${voter.mother_name}</p>` : ""}
            ${voter.address ? `<p style="margin: 0;"><strong>${language === "bd" ? "ঠিকানাঃ" : "Address:"}</strong> ${voter.address}</p>` : ""}
            ${voter.voter_area ? `<p style="margin: 0;"><strong>${language === "bd" ? "এলাকাঃ" : "Area:"}</strong> ${voter.voter_area}</p>` : ""}
            ${voter.ward ? `<p style="margin: 0;"><strong>${language === "bd" ? "ওয়ার্ডঃ" : "Ward:"}</strong> ${voter.ward}</p>` : ""}
          </div>
        </div>


      </div>
    `;

    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) {
      alert(t("voterCenter.popupBlocked"));
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t("voterCenter.votingCenterInfo")} - ${voter.name}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Noto Sans Bengali', 'Hind Siliguri', Arial, sans-serif;
              padding: 20px;
              color: #1e293b;
              background: #f5f5f5;
            }
            @media print {
              body { 
                padding: 0; 
                background: white;
              }
            }
          </style>
        </head>
        <body>
          ${voterHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
  };

  useEffect(() => {
    areas();
    wards();
  }, []);
  const areas = function() {
    const areaApi = process.env.NEXT_PUBLIC_API_BASE_URL + '/voters/voter-areas';

    fetch(areaApi)
      .then((res) => res.json())
      .then((data) => {
        setVoterAreas(data.data);
      });
  }

  const wards = function(){
    const wardApi = process.env.NEXT_PUBLIC_API_BASE_URL + '/voters/wards';

    fetch(wardApi)
      .then((res) => res.json())
      .then((data) => {
        setApiWards(data.data);
      });
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaMapMarkerAlt className="inline mr-2" />
              {t("voterCenter.voterService")}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t("voterCenter.findVotingCenter")}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              {t("voterCenter.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                {language === "bd" ? "ভোটার সেবায় আমরা" : "At Your Service"}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                {t("voterCenter.helpingYou")}
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
                            <span>{t("voterCenter.searchByNidMobile")}</span>
                          </label>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("voterCenter.searchPlaceholder")}
                            className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg"
                          />
                        </div>

                        {/* Optional Father Name Field */}
                        <div>
                          <label className="block text-slate-700 font-bold mb-3 text-base flex items-center gap-2 flex-wrap">
                            <span>👨</span>
                            <span>{t("voterCenter.fatherName")}</span>
                            <span className="text-slate-400 font-normal text-sm">
                              ({language === "bd" ? "ঐচ্ছিক" : "Optional"})
                            </span>
                          </label>
                          <input
                            type="text"
                            value={fatherNameQuery}
                            onChange={(e) => setFatherNameQuery(e.target.value)}
                            placeholder={
                              language === "bd"
                                ? "পিতার নাম লিখুন"
                                : "Enter father's name"
                            }
                            className="w-full px-6 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>

                        {/* Optional Date of Birth Field */}
                        <div>
                          <label className="block text-slate-700 font-bold mb-3 text-base flex items-center gap-2 flex-wrap">
                            <span>📅</span>
                            <span>{t("voterCenter.dateOfBirth")}</span>
                            <span className="text-slate-400 font-normal text-sm">
                              ({language === "bd" ? "ঐচ্ছিক" : "Optional"})
                              {"1958-02-14"}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={dateOfBirthQuery}
                            onChange={(e) =>
                              setDateOfBirthQuery(e.target.value)
                            }
                            className="w-full px-6 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-3 text-base flex items-center gap-2 flex-wrap">
                            <span>🗺️</span>
                            <span>{t("voterCenter.voterArea")}</span>
                            <span className="text-slate-400 font-normal text-sm">
                              ({language === "bd" ? "ঐচ্ছিক" : "Optional"})
                            </span>
                          </label>
                          <div className="relative">
                            <select
                                value={voterAreaQuery}
                                onChange={(e) =>
                                    setVoterArea(e.target.value)
                                }
                                className="w-full px-6 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all appearance-none"
                            >
                              <option value="">{language === "bd" ? "ভোটার এলাকা নির্বাচন করুন" : "Select Voter Area"}</option>
                              {voterAreas.map((area, index) => (
                                  <option key={index} value={area}>
                                    {area}
                                  </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <FaChevronDown size={14} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-3 text-base flex items-center gap-2 flex-wrap">
                            <span>🏴󠁶󠁵󠁭󠁡󠁰󠁿</span>
                            <span>{t("voterCenter.ward")}</span>
                            <span className="text-slate-400 font-normal text-sm">
                              ({language === "bd" ? "ঐচ্ছিক" : "Optional"})
                            </span>
                          </label>
                          <div className="relative">
                            <select
                                value={wardQuery}
                                onChange={(e) =>
                                    setWardQuery(e.target.value)
                                }
                                className="w-full px-6 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all appearance-none"
                            >
                              <option value="">{language === "bd" ? "ওয়ার্ড নির্বাচন করুন" : "Select Ward"}</option>
                              {apiWards.map((ward, index) => (
                                  <option key={index} value={ward}>
                                    {ward}
                                  </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <FaChevronDown size={14} />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={
                            isSearching ||
                            (!searchQuery &&
                              !fatherNameQuery &&
                              !dateOfBirthQuery &&
                              !voterAreaQuery &&
                              !wardQuery)
                          }
                          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                        >
                          {isSearching ? (
                            <>
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              {t("voterCenter.searching")}
                            </>
                          ) : (
                            <>
                              <FaSearch />
                              {t("voterCenter.search")}
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
                <Image
                  src="/aminul Haque/voter-center.jpeg"
                  alt={language === "bd" ? "আমিনুল হক" : "Aminul Haque"}
                  width={600}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
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
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-black text-slate-900">
                  {notFound
                    ? t("voterCenter.infoNotFound")
                    : t("voterCenter.votingCenterInfo")}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSearchResults([]);
                    setNotFound(false);
                    setErrorMessage("");
                    setTotalVoters(0);
                    setHasNextPage(false);
                    setCurrentPage(1);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <FaTimes className="text-2xl text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div
                ref={modalContentRef}
                className="p-6 space-y-6 overflow-y-auto flex-1"
              >
                {notFound ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
                  >
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">
                      {t("voterCenter.infoNotFound")}
                    </h3>
                    <p className="text-red-600">
                      {errorMessage || t("voterCenter.verifyAndTryAgain")}
                    </p>
                  </motion.div>
                ) : searchResults.length > 0 ? (
                  <>
                    {/* Success Message with Total Count */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                      <div className="text-5xl mb-3">✅</div>
                      <h3 className="text-2xl font-bold text-green-800">
                        {totalVoters === 1
                          ? t("voterCenter.infoFound")
                          : `${language === "bd" ? toBanglaNumber(totalVoters) : totalVoters} ${t("voterCenter.votersFound")}`}
                      </h3>
                      {totalVoters > searchResults.length && (
                        <p className="text-green-600 mt-2 text-sm">
                          {language === "bd"
                            ? `${toBanglaNumber(searchResults.length)} জন দেখানো হচ্ছে - স্ক্রোল করুন আরও দেখতে`
                            : `Showing ${searchResults.length} - Scroll to load more`}
                        </p>
                      )}
                    </div>

                    {searchResults.map((voter, index) => (
                      <div key={voter.id} className="space-y-4">
                        {searchResults.length > 1 && (
                          <div className="text-center">
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                              {t("voterCenter.voter")} #
                              {language === "bd"
                                ? toBanglaNumber(index + 1)
                                : index + 1}
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
                            {t("voterCenter.personalInfo")}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl">
                              <p className="text-sm text-slate-600 mb-1">
                                {t("voterCenter.name")}
                              </p>
                              <p className="text-lg font-bold text-slate-900">
                                {voter.name}
                              </p>
                            </div>
                            {voter.serial_number && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {language === "bd"
                                    ? "সিরিয়াল নম্বর"
                                    : "Serial Number"}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {language === "bd"
                                      ? toBanglaNumber(voter.serial_number)
                                      : voter.serial_number}
                                </p>
                              </div>
                            )}
                            {voter.voter_number && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {t("voterCenter.voterNumber")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {language === "bd"
                                    ? voter.voter_number_bangla
                                    : voter.voter_number}
                                </p>
                              </div>
                            )}
                            {voter.father_name && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {t("voterCenter.fatherName")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {voter.father_name}
                                </p>
                              </div>
                            )}
                            {voter.mother_name && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {t("voterCenter.motherName")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {voter.mother_name}
                                </p>
                              </div>
                            )}
                            {voter.date_of_birth && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {t("voterCenter.dateOfBirth")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {language === "bd"
                                    ? voter.date_of_birth_bangla
                                    : voter.date_of_birth}
                                </p>
                              </div>
                            )}
                            {voter.profession && (
                              <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-sm text-slate-600 mb-1">
                                  {t("voterCenter.profession")}
                                </p>
                                <p className="text-lg font-bold text-slate-900">
                                  {voter.profession}
                                </p>
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
                            {t("voterCenter.votingCenterDetails")}
                          </h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-600">
                              <p className="text-sm text-slate-600 mb-1">
                                {t("voterCenter.votingCenter")}
                              </p>
                              <p className="text-xl font-black text-slate-900">
                                {voter.center}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {voter.voter_area && (
                                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-l-4 border-emerald-600">
                                  <p className="text-sm text-slate-600 mb-1">
                                    {t("voterCenter.voterArea")}
                                  </p>
                                  <p className="text-base font-bold text-slate-900">
                                    {voter.voter_area}
                                  </p>
                                </div>
                              )}
                              {voter.voter_area_number && (
                                <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border-l-4 border-teal-600">
                                  <p className="text-sm text-slate-600 mb-1">
                                    {t("voterCenter.voterAreaNumber")}
                                  </p>
                                  <p className="text-base font-bold text-slate-900">
                                    {voter.voter_area_number}
                                  </p>
                                </div>
                              )}
                              {voter.ward && (
                                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-600">
                                  <p className="text-sm text-slate-600 mb-1">
                                    {t("voterCenter.ward")}
                                  </p>
                                  <p className="text-base font-bold text-slate-900">
                                    {voter.ward}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-600">
                              <p className="text-sm text-slate-600 mb-2">
                                {t("voterCenter.address")}
                              </p>
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
                              {t("voterCenter.printVoterInfo")}
                            </button>
                          </div>
                        )}

                        {searchResults.length > 1 &&
                          index < searchResults.length - 1 && (
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
                      <h4 className="text-base font-bold text-amber-900 mb-2">
                        📋 {t("voterCenter.importantGuidelines")}
                      </h4>
                      <ul className="space-y-1.5 text-sm text-amber-800">
                        <li>• {t("voterCenter.guideline1")}</li>
                        <li>• {t("voterCenter.guideline2")}</li>
                        <li>• {t("voterCenter.guideline3")}</li>
                      </ul>
                    </motion.div>

                    {/* Loading More Indicator */}
                    {isLoadingMore && (
                      <div className="flex justify-center py-4">
                        <div className="flex items-center gap-3 text-blue-600">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="font-medium">
                            {language === "bd"
                              ? "আরও লোড হচ্ছে..."
                              : "Loading more..."}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Load More Button (backup for infinite scroll) */}
                    {hasNextPage && !isLoadingMore && (
                      <div className="flex justify-center py-4">
                        <button
                          onClick={loadMoreVoters}
                          className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-slate-700 hover:to-slate-800 transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                          {language === "bd" ? "আরও দেখুন" : "Load More"}
                        </button>
                      </div>
                    )}
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
                    {searchResults.length > 1
                      ? t("common.printAll")
                      : t("common.print")}
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSearchResults([]);
                    setNotFound(false);
                    setErrorMessage("");
                    setSearchQuery("");
                    setFatherNameQuery("");
                    setDateOfBirthQuery("");
                    setTotalVoters(0);
                    setHasNextPage(false);
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  {t("common.close")}
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
                {t("voterCenter.needHelp")}
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                {t("voterCenter.helpDesc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  {t("nav.contactUs")}
                </a>
                <a
                  href="tel:+8801712345678"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  {t("common.callUs")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
