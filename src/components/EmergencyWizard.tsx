import React, { useState, useEffect } from 'react';
import { DonorSimulatorModal } from './DonorSimulatorModal';
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
  ChevronRight,
  ArrowLeft,
  Hospital,
  Navigation,
  Activity
} from 'lucide-react';

interface EmergencyWizardProps {
  bloodBanks: BloodBank[];
  donors: Donor[];
  userLocation: { lat: number; lng: number; label: string };
  initialGroup?: BloodGroup | null;
  onBackToHome?: () => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const EmergencyWizard: React.FC<EmergencyWizardProps> = ({
  bloodBanks,
  donors,
  userLocation,
  initialGroup,
  onBackToHome,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(initialGroup ?? null);

  useEffect(() => {
    if (initialGroup) {
      setSelectedGroup(initialGroup);
    }
  }, [initialGroup]);

  // Form State
  const [patientName, setPatientName] = useState('Rohan Deshmukh');
  const [patientAge, setPatientAge] = useState(28);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [unitsNeeded, setUnitsNeeded] = useState(2);
  const [hospitalName, setHospitalName] = useState('AIIMS Raipur Trauma Center');
  const [contactPhone, setContactPhone] = useState('+91 98765 01234');
  
  // Active broadcast state
  const [activeSOS, setActiveSOS] = useState<SOSRequest | null>(null);
  const [simDonor, setSimDonor] = useState<Donor | null>(null);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);
  const acceptedDonorIds = activeSOS?.acceptedDonors ?? [];

  const compatibleGroups = selectedGroup ? getCompatibleDonorGroups(selectedGroup) : [];

  // Sort blood banks by real distance
  const sortedBanks = [...bloodBanks].sort((a, b) => a.distanceKm - b.distanceKm);

  // Eligible donors compatible with selected blood group
  const compatibleDonors = donors.filter(
    (d) => (step === 4 && activeSOS ? activeSOS.compatibleGroups : compatibleGroups).includes(d.bloodGroup) && d.isEligible && d.distanceKm <= 15
  );

  const nextDonor = compatibleDonors.find(d => !acceptedDonorIds.includes(d.id) && !declinedIds.includes(d.id));

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
      acceptedDonors: []
    };
    setDeclinedIds([]);
    setActiveSOS(newRequest);
    setStep(4);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Editorial Step Header Bar */}
      <div className="border border-neutral-200 bg-white rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-neutral-500 border-b border-neutral-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-neutral-800 font-bold uppercase tracking-wider">Clinical Triage Terminal</span>
          </div>
          <div>Stage {step} of 4 • Haversine Radius Active</div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-[11px] font-mono">
          <button 
            onClick={() => setStep(1)} 
            className={`text-left p-2 rounded border transition-colors ${step === 1 ? 'border-neutral-900 bg-neutral-900 text-white font-bold' : step > 1 ? 'border-neutral-300 text-neutral-800' : 'border-neutral-200 text-neutral-400'}`}
          >
            01. Blood Group
          </button>
          <button 
            onClick={() => selectedGroup && setStep(2)} 
            disabled={!selectedGroup}
            className={`text-left p-2 rounded border transition-colors ${step === 2 ? 'border-neutral-900 bg-neutral-900 text-white font-bold' : step > 2 ? 'border-neutral-300 text-neutral-800' : 'border-neutral-200 text-neutral-400'}`}
          >
            02. Storage Units
          </button>
          <button 
            onClick={() => selectedGroup && setStep(3)} 
            disabled={!selectedGroup}
            className={`text-left p-2 rounded border transition-colors ${step === 3 ? 'border-neutral-900 bg-neutral-900 text-white font-bold' : step > 3 ? 'border-neutral-300 text-neutral-800' : 'border-neutral-200 text-neutral-400'}`}
          >
            03. Broadcast SOS
          </button>
          <button 
            onClick={() => activeSOS && setStep(4)} 
            disabled={!activeSOS}
            className={`text-left p-2 rounded border transition-colors ${step === 4 ? 'border-neutral-900 bg-neutral-900 text-white font-bold' : 'border-neutral-200 text-neutral-400'}`}
          >
            04. Dispatch Room
          </button>
        </div>
      </div>

      {/* ================= STEP 1: BLOOD GROUP SELECTION ================= */}
      {step === 1 && (
        <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-12 space-y-8">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="font-mono text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
            </button>
          )}

          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block mb-2">
              Primary Diagnostic Step
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest leading-[1.1]">
              Select patient blood group for immediate matching.
            </h1>
            <p className="text-sm text-neutral-600 mt-3 leading-generous">
              No lengthy forms or delays during critical transfusion windows. Select the patient's blood type to calculate antigen compatibility and explore sample inventory.
            </p>
          </div>

          {/* Blood Group Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            {BLOOD_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-5 rounded-lg border text-left transition-colors flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50 text-neutral-900'
                  }`}
                >
                  <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight">{group}</span>
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {group === 'O-' ? 'Universal Donor' : group === 'AB+' ? 'Universal Recipient' : 'RBC Type'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Antigen Compatibility Output Card */}
          {selectedGroup && (
            <div className="border border-neutral-200 rounded-lg p-5 bg-neutral-50 max-w-3xl space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-neutral-700 font-semibold uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Antigen Compatibility Engine
              </div>
              <p className="text-neutral-700 font-sans text-xs sm:text-sm leading-generous">
                The demo matches <strong className="text-red-700 font-bold">{selectedGroup}</strong> with these red cell donor groups:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {compatibleGroups.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded bg-neutral-900 text-white font-mono font-bold text-xs border border-neutral-800"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedGroup}
              className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors border border-neutral-800"
            >
              Examine Regional Storage Stock
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: NEAREST BLOOD BANKS & FALLBACK ================= */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="font-mono text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Blood Group
                </button>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tightest">
                  Storage Units for <span className="text-red-700">{selectedGroup}</span>
                </h2>
                <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Reference: <strong className="text-neutral-800">{userLocation.label}</strong></span>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors border border-red-600 whitespace-nowrap"
              >
                Skip to Citizen Donor Dispatch
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Factual Note */}
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded text-xs text-amber-950 font-sans leading-generous flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Distance Risk: 12% of Indian districts are over 100 km from any operational blood storage facility.</strong>
                <p className="mt-0.5 text-amber-900">
                  Use the donor simulator to explore what happens when a facility has insufficient stock.
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
                  className={`border rounded-lg p-5 transition-colors bg-white ${
                    hasStock ? 'border-neutral-200' : 'border-neutral-300 bg-neutral-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                        {bank.category} • {bank.is24x7 ? '24x7 Service' : 'Limited Hours'}
                      </span>
                      <h3 className="font-sans font-bold text-neutral-900 text-sm leading-snug">
                        {bank.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1 font-sans">
                        <MapPin className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                        {bank.address}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 font-mono">
                      <span className="text-[10px] text-neutral-400 uppercase block">Distance</span>
                      <span className={`text-sm font-bold ${isFar ? 'text-amber-700' : 'text-neutral-900'}`}>
                        {bank.distanceKm} km
                      </span>
                    </div>
                  </div>

                  {/* Stock counter */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-neutral-500">Available {selectedGroup}:</div>
                      <div className="flex items-baseline gap-1.5 font-mono">
                        <span className={`text-lg font-bold ${hasStock ? 'text-emerald-700' : 'text-red-700'}`}>
                          {stockForGroup} Units
                        </span>
                        <span className="text-[10px] text-neutral-400">({bank.lastUpdated})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded flex items-center gap-1 border border-neutral-200 transition-colors"
                      >
                        <Navigation className="w-3 h-3 text-neutral-600" />
                        Directions
                      </a>
                      <a
                        href={`tel:${bank.phone}`}
                        className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 border border-neutral-800 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-neutral-300" />
                        Helpline
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dispatch Notice Card */}
          <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-xl p-6 sm:p-8 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-red-400 font-semibold block">
              Fallback Pathway
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tightest text-white">
              Are nearby storage facilities insufficient?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-generous font-sans">
              Preview an alert for <strong>{compatibleDonors.length} matching demo donors</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded text-xs flex items-center gap-2 transition-colors border border-red-600"
              >
                Broadcast to Local Donors ({compatibleDonors.length} Available)
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3: DIRECT DONOR SOS BROADCAST FORM ================= */}
      {step === 3 && (
        <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10 space-y-8">
          <button
            onClick={() => setStep(2)}
            className="font-mono text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storage Inventory
          </button>

          <div className="max-w-2xl space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block mb-1">
                Emergency Dispatch Form
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tightest">
                Broadcast Distress Alert for <span className="text-red-700">{selectedGroup}</span> Blood
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-generous font-sans">
                Use sample patient details to preview a request and simulate donor replies.
              </p>
            </div>

            <form onSubmit={event => { event.preventDefault(); handleBroadcastSOS(); }} className="space-y-4 font-sans text-xs">
              <div>
                <label htmlFor="patientName" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName" required value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patientAge" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                    Age
                  </label>
                  <input
                    type="number"
                    id="patientAge" required min={0} value={Number.isNaN(patientAge) ? '' : patientAge}
                    onChange={(e) => setPatientAge(e.target.valueAsNumber)}
                    className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="patientGender" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                    Gender
                  </label>
                  <select
                    id="patientGender" required value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="unitsNeeded" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                    Units Required
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    id="unitsNeeded" required value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                    Emergency Attendant Contact
                  </label>
                  <input
                    type="tel"
                    id="contactPhone" required value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hospitalName" className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                  Hospital Facility & Ward
                </label>
                <div className="relative">
                  <Hospital className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    id="hospitalName" required value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="e.g. AIIMS Raipur Trauma Center"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              {/* Structured Message Ledger Preview */}
              <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between text-neutral-700 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5 text-neutral-600" />
                    Structured Dispatch Payload:
                  </span>
                  <span className="text-neutral-500">Auto-Generated</span>
                </div>
                <div className="bg-white p-3 rounded border border-neutral-200 font-mono text-xs text-neutral-800 whitespace-pre-line leading-relaxed">
                  {`URGENT BLOOD REQUEST • RAKSHYA DISPATCH\n`}
                  {`Patient: ${patientName} (${patientAge}y, ${patientGender})\n`}
                  {`Blood Type: ${selectedGroup} (${unitsNeeded} Unit${unitsNeeded > 1 ? 's' : ''})\n`}
                  {`Compatible Groups: ${compatibleGroups.join(', ')}\n`}
                  {`Facility: ${hospitalName}\n`}
                  {`Contact: ${contactPhone}`}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors border border-red-600"
                >
                  <Send className="w-4 h-4" />
                  Simulate alert for {compatibleDonors.length} donors
                </button>


              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= STEP 4: LIVE SOS MATCH ROOM ================= */}
      {step === 4 && activeSOS && (
        <div className="space-y-6">
          {/* Active Broadcast Ledger Banner */}
          <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-red-950 text-red-400 border border-red-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Simulated dispatch
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-white tracking-tightest">
                  Request for {activeSOS.unitsNeeded} Units of {activeSOS.bloodGroup} Blood
                </h2>
                <p className="font-mono text-xs text-neutral-400 mt-1">
                  Patient: {activeSOS.patientName} • {activeSOS.hospitalName} • Dispatched at {activeSOS.createdAt}
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
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded flex items-center gap-1.5 border border-neutral-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share demo on WhatsApp
                </a>
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800 font-mono text-xs">
              <div className="border border-neutral-800 p-3 rounded bg-neutral-950">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Target Donors</span>
                <span className="text-lg font-bold text-white mt-1 block">{compatibleDonors.length}</span>
              </div>
              <div className="border border-neutral-800 p-3 rounded bg-neutral-950">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Responses</span>
                <span className="text-lg font-bold text-emerald-400 mt-1 block">{acceptedDonorIds.length} accepted</span>
              </div>
              <div className="border border-neutral-800 p-3 rounded bg-neutral-950">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Sample radius</span>
                <span className="text-lg font-bold text-neutral-200 mt-1 block">≤ 15 km</span>
              </div>
              <div className="border border-neutral-800 p-3 rounded bg-neutral-950">
                <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Declined</span>
                <span className="text-lg font-bold text-neutral-200 mt-1 block">{declinedIds.length}</span>
              </div>
            </div>
          </div>

          {/* Incoming Responded Donors */}
          <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tightest">
                  Donor responses
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-generous font-sans">
                  These demo donors accepted the current request in the simulator. Donor distances are sample values.
                </p>
              </div>

              {/* Simulation Trigger */}
              <button
                disabled={!nextDonor}
                onClick={() => setSimDonor(nextDonor ?? null)}
                className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors border border-neutral-800"
              >
                {nextDonor ? 'Simulate donor response' : 'No more donors to preview'}
              </button>
            </div>

            <div className="space-y-3 font-sans">
              {acceptedDonorIds.length === 0 && <p role="status" className="text-sm text-neutral-600">No donors have accepted this request yet.</p>}
              {compatibleDonors
                .filter(d => acceptedDonorIds.includes(d.id))
                .map((donor) => (
                  <div
                    key={donor.id}
                    className="border border-neutral-300 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded border border-neutral-800 bg-neutral-900 text-white font-mono font-bold flex items-center justify-center text-lg flex-shrink-0">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-neutral-900 text-base">{donor.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Accepted in demo
                          </span>
                        </div>
                        <div className="text-xs text-neutral-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                          <span>Transit: <strong>{donor.distanceKm} km</strong></span>
                          <span>Location: {donor.city}</span>
                          <span>Demo contact: {donor.phone}</span>
                          <span>Prior Donations: {donor.donationsCount}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {simDonor && activeSOS && (
        <DonorSimulatorModal
          donor={simDonor}
          request={activeSOS}
          onClose={() => setSimDonor(null)}
          onDecline={() => setDeclinedIds(ids => [...new Set([...ids, simDonor.id])])}
          onDonorAccept={id => setActiveSOS(request => request && ({
            ...request,
            status: 'MATCHED',
            acceptedDonors: [...new Set([...request.acceptedDonors, id])],
          }))}
        />
      )}
    </div>
  );
};