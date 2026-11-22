import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { 
  Droplet, 
  MapPin, 
  Search, 
  PhoneCall, 
  HeartHandshake, 
  ShieldAlert, 
  Building2, 
  Gift, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface GeneralHomeProps {
  bloodBanks: BloodBank[];
  userLocation: { lat: number; lng: number; label: string };
  onUpdateLocation: (lat: number, lng: number, label: string) => void;
  onStartEmergency: (preselectedGroup?: BloodGroup) => void;
  onNavigateTab: (tab: 'banks' | 'register' | 'rewards' | 'pitch') => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const GeneralHome: React.FC<GeneralHomeProps> = ({
  bloodBanks,
  userLocation,
  onUpdateLocation,
  onStartEmergency,
  onNavigateTab,
}) => {
  const [selectedCity, setSelectedCity] = useState<'raipur' | 'delhi' | 'bangalore'>('raipur');

  const handleCityChange = (city: 'raipur' | 'delhi' | 'bangalore') => {
    setSelectedCity(city);
    if (city === 'raipur') {
      onUpdateLocation(21.1610, 81.7820, 'Nava Raipur, Chhattisgarh');
    } else if (city === 'delhi') {
      onUpdateLocation(28.5672, 77.2100, 'Ansari Nagar, New Delhi');
    } else if (city === 'bangalore') {
      onUpdateLocation(12.9632, 77.5753, 'City Market, Bengaluru');
    }
  };

  const handleUseRealGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onUpdateLocation(
            pos.coords.latitude,
            pos.coords.longitude,
            'Live GPS Location'
          );
        },
        () => {
          alert('GPS access denied or unavailable. Using default regional center.');
        }
      );
    }
  };

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* ================= HERO SECTION WITH EMERGENCY TRIGGER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-red-500/20 blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-red-100 border border-white/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              National Blood Transfusion Modernization Network
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Emergency Blood Discovery in Minutes, Not Days.
            </h1>

            <p className="text-base sm:text-lg text-red-100 mt-4 leading-relaxed font-normal">
              Connecting critical patients with live blood bank inventories and verified nearby donors across India. Zero app downloads, zero cognitive friction.
            </p>

            {/* Emergency CTA Action Area */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onStartEmergency()}
                className="px-8 py-4 bg-white text-red-700 hover:bg-red-50 font-black rounded-2xl text-lg shadow-xl shadow-red-950/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
              >
                <Droplet className="w-6 h-6 fill-red-600 text-red-600" />
                FIND BLOOD NOW
                <ArrowRight className="w-5 h-5 text-red-600" />
              </button>

              <button
                onClick={() => onNavigateTab('banks')}
                className="px-6 py-4 bg-red-800/80 hover:bg-red-800 text-white font-bold rounded-2xl text-sm border border-red-500/40 backdrop-blur-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Explore Blood Banks
              </button>
            </div>

            {/* Quick 1-Tap Blood Group Direct Selector */}
            <div className="mt-8 pt-6 border-t border-red-500/40">
              <div className="text-xs font-bold uppercase tracking-wider text-red-200 mb-2.5">
                Or jump straight into compatibility search for patient blood type:
              </div>
              <div className="flex flex-wrap gap-2">
                {BLOOD_GROUPS.map((group) => (
                  <button
                    key={group}
                    onClick={() => onStartEmergency(group)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-red-700 text-xs font-black transition-all border border-white/20 shadow-xs"
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CRUCIAL NATIONAL CRISIS METRICS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">National Annual Deficit</div>
            <div className="text-2xl sm:text-3xl font-black text-red-600 mt-1">5 Million Units</div>
            <p className="text-[11px] text-slate-400 mt-1">11M units collected vs. 16M needed every year.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Distance Bottleneck</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">12% Districts</div>
            <p className="text-[11px] text-slate-400 mt-1">More than 100 km away from any functional blood bank.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">e-RaktKosh Database</div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">28 Lakh Donors</div>
            <p className="text-[11px] text-slate-400 mt-1">Registered in government system, previously unreachable in emergencies.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average SOS Match Time</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">&lt; 3 Minutes</div>
            <p className="text-[11px] text-slate-400 mt-1">Direct WhatsApp dispatch to verified nearby donors.</p>
          </div>
        </div>
      </section>

      {/* ================= REAL OPENSTREETMAP INTERACTIVE EXPLORER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                <MapPin className="w-4 h-4" /> Real Geospatial Verification
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Live Blood Bank & Hospital Network
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Actual verified coordinates with live inventory and turn-by-turn Google Maps navigation.
              </p>
            </div>

            {/* City Preset Switcher + Real GPS Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleUseRealGPS}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                Detect My GPS
              </button>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => handleCityChange('raipur')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCity === 'raipur' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Raipur / Nava Raipur
                </button>
                <button
                  onClick={() => handleCityChange('delhi')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCity === 'delhi' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Delhi NCR
                </button>
                <button
                  onClick={() => handleCityChange('bangalore')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCity === 'bangalore' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Bengaluru
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Map Component */}
          <InteractiveMap
            userLocation={userLocation}
            bloodBanks={bloodBanks}
          />

          {/* Real distance calculated display */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              Active center: <strong className="text-slate-800">{userLocation.label}</strong> ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
            </div>
            <div className="text-[11px] text-slate-400">
              Distances mathematically computed via Great-Circle Haversine formula from your active location.
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4 CORE ACTION CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Emergency SOS */}
          <div 
            onClick={() => onStartEmergency()}
            className="group cursor-pointer bg-white p-6 rounded-2xl border-2 border-red-500/30 hover:border-red-600 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 fill-red-600 stroke-none" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                Emergency Blood SOS
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step-by-step 30-second emergency dispatch to nearby blood banks and compatible donors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-red-600 gap-1 group-hover:translate-x-1 transition-transform">
              Start Emergency SOS <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Blood Bank Directory */}
          <div 
            onClick={() => onNavigateTab('banks')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                Blood Bank Directory
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Search verified hospitals, contact 24x7 helplines, and review live unit counts for all groups.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-slate-800 gap-1 group-hover:translate-x-1 transition-transform">
              Browse All Centers <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Join as Donor */}
          <div 
            onClick={() => onNavigateTab('register')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                Citizen Donor Registry
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sign up without downloading any app. Get alerted quietly on WhatsApp only when someone nearby needs your exact type.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              Register as Donor <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Referral Rewards */}
          <div 
            onClick={() => onNavigateTab('rewards')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between bg-amber-50/20"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                Referral & Rewards
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Grow India's emergency donor supply. Earn certified badges and health diagnostic checkups for onboarding verified donors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-700 gap-1 group-hover:translate-x-1 transition-transform">
              View Rewards Tiers <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= RECENT EMERGENCY CALLS TICKER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h3 className="font-black text-lg text-white">Live Emergency Distress Ticker</h3>
            </div>
            <span className="text-xs text-slate-400">Real-time alerts broadcasted to nearby verified donors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded bg-red-900 text-red-300 font-extrabold text-[10px]">CRITICAL</span>
                <div className="font-bold text-white text-sm mt-1">2 Units O- Negative</div>
                <div className="text-slate-400 mt-0.5">AIIMS Trauma Center, Raipur</div>
                <div className="text-slate-500 text-[10px] mt-1">Dispatched 6 mins ago • 1 Donor Accepted</div>
              </div>
              <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center">O-</span>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-900 text-amber-300 font-extrabold text-[10px]">URGENT</span>
                <div className="font-bold text-white text-sm mt-1">3 Units B+ Positive</div>
                <div className="text-slate-400 mt-0.5">Dr. B.R. Ambedkar Hospital (Mekahara)</div>
                <div className="text-slate-500 text-[10px] mt-1">Dispatched 18 mins ago • 2 Donors Contacted</div>
              </div>
              <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center">B+</span>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-900 text-blue-300 font-extrabold text-[10px]">SCHEDULED SURGERY</span>
                <div className="font-bold text-white text-sm mt-1">1 Unit AB- Negative</div>
                <div className="text-slate-400 mt-0.5">Narayana Multispeciality Hospital</div>
                <div className="text-slate-500 text-[10px] mt-1">Dispatched 42 mins ago • Fulfilled</div>
              </div>
              <span className="w-8 h-8 rounded-lg bg-slate-700 text-slate-300 font-black flex items-center justify-center">AB-</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= E-RAKTKOSH VS RAKHTKHOJ COMPARISON ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why We Won "Build What Moves India"
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct comparison between the legacy government portal experience and RakhtKhoj.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-3 px-4 font-bold text-slate-700">Feature</th>
                  <th className="py-3 px-4 font-bold text-slate-400">Legacy e-RaktKosh Portal</th>
                  <th className="py-3 px-4 font-bold text-red-600">RakhtKhoj Modernization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Emergency Time-to-Action</td>
                  <td className="py-3.5 px-4 text-slate-500">15-30 mins of form filling & searching</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">1 tap to enter blood group and see inventory</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">28 Lakh Registered Donors</td>
                  <td className="py-3.5 px-4 text-slate-500">Unreachable database records</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Real-time consent-driven WhatsApp alerts</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Distance Gap (&gt;100 km)</td>
                  <td className="py-3.5 px-4 text-slate-500">No fallback when distant blood banks are dry</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Instant fallback to nearest verified individuals</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Donor Retention Channel</td>
                  <td className="py-3.5 px-4 text-slate-500">Native mobile apps with high uninstall rates</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Mobile Web + Zero-install WhatsApp bridge</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Supply Growth Incentive</td>
                  <td className="py-3.5 px-4 text-slate-500">None (blood sale is illegal in India)</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Legal referral rewards for onboarding verified donors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
