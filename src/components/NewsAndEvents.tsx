import React, { useState } from 'react';
import { LATEST_NEWS, UPCOMING_EVENTS } from '../data/schoolData';
import { NewsCategory, NewsArticle, EventItem } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Newspaper,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Tag
} from 'lucide-react';

interface NewsAndEventsProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
}

export const NewsAndEvents: React.FC<NewsAndEventsProps> = ({
  onOpenAdmissions,
  onOpenTour,
}) => {
  const [selectedTab, setSelectedTab] = useState<'news' | 'events'>('news');
  const [newsCategory, setNewsCategory] = useState<NewsCategory>('All');
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories: NewsCategory[] = ['All', 'Academics', 'Campus Life', 'Sports & Arts', 'Admissions'];

  const filteredNews = newsCategory === 'All'
    ? LATEST_NEWS
    : LATEST_NEWS.filter((n) => n.category === newsCategory);

  const handleRegisterEvent = (eventId: string) => {
    setRegisteredEventId(eventId);
    setTimeout(() => {
      setRegisteredEventId(null);
    }, 4000);
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-900 tracking-widest uppercase bg-blue-100/80 px-3.5 py-1 rounded-full border border-blue-200">
              Community & Happenings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
              News, Events & Announcements
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Stay connected with Life-Prep Academy's academic achievements, campus events, and admissions updates.
            </p>
          </div>

          {/* Toggle Tab Switcher */}
          <div className="inline-flex bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/80 shrink-0">
            <button
              onClick={() => setSelectedTab('news')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTab === 'news'
                  ? 'bg-blue-900 text-amber-300 shadow-md'
                  : 'text-slate-700 hover:text-blue-950'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Latest News</span>
            </button>
            <button
              onClick={() => setSelectedTab('events')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTab === 'events'
                  ? 'bg-blue-900 text-amber-300 shadow-md'
                  : 'text-slate-700 hover:text-blue-950'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>School Calendar & Events</span>
            </button>
          </div>
        </div>

        {/* NEWS TAB CONTENT */}
        {selectedTab === 'news' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* News Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewsCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    newsCategory === cat
                      ? 'bg-blue-900 text-amber-300 font-extrabold shadow-sm'
                      : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 bg-slate-900 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold font-serif text-slate-900 leading-snug hover:text-blue-900 cursor-pointer" onClick={() => setSelectedArticle(article)}>
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center space-x-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB CONTENT */}
        {selectedTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {UPCOMING_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-start space-x-4">
                    {/* Date Badge */}
                    <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex flex-col items-center justify-center shrink-0 border border-blue-800 shadow-md">
                      <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                        {event.month}
                      </span>
                      <span className="text-xl font-extrabold font-serif leading-none mt-0.5">
                        {event.day}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5">
                      <span className="inline-block bg-blue-50 text-blue-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase border border-blue-200">
                        {event.category}
                      </span>
                      <h3 className="text-base font-bold font-serif text-slate-900">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-blue-700" />
                          <span>{event.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-700" />
                          <span>{event.location}</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                    {registeredEventId === event.id ? (
                      <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Registered!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegisterEvent(event.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-1"
                      >
                        <span>RSVP / Register</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
              <div className="relative h-64 bg-slate-900">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-900"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
                <div className="flex items-center space-x-2 text-xs text-amber-700 font-bold uppercase">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  {selectedArticle.title}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedArticle.content}
                </p>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
