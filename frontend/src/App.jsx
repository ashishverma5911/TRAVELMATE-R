import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TravelerProvider } from './context/TravelerContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HelplineFloatingBadge from './components/common/HelplineFloatingBadge';
import QRModal from './components/common/QRModal';
import ClaudeChatbotModal from './components/chat/ClaudeChatbotModal';
import LanguageSupportModal from './components/common/LanguageSupportModal';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import DiscoverPage from './pages/DiscoverPage';
import FareMeterPage from './pages/FareMeterPage';
import SafeJourneyPage from './pages/SafeJourneyPage';
import EvidenceVaultPage from './pages/EvidenceVaultPage';
import IncidentReportPage from './pages/IncidentReportPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TripPlannerPage from './pages/TripPlannerPage';
import PhraseHelperPage from './pages/PhraseHelperPage';
import { Bot } from 'lucide-react';

export default function App() {
  const [isQROpen, setIsQROpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <ThemeProvider>
      <TravelerProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-slate-100 flex flex-col pb-36 md:pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Header */}
            <Header onOpenQR={() => setIsQROpen(true)} onOpenLang={() => setIsLangOpen(true)} />

            {/* Sub Navigation */}
            <Navbar />

            {/* Main Routing Container */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<OnboardingPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/planner" element={<TripPlannerPage />} />
                <Route path="/trip-planner" element={<TripPlannerPage />} />
                <Route path="/phrase-helper" element={<PhraseHelperPage />} />
                <Route path="/language" element={<PhraseHelperPage />} />
                <Route path="/fare-meter" element={<FareMeterPage />} />
                <Route path="/safe-journey" element={<SafeJourneyPage />} />
                <Route path="/vault" element={<EvidenceVaultPage />} />
                <Route path="/incident" element={<IncidentReportPage />} />
                <Route path="/emergency" element={<IncidentReportPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </main>

            {/* Floating Claude Chatbot Launcher Button - Compact and non-intrusive */}
            <div className="fixed bottom-4 left-4 z-30 md:bottom-6 md:left-6">
              <button
                id="btn-floating-claude-chat"
                onClick={() => setIsChatOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-3.5 py-2.5 rounded-full shadow-xl shadow-indigo-600/30 border border-indigo-400/40 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Bot className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wide font-display hidden sm:inline">
                  Ask Claude AI
                </span>
              </button>
            </div>

            {/* Floating Emergency & Embassy Helpline Directory */}
            <HelplineFloatingBadge />

            {/* QR Pass Modal */}
            <QRModal isOpen={isQROpen} onClose={() => setIsQROpen(false)} />

            {/* Claude Chatbot Grounded Modal */}
            <ClaudeChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            {/* Language Support & Bhashini Phrase Cards Modal */}
            <LanguageSupportModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
          </div>
        </BrowserRouter>
      </TravelerProvider>
    </ThemeProvider>
  );
}
