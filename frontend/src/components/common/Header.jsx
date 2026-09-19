import React from 'react';
import { Shield, QrCode, Globe, AlertTriangle, Sun, Moon, User, Compass } from 'lucide-react';
import { useTraveler } from '../../context/TravelerContext';
import { useJourneyChain } from '../../context/JourneyChainContext';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function Header({ onOpenQR, onOpenLang }) {
  const { traveler } = useTraveler();
  const { activeJourney } = useJourneyChain();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 border-b border-surface-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center p-2 shadow-lg shadow-emerald-500/25 border border-white/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-black tracking-tight font-display text-white">
                TRAVEL<span className="text-emerald-400">MATE</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/15 text-emerald-300 rounded border border-emerald-500/30 uppercase tracking-widest">
                India
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Tourist Trust & Safety Platform
            </p>
          </div>
        </Link>

        {/* Center / Smart Journey Chain Pill (Visible on md+) */}
        <div className="hidden md:flex items-center space-x-3 bg-white/[0.04] px-4 py-1.5 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <Link
            to="/my-journey"
            className="text-xs text-slate-300 hover:text-white flex items-center space-x-1.5 transition-colors group"
          >
            <span className="text-slate-400 text-[11px] uppercase font-semibold tracking-wider">Journey:</span>
            <strong className="font-mono text-emerald-400 group-hover:underline">
              {activeJourney?.id || 'TM-DEL-2026-X89K'}
            </strong>
          </Link>
          <span className="text-slate-600">•</span>
          <button
            id="btn-header-view-pass"
            onClick={onOpenQR}
            className="text-xs text-slate-300 hover:text-emerald-300 font-semibold flex items-center space-x-1 transition-colors"
            title="Open SafeVisit Digital QR Pass"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">SafePass</span>
          </button>
        </div>

        {/* Right Actions: Theme, Language, SOS & User Portal Avatar */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Global Light / Dark Theme Toggle Button */}
          <button
            id="btn-global-theme-toggle"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all"
            aria-label="Toggle Light/Dark Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Language Selector */}
          <button
            id="btn-header-language-support"
            onClick={onOpenLang}
            title="Open Bhashini Language Support"
            className="flex items-center space-x-1 text-xs text-slate-300 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-indigo-400/40 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="uppercase text-[11px] font-bold text-emerald-400">
              {traveler?.preferred_language || 'EN'}
            </span>
          </button>

          {/* Emergency 112 SOS Button */}
          <Link
            to="/emergency"
            id="btn-header-sos-link"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold transition-all active:scale-95 shadow-sm shadow-red-900/30"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            <span>112 SOS</span>
          </Link>

          {/* User Portal Avatar (Replaces Admin Portal in Main Nav) */}
          <Link
            to="/user-portal"
            id="btn-header-user-portal"
            className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 transition-all group"
            title="Open User Portal & Account"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">
              {traveler?.name ? traveler.name.charAt(0).toUpperCase() : 'T'}
            </div>
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white hidden lg:inline">
              User Portal
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
