import React, { useState } from 'react';
import { SUCCESSLABS_SYSTEM_PROMPT } from '../data/vibeCodePrompt.ts';
import { X, Copy, Check, Terminal, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import Markdown from 'react-markdown';

interface VibeCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VibeCodeModal: React.FC<VibeCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SUCCESSLABS_SYSTEM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#181818] border border-[#272727] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#272727] flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>SuccessLabs Academy Master Vibe Code</span>
                <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/70 border border-red-800/60 px-2 py-0.5 rounded">
                  System Prompt
                </span>
              </h3>
              <p className="text-xs text-[#aaaaaa]">
                Google AI Studio Master System Prompt & 365-Day Live Architectural Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Prompt' : 'Copy Vibe Code'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#aaaaaa] hover:text-white rounded-lg hover:bg-[#272727] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#e0e0e0] text-sm">
          {/* Executive Summary Box */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Identity & Operating Principle</span>
            </div>
            <p className="text-xs text-[#cccccc] leading-relaxed">
              This prompt turns Google AI Studio into the <strong>SuccessLabs Academy Daily YouTube Live Architect</strong>: an Enterprise Architecture strategist, SAP transformation advisor, and live-session producer acting as the 365-day copilot for Niladri Bihari Nayak. Mission: <strong className="text-white">"Architecting experiences for a better world"</strong>.
            </p>
          </div>

          <div className="bg-[#101010] p-4 rounded-xl border border-[#272727] text-xs font-mono text-[#dddddd] overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {SUCCESSLABS_SYSTEM_PROMPT.trim()}
          </div>
        </div>
      </div>
    </div>
  );
};
