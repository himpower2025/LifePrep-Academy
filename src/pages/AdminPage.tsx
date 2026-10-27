import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Megaphone,
  Calendar,
  Newspaper,
  BookOpen,
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Upload,
  LogOut,
  ExternalLink,
  AlertCircle,
  Mail,
  Lock,
  ArrowRight,
  Check,
  X,
  Image as ImageIcon,
  Sparkles,
  HelpCircle,
  ChevronRight,
  Info,
  RefreshCw,
  ToggleLeft,
  ToggleRight
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

// Preset photo options to help non-technical school staff easily pick lovely school imagery
const SAMPLE_IMAGE_PRESETS = [
  { label: 'Campus & Architecture', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Science & Robotics Lab', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Classroom & Teachers', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Early Years (Play-Based)', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Library & Reading Hub', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Sports & Outdoor Athletics', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80' }
];

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
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Allowed Staff Access List
  const [allowedEmails, setAllowedEmails] = useState<string[]>(['rajumoktan@gmail.com']);
  const [newAdminEmailInput, setNewAdminEmailInput] = useState<string>('');

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<'popups' | 'events' | 'news' | 'articles' | 'admins'>('popups');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showQuickGuide, setShowQuickGuide] = useState<boolean>(true);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Popups Management
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

  // Events Management
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);
  const [newEventForm, setNewEventForm] = useState<Partial<EventItem>>({
    title: '',
    date: '2026.09.15',
    month: 'SEP',
    day: '15',
    time: '09:00 AM ~ 12:00 PM',
    location: 'LPA Campus, Lalitpur-13',
    category: 'Academics',
    description: ''
  });

  // News Management
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

  // Educator Articles Management
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

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3800);
  };

  // Sign in handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPin = pinInput.trim();

    const currentAllowed = getStoredAllowedEmails();
    const isAllowedEmail = currentAllowed.some((em) => em.toLowerCase() === cleanEmail);

    if (!isAllowedEmail) {
      setAuthError('This email is not listed on the staff access list. Please check your spelling or contact the principal.');
      return;
    }

    if (cleanPin !== '1234' && cleanPin !== '2026') {
      setAuthError('Incorrect Security PIN. School default is 1234 or 2026.');
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

  // Staff Email Access Handlers
  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const target = newAdminEmailInput.trim().toLowerCase();
    if (!target || !target.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (allowedEmails.some((em) => em.toLowerCase() === target)) {
      alert('This email address already has administrative access.');
      return;
    }

    const updated = [...allowedEmails, target];
    setAllowedEmails(updated);
    saveStoredAllowedEmails(updated);
    setNewAdminEmailInput('');
    triggerToast(`Added ${target} to authorized staff access.`);
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (emailToRemove.toLowerCase() === 'rajumoktan@gmail.com') {
      alert('The primary principal email cannot be removed to prevent lockout.');
      return;
    }
    if (window.confirm(`Revoke administrator access for ${emailToRemove}?`)) {
      const updated = allowedEmails.filter((em) => em.toLowerCase() !== emailToRemove.toLowerCase());
      setAllowedEmails(updated);
      saveStoredAllowedEmails(updated);
      triggerToast(`Removed ${emailToRemove} from staff access.`);
    }
  };

  // POPUP ACTIONS
  const handleTogglePopupStatus = (id: string) => {
    const target = popups.find((p) => p.id === id);
    const updated = popups.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    setPopups(updated);
    saveStoredPopups(updated);
    const newState = target ? !target.isActive : false;
    triggerToast(newState ? 'Notice is now LIVE on the website.' : 'Notice is now HIDDEN from the website.');
  };

  const handleDeletePopup = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      const updated = popups.filter((p) => p.id !== id);
      setPopups(updated);
      saveStoredPopups(updated);
      triggerToast('Notice deleted successfully.');
    }
  };

  const handleSavePopupForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPopupForm.title?.trim()) {
      alert('Please enter a headline or title for this notice.');
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
        title: currentPopupForm.title.trim(),
        popupType: currentPopupForm.popupType || 'template',
        isActive: currentPopupForm.isActive ?? true,
        tagline: currentPopupForm.tagline || 'Admissions & Open House',
        dateTime: currentPopupForm.dateTime || '',
        location: currentPopupForm.location || 'Life-Prep Academy Campus',
        targetAudience: currentPopupForm.targetAudience || 'Parents & Students',
        description: currentPopupForm.description || '',
        ctaText: currentPopupForm.ctaText || 'Apply for Admissions Online',
        ctaAction: currentPopupForm.ctaAction || 'admissions',
        ctaUrl: currentPopupForm.ctaUrl || '',
        themeStyle: currentPopupForm.themeStyle || 'blue-gold',
        imageUrl: currentPopupForm.imageUrl || '',
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
    triggerToast('Notice saved! It is now updated on the website.');
  };

  const resetPopupForm = () => {
    setCurrentPopupForm({
      popupType: 'template',
      isActive: true,
      title: '',
      tagline: 'Admissions & Open House',
      dateTime: '',
      location: 'Life-Prep Academy Campus, Lalitpur',
      targetAudience: 'Prospective Students & Parents',
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
    if (!newEventForm.title?.trim()) {
      alert('Please enter an event title.');
      return;
    }

    let updated: EventItem[];
    if (newEventForm.id) {
      updated = events.map((ev) =>
        ev.id === newEventForm.id ? ({ ...ev, ...newEventForm } as EventItem) : ev
      );
    } else {
      const newItem: EventItem = {
        id: `evt-${Date.now()}`,
        title: newEventForm.title.trim(),
        date: newEventForm.date || '2026.09.15',
        month: (newEventForm.month || 'SEP').toUpperCase(),
        day: newEventForm.day || '15',
        time: newEventForm.time || '10:00 AM',
        location: newEventForm.location || 'LPA Campus, Lalitpur',
        category: newEventForm.category || 'Academics',
        description: newEventForm.description || ''
      };
      updated = [newItem, ...events];
    }

    setEvents(updated);
    saveStoredEvents(updated);
    setIsEditingEvent(false);
    resetEventForm();
    triggerToast('School event saved successfully.');
  };

  const resetEventForm = () => {
    setNewEventForm({
      title: '',
      date: '2026.09.15',
      month: 'SEP',
      day: '15',
      time: '09:00 AM ~ 12:00 PM',
      location: 'LPA Campus, Lalitpur-13',
      category: 'Academics',
      description: ''
    });
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to remove this school event?')) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      saveStoredEvents(updated);
      triggerToast('Event deleted.');
    }
  };

  // NEWS ACTIONS
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsForm.title?.trim()) {
      alert('Please enter a headline for this news story.');
      return;
    }

    let updated: NewsArticle[];
    if (newNewsForm.id) {
      updated = newsList.map((n) =>
        n.id === newNewsForm.id ? ({ ...n, ...newNewsForm } as NewsArticle) : n
      );
    } else {
      const newItem: NewsArticle = {
        id: `news-${Date.now()}`,
        title: newNewsForm.title.trim(),
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
    triggerToast('Campus news article published.');
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
    if (window.confirm('Are you sure you want to delete this news article?')) {
      const updated = newsList.filter((n) => n.id !== id);
      setNewsList(updated);
      saveStoredNews(updated);
      triggerToast('News article deleted.');
    }
  };

  // ARTICLE ACTIONS
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title?.trim() || !newArticleForm.authorName?.trim()) {
      alert('Please provide both an article title and author name.');
      return;
    }

    let updated: EducatorArticle[];
    if (newArticleForm.id) {
      updated = articles.map((a) =>
        a.id === newArticleForm.id ? ({ ...a, ...newArticleForm } as EducatorArticle) : a
      );
    } else {
      const newItem: EducatorArticle = {
        id: `art-${Date.now()}`,
        title: newArticleForm.title.trim(),
        authorName: newArticleForm.authorName.trim(),
        authorRole: newArticleForm.authorRole || 'Faculty Educator',
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
    triggerToast('Faculty column updated.');
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
    if (window.confirm('Are you sure you want to delete this faculty column?')) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      triggerToast('Article deleted.');
    }
  };

  // Counts
  const activePopupsCount = popups.filter((p) => p.isActive).length;

  // Search filter
  const filteredPopups = popups.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()))
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

  // 1. SIGN IN SCREEN (Warm, friendly, accessible)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-100 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full">
              Staff & Administrator Portal
            </span>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mt-2">
              Life-Prep Academy
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Easy, safe website management for teachers and school staff
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                School Staff Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="rajumoktan@gmail.com"
                  className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  autoFocus
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Default authorized email is <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">rajumoktan@gmail.com</code>
              </p>
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
                  placeholder="Default PIN: 1234 or 2026"
                  className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Enter the school staff PIN: <strong className="text-slate-600">1234</strong> or <strong className="text-slate-600">2026</strong>
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center space-x-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>Sign In to Admin Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onNavigateHome}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 underline inline-flex items-center space-x-1"
            >
              <span>← Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN ADMIN DASHBOARD (Reader-Friendly, Intuitive, No Developer Jargon)
  const currentAdminEmail = sessionStorage.getItem('lpa_admin_email') || emailInput || 'Staff Member';

  const menuSections = [
    {
      id: 'popups' as const,
      title: 'Homepage Notices & Popups',
      description: 'Announcement posters and alert popups shown to visitors on the website',
      icon: Megaphone,
      count: popups.length,
      statusLabel: `${activePopupsCount} Live on Website`,
      statusColor: activePopupsCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600',
      actionLabel: '+ Add Notice',
      onAction: () => {
        resetPopupForm();
        setIsEditingPopup(true);
      }
    },
    {
      id: 'events' as const,
      title: 'School Events & Calendar',
      description: 'Exam schedules, term dates, sports days, and parent-teacher meetings',
      icon: Calendar,
      count: events.length,
      statusLabel: `${events.length} Scheduled`,
      statusColor: 'bg-blue-100 text-blue-900',
      actionLabel: '+ Add Event',
      onAction: () => {
        resetEventForm();
        setIsEditingEvent(true);
      }
    },
    {
      id: 'news' as const,
      title: 'School News & Stories',
      description: 'Student achievements, campus activities, awards, and community updates',
      icon: Newspaper,
      count: newsList.length,
      statusLabel: `${newsList.length} Published`,
      statusColor: 'bg-indigo-100 text-indigo-900',
      actionLabel: '+ Write Story',
      onAction: () => {
        resetNewsForm();
        setIsEditingNews(true);
      }
    },
    {
      id: 'articles' as const,
      title: 'Teacher Insights & Columns',
      description: 'Pedagogical essays and thought leadership authored by Life-Prep educators',
      icon: BookOpen,
      count: articles.length,
      statusLabel: `${articles.length} Columns`,
      statusColor: 'bg-amber-100 text-amber-900',
      actionLabel: '+ New Article',
      onAction: () => {
        resetArticleForm();
        setIsEditingArticle(true);
      }
    },
    {
      id: 'admins' as const,
      title: 'Authorized Staff Access',
      description: 'Manage which teacher and staff emails are allowed to sign in and update the site',
      icon: Users,
      count: allowedEmails.length,
      statusLabel: `${allowedEmails.length} Authorized`,
      statusColor: 'bg-slate-100 text-slate-700',
      actionLabel: 'Manage Access',
      onAction: () => {
        setActiveTab('admins');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Toast Feedback Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{feedbackToast}</span>
          <button
            onClick={() => setFeedbackToast(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-950 text-amber-400 rounded-xl flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold font-serif text-slate-900">Life-Prep Academy</span>
                <span className="text-[11px] bg-blue-50 text-blue-900 font-semibold px-2 py-0.5 rounded-md border border-blue-100">
                  School Staff Manager
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Simple, friendly website updates</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-600 truncate max-w-[200px]">{currentAdminEmail}</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1.5 border border-slate-200"
              title="Preview how visitors see the website"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-1 border border-red-200"
              title="Log out of administrator account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* Welcome & Confidence Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-800/60 px-3 py-1 rounded-full text-xs font-medium text-amber-300 mb-2 border border-blue-700/50">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome back to Life-Prep Website Manager</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif">
                Everything you update here updates the website right away.
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
                No technical skills required! Simply choose a section below, edit the text or dates, and click Save.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowQuickGuide(!showQuickGuide)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 backdrop-blur-xs border border-white/20"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>{showQuickGuide ? 'Hide 3-Step Guide' : 'Show 3-Step Guide'}</span>
              </button>
            </div>
          </div>

          {/* Collapsible 3-Step Guide */}
          {showQuickGuide && (
            <div className="mt-5 pt-5 border-t border-blue-800/60 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-950/70 p-3.5 rounded-xl border border-blue-800/60 text-xs">
                <div className="flex items-center space-x-2 font-bold text-amber-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[11px] text-white">1</span>
                  <span>Select Any Section</span>
                </div>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  Click on Homepage Notices, School Events, Campus News, or Teacher Columns to view your content.
                </p>
              </div>

              <div className="bg-blue-950/70 p-3.5 rounded-xl border border-blue-800/60 text-xs">
                <div className="flex items-center space-x-2 font-bold text-amber-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[11px] text-white">2</span>
                  <span>Edit with Live Preview</span>
                </div>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  Type your changes. You will see an instant visual preview of exactly what parents and students will see.
                </p>
              </div>

              <div className="bg-blue-950/70 p-3.5 rounded-xl border border-blue-800/60 text-xs">
                <div className="flex items-center space-x-2 font-bold text-amber-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[11px] text-white">3</span>
                  <span>Toggle Live or Hidden</span>
                </div>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  Click the green button to show or hide items on the public website at any time. You are always in control!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 1. At-a-Glance Big Friendly Action Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              School Website Modules (Click any card to open)
            </h2>
            <span className="text-xs text-slate-400">All changes save instantly to your browser</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {menuSections.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSearchQuery('');
                  }}
                  className={`cursor-pointer text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${isCurrent ? 'bg-blue-900 text-amber-400' : 'bg-slate-100 text-slate-700'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                        {item.statusLabel}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 font-serif leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 font-mono">
                      {item.count} {item.count === 1 ? 'item' : 'items'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(item.id);
                        item.onAction();
                      }}
                      className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <span>{item.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Workspace Tabs & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            {/* Tab navigation pills */}
            <div className="flex flex-wrap gap-2">
              {menuSections.map((sec) => {
                const Icon = sec.icon;
                const isSelected = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveTab(sec.id);
                      setSearchQuery('');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-blue-950 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{sec.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-blue-900 text-amber-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick action button for active tab */}
            <div className="shrink-0">
              {activeTab === 'popups' && (
                <button
                  onClick={() => {
                    resetPopupForm();
                    setIsEditingPopup(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Create New Popup Notice</span>
                </button>
              )}
              {activeTab === 'events' && (
                <button
                  onClick={() => {
                    resetEventForm();
                    setIsEditingEvent(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Schedule New Event</span>
                </button>
              )}
              {activeTab === 'news' && (
                <button
                  onClick={() => {
                    resetNewsForm();
                    setIsEditingNews(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Write News Story</span>
                </button>
              )}
              {activeTab === 'articles' && (
                <button
                  onClick={() => {
                    resetArticleForm();
                    setIsEditingArticle(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Publish Faculty Column</span>
                </button>
              )}
            </div>
          </div>

          {/* Search bar with helpful counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items by title, category, date, or keyword..."
                className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium shrink-0 flex items-center space-x-2">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {activeTab === 'popups' && 'Popups display in the center of the homepage when visitors arrive.'}
                {activeTab === 'events' && 'Events appear in the Upcoming Events calendar on the homepage.'}
                {activeTab === 'news' && 'News appears in the Latest Campus News section and news feed.'}
                {activeTab === 'articles' && 'Faculty essays appear in the Teacher Perspectives & Columns page.'}
                {activeTab === 'admins' && 'Only verified staff emails listed here can sign in to this portal.'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. CONTENT AREA FOR ACTIVE TAB */}

        {/* TAB 1: HOMEPAGE POPUPS */}
        {activeTab === 'popups' && (
          <div className="space-y-4">
            {filteredPopups.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Megaphone className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No notice popups found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery ? 'Try clearing your search query to see all popups.' : 'Create an announcement popup to notify parents and students of upcoming events or admissions.'}
                </p>
                <button
                  onClick={() => {
                    resetPopupForm();
                    setIsEditingPopup(true);
                  }}
                  className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold"
                >
                  + Create First Notice
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPopups.map((popup) => (
                  <div
                    key={popup.id}
                    className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
                      popup.isActive
                        ? 'border-emerald-300 ring-1 ring-emerald-400/20'
                        : 'border-slate-200 opacity-80 bg-slate-50/50'
                    }`}
                  >
                    <div>
                      {/* Status header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            popup.isActive
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {popup.isActive ? '● Live on Website' : '○ Hidden / Draft'}
                          </span>
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {popup.popupType === 'template' ? 'Card Notice' : 'Image Poster'}
                          </span>
                        </div>

                        {/* Direct Toggle */}
                        <button
                          onClick={() => handleTogglePopupStatus(popup.id)}
                          className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors flex items-center space-x-1 ${
                            popup.isActive
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                          }`}
                          title="Click to toggle whether this popup shows on the public website"
                        >
                          {popup.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-emerald-600" />
                              <span>Showing Live</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-slate-400" />
                              <span>Currently Hidden</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Content Preview */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {popup.badgeText || 'NOTICE'}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 font-serif leading-snug">
                          {popup.title}
                        </h3>
                        {popup.tagline && (
                          <p className="text-xs text-blue-900 font-medium">
                            {popup.tagline}
                          </p>
                        )}
                        {popup.dateTime && (
                          <div className="flex items-center space-x-1.5 text-xs text-slate-600 pt-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{popup.dateTime}</span>
                          </div>
                        )}
                        {popup.location && (
                          <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{popup.location}</span>
                          </div>
                        )}
                        {popup.description && (
                          <p className="text-xs text-slate-500 pt-1 line-clamp-2 leading-relaxed">
                            {popup.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setPreviewPopup(popup)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview As Visitor</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setCurrentPopupForm(popup);
                            setIsEditingPopup(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-blue-950 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeletePopup(popup.id)}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACADEMIC EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No scheduled events found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Add key academic dates, term exams, holidays, sports meets, or parent orientation sessions.
                </p>
                <button
                  onClick={() => {
                    resetEventForm();
                    setIsEditingEvent(true);
                  }}
                  className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold"
                >
                  + Add First Event
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {filteredEvents.map((evt) => (
                  <div key={evt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Date Badge */}
                      <div className="w-14 h-14 bg-blue-50 border border-blue-200 text-blue-950 rounded-xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{evt.month}</span>
                        <span className="text-lg font-black font-serif leading-none">{evt.day}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {evt.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{evt.date}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                          {evt.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{evt.time}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{evt.location}</span>
                          </span>
                        </div>
                        {evt.description && (
                          <p className="text-xs text-slate-600 pt-1 line-clamp-1 max-w-2xl">{evt.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setNewEventForm(evt);
                          setIsEditingEvent(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-blue-950 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete event"
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

        {/* TAB 3: CAMPUS NEWS */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            {filteredNews.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No news articles found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Publish a story celebrating student achievements, campus updates, or science exhibitions.
                </p>
                <button
                  onClick={() => {
                    resetNewsForm();
                    setIsEditingNews(true);
                  }}
                  className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold"
                >
                  + Write First Story
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNews.map((news) => (
                  <div key={news.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                    <div>
                      {news.image && (
                        <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-slate-100">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {news.category}
                        </span>
                        <span className="text-xs text-slate-400">{news.date}</span>
                        <span className="text-xs text-slate-400">• {news.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-serif leading-snug line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                        {news.excerpt || news.content}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Published on school website</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setNewNewsForm(news);
                            setIsEditingNews(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-blue-950 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteNews(news.id)}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete news story"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FACULTY ARTICLES & PERSPECTIVES */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No educator columns found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Publish essays, pedagogical insights, or letters from the Principal or department heads.
                </p>
                <button
                  onClick={() => {
                    resetArticleForm();
                    setIsEditingArticle(true);
                  }}
                  className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold"
                >
                  + Add First Article
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((art) => (
                  <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 uppercase">
                          {art.division}
                        </span>
                        <span className="text-xs text-slate-400">{art.date}</span>
                        <span className="text-xs text-slate-400">• {art.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-3xl leading-relaxed">
                        {art.summary || art.content}
                      </p>
                      <div className="text-xs text-slate-700 font-medium pt-1">
                        By <strong className="text-slate-900">{art.authorName}</strong> ({art.authorRole})
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setNewArticleForm(art);
                          setIsEditingArticle(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-blue-950 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete article"
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

        {/* TAB 5: AUTHORIZED STAFF PERMISSIONS */}
        {activeTab === 'admins' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-5 h-5 text-blue-900" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  Authorized Staff Access Management
                </h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                Anyone whose email is listed below can log in to this portal using their email and the school PIN (1234 or 2026).
                To give a teacher or administrator access, simply type their email below.
              </p>
            </div>

            {/* Add new email form */}
            <form onSubmit={handleAddAdminEmail} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
              <div className="relative flex-1 w-full">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={newAdminEmailInput}
                  onChange={(e) => setNewAdminEmailInput(e.target.value)}
                  placeholder="teacher@lpanc.edu.np"
                  className="w-full text-xs pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Authorize New Staff Email</span>
              </button>
            </form>

            {/* List of current staff */}
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 flex items-center justify-between">
                <span>Authorized Staff Email Address</span>
                <span>Permissions & Action</span>
              </div>
              {filteredAdmins.map((adminEmail) => {
                const isPrimary = adminEmail.toLowerCase() === 'rajumoktan@gmail.com';
                return (
                  <div key={adminEmail} className="px-4 py-3 flex items-center justify-between text-xs hover:bg-slate-50/50">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                        {adminEmail.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 font-mono text-[13px]">{adminEmail}</div>
                        <div className="text-[11px] text-slate-400">
                          {isPrimary ? 'Principal / Primary System Admin' : 'Authorized Academic Staff'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Active Access
                      </span>
                      {!isPrimary && (
                        <button
                          onClick={() => handleRemoveAdminEmail(adminEmail)}
                          className="px-2.5 py-1 text-[11px] font-bold text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        >
                          Revoke Access
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL 1: ADD / EDIT POPUP NOTICE (With Real-Time Visual Live Preview)
      ======================================================== */}
      {isEditingPopup && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-blue-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">
                    {currentPopupForm.id ? 'Edit Homepage Notice' : 'Create New Homepage Notice'}
                  </h3>
                  <p className="text-xs text-blue-200">
                    Follow the simple fields below. A real-time preview appears on the right.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingPopup(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Split view (Form on left, Real-Time Preview on right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* Form Controls (col-span-7) */}
              <form onSubmit={handleSavePopupForm} className="lg:col-span-7 p-5 sm:p-6 space-y-4">
                {/* 1. Format Switch */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Notice Format Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPopupForm({ ...currentPopupForm, popupType: 'template' })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentPopupForm.popupType === 'template'
                          ? 'border-blue-700 bg-blue-50/70 text-blue-950 ring-2 ring-blue-600/10 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-800" />
                        <span>Formatted Card</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Structured headline, date, venue, and action button
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentPopupForm({ ...currentPopupForm, popupType: 'image' })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentPopupForm.popupType === 'image'
                          ? 'border-blue-700 bg-blue-50/70 text-blue-950 ring-2 ring-blue-600/10 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center space-x-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
                        <span>Graphic Poster Flyer</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Upload or link an event flyer or poster image
                      </p>
                    </button>
                  </div>
                </div>

                {/* 2. Live Switch */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Publish Status</div>
                    <p className="text-[11px] text-slate-500">Should this notice appear on the website immediately?</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPopupForm({ ...currentPopupForm, isActive: !currentPopupForm.isActive })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                      currentPopupForm.isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {currentPopupForm.isActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Yes, Show Live</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Save as Hidden Draft</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notice Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentPopupForm.title || ''}
                    onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, title: e.target.value })}
                    placeholder="e.g. 2026–2027 Parents Orientation & Campus Tour"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                {/* Badge Tag */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Top Label Tag
                    </label>
                    <input
                      type="text"
                      value={currentPopupForm.badgeText || ''}
                      onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, badgeText: e.target.value.toUpperCase() })}
                      placeholder="e.g. NOTICE, ADMISSIONS, OPEN HOUSE"
                      className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tagline / Occasion
                    </label>
                    <input
                      type="text"
                      value={currentPopupForm.tagline || ''}
                      onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, tagline: e.target.value })}
                      placeholder="e.g. Fall 2026 Admissions Open"
                      className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                {/* If Template Type */}
                {currentPopupForm.popupType === 'template' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Date & Time
                        </label>
                        <input
                          type="text"
                          value={currentPopupForm.dateTime || ''}
                          onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, dateTime: e.target.value })}
                          placeholder="e.g. Tuesday, Aug 25 | 10:00 AM ~ 12:00 PM"
                          className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Location / Venue
                        </label>
                        <input
                          type="text"
                          value={currentPopupForm.location || ''}
                          onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, location: e.target.value })}
                          placeholder="e.g. Main Auditorium, LPA Campus"
                          className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        value={currentPopupForm.targetAudience || ''}
                        onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, targetAudience: e.target.value })}
                        placeholder="e.g. Prospective Nursery to Grade 10 Parents"
                        className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Notice Details & Message
                      </label>
                      <textarea
                        rows={3}
                        value={currentPopupForm.description || ''}
                        onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, description: e.target.value })}
                        placeholder="Explain what parents or students need to know..."
                        className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Action Button Label
                        </label>
                        <input
                          type="text"
                          value={currentPopupForm.ctaText || ''}
                          onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, ctaText: e.target.value })}
                          placeholder="e.g. Apply for Admissions Online"
                          className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Where does the button take visitors?
                        </label>
                        <select
                          value={currentPopupForm.ctaAction || 'admissions'}
                          onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, ctaAction: e.target.value as any })}
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                        >
                          <option value="admissions">Open Online Admissions Application</option>
                          <option value="tour">Open Campus Tour Booking Form</option>
                          <option value="url">External Web Link</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  /* If Image Poster Type */
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Poster Image Link (URL) or Upload
                      </label>
                      <input
                        type="url"
                        value={currentPopupForm.imageUrl || ''}
                        onChange={(e) => setCurrentPopupForm({ ...currentPopupForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Or upload an image from your computer:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100"
                      />
                    </div>

                    {/* Quick photo presets */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                        Quick Preset Photos:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {SAMPLE_IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setCurrentPopupForm({ ...currentPopupForm, imageUrl: preset.url })}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
                          >
                            + {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingPopup(false)}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Save & Update Notice</span>
                  </button>
                </div>
              </form>

              {/* Real-Time Live Preview Pane (col-span-5) */}
              <div className="lg:col-span-5 bg-slate-100 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                    <Eye className="w-4 h-4 text-blue-900" />
                    <span>Live Visitor Preview</span>
                  </div>

                  {/* Simulated visitor card */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 tracking-wider uppercase">
                        {currentPopupForm.badgeText || 'NOTICE'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Visitor Popup Card</span>
                    </div>

                    <h4 className="text-base font-bold font-serif text-slate-900 leading-snug">
                      {currentPopupForm.title || 'Notice Headline Appears Here'}
                    </h4>

                    {currentPopupForm.tagline && (
                      <p className="text-xs font-semibold text-blue-900">
                        {currentPopupForm.tagline}
                      </p>
                    )}

                    {currentPopupForm.popupType === 'template' ? (
                      <div className="space-y-2 pt-1 text-xs text-slate-600">
                        {currentPopupForm.dateTime && (
                          <div className="flex items-center space-x-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                            <span className="text-[11px]">{currentPopupForm.dateTime}</span>
                          </div>
                        )}
                        {currentPopupForm.location && (
                          <div className="flex items-center space-x-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                            <span className="text-[11px]">{currentPopupForm.location}</span>
                          </div>
                        )}
                        {currentPopupForm.description && (
                          <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                            {currentPopupForm.description}
                          </p>
                        )}
                        <button
                          type="button"
                          className="w-full mt-3 py-2 bg-blue-950 text-white text-xs font-bold rounded-xl shadow-xs"
                        >
                          {currentPopupForm.ctaText || 'Action Button'}
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2">
                        {currentPopupForm.imageUrl ? (
                          <img
                            src={currentPopupForm.imageUrl}
                            alt="Preview"
                            className="w-full h-44 object-cover rounded-xl"
                          />
                        ) : (
                          <div className="w-full h-44 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 space-y-1">
                            <ImageIcon className="w-8 h-8" />
                            <span className="text-xs">Poster flyer preview</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-xs">
                  <span className="font-bold">What happens when I save?</span>
                  <p className="text-[11px] text-blue-800 mt-0.5 leading-normal">
                    If "Yes, Show Live" is selected, parents opening the Life-Prep homepage will see this popup card. You can turn it off at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: ADD / EDIT ACADEMIC EVENT
      ======================================================== */}
      {isEditingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-slate-200 overflow-hidden my-auto animate-scale-in">
            <div className="p-4 sm:p-5 bg-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">
                    {newEventForm.id ? 'Edit School Calendar Event' : 'Add New School Event'}
                  </h3>
                  <p className="text-xs text-blue-200">Exams, holidays, sports meets, and parent meetings</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingEvent(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newEventForm.title || ''}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  placeholder="e.g. First Term Academic Examinations"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Month Abbreviation
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={newEventForm.month || 'SEP'}
                    onChange={(e) => setNewEventForm({ ...newEventForm, month: e.target.value.toUpperCase() })}
                    placeholder="SEP"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 uppercase font-bold text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Day Number
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={newEventForm.day || '15'}
                    onChange={(e) => setNewEventForm({ ...newEventForm, day: e.target.value })}
                    placeholder="15"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-bold text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newEventForm.category || 'Academics'}
                    onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value })}
                    className="w-full text-xs px-2 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                  >
                    <option value="Academics">Academics</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts & Music">Arts & Music</option>
                    <option value="Holiday">School Holiday</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Window
                  </label>
                  <input
                    type="text"
                    value={newEventForm.time || ''}
                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                    placeholder="e.g. 09:00 AM ~ 12:30 PM"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location / Room
                  </label>
                  <input
                    type="text"
                    value={newEventForm.location || ''}
                    onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                    placeholder="e.g. Main Examination Hall"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Description
                </label>
                <textarea
                  rows={3}
                  value={newEventForm.description || ''}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  placeholder="Key instructions or notes for students and parents..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingEvent(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Save School Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: WRITE / EDIT NEWS STORY
      ======================================================== */}
      {isEditingNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
            <div className="p-4 sm:p-5 bg-blue-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">
                    {newNewsForm.id ? 'Edit School News Story' : 'Write School News Story'}
                  </h3>
                  <p className="text-xs text-blue-200">Share highlights, student achievements, and campus updates</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingNews(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Story Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newNewsForm.title || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                  placeholder="e.g. Life-Prep Students Clinch Top Honors at Lalitpur STEM Robotics Olympiad"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    News Category
                  </label>
                  <select
                    value={newNewsForm.category || 'Campus Life'}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                  >
                    <option value="Campus Life">Campus Life</option>
                    <option value="Academics">Academics</option>
                    <option value="Sports & Arts">Sports & Arts</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={newNewsForm.readTime || '3 min read'}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, readTime: e.target.value })}
                    placeholder="3 min read"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={newNewsForm.image || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SAMPLE_IMAGE_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setNewNewsForm({ ...newNewsForm, image: p.url })}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded"
                    >
                      Use {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Summary (Excerpt)
                </label>
                <input
                  type="text"
                  value={newNewsForm.excerpt || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })}
                  placeholder="One or two sentences summarizing the news..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Article Content
                </label>
                <textarea
                  rows={5}
                  value={newNewsForm.content || ''}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, content: e.target.value })}
                  placeholder="Write the full school news story here..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed font-sans"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingNews(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Publish News Story</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: PUBLISH / EDIT FACULTY ARTICLE
      ======================================================== */}
      {isEditingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
            <div className="p-4 sm:p-5 bg-blue-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">
                    {newArticleForm.id ? 'Edit Faculty Article' : 'Publish New Faculty Article'}
                  </h3>
                  <p className="text-xs text-blue-200">Share teaching philosophies and pedagogical reflections</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingArticle(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newArticleForm.title || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, title: e.target.value })}
                  placeholder="e.g. Constructivism in Modern Education: Moving Beyond Rote Learning"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author Educator Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newArticleForm.authorName || ''}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, authorName: e.target.value })}
                    placeholder="e.g. Mr. Raju Moktan"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={newArticleForm.authorRole || ''}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, authorRole: e.target.value })}
                    placeholder="e.g. Founder & Principal"
                    className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Academic Division
                </label>
                <select
                  value={newArticleForm.division || 'general'}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, division: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                >
                  <option value="general">All-School Pedagogy (General)</option>
                  <option value="pre-primary">Early Years (Pre-Primary / ECD)</option>
                  <option value="primary">Primary Division (Grades 1–5)</option>
                  <option value="secondary">Secondary Division (Grades 6–10)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Summary
                </label>
                <textarea
                  rows={2}
                  value={newArticleForm.summary || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, summary: e.target.value })}
                  placeholder="One paragraph overview of the essay..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Essay Content
                </label>
                <textarea
                  rows={6}
                  value={newArticleForm.content || ''}
                  onChange={(e) => setNewArticleForm({ ...newArticleForm, content: e.target.value })}
                  placeholder="Write the full column or essay here..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed font-sans"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Save Faculty Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          FULL VISITOR PREVIEW MODAL FOR POPUPS
      ======================================================== */}
      {previewPopup && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 relative animate-scale-in">
            {/* Modal close */}
            <button
              onClick={() => setPreviewPopup(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center text-sm"
            >
              ✕
            </button>

            {previewPopup.popupType === 'template' ? (
              <div className="p-6 sm:p-7 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-950 px-2.5 py-1 rounded-full text-[11px] font-bold">
                  <span>{previewPopup.badgeText || 'NOTICE'}</span>
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 leading-snug">
                  {previewPopup.title}
                </h3>

                {previewPopup.tagline && (
                  <p className="text-xs font-bold text-blue-900">{previewPopup.tagline}</p>
                )}

                <div className="space-y-2 py-2 text-xs text-slate-700">
                  {previewPopup.dateTime && (
                    <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Clock className="w-4 h-4 text-blue-900 shrink-0" />
                      <span className="font-medium">{previewPopup.dateTime}</span>
                    </div>
                  )}

                  {previewPopup.location && (
                    <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-blue-900 shrink-0" />
                      <span className="font-medium">{previewPopup.location}</span>
                    </div>
                  )}
                </div>

                {previewPopup.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {previewPopup.description}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setPreviewPopup(null);
                    if (previewPopup.ctaAction === 'admissions') onOpenAdmissions();
                    else if (previewPopup.ctaAction === 'tour') onOpenTour();
                  }}
                  className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {previewPopup.ctaText || 'Apply for Admissions Online'}
                </button>
              </div>
            ) : (
              <div>
                {previewPopup.imageUrl ? (
                  <img
                    src={previewPopup.imageUrl}
                    alt={previewPopup.title}
                    className="w-full h-auto max-h-[70vh] object-cover"
                  />
                ) : (
                  <div className="p-12 text-center text-slate-400">No poster image URL specified</div>
                )}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{previewPopup.title}</span>
                  <button
                    onClick={() => setPreviewPopup(null)}
                    className="text-xs font-bold text-blue-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
