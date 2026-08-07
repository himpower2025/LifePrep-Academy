import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface AdmissionsPageProps {
  initialSubTab?: string;
  onOpenAdmissionsModal: () => void;
  onOpenTourModal: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  initialSubTab = 'process',
  onOpenAdmissionsModal,
  onOpenTourModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubTab);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-12 sm:py-16 border-b border-blue-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-semibold text-blue-100 flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">Admissions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Admissions & Enrollment
          </h1>

          <p className="text-sm sm:text-base text-blue-50 max-w-2xl leading-relaxed font-normal">
            Welcome to Life Preparatory Academy. We welcome inquiries for Early Childhood Development (Nursery to UKG), Primary (Grades 1–5), and Secondary (Grades 6–10).
          </p>
        </div>
      </section>

      {/* Sub-tab navigation */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('process')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'process'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            5-Step Admissions Process
          </button>

          <button
            onClick={() => setActiveTab('tour')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'tour'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus Tour & Open House
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Admissions Requirements & FAQ
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'process' && (
          <div className="space-y-10">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                5-Step Path to Joining LifePrep Academy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Our admissions procedure is designed to be transparent, supportive, and parent-friendly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold font-serif text-slate-900">Inquire Online</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit an online inquiry form or call our admissions office.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold font-serif text-slate-900">Campus Tour</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Visit our Lalitpur campus, see classes in session, and meet teachers.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold font-serif text-slate-900">Application Form</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit required student birth certificates and previous school records.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="text-sm font-bold font-serif text-slate-900">Interaction & Readiness</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Informal student interaction to assess academic readiness and stage fit.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
                  5
                </span>
                <h3 className="text-sm font-bold font-serif text-slate-900">Enrollment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive acceptance letter and complete enrollment registration.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ready to begin your inquiry?</h3>
                <p className="text-xs text-slate-600">Our admissions desk is open Monday to Friday, 8:30 AM to 4:00 PM.</p>
              </div>
              <button
                onClick={onOpenAdmissionsModal}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-colors shrink-0"
              >
                Open Inquiry Form
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tour' && (
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Experience LifePrep Academy in Person
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                We encourage all prospective families to visit our Lalitpur campus during regular school hours to see our story pedagogy and STEM labs in action.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-900 uppercase">Campus Address</p>
                  <p className="text-sm font-semibold text-slate-800">{SCHOOL_INFO.fullAddress}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-900 uppercase">Office Hours</p>
                  <p className="text-sm font-semibold text-slate-800">{SCHOOL_INFO.workingHours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4">
                <button
                  onClick={onOpenTourModal}
                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-2"
                >
                  <span>Book Campus Visit Online</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-8 max-w-4xl">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-slate-900">What age criteria apply for Early Childhood Development?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Children entering Nursery are typically 3 years old by the start of the academic year. LKG applicants are age 4+, and UKG applicants are age 5+.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-slate-900">What documents are required for registration?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Parents should provide a copy of the child's birth certificate, recent passport photos, previous school grade reports (for Grade 1 and above), and citizenship/ID documents of the parent or guardian.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Is transportation provided across Kathmandu Valley?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes, LifePrep Academy operates supervised school buses servicing key routes across Lalitpur and nearby Kathmandu Valley neighborhoods.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
