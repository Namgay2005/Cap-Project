import React, { useState } from 'react';
import { TRANSMISSION_MEDIA_LIST } from '../data/transmissionMediaData';
import { Radio, Wifi, Satellite, Sun, ShieldAlert, Check, HelpCircle, ArrowUpRight } from 'lucide-react';

export const UnguidedMediaSection: React.FC = () => {
  const unguidedList = TRANSMISSION_MEDIA_LIST.filter(m => m.category === 'unguided');
  const [activeMediaId, setActiveMediaId] = useState<string>('radio');

  const currentMedia = unguidedList.find(m => m.id === activeMediaId) || unguidedList[0];

  // Frequency band explorer state
  const [activeBandIndex, setActiveBandIndex] = useState<number>(0);
  const frequencyBands = [
    { band: 'VLF / LF (< 300 kHz)', mode: 'Ground Wave', behavior: 'Diffracts around Earth curvature; penetrates seawater for submarine comms' },
    { band: 'MF / HF (300 kHz – 30 MHz)', mode: 'Sky Wave (Ionospheric)', behavior: 'Reflects off atmospheric ionosphere layers for global long-range shortwave' },
    { band: 'VHF / UHF (30 MHz – 1 GHz)', mode: 'Line-of-Sight Space Wave', behavior: 'Penetrates walls; used for FM radio, broadcast TV, cellular LTE, 2.4 GHz Wi-Fi' },
    { band: 'Microwave (1 GHz – 300 GHz)', mode: 'Directional Focused Beam', behavior: 'Requires parabolic dish alignment; subject to rain fade; satellite & 5G mmWave' },
    { band: 'Infrared (300 GHz – 400 THz)', mode: 'Optical Line-of-Sight', behavior: 'Absorbed by drywall and opaque materials; confined to single-room environments' }
  ];

  return (
    <section id="unguided-section" className="py-14 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 mb-1">
              <span>UNBOUNDED BROADCAST</span>
              <span aria-hidden="true">·</span>
              <span>WIRELESS ELECTROMAGNETIC WAVES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Unguided Transmission Media
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
              Unguided media transport electromagnetic waves without physical solid conductors. Transmission radiates through air, vacuum, or water using antennas that emit into ambient free space.
            </p>
          </div>

          {/* Media tab selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            {unguidedList.map(item => (
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

        {/* Technical Infographic Diagram Showcase */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-lg">
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Radio Wave vs. Microwave vs. Infrared
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Propagation Modes & Signal Dispersion Diagram
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Free-Space Radiation Dynamics
            </span>
          </div>

          <div className="relative">
            <img
              src="/src/assets/images/wireless_transmission_waves_1793336410344.jpg"
              alt="Unguided Wireless Transmission Media Types: Radio Waves, Microwaves, Infrared"
              className="w-full h-auto object-cover max-h-[550px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Active Unguided Media Deep Dive */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                  Wireless Physical Characteristics
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

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">Radiation Principle:</span>
                {currentMedia.keyPhysics}
              </div>

              {/* Subtypes breakdown */}
              {currentMedia.subtypes && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Transmission Modes & Bands:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentMedia.subtypes.map((sub, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">{sub.description}</div>
                        <div className="text-[11px] font-mono font-medium text-cyan-600 dark:text-cyan-400 mt-2">{sub.keyMetric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advantages and Limitations */}
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
                    Environmental Constraints
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
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 pb-2">
                Atmospheric & Propagation Specs
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Frequency Band</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.bandwidthRange}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Data Throughput</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.typicalDataRate}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Max Effective Span</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{currentMedia.maximumDistance}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Free Space Velocity</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">c (300,000 km/s)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Path Loss Model</span>
                  <span className="font-mono text-[11px] text-slate-900 dark:text-white">FSPL ∝ d² · f²</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Interference Risk</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">High (shared spectrum)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Eavesdrop Vulnerability</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{currentMedia.securityLevel}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Standard Antenna / Transducers:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMedia.commonConnectors.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-slate-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Spectrum & Atmospheric Band Explorer */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Electromagnetic Spectrum Allocation & Atmospheric Interaction
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select an RF/optical band to inspect how frequency dictates line-of-sight requirements and barrier penetration:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {frequencyBands.map((fb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBandIndex(idx)}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    activeBandIndex === idx
                      ? 'border-cyan-500 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  <div className={`text-xs font-bold ${activeBandIndex === idx ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                    {fb.band}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {fb.mode}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-cyan-200/80 dark:border-cyan-800/50 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Atmospheric Behavior:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {frequencyBands[activeBandIndex].behavior}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
