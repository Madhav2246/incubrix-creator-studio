import React from 'react';
import {
  FileText,
  Mic,
  Video,
  Scissors,
  Edit,
  ArrowRight,
  Sparkles,
  Bookmark,
  Calendar,
  Layers,
  Clock,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { ContentType, ActivityItem } from '../types';
import { PageId } from '../components/common/Sidebar';

interface DashboardProps {
  onNavigate: (page: PageId, preselectedType?: ContentType) => void;
  draftsCount: number;
  scheduledCount: number;
  credits: number;
  activities: ActivityItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  draftsCount,
  scheduledCount,
  credits,
  activities
}) => {
  const creationModes: Array<{
    type: ContentType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    borderColor: string;
    bgHover: string;
  }> = [
    {
      type: 'text',
      title: 'Text',
      description: 'Create platform-ready written content.',
      icon: FileText,
      accentColor: 'text-indigo-600 bg-indigo-50',
      borderColor: 'hover:border-indigo-300',
      bgHover: 'group-hover:bg-indigo-600 group-hover:text-white'
    },
    {
      type: 'audio',
      title: 'Audio',
      description: 'Transform scripts and ideas into audio-ready content.',
      icon: Mic,
      accentColor: 'text-purple-600 bg-purple-50',
      borderColor: 'hover:border-purple-300',
      bgHover: 'group-hover:bg-purple-600 group-hover:text-white'
    },
    {
      type: 'video',
      title: 'Video',
      description: 'Plan and prepare video content.',
      icon: Video,
      accentColor: 'text-rose-600 bg-rose-50',
      borderColor: 'hover:border-rose-300',
      bgHover: 'group-hover:bg-rose-600 group-hover:text-white'
    },
    {
      type: 'clips',
      title: 'Clips',
      description: 'Break long-form content into short-form concepts.',
      icon: Scissors,
      accentColor: 'text-amber-600 bg-amber-50',
      borderColor: 'hover:border-amber-300',
      bgHover: 'group-hover:bg-amber-600 group-hover:text-white'
    },
    {
      type: 'editor',
      title: 'Editor',
      description: 'Refine and organize your content.',
      icon: Edit,
      accentColor: 'text-emerald-600 bg-emerald-50',
      borderColor: 'hover:border-emerald-300',
      bgHover: 'group-hover:bg-emerald-600 group-hover:text-white'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-incubrix-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-purple-500/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-purple-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-incubrix-400" />
            <span>Interactive Studio Concept Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display mb-3">
            Welcome to IncuBrix Creator Studio
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6">
            Your workspace for creating and repurposing content. Plan scripts, outline multi-camera videos, break long-form recordings into vertical clips, and schedule publication across channels.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('create')}
              className="inline-flex items-center space-x-2 bg-incubrix-500 hover:bg-incubrix-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-incubrix-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Content</span>
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all"
            >
              <span>Explore 5 Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Workflows */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Content Workflows</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">5 Modes</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
            <span>Text, Audio, Video, Clips, Editor</span>
          </div>
        </div>

        {/* Saved Drafts */}
        <div
          onClick={() => onNavigate('library')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved Drafts</span>
            <div className="p-2 rounded-xl bg-purple-50 text-incubrix-600 group-hover:scale-105 transition-transform">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{draftsCount} Drafts</div>
          <div className="text-[11px] text-incubrix-600 font-medium mt-1 flex items-center space-x-1">
            <span>View library →</span>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div
          onClick={() => onNavigate('calendar')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Scheduled Posts</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{scheduledCount} Posts</div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span className="text-rose-600 font-medium">Demo calendar view</span>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Credits</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{credits} Credits</div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Sample demo balance (non-metered)</span>
          </div>
        </div>
      </div>

      {/* 5 Large Creation Mode Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Choose a Creation Mode</h2>
            <p className="text-xs text-slate-500">
              Select any format below to launch the interactive creation workspace.
            </p>
          </div>
          <button
            onClick={() => onNavigate('create')}
            className="text-xs font-semibold text-incubrix-600 hover:text-incubrix-700 flex items-center space-x-1"
          >
            <span>Custom Creation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {creationModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.type}
                onClick={() => onNavigate('create', mode.type)}
                className={`group bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:-translate-y-1 ${mode.borderColor}`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${mode.accentColor} ${mode.bgHover}`}
                  >
                    <Icon className="w-5 h-5 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-incubrix-700 transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {mode.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-incubrix-600 transition-colors">
                  <span>Start workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Sample Data
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Illustrative log of recent content generations and scheduling events
            </p>
          </div>
          <button
            onClick={() => onNavigate('library')}
            className="text-xs font-semibold text-incubrix-600 hover:text-incubrix-700"
          >
            View all content
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  {act.type === 'text' && <FileText className="w-4 h-4 text-indigo-600" />}
                  {act.type === 'audio' && <Mic className="w-4 h-4 text-purple-600" />}
                  {act.type === 'video' && <Video className="w-4 h-4 text-rose-600" />}
                  {act.type === 'clips' && <Scissors className="w-4 h-4 text-amber-600" />}
                  {act.type === 'editor' && <Edit className="w-4 h-4 text-emerald-600" />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {act.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {act.action} • <span className="font-medium text-slate-600">{act.platform}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{act.timestamp}</span>
                </span>
                {act.isSample && (
                  <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
