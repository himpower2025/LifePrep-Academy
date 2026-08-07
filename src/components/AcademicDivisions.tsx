import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Compass,
  GraduationCap,
  Check,
  ArrowRight,
  Download,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { ACADEMIC_DIVISIONS } from '../data/schoolData';
import { AcademicStage } from '../types';

interface AcademicDivisionsProps {
  onOpenAdmissions: () => void;
}

export const AcademicDivisions: React.FC<AcademicDivisionsProps> = ({
  onOpenAdmissions,
}) => {
  const [selectedStage, setSelectedStage] = useState<AcademicStage>('secondary');

  const activeDivision = ACADEMIC_DIVISIONS.find((d) => d.id === selectedStage) || ACADEMIC_DIVISIONS[0];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <section id="academics" className="py-16 sm:py-24 bg-slate-50 text-slate-900 font-sans border-y border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-900 tracking-widest uppercase bg-blue-100/80 px-3.5 py-1 rounded-full border border-blue-200">
            Educational Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            Comprehensive Education: Nursery to Grade 10
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our progressive curriculum provides seamless continuity from Pre-Primary (Nursery, LKG, UKG) through Primary (Grades 1–5) and Secondary School (Grades 6–10).
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ACADEMIC_DIVISIONS.map((division) => {
            const isSelected = selectedStage === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setSelectedStage(division.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-900 text-amber-300 shadow-lg shadow-blue-900/20 scale-105 border border-blue-700'
                    : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                }`}
              >
                {getStageIcon(division.iconName)}
                <span>{division.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-blue-800 grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Side: Division Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeDivision.grades}
                </span>
                <span className="text-xs font-semibold text-blue-100 bg-blue-900/80 px-3 py-1 rounded-full border border-blue-700/80">
                  {activeDivision.ageRange}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                {activeDivision.title}
              </h3>

              <p className="text-sm font-medium text-amber-300 italic">
                "{activeDivision.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed font-normal">
                {activeDivision.description}
              </p>

              {/* Curriculum Overview Box */}
              <div className="bg-blue-900/70 p-4 rounded-xl border border-blue-700/60 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Curriculum Architecture
                </p>
                <p className="text-xs text-white leading-relaxed font-medium">
                  {activeDivision.curriculumOverview}
                </p>
              </div>

              {/* Key Program Highlights List */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Program Features & Pillars:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDivision.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-blue-50 font-medium">
                      <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="pt-6 border-t border-blue-800/80 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAdmissions}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center space-x-1.5"
              >
                <span>Inquire for {activeDivision.grades}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Side: High Quality Image View */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
            <img
              src={activeDivision.image}
              alt={activeDivision.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081c36]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#081c36] lg:via-transparent lg:to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-4 bg-blue-950/90 backdrop-blur-md rounded-2xl border border-blue-700/80 text-xs space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>Classroom Ratio</span>
                <span>8 : 1</span>
              </div>
              <p className="text-blue-100 text-[11px]">
                Individualized academic pathways ensuring no student is left behind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
