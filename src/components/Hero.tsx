import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Compass,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import heroCampusImg from '../assets/images/lpa_hero_campus_1786005368430.jpg';

interface HeroProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmissions,
  onOpenTour,
  onNavigate,
}) => {
  return (
    <section id="hero" className="relative w-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden">
      {/* Background Image with Vibrant Royal Blue Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="Life-Prep Academy Campus Lalitpur Nepal"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-4xl 2xl:max-w-5xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-400/15 border border-amber-300/40 rounded-full px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              Empowering Minds • Shaping Futures
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight text-white">
            "Preparing Pupils <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400">
              for Life."
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-blue-50 font-sans leading-relaxed max-w-2xl font-medium">
            Life Preparatory Academy in Lalitpur provides a progressive, value-based education from Early Childhood Development (Nursery, LKG, UKG) through Grade 10, empowering students to become active problem solvers and compassionate leaders.
          </p>

          {/* Core Feature Badges */}
          <div className="flex flex-wrap gap-y-2 gap-x-5 pt-1 text-xs font-semibold text-blue-50">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Govt. Approved & Registered</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Nursery to Grade 10</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Constructivist & Skill-Based</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAdmissions}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center space-x-2"
            >
              <span>Apply for 2026–2027</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTour}
              className="px-5 py-3.5 bg-blue-900/80 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/40 rounded-xl backdrop-blur-md transition-all duration-200 flex items-center space-x-2 shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Schedule Campus Visit</span>
            </button>
          </div>
        </div>

        {/* Quick Action Navigation Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-blue-800/80">
          <button
            onClick={() => onNavigate('academics')}
            className="p-3.5 bg-blue-900/70 hover:bg-blue-800/90 border border-blue-600/70 hover:border-amber-400/60 rounded-xl text-left transition-all duration-200 group shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <GraduationCap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-blue-200 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="mt-2 text-xs font-bold text-white">Academic Pathways</p>
            <p className="text-[11px] text-blue-100 font-medium">Nursery to Grade 10</p>
          </button>

          <button
            onClick={() => onNavigate('pillars')}
            className="p-3.5 bg-blue-900/70 hover:bg-blue-800/90 border border-blue-600/70 hover:border-amber-400/60 rounded-xl text-left transition-all duration-200 group shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <Compass className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-blue-200 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="mt-2 text-xs font-bold text-white">Outdoor Leadership</p>
            <p className="text-[11px] text-blue-100 font-medium">Himalayan Eco-Learning</p>
          </button>

          <button
            onClick={() => onNavigate('facilities')}
            className="p-3.5 bg-blue-900/70 hover:bg-blue-800/90 border border-blue-600/70 hover:border-amber-400/60 rounded-xl text-left transition-all duration-200 group shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <Building2 className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-blue-200 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="mt-2 text-xs font-bold text-white">STEM & Campus</p>
            <p className="text-[11px] text-blue-100 font-medium">Robotics & Creative Hubs</p>
          </button>

          <button
            onClick={() => onNavigate('events')}
            className="p-3.5 bg-blue-900/70 hover:bg-blue-800/90 border border-blue-600/70 hover:border-amber-400/60 rounded-xl text-left transition-all duration-200 group shadow-md backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <Calendar className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-blue-200 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="mt-2 text-xs font-bold text-white">News & Open House</p>
            <p className="text-[11px] text-blue-100 font-medium">Upcoming Events</p>
          </button>
        </div>
      </div>

      {/* Floating Key Statistics Bar */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 border-y border-blue-800/80 py-6 px-4">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SCHOOL_INFO.quickStats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-[11px] text-blue-100 font-medium">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
