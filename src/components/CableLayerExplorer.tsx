import React, { useState } from 'react';
import { TRANSMISSION_MEDIA_LIST } from '../data/transmissionMediaData';
import { CableLayer, MediaType } from '../types';
import { Layers, ShieldCheck, Cpu, Info, CheckCircle2 } from 'lucide-react';

export const CableLayerExplorer: React.FC = () => {
  const guidedMedia = TRANSMISSION_MEDIA_LIST.filter(m => m.category === 'guided');
  const [selectedMediaId, setSelectedMediaId] = useState<MediaType>('fiber-optic');
  
  const currentMedia = guidedMedia.find(m => m.id === selectedMediaId) || guidedMedia[0];
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const activeLayer = currentMedia.layers ? currentMedia.layers[selectedLayerIndex] : null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
            Physical Construction Explorer
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Cable Anatomy & Cross-Section Engineering
          </h3>
        </div>

        {/* Cable Switcher Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg shrink-0">
          {guidedMedia.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMediaId(m.id);
                setSelectedLayerIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedMediaId === m.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Cross-Section Diagram */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-md">
            <img
              src="/src/assets/images/guided_media_cables_1793336394820.jpg"
              alt="Detailed Cross-sections of Twisted Pair, Coaxial, and Fiber Optic cables"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span className="font-medium">Active Focus: {currentMedia.name}</span>
              <span className="text-slate-400 dark:text-slate-500 font-mono">
                {currentMedia.layers?.length || 0} Engineered Layers
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-cyan-800 dark:text-cyan-300">Physics Principle:</span>{' '}
            {currentMedia.keyPhysics}
          </div>
        </div>

        {/* Right Column: Interactive Layer Inspector */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Select a layer to examine its physical function and materials:
            </div>
            <div className="space-y-2">
              {currentMedia.layers?.map((layer, index) => {
                const isSelected = index === selectedLayerIndex;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerIndex(index)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 dark:border-cyan-400 bg-white dark:bg-slate-800 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                        style={{ backgroundColor: layer.colorHex }}
                      />
                      <div>
                        <div className={`text-sm font-semibold ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                          {index + 1}. {layer.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {layer.material}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
                        {layer.specs}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layer Deep Dive Card */}
          {activeLayer && (
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-cyan-200/80 dark:border-cyan-800/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: activeLayer.colorHex }}
                  />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {activeLayer.name}
                  </h4>
                </div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded">
                  {activeLayer.specs}
                </span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 block mb-1">
                  Engineered Material
                </span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {activeLayer.material}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 block mb-1">
                  Electromagnetic / Structural Role
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeLayer.purpose}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
