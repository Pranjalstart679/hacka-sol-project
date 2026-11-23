import { calculateDonorEligibility } from '../lib/compatibility';
import React, { useEffect, useRef, useState } from 'react';
import { Donor, BloodGroup } from '../types';
import { 
  Database, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

interface DataSyncEngineProps {
  onSyncComplete: (newDonors: Donor[]) => void;
}

export const DataSyncEngine: React.FC<DataSyncEngineProps> = ({ onSyncComplete }) => {
  const [selectedState, setSelectedState] = useState('Chhattisgarh');
  const [selectedDistrict, setSelectedDistrict] = useState('Raipur');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Pipeline initialized. Standing by for regional e-RaktKosh data bridge execution...'
  ]);

  const DISTRICT_OPTIONS: Record<string, string[]> = {
    'Chhattisgarh': ['Raipur', 'Durg', 'Bilaspur', 'Bastar (Jagdalpur)', 'Rajnandgaon'],
    'Karnataka': ['Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad'],
    'Delhi': ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi'],
    'Maharashtra': ['Mumbai Suburban', 'Pune', 'Nagpur', 'Nashik']
  };

  const timer = useRef<number>();
  useEffect(() => () => window.clearInterval(timer.current), []);

  const handleRunScraper = () => {
    setIsSyncing(true);
    setSyncDone(false);
    setTerminalLogs([]);

    const steps = [
      `Loading sample data for ${selectedDistrict}, ${selectedState}…`,
      'Checking donation dates against the demo cooldown.',
      'Prepared four sample donor profiles.'
    ];

    let currentStep = 0;
    timer.current = window.setInterval(() => {
      if (currentStep < steps.length) {
        const log = steps[currentStep++];
        setTerminalLogs(prev => [...prev, log]);
      } else {
        window.clearInterval(timer.current);
        setIsSyncing(false);
        setSyncDone(true);

        const newScrapedDonors: Donor[] = [
          {
            id: `scraped-${selectedDistrict.toLowerCase()}-1`,
            name: `${selectedDistrict} Donor: Sameer Agrawal`,
            bloodGroup: 'O-' as BloodGroup,
            phone: '+91 98271 11223',
            city: selectedDistrict,
            distanceKm: 2.1,
            lastDonationDate: '2026-07-10',
            isEligible: true,
            cooldownDaysRemaining: 0,
            donationsCount: 5,
            referralCode: 'SYNC-O-NEG'
          },
          {
            id: `scraped-${selectedDistrict.toLowerCase()}-2`,
            name: `${selectedDistrict} Donor: Ritika Soni`,
            bloodGroup: 'A+' as BloodGroup,
            phone: '+91 94255 44332',
            city: selectedDistrict,
            distanceKm: 3.4,
            lastDonationDate: '2026-06-18',
            isEligible: true,
            cooldownDaysRemaining: 0,
            donationsCount: 3,
            referralCode: 'SYNC-A-POS'
          },
          {
            id: `scraped-${selectedDistrict.toLowerCase()}-3`,
            name: `${selectedDistrict} Donor: Harpreet Singh`,
            bloodGroup: 'B+' as BloodGroup,
            phone: '+91 98930 77665',
            city: selectedDistrict,
            distanceKm: 4.2,
            lastDonationDate: '2026-08-02',
            isEligible: true,
            cooldownDaysRemaining: 0,
            donationsCount: 7,
            referralCode: 'SYNC-B-POS'
          },
          {
            id: `scraped-${selectedDistrict.toLowerCase()}-4`,
            name: `${selectedDistrict} Donor: Dr. Ananya Sen`,
            bloodGroup: 'O+' as BloodGroup,
            phone: '+91 97520 99881',
            city: selectedDistrict,
            distanceKm: 5.0,
            lastDonationDate: '2026-05-25',
            isEligible: true,
            cooldownDaysRemaining: 0,
            donationsCount: 9,
            referralCode: 'SYNC-O-POS'
          }
        ];

        onSyncComplete(newScrapedDonors.map(d => ({ ...d, ...calculateDonorEligibility(d.lastDonationDate) })));
      }
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10 space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block">
          Government Portal Data Bridge
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest leading-[1.1]">
          District donor import simulator
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-generous font-sans">
          Choose a district to load four sample donor profiles into this session. Repeating an import refreshes the same profiles.
        </p>
      </div>

      {/* 3 Core Sources Ledger */}
      <div className="border border-neutral-200 bg-white rounded-xl divide-y md:divide-y-0 md:divide-x divide-neutral-200 grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 space-y-2">
          <span className="font-mono text-xs text-neutral-400 block">SOURCE 01</span>
          <h3 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
            e-RaktKosh (MoHFW)
          </h3>
          <p className="text-xs text-neutral-600 font-sans leading-generous">
            Daily blood bank stock records, component inventories, and camp donation rosters published across 36 states and union territories.
          </p>
        </div>

        <div className="p-6 space-y-2">
          <span className="font-mono text-xs text-neutral-400 block">SOURCE 02</span>
          <h3 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
            Public Volunteer Registries
          </h3>
          <p className="text-xs text-neutral-600 font-sans leading-generous">
            Open registries such as Friends2Support.org (500,000+ voluntary donors across Indian districts) and Red Cross state rosters.
          </p>
        </div>

        <div className="p-6 space-y-2">
          <span className="font-mono text-xs text-neutral-400 block">SOURCE 03</span>
          <h3 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
            University & Campus Drives
          </h3>
          <p className="text-xs text-neutral-600 font-sans leading-generous">
            Donors who register during regional institutional donation drives (AIIMS Raipur, IIIT Naya Raipur) opted in for emergency WhatsApp alerts.
          </p>
        </div>
      </div>

      {/* Interactive Ingestion Console */}
      <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-1">
              <Terminal className="w-3.5 h-3.5" /> Sample import log
            </div>
            <h3 className="font-display text-xl font-bold text-white tracking-tightest">
              Import a district sample
            </h3>
          </div>

          {/* Selectors */}
          <div className="flex flex-wrap items-center gap-2 font-sans">
            <select
              aria-label="State"
              disabled={isSyncing}
              value={selectedState}
              onChange={(e) => {
                setSyncDone(false);
                setSelectedState(e.target.value);
                setSelectedDistrict(DISTRICT_OPTIONS[e.target.value][0]);
              }}
              className="bg-neutral-800 text-xs text-neutral-200 px-3 py-2 rounded border border-neutral-700 outline-none font-mono"
            >
              {Object.keys(DISTRICT_OPTIONS).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              aria-label="District"
              disabled={isSyncing}
              value={selectedDistrict}
              onChange={(e) => { setSyncDone(false); setSelectedDistrict(e.target.value); }}
              className="bg-neutral-800 text-xs text-neutral-200 px-3 py-2 rounded border border-neutral-700 outline-none font-mono"
            >
              {DISTRICT_OPTIONS[selectedState]?.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={handleRunScraper}
              disabled={isSyncing}
              className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 transition-colors border ${
                isSyncing 
                  ? 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed' 
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Ingesting...' : 'Run Pipeline'}
            </button>
          </div>
        </div>

        {/* Console Log Feed */}
        <div className="bg-neutral-950 p-4 rounded border border-neutral-800 font-mono text-xs text-neutral-300 space-y-1.5 h-56 overflow-y-auto">
          {terminalLogs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log}
            </div>
          ))}
          {isSyncing && (
            <div className="text-neutral-500 animate-pulse">
              Loading sample records…
            </div>
          )}
        </div>

        {/* Sync Success Banner */}
        {syncDone && (
          <div className="p-3 bg-neutral-950 border border-emerald-800/80 rounded text-xs text-emerald-300 font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              Ingestion complete for {selectedDistrict}. Donors successfully appended to active emergency dispatch ledger.
            </span>
          </div>
        )}
      </div>

      {/* CLI Reference */}
      <div className="border border-neutral-200 bg-neutral-50 rounded-lg p-4 font-mono text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          Standalone Python Scraper: <span className="text-neutral-900 font-bold">scripts/eraktkosh_scraper.py</span>
        </div>
        <div>
          Run: <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-900 font-bold">python scripts/eraktkosh_scraper.py Raipur</code>
        </div>
      </div>
    </div>
  );
};