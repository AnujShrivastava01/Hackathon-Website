import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Terminal, Loader2, ArrowRight } from 'lucide-react';
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
      toast.success('Access Granted. Welcome back.');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.message);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[25%] -right-[15%] w-[600px] h-[600px] bg-primary-500/10 blur-[150px] rounded-full"></div>
         <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10 transition-all duration-500 ease-in-out">
         <div className="bg-slate-900 border border-white/10 p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
           <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                <Terminal className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Admin Portal</h2>
              <p className="text-slate-500 font-medium">Secure access to hackathon management.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Username</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-700"
                    placeholder="Enter your username"
                  />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors">
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-700"
                    placeholder="Enter your security key"
                  />
                </div>
             </div>

             <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full btn-primary !py-4 flex items-center justify-center space-x-3 text-lg mt-8 disabled:opacity-50 disabled:cursor-wait"
             >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <ArrowRight size={20} />
                  </>
                )}
             </button>
           </form>

           <div className="mt-12 pt-8 border-t border-white/5 text-center">
             <a href="/" className="text-sm font-bold text-slate-500 hover:text-white transition-colors duration-200">
               Return to Public Site
             </a>
           </div>
         </div>
         
         <p className="mt-8 text-center text-slate-600 text-xs font-medium uppercase tracking-widest">
            Protected by High-Level Encryption
         </p>
      </div>
    </div>
  );
};

export default AdminLogin;
