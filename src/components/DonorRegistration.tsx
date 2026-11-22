import React, { useState } from 'react';
import { BloodGroup, Donor } from '../types';
import { calculateDonorEligibility } from '../lib/compatibility';
import { CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';

interface DonorRegistrationProps {
  onDonorRegistered: (newDonor: Donor) => void;
  onGoToRewards: () => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const DonorRegistration: React.FC<DonorRegistrationProps> = ({
  onDonorRegistered,
  onGoToRewards,
}) => {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Nava Raipur');
  const [lastDonated, setLastDonated] = useState('');
  const [hasDonatedBefore, setHasDonatedBefore] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdDonor, setCreatedDonor] = useState<Donor | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const donationDateStr = hasDonatedBefore && lastDonated ? lastDonated : '';
    const { isEligible, cooldownDaysRemaining } = calculateDonorEligibility(donationDateStr);

    const newDonor: Donor = {
      id: 'dn-' + Date.now(),
      name,
      bloodGroup,
      phone: phone.startsWith('+91') ? phone : '+91 ' + phone,
      city,
      distanceKm: 3.2,
      lastDonationDate: donationDateStr || new Date().toISOString().split('T')[0],
      isEligible,
      cooldownDaysRemaining,
      donationsCount: hasDonatedBefore ? 1 : 0,
      referralCode: `${name.toUpperCase().replace(/\s+/g, '')}-${bloodGroup.replace('+', 'POS').replace('-', 'NEG')}`
    };

    onDonorRegistered(newDonor);
    setCreatedDonor(newDonor);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10 space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block">
          Civic Enrollment Protocol
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest leading-[1.1]">
          Join the Citizen Donor Network
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-generous font-sans">
          Zero app downloads. You receive a direct notification via WhatsApp only when a critical patient within your immediate transit radius requires your compatible blood type.
        </p>
      </div>

      {!isSuccess ? (
        <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs">
            {/* Full Name */}
            <div>
              <label className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanmay Sharma"
                className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="block font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold text-[11px]">
                Blood Group (Confirmed or on Record)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono">
                {BLOOD_GROUPS.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setBloodGroup(g)}
                    className={`py-2 rounded text-xs font-bold border transition-colors ${
                      bloodGroup === g
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-neutral-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none font-mono"
                />
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">Used solely for urgent emergency dispatch.</p>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold text-[11px]">
                  City / Residential Area
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Nava Raipur, Chhattisgarh"
                  className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:border-neutral-900 outline-none"
                />
              </div>
            </div>

            {/* Cooldown Protection Check */}
            <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-3 font-mono text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-800 font-semibold">
                <input
                  type="checkbox"
                  checked={hasDonatedBefore}
                  onChange={(e) => setHasDonatedBefore(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-0 w-4 h-4 border-neutral-300"
                />
                <span>I have previously donated whole blood</span>
              </label>

              {hasDonatedBefore && (
                <div className="pt-2 border-t border-neutral-200">
                  <label className="block text-neutral-600 mb-1 text-[11px]">
                    Approximate Date of Last Donation:
                  </label>
                  <input
                    type="date"
                    value={lastDonated}
                    onChange={(e) => setLastDonated(e.target.value)}
                    className="px-3 py-1.5 rounded border border-neutral-300 text-xs text-neutral-900 outline-none bg-white font-mono"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">
                    The system suppresses donor notifications for 90 days after any donation per ICMR guidelines.
                  </p>
                </div>
              )}
            </div>

            {/* Clinical Guardrails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 font-mono">
              <div className="p-3 border border-neutral-200 rounded flex items-center gap-2 bg-neutral-50">
                <ShieldCheck className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>Automated 90-day cooldown enforcement</span>
              </div>
              <div className="p-3 border border-neutral-200 rounded flex items-center gap-2 bg-neutral-50">
                <MessageSquare className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>Single-tap WhatsApp response model</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded transition-colors border border-neutral-800"
            >
              Enroll on National Civic Roster
            </button>
          </form>
        </div>
      ) : (
        /* Formal Civic Credential Display */
        <div className="border border-neutral-200 bg-white rounded-xl p-8 sm:p-12 space-y-6">
          <div className="border-b border-neutral-200 pb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-semibold block mb-1">
              Enrollment Confirmed
            </span>
            <h2 className="font-display text-3xl font-bold text-neutral-900 tracking-tightest">
              Verified Citizen Credential: {createdDonor?.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-sans leading-generous">
              Your profile is now active on the local emergency response grid. You will only receive a contact notification if a patient within transit distance of {createdDonor?.city} requires compatible {createdDonor?.bloodGroup} blood.
            </p>
          </div>

          {/* Digital Credential Document */}
          <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-lg p-6 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-neutral-400 uppercase tracking-wider text-[10px]">National Blood Transfusion Network</span>
              <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Citizen Donor</span>
                <span className="text-neutral-200 font-bold text-sm">{createdDonor?.name}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Blood Group</span>
                <span className="text-red-400 font-bold text-sm">{createdDonor?.bloodGroup}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Assigned Territory</span>
                <span className="text-neutral-200">{createdDonor?.city}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Advocacy Referral Code</span>
                <span className="text-neutral-200 font-bold">{createdDonor?.referralCode}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToRewards}
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded flex items-center justify-center gap-2 border border-neutral-800 transition-colors"
            >
              View Community Advocacy Milestones
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs rounded border border-neutral-200 transition-colors"
            >
              Enroll Another Citizen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};