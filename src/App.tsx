import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GeneralHome } from './components/GeneralHome';
import { EmergencyWizard } from './components/EmergencyWizard';
import { BloodBankExplorer } from './components/BloodBankExplorer';
import { DonorRegistration } from './components/DonorRegistration';
import { ReferralProgram } from './components/ReferralProgram';
import { HackathonPitchContext } from './components/HackathonPitchContext';
import { DataSyncEngine } from './components/DataSyncEngine';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { getBloodBanksWithDistance, INITIAL_DONORS } from './lib/mockData';
import { BloodBank, Donor, BloodGroup } from './types';
import { Droplet, Home, Database } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'architecture' | 'sync'>('home');
  
  // Real coordinates state (defaults to Nava Raipur, CG - site of Hack-A-Sol IIIT-NR)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; label: string }>({
    lat: 21.1610,
    lng: 81.7820,
    label: 'Nava Raipur, Chhattisgarh'
  });

  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>(() => 
    getBloodBanksWithDistance(21.1610, 81.7820)
  );

  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [preselectedGroup, setPreselectedGroup] = useState<BloodGroup | null>(null);

  const handleUpdateLocation = (lat: number, lng: number, label: string) => {
    setUserLocation({ lat, lng, label });
    const updatedBanks = getBloodBanksWithDistance(lat, lng);
    setBloodBanks(updatedBanks);
  };

  const handleStartEmergency = (group?: BloodGroup) => {
    setPreselectedGroup(group ?? null);
    setActiveTab('emergency');
  };

  const handleDonorRegistered = (newDonor: Donor) => {
    setDonors(prev => [newDonor, ...prev]);
  };

  const handleSyncComplete = (newDonors: Donor[]) => {
    const importedIds = new Set(newDonors.map(donor => donor.id));
    setDonors(previous => [...newDonors, ...previous.filter(donor => !importedIds.has(donor.id))]);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans selection:bg-red-700 selection:text-white text-neutral-900">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => tab === 'emergency' ? handleStartEmergency() : setActiveTab(tab)}
        onResetEmergency={() => {
          setActiveTab('home');
        }}
      />

      {/* PWA Mobile Install Prompt */}
      <PWAInstallBanner />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <GeneralHome
            bloodBanks={bloodBanks}
            userLocation={userLocation}
            onUpdateLocation={handleUpdateLocation}
            onStartEmergency={handleStartEmergency}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'sync' && (
          <DataSyncEngine
            onSyncComplete={handleSyncComplete}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyWizard
            bloodBanks={bloodBanks}
            donors={donors}
            userLocation={userLocation}
            initialGroup={preselectedGroup}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'banks' && (
          <BloodBankExplorer
            bloodBanks={bloodBanks}
          />
        )}

        {activeTab === 'register' && (
          <DonorRegistration
            donors={donors}
            onDonorRegistered={handleDonorRegistered}
            onGoToRewards={() => setActiveTab('rewards')}
          />
        )}

        {activeTab === 'rewards' && (
          <ReferralProgram />
        )}

        {activeTab === 'architecture' && (
          <HackathonPitchContext
            onStartDemo={() => handleStartEmergency()}
          />
        )}
      </main>

      {/* Quick Navigation Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap bg-neutral-900 text-neutral-100 px-5 py-2.5 rounded-full border border-neutral-700 flex items-center gap-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1.5 ${activeTab === 'home' ? 'text-white font-bold underline' : 'text-neutral-400 hover:text-white'}`}
        >
          <Home className="w-3.5 h-3.5" />
          Home
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => handleStartEmergency()}
          className={`flex items-center gap-1.5 font-bold ${activeTab === 'emergency' ? 'text-red-400 underline' : 'text-red-400 hover:text-red-300'}`}
        >
          <Droplet className="w-3.5 h-3.5 fill-red-500 stroke-none" />
          Find Blood
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => setActiveTab('sync')}
          className={`flex items-center gap-1.5 ${activeTab === 'sync' ? 'text-white font-bold underline' : 'text-neutral-400 hover:text-white'}`}
        >
          <Database className="w-3.5 h-3.5 text-neutral-400" />
          Import
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => setActiveTab('banks')}
          className={`${activeTab === 'banks' ? 'text-white font-bold underline' : 'text-neutral-400 hover:text-white'}`}
        >
          Banks
        </button>
      </div>

      {/* Editorial Colophon / Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8 text-neutral-600 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-neutral-900 tracking-tightest">Rakshya</span>
            <span className="text-neutral-400">•</span>
            <span className="font-mono text-[11px] text-neutral-500">Hack-A-Sol 2026 • IIIT Naya Raipur • Open Track</span>
          </div>
          <div className="text-neutral-500 font-mono text-[11px]">
            National Transfusion Modernization Protocol • Bridging e-RaktKosh with verified local donors
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
