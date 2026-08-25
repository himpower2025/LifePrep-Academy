import React from 'react';
import {
  Keyboard,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TYPING_RESOURCES, TYPING_QUICK_TIPS, TypingResource } from '../../data/typingData';

interface TypingPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypingPracticeModal: React.FC<TypingPracticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white px-5 py-4 sm:px-6 sm:py-5 relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-400/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                  English Typing Practice
                </h2>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>No Login Needed</span>
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Select a platform below to start practicing touch-typing instantly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Resource Cards (Compact 2x3 or 3x2 Grid) */}
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TYPING_RESOURCES.map((resource: TypingResource) => (
              <div
                key={resource.id}
                className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-3.5 flex flex-col justify-between space-y-2.5 transition-all shadow-2xs hover:shadow-sm group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded">
                      {resource.targetLevel}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      {resource.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-snug">
                    {resource.shortDesc}
                  </p>
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <span>Start Practice</span>
                  <ExternalLink className="w-3 h-3 text-amber-300" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Footer with 3 Quick Tips */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <span className="font-bold text-slate-900 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Quick Tips:</span>
            </span>
            {TYPING_QUICK_TIPS.map((tip, idx) => (
              <span key={idx} className="text-slate-600 font-medium">
                • {tip}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
