import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Layers,
  Calendar,
  FileText,
  PenTool,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Upload,
  LogOut,
  ExternalLink,
  AlertCircle,
  Mail,
  Lock,
  ArrowRight,
  Filter,
  Check,
  X,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { PopupItem, PopupType, EventItem, NewsArticle, EducatorArticle, ArticleDivision } from '../types';
import {
  getStoredPopups,
  saveStoredPopups,
  getStoredEvents,
  saveStoredEvents,
  getStoredNews,
  saveStoredNews
} from '../data/adminStore';
import {
  getStoredArticles,
  saveStoredArticles
} from '../data/articlesData';

const ADMIN_EMAILS_STORAGE_KEY = 'lpa_allowed_admin_emails_v2';

const getStoredAllowedEmails = (): string[] => {
  try {
    const raw = localStorage.getItem(ADMIN_EMAILS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse allowed admin emails', e);
  }
  return ['rajumoktan@gmail.com'];
};

const saveStoredAllowedEmails = (emails: string[]) => {
  try {
    localStorage.setItem(ADMIN_EMAILS_STORAGE_KEY, JSON.stringify(emails));
  } catch (e) {
    console.error('Failed to save allowed admin emails', e);
  }
};

interface AdminPageProps {
  onOpenAdmissions: () => void;
  onOpenTour: () => void;
  onNavigateHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onOpenAdmissions,
  onOpenTour,
  onNavigateHome
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Authorized Admin Emails State
  const [allowedEmails, setAllowedEmails] = useState<string[]>(['rajumoktan@gmail.com']);
  const [newAdminEmailInput, setNewAdminEmailInput] = useState<string>('');

  // Active admin tab: 'popups' | 'events' | 'news' | 'articles' | 'admins'
  const [activeTab, setActiveTab] = useState<'popups' | 'events' | 'news' | 'articles' | 'admins'>('popups');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Popup Management States
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [isEditingPopup, setIsEditingPopup] = useState<boolean>(false);
  const [currentPopupForm, setCurrentPopupForm] = useState<Partial<PopupItem>>({
    popupType: 'template',
    isActive: true,
    title: '',
    tagline: 'Admissions & Open House',
    dateTime: '',
    location: '',
    targetAudience: '',
    description: '',
    ctaText: 'Apply for Admissions Online',
    ctaAction: 'admissions',
    badgeText: 'NOTICE',
    imageUrl: '',
    clickUrl: 'admissions'
  });
  const [previewPopup, setPreviewPopup] = useState<PopupItem | null>(null);

  // Events Management States
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
  const [newEventForm, setNewEventForm] = useState<Partial<EventItem>>({
    title: '',
    date: '',
    month: 'SEP',
    day: '15',
    time: '09:00 AM ~ 12:00 PM',
    location: 'LPA Campus, Lalitpur-13',
    category: 'Academics',
    description: ''
  });

  // News Management States
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [isEditingNews, setIsEditingNews] = useState<boolean>(false);
  const [newNewsForm, setNewNewsForm] = useState<Partial<NewsArticle>>({
    title: '',
    category: 'Campus Life',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: '3 min read',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80'
  });

  // Articles Management States
  const [articles, setArticles] = useState<EducatorArticle[]>([]);
  const [isEditingArticle, setIsEditingArticle] = useState<boolean>(false);
  const [newArticleForm, setNewArticleForm] = useState<Partial<EducatorArticle>>({
    title: '',
    authorName: 'Mr. Raju Moktan',
    authorRole: 'Founder & Principal',
    division: 'general',
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    tags: ['Pedagogy', 'LifePrep']
  });

  // Load stored data on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('lpa_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    setPopups(getStoredPopups());
    setEvents(getStoredEvents());
    setNewsList(getStoredNews());
    setArticles(getStoredArticles());
    setAllowedEmails(getStoredAllowedEmails());
  }, []);

  // LOGIN HANDLER
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPin = pinInput.trim();

    const currentAllowed = getStoredAllowedEmails();
    const isAllowedEmail = currentAllowed.some((e) => e.toLowerCase() === cleanEmail);

    if (!isAllowedEmail) {
      setAuthError('Unauthorized email address. Only authorized school staff can sign in.');
      return;
    }

    // Default PIN: 1234 or school default 2026
    if (cleanPin !== '1234' && cleanPin !== '2026') {
      setAuthError('Incorrect Password/PIN. Please contact the principal office.');
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem('lpa_admin_auth', 'true');
    sessionStorage.setItem('lpa_admin_email', cleanEmail);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('lpa_admin_auth');
    sessionStorage.removeItem('lpa_admin_email');
    setIsAuthenticated(false);
  };

  // ADMIN EMAILS HANDLERS
  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const target = newAdminEmailInput.trim().toLowerCase();
    if (!target || !target.includes('@')) return;

    if (allowedEmails.some((e) => e.toLowerCase() === target)) {
      alert('This email address is already granted admin permission.');
      return;
    }

    const updated = [...allowedEmails, target];
    setAllowedEmails(updated);
    saveStoredAllowedEmails(updated);
    setNewAdminEmailInput('');
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (emailToRemove.toLowerCase() === 'rajumoktan@gmail.com') {
      alert('The primary principal email cannot be removed.');
      return;
    }
    if (confirm(`Remove administrator access for: ${emailToRemove}?`)) {
      const updated = allowedEmails.filter((e) => e.toLowerCase() !== emailToRemove.toLowerCase());
      setAllowedEmails(updated);
      saveStoredAllowedEmails(updated);
    }
  };

  // POPUP ACTIONS
  const handleTogglePopupStatus = (id: string) => {
    const updated = popups.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    setPopups(updated);
    saveStoredPopups(updated);
  };

  const handleDeletePopup = (id: string) => {
    if (confirm('Are you sure you want to delete this popup?')) {
      const updated = popups.filter((p) => p.id !== id);
      setPopups(updated);
      saveStoredPopups(updated);
    }
  };

  const handleSavePopupForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPopupForm.title) {
      alert('Please enter a popup title.');
      return;
    }

    let updatedList: PopupItem[];
    if (currentPopupForm.id) {
      updatedList = popups.map((p) =>
        p.id === currentPopupForm.id ? ({ ...p, ...currentPopupForm } as PopupItem) : p
      );
    } else {
      const newItem: PopupItem = {
        id: `popup-${Date.now()}`,
        title: currentPopupForm.title || 'New Announcement',
        popupType: currentPopupForm.popupType || 'template',
        isActive: currentPopupForm.isActive ?? true,
        tagline: currentPopupForm.tagline,
        dateTime: currentPopupForm.dateTime,
        location: currentPopupForm.location,
        targetAudience: currentPopupForm.targetAudience,
        description: currentPopupForm.description,
        ctaText: currentPopupForm.ctaText,
        ctaAction: currentPopupForm.ctaAction || 'admissions',
        ctaUrl: currentPopupForm.ctaUrl,
        themeStyle: currentPopupForm.themeStyle || 'blue-gold',
        imageUrl: currentPopupForm.imageUrl,
        imageAlt: currentPopupForm.imageAlt || currentPopupForm.title,
        clickUrl: currentPopupForm.clickUrl || 'admissions',
        badgeText: currentPopupForm.badgeText || 'NOTICE',
        createdAt: new Date().toISOString()
      };
      updatedList = [newItem, ...popups];
    }

    setPopups(updatedList);
    saveStoredPopups(updatedList);
    setIsEditingPopup(false);
    resetPopupForm();
  };

  const resetPopupForm = () => {
    setCurrentPopupForm({
      popupType: 'template',
      isActive: true,
      title: '',
      tagline: 'Admissions & Open House',
      dateTime: '',
      location: '',
      targetAudience: '',
      description: '',
      ctaText: 'Apply for Admissions Online',
      ctaAction: 'admissions',
      badgeText: 'NOTICE',
      imageUrl: '',
      clickUrl: 'admissions'
    });
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPopupForm((prev) => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // EVENT ACTIONS
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventForm.title) return;

    let updated: EventItem[];
    if (newEventForm.id) {
      updated = events.map((ev) =>
        ev.id === newEventForm.id ? ({ ...ev, ...newEventForm } as EventItem) : ev
      );
    } else {
      const newItem: EventItem = {
        id: `evt-${Date.now()}`,
        title: newEventForm.title || '',
        date: newEventForm.date || '2026.08.30',
        month: (newEventForm.month || 'SEP').toUpperCase(),
        day: newEventForm.day || '15',
        time: newEventForm.time || '10:00 AM',
        location: newEventForm.location || 'LPA Campus',
        category: newEventForm.category || 'Academics',
        description: newEventForm.description || ''
      };
      updated = [newItem, ...events];
    }

    setEvents(updated);
    saveStoredEvents(updated);
    setIsEditingEvent(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setNewEventForm({
      title: '',
      date: '',
      month: 'SEP',
      day: '15',
      time: '09:00 AM ~ 12:00 PM',
      location: 'LPA Campus, Lalitpur-13',
      category: 'Academics',
      description: ''
    });
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      saveStoredEvents(updated);
    }
  };

  // NEWS ACTIONS
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsForm.title) return;

    let updated: NewsArticle[];
    if (newNewsForm.id) {
      updated = newsList.map((n) =>
        n.id === newNewsForm.id ? ({ ...n, ...newNewsForm } as NewsArticle) : n
      );
    } else {
      const newItem: NewsArticle = {
        id: `news-${Date.now()}`,
        title: newNewsForm.title || '',
        category: newNewsForm.category || 'Campus Life',
        date: newNewsForm.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: newNewsForm.readTime || '3 min read',
        excerpt: newNewsForm.excerpt || '',
        content: newNewsForm.content || '',
        image: newNewsForm.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80'
      };
      updated = [newItem, ...newsList];
    }

    setNewsList(updated);
    saveStoredNews(updated);
    setIsEditingNews(false);
    resetNewsForm();
  };

  const resetNewsForm = () => {
    setNewNewsForm({
      title: '',
      category: 'Campus Life',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: '3 min read',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80'
    });
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      const updated = newsList.filter((n) => n.id !== id);
      setNewsList(updated);
      saveStoredNews(updated);
    }
  };

  // ARTICLE ACTIONS
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title || !newArticleForm.authorName) return;

    let updated: EducatorArticle[];
    if (newArticleForm.id) {
      updated = articles.map((a) =>
        a.id === newArticleForm.id ? ({ ...a, ...newArticleForm } as EducatorArticle) : a
      );
    } else {
      const newItem: EducatorArticle = {
        id: `art-${Date.now()}`,
        title: newArticleForm.title || '',
        authorName: newArticleForm.authorName || 'Educator',
        authorRole: newArticleForm.authorRole || 'Faculty Lead',
        authorAvatar: newArticleForm.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        division: newArticleForm.division || 'general',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: `${Math.max(3, Math.ceil((newArticleForm.content || '').split(' ').length / 180))} min read`,
        summary: newArticleForm.summary || (newArticleForm.content?.slice(0, 140) + '...') || '',
        content: newArticleForm.content || '',
        coverImage: newArticleForm.coverImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        tags: newArticleForm.tags || ['Pedagogy', 'LifePrep'],
        createdAt: new Date().toISOString()
      };
      updated = [newItem, ...articles];
    }

    setArticles(updated);
    saveStoredArticles(updated);
    setIsEditingArticle(false);
    resetArticleForm();
  };

  const resetArticleForm = () => {
    setNewArticleForm({
      title: '',
      authorName: 'Mr. Raju Moktan',
      authorRole: 'Founder & Principal',
      division: 'general',
      summary: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      tags: ['Pedagogy', 'LifePrep']
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Are you sure you want to delete this faculty article?')) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
    }
  };

  // Quick stats calculations
  const activePopupsCount = popups.filter((p) => p.isActive).length;

  // Filtered lists based on search
  const filteredPopups = popups.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNews = newsList.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.division.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAdmins = allowedEmails.filter((em) =>
    em.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center space-y-6">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto text-amber-400 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Life-Prep Academy
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Administrator Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@lpanc.edu.np"
                  className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  autoFocus
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center space-x-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg shadow transition-colors"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto"
          >
            ← Return to Main Website
          </button>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN ADMIN DASHBOARD (Clean, Reader-Friendly Workspace)
  const currentAdminEmail = sessionStorage.getItem('lpa_admin_email') || emailInput || 'Admin';

  const menuItems = [
    {
      id: 'popups' as const,
      name: 'Popup Notices',
      subtitle: 'Website alert popups & posters',
      icon: Layers,
      count: popups.length,
      badge: `${activePopupsCount} Active`
    },
    {
      id: 'events' as const,
      name: 'Academic Calendar',
      subtitle: 'Exams, terms & school events',
      icon: Calendar,
      count: events.length,
      badge: `${events.length} Scheduled`
    },
    {
      id: 'news' as const,
      name: 'Campus News',
      subtitle: 'School news & press releases',
      icon: FileText,
      count: newsList.length,
      badge: `${newsList.length} Published`
    },
    {
      id: 'articles' as const,
      name: 'Faculty Columns',
      subtitle: 'Educator essays & pedagogy',
      icon: PenTool,
      count: articles.length,
      badge: `${articles.length} Articles`
    },
    {
      id: 'admins' as const,
      name: 'Staff Permissions',
      subtitle: 'Authorized administrator emails',
      icon: Users,
      count: allowedEmails.length,
      badge: `${allowedEmails.length} Authorized`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-16">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold tracking-tight text-white font-serif">Life-Prep Academy</span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">CMS Console</span>
              </div>
              <p className="text-[11px] text-slate-400">Content & Operations Center</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="font-mono text-[11px]">{currentAdminEmail}</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs bg-red-950/60 hover:bg-red-900 text-red-200 rounded-lg transition-colors flex items-center space-x-1 border border-red-800/60"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* 1. At a Glance Overview Stats Bar (Clickable to switch tab directly) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Operations Overview (Click any item to manage)
            </h2>
            <span className="text-xs text-slate-500">All data saved locally in real-time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSearchQuery('');
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-600/10'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isCurrent ? 'bg-blue-50 text-blue-900' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-sm font-extrabold text-blue-950 font-mono">{item.count}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Two-Column Layout (Sidebar Menu + Active Workspace) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Management Menu Nav (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 bg-slate-50/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Management Modules
              </span>
            </div>

            <nav className="p-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-900 text-white font-bold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                      <div className="truncate">
                        <div className="text-xs leading-none">{item.name}</div>
                        <div className={`text-[10px] mt-1 truncate ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold shrink-0 ml-2 ${
                      isSelected ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Helper Box */}
            <div className="p-3.5 m-2 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Need help?</p>
              <p className="text-[11px] text-slate-500 leading-normal">
                Changes made here appear instantly on the live website. Use the preview button to verify before visitors see it.
              </p>
            </div>
          </div>

          {/* Right Column: Content Workspace (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-4">

            {/* Workspace Header & Action Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                    {activeTab === 'popups' && 'Website Popup Notices'}
                    {activeTab === 'events' && 'Academic Calendar Events'}
                    {activeTab === 'news' && 'Campus News & Announcements'}
                    {activeTab === 'articles' && 'Faculty Columns & Articles'}
                    {activeTab === 'admins' && 'Administrator Access Control'}
                  </h1>
                  <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    {activeTab === 'popups' && `${popups.length} items`}
                    {activeTab === 'events' && `${events.length} items`}
                    {activeTab === 'news' && `${newsList.length} items`}
                    {activeTab === 'articles' && `${articles.length} items`}
                    {activeTab === 'admins' && `${allowedEmails.length} staff`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {activeTab === 'popups' && 'Control the announcement cards and promo posters that appear to site visitors.'}
                  {activeTab === 'events' && 'Manage key academic dates, term exams, sports events, and parent meetings.'}
                  {activeTab === 'news' && 'Publish school activities, achievements, press updates, and student stories.'}
                  {activeTab === 'articles' && 'Manage pedagogical columns authored by teachers across all 4 academic categories.'}
                  {activeTab === 'admins' && 'Authorized email addresses permitted to log in and make updates to the school website.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-center space-x-2 shrink-0">
                {activeTab === 'popups' && (
                  <button
                    onClick={() => {
                      resetPopupForm();
                      setIsEditingPopup(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Create Popup</span>
                  </button>
                )}

                {activeTab === 'events' && (
                  <button
                    onClick={() => {
                      resetEventForm();
                      setIsEditingEvent(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Event</span>
                  </button>
                )}

                {activeTab === 'news' && (
                  <button
                    onClick={() => {
                      resetNewsForm();
                      setIsEditingNews(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Write Article</span>
                  </button>
                )}

                {activeTab === 'articles' && (
                  <button
                    onClick={() => {
                      resetArticleForm();
                      setIsEditingArticle(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publish Column</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center space-x-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* 3. TAB SPECIFIC READER-FRIENDLY DATA VIEWS */}

            {/* TAB 1: POPUPS */}
            {activeTab === 'popups' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2">
                  <span className="col-span-5 sm:col-span-5">Notice Title & Details</span>
                  <span className="col-span-3 sm:col-span-3">Format & Type</span>
                  <span className="col-span-2 sm:col-span-2 text-center">Status</span>
                  <span className="col-span-2 sm:col-span-2 text-right">Actions</span>
                </div>

                {filteredPopups.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <Layers className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">No popups found matching your query.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredPopups.map((popup) => (
                      <div
                        key={popup.id}
                        className={`p-3.5 sm:p-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/80 transition-colors ${
                          !popup.isActive ? 'bg-slate-50/40 opacity-70' : ''
                        }`}
                      >
                        <div className="col-span-5 sm:col-span-5 space-y-1 pr-2">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 uppercase">
                              {popup.badgeText || 'NOTICE'}
                            </span>
                            <h3 className="text-xs font-bold text-slate-900 truncate">
                              {popup.title}
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            {popup.popupType === 'template'
                              ? `${popup.dateTime || 'No date set'} • ${popup.location || 'Campus'}`
                              : 'Custom Image Poster'}
                          </p>
                        </div>

                        <div className="col-span-3 sm:col-span-3">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded inline-flex items-center space-x-1 ${
                            popup.popupType === 'template'
                              ? 'bg-blue-50 text-blue-900 border border-blue-200/60'
                              : 'bg-amber-50 text-amber-900 border border-amber-200/60'
                          }`}>
                            {popup.popupType === 'template' ? (
                              <>
                                <Clock className="w-3 h-3 text-blue-700" />
                                <span>Structured Card</span>
                              </>
                            ) : (
                              <>
                                <ImageIcon className="w-3 h-3 text-amber-700" />
                                <span>Image Banner</span>
                              </>
                            )}
                          </span>
                        </div>

                        <div className="col-span-2 sm:col-span-2 text-center">
                          <button
                            onClick={() => handleTogglePopupStatus(popup.id)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors inline-flex items-center space-x-1 ${
                              popup.isActive
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                            title="Click to toggle active state on main website"
                          >
                            {popup.isActive ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-700" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 text-slate-500" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="col-span-2 sm:col-span-2 flex items-center justify-end space-x-1">
                          <button
                            onClick={() => setPreviewPopup(popup)}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded"
                            title="Preview Popup"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setCurrentPopupForm(popup);
                              setIsEditingPopup(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded"
                            title="Edit Popup"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePopup(popup.id)}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete Popup"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EVENTS */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2">
                  <span className="col-span-2 sm:col-span-2">Date</span>
                  <span className="col-span-5 sm:col-span-5">Event Title & Category</span>
                  <span className="col-span-3 sm:col-span-3">Time & Venue</span>
                  <span className="col-span-2 sm:col-span-2 text-right">Actions</span>
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <Calendar className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">No events found matching your query.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-3.5 sm:p-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="col-span-2 sm:col-span-2">
                          <div className="inline-flex flex-col items-center justify-center w-11 h-11 bg-slate-100 text-slate-900 rounded-lg border border-slate-200">
                            <span className="text-[9px] font-bold uppercase text-slate-500">{evt.month}</span>
                            <span className="text-sm font-extrabold font-serif leading-none">{evt.day}</span>
                          </div>
                        </div>

                        <div className="col-span-5 sm:col-span-5 space-y-0.5 pr-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-900">
                            {evt.category}
                          </span>
                          <h3 className="text-xs font-bold text-slate-900 truncate">
                            {evt.title}
                          </h3>
                          {evt.description && (
                            <p className="text-[11px] text-slate-500 truncate">{evt.description}</p>
                          )}
                        </div>

                        <div className="col-span-3 sm:col-span-3 text-[11px] text-slate-600 space-y-0.5">
                          <p className="truncate font-medium">{evt.time}</p>
                          <p className="text-slate-400 truncate">{evt.location}</p>
                        </div>

                        <div className="col-span-2 sm:col-span-2 flex items-center justify-end space-x-1">
                          <button
                            onClick={() => {
                              setNewEventForm(evt);
                              setIsEditingEvent(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: NEWS */}
            {activeTab === 'news' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2">
                  <span className="col-span-6 sm:col-span-6">Story Title & Excerpt</span>
                  <span className="col-span-2 sm:col-span-2">Category</span>
                  <span className="col-span-2 sm:col-span-2">Date Published</span>
                  <span className="col-span-2 sm:col-span-2 text-right">Actions</span>
                </div>

                {filteredNews.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">No school news found matching your query.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredNews.map((news) => (
                      <div
                        key={news.id}
                        className="p-3.5 sm:p-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="col-span-6 sm:col-span-6 space-y-1 pr-3">
                          <h3 className="text-xs font-bold text-slate-900 truncate">
                            {news.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {news.excerpt || news.content}
                          </p>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {news.category}
                          </span>
                        </div>

                        <div className="col-span-2 sm:col-span-2 text-[11px] text-slate-500">
                          {news.date}
                        </div>

                        <div className="col-span-2 sm:col-span-2 flex items-center justify-end space-x-1">
                          <button
                            onClick={() => {
                              setNewNewsForm(news);
                              setIsEditingNews(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded"
                            title="Edit News"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNews(news.id)}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete News"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ARTICLES */}
            {activeTab === 'articles' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2">
                  <span className="col-span-5 sm:col-span-5">Article & Subject</span>
                  <span className="col-span-3 sm:col-span-3">Educator / Author</span>
                  <span className="col-span-2 sm:col-span-2">Division</span>
                  <span className="col-span-2 sm:col-span-2 text-right">Actions</span>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <PenTool className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">No faculty articles found matching your query.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredArticles.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 sm:p-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="col-span-5 sm:col-span-5 space-y-1 pr-3">
                          <h3 className="text-xs font-bold text-slate-900 truncate">
                            {art.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {art.summary}
                          </p>
                        </div>

                        <div className="col-span-3 sm:col-span-3">
                          <p className="text-xs font-bold text-slate-800 truncate">{art.authorName}</p>
                          <p className="text-[10px] text-slate-400 truncate">{art.authorRole}</p>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                            {art.division}
                          </span>
                        </div>

                        <div className="col-span-2 sm:col-span-2 flex items-center justify-end space-x-1">
                          <button
                            onClick={() => {
                              setNewArticleForm(art);
                              setIsEditingArticle(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: ADMINS */}
            {activeTab === 'admins' && (
              <div className="space-y-4">
                {/* Grant Email Form */}
                <form
                  onSubmit={handleAddAdminEmail}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2"
                >
                  <label className="block text-xs font-bold text-slate-800">
                    Add Authorized Staff Email
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        value={newAdminEmailInput}
                        onChange={(e) => setNewAdminEmailInput(e.target.value)}
                        placeholder="e.g. staff@lpanc.edu.np"
                        className="w-full px-3.5 py-2 pl-9 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Grant Access</span>
                    </button>
                  </div>
                </form>

                {/* List of Admins */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600">
                    Registered Administrator Accounts ({allowedEmails.length})
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredAdmins.map((email) => {
                      const isMainAdmin = email.toLowerCase() === 'rajumoktan@gmail.com';
                      return (
                        <div
                          key={email}
                          className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                        >
                          <div className="flex items-center space-x-3 truncate pr-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-4 h-4 text-blue-900" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-slate-900 truncate font-mono">{email}</p>
                              <span className="text-[10px] text-slate-500 font-medium">
                                {isMainAdmin ? 'Primary Administrator (Founder)' : 'Authorized Staff Admin'}
                              </span>
                            </div>
                          </div>

                          {!isMainAdmin && (
                            <button
                              onClick={() => handleRemoveAdminEmail(email)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Revoke Permission"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. MODALS & SLIDEOVERS (Clean, Standard Form Layouts) */}

      {/* POPUP EDIT / CREATE MODAL */}
      {isEditingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {currentPopupForm.id ? 'Edit Popup Notice' : 'Create New Popup Notice'}
              </h3>
              <button
                onClick={() => setIsEditingPopup(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePopupForm} className="space-y-4 text-xs">
              {/* Type Selection */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Popup Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPopupForm((prev) => ({ ...prev, popupType: 'template' }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      currentPopupForm.popupType === 'template'
                        ? 'bg-blue-50 border-blue-900 text-blue-950 font-bold ring-1 ring-blue-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-900" />
                      <span>Card Template</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Date, location & CTA button</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPopupForm((prev) => ({ ...prev, popupType: 'image' }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      currentPopupForm.popupType === 'image'
                        ? 'bg-amber-50 border-amber-600 text-slate-950 font-bold ring-1 ring-amber-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                      <span>Image Poster</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Upload custom flyer / banner</p>
                  </button>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block font-bold text-slate-800 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentPopupForm.title || ''}
                    onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. 2026 Orientation Day"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Badge</label>
                  <input
                    type="text"
                    value={currentPopupForm.badgeText || ''}
                    onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, badgeText: e.target.value }))}
                    placeholder="NOTICE"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase"
                  />
                </div>
              </div>

              {/* Template fields */}
              {currentPopupForm.popupType === 'template' ? (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={currentPopupForm.tagline || ''}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, tagline: e.target.value }))}
                        placeholder="Admissions Open"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Date & Time</label>
                      <input
                        type="text"
                        value={currentPopupForm.dateTime || ''}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, dateTime: e.target.value }))}
                        placeholder="Sep 15, 10:00 AM"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Location</label>
                      <input
                        type="text"
                        value={currentPopupForm.location || ''}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Main Auditorium"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Target Audience</label>
                      <input
                        type="text"
                        value={currentPopupForm.targetAudience || ''}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, targetAudience: e.target.value }))}
                        placeholder="Prospective Parents"
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={currentPopupForm.description || ''}
                      onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief details about this notice..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Button Text</label>
                      <input
                        type="text"
                        value={currentPopupForm.ctaText || ''}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, ctaText: e.target.value }))}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Action on Click</label>
                      <select
                        value={currentPopupForm.ctaAction || 'admissions'}
                        onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, ctaAction: e.target.value as any }))}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      >
                        <option value="admissions">Open Admissions Form</option>
                        <option value="tour">Open Campus Tour Booking</option>
                        <option value="close">Close Popup Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Upload Image (JPG/PNG)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">Or Image Web URL</label>
                    <input
                      type="url"
                      value={currentPopupForm.imageUrl || ''}
                      onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                  {currentPopupForm.imageUrl && (
                    <div className="p-2 bg-white rounded border border-slate-200 text-center">
                      <img
                        src={currentPopupForm.imageUrl}
                        alt="Preview"
                        className="max-h-36 rounded object-contain mx-auto"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">Click Action</label>
                    <select
                      value={currentPopupForm.clickUrl || 'admissions'}
                      onChange={(e) => setCurrentPopupForm((prev) => ({ ...prev, clickUrl: e.target.value }))}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    >
                      <option value="admissions">Open Admissions Modal</option>
                      <option value="tour">Open Tour Modal</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingPopup(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVENT EDIT / CREATE MODAL */}
      {isEditingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {newEventForm.id ? 'Edit Academic Event' : 'Add Academic Event'}
              </h3>
              <button
                onClick={() => setIsEditingEvent(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEventForm.title || ''}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  placeholder="e.g. Term 2 Examination"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Month (e.g. SEP)</label>
                  <input
                    type="text"
                    value={newEventForm.month || ''}
                    onChange={(e) => setNewEventForm({ ...newEventForm, month: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Day (e.g. 15)</label>
                  <input
                    type="text"
                    value={newEventForm.day || ''}
                    onChange={(e) => setNewEventForm({ ...newEventForm, day: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={newEventForm.time || ''}
                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newEventForm.category || 'Academics'}
                    onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Academics">Academics</option>
                    <option value="Campus Life">Campus Life</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newEventForm.location || ''}
                  onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={newEventForm.description || ''}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingEvent(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS EDIT / CREATE MODAL */}
      {isEditingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {newNewsForm.id ? 'Edit School News' : 'Publish School News'}
              </h3>
              <button
                onClick={() => setIsEditingNews(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newNewsForm.title || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                  placeholder="Article headline"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newNewsForm.category || 'Campus Life'}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Campus Life">Campus Life</option>
                    <option value="Academics">Academics</option>
                    <option value="Sports">Sports</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={newNewsForm.date || ''}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Excerpt / Short Summary</label>
                <textarea
                  rows={2}
                  value={newNewsForm.excerpt || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={newNewsForm.image || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingNews(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Publish News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE EDIT / CREATE MODAL */}
      {isEditingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {newArticleForm.id ? 'Edit Faculty Article' : 'Publish Faculty Column'}
              </h3>
              <button
                onClick={() => setIsEditingArticle(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newArticleForm.title || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, title: e.target.value })}
                  placeholder="e.g. Constructivist Pedagogy in Early Years"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={newArticleForm.authorName || ''}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, authorName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={newArticleForm.authorRole || ''}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, authorRole: e.target.value })}
                    placeholder="e.g. Lead Educator"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Division</label>
                <select
                  value={newArticleForm.division || 'general'}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, division: e.target.value as ArticleDivision })}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="general">General Pedagogy</option>
                  <option value="pre-primary">Early Childhood Development (ECD)</option>
                  <option value="primary">Primary School (Grades 1–5)</option>
                  <option value="secondary">Secondary School (Grades 6–10)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt / Summary</label>
                <input
                  type="text"
                  value={newArticleForm.summary || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, summary: e.target.value })}
                  placeholder="Key takeaway..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Body / Content *</label>
                <textarea
                  required
                  rows={4}
                  value={newArticleForm.content || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, content: e.target.value })}
                  placeholder="Full text of the essay or column..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newArticleForm.coverImage || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, coverImage: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Publish Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP PREVIEW MODAL */}
      {previewPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-5 space-y-3 relative">
            <button
              onClick={() => setPreviewPopup(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
              Live Visitor Preview
            </span>

            {previewPopup.popupType === 'template' ? (
              <div className="space-y-3 pt-1">
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  {previewPopup.title}
                </h3>
                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-200">
                  <p className="font-bold text-blue-900">Date: {previewPopup.dateTime || 'TBD'}</p>
                  <p className="font-bold text-slate-800">Venue: {previewPopup.location || 'Campus'}</p>
                  <p className="text-slate-600">Audience: {previewPopup.targetAudience || 'All'}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {previewPopup.description}
                </p>
                <button className="w-full py-2 bg-blue-900 text-amber-300 font-bold text-xs rounded-lg shadow-sm">
                  {previewPopup.ctaText || 'Learn More'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <h3 className="text-sm font-bold font-serif text-slate-900">
                  {previewPopup.title}
                </h3>
                {previewPopup.imageUrl ? (
                  <img
                    src={previewPopup.imageUrl}
                    alt={previewPopup.title}
                    className="w-full max-h-72 object-contain rounded-lg bg-slate-900"
                  />
                ) : (
                  <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">
                    No image uploaded
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
