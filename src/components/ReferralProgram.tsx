import React, { useState } from 'react';
import { Gift, Share2, Award, ShieldAlert, CheckCircle2, Copy, Users, Sparkles } from 'lucide-react';

export const ReferralProgram: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'RAKSHYA-HERO-2026';
  const referralLink = `https://rakshya.org/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const TIERS = [
    {
      level: '1 Verified Donor',
      reward: 'Rakshak Certified Donor Badge',
      description: 'Official digital verified donor credential for your e-RaktKosh profile.',
      unlocked: true,
    },
    {
      level: '3 Verified Donors',
      reward: 'Free Health Diagnostic Voucher',
      description: 'Full lipid profile, hemoglobin & vitals health check at partner clinics.',
      unlocked: true,
    },
    {
      level: '5 Verified Donors',
      reward: 'Community Life-Saver Certificate & Kit',
      description: 'Recognized at regional Red Cross / Government Health summits + priority donor card.',
      unlocked: false,
    },
    {
      level: '10 Verified Donors',
      reward: 'Corporate & University Fellowship Credits',
      description: 'Sponsored health insurance subsidy points & social impact credits.',
      unlocked: false,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2">
          <Gift className="w-3.5 h-3.5 text-amber-600" /> Viral Supply-Growth Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Donor Referral & Recognition Program
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Solving the 5-million unit deficit by incentivizing citizens to build India's emergency donor registry.
        </p>
      </div>

      {/* The Legal Context Box (Judges' Discussion) */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-md mb-8">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-amber-400 font-bold block text-sm mb-1">
              Why We Reward Referrals (Not Blood Sales)
            </strong>
            Under the National Blood Transfusion Council regulations and the Supreme Court of India ruling (1996), paying cash directly for blood donation is strictly illegal. However, human systems need incentives to reach massive scale. Rakshya rewards citizens for <strong>onboarding and verifying other eligible donors</strong>, expanding the supply pool legally and ethically.
          </div>
        </div>
      </div>

      {/* Referral Link Generator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <h3 className="font-extrabold text-slate-900 text-lg mb-2">
          Your Personal Invitation Link
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Share this link with your friends, college clubs, or society WhatsApp groups. When they register their blood group and pass the cooldown verification, your progress increases.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-xs text-slate-800 overflow-x-auto">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors flex-shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Hey! I just registered as an emergency blood donor on Rakshya. India faces a 5M unit blood deficit every year. Join using my link so you can be notified if someone nearby needs a compatible match: ${referralLink}`)}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors flex-shrink-0"
          >
            <Share2 className="w-4 h-4" />
            Share on WhatsApp
          </a>
        </div>
      </div>

      {/* Milestones & Tiers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Growth Milestones</h3>
            <p className="text-xs text-slate-500">Track rewards unlocked as your community network saves lives.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-900 font-extrabold text-xs">
            <Users className="w-4 h-4 text-amber-600" />
            <span>3 Donors Onboarded</span>
          </div>
        </div>

        <div className="space-y-4">
          {TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                tier.unlocked 
                  ? 'bg-amber-50/40 border-amber-200' 
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  tier.unlocked ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {tier.level}
                    </span>
                    {tier.unlocked && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{tier.reward}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{tier.description}</p>
                </div>
              </div>

              <div className="self-end sm:self-center">
                {tier.unlocked ? (
                  <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors">
                    Claim Reward
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
