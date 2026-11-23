import React, { useState } from 'react';
import { ClipsOutput } from '../../types';
import { Copy, Check, Bookmark, Scissors, Smartphone, Clock, AlertCircle, Edit3, Sparkles } from 'lucide-react';

interface ClipsPreviewProps {
  data: ClipsOutput;
  onCopy: (text: string) => void;
  onSaveDraft: () => void;
  onEditInEditor: (content: string) => void;
}

export const ClipsPreview: React.FC<ClipsPreviewProps> = ({
  data,
  onCopy,
  onSaveDraft,
  onEditInEditor
}) => {
  const [copied, setCopied] = useState(false);

  const fullContent = `CLIPS PACKAGE: ${data.clipTitle}\n\nSUMMARY: ${data.overallSummary}\n\n${data.suggestedSections
    .map(
      (s) =>
        `CLIP ${s.clipIndex}: ${s.title}\n- Target Platform: ${s.targetPlatform}\n- Simulated Range: ${s.placeholderRange}\n- Hook: "${s.hook}"\n- Caption: ${s.caption}`
    )
    .join('\n\n')}`;

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
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
            Vertical Short-Form Concepts
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{data.clipTitle}</h3>
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
            <span>{copied ? 'Copied!' : 'Copy Clips'}</span>
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
          <strong className="font-semibold">Illustrative Clip Concept:</strong> Start/end ranges below are simulated sample placeholders demonstrating structural repurposing concepts. Timestamps are not extracted from a live video rendering engine.
        </div>
      </div>

      {/* Overview Banner */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center space-x-3">
        <Smartphone className="w-5 h-5 text-incubrix-600 shrink-0" />
        <div>
          <strong className="text-slate-900 font-semibold block mb-0.5">Vertical 9:16 Short-Form Format</strong>
          <span>{data.overallSummary}</span>
        </div>
      </div>

      {/* Clip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.suggestedSections.map((clip) => (
          <div
            key={clip.clipIndex}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between hover:border-purple-300 transition-colors"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Clip {clip.clipIndex} • {clip.targetPlatform}
                </span>
                <span className="flex items-center space-x-1 text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{clip.placeholderRange}</span>
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-900 mb-3">{clip.title}</h4>

              {/* Hook */}
              <div className="bg-purple-50/60 p-3 rounded-lg border border-purple-100 mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>On-Screen Hook</span>
                </div>
                <div className="text-xs font-semibold text-purple-950 italic">
                  "{clip.hook}"
                </div>
              </div>

              {/* Caption */}
              <div className="text-xs text-slate-600 leading-relaxed mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Suggested Caption
                </div>
                {clip.caption}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Scissors className="w-3.5 h-3.5 text-incubrix-600" />
                <span>Simulated concept</span>
              </span>
              <button
                onClick={() => onCopy(`${clip.hook}\n\n${clip.caption}`)}
                className="text-incubrix-600 hover:text-incubrix-800 font-semibold text-xs"
              >
                Copy Clip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
