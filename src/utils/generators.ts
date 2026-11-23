import {
  ContentType,
  Platform,
  Tone,
  GenerationResult,
  TextOutput,
  AudioOutput,
  VideoOutput,
  ClipsOutput,
  EditorOutput
} from '../types';

export const SIMULATION_DISCLAIMER =
  'Demo Preview — locally simulated; no external AI service connected';

export function generateLocalPreview(
  type: ContentType,
  topic: string,
  targetAudience: string,
  platform: Platform,
  tone: Tone,
  sourceText: string,
  sourceUrl?: string
): GenerationResult {
  const timestamp = new Date().toISOString();
  const safeTopic = topic.trim() || 'Modern Creator Strategy';
  const safeAudience = targetAudience.trim() || 'Digital creators and operators';
  const safeSource = sourceText.trim() || 'Strategic frameworks for multi-platform distribution and workflow consistency.';

  switch (type) {
    case 'text': {
      const textData: TextOutput = generateTextPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource
      );
      return {
        type: 'text',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: textData
      };
    }
    case 'audio': {
      const audioData: AudioOutput = generateAudioPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource
      );
      return {
        type: 'audio',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: audioData
      };
    }
    case 'video': {
      const videoData: VideoOutput = generateVideoPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource
      );
      return {
        type: 'video',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: videoData
      };
    }
    case 'clips': {
      const clipsData: ClipsOutput = generateClipsPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource,
        sourceUrl
      );
      return {
        type: 'clips',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: clipsData
      };
    }
    case 'editor': {
      const editorData: EditorOutput = generateEditorPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource
      );
      return {
        type: 'editor',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: editorData
      };
    }
    default: {
      const textData: TextOutput = generateTextPreview(
        safeTopic,
        safeAudience,
        platform,
        tone,
        safeSource
      );
      return {
        type: 'text',
        timestamp,
        disclaimer: SIMULATION_DISCLAIMER,
        data: textData
      };
    }
  }
}

function generateTextPreview(
  topic: string,
  audience: string,
  platform: Platform,
  tone: Tone,
  source: string
): TextOutput {
  const hooksByTone: Record<Tone, string> = {
    Professional: `Why most ${audience} misunderstand ${topic} (and the operational framework to fix it):`,
    Conversational: `I used to think ${topic} was complicated. Turns out, 90% of people are just overcomplicating the basics:`,
    Educational: `A step-by-step masterclass on ${topic} specifically tailored for ${audience}:`,
    Engaging: `Stop scrolling if you care about ${topic}. Here is what nobody tells ${audience}:`,
    Storytelling: `Three years ago, I almost burned out trying to manage ${topic}. Here is the exact pivot that changed everything:`
  };

  const ctasByPlatform: Record<Platform, string> = {
    LinkedIn: `What has been your team's experience with ${topic}? Join the discussion in the comments below.`,
    YouTube: `Leave a comment with your #1 takeaway, and hit subscribe for weekly creator breakdowns.`,
    Instagram: `Save this post for your next planning session, and drop a 🔥 in the comments if this resonated.`,
    X: `Retweet the first post if this helped you, and follow for more actionable insights on ${topic}.`,
    Podcast: `Check out the full breakdown in our show notes and subscribe to our newsletter for the companion checklist.`,
    TikTok: `Hit the save button right now and tag a creator friend who needs to hear this.`
  };

  const hashtags = [
    `#${topic.replace(/[^a-zA-Z0-9]/g, '')}`,
    `#${platform}Growth`,
    `#CreatorEconomy`,
    `#Productivity`,
    `#Workflow`
  ].slice(0, 4);

  const mainCaption = `Here are 4 foundational pillars we discovered while testing ${topic} for ${audience}:\n\n` +
    `1. Decouple Ideation from Execution: When you separate outline creation from content formatting, output accelerates 3x.\n\n` +
    `2. Context-Driven Modular Assets: ${source.slice(0, 140)}...\n\n` +
    `3. Standardized Pacing: Keep the message focused strictly on solving one problem for ${audience} rather than generic advice.\n\n` +
    `4. Closed-Loop Feedback: Track retention signals and comments to iterate your next piece.`;

  return {
    headline: `${topic.toUpperCase()} — Essential Strategic Guide for ${audience}`,
    hook: hooksByTone[tone] || hooksByTone.Professional,
    mainCaption,
    hashtags,
    callToAction: ctasByPlatform[platform] || ctasByPlatform.LinkedIn
  };
}

function generateAudioPreview(
  topic: string,
  audience: string,
  _platform: Platform,
  tone: Tone,
  source: string
): AudioOutput {
  const introScript =
    `[INTRO MUSIC SWELLS - 5 SECONDS]\n` +
    `HOST: "Welcome back, everyone. If you are part of our community of ${audience}, today's conversation is essential listening. We are diving into ${topic}.\n` +
    `Whether you have been wrestling with this for months or just starting to optimize your setup, we are breaking down actionable frameworks, not theoretical fluff.\n` +
    `Let's get right into the breakdown."\n` +
    `[TRANSITION CHIME]`;

  const talkingPoints = [
    `The current state of ${topic} and why traditional tactics fail ${audience}`,
    `Core case study analysis: ${source.slice(0, 120)}...`,
    `3 operational shifts you can implement today without upgrading software`,
    `Common pitfalls to avoid when scaling your production cadence`,
    `Q&A listener spotlight: Real-world troubleshooting scenarios`
  ];

  const outroScript =
    `HOST: "That wraps up our deep dive into ${topic}. Remember, execution beats perfection every single time.\n` +
    `If you enjoyed this episode, please leave an honest 5-star rating on your favorite podcast app. It directly supports our independent research.\n` +
    `Until next week, keep creating and keep iterating."\n` +
    `[OUTRO MUSIC FADES]`;

  return {
    episodeTitle: `Mastering ${topic}: The Practical Audio Deep Dive for ${audience}`,
    introScript,
    talkingPoints,
    outroScript,
    estimatedDuration: '24–30 minutes'
  };
}

function generateVideoPreview(
  topic: string,
  audience: string,
  platform: Platform,
  tone: Tone,
  source: string
): VideoOutput {
  const openingHook =
    platform === 'TikTok' || platform === 'Instagram'
      ? `Wait! If you are a creator in 2027, stop doing ${topic} the old way. Here is the 15-second shortcut.`
      : `Most ${audience} spend weeks trying to solve ${topic}. In this video, I will show you the exact system that gets it done in hours.`;

  const storyboard = [
    {
      sceneNumber: 1,
      title: 'Hook & Core Tension',
      visualDescription: 'Direct-to-camera punch in shot (4K cropped to 110%). Dynamic lower-third banner displaying topic title.',
      narration: `If you are ${audience}, you know that ${topic} is where most people quit. Here is why: they try to do everything manually.`,
      suggestedBroll: 'Fast-paced montage of creator workspaces, timeline scrubbing, and high-energy graphics.',
      estimatedDuration: '0:00 - 0:30'
    },
    {
      sceneNumber: 2,
      title: 'The Hidden Problem',
      visualDescription: 'Split screen: Left side shows frustrated creator, right side shows timeline congestion.',
      narration: `Traditional approaches assume you have 40 hours a week just for editing. But real-world constraints demand lean workflows: ${source.slice(0, 100)}.`,
      suggestedBroll: 'Over-the-shoulder screen recording of software workflow with animated callouts.',
      estimatedDuration: '0:30 - 2:00'
    },
    {
      sceneNumber: 3,
      title: 'The 3-Step Framework',
      visualDescription: 'Crisp Notion/Canvas digital architecture with 3 numbered cards lighting up sequentially.',
      narration: `Step 1: Standardize your inputs. Step 2: Automate repetitive cutdowns. Step 3: Polish the top 10% where human taste actually matters.`,
      suggestedBroll: 'Clean UI walkthrough showing the step-by-step setup in real time.',
      estimatedDuration: '2:00 - 4:30'
    },
    {
      sceneNumber: 4,
      title: 'Real-World Proof & Closing CTA',
      visualDescription: 'Host smiling at camera, end card slides in with subscribe button and related video cards.',
      narration: `Put this system into practice for 14 days and see your turnaround time drop. Drop a comment below with your biggest bottleneck.`,
      suggestedBroll: 'Before-and-after calendar comparison showing 4x output increase.',
      estimatedDuration: '4:30 - 5:30'
    }
  ];

  const suggestedBroll = [
    'Clean overhead shot of host desk setup with microphone and lighting',
    'Screen recording showing streamlined content repository and calendar view',
    'Animated kinetic typography emphasizing key statistics and action verbs',
    'Split-screen comparison of traditional vs automated content assembly line'
  ];

  const closingCta = `Drop a comment with your favorite step, subscribe for weekly breakdowns, and grab our free template checklist in the description below.`;

  return {
    videoTitle: `${topic}: The Complete Video Blueprint for ${audience}`,
    openingHook,
    storyboard,
    suggestedBroll,
    closingCta
  };
}

function generateClipsPreview(
  topic: string,
  audience: string,
  platform: Platform,
  _tone: Tone,
  source: string,
  sourceUrl?: string
): ClipsOutput {
  const clipTitle = `Vertical Highlights: ${topic}`;
  const urlNote = sourceUrl ? ` (Derived from source link: ${sourceUrl})` : '';

  const suggestedSections = [
    {
      clipIndex: 1,
      title: `${topic} — The Biggest Myth Debunked`,
      placeholderRange: '01:45 – 02:28 (Simulated sample range)',
      hook: `Stop believing what people say about ${topic}.`,
      caption: `Here is the truth that ${audience} need to know before spending another dollar on tools. ${source.slice(0, 90)}...`,
      targetPlatform: (platform === 'TikTok' ? 'TikTok' : 'Instagram') as Platform
    },
    {
      clipIndex: 2,
      title: `The 60-Second Action Blueprint`,
      placeholderRange: '06:10 – 06:55 (Simulated sample range)',
      hook: `3 steps to 10x your output starting this afternoon:`,
      caption: `1. Standardize your templates. 2. Repurpose horizontally. 3. Protect your creative focus. Tag someone who needs this reminder!`,
      targetPlatform: 'YouTube' as Platform
    },
    {
      clipIndex: 3,
      title: `The Mindset Shift for ${audience}`,
      placeholderRange: '11:20 – 12:05 (Simulated sample range)',
      hook: `Why high-performing creators work like engineers, not artists.`,
      caption: `Artistry is in the idea. Everything else is workflow operations. Follow for more deep dives on creator engineering.`,
      targetPlatform: 'LinkedIn' as Platform
    }
  ];

  return {
    clipTitle: `${clipTitle}${urlNote}`,
    overallSummary: `3 simulated short-form vertical concepts formatted for 9:16 mobile retention with suggested hook timestamps and platform captions.`,
    suggestedSections
  };
}

function generateEditorPreview(
  topic: string,
  audience: string,
  _platform: Platform,
  tone: Tone,
  source: string
): EditorOutput {
  const content =
    `# Master Outline: ${topic}\n\n` +
    `**Target Audience:** ${audience}\n` +
    `**Tone:** ${tone}\n` +
    `**Status:** In Progress — Editable Workspace Draft\n\n` +
    `---\n\n` +
    `## 1. Executive Summary\n` +
    `${source}\n\n` +
    `## 2. Core Problem Statement\n` +
    `Modern content production suffers from severe context-switching. Creators spend more time managing files and formatting captions than delivering high-signal value to their audience.\n\n` +
    `## 3. The 3 Pillars of Sustainable Publishing\n` +
    `- **Pillar A: Batch Ideation** — Dedicate single time blocks for script outlines.\n` +
    `- **Pillar B: Modular Assembly** — Keep video b-roll, audio stems, and written quotes organized in unified schemas.\n` +
    `- **Pillar C: Multi-Format Syndication** — A single long-form piece must feed short-form vertical video, professional written updates, and email newsletter content.\n\n` +
    `## 4. Key Metrics to Track\n` +
    `- Time-to-publish per episode (Hours)\n` +
    `- Repurposing yield (Pieces created per primary asset)\n` +
    `- Audience retention curve at 30-second mark\n\n` +
    `---\n` +
    `*Draft created in IncuBrix Creator Studio. Edit this text directly and click Save Draft.*`;

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const characterCount = content.length;

  return {
    content,
    wordCount,
    characterCount
  };
}
