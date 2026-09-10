import React, { useState, useMemo } from 'react';
import { CalendarEntry } from '../types.ts';
import {
  Search,
  Filter,
  Layers,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  List,
  Flame,
  Radio
} from 'lucide-react';

interface CalendarBrowserProps {
  entries: CalendarEntry[];
  currentEntryId: number;
  onSelectDay: (id: number, switchToStudio?: boolean) => void;
}

export const CalendarBrowser: React.FC<CalendarBrowserProps> = ({
  entries,
  currentEntryId,
  onSelectDay
}) => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [intentFilter, setIntentFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Domains
  const domains = useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.domain)));
  }, [entries]);

  // Phases
  const phases = useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.phase)));
  }, [entries]);

  // Sectors
  const sectors = useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.gicsSector))).filter((s) => s !== 'As applicable');
  }, [entries]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.domain.toLowerCase().includes(search.toLowerCase()) ||
        e.gicsSector.toLowerCase().includes(search.toLowerCase()) ||
        e.angle.toLowerCase().includes(search.toLowerCase()) ||
        String(e.id) === search.trim() ||
        e.date.toLowerCase().includes(search.toLowerCase());

      const matchDomain = domainFilter === 'ALL' || e.domain === domainFilter;
      const matchPhase = phaseFilter === 'ALL' || e.phase === phaseFilter;
      const matchSector = sectorFilter === 'ALL' || e.gicsSector === sectorFilter;
      const matchIntent = intentFilter === 'ALL' || e.intent === intentFilter;

      return matchSearch && matchDomain && matchPhase && matchSector && matchIntent;
    });
  }, [entries, search, domainFilter, phaseFilter, sectorFilter, intentFilter]);

  const getDomainBadgeColor = (domain: string) => {
    switch (domain) {
      case 'HR':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700/60';
      case 'CRM / Customer Experience':
        return 'bg-purple-950 text-purple-300 border-purple-700/60';
      case 'Finance':
        return 'bg-amber-950 text-amber-300 border-amber-700/60';
      case 'Procurement':
        return 'bg-cyan-950 text-cyan-300 border-cyan-700/60';
      case 'Supply Chain':
        return 'bg-blue-950 text-blue-300 border-blue-700/60';
      case 'Enterprise Business':
        return 'bg-red-950 text-red-300 border-red-700/60';
      default:
        return 'bg-rose-950 text-rose-300 border-rose-700/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111827] border border-[#1e293b] p-3.5 rounded-xl">
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0a66c2]" />
            <span>Daily LinkedIn Posts</span>
          </div>
          <div className="text-2xl font-black text-white mt-1">365 Days</div>
          <div className="text-[11px] text-sky-400 mt-0.5 font-medium">11 Sep 2026 → 10 Sep 2027</div>
        </div>

        <div className="bg-[#111827] border border-[#1e293b] p-3.5 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Weekly Rhythm</div>
          <div className="text-2xl font-black text-amber-400 mt-1">7 Domains</div>
          <div className="text-[11px] text-slate-500 mt-0.5">HR → CRM → FIN → PROC → SCM → BIZ → LDR</div>
        </div>

        <div className="bg-[#111827] border border-[#1e293b] p-3.5 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Enterprise Scope</div>
          <div className="text-2xl font-black text-sky-400 mt-1">11 GICS Sectors</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Real-world enterprise case studies</div>
        </div>

        <div className="bg-[#111827] border border-[#1e293b] p-3.5 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Conversion Funnel</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">Webinar CTA</div>
          <div className="text-[11px] text-emerald-500/80 mt-0.5">transformation.successlabsacademy.com</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111827] border border-[#1e293b] p-4 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by hook, topic, day #, SAP, domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0b0f17] border border-[#334155] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-xs text-slate-400 font-medium">
              Showing <span className="text-white font-bold">{filteredEntries.length}</span> of 365 Days
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#0b0f17] border border-[#1e293b] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs font-bold transition ${
                  viewMode === 'grid' ? 'bg-[#0a66c2] text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs font-bold transition ${
                  viewMode === 'table' ? 'bg-[#0a66c2] text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#1e293b]">
          {/* Domain Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Domain</label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Domains (7)</option>
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Phase Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Evolution Phase</label>
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All 4 Phases</option>
              {phases.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">GICS Sector</label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All GICS Sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Intent Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Content Intent</label>
            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
              className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">All Intents</option>
              <option value="authority">Authority (Thought Leadership)</option>
              <option value="help">Help (Architecture Problem Solving)</option>
              <option value="search">Search (High Intent SEO)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map((entry) => {
            const isSelected = entry.id === currentEntryId;
            return (
              <div
                key={entry.id}
                onClick={() => onSelectDay(entry.id, false)}
                className={`cursor-pointer rounded-xl border p-4 transition duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0f1f38] border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500'
                    : 'bg-[#111827] border-[#1e293b] hover:border-[#334155] hover:bg-[#152033]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-white bg-[#0a66c2] px-2 py-0.5 rounded shadow-sm">
                        DAY #{entry.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {entry.date} ({entry.dayOfWeek.slice(0, 3)})
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDomainBadgeColor(entry.domain)}`}>
                      {entry.domain}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-2">
                    {entry.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    <strong className="text-sky-300 font-medium">Direct Response Angle:</strong> {entry.angle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-[11px]">
                  <div className="text-slate-400 truncate max-w-[170px]">
                    {entry.gicsSector !== 'As applicable' ? entry.gicsSector : entry.phase.split(' - ')[0]}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDay(entry.id, true);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-200 transition"
                  >
                    <span>Draft LinkedIn Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#111827] border border-[#1e293b] rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 border-b border-[#1e293b] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-3">Day #</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Domain</th>
                  <th className="py-3 px-4">LinkedIn Post Topic</th>
                  <th className="py-3 px-3">Sector</th>
                  <th className="py-3 px-3">Phase</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b] text-slate-200">
                {filteredEntries.map((entry) => {
                  const isSelected = entry.id === currentEntryId;
                  return (
                    <tr
                      key={entry.id}
                      onClick={() => onSelectDay(entry.id, false)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-sky-950/40 font-semibold' : 'hover:bg-[#162235]'
                      }`}
                    >
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-sky-400">
                        #{entry.id}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                        {entry.date} <span className="text-[10px]">({entry.dayOfWeek.slice(0, 3)})</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDomainBadgeColor(entry.domain)}`}>
                          {entry.domain}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-white max-w-xs truncate">
                        {entry.title}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                        {entry.gicsSector}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-500">
                        {entry.phase.split(' - ')[0]}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDay(entry.id, true);
                          }}
                          className="px-2.5 py-1 bg-[#1e293b] hover:bg-[#0a66c2] hover:text-white text-xs text-slate-200 rounded transition font-semibold"
                        >
                          Draft Post →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
