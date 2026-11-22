import React, { useState, useEffect } from 'react';
import { BloodGroup, BloodBank, Donor, SOSRequest } from '../types';
import { getCompatibleDonorGroups } from '../lib/compatibility';
import { generateWhatsAppMessage } from '../lib/mockData';
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Hospital,
  Navigation
} from 'lucide-react';

interface EmergencyWizardProps {
  bloodBanks: BloodBank[];
  donors: Donor[];
  userLocation: { lat: number; lng: number; label: string };
  initialGroup?: BloodGroup | null;
  onOpenDonorSimulator: (request: SOSRequest, donor: Donor) => void;
  onBackToHome?: () => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const EmergencyWizard: React.FC<EmergencyWizardProps> = ({
  bloodBanks,
  donors,
  userLocation,
  initialGroup,
  onOpenDonorSimulator,
  onBackToHome,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(initialGroup || 'O+');

  useEffect(() => {
    if (initialGroup) {
      setSelectedGroup(initialGroup);
    }
  }, [initialGroup]);

  // SOS Form State
  const [patientName, setPatientName] = useState('Rohan Deshmukh');
  const [patientAge, setPatientAge] = useState(28);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [unitsNeeded, setUnitsNeeded] = useState(2);
  const [hospitalName, setHospitalName] = useState('AIIMS Raipur Trauma Center');
  const [contactPhone, setContactPhone] = useState('+91 98765 01234');
  
  // Active broadcast state
  const [activeSOS, setActiveSOS] = useState<SOSRequest | null>(null);
  const [acceptedDonorIds] = useState<string[]>(['dn-1']);

  const compatibleGroups = selectedGroup ? getCompatibleDonorGroups(selectedGroup) : [];

  // Sort blood banks by real distance
  const sortedBanks = [...bloodBanks].sort((a, b) => a.distanceKm - b.distanceKm);

  // Eligible donors compatible with selected blood group
  const compatibleDonors = donors.filter(
    (d) => selectedGroup && compatibleGroups.includes(d.bloodGroup) && d.isEligible
  );

  const handleBroadcastSOS = () => {
    if (!selectedGroup) return;
    const newRequest: SOSRequest = {
      id: 'sos-' + Date.now(),
      patientName,
      patientAge,
      patientGender,
      bloodGroup: selectedGroup,
      unitsNeeded,
      hospitalName,
      city: userLocation.label,
      contactPerson: 'Attendant / Family Member',
      contactPhone,
      urgency: 'CRITICAL',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      compatibleGroups,
      status: 'BROADCASTED',
      acceptedDonors: acceptedDonorIds
    };
    setActiveSOS(newRequest);
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 mb-2">
          <span className={step >= 1 ? 'text-red-600 font-bold' : ''}>1. Blood Group</span>
          <span className={step >= 2 ? 'text-red-600 font-bold' : ''}>2. Blood Banks</span>
          <span className={step >= 3 ? 'text-red-600 font-bold' : ''}>3. Donor SOS</span>
          <span className={step >= 4 ? 'text-red-600 font-bold' : ''}>4. Live Matching</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-red-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ================= STEP 1: BLOOD GROUP SELECTION ================= */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
          )}

          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" /> Emergency Protocol
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What is the blood group of the patient?
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              No long forms or delays. Tap the patient's blood type to instantly calculate safe compatible donors and check live blood bank inventory.
            </p>
          </div>

          {/* Blood Group Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {BLOOD_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 sm:p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-red-600 bg-red-50 text-red-900 shadow-md shadow-red-500/10 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-800'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black tracking-tight">{group}</span>
                  <span className="text-[11px] font-medium text-slate-500 mt-1">
                    {group === 'O-' ? 'Universal Donor' : group === 'AB+' ? 'Universal Recipient' : 'RBC Type'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Compatibility Preview */}
          {selectedGroup && (
            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-2xl mx-auto">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-600 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Antigen Compatibility Engine Calculation:
              </div>
              <p className="text-sm text-slate-700">
                A patient with <strong className="text-red-600 font-extrabold">{selectedGroup}</strong> blood can safely receive transfusions from donors with:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {compatibleGroups.map((g) => (
                  <span
                    key={g}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-red-600 text-white shadow-xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedGroup}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue to Nearest Blood Banks
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: NEAREST BLOOD BANKS & FALLBACK ================= */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Blood Group
                </button>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Nearest Blood Banks for <span className="text-red-600">{selectedGroup}</span>
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Searching around: <strong>{userLocation.label}</strong> ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})</span>
                </div>
              </div>

              {/* Fast Switch to Direct Donor SOS */}
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Skip Banks & Search Donors Directly
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Crucial Problem Highlight from Hackathon */}
            <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">12% of Indian districts are &gt;100 km away from any blood bank.</strong>
                <p className="text-amber-800 mt-0.5">
                  If blood bank stock is 0 units or distance is prohibitive, use the <strong>"Search Donors Near You"</strong> option below to alert verified local donors on WhatsApp immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Blood Bank Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedBanks.map((bank) => {
              const stockForGroup = selectedGroup ? bank.stock[selectedGroup] : 0;
              const hasStock = stockForGroup > 0;
              const isFar = bank.distanceKm > 50;

              return (
                <div
                  key={bank.id}
                  className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
                    hasStock ? 'border-slate-200 hover:border-slate-300' : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-1.5">
                        {bank.category} • {bank.is24x7 ? '24x7 Open' : 'Limited Hours'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {bank.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        {bank.address}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-semibold text-slate-500">Distance</div>
                      <div className={`text-base font-extrabold ${isFar ? 'text-amber-600' : 'text-slate-900'}`}>
                        {bank.distanceKm} km
                      </div>
                    </div>
                  </div>

                  {/* Stock counter */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500">Stock for {selectedGroup}:</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-xl font-black ${hasStock ? 'text-emerald-600' : 'text-red-600'}`}>
                          {stockForGroup} Units
                        </span>
                        <span className="text-[10px] text-slate-400">({bank.lastUpdated})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        Map
                      </a>
                      <a
                        href={`tel:${bank.phone}`}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Urgent Trigger: "Are blood banks too far / empty?" */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-red-600/20 text-center">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Banks too far or units depleted?
            </h3>
            <p className="text-sm text-red-100 max-w-xl mx-auto mt-2">
              Don't lose time traveling to out-of-stock facilities. Dispatch an immediate broadcast to <strong>{compatibleDonors.length} verified compatible donors</strong> right in your neighborhood.
            </p>
            <button
              onClick={() => setStep(3)}
              className="mt-6 px-8 py-3.5 bg-white text-red-600 hover:bg-red-50 font-black rounded-xl text-base shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              Search Donors Near You ({compatibleDonors.length} Available)
              <ChevronRight className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: DIRECT DONOR SOS BROADCAST FORM ================= */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <button
            onClick={() => setStep(2)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blood Banks
          </button>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 mb-2">
                Emergency Donor Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Broadcast SOS for <span className="text-red-600">{selectedGroup}</span> Blood
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter basic patient coordinates. Our system will format a verified alert and message nearby compatible donors.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                    Units Needed
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                  Hospital Name & Location
                </label>
                <div className="relative">
                  <Hospital className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="e.g. AIIMS Raipur Trauma Center"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Pre-formatted WhatsApp Message Preview */}
              <div className="mt-6 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                    Structured Auto-Generated WhatsApp Broadcast:
                  </span>
                  <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900 font-semibold">
                    Compatible Types Included
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-800 font-mono whitespace-pre-line shadow-xs">
                  {`🚨 URGENT BLOOD REQUEST (via RakhtKhoj) 🚨\n`}
                  {`Patient: ${patientName} (${patientAge}y, ${patientGender})\n`}
                  {`Blood Needed: ${selectedGroup} (${unitsNeeded} Unit${unitsNeeded > 1 ? 's' : ''})\n`}
                  {`Compatible Donor Types: ${compatibleGroups.join(', ')}\n`}
                  {`Hospital: ${hospitalName}\n`}
                  {`Contact: ${contactPhone}`}
                </div>
              </div>

              {/* Broadcast Trigger */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBroadcastSOS}
                  className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  Broadcast SOS to {compatibleDonors.length} Nearby Donors
                </button>

                <a
                  href={generateWhatsAppMessage(
                    patientName,
                    selectedGroup!,
                    unitsNeeded,
                    hospitalName,
                    userLocation.label,
                    compatibleGroups,
                    contactPhone
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: LIVE SOS MATCH ROOM ================= */}
      {step === 4 && activeSOS && (
        <div className="space-y-6">
          {/* Active Broadcast Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Live Emergency Broadcast Active
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2">
                  Request for {activeSOS.unitsNeeded} Units of{' '}
                  <span className="text-red-500">{activeSOS.bloodGroup}</span> Blood
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Patient: <strong>{activeSOS.patientName}</strong> • {activeSOS.hospitalName} • Dispatched at {activeSOS.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={generateWhatsAppMessage(
                    activeSOS.patientName,
                    activeSOS.bloodGroup,
                    activeSOS.unitsNeeded,
                    activeSOS.hospitalName,
                    activeSOS.city,
                    activeSOS.compatibleGroups,
                    activeSOS.contactPhone
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Forward to Family WhatsApp
                </a>
              </div>
            </div>

            {/* Broadcast Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-center">
              <div className="bg-slate-800/60 p-3 rounded-xl">
                <div className="text-xs text-slate-400">Target Donors</div>
                <div className="text-xl font-black text-white">{compatibleDonors.length} Donors</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl">
                <div className="text-xs text-slate-400">Acceptances</div>
                <div className="text-xl font-black text-emerald-400">{acceptedDonorIds.length} Accepted</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl">
                <div className="text-xs text-slate-400">Search Radius</div>
                <div className="text-xl font-black text-blue-400">&lt; 15 km</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl">
                <div className="text-xs text-slate-400">Avg Response Time</div>
                <div className="text-xl font-black text-amber-400">2.4 mins</div>
              </div>
            </div>
          </div>

          {/* Incoming Responded Donors */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Verified Responded Donors
                </h3>
                <p className="text-xs text-slate-500">
                  Donors who have passed the 90-day cooldown check and accepted your request.
                </p>
              </div>

              {/* Button to simulate another donor responding */}
              <button
                onClick={() => {
                  const nextDonor = compatibleDonors.find(d => !acceptedDonorIds.includes(d.id));
                  if (nextDonor) {
                    onOpenDonorSimulator(activeSOS, nextDonor);
                  } else {
                    alert('All mock eligible donors have responded!');
                  }
                }}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                Simulate Donor WhatsApp Flow
              </button>
            </div>

            <div className="space-y-4">
              {compatibleDonors
                .filter(d => acceptedDonorIds.includes(d.id))
                .map((donor) => (
                  <div
                    key={donor.id}
                    className="border-2 border-emerald-500/40 bg-emerald-50/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base">{donor.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Eligible & Ready
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>Distance: <strong className="text-slate-800">{donor.distanceKm} km away</strong></span>
                          <span>Location: {donor.city}</span>
                          <span>Total Past Donations: {donor.donationsCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a
                        href={`tel:${donor.phone}`}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call Donor
                      </a>
                      <a
                        href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}?text=Hello%20${donor.name},%20we%20received%20your%20acceptance%20on%20RakhtKhoj%20for%20${activeSOS.patientName}.%20Thank%20you%20so%20much.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
