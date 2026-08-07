import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  Calendar,
  FileText,
  Sparkles,
  Upload,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { PopupItem, PopupType, EventItem, NewsArticle } from '../types';
import {
  getStoredPopups,
  saveStoredPopups,
  getStoredEvents,
  saveStoredEvents,
  getStoredNews,
  saveStoredNews
} from '../data/adminStore';

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

  // Active admin tab: 'popups' | 'events' | 'news' | 'admins'
  const [activeTab, setActiveTab] = useState<'popups' | 'events' | 'news' | 'admins'>('popups');

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
    month: 'AUG',
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

  // Load stored data
  useEffect(() => {
    // Check session auth
    const savedAuth = sessionStorage.getItem('lpa_admin_authed');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    setAllowedEmails(getStoredAllowedEmails());
    setPopups(getStoredPopups());
    setEvents(getStoredEvents());
    setNewsList(getStoredNews());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setAuthError('Please enter a valid administrator email address.');
      return;
    }

    // Check if entered email is authorized
    const isAuthorized = allowedEmails.some(
      (addr) => addr.trim().toLowerCase() === cleanEmail
    );

    if (!isAuthorized) {
      setAuthError(`Access denied: '${emailInput}' is not registered as an authorized administrator.`);
      return;
    }

    if (!pinInput || pinInput.trim().length < 4) {
      setAuthError('Please enter a password (at least 4 characters).');
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem('lpa_admin_authed', 'true');
    sessionStorage.setItem('lpa_admin_email', cleanEmail);
    setAuthError('');
  };

  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail = newAdminEmailInput.trim().toLowerCase();
    if (!newEmail || !newEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (allowedEmails.some((addr) => addr.toLowerCase() === newEmail)) {
      alert('This email address is already registered as an administrator.');
      return;
    }

    const updated = [...allowedEmails, newEmail];
    setAllowedEmails(updated);
    saveStoredAllowedEmails(updated);
    setNewAdminEmailInput('');
    alert(`Administrator access granted to ${newEmail}`);
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (allowedEmails.length <= 1) {
      alert('At least one administrator email must remain in the system.');
      return;
    }

    if (confirm(`Are you sure you want to revoke admin access for ${emailToRemove}?`)) {
      const updated = allowedEmails.filter(
        (addr) => addr.toLowerCase() !== emailToRemove.toLowerCase()
      );
      setAllowedEmails(updated);
      saveStoredAllowedEmails(updated);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lpa_admin_authed');
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
      // Edit
      updatedList = popups.map((p) =>
        p.id === currentPopupForm.id ? ({ ...p, ...currentPopupForm } as PopupItem) : p
      );
    } else {
      // Create
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

  // Image Upload Handler (Converts uploaded JPG/PNG file to DataURL)
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

    const newItem: EventItem = {
      id: `evt-${Date.now()}`,
      title: newEventForm.title || '',
      date: newEventForm.date || '2026.08.30',
      month: newEventForm.month || 'AUG',
      day: newEventForm.day || '30',
      time: newEventForm.time || '10:00 AM',
      location: newEventForm.location || 'LPA Campus',
      category: newEventForm.category || 'Academics',
      description: newEventForm.description || ''
    };

    const updated = [newItem, ...events];
    setEvents(updated);
    saveStoredEvents(updated);
    setIsEditingEvent(false);
    setNewEventForm({
      title: '',
      date: '',
      month: 'AUG',
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

    const newItem: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newNewsForm.title || '',
      category: newNewsForm.category || 'Campus Life',
      date: newNewsForm.date || 'August 2026',
      readTime: '3 min read',
      excerpt: newNewsForm.excerpt || '',
      content: newNewsForm.content || '',
      image: newNewsForm.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80'
    };

    const updated = [newItem, ...newsList];
    setNewsList(updated);
    saveStoredNews(updated);
    setIsEditingNews(false);
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

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-100 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Life-Prep Academy
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              School Administrator Portal (Admin Control Center)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@lpanc.edu.np"
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  autoFocus
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center space-x-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <button
            onClick={onNavigateHome}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            ← Back to Main Website
          </button>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Admin Header Bar */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  School Administrator Center
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Active ({sessionStorage.getItem('lpa_admin_email') || emailInput || 'Admin'})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage popup notices, academic calendar events, and campus news in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            >
              View Main Site
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900/80 hover:bg-red-800 text-red-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap bg-white p-2 rounded-2xl shadow border border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab('popups')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'popups'
                ? 'bg-blue-900 text-amber-300 shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Popups & Notices ({popups.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'events'
                ? 'bg-blue-900 text-amber-300 shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Academic Calendar ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'news'
                ? 'bg-blue-900 text-amber-300 shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>School News & Updates ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'admins'
                ? 'bg-blue-900 text-amber-300 shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Admin Accounts ({allowedEmails.length})</span>
          </button>
        </div>

        {/* TAB 1: POPUPS MANAGEMENT */}
        {activeTab === 'popups' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                    Main Website Popup Notices
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Create and control popup notices displayed to visitors on the main website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    resetPopupForm();
                    setIsEditingPopup(true);
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Popup</span>
                </button>
              </div>

              {/* Active Popups Grid / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popups.map((popup) => (
                  <div
                    key={popup.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      popup.isActive
                        ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-900/10'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            popup.popupType === 'template'
                              ? 'bg-blue-50 text-blue-900 border-blue-200'
                              : 'bg-amber-50 text-amber-900 border-amber-200'
                          }`}
                        >
                          {popup.popupType === 'template' ? 'Structured Card Format' : 'Custom Image / Poster'}
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTogglePopupStatus(popup.id)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center space-x-1 transition-colors ${
                              popup.isActive
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                            }`}
                          >
                            {popup.isActive ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                                <span>Disabled</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {popup.title}
                      </h3>

                      {popup.popupType === 'template' ? (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                          {popup.dateTime && (
                            <p className="flex items-center space-x-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                              <span>Date & Time: {popup.dateTime}</span>
                            </p>
                          )}
                          {popup.location && (
                            <p className="flex items-center space-x-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>Location: {popup.location}</span>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-36 bg-slate-900">
                          {popup.imageUrl ? (
                            <img
                              src={popup.imageUrl}
                              alt={popup.title}
                              className="w-full h-36 object-contain"
                            />
                          ) : (
                            <div className="h-28 flex items-center justify-center text-xs text-slate-400">
                              No Image Uploaded
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                      <button
                        onClick={() => setPreviewPopup(popup)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg flex items-center space-x-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-900" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setCurrentPopupForm(popup);
                            setIsEditingPopup(true);
                          }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold rounded-lg flex items-center space-x-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePopup(popup.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-bold rounded-lg flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDIT / CREATE POPUP FORM MODAL */}
            {isEditingPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 my-auto">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold font-serif text-slate-900">
                      {currentPopupForm.id ? 'Edit Popup Notice' : 'Create New Popup Notice'}
                    </h3>
                    <button
                      onClick={() => setIsEditingPopup(false)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-800"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePopupForm} className="space-y-6 text-xs sm:text-sm">
                    {/* TYPE SELECTOR */}
                    <div>
                      <label className="block font-bold text-slate-800 mb-2">
                        Select Popup Format
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPopupForm((prev) => ({ ...prev, popupType: 'template' }))
                          }
                          className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                            currentPopupForm.popupType === 'template'
                              ? 'bg-blue-50 border-blue-900 ring-2 ring-blue-900/20 text-blue-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-900" />
                            <span className="font-bold">1. Structured Card Template</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-normal">
                            Include date, location, target audience, and action button
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPopupForm((prev) => ({ ...prev, popupType: 'image' }))
                          }
                          className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                            currentPopupForm.popupType === 'image'
                              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-slate-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <ImageIcon className="w-4 h-4 text-amber-600" />
                            <span className="font-bold">2. Custom Poster / Image Upload</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-normal">
                            Upload a custom promo banner image or specify an image URL
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* COMMON: Title & Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-800 mb-1">
                          Popup Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={currentPopupForm.title || ''}
                          onChange={(e) =>
                            setCurrentPopupForm((prev) => ({ ...prev, title: e.target.value }))
                          }
                          placeholder="e.g. 2026 Open House & Campus Orientation"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={currentPopupForm.badgeText || ''}
                          onChange={(e) =>
                            setCurrentPopupForm((prev) => ({ ...prev, badgeText: e.target.value }))
                          }
                          placeholder="e.g. NOTICE, IMPORTANT"
                          className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                    </div>

                    {/* TYPE 1: TEMPLATE INPUTS */}
                    {currentPopupForm.popupType === 'template' && (
                      <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Card Details</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Subtitle / Tagline
                            </label>
                            <input
                              type="text"
                              value={currentPopupForm.tagline || ''}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({ ...prev, tagline: e.target.value }))
                              }
                              placeholder="e.g. Admissions Open House"
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Event Date & Time
                            </label>
                            <input
                              type="text"
                              value={currentPopupForm.dateTime || ''}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({ ...prev, dateTime: e.target.value }))
                              }
                              placeholder="e.g. Tuesday, Aug 25, 2026 | 10:00 AM ~ 12:00 PM"
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">Location</label>
                            <input
                              type="text"
                              value={currentPopupForm.location || ''}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({ ...prev, location: e.target.value }))
                              }
                              placeholder="e.g. Main Auditorium & STEM Center"
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Target Audience
                            </label>
                            <input
                              type="text"
                              value={currentPopupForm.targetAudience || ''}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({
                                  ...prev,
                                  targetAudience: e.target.value
                                }))
                              }
                              placeholder="e.g. Nursery ~ Grade 10 Students & Parents"
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Detailed Description
                          </label>
                          <textarea
                            rows={3}
                            value={currentPopupForm.description || ''}
                            onChange={(e) =>
                              setCurrentPopupForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Provide event details..."
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Button Label
                            </label>
                            <input
                              type="text"
                              value={currentPopupForm.ctaText || ''}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({ ...prev, ctaText: e.target.value }))
                              }
                              placeholder="e.g. Apply for Admissions Online"
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Button Action
                            </label>
                            <select
                              value={currentPopupForm.ctaAction || 'admissions'}
                              onChange={(e) =>
                                setCurrentPopupForm((prev) => ({
                                  ...prev,
                                  ctaAction: e.target.value as any
                                }))
                              }
                              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                            >
                              <option value="admissions">Open Admissions Modal</option>
                              <option value="tour">Open Campus Tour Modal</option>
                              <option value="url">Open External Link</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TYPE 2: IMAGE POSTER INPUTS */}
                    {currentPopupForm.popupType === 'image' && (
                      <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                          <Upload className="w-4 h-4 text-amber-600" />
                          <span>Upload Custom Poster / Image File</span>
                        </h4>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Upload Image File from Device (JPG, PNG)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="w-full p-2 border border-slate-300 rounded-xl bg-white text-xs text-slate-600"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">
                            Preview updates automatically upon selecting a file.
                          </p>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Or Enter Image Web URL Directly
                          </label>
                          <input
                            type="url"
                            value={currentPopupForm.imageUrl || ''}
                            onChange={(e) =>
                              setCurrentPopupForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                            }
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                          />
                        </div>

                        {currentPopupForm.imageUrl && (
                          <div className="p-3 bg-white rounded-2xl border border-slate-200">
                            <span className="text-xs font-bold text-slate-700 block mb-2">
                              Uploaded Image Preview:
                            </span>
                            <img
                              src={currentPopupForm.imageUrl}
                              alt="Uploaded Preview"
                              className="max-h-48 rounded-xl object-contain mx-auto bg-slate-900"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Action on Image Click
                          </label>
                          <select
                            value={currentPopupForm.clickUrl || 'admissions'}
                            onChange={(e) =>
                              setCurrentPopupForm((prev) => ({ ...prev, clickUrl: e.target.value }))
                            }
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                          >
                            <option value="admissions">Open Admissions Modal</option>
                            <option value="tour">Open Campus Tour Modal</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setIsEditingPopup(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold rounded-xl shadow-lg"
                      >
                        Save & Publish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EVENTS MANAGEMENT */}
        {activeTab === 'events' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  Academic Calendar & School Events
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage academic events and key dates displayed on the main website.
                </p>
              </div>

              <button
                onClick={() => setIsEditingEvent(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Academic Event</span>
              </button>
            </div>

            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-900 text-amber-300 rounded-xl flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase">{evt.month}</span>
                      <span className="text-base font-extrabold font-serif leading-none">{evt.day}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded">
                        {evt.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{evt.title}</h4>
                      <p className="text-xs text-slate-500">
                        {evt.time} | {evt.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* CREATE EVENT MODAL */}
            {isEditingEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
                  <h3 className="text-lg font-bold font-serif text-slate-900">Register Academic Event</h3>
                  <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Event Name</label>
                      <input
                        type="text"
                        required
                        value={newEventForm.title}
                        onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                        placeholder="e.g. Term 2 Midterm Examinations & Conferences"
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Month (e.g. SEP)</label>
                        <input
                          type="text"
                          value={newEventForm.month}
                          onChange={(e) => setNewEventForm({ ...newEventForm, month: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl uppercase"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Day (e.g. 15)</label>
                        <input
                          type="text"
                          value={newEventForm.day}
                          onChange={(e) => setNewEventForm({ ...newEventForm, day: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Time</label>
                        <input
                          type="text"
                          value={newEventForm.time}
                          onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={newEventForm.location}
                          onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newEventForm.description}
                        onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingEvent(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl shadow"
                      >
                        Add Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  School News & Announcements
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Publish campus news, articles, and photo updates.
                </p>
              </div>

              <button
                onClick={() => setIsEditingNews(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsList.map((news) => (
                <div
                  key={news.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded">
                      {news.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{news.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{news.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-[11px] text-slate-400">{news.date}</span>
                    <button
                      onClick={() => handleDeleteNews(news.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CREATE NEWS MODAL */}
            {isEditingNews && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
                  <h3 className="text-lg font-bold font-serif text-slate-900">Publish School Article</h3>
                  <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={newNewsForm.title}
                        onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                        placeholder="Enter article title"
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Excerpt / Summary</label>
                      <textarea
                        rows={2}
                        value={newNewsForm.excerpt}
                        onChange={(e) => setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Featured Image URL</label>
                      <input
                        type="text"
                        value={newNewsForm.image}
                        onChange={(e) => setNewNewsForm({ ...newNewsForm, image: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingNews(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-900 text-white font-bold rounded-xl shadow"
                      >
                        Publish Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ADMIN ACCOUNTS MANAGEMENT */}
        {activeTab === 'admins' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  Authorized Administrator Emails
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage email addresses permitted to access this Admin Portal. Only registered emails can sign in.
                </p>
              </div>
            </div>

            {/* Grant New Admin Email Form */}
            <form onSubmit={handleAddAdminEmail} className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Grant New Admin Permission (Email Address)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={newAdminEmailInput}
                    onChange={(e) => setNewAdminEmailInput(e.target.value)}
                    placeholder="e.g. newadmin@lpanc.edu.np"
                    className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center space-x-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Admin Email</span>
                </button>
              </div>
            </form>

            {/* Admin Email List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Currently Registered Admin Accounts ({allowedEmails.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allowedEmails.map((email) => {
                  const isMainAdmin = email.toLowerCase() === 'rajumoktan@gmail.com';
                  return (
                    <div
                      key={email}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{email}</p>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {isMainAdmin ? 'Primary Administrator' : 'Authorized Administrator'}
                          </span>
                        </div>
                      </div>

                      {!isMainAdmin && (
                        <button
                          onClick={() => handleRemoveAdminEmail(email)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          title="Revoke Admin Permission"
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

        {/* PREVIEW MODAL */}
        {previewPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 relative">
              <button
                onClick={() => setPreviewPopup(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <XCircle className="w-6 h-6" />
              </button>

              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
                Live Popup Preview
              </div>

              {previewPopup.popupType === 'template' ? (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {previewPopup.title}
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 border border-slate-200">
                    <p className="font-bold text-blue-900">Date & Time: {previewPopup.dateTime}</p>
                    <p className="font-bold text-slate-800">Location: {previewPopup.location}</p>
                    <p className="text-slate-600">Audience: {previewPopup.targetAudience}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {previewPopup.description}
                  </p>
                  <button className="w-full py-3 bg-blue-900 text-amber-300 font-bold text-xs rounded-xl shadow">
                    {previewPopup.ctaText}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold font-serif text-slate-900">
                    {previewPopup.title}
                  </h3>
                  {previewPopup.imageUrl && (
                    <img
                      src={previewPopup.imageUrl}
                      alt={previewPopup.title}
                      className="w-full max-h-80 object-contain rounded-2xl bg-slate-900"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
