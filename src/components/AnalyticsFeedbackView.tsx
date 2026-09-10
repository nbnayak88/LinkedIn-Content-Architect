import React, { useState, useEffect } from 'react';
import { CalendarEntry, AnalyticsEntry } from '../types.ts';
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  Clock,
  Eye,
  Users,
  Target,
  ExternalLink,
  Linkedin,
  ThumbsUp,
  Repeat2,
  Bookmark
} from 'lucide-react';
import Markdown from 'react-markdown';

interface AnalyticsFeedbackViewProps {
  currentEntry: CalendarEntry;
  onSelectDay: (id: number) => void;
  entries: CalendarEntry[];
}

export const AnalyticsFeedbackView: React.FC<AnalyticsFeedbackViewProps> = ({
  currentEntry,
  onSelectDay,
  entries
}) => {
  const [impressions, setImpressions] = useState<number>(14250);
  const [seeMoreRate, setSeeMoreRate] = useState<number>(28.4);
  const [commentsCount, setCommentsCount] = useState<number>(48);
  const [transformKeywordComments, setTransformKeywordComments] = useState<number>(31);
  const [webinarClicks, setWebinarClicks] = useState<number>(86);
  const [webinarRegistrations, setWebinarRegistrations] = useState<number>(24);
  const [topQuestions, setTopQuestions] = useState<string>(
    'How do we enforce Clean Core without breaking legacy integrations?\nDoes this architecture support autonomous Joule agents on BTP?'
  );
  const [notes, setNotes] = useState<string>(
    'Highest comment velocity occurred when exposing the $10M copilot mistake. 31 people commented "TRANSFORM" within 4 hours.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [savedRecords, setSavedRecords] = useState<any[]>([]);

  const WEBINAR_URL = 'https://transformation.successlabsacademy.com/';

  // Load saved records from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('successlabs_linkedin_analytics_log');
      if (stored) {
        setSavedRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/copilot/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: 'CUSTOM',
          dayId: currentEntry.id,
          userPrompt: `Perform a Direct Response Copywriting & Webinar Funnel Performance Review for Day #${currentEntry.id}: "${currentEntry.title}".
Performance Data:
- Impressions: ${impressions}
- "...see more" Click Rate: ${seeMoreRate}%
- Total Comments: ${commentsCount}
- "TRANSFORM" Keyword Trigger Comments: ${transformKeywordComments}
- Webinar Clicks (to ${WEBINAR_URL}): ${webinarClicks}
- Verified Webinar Registrations: ${webinarRegistrations} (Conversion Rate: ${((webinarRegistrations / Math.max(1, webinarClicks)) * 100).toFixed(1)}%)
- Audience Questions from Comments: ${topQuestions}
- Qualitative Notes: ${notes}

Provide:
1. Direct Response Hook Strength Assessment (Did line 1-2 stop the scroll?)
2. Comment Magnet & DM Automation Velocity Score (0-100)
3. Webinar Funnel Conversion Bottlenecks (Click-to-lead friction points)
4. Recommended Copy & Hook Adjustments for Tomorrow's Post to double webinar registrations!`
        })
      });
      const data = await res.json();
      setAnalysisResult(data.content);

      // Save record locally
      const record = {
        dayId: currentEntry.id,
        title: currentEntry.title,
        date: currentEntry.date,
        impressions,
        seeMoreRate,
        webinarClicks,
        webinarRegistrations,
        timestamp: new Date().toISOString()
      };
      const updated = [record, ...savedRecords.filter((r) => r.dayId !== currentEntry.id)];
      setSavedRecords(updated);
      localStorage.setItem('successlabs_linkedin_analytics_log', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-black tracking-wider uppercase text-sky-400">
                LINKEDIN DIRECT RESPONSE & WEBINAR CONVERSION FUNNEL
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Post Engagement & Webinar Lead Velocity Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Track algorithm signals, comment triggers ("TRANSFORM"), and webinar registrations driven to <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline font-semibold">transformation.successlabsacademy.com</a>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Select Post:</span>
            <select
              value={currentEntry.id}
              onChange={(e) => onSelectDay(Number(e.target.value))}
              className="bg-[#0b0f17] border border-[#334155] text-white text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-500"
            >
              {entries.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  Day #{entry.id} — {entry.title.slice(0, 35)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Post & Funnel Metrics • Day #{currentEntry.id}</span>
              </h3>
              <span className="text-[11px] text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40">
                {currentEntry.domain}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-sky-400" /> Total Impressions
                </label>
                <input
                  type="number"
                  value={impressions}
                  onChange={(e) => setImpressions(Number(e.target.value))}
                  className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> "...see more" Click %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={seeMoreRate}
                  onChange={(e) => setSeeMoreRate(Number(e.target.value))}
                  placeholder="e.g. 28.5"
                  className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> Total Comments
                </label>
                <input
                  type="number"
                  value={commentsCount}
                  onChange={(e) => setCommentsCount(Number(e.target.value))}
                  className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> "TRANSFORM" Leads
                </label>
                <input
                  type="number"
                  value={transformKeywordComments}
                  onChange={(e) => setTransformKeywordComments(Number(e.target.value))}
                  className="w-full bg-[#0b0f17] border border-emerald-600/50 rounded-lg px-3 py-2 text-sm text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" /> Webinar Clicks
                </label>
                <input
                  type="number"
                  value={webinarClicks}
                  onChange={(e) => setWebinarClicks(Number(e.target.value))}
                  className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Registrations
                </label>
                <input
                  type="number"
                  value={webinarRegistrations}
                  onChange={(e) => setWebinarRegistrations(Number(e.target.value))}
                  className="w-full bg-[#0b0f17] border border-emerald-600/50 rounded-lg px-3 py-2 text-sm text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Webinar Conversion Rate Pill */}
            <div className="p-2.5 rounded-lg bg-[#0b0f17] border border-emerald-800/40 flex items-center justify-between text-xs">
              <span className="text-slate-400">Webinar Registration Conversion:</span>
              <span className="font-bold font-mono text-emerald-400">
                {((webinarRegistrations / Math.max(1, webinarClicks)) * 100).toFixed(1)}%
              </span>
            </div>

            {/* Audience Questions */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> Top Audience Questions / Comment Objections
              </label>
              <textarea
                rows={3}
                value={topQuestions}
                onChange={(e) => setTopQuestions(e.target.value)}
                placeholder="Paste top questions asked in comments..."
                className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Direct Response Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Copywriting Observations & Angle Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What triggered responses? Which pain point agitated the market?"
                className="w-full bg-[#0b0f17] border border-[#334155] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-2.5 bg-gradient-to-r from-[#0a66c2] to-sky-600 hover:from-sky-600 hover:to-blue-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-900/30 transition"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Copy Diagnostic...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Copywriting & Webinar Diagnostic</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Analysis & Optimization Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 min-h-[560px] flex flex-col shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Direct Response Feedback & Next Post Optimizations
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Niladri Bihari Nayak
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 prose prose-invert prose-sm max-w-none text-slate-200">
              {analysisResult ? (
                <Markdown>{analysisResult}</Markdown>
              ) : (
                <div className="space-y-4 py-8 text-center text-slate-400">
                  <BarChart3 className="w-12 h-12 text-[#334155] mx-auto" />
                  <h4 className="text-base font-bold text-white">No Diagnostic Run Yet</h4>
                  <p className="text-xs max-w-md mx-auto text-slate-400">
                    Click <strong className="text-white">"Generate Copywriting & Webinar Diagnostic"</strong> to analyze your Hook retention score, Comment Magnet velocity, and specific tomorrow-morning direct response adjustments.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
