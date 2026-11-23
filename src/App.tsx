import React, { useState, useEffect } from 'react';
import { Sidebar, PageId } from './components/common/Sidebar';
import { TopBar } from './components/common/TopBar';
import { ToastContainer } from './components/common/Toast';
import { Dashboard } from './pages/Dashboard';
import { CreateContent } from './pages/CreateContent';
import { Templates } from './pages/Templates';
import { ContentLibrary } from './pages/ContentLibrary';
import { Calendar } from './pages/Calendar';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import {
  ContentType,
  TemplateId,
  Draft,
  ScheduledPost,
  ActivityItem,
  ToastMessage
} from './types';
import {
  initializeStorage,
  getDrafts,
  deleteDraft,
  getScheduledPosts,
  saveScheduledPost,
  deleteScheduledPost,
  getActivities,
  getCredits
} from './utils/storage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [preselectedType, setPreselectedType] = useState<ContentType>('text');
  const [preselectedTemplate, setPreselectedTemplate] = useState<TemplateId | null>(null);
  const [editingDraft, setEditingDraft] = useState<Draft | null>(null);

  // App Data State
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [credits, setCredits] = useState<number>(300);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize and load from localStorage
  useEffect(() => {
    initializeStorage();
    refreshData();
  }, []);

  const refreshData = () => {
    setDrafts(getDrafts());
    setScheduledPosts(getScheduledPosts());
    setActivities(getActivities());
    setCredits(getCredits());
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation router
  const handleNavigate = (page: PageId, type?: ContentType) => {
    if (type) {
      setPreselectedType(type);
      setPreselectedTemplate(null);
      setEditingDraft(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    setPreselectedTemplate(templateId);
    setEditingDraft(null);
    setCurrentPage('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Template loaded. Customize details and generate your preview.`, 'info');
  };

  const handleOpenDraftForEditing = (draft: Draft) => {
    setEditingDraft(draft);
    setPreselectedTemplate(null);
    setCurrentPage('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Editing draft: "${draft.title.slice(0, 30)}..."`, 'info');
  };

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id);
    refreshData();
    showToast('Draft removed from Content Library.', 'info');
  };

  const handleSaveScheduledPost = (post: ScheduledPost) => {
    saveScheduledPost(post);
    refreshData();
  };

  const handleDeleteScheduledPost = (id: string) => {
    deleteScheduledPost(id);
    refreshData();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(p) => {
          setEditingDraft(null);
          setPreselectedTemplate(null);
          handleNavigate(p);
        }}
        savedDraftsCount={drafts.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Navigation Bar */}
        <TopBar credits={credits} />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <Dashboard
              onNavigate={handleNavigate}
              draftsCount={drafts.length}
              scheduledCount={scheduledPosts.length}
              credits={credits}
              activities={activities}
            />
          )}

          {currentPage === 'create' && (
            <CreateContent
              initialType={preselectedType}
              initialTemplate={preselectedTemplate}
              editingDraft={editingDraft}
              onShowToast={showToast}
              onDraftSaved={() => refreshData()}
            />
          )}

          {currentPage === 'templates' && (
            <Templates onSelectTemplate={handleSelectTemplate} />
          )}

          {currentPage === 'library' && (
            <ContentLibrary
              drafts={drafts}
              onOpenDraft={handleOpenDraftForEditing}
              onDeleteDraft={handleDeleteDraft}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'calendar' && (
            <Calendar
              scheduledPosts={scheduledPosts}
              onSavePost={handleSaveScheduledPost}
              onDeletePost={handleDeleteScheduledPost}
              onShowToast={showToast}
            />
          )}

          {currentPage === 'analytics' && <Analytics />}

          {currentPage === 'settings' && <Settings credits={credits} />}
        </main>
      </div>

      {/* Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
