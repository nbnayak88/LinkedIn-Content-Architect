import React, { useState, useEffect, useRef } from 'react';
import { CalendarEntry } from '../types.ts';
import { getSpeakerNotesForEntry } from '../data/speakerNotesData.ts';
import { GammaSlideEmbed } from './GammaSlideEmbed.tsx';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Type,
  ChevronDown,
  Layers,
  Sparkles,
  Volume2,
  Tv,
  Clock,
  Presentation,
  Columns,
  Maximize2
} from 'lucide-react';
import Markdown from 'react-markdown';

interface PresenterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: CalendarEntry;
  scriptContent: string;
}

export const PresenterModeModal: React.FC<PresenterModeModalProps> = ({
  isOpen,
  onClose,
  entry,
  scriptContent
}) => {
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl' | '2xl'>('xl');
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // 1, 2, 3
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'script' | 'cues' | 'split'>('script');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const minuteNotes = getSpeakerNotesForEntry(entry);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-scroll logic
  useEffect(() => {
    let scrollInterval: any;
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed;
        }
      }, 40);
    }
    return () => clearInterval(scrollInterval);
  }, [isScrolling, scrollSpeed]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'md':
        return 'text-base leading-relaxed';
      case 'lg':
        return 'text-lg leading-relaxed';
      case 'xl':
        return 'text-2xl leading-relaxed font-medium';
      case '2xl':
        return 'text-3xl leading-relaxed font-semibold';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col select-none text-white">
      {/* Top Bar for Presenter - YouTube Studio Aesthetic */}
      <div className="bg-[#161616] border-b border-[#282828] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-black tracking-wider text-white uppercase">
                YOUTUBE LIVE PRESENTER VIEW • DAY #{entry.id}
              </span>
              <span className="text-[10px] text-red-400 bg-red-950/70 border border-red-800/60 px-2 py-0.2 rounded font-bold">
                ON AIR
              </span>
            </div>
            <p className="text-[11px] text-[#aaaaaa] truncate max-w-md hidden sm:block">
              {entry.title} • <span className="text-white">Architecting experiences for a better world</span>
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#0f0f0f] border border-[#282828] rounded-lg p-1 text-xs font-bold">
          <button
            onClick={() => setViewMode('script')}
            className={`px-3 py-1 rounded transition ${
              viewMode === 'script'
                ? 'bg-red-600 text-white'
                : 'text-[#aaaaaa] hover:text-white'
            }`}
          >
            Teleprompter
          </button>
          <button
            onClick={() => setViewMode('cues')}
            className={`px-3 py-1 rounded transition ${
              viewMode === 'cues'
                ? 'bg-red-600 text-white'
                : 'text-[#aaaaaa] hover:text-white'
            }`}
          >
            Minute Cues
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded transition ${
              viewMode === 'split'
                ? 'bg-red-600 text-white'
                : 'text-[#aaaaaa] hover:text-white'
            }`}
          >
            Split (Script + Gamma)
          </button>
        </div>

        {/* Stopwatch & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Stream Stopwatch */}
          <div className="flex items-center gap-2 bg-[#0f0f0f] px-3 py-1 rounded-lg border border-[#282828]">
            <span className="text-xs text-red-500 font-black">LIVE:</span>
            <span className="font-mono text-base font-black text-white">
              {formatTimer(elapsedSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 text-[#cccccc] hover:text-white rounded hover:bg-[#252525]"
              title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-red-500" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setElapsedSeconds(0);
              }}
              className="p-1 text-[#888888] hover:text-white rounded hover:bg-[#252525]"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Auto Scroll Toggle */}
          {viewMode !== 'cues' && (
            <div className="flex items-center gap-1 bg-[#0f0f0f] px-2 py-1 rounded-lg border border-[#282828]">
              <button
                onClick={() => setIsScrolling(!isScrolling)}
                className={`px-2.5 py-0.5 text-xs font-bold rounded flex items-center gap-1.5 transition ${
                  isScrolling ? 'bg-red-600 text-white' : 'bg-[#222222] text-[#cccccc] hover:text-white'
                }`}
              >
                {isScrolling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isScrolling ? 'Scrolling' : 'Auto Scroll'}</span>
              </button>

              {isScrolling && (
                <select
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className="bg-[#1a1a1a] text-xs text-white border border-[#333333] rounded px-1 py-0.5 focus:outline-none"
                >
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={3}>3x</option>
                </select>
              )}
            </div>
          )}

          {/* Font Size Chooser */}
          <div className="flex items-center gap-1 bg-[#0f0f0f] px-2 py-1 rounded-lg border border-[#282828] text-xs">
            <Type className="w-3.5 h-3.5 text-[#888888] mr-1" />
            {(['md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-1.5 py-0.5 rounded text-xs transition ${
                  fontSize === size ? 'bg-red-600 text-white font-bold' : 'text-[#888888] hover:text-white'
                }`}
              >
                {size === 'md' ? 'A' : size === 'lg' ? 'A+' : size === 'xl' ? 'A++' : 'A+++'}
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#252525] transition"
            title="Exit Presenter View"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area Based on Mode */}
      {viewMode === 'split' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left: Teleprompter Script */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto px-6 py-8 border-r border-[#222222] bg-[#0c0c0c]"
          >
            <div className={`prose prose-invert max-w-none ${getFontSizeClass()}`}>
              <Markdown>{scriptContent}</Markdown>
            </div>
          </div>

          {/* Right: Gamma AI Slides */}
          <div className="overflow-y-auto p-4 bg-[#121212] flex flex-col justify-center">
            <GammaSlideEmbed entry={entry} />
          </div>
        </div>
      ) : viewMode === 'cues' ? (
        /* Minute-by-Minute Cues Mode */
        <div className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full space-y-4">
          <div className="p-4 bg-[#141414] border border-[#282828] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-red-500 uppercase tracking-wider">
                60-MINUTE BROADCAST SCHEDULE
              </span>
              <h2 className="text-lg font-bold text-white">
                Minute-by-Minute Presenter Cues
              </h2>
            </div>
            <div className="text-xs text-[#aaaaaa]">
              Elapsed: <span className="font-mono font-bold text-red-400">{formatTimer(elapsedSeconds)}</span>
            </div>
          </div>

          <div className="space-y-4">
            {minuteNotes.map((cue, idx) => (
              <div
                key={idx}
                className="bg-[#141414] border border-[#282828] rounded-xl p-5 hover:border-red-600/50 transition"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#222222] pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-xs font-bold">
                      {cue.minuteRange}
                    </span>
                    <h3 className="text-sm font-bold text-white">{cue.stage}</h3>
                  </div>
                  <span className="text-xs text-red-400 font-medium">
                    {cue.architectureFocus}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-slate-100 bg-[#0a0a0a] p-3 rounded-lg border border-[#202020]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                      Spoken Script (Niladri):
                    </span>
                    "{cue.speakerScript}"
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#0a0a0a] p-2.5 rounded-lg border border-[#202020]">
                      <span className="text-[10px] font-bold uppercase text-[#888888] block mb-0.5">
                        Gamma Slide Cue:
                      </span>
                      <span className="text-[#cccccc]">{cue.slideVisual}</span>
                    </div>
                    <div className="bg-[#0a0a0a] p-2.5 rounded-lg border border-[#202020]">
                      <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                        Live Chat Prompt:
                      </span>
                      <span className="text-amber-300/90">{cue.keyQuestionOrCta}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Full Teleprompter Mode */
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-10 max-w-4xl mx-auto w-full text-slate-100"
        >
          <div className="mb-8 p-4 bg-[#141414] border border-[#262626] rounded-xl text-xs space-y-1 text-[#cccccc]">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SuccessLabs Live Master Rules</span>
            </div>
            <p>• Speak directly to the lens with unhurried authority. No rambling pleasantries.</p>
            <p>• Core formula: <strong>Business Problem → Business Architecture → Enterprise Architecture → SAP → AI Agents → Business Outcome</strong>.</p>
            <p>• Guiding mission: <em>"Architecting experiences for a better world."</em></p>
          </div>

          <div className={`prose prose-invert max-w-none ${getFontSizeClass()}`}>
            <Markdown>{scriptContent}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};
