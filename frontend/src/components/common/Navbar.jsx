import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Calendar,
  Calculator,
  Navigation,
  Globe,
  Camera,
  AlertCircle,
  User,
  ChevronDown,
  Layers,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useJourneyChain } from '../../context/JourneyChainContext';

export default function Navbar() {
  const { activeJourney } = useJourneyChain();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null); // 'prepare' | 'travel' | null

  // Desktop primary navigation stages
  const isPrepareActive = location.pathname === '/planner' || location.pathname === '/fare-meter';
  const isTravelActive = location.pathname === '/safe-journey' || location.pathname === '/bhashini-translator' || location.pathname === '/vault';

  // Mobile Bottom Navigation items (Direct access to all separate sections)
  const mobileNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/planner', label: 'Planner', icon: Calendar },
    { to: '/fare-meter', label: 'Fare', icon: Calculator },
    {
      to: '/my-journey',
      label: 'Journey',
      icon: Layers,
      highlight: true
    },
    { to: '/safe-journey', label: 'Safe Route', icon: Navigation },
    { to: '/bhashini-translator', label: 'Translate', icon: Globe },
    { to: '/vault', label: 'Vault', icon: Camera },
  ];

  return (
    <>
      {/* DESKTOP NAVIGATION BAR (md+) - Each tool as a clean, direct separate section */}
      <nav className="hidden md:block sticky top-16 z-30 bg-surface/90 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar gap-2">
            {/* Direct Section Links */}
            <div className="flex items-center space-x-1 lg:space-x-1.5 text-xs font-semibold shrink-0">
              <NavLink
                to="/"
                end
                id="nav-desktop-home"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </NavLink>

              {/* 1. SEPARATE SECTION: TRIP PLANNER */}
              <NavLink
                to="/planner"
                id="nav-desktop-trip-planner"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Trip Planner</span>
              </NavLink>

              {/* 2. SEPARATE SECTION: FAIR FARE INTELLIGENCE */}
              <NavLink
                to="/fare-meter"
                id="nav-desktop-fair-fare"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Fair Fare Intelligence</span>
              </NavLink>

              {/* 3. SEPARATE SECTION: BHASHINI TRANSLATOR */}
              <NavLink
                to="/bhashini-translator"
                id="nav-desktop-bhashini-translator"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Bhashini Translator</span>
              </NavLink>

              {/* 4. SEPARATE SECTION: SAFE ROUTE */}
              <NavLink
                to="/safe-journey"
                id="nav-desktop-safe-route"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Safe Route</span>
              </NavLink>

              {/* 5. SEPARATE SECTION: RIDE SAFE VAULT */}
              <NavLink
                to="/vault"
                id="nav-desktop-ride-safe-vault"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Camera className="w-3.5 h-3.5 text-purple-400" />
                <span>Ride Safe Vault</span>
              </NavLink>

              {/* DISCOVER MONUMENTS */}
              <NavLink
                to="/discover"
                id="nav-desktop-discover"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Compass className="w-3.5 h-3.5 text-teal-400" />
                <span>Explore</span>
              </NavLink>

              {/* MY JOURNEY CHAIN */}
              <NavLink
                to="/my-journey"
                id="nav-desktop-my-journey"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 font-bold ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 text-emerald-300 border border-emerald-400/40 shadow-sm shadow-emerald-500/20'
                      : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/25'
                  }`
                }
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>My Journey</span>
              </NavLink>

              {/* RESOLVE / EMERGENCY */}
              <NavLink
                to="/incident"
                id="nav-desktop-resolve"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>SOS / Report</span>
              </NavLink>
            </div>

            {/* Right side: User Portal */}
            <div className="flex items-center space-x-2 shrink-0">
              <NavLink
                to="/user-portal"
                id="nav-desktop-user-portal"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <User className="w-3.5 h-3.5 text-slate-300" />
                <span>Portal</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE-FIRST BOTTOM NAVIGATION BAR (Visible strictly on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1120]/95 backdrop-blur-xl border-t border-white/[0.08] pb-safe shadow-2xl">
        <div className="w-full px-2 py-1 flex items-center justify-around overflow-x-auto no-scrollbar gap-0.5">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isHighlight = item.highlight;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all relative shrink-0 ${
                    isHighlight
                      ? isActive
                        ? 'text-emerald-300 -translate-y-0.5'
                        : 'text-emerald-400 -translate-y-0.5'
                      : isActive
                      ? 'text-emerald-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isHighlight ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-emerald-400/40 text-white mb-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                    ) : (
                      <Icon className="w-5 h-5 mb-0.5" />
                    )}
                    <span className="text-[10px] tracking-tight whitespace-nowrap">
                      {item.label}
                    </span>
                    {isActive && !isHighlight && (
                      <span className="w-1 h-1 rounded-full bg-emerald-400 absolute bottom-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
