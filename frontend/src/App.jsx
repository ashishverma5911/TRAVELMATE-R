import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TravelerProvider } from './context/TravelerContext';
import { JourneyChainProvider } from './context/JourneyChainContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HelplineFloatingBadge from './components/common/HelplineFloatingBadge';
import QRModal from './components/common/QRModal';
import TMChatbotModal from './components/chat/TMChatbotModal';
import LanguageSupportModal from './components/common/LanguageSupportModal';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import MyJourneyPage from './pages/MyJourneyPage';
import UserPortalPage from './pages/UserPortalPage';
import DiscoverPage from './pages/DiscoverPage';
import FareMeterPage from './pages/FareMeterPage';
import SafeJourneyPage from './pages/SafeJourneyPage';
import EvidenceVaultPage from './pages/EvidenceVaultPage';
import IncidentReportPage from './pages/IncidentReportPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TripPlannerPage from './pages/TripPlannerPage';
import BhashiniTranslatorPage from './pages/BhashiniTranslatorPage';
import DownloadPage from './pages/DownloadPage';
import { Bot } from 'lucide-react';

export default function App() {
  const [isQROpen, setIsQROpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <ThemeProvider>
      <TravelerProvider>
        <JourneyChainProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-slate-100 flex flex-col pb-36 md:pb-24 selection:bg-emerald-500/30 selection:text-emerald-200">
              {/* Header */}
              <Header onOpenQR={() => setIsQROpen(true)} onOpenLang={() => setIsLangOpen(true)} />

              {/* Sub Navigation */}
              <Navbar />

              {/* Main Routing Container */}
              <main className="flex-1">
                <Routes>
                  {/* Home / Travel Command Dashboard */}
                  <Route path="/" element={<OnboardingPage />} />
                  <Route path="/dashboard" element={<OnboardingPage />} />

                  {/* Core Smart Journey Chain */}
                  <Route path="/my-journey" element={<MyJourneyPage />} />
                  <Route path="/journey" element={<MyJourneyPage />} />
                  <Route path="/journey-chain" element={<MyJourneyPage />} />

                  {/* Tourist User Portal (Replacing Admin Portal in Nav) */}
                  <Route path="/user-portal" element={<UserPortalPage />} />
                  <Route path="/portal" element={<UserPortalPage />} />
                  <Route path="/profile" element={<UserPortalPage />} />

                  {/* Stage 1: Discover */}
                  <Route path="/discover" element={<DiscoverPage />} />

                  {/* Stage 2: Prepare */}
                  <Route path="/planner" element={<TripPlannerPage />} />
                  <Route path="/trip-planner" element={<TripPlannerPage />} />
                  <Route path="/fare-meter" element={<FareMeterPage />} />
                  <Route path="/fare" element={<FareMeterPage />} />

                  {/* Stage 3: Travel */}
                  <Route path="/bhashini-translator" element={<BhashiniTranslatorPage />} />
                  <Route path="/translate" element={<BhashiniTranslatorPage />} />
                  <Route path="/language" element={<BhashiniTranslatorPage />} />
                  <Route path="/phrase-helper" element={<BhashiniTranslatorPage />} />
                  <Route path="/safe-journey" element={<SafeJourneyPage />} />
                  <Route path="/safe-track" element={<SafeJourneyPage />} />
                  <Route path="/vault" element={<EvidenceVaultPage />} />

                  {/* Stage 4: Resolve */}
                  <Route path="/incident" element={<IncidentReportPage />} />
                  <Route path="/emergency" element={<IncidentReportPage />} />

                  {/* Internal Admin Moderation (Preserved on /admin and /admin-internal, protected) */}
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin-internal" element={<AdminDashboardPage />} />

                  {/* Project Code ZIP Download */}
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/download-zip" element={<DownloadPage />} />
                  <Route path="/export" element={<DownloadPage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Floating TM Chatbot Launcher Button - Powered by Gemini */}
              <div className="fixed bottom-20 md:bottom-6 left-4 z-30 md:left-6">
                <button
                  id="btn-floating-tm-chatbot"
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white px-3.5 py-2 md:px-4 md:py-2.5 rounded-full shadow-xl shadow-emerald-600/30 border border-emerald-400/40 transition-all duration-200 hover:scale-105 active:scale-95 group"
                  title="Open TM chatbot"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-emerald-200 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-xs font-bold tracking-wide font-display">
                    TM chatbot
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </button>
              </div>

              {/* Floating Emergency & Embassy Helpline Directory */}
              <HelplineFloatingBadge />

              {/* QR Pass Modal */}
              <QRModal isOpen={isQROpen} onClose={() => setIsQROpen(false)} />

              {/* TM Chatbot Modal (Powered by Gemini) */}
              <TMChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

              {/* Language Support & Bhashini Phrase Cards Modal */}
              <LanguageSupportModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
            </div>
          </BrowserRouter>
        </JourneyChainProvider>
      </TravelerProvider>
    </ThemeProvider>
  );
}
