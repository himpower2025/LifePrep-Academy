import React, { useState } from 'react';
import { X, Search, ArrowRight, BookOpen } from 'lucide-react';
import { SEARCH_INDEX } from '../../data/schoolData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: string, subTab?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? SEARCH_INDEX
    : SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectResult = (sectionId: string) => {
    // Map legacy sectionId to page & subTab
    if (sectionId === 'hero') onNavigatePage('home');
    else if (sectionId === 'head-message') onNavigatePage('about', 'principal');
    else if (sectionId === 'pillars') onNavigatePage('about', 'philosophy');
    else if (sectionId === 'academics') onNavigatePage('academics');
    else if (sectionId === 'facilities') onNavigatePage('campus-life', 'facilities');
    else if (sectionId === 'events') onNavigatePage('campus-life', 'news');
    else onNavigatePage('home');

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white text-slate-900 max-w-xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="p-4 bg-slate-900 flex items-center space-x-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search LPA programs, admissions, STEM labs, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Feed */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 text-xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">
            {results.length} Result{results.length !== 1 ? 's' : ''} Found
          </p>

          {results.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No matching information found. Try searching for "Admissions", "STEM", "Academics", or "Nursery".
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectResult(item.sectionId)}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
