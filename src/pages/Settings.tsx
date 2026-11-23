import React from 'react';
import {
  User,
  Building,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  Layers,
  Database,
  ExternalLink
} from 'lucide-react';

interface SettingsProps {
  credits: number;
}

export const Settings: React.FC<SettingsProps> = ({ credits }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
          Workspace Settings & Prototype Info
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your demonstration preferences, inspect application mode, and view credit status.
        </p>
      </div>

      {/* Credits Card */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-purple-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Generation Balance</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full">
            Demo Tier
          </span>
        </div>

        <div className="flex items-baseline space-x-3 mb-2">
          <span className="text-4xl font-extrabold tracking-tight font-display">{credits}</span>
          <span className="text-lg font-medium text-purple-200">Credits Available</span>
        </div>

        <p className="text-xs text-purple-200/90 leading-relaxed max-w-xl">
          <strong>Demo balance: 300 credits.</strong> Credits are illustrative. No real usage or billing is connected. You can test generation workflows freely without metered limits.
        </p>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <User className="w-4 h-4 text-incubrix-600" />
          <h3 className="text-sm font-bold text-slate-900">User Profile</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              readOnly
              value="Demo Creator (Growth Engineer Assessment)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Email Address</label>
            <input
              type="text"
              readOnly
              value="evaluator@incubrix-demo.internal"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Workspace Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Building className="w-4 h-4 text-incubrix-600" />
          <h3 className="text-sm font-bold text-slate-900">Workspace Configuration</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Active Workspace</label>
            <input
              type="text"
              readOnly
              value="IncuBrix Demo Creator Studio"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Local Storage Mode</label>
            <input
              type="text"
              readOnly
              value="Browser localStorage (Persistence Enabled)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Prototype Architecture & Disclaimers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Info className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-900">About IncuBrix Creator Studio</h3>
        </div>

        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>Concept Prototype:</strong> Built for the IncuBrix 2027 Growth Engineer Assessment Option 1 demonstration. It pairs the Python discovery and lead-qualification engine with an interactive product walkthrough interface.
          </p>
          <p>
            <strong>Zero Fabricated Inference:</strong> Generation outputs are deterministic local templates reflecting platform constraints (character counts, hooks, and scene compositions). No external LLM keys or audio/video rendering engines are connected.
          </p>
          <p>
            <strong>Persistence:</strong> Saved drafts and calendar entries are safely stored in your browser's localStorage and survive page refreshes.
          </p>
        </div>
      </div>
    </div>
  );
};
