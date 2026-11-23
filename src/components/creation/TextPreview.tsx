import React, { useState } from 'react';
import { TextOutput } from '../../types';
import { Copy, Check, Bookmark, Edit3, MessageSquare, Tag, ArrowRight } from 'lucide-react';

interface TextPreviewProps {
  data: TextOutput;
  onCopy: (text: string) => void;
  onSaveDraft: () => void;
  onEditInEditor: (content: string) => void;
}

export const TextPreview: React.FC<TextPreviewProps> = ({
  data,
  onCopy,
  onSaveDraft,
  onEditInEditor
}) => {
  const [copied, setCopied] = useState(false);

  const fullContent = `${data.headline}\n\n${data.hook}\n\n${data.mainCaption}\n\n${data.hashtags.join(' ')}\n\n${data.callToAction}`;

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
          <span className="text-xs font-bold uppercase tracking-wider text-incubrix-600 bg-incubrix-50 px-2.5 py-1 rounded-md">
            Written Content Preview
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Platform-Ready Copy</h3>
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
            <span>{copied ? 'Copied!' : 'Copy All'}</span>
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

      {/* Headline */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Headline
        </div>
        <div className="text-base font-bold text-slate-900">{data.headline}</div>
      </div>

      {/* Hook */}
      <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200/60">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Opening Hook</span>
        </div>
        <div className="text-sm font-semibold text-purple-950 italic">
          "{data.hook}"
        </div>
      </div>

      {/* Main Caption */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Main Caption
        </div>
        <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
          {data.mainCaption}
        </div>
      </div>

      {/* Hashtags & CTA Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hashtags */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Recommended Hashtags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-incubrix-700 bg-white border border-purple-200 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            <ArrowRight className="w-3.5 h-3.5 text-incubrix-600" />
            <span>Call to Action</span>
          </div>
          <div className="text-xs font-semibold text-slate-800 leading-normal">
            {data.callToAction}
          </div>
        </div>
      </div>
    </div>
  );
};
