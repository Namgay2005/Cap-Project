import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export type TeacherPosterId =
  | 'overview'
  | 'wired'
  | 'coaxial'
  | 'fibre'
  | 'wireless';

export interface TeacherPosterMeta {
  id: TeacherPosterId;
  title: string;
  subtitle: string;
}

export const TEACHER_POSTERS: TeacherPosterMeta[] = [
  {
    id: 'overview',
    title: 'Computer Network: Transmission Media',
    subtitle: 'Class IX — Digital Technology and Innovation (DTI)',
  },
  {
    id: 'wired',
    title: 'Wired Media',
    subtitle: 'Bounded Cables, UTP vs STP & Comparison',
  },
  {
    id: 'coaxial',
    title: 'Coaxial Cable',
    subtitle: 'Shielded · Stable · Reliable',
  },
  {
    id: 'fibre',
    title: 'Types of Fibre Optic Cable',
    subtitle: 'Single-mode, Multimode & Plastic Optical Fibre',
  },
  {
    id: 'wireless',
    title: 'Unguided Wireless Media',
    subtitle: 'Radio Waves, Microwaves, Infrared & Satellite',
  },
];

/* -------------------------------------------------------------------------- */
/* 5 Authentic Classroom Reference Posters (Thumbnail + Full-Size Renderable) */
/* -------------------------------------------------------------------------- */

export const TeacherPosterArtwork: React.FC<{
  id: TeacherPosterId;
  compact?: boolean;
}> = ({ id, compact = false }) => {
  const wrapperScale = compact
    ? 'w-[420px] origin-top scale-[0.58] pointer-events-none select-none'
    : 'w-full max-w-[680px] mx-auto';

  if (id === 'overview') {
    return (
      <div className={wrapperScale}>
        <div className="bg-gradient-to-b from-[#dbeafe] via-[#ede9fe] to-[#dbeafe] rounded-xl border-2 border-[#93c5fd] p-4 text-[11px] text-slate-800 shadow-sm">
          {/* Header */}
          <div className="bg-white/90 rounded-lg border border-blue-300 px-3 py-2 text-center">
            <div className="font-serif-title font-extrabold text-sm tracking-wide text-[#1e3a8a] uppercase">
              Computer Network: Transmission Media
            </div>
            <div className="inline-block mt-1 bg-blue-100 text-blue-900 font-semibold text-[10px] px-2.5 py-0.5 rounded-full">
              Class IX - Digital Technology and Innovation (DTI)
            </div>
          </div>

          {/* Top 3 mini boxes */}
          <div className="grid grid-cols-3 gap-2 mt-2.5">
            <div className="bg-white/90 rounded-lg p-2 border border-indigo-200">
              <div className="font-bold text-[10px] text-indigo-900">
                1. What is Transmission Media?
              </div>
              <p className="text-[9.5px] leading-snug text-slate-700 mt-1">
                A path through which data is transferred from one computer to another.
              </p>
              <div className="mt-1.5 flex items-center justify-between text-xs bg-indigo-50 rounded px-1.5 py-1">
                <span>💻</span>
                <span className="text-[9px] font-mono text-indigo-700">──▶──▶</span>
                <span>💻</span>
              </div>
            </div>

            <div className="bg-white/90 rounded-lg p-2 border border-indigo-200">
              <div className="font-bold text-[10px] text-indigo-900">
                2. Types of Media
              </div>
              <ul className="text-[9px] leading-snug text-slate-700 mt-1 space-y-1">
                <li>
                  <strong className="text-teal-800">• Wired / Bounded:</strong> Uses physical cables between devices.
                </li>
                <li>
                  <strong className="text-blue-800">• Wireless / Unbounded:</strong> Transmits over air without wires.
                </li>
              </ul>
            </div>

            <div className="bg-white/90 rounded-lg p-2 border border-indigo-200">
              <div className="font-bold text-[9.5px] text-indigo-900 uppercase">
                Data Flow: Sender to Receiver
              </div>
              <div className="mt-1 space-y-1 text-[9px]">
                <div className="bg-teal-50 rounded px-1.5 py-1 border border-teal-200">
                  <div className="font-semibold text-teal-900">Through Cable</div>
                  <div className="flex justify-between">
                    <span>🖥️ Sender</span>
                    <span>═══</span>
                    <span>🖥️</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded px-1.5 py-1 border border-blue-200">
                  <div className="font-semibold text-blue-900">Through Air</div>
                  <div className="flex justify-between">
                    <span>📡</span>
                    <span>((( )))</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-column comparison */}
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            {/* Wired Column */}
            <div className="bg-white/95 rounded-lg p-2.5 border border-blue-300 space-y-2">
              <div className="bg-[#1d4ed8] text-white font-bold text-[10px] px-2 py-1 rounded uppercase">
                3. Wired / Bounded Media
              </div>
              <div>
                <div className="font-bold text-[10px] text-slate-900">A. Twisted-Pair Cable</div>
                <p className="text-[9px] text-slate-600 leading-snug">
                  Two insulated copper wires twisted together to cancel EMI. Includes <strong>UTP</strong> (unshielded, low cost) and <strong>STP</strong> (foil/braid shield).
                </p>
              </div>
              <div className="border-t border-slate-200 pt-1.5">
                <div className="font-bold text-[10px] text-slate-900">B. Coaxial Cable</div>
                <p className="text-[9px] text-slate-600 leading-snug">
                  Central copper core, insulator, metallic mesh shield &amp; outer jacket. Types: <strong>Baseband</strong> &amp; <strong>Broadband</strong>.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-1.5">
                <div className="font-bold text-[10px] text-slate-900">C. Fibre-Optic Cable</div>
                <p className="text-[9px] text-slate-600 leading-snug">
                  Thin glass/plastic strands carrying light pulses. High bandwidth &amp; long distance. Parts: Core, Cladding, Jacket.
                </p>
              </div>
            </div>

            {/* Wireless Column */}
            <div className="bg-white/95 rounded-lg p-2.5 border border-purple-300 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="bg-[#7e22ce] text-white font-bold text-[10px] px-2 py-1 rounded uppercase">
                  4. Wireless / Unbounded Media
                </div>
                <div>
                  <div className="font-bold text-[10px] text-slate-900">A. Radio Waves</div>
                  <p className="text-[9px] text-slate-600 leading-snug">
                    Omnidirectional waves passing through walls (FM/AM radio, Wi-Fi, mobile).
                  </p>
                </div>
                <div>
                  <div className="font-bold text-[10px] text-slate-900">B. Microwaves</div>
                  <p className="text-[9px] text-slate-600 leading-snug">
                    High-frequency point-to-point line-of-sight links (satellite &amp; dish towers).
                  </p>
                </div>
                <div>
                  <div className="font-bold text-[10px] text-slate-900">C. Infrared (IR)</div>
                  <p className="text-[9px] text-slate-600 leading-snug">
                    Short-range line-of-sight waves (TV remotes, short device links).
                  </p>
                </div>
              </div>

              {/* Mini table */}
              <div className="bg-purple-50 rounded p-1.5 border border-purple-200">
                <div className="font-bold text-[9.5px] text-purple-950 mb-1">
                  5. Key Features
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8.5px]">
                  <span className="font-semibold">Bandwidth:</span>
                  <span>Data carrying capacity</span>
                  <span className="font-semibold">Speed:</span>
                  <span>How fast data travels</span>
                  <span className="font-semibold">Noise Immunity:</span>
                  <span>Resists interference</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[9.5px] font-bold text-indigo-900 mt-2">
            Connect · Share · Learn · Grow
          </div>
        </div>
      </div>
    );
  }

  if (id === 'wired') {
    return (
      <div className={wrapperScale}>
        <div className="bg-[#f5f3ff] rounded-xl border-2 border-[#c4b5fd] p-4 text-[11px] text-slate-800 shadow-sm space-y-2.5">
          <div className="bg-white rounded-lg border border-purple-200 py-2 px-3 text-center">
            <div className="font-serif-title font-extrabold text-sm text-[#3b0764] uppercase tracking-wide">
              Wired Media
            </div>
            <div className="text-[9.5px] text-purple-800 font-medium">
              Class IX — Digital Technology and Innovation (DTI)
            </div>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-purple-200">
            <div className="font-bold text-[10.5px] text-purple-950">
              1. What is Wired Media?
            </div>
            <p className="text-[9.5px] text-slate-600 mt-0.5">
              Wired (bounded) media uses physical cables to carry data signals between devices, giving a reliable and secure connection.
            </p>
            <div className="flex gap-1.5 mt-1.5 text-[9px] font-semibold">
              <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded">Twisted-Pair</span>
              <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded">Coaxial</span>
              <span className="bg-teal-100 text-teal-900 px-2 py-0.5 rounded">Fibre-Optic</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-purple-200">
            <div className="font-bold text-[10.5px] text-purple-950">
              2. Twisted-Pair Cable
            </div>
            <div className="flex items-center gap-2 mt-1">
              <svg viewBox="0 0 110 28" className="w-24 h-7 shrink-0">
                <path d="M4 8 C 22 8, 22 20, 40 20 C 58 20, 58 8, 76 8 C 94 8, 94 20, 106 20" stroke="#ea580c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M4 20 C 22 20, 22 8, 40 8 C 58 8, 58 20, 76 20 C 94 20, 94 8, 106 8" stroke="#2563eb" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
              <p className="text-[9px] text-slate-600 leading-snug">
                Two insulated copper conductors twisted in a helix so external noise affects both wires equally and cancels out.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2.5 border border-blue-200">
              <div className="font-bold text-[10px] text-blue-950">
                A. UTP (Unshielded Twisted Pair)
              </div>
              <p className="text-[8.8px] text-slate-600 mt-0.5">
                Relies purely on wire twisting with colour-coded plastic insulation.
              </p>
              <div className="mt-1.5 text-[8.8px]">
                <div className="font-bold text-emerald-800">Advantages:</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Supports 1 Gbps+ LAN speeds</li>
                  <li>Flexible, inexpensive, easy install</li>
                </ul>
                <div className="font-bold text-rose-800 mt-1">Disadvantages:</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Shorter max run (~100 m)</li>
                  <li>More sensitive to heavy EMI</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-indigo-200">
              <div className="font-bold text-[10px] text-indigo-950">
                B. STP (Shielded Twisted Pair)
              </div>
              <p className="text-[8.8px] text-slate-600 mt-0.5">
                Adds metallic foil or braided mesh around pairs to block crosstalk.
              </p>
              <div className="mt-1.5 text-[8.8px]">
                <div className="font-bold text-emerald-800">Advantages:</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Cleaner signal, fewer errors</li>
                  <li>Strong protection from EMI</li>
                </ul>
                <div className="font-bold text-rose-800 mt-1">Disadvantages:</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Higher cost than UTP</li>
                  <li>Thicker, requires grounding</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-2 border border-purple-200">
            <div className="font-bold text-[10px] text-purple-950 mb-1">
              3. Quick Comparison
            </div>
            <table className="w-full text-[9px] text-left border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-950">
                  <th className="p-1 rounded-tl">Feature</th>
                  <th className="p-1">UTP</th>
                  <th className="p-1 rounded-tr">STP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1 font-semibold">Shielding</td>
                  <td className="p-1">None</td>
                  <td className="p-1">Foil or braided mesh</td>
                </tr>
                <tr>
                  <td className="p-1 font-semibold">Cost</td>
                  <td className="p-1">Lower</td>
                  <td className="p-1">Higher</td>
                </tr>
                <tr>
                  <td className="p-1 font-semibold">Interference</td>
                  <td className="p-1">More affected</td>
                  <td className="p-1">Much less affected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'coaxial') {
    return (
      <div className={wrapperScale}>
        <div className="bg-gradient-to-b from-[#eef2ff] to-[#e0e7ff] rounded-xl border-2 border-[#a5b4fc] p-4 text-[11px] text-slate-800 shadow-sm space-y-2.5">
          <div className="text-center">
            <div className="font-serif-title font-extrabold text-lg text-[#1e1b4b]">
              Coaxial Cable
            </div>
            <div className="text-[9px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
              Shielded · Stable · Reliable
            </div>
          </div>

          {/* Cutaway card */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-6">
              <div className="font-bold text-[10.5px] text-indigo-950">What is it?</div>
              <p className="text-[9px] text-slate-600 leading-relaxed mt-1">
                A coaxial cable has a central copper conductor surrounded by dielectric insulation, a metallic braided shield, and a tough plastic outer cover.
              </p>
            </div>
            <div className="col-span-6">
              <svg viewBox="0 0 190 95" className="w-full h-auto">
                {/* Outer Jacket */}
                <rect x="8" y="34" width="62" height="32" rx="5" fill="#334155" />
                {/* Braided Shield */}
                <rect x="68" y="38" width="38" height="24" rx="3" fill="#94a3b8" />
                {/* Dielectric Insulation */}
                <rect x="104" y="42" width="34" height="16" rx="2" fill="#e2e8f0" stroke="#cbd5e1" />
                {/* Copper Core */}
                <rect x="138" y="47" width="40" height="6" rx="2" fill="#d97706" />
                {/* Labels */}
                <text x="12" y="25" fontSize="8" fill="#334155" fontWeight="600">Outer cover</text>
                <line x1="35" y1="27" x2="38" y2="34" stroke="#64748b" strokeWidth="1" />
                <text x="64" y="18" fontSize="8" fill="#475569" fontWeight="600">Braided shield</text>
                <line x1="86" y1="21" x2="86" y2="38" stroke="#64748b" strokeWidth="1" />
                <text x="100" y="82" fontSize="8" fill="#475569" fontWeight="600">Insulation</text>
                <line x1="120" y1="73" x2="120" y2="58" stroke="#64748b" strokeWidth="1" />
                <text x="136" y="28" fontSize="8" fill="#b45309" fontWeight="700">Copper core</text>
                <line x1="158" y1="31" x2="158" y2="47" stroke="#d97706" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-lg p-2.5 border border-indigo-200">
              <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Advantages</span>
              </div>
              <ul className="mt-1.5 space-y-1 text-[9px] text-slate-700 list-disc list-inside">
                <li>High bandwidth &amp; stable signal transfer</li>
                <li>Strong protection against EMI crosstalk</li>
                <li>Longer distance than standard UTP</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-indigo-200">
              <div className="flex items-center gap-1.5 font-bold text-[10px] text-rose-800">
                <XCircle className="w-3.5 h-3.5" />
                <span>Disadvantages</span>
              </div>
              <ul className="mt-1.5 space-y-1 text-[9px] text-slate-700 list-disc list-inside">
                <li>Thicker &amp; stiffer to route in walls</li>
                <li>More expensive to install than UTP</li>
                <li>Can be damaged if bent sharply</li>
              </ul>
            </div>
          </div>

          {/* Real-life examples */}
          <div className="bg-white rounded-lg p-2.5 border border-indigo-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-[10px] text-indigo-950">
                🌐 Real-life examples
              </div>
              <ul className="mt-1 text-[9px] text-slate-700 list-disc list-inside space-y-0.5">
                <li>Cable TV (CATV) connections</li>
                <li>Cable broadband internet modems</li>
                <li>CCTV &amp; radio antenna feeds</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-lg px-3 py-2 text-center border border-indigo-100">
              <div className="text-lg">📺</div>
              <div className="text-[8.5px] font-semibold text-indigo-900">BNC / F-Type</div>
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-lg p-2.5 text-[9px] leading-snug">
            <strong>💡 Key Point:</strong> The metallic braided shield blocks outside electrical noise so TV and broadband signals arrive clearly.
          </div>
        </div>
      </div>
    );
  }

  if (id === 'fibre') {
    return (
      <div className={wrapperScale}>
        <div className="bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] rounded-xl border-2 border-[#93c5fd] p-4 text-[11px] text-slate-800 shadow-sm space-y-2.5">
          <div className="text-center">
            <div className="text-[8.5px] font-bold tracking-[0.2em] text-blue-700 uppercase">
              Fibre Optic Cable
            </div>
            <div className="font-serif-title font-extrabold text-base text-[#1e3a8a]">
              Types of Fibre Optic Cable
            </div>
            <div className="text-[8.5px] tracking-[0.15em] text-slate-500 uppercase">
              Different Designs · Same Purpose
            </div>
          </div>

          {/* 01 Single-mode */}
          <div className="bg-white rounded-lg p-2.5 border border-blue-200 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-7">
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-700 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">01</span>
                <span className="font-bold text-[10.5px] text-blue-950">Single-mode Fibre</span>
              </div>
              <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside space-y-0.5">
                <li>Very small glass core (8–10 µm)</li>
                <li>Carries a single straight light path</li>
                <li>Longest distance &amp; highest bandwidth</li>
                <li>Used in telecom &amp; undersea WANs</li>
              </ul>
            </div>
            <div className="col-span-5">
              <svg viewBox="0 0 150 64" className="w-full h-auto">
                <circle cx="28" cy="32" r="22" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="28" cy="32" r="3.5" fill="#facc15" />
                <rect x="58" y="20" width="86" height="24" rx="4" fill="#dbeafe" stroke="#60a5fa" />
                <line x1="58" y1="32" x2="144" y2="32" stroke="#eab308" strokeWidth="2.5" />
                <text x="60" y="55" fontSize="7.5" fill="#1e40af">8–10 µm core · 1 light path</text>
              </svg>
            </div>
          </div>

          {/* 02 Multimode */}
          <div className="bg-white rounded-lg p-2.5 border border-blue-200 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-7">
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-700 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">02</span>
                <span className="font-bold text-[10.5px] text-blue-950">Multimode Fibre</span>
              </div>
              <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside space-y-0.5">
                <li>Larger glass core (50–62.5 µm)</li>
                <li>Carries multiple bouncing light paths</li>
                <li>Shorter distance than single-mode</li>
                <li>Used in campus LANs &amp; data centres</li>
              </ul>
            </div>
            <div className="col-span-5">
              <svg viewBox="0 0 150 64" className="w-full h-auto">
                <circle cx="28" cy="32" r="22" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="28" cy="32" r="10" fill="#fb923c" />
                <rect x="58" y="18" width="86" height="28" rx="4" fill="#dbeafe" stroke="#60a5fa" />
                <polyline points="58,32 80,22 104,42 126,22 144,32" fill="none" stroke="#ea580c" strokeWidth="1.8" />
                <polyline points="58,32 80,42 104,22 126,42 144,32" fill="none" stroke="#f97316" strokeWidth="1.8" />
                <text x="60" y="56" fontSize="7.5" fill="#1e40af">50–62.5 µm · Multiple paths</text>
              </svg>
            </div>
          </div>

          {/* 03 POF */}
          <div className="bg-white rounded-lg p-2.5 border border-blue-200 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-7">
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-700 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">03</span>
                <span className="font-bold text-[10.5px] text-blue-950">Plastic Optical Fibre (POF)</span>
              </div>
              <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside space-y-0.5">
                <li>Made of flexible polymer plastic</li>
                <li>Very large core (~980 µm / 1 mm)</li>
                <li>Low cost, easy to bend &amp; terminate</li>
                <li>Used in home audio &amp; car networks</li>
              </ul>
            </div>
            <div className="col-span-5">
              <svg viewBox="0 0 150 64" className="w-full h-auto">
                <circle cx="28" cy="32" r="22" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="28" cy="32" r="18" fill="#38bdf8" />
                <rect x="58" y="16" width="86" height="32" rx="5" fill="#bae6fd" stroke="#0284c7" />
                <line x1="58" y1="32" x2="144" y2="32" stroke="#0369a1" strokeWidth="4" strokeDasharray="6 3" />
                <text x="60" y="58" fontSize="7.5" fill="#1e40af">~980 µm plastic core</text>
              </svg>
            </div>
          </div>

          <div className="bg-[#1e3a8a] text-white rounded-lg p-2.5 text-[9px] leading-snug">
            <strong>💡 Key Takeaway:</strong> Different fibre optic cables vary in core size and material, yet all transmit pulses of light immune to electrical noise.
          </div>
        </div>
      </div>
    );
  }

  // 'wireless'
  return (
    <div className={wrapperScale}>
      <div className="bg-[#172554] rounded-xl border-2 border-[#3b82f6] p-4 text-[11px] text-white shadow-sm space-y-2.5">
        <div className="flex items-center justify-between border-b border-blue-800 pb-2">
          <div>
            <div className="font-serif-title font-extrabold text-base tracking-wide text-white uppercase">
              Unguided <span className="text-amber-300">(Wireless)</span> Media
            </div>
            <p className="text-[9px] text-blue-200 mt-0.5">
              Wireless signals travel <span className="text-amber-300 font-semibold">through the air</span> rather than through a physical cable.
            </p>
          </div>
          <div className="text-2xl">🗼</div>
        </div>

        <div className="bg-white/95 text-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 font-bold text-[10px] text-[#1e3a8a]">
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono">1</span>
              <span>RADIO WAVES</span>
            </div>
            <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside">
              <li>Omnidirectional signals across wide areas &amp; walls</li>
              <li>Used in Wi-Fi, FM/AM radio, and mobile networks</li>
            </ul>
          </div>
          <div className="flex gap-1.5 text-base shrink-0">
            <span>📶</span>
            <span>📻</span>
            <span>📱</span>
          </div>
        </div>

        <div className="bg-white/95 text-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 font-bold text-[10px] text-[#1e3a8a]">
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono">2</span>
              <span>MICROWAVES</span>
            </div>
            <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside">
              <li>High-frequency directional beams through the air</li>
              <li>Supports high-capacity long-distance tower links</li>
            </ul>
          </div>
          <div className="flex gap-1.5 text-base shrink-0">
            <span>📡</span>
            <span>🏙️</span>
          </div>
        </div>

        <div className="bg-white/95 text-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 font-bold text-[10px] text-[#1e3a8a]">
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono">3</span>
              <span>INFRARED</span>
            </div>
            <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside">
              <li>Short-range, strict line-of-sight communication</li>
              <li>Used in TV remote controls &amp; close-range sensors</li>
            </ul>
          </div>
          <div className="flex gap-1.5 text-base shrink-0">
            <span>🎮</span>
            <span>📺</span>
          </div>
        </div>

        <div className="bg-white/95 text-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 font-bold text-[10px] text-[#1e3a8a]">
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono">4</span>
              <span>SATELLITE</span>
            </div>
            <ul className="mt-1 text-[8.8px] text-slate-600 list-disc list-inside">
              <li>Relays signals between Earth stations &amp; orbit</li>
              <li>Covers continents &amp; oceans; higher latency &amp; cost</li>
            </ul>
          </div>
          <div className="flex gap-1.5 text-base shrink-0">
            <span>🛰️</span>
            <span>🌍</span>
          </div>
        </div>

        <div className="bg-blue-900/90 border border-blue-400/40 rounded-lg p-2.5 text-[9px] text-blue-100">
          <strong className="text-amber-300">💡 TAKEAWAY:</strong> Choose the medium based on speed, distance, cost, interference, and mobility needs.
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Full-Size Teacher Poster Lightbox Modal                                    */
/* -------------------------------------------------------------------------- */

export const TeacherPosterModal: React.FC<{
  poster: TeacherPosterMeta | null;
  onClose: () => void;
}> = ({ poster, onClose }) => {
  const ZOOM_LEVELS = [
    { value: 0.85, scaleClass: 'scale-[0.85]' },
    { value: 1, scaleClass: 'scale-100' },
    { value: 1.15, scaleClass: 'scale-[1.15]' },
    { value: 1.3, scaleClass: 'scale-[1.3]' },
    { value: 1.45, scaleClass: 'scale-[1.45]' },
  ];
  const [zoomIdx, setZoomIdx] = useState(1);

  if (!poster) return null;

  const currentZoom = ZOOM_LEVELS[zoomIdx];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#e5e0d5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#152847] text-white flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#f6c453] font-semibold">
              Teacher Reference Poster
            </p>
            <h3 className="font-serif-title text-lg sm:text-xl font-bold">
              {poster.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomIdx((i) => Math.max(0, i - 1))}
              aria-label="Zoom out"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono-code px-2 tabular-nums">
              {Math.round(currentZoom.value * 100)}%
            </span>
            <button
              type="button"
              onClick={() =>
                setZoomIdx((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1))
              }
              aria-label="Zoom in"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomIdx(1)}
              aria-label="Reset zoom"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close poster"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Poster Scroll Stage */}
        <div className="flex-1 overflow-auto bg-[#faf8f4] p-6 sm:p-8 flex justify-center">
          <div
            className={`origin-top transition-transform duration-150 w-full ${currentZoom.scaleClass}`}
          >
            <TeacherPosterArtwork id={poster.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4 Museum Exhibit Banner Visuals (Crisp Studio SVG Illustrations)           */
/* -------------------------------------------------------------------------- */

export type ExhibitMediumId =
  | 'twisted-pair'
  | 'coaxial'
  | 'fibre-optic'
  | 'wireless';

export const ExhibitCardBannerArtwork: React.FC<{ id: ExhibitMediumId }> = ({
  id,
}) => {
  if (id === 'twisted-pair') {
    return (
      <svg
        viewBox="0 0 600 260"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tpBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="55%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="catBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <rect width="600" height="260" fill="url(#tpBg)" />
        {/* Patch panel rack strip */}
        <rect x="0" y="34" width="600" height="84" fill="#0f172a" stroke="#475569" strokeWidth="2" />
        {[60, 145, 230, 315, 400, 485].map((x, idx) => (
          <g key={x}>
            <rect x={x} y="52" width="52" height="44" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x={x + 18} y="46" fontSize="10" fill="#94a3b8" fontFamily="monospace">
              0{idx + 1}
            </text>
            {/* Gold RJ45 pins */}
            <line x1={x + 14} y1="56" x2={x + 14} y2="66" stroke="#fbbf24" strokeWidth="2" />
            <line x1={x + 22} y1="56" x2={x + 22} y2="66" stroke="#fbbf24" strokeWidth="2" />
            <line x1={x + 30} y1="56" x2={x + 30} y2="66" stroke="#fbbf24" strokeWidth="2" />
            <line x1={x + 38} y1="56" x2={x + 38} y2="66" stroke="#fbbf24" strokeWidth="2" />
          </g>
        ))}
        {/* Plugged RJ45 boots & Cat6 cables curving down */}
        <path d="M86 84 C 86 155, 45 205, 20 260" stroke="#94a3b8" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M171 84 C 171 165, 150 215, 130 260" stroke="url(#catBlue)" strokeWidth="20" fill="none" strokeLinecap="round" />
        <path d="M256 84 C 260 165, 285 215, 310 260" stroke="#cbd5e1" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M341 84 C 350 160, 390 210, 435 260" stroke="url(#catBlue)" strokeWidth="20" fill="none" strokeLinecap="round" />
        <path d="M426 84 C 445 155, 495 205, 555 260" stroke="#38bdf8" strokeWidth="18" fill="none" strokeLinecap="round" />
        {/* RJ45 strain relief boots */}
        {[86, 171, 256, 341, 426].map((cx, i) => (
          <rect
            key={cx}
            x={cx - 14}
            y="68"
            width="28"
            height="34"
            rx="5"
            fill={i % 2 === 1 ? '#2563eb' : '#cbd5e1'}
          />
        ))}
      </svg>
    );
  }

  if (id === 'coaxial') {
    return (
      <svg
        viewBox="0 0 600 260"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="coaxBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="40%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
        <rect width="600" height="260" fill="url(#coaxBg)" />
        {/* Coiled black coax shadow in background */}
        <ellipse cx="470" cy="150" rx="140" ry="78" fill="none" stroke="#1e293b" strokeWidth="22" opacity="0.25" />
        {/* Main foreground cutaway coaxial cable */}
        <g transform="translate(55, 86) rotate(-6)">
          {/* Black PVC outer jacket */}
          <rect x="0" y="22" width="190" height="58" rx="8" fill="url(#jacketGrad)" />
          {/* Metallic braided mesh */}
          <rect x="184" y="28" width="92" height="46" rx="5" fill="url(#metalGrad)" stroke="#64748b" />
          {/* Crosshatch braid lines */}
          {[195, 210, 225, 240, 255].map((bx) => (
            <g key={bx}>
              <line x1={bx} y1="29" x2={bx + 14} y2="73" stroke="#64748b" strokeWidth="1.5" />
              <line x1={bx + 14} y1="29" x2={bx} y2="73" stroke="#64748b" strokeWidth="1.5" />
            </g>
          ))}
          {/* White dielectric insulator */}
          <rect x="272" y="35" width="76" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
          {/* Solid copper center conductor */}
          <rect x="346" y="46" width="95" height="10" rx="3" fill="#d97706" />
          <rect x="346" y="46" width="95" height="4" rx="2" fill="#fbbf24" opacity="0.65" />
        </g>
      </svg>
    );
  }

  if (id === 'fibre-optic') {
    return (
      <svg
        viewBox="0 0 600 260"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fibreBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#042f2e" />
          </linearGradient>
        </defs>
        <rect width="600" height="260" fill="url(#fibreBg)" />
        {/* Luminous fibre strands */}
        {[
          { d: 'M-20 230 Q 210 180 510 55', c: '#2dd4bf', w: 3, ex: 510, ey: 55 },
          { d: 'M-20 245 Q 230 190 545 85', c: '#38bdf8', w: 2.5, ex: 545, ey: 85 },
          { d: 'M-20 215 Q 190 150 470 40', c: '#fbbf24', w: 2.5, ex: 470, ey: 40 },
          { d: 'M10 260 Q 250 195 560 120', c: '#5eead4', w: 3, ex: 560, ey: 120 },
          { d: 'M40 260 Q 260 205 520 155', c: '#60a5fa', w: 2.2, ex: 520, ey: 155 },
          { d: 'M-10 195 Q 180 120 430 62', c: '#a7f3d0', w: 2, ex: 430, ey: 62 },
          { d: 'M70 260 Q 280 215 490 185', c: '#facc15', w: 2.2, ex: 490, ey: 185 },
        ].map((s, idx) => (
          <g key={idx}>
            <path d={s.d} stroke={s.c} strokeWidth={s.w * 2.5} strokeOpacity="0.2" fill="none" />
            <path d={s.d} stroke={s.c} strokeWidth={s.w} fill="none" strokeLinecap="round" />
            <circle cx={s.ex} cy={s.ey} r="7" fill={s.c} fillOpacity="0.35" />
            <circle cx={s.ex} cy={s.ey} r="3.5" fill="#ffffff" />
          </g>
        ))}
      </svg>
    );
  }

  // 'wireless'
  return (
    <svg
      viewBox="0 0 600 260"
      className="w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wifiBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="55%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill="url(#wifiBg)" />
      {/* Desk surface */}
      <rect x="0" y="205" width="600" height="55" fill="#cbd5e1" />
      {/* Concentric wireless wave arcs */}
      {[50, 85, 120, 155].map((r, idx) => (
        <path
          key={r}
          d={`M ${300 - r} 125 A ${r} ${r} 0 0 1 ${300 + r} 125`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeOpacity={0.55 - idx * 0.11}
          strokeDasharray={idx % 2 === 1 ? '8 6' : undefined}
        />
      ))}
      {/* Router antennas */}
      <rect x="205" y="72" width="10" height="105" rx="5" transform="rotate(-10 205 170)" fill="#1e293b" />
      <rect x="265" y="64" width="10" height="110" rx="5" fill="#0f172a" />
      <rect x="325" y="64" width="10" height="110" rx="5" fill="#0f172a" />
      <rect x="385" y="72" width="10" height="105" rx="5" transform="rotate(10 385 170)" fill="#1e293b" />
      {/* Router chassis */}
      <rect x="175" y="168" width="250" height="42" rx="10" fill="#0f172a" />
      <rect x="185" y="184" width="230" height="12" rx="4" fill="#1e293b" />
      {/* Subtle router status LEDs */}
      <circle cx="215" cy="190" r="3" fill="#2dd4bf" />
      <circle cx="232" cy="190" r="3" fill="#38bdf8" />
      <circle cx="249" cy="190" r="3" fill="#38bdf8" />
      <circle cx="266" cy="190" r="3" fill="#38bdf8" />
    </svg>
  );
};
