import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PopupItem } from '../types';
import { getStoredPopups } from '../data/adminStore';

interface PopupsDisplayProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
}

export const PopupsDisplay: React.FC<PopupsDisplayProps> = ({
  onOpenAdmissions,
  onOpenTour,
}) => {
  const [activePopups, setActivePopups] = useState<PopupItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dontShowToday, setDontShowToday] = useState<boolean>(false);

  const loadPopups = () => {
    const allPopups = getStoredPopups();
    const now = new Date().getTime();

    // Filter popups that are active AND not hidden for today by user
    const valid = allPopups.filter((popup) => {
      if (!popup.isActive) return false;
      const hideUntil = localStorage.getItem(`hide_popup_${popup.id}`);
      if (hideUntil && parseInt(hideUntil, 10) > now) {
        return false;
      }
      return true;
    });

    setActivePopups(valid);
    if (valid.length > 0) {
      setIsOpen(true);
      setCurrentIndex(0);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    loadPopups();

    const handleUpdate = () => loadPopups();
    window.addEventListener('popups_updated', handleUpdate);
    return () => window.removeEventListener('popups_updated', handleUpdate);
  }, []);

  if (!isOpen || activePopups.length === 0) return null;

  const currentPopup = activePopups[currentIndex];

  const handleCloseCurrent = () => {
    if (dontShowToday) {
      // Hide for 24 hours
      const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem(`hide_popup_${currentPopup.id}`, expireTime.toString());
    }

    // Remove current popup from visible stack
    const remaining = activePopups.filter((_, idx) => idx !== currentIndex);
    if (remaining.length > 0) {
      setActivePopups(remaining);
      setCurrentIndex(Math.min(currentIndex, remaining.length - 1));
      setDontShowToday(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleCloseAll = () => {
    if (dontShowToday && currentPopup) {
      const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem(`hide_popup_${currentPopup.id}`, expireTime.toString());
    }
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    if (currentPopup.ctaAction === 'admissions') {
      onOpenAdmissions();
      handleCloseCurrent();
    } else if (currentPopup.ctaAction === 'tour') {
      onOpenTour();
      handleCloseCurrent();
    } else if (currentPopup.ctaUrl) {
      window.open(currentPopup.ctaUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Top bar with count & close */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {currentPopup.badgeText || 'School Announcement'}
            </span>
            {activePopups.length > 1 && (
              <span className="bg-slate-800 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-700">
                {currentIndex + 1} / {activePopups.length}
              </span>
            )}
          </div>
          <button
            onClick={handleCloseCurrent}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-popup Tab Switcher if > 1 */}
        {activePopups.length > 1 && (
          <div className="bg-slate-100 px-4 py-2 flex items-center justify-center space-x-2 border-b border-slate-200 text-xs font-medium">
            {activePopups.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setDontShowToday(false);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  idx === currentIndex
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.popupType === 'template' ? 'Event Info' : 'Poster Notice'} #{idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Popup Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TYPE 1: TEMPLATE BASED POPUP */}
          {currentPopup.popupType === 'template' && (
            <div className="space-y-4">
              {currentPopup.tagline && (
                <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentPopup.tagline}</span>
                </div>
              )}

              <h3 className="text-xl font-bold font-serif text-slate-900 leading-snug">
                {currentPopup.title}
              </h3>

              {/* Time & Location Structured Cards */}
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/90 text-xs">
                {currentPopup.dateTime && (
                  <div className="flex items-start space-x-3 text-slate-800">
                    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-900 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Date & Time</span>
                      <span className="text-slate-700 font-medium">{currentPopup.dateTime}</span>
                    </div>
                  </div>
                )}

                {currentPopup.location && (
                  <div className="flex items-start space-x-3 text-slate-800 pt-1 border-t border-slate-200/60">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-900 shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Location</span>
                      <span className="text-slate-700 font-medium">{currentPopup.location}</span>
                    </div>
                  </div>
                )}

                {currentPopup.targetAudience && (
                  <div className="flex items-start space-x-3 text-slate-800 pt-1 border-t border-slate-200/60">
                    <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-900 shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Target Audience</span>
                      <span className="text-slate-700 font-medium">{currentPopup.targetAudience}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description Body */}
              {currentPopup.description && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white">
                  {currentPopup.description}
                </p>
              )}

              {/* CTA Action Button */}
              {currentPopup.ctaText && (
                <button
                  onClick={handleCtaClick}
                  className="w-full py-3 px-5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>{currentPopup.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>
          )}

          {/* TYPE 2: IMAGE / FILE POSTER POPUP */}
          {currentPopup.popupType === 'image' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-slate-900">
                {currentPopup.title}
              </h3>

              {currentPopup.imageUrl ? (
                <div
                  className={`relative rounded-2xl overflow-hidden border border-slate-200 shadow-md ${
                    currentPopup.clickUrl ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''
                  }`}
                  onClick={() => {
                    if (currentPopup.clickUrl === 'admissions') {
                      onOpenAdmissions();
                      handleCloseCurrent();
                    } else if (currentPopup.clickUrl === 'tour') {
                      onOpenTour();
                      handleCloseCurrent();
                    } else if (currentPopup.clickUrl && currentPopup.clickUrl.startsWith('http')) {
                      window.open(currentPopup.clickUrl, '_blank');
                    }
                  }}
                >
                  <img
                    src={currentPopup.imageUrl}
                    alt={currentPopup.imageAlt || currentPopup.title}
                    className="w-full max-h-[380px] object-contain bg-slate-900 rounded-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span>No poster image uploaded yet.</span>
                </div>
              )}

              {currentPopup.clickUrl && (
                <button
                  onClick={() => {
                    if (currentPopup.clickUrl === 'admissions') {
                      onOpenAdmissions();
                      handleCloseCurrent();
                    } else if (currentPopup.clickUrl === 'tour') {
                      onOpenTour();
                      handleCloseCurrent();
                    } else if (currentPopup.clickUrl && currentPopup.clickUrl.startsWith('http')) {
                      window.open(currentPopup.clickUrl, '_blank');
                    }
                  }}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Learn More / Open Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer with "Don't show today" and Close */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="font-medium text-slate-700">Do not show again today</span>
          </label>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCloseCurrent}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
