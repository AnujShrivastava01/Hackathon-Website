import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { REGISTRATION_URL, normalizeRegistrationLink } from '../constants';
import {
    LayoutDashboard,
    Calendar,
    Clock,
    HelpCircle,
    Image as ImageIcon,
    Layers,
    Settings,
    LogOut,
    Plus,
    Trash2,
    Save,
    ExternalLink,
    RefreshCw,
    Pencil,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function formatHeroCarouselForEditor(carousel) {
  if (!carousel?.length) return '';
  return carousel.map((item) => (item.caption ? `${item.url}|${item.caption}` : item.url)).join('\n');
}

function parseHeroCarouselEditor(text) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const pipe = line.indexOf('|');
      if (pipe === -1) return { url: line, caption: '' };
      return { url: line.slice(0, pipe).trim(), caption: line.slice(pipe + 1).trim() };
    })
    .filter((s) => s.url);
}

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('event');
    const [isLoading, setIsLoading] = useState(true);

    // Data States
    const [event, setEvent] = useState({ name: '', description: '', venue: '', contactEmail: '', contactPhone: '', registrationLink: '' });
    const [agendas, setAgendas] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [tracks, setTracks] = useState([]);

    // Temporary/Edit States
    const [newAgenda, setNewAgenda] = useState({ title: '', description: '', day: 1, phase: 'Day 1' });
    const [newSchedule, setNewSchedule] = useState({ time: '', activity: '', description: '', day: 1 });
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
    const [newTrack, setNewTrack] = useState({ title: '', description: '', sortOrder: 0 });
    const [heroCarouselText, setHeroCarouselText] = useState('');
    const [editingAgendaId, setEditingAgendaId] = useState(null);
    const [agendaDraft, setAgendaDraft] = useState({ title: '', description: '', day: 1, phase: '' });
    const [editingScheduleId, setEditingScheduleId] = useState(null);
    const [scheduleDraft, setScheduleDraft] = useState({ time: '', activity: '', description: '', day: 1 });
    const [editingFaqId, setEditingFaqId] = useState(null);
    const [faqDraft, setFaqDraft] = useState({ question: '', answer: '' });

    useEffect(() => {
        if (!admin) {
            navigate('/admin/login');
            return;
        }
        fetchDashboardData();
    }, [admin]);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [eRes, aRes, sRes, fRes, tRes] = await Promise.all([
                api.get('/event').catch(() => ({ data: { name: '', description: '', venue: '', contactEmail: '', contactPhone: '', registrationLink: '' } })),
                api.get('/agenda').catch(() => ({ data: [] })),
                api.get('/schedule').catch(() => ({ data: [] })),
                api.get('/faqs').catch(() => ({ data: [] })),
                api.get('/tracks').catch(() => ({ data: [] }))
            ]);
            const ev = eRes.data || { name: '', description: '', venue: '', contactEmail: '', contactPhone: '', registrationLink: '' };
            setEvent(ev);
            setHeroCarouselText(formatHeroCarouselForEditor(ev.heroCarousel));
            setAgendas(aRes.data);
            setSchedules(sRes.data);
            setFaqs(fRes.data);
            setTracks(tRes.data || []);
        } catch (err) {
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handlers ---

    // Event
    const handleEventUpdate = async (e) => {
        e.preventDefault();
        try {
            const heroCarousel = parseHeroCarouselEditor(heroCarouselText);
            const registrationLink = normalizeRegistrationLink(event.registrationLink || '');
            const payload = { ...event, heroCarousel, registrationLink };
            const { data } = await api.put('/event', payload);
            setEvent(data);
            setHeroCarouselText(formatHeroCarouselForEditor(data.heroCarousel));
            toast.success('Event details updated successfully');
        } catch (err) {
            toast.error('Failed to update event details');
        }
    };

    // Agenda
    const handleAddAgenda = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/agenda', newAgenda);
            setAgendas([...agendas, res.data]);
            setNewAgenda({ title: '', description: '', day: 1, phase: 'Day 1' });
            toast.success('Agenda item added');
        } catch (err) {
            toast.error('Failed to add agenda item');
        }
    };

    const handleDeleteAgenda = async (id) => {
        try {
            await api.delete(`/agenda/${id}`);
            setAgendas(agendas.filter(a => a._id !== id));
            if (editingAgendaId === id) setEditingAgendaId(null);
            toast.success('Agenda item removed');
        } catch (err) {
            toast.error('Failed to delete agenda item');
        }
    };

    // Schedule
    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/schedule', newSchedule);
            setSchedules([...schedules, res.data]);
            setNewSchedule({ time: '', activity: '', description: '', day: 1 });
            toast.success('Schedule item added');
        } catch (err) {
            toast.error('Failed to add schedule item');
        }
    };

    const handleDeleteSchedule = async (id) => {
        try {
            await api.delete(`/schedule/${id}`);
            setSchedules(schedules.filter(s => s._id !== id));
            if (editingScheduleId === id) setEditingScheduleId(null);
            toast.success('Schedule item removed');
        } catch (err) {
            toast.error('Failed to delete schedule item');
        }
    };

    // FAQ
    const handleAddFaq = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/faqs', newFaq);
            setFaqs([...faqs, res.data]);
            setNewFaq({ question: '', answer: '' });
            toast.success('FAQ added');
        } catch (err) {
            toast.error('Failed to add FAQ');
        }
    };

    const handleDeleteFaq = async (id) => {
        try {
            await api.delete(`/faqs/${id}`);
            setFaqs(faqs.filter(f => f._id !== id));
            if (editingFaqId === id) setEditingFaqId(null);
            toast.success('FAQ removed');
        } catch (err) {
            toast.error('Failed to delete FAQ');
        }
    };

    const handleSaveAgendaEdit = async (e) => {
        e.preventDefault();
        if (!editingAgendaId) return;
        try {
            const payload = {
                title: agendaDraft.title,
                description: agendaDraft.description,
                phase: agendaDraft.phase,
                day: Number(agendaDraft.day) || 1,
            };
            const { data } = await api.put(`/agenda/${editingAgendaId}`, payload);
            setAgendas(
                agendas.map((x) => (x._id === data._id ? data : x)).sort((a, b) => (a.day || 0) - (b.day || 0))
            );
            setEditingAgendaId(null);
            toast.success('Agenda updated');
        } catch (err) {
            toast.error('Failed to update agenda');
        }
    };

    const handleSaveScheduleEdit = async (e) => {
        e.preventDefault();
        if (!editingScheduleId) return;
        try {
            const payload = {
                time: scheduleDraft.time,
                activity: scheduleDraft.activity,
                description: scheduleDraft.description || '',
                day: Number(scheduleDraft.day) || 1,
            };
            const { data } = await api.put(`/schedule/${editingScheduleId}`, payload);
            setSchedules(
                schedules
                    .map((x) => (x._id === data._id ? data : x))
                    .sort(
                        (a, b) =>
                            (a.day || 0) - (b.day || 0) || String(a.time || '').localeCompare(String(b.time || ''))
                    )
            );
            setEditingScheduleId(null);
            toast.success('Schedule updated');
        } catch (err) {
            toast.error('Failed to update schedule');
        }
    };

    const handleSaveFaqEdit = async (e) => {
        e.preventDefault();
        if (!editingFaqId) return;
        try {
            const { data } = await api.put(`/faqs/${editingFaqId}`, {
                question: faqDraft.question,
                answer: faqDraft.answer,
            });
            setFaqs(faqs.map((x) => (x._id === data._id ? data : x)));
            setEditingFaqId(null);
            toast.success('FAQ updated');
        } catch (err) {
            toast.error('Failed to update FAQ');
        }
    };

    const handleAddTrack = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/tracks', {
                ...newTrack,
                sortOrder: Number(newTrack.sortOrder) || 0,
            });
            setTracks([...tracks, res.data].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)));
            setNewTrack({ title: '', description: '', sortOrder: 0 });
            toast.success('Track added');
        } catch (err) {
            toast.error('Failed to add track');
        }
    };

    const handleDeleteTrack = async (id) => {
        try {
            await api.delete(`/tracks/${id}`);
            setTracks(tracks.filter((t) => t._id !== id));
            toast.success('Track removed');
        } catch (err) {
            toast.error('Failed to delete track');
        }
    };

    const tabBtn = (id) =>
        `w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold border-2 transition-all ${
            activeTab === id
                ? 'bg-ink text-white border-ink shadow-neo'
                : 'text-ink/60 border-transparent bg-white hover:bg-highlight-yellow/40 hover:border-ink hover:shadow-neo-sm'
        }`;

    if (isLoading) {
        return (
            <div className="neo-page h-screen w-full flex flex-col items-center justify-center">
                <RefreshCw size={48} className="text-ink animate-spin mb-4" />
                <p className="text-ink/70 font-bold uppercase tracking-widest text-sm">Loading dashboard…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen neo-page text-ink flex">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#fff',
                        color: '#1A1A1A',
                        border: '3px solid #1A1A1A',
                        boxShadow: '4px 4px 0px 0px #1A1A1A',
                    },
                }}
            />

            <aside className="w-80 bg-white border-r-4 border-ink p-8 flex flex-col overflow-y-auto shrink-0 sticky top-0 h-screen shadow-neo">
                <div className="flex items-center space-x-3 mb-12">
                    <div className="w-11 h-11 shrink-0 rounded-full border-[3px] border-ink bg-white p-0.5 shadow-neo-sm overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="HackOcean"
                            width="44"
                            height="44"
                            className="h-full w-full rounded-full object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-heading uppercase tracking-wide">HackOcean admin</h1>
                </div>

                <nav className="flex-1 space-y-3">
                    <button type="button" onClick={() => setActiveTab('event')} className={tabBtn('event')}>
                        <LayoutDashboard size={20} /> <span>Event details</span>
                    </button>
                    <button type="button" onClick={() => setActiveTab('tracks')} className={tabBtn('tracks')}>
                        <Layers size={20} /> <span>Tracks</span>
                    </button>
                    <button type="button" onClick={() => setActiveTab('agenda')} className={tabBtn('agenda')}>
                        <Calendar size={20} /> <span>Agenda</span>
                    </button>
                    <button type="button" onClick={() => setActiveTab('schedule')} className={tabBtn('schedule')}>
                        <Clock size={20} /> <span>Schedule</span>
                    </button>
                    <button type="button" onClick={() => setActiveTab('faqs')} className={tabBtn('faqs')}>
                        <HelpCircle size={20} /> <span>FAQs</span>
                    </button>
                </nav>

                <div className="mt-auto pt-8 border-t-2 border-ink/20 flex flex-col space-y-4">
                    <div className="px-4 py-3 bg-bg border-2 border-ink shadow-neo-sm flex items-center space-x-3">
                        <div className="w-9 h-9 bg-highlight-teal border-2 border-ink rounded-full flex items-center justify-center font-bold text-sm">
                            {admin?.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold">{admin?.username}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate('/admin/login');
                        }}
                        className="w-full flex items-center space-x-4 px-6 py-4 text-red-600 font-bold border-2 border-transparent hover:border-red-200 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={20} /> <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading uppercase tracking-wide">{activeTab} management</h2>
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest">View public site</span>
                        <ExternalLink size={16} className="text-ink" />
                    </a>
                </div>

                {/* --- TAB CONTENT: EVENT --- */}
                {activeTab === 'event' && (
                  <form onSubmit={handleEventUpdate} className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo space-y-6">
                          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-ink border-b-2 border-ink/15 pb-4 font-sans normal-case tracking-normal">
                             <LayoutDashboard size={18}/> <span>Main info</span>
                          </h3>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Hackathon name</label>
                            <input value={event.name} onChange={(e) => setEvent({...event, name: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Registration link (full URL)</label>
                             <textarea
                               rows={3}
                               value={event.registrationLink ?? ''}
                               onChange={(e) => setEvent({ ...event, registrationLink: e.target.value })}
                               placeholder={REGISTRATION_URL}
                               spellCheck={false}
                               className="w-full min-h-[5.5rem] resize-y bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink text-sm font-mono leading-snug break-all shadow-neo-sm"
                             />
                             <p className="text-xs text-ink/60 font-medium leading-relaxed">
                               Paste the entire link from Google Forms → Send → link. Long <code className="text-[11px] bg-bg px-1 border border-ink/25 rounded">…/d/e/1FAIpQLS…/viewform</code> strings must be complete or the form will 404.
                             </p>
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Venue</label>
                             <input value={event.venue} onChange={(e) => setEvent({...event, venue: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink font-medium shadow-neo-sm" />
                          </div>
                       </div>

                       <div className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo space-y-6">
                         <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-ink border-b-2 border-ink/15 pb-4 font-sans normal-case tracking-normal">
                             <Settings size={18}/> <span>Contact information</span>
                          </h3>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Contact email</label>
                            <input value={event.contactEmail} onChange={(e) => setEvent({...event, contactEmail: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Contact phone</label>
                            <input value={event.contactPhone} onChange={(e) => setEvent({...event, contactPhone: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink font-medium shadow-neo-sm" />
                          </div>
                       </div>
                    </div>

                    <div className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Hackathon description</label>
                       <textarea rows="4" value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink leading-relaxed font-medium shadow-neo-sm" />
                    </div>

                    <div className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo space-y-3">
                      <h3 className="text-xl font-bold flex items-center gap-2 text-ink border-b-2 border-ink/15 pb-4 font-sans normal-case tracking-normal">
                        <ImageIcon size={18} /> <span>Hero image carousel</span>
                      </h3>
                      <p className="text-sm text-ink/70 font-medium leading-relaxed">
                        One image URL per line. Optional caption after a pipe: <code className="bg-bg px-1 border border-ink/30 rounded text-xs">https://…|My caption</code>
                      </p>
                      <textarea
                        rows={8}
                        value={heroCarouselText}
                        onChange={(e) => setHeroCarouselText(e.target.value)}
                        placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg|Kickoff night"
                        className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink text-sm font-mono leading-relaxed shadow-neo-sm"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                       <button type="submit" className="btn-ink !py-4 px-12 flex items-center space-x-3 text-lg font-black tracking-widest rounded-none border-[3px]">
                          <Save size={20} />
                          <span>Save event changes</span>
                       </button>
                    </div>
                  </form>
                )}

                {/* --- TAB CONTENT: TRACKS --- */}
                {activeTab === 'tracks' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <form onSubmit={handleAddTrack} className="bg-white border-[3px] border-ink shadow-neo p-10 rounded-neo space-y-8">
                      <h3 className="text-2xl font-heading mb-8 border-b-2 border-ink/15 pb-4 uppercase tracking-wide flex items-center gap-2">
                        <Layers size={22} /> New hackathon track
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Track title</label>
                          <input
                            required
                            placeholder="Web & apps"
                            value={newTrack.title}
                            onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                            className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Display order</label>
                          <input
                            type="number"
                            value={newTrack.sortOrder}
                            onChange={(e) => setNewTrack({ ...newTrack, sortOrder: e.target.value })}
                            className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Description</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="What teams build in this track, APIs, and judging focus…"
                          value={newTrack.description}
                          onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
                          className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm leading-relaxed"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button type="submit" className="btn-ink !py-4 rounded-xl flex items-center space-x-2 px-10 border-[3px]">
                          <Plus size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Add track</span>
                        </button>
                      </div>
                    </form>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-heading border-l-4 border-ink pl-4 uppercase tracking-wide">Published tracks</h3>
                      <div className="grid lg:grid-cols-2 gap-6">
                        {tracks.map((t) => (
                          <div
                            key={t._id}
                            className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo group flex justify-between items-start gap-4"
                          >
                            <div>
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-highlight-blue border-2 border-ink text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-neo-sm">
                                  Order {t.sortOrder ?? 0}
                                </span>
                                <h4 className="text-xl font-bold font-sans normal-case tracking-normal">{t.title}</h4>
                              </div>
                              <p className="text-ink/70 text-sm leading-relaxed">{t.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteTrack(t._id)}
                              className="p-2 text-ink/50 hover:text-red-600 transition-colors border-2 border-transparent hover:border-red-200 shrink-0"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                        {tracks.length === 0 && <p className="text-ink/50 italic">No tracks yet — add one above for the landing page.</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB CONTENT: AGENDA --- */}
                {activeTab === 'agenda' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <form onSubmit={handleAddAgenda} className="bg-white border-[3px] border-ink shadow-neo p-10 rounded-neo space-y-8">
                       <h3 className="text-2xl font-heading mb-8 border-b-2 border-ink/15 pb-4 uppercase tracking-wide">New agenda phase</h3>
                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Phase title</label>
                            <input placeholder="Ideation" required value={newAgenda.title} onChange={(e) => setNewAgenda({...newAgenda, title: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Day number</label>
                             <input type="number" required value={newAgenda.day} onChange={(e) => setNewAgenda({...newAgenda, day: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Phase type</label>
                             <input placeholder="Pre-hack" required value={newAgenda.phase} onChange={(e) => setNewAgenda({...newAgenda, phase: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="flex items-end">
                             <button type="submit" className="w-full btn-ink !py-4 rounded-xl flex items-center justify-center space-x-2 h-[58px] border-[3px]">
                               <Plus size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Add item</span>
                             </button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Full description</label>
                          <textarea rows="3" required placeholder="Describe what happens in this phase..." value={newAgenda.description} onChange={(e) => setNewAgenda({...newAgenda, description: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-heading border-l-4 border-ink pl-4 uppercase tracking-wide">Existing agenda items</h3>
                       <div className="grid lg:grid-cols-2 gap-6">
                          {agendas.map((a) => (
                             <div key={a._id} className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo group flex flex-col gap-4">
                                {editingAgendaId === a._id ? (
                                  <form onSubmit={handleSaveAgendaEdit} className="space-y-4 w-full">
                                    <div className="grid sm:grid-cols-3 gap-4">
                                      <div className="space-y-1 sm:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Title</label>
                                        <input required value={agendaDraft.title} onChange={(e) => setAgendaDraft({ ...agendaDraft, title: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Day</label>
                                        <input type="number" required value={agendaDraft.day} onChange={(e) => setAgendaDraft({ ...agendaDraft, day: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Phase</label>
                                      <input required value={agendaDraft.phase} onChange={(e) => setAgendaDraft({ ...agendaDraft, phase: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Description</label>
                                      <textarea required rows={3} value={agendaDraft.description} onChange={(e) => setAgendaDraft({ ...agendaDraft, description: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                      <button type="submit" className="btn-ink !py-2 px-4 text-xs font-bold uppercase tracking-widest border-2">Save</button>
                                      <button type="button" onClick={() => setEditingAgendaId(null)} className="border-2 border-ink bg-white px-4 py-2 text-xs font-bold uppercase shadow-neo-sm">Cancel</button>
                                    </div>
                                  </form>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start gap-4 w-full">
                                      <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                          <span className="px-3 py-1 bg-highlight-yellow border-2 border-ink text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-neo-sm">Day {a.day}</span>
                                          <h4 className="text-xl font-bold font-sans normal-case tracking-normal">{a.title}</h4>
                                        </div>
                                        <p className="text-ink/70 text-sm leading-relaxed mb-4">{a.description}</p>
                                        <span className="text-xs font-black uppercase tracking-widest text-ink/50">{a.phase}</span>
                                      </div>
                                      <div className="flex shrink-0 gap-1">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingAgendaId(a._id);
                                            setAgendaDraft({ title: a.title, description: a.description, day: a.day, phase: a.phase });
                                          }}
                                          className="p-2 text-ink hover:bg-highlight-teal/30 border-2 border-transparent hover:border-ink"
                                          aria-label="Edit agenda"
                                        >
                                          <Pencil size={18} />
                                        </button>
                                        <button type="button" onClick={() => handleDeleteAgenda(a._id)} className="p-2 text-ink/50 hover:text-red-600 border-2 border-transparent hover:border-red-200">
                                          <Trash2 size={20} />
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                             </div>
                          ))}
                          {agendas.length === 0 && <p className="text-ink/50 italic">No agenda items yet.</p>}
                       </div>
                    </div>
                  </div>
                )}

                {/* --- TAB CONTENT: SCHEDULE --- */}
                {activeTab === 'schedule' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     <form onSubmit={handleAddSchedule} className="bg-white border-[3px] border-ink shadow-neo p-10 rounded-neo space-y-8">
                       <h3 className="text-2xl font-heading mb-8 border-b-2 border-ink/15 pb-4 uppercase tracking-wide">Schedule entry</h3>
                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Time slot</label>
                             <input placeholder="09:00 AM" required value={newSchedule.time} onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-6 lg:col-span-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Activity name</label>
                             <input placeholder="Keynote ceremony" required value={newSchedule.activity} onChange={(e) => setNewSchedule({...newSchedule, activity: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Day</label>
                             <input type="number" required value={newSchedule.day} onChange={(e) => setNewSchedule({...newSchedule, day: Number(e.target.value)})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                       </div>
                       <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                           <div className="flex-1 space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Activity context</label>
                               <input placeholder="Opening remarks..." value={newSchedule.description} onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                           </div>
                           <div className="flex items-end">
                             <button type="submit" className="btn-ink !py-4 rounded-xl flex items-center justify-center space-x-2 h-[58px] px-8 border-[3px] whitespace-nowrap">
                               <Plus size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Add slot</span>
                             </button>
                           </div>
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-heading border-l-4 border-ink pl-4 uppercase tracking-wide">Live timeline</h3>
                       <div className="space-y-4">
                          {schedules.map((s) => (
                             <div key={s._id} className="bg-white border-[3px] border-ink shadow-neo p-6 rounded-neo flex flex-col gap-4 group">
                                {editingScheduleId === s._id ? (
                                  <form onSubmit={handleSaveScheduleEdit} className="space-y-4 w-full">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Time</label>
                                        <input required value={scheduleDraft.time} onChange={(e) => setScheduleDraft({ ...scheduleDraft, time: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Day</label>
                                        <input type="number" required value={scheduleDraft.day} onChange={(e) => setScheduleDraft({ ...scheduleDraft, day: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Activity</label>
                                      <input required value={scheduleDraft.activity} onChange={(e) => setScheduleDraft({ ...scheduleDraft, activity: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Context</label>
                                      <input value={scheduleDraft.description} onChange={(e) => setScheduleDraft({ ...scheduleDraft, description: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      <button type="submit" className="btn-ink !py-2 px-4 text-xs font-bold uppercase tracking-widest border-2">Save</button>
                                      <button type="button" onClick={() => setEditingScheduleId(null)} className="border-2 border-ink bg-white px-4 py-2 text-xs font-bold uppercase shadow-neo-sm">Cancel</button>
                                    </div>
                                  </form>
                                ) : (
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 min-w-0">
                                      <div className="text-ink font-black text-lg sm:w-28 border-b-2 sm:border-b-0 sm:border-r-2 border-ink/15 sm:pr-4 shrink-0 uppercase tracking-tighter">
                                        {s.time}
                                      </div>
                                      <div className="min-w-0">
                                        <h4 className="text-xl font-bold mb-1 tracking-tight font-sans normal-case">{s.activity}</h4>
                                        <p className="text-ink/65 text-sm">{s.description}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-ink bg-highlight-teal border-2 border-ink px-3 py-1 shadow-neo-sm">Day {s.day}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingScheduleId(s._id);
                                          setScheduleDraft({
                                            time: s.time,
                                            activity: s.activity,
                                            description: s.description || '',
                                            day: s.day,
                                          });
                                        }}
                                        className="p-2 text-ink hover:bg-highlight-teal/30 border-2 border-transparent hover:border-ink"
                                        aria-label="Edit schedule"
                                      >
                                        <Pencil size={18} />
                                      </button>
                                      <button type="button" onClick={() => handleDeleteSchedule(s._id)} className="p-2 text-ink/50 hover:text-red-600 border-2 border-transparent hover:border-red-200 transition-colors">
                                        <Trash2 size={20} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                             </div>
                          ))}
                          {schedules.length === 0 && <p className="text-ink/50 italic">No schedule entries yet.</p>}
                       </div>
                    </div>
                  </div>
                )}

                {/* --- TAB CONTENT: FAQS --- */}
                {activeTab === 'faqs' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     <form onSubmit={handleAddFaq} className="bg-white border-[3px] border-ink shadow-neo p-10 rounded-neo space-y-8">
                       <h3 className="text-2xl font-heading mb-8 border-b-2 border-ink/15 pb-4 uppercase tracking-wide">New FAQ</h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Question</label>
                             <input placeholder="What are the team size limits?" required value={newFaq.question} onChange={(e) => setNewFaq({...newFaq, question: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none font-medium shadow-neo-sm" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Answer</label>
                             <textarea rows="3" required placeholder="Maximum team size is 4 members..." value={newFaq.answer} onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:border-ink outline-none leading-relaxed font-medium shadow-neo-sm" />
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <button type="submit" className="btn-ink !py-4 rounded-xl flex items-center space-x-2 px-10 border-[3px]">
                            <Plus size={20} /> <span className="font-bold uppercase tracking-widest text-xs">Publish FAQ</span>
                          </button>
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-heading border-l-4 border-ink pl-4 uppercase tracking-wide">Knowledge base</h3>
                       <div className="grid lg:grid-cols-2 gap-8">
                          {faqs.map((f) => (
                             <div key={f._id} className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo flex flex-col justify-between h-full">
                                {editingFaqId === f._id ? (
                                  <form onSubmit={handleSaveFaqEdit} className="space-y-4 w-full">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Question</label>
                                      <input required value={faqDraft.question} onChange={(e) => setFaqDraft({ ...faqDraft, question: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-ink/50">Answer</label>
                                      <textarea required rows={4} value={faqDraft.answer} onChange={(e) => setFaqDraft({ ...faqDraft, answer: e.target.value })} className="w-full bg-bg border-2 border-ink rounded-lg p-3 text-ink font-medium leading-relaxed" />
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                      <button type="submit" className="btn-ink !py-2 px-4 text-xs font-bold uppercase tracking-widest border-2">Save</button>
                                      <button type="button" onClick={() => setEditingFaqId(null)} className="border-2 border-ink bg-white px-4 py-2 text-xs font-bold uppercase shadow-neo-sm">Cancel</button>
                                    </div>
                                  </form>
                                ) : (
                                  <div>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                      <h4 className="text-lg font-bold text-ink tracking-tight font-sans normal-case">{f.question}</h4>
                                      <div className="flex shrink-0 gap-1">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingFaqId(f._id);
                                            setFaqDraft({ question: f.question, answer: f.answer });
                                          }}
                                          className="p-2 text-ink hover:bg-highlight-teal/30 border-2 border-transparent hover:border-ink"
                                          aria-label="Edit FAQ"
                                        >
                                          <Pencil size={18} />
                                        </button>
                                        <button type="button" onClick={() => handleDeleteFaq(f._id)} className="p-2 text-ink/50 hover:text-red-600 border-2 border-transparent hover:border-red-200">
                                          <Trash2 size={20} />
                                        </button>
                                      </div>
                                    </div>
                                    <p className="text-ink/70 text-sm leading-relaxed">{f.answer}</p>
                                  </div>
                                )}
                             </div>
                          ))}
                          {faqs.length === 0 && <p className="text-ink/50 italic">No FAQs yet.</p>}
                       </div>
                    </div>
                  </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
