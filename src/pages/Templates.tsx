import React from 'react';
import { TEMPLATES } from '../data/seedData';
import { TemplateId } from '../types';
import { PageId } from '../components/common/Sidebar';
import {
  Linkedin,
  Mic,
  Video,
  Scissors,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookTemplate
} from 'lucide-react';

interface TemplatesProps {
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return Linkedin;
      case 'Mic':
        return Mic;
      case 'Video':
        return Video;
      case 'Scissors':
        return Scissors;
      default:
        return Sparkles;
    }
  };

  const colorsByCategory: Record<
    string,
    { badgeBg: string; badgeText: string; iconBg: string; iconColor: string; borderHover: string }
  > = {
    'LinkedIn Content': {
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      borderHover: 'hover:border-indigo-400'
    },
    'Podcast Content': {
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-incubrix-600',
      borderHover: 'hover:border-purple-400'
    },
    'Video Content': {
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-700',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      borderHover: 'hover:border-rose-400'
    },
    'Repurpose Video': {
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      borderHover: 'hover:border-amber-400'
    },
    'Niche Content': {
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-400'
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-incubrix-600 mb-1">
          <BookTemplate className="w-4 h-4" />
          <span>Curated Production Frameworks</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
          Creator Content Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Choose from 5 proven creation architectures. Selecting a template opens the creation workspace with pre-populated fields and optimal platform guidelines.
        </p>
      </div>

      {/* 5 Prominent Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => {
          const Icon = getIcon(tmpl.iconName);
          const style = colorsByCategory[tmpl.category] || colorsByCategory['Niche Content'];

          return (
            <div
              key={tmpl.id}
              className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1 ${style.borderHover}`}
            >
              <div>
                {/* Header Icon + Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.iconBg} ${style.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText}`}>
                    {tmpl.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 mb-2">{tmpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tmpl.description}
                </p>

                {/* Use Case Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Ideal Use Case:
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">
                    {tmpl.useCase}
                  </div>
                </div>

                {/* Preset Metadata */}
                <div className="text-[11px] text-slate-500 space-y-1 pb-4">
                  <div className="flex items-center justify-between">
                    <span>Default Platform:</span>
                    <strong className="text-slate-800">{tmpl.defaultPlatform}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voice Tone:</span>
                    <strong className="text-slate-800">{tmpl.defaultTone}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectTemplate(tmpl.id)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-incubrix-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors group cursor-pointer"
              >
                <span>Select Template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
