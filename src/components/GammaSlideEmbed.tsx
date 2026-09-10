import React, { useState, useEffect } from 'react';
import { CalendarEntry } from '../types.ts';
import {
  Presentation,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Maximize2,
  Sliders,
  ChevronRight,
  Sparkles,
  Link2
} from 'lucide-react';

interface GammaSlideEmbedProps {
  entry: CalendarEntry;
  className?: string;
  isCompact?: boolean;
}

export const GammaSlideEmbed: React.FC<GammaSlideEmbedProps> = ({
  entry,
  className = '',
  isCompact = false
}) => {
  const storageKey = `sla_gamma_day_${entry.id}`;
  const [gammaUrl, setGammaUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Load saved Gamma URL from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setGammaUrl(saved);
      setInputUrl(saved);
    } else {
      setGammaUrl('');
      setInputUrl('');
    }
    setActiveSlideIndex(0);
  }, [entry.id]);

  // Convert Gamma doc url to embed url if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    let formatted = url.trim();
    if (formatted.includes('gamma.app/docs/') && !formatted.includes('/embed/')) {
      formatted = formatted.replace('gamma.app/docs/', 'gamma.app/embed/');
    }
    return formatted;
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = inputUrl.trim();
    if (cleanUrl) {
      localStorage.setItem(storageKey, cleanUrl);
      setGammaUrl(cleanUrl);
      setIsEditing(false);
    }
  };

  const handleClearUrl = () => {
    localStorage.removeItem(storageKey);
    setGammaUrl('');
    setInputUrl('');
    setIsEditing(false);
  };

  // Generate an optimized presentation prompt tailored for Gamma.app AI
  const gammaPrompt = `Create a high-impact, professional 10-slide executive presentation for SuccessLabs Academy YouTube Live Day #${entry.id}:
Title: "${entry.title}"
Domain: ${entry.domain}
Theme: Enterprise Architecture + AI + SAP Transformation
GICS Sector Case: ${entry.gicsSector}
Motto: "Architecting experiences for a better world"
Presenter: Niladri Bihari Nayak

Slide Breakdown:
1. Title Slide: ${entry.title} - Day #${entry.id} YouTube Live
2. Strategic Problem: Core Friction in ${entry.domain} & 2026/2027 Enterprise Imperative
3. Business Architecture: Level 1 & Level 2 Capability Heatmap & Value Stream
4. Target Enterprise Architecture: Clean Core Boundary, TOGAF 4-Tier Blueprint
5. SAP Ecosystem Alignment: S/4HANA, SAP BTP, Datasphere & Joule Integration
6. AI & Agent Architecture: Contextual LLMs, Autonomous Workflows & Tool Calling
7. Human + AI Governance: Risk Guardrails, Security & Enterprise Auditability
8. Real-World Case Study: Quantified ROI & Transformation Metrics (${entry.gicsSector})
9. The Architect's Decision Matrix: 3 Non-negotiable Mandates for Tomorrow Morning
10. Community Q&A & Actionable CTA: Join SuccessLabs Academy Live

Style: Minimalist high-contrast dark theme, crisp typography, clean architectural diagrams, corporate enterprise aesthetic.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(gammaPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  // Built-in interactive slide preview deck for when no custom Gamma link is pasted
  const sampleDeck = [
    {
      title: entry.title,
      subtitle: `Day #${entry.id} • ${entry.domain} • ${entry.date}`,
      badge: 'SUCCESSLABS ACADEMY LIVE',
      bullets: [
        `Enterprise Architecture Foundation + AI Acceleration + SAP Clean Core`,
        `Mission: Architecting experiences for a better world`,
        `Presenter: Niladri Bihari Nayak`
      ]
    },
    {
      title: 'The Enterprise Business Friction',
      subtitle: `Why traditional ${entry.domain} operating models stall in 2026/2027`,
      badge: 'MARKET CONTEXT',
      bullets: [
        'Decoupled AI pilots that fail to scale into mission-critical transactional systems',
        'Mounting technical debt and brittle custom code preventing clean cloud migrations',
        'Urgent board demand for measurable working capital and cycle-time efficiency'
      ]
    },
    {
      title: 'Business Architecture & Capability Mapping',
      subtitle: 'Decoupling strategic value streams from implementation silos',
      badge: 'CAPABILITY BLUEPRINT',
      bullets: [
        'Level-1 & Level-2 capability decomposition across value delivery chains',
        'Identifying the single greatest operational constraint in the workflow',
        'Aligning executive KPIs directly to underlying architectural building blocks'
      ]
    },
    {
      title: 'Target Enterprise Architecture Blueprint',
      subtitle: 'Strict Clean Core boundary with event-driven data fabric',
      badge: 'EA TARGET STATE',
      bullets: [
        'Zero core table modifications—all extensions live on cloud platform services',
        'Event mesh choreography enabling real-time context streaming to AI models',
        'Immutable architectural governance model protecting core compliance'
      ]
    },
    {
      title: 'SAP Ecosystem Realization',
      subtitle: 'Operationalizing S/4HANA, BTP, Datasphere & Joule',
      badge: 'SAP INTEGRATION',
      bullets: [
        'SAP Datasphere acting as unified semantic context layer without data duplication',
        'BTP extension suite handling custom microservices and agent runtimes',
        'Native Joule copilots delivering contextual insight within standard UX flows'
      ]
    },
    {
      title: 'AI & Autonomous Agent Orchestration',
      subtitle: 'Moving from conversational copilots to autonomous execution',
      badge: 'AI AGENTS',
      bullets: [
        'Autonomous agent reasoning with deterministic schema verification',
        'SAP authorization role pass-through enforcing granular security policies',
        'Multi-agent collaboration for end-to-end exception resolution'
      ]
    },
    {
      title: 'Human + AI Governance Guardrails',
      subtitle: 'Enterprise accountability, safety & auditability',
      badge: 'GOVERNANCE MATRIX',
      bullets: [
        'Human-in-the-loop approval thresholds for high-impact capital transactions',
        'Zero enterprise data retention within external model training loops',
        'Full cryptographic audit trails for every automated agent recommendation'
      ]
    },
    {
      title: `Industry Deep Dive: ${entry.gicsSector}`,
      subtitle: 'Real-world deployment benchmark and quantified value',
      badge: 'CASE STUDY',
      bullets: [
        '65% reduction in cross-departmental processing friction in 90 days',
        'Multi-million dollar working capital release through predictive orchestration',
        'Seamless core ERP upgrade path preserved with 100% clean core compliance'
      ]
    },
    {
      title: "The Architect's Checklist",
      subtitle: '3 Concrete mandates for tomorrow morning',
      badge: 'ACTION PLAN',
      bullets: [
        `1. Audit your ${entry.domain} capability map to isolate the critical bottleneck`,
        '2. Strictly decouple custom AI extensions using side-by-side cloud patterns',
        '3. Establish deterministic semantic governance before activating autonomous agents'
      ]
    },
    {
      title: 'Architecting Experiences for a Better World',
      subtitle: 'Live Q&A, Next Day Bridge & Community Roadmap',
      badge: 'COMMUNITY CTA',
      bullets: [
        'Share your biggest architectural friction in the live comments below',
        `Tomorrow: Moving seamlessly to Day #${Math.min(365, entry.id + 1)}`,
        'Subscribe to SuccessLabs Academy for daily enterprise architecture mastery'
      ]
    }
  ];

  return (
    <div
      className={`bg-[#181818] border border-[#272727] rounded-2xl overflow-hidden shadow-xl flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50 bg-[#0f0f0f] border-red-600' : ''
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="bg-[#212121] px-4 py-3 border-b border-[#2e2e2e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-600/20 text-red-500">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-white uppercase">
                GAMMA AI SLIDE DECK
              </span>
              <span className="text-[10px] font-bold text-red-400 bg-red-950/70 border border-red-800/60 px-2 py-0.5 rounded">
                Day #{entry.id} PPT
              </span>
            </div>
            <p className="text-[11px] text-[#aaaaaa]">
              Embed your Gamma.app presentation or copy prompt for one-click generation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleCopyPrompt}
            className="px-2.5 py-1.5 bg-[#272727] hover:bg-[#333333] border border-[#383838] text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 transition"
            title="Copy optimized prompt to paste into Gamma.app"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-red-400" />
                <span>Copy Gamma Prompt</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-2.5 py-1.5 border text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
              isEditing
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-[#272727] hover:bg-[#333333] border-[#383838] text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{gammaUrl ? 'Change Link' : 'Embed Gamma Link'}</span>
          </button>

          {gammaUrl && (
            <a
              href={gammaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-[#272727] hover:bg-[#333333] border border-[#383838] text-[#aaaaaa] hover:text-white rounded-lg transition"
              title="Open presentation in Gamma.app"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#272727] hover:bg-[#333333] border border-[#383838] text-[#aaaaaa] hover:text-white rounded-lg transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Slides'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* URL Edit Form Bar */}
      {isEditing && (
        <form
          onSubmit={handleSaveUrl}
          className="bg-[#121212] p-3 border-b border-[#2a2a2a] flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <input
              type="url"
              placeholder="Paste Gamma presentation URL (e.g. https://gamma.app/embed/... or https://gamma.app/docs/...)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#717171] focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="submit"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
            >
              Save & Embed
            </button>
            {gammaUrl && (
              <button
                type="button"
                onClick={handleClearUrl}
                className="px-3 py-1.5 bg-[#272727] hover:bg-[#333333] text-[#aaaaaa] hover:text-white text-xs font-semibold rounded-lg border border-[#383838] transition"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-transparent text-[#717171] hover:text-[#aaaaaa] text-xs transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Main Slide Presentation View */}
      <div className="relative flex-1 min-h-[320px] bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        {gammaUrl ? (
          <div className="w-full h-full min-h-[360px] aspect-video rounded-xl overflow-hidden border border-[#2a2a2a] bg-black">
            <iframe
              src={getEmbedUrl(gammaUrl)}
              className="w-full h-full border-0"
              title={`Gamma Slide Deck - Day #${entry.id}`}
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        ) : (
          /* Interactive Built-in Slide Preview with Slide Navigator */
          <div className="w-full max-w-2xl bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-video">
            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-[#252525] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                  {sampleDeck[activeSlideIndex].badge}
                </span>
                <span className="text-xs text-[#aaaaaa] font-medium">
                  Slide {activeSlideIndex + 1} of {sampleDeck.length}
                </span>
              </div>
              <span className="text-[10px] text-[#717171] font-bold tracking-wider uppercase">
                SuccessLabs Interactive PPT
              </span>
            </div>

            {/* Slide Body */}
            <div className="my-auto py-2">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {sampleDeck[activeSlideIndex].title}
              </h3>
              <p className="text-xs text-red-400 font-semibold mt-1">
                {sampleDeck[activeSlideIndex].subtitle}
              </p>

              <ul className="mt-3 space-y-2 text-xs text-[#cccccc]">
                {sampleDeck[activeSlideIndex].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Navigation Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#252525] text-xs">
              <button
                onClick={() =>
                  setActiveSlideIndex((prev) =>
                    prev > 0 ? prev - 1 : sampleDeck.length - 1
                  )
                }
                className="px-2.5 py-1 bg-[#222222] hover:bg-[#2e2e2e] text-white rounded font-bold transition"
              >
                ← Prev Slide
              </button>

              <div className="flex items-center gap-1">
                {sampleDeck.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeSlideIndex === idx ? 'w-5 bg-red-600' : 'bg-[#333333]'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveSlideIndex((prev) =>
                    prev < sampleDeck.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-2.5 py-1 bg-[#222222] hover:bg-[#2e2e2e] text-white rounded font-bold transition"
              >
                Next Slide →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helper Footer */}
      <div className="bg-[#1b1b1b] px-4 py-2 border-t border-[#272727] flex items-center justify-between text-[11px] text-[#aaaaaa]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>
            {gammaUrl
              ? 'Active Gamma.app slide embed connected.'
              : 'Paste your custom Gamma presentation URL above or copy the tailored prompt.'}
          </span>
        </div>
        <a
          href="https://gamma.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition"
        >
          <span>Open Gamma.app</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
