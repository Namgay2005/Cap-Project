import React, { useState } from 'react';
import { X, CheckCircle2, Award } from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';
import {
  TEACHER_POSTERS,
  TeacherPosterMeta,
  TeacherPosterArtwork,
  TeacherPosterModal,
  ExhibitCardBannerArtwork,
  ExhibitMediumId,
} from './TransmissionMediaPosters';

interface TransmissionMediaRoomProps {
  onNavigateRoom?: (room: MuseumRoom) => void;
}

interface ExhibitDetail {
  id: ExhibitMediumId;
  category: 'Wired' | 'Wireless';
  icon: string;
  title: string;
  subtitle: string;
  cardSummary: string;
  fullExplanation: string;
  howItWorks: string;
  specs: Array<{ label: string; value: string }>;
  subtypes: Array<{ name: string; detail: string }>;
  advantages: string[];
  disadvantages: string[];
  examples: string[];
}

const EXHIBIT_POSTERS: ExhibitDetail[] = [
  {
    id: 'twisted-pair',
    category: 'Wired',
    icon: '🔀',
    title: 'Twisted Pair Cable',
    subtitle: 'The most common network cable in homes and offices',
    cardSummary:
      'Two copper wires twisted around each other to reduce electromagnetic interference. The twisting cancels out noise from nearby cables and devices, keeping local network signals reliable.',
    fullExplanation:
      'Twisted pair cable consists of pairs of insulated copper wires twisted together in a helix. Standard Ethernet cables (Cat5e, Cat6, Cat6a) contain 4 twisted pairs (8 wires total) terminated with an RJ45 connector.',
    howItWorks:
      'Electrical current carrying binary 1s and 0s creates a small magnetic field. Twisting the two wires ensures external electromagnetic noise hits both conductors equally, cancelling out interference at the receiver.',
    specs: [
      { label: 'Typical Speed', value: '1 Gbps – 10 Gbps' },
      { label: 'Max Segment Length', value: '100 meters' },
      { label: 'Signal Type', value: 'Electrical pulses' },
      { label: 'Relative Cost', value: 'Low' },
    ],
    subtypes: [
      {
        name: 'UTP (Unshielded Twisted Pair)',
        detail:
          'No metallic shield; relies on twist rate alone. Lightweight, inexpensive, and standard in school and home Ethernet LANs.',
      },
      {
        name: 'STP (Shielded Twisted Pair)',
        detail:
          'Wraps pairs in foil or braided mesh shielding to block heavy industrial crosstalk and interference.',
      },
    ],
    advantages: [
      'Inexpensive and widely available',
      'Flexible and easy to terminate with RJ45 plugs',
      'Supports high-speed Gigabit Ethernet in LANs',
    ],
    disadvantages: [
      'Signal attenuates past 100 meters without a switch/repeater',
      'UTP is more vulnerable to strong EMI than fibre optic',
    ],
    examples: [
      'School computer lab Ethernet connections',
      'Home Wi-Fi router to desktop PC LAN cable',
      'Office VoIP phones and PoE security cameras',
    ],
  },
  {
    id: 'coaxial',
    category: 'Wired',
    icon: '📡',
    title: 'Coaxial Cable',
    subtitle: 'Shielded cable used by cable TV and older broadband',
    cardSummary:
      'A central copper conductor surrounded by insulation, a metallic braided shield, and a plastic outer cover. The shield protects the signal from external interference over longer runs.',
    fullExplanation:
      'Coaxial ("coax") cable shares a common geometric axis between its solid inner copper core and its outer braided metallic shield, separated by a white dielectric insulating layer.',
    howItWorks:
      'High-frequency electrical signals travel along the inner copper core while the grounded outer metallic mesh traps internal fields and blocks outside electromagnetic noise.',
    specs: [
      { label: 'Typical Speed', value: '100 Mbps – 1 Gbps+' },
      { label: 'Max Segment Length', value: '200 – 500 meters' },
      { label: 'Signal Type', value: 'High-frequency electrical' },
      { label: 'Relative Cost', value: 'Moderate' },
    ],
    subtypes: [
      {
        name: 'Baseband Coaxial',
        detail:
          'Carries a single high-speed digital signal across the entire cable bandwidth (used in early Ethernet LANs).',
      },
      {
        name: 'Broadband Coaxial',
        detail:
          'Carries multiple analog/digital channels simultaneously across different frequency bands (Cable TV + DOCSIS internet).',
      },
    ],
    advantages: [
      'Strong metallic shielding resists external noise',
      'Supports longer cable runs than twisted-pair UTP',
      'Carries television video and broadband data simultaneously',
    ],
    disadvantages: [
      'Stiffer and bulkier than Ethernet twisted pair',
      'Can be damaged if bent at sharp angles',
    ],
    examples: [
      'Cable television (CATV) set-top boxes',
      'Cable broadband internet modems',
      'CCTV video feeds and radio antennas',
    ],
  },
  {
    id: 'fibre-optic',
    category: 'Wired',
    icon: '✨',
    title: 'Fibre Optic Cable',
    subtitle: 'The fastest wired medium — data travels as light',
    cardSummary:
      'Ultra-thin glass or plastic fibres that carry data as pulses of light. Because light travels much faster than electrical signals and does not suffer from electromagnetic interference, it powers global backbones.',
    fullExplanation:
      'Fibre optic cable contains hair-thin strands of pure glass or polymer (the core) surrounded by a reflective glass layer (the cladding) and protective buffer coating.',
    howItWorks:
      'LEDs or lasers convert digital bits into rapid pulses of light that bounce down the core via Total Internal Reflection, travelling puluhan/hundreds of kilometres with minimal loss.',
    specs: [
      { label: 'Typical Speed', value: '10 Gbps – 100+ Tbps' },
      { label: 'Max Segment Length', value: 'Up to 100+ km' },
      { label: 'Signal Type', value: 'Pulses of light' },
      { label: 'Relative Cost', value: 'High' },
    ],
    subtypes: [
      {
        name: 'Single-mode Fibre (8–10 µm core)',
        detail:
          'Carries a single laser light path for ultra-long-distance telecom and submarine cables.',
      },
      {
        name: 'Multimode Fibre (50–62.5 µm core)',
        detail:
          'Carries multiple light paths simultaneously; ideal for high-speed campus backbones and data centres.',
      },
      {
        name: 'Plastic Optical Fibre (~980 µm core)',
        detail:
          'Flexible polymer core used in short-range home audio and automotive networks.',
      },
    ],
    advantages: [
      'Extremely high bandwidth and data transfer speed',
      '100% immune to electromagnetic interference (EMI) and lightning',
      'Very low signal attenuation across cities and oceans',
    ],
    disadvantages: [
      'Higher cable, transceiver, and splicing installation cost',
      'Glass fibres are fragile if bent beyond minimum bend radius',
    ],
    examples: [
      'Undersea intercontinental internet cables',
      'FTTH (Fibre to the Home) gigabit broadband',
      'Cloud data centre server interconnects',
    ],
  },
  {
    id: 'wireless',
    category: 'Wireless',
    icon: '📶',
    title: 'Wireless Transmission',
    subtitle: 'No cables needed — data travels through the air',
    cardSummary:
      'Uses radio waves, microwaves, or infrared to transmit data through the air without any physical cables. The sender converts data into electromagnetic waves picked up by a receiving antenna.',
    fullExplanation:
      'Unguided (wireless) transmission sends electromagnetic waves through air or space instead of along a solid conductor, enabling smartphones, laptops, IoT sensors, and satellites to stay connected on the move.',
    howItWorks:
      'A transmitter modulates digital data onto electromagnetic carrier frequencies (kHz, MHz, GHz, or THz). Receiving antennas capture those waves and demodulate them back into binary packets.',
    specs: [
      { label: 'Typical Speed', value: '10 Mbps – 9.6 Gbps (Wi-Fi 6)' },
      { label: 'Coverage Range', value: '1 m (IR) to Global (Satellite)' },
      { label: 'Signal Type', value: 'Electromagnetic waves' },
      { label: 'Mobility', value: 'Full wireless mobility' },
    ],
    subtypes: [
      {
        name: 'Radio Waves',
        detail:
          'Omnidirectional waves that penetrate walls — powers Wi-Fi, Bluetooth, FM radio, and 4G/5G cellular.',
      },
      {
        name: 'Microwaves',
        detail:
          'High-frequency directional line-of-sight beams linking telecom towers across kilometres.',
      },
      {
        name: 'Infrared & Satellite',
        detail:
          'Infrared serves short line-of-sight remotes; satellites relay signals across continents and oceans.',
      },
    ],
    advantages: [
      'Complete freedom of movement for phones, tablets, and laptops',
      'Easy to add new devices without laying physical cables',
      'Reaches remote mountains, islands, and vehicles',
    ],
    disadvantages: [
      'Susceptible to weather, walls, and radio frequency interference',
      'Requires strong encryption (WPA3) since waves travel in open air',
    ],
    examples: [
      'Classroom and home Wi-Fi networks',
      '4G LTE / 5G mobile communication',
      'TV infrared remotes & GPS/satellite internet',
    ],
  },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const TRANSMISSION_QUIZ: QuizQuestion[] = [
  {
    question:
      'Which wired medium transmits data as pulses of light through thin glass strands?',
    options: [
      'Twisted Pair Cable (UTP)',
      'Coaxial Cable',
      'Fibre Optic Cable',
      'Infrared Wave',
    ],
    correctIndex: 2,
    explanation:
      'Fibre optic cables carry data as rapid pulses of light, offering the highest speed and complete immunity to electrical noise.',
  },
  {
    question:
      'Why are the copper wires in a Twisted Pair cable twisted around each other?',
    options: [
      'To make the cable heavier',
      'To cancel out electromagnetic interference (EMI) and crosstalk',
      'To convert electricity into light',
      'To block Wi-Fi passwords',
    ],
    correctIndex: 1,
    explanation:
      'Twisting ensures external electromagnetic noise affects both wires equally so it cancels out at the receiver.',
  },
  {
    question:
      'Which layer in a Coaxial Cable protects the central copper conductor from outside electrical noise?',
    options: [
      'Metallic braided shield',
      'Glass cladding',
      'RJ45 plastic clip',
      'Infrared filter',
    ],
    correctIndex: 0,
    explanation:
      'Coaxial cable surrounds the insulated copper core with a woven metallic braided shield to block interference.',
  },
  {
    question:
      'Which wireless technology is strictly short-range, requires line-of-sight, and cannot pass through walls?',
    options: ['Radio Waves', 'Satellite', 'Infrared (IR)', '4G Cellular'],
    correctIndex: 2,
    explanation:
      'Infrared (used in TV remote controls) requires a direct line of sight over a few metres and is blocked by walls.',
  },
  {
    question:
      'Which type of Fibre Optic cable has a tiny 8–10 µm core carrying a single light path over long telecom distances?',
    options: [
      'Single-mode Fibre',
      'Multimode Fibre',
      'Plastic Optical Fibre (POF)',
      'Shielded Twisted Pair',
    ],
    correctIndex: 0,
    explanation:
      'Single-mode fibre uses a tiny 8–10 µm core so laser light travels along a single straight path for long-distance WANs.',
  },
];

const DEFAULT_KAHOOT_URL =
  'https://create.kahoot.it/details/7dd2b852-a4bb-4371-b191-944df0dbcb06';
const KAHOOT_STORAGE_KEY = 'transmission_media_kahoot_url_v2';

export const TransmissionMediaRoom: React.FC<TransmissionMediaRoomProps> = ({
  onNavigateRoom,
}) => {
  const [selectedTeacherPoster, setSelectedTeacherPoster] =
    useState<TeacherPosterMeta | null>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitDetail | null>(
    null
  );

  // Kahoot URL customization + built-in interactive quiz modal
  const [kahootUrl, setKahootUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(KAHOOT_STORAGE_KEY) || DEFAULT_KAHOOT_URL;
    } catch {
      return DEFAULT_KAHOOT_URL;
    }
  });
  const [editingQuizLink, setEditingQuizLink] = useState(false);
  const [draftUrl, setDraftUrl] = useState(kahootUrl);
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  // Built-in quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSaveQuizLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftUrl.trim();
    const nextUrl = cleaned || DEFAULT_KAHOOT_URL;
    setKahootUrl(nextUrl);
    try {
      if (cleaned) {
        localStorage.setItem(KAHOOT_STORAGE_KEY, cleaned);
      } else {
        localStorage.removeItem(KAHOOT_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors in restricted environments
    }
    setEditingQuizLink(false);
  };

  const startBuiltInQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setQuizModalOpen(true);
  };

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === TRANSMISSION_QUIZ[quizIndex].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < TRANSMISSION_QUIZ.length) {
      setQuizIndex((q) => q + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* 1. Teal Hero Banner */}
      <section className="bg-[#0d8278] text-white py-12 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl sm:text-5xl mb-3 leading-none" aria-hidden="true">
            🔌
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white">
            Transmission Media Room
          </h1>
          <p className="text-teal-50/95 text-base sm:text-lg mt-2.5">
            Explore the channels that carry data from one place to another
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* 2. What is Transmission Media? Card */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#0d8278] p-6 sm:p-8 shadow-2xs">
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            What is Transmission Media?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
            Transmission media are the physical or wireless channels through
            which data travels from one device to another. They are divided into
            two main types:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Wired Media */}
            <div className="bg-[#f0fdfa] border border-[#99f6e4] rounded-xl p-5 flex items-start gap-3.5">
              <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden="true">
                🔌
              </span>
              <div>
                <h3 className="font-sans-body font-bold text-base text-[#0d8278]">
                  Wired Media
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Physical cables carrying electrical signals or light pulses.
                  Fast, reliable, but need physical installation.
                </p>
              </div>
            </div>

            {/* Wireless Media */}
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-5 flex items-start gap-3.5">
              <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden="true">
                📶
              </span>
              <div>
                <h3 className="font-sans-body font-bold text-base text-[#1e4fd6]">
                  Wireless Media
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Electromagnetic waves through the air. Flexible and mobile,
                  but can face interference and range limits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Teacher Poster Gallery */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
                Teacher Poster Gallery
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Select a poster to open the full-size teacher reference in a new
                tab.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0d8278] bg-[#f0fdfa] border border-[#99f6e4] px-3.5 py-1.5 rounded-full self-start shrink-0">
              Reference material
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {TEACHER_POSTERS.map((poster) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => setSelectedTeacherPoster(poster)}
                className="bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#0d8278] transition-colors overflow-hidden flex flex-col text-left group shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d8278] cursor-pointer"
              >
                {/* Thumbnail Preview Stage */}
                <div className="bg-[#f2eee4] h-[305px] w-full pt-3 px-2 flex justify-center overflow-hidden border-b border-[#e5e0d5]">
                  <TeacherPosterArtwork id={poster.id} compact />
                </div>

                {/* Card Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <h3 className="font-serif-title text-lg font-bold text-[#152847] leading-snug">
                    {poster.title}
                  </h3>
                  <span className="text-sm font-semibold text-[#0d8278] group-hover:text-[#0b6b63] mt-2 inline-block">
                    View full poster
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Section Divider */}
        <div className="flex items-center gap-4 py-2" role="separator">
          <div className="flex-1 h-px bg-[#dcd6c8]" />
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 whitespace-nowrap">
            MUSEUM EXHIBIT POSTERS
          </span>
          <div className="flex-1 h-px bg-[#dcd6c8]" />
        </div>

        {/* 5. Click a Poster to Explore (4 Interactive Exhibit Cards) */}
        <section>
          <div>
            <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
              Click a Poster to Explore
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Each exhibit card is a designed poster. Click to open the full
              exhibit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {EXHIBIT_POSTERS.map((exhibit) => (
              <button
                key={exhibit.id}
                type="button"
                onClick={() => setSelectedExhibit(exhibit)}
                className="bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#0d8278] transition-colors overflow-hidden flex flex-col text-left group shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d8278] cursor-pointer"
              >
                {/* Top Visual Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <ExhibitCardBannerArtwork id={exhibit.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span
                    className={`absolute bottom-3 left-4 text-xs font-semibold text-white px-3 py-1 rounded-md shadow-xs ${
                      exhibit.category === 'Wired'
                        ? 'bg-[#0d8278]'
                        : 'bg-[#1e4fd6]'
                    }`}
                  >
                    {exhibit.category}
                  </span>
                </div>

                {/* Card Copy */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl leading-none" aria-hidden="true">
                        {exhibit.icon}
                      </span>
                      <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                        {exhibit.title}
                      </h3>
                    </div>

                    <p className="text-sm italic text-slate-500 mt-1">
                      {exhibit.subtitle}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mt-3 line-clamp-3">
                      {exhibit.cardSummary}
                    </p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0d8278] group-hover:text-[#0b6b63]">
                    Open Exhibit →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 6. Can You Recognize the Medium? Kahoot Quiz CTA */}
        <section className="bg-[#0d8278] rounded-2xl p-8 sm:p-10 text-center text-white shadow-sm">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            Can You Recognize the Medium?
          </h2>
          <p className="text-teal-50 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Match each description to the correct transmission medium in the
            Kahoot quiz!
          </p>

          <div className="mt-6 flex flex-col items-center">
            {kahootUrl ? (
              <a
                href={kahootUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors"
              >
                <span>🎯 Take the Transmission Media Quiz</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={startBuiltInQuiz}
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <span>🎯 Take the Transmission Media Quiz</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setDraftUrl(kahootUrl);
                setEditingQuizLink((prev) => !prev);
              }}
              className="mt-3 text-xs text-teal-100 hover:text-white underline cursor-pointer"
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
                  value={draftUrl}
                  onChange={(e) => setDraftUrl(e.target.value)}
                  placeholder="https://kahoot.it/challenge/..."
                  className="flex-1 bg-white text-slate-900 text-sm rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Save Link
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 7. Bottom 3-Button Room Navigation */}
        <nav
          aria-label="Room navigation"
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => onNavigateRoom?.('packets')}
            className="px-5 py-2.5 rounded-xl border border-[#ded9ce] bg-white hover:bg-[#f2eee4] text-[#152847] text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Packets Room
          </button>

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
            onClick={() => onNavigateRoom?.('netiquette')}
            className="px-5 py-2.5 rounded-xl bg-[#0d8278] hover:bg-[#0b6b63] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Netiquette Room →
          </button>
        </nav>
      </div>

      {/* Teacher Poster Full-Size Lightbox Modal */}
      <TeacherPosterModal
        poster={selectedTeacherPoster}
        onClose={() => setSelectedTeacherPoster(null)}
      />

      {/* Full Museum Exhibit Modal */}
      {selectedExhibit && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedExhibit(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner */}
            <div className="relative h-52 bg-slate-900">
              <ExhibitCardBannerArtwork id={selectedExhibit.id} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedExhibit(null)}
                aria-label="Close exhibit"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/45 hover:bg-black/70 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-teal-300">
                  {selectedExhibit.category} Transmission Exhibit
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold mt-1 flex items-center gap-2.5">
                  <span>{selectedExhibit.icon}</span>
                  <span>{selectedExhibit.title}</span>
                </h3>
                <p className="text-sm text-slate-200 mt-0.5">
                  {selectedExhibit.subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="font-serif-title text-lg font-bold text-[#142642]">
                  Overview &amp; Structure
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-1.5">
                  {selectedExhibit.fullExplanation}
                </p>
              </div>

              <div className="bg-[#f0fdfa] border border-[#ccfbf1] rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#0f766e]">
                  ⚡ How Signal Transmission Works
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-1">
                  {selectedExhibit.howItWorks}
                </p>
              </div>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedExhibit.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3"
                  >
                    <div className="text-[11px] text-slate-500 font-medium">
                      {spec.label}
                    </div>
                    <div className="font-mono-code text-sm font-bold text-slate-900 mt-1">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtypes */}
              <div>
                <h4 className="font-serif-title text-lg font-bold text-[#142642] mb-2.5">
                  Common Types &amp; Variants
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedExhibit.subtypes.map((sub) => (
                    <div
                      key={sub.name}
                      className="border border-slate-200 rounded-xl p-4 bg-white"
                    >
                      <div className="font-bold text-sm text-[#142642]">
                        {sub.name}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {sub.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
                  <div className="font-bold text-sm text-emerald-900 mb-2">
                    ✓ Key Advantages
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                    {selectedExhibit.advantages.map((adv) => (
                      <li key={adv}>{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4">
                  <div className="font-bold text-sm text-rose-900 mb-2">
                    ✕ Limitations
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                    {selectedExhibit.disadvantages.map((dis) => (
                      <li key={dis}>{dis}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Real-world applications */}
              <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Real-World Uses
                  </span>
                  <p className="text-sm text-slate-700 mt-1">
                    {selectedExhibit.examples.join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedExhibit(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#0d8278] hover:bg-[#0b6b63] text-white text-sm font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Done Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Interactive Transmission Media Quiz Modal */}
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
                <p className="text-xs font-bold uppercase tracking-wider text-[#0d8278]">
                  Transmission Media Challenge
                </p>
                <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                  Recognize the Medium Quiz
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                aria-label="Close quiz"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!quizFinished ? (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
                  <span>
                    Question {quizIndex + 1} of {TRANSMISSION_QUIZ.length}
                  </span>
                  <span className="font-mono-code">Score: {score}</span>
                </div>

                <p className="text-base font-semibold text-[#152847] leading-snug">
                  {TRANSMISSION_QUIZ[quizIndex].question}
                </p>

                <div className="mt-4 space-y-2.5">
                  {TRANSMISSION_QUIZ[quizIndex].options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isCorrect =
                      idx === TRANSMISSION_QUIZ[quizIndex].correctIndex;
                    let btnStyle =
                      'border-[#ded9ce] bg-white hover:border-[#0d8278] text-slate-800';
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isPicked) {
                        btnStyle =
                          'border-rose-400 bg-rose-50 text-rose-900';
                      } else {
                        btnStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={selectedOption !== null}
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#f0fdfa] border border-[#99f6e4] text-xs sm:text-sm text-[#152847]">
                    {TRANSMISSION_QUIZ[quizIndex].explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-[#0d8278] hover:bg-[#0b6b63] disabled:opacity-40 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {quizIndex + 1 < TRANSMISSION_QUIZ.length
                      ? 'Next Question →'
                      : 'See Results →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#f0fdfa] text-[#0d8278] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-serif-title text-2xl font-bold text-[#152847] mt-3">
                  You scored {score} / {TRANSMISSION_QUIZ.length}!
                </h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  {score >= 4
                    ? 'Transmission Media Stamp Unlocked! You can match wired cables and wireless signals like a network engineer.'
                    : 'Great effort! Review the Teacher Posters or Exhibit Cards and try again for a full stamp.'}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={startBuiltInQuiz}
                    className="px-5 py-2.5 rounded-xl border border-[#ded9ce] hover:bg-[#faf8f4] text-[#152847] text-sm font-semibold cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#0d8278] hover:bg-[#0b6b63] text-white text-sm font-semibold cursor-pointer"
                  >
                    Back to Room
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
