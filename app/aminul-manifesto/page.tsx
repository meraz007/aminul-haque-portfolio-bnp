"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FaHeart, 
  FaRoad,
  FaCar,
  FaHospital,
  FaGraduationCap,
  FaWifi,
  FaTint,
  FaUsers,
  FaBriefcase,
  FaFutbol,
  FaShieldAlt,
  FaTree,
  FaHandHoldingHeart,
  FaHandshake,
  FaCheck,
  FaQuoteLeft
} from 'react-icons/fa';
import { useTranslation } from '../i18n/I18nProvider';
import { IconType } from 'react-icons';

interface ManifestoSection {
  id: string;
  icon: IconType;
  title: string;
  titleEn: string;
  color: string;
  items: string[];
  itemsEn: string[];
}

const manifestoSections: ManifestoSection[] = [
  {
    id: 'roads',
    icon: FaRoad,
    title: 'রাস্তা নির্মাণ ও জলাবদ্ধতা নিরসন',
    titleEn: 'Road Construction & Waterlogging Solutions',
    color: 'from-blue-600 to-indigo-700',
    items: [
      'এলাকার ভাঙা রাস্তা মেরামত ও পাকা রাস্তা নির্মাণ করা হবে।',
      'বর্ষায় জলাবদ্ধতা নিরসনে ১০০ দিনের ড্রেনেজ পরিষ্কার অভিযান পরিচালনা করা হবে।',
      'খাল সংস্কার ও পরিষ্কারের মাধ্যমে পানি প্রবাহ নিশ্চিত করা হবে।',
      'খালের দুই পাশে ওয়াকওয়ে নির্মাণ করা হবে।'
    ],
    itemsEn: [
      'Repair broken roads and construct paved roads in the area.',
      '100-day drainage cleaning campaign to eliminate waterlogging during monsoon.',
      'Ensure water flow through canal renovation and cleaning.',
      'Construction of walkways on both sides of canals.'
    ]
  },
  {
    id: 'traffic',
    icon: FaCar,
    title: 'যানজট নিরসন',
    titleEn: 'Traffic Solutions',
    color: 'from-amber-500 to-orange-600',
    items: [
      'প্রধান সড়ক ও মোড়ে স্মার্ট ট্রাফিক সিগন্যাল স্থাপন।',
      'কমিউনিটি ট্রাফিকিং ব্যবস্থা চালু।',
      'নির্দিষ্ট পার্কিং জোন নির্মাণ।',
      'রিকশা ও অটোরিকশার জন্য নীতিমালা ও সুবিধা।'
    ],
    itemsEn: [
      'Installation of smart traffic signals at main roads and intersections.',
      'Community trafficking system implementation.',
      'Construction of designated parking zones.',
      'Policies and facilities for rickshaws and auto-rickshaws.'
    ]
  },
  {
    id: 'healthcare',
    icon: FaHospital,
    title: 'স্বাস্থ্যসেবা ও মেডিকেল কলেজ হাসপাতাল',
    titleEn: 'Healthcare & Medical College Hospital',
    color: 'from-rose-500 to-red-600',
    items: [
      'নির্বাচনী এলাকায় সরকারি মেডিকেল কলেজ ও হাসপাতাল স্থাপন।',
      'বিনামূল্যে প্রাথমিক স্বাস্থ্যসেবা।',
      'ওয়ার্ডভিত্তিক স্বাস্থ্য ও মাতৃসদন কেন্দ্র।',
      'ডেঙ্গু ও চিকুনগুনিয়া প্রতিরোধে কার্যকর ব্যবস্থা।'
    ],
    itemsEn: [
      'Establishment of government medical college and hospital in the constituency.',
      'Free primary healthcare services.',
      'Ward-based health and maternity centers.',
      'Effective measures to prevent dengue and chikungunya.'
    ]
  },
  {
    id: 'education',
    icon: FaGraduationCap,
    title: 'শিক্ষা ও শিক্ষা প্রতিষ্ঠানের মান উন্নয়ন',
    titleEn: 'Education & Institution Development',
    color: 'from-sky-500 to-blue-600',
    items: [
      'শিক্ষার পরিবেশ ও মান নিশ্চিতকরণ।',
      'ডিগ্রি কলেজকে বিশ্ববিদ্যালয় কলেজে রূপান্তর।',
      'এমপিও ও ভুক্ত শিক্ষা প্রতিষ্ঠান জাতীয়করণে অগ্রাধিকার।',
      'স্কুল, কলেজ ও মাদ্রাসার অবকাঠামো উন্নয়ন।',
      'মেধাবী শিক্ষার্থীদের বৃত্তি।',
      'প্রতিটি ওয়ার্ডে কমিউনিটি সেন্টার।',
      'নিম্ন আয়ের মানুষের জন্য বিনামূল্যে শিক্ষা ব্যবস্থা।'
    ],
    itemsEn: [
      'Ensuring educational environment and quality.',
      'Converting degree colleges to university colleges.',
      'Priority nationalization of MPO-listed educational institutions.',
      'Infrastructure development of schools, colleges and madrasas.',
      'Scholarships for meritorious students.',
      'Community centers in every ward.',
      'Free education for low-income people.'
    ]
  },
  {
    id: 'internet',
    icon: FaWifi,
    title: 'ইন্টারনেট ও অন্যান্য নাগরিক সেবা',
    titleEn: 'Internet & Other Civic Services',
    color: 'from-cyan-500 to-teal-600',
    items: [
      'কলেজ, বাসস্ট্যান্ড ও মার্কেটে ফ্রি ওয়াইফাই জোন।',
      'মাল্টিপারপাস কমিউনিটি সেন্টার।',
      'আঞ্চলিক পাসপোর্ট অফিস।',
      'কাঁচাবাজার আধুনিক ও সুশৃঙ্খলকরণ।'
    ],
    itemsEn: [
      'Free WiFi zones at colleges, bus stands and markets.',
      'Multipurpose community centers.',
      'Regional passport office.',
      'Modernization and organization of wet markets.'
    ]
  },
  {
    id: 'utilities',
    icon: FaTint,
    title: 'পানি, বিদ্যুৎ ও গ্যাস সংকট সমাধান',
    titleEn: 'Water, Electricity & Gas Crisis Solutions',
    color: 'from-blue-500 to-cyan-600',
    items: [
      'ঢাকা ওয়াসার সাথে সমন্বয়ে পানির স্থায়ী সমাধান।',
      'পুরনো পাইপলাইন পরিবর্তন।',
      'কমিউনিটি ওয়াটার ট্যাংক ও গভীর নলকূপ।',
      '২৪ ঘণ্টা অভিযোগ হটলাইন।',
      'গ্যাস ও বিদ্যুৎ সরবরাহে তিতাস ও সিটি কর্পোরেশনের সাথে সমন্বয়।',
      'পুরনো গ্যাস লাইনের সংস্কার।',
      'নতুন বিদ্যুৎ লাইন ও সংযোগ।',
      'পরীক্ষার সময় লোডশেডিং বন্ধ।'
    ],
    itemsEn: [
      'Permanent water solution in coordination with Dhaka WASA.',
      'Replacement of old pipelines.',
      'Community water tanks and deep tube wells.',
      '24-hour complaint hotline.',
      'Coordination with Titas and City Corporation for gas and electricity supply.',
      'Renovation of old gas lines.',
      'New electricity lines and connections.',
      'No load shedding during exams.'
    ]
  },
  {
    id: 'bangladeshi',
    icon: FaUsers,
    title: '"আমরা সবাই বাংলাদেশী" প্রত্যয় বাস্তবায়ন',
    titleEn: '"We Are All Bangladeshi" Implementation',
    color: 'from-emerald-500 to-green-600',
    items: [
      'নিম্ন ও মধ্যম আয়ের নাগরিকদের স্থায়ী পুনর্বাসন ও মর্যাদা।',
      'উর্দুভাষী জনগোষ্ঠীর পুনর্বাসন ও নাগরিক সুবিধা।',
      'সিসিটিভি, নাইটগার্ড ও স্থানীয় কমিটির মাধ্যমে নিরাপত্তা।',
      'টিসিবির ন্যায্যমূল্যের দোকান বৃদ্ধি।',
      'বিনামূল্যে শিক্ষা ও স্বাস্থ্যসেবা।',
      'বিশুদ্ধ পানি ও আধুনিক স্যানিটেশন।'
    ],
    itemsEn: [
      'Permanent rehabilitation and dignity for low and middle income citizens.',
      'Rehabilitation and civic facilities for Urdu-speaking community.',
      'Security through CCTV, night guards and local committees.',
      'Increase in TCB fair price shops.',
      'Free education and healthcare.',
      'Pure water and modern sanitation.'
    ]
  },
  {
    id: 'youth-employment',
    icon: FaBriefcase,
    title: 'তরুণদের দক্ষতা ও কর্মসংস্থান',
    titleEn: 'Youth Skills & Employment',
    color: 'from-violet-500 to-purple-600',
    items: [
      'কারিগরি প্রশিক্ষণ।',
      'যানবাহন, কম্পিউটার, প্লাম্বিং, ইলেকট্রিক, সার্ভিসিং প্রশিক্ষণ।',
      'নারীদের কর্মসংস্থান।',
      'ফ্রিল্যান্সারদের জন্য পেপ্যাল ও আইটি হাব।',
      'কালচারাল সেন্টার ও ইয়ুথ কার্নিভাল।',
      'টেকনিক্যাল এডুকেশন সেন্টার ও জবস ফেয়ার।',
      'ভাষা শিক্ষা কেন্দ্র।'
    ],
    itemsEn: [
      'Technical training.',
      'Vehicle, computer, plumbing, electric, servicing training.',
      'Employment for women.',
      'PayPal and IT hub for freelancers.',
      'Cultural center and youth carnival.',
      'Technical education center and job fairs.',
      'Language learning centers.'
    ]
  },
  {
    id: 'sports',
    icon: FaFutbol,
    title: 'খেলাধূলা ও যুব উন্নয়ন',
    titleEn: 'Sports & Youth Development',
    color: 'from-green-500 to-emerald-600',
    items: [
      'খেলার মাঠ ও আধুনিক স্পোর্টস কমপ্লেক্স।',
      'মেয়েদের জন্য নিরাপদ খেলাধূলা।',
      'স্পোর্টস একাডেমি।',
      'খেলা ও সংস্কৃতির মাধ্যমে মাদক প্রতিরোধ।'
    ],
    itemsEn: [
      'Playgrounds and modern sports complex.',
      'Safe sports for girls.',
      'Sports academy.',
      'Drug prevention through sports and culture.'
    ]
  },
  {
    id: 'security',
    icon: FaShieldAlt,
    title: 'জননিরাপত্তা ও অপরাধ প্রতিরোধ',
    titleEn: 'Public Safety & Crime Prevention',
    color: 'from-slate-600 to-zinc-700',
    items: [
      'আবাসিক এলাকা ঘোষণা।',
      'স্থানীয় কমিটির মাধ্যমে নিরাপত্তা।',
      'সাপ্তাহিক মতবিনিময়।',
      'মাদক, চাঁদাবাজি ও সন্ত্রাসে জিরো টলারেন্স।',
      'হটলাইন, কিশোর গ্যাং প্রতিরোধ, মাদক নিরাময় কেন্দ্র।',
      'ব্যবসায়ীদের নিরাপত্তা প্রটেকশন ইউনিট।'
    ],
    itemsEn: [
      'Declaration of residential areas.',
      'Security through local committees.',
      'Weekly dialogue sessions.',
      'Zero tolerance for drugs, extortion and terrorism.',
      'Hotline, juvenile gang prevention, drug rehabilitation center.',
      'Business protection unit for traders.'
    ]
  },
  {
    id: 'green',
    icon: FaTree,
    title: 'সবুজ ও সুস্থ পল্লবী ও রুপনগর',
    titleEn: 'Green & Healthy Pallabi & Rupnagar',
    color: 'from-green-600 to-teal-700',
    items: [
      'পার্ক ও খেলার মাঠ সবুজায়ন।',
      'বৃহৎ বৃক্ষরোপণ ও ২০ লক্ষ চারা বিতরণ।',
      'ওয়াকওয়ে নির্মাণ।',
      'ছাদ বাগান ও ছাদকৃষিতে কর ছাড়।',
      'গাছ লাগানো ও পরিচর্যার প্রশিক্ষণ।'
    ],
    itemsEn: [
      'Greening of parks and playgrounds.',
      'Large-scale tree plantation and distribution of 20 lakh saplings.',
      'Construction of walkways.',
      'Tax exemption for rooftop gardens and agriculture.',
      'Training on tree planting and care.'
    ]
  },
  {
    id: 'welfare',
    icon: FaHandHoldingHeart,
    title: 'নিম্ন আয়, প্রবীণ ও অসহায়দের কল্যাণ',
    titleEn: 'Welfare for Low Income, Elderly & Vulnerable',
    color: 'from-pink-500 to-rose-600',
    items: [
      'আশ্রয় কেন্দ্র ও অনাথ শিশুদের আবাসিক শিক্ষা।',
      'শ্রমিকদের কর্মপরিবেশ উন্নয়ন।',
      'প্রবীণ ভাতা ও প্রবীণ কেন্দ্র।',
      'হিজরা জনগোষ্ঠীর চাকরি ও নিরাপদ বাসস্থান।',
      'প্রবীণ নারী ও বিধবাদের রেশন সুবিধা।',
      'অনগ্রসর জনগোষ্ঠীর সামাজিক সুবিধা।'
    ],
    itemsEn: [
      'Shelter centers and residential education for orphans.',
      'Improvement of workers\' working conditions.',
      'Elderly allowance and elderly centers.',
      'Jobs and safe housing for hijra community.',
      'Ration facilities for elderly women and widows.',
      'Social benefits for backward communities.'
    ]
  },
  {
    id: 'harmony',
    icon: FaHandshake,
    title: 'সাম্প্রদায়িক সম্প্রীতি ও মানবিক সমাজ',
    titleEn: 'Communal Harmony & Humane Society',
    color: 'from-purple-500 to-indigo-600',
    items: [
      'সব ধর্মের উপাসনালয় স্থাপন ও মেরামত।',
      'আলেম-ওলামা ও গুণীজনদের সম্মান।',
      'সাপ্তাহিক নাগরিক মতবিনিময়।'
    ],
    itemsEn: [
      'Establishment and repair of places of worship for all religions.',
      'Respect for religious scholars and intellectuals.',
      'Weekly citizen dialogue sessions.'
    ]
  }
];

export default function AminulManifestoPage() {
  const { language } = useTranslation();

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
              {language === 'bd' ? 'ঢাকা-১৬' : 'Dhaka-16'}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                {language === 'bd' ? 'আমিনুল হক' : 'Aminul Haque'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-700 font-bold mb-6">
              {language === 'bd' 
                ? 'বিএনপি মনোনীত ধানের শীষের প্রার্থী' 
                : 'BNP Nominated Sheaf of Paddy Candidate'}
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 inline-block shadow-xl border border-emerald-100">
              <p className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">
                {language === 'bd' ? '"আমি আপনাদেরই একজন"' : '"I am one of you"'}
              </p>
              <p className="text-lg text-slate-600">
                {language === 'bd' 
                  ? 'আমি আপনাদের সন্তান এবং আপনাদেরই একজন' 
                  : 'I am your child and one of you'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
              <div className="text-center mb-8">
                <FaHeart className="text-5xl md:text-6xl text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  {language === 'bd' ? 'প্রিয় পল্লবী ও রুপনগরবাসী' : 'Dear Residents of Pallabi & Rupnagar'}
                </h2>
                <p className="text-emerald-600 font-bold mt-2">
                  {language === 'bd' ? 'আসসালামুআলাইকুম। আন্তরিক শুভেচ্ছা গ্রহণ করুন।' : 'Assalamu Alaikum. Please accept my sincere greetings.'}
                </p>
              </div>
              <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
                <p>
                  {language === 'bd' 
                    ? 'আমি, আমিনুল হক, আপনাদেরই একজন সন্তান। পল্লবী ও রুপনগর আমার ঘর ও আমার পরিবার। এ এলাকার ভবিষ্যৎ আমি নিজের মতো করেই অনুভব করি। বিগত ১৭ বছর আমরা সবাই একসাথে এক কঠিন সময় পার করেছি।'
                    : 'I, Aminul Haque, am one of your own children. Pallabi and Rupnagar are my home and my family. I feel the future of this area as my own. For the past 17 years, we have all gone through difficult times together.'}
                </p>
                <p>
                  {language === 'bd'
                    ? 'যানজট, পানি ও গ্যাসের ঘাটতি, চাঁদাবাজি, মাদক আর অব্যবস্থাপনার কারণে আমাদের প্রতিদিনের জীবন দুর্বিষহ হয়ে উঠেছে। আমাদের তরুণরা পথ হারাচ্ছে, মায়েরা নিরাপত্তাহীনতায় ভুগছে এবং পরিবারগুলো স্বপ্ন হারাচ্ছে।'
                    : 'Traffic jams, water and gas shortages, extortion, drugs and mismanagement have made our daily lives unbearable. Our youth are losing their way, mothers are suffering from insecurity, and families are losing their dreams.'}
                </p>
                <p>
                  {language === 'bd'
                    ? 'আমি রাজনীতি করি ক্ষমতার জন্য নয়, মানুষের সেবা করার জন্য। সকল মত ও চিন্তার ঐক্যতান রচনার জন্য অব্যাহত আলোচনা, মতবিনিময় এবং পারস্পরিক বোঝাপড়ার সেতুবন্ধন রচনা করে সকল প্রকার বৈষম্য ও ভেদবুদ্ধির বেড়াজাল অতিক্রম করে ভবিষ্যতে সুখী ও নতুন সংস্কৃতি চর্চার মাধ্যমে আধুনিক, সুস্থ ও আদর্শ নগর জীবন উপহার দেওয়াই আমার স্বপ্ন।'
                    : 'I do politics not for power, but to serve the people. My dream is to create a modern, healthy and ideal urban life through continuous dialogue, exchange of views and building bridges of mutual understanding to overcome all forms of discrimination.'}
                </p>
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mt-8">
                  <FaQuoteLeft className="text-3xl text-emerald-400 mb-4" />
                  <p className="text-xl md:text-2xl font-bold text-emerald-700 italic">
                    {language === 'bd'
                      ? 'আমি বিশ্বাস করি—আপনাদের সমর্থন, আন্তরিক সহযোগিতা এবং সততা ও সমতার আদর্শে উজ্জীবিত হয়ে সকলে মিলে কাজ করলে এ স্বপ্ন বাস্তবায়ন সম্ভব। পরিবর্তন সম্ভব, যদি আমরা সবাই চাই।'
                      : 'I believe—with your support, sincere cooperation and working together inspired by the ideals of honesty and equality, this dream can be realized. Change is possible, if we all want it.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Title Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              {language === 'bd' 
                ? 'আমাদের পল্লবী ও রুপনগর পরিবর্তনের পরিকল্পনা' 
                : 'Our Plan for Transforming Pallabi & Rupnagar'}
            </h2>
            <p className="text-xl text-white/80">
              {language === 'bd' ? 'আমার নির্বাচনী ইশতেহার' : 'My Election Manifesto'}
            </p>
            <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-3">
              <span className="text-2xl font-black text-white">
                {language === 'bd' ? 'সবার আগে বাংলাদেশ' : 'Bangladesh First'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Civic Modernization Intro */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              {language === 'bd' ? 'নাগরিক জীবনযাত্রার আধুনিকায়ন' : 'Modernization of Civic Life'}
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              {language === 'bd'
                ? 'পল্লবী ও রুপনগরকে একটি আধুনিক, নিরাপদ ও সমৃদ্ধ অঞ্চল হিসেবে গড়ে তুলতে আমি দৃঢ়প্রতিজ্ঞ। প্রতিটি নাগরিকের জীবনমান উন্নয়ন ও প্রতিটি ওয়ার্ডকে সুষমভাবে উন্নত করার সুনির্দিষ্ট পরিকল্পনা রয়েছে।'
                : 'I am determined to develop Pallabi and Rupnagar as a modern, safe and prosperous region. There is a specific plan to improve the quality of life of every citizen and develop every ward uniformly.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Sections */}
      <section className="py-12 md:py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {manifestoSections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group"
              >
                <div className={`h-full relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`inline-flex p-3 md:p-4 bg-gradient-to-br ${section.color} rounded-2xl flex-shrink-0 shadow-lg`}>
                      <section.icon className="text-2xl md:text-3xl text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                      {language === 'bd' ? section.title : section.titleEn}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {(language === 'bd' ? section.items : section.itemsEn).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <FaCheck className={`text-sm mt-1 flex-shrink-0 ${section.color.includes('emerald') || section.color.includes('green') ? 'text-emerald-500' : section.color.includes('blue') ? 'text-blue-500' : section.color.includes('rose') || section.color.includes('red') || section.color.includes('pink') ? 'text-rose-500' : section.color.includes('amber') || section.color.includes('orange') ? 'text-amber-500' : section.color.includes('violet') || section.color.includes('purple') || section.color.includes('indigo') ? 'text-violet-500' : section.color.includes('cyan') || section.color.includes('teal') || section.color.includes('sky') ? 'text-cyan-500' : 'text-slate-500'}`} />
                        <span className="text-slate-700 text-sm md:text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-slate-200">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                {language === 'bd' 
                  ? 'শ্রদ্ধেয় মুরুব্বীগণ, প্রিয় সমবয়সী ও তরুণ বন্ধুগণ' 
                  : 'Respected Elders, Dear Peers & Young Friends'}
              </h2>
              <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
                <p>
                  {language === 'bd'
                    ? 'আমি পল্লবী ও রুপনগরের সন্তান—আপনাদেরই সন্তান। আপনাদের সুখ-দুঃখের সাথে আমার জীবন জড়িয়ে আছে। আমার লক্ষ্য ঐতিহ্য ও আধুনিকতার সমন্বয়ে বিশ্বমানের বাসযোগ্য পল্লবী ও রুপনগর গড়ে তোলা। আপনাদের সহযোগিতায় ইনশাআল্লাহ তা বাস্তবায়ন সম্ভব।'
                    : 'I am a child of Pallabi and Rupnagar—your child. My life is intertwined with your joys and sorrows. My goal is to build a world-class livable Pallabi and Rupnagar combining tradition and modernity. With your cooperation, Inshallah it is possible to implement.'}
                </p>
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 my-8">
                  <p className="text-xl md:text-2xl font-bold text-emerald-700">
                    {language === 'bd'
                      ? 'আসন্ন জাতীয় নির্বাচনে ঢাকা-১৬ আসনে ধানের শীষ প্রতীকে আপনার মূল্যবান ভোট দিয়ে আমাকে আপনাদের সেবা করার সুযোগ দিন।'
                      : 'In the upcoming national election, please give me the opportunity to serve you by casting your valuable vote for the Sheaf of Paddy symbol in Dhaka-16 constituency.'}
                  </p>
                </div>
                <p className="text-lg text-slate-600">
                  {language === 'bd' ? 'আল্লাহ আমাদের সহায় হোন।' : 'May Allah help us.'}
                </p>
                <p className="text-lg text-slate-600">
                  {language === 'bd' ? 'আল্লাহ হাফেজ।' : 'Allah Hafez.'}
                </p>
                <p className="text-2xl font-black text-emerald-600 mt-4">
                  {language === 'bd' ? 'বাংলাদেশ জিন্দাবাদ।' : 'Long Live Bangladesh.'}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-3xl font-black text-emerald-600">
                    {language === 'bd' ? '- আমিনুল হক' : '- Aminul Haque'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
