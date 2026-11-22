import React, { useState } from 'react';
import { BloodGroup, Donor } from '../types';
import { calculateDonorEligibility } from '../lib/compatibility';
import { HeartHandshake, CheckCircle2, ShieldCheck, MessageSquare, Gift, ArrowRight } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 mb-2">
          <HeartHandshake className="w-3.5 h-3.5" /> Direct Citizen Donor Registry
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Join the Life-Saving Donor Network
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Zero annoying app downloads. You will only receive a quiet WhatsApp notification if a patient in your vicinity has a critical compatible emergency.
        </p>
      </div>

      {!isSuccess ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanmay Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
                Your Blood Group
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setBloodGroup(g)}
                    className={`py-2 rounded-xl text-sm font-black border transition-all ${
                      bloodGroup === g
                        ? 'border-red-600 bg-red-50 text-red-700 shadow-xs scale-105'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Used strictly for emergency dispatch.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">
                  City / Neighborhood
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Raipur, Chhattisgarh"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            {/* Past Donation Cooldown Info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={hasDonatedBefore}
                  onChange={(e) => setHasDonatedBefore(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span>I have donated blood in the past</span>
              </label>

              {hasDonatedBefore && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Date of Last Donation (to calculate 90-day cooldown):
                  </label>
                  <input
                    type="date"
                    value={lastDonated}
                    onChange={(e) => setLastDonated(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Benefits reminder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-3 bg-red-50/50 rounded-xl border border-red-100">
                <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Automatic 90-day cooldown enforcement</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>One-tap WhatsApp emergency alert with Accept/Decline</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01]"
            >
              Complete Registration & Get Referral Code
            </button>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Welcome to Rakshya, {createdDonor?.name}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              Your profile is verified. If a patient near {createdDonor?.city} urgently requires <strong>{createdDonor?.bloodGroup}</strong> blood, you will be notified via WhatsApp.
            </p>
          </div>

          {/* Referral Incentive Card */}
          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl text-left max-w-lg mx-auto">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-1">
              <Gift className="w-5 h-5 text-amber-600" />
              Your Unique Donor Growth Code:
            </div>
            <p className="text-xs text-amber-800">
              Indian law prohibits paying for blood, but you earn rewards by onboarding new verified donors to expand the lifesaving supply.
            </p>
            <div className="mt-3 p-3 bg-white border border-amber-300 rounded-xl font-mono text-center text-sm font-black text-slate-900 tracking-wider">
              {createdDonor?.referralCode}
            </div>
            <button
              onClick={onGoToRewards}
              className="mt-4 w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              View Referral Rewards & Rewards Milestones
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Register Another Donor
          </button>
        </div>
      )}
    </div>
  );
};
