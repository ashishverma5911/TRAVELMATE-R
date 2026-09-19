import React, { useState } from 'react';
import {
  GitCommit,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Navigation,
  Calculator,
  Globe,
  Camera,
  Share2,
  Layers,
  ChevronRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useJourneyChain } from '../context/JourneyChainContext';
import { useTraveler } from '../context/TravelerContext';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import QRModal from '../components/common/QRModal';

export default function MyJourneyPage() {
  const {
    activeJourney,
    activeJourneyId,
    allJourneys,
    switchJourney,
    createNewJourney,
    addTimelineEvent,
    updateJourneyStage
  } = useJourneyChain();

  const { traveler } = useTraveler();
  const navigate = useNavigate();

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'records' | 'switch'
  const [recordFilter, setRecordFilter] = useState('all'); // 'all' | 'fares' | 'evidence' | 'places' | 'translations'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Journey form state
  const [newTitle, setNewTitle] = useState('');
  const [newDestination, setNewDestination] = useState('Delhi, India');
  const [newOrigin, setNewOrigin] = useState('Indira Gandhi International Airport (DEL)');

  const stages = [
    { key: 'DISCOVER', label: '1. Discover', desc: 'Attractions & Safety' },
    { key: 'PREPARE', label: '2. Prepare', desc: 'Itinerary & Official Fares' },
    { key: 'TRAVEL', label: '3. Travel', desc: 'Navigation & Translation' },
    { key: 'RESOLVE', label: '4. Resolve', desc: 'Evidence & Assistance' },
  ];

  const handleCreateJourneySubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = createNewJourney({
      title: newTitle,
      destination: newDestination,
      origin: newOrigin
    });
    setIsCreateModalOpen(false);
    setNewTitle('');
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'created':
        return <QrCode className="w-4 h-4 text-emerald-400" />;
      case 'destination':
        return <MapPin className="w-4 h-4 text-cyan-400" />;
      case 'planner':
        return <Calendar className="w-4 h-4 text-indigo-400" />;
      case 'fare':
        return <Calculator className="w-4 h-4 text-amber-400" />;
      case 'evidence':
        return <Camera className="w-4 h-4 text-teal-400" />;
      case 'translate':
        return <Globe className="w-4 h-4 text-blue-400" />;
      case 'navigation':
        return <Navigation className="w-4 h-4 text-emerald-400" />;
      case 'incident':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <GitCommit className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1.5">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">Smart Journey Chain</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-3">
            <span>My Journey</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
              {activeJourney.id}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Central timeline connecting your verified itinerary, transport fares, translations, and safety records.
          </p>
        </div>

        {/* Switch / New Journey Actions */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            id="btn-create-new-journey"
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center space-x-2 transition-all backdrop-blur-md"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>New Journey</span>
          </button>
          <button
            onClick={() => setIsQRModalOpen(true)}
            id="btn-journey-show-qr"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white flex items-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-102"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital SafePass</span>
          </button>
        </div>
      </div>

      {/* Main Journey Card: Header & Status */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/10">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeJourney.status === 'active' ? 'Active Trip' : 'Scheduled Trip'}
                </span>
                <span className="text-xs text-slate-400">
                  ID: <strong className="font-mono text-slate-200">{activeJourney.id}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeJourney.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeJourney.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{activeJourney.startDate} to {activeJourney.endDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-emerald-400 font-semibold">{activeJourney.safetyStatus}</span>
                </div>
              </div>
            </div>

            {/* Quick Connected Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
              <Link
                to="/discover"
                className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center space-x-1"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore</span>
              </Link>
              <Link
                to="/planner"
                className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-indigo-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center space-x-1"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Plan</span>
              </Link>
              <Link
                to="/fare-meter"
                className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-amber-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center space-x-1"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Fare Meter</span>
              </Link>
              <Link
                to="/safe-journey"
                className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center space-x-1"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Safe Track</span>
              </Link>
            </div>
          </div>

          {/* 4-Stage Connected Progress Bar */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Journey Stage
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Stage: {activeJourney.stage}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stages.map((st, i) => {
                const isCurrent = activeJourney.stage === st.key;
                const isPassed = stages.findIndex(s => s.key === activeJourney.stage) >= i;
                return (
                  <button
                    key={st.key}
                    onClick={() => updateJourneyStage(st.key)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-md'
                        : isPassed
                        ? 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                        : 'bg-surface/50 border-surface-border text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{st.label}</span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{st.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Timeline vs Connected Records vs All Journeys */}
      <div className="flex items-center space-x-2 border-b border-surface-border pb-1">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'timeline'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Journey Timeline ({activeJourney.timeline?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'records'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Connected Records
        </button>
        <button
          onClick={() => setActiveTab('switch')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'switch'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          All Journeys ({allJourneys.length})
        </button>
      </div>

      {/* TAB 1: JOURNEY TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Live Activity Sequence
            </h3>
            <span className="text-xs text-slate-500">
              Auto-saved under Journey ID: <span className="font-mono text-slate-300">{activeJourney.id}</span>
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
            {activeJourney.timeline && activeJourney.timeline.length > 0 ? (
              activeJourney.timeline.map((evt, idx) => (
                <div key={evt.id || idx} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface border border-surface-border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {getTimelineIcon(evt.type)}
                  </div>

                  {/* Timeline Event Card */}
                  <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                          {evt.module || 'TravelMate Core'}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {evt.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span>{new Date(evt.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        ✓ {evt.status || 'Verified on Device'}
                      </span>
                      {evt.actionPath && (
                        <Link
                          to={evt.actionPath}
                          className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
                        >
                          <span>{evt.actionLabel || 'Open Tool'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center glass-card rounded-2xl text-slate-400 text-xs">
                No journey events recorded yet. Start by exploring places or checking a transport fare.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CONNECTED RECORDS */}
      {activeTab === 'records' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'fares', label: `Fare Checks (${activeJourney.records?.fareChecks?.length || 0})` },
              { id: 'evidence', label: `Evidence Vault (${activeJourney.records?.evidenceList?.length || 0})` },
              { id: 'places', label: `Visited Places (${activeJourney.records?.visitedPlaces?.length || 0})` },
              { id: 'reports', label: `Incident Reports (${activeJourney.records?.reports?.length || 0})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setRecordFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  recordFilter === f.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Fares */}
          {(recordFilter === 'all' || recordFilter === 'fares') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Transport Fare Checks</span>
                </h4>
                <Link to="/fare-meter" className="text-xs text-amber-400 hover:underline">Open Fare Meter →</Link>
              </div>
              {activeJourney.records?.fareChecks?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeJourney.records.fareChecks.map((fc, i) => (
                    <div key={fc.id || i} className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{fc.mode || 'Auto-Rickshaw'}</span>
                        <span className="text-xs font-bold text-emerald-400">₹{fc.fare}</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {fc.from} ➔ {fc.to} ({fc.distance} km)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {new Date(fc.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 glass-card rounded-xl">No fares checked yet for this journey.</p>
              )}
            </div>
          )}

          {/* Evidence */}
          {(recordFilter === 'all' || recordFilter === 'evidence') && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Logged Vehicle Plates & Evidence</span>
                </h4>
                <Link to="/vault" className="text-xs text-teal-400 hover:underline">Open Evidence Vault →</Link>
              </div>
              {activeJourney.records?.evidenceList?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeJourney.records.evidenceList.map((ev, i) => (
                    <div key={ev.id || i} className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          {ev.plateNumber}
                        </span>
                        <span className="text-[10px] text-slate-400">{ev.vehicleType || 'Vehicle'}</span>
                      </div>
                      <p className="text-xs text-slate-300">{ev.location || 'Logged in transit'}</p>
                      <p className="text-[10px] text-slate-500">{new Date(ev.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 glass-card rounded-xl">No vehicle plates logged yet.</p>
              )}
            </div>
          )}

          {/* Visited Places */}
          {(recordFilter === 'all' || recordFilter === 'places') && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Visited Attractions & Check-ins</span>
                </h4>
                <Link to="/discover" className="text-xs text-cyan-400 hover:underline">Discover Places →</Link>
              </div>
              {activeJourney.records?.visitedPlaces?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeJourney.records.visitedPlaces.map((vp, i) => (
                    <div key={vp.id || i} className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{vp.name}</span>
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Verified Check-in</span>
                      </div>
                      <p className="text-xs text-slate-400">{vp.category || 'Historical Monument'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 glass-card rounded-xl">No monument check-ins recorded yet.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ALL JOURNEYS SWITCHER */}
      {activeTab === 'switch' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Saved Journeys & Itineraries
            </h3>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-xs text-emerald-400 hover:underline font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Journey</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allJourneys.map((j) => {
              const isActive = j.id === activeJourneyId;
              return (
                <div
                  key={j.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg'
                      : 'glass-card border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {j.id}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      j.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {j.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{j.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{j.destination}</p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs">
                    <span className="text-slate-400">
                      {j.startDate} – {j.endDate}
                    </span>
                    {isActive ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active Now</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          switchJourney(j.id);
                          setActiveTab('timeline');
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                      >
                        Switch to this Journey
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Create New Journey */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card border border-white/20 max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white font-display">Create Smart Journey Chain</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateJourneySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Journey Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Delhi Heritage & Street Food Explorer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination</label>
                <input
                  type="text"
                  required
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Delhi, India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Starting Point / Hotel</label>
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  placeholder="e.g. New Delhi Railway Station or Hotel Connaught"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/30"
                >
                  Generate Journey Chain ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital SafePass Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
}
