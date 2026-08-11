import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  PenTool,
  Filter,
  User,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  ChevronRight,
  X,
  CheckCircle,
  Share2,
  Bookmark,
  GraduationCap,
  Layers,
  Building2,
  FileText
} from 'lucide-react';
import { EducatorArticle, ArticleDivision } from '../types';
import { getStoredArticles, saveStoredArticles } from '../data/articlesData';

interface ArticlesPageProps {
  initialDivision?: string;
  onOpenAdmissions?: () => void;
  onOpenTour?: () => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  initialDivision = 'all',
  onOpenAdmissions,
  onOpenTour,
}) => {
  const [articles, setArticles] = useState<EducatorArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [selectedArticle, setSelectedArticle] = useState<EducatorArticle | null>(null);
  
  // Modal state for writing new article
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Form states for writing article
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Educator & Specialist');
  const [division, setDivision] = useState<ArticleDivision>('general');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('Pedagogy, Constructivism, LifePrep');

  useEffect(() => {
    loadArticles();
    const handleUpdate = () => loadArticles();
    window.addEventListener('articles_updated', handleUpdate);
    return () => window.removeEventListener('articles_updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (initialDivision && initialDivision !== 'all') {
      setSelectedDivision(initialDivision);
    }
  }, [initialDivision]);

  const loadArticles = () => {
    setArticles(getStoredArticles());
  };

  // Filter logic: Search by Title, Author Name, Division / Category, and Content
  const filteredArticles = articles.filter((art) => {
    // 1. Division filter
    if (selectedDivision !== 'all' && art.division !== selectedDivision) {
      return false;
    }

    // 2. Search query filter (matches Title, Content, Summary, Tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchContent = art.content.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchAuthor = art.authorName.toLowerCase().includes(q);
      const matchRole = art.authorRole.toLowerCase().includes(q);
      const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
      
      if (!matchTitle && !matchContent && !matchSummary && !matchAuthor && !matchRole && !matchTags) {
        return false;
      }
    }

    // 3. Author specific search filter
    if (authorSearch.trim()) {
      const a = authorSearch.toLowerCase();
      const matchAuthor = art.authorName.toLowerCase().includes(a);
      const matchRole = art.authorRole.toLowerCase().includes(a);
      if (!matchAuthor && !matchRole) {
        return false;
      }
    }

    return true;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !content.trim()) return;

    const newArt: EducatorArticle = {
      id: `art-${Date.now()}`,
      title: title.trim(),
      authorName: authorName.trim(),
      authorRole: authorRole.trim() || 'Faculty Educator',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      division: division,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.max(3, Math.ceil(content.split(' ').length / 180))} min read`,
      summary: summary.trim() || (content.slice(0, 150) + '...'),
      content: content.trim(),
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      featured: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newArt, ...articles];
    saveStoredArticles(updated);
    setArticles(updated);

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setWriteModalOpen(false);
      // Reset form
      setTitle('');
      setAuthorName('');
      setContent('');
      setSummary('');
      setCoverImage('');
    }, 1500);
  };

  const getDivisionBadge = (div: ArticleDivision) => {
    switch (div) {
      case 'general':
        return { label: 'General Education', color: 'bg-purple-100 text-purple-900 border-purple-200' };
      case 'pre-primary':
        return { label: 'Early Childhood (ECD)', color: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'primary':
        return { label: 'Primary Division', color: 'bg-blue-100 text-blue-900 border-blue-200' };
      case 'secondary':
        return { label: 'Secondary Division', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      default:
        return { label: 'Whole School', color: 'bg-slate-100 text-slate-900 border-slate-200' };
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header Banner */}
      <section className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl border-b border-amber-400/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Educator Insights & Academic Columns</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              LifePrep Faculty Articles
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Perspectives, pedagogical research, and educational essays authored by our dedicated teachers across Early Childhood, Primary, and Secondary divisions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setWriteModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <PenTool className="w-5 h-5" />
              <span>Write an Article</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 1. Main Search (Title / Content) */}
            <div className="md:col-span-7 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by article title, keyword, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 2. Author Name Search */}
            <div className="md:col-span-5 relative">
              <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by educator name or role..."
                value={authorSearch}
                onChange={(e) => setAuthorSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition"
              />
              {authorSearch && (
                <button
                  onClick={() => setAuthorSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 4 Division Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
              <Filter className="w-4 h-4 text-blue-900" />
              <span>Division Filter:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedDivision('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDivision === 'all'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Divisions
              </button>

              <button
                onClick={() => setSelectedDivision('general')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDivision === 'general'
                    ? 'bg-purple-900 text-white shadow-md'
                    : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                }`}
              >
                General Pedagogy
              </button>

              <button
                onClick={() => setSelectedDivision('pre-primary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDivision === 'pre-primary'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                Early Childhood (ECD)
              </button>

              <button
                onClick={() => setSelectedDivision('primary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDivision === 'primary'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                }`}
              >
                Primary School (Grades 1–5)
              </button>

              <button
                onClick={() => setSelectedDivision('secondary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDivision === 'secondary'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                Secondary School (Grades 6–10)
              </button>
            </div>
          </div>
        </div>

        {/* Featured Article Card (Shown when no active search query or when all is selected) */}
        {!searchQuery && !authorSearch && selectedDivision === 'all' && featuredArticle && (
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-3xl overflow-hidden shadow-xl border border-blue-800 grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    FEATURED COLUMN
                  </span>
                  <span className="text-xs text-amber-200/80 font-medium">
                    {featuredArticle.date}
                  </span>
                </div>

                <h2
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="text-2xl sm:text-3xl font-serif font-bold text-white hover:text-amber-300 transition cursor-pointer leading-tight"
                >
                  {featuredArticle.title}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-blue-800/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {featuredArticle.authorAvatar ? (
                    <img
                      src={featuredArticle.authorAvatar}
                      alt={featuredArticle.authorName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center border border-amber-400">
                      {featuredArticle.authorName[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white">{featuredArticle.authorName}</h4>
                    <p className="text-xs text-slate-400">{featuredArticle.authorRole}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-amber-300 px-4 py-2 rounded-xl text-xs font-bold transition border border-white/20"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>
        )}

        {/* Articles List Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-900" />
              <span>Published Columns ({filteredArticles.length})</span>
            </h3>
            {filteredArticles.length === 0 && (
              <span className="text-xs text-slate-500 font-medium">No matching articles found</span>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">No Articles Match Your Search</h4>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Try clearing your search keyword or switching category filters to view other faculty articles.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setAuthorSearch('');
                  setSelectedDivision('all');
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const badge = getDivisionBadge(article.division);
                return (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={article.coverImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border shadow-sm ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{article.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{article.readTime}</span>
                          </span>
                        </div>

                        <h3
                          onClick={() => setSelectedArticle(article)}
                          className="text-lg font-serif font-bold text-slate-900 group-hover:text-blue-900 transition line-clamp-2 cursor-pointer leading-snug"
                        >
                          {article.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    {/* Author Footer */}
                    <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        {article.authorAvatar ? (
                          <img
                            src={article.authorAvatar}
                            alt={article.authorName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                            {article.authorName[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">{article.authorName}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{article.authorRole}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-blue-900 hover:text-amber-600 text-xs font-bold inline-flex items-center space-x-1"
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FULL ARTICLE READING MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getDivisionBadge(selectedArticle.division).color}`}>
                  {getDivisionBadge(selectedArticle.division).label}
                </span>
                <span className="text-xs text-slate-400">{selectedArticle.date}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Author Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center space-x-3">
                    {selectedArticle.authorAvatar ? (
                      <img
                        src={selectedArticle.authorAvatar}
                        alt={selectedArticle.authorName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center">
                        {selectedArticle.authorName[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{selectedArticle.authorName}</h4>
                      <p className="text-xs text-slate-500">{selectedArticle.authorRole}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{selectedArticle.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {selectedArticle.coverImage && (
                <div className="rounded-2xl overflow-hidden max-h-[400px] bg-slate-100 shadow-sm">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content Paragraphs */}
              <div className="prose prose-slate max-w-none space-y-6 text-slate-800 text-base leading-relaxed font-sans">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400 mr-1" />
                  {selectedArticle.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Life Preparatory Academy Educator Column</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WRITE / PUBLISH ARTICLE MODAL FOR TEACHERS & ADMINS */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-6 bg-blue-950 text-white flex items-center justify-between border-b border-amber-400/30">
              <div className="flex items-center space-x-2">
                <PenTool className="w-5 h-5 text-amber-300" />
                <h3 className="text-lg font-serif font-bold text-white">Write a Faculty Article / Column</h3>
              </div>
              <button
                onClick={() => setWriteModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishArticle} className="p-6 sm:p-8 space-y-6">
              {publishSuccess ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold">Article Published Successfully!</h4>
                  <p className="text-xs text-emerald-700">Your column is now visible under the chosen division category.</p>
                </div>
              ) : (
                <>
                  {/* Article Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fostering Critical Inquiry in Primary Mathematics"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    />
                  </div>

                  {/* Author Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ms. Saraswati Sharma"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Author Position / Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Science Educator"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Division Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Division Category *
                    </label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value as ArticleDivision)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white font-semibold"
                    >
                      <option value="general">General Pedagogy / Whole School</option>
                      <option value="pre-primary">Early Childhood Development (ECD - Nursery to UKG)</option>
                      <option value="primary">Primary School Division (Grades 1–5)</option>
                      <option value="secondary">Secondary School Division (Grades 6–10)</option>
                    </select>
                  </div>

                  {/* Summary / Excerpt */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Short Summary / Excerpt
                    </label>
                    <input
                      type="text"
                      placeholder="A brief 1-2 sentence overview of your article"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Article Content *
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Write your article, thoughts, and educational insights here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                    ></textarea>
                  </div>

                  {/* Optional Cover Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Cover Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        Tags / Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="STEM, Pedagogy, Outdoor Learning"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setWriteModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition"
                    >
                      Publish Article
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
