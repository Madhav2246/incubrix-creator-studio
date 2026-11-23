import React, { useState, useEffect } from 'react';
import { EditorOutput } from '../../types';
import { Copy, Check, Bookmark, FileText, CheckCircle2 } from 'lucide-react';

interface EditorPreviewProps {
  data: EditorOutput;
  onCopy: (text: string) => void;
  onSaveDraft: (updatedContent?: string) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  data,
  onCopy,
  onSaveDraft
}) => {
  const [content, setContent] = useState(data.content);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(data.content);
  }, [data.content]);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  const handleCopy = () => {
    onCopy(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
            Direct Editor Workspace
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Refine & Organize Content</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Content' : 'Copy Content'}</span>
          </button>
          <button
            onClick={() => onSaveDraft(content)}
            className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-incubrix-600 hover:bg-incubrix-700 rounded-lg shadow-sm transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Editor Stats Bar */}
      <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Words: <strong className="text-slate-800">{wordCount}</strong></span>
          </span>
          <span>Characters: <strong className="text-slate-800">{charCount}</strong></span>
        </div>
        <div className="flex items-center space-x-1 text-emerald-600 font-sans text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Local auto-sync ready</span>
        </div>
      </div>

      {/* Textarea */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xs focus-within:ring-2 focus-within:ring-incubrix-500 focus-within:border-transparent transition-all">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder="Start typing, outlining, or editing your content..."
          className="w-full p-4 font-mono text-xs sm:text-sm text-slate-800 bg-transparent resize-y focus:outline-none leading-relaxed"
        />
      </div>
    </div>
  );
};
