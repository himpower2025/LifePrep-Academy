import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Compass,
  GraduationCap,
  Check,
  ArrowRight,
  Download,
  Award,
  Users
} from 'lucide-react';
import { ACADEMIC_DIVISIONS, SCHOOL_INFO } from '../data/schoolData';
import { AcademicStage } from '../types';

interface AcademicsPageProps {
  initialSubTab?: string;
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({
  initialSubTab = 'overview',
  onOpenAdmissions,
  onOpenTour,
}) => {
  const [activeStage, setActiveStage] = useState<string>(
    initialSubTab === 'overview' ? 'pre-primary' : initialSubTab
  );

  const selectedDivision = ACADEMIC_DIVISIONS.find((d) => d.id === activeStage) || ACADEMIC_DIVISIONS[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-12 sm:py-16 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-semibold text-blue-100 flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">Academics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Academic Programs & Curriculum
          </h1>

          <p className="text-sm sm:text-base text-blue-50 max-w-2xl leading-relaxed font-normal">
            From Early Childhood Development (Nursery to UKG) through Grade 10 SEE preparation, our progressive constructivist model empowers lifelong academic excellence.
          </p>
        </div>
      </section>

      {/* Sub-stage selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-6">
          {ACADEMIC_DIVISIONS.map((division) => (
            <button
              key={division.id}
              onClick={() => setActiveStage(division.id)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
                activeStage === division.id
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{division.title}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                {division.grades}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Division Detailed View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-900 text-amber-300 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedDivision.grades}
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {selectedDivision.ageRange}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                {selectedDivision.title}
              </h2>

              <p className="text-sm font-semibold text-blue-900 italic">
                "{selectedDivision.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedDivision.description}
              </p>

              {/* Curriculum Architecture */}
              <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 space-y-1.5">
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Curriculum Architecture & Pedagogy</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedDivision.curriculumOverview}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Program Highlights & Pillars:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDivision.keyHighlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4">
              <button
                onClick={onOpenAdmissions}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5"
              >
                <span>Inquire for {selectedDivision.grades}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenTour}
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Schedule Classroom Visit
              </button>
            </div>
          </div>

          {/* Image & Stats */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
            <img
              src={selectedDivision.image}
              alt={selectedDivision.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-5 bg-blue-900/90 backdrop-blur-md rounded-2xl border border-blue-700 text-white space-y-2 shadow-xl">
              <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">Small Class Size Advantage</p>
              <p className="text-xs text-blue-100">
                Maintaining an 8:1 student-teacher ratio ensures personalized learning plans and individual academic growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
