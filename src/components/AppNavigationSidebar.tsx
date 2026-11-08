import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/transmissionMediaData';
import { LessonTab } from '../types';
import { 
  Network, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  Activity, 
  Table2, 
  Award, 
  BookOpen, 
  X,
  GraduationCap
} from 'lucide-react';

interface AppNavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: LessonTab;
  onSelectTab: (tab: LessonTab) => void;
}

export const AppNavigationSidebar: React.FC<AppNavigationSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab
}) => {
  // Module 2 is open by default
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    'mod-1': false,
    'mod-2': true,
    'mod-3': false,
    'mod-4': false
  });

  const toggleModule = (id: string) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Course Lockup */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-md">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span>NetCademy Edu</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-semibold">
                  CS-302
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                Computer Networks &amp; Comms
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Progress Mini Card */}
        <div className="p-4 bg-slate-50/80 dark:bg-slate-850/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Course Progress</span>
            <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">64%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[64%]" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            <span>16 / 25 Lessons Done</span>
            <span>Est. 4h remaining</span>
          </div>
        </div>

        {/* Scrollable Curriculum Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 px-3 py-1">
            Course Curriculum
          </div>

          {COURSE_MODULES.map(module => {
            const isExpanded = openModules[module.id];
            const isCurrentModule = module.id === 'mod-2';

            return (
              <div
                key={module.id}
                className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
              >
                {/* Module Header Accordion Trigger */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full p-3 text-left flex items-start justify-between gap-2 cursor-pointer transition-colors ${
                    isCurrentModule
                      ? 'bg-cyan-50/60 dark:bg-cyan-950/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                      0{module.moduleNumber}.
                    </span>
                    <div>
                      <div className={`text-xs font-bold leading-tight ${
                        isCurrentModule ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {module.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {module.lessons.length} Lessons · {module.duration}
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                </button>

                {/* Sub-lessons */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800">
                    {module.lessons.map(lesson => {
                      const isMainTransmissionRoute = lesson.route.startsWith('/transmission-media');
                      
                      // Map lesson clicks to corresponding tab
                      const handleLessonClick = () => {
                        if (lesson.id === 'l-2-1') onSelectTab('overview');
                        else if (lesson.id === 'l-2-2' || lesson.id === 'l-2-3' || lesson.id === 'l-2-4') onSelectTab('guided');
                        else if (lesson.id === 'l-2-5' || lesson.id === 'l-2-6' || lesson.id === 'l-2-7') onSelectTab('unguided');
                        else if (lesson.id === 'l-2-8') onSelectTab('impairments');
                        else if (lesson.id === 'l-2-9') onSelectTab('lab');
                        else if (lesson.id === 'l-2-10') onSelectTab('quiz');
                        else onSelectTab('overview');

                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      };

                      // Check if active
                      let isActive = false;
                      if (isMainTransmissionRoute) {
                        if (lesson.id === 'l-2-1' && activeTab === 'overview') isActive = true;
                        if ((lesson.id === 'l-2-2' || lesson.id === 'l-2-3' || lesson.id === 'l-2-4') && activeTab === 'guided') isActive = true;
                        if ((lesson.id === 'l-2-5' || lesson.id === 'l-2-6' || lesson.id === 'l-2-7') && activeTab === 'unguided') isActive = true;
                        if (lesson.id === 'l-2-8' && activeTab === 'impairments') isActive = true;
                        if (lesson.id === 'l-2-9' && activeTab === 'lab') isActive = true;
                        if (lesson.id === 'l-2-10' && activeTab === 'quiz') isActive = true;
                      }

                      return (
                        <button
                          key={lesson.id}
                          onClick={handleLessonClick}
                          className={`w-full p-2.5 pl-6 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-cyan-100/70 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200 font-semibold border-l-2 border-cyan-500'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {lesson.isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : isActive ? (
                              <PlayCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Learning Shortcuts */}
          <div className="pt-3 space-y-1">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 px-3 py-1">
              Unit 2 Interactive Tools
            </div>

            <button
              onClick={() => {
                onSelectTab('lab');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2.5 text-xs transition-colors cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>Signal Telemetry Lab</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('quiz');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2.5 text-xs transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Unit 2 Mastery Quiz</span>
            </button>
          </div>

        </div>

        {/* Student Profile Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-xs shrink-0">
              <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                Samtse College of Education
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                Royal University of Bhutan
              </div>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
