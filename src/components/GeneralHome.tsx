import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Droplet, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Navigation,
  ArrowUpRight,
  Shield,
  Layers,
  Activity
} from 'lucide-react';

interface GeneralHomeProps {
  bloodBanks: BloodBank[];
  userLocation: { lat: number; lng: number; label: string };
  onUpdateLocation: (lat: number, lng: number, label: string) => void;
  onStartEmergency: (preselectedGroup?: BloodGroup) => void;
  onNavigateTab: (tab: 'banks' | 'register' | 'rewards' | 'architecture') => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const GeneralHome: React.FC<GeneralHomeProps> = ({
  bloodBanks,
  userLocation,
  onUpdateLocation,
  onStartEmergency,
  onNavigateTab,
}) => {
  const [locationError, setLocationError] = useState('');
  const selectedCity = userLocation.label;

  const handleCityChange = (city: 'raipur' | 'delhi' | 'bangalore') => {
    setLocationError('');
    if (city === 'raipur') {
      onUpdateLocation(21.1610, 81.7820, 'Nava Raipur, Chhattisgarh');
    } else if (city === 'delhi') {
      onUpdateLocation(28.5672, 77.2100, 'Ansari Nagar, New Delhi');
    } else if (city === 'bangalore') {
      onUpdateLocation(12.9632, 77.5753, 'City Market, Bengaluru');
    }
  };

  const handleUseRealGPS = () => {
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Location is unavailable in this browser. Select a city.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
          onUpdateLocation(
            pos.coords.latitude,
            pos.coords.longitude,
            'Live GPS Location'
          );
        },
        () => {
          setLocationError('Could not get your location. Select a city or enable location access.');
        }
      );
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* ================= HERO SECTION (EDITORIAL ASYMMETRIC) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-300 bg-neutral-900 text-neutral-100 rounded-2xl p-8 sm:p-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Primary Editorial Headline & Context (7 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Rakshya blood discovery demo
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tightest leading-[1.08] text-white">
                Find blood banks and matching donors
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-generous max-w-2xl font-normal">
                Explore sample blood bank stock, compare facility distances, and try a donor request with a simulated response.
              </p>

              {/* Action Rows */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onStartEmergency()}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm sm:text-base flex items-center justify-center gap-3 transition-colors border border-red-500"
                >
                  <Droplet className="w-5 h-5 fill-white stroke-none" />
                  Initiate Emergency Search
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateTab('banks')}
                  className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                >
                  Inspect Blood Bank Inventory
                </button>
              </div>

              {/* 1-Tap Blood Group Direct Selector */}
              <div className="pt-6 border-t border-neutral-800">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Direct Triage By Patient Blood Group:
                </div>
                <div className="flex flex-wrap gap-2">
                  {BLOOD_GROUPS.map((group) => (
                    <button
                      key={group}
                      onClick={() => onStartEmergency(group)}
                      className="px-3.5 py-2 rounded bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 text-white text-xs font-mono font-bold transition-colors border border-neutral-700"
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Asymmetric Briefing Column (4 cols) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8 space-y-6 font-mono text-xs text-neutral-400">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Mission</span>
                <span className="text-neutral-200 font-semibold mt-1 block font-sans text-sm">
                  Decentralized Public Health Defense
                </span>
                <p className="text-neutral-400 mt-1 leading-relaxed font-sans">
                  Solving the critical golden-hour gap for accident victims and urgent surgical procedures.
                </p>
              </div>

              <div className="border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Transfusion Rule</span>
                <span className="text-neutral-200 font-semibold mt-1 block font-sans text-sm">
                  Haversine & 90-Day Safeguard
                </span>
                <p className="text-neutral-400 mt-1 leading-relaxed font-sans">
                  Donors on a 90-day cooldown are automatically suppressed to protect donor health.
                </p>
              </div>

              <div>
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Access Model</span>
                <span className="text-neutral-200 font-semibold mt-1 block font-sans text-sm">
                  Web-First + Direct WhatsApp
                </span>
                <p className="text-neutral-400 mt-1 leading-relaxed font-sans">
                  Zero install requirement ensures 100% notification receipt without app churn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CRISIS METRICS DATA LEDGER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Annual Deficit</span>
            <div className="font-display text-3xl font-bold text-red-700 tracking-tightest mt-2">
              5 Million Units
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-generous">
              India collects 11 million units annually against a clinical demand of 16 million units.
            </p>
          </div>

          <div className="p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Distance Bottleneck</span>
            <div className="font-display text-3xl font-bold text-neutral-900 tracking-tightest mt-2">
              12% of Districts
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-generous">
              Over 100 km away from any operational blood storage unit, exceeding safe transit windows.
            </p>
          </div>

          <div className="p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">National Records</span>
            <div className="font-display text-3xl font-bold text-neutral-900 tracking-tightest mt-2">
              2.8 Million
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-generous">
              Registered donors in e-RaktKosh who were historically unreachable during urgent emergencies.
            </p>
          </div>

          <div className="p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Target Match Window</span>
            <div className="font-display text-3xl font-bold text-emerald-700 tracking-tightest mt-2">
              &lt; 3 Minutes
            </div>
            <p className="text-xs text-neutral-600 mt-2 leading-generous">
              From blood group entry to automated broadcast across compatible verified local contacts.
            </p>
          </div>
        </div>
      </section>

      {/* ================= GEOSPATIAL MAP & INVENTORY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-700 mb-1">
                <MapPin className="w-3.5 h-3.5" /> Real Coordinates & In-Stock Units
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tightest">
                Blood Storage & Hospital Network
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-generous">
                Compare sample stock and straight-line distances from your selected location.
              </p>
            </div>

            {/* City Preset Switcher + Real GPS Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleUseRealGPS}
                className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors border border-neutral-800"
              >
                <Navigation className="w-3.5 h-3.5 text-neutral-300" />
                Detect GPS
              </button>

              <div className="flex border border-neutral-300 rounded p-0.5 text-xs font-medium bg-neutral-50">
                <button
                  onClick={() => handleCityChange('raipur')}
                  className={`px-3 py-1.5 rounded transition-colors ${selectedCity === 'Nava Raipur, Chhattisgarh' ? 'bg-white text-red-700 font-semibold shadow-xs border border-neutral-200' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  Raipur
                </button>
                <button
                  onClick={() => handleCityChange('delhi')}
                  className={`px-3 py-1.5 rounded transition-colors ${selectedCity === 'Ansari Nagar, New Delhi' ? 'bg-white text-red-700 font-semibold shadow-xs border border-neutral-200' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  Delhi NCR
                </button>
                <button
                  onClick={() => handleCityChange('bangalore')}
                  className={`px-3 py-1.5 rounded transition-colors ${selectedCity === 'City Market, Bengaluru' ? 'bg-white text-red-700 font-semibold shadow-xs border border-neutral-200' : 'text-neutral-600 hover:text-neutral-900'}`}
                >
                  Bengaluru
                </button>
              </div>
            </div>
          </div>

          {locationError && <p role="status" className="text-sm text-red-700">{locationError}</p>}
          {/* Map Viewer */}
          <InteractiveMap
            userLocation={userLocation}
            bloodBanks={bloodBanks}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2 font-mono">
            <div>
              Active Reference: <strong className="text-neutral-800">{userLocation.label}</strong> ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
            </div>
            <div className="text-[11px] text-neutral-400">
              Distances calculated via Great-Circle Haversine formula.
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE ARCHITECTURAL PATHWAYS (ASYMMETRIC) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feature: Emergency Dispatch Pipeline (7 cols) */}
          <div className="lg:col-span-7 border border-neutral-200 bg-white rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold">
                Primary Flow • 30-Second Triage
              </span>
              <span className="font-mono text-xs text-neutral-400">Section 01</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tightest">
              Emergency SOS Dispatch Pipeline
            </h3>

            <p className="text-sm text-neutral-600 leading-generous">
              Designed for families standing in emergency hospital corridors under high cognitive strain. Rather than filling multi-page forms, one tap on the patient blood group activates simultaneous discovery:
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-700 leading-generous font-sans">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded border border-neutral-300 bg-neutral-100 flex items-center justify-center font-mono text-[10px] text-neutral-800 font-bold flex-shrink-0 mt-0.5">1</span>
                <span><strong>Antigen Compatibility Match:</strong> RBC rules immediately identify all safe donor groups (e.g. an O+ patient can receive both O+ and O-).</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded border border-neutral-300 bg-neutral-100 flex items-center justify-center font-mono text-[10px] text-neutral-800 font-bold flex-shrink-0 mt-0.5">2</span>
                <span><strong>Blood bank inventory.</strong> Compare sample stock at nearby facilities.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded border border-neutral-300 bg-neutral-100 flex items-center justify-center font-mono text-[10px] text-neutral-800 font-bold flex-shrink-0 mt-0.5">3</span>
                <span><strong>Direct Citizen Broadcast:</strong> If centers are out of stock or beyond 100 km, the system broadcasts alerts to verified donors in proximity.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onStartEmergency()}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded text-xs flex items-center gap-2 transition-colors border border-red-600"
              >
                Launch Emergency SOS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secondary Stack: Editorial Catalog (5 cols) */}
          <div className="lg:col-span-5 border border-neutral-200 bg-white rounded-xl divide-y divide-neutral-200">
            {/* Catalog Item 1: Directory */}
            <div 
              onClick={() => onNavigateTab('banks')}
              className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>CATALOG / 02</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </div>
              <h4 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
                Blood Bank Directory & Stock
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-generous">
                Search the facility directory and filter sample inventory by blood group.
              </p>
            </div>

            {/* Catalog Item 2: Citizen Donor Ledger */}
            <div 
              onClick={() => onNavigateTab('register')}
              className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>CATALOG / 03</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </div>
              <h4 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
                Citizen Donor Registry
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-generous">
                Add a sample donor and see how their blood group and last donation date affect matching.
              </p>
            </div>

            {/* Catalog Item 3: Ethical Referral Incentives */}
            <div 
              onClick={() => onNavigateTab('rewards')}
              className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                <span>CATALOG / 04</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </div>
              <h4 className="font-display text-lg font-bold text-neutral-900 tracking-tightest">
                Referral & Community Supply
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-generous">
                Legal growth mechanism under NBTC guidelines: earn recognized certificates and health diagnostic checkups for onboarding verified donors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE DISPATCH AUDIT LOG ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <h3 className="font-display text-lg font-bold text-white tracking-tightest">
                Example dispatch log
              </h3>
            </div>
            <span className="font-mono text-xs text-neutral-400">Illustrative requests and responses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="border border-neutral-800 p-4 rounded bg-neutral-950 flex justify-between items-start">
              <div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-900">
                  CRITICAL
                </span>
                <div className="font-sans font-bold text-white text-sm mt-2">2 Units O- Negative</div>
                <div className="text-neutral-400 text-xs mt-0.5 font-sans">AIIMS Trauma Center, Raipur</div>
                <div className="text-neutral-500 text-[10px] mt-2">Dispatched 6 mins ago • 1 Donor Confirmed</div>
              </div>
              <span className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 text-neutral-200 font-bold flex items-center justify-center">O-</span>
            </div>

            <div className="border border-neutral-800 p-4 rounded bg-neutral-950 flex justify-between items-start">
              <div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-900">
                  URGENT
                </span>
                <div className="font-sans font-bold text-white text-sm mt-2">3 Units B+ Positive</div>
                <div className="text-neutral-400 text-xs mt-0.5 font-sans">Dr. B.R. Ambedkar Memorial Hospital</div>
                <div className="text-neutral-500 text-[10px] mt-2">Dispatched 18 mins ago • 2 Donors Contacted</div>
              </div>
              <span className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 text-neutral-200 font-bold flex items-center justify-center">B+</span>
            </div>

            <div className="border border-neutral-800 p-4 rounded bg-neutral-950 flex justify-between items-start">
              <div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  ELECTIVE
                </span>
                <div className="font-sans font-bold text-white text-sm mt-2">1 Unit AB- Negative</div>
                <div className="text-neutral-400 text-xs mt-0.5 font-sans">Narayana Multispeciality Hospital</div>
                <div className="text-neutral-500 text-[10px] mt-2">Dispatched 42 mins ago • Fulfilled</div>
              </div>
              <span className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 text-neutral-300 font-bold flex items-center justify-center">AB-</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= E-RAKTKOSH VS RAKSHYA COMPARISON ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">Architectural Comparison</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tightest mt-1">
              Decentralized Dispatch vs Legacy Portal
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-generous">
              Direct comparison between the legacy government portal design and Rakshya's decentralized approach.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="py-3 px-4 font-mono font-semibold text-neutral-700 uppercase tracking-wider text-[11px]">Feature</th>
                  <th className="py-3 px-4 font-mono font-semibold text-neutral-500 uppercase tracking-wider text-[11px]">Legacy e-RaktKosh Portal</th>
                  <th className="py-3 px-4 font-mono font-semibold text-red-700 uppercase tracking-wider text-[11px]">Rakshya Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-sans">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Emergency Time-to-Action</td>
                  <td className="py-3.5 px-4 text-neutral-600">15-30 mins of form filling and static page navigation</td>
                  <td className="py-3.5 px-4 text-neutral-900 font-semibold">1 tap to enter blood group and inspect live inventory</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">2.8 Million Registered Donors</td>
                  <td className="py-3.5 px-4 text-neutral-600">Unreachable database records with no citizen access</td>
                  <td className="py-3.5 px-4 text-neutral-900 font-semibold">Direct consent-driven WhatsApp alerts to nearby verified donors</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Distance Gap (&gt;100 km)</td>
                  <td className="py-3.5 px-4 text-neutral-600">No emergency fallback when distant centers lack stock</td>
                  <td className="py-3.5 px-4 text-neutral-900 font-semibold">Automatic broadcast fallback to nearest verified individuals</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Donor Retention Channel</td>
                  <td className="py-3.5 px-4 text-neutral-600">Standalone apps with high uninstallation rates (&gt;90 days between donations)</td>
                  <td className="py-3.5 px-4 text-neutral-900 font-semibold">Mobile Web + Zero-install WhatsApp bridge</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Supply Growth Incentive</td>
                  <td className="py-3.5 px-4 text-neutral-600">None (blood commercialization is illegal in India)</td>
                  <td className="py-3.5 px-4 text-neutral-900 font-semibold">Ethical referral recognition and diagnostic checkups for community advocates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};