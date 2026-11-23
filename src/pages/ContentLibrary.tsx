import React, { useState } from 'react';
import { Draft, ContentType } from '../types';
import {
  Search,
  Filter,
  FileText,
  Mic,
  Video,
  Scissors,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  Bookmark,
  Clock,
  Plus
} from 'lucide-react';
import { PageId } from '../components/common/Sidebar';
import { Modal } from '../components/common/Modal';

interface ContentLibraryProps {
  drafts: Draft[];
  onOpenDraft: (draft: Draft) => void;
  onDeleteDraft: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ContentLibrary: React.FC<ContentLibraryProps> = ({
  drafts,
  onOpenDraft,
  onDeleteDraft,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewingDraft, setViewingDraft] = useState<Draft | null>(null);

  const filteredDrafts = drafts.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.platform.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' || d.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getFormatIcon = (type: ContentType) => {
    switch (type) {
      case 'text':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'audio':
        return <Mic className="w-4 h-4 text-purple-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'clips':
        return <Scissors className="w-4 h-4 text-amber-600" />;
      case 'editor':
        return <Edit className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
            Content Library & Drafts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, inspect, edit, or manage saved content concepts and script outlines.
          </p>
        </div>
        <button
          onClick={() => onNavigate('create')}
          className="flex items-center space-x-2 bg-incubrix-600 hover:bg-incubrix-700 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Content</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved content by title, topic, or platform..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 focus:bg-white text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 text-xs">
          {['all', 'text', 'audio', 'video', 'clips', 'editor'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-colors ${
                selectedFilter === f
                  ? 'bg-incubrix-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Drafts List / Table */}
      {filteredDrafts.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-5">Title & Format</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Tone</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredDrafts.map((draft) => (
                  <tr
                    key={draft.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Title */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          {getFormatIcon(draft.type)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-incubrix-700 transition-colors">
                            {draft.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono capitalize">
                            Format: {draft.type}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {draft.platform}
                      </span>
                    </td>

                    {/* Tone */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {draft.tone}
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(draft.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          draft.status === 'Ready'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {draft.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setViewingDraft(draft)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => onOpenDraft(draft)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-incubrix-600 hover:text-incubrix-800 hover:bg-purple-50 rounded-md transition-colors"
                        >
                          Edit in Studio
                        </button>
                        <button
                          onClick={() => onDeleteDraft(draft.id)}
                          title="Delete draft"
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No drafts found</h3>
          <p className="text-xs text-slate-500 mb-6">
            {searchTerm
              ? `No saved drafts matched "${searchTerm}".`
              : 'You have not saved any drafts in this category yet.'}
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center space-x-2 bg-incubrix-600 hover:bg-incubrix-700 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Content</span>
          </button>
        </div>
      )}

      {/* View Draft Modal */}
      {viewingDraft && (
        <Modal
          isOpen={!!viewingDraft}
          onClose={() => setViewingDraft(null)}
          title={viewingDraft.title}
          subtitle={`Platform: ${viewingDraft.platform} • Format: ${viewingDraft.type} • Status: ${viewingDraft.status}`}
        >
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Source Notes / Transcript:
              </div>
              <div className="text-slate-700 leading-relaxed font-sans">
                {viewingDraft.sourceText || 'No custom source text entered.'}
              </div>
            </div>

            {viewingDraft.output ? (
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200/60 text-xs">
                <div className="font-bold text-purple-700 uppercase tracking-wider text-[10px] mb-2">
                  Saved Blueprint Output ({viewingDraft.output.type}):
                </div>
                <pre className="text-slate-800 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                  {JSON.stringify(viewingDraft.output.data, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No generated output attached.</p>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => setViewingDraft(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const d = viewingDraft;
                  setViewingDraft(null);
                  onOpenDraft(d);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-incubrix-600 hover:bg-incubrix-700 rounded-xl shadow-xs"
              >
                Open in Creation Studio
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
