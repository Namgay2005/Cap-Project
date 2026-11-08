import React, { useState } from 'react';
import { IMPAIRMENTS_DATA } from '../data/transmissionMediaData';
import { AlertCircle, Waves, VolumeX, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const TransmissionImpairmentsSection: React.FC = () => {
  // Interactive mini calculator for decibel loss
  const [p1, setP1] = useState<number>(100); // Input power in mW
  const [p2, setP2] = useState<number>(25);  // Output power in mW

  const dbLoss = p2 > 0 ? Number((10 * Math.log10(p1 / p2)).toFixed(2)) : 0;
  const powerLossPercent = Math.max(0, Math.min(100, Math.round(((p1 - p2) / p1) * 100)));

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Impairment Overview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
            Signal Degradation Mechanics
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Three Transmission Impairments
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Signals travel through transmission media which are imperfect. The signal at the start of the medium is never identical to the signal received at the end. The three fundamental causes of transmission impairment are <strong>Attenuation</strong>, <strong>Distortion</strong>, and <strong>Noise</strong>.
          </p>
        </div>

        {/* 3 Impairment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {IMPAIRMENTS_DATA.map(imp => (
            <div
              key={imp.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 space-y-3"
            >
              <div className="flex items-center gap-2">
                {imp.id === 'attenuation' && <AlertCircle className="w-5 h-5 text-rose-500" />}
                {imp.id === 'distortion' && <Waves className="w-5 h-5 text-amber-500" />}
                {imp.id === 'noise' && <VolumeX className="w-5 h-5 text-indigo-500" />}
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {imp.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {imp.cause}
              </p>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-cyan-700 dark:text-cyan-300">
                {imp.equation}
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <strong>Remediation:</strong> {imp.remedy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Decibel Loss Calculator */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
            Practical Calculation Lab
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Attenuation &amp; Decibel (dB) Power Calculator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculate signal loss in decibels using the fundamental ratio formula <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">dB = 10 · log₁₀(P₁ / P₂)</code>:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Transmitted Input Power (P₁):</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{p1} mW</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={p1}
                onChange={(e) => setP1(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Received Output Power (P₂):</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{p2} mW</span>
              </div>
              <input
                type="range"
                min="1"
                max={p1}
                step="1"
                value={p2}
                onChange={(e) => setP2(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              When a signal loses half its power (<code className="font-mono">P₂ = 0.5 · P₁</code>), attenuation is approximately <strong>-3.01 dB</strong> (the 3dB half-power point).
            </div>
          </div>

          {/* Result Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Calculated Loss in Decibels</div>
            <div className="text-4xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
              -{dbLoss} <span className="text-base font-normal">dB</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Signal Power Lost: <strong className="font-mono">{powerLossPercent}%</strong>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${powerLossPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
