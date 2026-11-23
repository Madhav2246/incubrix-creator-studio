import React, { useState } from 'react';
import { AudioOutput } from '../../types';
import { Copy, Check, Bookmark, Mic, Clock, ListChecks, AlertCircle, Edit3 } from 'lucide-react';

interface AudioPreviewProps {
  data: AudioOutput;
  onCopy: (text: string) => void;
  onSaveDraft: () => void;
  onEditInEditor: (content: string) => void;
}

export const AudioPreview: React.FC<AudioPreviewProps> = ({
  data,
  onCopy,
  onSaveDraft,
  onEditInEditor
}) => {
  const [copied, setCopied] = useState(false);

  const fullContent = `EPISODE: ${data.episodeTitle}\nESTIMATED RUNTIME: ${data.estimatedDuration}\n\n[INTRO SCRIPT]\n${data.introScript}\n\n[TALKING POINTS]\n${data.talkingPoints.map((tp, i) => `${i + 1}. ${tp}`).join('\n')}\n\n[OUTRO SCRIPT]\n${data.outroScript}`;

  const handleCopy = () => {
    onCopy(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Audio & Podcast Script
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{data.episodeTitle}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEditInEditor(fullContent)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Open in Editor</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Script'}</span>
          </button>
          <button
            onClick={onSaveDraft}
            className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-incubrix-600 hover:bg-incubrix-700 rounded-lg shadow-sm transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Honesty Requirement Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs flex items-start space-x-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-amber-800 leading-relaxed">
          <strong className="font-semibold">Illustrative Audio Script:</strong> This script outline is formatted for host narration. The prototype does not generate or synthesize playable audio files.
        </div>
      </div>

      {/* Meta Specs */}
      <div className="flex items-center space-x-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Estimated Target Runtime: <strong className="text-slate-800">{data.estimatedDuration}</strong></span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Mic className="w-4 h-4 text-slate-400" />
          <span>Format: <strong className="text-slate-800">Solo / Co-host Discussion</strong></span>
        </div>
      </div>

      {/* Intro Script */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Intro Script & Hook
        </div>
        <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed border border-slate-200/60">
          {data.introScript}
        </div>
      </div>

      {/* Talking Points */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          <ListChecks className="w-4 h-4 text-indigo-600" />
          <span>Core Episode Talking Points</span>
        </div>
        <ul className="space-y-2.5">
          {data.talkingPoints.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-3 text-sm text-slate-800 p-3 rounded-lg bg-indigo-50/40 border border-indigo-100"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="font-medium leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outro Script */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Outro & Call to Action
        </div>
        <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed border border-slate-200/60">
          {data.outroScript}
        </div>
      </div>
    </div>
  );
};
