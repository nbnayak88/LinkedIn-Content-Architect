import React, { useState, useEffect } from 'react';
import { CalendarEntry } from '../types.ts';
import { ThumbnailPreview } from './ThumbnailPreview.tsx';
import { GammaSlideEmbed } from './GammaSlideEmbed.tsx';
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Download,
  RefreshCw,
  Send,
  Layers,
  Presentation,
  CheckCircle2,
  ExternalLink,
  Linkedin,
  Flame,
  MessageSquare,
  ThumbsUp,
  Share2,
  Repeat2,
  Bookmark,
  Target,
  ArrowRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import Markdown from 'react-markdown';

interface CopilotWorkspaceProps {
  currentEntry: CalendarEntry;
  onSelectDay: (id: number) => void;
  onOpenTeleprompter: (script: string) => void;
}

type OutputTab =
  | 'linkedin'
  | 'carousel'
  | 'hooks'
  | 'story'
  | 'magnet'
  | 'poll'
  | 'cta'
  | 'repurpose'
  | 'gamma';

export const CopilotWorkspace: React.FC<CopilotWorkspaceProps> = ({
  currentEntry,
  onSelectDay
}) => {
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>('linkedin');
  const [contentCache, setContentCache] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userCustomPrompt, setUserCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [showFullFeedPreview, setShowFullFeedPreview] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [simulatedComments, setSimulatedComments] = useState<
    Array<{ author: string; text: string; time: string; botReply?: string }>
  >([
    {
      author: 'Marcus Vance (Enterprise Architect @ CloudScale)',
      text: 'TRANSFORM - definitely need the SAP Clean Core + BTP agent orchestration map.',
      time: '2h ago',
      botReply:
        'Sent you a DM, Marcus! Enjoy the full architecture PDF and see you at the live masterclass: https://transformation.successlabsacademy.com/'
    }
  ]);

  const WEBINAR_URL = 'https://transformation.successlabsacademy.com/';

  // Fetch or generate content for current entry and tab
  const fetchContent = async (command: string, tabKey: OutputTab) => {
    if (tabKey === 'gamma') return; // Handled by dedicated component

    setIsLoading(true);
    try {
      const res = await fetch('/api/copilot/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command,
          dayId: currentEntry.id
        })
      });
      const data = await res.json();
      setContentCache((prev) => ({
        ...prev,
        [`${currentEntry.id}_${tabKey}`]: data.content
      }));
    } catch (err) {
      console.error('Error fetching copilot content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch current command when entry or tab changes
  useEffect(() => {
    if (activeOutputTab === 'gamma') return;

    const cacheKey = `${currentEntry.id}_${activeOutputTab}`;
    if (!contentCache[cacheKey]) {
      const commandMap: Record<string, string> = {
        linkedin: 'LINKEDIN_POST',
        carousel: 'CAROUSEL',
        hooks: 'HOOKS',
        story: 'STORY',
        magnet: 'COMMENT_MAGNET',
        poll: 'POLL',
        cta: 'CTA_OPTIMIZER',
        repurpose: 'REPURPOSE'
      };
      const cmd = commandMap[activeOutputTab];
      if (cmd) {
        fetchContent(cmd, activeOutputTab);
      }
    }
  }, [currentEntry.id, activeOutputTab]);

  const currentContent = contentCache[`${currentEntry.id}_${activeOutputTab}`] || '';

  const handleCopy = () => {
    if (!currentContent) return;
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!currentContent) return;
    const blob = new Blob([currentContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LinkedIn_Day_${currentEntry.id}_${currentEntry.domain.replace(/[^a-zA-Z]/g, '')}_${activeOutputTab}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSimulateCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      author: 'You (LinkedIn Member)',
      text: commentInput.trim(),
      time: 'Just now',
      botReply: `Thanks! Here is your VIP Pass to the Live Enterprise Transformation Masterclass: ${WEBINAR_URL} — Check your DMs for the full architecture blueprint!`
    };

    setSimulatedComments((prev) => [newComment, ...prev]);
    setCommentInput('');
  };

  const handleCustomPromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCustomPrompt.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/copilot/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: 'CUSTOM',
          dayId: currentEntry.id,
          userPrompt: `Modify this LinkedIn Direct Response post for Day #${currentEntry.id}: "${currentEntry.title}". Ensure it always drives responses and invites readers to join the webinar: ${WEBINAR_URL}. User request: ${userCustomPrompt}`
        })
      });
      const data = await res.json();
      setContentCache((prev) => ({
        ...prev,
        [`${currentEntry.id}_${activeOutputTab}`]: data.content
      }));
      setUserCustomPrompt('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 6 Direct Response Copywriting Quality Gate Checks
  const qualityGate = [
    {
      title: 'Scroll-Stopping Pattern Interrupt',
      desc: 'Line 1 directly challenges conventional wisdom or exposes an expensive trap.'
    },
    {
      title: 'Algorithmic "...see more" Trigger',
      desc: 'Line 2 leaves an open loop, forcing the reader to expand and signaling high dwell time.'
    },
    {
      title: 'EA + AI + SAP Clean Core Blueprint',
      desc: 'Connects business capability mapping to SAP context and governed AI agents.'
    },
    {
      title: 'Frictionless Comment Trigger',
      desc: 'Asks readers to comment a single keyword ("TRANSFORM") for algorithm acceleration.'
    },
    {
      title: 'Fast-Track Webinar URL',
      desc: 'Includes direct registration link: https://transformation.successlabsacademy.com/'
    },
    {
      title: 'Curiosity-Driven Direct Response P.S.',
      desc: 'Closes with an urgent takeaway, risk reversal, or live whiteboarding demo teaser.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Target Day Header Card */}
      <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-black text-white bg-[#0a66c2] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                DAY #{currentEntry.id} OF 365
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-[#1e293b] px-2.5 py-1 rounded-md border border-[#334155]">
                {currentEntry.date} ({currentEntry.dayOfWeek})
              </span>
              <span className="text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2.5 py-1 rounded-md">
                {currentEntry.domain}
              </span>
              <span className="text-xs text-slate-400 bg-[#0b0f17] px-2.5 py-1 rounded-md border border-[#1e293b]">
                Sector: {currentEntry.gicsSector}
              </span>
              <span className="text-xs text-amber-300 bg-amber-950/50 border border-amber-800/50 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                {currentEntry.intent.toUpperCase()}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {currentEntry.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 mt-2">
              <p>
                <strong className="text-white font-medium">Strategic Hook:</strong> {currentEntry.angle}
              </p>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                <Target className="w-3.5 h-3.5" />
                <span>Webinar Funnel Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <a
              href={WEBINAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition whitespace-nowrap"
            >
              <span>Join Live Webinar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Master Copywriting Commands Toolbar */}
        <div className="mt-5 pt-4 border-t border-[#1e293b] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap">
            Direct Response Formats:
          </span>

          {[
            { id: 'linkedin', label: 'Direct Response Post', icon: Linkedin, primary: true },
            { id: 'carousel', label: '8-Slide PDF Carousel', icon: Layers },
            { id: 'hooks', label: '5 Viral Hooks', icon: Flame },
            { id: 'story', label: 'Case Study Narrative', icon: BookOpen },
            { id: 'magnet', label: '150-Word Comment Magnet', icon: MessageSquare },
            { id: 'poll', label: 'Poll & Debate', icon: UserCheck },
            { id: 'cta', label: 'CTA & P.S. Optimizer', icon: Target },
            { id: 'repurpose', label: '5-in-1 Repurpose', icon: Share2 },
            { id: 'gamma', label: 'Gamma AI Slides', icon: Presentation }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeOutputTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveOutputTab(item.id as OutputTab);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/40'
                    : item.primary
                    ? 'bg-[#1e293b] text-sky-400 hover:bg-[#273549] hover:text-white border border-sky-600/40'
                    : 'bg-[#0b0f17] text-slate-400 hover:bg-[#1e293b] hover:text-white border border-[#1e293b]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional Rendering: Gamma Slide Mode vs Direct Response Copywriting Studio */}
      {activeOutputTab === 'gamma' ? (
        <div className="space-y-6">
          <GammaSlideEmbed entry={currentEntry} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Feed Mockup & Conversion Funnel Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Real LinkedIn Feed Post Simulator */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#0a66c2] flex items-center justify-center text-white text-xs font-bold">
                    in
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Live LinkedIn Feed Preview
                  </h3>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                  Direct Response Optimized
                </span>
              </div>

              {/* LinkedIn Post Card Preview */}
              <div className="bg-[#0b0f17] border border-[#1e293b] rounded-xl p-4 space-y-3 font-sans text-xs">
                {/* Author Header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    NN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-xs">Niladri Bihari Nayak</span>
                      <span className="text-slate-500 text-[10px]">• 1st</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">
                      Founder @ SuccessLabs Academy | Enterprise Architecture • AI Agents • SAP Clean Core
                    </p>
                    <p className="text-[9px] text-slate-500 flex items-center gap-1">
                      <span>1d</span>
                      <span>•</span>
                      <span>🌐</span>
                    </p>
                  </div>
                </div>

                {/* Post Body Snippet with "...see more" expand toggle */}
                <div className="text-slate-200 text-xs leading-relaxed space-y-2">
                  <p className="font-semibold text-white">
                    Most enterprises deploying AI in {currentEntry.domain.toLowerCase()} right now are making a critical $10M mistake.
                  </p>
                  {!showFullFeedPreview ? (
                    <div>
                      <p className="text-slate-300 line-clamp-2">
                        They buy generative AI copilots, plug them into 15-year-old custom ERP code, and expect autonomous transformation. But without Enterprise Architecture and Clean Core discipline, here is the failure loop they trigger...
                      </p>
                      <button
                        onClick={() => setShowFullFeedPreview(true)}
                        className="text-sky-400 hover:text-sky-300 font-semibold text-[11px] mt-1"
                      >
                        ...see more
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1 border-t border-[#1e293b]">
                      <p className="text-slate-300">
                        1. Clean Core is the prerequisite for trusted AI agents.<br />
                        2. Capability mapping must precede model selection.<br />
                        3. Human-in-the-loop governance is non-negotiable.
                      </p>
                      <div className="p-2.5 bg-[#141e30] border border-sky-800/40 rounded-lg text-sky-200">
                        <p className="font-bold">🚀 Join the Live Masterclass:</p>
                        <p className="text-[11px] text-slate-300">
                          👉 Drop a comment with <strong>"TRANSFORM"</strong> below and I'll DM you the high-resolution architecture blueprint + VIP pass.
                        </p>
                        <a
                          href={WEBINAR_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 font-bold underline inline-flex items-center gap-1 mt-1 text-[11px]"
                        >
                          <span>transformation.successlabsacademy.com</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <button
                        onClick={() => setShowFullFeedPreview(false)}
                        className="text-slate-400 hover:text-white text-[10px] mt-1 underline"
                      >
                        Collapse preview
                      </button>
                    </div>
                  )}
                </div>

                {/* Simulated Social Reaction Bar */}
                <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1 hover:text-sky-400 cursor-pointer transition">
                    <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                    <span>84</span>
                  </span>
                  <span className="hover:text-white cursor-pointer transition">
                    42 comments • 18 reposts
                  </span>
                </div>
                <div className="pt-1.5 border-t border-[#1e293b] flex items-center justify-around text-slate-400 text-[11px]">
                  <button className="flex items-center gap-1 hover:text-sky-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400">
                    <Repeat2 className="w-3.5 h-3.5" />
                    <span>Repost</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>

              {/* Interactive Comment Trigger Simulator */}
              <div className="p-3 bg-[#0b0f17] border border-sky-900/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                    <span>Test Comment Magnet Trigger</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    DM Funnel Bot
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Simulate an audience member typing a comment (e.g. <strong>TRANSFORM</strong> or <strong>BLUEPRINT</strong>) to test the automated invitation response.
                </p>

                <form onSubmit={handleSimulateCommentSubmit} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Type 'TRANSFORM' or 'BLUEPRINT'..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 bg-[#111827] border border-[#334155] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#0a66c2] hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition"
                  >
                    Post
                  </button>
                </form>

                {/* Simulated Comment Stream */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 pt-1">
                  {simulatedComments.map((c, i) => (
                    <div key={i} className="p-2 rounded bg-[#111827] border border-[#1e293b] text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-semibold text-white">{c.author}</span>
                        <span className="text-[9px]">{c.time}</span>
                      </div>
                      <p className="text-sky-300 font-medium">{c.text}</p>
                      {c.botReply && (
                        <div className="mt-1 pl-2 border-l-2 border-emerald-500 text-[10px] text-emerald-300 bg-emerald-950/30 p-1.5 rounded-r">
                          <strong className="text-white">Niladri Bihari Nayak: </strong>
                          {c.botReply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Response Quality Gate Checklist */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct Response Copywriting Gate</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  6 Checkpoints
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Every LinkedIn post generated for SuccessLabs Academy passes these conversion tests:
              </p>

              <div className="space-y-2 text-xs">
                {qualityGate.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#0b0f17] border border-[#1e293b]">
                    <div className="font-bold text-sky-400 text-[11px] flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sky-950 text-sky-300 border border-sky-700/60 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {item.title}
                    </div>
                    <div className="text-slate-300 text-xs mt-1 ml-5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Thumbnail Companion */}
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Post Visual / Carousel Cover Direction</span>
                </h3>
              </div>
              <ThumbnailPreview entry={currentEntry} />
            </div>
          </div>

          {/* Right Column: AI Production Output & Copywriting Workspace (7 cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col">
            <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 flex-1 flex flex-col shadow-xl min-h-[620px]">
              {/* Action Bar */}
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {activeOutputTab.toUpperCase().replace('_', ' ')}
                  </h3>
                  {isLoading && (
                    <span className="text-[11px] text-sky-400 flex items-center gap-1 font-semibold">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Drafting High-Converting Copy...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-[#0a66c2] hover:bg-sky-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                    title="Copy Post to Clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Post'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="px-2.5 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    title="Download Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export .md</span>
                  </button>

                  <button
                    onClick={() => {
                      const commandMap: Record<string, string> = {
                        linkedin: 'LINKEDIN_POST',
                        carousel: 'CAROUSEL',
                        hooks: 'HOOKS',
                        story: 'STORY',
                        magnet: 'COMMENT_MAGNET',
                        poll: 'POLL',
                        cta: 'CTA_OPTIMIZER',
                        repurpose: 'REPURPOSE'
                      };
                      const cmd = commandMap[activeOutputTab];
                      if (cmd) {
                        fetchContent(cmd, activeOutputTab);
                      }
                    }}
                    disabled={isLoading}
                    className="p-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-400 hover:text-white rounded-lg text-xs font-bold transition disabled:opacity-40"
                    title="Regenerate with fresh angles"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Webinar Conversion Callout Pill */}
              <div className="mb-4 p-3 bg-gradient-to-r from-sky-950/80 via-[#0b1b36] to-emerald-950/70 border border-sky-700/40 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-sky-200">Conversion Objective:</span>
                  <span className="text-slate-300">Invite senior leaders to join the live masterclass:</span>
                </div>
                <a
                  href={WEBINAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sky-300 hover:text-white underline underline-offset-2 flex items-center gap-1 whitespace-nowrap"
                >
                  <span>transformation.successlabsacademy.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Rendered Markdown Output */}
              <div className="flex-1 overflow-y-auto pr-1 text-slate-200 prose prose-invert prose-sm max-w-none">
                {currentContent ? (
                  <Markdown>{currentContent}</Markdown>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <RefreshCw className="w-8 h-8 animate-spin text-sky-500 mb-3" />
                    <p className="text-xs">
                      Curating Direct Response LinkedIn Post for Day #{currentEntry.id}...
                    </p>
                  </div>
                )}
              </div>

              {/* Interactive Copy Assistant Input */}
              <form onSubmit={handleCustomPromptSubmit} className="mt-4 pt-3 border-t border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask the Copywriter (e.g. 'Make the hook more provocative for CIOs', 'Add urgency to the P.S.')..."
                    value={userCustomPrompt}
                    onChange={(e) => setUserCustomPrompt(e.target.value)}
                    className="flex-1 bg-[#0b0f17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !userCustomPrompt.trim()}
                    className="px-4 py-2.5 bg-[#0a66c2] hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Refine</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

