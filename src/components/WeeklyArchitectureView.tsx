import React from 'react';
import { CalendarEntry } from '../types.ts';
import {
  Layers,
  Cpu,
  Database,
  Compass,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Users,
  Briefcase,
  DollarSign,
  ShoppingCart,
  Truck,
  Building,
  Award,
  Radio
} from 'lucide-react';

interface WeeklyArchitectureViewProps {
  currentEntry: CalendarEntry;
  onSelectDay: (id: number) => void;
  entries: CalendarEntry[];
}

export const WeeklyArchitectureView: React.FC<WeeklyArchitectureViewProps> = ({
  currentEntry,
  onSelectDay,
  entries
}) => {
  const weeklyRhythm = [
    {
      day: 'Monday',
      domain: 'HR Transformation',
      tech: 'SAP SuccessFactors / HCM • AI Skills Cloud',
      focus: 'Workforce architecture, skills ontology, employee agentic journeys',
      icon: Users,
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
    },
    {
      day: 'Tuesday',
      domain: 'CRM / Customer Experience',
      tech: 'SAP CX • Joule Sales/Service Copilots',
      focus: 'Omnichannel architecture, CPQ, hyper-personalized commerce',
      icon: Briefcase,
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-400'
    },
    {
      day: 'Wednesday',
      domain: 'Finance Transformation',
      tech: 'SAP S/4HANA Finance • BTP Financial AI',
      focus: 'Continuous close, automated reconciliations, autonomous cash management',
      icon: DollarSign,
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-400'
    },
    {
      day: 'Thursday',
      domain: 'Procurement Transformation',
      tech: 'SAP Ariba • Category Management AI',
      focus: 'Supplier intelligence, autonomous sourcing, contract compliance agents',
      icon: ShoppingCart,
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400'
    },
    {
      day: 'Friday',
      domain: 'Supply Chain Transformation',
      tech: 'SAP IBP • Digital Supply Chain on BTP',
      focus: 'Demand sensing, dynamic inventory rebalancing, disruption response agents',
      icon: Truck,
      color: 'border-blue-500/50 bg-blue-950/20 text-blue-400'
    },
    {
      day: 'Saturday',
      domain: 'Enterprise Business & EA',
      tech: 'Clean Core • TOGAF • LeanIX • Signavio',
      focus: 'Operating model, technical debt elimination, business capability mapping',
      icon: Building,
      color: 'border-red-500/50 bg-red-950/20 text-red-400'
    },
    {
      day: 'Sunday',
      domain: 'Leadership & Transformation',
      tech: 'Cross-Domain Enterprise Case Studies',
      focus: 'Chief Architect leadership, executive communication, AI talent strategies',
      icon: Award,
      color: 'border-rose-500/50 bg-rose-950/20 text-rose-400'
    }
  ];

  const phases = [
    {
      number: 'Phase 1',
      months: 'Sep – Dec 2026',
      title: 'Foundations & Architecture Modernization',
      description:
        'Establishing Clean Core, SAP BTP extensions, semantic data fabric, and baseline enterprise capability mapping.',
      accent: 'border-red-600/60 bg-[#1f1414] text-red-400'
    },
    {
      number: 'Phase 2',
      months: 'Jan – Mar 2027',
      title: 'Agentic Workflows & Multi-Model Orchestration',
      description:
        'Deploying Joule, autonomous agent networks, semantic knowledge graphs, and real-time operational RAG.',
      accent: 'border-amber-600/60 bg-[#1f1a14] text-amber-400'
    },
    {
      number: 'Phase 3',
      months: 'Apr – Jun 2027',
      title: 'Autonomous Processes & Human-in-the-Loop',
      description:
        'Self-healing supply chains, autonomous finance reconciliations, and continuous architecture governance gates.',
      accent: 'border-emerald-600/60 bg-[#141f18] text-emerald-400'
    },
    {
      number: 'Phase 4',
      months: 'Jul – Sep 2027',
      title: 'The 2028 Horizon: AI-Native Operating Model',
      description:
        'Synthesizing 365 days into next-decade enterprise architectures, autonomous operating models, and chief architect playbooks.',
      accent: 'border-purple-600/60 bg-[#1c1422] text-purple-400'
    }
  ];

  const gicsSectors = [
    'Energy',
    'Materials',
    'Industrials',
    'Consumer Discretionary',
    'Consumer Staples',
    'Health Care',
    'Financials',
    'Information Technology',
    'Communication Services',
    'Utilities',
    'Real Estate'
  ];

  // Calculate current week's 7 days
  const currentWeekNumber = Math.ceil(currentEntry.id / 7);
  const startDayId = (currentWeekNumber - 1) * 7 + 1;
  const currentWeekDays = entries.slice(startDayId - 1, startDayId + 6);

  return (
    <div className="space-y-8">
      {/* Current Week's Flow - YouTube Studio Style */}
      <div className="bg-[#181818] border border-[#272727] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#272727] pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-xs font-black shadow-sm">
                WEEK #{currentWeekNumber}
              </span>
              <h2 className="text-base font-bold text-white">
                Current 7-Day Broadcast & Architecture Flow
              </h2>
            </div>
            <p className="text-xs text-[#aaaaaa] mt-1">
              Days #{startDayId} to #{Math.min(365, startDayId + 6)} • Continuous domain progression from HR to Leadership
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {currentWeekDays.map((day) => {
            const isToday = day.id === currentEntry.id;
            return (
              <div
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`cursor-pointer rounded-xl p-3 border transition flex flex-col justify-between ${
                  isToday
                    ? 'bg-[#251010] border-red-600 shadow-md ring-1 ring-red-600'
                    : 'bg-[#121212] border-[#272727] hover:border-[#383838] hover:bg-[#1a1a1a]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-black text-red-400">Day #{day.id}</span>
                    <span className="text-[#888888] font-medium">{day.dayOfWeek.slice(0, 3)}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 line-clamp-1">
                    {day.domain}
                  </div>
                  <h4 className="text-xs font-semibold text-white leading-snug line-clamp-3">
                    {day.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-[#272727] flex items-center justify-between text-[10px] text-[#888888]">
                  <span>{day.date.split(' ')[0]} {day.date.split(' ')[1]}</span>
                  <span className="text-red-400 font-bold">Select →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Master 10-Step Intellectual Chain */}
      <div className="bg-[#181818] border border-[#272727] rounded-2xl p-6">
        <div className="border-b border-[#272727] pb-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-red-500" />
            <span>The 10-Step Architectural Value Chain</span>
          </h3>
          <p className="text-xs text-[#aaaaaa] mt-1">
            Every episode moves through this precise logical chain. We never present raw AI prompts without enterprise context.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar text-xs">
          {[
            'Business Problem',
            'Business Architecture',
            'Enterprise Architecture',
            'SAP Core',
            'Data Fabric',
            'AI Layer',
            'Agents',
            'Governance',
            'Transformation',
            'Business Outcome'
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-shrink-0 bg-[#121212] border border-[#2e2e2e] px-3 py-2 rounded-lg text-center font-bold text-[#e0e0e0]">
                <div className="text-[10px] text-red-400 font-mono">0{idx + 1}</div>
                <div className="whitespace-nowrap">{step}</div>
              </div>
              {idx < 9 && <ArrowRight className="w-4 h-4 text-[#555555] flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Weekly 7-Domain Rhythm */}
      <div className="bg-[#181818] border border-[#272727] rounded-2xl p-6">
        <div className="border-b border-[#272727] pb-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-500" />
            <span>Weekly 7-Domain Cadence</span>
          </h3>
          <p className="text-xs text-[#aaaaaa] mt-1">
            Predictable scheduling ensures audiences build habits and return on their specific domain days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklyRhythm.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2 bg-[#121212] border-[#272727] hover:border-[#383838] transition`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">{item.day}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1f1f1f] text-[#aaaaaa] border border-[#2e2e2e]">
                    Day #{idx + 1} Pattern
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{item.domain}</h4>
                <div className="text-xs text-[#aaaaaa] font-mono">{item.tech}</div>
                <p className="text-xs text-[#888888] leading-relaxed">{item.focus}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2027 Trend Lens: 4 Evolutionary Phases */}
      <div className="bg-[#181818] border border-[#272727] rounded-2xl p-6">
        <div className="border-b border-[#272727] pb-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>2027 Trend Lens — The 4 Sequential Evolutionary Phases</span>
          </h3>
          <p className="text-xs text-[#aaaaaa] mt-1">
            How the 365 days mature from baseline hygiene to autonomous enterprise foresight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((p, idx) => (
            <div key={idx} className={`rounded-xl border p-4 flex flex-col justify-between ${p.accent}`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest">{p.number}</span>
                <h4 className="text-base font-black text-white mt-1">{p.title}</h4>
                <div className="text-[11px] font-medium text-[#cccccc] mt-1">{p.months}</div>
                <p className="text-xs text-[#aaaaaa] mt-2 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 11 GICS Sectors Engine */}
      <div className="bg-[#181818] border border-[#272727] rounded-2xl p-6">
        <div className="border-b border-[#272727] pb-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-red-400" />
            <span>11 GICS Industry Engine</span>
          </h3>
          <p className="text-xs text-[#aaaaaa] mt-1">
            Every technical architecture is grounded in one of the 11 global economic sectors using: Problem → Current State → Architecture → SAP → AI → Target State → Outcome.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {gicsSectors.map((sector, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-[#121212] border border-[#272727] text-xs font-semibold text-[#cccccc]"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
