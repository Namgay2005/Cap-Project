import React from 'react';
import { Network, Sun, Moon, Sparkles, Activity } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  activeSection,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 block">
              Transmission Media
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Navigation Links (single line, no wrap) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('overview')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === 'overview'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('guided')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === 'guided'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Guided Media
          </button>
          <button
            onClick={() => onNavigate('unguided')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === 'unguided'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Unguided Media
          </button>
          <button
            onClick={() => onNavigate('simulator')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === 'simulator'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Signal Lab Simulator
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
              activeSection === 'quiz'
                ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Knowledge Quiz
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onNavigate('simulator')}
            className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Launch Lab</span>
          </button>
        </div>
      </div>
    </header>
  );
};
