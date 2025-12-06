import Link from 'next/link';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

export default function SiteFooter() {
  const quickLinks = [
    { title: 'হোম', href: '/' },
    { title: 'সম্পর্কে', href: '/about' },
    { title: 'কর্মসূচি', href: '/programs' },
    { title: 'রূপকল্প', href: '/manifesto' },
    { title: 'গ্যালারি', href: '/gallery' },
    { title: 'যোগাযোগ', href: '/contact' },
  ];

  const services = [
    { title: 'ভোট কেন্দ্র', href: '/voter-center' },
    { title: 'স্বেচ্ছাসেবক', href: '/volunteer' },
    { title: 'অভিযোগ', href: '/complaints' },
    { title: 'মন্তব্য', href: '/comments' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t-4 border-emerald-500">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-50"></div>
              </div>
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  আমিনুল হক
                </div>
                <div className="text-xs font-semibold text-slate-600">জনগণের সেবায়</div>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              শিক্ষা, কৃষি, শিল্প ও সংস্কৃতিতে টেকসই উন্নয়নের মাধ্যমে একটি সমৃদ্ধ বাংলাদেশ গড়ার প্রতিশ্রুতি।
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: '#', color: 'from-blue-600 to-blue-700' },
                { icon: FaTwitter, href: '#', color: 'from-sky-500 to-blue-600' },
                { icon: FaInstagram, href: '#', color: 'from-pink-500 to-purple-600' },
                { icon: FaYoutube, href: '#', color: 'from-red-600 to-red-700' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`p-3 bg-gradient-to-br ${social.color} text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-110`}
                  aria-label="সোশ্যাল মিডিয়া"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-emerald-500">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 hover:text-emerald-600 font-semibold transition-all hover:translate-x-2 inline-block"
                  >
                    → {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-blue-500">
            সেবা
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-slate-700 hover:text-blue-600 font-semibold transition-all hover:translate-x-2 inline-block"
                  >
                    → {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-6 pb-2 border-b-2 border-purple-500">
              যোগাযোগ
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-semibold">info@aminulhaque.bd</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 font-semibold text-center md:text-left">
              © {new Date().getFullYear()} আমিনুল হক। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
