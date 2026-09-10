import React from 'react';
import { CalendarEntry } from '../types.ts';
import { Sparkles, Youtube, Layers, Cpu, Database } from 'lucide-react';

interface ThumbnailPreviewProps {
  entry: CalendarEntry;
  customBadge?: string;
}

export const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ entry, customBadge }) => {
  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'HR':
        return 'from-emerald-900 to-slate-950 border-emerald-500/40 text-emerald-400';
      case 'CRM / Customer Experience':
        return 'from-purple-900 to-slate-950 border-purple-500/40 text-purple-400';
      case 'Finance':
        return 'from-amber-900 to-slate-950 border-amber-500/40 text-amber-400';
      case 'Procurement':
        return 'from-cyan-900 to-slate-950 border-cyan-500/40 text-cyan-400';
      case 'Supply Chain':
        return 'from-blue-900 to-slate-950 border-blue-500/40 text-blue-400';
      case 'Enterprise Business':
        return 'from-indigo-900 to-slate-950 border-indigo-500/40 text-indigo-400';
      default:
        return 'from-rose-900 to-slate-950 border-rose-500/40 text-rose-400';
    }
  };

  const badgeText = customBadge || `${entry.domain.toUpperCase().split(' ')[0]} AI BLUEPRINT`;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950 shadow-2xl aspect-video max-w-lg w-full flex flex-col justify-between p-5 select-none">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600/90 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
            <Youtube className="w-3.5 h-3.5" />
            LIVE #{entry.id}
          </div>
          <span className="text-[11px] font-semibold text-slate-300 tracking-wide uppercase px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
            {entry.date}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
          <Sparkles className="w-3 h-3" />
          <span>SuccessLabs Academy</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto">
        <div className="inline-block mb-2">
          <span className={`text-xs font-extrabold tracking-widest px-2.5 py-1 rounded border shadow-sm ${getDomainColor(entry.domain)}`}>
            {badgeText}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md line-clamp-2">
          {entry.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-300 font-medium line-clamp-1">
          {entry.gicsSector !== 'As applicable' ? `${entry.gicsSector} Sector Focus • ` : ''}Enterprise Architecture + AI + SAP
        </p>
      </div>

      {/* Bottom Architecture Pills */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded">
            <Layers className="w-3 h-3 text-blue-400" /> EA
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded">
            <Cpu className="w-3 h-3 text-emerald-400" /> AI
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded">
            <Database className="w-3 h-3 text-amber-400" /> SAP
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">
          Niladri Bihari Nayak
        </span>
      </div>
    </div>
  );
};
