import React, { useState, useRef } from 'react';
import {
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Award,
  CheckCircle2,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';

interface PacketsRoomProps {
  onNavigateRoom?: (room: MuseumRoom) => void;
}

interface ConceptStep {
  step: number;
  pillIcon: string;
  cardIcon: string;
  title: string;
  body: string;
  analogy: string;
}

const PACKET_STEPS: ConceptStep[] = [
  {
    step: 1,
    pillIcon: '📦',
    cardIcon: '📦',
    title: 'What is a Packet?',
    body: 'A packet is a small chunk of data. When you send a file, message, or video over a network, it is first broken into many small pieces called packets before being transmitted.',
    analogy:
      'Think of it like mailing a book — instead of one huge parcel, you send each chapter in a separate envelope.',
  },
  {
    step: 2,
    pillIcon: '🔀',
    cardIcon: '🔀',
    title: 'Breaking Data into Pieces',
    body: 'Before leaving your device, the sender splits large data into numbered packets (for example: Packet 1 of 4, Packet 2 of 4). Smaller packets share network cables fairly so one huge download never blocks everyone else.',
    analogy:
      'Like numbering puzzle pieces on the back before placing them in small envelopes so the receiver knows the exact order.',
  },
  {
    step: 3,
    pillIcon: '🧩',
    cardIcon: '🧩',
    title: 'Labelling Each Packet',
    body: 'Every packet receives a Header containing the Sender IP address, Destination IP address, and Sequence Number, plus a Trailer at the end to check for transmission errors.',
    analogy:
      'Just like writing the "To" address, "From" return address, and "Box 2 of 5" on the outside of a shipping parcel.',
  },
  {
    step: 4,
    pillIcon: '🌐',
    cardIcon: '🌐',
    title: 'Independent Routing Across the Network',
    body: 'Routers inspect each packet’s destination IP address and forward it along the fastest available path. Different packets from the same message may take completely different routes around busy or broken links!',
    analogy:
      'Like friends driving separate cars to the same museum — if one road has traffic, another car takes a detour and still arrives.',
  },
  {
    step: 5,
    pillIcon: '🖥️',
    cardIcon: '🖥️',
    title: 'Reassembly at the Destination',
    body: 'Even if packets arrive out of order (Packet 3 before Packet 2), the receiving computer reads their sequence numbers, requests any damaged packet again, and reassembles the original file seamlessly.',
    analogy:
      'Sorting all arrived chapters by chapter number (1, 2, 3, 4) to read the complete book from start to finish.',
  },
];

type PacketPartKey = 'header' | 'payload' | 'trailer';

const PACKET_PARTS: Record<
  PacketPartKey,
  {
    title: string;
    bytes: string;
    colorBg: string;
    colorText: string;
    summary: string;
    fields: Array<{ label: string; value: string }>;
  }
> = {
  header: {
    title: 'Header (Control & Addressing)',
    bytes: '20 – 60 Bytes',
    colorBg: 'bg-[#eff6ff] border-[#bfdbfe]',
    colorText: 'text-[#1e4fd6]',
    summary:
      'Contains routing and sequencing metadata read by every router along the path so the packet reaches the right destination.',
    fields: [
      { label: 'Source IP', value: '192.168.1.14' },
      { label: 'Destination IP', value: '142.250.190.46' },
      { label: 'Sequence #', value: 'Packet 02 of 04' },
      { label: 'Protocol', value: 'TCP / HTTPS' },
    ],
  },
  payload: {
    title: 'Payload (Actual User Data)',
    bytes: 'Up to ~1,460 Bytes',
    colorBg: 'bg-[#f0fdfa] border-[#99f6e4]',
    colorText: 'text-[#0d8278]',
    summary:
      'Carries the actual slice of your message, webpage, image, or video being sent to the recipient.',
    fields: [
      { label: 'Content Slice', value: '"Welcome to the Virtual..."' },
      { label: 'Encoding', value: 'UTF-8 Binary Stream' },
      { label: 'Encryption', value: 'TLS 1.3 Encrypted' },
      { label: 'Payload Size', value: '1,024 Bytes' },
    ],
  },
  trailer: {
    title: 'Trailer / Footer (Error Verification)',
    bytes: '4 Bytes',
    colorBg: 'bg-[#fffbeb] border-[#fde68a]',
    colorText: 'text-[#c46b08]',
    summary:
      'Marks the end of the packet and stores an error-checking value (CRC/Checksum) to verify zero bits were corrupted in transit.',
    fields: [
      { label: 'Error Check', value: 'CRC-32 Checksum' },
      { label: 'Checksum Hex', value: '0x9F4A2C18' },
      { label: 'End Flag', value: 'End-of-Frame Marker' },
      { label: 'Status', value: 'Verified Intact' },
    ],
  },
};

const TEACHER_SLIDES = [
  {
    num: 1,
    title: 'Chapter 5: Data Communication & Packets',
    bullets: [
      'Class IX — Digital Technology & Innovation (DTI)',
      'How digital messages travel reliably across global networks',
      'Core concepts: Packets, Headers, Routers, and Protocols',
    ],
  },
  {
    num: 2,
    title: 'Why Not Send One Giant File at Once?',
    bullets: [
      'A single 1 GB file on one line would monopolize the cable for everyone else',
      'If a single bit error occurred near the end, the entire 1 GB would have to be resent',
      'Packet switching solves both fairness and reliability',
    ],
  },
  {
    num: 3,
    title: 'What Is a Network Packet?',
    bullets: [
      'A small, fixed-limit unit of binary data (typically ~1,500 bytes max on Ethernet)',
      'Created by breaking down emails, web pages, photos, or streaming video',
      'Transmitted independently from sender to receiver',
    ],
  },
  {
    num: 4,
    title: 'Inside a Packet: 3 Essential Sections',
    bullets: [
      '1. Header: Source IP, Destination IP, Packet Number, Protocol',
      '2. Payload: The actual chunk of message or file content',
      '3. Trailer: Error-detection checksum (CRC) and end marker',
    ],
  },
  {
    num: 5,
    title: 'Role of Routers in Packet Switching',
    bullets: [
      'Routers act as smart traffic intersections on the internet',
      'Each router inspects the Header Destination IP and picks the best next hop',
      'If Link A is congested, the router automatically steers packets onto Link B',
    ],
  },
  {
    num: 6,
    title: 'Out-of-Order Arrival & Reassembly',
    bullets: [
      'Because packets travel different paths, Packet #3 can arrive before Packet #2',
      'TCP uses sequence numbers in the Header to reorder packets accurately',
      'Missing or corrupted packets are automatically requested again',
    ],
  },
];

const QUICK_CHECK_OPTIONS = [
  { label: 'The Payload', isCorrect: false },
  { label: 'The Header', isCorrect: true },
  { label: 'The Router', isCorrect: false },
  { label: 'The IP Cable', isCorrect: false },
];

const PACKETS_QUIZ = [
  {
    question: 'Why does a network break large files into small packets?',
    options: [
      'So multiple users can share links efficiently and only damaged chunks need resending',
      'Because computers can only count up to 10',
      'To delete half of the file automatically',
      'So routers do not need IP addresses',
    ],
    correctIndex: 0,
    explanation:
      'Packet switching lets many devices share network links fairly and makes error recovery fast.',
  },
  {
    question: 'Which section of a packet holds the actual message or video slice?',
    options: ['Header', 'Payload', 'Trailer', 'Router Table'],
    correctIndex: 1,
    explanation:
      'The Payload carries the actual user content being delivered.',
  },
  {
    question:
      'What happens if Packet 3 arrives at the destination before Packet 2?',
    options: [
      'The file is permanently lost',
      'The computer uses sequence numbers in the Header to put them back in order',
      'The monitor turns upside down',
      'The router deletes Packet 1',
    ],
    correctIndex: 1,
    explanation:
      'Sequence numbers in the packet Header allow TCP to reassemble packets in exact order.',
  },
  {
    question: 'What is the main purpose of the Packet Trailer?',
    options: [
      'Storing the Wi-Fi password',
      'Choosing the screen brightness',
      'Checking for transmission errors using a checksum (CRC)',
      'Picking the font family',
    ],
    correctIndex: 2,
    explanation:
      'The Trailer holds a CRC checksum so the receiver can verify no bits were corrupted in transit.',
  },
];

const PACKETS_KAHOOT_KEY = 'packets_room_kahoot_url';

export const PacketsRoom: React.FC<PacketsRoomProps> = ({ onNavigateRoom }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState<PacketPartKey>('header');
  const [journeyStage, setJourneyStage] = useState<0 | 1 | 2 | 3>(0);

  // Quick check
  const [quickCheckPick, setQuickCheckPick] = useState<number | null>(null);

  // Teacher presentation modal
  const [pptModalOpen, setPptModalOpen] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  // Student file upload (local prototype)
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeKb: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Packet animation exhibit
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [embeddedMediaUrl, setEmbeddedMediaUrl] = useState<string | null>(null);
  const [showBuiltInAnimation, setShowBuiltInAnimation] = useState(false);
  const [showEmbedForm, setShowEmbedForm] = useState(false);

  // Kahoot quiz link & built-in quiz modal
  const [kahootUrl, setKahootUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(PACKETS_KAHOOT_KEY) || '';
    } catch {
      return '';
    }
  });
  const [editingQuizLink, setEditingQuizLink] = useState(false);
  const [draftQuizUrl, setDraftQuizUrl] = useState(kahootUrl);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const currentStep = PACKET_STEPS[activeStepIndex];
  const partInfo = PACKET_PARTS[selectedPart];

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const additions = Array.from(files).map((f) => ({
      name: f.name,
      sizeKb: `${Math.max(1, Math.round(f.size / 1024))} KB`,
    }));
    setUploadedFiles((prev) => [...prev, ...additions]);
    e.target.value = '';
  };

  const handleDownloadStudyDeck = () => {
    const content = TEACHER_SLIDES.map(
      (s) =>
        `Slide ${s.num}: ${s.title}\n${s.bullets.map((b) => `  - ${b}`).join('\n')}`
    ).join('\n\n');
    const blob = new Blob(
      [`PACKETS — TEACHER PRESENTATION SUMMARY (19-Slide Study Reference)\n\n${content}`],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PACKETS_Teacher_Presentation_Notes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveQuizLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftQuizUrl.trim();
    setKahootUrl(cleaned);
    try {
      if (cleaned) {
        localStorage.setItem(PACKETS_KAHOOT_KEY, cleaned);
      } else {
        localStorage.removeItem(PACKETS_KAHOOT_KEY);
      }
    } catch {
      // ignore storage errors
    }
    setEditingQuizLink(false);
  };

  const openPacketsQuiz = () => {
    setQuizIndex(0);
    setQuizPick(null);
    setQuizScore(0);
    setQuizDone(false);
    setQuizModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* Hero Banner */}
      <section className="bg-[#1e4fd6] text-white py-12 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl sm:text-5xl mb-3 leading-none" aria-hidden="true">
            📦
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white">
            Packets Room
          </h1>
          <p className="text-blue-100 text-base sm:text-lg mt-2.5">
            Discover how messages, images, and videos split into tiny packets to
            travel across the internet
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* 1. Understanding Packets (Exact 5-Step Explorer matching screenshot) */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#152847]">
            Understanding Packets
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Click each step to explore the concept.
          </p>

          {/* 5 Step Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            {PACKET_STEPS.map((s, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1e4fd6] text-white border-[#1e4fd6] shadow-xs'
                      : 'bg-white text-slate-700 border-[#ded9ce] hover:border-[#1e4fd6]'
                  }`}
                >
                  <span aria-hidden="true">{s.pillIcon}</span>
                  <span>Step {s.step}</span>
                </button>
              );
            })}
          </div>

          {/* Step Card */}
          <div className="mt-5 bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#1e4fd6] p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="text-4xl leading-none shrink-0" aria-hidden="true">
                {currentStep.cardIcon}
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#1e4fd6]">
                  STEP {currentStep.step} OF {PACKET_STEPS.length}
                </p>
                <h3 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847] mt-0.5">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-5">
              {currentStep.body}
            </p>

            <div className="mt-5 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3.5 flex items-start gap-3">
              <span className="text-base leading-none mt-0.5" aria-hidden="true">
                💡
              </span>
              <p className="text-sm font-medium text-[#1e40af] leading-relaxed">
                {currentStep.analogy}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((i) => Math.max(0, i - 1))}
                className="px-4 py-2 rounded-xl border border-[#ded9ce] bg-[#faf8f4] text-slate-600 hover:bg-[#f2eee4] disabled:opacity-45 disabled:cursor-not-allowed text-sm font-semibold transition-colors cursor-pointer"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={activeStepIndex === PACKET_STEPS.length - 1}
                onClick={() =>
                  setActiveStepIndex((i) =>
                    Math.min(PACKET_STEPS.length - 1, i + 1)
                  )
                }
                className="px-5 py-2 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] disabled:opacity-45 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        {/* 2. Interactive Packet Anatomy + Packet Journey Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Packet Anatomy Card */}
          <div className="bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
            <div>
              <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847]">
                🔬 Interactive Packet Anatomy
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Click each part of the packet to inspect what travels inside.
              </p>

              {/* Visual 3-block packet bar */}
              <div className="grid grid-cols-12 gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedPart('header')}
                  className={`col-span-4 rounded-xl p-3 text-left border-2 transition-colors cursor-pointer ${
                    selectedPart === 'header'
                      ? 'bg-[#1e4fd6] text-white border-[#1e4fd6]'
                      : 'bg-[#eff6ff] text-[#152847] border-[#bfdbfe] hover:border-[#1e4fd6]'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">Header</div>
                  <div className="text-[11px] opacity-85 mt-0.5">Addresses</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPart('payload')}
                  className={`col-span-5 rounded-xl p-3 text-left border-2 transition-colors cursor-pointer ${
                    selectedPart === 'payload'
                      ? 'bg-[#0d8278] text-white border-[#0d8278]'
                      : 'bg-[#f0fdfa] text-[#152847] border-[#99f6e4] hover:border-[#0d8278]'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">Payload</div>
                  <div className="text-[11px] opacity-85 mt-0.5">Actual Data</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPart('trailer')}
                  className={`col-span-3 rounded-xl p-3 text-left border-2 transition-colors cursor-pointer ${
                    selectedPart === 'trailer'
                      ? 'bg-[#c46b08] text-white border-[#c46b08]'
                      : 'bg-[#fffbeb] text-[#152847] border-[#fde68a] hover:border-[#c46b08]'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">Trailer</div>
                  <div className="text-[11px] opacity-85 mt-0.5">CRC</div>
                </button>
              </div>

              {/* Detail Panel */}
              <div className={`mt-4 rounded-xl border p-4 ${partInfo.colorBg}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`font-bold text-sm ${partInfo.colorText}`}>
                    {partInfo.title}
                  </h3>
                  <span className="font-mono-code text-xs font-semibold text-slate-600">
                    {partInfo.bytes}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                  {partInfo.summary}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {partInfo.fields.map((f) => (
                    <div
                      key={f.label}
                      className="bg-white/90 rounded-lg px-2.5 py-1.5 border border-slate-200/70"
                    >
                      <div className="text-[10px] text-slate-500 font-medium">
                        {f.label}
                      </div>
                      <div className="font-mono-code text-xs font-semibold text-slate-800 truncate">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packet Journey Simulator Card */}
          <div className="bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847]">
                  🗺️ Packet Journey Simulator
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setJourneyStage((prev) =>
                      prev < 3 ? ((prev + 1) as 0 | 1 | 2 | 3) : 0
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {journeyStage < 3 ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Advance Hop</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Route</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Watch 3 packets split, take independent router paths, and
                reassemble in order.
              </p>

              {/* SVG Route Diagram */}
              <div className="mt-4 bg-[#faf8f4] border border-[#e5e0d5] rounded-xl p-4">
                <svg viewBox="0 0 420 155" className="w-full h-auto">
                  {/* Links */}
                  <line x1="55" y1="78" x2="170" y2="34" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="55" y1="78" x2="170" y2="122" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="170" y1="34" x2="275" y2="34" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="170" y1="122" x2="275" y2="122" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="275" y1="34" x2="370" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />
                  <line x1="275" y1="122" x2="370" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4" />

                  {/* Nodes */}
                  <g>
                    <rect x="16" y="56" width="54" height="44" rx="10" fill="#eff6ff" stroke="#1e4fd6" strokeWidth="1.5" />
                    <text x="43" y="77" textAnchor="middle" fontSize="14">💻</text>
                    <text x="43" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#152847">Sender</text>
                  </g>

                  <g>
                    <circle cx="170" cy="34" r="18" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                    <text x="170" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#152847">R1</text>
                    <circle cx="170" cy="122" r="18" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                    <text x="170" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="#152847">R2</text>
                    <circle cx="275" cy="34" r="18" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                    <text x="275" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#152847">R3</text>
                    <circle cx="275" cy="122" r="18" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
                    <text x="275" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="#152847">R4</text>
                  </g>

                  <g>
                    <rect x="350" y="56" width="56" height="44" rx="10" fill="#f0fdfa" stroke="#0d8278" strokeWidth="1.5" />
                    <text x="378" y="77" textAnchor="middle" fontSize="14">🖥️</text>
                    <text x="378" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0d8278">Receiver</text>
                  </g>

                  {/* Packet tokens based on journeyStage */}
                  {journeyStage === 0 && (
                    <g>
                      <rect x="76" y="52" width="26" height="16" rx="4" fill="#1e4fd6" />
                      <text x="89" y="63" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P1</text>
                      <rect x="76" y="70" width="26" height="16" rx="4" fill="#0d8278" />
                      <text x="89" y="81" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P2</text>
                      <rect x="76" y="88" width="26" height="16" rx="4" fill="#c46b08" />
                      <text x="89" y="99" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P3</text>
                    </g>
                  )}
                  {journeyStage === 1 && (
                    <g>
                      <rect x="157" y="8" width="26" height="16" rx="4" fill="#1e4fd6" />
                      <text x="170" y="19" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P1</text>
                      <rect x="157" y="136" width="26" height="16" rx="4" fill="#0d8278" />
                      <text x="170" y="147" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P2</text>
                      <rect x="120" y="42" width="26" height="16" rx="4" fill="#c46b08" />
                      <text x="133" y="53" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P3</text>
                    </g>
                  )}
                  {journeyStage === 2 && (
                    <g>
                      <rect x="262" y="8" width="26" height="16" rx="4" fill="#1e4fd6" />
                      <text x="275" y="19" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P1</text>
                      <rect x="262" y="136" width="26" height="16" rx="4" fill="#0d8278" />
                      <text x="275" y="147" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P2</text>
                      <rect x="220" y="12" width="26" height="16" rx="4" fill="#c46b08" />
                      <text x="233" y="23" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">P3</text>
                    </g>
                  )}
                  {journeyStage === 3 && (
                    <g>
                      <rect x="315" y="52" width="28" height="16" rx="4" fill="#0d8278" />
                      <text x="329" y="63" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">1·2·3</text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="mt-3 text-xs sm:text-sm text-slate-700 bg-[#f2eee4] rounded-xl px-3.5 py-2.5">
                {journeyStage === 0 && (
                  <span>
                    <strong>Stage 1 — Split:</strong> Message is divided into
                    numbered packets P1, P2, and P3 at the sender.
                  </span>
                )}
                {journeyStage === 1 && (
                  <span>
                    <strong>Stage 2 — First Router Hop:</strong> P1 &amp; P3 head
                    toward upper Router R1 while P2 routes via lower Router R2.
                  </span>
                )}
                {journeyStage === 2 && (
                  <span>
                    <strong>Stage 3 — Independent Paths:</strong> Routers R3 and
                    R4 forward each packet along uncongested links.
                  </span>
                )}
                {journeyStage === 3 && (
                  <span>
                    <strong>Stage 4 — Reassembled:</strong> Receiver checks CRC
                    trailers and sorts P1 → P2 → P3 back into the original file!
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Quick Check Card (Exact match to screenshot) */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-8 shadow-2xs">
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">🧠</span>
            <span>Quick Check</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium mt-3">
            Which part of a packet contains the destination address?
          </p>

          <div className="mt-4 space-y-2.5">
            {QUICK_CHECK_OPTIONS.map((opt, idx) => {
              const isSelected = quickCheckPick === idx;
              let rowStyle =
                'border-[#ded9ce] bg-white hover:border-[#1e4fd6] text-slate-800';
              if (quickCheckPick !== null) {
                if (opt.isCorrect) {
                  rowStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  rowStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                }
              }

              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setQuickCheckPick(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm flex items-center gap-3 transition-colors cursor-pointer ${rowStyle}`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? opt.isCorrect
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-rose-500 bg-rose-500'
                        : 'border-slate-500'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {quickCheckPick !== null && (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                QUICK_CHECK_OPTIONS[quickCheckPick].isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border border-amber-200 text-amber-900'
              }`}
            >
              {QUICK_CHECK_OPTIONS[quickCheckPick].isCorrect
                ? '✓ Correct! The Header stores both the Source IP and Destination IP addresses so routers know where to send the packet.'
                : 'Not quite — try selecting "The Header"! Routers inspect the Header to read the destination IP address.'}
            </div>
          )}
        </section>

        {/* 4. Museum Exhibits (Exact 2-column match to screenshot) */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">🏺</span>
            <span>Museum Exhibits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {/* Left: Teacher Reference Presentation */}
            <div className="bg-white rounded-2xl border border-[#e5e0d5] overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="bg-[#1e4fd6] text-white px-6 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100">
                    TEACHER REFERENCE
                  </p>
                  <h3 className="font-serif-title text-lg sm:text-xl font-bold mt-0.5">
                    Packets — Teacher Presentation
                  </h3>
                </div>

                {/* Slide Stage Preview */}
                <div
                  onClick={() => setPptModalOpen(true)}
                  className="bg-[#eae6dc] px-8 py-5 flex items-center justify-center cursor-pointer group"
                >
                  <div className="bg-white w-full aspect-16/10 rounded-lg shadow-xs border border-[#e5e0d5] p-4 flex flex-col justify-between group-hover:border-[#1e4fd6] transition-colors">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e4fd6]">
                        Slide {TEACHER_SLIDES[0].num} · Teacher Deck
                      </span>
                      <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#152847] mt-1">
                        {TEACHER_SLIDES[0].title}
                      </h4>
                      <ul className="mt-2 space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                        {TEACHER_SLIDES[0].bullets.map((b) => (
                          <li key={b} className="truncate">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-[11px] font-semibold text-[#1e4fd6]">
                      Click to browse slides →
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Use this 19-slide presentation to review packets, protocols,
                    and network devices. The original PowerPoint opens in
                    PowerPoint, Keynote, or Google Slides.
                  </p>

                  <div className="rounded-xl border border-[#e5e0d5] bg-[#faf8f4] px-4 py-3">
                    <div className="text-sm font-bold text-[#152847]">
                      PACKETS PPT.pptx
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Teacher-provided material
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setPptModalOpen(true)}
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Open or download file
                </button>
              </div>
            </div>

            {/* Right: Student Submissions */}
            <div className="bg-white rounded-2xl border border-[#e5e0d5] p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      STUDENT SUBMISSIONS
                    </p>
                    <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#152847] mt-0.5">
                      Upload Your Packets Work
                    </h3>
                  </div>
                  <span className="bg-[#eff6ff] text-[#1e4fd6] text-xs font-semibold px-3 py-1 rounded-full shrink-0">
                    Student area
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                  Choose your own presentation, worksheet, poster, or supporting
                  file for the Packets topic.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".ppt,.pptx,.pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFilesSelected}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full rounded-xl border-2 border-dashed border-[#d6d0c4] hover:border-[#1e4fd6] bg-[#faf8f4] hover:bg-[#eff6ff]/40 py-10 px-4 text-center transition-colors cursor-pointer"
                >
                  <div className="text-sm font-bold text-[#152847]">
                    Choose files from this device
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Accepted formats: PPT,PPTX,PDF,DOC,DOCX,PNG,JPG,JPEG
                  </div>
                </button>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
                      >
                        <span className="font-medium text-slate-800 truncate">
                          {file.name}{' '}
                          <span className="text-slate-400">({file.sizeKb})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setUploadedFiles((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          aria-label={`Remove ${file.name}`}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed mt-4">
                Prototype mode: files stay on this device and are not sent to the
                teacher. Shared classroom submissions require the project backend
                or a teacher-provided Drive folder.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Packet Animation Exhibit (Exact match to screenshot) */}
        <section>
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">🎬</span>
            <span>Packet Animation Exhibit</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Embed an animated GIF or video showing packet transmission in action.
          </p>

          <div className="mt-4 rounded-2xl border-2 border-dashed border-[#d6d0c4] bg-[#faf8f4] p-8 sm:p-10 text-center">
            {!embeddedMediaUrl && !showBuiltInAnimation ? (
              <div>
                <div className="text-3xl mb-2" aria-hidden="true">
                  🎬
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Insert animated GIF or video here (YouTube embed, GIF URL, or
                  video file)
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowBuiltInAnimation(true)}
                    className="px-4 py-2 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ▶ Preview Built-in Packet Animation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmbedForm((prev) => !prev)}
                    className="px-4 py-2 rounded-xl border border-[#ded9ce] bg-white hover:bg-[#f2eee4] text-[#152847] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Paste GIF / Video URL
                  </button>
                </div>

                {showEmbedForm && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (mediaUrlInput.trim()) {
                        setEmbeddedMediaUrl(mediaUrlInput.trim());
                        setShowEmbedForm(false);
                      }
                    }}
                    className="mt-4 max-w-md mx-auto flex gap-2"
                  >
                    <input
                      type="url"
                      value={mediaUrlInput}
                      onChange={(e) => setMediaUrlInput(e.target.value)}
                      placeholder="https://example.com/packets.gif"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                    >
                      Embed
                    </button>
                  </form>
                )}
              </div>
            ) : showBuiltInAnimation ? (
              <div className="max-w-xl mx-auto">
                <div className="bg-slate-900 rounded-xl p-5 text-white">
                  <div className="flex items-center justify-between text-xs text-blue-200 mb-3">
                    <span>Live Packet Stream Simulation</span>
                    <button
                      type="button"
                      onClick={() => setShowBuiltInAnimation(false)}
                      className="text-slate-300 hover:text-white underline cursor-pointer"
                    >
                      Close preview
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4">
                    <div className="text-center">
                      <div className="text-2xl">💻</div>
                      <div className="text-[11px] text-slate-300 mt-1">Client</div>
                    </div>
                    <div className="flex-1 flex items-center justify-around bg-slate-800 rounded-lg py-3 px-2">
                      <span className="px-2.5 py-1 rounded bg-blue-500 text-[11px] font-mono-code font-bold">
                        [H|P1|T] →
                      </span>
                      <span className="px-2.5 py-1 rounded bg-teal-500 text-[11px] font-mono-code font-bold">
                        [H|P2|T] →
                      </span>
                      <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[11px] font-mono-code font-bold">
                        [H|P3|T] →
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">🖥️</div>
                      <div className="text-[11px] text-slate-300 mt-1">Server</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <img
                  src={embeddedMediaUrl || ''}
                  alt="Embedded packet transmission animation"
                  referrerPolicy="no-referrer"
                  className="max-h-72 mx-auto rounded-xl border border-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setEmbeddedMediaUrl(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Remove embedded media
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 6. Ready to Test Your Knowledge? Kahoot Banner (Exact match to screenshot) */}
        <section className="bg-[#1e4fd6] rounded-2xl p-8 sm:p-10 text-center text-white shadow-sm">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mt-2">
            Complete the Packets Quiz on Kahoot to earn your museum stamp!
          </p>

          <div className="mt-6 flex flex-col items-center">
            {kahootUrl ? (
              <a
                href={kahootUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors"
              >
                <span>🎯 Take the Packets Quiz</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={openPacketsQuiz}
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <span>🎯 Take the Packets Quiz</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setDraftQuizUrl(kahootUrl);
                setEditingQuizLink((prev) => !prev);
              }}
              className="mt-3 text-xs text-blue-100 hover:text-white underline cursor-pointer"
            >
              Change quiz link
            </button>

            {editingQuizLink && (
              <form
                onSubmit={handleSaveQuizLink}
                className="mt-4 w-full max-w-md bg-white/10 border border-white/25 rounded-xl p-3 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="url"
                  value={draftQuizUrl}
                  onChange={(e) => setDraftQuizUrl(e.target.value)}
                  placeholder="https://kahoot.it/challenge/..."
                  className="flex-1 bg-white text-slate-900 text-sm rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                >
                  Save Link
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 7. Bottom Room Navigation */}
        <nav
          aria-label="Room navigation"
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <div className="hidden sm:block w-36" />

          <button
            type="button"
            onClick={() => onNavigateRoom?.('lobby')}
            className="px-5 py-2.5 rounded-xl bg-[#f2eee4] hover:bg-[#e6e0d2] border border-[#e5e0d5] text-[#152847] text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span aria-hidden="true">🏛️</span>
            <span>Back to Museum</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateRoom?.('transmission-media')}
            className="px-5 py-2.5 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Transmission Media Room →
          </button>
        </nav>
      </div>

      {/* Teacher Presentation Viewer Modal */}
      {pptModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPptModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#152847] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold">
                  PACKETS PPT.pptx · Teacher Reference
                </p>
                <h3 className="font-serif-title text-lg font-bold">
                  Packets — Teacher Presentation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPptModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-[#f8fafc]">
              <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[220px] flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Slide {TEACHER_SLIDES[slideIdx].num} of {TEACHER_SLIDES.length} (Summary Preview)
                  </span>
                  <h4 className="font-serif-title text-xl font-bold text-[#142642] mt-2">
                    {TEACHER_SLIDES[slideIdx].title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
                    {TEACHER_SLIDES[slideIdx].bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={slideIdx === 0}
                    onClick={() => setSlideIdx((s) => Math.max(0, s - 1))}
                    className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={slideIdx === TEACHER_SLIDES.length - 1}
                    onClick={() =>
                      setSlideIdx((s) =>
                        Math.min(TEACHER_SLIDES.length - 1, s + 1)
                      )
                    }
                    className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadStudyDeck}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#152847] hover:bg-[#1e3a66] text-white text-xs font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Study Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Packets Quiz Modal */}
      {quizModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setQuizModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e5e0d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e0d5]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1e4fd6]">
                  Packets Stamp Challenge
                </p>
                <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                  Packets Knowledge Quiz
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!quizDone ? (
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 mb-3">
                  <span>
                    Question {quizIndex + 1} of {PACKETS_QUIZ.length}
                  </span>
                  <span className="font-mono-code">Score: {quizScore}</span>
                </div>
                <p className="text-base font-semibold text-[#152847]">
                  {PACKETS_QUIZ[quizIndex].question}
                </p>
                <div className="mt-4 space-y-2.5">
                  {PACKETS_QUIZ[quizIndex].options.map((opt, idx) => {
                    const isPicked = quizPick === idx;
                    const isCorrect = idx === PACKETS_QUIZ[quizIndex].correctIndex;
                    let cls =
                      'border-[#ded9ce] bg-white hover:border-[#1e4fd6] text-slate-800';
                    if (quizPick !== null) {
                      if (isCorrect) {
                        cls =
                          'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isPicked) {
                        cls = 'border-rose-400 bg-rose-50 text-rose-900';
                      } else {
                        cls = 'border-slate-200 bg-slate-50 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={quizPick !== null}
                        onClick={() => {
                          setQuizPick(idx);
                          if (isCorrect) setQuizScore((s) => s + 1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm flex items-center justify-between gap-2 cursor-pointer ${cls}`}
                      >
                        <span>{opt}</span>
                        {quizPick !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizPick !== null && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-xs sm:text-sm text-[#152847]">
                    {PACKETS_QUIZ[quizIndex].explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={quizPick === null}
                    onClick={() => {
                      if (quizIndex + 1 < PACKETS_QUIZ.length) {
                        setQuizIndex((q) => q + 1);
                        setQuizPick(null);
                      } else {
                        setQuizDone(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] disabled:opacity-40 text-white text-sm font-semibold cursor-pointer"
                  >
                    {quizIndex + 1 < PACKETS_QUIZ.length
                      ? 'Next Question →'
                      : 'Finish Quiz →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#eff6ff] text-[#1e4fd6] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-serif-title text-2xl font-bold text-[#152847] mt-3">
                  You scored {quizScore} / {PACKETS_QUIZ.length}!
                </h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  {quizScore >= 3
                    ? 'Packets Museum Stamp Unlocked! Ready to explore the Transmission Media Room next?'
                    : 'Nice try! Review the 5 Packet Steps and try again.'}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={openPacketsQuiz}
                    className="px-5 py-2.5 rounded-xl border border-[#ded9ce] hover:bg-[#faf8f4] text-[#152847] text-sm font-semibold cursor-pointer"
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizModalOpen(false);
                      onNavigateRoom?.('transmission-media');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1e4fd6] hover:bg-[#1a42b8] text-white text-sm font-semibold cursor-pointer"
                  >
                    Go to Transmission Media →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
