import React, { useState } from 'react';
import { Quote, Award, CheckCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { HEAD_OF_SCHOOL_MESSAGE, SCHOOL_INFO } from '../data/schoolData';

interface HeadOfSchoolMessageProps {
  onOpenTour: () => void;
  onOpenAdmissions: () => void;
}

export const HeadOfSchoolMessage: React.FC<HeadOfSchoolMessageProps> = ({
  onOpenTour,
  onOpenAdmissions,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-900 tracking-widest uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Welcome to Life Preparatory Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            Preparing Pupils for Life
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Located in Lalitpur-13, Life Preparatory Academy provides progressive, value-based education from Early Childhood Development through Grade 10.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-3xl transform -rotate-1 opacity-20 blur-sm" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200">
                <img
                  src={HEAD_OF_SCHOOL_MESSAGE.image}
                  alt={HEAD_OF_SCHOOL_MESSAGE.name}
                  className="w-full h-[400px] object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5 bg-blue-900 text-white">
                  <h3 className="text-lg font-bold font-serif text-amber-300">
                    {HEAD_OF_SCHOOL_MESSAGE.name}
                  </h3>
                  <p className="text-xs text-blue-100 font-medium">
                    {HEAD_OF_SCHOOL_MESSAGE.title}
                  </p>
                  <p className="text-[11px] text-blue-200/70 mt-0.5">
                    {HEAD_OF_SCHOOL_MESSAGE.degree}
                  </p>
                </div>
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-950 uppercase tracking-wider">
                <Award className="w-4 h-4 text-blue-700" />
                <span>Accreditations & Official Approvals</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {SCHOOL_INFO.accreditations.map((acc, i) => (
                  <div key={i} className="flex items-start space-x-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-semibold leading-tight">{acc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Headmaster Statement */}
          <div className="lg:col-span-7 space-y-6">
            {/* Featured Callout Quote */}
            <div className="relative bg-blue-50/80 border-l-4 border-blue-700 p-6 rounded-r-2xl space-y-2">
              <Quote className="w-8 h-8 text-blue-700 opacity-60" />
              <p className="text-base sm:text-lg font-serif italic text-blue-950 leading-relaxed font-semibold">
                "{HEAD_OF_SCHOOL_MESSAGE.quote}"
              </p>
            </div>

            {/* Main Message Text */}
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to Life Preparatory Academy (LifePrep Academy) in Lalitpur-13. Founded with a vision to transform education in Nepal, our mission is captured in our school motto: "Preparing Pupils for Life."
              </p>
              <p>
                Our educational philosophy is rooted in progressivism and constructivism. We view learning as an active, engaging journey where children experiment, question, and discover. Teachers serve as caring facilitators who guide students through project-based inquiry, story-based pedagogy, skill-based training, and moral character building.
              </p>

              {expanded && (
                <div className="space-y-4 pt-2 border-t border-slate-200 animate-in fade-in duration-300">
                  <p>
                    From Early Childhood Development (Nursery, LKG, UKG) through Primary (Grades 1–5) and Secondary Education (Grades 6–10), we cultivate academic rigor, technological literacy, and essential life skills. Every lesson is designed to help children apply knowledge meaningfully to real-world situations.
                  </p>
                  <p>
                    We warmly invite you to visit our campus in Lalitpur, meet our dedicated educators, and discover how LifePrep Academy nurtures confident, empathetic, and future-ready learners.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center space-x-1.5 py-1"
              >
                <span>{expanded ? 'Show Less' : 'Read Full Educational Philosophy'}</span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-200">
              <button
                onClick={onOpenTour}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-2"
              >
                <span>Schedule a Campus Visit</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={onOpenAdmissions}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Request Admissions Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
