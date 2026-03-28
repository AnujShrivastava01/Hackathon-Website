import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const result = await login(username, password);
    if (result.success) {
      toast.success('Access granted. Welcome back.');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.message);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen neo-page flex flex-col items-center justify-center p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1A1A1A',
            border: '3px solid #1A1A1A',
            boxShadow: '4px 4px 0px 0px #1A1A1A',
          },
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-16 right-[10%] w-20 h-20 bg-highlight-pink border-[3px] border-ink shadow-neo rotate-12" />
        <div className="absolute bottom-24 left-[8%] w-28 h-14 bg-highlight-blue border-[3px] border-ink shadow-neo -rotate-6" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border-[3px] border-ink p-10 shadow-neo-lg">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="mb-6 h-16 w-16 rounded-full border-[3px] border-ink bg-white p-1 shadow-neo overflow-hidden">
              <img
                src="/logo.png"
                alt="HackOcean"
                width="64"
                height="64"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-heading text-ink tracking-wide mb-2 normal-case">Admin portal</h2>
            <p className="text-ink/70 font-medium">HackOcean — secure access only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/70 ml-1">Username</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 group-focus-within:text-ink transition-colors">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-bg border-2 border-ink py-4 pl-12 pr-4 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-ink/20 shadow-neo-sm placeholder:text-ink/40"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/70 ml-1">Password</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 group-focus-within:text-ink transition-colors">
                  <Lock size={20} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-bg border-2 border-ink py-4 pl-12 pr-4 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-ink/20 shadow-neo-sm placeholder:text-ink/40"
                  placeholder="Enter your security key"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-ink !py-4 flex items-center justify-center gap-3 text-base mt-8 disabled:opacity-50 disabled:cursor-wait rounded-none border-[3px]"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Authorizing…</span>
                </>
              ) : (
                <>
                  <span>Login to dashboard</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t-2 border-ink/20 text-center">
            <a href="/" className="text-sm font-bold text-ink/70 hover:text-ink underline underline-offset-4 decoration-2">
              Return to HackOcean
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-ink/50 text-xs font-bold uppercase tracking-widest">
          Protected route
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
