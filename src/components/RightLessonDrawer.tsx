import React, { useState, useEffect } from 'react';
import { LessonTab } from '../types';
import { Bookmark, FileText, CheckCircle2, Calculator, Info, Sparkles, Save, Trash2 } from 'lucide-react';

interface RightLessonDrawerProps {
  activeTab: LessonTab;
  onSelectTab: (tab: LessonTab) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
}

export const RightLessonDrawer: React.FC<RightLessonDrawerProps> = ({
  activeTab,
  onSelectTab,
  isBookmarked,
  onToggleBookmark,
  isLessonCompleted,
  onToggleComplete
}) => {
  const [studyNotes, setStudyNotes] = useState<string>(() => {
    return localStorage.getItem('tm_study_notes') || '';
  });
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  const handleSaveNotes = () => {
    localStorage.setItem('tm_study_notes', studyNotes);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleClearNotes = () => {
    setStudyNotes('');
    localStorage.removeItem('tm_study_notes');
  };

  const sectionsList: { id: LessonTab; label: string }[] = [
    { id: 'overview', label: '1. Overview & Classification' },
    { id: 'guided', label: '2. Guided (Wired) Cables' },
    { id: 'unguided', label: '3. Unguided (Wireless) Waves' },
    { id: 'impairments', label: '4. Transmission Impairments' },
    { id: 'lab', label: '5. Signal Physics Lab' },
    { id: 'quiz', label: '6. Assessment Quiz' }
  ];

  return (
    <aside className="w-full xl:w-72 shrink-0 space-y-6">
      
      {/* Lesson Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <button
          onClick={onToggleComplete}
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
            isLessonCompleted
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isLessonCompleted ? 'text-white' : 'text-slate-400'}`} />
          <span>{isLessonCompleted ? 'Completed ✓ (+100 XP)' : 'Mark as Completed'}</span>
        </button>

        <button
          onClick={onToggleBookmark}
          className={`w-full py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 cursor-pointer transition-all ${
            isBookmarked
              ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>{isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Lesson'}</span>
        </button>
      </div>

      {/* On This Page Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Lesson Contents
        </div>
        <div className="space-y-1">
          {sectionsList.map(sec => (
            <button
              key={sec.id}
              onClick={() => onSelectTab(sec.id)}
              className={`w-full p-2 rounded-lg text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === sec.id
                  ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{sec.label}</span>
              {activeTab === sec.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Physics Formulas Cheat Card */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
          <Calculator className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Key Physical Formulas</span>
        </div>
        <div className="space-y-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
          <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] text-slate-400 block font-sans">Shannon-Hartley Capacity:</span>
            C = B · log₂(1 + SNR)
          </div>
          <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] text-slate-400 block font-sans">Snell&apos;s Law Critical Angle:</span>
            θc = arcsin(n₂ / n₁)
          </div>
          <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] text-slate-400 block font-sans">Attenuation in Decibels:</span>
            dB = 10 · log₁₀(P₁ / P₂)
          </div>
          <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] text-slate-400 block font-sans">Propagation Delay:</span>
            t = d / (velocity_factor · c)
          </div>
        </div>
      </div>

      {/* Student Study Notes Scratchpad */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
            <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>My Study Notes</span>
          </div>
          <button
            onClick={handleClearNotes}
            title="Clear notes"
            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        <textarea
          rows={4}
          value={studyNotes}
          onChange={(e) => setStudyNotes(e.target.value)}
          placeholder="Jot down notes, questions for the instructor, or key definitions..."
          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none font-sans"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {showSavedToast ? 'Notes Saved!' : ''}
          </span>
          <button
            onClick={handleSaveNotes}
            className="px-3 py-1 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-md flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>
        </div>
      </div>

    </aside>
  );
};
