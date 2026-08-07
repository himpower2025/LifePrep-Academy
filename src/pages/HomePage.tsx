import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Award,
  Sparkles,
  BookOpen,
  Cpu,
  HeartHandshake,
  Mountain,
  Calendar,
  Users,
  Building2,
  GraduationCap
} from 'lucide-react';
import {
  SCHOOL_INFO,
  HEAD_OF_SCHOOL_MESSAGE,
  ACADEMIC_DIVISIONS,
  EDUCATIONAL_PILLARS,
  CAMPUS_FACILITIES,
  LATEST_NEWS,
  UPCOMING_EVENTS
} from '../data/schoolData';
import { CampusFacility } from '../types';

interface HomePageProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
  onNavigatePage: (page: string, subTab?: string) => void;
  onSelectFacility: (facility: CampusFacility) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAdmissions,
  onOpenTour,
  onNavigatePage,
  onSelectFacility,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Banner Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
            alt="Life Preparatory Academy Campus"
            className="w-full h-full object-cover opacity-25 scale-105 transform transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950/60" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Highlight Badge */}
              <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Empowering Minds • Shaping Futures</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight text-white">
                "Preparing Pupils <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400">
                  for Life."
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-blue-50 leading-relaxed max-w-2xl font-normal">
                Life Preparatory Academy in Lalitpur provides progressive, value-based education from Early Childhood Development (Nursery to UKG) through Grade 10, empowering children to become active problem solvers and compassionate future leaders.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-50 pt-1">
                <div className="flex items-center space-x-1.5 bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-600/70">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Govt. Approved School</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-600/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Nursery to Grade 10</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-600/70">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Constructivist Pedagogy</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenAdmissions}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl transition-all duration-200 active:scale-95 flex items-center space-x-2"
                >
                  <span>Inquire for Admissions</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => onNavigatePage('about', 'principal')}
                  className="px-6 py-3.5 bg-blue-900/80 hover:bg-blue-800/90 text-white font-bold text-xs sm:text-sm border border-blue-700/80 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Explore School Vision
                </button>
              </div>
            </div>

            {/* Right Card Column */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl space-y-5 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">At A Glance</span>
                  <span className="text-xs text-blue-100 font-semibold">Established 2022</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-900/90 p-4 rounded-2xl border border-blue-700/60 flex items-start space-x-3">
                    <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">100% SEE Board Success</p>
                      <p className="text-[11px] text-blue-100 font-medium mt-0.5">Grade 10 academic distinction & exam readiness</p>
                    </div>
                  </div>

                  <div className="bg-blue-900/90 p-4 rounded-2xl border border-blue-700/60 flex items-start space-x-3">
                    <div className="p-2.5 bg-emerald-400/20 text-emerald-300 rounded-xl">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">8 : 1 Student-Teacher Ratio</p>
                      <p className="text-[11px] text-blue-100 font-medium mt-0.5">Personalized guidance & caring mentorship</p>
                    </div>
                  </div>

                  <div className="bg-blue-900/90 p-4 rounded-2xl border border-blue-700/60 flex items-start space-x-3">
                    <div className="p-2.5 bg-blue-400/20 text-blue-300 rounded-xl">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Lalitpur Campus</p>
                      <p className="text-[11px] text-blue-100 font-medium mt-0.5">Safe, modern labs, library & sports facilities</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenTour}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-colors text-center"
                >
                  Schedule a Campus Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Ribbon */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          {SCHOOL_INFO.quickStats.map((stat, idx) => (
            <div key={idx} className="text-center p-3 border-r last:border-r-0 border-slate-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-serif">{stat.value}</p>
              <p className="text-xs font-bold text-slate-800 mt-1">{stat.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principal Welcome Teaser Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={HEAD_OF_SCHOOL_MESSAGE.image}
                alt={HEAD_OF_SCHOOL_MESSAGE.name}
                className="w-full h-[320px] object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/principal.png')) {
                    target.src = '/pricipal.png';
                  } else {
                    target.src = HEAD_OF_SCHOOL_MESSAGE.fallbackImage;
                  }
                }}
              />
              <div className="p-4 bg-blue-900 text-white">
                <p className="text-sm font-bold text-amber-300">{HEAD_OF_SCHOOL_MESSAGE.name}</p>
                <p className="text-xs text-blue-200">{HEAD_OF_SCHOOL_MESSAGE.title}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Principal's Welcome
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              "Education is about empowering every child to become an active problem solver."
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
              Welcome to Life Preparatory Academy in Lalitpur. Founded in 2022, our school's motto is "Preparing Pupils for Life." We view learning as an active, constructivist journey where teachers act as caring facilitators.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigatePage('about', 'principal')}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5"
              >
                <span>Read Principal's Full Message</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => onNavigatePage('about', 'philosophy')}
                className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl border border-blue-200 transition-colors"
              >
                Our Constructivist Philosophy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Educational Pillars Teaser */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Why Choose LPA
          </span>
          <h2 className="text-3xl font-extrabold font-serif text-slate-900">
            Our Core Educational Pillars
          </h2>
          <p className="text-sm text-slate-600">
            Four foundational principles guiding every classroom activity at LifePrep Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDUCATIONAL_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigatePage('about', 'philosophy')}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center font-bold group-hover:bg-blue-900 group-hover:text-amber-300 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-blue-900 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-blue-800 group-hover:text-blue-950">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Divisions Teaser */}
      <section className="bg-slate-100/80 py-12 border-y border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                Academic Divisions
              </span>
              <h2 className="text-3xl font-extrabold font-serif text-slate-900 mt-2">
                Nursery to Grade 10 Curricula
              </h2>
            </div>
            <button
              onClick={() => onNavigatePage('academics')}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>Explore All Academics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACADEMIC_DIVISIONS.map((division) => (
              <div
                key={division.id}
                onClick={() => onNavigatePage('academics', division.id)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={division.image}
                    alt={division.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900 text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
                    {division.grades}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-blue-900 transition-colors">
                      {division.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {division.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>View Curriculum Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities Teaser */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Campus & Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-slate-900 mt-2">
              Modern Campus Facilities
            </h2>
          </div>
          <button
            onClick={() => onNavigatePage('campus-life', 'facilities')}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center space-x-1"
          >
            <span>View All Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_FACILITIES.slice(0, 3).map((facility) => (
            <div
              key={facility.id}
              onClick={() => onSelectFacility(facility)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  {facility.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {facility.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {facility.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News & Upcoming Events Teaser */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest News */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold font-serif text-slate-900">Latest School News</h3>
              <button
                onClick={() => onNavigatePage('campus-life', 'news')}
                className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center space-x-1"
              >
                <span>Read All News</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {LATEST_NEWS.slice(0, 2).map((news) => (
                <div
                  key={news.id}
                  onClick={() => onNavigatePage('campus-life', 'news')}
                  className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/40 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center space-x-2 text-[11px] font-bold text-blue-900">
                    <span>{news.category}</span>
                    <span>•</span>
                    <span className="text-slate-500 font-normal">{news.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-blue-900">
                    {news.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Event Feature */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-blue-900 text-white p-6 rounded-2xl space-y-5 flex flex-col justify-between shadow-lg border border-blue-800">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-blue-900/80 px-3 py-1 rounded-full border border-blue-700">
                Featured Event
              </span>
              <h3 className="text-xl font-bold font-serif text-white">
                {UPCOMING_EVENTS[0].title}
              </h3>
              <div className="text-xs space-y-1 text-blue-100 font-medium">
                <p>📅 <strong className="text-amber-300 font-bold">{UPCOMING_EVENTS[0].date}</strong> ({UPCOMING_EVENTS[0].time})</p>
                <p>📍 <span className="text-white font-medium">{UPCOMING_EVENTS[0].location}</span></p>
              </div>
              <p className="text-xs text-blue-50 leading-relaxed font-normal">
                {UPCOMING_EVENTS[0].description}
              </p>
            </div>

            <button
              onClick={onOpenTour}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-colors text-center"
            >
              RSVP / Schedule Open House Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
