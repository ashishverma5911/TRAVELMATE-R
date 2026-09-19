import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Layers,
  Navigation,
  Globe,
  Calculator,
  ShieldCheck,
  QrCode,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Camera,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useTraveler } from '../context/TravelerContext';
import { useJourneyChain } from '../context/JourneyChainContext';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import QRModal from '../components/common/QRModal';

export default function OnboardingPage() {
  const { traveler } = useTraveler();
  const { activeJourney, updateJourneyStage } = useJourneyChain();
  const navigate = useNavigate();

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Dedicated Feature Sections requested by user: Trip Planner, Fair Fare Intelligence, Bhashini Translator, Safe Route, Ride Safe Vault
  const featureSections = [
    {
      id: 'section-trip-planner',
      to: '/planner',
      title: 'Trip Planner',
      tagline: 'Itinerary Planning & Day-Wise Route Optimization',
      desc: 'Build curated 1 to 3 day custom travel plans with timings, verified operating schedules, and integrated transport routes.',
      icon: Calendar,
      color: 'from-indigo-500/20 to-purple-500/20',
      border: 'hover:border-indigo-500/50 border-indigo-500/20',
      iconColor: 'text-indigo-400',
      badge: 'Interactive Planner',
      cta: 'Open Trip Planner'
    },
    {
      id: 'section-fair-fare',
      to: '/fare-meter',
      title: 'Fair Fare Intelligence',
      tagline: 'Official Auto, Taxi & Cab Tariff Verification',
      desc: 'Calculate exact government-regulated rates for auto rickshaws and taxis. Protect against overcharging with reference price calculators.',
      icon: Calculator,
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'hover:border-amber-500/50 border-amber-500/20',
      iconColor: 'text-amber-400',
      badge: 'Gazette Tariffs',
      cta: 'Calculate Fair Fare'
    },
    {
      id: 'section-bhashini-translator',
      to: '/bhashini-translator',
      title: 'Bhashini Translator',
      tagline: 'AI Speech-to-Speech & Multi-Lingual Driver Chat',
      desc: 'Real-time conversational voice translation for 29+ languages. Overcome language barriers with auto drivers, shopkeepers, and local police.',
      icon: Globe,
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'hover:border-blue-500/50 border-blue-500/20',
      iconColor: 'text-blue-400',
      badge: 'Voice AI 29+ Langs',
      cta: 'Launch Translator'
    },
    {
      id: 'section-safe-route',
      to: '/safe-journey',
      title: 'Safe Route',
      tagline: 'Live GPS Journey Tracking & Corridor Deviations',
      desc: 'Monitor your ride in real-time along pre-verified safety corridors with instant alerts for route deviations and night travel protection.',
      icon: Navigation,
      color: 'from-cyan-500/20 to-emerald-500/20',
      border: 'hover:border-cyan-500/50 border-cyan-500/20',
      iconColor: 'text-cyan-400',
      badge: 'GPS Monitored',
      cta: 'Track Safe Route'
    },
    {
      id: 'section-ride-safe-vault',
      to: '/vault',
      title: 'Ride Safe Vault',
      tagline: 'Vehicle Plate OCR, Meter Photo & Evidence Logging',
      desc: 'Capture and confirm taxi/auto vehicle license plates before boarding. Encrypted local evidence locker accessible even offline.',
      icon: Camera,
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'hover:border-purple-500/50 border-purple-500/20',
      iconColor: 'text-purple-400',
      badge: 'Plate Logger',
      cta: 'Open Safe Vault'
    }
  ];

  // 4-Stage Travel Process
  const fourStages = [
    {
      key: 'DISCOVER',
      step: 'Stage 1',
      title: 'Discover',
      desc: 'Verified attractions, opening hours, nearest metro & ASI ticket rates.',
      to: '/discover',
      status: 'Verified Destinations'
    },
    {
      key: 'PREPARE',
      step: 'Stage 2',
      title: 'Prepare',
      desc: 'Build customized daily itineraries and check gazette auto/cab tariffs.',
      to: '/planner',
      status: 'Itinerary & Fares'
    },
    {
      key: 'TRAVEL',
      step: 'Stage 3',
      title: 'Travel',
      desc: 'Live transit tracking, Bhashini driver translation, and plate logger.',
      to: '/safe-journey',
      status: 'Live On Route'
    },
    {
      key: 'RESOLVE',
      step: 'Stage 4',
      title: 'Resolve',
      desc: 'Instant 112 emergency calls and structured Tourist Police assistance.',
      to: '/incident',
      status: '24/7 Police Support'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
      {/* 1. COMMAND CENTER HERO BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden glass-panel border border-surface-border">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SIH 2026 • Verified Tourist Trust & Safety Platform</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
              Welcome to Delhi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{traveler?.name || 'Traveler'}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Your interconnected journey command center. Access verified monument guidelines, official transport tariffs, real-time safety monitoring, and voice translation without passport uploads.
            </p>
          </div>

          {/* Active Journey Status Box */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-500/30 backdrop-blur-xl lg:w-80 shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Journey Chain
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Live & Secure
              </span>
            </div>

            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                <span>{activeJourney.id}</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{activeJourney.currentLocation || 'Connaught Place & Central Corridor'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Show SafePass</span>
              </button>
              <Link
                to="/my-journey"
                className="text-slate-300 hover:text-white font-medium flex items-center space-x-1 transition-colors"
              >
                <span>Timeline</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "WHERE AM I IN MY JOURNEY?" ACTIVE SUMMARY CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-surface-border relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Where Am I In My Journey?
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
              {activeJourney.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeJourney.destination}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Stage: <strong className="text-white font-semibold">{activeJourney.stage}</strong></span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                ✓ Safety Score: {activeJourney.safetyScore || 98}% Verified
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/my-journey"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Journey Chain</span>
            </Link>
          </div>
        </div>

        {/* 4-Stage Travel Roadmap */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Travel Roadmap Progress
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              Click any stage to jump into that workflow
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {fourStages.map((st, i) => {
              const isCurrent = activeJourney.stage === st.key;
              const isPassed = ['DISCOVER', 'PREPARE', 'TRAVEL', 'RESOLVE'].indexOf(activeJourney.stage) >= i;
              return (
                <div
                  key={st.key}
                  onClick={() => {
                    updateJourneyStage(st.key);
                    navigate(st.to);
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                    isCurrent
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                      : isPassed
                      ? 'bg-white/[0.04] border-white/15 text-slate-300 hover:border-emerald-500/40 hover:bg-white/[0.07]'
                      : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-400 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{st.step}</span>
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h3 className="text-sm font-bold text-white">{st.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{st.desc}</p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                    <span>{st.status}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. DEDICATED SECTIONS: TRIP PLANNER, FAIR FARE INTELLIGENCE, BHASHINI TRANSLATOR, SAFE ROUTE, RIDE SAFE VAULT */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-display text-white flex items-center space-x-2">
              <span>Core Application Sections</span>
            </h2>
            <p className="text-xs text-slate-400">Individual specialized modules built for safe and seamless travel</p>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">5 Independent Workspaces</span>
        </div>

        {/* 5 Distinct Dedicated Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                id={sec.id}
                className={`glass-card p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${sec.border} relative overflow-hidden group hover:-translate-y-1 shadow-lg`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${sec.color} flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform shadow-md`}>
                      <Icon className={`w-5 h-5 ${sec.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.08] text-slate-200 border border-white/10 uppercase tracking-wider">
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      Section 0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-300 mt-1">
                      {sec.tagline}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10">
                  <Link
                    to={sec.to}
                    id={`btn-open-${sec.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-white font-semibold text-xs transition-all flex items-center justify-between group-hover:shadow-md"
                  >
                    <span>{sec.cta}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RECENT ACTIVITY & DIGITAL SAFEPASS PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Journey Activity */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-7 rounded-3xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Recent Journey Activity
              </h3>
              <p className="text-[11px] text-slate-400">Auto-recorded under ID: {activeJourney.id}</p>
            </div>
            <Link to="/my-journey" className="text-xs text-emerald-400 hover:underline font-semibold flex items-center space-x-1">
              <span>View All ({activeJourney.timeline?.length || 0})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeJourney.timeline?.slice(0, 4).map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-3 text-xs hover:border-emerald-500/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                      {evt.module}
                    </span>
                    <span className="font-bold text-white">{evt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {evt.actionPath && (
                    <Link
                      to={evt.actionPath}
                      className="text-[11px] text-emerald-400 font-semibold hover:underline inline-block mt-1"
                    >
                      Open →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital SafePass Credential Card */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-7 rounded-3xl border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                SafeVisit Digital Pass
              </span>
            </div>
            <StatusBadge status="Official" />
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            {/* Clean QR Visual */}
            <div
              onClick={() => setIsQRModalOpen(true)}
              className="p-3 bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
              title="Click to view full screen QR"
            >
              <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="24" height="24" fill="#090E17" rx="3" />
                <rect x="14" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="18" width="8" height="8" fill="#10B981" rx="1" />
                <rect x="66" y="10" width="24" height="24" fill="#090E17" rx="3" />
                <rect x="70" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="74" y="18" width="8" height="8" fill="#10B981" rx="1" />
                <rect x="10" y="66" width="24" height="24" fill="#090E17" rx="3" />
                <rect x="14" y="70" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="74" width="8" height="8" fill="#10B981" rx="1" />
                <rect x="42" y="14" width="6" height="6" fill="#090E17" />
                <rect x="52" y="24" width="6" height="6" fill="#090E17" />
                <rect x="42" y="42" width="16" height="16" fill="#090E17" rx="2" />
                <rect x="66" y="46" width="6" height="6" fill="#090E17" />
                <rect x="46" y="68" width="6" height="6" fill="#090E17" />
                <rect x="74" y="74" width="12" height="12" fill="#10B981" rx="2" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-surface border border-surface-border">
              <span className="text-[10px] uppercase text-slate-400 block">Pass Holder</span>
              <span className="font-bold text-white truncate block">{traveler?.name || 'Sarah Jenkins'}</span>
              <span className="text-[10px] text-emerald-400">{traveler?.nationality || 'United Kingdom'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface border border-surface-border">
              <span className="text-[10px] uppercase text-slate-400 block">Validity</span>
              <span className="font-bold text-amber-400 block">7-Day Window</span>
              <span className="text-[10px] text-slate-400">Zero-Doc Privacy</span>
            </div>
          </div>

          <button
            onClick={() => setIsQRModalOpen(true)}
            id="btn-dashboard-expand-qr"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Open Verified QR Ticket</span>
          </button>
        </div>
      </div>

      {/* 5. IMPORTANT TRAVEL INFO & 24/7 HELPLINE TICKER */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">Delhi Tourist Police Helpline: 8750871111</div>
            <div className="text-[11px] text-slate-400">
              For auto fare disputes, tout assistance, or directions. Police emergency: Dial 112.
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <a
            href="tel:8750871111"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Call Tourist Police
          </a>
          <Link
            to="/user-portal"
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium border border-white/10 transition-colors"
          >
            All Embassies
          </Link>
        </div>
      </div>

      {/* QR Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
}
