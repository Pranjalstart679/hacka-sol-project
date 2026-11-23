import React from 'react';
import { Droplet, Building2, Gift, Layers, Home, Database, UserPlus } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'architecture' | 'sync';
  setActiveTab: (tab: 'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'architecture' | 'sync') => void;
  onResetEmergency?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onResetEmergency }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      {/* Emergency Helpline Banner */}
      <div className="bg-neutral-900 text-neutral-200 text-xs px-4 py-2 font-mono flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
          <span className="font-semibold text-white">Hackathon demo</span>
          <span className="text-neutral-300">Sample inventory and simulated donor alerts</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => {
              setActiveTab('home');
              if (onResetEmergency) onResetEmergency();
            }}
          >
            <div className="w-9 h-9 rounded bg-red-700 flex items-center justify-center text-white border border-red-800 flex-shrink-0">
              <Droplet className="w-5 h-5 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold tracking-tightest text-neutral-900">
                  Rak<span className="text-red-700 italic">shya</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 hidden sm:block -mt-1 font-sans">
                Emergency Blood Discovery & Live Donor Network
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 font-sans text-xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3.5 py-2 rounded font-semibold transition-colors flex items-center gap-1.5 border ${
                activeTab === 'emergency'
                  ? 'bg-red-700 text-white border-red-800'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 fill-current stroke-none" />
              Find Blood Now
            </button>

            <button
              onClick={() => setActiveTab('sync')}
              className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'sync'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-neutral-500" />
              e-RaktKosh Scraper
            </button>

            <button
              onClick={() => setActiveTab('banks')}
              className={`px-3 py-2 rounded font-medium transition-colors ${
                activeTab === 'banks'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Blood Banks
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'register'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-neutral-500" />
              Join as Donor
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'rewards'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-neutral-500" />
              Rewards
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-2 rounded font-medium transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Architecture
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="flex md:hidden overflow-x-auto border-t border-neutral-200 px-3 py-2 bg-neutral-50 gap-1.5 scrollbar-none font-sans">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium ${
            activeTab === 'home' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-white border border-neutral-200'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-semibold ${
            activeTab === 'emergency' ? 'bg-red-700 text-white' : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          Find Blood
        </button>
        <button
          onClick={() => setActiveTab('sync')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium ${
            activeTab === 'sync' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-white border border-neutral-200'
          }`}
        >
          Scraper Sync
        </button>
        <button
          onClick={() => setActiveTab('banks')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium ${
            activeTab === 'banks' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-white border border-neutral-200'
          }`}
        >
          Blood Banks
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium ${
            activeTab === 'register' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-white border border-neutral-200'
          }`}
        >
          Donor Signup
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-medium ${
            activeTab === 'rewards' ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-white border border-neutral-200'
          }`}
        >
          Rewards
        </button>
      </div>
    </header>
  );
};