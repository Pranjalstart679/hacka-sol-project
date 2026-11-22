import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EmergencyWizard } from './components/EmergencyWizard';
import { BloodBankExplorer } from './components/BloodBankExplorer';
import { DonorRegistration } from './components/DonorRegistration';
import { ReferralProgram } from './components/ReferralProgram';
import { HackathonPitchContext } from './components/HackathonPitchContext';
import { DonorSimulatorModal } from './components/DonorSimulatorModal';
import { INITIAL_BLOOD_BANKS, INITIAL_DONORS } from './lib/mockData';
import { BloodBank, Donor, SOSRequest } from './types';
import { Droplet, Heart, Sparkles, Building2, Gift, PlayCircle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'emergency' | 'banks' | 'register' | 'rewards' | 'pitch'>('emergency');
  const [bloodBanks] = useState<BloodBank[]>(INITIAL_BLOOD_BANKS);
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);

  // Simulator Modal State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simRequest, setSimRequest] = useState<SOSRequest | null>(null);
  const [simDonor, setSimDonor] = useState<Donor | null>(null);

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
          // Keep activeTab as emergency
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'emergency' && (
          <EmergencyWizard
            bloodBanks={bloodBanks}
            donors={donors}
            onOpenDonorSimulator={handleOpenSimulator}
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
            onStartDemo={() => setActiveTab('emergency')}
          />
        )}
      </main>

      {/* Interactive Floating Quick-Bar for Hackathon Demos */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-2xl flex items-center gap-3 text-xs">
        <span className="text-red-400 font-extrabold flex items-center gap-1">
          <Droplet className="w-3.5 h-3.5 fill-red-500 stroke-none" />
          Hack-A-Sol Demo:
        </span>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`hover:text-red-300 font-medium ${activeTab === 'emergency' ? 'text-white font-bold underline' : 'text-slate-400'}`}
        >
          SOS Funnel
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`hover:text-amber-300 font-medium ${activeTab === 'rewards' ? 'text-amber-400 font-bold underline' : 'text-slate-400'}`}
        >
          Viral Rewards
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setActiveTab('pitch')}
          className={`hover:text-blue-300 font-medium ${activeTab === 'pitch' ? 'text-blue-400 font-bold underline' : 'text-slate-400'}`}
        >
          Pitch Story
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
            <span>• Built for Hack-A-Sol 2026 (IIIT Naya Raipur) • Open Track</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            In emergencies, every second counts. Transforming public health portals into active life-saving networks.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
