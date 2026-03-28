import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { LayoutDashboard, Calendar, Clock, HelpCircle, Settings, LogOut, Plus, Trash2, Edit2, Save, X, ExternalLink, RefreshCw, Terminal } from 'lucide-react';
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

    if (isLoading) return (
       <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
          <RefreshCw size={48} className="text-primary-500 animate-spin mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest">Loading Dashboard...</p>
       </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            <Toaster position="bottom-right" />
            
            {/* Sidebar */}
            <aside className="w-80 bg-slate-900 border-r border-white/10 p-8 flex flex-col overflow-y-auto shrink-0 sticky top-0 h-screen">
                <div className="flex items-center space-x-3 mb-12">
                   <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                       <Terminal className="text-white w-6 h-6" />
                   </div>
                   <h1 className="text-xl font-black tracking-tighter">ADMIN CORE</h1>
                </div>

                <nav className="flex-1 space-y-4">
                    <button onClick={() => setActiveTab('event')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'event' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                        <LayoutDashboard size={20} /> <span>Event Details</span>
                    </button>
                    <button onClick={() => setActiveTab('agenda')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'agenda' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                        <Calendar size={20} /> <span>Agenda</span>
                    </button>
                    <button onClick={() => setActiveTab('schedule')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'schedule' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                        <Clock size={20} /> <span>Schedule</span>
                    </button>
                    <button onClick={() => setActiveTab('faqs')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'faqs' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                        <HelpCircle size={20} /> <span>FAQs</span>
                    </button>
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col space-y-4">
                    <div className="px-6 py-4 bg-white/5 rounded-xl flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-xs">
                           {admin?.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold opacity-80">{admin?.username}</span>
                    </div>
                    <button onClick={() => { logout(); navigate('/admin/login') }} className="w-full flex items-center space-x-4 px-6 py-4 text-red-500 font-bold hover:bg-red-500/10 rounded-xl transition-colors">
                        <LogOut size={20} /> <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-12 max-w-6xl mx-auto">
                
                {/* LOGO LINK PREVIEW */}
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-4xl font-black tracking-tighter uppercase">{activeTab} Management</h2>
                   <div className="flex items-center space-x-4">
                      <a href="/" target="_blank" className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-200">
                         <span className="text-sm font-bold uppercase tracking-widest text-slate-400">View Public Site</span>
                         <ExternalLink size={16} className="text-primary-500" />
                      </a>
                   </div>
                </div>

                {/* --- TAB CONTENT: EVENT --- */}
                {activeTab === 'event' && (
                  <form onSubmit={handleEventUpdate} className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl space-y-6">
                          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-primary-400 border-b border-white/5 pb-4">
                             <LayoutDashboard size={18}/> <span>Main Info</span>
                          </h3>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Hackathon Name</label>
                            <input value={event.name} onChange={(e) => setEvent({...event, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Registration Link (Google Form)</label>
                             <input value={event.registrationLink} onChange={(e) => setEvent({...event, registrationLink: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white text-primary-400" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Venue Name / Location</label>
                             <input value={event.venue} onChange={(e) => setEvent({...event, venue: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white" />
                          </div>
                       </div>

                       <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl space-y-6">
                         <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-primary-400 border-b border-white/5 pb-4">
                             <Settings size={18}/> <span>Contact Information</span>
                          </h3>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Contact Email</label>
                            <input value={event.contactEmail} onChange={(e) => setEvent({...event, contactEmail: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Contact Phone</label>
                            <input value={event.contactPhone} onChange={(e) => setEvent({...event, contactPhone: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white" />
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Hackathon Description</label>
                       <textarea rows="4" value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary-500/20 text-white leading-relaxed" />
                    </div>

                    <div className="flex justify-end pt-4">
                       <button type="submit" className="btn-primary !py-4 px-12 flex items-center space-x-3 text-lg font-black tracking-widest shadow-2xl shadow-primary-500/20">
                          <Save size={20} />
                          <span>Save Event Changes</span>
                       </button>
                    </div>
                  </form>
                )}

                {/* --- TAB CONTENT: AGENDA --- */}
                {activeTab === 'agenda' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <form onSubmit={handleAddAgenda} className="bg-slate-900 border border-white/10 p-10 rounded-3xl space-y-8">
                       <h3 className="text-2xl font-black mb-8 border-b border-white/5 pb-4">Post New Agenda Phase</h3>
                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phase Title</label>
                            <input placeholder="Ideation" required value={newAgenda.title} onChange={(e) => setNewAgenda({...newAgenda, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Day Number</label>
                             <input type="number" required value={newAgenda.day} onChange={(e) => setNewAgenda({...newAgenda, day: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phase Type</label>
                             <input placeholder="Pre-Hack" required value={newAgenda.phase} onChange={(e) => setNewAgenda({...newAgenda, phase: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="flex items-end">
                             <button type="submit" className="w-full btn-primary !py-4 rounded-xl flex items-center justify-center space-x-2 h-[58px]">
                               <Plus size={20} /> <span className="font-bold underline uppercase tracking-widest text-xs">Add Item</span>
                             </button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Description</label>
                          <textarea rows="3" required placeholder="Describe what happens in this phase in detail..." value={newAgenda.description} onChange={(e) => setNewAgenda({...newAgenda, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-black border-l-4 border-primary-500 pl-4">Existing Agenda Items</h3>
                       <div className="grid lg:grid-cols-2 gap-6">
                          {agendas.map((a) => (
                             <div key={a._id} className="bg-slate-900 border border-white/10 p-8 rounded-2xl group flex justify-between items-start">
                                <div>
                                   <div className="flex items-center space-x-3 mb-2">
                                      <span className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">Day {a.day}</span>
                                      <h4 className="text-xl font-bold">{a.title}</h4>
                                   </div>
                                   <p className="text-slate-500 text-sm leading-relaxed mb-4">{a.description}</p>
                                   <span className="text-xs font-black uppercase tracking-widest text-slate-700">{a.phase}</span>
                                </div>
                                <button onClick={() => handleDeleteAgenda(a._id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors bg-white/5 rounded-lg">
                                   <Trash2 size={20} />
                                </button>
                             </div>
                          ))}
                          {agendas.length === 0 && <p className="text-slate-700 italic">No agenda items created yet.</p>}
                       </div>
                    </div>
                  </div>
                )}

                {/* --- TAB CONTENT: SCHEDULE --- */}
                {activeTab === 'schedule' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     <form onSubmit={handleAddSchedule} className="bg-slate-900 border border-white/10 p-10 rounded-3xl space-y-8">
                       <h3 className="text-2xl font-black mb-8 border-b border-white/5 pb-4">Schedule Entry</h3>
                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Time Slot</label>
                             <input placeholder="09:00 AM" required value={newSchedule.time} onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="space-y-6 lg:col-span-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Activity Name</label>
                             <input placeholder="Keynote Ceremony" required value={newSchedule.activity} onChange={(e) => setNewSchedule({...newSchedule, activity: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Day</label>
                             <input type="number" required value={newSchedule.day} onChange={(e) => setNewSchedule({...newSchedule, day: Number(e.target.value)})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                       </div>
                       <div className="flex items-center space-x-6">
                           <div className="flex-1 space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Activity Context</label>
                               <input placeholder="Opening remarks from the founders..." value={newSchedule.description} onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                           </div>
                           <div className="flex items-end pt-8">
                             <button type="submit" className="btn-primary !py-4 rounded-xl flex items-center justify-center space-x-2 h-[58px] px-8">
                               <Plus size={20} /> <span className="font-bold underline uppercase tracking-widest text-xs">Add Event</span>
                             </button>
                           </div>
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-black border-l-4 border-primary-500 pl-4">Live Timeline</h3>
                       <div className="space-y-4">
                          {schedules.map((s) => (
                             <div key={s._id} className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-center justify-between group">
                                <div className="flex items-center space-x-8">
                                   <div className="text-primary-500 font-black text-lg w-24 border-r border-white/5 pr-4 shrink-0 uppercase tracking-tighter">
                                      {s.time}
                                   </div>
                                   <div>
                                      <h4 className="text-xl font-bold mb-1 tracking-tight">{s.activity}</h4>
                                      <p className="text-slate-500 text-sm">{s.description}</p>
                                   </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 bg-white/5 px-3 py-1 rounded">Day {s.day}</span>
                                   <button onClick={() => handleDeleteSchedule(s._id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors bg-white/5 rounded-lg">
                                      <Trash2 size={20} />
                                   </button>
                                </div>
                             </div>
                          ))}
                          {schedules.length === 0 && <p className="text-slate-700 italic">No schedule entries recorded.</p>}
                       </div>
                    </div>
                  </div>
                )}

                {/* --- TAB CONTENT: FAQS --- */}
                {activeTab === 'faqs' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     <form onSubmit={handleAddFaq} className="bg-slate-900 border border-white/10 p-10 rounded-3xl space-y-8">
                       <h3 className="text-2xl font-black mb-8 border-b border-white/5 pb-4">New FAQ Pair</h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">The Question</label>
                             <input placeholder="What are the team size limits?" required value={newFaq.question} onChange={(e) => setNewFaq({...newFaq, question: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">The Answer</label>
                             <textarea rows="3" required placeholder="Maximum team size is 4 members. You can also participate solo..." value={newFaq.answer} onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 focus:border-primary-500 outline-none leading-relaxed" />
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <button type="submit" className="btn-primary !py-4 rounded-xl flex items-center space-x-2 px-10">
                            <Plus size={20} /> <span className="font-bold underline uppercase tracking-widest text-xs">Published FAQ</span>
                          </button>
                       </div>
                    </form>

                    <div className="space-y-6">
                       <h3 className="text-2xl font-black border-l-4 border-primary-500 pl-4">Knowledge Base</h3>
                       <div className="grid lg:grid-cols-2 gap-8">
                          {faqs.map((f) => (
                             <div key={f._id} className="bg-slate-900 border border-white/10 p-8 rounded-2xl flex flex-col justify-between group h-full">
                                <div>
                                   <div className="flex items-center justify-between mb-4">
                                      <h4 className="text-lg font-bold text-white tracking-tight">{f.question}</h4>
                                      <button onClick={() => handleDeleteFaq(f._id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors bg-white/5 rounded-lg shrink-0">
                                         <Trash2 size={20} />
                                      </button>
                                   </div>
                                   <p className="text-slate-500 text-sm leading-relaxed">{f.answer}</p>
                                </div>
                             </div>
                          ))}
                          {faqs.length === 0 && <p className="text-slate-700 italic">FAQ list is currently empty.</p>}
                       </div>
                    </div>
                  </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
