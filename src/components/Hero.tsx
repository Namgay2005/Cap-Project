import React from 'react';
import { ArrowRight, Cable, Radio, Activity, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Route Kicker & Subtitle */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">OSI LAYER 1</span>
          <span aria-hidden="true">·</span>
          <span>PHYSICAL LAYER</span>
          <span aria-hidden="true">·</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
            preview-route: /transmission-media
          </span>
        </div>

        {/* 2-Column Split: Headline & Narrative on Left, Visual Asset on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">
          
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Transmission Media in Computer Networks
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Transmission media form the physical backbone of all computer communications. Situated at the lowest layer of the OSI model, they carry raw bit streams as physical voltage pulses, light rays, or electromagnetic waves across physical space.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('guided')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Cable className="w-4 h-4 text-cyan-400 dark:text-white" />
                <span>Explore Guided Cables</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('unguided')}
                className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Radio className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Explore Wireless Media</span>
              </button>

              <button
                onClick={() => onNavigate('simulator')}
                className="px-5 py-2.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 rounded-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Live Signal Simulator</span>
              </button>
            </div>

            {/* Quick Definition Strip */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Guided (Bounded) Media
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Physical solid conductors or waveguides (Twisted Pair, Coaxial, Fiber Optics) constraining signals along a closed conduit.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Unguided (Wireless) Media
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Electromagnetic waves (Radio, Microwave, Infrared) radiating through air, vacuum, or seawater without physical tethering.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-xl bg-slate-950 group">
              <img
                src="/src/assets/images/hero_transmission_media_1793336375230.jpg"
                alt="Educational illustration showing Guided Fiber Optics and Unguided Wireless Electromagnetic Waves"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 flex items-center justify-between pointer-events-none">
                <span className="font-medium tracking-wide">Comparative Physical Waveforms</span>
                <span className="font-mono text-cyan-300">TIR Photons vs. RF Modulation</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Technical Metrics / Core Physical Invariants Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Theoretical Velocity</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">~0.64c – 1.0c</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">200,000 to 300,000 km/s</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Max Copper Segment</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">100 meters</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Ethernet IEEE 802.3 standard</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Single-Mode Reach</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">100+ km</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Zero repeater requirement</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Frequency Spectrum</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">3 kHz – 400 THz</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Radio to Optical frequencies</div>
          </div>
        </div>

      </div>
    </section>
  );
};
