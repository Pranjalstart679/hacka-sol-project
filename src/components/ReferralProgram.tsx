import React, { useState } from 'react';
import { Share2, CheckCircle2, Copy, Users, Scale } from 'lucide-react';

export const ReferralProgram: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'RAKSHYA-HERO-2026';
  const referralLink = `https://rakshya-app.vercel.app/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const TIERS = [
    {
      level: '1 Verified Donor',
      reward: 'Rakshak Digital Donor Credential',
      description: 'Official digital verified donor credential linked with regional public health records.',
      unlocked: true,
    },
    {
      level: '3 Verified Donors',
      reward: 'Comprehensive Health Diagnostic Voucher',
      description: 'Full lipid profile, complete blood count (CBC), and hemoglobin screening at partner diagnostics.',
      unlocked: true,
    },
    {
      level: '5 Verified Donors',
      reward: 'Community Life-Saver Certificate of Merit',
      description: 'Public health service commendation from state transfusion councils + priority donor registry card.',
      unlocked: false,
    },
    {
      level: '10 Verified Donors',
      reward: 'Civic Leadership & Health Fellowship Credit',
      description: 'Health insurance subsidy credits and recognized community service leadership documentation.',
      unlocked: false,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10 space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block">
          Supply-Side Growth Protocol
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest leading-[1.1]">
          Community Supply Advocates
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-generous font-sans">
          Addressing the annual 5-million unit national blood shortage by recognizing citizens who verify and enroll active local donors.
        </p>
      </div>

      {/* The Legal Context Box */}
      <div className="border border-neutral-800 bg-neutral-900 text-neutral-100 rounded-xl p-6 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
          <Scale className="w-4 h-4 text-neutral-400" />
          Regulatory Framework: NBTC Guidelines & Supreme Court Ruling (1996)
        </div>
        <p className="text-neutral-300 font-sans text-xs leading-generous">
          Under Indian law, financial compensation for blood donations is strictly prohibited. Rakshya operates entirely within ethical guidelines: incentives are earned exclusively for <strong>onboarding verified, willing voluntary donors</strong>, creating sustainable network effects without commercializing human blood.
        </p>
      </div>

      {/* Referral Link Ledger */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
            Personal Invitation URL
          </h3>
          <p className="text-xs text-neutral-600 mt-1 font-sans leading-generous">
            Share this link with residential societies, university groups, or workplace colleagues.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 font-sans">
          <div className="flex-1 flex items-center bg-neutral-50 border border-neutral-300 rounded px-3.5 py-2.5 font-mono text-xs text-neutral-800 overflow-x-auto">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors border border-neutral-800 flex-shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Link'}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`I registered on Rakshya to help bridge the emergency blood gap. Join our local verified donor network here: ${referralLink}`)}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors border border-emerald-600 flex-shrink-0"
          >
            <Share2 className="w-4 h-4" />
            Share WhatsApp
          </a>
        </div>
      </div>

      {/* Milestones & Tiers */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
              Advocacy Milestones & Benefits
            </h3>
            <p className="text-xs text-neutral-600 mt-1 font-sans">
              Verified community additions tracked against national safety benchmarks.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-3 py-1.5 rounded font-mono text-xs text-neutral-800">
            <Users className="w-4 h-4 text-neutral-600" />
            <span>3 Donors Enrolled</span>
          </div>
        </div>

        <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
          {TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                tier.unlocked ? 'bg-white' : 'bg-neutral-50/70 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded border border-neutral-300 bg-neutral-100 flex items-center justify-center font-mono text-xs font-bold text-neutral-800 flex-shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-neutral-900 uppercase">
                      {tier.level}
                    </span>
                    {tier.unlocked && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Achieved
                      </span>
                    )}
                  </div>
                  <h4 className="font-sans font-bold text-neutral-900 text-sm">{tier.reward}</h4>
                  <p className="text-xs text-neutral-600 font-sans leading-generous">{tier.description}</p>
                </div>
              </div>

              <div className="self-end sm:self-center flex-shrink-0">
                {tier.unlocked ? (
                  <button className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded transition-colors border border-neutral-800">
                    Claim Credit
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};