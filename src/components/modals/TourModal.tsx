import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, Video } from 'lucide-react';
import { TourBookingData } from '../../types';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [tourData, setTourData] = useState<TourBookingData>({
    parentName: '',
    email: '',
    phone: '',
    tourType: 'In-Person',
    preferredDate: '2026-08-18',
    preferredTimeSlot: '10:00 AM – Morning Session',
    gradeOfInterest: 'Secondary School (Grades 6-10)',
    numberOfVisitors: 2,
    specialRequests: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 max-w-xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Schedule a Campus Tour
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                Experience Life-Prep Academy Lalitpur Campus
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold font-serif text-slate-900">
                Tour Booking Confirmed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                We look forward to welcoming you to Life-Prep Academy.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Tour Type:</span>
                <span className="font-bold text-slate-900">{tourData.tourType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-slate-900">{tourData.preferredDate} ({tourData.preferredTimeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Confirmation Sent To:</span>
                <span className="font-bold text-slate-900">{tourData.email}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Tour Type Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTourData({ ...tourData, tourType: 'In-Person' })}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  tourData.tourType === 'In-Person'
                    ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-bold">In-Person Campus Visit</span>
                <span className="text-[10px] opacity-80">Lalitpur Campus</span>
              </button>

              <button
                type="button"
                onClick={() => setTourData({ ...tourData, tourType: 'Virtual 360' })}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  tourData.tourType === 'Virtual 360'
                    ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="font-bold">Virtual 360 Walkthrough</span>
                <span className="text-[10px] opacity-80">Online Interactive</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={tourData.parentName}
                  onChange={(e) => setTourData({ ...tourData, parentName: e.target.value })}
                  placeholder="e.g. Suman Gurung"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={tourData.email}
                  onChange={(e) => setTourData({ ...tourData, email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={tourData.phone}
                  onChange={(e) => setTourData({ ...tourData, phone: e.target.value })}
                  placeholder="+977 980 123 4567"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grade Level of Interest *</label>
                <select
                  value={tourData.gradeOfInterest}
                  onChange={(e) => setTourData({ ...tourData, gradeOfInterest: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option>Pre-Primary (Nursery, LKG, UKG)</option>
                  <option>Primary School (Grades 1-5)</option>
                  <option>Secondary School (Grades 6-10)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={tourData.preferredDate}
                  onChange={(e) => setTourData({ ...tourData, preferredDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Time Slot *</label>
                <select
                  value={tourData.preferredTimeSlot}
                  onChange={(e) => setTourData({ ...tourData, preferredTimeSlot: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option>10:00 AM – Morning Session</option>
                  <option>01:30 PM – Afternoon Session</option>
                  <option>03:30 PM – Post-Class Session</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md"
              >
                Confirm Tour Date
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
