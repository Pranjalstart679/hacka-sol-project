import React, { useState } from 'react';
import { Donor, SOSRequest } from '../types';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Smartphone, 
  Heart, 
  ShieldCheck, 
  Clock, 
  PhoneCall,
  Share2
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

  // Quick 3-step disqualification questionnaire
  const [q1Weight, setQ1Weight] = useState<boolean | null>(null); // Weight > 45kg?
  const [q2RecentTattoo, setQ2RecentTattoo] = useState<boolean | null>(null); // Tattoo / surgery in last 6 mos?
  const [q3FeelHealthy, setQ3FeelHealthy] = useState<boolean | null>(null); // Feeling healthy today?

  const isEligibleToConfirm = q1Weight === true && q2RecentTattoo === false && q3FeelHealthy === true;

  const handleConfirmAcceptance = () => {
    onDonorAccept(donor.id);
    setSimulationStep('accepted');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full border border-slate-700 shadow-2xl overflow-hidden relative">
        {/* Top Bar */}
        <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live Phone Simulator: {donor.name}'s Device
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content View */}
        <div className="p-6">
          {/* STAGE 1: WhatsApp Emergency Alert Bubble */}
          {simulationStep === 'whatsapp_preview' && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Incoming WhatsApp Notification
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Sent via RakhtKhoj Emergency Webhook to verified donors within 15 km.
                </p>
              </div>

              {/* Chat Bubble UI */}
              <div className="bg-[#0b141a] p-4 rounded-2xl border border-emerald-500/30 text-slate-100 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 pb-2 border-b border-slate-800">
                  <Heart className="w-4 h-4 fill-emerald-400" />
                  RakhtKhoj Emergency Alert System
                </div>

                <div className="mt-3 text-xs space-y-1.5 font-mono">
                  <p className="text-red-400 font-bold">
                    🚨 URGENT: Blood Needed near your location
                  </p>
                  <p><strong>Patient:</strong> {request.patientName} ({request.patientAge}y)</p>
                  <p><strong>Hospital:</strong> {request.hospitalName}</p>
                  <p><strong>Required Group:</strong> <span className="text-red-400 font-bold">{request.bloodGroup}</span></p>
                  <p><strong>Your Group:</strong> <span className="text-emerald-400 font-bold">{donor.bloodGroup}</span> (Compatible)</p>
                  <p><strong>Distance to Hospital:</strong> {donor.distanceKm} km</p>
                  <p className="text-slate-400 text-[10px] pt-1">
                    Your last donation was &gt;90 days ago. You are eligible to donate.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => setSimulationStep('eligibility_check')}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept & Verify Eligibility
                  </button>
                  <button
                    onClick={() => setSimulationStep('declined')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: 3-Second Disqualification Check */}
          {simulationStep === 'eligibility_check' && (
            <div className="space-y-4">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                <h3 className="text-lg font-black text-white">
                  Quick 10-Second Safety Check
                </h3>
                <p className="text-xs text-slate-400">
                  Ensures safety for both {donor.name} and the patient.
                </p>
              </div>

              <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700 text-xs">
                {/* Q1 */}
                <div className="flex items-center justify-between gap-3">
                  <span>Is your body weight greater than 45 kg?</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setQ1Weight(true)}
                      className={`px-3 py-1 rounded-lg font-bold ${q1Weight === true ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setQ1Weight(false)}
                      className={`px-3 py-1 rounded-lg font-bold ${q1Weight === false ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="flex items-center justify-between gap-3">
                  <span>Any tattoos, piercings, or surgery in past 6 months?</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setQ2RecentTattoo(false)}
                      className={`px-3 py-1 rounded-lg font-bold ${q2RecentTattoo === false ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setQ2RecentTattoo(true)}
                      className={`px-3 py-1 rounded-lg font-bold ${q2RecentTattoo === true ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="flex items-center justify-between gap-3">
                  <span>Are you feeling healthy and fever-free today?</span>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setQ3FeelHealthy(true)}
                      className={`px-3 py-1 rounded-lg font-bold ${q3FeelHealthy === true ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setQ3FeelHealthy(false)}
                      className={`px-3 py-1 rounded-lg font-bold ${q3FeelHealthy === false ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {q2RecentTattoo === true && (
                <div className="p-3 bg-red-950/70 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  Due to blood safety protocols, recent tattoos require a 6-month deferral.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleConfirmAcceptance}
                  disabled={!isEligibleToConfirm}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isEligibleToConfirm
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm & Share Contact with Patient Family
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: Confirmed Match Screen */}
          {simulationStep === 'accepted' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  Match Connected!
                </h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1">
                  {donor.name}'s contact has been shared with {request.patientName}'s family.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl text-xs text-left space-y-1.5 border border-slate-700">
                <div className="text-slate-400">Hospital Address:</div>
                <div className="font-bold text-white">{request.hospitalName}</div>
                <div className="text-slate-400 pt-1">Patient Attendant Phone:</div>
                <div className="font-bold text-emerald-400">{request.contactPhone}</div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-slate-900 font-extrabold rounded-xl text-xs hover:bg-slate-100 transition-colors"
              >
                Back to Patient Dashboard
              </button>
            </div>
          )}

          {/* STAGE 4: Declined */}
          {simulationStep === 'declined' && (
            <div className="text-center py-6 space-y-3">
              <XCircle className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Request Passed</h3>
              <p className="text-xs text-slate-400">
                The alert will seamlessly fall back to the next nearest eligible donor.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Close Simulator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
