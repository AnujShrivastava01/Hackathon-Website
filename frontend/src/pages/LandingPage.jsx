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
          api.get('/faqs').catch(() => ({ data: [] })),
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
      <div className="neo-page h-screen w-full flex flex-col items-center justify-center">
        <div
          className="w-14 h-14 border-[3px] border-ink border-t-accent rounded-full animate-spin mb-4 shadow-neo-sm"
          aria-hidden
        />
        <p className="text-ink font-bold uppercase tracking-[0.25em] text-sm">Loading HackOcean…</p>
      </div>
    );
  }

  return (
    <div className="neo-page min-h-screen text-ink selection:bg-accent selection:text-ink">
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
      <Navbar event={event} />
      <Hero event={event} />
      <About event={event} />
      <Agenda agendas={agendas} />
      <Schedule schedules={schedules} />
      <FAQs faqs={faqs} />
      <Contact event={event} />
      <Footer event={event} />
    </div>
  );
};

export default LandingPage;
