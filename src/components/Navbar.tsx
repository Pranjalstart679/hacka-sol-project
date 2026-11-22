import React from 'react';
import { Droplet, PhoneCall, HeartHandshake, Building2, Gift, PlayCircle, Home } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'pitch';
  setActiveTab: (tab: 'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'pitch') => void;
  onResetEmergency?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onResetEmergency }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Emergency Helpline Banner */}
      <div className="bg-red-700 text-white text-xs px-4 py-1.5 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-800 text-[10px] tracking-wide uppercase font-bold">Emergency 24x7</span>
          <span className="hidden sm:inline">Blood Helpline:</span>
          <a href="tel:104" className="underline font-bold hover:text-red-100 flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> 104 / 1910
          </a>
          <span className="text-red-300">|</span>
          <span className="text-red-100">National Emergency: 112</span>
          <div className="ml-auto text-red-200 hidden md:block">
            Directly bridge e-RaktKosh with verified donors
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('home');
              if (onResetEmergency) onResetEmergency();
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Rakht<span className="text-red-600">Khoj</span>
                </span>
                <span className="text-[10px] bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded-full border border-red-200">
                  MVP v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Emergency Blood Discovery & Live Donor Network
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3.5 py-2 rounded-lg text-sm font-extrabold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'emergency'
                  ? 'bg-red-600 text-white shadow-red-600/30'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              }`}
            >
              <Droplet className="w-4 h-4 fill-current stroke-none" />
              Find Blood Now
            </button>

            <button
              onClick={() => setActiveTab('banks')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'banks'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Blood Banks
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              Join as Donor
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'rewards'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-700 hover:bg-amber-50'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-500" />
              Rewards
            </button>

            <button
              onClick={() => setActiveTab('pitch')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'pitch'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-blue-50'
              }`}
            >
              <PlayCircle className="w-4 h-4 text-blue-600" />
              Hackathon Story
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-200 px-2 py-1.5 bg-slate-50 gap-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold ${
            activeTab === 'home' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-extrabold ${
            activeTab === 'emergency' ? 'bg-red-600 text-white' : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          Find Blood
        </button>
        <button
          onClick={() => setActiveTab('banks')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
            activeTab === 'banks' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Blood Banks
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
            activeTab === 'register' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Donor Signup
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
            activeTab === 'rewards' ? 'bg-amber-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Rewards
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
            activeTab === 'pitch' ? 'bg-blue-600 text-white' : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          Hackathon Story
        </button>
      </div>
    </header>
  );
};
