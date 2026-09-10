import React, { useState } from 'react';
import { CalendarEntry } from '../types.ts';
import {
  Calendar,
  Sparkles,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Download,
  Terminal,
  Layers,
  Flame,
  ExternalLink,
  Copy,
  Check,
  Send,
  Linkedin
} from 'lucide-react';

interface HeaderProps {
  currentEntry: CalendarEntry;
  totalDays: number;
  activeTab: 'studio' | 'calendar' | 'weekly' | 'analytics';
  setActiveTab: (tab: 'studio' | 'calendar' | 'weekly' | 'analytics') => void;
  onSelectDay: (id: number) => void;
  onOpenVibeCode: () => void;
  onOpenTeleprompter: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentEntry,
  totalDays,
  activeTab,
  setActiveTab,
  onSelectDay,
  onOpenVibeCode,
  hasApiKey
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const WEBINAR_URL = 'https://transformation.successlabsacademy.com/';

  const handleCopyWebinar = () => {
    navigator.clipboard.writeText(WEBINAR_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Row */}
        <div className="py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0a66c2] flex items-center justify-center text-white text-xs font-bold">
                    in
                  </span>
                  SUCCESSLABS ACADEMY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1e293b] text-sky-400 border border-sky-800/40">
                  LinkedIn Post Architect
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                  Direct Response Copywriting
                </span>
                {hasApiKey ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-600/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    Gemini 2.5 Flash Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-[#141d2e] px-2 py-0.5 rounded border border-[#1e293b]">
                    Direct Response Engine Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                <strong className="text-white font-medium">Architecting experiences for a better world</strong> • Niladri Bihari Nayak • 365-Day Daily Conversion Architecture
              </p>
            </div>
          </div>

          {/* Quick Date Stepper & Webinar Conversion Action */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Webinar Link CTA Banner */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-sky-950/80 to-blue-950/90 border border-sky-600/40 rounded-lg px-2.5 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold text-sky-200 hidden sm:inline">Webinar CTA:</span>
              <a
                href={WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-sky-300 hover:text-white underline underline-offset-2 flex items-center gap-1"
                title="Open Webinar Landing Page"
              >
                <span>transformation.successlabsacademy.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handleCopyWebinar}
                className="p-1 hover:bg-sky-900/60 rounded text-sky-300 hover:text-white transition ml-0.5"
                title="Copy Webinar URL"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Day Selector Pill */}
            <div className="flex items-center bg-[#131b2c] border border-[#1e293b] rounded-lg p-1">
              <button
                onClick={() => onSelectDay(Math.max(1, currentEntry.id - 1))}
                disabled={currentEntry.id <= 1}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-[#1e293b] transition"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 text-center">
                <div className="text-xs font-black text-white whitespace-nowrap">
                  DAY #{currentEntry.id} <span className="text-slate-500 font-normal">/ {totalDays}</span>
                </div>
                <div className="text-[10px] text-sky-400 font-semibold whitespace-nowrap">
                  {currentEntry.date} ({currentEntry.dayOfWeek})
                </div>
              </div>
              <button
                onClick={() => onSelectDay(Math.min(totalDays, currentEntry.id + 1))}
                disabled={currentEntry.id >= totalDays}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-[#1e293b] transition"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Jump to Season Premiere */}
            <button
              onClick={() => onSelectDay(1)}
              className="px-2.5 py-1.5 bg-[#131b2c] hover:bg-[#1e293b] border border-[#1e293b] text-xs font-bold text-slate-200 rounded-lg flex items-center gap-1.5 transition"
              title="Jump to Season Premiere / Day 1"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Day 1</span>
            </button>

            {/* Vibe Code Master Prompt */}
            <button
              onClick={onOpenVibeCode}
              className="px-2.5 py-1.5 bg-[#131b2c] hover:bg-[#1e293b] border border-[#1e293b] text-xs font-bold text-slate-400 hover:text-white rounded-lg flex items-center gap-1.5 transition"
              title="View Master System Prompt & Vibe Code"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Prompt OS</span>
            </button>

            {/* Download Calendar */}
            <a
              href="/master_calendar.md"
              download="SuccessLabs_365_LinkedIn_Calendar.md"
              className="p-2 bg-[#131b2c] hover:bg-[#1e293b] border border-[#1e293b] text-slate-400 hover:text-white rounded-lg transition"
              title="Download Master Calendar .md"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'studio'
                ? 'bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>Daily LinkedIn Post Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'calendar'
                ? 'bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>365-Day Content Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'weekly'
                ? 'bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Weekly Domain Rhythm & 2027 Evolution</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'analytics'
                ? 'bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Conversion & Webinar Funnel Analytics</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

