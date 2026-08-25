import React, { useState } from 'react';
import {
  Keyboard,
  X,
  ExternalLink,
  Sparkles,
  Zap,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  Award,
  ShieldCheck,
  Check
} from 'lucide-react';
import { TYPING_RESOURCES, TYPING_POSTURE_TIPS, TypingResource } from '../../data/typingData';

interface TypingPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypingPracticeModal: React.FC<TypingPracticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'speed' | 'curriculum' | 'game'>('all');

  if (!isOpen) return null;

  const filteredResources = selectedCategory === 'all'
    ? TYPING_RESOURCES
    : TYPING_RESOURCES.filter((r) => r.category === selectedCategory);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-amber-400/30">
              <Keyboard className="w-4 h-4 text-amber-300" />
              <span>Student Digital Learning & Skills</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
              English Typing Practice Hub
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Curated, verified touch-typing platforms for Life-Prep Academy students from Nursery to Grade 10. <strong className="text-amber-300">100% free with zero login or account required</strong>—simply select a platform below and start practicing instantly.
            </p>
          </div>

          {/* Quick No-Login Guarantee Badge */}
          <div className="mt-4 pt-4 border-t border-blue-800/80 flex flex-wrap items-center gap-4 text-xs text-blue-200">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>No Account / Sign-In Required</span>
            </div>
            <span className="hidden sm:inline text-blue-700">•</span>
            <div className="flex items-center space-x-1.5 text-amber-300 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Free for All Students & Families</span>
            </div>
            <span className="hidden sm:inline text-blue-700">•</span>
            <div className="flex items-center space-x-1.5 text-blue-100 font-semibold">
              <Zap className="w-4 h-4" />
              <span>Works on Any Laptop, Chromebook or PC</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 sm:px-8 pt-5 pb-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-900 text-amber-300 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Platforms ({TYPING_RESOURCES.length})
            </button>

            <button
              onClick={() => setSelectedCategory('beginner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedCategory === 'beginner'
                  ? 'bg-blue-900 text-amber-300 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Beginners & Primary</span>
            </button>

            <button
              onClick={() => setSelectedCategory('speed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedCategory === 'speed'
                  ? 'bg-blue-900 text-amber-300 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Speed & Tests</span>
            </button>

            <button
              onClick={() => setSelectedCategory('curriculum')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedCategory === 'curriculum'
                  ? 'bg-blue-900 text-amber-300 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Lessons & Curriculum</span>
            </button>

            <button
              onClick={() => setSelectedCategory('game')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedCategory === 'game'
                  ? 'bg-blue-900 text-amber-300 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Games & Challenges</span>
            </button>
          </div>

          <span className="text-xs text-slate-600 font-medium">
            Opens in a new browser tab
          </span>
        </div>

        {/* Main Resource Cards Grid */}
        <div className="p-6 sm:p-8 max-h-[58vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredResources.map((resource: TypingResource) => (
              <div
                key={resource.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all relative ${
                  resource.isPopular
                    ? 'border-blue-300 ring-1 ring-blue-100'
                    : 'border-slate-200'
                }`}
              >
                {resource.isPopular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    Recommended Choice
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {resource.targetLevel}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {resource.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                      {resource.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Platform by {resource.provider}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {resource.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {resource.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-900 font-semibold">Best For: </strong>
                    {resource.recommendedFor}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-98 flex items-center justify-center space-x-2 group"
                  >
                    <span>Launch {resource.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Keyboarding Tips Section */}
          <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-5 sm:p-6 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-950 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Student Touch-Typing Success Guidelines</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TYPING_POSTURE_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                  <p className="text-xs font-bold text-slate-900">{tip.title}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Teachers regularly assign typing exercises during Computer Science & STEM lab sessions.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
