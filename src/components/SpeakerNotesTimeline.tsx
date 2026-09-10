import React, { useState } from 'react';
import { CalendarEntry, MinuteSpeakerNote } from '../types.ts';
import { getSpeakerNotesForEntry } from '../data/speakerNotesData.ts';
import {
  Clock,
  Mic,
  Presentation,
  MessageSquare,
  Layers,
  Copy,
  Check,
  Download,
  Flame,
  Sparkles,
  Tv
} from 'lucide-react';

interface SpeakerNotesTimelineProps {
  entry: CalendarEntry;
  onOpenTeleprompter?: (script: string) => void;
}

export const SpeakerNotesTimeline: React.FC<SpeakerNotesTimelineProps> = ({
  entry,
  onOpenTeleprompter
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [selectedMinuteIdx, setSelectedMinuteIdx] = useState<number>(0);

  const notes: MinuteSpeakerNote[] = getSpeakerNotesForEntry(entry);

  const formatAllNotesMarkdown = () => {
    let md = `# SUCCESSLABS ACADEMY — MINUTE-BY-MINUTE SPEAKER NOTES\n`;
    md += `## Day #${entry.id}: ${entry.title}\n`;
    md += `**Date:** ${entry.date} (${entry.dayOfWeek}) | **Domain:** ${entry.domain} | **Sector:** ${entry.gicsSector}\n`;
    md += `**Motto:** "Architecting experiences for a better world"\n\n---\n\n`;

    notes.forEach((n, idx) => {
      md += `### [${n.minuteRange}] ${n.stage}\n`;
      md += `**Architecture Focus:** ${n.architectureFocus}\n\n`;
      md += `**Niladri (Spoken Script):**\n> "${n.speakerScript}"\n\n`;
      md += `**Visual / Slide Cue:** ${n.slideVisual}\n\n`;
      md += `**Chat Interaction / Challenge:** ${n.keyQuestionOrCta}\n\n`;
      md += `---\n\n`;
    });

    return md;
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(formatAllNotesMarkdown());
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formatAllNotesMarkdown()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Day_${entry.id}_Minute_Speaker_Notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Actions */}
      <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase text-red-500">
              MINUTE-BY-MINUTE LIVE BROADCAST NOTES
            </span>
            <span className="text-[10px] font-semibold text-[#aaaaaa] bg-[#272727] px-2 py-0.5 rounded">
              60-Minute Master Flow
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            Day #{entry.id}: Complete Presenter Cue Schedule
          </h2>
          <p className="text-xs text-[#aaaaaa] mt-0.5">
            Mission: <span className="text-white font-medium">Architecting experiences for a better world</span> • Niladri Bihari Nayak
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleCopyAll}
            className="px-3 py-2 bg-[#272727] hover:bg-[#333333] border border-[#383838] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-red-500" />
                <span>Copy All Notes</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-2 bg-[#272727] hover:bg-[#333333] border border-[#383838] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-[#aaaaaa]" />
            <span>Export .md</span>
          </button>

          {onOpenTeleprompter && (
            <button
              onClick={() => onOpenTeleprompter(formatAllNotesMarkdown())}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/20 transition whitespace-nowrap"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Broadcast Teleprompter</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Time Selector Badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {notes.map((note, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMinuteIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedMinuteIdx === idx
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-[#181818] text-[#aaaaaa] hover:bg-[#252525] hover:text-white border border-[#272727]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>{note.minuteRange}</span>
          </button>
        ))}
      </div>

      {/* Featured Minute Spotlight Card */}
      <div className="bg-[#181818] border-2 border-red-600/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#272727] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded bg-red-600 text-white text-xs font-black tracking-wider uppercase">
              {notes[selectedMinuteIdx].minuteRange}
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              {notes[selectedMinuteIdx].stage}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-red-400 bg-red-950/60 border border-red-800/50 px-2.5 py-0.5 rounded">
            {notes[selectedMinuteIdx].architectureFocus}
          </span>
        </div>

        <div className="space-y-4">
          {/* Spoken Script */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4">
            <div className="text-[11px] uppercase font-bold text-red-400 tracking-wider flex items-center gap-1.5 mb-2">
              <Mic className="w-3.5 h-3.5" />
              <span>What to Say on Air (Niladri Bihari Nayak)</span>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed font-normal italic">
              "{notes[selectedMinuteIdx].speakerScript}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual / Slide Cue */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-3.5">
              <div className="text-[11px] uppercase font-bold text-[#aaaaaa] tracking-wider flex items-center gap-1.5 mb-1.5">
                <Presentation className="w-3.5 h-3.5 text-red-500" />
                <span>Visual / Gamma Slide Display</span>
              </div>
              <p className="text-xs text-[#dddddd] leading-relaxed">
                {notes[selectedMinuteIdx].slideVisual}
              </p>
            </div>

            {/* Chat Interaction */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-3.5">
              <div className="text-[11px] uppercase font-bold text-[#aaaaaa] tracking-wider flex items-center gap-1.5 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Chat Prompt / Architecture Challenge</span>
              </div>
              <p className="text-xs text-amber-300/90 leading-relaxed font-medium">
                {notes[selectedMinuteIdx].keyQuestionOrCta}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Minute-by-Minute Timeline List */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#aaaaaa] px-1">
          Full 60-Minute Sequence ({notes.length} Stages)
        </h4>

        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={index}
              onClick={() => setSelectedMinuteIdx(index)}
              className={`p-4 rounded-xl border transition cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                selectedMinuteIdx === index
                  ? 'bg-[#202020] border-red-500/80 shadow-md shadow-red-600/10'
                  : 'bg-[#181818] hover:bg-[#1f1f1f] border-[#272727]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-white px-2 py-0.5 rounded bg-[#272727] border border-[#333333] whitespace-nowrap">
                    {note.minuteRange}
                  </span>
                  <span className="text-[10px] text-[#717171] mt-1 font-bold">
                    Stage {index + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {note.stage}
                  </h4>
                  <p className="text-xs text-[#aaaaaa] line-clamp-2 mt-1">
                    "{note.speakerScript}"
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                    <span className="text-red-400 font-medium">
                      🎯 {note.architectureFocus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right md:min-w-[160px] flex-shrink-0">
                <span className="text-[10px] text-[#888888] font-semibold block">
                  Slide Cue:
                </span>
                <span className="text-[11px] text-[#cccccc] font-medium block">
                  {note.slideVisual.split(':')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
