import React from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  Lock,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          <BarChart3 className="w-4 h-4 text-incubrix-600" />
          <span>Performance & Insights</span>
        </div>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
            Audience & Publishing Analytics
          </h1>
          <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Unified post-publishing analytics across LinkedIn, YouTube, TikTok, and podcast distribution feeds.
        </p>
      </div>

      {/* Mandatory Honesty Notice Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-amber-900 leading-relaxed">
            <h4 className="font-bold text-sm text-amber-950">
              Analytics Integrations Disconnected in Prototype
            </h4>
            <p>
              IncuBrix Creator Studio does not connect to live third-party social media APIs (LinkedIn API, YouTube Data API, Meta Graph API) or advertising telemetry in this local concept prototype.
            </p>
            <p className="text-[11px] text-amber-800">
              All charts and cards below are illustrative UI blueprints designed to demonstrate future post-publishing metrics architecture. Zero fabricated reach or engagement claims are made.
            </p>
          </div>
        </div>
      </div>

      {/* Illustrative Future Feature Mockup (Clearly labeled) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Illustrative Interface Mockup
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">
              Sample Visual Layout Only
            </span>
          </div>
          <span className="text-xs text-slate-400 flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Telemetry Inactive</span>
          </span>
        </div>

        {/* 3 Illustrative Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-80">
          <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Repurposing Velocity (Illustrative)
            </div>
            <div className="text-xl font-bold text-slate-700">4.2x Clips / Master</div>
            <div className="text-[11px] text-slate-400 mt-1">Average clips extracted per long-form asset</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Time to Publish (Illustrative)
            </div>
            <div className="text-xl font-bold text-slate-700">-65% Turnaround Target</div>
            <div className="text-[11px] text-slate-400 mt-1">Workflow reduction benchmark</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Platform Coverage (Illustrative)
            </div>
            <div className="text-xl font-bold text-slate-700">5 Outlets Ready</div>
            <div className="text-[11px] text-slate-400 mt-1">LinkedIn, YouTube, X, TikTok, Podcast</div>
          </div>
        </div>

        {/* Illustrative Chart Placeholder */}
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Multi-Platform Analytics Engine
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
            In future production releases, this view will aggregate watch-time curves, conversion clicks on show notes, and retention peaks across video clips.
          </p>

          {/* Visual mock bars */}
          <div className="max-w-md mx-auto h-32 flex items-end justify-between gap-3 px-4 pt-4 border-b border-slate-200">
            <div className="w-full bg-slate-100 rounded-t-lg h-[40%] flex items-center justify-center text-[10px] text-slate-400">Mon</div>
            <div className="w-full bg-slate-100 rounded-t-lg h-[65%] flex items-center justify-center text-[10px] text-slate-400">Tue</div>
            <div className="w-full bg-slate-100 rounded-t-lg h-[80%] flex items-center justify-center text-[10px] text-slate-400">Wed</div>
            <div className="w-full bg-indigo-100 rounded-t-lg h-[55%] flex items-center justify-center text-[10px] text-indigo-400 font-bold">Thu</div>
            <div className="w-full bg-slate-100 rounded-t-lg h-[90%] flex items-center justify-center text-[10px] text-slate-400">Fri</div>
            <div className="w-full bg-slate-100 rounded-t-lg h-[35%] flex items-center justify-center text-[10px] text-slate-400">Sat</div>
            <div className="w-full bg-slate-100 rounded-t-lg h-[50%] flex items-center justify-center text-[10px] text-slate-400">Sun</div>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-2">
            ILLUSTRATIVE SAMPLE CHART — NO REAL DATA
          </div>
        </div>
      </div>
    </div>
  );
};
