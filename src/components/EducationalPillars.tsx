import React from 'react';
import {
  Award,
  HeartHandshake,
  Mountain,
  Cpu,
  CheckCircle2,
  Compass,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EDUCATIONAL_PILLARS } from '../data/schoolData';
import outdoorLeadImg from '../assets/images/lpa_outdoor_leadership_1786005391315.jpg';

interface EducationalPillarsProps {
  onOpenTour: () => void;
  onOpenAdmissions: () => void;
}

export const EducationalPillars: React.FC<EducationalPillarsProps> = ({
  onOpenTour,
  onOpenAdmissions,
}) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'Mountain':
        return <Mountain className="w-6 h-6 text-emerald-500" />;
      case 'Cpu':
      default:
        return <Cpu className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <section id="pillars" className="py-16 sm:py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white font-sans relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-300 tracking-widest uppercase bg-amber-400/15 px-3.5 py-1 rounded-full border border-amber-300/30">
            The LPA Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Four Core Pillars of Holistic Transformation
          </h2>
          <p className="text-sm sm:text-base text-blue-50 leading-relaxed font-medium">
            At Life-Prep Academy, education goes beyond standardized test scores. Our four pillars integrate intellect, character, outdoor stewardship, and technological mastery.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDUCATIONAL_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-blue-900/70 backdrop-blur-md border border-blue-600/70 hover:border-amber-400/60 rounded-2xl p-6 space-y-4 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-950/90 rounded-xl flex items-center justify-center border border-blue-700/60">
                  {getPillarIcon(pillar.icon)}
                </div>

                <div>
                  <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    {pillar.subtitle}
                  </p>
                  <h3 className="text-xl font-bold font-serif text-white mt-1">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-blue-50 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-blue-800/80 space-y-1.5">
                {pillar.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-[11px] text-blue-50 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight Feature Card: Himalayan Outdoor Leadership Program */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-950 border border-blue-700/80 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Signature Program</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Himalayan Outdoor Leadership & Mountain Stewardship
            </h3>

            <p className="text-xs sm:text-sm text-blue-50 leading-relaxed font-normal">
              Unique to Life-Prep Academy Nepal, our outdoor leadership curriculum leverages Nepal's breathtaking terrain. Students in Middle and High School participate in guided environmental expeditions, wilderness survival skills training, and eco-service projects in the Himalayan foothills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-50">
              <div className="bg-blue-900/90 p-3.5 rounded-xl border border-blue-700/60">
                <p className="font-bold text-amber-300 mb-0.5">High-Altitude Eco Research</p>
                <p className="text-[11px] text-blue-100 font-medium">Glacial water quality monitoring and botanical cataloging.</p>
              </div>
              <div className="bg-blue-900/90 p-3.5 rounded-xl border border-blue-700/60">
                <p className="font-bold text-amber-300 mb-0.5">Wilderness First Responder</p>
                <p className="text-[11px] text-blue-100 font-medium">Certified outdoor first aid & emergency rescue protocols.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={onOpenTour}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-md"
              >
                <span>Inquire About Leadership Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[280px]">
            <img
              src={outdoorLeadImg}
              alt="Himalayan Outdoor Leadership Expedition"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06172d]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#06172d] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
