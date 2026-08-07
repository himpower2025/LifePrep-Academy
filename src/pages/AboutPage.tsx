import React, { useState } from 'react';
import {
  Quote,
  Award,
  CheckCircle,
  Sparkles,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Users,
  Building,
  GraduationCap,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { HEAD_OF_SCHOOL_MESSAGE, SCHOOL_INFO, EDUCATIONAL_PILLARS } from '../data/schoolData';

interface AboutPageProps {
  initialSubTab?: string;
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  initialSubTab = 'principal',
  onOpenAdmissions,
  onOpenTour,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubTab);

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-12 sm:py-16 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-semibold text-blue-100 flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            About Life Preparatory Academy
          </h1>

          <p className="text-sm sm:text-base text-blue-50 max-w-2xl leading-relaxed font-normal">
            Founded in 2022 in Lalitpur, LifePrep Academy provides progressive, constructivist K-10 education dedicated to "Preparing Pupils for Life."
          </p>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('principal')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'principal'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Principal's Message & Leadership
          </button>

          <button
            onClick={() => setActiveTab('philosophy')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'philosophy'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Constructivist Educational Pedagogy
          </button>

          <button
            onClick={() => setActiveTab('facts')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'facts'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            School Accreditations & Fast Facts
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'principal' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Portrait */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                  <img
                    src={HEAD_OF_SCHOOL_MESSAGE.image}
                    alt={HEAD_OF_SCHOOL_MESSAGE.name}
                    className="w-full h-[380px] object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 bg-blue-900 text-white">
                    <h2 className="text-lg font-bold font-serif text-amber-300">
                      {HEAD_OF_SCHOOL_MESSAGE.name}
                    </h2>
                    <p className="text-xs text-blue-100 font-medium">{HEAD_OF_SCHOOL_MESSAGE.title}</p>
                    <p className="text-[11px] text-blue-100 font-normal mt-1">{HEAD_OF_SCHOOL_MESSAGE.degree}</p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/9TE3ZoXT1NNTFqvt8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-2 hover:bg-blue-100/60 transition-colors group/loc"
                >
                  <p className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 group-hover/loc:scale-110 transition-transform" />
                    Campus Location
                  </p>
                  <p className="text-xs text-slate-700 underline decoration-blue-300 underline-offset-2">{SCHOOL_INFO.fullAddress}</p>
                  <p className="text-xs text-blue-900 font-semibold pt-1">📞 {SCHOOL_INFO.phone}</p>
                  <p className="text-xs text-blue-900 font-semibold">✉️ {SCHOOL_INFO.email}</p>
                </a>
              </div>

              {/* Right Column: Full Statement */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl space-y-2">
                  <Quote className="w-8 h-8 text-amber-600 opacity-60" />
                  <p className="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed font-semibold">
                    "{HEAD_OF_SCHOOL_MESSAGE.quote}"
                  </p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                  <p>
                    Welcome to Life Preparatory Academy (LifePrep Academy) in Lalitpur-13. Founded in 2022 with a steadfast commitment to progressive education in Nepal, our mission is captured in our school motto: <strong>"Preparing Pupils for Life."</strong>
                  </p>
                  <p>
                    Our educational philosophy is deeply rooted in progressivism and constructivism. We view learning not as passive reception of textbook facts, but as an active, engaging journey where children experiment, question, and discover. Teachers serve as caring facilitators who guide students through project-based inquiry, story-based pedagogy, skill-based training, and moral character building.
                  </p>
                  <p>
                    From Early Childhood Development (Nursery, LKG, UKG) through Primary (Grades 1–5) and Secondary Education (Grades 6–10), we cultivate academic rigor, technological literacy, and practical life skills. Every lesson is designed to help children apply knowledge meaningfully to real-world situations.
                  </p>
                  <p>
                    We warmly invite you to visit our campus in Lalitpur, meet our dedicated educators, and discover how LifePrep Academy nurtures confident, empathetic, and future-ready learners.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-200">
                  <button
                    onClick={onOpenTour}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-2"
                  >
                    <span>Schedule Campus Visit</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={onOpenAdmissions}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-colors"
                  >
                    Request Admission Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Educational Philosophy
              </span>
              <h2 className="text-3xl font-extrabold font-serif text-slate-900">
                Progressive & Constructivist Learning Model
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                LifePrep Academy embraces progressivism—viewing the student as a whole child who learns best through active experiment, story-based inquiry, and project-based problem solving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EDUCATIONAL_PILLARS.map((pillar) => (
                <div key={pillar.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-blue-900 text-amber-300 rounded-xl flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900">{pillar.title}</h3>
                    <p className="text-xs font-semibold text-blue-900 mt-0.5">{pillar.subtitle}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'facts' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  School Accreditation & Approvals
                </h2>
                <div className="space-y-3">
                  {SCHOOL_INFO.accreditations.map((acc, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
                      <Award className="w-5 h-5 text-blue-900 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{acc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold font-serif text-slate-900">Key Institutional Profile</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-500">Established Year:</span>
                    <span className="font-bold text-slate-900">{SCHOOL_INFO.established}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-500">Institution Code (IEMIS):</span>
                    <span className="font-bold text-slate-900">2081 Report Registered</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-500">Academic Levels Offered:</span>
                    <span className="font-bold text-slate-900">ECD (Nursery, LKG, UKG) to Grade 10</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-500">School Type:</span>
                    <span className="font-bold text-slate-900">Co-Educational Day School</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-500">Location:</span>
                    <span className="font-bold text-slate-900">Lalitpur-13, Nepal</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-slate-500">Board Examination:</span>
                    <span className="font-bold text-slate-900">Grade 10 Secondary Education Examination (SEE)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
