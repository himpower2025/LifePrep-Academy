import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { CampusFacility } from '../../types';

interface FacilityDetailModalProps {
  facility: CampusFacility | null;
  onClose: () => void;
  onOpenTour: () => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  onClose,
  onOpenTour,
}) => {
  if (!facility) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Facility Image Header */}
        <div className="relative h-64 bg-slate-900">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-900"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
              {facility.category}
            </span>
            <h3 className="text-2xl font-bold font-serif text-white">
              {facility.name}
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          <p className="text-slate-700 leading-relaxed">
            {facility.fullDesc}
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
              Key Architectural & Equipment Specs:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenTour();
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow flex items-center space-x-1.5"
            >
              <span>Schedule Visit to See This Facility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
