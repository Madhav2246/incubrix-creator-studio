import React, { useState } from 'react';
import { ScheduledPost, Platform, ContentType } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  AlertCircle,
  FileText,
  Mic,
  Video,
  Scissors,
  Edit,
  Info
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

interface CalendarProps {
  scheduledPosts: ScheduledPost[];
  onSavePost: (post: ScheduledPost) => void;
  onDeletePost: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  scheduledPosts,
  onSavePost,
  onDeletePost,
  onShowToast
}) => {
  // Calendar View State: Year 2026, Month November (0-indexed 10)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 24)); // Nov 24, 2026
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');
  const [type, setType] = useState<ContentType>('text');
  const [date, setDate] = useState('2026-11-27');
  const [time, setTime] = useState('10:00');

  const platforms: Platform[] = ['LinkedIn', 'YouTube', 'Instagram', 'X', 'Podcast', 'TikTok'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const openNewScheduleModal = (prefillDate?: string) => {
    setEditingPostId(null);
    setTitle('');
    setPlatform('LinkedIn');
    setType('text');
    setDate(prefillDate || '2026-11-27');
    setTime('10:00');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      onShowToast('Please provide a post title.', 'warning');
      return;
    }

    const newPost: ScheduledPost = {
      id: editingPostId || 'sched-' + Date.now(),
      title,
      platform,
      type,
      scheduledDate: date,
      scheduledTime: time,
      status: 'Scheduled',
      isSample: false
    };

    onSavePost(newPost);
    setIsModalOpen(false);
    onShowToast(`Post "${title}" scheduled for ${date} at ${time}.`, 'success');
  };

  // Generate Calendar Days for Current Month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getFormatIcon = (t: ContentType) => {
    switch (t) {
      case 'text':
        return <FileText className="w-3 h-3 text-indigo-600" />;
      case 'audio':
        return <Mic className="w-3 h-3 text-purple-600" />;
      case 'video':
        return <Video className="w-3 h-3 text-rose-600" />;
      case 'clips':
        return <Scissors className="w-3 h-3 text-amber-600" />;
      case 'editor':
        return <Edit className="w-3 h-3 text-emerald-600" />;
    }
  };

  // Filter posts for this month
  const getPostsForDay = (dayNum: number) => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return scheduledPosts.filter((p) => p.scheduledDate === dateStr);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
            Publishing Calendar & Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Map out publishing cadence and organize multi-platform delivery timelines.
          </p>
        </div>

        <button
          onClick={() => openNewScheduleModal()}
          className="flex items-center space-x-2 bg-incubrix-600 hover:bg-incubrix-700 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Post</span>
        </button>
      </div>

      {/* Mandatory Honesty Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs flex items-start space-x-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-amber-800 leading-relaxed">
          <strong className="font-semibold">Demo Scheduling Notice:</strong> Posts scheduled here are saved locally for workflow planning. This interactive prototype does not publish to external social media accounts or connect to live publishing APIs.
        </div>
      </div>

      {/* Calendar Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">View:</span>
          <div className="bg-slate-100 p-0.5 rounded-lg flex space-x-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'month' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'week' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Week View
            </button>
          </div>
        </div>
      </div>

      {/* Month Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 border-b border-slate-200/80 bg-slate-50/70 text-center py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Day Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[105px] bg-slate-50/30 p-2 text-slate-300" />
          ))}

          {/* Days of month */}
          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayPosts = getPostsForDay(dayNum);
            const isToday = dayNum === 24 && month === 10 && year === 2026;

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => {
                  const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                  const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
                  openNewScheduleModal(`${year}-${formattedMonth}-${formattedDay}`);
                }}
                className={`min-h-[105px] p-2 hover:bg-purple-50/20 transition-colors flex flex-col justify-between cursor-pointer group ${
                  isToday ? 'bg-purple-50/40 ring-1 ring-inset ring-incubrix-400' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday
                        ? 'bg-incubrix-600 text-white shadow-xs'
                        : 'text-slate-700 group-hover:text-incubrix-600'
                    }`}
                  >
                    {dayNum}
                  </span>
                  <Plus className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-incubrix-600 transition-opacity" />
                </div>

                {/* Scheduled Posts in Cell */}
                <div className="space-y-1 mt-1 flex-1">
                  {dayPosts.map((p) => (
                    <div
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/90 hover:border-incubrix-300 transition-colors shadow-2xs flex items-center justify-between group/post"
                    >
                      <div className="flex items-center space-x-1.5 overflow-hidden">
                        {getFormatIcon(p.type)}
                        <span className="text-[10px] font-semibold text-slate-800 truncate max-w-[80px]">
                          {p.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 shrink-0">
                        <span className="text-[9px] font-mono text-slate-400">
                          {p.scheduledTime}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePost(p.id);
                            onShowToast(`Removed post from calendar`, 'info');
                          }}
                          className="opacity-0 group-hover/post:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 rounded transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Schedule New Post"
          subtitle="Configure publishing timeline and platform destination (Demo Mode)"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Post Title / Topic <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Masterclass Breakdown: AI Content Repurposing"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Platform
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Format Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ContentType)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900 cursor-pointer"
                >
                  <option value="text">Text Post</option>
                  <option value="audio">Audio / Podcast</option>
                  <option value="video">Video Script</option>
                  <option value="clips">Short Clips</option>
                  <option value="editor">Editor Article</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Publication Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-incubrix-500 text-slate-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-xs font-semibold text-white bg-incubrix-600 hover:bg-incubrix-700 rounded-xl shadow-xs"
              >
                Save to Calendar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
