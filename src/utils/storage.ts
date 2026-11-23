import { Draft, ScheduledPost, ActivityItem } from '../types';
import { SEED_DRAFTS, SEED_SCHEDULED_POSTS, SEED_ACTIVITIES } from '../data/seedData';

const DRAFTS_KEY = 'incubrix_creator_drafts';
const SCHEDULED_KEY = 'incubrix_creator_scheduled';
const ACTIVITIES_KEY = 'incubrix_creator_activities';
const CREDITS_KEY = 'incubrix_creator_credits';

export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(DRAFTS_KEY)) {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(SEED_DRAFTS));
  }
  if (!localStorage.getItem(SCHEDULED_KEY)) {
    localStorage.setItem(SCHEDULED_KEY, JSON.stringify(SEED_SCHEDULED_POSTS));
  }
  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(SEED_ACTIVITIES));
  }
  if (!localStorage.getItem(CREDITS_KEY)) {
    localStorage.setItem(CREDITS_KEY, '300');
  }
}

export function getDrafts(): Draft[] {
  if (typeof window === 'undefined') return SEED_DRAFTS;
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? JSON.parse(raw) : SEED_DRAFTS;
  } catch (e) {
    console.error('Error loading drafts from localStorage', e);
    return SEED_DRAFTS;
  }
}

export function saveDraft(draft: Draft): void {
  const drafts = getDrafts();
  const existingIdx = drafts.findIndex((d) => d.id === draft.id);
  if (existingIdx >= 0) {
    drafts[existingIdx] = { ...draft, updatedAt: new Date().toISOString() };
  } else {
    drafts.unshift(draft);
  }
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));

  addActivity({
    id: 'act-' + Date.now(),
    title: draft.title,
    action: existingIdx >= 0 ? 'Updated draft' : 'Saved new draft',
    type: draft.type,
    platform: draft.platform,
    timestamp: 'Just now',
    isSample: false
  });
}

export function deleteDraft(id: string): void {
  const drafts = getDrafts().filter((d) => d.id !== id);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function getScheduledPosts(): ScheduledPost[] {
  if (typeof window === 'undefined') return SEED_SCHEDULED_POSTS;
  try {
    const raw = localStorage.getItem(SCHEDULED_KEY);
    return raw ? JSON.parse(raw) : SEED_SCHEDULED_POSTS;
  } catch (e) {
    console.error('Error loading scheduled posts', e);
    return SEED_SCHEDULED_POSTS;
  }
}

export function saveScheduledPost(post: ScheduledPost): void {
  const posts = getScheduledPosts();
  const existingIdx = posts.findIndex((p) => p.id === post.id);
  if (existingIdx >= 0) {
    posts[existingIdx] = post;
  } else {
    posts.push(post);
  }
  localStorage.setItem(SCHEDULED_KEY, JSON.stringify(posts));

  addActivity({
    id: 'act-' + Date.now(),
    title: post.title,
    action: `Scheduled for ${post.scheduledDate} at ${post.scheduledTime}`,
    type: post.type,
    platform: post.platform,
    timestamp: 'Just now',
    isSample: false
  });
}

export function deleteScheduledPost(id: string): void {
  const posts = getScheduledPosts().filter((p) => p.id !== id);
  localStorage.setItem(SCHEDULED_KEY, JSON.stringify(posts));
}

export function getActivities(): ActivityItem[] {
  if (typeof window === 'undefined') return SEED_ACTIVITIES;
  try {
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    return raw ? JSON.parse(raw) : SEED_ACTIVITIES;
  } catch (e) {
    console.error('Error loading activities', e);
    return SEED_ACTIVITIES;
  }
}

export function addActivity(activity: ActivityItem): void {
  const activities = getActivities();
  activities.unshift(activity);
  // Keep last 15
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities.slice(0, 15)));
}

export function getCredits(): number {
  if (typeof window === 'undefined') return 300;
  const raw = localStorage.getItem(CREDITS_KEY);
  return raw ? parseInt(raw, 10) : 300;
}

export function deductCredit(amount: number = 5): number {
  const current = getCredits();
  const updated = Math.max(0, current - amount);
  localStorage.setItem(CREDITS_KEY, updated.toString());
  return updated;
}
