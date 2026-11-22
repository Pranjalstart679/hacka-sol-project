import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GeneralHome } from './components/GeneralHome';
import { EmergencyWizard } from './components/EmergencyWizard';
import { BloodBankExplorer } from './components/BloodBankExplorer';
import { DonorRegistration } from './components/DonorRegistration';
import { ReferralProgram } from './components/ReferralProgram';
import { HackathonPitchContext } from './components/HackathonPitchContext';
import { DonorSimulatorModal } from './components/DonorSimulatorModal';
import { getBloodBanksWithDistance, INITIAL_DONORS } from './lib/mockData';
import { BloodBank, Donor, BloodGroup, SOSRequest } from './types';
import { Droplet, Home } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'emergency' | 'banks' | 'register' | 'rewards' | 'pitch'>('home');
  
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
  const [preselectedGroup, setPreselectedGroup] = useState<BloodGroup | null>('O+');

  // Simulator Modal State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simRequest, setSimRequest] = useState<SOSRequest | null>(null);
  const [simDonor, setSimDonor] = useState<Donor | null>(null);

  const handleUpdateLocation = (lat: number, lng: number, label: string) => {
    setUserLocation({ lat, lng, label });
    const updatedBanks = getBloodBanksWithDistance(lat, lng);
    setBloodBanks(updatedBanks);
  };

  const handleStartEmergency = (group?: BloodGroup) => {
    if (group) {
      setPreselectedGroup(group);
    }
    setActiveTab('emergency');
  };

  const handleOpenSimulator = (request: SOSRequest, donor: Donor) => {
    setSimRequest(request);
    setSimDonor(donor);
    setIsSimulatorOpen(true);
  };

  const handleDonorAccept = (donorId: string) => {
    setDonors(prev => prev.map(d => {
      if (d.id === donorId) {
        return { ...d, donationsCount: d.donationsCount + 1 };
      }
      return d;
    }));
  };

  const handleDonorRegistered = (newDonor: Donor) => {
    setDonors(prev => [newDonor, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetEmergency={() => {
          setActiveTab('home');
        }}
      />

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

        {activeTab === 'emergency' && (
          <EmergencyWizard
            bloodBanks={bloodBanks}
            donors={donors}
            userLocation={userLocation}
            initialGroup={preselectedGroup}
            onOpenDonorSimulator={handleOpenSimulator}
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
            onDonorRegistered={handleDonorRegistered}
            onGoToRewards={() => setActiveTab('rewards')}
          />
        )}

        {activeTab === 'rewards' && (
          <ReferralProgram />
        )}

        {activeTab === 'pitch' && (
          <HackathonPitchContext
            onStartDemo={() => handleStartEmergency()}
          />
        )}
      </main>

      {/* Quick Navigation Floating Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-2xl flex items-center gap-2 sm:gap-3 text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1 font-medium ${activeTab === 'home' ? 'text-white font-bold underline' : 'text-slate-400 hover:text-white'}`}
        >
          <Home className="w-3.5 h-3.5" />
          Home
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => handleStartEmergency()}
          className={`flex items-center gap-1 font-bold ${activeTab === 'emergency' ? 'text-red-400 underline' : 'text-red-400 hover:text-red-300'}`}
        >
          <Droplet className="w-3.5 h-3.5 fill-red-500 stroke-none" />
          Find Blood
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setActiveTab('banks')}
          className={`font-medium ${activeTab === 'banks' ? 'text-white font-bold underline' : 'text-slate-400 hover:text-white'}`}
        >
          Banks & Map
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`font-medium ${activeTab === 'rewards' ? 'text-amber-400 font-bold underline' : 'text-slate-400 hover:text-amber-300'}`}
        >
          Rewards
        </button>
      </div>

      {/* Simulator Modal */}
      <DonorSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        request={simRequest}
        donor={simDonor}
        onDonorAccept={handleDonorAccept}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">RakhtKhoj</span>
            <span>• Hack-A-Sol 2026 (IIIT Naya Raipur) • Open Track</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            In emergencies, every second counts. Bridging e-RaktKosh with verified local donors.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
