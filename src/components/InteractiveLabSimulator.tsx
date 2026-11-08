import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TRANSMISSION_MEDIA_LIST } from '../data/transmissionMediaData';
import { MediaType, SimulationParams, SimulationResults } from '../types';
import { Activity, Play, RotateCcw, AlertTriangle, CheckCircle, Zap, Shield, Gauge, Send, HelpCircle } from 'lucide-react';

export const InteractiveLabSimulator: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaType>('twisted-pair');
  
  // Controls
  const [distance, setDistance] = useState<number>(50); // meters or km depending on media
  const [noiseLevel, setNoiseLevel] = useState<number>(10); // dB
  const [inputPower, setInputPower] = useState<number>(15); // dBm (e.g. standard transceiver output)
  const [isTransmitting, setIsTransmitting] = useState<boolean>(true);
  const [packetStatus, setPacketStatus] = useState<'idle' | 'in-transit' | 'delivered' | 'corrupted'>('idle');
  const [lastDeliveredBits, setLastDeliveredBits] = useState<{ total: number; errors: number; transitMs: number } | null>(null);

  const activeMediaSpec = TRANSMISSION_MEDIA_LIST.find(m => m.id === selectedMedia) || TRANSMISSION_MEDIA_LIST[0];

  // Adjust distance scale defaults based on selected media type
  useEffect(() => {
    if (selectedMedia === 'twisted-pair') setDistance(60);
    else if (selectedMedia === 'coaxial') setDistance(150);
    else if (selectedMedia === 'fiber-optic') setDistance(25); // km
    else if (selectedMedia === 'radio') setDistance(80); // meters
    else if (selectedMedia === 'microwave') setDistance(35); // km
    else if (selectedMedia === 'infrared') setDistance(6); // meters
  }, [selectedMedia]);

  // Max and units based on media
  const distanceConfig = useMemo(() => {
    switch (selectedMedia) {
      case 'twisted-pair':
        return { min: 1, max: 150, unit: 'meters', step: 1, threshold: 100, note: 'IEEE 802.3 standard limit is 100m' };
      case 'coaxial':
        return { min: 10, max: 600, unit: 'meters', step: 5, threshold: 500, note: '10BASE5 Thicknet limit is 500m' };
      case 'fiber-optic':
        return { min: 1, max: 100, unit: 'kilometers', step: 1, threshold: 80, note: 'Single-mode optical reach without active repeaters' };
      case 'radio':
        return { min: 5, max: 300, unit: 'meters', step: 5, threshold: 120, note: 'Standard indoor 2.4/5GHz Wi-Fi attenuation range' };
      case 'microwave':
        return { min: 1, max: 60, unit: 'kilometers', step: 1, threshold: 45, note: 'Terrestrial LOS tower hop limit due to Earth curvature' };
      case 'infrared':
        return { min: 0.5, max: 15, unit: 'meters', step: 0.5, threshold: 10, note: 'Indoor diffuse / direct optical line-of-sight' };
    }
  }, [selectedMedia]);

  // Scientific calculation engine based on physical equations
  const simulationResults: SimulationResults = useMemo(() => {
    let attenuationDb = 0;
    let bandwidthMhz = 100;

    if (selectedMedia === 'twisted-pair') {
      // ~22 dB per 100m for Cat 6 at 100MHz
      attenuationDb = (distance / 100) * 22;
      bandwidthMhz = 250;
    } else if (selectedMedia === 'coaxial') {
      // ~7 dB per 100m for RG-6 at 100MHz
      attenuationDb = (distance / 100) * 8.5;
      bandwidthMhz = 750;
    } else if (selectedMedia === 'fiber-optic') {
      // 0.25 dB per km at 1550nm for SMF
      attenuationDb = distance * 0.25;
      bandwidthMhz = 10000; // 10 GHz base channel
    } else if (selectedMedia === 'radio') {
      // Free Space Path Loss (FSPL) in dB: 20 log10(d) + 20 log10(f) - 27.55
      const dMeters = Math.max(1, distance);
      attenuationDb = 20 * Math.log10(dMeters) + 20 * Math.log10(2400) - 27.55 - 20; // with modest antenna gain
      bandwidthMhz = 80;
    } else if (selectedMedia === 'microwave') {
      // 10 GHz microwave link across km
      const dKm = Math.max(0.5, distance);
      attenuationDb = 92.45 + 20 * Math.log10(dKm) + 20 * Math.log10(11) - 40; // dish gains
      bandwidthMhz = 500;
    } else if (selectedMedia === 'infrared') {
      // Exponential optical path absorption
      attenuationDb = 15 + distance * 3.5;
      bandwidthMhz = 16;
    }

    attenuationDb = Math.max(0.1, Number(attenuationDb.toFixed(2)));

    // Received power P_rx = P_in - Attenuation
    const receivedPowerDbm = Number((inputPower - attenuationDb).toFixed(1));

    // Effective noise floor: -90 dBm + noiseLevel
    const noiseFloorDbm = -85 + noiseLevel;
    const snrDb = Number(Math.max(-20, Math.min(60, receivedPowerDbm - noiseFloorDbm)).toFixed(1));

    // Propagation delay: t = distance / velocity
    const speedOfLight = 300000; // km/s
    const effectiveSpeedKmS = speedOfLight * activeMediaSpec.velocityFactor;
    const distanceInKm = distanceConfig.unit === 'meters' ? distance / 1000 : distance;
    const propagationDelayMs = Number(((distanceInKm / effectiveSpeedKmS) * 1000).toFixed(4));

    // Shannon Channel Capacity C = B * log2(1 + SNR_linear)
    const snrLinear = Math.pow(10, snrDb / 10);
    const capacityMbps = snrDb <= 0 ? 0 : Number((bandwidthMhz * Math.log2(1 + snrLinear)).toFixed(1));

    // Bit Error Rate (BER) estimation
    let ber = 0;
    if (snrDb > 25) ber = 1e-9;
    else if (snrDb > 18) ber = 1e-6;
    else if (snrDb > 12) ber = 1e-4;
    else if (snrDb > 6) ber = 1e-2;
    else ber = 0.25;

    // Signal integrity score: 0 to 100%
    const signalIntegrityPercent = Math.max(0, Math.min(100, Math.round(
      (snrDb > 0 ? (snrDb / 35) * 100 : 0) * (distance <= distanceConfig.threshold ? 1 : 0.6)
    )));

    return {
      attenuationDb,
      receivedPowerDbm,
      snrDb,
      propagationDelayMs,
      channelCapacityMbps: capacityMbps,
      bitErrorRate: ber,
      signalIntegrityPercent
    };
  }, [selectedMedia, distance, noiseLevel, inputPower, activeMediaSpec, distanceConfig]);

  // Handle Packet Transmission Trigger
  const handleSendPacket = () => {
    if (packetStatus === 'in-transit') return;
    setPacketStatus('in-transit');
    
    setTimeout(() => {
      const isCorrupted = simulationResults.signalIntegrityPercent < 35 || simulationResults.snrDb < 4;
      const totalBits = 8192; // 1 KB payload
      const estimatedErrors = isCorrupted
        ? Math.floor(totalBits * Math.max(0.05, simulationResults.bitErrorRate))
        : 0;

      setPacketStatus(isCorrupted ? 'corrupted' : 'delivered');
      setLastDeliveredBits({
        total: totalBits,
        errors: estimatedErrors,
        transitMs: Number(Math.max(0.1, simulationResults.propagationDelayMs * 2).toFixed(3))
      });

      setTimeout(() => {
        setPacketStatus('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <section id="simulator-section" className="py-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 mb-1">
              <span>PHYSICS & NETWORK TELEMETRY SANDBOX</span>
              <span aria-hidden="true">·</span>
              <span>SHANNON-HARTLEY & PROPAGATION DELAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Transmission Media Signal Lab
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
              Simulate signal attenuation, propagation delay, and channel throughput capacity across varying physical distances, medium characteristics, and ambient electromagnetic noise.
            </p>
          </div>

          {/* Media Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {TRANSMISSION_MEDIA_LIST.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMedia(m.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedMedia === m.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* The Two-Zone Sandbox Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Zone: Live Visual Wave Propagation Stage */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stage Canvas Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6 relative overflow-hidden shadow-xl">
              
              {/* Stage Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isTransmitting ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="font-mono uppercase tracking-wider text-cyan-300">
                    {activeMediaSpec.category.toUpperCase()} // {activeMediaSpec.name}
                  </span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  Velocity: {activeMediaSpec.propagationSpeed}
                </div>
              </div>

              {/* Graphic Representation of Transmitter -> Medium -> Receiver */}
              <div className="relative py-4 space-y-4">
                
                {/* Node labels */}
                <div className="flex justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold">
                      Tx
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">Transmitter</div>
                      <div className="text-[10px] text-slate-400">Power: {inputPower} dBm</div>
                    </div>
                  </div>

                  <div className="text-center self-center text-slate-400 text-xs">
                    <span className="font-mono text-cyan-300 font-bold">{distance} {distanceConfig.unit}</span>
                    <div className="text-[10px] text-slate-500">Physical Channel Span</div>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="font-semibold text-slate-200">Receiver</div>
                      <div className="text-[10px] text-slate-400">P_rx: {simulationResults.receivedPowerDbm} dBm</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
                      Rx
                    </div>
                  </div>
                </div>

                {/* Animated Physical Conduit Visualizer */}
                <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center px-4">
                  
                  {/* Background gridlines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* Render media-specific visual channel */}
                  {selectedMedia === 'fiber-optic' && (
                    <div className="w-full h-12 rounded-lg bg-cyan-950/60 border border-cyan-800/80 relative overflow-hidden flex items-center">
                      <div className="absolute inset-x-0 h-4 bg-cyan-400/20 top-4 blur-[2px]" />
                      {/* Laser bouncing ray */}
                      <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 500 50">
                        <path
                          d="M 0 25 L 40 10 L 80 40 L 120 10 L 160 40 L 200 10 L 240 40 L 280 10 L 320 40 L 360 10 L 400 40 L 440 10 L 500 25"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                          strokeDasharray="6 3"
                          className={isTransmitting ? 'animate-[dash_1s_linear_infinite]' : ''}
                        />
                      </svg>
                      <span className="absolute right-3 bottom-1 text-[10px] text-cyan-400 font-mono">
                        TIR Angle &gt; 80.6°
                      </span>
                    </div>
                  )}

                  {selectedMedia === 'twisted-pair' && (
                    <div className="w-full h-12 rounded-lg bg-blue-950/40 border border-blue-900/60 relative overflow-hidden flex items-center px-2">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 50">
                        {/* Wire 1 */}
                        <path
                          d="M 0 25 Q 25 5, 50 25 T 100 25 T 150 25 T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="3"
                        />
                        {/* Wire 2 */}
                        <path
                          d="M 0 25 Q 25 45, 50 25 T 100 25 T 150 25 T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray="4 2"
                        />
                      </svg>
                      <span className="absolute right-3 bottom-1 text-[10px] text-blue-400 font-mono">
                        Differential Twisted Pair
                      </span>
                    </div>
                  )}

                  {selectedMedia === 'coaxial' && (
                    <div className="w-full h-14 rounded-lg bg-slate-800/80 border border-slate-700 relative overflow-hidden flex items-center justify-center">
                      <div className="w-full h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      <div className="absolute inset-x-0 h-8 border-y border-dashed border-slate-500/50 pointer-events-none" />
                      <span className="absolute right-3 bottom-1 text-[10px] text-amber-400 font-mono">
                        75Ω Coaxial Dielectric & Braid
                      </span>
                    </div>
                  )}

                  {['radio', 'microwave', 'infrared'].includes(selectedMedia) && (
                    <div className="w-full h-14 rounded-lg bg-indigo-950/40 border border-indigo-900/60 relative overflow-hidden flex items-center">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 50">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <circle
                            key={i}
                            cx="30"
                            cy="25"
                            r={i * 45 + 10}
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="1.5"
                            strokeOpacity={Math.max(0.1, 1 - i * 0.1)}
                          />
                        ))}
                      </svg>
                      <span className="absolute right-3 bottom-1 text-[10px] text-indigo-400 font-mono">
                        {selectedMedia === 'infrared' ? 'Diffuse IR Optical Radiance' : 'EM Free-Space Wavefront'}
                      </span>
                    </div>
                  )}

                  {/* Packet In-Transit Animation Indicator */}
                  {packetStatus === 'in-transit' && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 h-6 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_12px_#facc15] animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    </div>
                  )}

                </div>

                {/* Packet Transmission Tester Status */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSendPacket}
                      disabled={packetStatus === 'in-transit'}
                      className="px-3.5 py-1.5 rounded-lg font-semibold text-xs bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white flex items-center gap-1.5 cursor-pointer focus:outline-none transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit 1 KB Frame</span>
                    </button>
                    
                    <span className="text-slate-400">
                      {packetStatus === 'idle' && 'Ready for test packet injection.'}
                      {packetStatus === 'in-transit' && 'Propagating packet across medium...'}
                      {packetStatus === 'delivered' && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> 100% Frame Delivered without Bit Inversion
                        </span>
                      )}
                      {packetStatus === 'corrupted' && (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Frame Corrupted (CRC FCS Mismatch!)
                        </span>
                      )}
                    </span>
                  </div>

                  {lastDeliveredBits && (
                    <div className="font-mono text-[11px] text-slate-400">
                      Latency: <span className="text-white font-bold">{lastDeliveredBits.transitMs} ms</span> | Errors: <span className={lastDeliveredBits.errors > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{lastDeliveredBits.errors}</span> / {lastDeliveredBits.total} bits
                    </div>
                  )}
                </div>

              </div>

              {/* Threshold Warning Banner if distance exceeds standard limits */}
              {distance > distanceConfig.threshold && (
                <div className="p-3 rounded-lg bg-amber-950/50 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    Warning: Distance ({distance} {distanceConfig.unit}) exceeds recommended segment specification threshold ({distanceConfig.threshold} {distanceConfig.unit}). Severe attenuation or link flap likely.
                  </span>
                </div>
              )}

            </div>

            {/* Live Telemetry Scoreboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Total Loss / Attenuation</div>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                  -{simulationResults.attenuationDb} <span className="text-xs font-normal">dB</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Signal drop over distance</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Received SNR</div>
                <div className={`text-lg font-bold font-mono mt-1 ${
                  simulationResults.snrDb > 20 ? 'text-emerald-600 dark:text-emerald-400' : simulationResults.snrDb > 8 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {simulationResults.snrDb} <span className="text-xs font-normal">dB</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Signal-to-Noise Ratio</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Propagation Delay</div>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                  {simulationResults.propagationDelayMs} <span className="text-xs font-normal">ms</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">t = d / ({activeMediaSpec.velocityFactor} · c)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Shannon Capacity</div>
                <div className="text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                  {simulationResults.channelCapacityMbps > 1000
                    ? `${(simulationResults.channelCapacityMbps / 1000).toFixed(2)} Gbps`
                    : `${simulationResults.channelCapacityMbps} Mbps`}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Theoretical max data rate</div>
              </div>
            </div>

          </div>

          {/* Right Zone: Interactive Control & Concept Deck */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
            
            <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Channel Parameters Deck
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Adjust transmission physics variables and observe immediate signal degradation:
              </p>
            </div>

            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Physical Channel Distance:
                </label>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {distance} {distanceConfig.unit}
                </span>
              </div>
              <input
                type="range"
                min={distanceConfig.min}
                max={distanceConfig.max}
                step={distanceConfig.step}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>{distanceConfig.min} {distanceConfig.unit}</span>
                <span>{distanceConfig.note}</span>
                <span>{distanceConfig.max} {distanceConfig.unit}</span>
              </div>
            </div>

            {/* Transmitter Power Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Transmitter Output Power (P_in):
                </label>
                <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {inputPower} dBm ({Math.pow(10, inputPower / 10).toFixed(1)} mW)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={inputPower}
                onChange={(e) => setInputPower(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0 dBm (1 mW)</span>
                <span>Standard Transceiver</span>
                <span>25 dBm (316 mW)</span>
              </div>
            </div>

            {/* Environmental Noise Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Electromagnetic Noise & Interference:
                </label>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  +{noiseLevel} dB
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={35}
                step={1}
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0 dB (Clean Lab)</span>
                <span>Industrial Motors / RFI</span>
                <span>35 dB (Severe Noise)</span>
              </div>
            </div>

            {/* Signal Integrity Gauge */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Composite Signal Integrity Score:
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {simulationResults.signalIntegrityPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    simulationResults.signalIntegrityPercent > 70
                      ? 'bg-emerald-500'
                      : simulationResults.signalIntegrityPercent > 35
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${simulationResults.signalIntegrityPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Estimated Bit Error Rate (BER): <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{simulationResults.bitErrorRate.toExponential(1)}</span>
              </div>
            </div>

            {/* Theoretical Physics Equations Callout */}
            <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-semibold text-cyan-900 dark:text-cyan-300 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-600" />
                <span>Underlying Mathematical Theorems</span>
              </div>
              <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-cyan-200/50 dark:border-cyan-800/50">
                C = B · log₂(1 + S/N)  [Shannon-Hartley Capacity]
                <br />
                t_prop = d / (velocity_factor · c)  [Transit Delay]
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
