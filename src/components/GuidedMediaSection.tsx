import React, { useState } from 'react';
import { TRANSMISSION_MEDIA_LIST } from '../data/transmissionMediaData';
import { CableLayerExplorer } from './CableLayerExplorer';
import { Cable, Zap, Shield, Sparkles, Check, ChevronRight, Waves } from 'lucide-react';

export const GuidedMediaSection: React.FC = () => {
  const guidedList = TRANSMISSION_MEDIA_LIST.filter(m => m.category === 'guided');
  const [activeMediaId, setActiveMediaId] = useState<string>('twisted-pair');
  
  // Interactive mini-experiment: Twisting crosstalk cancellation demo
  const [twistRate, setTwistRate] = useState<number>(12); // twists per foot (4 to 24)
  const noiseCancellationPercent = Math.min(99, Math.round(40 + (twistRate / 24) * 58));

  const currentMedia = guidedList.find(m => m.id === activeMediaId) || guidedList[0];

  return (
    <section id="guided-section" className="py-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 mb-1">
              <span>BOUNDED CONDUITS</span>
              <span aria-hidden="true">·</span>
              <span>PHYSICAL WIRED MEDIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Guided Transmission Media
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
              Guided media direct electromagnetic energy along a physical path through solid conductive or optical materials. The physical wave is confined within the boundaries of the medium.
            </p>
          </div>

          {/* Tab selector for the 3 guided cable types */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            {guidedList.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveMediaId(item.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeMediaId === item.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Active Cable Deep-Dive Card */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Overview & Key Stats */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                  Technical Profile
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentMedia.name}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 font-medium mt-1">
                  {currentMedia.tagline}
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentMedia.description}
              </p>

              {/* Subtypes Matrix */}
              {currentMedia.subtypes && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Standard Classifications & Standards:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentMedia.subtypes.map((sub, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{sub.description}</div>
                        <div className="text-[11px] font-mono font-medium text-cyan-600 dark:text-cyan-400 mt-2">{sub.keyMetric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advantages & Disadvantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block mb-2">
                    Key Advantages
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {currentMedia.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-2">
                    Physical Limitations
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {currentMedia.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Quick Specs Table */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 pb-2">
                Engineering Specifications
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Bandwidth Range</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.bandwidthRange}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Typical Data Rate</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.typicalDataRate}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Max Physical Span</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.maximumDistance}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Propagation Speed</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.propagationSpeed}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Attenuation Rate</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.attenuationRate}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">EMI Immunity</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">{currentMedia.emiImmunity}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Physical Security</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{currentMedia.securityLevel}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Standard Connectors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMedia.commonConnectors.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Twist Rate Physics Demonstration (for Twisted Pair) or Snell's Law (for Fiber) */}
          {activeMediaId === 'twisted-pair' && (
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-500" />
                    <span>Interactive Physics: Twist Density vs. Common-Mode Crosstalk</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Adjust twist pitch to observe how electromagnetic cancellation suppresses Near-End Crosstalk (NEXT).
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Noise Rejection: </span>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {noiseCancellationPercent}%
                  </span>
                </div>
              </div>

              {/* Twist slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Twist Density: <strong className="font-mono text-cyan-600 dark:text-cyan-400">{twistRate} twists / foot</strong> (Cat {twistRate < 8 ? '3' : twistRate < 14 ? '5e' : twistRate < 20 ? '6' : '6a/7'})</span>
                  <span className="text-slate-400">Higher twist pitch = tighter alternating cancellation</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  step="1"
                  value={twistRate}
                  onChange={(e) => setTwistRate(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* Visual Simulated Differential Waveform */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Differential Signal (V+ minus V- at Receiver)</span>
                  <span className="text-cyan-400">Residual Noise Margin: {(100 - noiseCancellationPercent).toFixed(1)}%</span>
                </div>
                <div className="h-16 relative flex items-center overflow-hidden">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 60">
                    <path
                      d={Array.from({ length: 40 }).map((_, i) => {
                        const x = i * 10;
                        const base = Math.sin((i / 40) * Math.PI * 4) * 18;
                        const noiseMagnitude = (100 - noiseCancellationPercent) * 0.18;
                        const noise = (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * noiseMagnitude;
                        const y = 30 + base + noise;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {activeMediaId === 'fiber-optic' && (
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Optics Principle: Snell&apos;s Law & Total Internal Reflection (TIR)</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Core refractive index <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">n₁ ≈ 1.47</code> is strictly greater than cladding index <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">n₂ ≈ 1.45</code>. Critical angle <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">θc = arcsin(1.45/1.47) ≈ 80.6°</code>. All rays striking the core-cladding boundary at angles greater than θc undergo 100% lossless reflection, preserving photons over 100+ km without leaking into ambient space.
              </p>
            </div>
          )}

        </div>

        {/* Cable Layer Explorer */}
        <CableLayerExplorer />

      </div>
    </section>
  );
};
