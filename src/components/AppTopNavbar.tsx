import React from 'react';
import { Menu, Search, Flame, Zap, Bell, Sun, Moon, ChevronRight, BookOpen, Layers } from 'lucide-react';

interface AppTopNavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  activeTabTitle: string;
}

export const AppTopNavbar: React.FC<AppTopNavbarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  isDark,
  onToggleTheme,
  activeTabTitle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors h-16 flex items-center justify-between px-4 sm:px-6 gap-4">
      
      {/* Left: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Course Navigation"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Hierarchy */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer hidden sm:inline">
            Computer Networks
          </span>
          <ChevronRight className="w-3 h-3 shrink-0 hidden sm:inline text-slate-400" />
          <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer hidden md:inline">
            Module 2: Physical Layer
          </span>
          <ChevronRight className="w-3 h-3 shrink-0 hidden md:inline text-slate-400" />
          <span className="font-semibold text-cyan-600 dark:text-cyan-400 truncate">
            Transmission Media
          </span>
          <span className="hidden lg:inline text-slate-400">/</span>
          <span className="hidden lg:inline text-slate-600 dark:text-slate-300 truncate font-mono text-[11px]">
            {activeTabTitle}
          </span>
        </nav>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search curriculum, cables, formulas..."
          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Right: Gamified Stats, Notifications, Theme, Student Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Streak Counter */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs font-semibold text-amber-700 dark:text-amber-400">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>7d Streak</span>
        </div>

        {/* XP Counter */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-900/60 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
          <Zap className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
          <span>1,450 XP</span>
        </div>

        {/* Dark/Light Toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Student Avatar Lockup */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            KW
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">Karma W.</div>
            <div className="text-[10px] text-slate-400 font-mono">SCE-RUB · CS-302</div>
          </div>
        </div>

      </div>

    </header>
  );
};
