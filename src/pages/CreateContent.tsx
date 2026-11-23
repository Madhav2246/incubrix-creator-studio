import React, { useState, useEffect } from 'react';
import {
  ContentType,
  Platform,
  Tone,
  TemplateId,
  GenerationResult,
  Draft
} from '../types';
import { TEMPLATES } from '../data/seedData';
import { generateLocalPreview, SIMULATION_DISCLAIMER } from '../utils/generators';
import { saveDraft } from '../utils/storage';
import { TextPreview } from '../components/creation/TextPreview';
import { AudioPreview } from '../components/creation/AudioPreview';
import { VideoPreview } from '../components/creation/VideoPreview';
import { ClipsPreview } from '../components/creation/ClipsPreview';
import { EditorPreview } from '../components/creation/EditorPreview';
import {
  FileText,
  Mic,
  Video,
  Scissors,
  Edit,
  Sparkles,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  BookTemplate,
  Loader2
} from 'lucide-react';

interface CreateContentProps {
  initialType?: ContentType;
  initialTemplate?: TemplateId | null;
  editingDraft?: Draft | null;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onDraftSaved?: () => void;
}

export const CreateContent: React.FC<CreateContentProps> = ({
  initialType = 'text',
  initialTemplate = null,
  editingDraft = null,
  onShowToast,
  onDraftSaved
}) => {
  // Form State
  const [contentType, setContentType] = useState<ContentType>(initialType);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate || '');
  const [topic, setTopic] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('Digital creators and marketing professionals');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');
  const [tone, setTone] = useState<Tone>('Professional');
  const [sourceText, setSourceText] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');

  // Generation & UI State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [previewResult, setPreviewResult] = useState<GenerationResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize or handle prefill
  useEffect(() => {
    if (editingDraft) {
      setContentType(editingDraft.type);
      setTopic(editingDraft.topic || editingDraft.title);
      setTargetAudience(editingDraft.targetAudience || 'Content creators');
      setPlatform(editingDraft.platform);
      setTone(editingDraft.tone);
      setSourceText(editingDraft.sourceText || '');
      setSourceUrl(editingDraft.sourceUrl || '');
      if (editingDraft.output) {
        setPreviewResult(editingDraft.output);
      }
    } else if (initialTemplate) {
      applyTemplate(initialTemplate);
    } else if (initialType) {
      setContentType(initialType);
      // Auto-set appropriate default platform
      if (initialType === 'audio') setPlatform('Podcast');
      else if (initialType === 'video') setPlatform('YouTube');
      else if (initialType === 'clips') setPlatform('TikTok');
      else setPlatform('LinkedIn');
    }
  }, [initialType, initialTemplate, editingDraft]);

  const applyTemplate = (templateId: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    setSelectedTemplate(tmpl.id);
    setContentType(tmpl.defaultContentType);
    setPlatform(tmpl.defaultPlatform);
    setTone(tmpl.defaultTone);
    setTopic(tmpl.defaultTopic);
    setTargetAudience(tmpl.defaultAudience);
    setSourceText(tmpl.defaultSourceText);
    setValidationError(null);
  };

  const handleGenerate = (isRegen = false) => {
    if (!topic.trim()) {
      setValidationError('Please enter a content topic or title before generating a preview.');
      onShowToast('Please enter a topic or title.', 'warning');
      return;
    }

    setValidationError(null);
    setIsGenerating(true);
    setGenerationStep('Applying deterministic platform guidelines...');

    setTimeout(() => {
      setGenerationStep('Formatting simulated content layout...');
    }, 350);

    setTimeout(() => {
      const result = generateLocalPreview(
        contentType,
        topic,
        targetAudience,
        platform,
        tone,
        sourceText,
        sourceUrl
      );

      setPreviewResult(result);
      setIsGenerating(false);
      setGenerationStep('');
      onShowToast(
        isRegen ? 'Preview regenerated with updated settings.' : 'Simulated preview generated successfully.',
        'success'
      );
    }, 700);
  };

  const handleSaveDraft = (overrideContent?: string) => {
    if (!topic.trim()) {
      onShowToast('Please provide a title or topic to save your draft.', 'warning');
      return;
    }

    let finalOutput = previewResult;
    if (overrideContent && finalOutput && finalOutput.type === 'editor') {
      finalOutput = {
        ...finalOutput,
        data: {
          content: overrideContent,
          wordCount: overrideContent.split(/\s+/).filter(Boolean).length,
          characterCount: overrideContent.length
        }
      };
    }

    const draftToSave: Draft = {
      id: editingDraft?.id || 'draft-' + Date.now(),
      title: topic,
      type: contentType,
      platform,
      tone,
      topic,
      targetAudience,
      sourceText,
      sourceUrl,
      output: finalOutput || undefined,
      createdAt: editingDraft?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Draft',
      isSample: false
    };

    saveDraft(draftToSave);
    onShowToast(`Draft "${topic.slice(0, 32)}..." saved to Content Library.`, 'success');
    if (onDraftSaved) onDraftSaved();
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast('Content copied to clipboard!', 'info');
  };

  const handleOpenInEditor = (content: string) => {
    setContentType('editor');
    setSourceText(content);
    const editorResult: GenerationResult = {
      type: 'editor',
      timestamp: new Date().toISOString(),
      disclaimer: SIMULATION_DISCLAIMER,
      data: {
        content,
        wordCount: content.split(/\s+/).filter(Boolean).length,
        characterCount: content.length
      }
    };
    setPreviewResult(editorResult);
    onShowToast('Switched to Editor workspace.', 'info');
  };

  const contentTypes: Array<{ type: ContentType; label: string; icon: any }> = [
    { type: 'text', label: 'Text Copy', icon: FileText },
    { type: 'audio', label: 'Audio / Podcast', icon: Mic },
    { type: 'video', label: 'Video Script', icon: Video },
    { type: 'clips', label: 'Short Clips', icon: Scissors },
    { type: 'editor', label: 'Direct Editor', icon: Edit }
  ];

  const platforms: Platform[] = ['LinkedIn', 'YouTube', 'Instagram', 'X', 'Podcast', 'TikTok'];
  const tones: Tone[] = ['Professional', 'Conversational', 'Educational', 'Engaging', 'Storytelling'];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Page Title & Context */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
            Create Content Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure target audience, voice, and topic to produce deterministic multi-format content blueprints.
          </p>
        </div>

        {/* Template Selector dropdown */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <BookTemplate className="w-4 h-4 text-incubrix-600" />
          <span className="text-xs font-semibold text-slate-700">Quick Template:</span>
          <select
            value={selectedTemplate}
            onChange={(e) => applyTemplate(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="">Select a template...</option>
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Content Configuration
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Local Input</span>
          </div>

          {/* Content Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Content Format / Type
            </label>
            <div className="grid grid-cols-5 gap-1.5 bg-slate-100/90 p-1 rounded-xl">
              {contentTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = contentType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      setContentType(item.type);
                      setValidationError(null);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-incubrix-700 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1 shrink-0" />
                    <span className="text-[10px] leading-tight">{item.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Topic or Content Title <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">Required</span>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. 5 Systems Every Solo Creator Needs in 2027"
              className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-slate-900 placeholder-slate-400 ${
                validationError
                  ? 'border-rose-400 ring-1 ring-rose-200'
                  : 'border-slate-200 focus:ring-incubrix-500'
              }`}
            />
            {validationError && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{validationError}</span>
              </p>
            )}
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Tech founders, podcasters, video editors"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 focus:bg-white text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Platform & Tone (2 columns) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900 cursor-pointer"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Voice & Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900 cursor-pointer"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Source Content Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Source Content / Notes / Raw Transcript
            </label>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={4}
              placeholder="Paste existing notes, key bullet points, raw conversation transcript, or article excerpts..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 focus:bg-white text-slate-900 placeholder-slate-400 resize-y leading-relaxed"
            />
          </div>

          {/* Optional Source URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Source URL <span className="text-[10px] text-slate-400 font-normal">(Optional reference)</span>
            </label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 focus:bg-white text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Generate Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleGenerate(false)}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-incubrix-600 via-indigo-600 to-purple-700 hover:from-incubrix-700 hover:to-purple-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-incubrix-600/25 transition-all transform active:scale-98 disabled:opacity-70 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{generationStep || 'Simulating generation...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Generate Preview</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Locally simulated demonstration output using pre-configured layout templates.
            </p>
          </div>
        </div>

        {/* Right Column: Output Preview Area (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs min-h-[580px] flex flex-col justify-between">
          <div>
            {/* Mandatory Honesty Notice Banner */}
            <div className="mb-4 bg-slate-100/90 border border-slate-200 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-incubrix-600 animate-pulse"></span>
                <span className="font-semibold text-slate-800">
                  Demo Preview — locally simulated; no external AI service connected
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">Local Template Engine</span>
            </div>

            {/* Content Output Switcher */}
            {previewResult ? (
              <div className="space-y-4">
                {/* Regenerate Quick Bar */}
                <div className="flex items-center justify-between pb-2 text-xs text-slate-500">
                  <span>Generated for <strong className="text-slate-800">{platform}</strong> • {tone} voice</span>
                  <button
                    onClick={() => handleGenerate(true)}
                    className="flex items-center space-x-1 text-incubrix-600 hover:text-incubrix-700 font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>

                {previewResult.type === 'text' && (
                  <TextPreview
                    data={previewResult.data as any}
                    onCopy={handleCopyText}
                    onSaveDraft={handleSaveDraft}
                    onEditInEditor={handleOpenInEditor}
                  />
                )}

                {previewResult.type === 'audio' && (
                  <AudioPreview
                    data={previewResult.data as any}
                    onCopy={handleCopyText}
                    onSaveDraft={handleSaveDraft}
                    onEditInEditor={handleOpenInEditor}
                  />
                )}

                {previewResult.type === 'video' && (
                  <VideoPreview
                    data={previewResult.data as any}
                    onCopy={handleCopyText}
                    onSaveDraft={handleSaveDraft}
                    onEditInEditor={handleOpenInEditor}
                  />
                )}

                {previewResult.type === 'clips' && (
                  <ClipsPreview
                    data={previewResult.data as any}
                    onCopy={handleCopyText}
                    onSaveDraft={handleSaveDraft}
                    onEditInEditor={handleOpenInEditor}
                  />
                )}

                {previewResult.type === 'editor' && (
                  <EditorPreview
                    data={previewResult.data as any}
                    onCopy={handleCopyText}
                    onSaveDraft={handleSaveDraft}
                  />
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-incubrix-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-incubrix-600" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Ready to Preview Your Content
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Fill in your topic and preferences on the left, then click <strong>Generate Preview</strong> to see the formatted output for {platform}.
                </p>
                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-left w-full text-xs space-y-1.5 text-slate-600">
                  <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">
                    Quick Tips for Demo:
                  </div>
                  <div>• Pick a template above to autofill sample data</div>
                  <div>• Try different formats: Text, Audio, Video, or Clips</div>
                  <div>• Save draft to view it in your Content Library</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
