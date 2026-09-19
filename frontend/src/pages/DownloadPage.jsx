import React, { useState } from 'react';
import { Download, ExternalLink, Check, Copy, FileArchive, Terminal, ShieldCheck, FolderTree } from 'lucide-react';

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const directUrl = `${window.location.origin}/travelmate-source.zip`;
  const apiUrl = `${window.location.origin}/api/download-zip`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleBlobDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/travelmate-source.zip');
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'travelmate-project-source.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback to direct navigation
      window.open(apiUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              <FileArchive className="w-4 h-4" />
              <span>Full Project Codebase Archive</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
              Download Project ZIP
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Complete source package including full React frontend, Node/Express backend, database schemas, and AI translation/routing integrations. Cleanly packaged with no cache bloat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {/* Direct Blob Download Button */}
            <button
              onClick={handleBlobDownload}
              disabled={downloading}
              id="btn-primary-download-zip"
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? 'Preparing Download...' : 'Download ZIP Now'}</span>
            </button>

            {/* Open in New Tab Button (bypasses iframe restrictions) */}
            <a
              href={apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-newtab-download-zip"
              className="py-3 px-5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 hover:border-emerald-500/40 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open in New Tab to Download</span>
            </a>
          </div>
        </div>
      </div>

      {/* Direct URL & Quick Copy Section */}
      <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <span>Direct Download URL</span>
        </h2>
        <p className="text-xs text-slate-400">
          If your browser blocks downloads inside the AI Studio preview frame, paste this direct link into any new browser tab:
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            readOnly
            value={directUrl}
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-emerald-300 font-mono focus:outline-none select-all"
          />
          <button
            onClick={handleCopyLink}
            id="btn-copy-zip-link"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Package Contents Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <FolderTree className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white">What's Inside the ZIP</h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">frontend/</strong> — Complete Vite + React 18 single-page application with Tailwind CSS, Lucide icons, and all pages/components.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">backend/</strong> — Full Express REST API with controllers, routes, error handlers, and Gemini AI endpoints.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">database/</strong> — PostgreSQL / Supabase SQL schema migrations and seed scripts.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">Config files</strong> — package.json, vite.config.js, tailwind.config.js, .env.example, README.md.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong className="text-white">Cleaned Archive</strong> — node_modules and .git build caches excluded (~2.8 MB clean zip size).</span>
            </li>
          </ul>
        </div>

        {/* How to Run Locally */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <Terminal className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white">How to Run on Your Computer</h2>
          </div>
          <div className="space-y-3 text-xs">
            <p className="text-slate-300">Once extracted, open your terminal in the extracted folder:</p>
            <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 font-mono text-[11px] text-slate-300 space-y-1.5 overflow-x-auto">
              <div className="text-slate-500"># 1. Install dependencies</div>
              <div className="text-emerald-300">npm install</div>
              <div className="text-slate-500 mt-2"># 2. Start both frontend & backend concurrently</div>
              <div className="text-emerald-300">npm run dev</div>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400/90 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Everything is preconfigured to work out of the box!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
