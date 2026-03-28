import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { REGISTRATION_URL } from '../constants';
import { LayoutDashboard, Calendar, Clock, HelpCircle, Settings, LogOut, Plus, Trash2, Save, ExternalLink, RefreshCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

    // Temporary/Edit States
    const [newAgenda, setNewAgenda] = useState({ title: '', description: '', day: 1, phase: 'Day 1' });
    const [newSchedule, setNewSchedule] = useState({ time: '', activity: '', description: '', day: 1 });
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

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
            const [eRes, aRes, sRes, fRes] = await Promise.all([
                api.get('/event').catch(() => ({ data: { name: '', description: '', venue: '', contactEmail: '', contactPhone: '', registrationLink: '' } })),
                api.get('/agenda').catch(() => ({ data: [] })),
                api.get('/schedule').catch(() => ({ data: [] })),
                api.get('/faqs').catch(() => ({ data: [] }))
            ]);
            setEvent(eRes.data || { name: '', description: '', venue: '', contactEmail: '', contactPhone: '', registrationLink: '' });
            setAgendas(aRes.data);
            setSchedules(sRes.data);
            setFaqs(fRes.data);
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
            await api.put('/event', event);
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
            toast.success('FAQ removed');
        } catch (err) {
            toast.error('Failed to delete FAQ');
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
                             <label className="text-xs font-black uppercase tracking-widest text-ink/60 ml-1">Registration link</label>
                             <input value={event.registrationLink} onChange={(e) => setEvent({...event, registrationLink: e.target.value})} placeholder={REGISTRATION_URL} className="w-full bg-bg border-2 border-ink rounded-xl p-4 focus:ring-2 focus:ring-ink/20 text-ink font-medium shadow-neo-sm" />
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

                    <div className="flex justify-end pt-4">
                       <button type="submit" className="btn-ink !py-4 px-12 flex items-center space-x-3 text-lg font-black tracking-widest rounded-none border-[3px]">
                          <Save size={20} />
                          <span>Save event changes</span>
                       </button>
                    </div>
                  </form>
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
                             <div key={a._id} className="bg-white border-[3px] border-ink shadow-neo p-8 rounded-neo group flex justify-between items-start gap-4">
                                <div>
                                   <div className="flex flex-wrap items-center gap-3 mb-2">
                                      <span className="px-3 py-1 bg-highlight-yellow border-2 border-ink text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-neo-sm">Day {a.day}</span>
                                      <h4 className="text-xl font-bold font-sans normal-case tracking-normal">{a.title}</h4>
                                   </div>
                                   <p className="text-ink/70 text-sm leading-relaxed mb-4">{a.description}</p>
                                   <span className="text-xs font-black uppercase tracking-widest text-ink/50">{a.phase}</span>
                                </div>
                                <button type="button" onClick={() => handleDeleteAgenda(a._id)} className="p-2 text-ink/50 hover:text-red-600 transition-colors border-2 border-transparent hover:border-red-200 shrink-0">
                                   <Trash2 size={20} />
                                </button>
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
                             <div key={s._id} className="bg-white border-[3px] border-ink shadow-neo p-6 rounded-neo flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 min-w-0">
                                   <div className="text-ink font-black text-lg sm:w-28 border-b-2 sm:border-b-0 sm:border-r-2 border-ink/15 sm:pr-4 shrink-0 uppercase tracking-tighter">
                                      {s.time}
                                   </div>
                                   <div className="min-w-0">
                                      <h4 className="text-xl font-bold mb-1 tracking-tight font-sans normal-case">{s.activity}</h4>
                                      <p className="text-ink/65 text-sm">{s.description}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-ink bg-highlight-teal border-2 border-ink px-3 py-1 shadow-neo-sm">Day {s.day}</span>
                                   <button type="button" onClick={() => handleDeleteSchedule(s._id)} className="p-2 text-ink/50 hover:text-red-600 border-2 border-transparent hover:border-red-200 transition-colors">
                                      <Trash2 size={20} />
                                   </button>
                                </div>
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
                                <div>
                                   <div className="flex items-start justify-between gap-4 mb-4">
                                      <h4 className="text-lg font-bold text-ink tracking-tight font-sans normal-case">{f.question}</h4>
                                      <button type="button" onClick={() => handleDeleteFaq(f._id)} className="p-2 text-ink/50 hover:text-red-600 border-2 border-transparent hover:border-red-200 shrink-0">
                                         <Trash2 size={20} />
                                      </button>
                                   </div>
                                   <p className="text-ink/70 text-sm leading-relaxed">{f.answer}</p>
                                </div>
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
