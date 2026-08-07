import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Building2,
  FileText
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeaderProps {
  currentPage: string;
  onNavigatePage: (page: string, subTab?: string) => void;
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigatePage,
  onOpenAdmissions,
  onOpenTour,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavSelection = (page: string, subTab?: string) => {
    onNavigatePage(page, subTab);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-all duration-300">
      {/* Utility Top Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white font-medium text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-blue-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <a href={`tel:${SCHOOL_INFO.phone}`} className="flex items-center space-x-1.5 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
            <a href={`mailto:${SCHOOL_INFO.infoEmail}`} className="flex items-center space-x-1.5 hover:text-amber-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_INFO.infoEmail}</span>
            </a>
            <a
              href="https://maps.app.goo.gl/9TE3ZoXT1NNTFqvt8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-blue-50 hover:text-amber-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Lalitpur, Kathmandu Valley</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavSelection('campus-life', 'news')}
              className="text-blue-100 hover:text-amber-300 transition-colors flex items-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Events Calendar</span>
            </button>
            <span className="text-blue-800/80">|</span>
            <button
              onClick={onOpenTour}
              className="text-blue-100 hover:text-amber-300 transition-colors flex items-center space-x-1"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Campus Visit</span>
            </button>
            <span className="text-blue-800/80">|</span>
            <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wide uppercase border border-amber-400/40">
              Govt. Approved School
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2.5 border-b border-blue-100 text-slate-800'
            : 'bg-white text-slate-900 py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & School Branding */}
          <div
            onClick={() => handleNavSelection('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 bg-white rounded-xl p-1 border border-blue-200 shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
              <img
                src={SCHOOL_INFO.logoUrl}
                alt="Life-Prep Academy Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to GraduationCap if logo image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-950 font-serif block">
                Life-Prep Academy
              </span>
              <p className="text-[11px] text-blue-900/70 font-medium hidden sm:block tracking-wide">
                Progressive Education in Lalitpur
              </p>
            </div>
          </div>

          {/* 4 Core Desktop Menus with Hover/Click Dropdowns */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* 1. About LPA Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavSelection('about')}
                className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-colors flex items-center space-x-1 ${
                  currentPage === 'about'
                    ? 'text-blue-900 bg-blue-50 border border-blue-200'
                    : 'text-slate-800 hover:text-blue-900 hover:bg-blue-50/60'
                }`}
              >
                <span>About LPA</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNavSelection('about', 'principal')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4 text-blue-900" />
                    <span>Principal's Welcome & Message</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('about', 'philosophy')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Constructivist Pedagogy</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('about', 'facts')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Award className="w-4 h-4 text-blue-900" />
                    <span>Accreditations & Fast Facts</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Academics Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academics')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavSelection('academics')}
                className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-colors flex items-center space-x-1 ${
                  currentPage === 'academics'
                    ? 'text-blue-900 bg-blue-50 border border-blue-200'
                    : 'text-slate-800 hover:text-blue-900 hover:bg-blue-50/60'
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'academics' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNavSelection('academics', 'pre-primary')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center justify-between"
                  >
                    <span>Early Childhood (ECD)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Nursery–UKG
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('academics', 'primary')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center justify-between"
                  >
                    <span>Primary School Division</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                      Grades 1–5
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('academics', 'secondary')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center justify-between"
                  >
                    <span>Secondary School & SEE Prep</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Grades 6–10
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Campus Life Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('campus-life')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavSelection('campus-life')}
                className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-colors flex items-center space-x-1 ${
                  currentPage === 'campus-life'
                    ? 'text-blue-900 bg-blue-50 border border-blue-200'
                    : 'text-slate-800 hover:text-blue-900 hover:bg-blue-50/60'
                }`}
              >
                <span>Campus Life</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'campus-life' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNavSelection('campus-life', 'facilities')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-900" />
                    <span>Campus Facilities & STEM Hub</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('campus-life', 'clubs')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Clubs, Sports & Arts</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('campus-life', 'news')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-blue-900" />
                    <span>News & Open House Events</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Admissions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavSelection('admissions')}
                className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-colors flex items-center space-x-1 ${
                  currentPage === 'admissions'
                    ? 'text-blue-900 bg-blue-50 border border-blue-200'
                    : 'text-slate-800 hover:text-blue-900 hover:bg-blue-50/60'
                }`}
              >
                <span>Admissions</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === 'admissions' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNavSelection('admissions', 'process')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-blue-900" />
                    <span>5-Step Application Process</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('admissions', 'tour')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4 text-blue-900" />
                    <span>Schedule Campus Visit</span>
                  </button>
                  <button
                    onClick={() => handleNavSelection('admissions', 'faq')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Requirements & FAQ</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs & Search */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search website"
              className="p-2 text-slate-600 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
              title="Search website"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenTour}
              className="px-3.5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-50 border border-blue-300 rounded-xl transition-colors"
            >
              Book Tour
            </button>

            <button
              onClick={onOpenAdmissions}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow transition-all active:scale-95 flex items-center space-x-1.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:text-blue-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-blue-900 bg-blue-50 border border-blue-200 rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Accordion Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              {/* Home */}
              <button
                onClick={() => handleNavSelection('home')}
                className="w-full text-left px-3 py-2.5 text-sm font-bold text-blue-900 hover:bg-blue-50 rounded-xl"
              >
                🏠 Home Page
              </button>

              {/* 1. About LPA Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')}
                  className="w-full text-left px-3.5 py-3 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50/80"
                >
                  <span>1. About LPA</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {mobileAccordion === 'about' && (
                  <div className="bg-white p-2 space-y-1 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleNavSelection('about', 'principal')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Principal's Welcome & Message
                    </button>
                    <button
                      onClick={() => handleNavSelection('about', 'philosophy')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Constructivist Pedagogy
                    </button>
                    <button
                      onClick={() => handleNavSelection('about', 'facts')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Accreditations & Fast Facts
                    </button>
                  </div>
                )}
              </div>

              {/* 2. Academics Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'academics' ? null : 'academics')}
                  className="w-full text-left px-3.5 py-3 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50/80"
                >
                  <span>2. Academics</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'academics' ? 'rotate-180' : ''}`} />
                </button>

                {mobileAccordion === 'academics' && (
                  <div className="bg-white p-2 space-y-1 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleNavSelection('academics', 'pre-primary')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Early Childhood (Nursery, LKG, UKG)
                    </button>
                    <button
                      onClick={() => handleNavSelection('academics', 'primary')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Primary School (Grades 1–5)
                    </button>
                    <button
                      onClick={() => handleNavSelection('academics', 'secondary')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Secondary School (Grades 6–10 & SEE)
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Campus Life Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'campus' ? null : 'campus')}
                  className="w-full text-left px-3.5 py-3 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50/80"
                >
                  <span>3. Campus Life</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'campus' ? 'rotate-180' : ''}`} />
                </button>

                {mobileAccordion === 'campus' && (
                  <div className="bg-white p-2 space-y-1 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleNavSelection('campus-life', 'facilities')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Campus Facilities & STEM Hub
                    </button>
                    <button
                      onClick={() => handleNavSelection('campus-life', 'clubs')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Clubs, Sports & Arts
                    </button>
                    <button
                      onClick={() => handleNavSelection('campus-life', 'news')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • News & Events Calendar
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Admissions Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'admissions' ? null : 'admissions')}
                  className="w-full text-left px-3.5 py-3 text-sm font-bold text-slate-800 flex items-center justify-between bg-slate-50/80"
                >
                  <span>4. Admissions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'admissions' ? 'rotate-180' : ''}`} />
                </button>

                {mobileAccordion === 'admissions' && (
                  <div className="bg-white p-2 space-y-1 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleNavSelection('admissions', 'process')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • 5-Step Application Process
                    </button>
                    <button
                      onClick={() => handleNavSelection('admissions', 'tour')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Schedule Campus Visit
                    </button>
                    <button
                      onClick={() => handleNavSelection('admissions', 'faq')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                    >
                      • Requirements & FAQ
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTour();
                }}
                className="w-full py-2.5 text-xs font-bold text-slate-800 border border-slate-300 rounded-xl text-center"
              >
                Schedule Tour
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="w-full py-3 bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl shadow text-center"
              >
                Apply for Admissions
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
