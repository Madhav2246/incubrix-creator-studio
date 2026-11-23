import React from 'react';
import {
  LayoutDashboard,
  PenTool,
  BookTemplate,
  FolderOpen,
  CalendarDays,
  BarChart3,
  Settings as SettingsIcon,
  Sparkles,
  Layers,
  ExternalLink
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'create'
  | 'templates'
  | 'library'
  | 'calendar'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  savedDraftsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  savedDraftsCount
}) => {
  const navItems = [
    { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create' as PageId, label: 'Create Content', icon: PenTool, badge: 'New' },
    { id: 'templates' as PageId, label: 'Templates', icon: BookTemplate },
    {
      id: 'library' as PageId,
      label: 'Content Library',
      icon: FolderOpen,
      count: savedDraftsCount
    },
    { id: 'calendar' as PageId, label: 'Calendar', icon: CalendarDays },
    { id: 'analytics' as PageId, label: 'Analytics', icon: BarChart3, badge: 'Soon' },
    { id: 'settings' as PageId, label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-incubrix-500 via-indigo-600 to-purple-800 flex items-center justify-center text-white shadow-lg shadow-incubrix-500/20 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-base tracking-tight text-white font-display">
                IncuBrix
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-incubrix-500/20 text-incubrix-300 px-1.5 py-0.5 rounded">
                AI
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 tracking-wide">
              Creator Studio
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-incubrix-600 to-indigo-600 text-white shadow-md shadow-incubrix-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badge === 'Soon'
                      ? 'bg-slate-800 text-slate-400 border border-slate-700'
                      : 'bg-incubrix-500/20 text-incubrix-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Info Card */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 text-xs">
          <div className="flex items-center space-x-2 text-incubrix-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Concept</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Deterministic local demo prototype for reviewer walkthrough. No external AI inference connected.
          </p>
        </div>
      </div>
    </aside>
  );
};
