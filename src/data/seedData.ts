import { Template, Draft, ScheduledPost, ActivityItem } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'linkedin-thought',
    name: 'LinkedIn Thought Leadership',
    category: 'LinkedIn Content',
    description: 'Create professional posts, thought leadership and educational content.',
    useCase: 'Best for B2B founders, educators, and consultants sharing operational insights or frameworks.',
    defaultContentType: 'text',
    defaultPlatform: 'LinkedIn',
    defaultTone: 'Professional',
    defaultTopic: 'The Future of AI-Assisted Creator Workflows',
    defaultAudience: 'Content creators, solopreneurs, and digital marketing leaders',
    defaultSourceText: 'Traditional creator workflows spend 80% of time on manual editing and distribution instead of ideation. With structured pipeline automation, creators can maintain multi-channel cadence without expanding headcount.',
    iconName: 'Linkedin'
  },
  {
    id: 'podcast-notes',
    name: 'Podcast Episode & Show Notes',
    category: 'Podcast Content',
    description: 'Prepare episode introductions, show notes, descriptions and promotional copy.',
    useCase: 'Ideal for podcasters who need an engaging intro hook, structured bullet points, and clear outro CTA.',
    defaultContentType: 'audio',
    defaultPlatform: 'Podcast',
    defaultTone: 'Conversational',
    defaultTopic: 'Ep 58: Engineering Audience Growth Through Consistent Video',
    defaultAudience: 'Podcast listeners, video creators, and tech enthusiasts',
    defaultSourceText: 'In this episode, we break down how top creators release 8+ videos a month without burnout. We explore batch recording techniques, multi-format cutdowns, and audience feedback loops.',
    iconName: 'Mic'
  },
  {
    id: 'video-script',
    name: 'Long-Form Video Script & Storyboard',
    category: 'Video Content',
    description: 'Prepare scripts, hooks, video outlines and scene plans.',
    useCase: 'Used for YouTube tutorials, deep dives, and educational explainers with scene-by-scene B-roll suggestions.',
    defaultContentType: 'video',
    defaultPlatform: 'YouTube',
    defaultTone: 'Educational',
    defaultTopic: '5 Systems Every Solo YouTuber Needs in 2027',
    defaultAudience: 'Aspiring and full-time YouTube creators',
    defaultSourceText: 'Most creators fail because they treat every video as a standalone project rather than a modular assembly line. Step 1: Idea vault. Step 2: 3-beat outline. Step 3: Fast rough cut. Step 4: Hook refinement. Step 5: Repurposed distribution.',
    iconName: 'Video'
  },
  {
    id: 'repurpose-clips',
    name: 'Repurpose Long-Form into Clips',
    category: 'Repurpose Video',
    description: 'Transform supplied long-form text into short-form clip concepts and platform captions.',
    useCase: 'Break 45-minute interviews or tutorials into 3-5 high-retention vertical short concepts.',
    defaultContentType: 'clips',
    defaultPlatform: 'TikTok',
    defaultTone: 'Engaging',
    defaultTopic: 'Interview Highlights on Creative Longevity',
    defaultAudience: 'Short-form viewers on TikTok, Reels, and YouTube Shorts',
    defaultSourceText: 'Interviewer: What was your biggest mistake when you hit 100k subscribers? Creator: I thought I needed an expensive studio. What I actually needed was an ironclad publishing calendar and faster editing turnaround.',
    iconName: 'Scissors'
  },
  {
    id: 'niche-authority',
    name: 'Niche Authority Blueprint',
    category: 'Niche Content',
    description: 'Create content tailored to a particular audience or subject area.',
    useCase: 'Targeted deep dives in AI, SaaS, Productivity, or Developer Tools with industry-specific vocabulary.',
    defaultContentType: 'editor',
    defaultPlatform: 'X',
    defaultTone: 'Educational',
    defaultTopic: 'Why Context Windows Changed Prompt Engineering Forever',
    defaultAudience: 'AI developers, technical founders, and product builders',
    defaultSourceText: 'The shift from prompt engineering to system architecture: why large context models require modular retrieval and deterministic evaluation rather than clever wording.',
    iconName: 'Sparkles'
  }
];

export const SEED_DRAFTS: Draft[] = [
  {
    id: 'draft-seed-podcast',
    title: 'Ep 42: Scaling AI Agent Workflows (Sample Episode)',
    type: 'audio',
    platform: 'Podcast',
    tone: 'Conversational',
    topic: 'Scaling AI Agent Workflows with Deterministic Verification',
    targetAudience: 'Growth engineers and AI software developers',
    sourceText: 'Recorded conversation discussing why autonomous discovery engines must enforce hard verification gates instead of hallucinating profile statistics.',
    createdAt: '2026-11-21T10:30:00Z',
    updatedAt: '2026-11-21T10:30:00Z',
    status: 'Ready',
    isSample: true,
    output: {
      type: 'audio',
      timestamp: '2026-11-21T10:30:00Z',
      disclaimer: 'Demo Preview — locally simulated; no external AI service connected',
      data: {
        episodeTitle: 'Ep 42: Scaling AI Agent Workflows with Deterministic Verification',
        introScript: 'Welcome back to the Growth Architecture Podcast. In today\'s episode, we tackle the biggest mistake teams make when deploying AI agents: trusting generative output without deterministic verification. Here is how to engineer pipelines that fail closed.',
        talkingPoints: [
          'Why probabilistic models fail silent audits in production datasets',
          'The 7-layer deduplication approach: canonical URLs, handles, and normalized emails',
          'Balancing volume vs strict qualification: real case studies from 1,000-creator lead pipelines',
          'Practical architecture patterns for human-in-the-loop escalation'
        ],
        outroScript: 'Thank you for tuning in to Episode 42. If you found this breakdown valuable, subscribe to our feed on Apple Podcasts or Spotify, and check the show notes for our open-source verification checklist.',
        estimatedDuration: '28-32 minutes'
      }
    }
  },
  {
    id: 'draft-seed-linkedin',
    title: 'The 5 Bottlenecks in Creator Repurposing (Sample Post)',
    type: 'text',
    platform: 'LinkedIn',
    tone: 'Professional',
    topic: 'The 5 Bottlenecks in Creator Repurposing',
    targetAudience: 'Digital agency owners and content directors',
    sourceText: 'Analysis of 50 top YouTube creators showing that editing and repurposing consumes 74% of weekly production time.',
    createdAt: '2026-11-22T14:15:00Z',
    updatedAt: '2026-11-22T14:15:00Z',
    status: 'Ready',
    isSample: true,
    output: {
      type: 'text',
      timestamp: '2026-11-22T14:15:00Z',
      disclaimer: 'Demo Preview — locally simulated; no external AI service connected',
      data: {
        headline: 'Why 80% of video podcasts never make it to LinkedIn and YouTube Shorts',
        hook: 'Most creators don\'t have a content problem. They have a distribution bottleneck.',
        mainCaption: 'After auditing production workflows across dozens of creator teams, one pattern stands out:\n\nRecording the conversation takes 60 minutes.\n\nFormatting, subtitle timing, aspect-ratio reframing, and platform copywriting take 8+ hours.\n\nHere are 3 operational adjustments top media engines use:\n\n1. Timestamp-driven recording notes during live recording.\n2. Standardized 3-beat narrative structures for vertical cuts.\n3. Automated asset staging before human editorial polish.\n\nWhen you decouple ideation from repetitive cutdown mechanics, creative output triples without team burnout.',
        hashtags: ['#CreatorEconomy', '#ContentStrategy', '#MediaProduction', '#WorkflowAutomation'],
        callToAction: 'How does your team handle long-form repurposing? Share your workflow below.'
      }
    }
  },
  {
    id: 'draft-seed-video',
    title: 'How Modern Creators Systematize Production (Sample Outline)',
    type: 'video',
    platform: 'YouTube',
    tone: 'Educational',
    topic: 'How Modern Creators Systematize Production',
    targetAudience: 'Intermediate YouTube creators looking to scale from 10k to 100k subs',
    sourceText: 'A comprehensive walkthrough of the 4-phase production assembly line: ideation, pre-production outline, batch recording, and multi-channel syndication.',
    createdAt: '2026-11-23T09:00:00Z',
    updatedAt: '2026-11-23T09:00:00Z',
    status: 'Draft',
    isSample: true,
    output: {
      type: 'video',
      timestamp: '2026-11-23T09:00:00Z',
      disclaimer: 'Demo Preview — locally simulated; no external AI service connected',
      data: {
        videoTitle: 'How Modern Creators Systematize Production (Stop Burning Out)',
        openingHook: 'If you are spending more than 10 hours editing a single YouTube video, you are doing it backwards. In this video, I will show you the exact system we used to publish twice a week while cutting editing time in half.',
        storyboard: [
          {
            sceneNumber: 1,
            title: 'The Creator Hamster Wheel',
            visualDescription: 'Talking head shot with quick screen capture montage of messy desktop folders and unfinished Premiere timelines.',
            narration: 'Most creators start energized, but by video ten, the editing backlog suffocates creativity.',
            suggestedBroll: 'Close-up of editing timeline with dozens of video cuts and audio waveforms.',
            estimatedDuration: '0:00 - 0:45'
          },
          {
            sceneNumber: 2,
            title: 'The 3-Beat Script Framework',
            visualDescription: 'Over-the-shoulder view of Notion script template showing Hook, Core Insight, and Tactical Takeaway.',
            narration: 'Before pressing record, lock down the single core insight your viewer will walk away with.',
            suggestedBroll: 'Clean UI animation highlighting the script beats and pacing checkpoints.',
            estimatedDuration: '0:45 - 2:15'
          },
          {
            sceneNumber: 3,
            title: 'Batch Filming Tactics',
            visualDescription: 'Wide angle showing studio setup with teleprompter, key light, and secondary mic.',
            narration: 'Never set up the studio for one video. Record two episodes in one sitting to maximize lighting and mental setup.',
            suggestedBroll: 'Fast-motion studio preparation B-roll.',
            estimatedDuration: '2:15 - 4:00'
          },
          {
            sceneNumber: 4,
            title: 'The Multi-Channel Repurposing Engine',
            visualDescription: 'Flowchart graphic illustrating one long-form video branching into 4 Shorts, 2 LinkedIn carousels, and 1 newsletter.',
            narration: 'Every long-form video holds at least three punchy vertical shorts. Clip them systematically.',
            suggestedBroll: 'Animated diagram showing content redistribution across platforms.',
            estimatedDuration: '4:00 - 5:30'
          }
        ],
        suggestedBroll: [
          'Studio lighting and microphone setup time-lapse',
          'Screen recording of editing timeline and audio scrubbing',
          'Animated flowchart of multi-platform repurposing cycle',
          'Notion content planner board with published status cards'
        ],
        closingCta: 'Download our free Creator System template in the link below, and hit subscribe for weekly creator engineering breakdowns.'
      }
    }
  },
  {
    id: 'draft-seed-clips',
    title: 'Clip: Stop Editing Everything Manually (Sample Concept)',
    type: 'clips',
    platform: 'Instagram',
    tone: 'Engaging',
    topic: 'Stop Editing Everything Manually',
    targetAudience: 'Mobile social viewers scrolling Instagram Reels and TikTok',
    sourceText: 'Key highlight from our production interview: Why manual timeline trimming is the biggest waste of creator time.',
    createdAt: '2026-11-23T16:45:00Z',
    updatedAt: '2026-11-23T16:45:00Z',
    status: 'Ready',
    isSample: true,
    output: {
      type: 'clips',
      timestamp: '2026-11-23T16:45:00Z',
      disclaimer: 'Demo Preview — locally simulated; no external AI service connected',
      data: {
        clipTitle: 'Stop Editing Everything Manually (30s Highlight Concept)',
        overallSummary: '3 high-energy vertical clip concepts extracted from source interview transcript with simulated timecodes.',
        suggestedSections: [
          {
            clipIndex: 1,
            title: 'The $50/hr Editing Trap',
            placeholderRange: '03:12 – 03:48 (Simulated sample range)',
            hook: 'You are an ideator, not an audio waveform aligner.',
            caption: 'Stop spending Saturday nights trimming silence from 40-minute audio tracks. Set up automated cutdowns so you can focus on building.',
            targetPlatform: 'Instagram'
          },
          {
            clipIndex: 2,
            title: 'The Golden Rule of First 3 Seconds',
            placeholderRange: '07:45 – 08:20 (Simulated sample range)',
            hook: 'Delete your 10-second animated intro right now.',
            caption: 'Nobody on TikTok cares about your logo animation. Jump straight into the conflict in second one.',
            targetPlatform: 'TikTok'
          },
          {
            clipIndex: 3,
            title: 'Repurposing without Redundancy',
            placeholderRange: '14:02 – 14:50 (Simulated sample range)',
            hook: 'How one podcast feeds all 4 major social networks.',
            caption: 'One long-form video = 3 vertical hooks, 1 LinkedIn takeaway, and 1 newsletter issue. Work once, publish everywhere.',
            targetPlatform: 'YouTube'
          }
        ]
      }
    }
  }
];

export const SEED_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 'sched-1',
    title: 'The 5 Bottlenecks in Creator Repurposing',
    platform: 'LinkedIn',
    type: 'text',
    scheduledDate: '2026-11-25',
    scheduledTime: '09:00',
    status: 'Scheduled',
    draftId: 'draft-seed-linkedin',
    isSample: true
  },
  {
    id: 'sched-2',
    title: 'Ep 42: Scaling AI Agent Workflows Launch',
    platform: 'Podcast',
    type: 'audio',
    scheduledDate: '2026-11-26',
    scheduledTime: '11:30',
    status: 'Scheduled',
    draftId: 'draft-seed-podcast',
    isSample: true
  },
  {
    id: 'sched-3',
    title: 'How Modern Creators Systematize Production (YouTube Premiere)',
    platform: 'YouTube',
    type: 'video',
    scheduledDate: '2026-11-28',
    scheduledTime: '17:00',
    status: 'Draft',
    draftId: 'draft-seed-video',
    isSample: true
  },
  {
    id: 'sched-4',
    title: 'Shorts Clip: Stop Editing Manually',
    platform: 'TikTok',
    type: 'clips',
    scheduledDate: '2026-11-29',
    scheduledTime: '12:15',
    status: 'Scheduled',
    draftId: 'draft-seed-clips',
    isSample: true
  }
];

export const SEED_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Clip: Stop Editing Everything Manually',
    action: 'Generated 3 vertical clip concepts',
    type: 'clips',
    platform: 'Instagram',
    timestamp: '2 hours ago',
    isSample: true
  },
  {
    id: 'act-2',
    title: 'Ep 42: Scaling AI Agent Workflows',
    action: 'Saved podcast episode script draft',
    type: 'audio',
    platform: 'Podcast',
    timestamp: '5 hours ago',
    isSample: true
  },
  {
    id: 'act-3',
    title: 'The 5 Bottlenecks in Creator Repurposing',
    action: 'Scheduled LinkedIn publication',
    type: 'text',
    platform: 'LinkedIn',
    timestamp: '1 day ago',
    isSample: true
  },
  {
    id: 'act-4',
    title: 'How Modern Creators Systematize Production',
    action: 'Drafted YouTube storyboard with 4 scenes',
    type: 'video',
    platform: 'YouTube',
    timestamp: '2 days ago',
    isSample: true
  }
];
