import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, CheckCircle2, AlertTriangle, Lock, Eye, Trash2, Car, Upload } from 'lucide-react';
import { useTraveler } from '../context/TravelerContext';
import { useJourneyChain } from '../context/JourneyChainContext';
import { api } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';

export default function EvidenceVaultPage() {
  const { journey } = useTraveler();
  const { activeJourney, recordEvidence } = useJourneyChain();

  const [evidenceList, setEvidenceList] = useState([]);
  const [vehicleType, setVehicleType] = useState('auto');
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [ocrCandidate, setOcrCandidate] = useState(null);
  const [confirmedPlateInput, setConfirmedPlateInput] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  useEffect(() => {
    async function loadVault() {
      const res = await api.getEvidence(journey?.journey_code || 'TM-DEL-2026-X89K');
      if (res.success && res.data) {
        setEvidenceList(res.data);
      }
    }
    loadVault();
  }, [journey?.journey_code]);

  // Sample plate for hero demonstration
  const simulateCapture = (plateString = 'DL 1R BA 4829') => {
    setIsProcessingOCR(true);
    setSaveSuccessMsg('');
    setTimeout(() => {
      setOcrCandidate({
        plate: plateString,
        confidence: 0.94,
        timestamp: new Date().toLocaleTimeString(),
        preview_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&auto=format&fit=crop&q=60"
      });
      setConfirmedPlateInput(plateString);
      setIsProcessingOCR(false);
    }, 900);
  };

  const handleConfirmAndSave = async () => {
    if (!confirmedPlateInput.trim()) return;

    try {
      const res = await api.saveEvidence({
        journey_code: journey?.journey_code || 'TM-DEL-2026-X89K',
        photo_url: ocrCandidate?.preview_url || 'sample-auto.jpg',
        vehicle_type: vehicleType,
        ocr_detected_plate: ocrCandidate?.plate,
        tourist_confirmed_plate: confirmedPlateInput.trim(),
        is_confirmed_by_tourist: true, // Strict requirement!
        location: 'New Delhi Railway Station Exit'
      });

      if (res.success) {
        setEvidenceList([res.data, ...evidenceList]);
        recordEvidence({
          plateNumber: confirmedPlateInput.trim(),
          vehicleType: vehicleType === 'auto' ? 'Auto-Rickshaw' : 'Cab / Taxi',
          photoUrl: ocrCandidate?.preview_url || 'sample-auto.jpg',
          location: 'New Delhi Railway Station Exit'
        });
        setOcrCandidate(null);
        setSaveSuccessMsg(`Vehicle ${confirmedPlateInput} confirmed & securely saved to Journey Chain (${activeJourney.id}).`);
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Vehicle Verification & Safety Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Record Vehicle Plate & Ride Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Take a photo of your auto-rickshaw or taxi plate before boarding. Automatically links vehicle credentials to your Journey Chain without transmitting private records to commercial ad networks.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <StatusBadge status="Official" />
          <span className="text-xs text-emerald-400 font-mono font-bold px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
            Chain: {activeJourney.id}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Capture / Upload Panel */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl">
          <h2 className="text-lg font-bold font-display text-white mb-3 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-indigo-400" />
            <span>Capture Vehicle Plate</span>
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Take a quick photo of the vehicle number plate before stepping inside.
          </p>

          {/* Vehicle Type Picker */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Vehicle Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'auto', label: 'Auto-Rickshaw' },
                { id: 'taxi', label: 'Cab / Taxi' },
                { id: 'bus', label: 'Bus / Other' }
              ].map((v) => (
                <button
                  key={v.id}
                  id={`btn-vault-vtype-${v.id}`}
                  onClick={() => setVehicleType(v.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    vehicleType === v.id
                      ? 'bg-indigo-600/30 border-indigo-500/60 text-indigo-300 shadow-md shadow-indigo-600/15'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Capture Trigger Buttons */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Click to Capture or Scan</p>
              <p className="text-[11px] text-slate-500">Camera permission active on mobile PWA</p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                id="btn-trigger-ocr-scan"
                onClick={() => simulateCapture('DL 1R BA 4829')}
                disabled={isProcessingOCR}
                className="py-2.5 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>{isProcessingOCR ? 'Reading Plate...' : 'Scan Vehicle Plate'}</span>
              </button>
            </div>
          </div>

          {/* Mandatory Confirmation Step Notice (Scope #9 Rule) */}
          <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300/90 flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Security Protocol:</strong> To prevent false accusations or OCR distortion,
              the tourist must inspect and confirm the plate characters before it is written to the vault.
            </p>
          </div>
        </div>

        {/* OCR Confirmation Card / Vault List */}
        <div className="lg:col-span-6 space-y-6">
          {/* Mandatory Tourist Confirmation Modal/Card */}
          {ocrCandidate && (
            <div className="glass-card p-6 rounded-3xl border-2 border-indigo-500/40 animate-in zoom-in-95 duration-150 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                  Step 2: Confirm Plate Characters
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  OCR Confidence: {Math.round(ocrCandidate.confidence * 100)}%
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Inspect & Edit if required:
                </label>
                <input
                  type="text"
                  id="input-confirm-plate"
                  value={confirmedPlateInput}
                  onChange={(e) => setConfirmedPlateInput(e.target.value.toUpperCase())}
                  className="w-full text-center py-3 bg-surface border-2 border-emerald-500/50 rounded-xl font-mono text-xl font-extrabold text-white tracking-widest focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  id="btn-cancel-ocr"
                  onClick={() => setOcrCandidate(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  Discard
                </button>
                <button
                  id="btn-confirm-plate-save"
                  onClick={handleConfirmAndSave}
                  className="flex-2 py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Save to Vault</span>
                </button>
              </div>
            </div>
          )}

          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Archived Evidence Records */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Your Vault Records ({evidenceList.length})
              </h3>
              <StatusBadge status="Official" />
            </div>

            {evidenceList.length > 0 ? (
              <div className="space-y-3">
                {evidenceList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-300">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-sm text-white">
                            {item.tourist_confirmed_plate}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Confirmed
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Logged at {new Date(item.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                No vehicles logged yet. Tap "Scan Vehicle Plate" to record your first transit.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
