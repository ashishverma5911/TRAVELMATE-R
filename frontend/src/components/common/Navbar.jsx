import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  QrCode,
  MapPin,
  CalendarDays,
  Globe,
  Calculator,
  Navigation,
  Camera,
  AlertCircle,
  LayoutDashboard,
} from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Safe Pass', icon: QrCode },
    { to: '/discover', label: 'Verified Places', icon: MapPin },
    { to: '/planner', label: 'Trip Planner', icon: CalendarDays },
    { to: '/phrase-helper', label: 'Phrase Helper', icon: Globe },
    { to: '/fare-meter', label: 'Fair Fare', icon: Calculator },
    { to: '/safe-journey', label: 'Safe Track', icon: Navigation },
    { to: '/vault', label: 'RideSafe Vault', icon: Camera },
    { to: '/incident', label: 'Incident Report', icon: AlertCircle },
    { to: '/admin', label: 'Admin Portal', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-surface-border md:static md:border-b md:border-t-0 md:bg-surface/50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around md:justify-start md:space-x-1 py-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap tracking-tight">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
