import React, { useState } from 'react';
import { CAMPUS_FACILITIES } from '../data/schoolData';
import { CampusFacility } from '../types';
import { Cpu, Mountain, BookOpen, Music, Trophy, Eye, ArrowRight } from 'lucide-react';

interface CampusFacilitiesProps {
  onSelectFacility: (facility: CampusFacility) => void;
  onOpenTour: () => void;
}

export const CampusFacilities: React.FC<CampusFacilitiesProps> = ({
  onSelectFacility,
  onOpenTour,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'STEM', 'Outdoors', 'Academics', 'Arts', 'Athletics'];

  const filteredFacilities = activeCategory === 'All'
    ? CAMPUS_FACILITIES
    : CAMPUS_FACILITIES.filter((f) => f.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'STEM':
        return <Cpu className="w-4 h-4 text-sky-600" />;
      case 'Outdoors':
        return <Mountain className="w-4 h-4 text-emerald-600" />;
      case 'Academics':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'Arts':
        return <Music className="w-4 h-4 text-purple-600" />;
      case 'Athletics':
        return <Trophy className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-white text-slate-900 font-sans border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-900 tracking-widest uppercase bg-blue-100/80 px-3.5 py-1 rounded-full border border-blue-200">
            World-Class Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            Designed for Discovery & Vibrant Student Life
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our Lalitpur campus offers an inspiring blend of modern technological facilities, artistic spaces, and eco-sustainable outdoor learning environments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-900 text-amber-300 shadow-md'
                  : 'bg-slate-100 hover:bg-blue-50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => onSelectFacility(facility)}
              className="group bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-950 flex items-center space-x-1 shadow-sm">
                    {getCategoryIcon(facility.category)}
                    <span>{facility.category}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-blue-900/90 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-amber-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-blue-900 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.shortDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-blue-800 border-t border-slate-200/80 mt-2">
                <span>View Full Facility Specs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Tour Banner Callout */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold font-serif text-amber-300">
              Want to See Our Campus Firsthand?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90">
              Schedule an in-person guided tour or join our 360-degree virtual walkthrough.
            </p>
          </div>
          <button
            onClick={onOpenTour}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95 shrink-0"
          >
            Book Guided Visit
          </button>
        </div>
      </div>
    </section>
  );
};
