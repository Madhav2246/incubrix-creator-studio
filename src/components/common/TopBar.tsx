import React from 'react';
import { Search, Bell, Sparkles, Layers, Info } from 'lucide-react';

interface TopBarProps {
  credits: number;
}

export const TopBar: React.FC<TopBarProps> = ({ credits }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Prototype Banner */}
      <div className="bg-gradient-to-r from-incubrix-700 via-indigo-600 to-purple-700 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold tracking-wide">Interactive Prototype | Demo Mode</span>
          <span className="hidden md:inline text-indigo-100 opacity-90">
            — Locally simulated workflow preview; zero external AI inference or publishing APIs connected
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-indigo-200">
          <span className="hidden sm:inline">Concept Exploration</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-white font-mono">v1.0-demo</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Mobile Brand & Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search workflows, templates, or saved drafts..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Credits Pill */}
          <div className="flex items-center space-x-2 bg-purple-50 border border-purple-200/80 px-3 py-1.5 rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4 text-incubrix-600 animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-bold text-incubrix-900 leading-tight">
                {credits} <span className="text-[11px] font-semibold text-incubrix-700">credits</span>
              </div>
              <div className="text-[9px] text-purple-600 font-medium uppercase tracking-wider leading-none">
                Demo balance
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button
            title="Notifications"
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-incubrix-600 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-incubrix-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-purple-100">
              ME
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-snug">Demo Creator</div>
              <div className="text-[10px] text-slate-500 leading-tight">Studio Member</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
