import React, { useState } from 'react';
import { X, CheckCircle2, GraduationCap, Send, Calendar, User, Mail, Phone, Building2 } from 'lucide-react';
import { AdmissionsFormData } from '../../types';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<AdmissionsFormData>({
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    applyingGrade: 'Secondary School (Grades 6-10)',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    nationality: '',
    currentSchool: '',
    startSemester: 'Fall 2026 (August)',
    message: ''
  });

  if (!isOpen) return null;

  const mailtoSubject = encodeURIComponent(`[Life-Prep Admissions Inquiry] ${formData.studentFirstName} ${formData.studentLastName} - ${formData.applyingGrade}`);
  const mailtoBody = encodeURIComponent(
    `Life-Prep Academy Admissions Application Form\n\n` +
    `Student Name: ${formData.studentFirstName} ${formData.studentLastName}\n` +
    `Date of Birth: ${formData.dateOfBirth}\n` +
    `Grade Applying For: ${formData.applyingGrade}\n\n` +
    `Parent/Guardian Name: ${formData.parentName}\n` +
    `Email: ${formData.parentEmail}\n` +
    `Phone: ${formData.parentPhone}\n` +
    `Nationality: ${formData.nationality}\n\n` +
    `Comments / Questions:\n${formData.message || 'None'}\n\n` +
    `Submitted via Life-Prep Academy Online Admissions Portal`
  );
  const mailtoUrl = `mailto:lifeprep@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

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
      <div className="bg-white text-slate-900 max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Online Admissions Application
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                Academic Year 2026–2027 • Life-Prep Academy Nepal
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

        {/* Content Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold font-serif text-slate-900">
                Application Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you for applying to Life-Prep Academy. Application Reference Number: <strong className="text-slate-900">LPA-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <p className="font-bold text-slate-900">Application Dispatch & Next Steps:</p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li>Your inquiry has been logged and dispatched to the School Admissions Office at <strong className="text-blue-900">lifeprep@gmail.com</strong>.</li>
                <li>A confirmation message will be sent to <strong>{formData.parentEmail}</strong> within 24 hours.</li>
                <li>Our admissions officer will reach out via telephone at <strong>{formData.parentPhone}</strong> to schedule a campus interaction.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-2"
              >
                <Mail className="w-4 h-4 text-amber-300" />
                <span>Send via Email Client (lifeprep@gmail.com)</span>
              </a>

              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition-colors"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            {/* Student Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                1. Student Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentFirstName}
                    onChange={(e) => setFormData({ ...formData, studentFirstName: e.target.value })}
                    placeholder="e.g. Aarav"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentLastName}
                    onChange={(e) => setFormData({ ...formData, studentLastName: e.target.value })}
                    placeholder="e.g. Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Applying For *</label>
                  <select
                    value={formData.applyingGrade}
                    onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option>Pre-Primary (Nursery, LKG, UKG)</option>
                    <option>Primary School (Grades 1-5)</option>
                    <option>Secondary School (Grades 6-10)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                2. Parent / Guardian Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    placeholder="e.g. parent@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+977 980 123 4567"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nationality *</label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="e.g. Nepalese / International"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Comments / Specific Questions</label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your child's academic interests, sports, or special learning requests..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-transform active:scale-95 flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
