"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaIdCard, FaPhone, FaMapPin, FaBuilding, FaDirections } from 'react-icons/fa';

// Sample data - In production, this would come from a database or API
const voterData: { [key: string]: any } = {
  // ===== NID-based lookup =====
  '1234567890': {
    name: 'মোহাম্মদ করিম উদ্দিন',
    nid: '1234567890',
    mobile: '01712345678',
    constituency: 'ঢাকা-১৩ (উত্তরা)',
    pollingCenter: 'উত্তরা হাই স্কুল ও কলেজ',
    address: 'সেক্টর ১, উত্তরা মডেল টাউন, ঢাকা-১২৩০',
    mapLocation: {
      lat: 23.8759,
      lng: 90.3795,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.564!2d90.3795!3d23.8759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzMzLjIiTiA5MMKwMjInNDYuMiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '9876543210': {
    name: 'ফাতিমা খাতুন',
    nid: '9876543210',
    mobile: '01812345678',
    constituency: 'ঢাকা-১৪ (মিরপুর)',
    pollingCenter: 'মিরপুর বাংলা কলেজ',
    address: 'মিরপুর-১০, ঢাকা-১২১৬',
    mapLocation: {
      lat: 23.8069,
      lng: 90.3685,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0!2d90.3685!3d23.8069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzI0LjgiTiA5MMKwMjInMDYuNiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '5555666777': {
    name: 'আব্দুল মান্নান মিয়া',
    nid: '5555666777',
    mobile: '01922334455',
    constituency: 'ঢাকা-১২ (গুলশান)',
    pollingCenter: 'গুলশান সরকারি উচ্চ বিদ্যালয়',
    address: 'গুলশান-১, ঢাকা-১২১২',
    mapLocation: {
      lat: 23.7808,
      lng: 90.4172,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4172!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjkiTiA5MMKwMjUnMDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '1111222333': {
    name: 'রহিমা বেগম',
    nid: '1111222333',
    mobile: '01534567890',
    constituency: 'ঢাকা-১৫ (ধানমন্ডি)',
    pollingCenter: 'ধানমন্ডি সরকারি বালিকা উচ্চ বিদ্যালয়',
    address: 'ধানমন্ডি-৩২, ঢাকা-১২০৯',
    mapLocation: {
      lat: 23.7465,
      lng: 90.3763,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.3763!3d23.7465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzQ3LjQiTiA5MMKwMjInMzQuNyJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '7788990011': {
    name: 'সাকিব আহমেদ',
    nid: '7788990011',
    mobile: '01677889900',
    constituency: 'ঢাকা-১০ (মোহাম্মদপুর)',
    pollingCenter: 'মোহাম্মদপুর সরকারি উচ্চ বিদ্যালয়',
    address: 'মোহাম্মদপুর, ঢাকা-১২০৭',
    mapLocation: {
      lat: 23.7639,
      lng: 90.3567,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3567!3d23.7639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzUwLjAiTiA5MMKwMjEnMjQuMSJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '2233445566': {
    name: 'নাসরিন আক্তার',
    nid: '2233445566',
    mobile: '01988776655',
    constituency: 'ঢাকা-৮ (মতিঝিল)',
    pollingCenter: 'মতিঝিল আইডিয়াল স্কুল',
    address: 'মতিঝিল, ঢাকা-১০০০',
    mapLocation: {
      lat: 23.7330,
      lng: 90.4172,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4172!3d23.7330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQzJzU4LjgiTiA5MMKwMjUnMDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '3344556677': {
    name: 'জাহিদ হাসান',
    nid: '3344556677',
    mobile: '01455667788',
    constituency: 'ঢাকা-১৬ (কল্যাণপুর)',
    pollingCenter: 'কল্যাণপুর সরকারি স্কুল',
    address: 'কল্যাণপুর, ঢাকা-১২১৭',
    mapLocation: {
      lat: 23.7540,
      lng: 90.3820,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3!2d90.3820!3d23.7540!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzE0LjQiTiA5MMKwMjInNTUuMiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '4455667788': {
    name: 'সুমাইয়া রহমান',
    nid: '4455667788',
    mobile: '01366778899',
    constituency: 'ঢাকা-১১ (বনানী)',
    pollingCenter: 'বনানী বিদ্যানিকেতন স্কুল',
    address: 'বনানী, ঢাকা-১২১৩',
    mapLocation: {
      lat: 23.7937,
      lng: 90.4066,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.2!2d90.4066!3d23.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM3LjMiTiA5MMKwMjQnMjMuOCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '6677889900': {
    name: 'রফিকুল ইসলাম',
    nid: '6677889900',
    mobile: '01744332211',
    constituency: 'ঢাকা-৯ (রমনা)',
    pollingCenter: 'রমনা সরকারি মডেল স্কুল',
    address: 'রমনা, ঢাকা-১০০০',
    mapLocation: {
      lat: 23.7380,
      lng: 90.3978,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8!2d90.3978!3d23.7380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzE2LjgiTiA5MMKwMjMnNTIuMSJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '8899001122': {
    name: 'শাহিনা আক্তার',
    nid: '8899001122',
    mobile: '01611223344',
    constituency: 'ঢাকা-৭ (বাড্ডা)',
    pollingCenter: 'বাড্ডা সরকারি প্রাথমিক বিদ্যালয়',
    address: 'বাড্ডা, ঢাকা-১২১২',
    mapLocation: {
      lat: 23.7806,
      lng: 90.4254,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.4!2d90.4254!3d23.7806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjIiTiA5MMKwMjUnMzEuNCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },

  // ===== Mobile-based lookup =====
  '01712345678': {
    name: 'মোহাম্মদ করিম উদ্দিন',
    nid: '1234567890',
    mobile: '01712345678',
    constituency: 'ঢাকা-১৩ (উত্তরা)',
    pollingCenter: 'উত্তরা হাই স্কুল ও কলেজ',
    address: 'সেক্টর ১, উত্তরা মডেল টাউন, ঢাকা-১২৩০',
    mapLocation: {
      lat: 23.8759,
      lng: 90.3795,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.564!2d90.3795!3d23.8759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzMzLjIiTiA5MMKwMjInNDYuMiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '01812345678': {
    name: 'ফাতিমা খাতুন',
    nid: '9876543210',
    mobile: '01812345678',
    constituency: 'ঢাকা-১৪ (মিরপুর)',
    pollingCenter: 'মিরপুর বাংলা কলেজ',
    address: 'মিরপুর-১০, ঢাকা-১২১৬',
    mapLocation: {
      lat: 23.8069,
      lng: 90.3685,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0!2d90.3685!3d23.8069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzI0LjgiTiA5MMKwMjInMDYuNiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '01922334455': {
    name: 'আব্দুল মান্নান মিয়া',
    nid: '5555666777',
    mobile: '01922334455',
    constituency: 'ঢাকা-১২ (গুলশান)',
    pollingCenter: 'গুলশান সরকারি উচ্চ বিদ্যালয়',
    address: 'গুলশান-১, ঢাকা-১২১২',
    mapLocation: {
      lat: 23.7808,
      lng: 90.4172,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4172!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjkiTiA5MMKwMjUnMDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '01534567890': {
    name: 'রহিমা বেগম',
    nid: '1111222333',
    mobile: '01534567890',
    constituency: 'ঢাকা-১৫ (ধানমন্ডি)',
    pollingCenter: 'ধানমন্ডি সরকারি বালিকা উচ্চ বিদ্যালয়',
    address: 'ধানমন্ডি-৩২, ঢাকা-১২০৯',
    mapLocation: {
      lat: 23.7465,
      lng: 90.3763,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.3763!3d23.7465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzQ3LjQiTiA5MMKwMjInMzQuNyJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  '01677889900': {
    name: 'সাকিব আহমেদ',
    nid: '7788990011',
    mobile: '01677889900',
    constituency: 'ঢাকা-১০ (মোহাম্মদপুর)',
    pollingCenter: 'মোহাম্মদপুর সরকারি উচ্চ বিদ্যালয়',
    address: 'মোহাম্মদপুর, ঢাকা-১২০৭',
    mapLocation: {
      lat: 23.7639,
      lng: 90.3567,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3567!3d23.7639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzUwLjAiTiA5MMKwMjEnMjQuMSJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },

  // ===== Area-based lookup =====
  'উত্তরা': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১৩ (উত্তরা)',
    pollingCenter: 'উত্তরা হাই স্কুল ও কলেজ',
    address: 'সেক্টর ১, উত্তরা মডেল টাউন, ঢাকা-১২৩০',
    mapLocation: {
      lat: 23.8759,
      lng: 90.3795,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.564!2d90.3795!3d23.8759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzMzLjIiTiA5MMKwMjInNDYuMiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'মিরপুর': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১৪ (মিরপুর)',
    pollingCenter: 'মিরপুর বাংলা কলেজ',
    address: 'মিরপুর-১০, ঢাকা-১২১৬',
    mapLocation: {
      lat: 23.8069,
      lng: 90.3685,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.0!2d90.3685!3d23.8069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzI0LjgiTiA5MMKwMjInMDYuNiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'গুলশান': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১২ (গুলশান)',
    pollingCenter: 'গুলশান সরকারি উচ্চ বিদ্যালয়',
    address: 'গুলশান-১, ঢাকা-১২১২',
    mapLocation: {
      lat: 23.7808,
      lng: 90.4172,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.4172!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjkiTiA5MMKwMjUnMDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'ধানমন্ডি': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১৫ (ধানমন্ডি)',
    pollingCenter: 'ধানমন্ডি সরকারি বালিকা উচ্চ বিদ্যালয়',
    address: 'ধানমন্ডি-৩২, ঢাকা-১২০৯',
    mapLocation: {
      lat: 23.7465,
      lng: 90.3763,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.3763!3d23.7465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzQ3LjQiTiA5MMKwMjInMzQuNyJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'মোহাম্মদপুর': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১০ (মোহাম্মদপুর)',
    pollingCenter: 'মোহাম্মদপুর সরকারি উচ্চ বিদ্যালয়',
    address: 'মোহাম্মদপুর, ঢাকা-১২০৭',
    mapLocation: {
      lat: 23.7639,
      lng: 90.3567,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3567!3d23.7639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzUwLjAiTiA5MMKwMjEnMjQuMSJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'মতিঝিল': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-৮ (মতিঝিল)',
    pollingCenter: 'মতিঝিল আইডিয়াল স্কুল',
    address: 'মতিঝিল, ঢাকা-১০০০',
    mapLocation: {
      lat: 23.7330,
      lng: 90.4172,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4172!3d23.7330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQzJzU4LjgiTiA5MMKwMjUnMDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'কল্যাণপুর': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১৬ (কল্যাণপুর)',
    pollingCenter: 'কল্যাণপুর সরকারি স্কুল',
    address: 'কল্যাণপুর, ঢাকা-১২১৭',
    mapLocation: {
      lat: 23.7540,
      lng: 90.3820,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3!2d90.3820!3d23.7540!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzE0LjQiTiA5MMKwMjInNTUuMiJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'বনানী': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-১১ (বনানী)',
    pollingCenter: 'বনানী বিদ্যানিকেতন স্কুল',
    address: 'বনানী, ঢাকা-১২১৩',
    mapLocation: {
      lat: 23.7937,
      lng: 90.4066,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.2!2d90.4066!3d23.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM3LjMiTiA5MMKwMjQnMjMuOCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'রমনা': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-৯ (রমনা)',
    pollingCenter: 'রমনা সরকারি মডেল স্কুল',
    address: 'রমনা, ঢাকা-১০০০',
    mapLocation: {
      lat: 23.7380,
      lng: 90.3978,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8!2d90.3978!3d23.7380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzE2LjgiTiA5MMKwMjMnNTIuMSJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  },
  'বাড্ডা': {
    name: 'ভোটার তথ্য',
    constituency: 'ঢাকা-৭ (বাড্ডা)',
    pollingCenter: 'বাড্ডা সরকারি প্রাথমিক বিদ্যালয়',
    address: 'বাড্ডা, ঢাকা-১২১২',
    mapLocation: {
      lat: 23.7806,
      lng: 90.4254,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.4!2d90.4254!3d23.7806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUwLjIiTiA5MMKwMjUnMzEuNCJF!5e0!3m2!1sen!2sbd!4v1234567890'
    }
  }
};

export default function VoterCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);

    // Simulate API call delay
    setTimeout(() => {
      const result = voterData[searchQuery] || voterData[searchQuery.toLowerCase()];
      
      if (result) {
        setSearchResult(result);
        setNotFound(false);
      } else {
        setSearchResult(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider mb-6">
              <FaMapMarkerAlt className="inline mr-2" />
              ভোটার সেবা
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ভোট কেন্দ্র খুঁজুন
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto">
              আপনার ভোট কেন্দ্র ও নির্বাচনী এলাকা সহজেই খুঁজে নিন
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with Image */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">ভোটার সেবায় আমরা</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
                আপনার ভোট কেন্দ্র খুঁজতে আমরা সাহায্য করছি
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>
                  গণতন্ত্রের মূল ভিত্তি হলো ভোট। প্রতিটি নাগরিকের ভোট প্রদানের অধিকার নিশ্চিত করা আমাদের দায়িত্ব।
                </p>
                <p>
                  এই সেবার মাধ্যমে আপনি খুব সহজেই আপনার ভোট কেন্দ্র, নির্বাচনী এলাকা এবং ভোট কেন্দ্রের অবস্থান জানতে পারবেন।
                </p>
                <p className="font-semibold text-blue-700">
                  আপনার ভোট আপনার অধিকার - এটি ব্যবহার করুন এবং দেশের ভবিষ্যৎ নির্ধারণে অংশগ্রহণ করুন।
                </p>
              </div>
              <div className="mt-6 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-600">
                <p className="text-slate-700">
                  <strong className="text-blue-700">সহজ প্রক্রিয়া:</strong> শুধু আপনার এনআইডি, মোবাইল নম্বর বা এলাকার নাম দিয়ে খুঁজুন এবং তাৎক্ষণিক ফলাফল পান।
                </p>
              </div>
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
                <img
                  src="/aminul_nomination_post.webp"
                  alt="আমিনুল হক"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
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
                    <FaIdCard className="text-blue-600" />
                    <span>এনআইডি নম্বর /</span>
                    <FaPhone className="text-blue-600" />
                    <span>মোবাইল নম্বর /</span>
                    <FaMapPin className="text-blue-600" />
                    <span>এলাকার নাম লিখুন</span>
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="উদাহরণ: 1234567890 / 01712345678 / উত্তরা"
                    className="w-full px-6 py-4 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      খোঁজা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      খুঁজুন
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      <AnimatePresence>
        {notFound && (
          <section className="py-12 px-4">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-red-800 mb-2">তথ্য পাওয়া যায়নি</h3>
                <p className="text-red-600">
                  দয়া করে আপনার তথ্য যাচাই করে আবার চেষ্টা করুন
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {searchResult && (
          <section className="py-12 px-4">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="space-y-6"
              >
                {/* Success Message */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-2xl font-bold text-green-800">তথ্য পাওয়া গেছে!</h3>
                </div>

                {/* Voter Information */}
                {searchResult.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
                  >
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                      <FaIdCard className="text-blue-600" />
                      ব্যক্তিগত তথ্য
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResult.name !== 'ভোটার তথ্য' && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-sm text-slate-600 mb-1">নাম</p>
                          <p className="text-lg font-bold text-slate-900">{searchResult.name}</p>
                        </div>
                      )}
                      {searchResult.nid && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-sm text-slate-600 mb-1">এনআইডি নম্বর</p>
                          <p className="text-lg font-bold text-slate-900">{searchResult.nid}</p>
                        </div>
                      )}
                      {searchResult.mobile && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-sm text-slate-600 mb-1">মোবাইল নম্বর</p>
                          <p className="text-lg font-bold text-slate-900">{searchResult.mobile}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Constituency Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <FaBuilding className="text-emerald-600" />
                    নির্বাচনী তথ্য
                  </h3>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-l-4 border-emerald-600">
                      <p className="text-sm text-slate-600 mb-1">নির্বাচনী এলাকা</p>
                      <p className="text-2xl font-black text-slate-900">{searchResult.constituency}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-600">
                      <p className="text-sm text-slate-600 mb-1">ভোট কেন্দ্র</p>
                      <p className="text-2xl font-black text-slate-900">{searchResult.pollingCenter}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-600">
                      <p className="text-sm text-slate-600 mb-2">ঠিকানা</p>
                      <p className="text-lg font-bold text-slate-900 flex items-start gap-3">
                        <FaMapMarkerAlt className="text-purple-600 mt-1 flex-shrink-0" />
                        {searchResult.address}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Google Maps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <FaMapPin className="text-red-600" />
                      মানচিত্রে অবস্থান
                    </h3>
                    <button
                      onClick={() => getDirections(searchResult.mapLocation.lat, searchResult.mapLocation.lng)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105"
                    >
                      <FaDirections />
                      দিক নির্দেশনা
                    </button>
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <iframe
                      src={searchResult.mapLocation.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ভোট কেন্দ্রের অবস্থান"
                    />
                  </div>
                </motion.div>

                {/* Important Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6"
                >
                  <h4 className="text-lg font-bold text-amber-900 mb-2">📋 গুরুত্বপূর্ণ নির্দেশনা</h4>
                  <ul className="space-y-2 text-amber-800">
                    <li>• ভোট দিতে যাওয়ার সময় অবশ্যই আপনার জাতীয় পরিচয়পত্র সাথে নিন</li>
                    <li>• ভোট কেন্দ্রে যাওয়ার আগে সময়সূচী যাচাই করে নিন</li>
                    <li>• কোনো সমস্যা হলে ভোট কেন্দ্রের কর্মকর্তাদের সাথে যোগাযোগ করুন</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </section>
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
                সাহায্য প্রয়োজন?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                ভোট কেন্দ্র সম্পর্কিত কোন সমস্যা বা প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  যোগাযোগ করুন
                </a>
                <a
                  href="tel:+8801712345678"
                  className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  কল করুন
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

