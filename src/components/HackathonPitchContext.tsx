import React from 'react';
import { ArrowRight, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HackathonPitchContextProps {
  onStartDemo: () => void;
}

export const HackathonPitchContext: React.FC<HackathonPitchContextProps> = ({ onStartDemo }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Editorial Specification Header */}
      <div className="border border-neutral-300 bg-neutral-900 text-neutral-100 rounded-xl p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <Layers className="w-4 h-4 text-neutral-300" />
          <span>System Whitepaper • Hack-A-Sol 2026</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest leading-[1.08] text-white">
          Rakshya Architecture: Eliminating Cognitive Friction in Emergency Transfusions.
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-generous font-sans">
          India experiences an annual 5-million unit deficit of whole blood. Rakshya modernizes emergency blood discovery with a zero-install, 30-second triage protocol and a privacy-preserving WhatsApp dispatch network.
        </p>

        <div>
          <button
            onClick={onStartDemo}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded text-xs flex items-center gap-2 transition-colors border border-red-600"
          >
            Launch Emergency Flow Demonstration
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The 4 Architectural Pillars */}
      <div className="border border-neutral-200 bg-white rounded-xl divide-y divide-neutral-200">
        <div className="p-6 sm:p-8 space-y-2">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Pillar 01</div>
          <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
            The 100-Kilometer Regional Distance Void
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-generous">
            12% of Indian districts are situated over 100 km away from any functional blood bank. When emergencies or trauma cases arise, traveling across district lines consumes precious golden hours. Rakshya immediately activates verified voluntary donors residing within the same taluk or municipal ward.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Pillar 02</div>
          <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
            2.8 Million Dormant Donor Records
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-generous">
            The national e-RaktKosh portal holds 2.8 million registered donor contacts, but ordinary families in distress cannot directly access them. Rakshya provides consent-driven, privacy-preserving notification pipelines that match exact antigen compatibility.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Pillar 03</div>
          <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
            Web-First Architecture Over App Churn
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-generous">
            Because donors can only give blood once every 90 days (at most 4 times per year), native mobile applications suffer from extreme uninstallation rates and muted push notifications. A Progressive Web App coupled with WhatsApp bot dispatch guarantees 100% notification reach.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Pillar 04</div>
          <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest">
            Ethical Growth via Referral Recognition
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-generous">
            Commercial payment for blood is prohibited under Indian law. Rakshya grows its voluntary supply pool by rewarding community advocates with preventive health checkups and recognized civic credentials for enrolling verified donors.
          </p>
        </div>
      </div>

      {/* Architecture FAQ & Design Decisions */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">Design Decisions</span>
          <h3 className="font-display text-2xl font-bold text-neutral-900 tracking-tightest mt-1">
            System Architecture FAQ
          </h3>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 rounded border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="font-bold text-neutral-900">
              Why start with only the patient blood group instead of a standard admission form?
            </div>
            <p className="font-sans text-xs text-neutral-700 leading-generous">
              In trauma and emergency rooms, attendants experience profound cognitive overwhelm. Requiring a multi-step form causes decision paralysis. Capturing only the blood group takes 3 seconds and immediately activates our compatibility engine to search all acceptable donor groups.
            </p>
          </div>

          <div className="p-4 rounded border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="font-bold text-neutral-900">
              How are donor spam and clinical ineligibility filtered?
            </div>
            <p className="font-sans text-xs text-neutral-700 leading-generous">
              The 90-day cooldown is hardcoded into the dispatch filter. Ineligible donors are suppressed from broadcasts. When an eligible donor receives an alert on WhatsApp, they undergo a rapid 10-second safety check before phone numbers are exchanged.
            </p>
          </div>

          <div className="p-4 rounded border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="font-bold text-neutral-900">
              How does Rakshya comply with Indian National Blood Transfusion Council (NBTC) regulations?
            </div>
            <p className="font-sans text-xs text-neutral-700 leading-generous">
              Indian law explicitly bans buying or selling blood for money. Rakshya strictly enforces non-commercialization: incentives are earned exclusively for referring and enrolling willing voluntary donors, fostering grassroots supply ethically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};