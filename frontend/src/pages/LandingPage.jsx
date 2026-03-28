import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Agenda from '../components/Agenda';
import Schedule from '../components/Schedule';
import FAQs from '../components/FAQs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';

const LandingPage = () => {
  const [event, setEvent] = useState(null);
  const [agendas, setAgendas] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, agendaRes, scheduleRes, faqRes] = await Promise.all([
          api.get('/event').catch(() => ({ data: null })),
          api.get('/agenda').catch(() => ({ data: [] })),
          api.get('/schedule').catch(() => ({ data: [] })),
          api.get('/faqs').catch(() => ({ data: [] }))
        ]);

        setEvent(eventRes.data);
        setAgendas(agendaRes.data);
        setSchedules(scheduleRes.data);
        setFaqs(faqRes.data);
      } catch (err) {
        console.error('Data fetching failed:', err);
        toast.error('Could not fetch data from server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-bold animate-pulse text-lg tracking-widest uppercase">Initializing Portal...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-primary-500/30 selection:text-primary-400">
      <Toaster position="bottom-right" />
      <Navbar event={event}/>
      <Hero event={event}/>
      <About event={event}/>
      <Agenda agendas={agendas} />
      <Schedule schedules={schedules} />
      <FAQs faqs={faqs} />
      <Contact event={event}/>
      <Footer event={event}/>
    </div>
  );
};

export default LandingPage;
