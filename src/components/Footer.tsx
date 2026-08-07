import React, { useState } from 'react';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
  onNavigatePage: (page: string, subTab?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmissions,
  onOpenTour,
  onNavigatePage,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const handlePageClick = (page: string, subTab?: string) => {
    onNavigatePage(page, subTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-blue-100 font-sans pt-16 pb-8 border-t border-blue-800/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-800/80">
          {/* Column 1: School Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handlePageClick('home')}>
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg p-1 overflow-hidden border border-blue-800">
                <img
                  src={SCHOOL_INFO.logoUrl}
                  alt="Life-Prep Academy Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white tracking-tight">
                  Life-Prep Academy
                </span>
                <p className="text-[11px] text-amber-300 font-bold">
                  Lalitpur, Nepal
                </p>
              </div>
            </div>

            <p className="text-xs text-blue-50 leading-relaxed max-w-sm font-normal">
              "{SCHOOL_INFO.motto}." Providing progressive, value-based education from ECD to Grade 10 in Lalitpur.
            </p>

            <div className="space-y-2 text-xs text-blue-50 font-medium pt-1">
              <a
                href="https://maps.app.goo.gl/9TE3ZoXT1NNTFqvt8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 hover:text-amber-300 transition-colors group/map"
              >
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover/map:scale-110 transition-transform" />
                <span>{SCHOOL_INFO.fullAddress}</span>
              </a>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SCHOOL_INFO.phone} / {SCHOOL_INFO.secondaryPhone}</span>
              </p>
              <a
                href={`mailto:${SCHOOL_INFO.infoEmail}`}
                className="flex items-center space-x-2 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SCHOOL_INFO.infoEmail}</span>
              </a>
              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SCHOOL_INFO.workingHours}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Academics & Divisions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Academic Divisions
            </h4>
            <ul className="space-y-2 text-xs text-blue-50 font-medium">
              <li>
                <button onClick={() => handlePageClick('academics', 'pre-primary')} className="hover:text-amber-300 transition-colors">
                  Pre-Primary (Nursery, LKG, UKG)
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('academics', 'primary')} className="hover:text-amber-300 transition-colors">
                  Primary School (Grades 1–5)
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('academics', 'secondary')} className="hover:text-amber-300 transition-colors">
                  Secondary School (Grades 6–10)
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('about', 'philosophy')} className="hover:text-amber-300 transition-colors">
                  Constructivist Pedagogy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Portals & Visit */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Admissions & Visit
            </h4>
            <ul className="space-y-2 text-xs text-blue-50 font-medium">
              <li>
                <button onClick={() => handlePageClick('admissions', 'process')} className="hover:text-amber-300 transition-colors font-semibold">
                  5-Step Application Process
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('admissions', 'tour')} className="hover:text-amber-300 transition-colors">
                  Schedule Campus Visit
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('campus-life', 'news')} className="hover:text-amber-300 transition-colors">
                  School Calendar & Events
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('campus-life', 'facilities')} className="hover:text-amber-300 transition-colors">
                  Campus Facilities & STEM Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Map Preview */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Stay Connected
            </h4>
            <p className="text-xs text-blue-50 font-normal">
              Subscribe for monthly academic updates, admissions announcements, and student features.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-blue-900/80 border border-blue-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-blue-200/50 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300 transition-colors font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterSubscribed && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>

            <a
              href="https://maps.app.goo.gl/9TE3ZoXT1NNTFqvt8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:underline pt-2 font-medium"
            >
              <span>View LPA Campus on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Accreditations Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100 font-medium pt-4">
          <p>© 2022 Life-Prep Academy (LPA Nepal). All Rights Reserved.</p>

          <div className="flex items-center space-x-4">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-amber-300 transition-colors">
              Privacy Policy & Terms
            </button>
            <span>•</span>
            <span className="text-white font-semibold">Govt. Approved School (IEMIS 2081)</span>
            <span>•</span>
            <span className="text-white font-semibold">Lalitpur, Nepal</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-blue-900 text-white max-w-lg w-full rounded-2xl p-6 border border-blue-700/80 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-serif text-amber-300">
              Privacy & Safeguarding Statement
            </h3>
            <p className="text-xs text-blue-50 leading-relaxed font-normal">
              Life-Prep Academy is committed to protecting the privacy, safety, and personal data of our students, parents, and website visitors. All information gathered through online inquiry forms is processed securely and used exclusively for academic and admissions communication.
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
