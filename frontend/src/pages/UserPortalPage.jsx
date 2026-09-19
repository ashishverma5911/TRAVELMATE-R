import React, { useState } from 'react';
import {
  User,
  Shield,
  Compass,
  FileText,
  PhoneCall,
  Globe,
  Lock,
  HelpCircle,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Calculator,
  ChevronRight,
  Sparkles,
  Info,
  LogOut
} from 'lucide-react';
import { useTraveler } from '../context/TravelerContext';
import { useJourneyChain } from '../context/JourneyChainContext';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import QRModal from '../components/common/QRModal';
import embassies from '../data/embassies.json';

const NATIONALITIES = [
  'United Kingdom', 'United States', 'Germany', 'France',
  'Australia', 'Japan', 'Spain', 'Canada', 'Italy', 'Netherlands', 'Other'
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' }
];

export default function UserPortalPage() {
  const { traveler, journey, updateProfile, concludeJourney } = useTraveler();
  const { activeJourney, allJourneys, switchJourney, activeJourneyId } = useJourneyChain();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'journeys', 'records', 'safety', 'reports', 'language', 'privacy', 'help'
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: traveler?.name || 'Sarah Jenkins',
    nationality: traveler?.nationality || 'United Kingdom',
    preferred_language: traveler?.preferred_language || 'en',
    emergency_contact: traveler?.emergency_contact || '+44 7700 900077'
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm, journey);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePurge = () => {
    if (window.confirm('Are you sure you want to conclude this journey? All temporary local travel logs and personal handles will be irreversibly erased from this device.')) {
      concludeJourney();
      navigate('/');
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile & SafePass', icon: User, desc: 'Personal details and temporary identity' },
    { id: 'journeys', label: 'My Journeys', icon: Compass, desc: 'Active trips & Journey Chain IDs' },
    { id: 'records', label: 'Travel Records', icon: FileText, desc: 'Fares, plates & visited places' },
    { id: 'safety', label: 'Safety & Emergency', icon: PhoneCall, desc: '112 SOS & Embassy contacts' },
    { id: 'reports', label: 'My Reports', icon: AlertTriangle, desc: 'Incident status & resolutions' },
    { id: 'language', label: 'Language Settings', icon: Globe, desc: 'Interface & Bhashini speech' },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock, desc: 'Data purge & zero-document policy' },
    { id: 'help', label: 'Help & FAQs', icon: HelpCircle, desc: 'Tourist guides & assistance' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-xl shadow-emerald-500/20">
              {profileForm.name ? profileForm.name.charAt(0).toUpperCase() : 'T'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {profileForm.name || 'International Traveler'}
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {profileForm.nationality}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                <span>Active Journey Chain:</span>
                <span className="font-mono text-emerald-400 font-semibold">{activeJourney.id}</span>
                <span>•</span>
                <span>Language: {profileForm.preferred_language.toUpperCase()}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsQRModalOpen(true)}
              id="btn-user-portal-qr"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-102"
            >
              <QrCode className="w-4 h-4" />
              <span>Show SafeVisit QR</span>
            </button>
            <Link
              to="/my-journey"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-all backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>My Journey Chain</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Navigation + Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Navigation Menu */}
        <div className="lg:col-span-4 space-y-1">
          <div className="glass-card rounded-2xl p-2 border border-white/10 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`tab-user-portal-${item.id}`}
                  className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick 112 Emergency Banner */}
          <div className="glass-card rounded-2xl p-4 border border-rose-500/20 bg-rose-950/10 space-y-2 mt-4">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
              <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>24/7 Emergency Response</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Immediate police dispatch & multi-lingual tourist assistance in Delhi.
            </p>
            <div className="pt-2 flex items-center space-x-2">
              <a
                href="tel:112"
                className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-500 text-white text-center rounded-lg text-xs font-bold transition-colors"
              >
                Dial 112
              </a>
              <a
                href="tel:1363"
                className="flex-1 py-1.5 px-3 bg-white/10 hover:bg-white/20 text-slate-200 text-center rounded-lg text-xs font-bold transition-colors"
              >
                Dial 1363
              </a>
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 min-h-[500px]">
          {/* TAB 1: PROFILE & SAFEPASS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Traveler Profile & SafePass</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your personal preferences and view your temporary 7-day visitor credential.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Profile updated successfully across your Journey Chain.</span>
                </div>
              )}

              {/* Digital SafePass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold tracking-wide text-white uppercase font-display">
                      SafeVisit Digital Credential
                    </span>
                  </div>
                  <StatusBadge status="Official" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Pass Code</span>
                    <p className="font-mono font-bold text-white mt-0.5">{activeJourney.id}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Validity</span>
                    <p className="text-emerald-400 font-semibold mt-0.5">7 Days (Auto-expiring)</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Storage</span>
                    <p className="text-slate-300 mt-0.5">Zero-Document Privacy</p>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-[11px] text-slate-400">Accepted for ASI monument entry & emergency ID</span>
                  <button
                    onClick={() => setIsQRModalOpen(true)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline"
                  >
                    View Full QR Pass
                  </button>
                </div>
              </div>

              {/* Edit Profile Form */}
              <form onSubmit={handleProfileSave} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Name / Alias</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Country / Nationality</label>
                    <select
                      value={profileForm.nationality}
                      onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                    >
                      {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Preferred Language</label>
                    <select
                      value={profileForm.preferred_language}
                      onChange={(e) => setProfileForm({ ...profileForm, preferred_language: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                    >
                      {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Emergency Contact Number</label>
                    <input
                      type="tel"
                      value={profileForm.emergency_contact}
                      onChange={(e) => setProfileForm({ ...profileForm, emergency_contact: e.target.value })}
                      placeholder="e.g. +44 7700 900077"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: MY JOURNEYS */}
          {activeTab === 'journeys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-display text-white">My Journeys</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage and switch between your active and planned Indian travel chains.
                  </p>
                </div>
                <Link
                  to="/my-journey"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  Open Journey Timeline
                </Link>
              </div>

              <div className="space-y-4">
                {allJourneys.map(j => {
                  const isActive = j.id === activeJourneyId;
                  return (
                    <div
                      key={j.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md'
                          : 'glass-card border-white/10'
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
                      <h3 className="text-sm font-bold text-white">{j.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                        <span>Destination: {j.destination}</span>
                        <span>•</span>
                        <span>Dates: {j.startDate} – {j.endDate}</span>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Timeline Events: {j.timeline?.length || 0}
                        </span>
                        {isActive ? (
                          <span className="text-emerald-400 font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Currently Active</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => switchJourney(j.id)}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium"
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

          {/* TAB 3: TRAVEL RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Connected Travel Records</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Records associated with active Journey Chain ID: <span className="font-mono text-emerald-400">{activeJourney.id}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-surface border border-surface-border">
                  <div className="text-xl font-bold font-display text-amber-400">
                    {activeJourney.records?.fareChecks?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Fares Checked</div>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-surface-border">
                  <div className="text-xl font-bold font-display text-teal-400">
                    {activeJourney.records?.evidenceList?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Plates in Vault</div>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-surface-border">
                  <div className="text-xl font-bold font-display text-cyan-400">
                    {activeJourney.records?.visitedPlaces?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Monuments Visited</div>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-surface-border">
                  <div className="text-xl font-bold font-display text-rose-400">
                    {activeJourney.records?.reports?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Reports Filed</div>
                </div>
              </div>

              {/* Recent Records list */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Recent Activities in this Journey
                </h3>
                {activeJourney.timeline?.slice(0, 5).map((evt, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-surface border border-surface-border flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">{evt.title}</div>
                      <div className="text-[11px] text-slate-400">{evt.description}</div>
                    </div>
                    <Link to={evt.actionPath || '/my-journey'} className="text-emerald-400 hover:underline shrink-0 ml-4">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY & EMERGENCY */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Emergency Assistance & Helplines</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Official 24x7 emergency contacts and foreign mission representations in New Delhi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-300">Police & Medical Emergency</span>
                    <span className="text-xs font-mono font-bold text-red-400">112</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Unified Emergency Response Support System (ERSS)</p>
                  <a href="tel:112" className="inline-block mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs font-bold">
                    Call 112
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">Delhi Tourist Police Helpline</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">8750871111</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Direct WhatsApp & Calling Helpline for Tourists</p>
                  <a href="tel:8750871111" className="inline-block mt-2 px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold">
                    Call 8750871111
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Ministry of Tourism Infoline</span>
                    <span className="text-xs font-mono font-bold text-indigo-400">1363</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Multi-lingual 24x7 support in 12 languages</p>
                  <a href="tel:1363" className="inline-block mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium">
                    Call 1363
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Women's Safety Helpline</span>
                    <span className="text-xs font-mono font-bold text-pink-400">1091</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Delhi Police Special Women Cell</p>
                  <a href="tel:1091" className="inline-block mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium">
                    Call 1091
                  </a>
                </div>
              </div>

              {/* Embassy Directory */}
              <div className="pt-2 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Embassies & High Commissions in Chanakyapuri, New Delhi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {embassies.slice(0, 6).map((emb, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{emb.country}</span>
                        <a href={`tel:${emb.phone}`} className="text-emerald-400 font-mono text-[11px]">
                          {emb.phone}
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-400">{emb.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MY REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-display text-white">My Incident & Grievance Reports</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track the investigation and resolution status of reports filed with Delhi Police.
                  </p>
                </div>
                <Link
                  to="/incident"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                >
                  File New Report
                </Link>
              </div>

              {activeJourney.records?.reports?.length > 0 ? (
                <div className="space-y-3">
                  {activeJourney.records.reports.map((rep, idx) => (
                    <div key={rep.id || idx} className="p-4 rounded-xl bg-surface border border-surface-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{rep.category || 'Incident'}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {rep.status || 'Under Review'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{rep.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
                        <span>Case Ref: #{rep.id?.slice(-6)?.toUpperCase()}</span>
                        <span>{new Date(rep.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center glass-card rounded-2xl space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-medium">No open incidents or reports.</p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    If you encounter transport overcharging, harassment, or lost belongings, you can report it directly to the Tourist Police.
                  </p>
                  <Link
                    to="/incident"
                    className="inline-block px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10"
                  >
                    Open Incident Reporting
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: LANGUAGE PREFERENCES */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Language & Translation Settings</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure speech synthesis, interface localization, and voice translation options.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Digital India Bhashini Speech Engine</div>
                      <div className="text-[11px] text-slate-400">Real-time voice-to-voice translation in 29 world & 23 Indian languages</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Active</span>
                  </div>
                  <Link
                    to="/bhashini-translator"
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    <span>Launch Fullscreen Voice Translator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                  <div className="font-bold text-white">Common Local Phrases (English ➔ Hindi)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="font-bold text-slate-200">"Please turn on the meter"</div>
                      <div className="text-emerald-400 font-medium">कृपया मीटर चालू करें (Kripya meter chalu karein)</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="font-bold text-slate-200">"Where is the ticket counter?"</div>
                      <div className="text-emerald-400 font-medium">टिकट काउंटर कहाँ है? (Ticket counter kahan hai?)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PRIVACY & SECURITY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">Privacy & Zero-Document Storage</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  TravelMate is designed with privacy-first architecture compliant with SIH 2026 mandates.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <Shield className="w-4 h-4" />
                    <span>No Passport or ID Document Upload</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    TravelMate does not require or store passport scans, visa copies, or payment cards. Only an ephemeral 7-day cryptographic handle is generated on your device.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-2">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                    <Lock className="w-4 h-4" />
                    <span>On-Device Cryptographic Evidence</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Vehicle license plates and evidence photos stored in the RideSafe Vault remain on your browser session and are never broadcast publicly unless you explicitly attach them to an incident report.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3 mt-6">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold">
                    <Trash2 className="w-4 h-4" />
                    <span>Conclude Journey & Purge Data (Scope #18)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Finished your trip to Delhi? Expire your SafeVisit Pass and permanently wipe your local traveler profile, transit caches, and journey history from this browser.
                  </p>
                  <button
                    onClick={handlePurge}
                    id="btn-purge-traveler-session"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20"
                  >
                    Conclude Journey & Wipe Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: HELP & SUPPORT */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold font-display text-white">First-Time Foreign Tourist Survival Guide</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Essential advice for navigating Delhi safely, comfortably, and culturally respectfully.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1.5">
                  <div className="font-bold text-white">1. Auto-Rickshaw Meter Rules</div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Delhi law requires auto-rickshaw drivers to run by the electronic meter. If a driver demands a fixed price (e.g., ₹500 for a 4 km trip), politely say <em>"Meter se chaliye"</em> or check the official fare using TravelMate's Fair Fare tool.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1.5">
                  <div className="font-bold text-white">2. Official Monument Ticketing vs Touts</div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Always purchase tickets at official Archaeological Survey of India (ASI) counters or via their official QR portals. Ignore touts near Red Fort or Qutub Minar claiming "special VIP access".
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1.5">
                  <div className="font-bold text-white">3. Delhi Metro (DMRC) Safety</div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    The Delhi Metro is world-class, air-conditioned, highly secure, and often faster than road traffic. The first coach in moving direction is reserved exclusively for women passengers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1.5">
                  <div className="font-bold text-white">4. Drinking Water & Street Food</div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Stick to sealed packaged mineral water (Bisleri, Kinley, Aquafina) and check that the bottle cap seal is intact. Enjoy fresh hot street food cooked in front of you at renowned hygiene-rated stalls.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Pass Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
}
