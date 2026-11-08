import React, { useState } from 'react';
import { TRANSMISSION_MEDIA_LIST } from '../data/transmissionMediaData';
import { MediaCategory, MediaSpec } from '../types';
import { ArrowUpDown, Search, Filter, Check, ShieldCheck, Zap } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | MediaCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof MediaSpec>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredMedia = TRANSMISSION_MEDIA_LIST.filter(media => {
    if (filterCategory !== 'all' && media.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        media.name.toLowerCase().includes(q) ||
        media.tagline.toLowerCase().includes(q) ||
        media.commonConnectors.some(c => c.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSort = (key: keyof MediaSpec) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <section id="matrix-section" className="py-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 mb-1">
              <span>ENGINEERING TRADE-OFFS</span>
              <span aria-hidden="true"> · </span>
              <span>SYNTHESIS & SPECIFICATION MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Comprehensive Media Comparison Matrix
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Cross-compare physical propagation metrics, channel capacity, distance boundaries, and environmental resilience across all transmission types.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search media or connector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-56"
              />
            </div>

            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Media ({TRANSMISSION_MEDIA_LIST.length})
              </button>
              <button
                onClick={() => setFilterCategory('guided')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === 'guided'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Guided (Wired)
              </button>
              <button
                onClick={() => setFilterCategory('unguided')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === 'unguided'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Unguided (Wireless)
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 whitespace-nowrap">Medium Name</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Category</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Bandwidth</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Max Span</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Velocity</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">EMI Immunity</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Security Level</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Relative Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMedia.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-850/60 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      <div>{m.name}</div>
                      <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 truncate max-w-xs">
                        {m.tagline}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        m.category === 'guided'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      }`}>
                        {m.category === 'guided' ? 'Guided (Cabled)' : 'Unguided (Wave)'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {m.bandwidthRange}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {m.maximumDistance}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {m.propagationSpeed}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`font-semibold ${
                        m.emiImmunity === 'Immune'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : m.emiImmunity === 'High'
                          ? 'text-cyan-600 dark:text-cyan-400'
                          : m.emiImmunity === 'Moderate'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {m.emiImmunity}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                      {m.securityLevel}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {m.costLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
