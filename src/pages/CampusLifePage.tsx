import React, { useState } from 'react';
import {
  Building2,
  Cpu,
  Trophy,
  Calendar,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  BookOpen
} from 'lucide-react';
import { CAMPUS_FACILITIES, LATEST_NEWS, UPCOMING_EVENTS } from '../data/schoolData';
import { CampusFacility, NewsArticle } from '../types';

interface CampusLifePageProps {
  initialSubTab?: string;
  onSelectFacility: (facility: CampusFacility) => void;
  onOpenTour: () => void;
  onOpenAdmissions: () => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = ({
  initialSubTab = 'facilities',
  onSelectFacility,
  onOpenTour,
  onOpenAdmissions,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSubTab);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');

  const filteredNews = selectedNewsCategory === 'All'
    ? LATEST_NEWS
    : LATEST_NEWS.filter((n) => n.category === selectedNewsCategory);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-12 sm:py-16 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-semibold text-blue-100 flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">Campus Life</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Campus Life & Facilities
          </h1>

          <p className="text-sm sm:text-base text-blue-50 max-w-2xl leading-relaxed font-normal">
            Discover our modern STEM lab, computer hub, sports field, extracurricular activities, and community events in Lalitpur.
          </p>
        </div>
      </section>

      {/* Sub-tab navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-6">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'facilities'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus Facilities & STEM Hub
          </button>

          <button
            onClick={() => setActiveTab('clubs')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'clubs'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clubs, Sports & Creative Arts
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'news'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            News & Events Calendar
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'facilities' && (
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Campus Facilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Click on any facility card below to inspect full equipment details and technical specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAMPUS_FACILITIES.map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => onSelectFacility(facility)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden group space-y-4 p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                        {facility.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-blue-900 transition-colors">
                      {facility.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {facility.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Inspect Facility Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Extracurricular Clubs & Co-Curricular Growth
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                At LifePrep Academy, education extends beyond the classroom into robotics, sports, performing arts, and community leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="p-3 bg-blue-50 text-blue-900 rounded-xl w-fit">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900">STEM & Robotics Club</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students build electronic circuits, program microcontrollers, and design working prototypes for annual science expos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Athletics & Sports</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured coaching in football, basketball, badminton, and physical fitness to foster teamwork and healthy habits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Performing Arts & Drama</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Narrative drama, music ensembles, and fine arts exhibitions celebrating Nepalese heritage and creative storytelling.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-10">
            {/* Upcoming Events */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Upcoming Open House & Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {UPCOMING_EVENTS.map((evt) => (
                  <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                          {evt.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{evt.date}</span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-slate-900">{evt.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
                      <div className="text-xs text-slate-500 space-y-1 pt-1">
                        <p>📍 {evt.location}</p>
                        <p>⏰ {evt.time}</p>
                      </div>
                    </div>

                    <button
                      onClick={onOpenTour}
                      className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl border border-blue-200 transition-colors"
                    >
                      RSVP / Attend Event
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* School News */}
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                School News & Announcements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LATEST_NEWS.map((news) => (
                  <div key={news.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="relative h-48">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                        {news.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-[11px] text-slate-400 font-semibold">{news.date}</p>
                        <h3 className="text-base font-bold font-serif text-slate-900">{news.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{news.excerpt}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <p className="text-xs text-slate-700 leading-relaxed">{news.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
