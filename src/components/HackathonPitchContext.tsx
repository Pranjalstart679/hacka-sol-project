import React from 'react';
import { Trophy, CheckCircle2, AlertOctagon, Lightbulb, Users, PhoneCall, ArrowRight } from 'lucide-react';

interface HackathonPitchContextProps {
  onStartDemo: () => void;
}

export const HackathonPitchContext: React.FC<HackathonPitchContextProps> = ({ onStartDemo }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* 1st Place Winner Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs mb-3">
          <Trophy className="w-4 h-4 text-amber-300" /> Hack-A-Sol 2026 • Open Track
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          RakhtKhoj: The Lifesaving Bridge for e-RaktKosh
        </h1>
        <p className="text-sm sm:text-base text-red-100 max-w-2xl mt-2 leading-relaxed">
          Inspired by the 1st place winner of "Build What Moves India", solving India's annual 5-million unit blood deficit through radical UX decluttering and zero-install WhatsApp matching.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onStartDemo}
            className="px-6 py-3 bg-white text-red-700 hover:bg-red-50 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            Launch Emergency Flow Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Pillars that Won */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-3">
            1
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            The 100 km Distance Problem
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            12% of Indian districts are over 100 km away from any functional blood bank. When accidents or emergency surgeries occur, traveling to a distant facility takes hours. RakhtKhoj immediately activates verified local donors nearby.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
            2
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            28 Lakh Registered Donors, Zero Access
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The official e-RaktKosh portal holds 28 lakh donor records, but ordinary citizens in distress cannot access them during emergencies. RakhtKhoj provides direct, consent-driven broadcast matching in minutes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
            3
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            Web-First, Not a Dead App
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because donors can only donate once every 3 months (at most 4 times a year), requiring an app download creates massive churn. Mobile web + WhatsApp notification guarantees 100% reach without notifications being muted.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3">
            4
          </div>
          <h3 className="font-extrabold text-slate-900 text-base mb-1">
            Ethical Growth via Referral Incentives
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Under Indian law, blood cannot be bought or sold for cash. RakhtKhoj drives viral supply growth by incentivizing citizens to invite and onboard new verified donors with health checkups and community rewards.
          </p>
        </div>
      </div>

      {/* Judges Q&A Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-black text-slate-900 mb-4">
          Key Insights from Hackathon Judges
        </h3>
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">
              Q: "Why ask only for the blood group first instead of a detailed form?"
            </div>
            <p className="text-slate-600">
              When a patient is in distress, cognitive load must be zero. Asking only the blood group eliminates paralysis and allows the compatibility engine to instantly calculate all possible donor types.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">
              Q: "How do you prevent spam or ineligible donors from responding?"
            </div>
            <p className="text-slate-600">
              The 90-day cooldown is hard-enforced. Ineligible donors are suppressed from broadcasts. When an eligible donor receives an alert on WhatsApp, they undergo a rapid 10-second disqualification check before their phone number is exchanged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
