import React, { useState } from 'react';
import { VideoOutput } from '../../types';
import { Copy, Check, Bookmark, Video, Film, Eye, Sparkles, AlertCircle, Edit3, Clock } from 'lucide-react';

interface VideoPreviewProps {
  data: VideoOutput;
  onCopy: (text: string) => void;
  onSaveDraft: () => void;
  onEditInEditor: (content: string) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  data,
  onCopy,
  onSaveDraft,
  onEditInEditor
}) => {
  const [copied, setCopied] = useState(false);

  const fullContent = `VIDEO TITLE: ${data.videoTitle}\n\n[OPENING HOOK]\n${data.openingHook}\n\n[STORYBOARD & SCENES]\n${data.storyboard
    .map(
      (s) =>
        `Scene ${s.sceneNumber}: ${s.title} (${s.estimatedDuration})\n- Visual: ${s.visualDescription}\n- Narration: ${s.narration}\n- B-Roll: ${s.suggestedBroll}`
    )
    .join('\n\n')}\n\n[B-ROLL SUMMARY]\n${data.suggestedBroll.map((b) => `- ${b}`).join('\n')}\n\n[CLOSING CTA]\n${data.closingCta}`;

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
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
            Video Script & Storyboard
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{data.videoTitle}</h3>
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
            <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
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
          <strong className="font-semibold">Illustrative Storyboard:</strong> This outline represents scene planning, shot composition, and script cues. This prototype does not render or export real video files.
        </div>
      </div>

      {/* Opening Hook Card */}
      <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-5 rounded-xl border border-rose-200">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Opening Hook (First 5–15 Seconds)</span>
        </div>
        <div className="text-sm font-semibold text-rose-950 leading-relaxed italic">
          "{data.openingHook}"
        </div>
      </div>

      {/* Scene-by-Scene Storyboard */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          <Film className="w-4 h-4 text-incubrix-600" />
          <span>Scene-by-Scene Storyboard ({data.storyboard.length} Scenes)</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.storyboard.map((scene) => (
            <div
              key={scene.sceneNumber}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {scene.sceneNumber}
                  </span>
                  <span className="font-bold text-sm text-slate-800">{scene.title}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-500 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{scene.estimatedDuration}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Visual */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                  <div className="flex items-center space-x-1 font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Visual Composition</span>
                  </div>
                  <div className="text-slate-800 leading-relaxed">{scene.visualDescription}</div>
                </div>

                {/* Narration */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                    Narration / Script Cue
                  </div>
                  <div className="text-slate-800 leading-relaxed font-sans">{scene.narration}</div>
                </div>

                {/* Suggested B-Roll */}
                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-100">
                  <div className="font-bold text-rose-700 uppercase tracking-wider text-[10px] mb-1">
                    Suggested B-Roll
                  </div>
                  <div className="text-rose-900 leading-relaxed">{scene.suggestedBroll}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested B-Roll Summary */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Asset Checklist: B-Roll & Graphics Needed
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {data.suggestedBroll.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70"
            >
              <Video className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing CTA */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Closing Call to Action
        </div>
        <div className="text-xs font-semibold text-slate-800 leading-relaxed">
          {data.closingCta}
        </div>
      </div>
    </div>
  );
};
