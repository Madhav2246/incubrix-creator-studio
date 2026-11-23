export type ContentType = 'text' | 'audio' | 'video' | 'clips' | 'editor';

export type Platform = 'LinkedIn' | 'YouTube' | 'Instagram' | 'X' | 'Podcast' | 'TikTok';

export type Tone = 'Professional' | 'Conversational' | 'Educational' | 'Engaging' | 'Storytelling';

export type TemplateId = 'linkedin-thought' | 'podcast-notes' | 'video-script' | 'repurpose-clips' | 'niche-authority';

export interface Template {
  id: TemplateId;
  name: string;
  category: 'LinkedIn Content' | 'Podcast Content' | 'Video Content' | 'Repurpose Video' | 'Niche Content';
  description: string;
  useCase: string;
  defaultContentType: ContentType;
  defaultPlatform: Platform;
  defaultTone: Tone;
  defaultTopic: string;
  defaultAudience: string;
  defaultSourceText: string;
  iconName: string;
}

export interface TextOutput {
  headline: string;
  hook: string;
  mainCaption: string;
  hashtags: string[];
  callToAction: string;
}

export interface AudioOutput {
  episodeTitle: string;
  introScript: string;
  talkingPoints: string[];
  outroScript: string;
  estimatedDuration: string;
}

export interface StoryboardScene {
  sceneNumber: number;
  title: string;
  visualDescription: string;
  narration: string;
  suggestedBroll: string;
  estimatedDuration: string;
}

export interface VideoOutput {
  videoTitle: string;
  openingHook: string;
  storyboard: StoryboardScene[];
  suggestedBroll: string[];
  closingCta: string;
}

export interface ClipItem {
  clipIndex: number;
  title: string;
  placeholderRange: string;
  hook: string;
  caption: string;
  targetPlatform: Platform;
}

export interface ClipsOutput {
  clipTitle: string;
  suggestedSections: ClipItem[];
  overallSummary: string;
}

export interface EditorOutput {
  content: string;
  wordCount: number;
  characterCount: number;
}

export type GenerationOutput = TextOutput | AudioOutput | VideoOutput | ClipsOutput | EditorOutput;

export interface GenerationResult {
  type: ContentType;
  timestamp: string;
  disclaimer: string;
  data: GenerationOutput;
}

export type DraftStatus = 'Draft' | 'Ready' | 'Scheduled';

export interface Draft {
  id: string;
  title: string;
  type: ContentType;
  platform: Platform;
  tone: Tone;
  topic: string;
  targetAudience: string;
  sourceText: string;
  sourceUrl?: string;
  output?: GenerationResult;
  createdAt: string;
  updatedAt: string;
  status: DraftStatus;
  isSample?: boolean;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: Platform;
  type: ContentType;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:MM
  status: 'Scheduled' | 'Draft';
  draftId?: string;
  isSample?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  action: string;
  type: ContentType;
  platform: Platform;
  timestamp: string;
  isSample: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
