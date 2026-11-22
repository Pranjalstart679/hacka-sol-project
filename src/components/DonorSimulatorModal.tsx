import React, { useState } from 'react';
import { Donor, SOSRequest } from '../types';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  MapPin,
  Send
} from 'lucide-react';

interface DonorSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: SOSRequest | null;
  donor: Donor | null;
  onDonorAccept: (donorId: string) => void;
}

export const DonorSimulatorModal: React.FC<DonorSimulatorModalProps> = ({
  isOpen,
  onClose,
  request,
  donor,
  onDonorAccept
}) => {
  if (!isOpen || !request || !donor) return null;

  const [simulationStep, setSimulationStep] = useState<'whatsapp_preview' | 'eligibility_check' | 'accepted' | 'declined'>('whatsapp_preview');

  // 3-step clinical pre-screening questions
  const [q1Weight, setQ1Weight] = useState<boolean | null>(null);
  const [q2RecentTattoo, setQ2RecentTattoo] = useState<boolean | null>(null);
  const [q3FeelHealthy, setQ3FeelHealthy] = useState<boolean | null>(null);

  const isEligibleToConfirm = q1Weight === true && q2RecentTattoo === false && q3FeelHealthy === true;

  const handleConfirmAcceptance = () => {
    onDonorAccept(donor.id);
    setSimulationStep('accepted');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 text-neutral-100 rounded-xl max-w-lg w-full border border-neutral-800 overflow-hidden relative">
        {/* Header - Editorial Audit Bar */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Emergency Dispatch Verification Ledger
            </div>
            <div className="font-display text-base font-semibold text-neutral-100 tracking-tightest">
              Recipient: {donor.name} ({donor.bloodGroup})
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content View */}
        <div className="p-6">
          {/* STAGE 1: Emergency Alert Payload */}
          {simulationStep === 'whatsapp_preview' && (
            <div className="space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Direct Webhook Dispatch • Within {donor.distanceKm} km
                </div>
                <p className="text-xs text-neutral-400 mt-1 leading-generous">
                  Alert sent via direct WhatsApp API. Cooldown verified (&gt;90 days since last donation).
                </p>
              </div>

              {/* Clinical Dispatch Details Table */}
              <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span className="text-neutral-500">Alert Priority</span>
                  <span className="text-red-400 font-bold">CRITICAL TRANSFUSION</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span className="text-neutral-500">Patient</span>
                  <span className="text-neutral-200">{request.patientName}, {request.patientAge}y</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span className="text-neutral-500">Facility</span>
                  <span className="text-neutral-200 text-right">{request.hospitalName}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span className="text-neutral-500">Required Group</span>
                  <span className="text-red-400 font-bold">{request.bloodGroup}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span className="text-neutral-500">Donor Blood Type</span>
                  <span className="text-emerald-400 font-bold">{donor.bloodGroup} (Compatible)</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-neutral-500">Distance to Facility</span>
                  <span className="text-neutral-200 font-bold">{donor.distanceKm} km</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSimulationStep('eligibility_check')}
                  className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-600"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept & Run Clinical Pre-Screen
                </button>
                <button
                  onClick={() => setSimulationStep('declined')}
                  className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-lg transition-colors border border-neutral-700"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: 10-Second Clinical Safety Pre-Screen */}
          {simulationStep === 'eligibility_check' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-neutral-100 tracking-tightest">
                  10-Second Donor Pre-Screen
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-generous">
                  Mandatory safety verification prior to exchanging contact with the patient's family.
                </p>
              </div>

              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-lg text-xs">
                {/* Q1 */}
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <span className="text-neutral-300">Body weight is 45 kg or above</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setQ1Weight(true)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q1Weight === true ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setQ1Weight(false)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q1Weight === false ? 'bg-red-800 text-white border-red-700' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <span className="text-neutral-300">Tattoo, piercing, or major surgery in past 6 months</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setQ2RecentTattoo(false)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q2RecentTattoo === false ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setQ2RecentTattoo(true)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q2RecentTattoo === true ? 'bg-red-800 text-white border-red-700' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <span className="text-neutral-300">Feeling healthy and symptom-free today</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setQ3FeelHealthy(true)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q3FeelHealthy === true ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setQ3FeelHealthy(false)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${q3FeelHealthy === false ? 'bg-red-800 text-white border-red-700' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {q2RecentTattoo === true && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  Standard transfusion guidelines require a 6-month deferral following tattoos or surgical procedures.
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleConfirmAcceptance}
                  disabled={!isEligibleToConfirm}
                  className={`w-full py-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors border ${
                    isEligibleToConfirm
                      ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600'
                      : 'bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Eligibility & Release Direct Contact
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: Confirmed Match Screen */}
          {simulationStep === 'accepted' && (
            <div className="py-2 space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Status: Match Confirmed
                </div>
                <h3 className="font-display text-xl font-bold text-neutral-100 tracking-tightest">
                  Direct Line Established
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-generous">
                  {donor.name}'s contact has been shared with {request.patientName}'s attendant at {request.hospitalName}.
                </p>
              </div>

              <div className="bg-neutral-950 p-4 rounded-lg text-xs space-y-2 border border-neutral-800 font-mono">
                <div className="text-neutral-500">Destination Hospital:</div>
                <div className="font-bold text-neutral-200">{request.hospitalName}</div>
                <div className="text-neutral-500 pt-1">Patient Attendant Direct Line:</div>
                <div className="font-bold text-emerald-400">{request.contactPhone}</div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-lg text-xs transition-colors"
              >
                Return to Patient Dashboard
              </button>
            </div>
          )}

          {/* STAGE 4: Declined */}
          {simulationStep === 'declined' && (
            <div className="py-4 space-y-4 text-center">
              <XCircle className="w-10 h-10 text-neutral-500 mx-auto" />
              <div>
                <h3 className="font-display text-lg font-bold text-neutral-200 tracking-tightest">
                  Request Passed
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-generous max-w-sm mx-auto">
                  The system immediately routes the alert to the next verified donor within range.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold border border-neutral-700"
              >
                Close Verification Ledger
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
