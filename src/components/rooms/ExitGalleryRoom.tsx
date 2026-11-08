import React, { useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';

interface ExitGalleryRoomProps {
  onNavigateRoom?: (room: MuseumRoom) => void;
}

interface ReviewCardData {
  id: string;
  roomTarget: MuseumRoom;
  icon: string;
  title: string;
  badge: string;
  borderTopClass: string;
  badgeBgClass: string;
  keyPoints: string[];
}

const REVIEW_CARDS: ReviewCardData[] = [
  {
    id: 'packets',
    roomTarget: 'packets',
    icon: '📦',
    title: 'Packets',
    badge: 'Efficiency',
    borderTopClass: 'border-t-[#1e4fd6]',
    badgeBgClass: 'bg-[#1e4fd6]',
    keyPoints: [
      'Large files and messages are broken into small numbered chunks called packets before travelling across a network.',
      'Each packet has three parts: Header (source/destination IP & sequence number), Payload (actual data), and Trailer (error checking).',
      'Routers forward packets along the best available paths, and the receiving device reassembles them in exact order.',
    ],
  },
  {
    id: 'transmission-media',
    roomTarget: 'transmission-media',
    icon: '🔌',
    title: 'Transmission Media',
    badge: 'Connection',
    borderTopClass: 'border-t-[#0d8278]',
    badgeBgClass: 'bg-[#0d8278]',
    keyPoints: [
      'Wired (Bounded) media use physical cables: Twisted-Pair (UTP/STP), Coaxial Cable (shielded copper), and Fibre-Optic Cable (light pulses).',
      'Wireless (Unbounded) media send electromagnetic waves through the air: Radio Waves, Microwaves, Infrared, and Satellite.',
      'Fibre-optic cable offers the fastest long-distance speed, while wireless provides mobility for portable devices.',
    ],
  },
  {
    id: 'netiquette',
    roomTarget: 'netiquette',
    icon: '💬',
    title: 'Netiquette',
    badge: 'Respect',
    borderTopClass: 'border-t-[#c46b08]',
    badgeBgClass: 'bg-[#c46b08]',
    keyPoints: [
      'Netiquette (Network + Etiquette) is the code of polite, safe, and responsible behaviour in all online spaces.',
      'Six core rules: Be respectful, avoid offensive language, respect privacy, check facts before sharing, think before posting, and match language to context.',
      'Never share someone else’s photo or personal details without permission, and consult a teacher or trusted adult if conflict arises.',
    ],
  },
  {
    id: 'mobile-comm',
    roomTarget: 'mobile-comm',
    icon: '📱',
    title: 'Mobile Communication',
    badge: 'Mobility',
    borderTopClass: 'border-t-[#5e35b1]',
    badgeBgClass: 'bg-[#5e35b1]',
    keyPoints: [
      'Smartphones and tablets exchange voice, text, and data wirelessly using radio waves and nearby cell towers.',
      'A SIM (Subscriber Identity Module) card identifies your phone number and subscriber profile across 2G, 3G, 4G, and 5G networks.',
      'Call journey: Your Phone → Cell Tower → Network Backbone → Cell Tower → Recipient’s Phone.',
    ],
  },
];

const MOOD_OPTIONS = [
  { id: 'excited', emoji: '😄', label: 'Excited' },
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'curious', emoji: '🤔', label: 'Curious' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'confused', emoji: '😕', label: 'Confused' },
];

interface SavedReflection {
  id: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  mood: string;
  submittedAt: string;
}

const VIDEO_STORAGE_KEY = 'exit_gallery_summary_video_url';
const REFLECTIONS_STORAGE_KEY = 'exit_gallery_saved_reflections';

function normalizeVideoEmbedUrl(raw: string): {
  type: 'iframe' | 'video';
  src: string;
} {
  const trimmed = raw.trim();
  try {
    const parsed = new URL(trimmed);
    if (
      parsed.hostname.includes('youtube.com') &&
      parsed.searchParams.get('v')
    ) {
      const videoId = parsed.searchParams.get('v');
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${videoId}`,
      };
    }
    if (parsed.hostname === 'youtu.be' && parsed.pathname.length > 1) {
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`,
      };
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsed.pathname)) {
      return { type: 'video', src: trimmed };
    }
  } catch {
    // fallback below
  }
  return { type: 'iframe', src: trimmed };
}

export const ExitGalleryRoom: React.FC<ExitGalleryRoomProps> = ({
  onNavigateRoom,
}) => {
  // Expandable key-point review cards
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );

  // Video Theatre state
  const [savedVideoUrl, setSavedVideoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(VIDEO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [videoInput, setVideoInput] = useState('');

  // Reflection Wall form state
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [reflections, setReflections] = useState<SavedReflection[]>(() => {
    try {
      const raw = localStorage.getItem(REFLECTIONS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedReflection[]) : [];
    } catch {
      return [];
    }
  });

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLoadVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = videoInput.trim();
    if (!cleaned) return;
    setSavedVideoUrl(cleaned);
    try {
      localStorage.setItem(VIDEO_STORAGE_KEY, cleaned);
    } catch {
      // ignore storage errors
    }
    setVideoInput('');
  };

  const handleClearVideo = () => {
    setSavedVideoUrl('');
    try {
      localStorage.removeItem(VIDEO_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1.trim() && !q2.trim() && !q3.trim() && !q4.trim() && !selectedMood) {
      return;
    }

    const moodObj = MOOD_OPTIONS.find((m) => m.id === selectedMood);
    const entry: SavedReflection = {
      id: `ref-${Date.now()}`,
      q1: q1.trim(),
      q2: q2.trim(),
      q3: q3.trim(),
      q4: q4.trim(),
      mood: moodObj ? `${moodObj.emoji} ${moodObj.label}` : 'Visited',
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [entry, ...reflections];
    setReflections(updated);
    try {
      localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }

    setQ1('');
    setQ2('');
    setQ3('');
    setQ4('');
    setSelectedMood('');
    setJustSubmitted(true);
  };

  const handleDeleteReflection = (id: string) => {
    const updated = reflections.filter((r) => r.id !== id);
    setReflections(updated);
    try {
      localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const normalizedVideo = savedVideoUrl
    ? normalizeVideoEmbedUrl(savedVideoUrl)
    : null;

  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* 1. Crimson Hero Banner */}
      <section className="bg-[#b8295c] text-white py-12 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-4xl sm:text-5xl mb-3 leading-none"
            aria-hidden="true"
          >
            🎬
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white">
            Back to Explore
          </h1>
          <p className="text-pink-100 text-base sm:text-lg mt-2.5 max-w-xl mx-auto">
            Celebrate what you have learned — reflect, review, and share your
            thoughts.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* 2. Your Museum Journey */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-8 shadow-2xs text-center">
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847]">
            Your Museum Journey
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateRoom?.('packets')}
              className="inline-flex items-center gap-1.5 bg-[#1e4fd6] hover:bg-[#1a42b8] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <span aria-hidden="true">📦</span>
              <span>Packets</span>
            </button>
            <span className="text-slate-400 text-xs" aria-hidden="true">
              →
            </span>
            <button
              type="button"
              onClick={() => onNavigateRoom?.('transmission-media')}
              className="inline-flex items-center gap-1.5 bg-[#0d8278] hover:bg-[#0b6b63] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <span aria-hidden="true">🔌</span>
              <span>Transmission Media</span>
            </button>
            <span className="text-slate-400 text-xs" aria-hidden="true">
              →
            </span>
            <button
              type="button"
              onClick={() => onNavigateRoom?.('netiquette')}
              className="inline-flex items-center gap-1.5 bg-[#c46b08] hover:bg-[#a35806] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <span aria-hidden="true">💬</span>
              <span>Netiquette</span>
            </button>
            <span className="text-slate-400 text-xs" aria-hidden="true">
              →
            </span>
            <button
              type="button"
              onClick={() => onNavigateRoom?.('mobile-comm')}
              className="inline-flex items-center gap-1.5 bg-[#5e35b1] hover:bg-[#4d2996] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <span aria-hidden="true">📱</span>
              <span>Mobile Communication</span>
            </button>
            <span className="text-slate-400 text-xs" aria-hidden="true">
              →
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#b8295c] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
              <span aria-hidden="true">🎬</span>
              <span>Back to Explore</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-4">
            You have explored all four rooms of the Virtual Network Museum. Well
            done!
          </p>
        </section>

        {/* 3. What Did You Learn? (Expandable Key-Point Cards) */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            What Did You Learn?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Click a room card to review its key ideas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {REVIEW_CARDS.map((card) => {
              const isExpanded = Boolean(expandedCards[card.id]);
              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(card.id);
                    }
                  }}
                  className={`bg-white rounded-2xl border border-[#e5e0d5] border-t-4 ${card.borderTopClass} p-6 shadow-2xs transition-colors hover:border-[#d6d0c4] cursor-pointer`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none" aria-hidden="true">
                        {card.icon}
                      </span>
                      <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#152847]">
                        {card.title}
                      </h3>
                    </div>
                    <span
                      className={`${card.badgeBgClass} text-white text-xs font-semibold px-3 py-1 rounded-full shrink-0`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <div className="mt-3 text-xs sm:text-sm text-slate-500 font-medium">
                    {isExpanded
                      ? '▲ Hide key points'
                      : '▼ Click to review key points'}
                  </div>

                  {isExpanded && (
                    <div
                      className="mt-4 pt-4 border-t border-[#e5e0d5] space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside leading-relaxed">
                        {card.keyPoints.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => onNavigateRoom?.(card.roomTarget)}
                        className="mt-2 inline-block text-xs font-bold text-[#152847] hover:text-[#b8295c] hover:underline cursor-pointer"
                      >
                        Revisit {card.title} Room →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Video Theatre */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">🎬</span>
            <span>Video Theatre</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Watch the summary video your team has created for the museum.
          </p>

          <div className="mt-4 rounded-2xl border-2 border-dashed border-[#d6d0c4] bg-white overflow-hidden">
            {!normalizedVideo ? (
              <div className="py-16 px-4 text-center bg-[#faf8f4]">
                <div className="text-4xl mb-3 leading-none" aria-hidden="true">
                  🎬
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Summary video will appear here once a link is saved
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
                  {normalizedVideo.type === 'video' ? (
                    <video
                      src={normalizedVideo.src}
                      controls
                      className="w-full h-full"
                    />
                  ) : (
                    <iframe
                      src={normalizedVideo.src}
                      title="Museum Team Summary Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleClearVideo}
                    className="text-xs text-slate-500 hover:text-rose-600 underline cursor-pointer"
                  >
                    Remove saved video
                  </button>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleLoadVideo}
            className="mt-3 flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="url"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              placeholder="Paste YouTube embed URL here (e.g. https://www.youtube.com/embed/...)"
              className="flex-1 bg-white border border-[#ded9ce] rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8295c]"
            />
            <button
              type="submit"
              className="font-semibold text-sm px-6 py-2.5 rounded-xl bg-[#b8295c] hover:bg-[#991f4b] text-white transition-colors cursor-pointer shrink-0"
            >
              Load Video
            </button>
          </form>
        </section>

        {/* 5. Reflection Wall */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] overflow-hidden shadow-2xs">
          {/* Crimson Header */}
          <div className="bg-[#b8295c] text-white px-6 sm:px-8 py-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-200">
              YOUR THOUGHTS
            </p>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold mt-1 flex items-center gap-2.5">
              <span aria-hidden="true">📝</span>
              <span>Reflection Wall</span>
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 mt-1">
              Share what you learned and felt during your museum visit.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmitReflection}
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Question 1 */}
            <div>
              <label
                htmlFor="reflection-q1"
                className="flex items-center gap-2.5 font-sans-body font-bold text-sm sm:text-base text-[#152847]"
              >
                <span className="w-6 h-6 rounded-full bg-[#b8295c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>What did you learn from the museum?</span>
              </label>
              <textarea
                id="reflection-q1"
                rows={2}
                value={q1}
                onChange={(e) => {
                  setQ1(e.target.value);
                  setJustSubmitted(false);
                }}
                placeholder="Share your biggest takeaway from exploring the rooms..."
                className="mt-2.5 w-full rounded-xl border border-[#ded9ce] bg-[#faf8f4] px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8295c] focus:bg-white"
              />
            </div>

            {/* Question 2 */}
            <div>
              <label
                htmlFor="reflection-q2"
                className="flex items-center gap-2.5 font-sans-body font-bold text-sm sm:text-base text-[#152847]"
              >
                <span className="w-6 h-6 rounded-full bg-[#b8295c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Which room did you find most interesting and why?</span>
              </label>
              <textarea
                id="reflection-q2"
                rows={2}
                value={q2}
                onChange={(e) => {
                  setQ2(e.target.value);
                  setJustSubmitted(false);
                }}
                placeholder="e.g. I found the Packets Room most interesting because..."
                className="mt-2.5 w-full rounded-xl border border-[#ded9ce] bg-[#faf8f4] px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8295c] focus:bg-white"
              />
            </div>

            {/* Question 3 */}
            <div>
              <label
                htmlFor="reflection-q3"
                className="flex items-center gap-2.5 font-sans-body font-bold text-sm sm:text-base text-[#152847]"
              >
                <span className="w-6 h-6 rounded-full bg-[#b8295c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Which concept was easiest to understand?</span>
              </label>
              <textarea
                id="reflection-q3"
                rows={2}
                value={q3}
                onChange={(e) => {
                  setQ3(e.target.value);
                  setJustSubmitted(false);
                }}
                placeholder="e.g. Netiquette was easy because it applies to my everyday online life..."
                className="mt-2.5 w-full rounded-xl border border-[#ded9ce] bg-[#faf8f4] px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8295c] focus:bg-white"
              />
            </div>

            {/* Question 4 */}
            <div>
              <label
                htmlFor="reflection-q4"
                className="flex items-center gap-2.5 font-sans-body font-bold text-sm sm:text-base text-[#152847]"
              >
                <span className="w-6 h-6 rounded-full bg-[#b8295c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <span>What would you like to learn more about?</span>
              </label>
              <textarea
                id="reflection-q4"
                rows={2}
                value={q4}
                onChange={(e) => {
                  setQ4(e.target.value);
                  setJustSubmitted(false);
                }}
                placeholder="e.g. I want to learn more about how 5G works..."
                className="mt-2.5 w-full rounded-xl border border-[#ded9ce] bg-[#faf8f4] px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8295c] focus:bg-white"
              />
            </div>

            {/* Mood Selector */}
            <div>
              <p className="font-sans-body font-bold text-sm sm:text-base text-[#152847]">
                How did you feel exploring the museum?
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = selectedMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => {
                        setSelectedMood(mood.id);
                        setJustSubmitted(false);
                      }}
                      className={`w-22 sm:w-24 py-3.5 px-2 rounded-xl border text-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#b8295c] bg-[#fdf2f8] text-[#991f4b] font-bold shadow-2xs'
                          : 'border-[#ded9ce] bg-[#faf8f4] hover:border-[#b8295c] text-slate-700'
                      }`}
                    >
                      <div className="text-2xl leading-none" aria-hidden="true">
                        {mood.emoji}
                      </div>
                      <div className="text-xs font-medium mt-2">
                        {mood.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#b8295c] hover:bg-[#991f4b] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit My Reflection 🚀
            </button>

            {justSubmitted && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs sm:text-sm text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your museum reflection has been added to your
                  personal Reflection Wall below.
                </span>
              </div>
            )}

            <p className="text-xs text-slate-400 text-center">
              To collect responses permanently, replace this form with a Google
              Form embed.
            </p>
          </form>

          {/* Saved Reflections Preview (if any submitted) */}
          {reflections.length > 0 && (
            <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-[#e5e0d5] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Posted Reflections ({reflections.length})
              </h3>
              {reflections.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#fbcfe8] bg-[#fdf2f8]/60 p-4 text-xs sm:text-sm text-slate-700 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#b8295c]">
                      {item.mood} · {item.submittedAt}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteReflection(item.id)}
                      aria-label="Delete reflection"
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {item.q1 && (
                    <p>
                      <strong>Takeaway:</strong> {item.q1}
                    </p>
                  )}
                  {item.q2 && (
                    <p>
                      <strong>Favourite Room:</strong> {item.q2}
                    </p>
                  )}
                  {item.q3 && (
                    <p>
                      <strong>Easiest Concept:</strong> {item.q3}
                    </p>
                  )}
                  {item.q4 && (
                    <p>
                      <strong>Curious About:</strong> {item.q4}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. Bottom Navigation Row */}
        <nav
          aria-label="Room navigation"
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => onNavigateRoom?.('mobile-comm')}
            className="px-5 py-2.5 rounded-xl border border-[#ded9ce] bg-white hover:bg-[#f2eee4] text-[#152847] text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Mobile Communication Room
          </button>

          <button
            type="button"
            onClick={() => onNavigateRoom?.('lobby')}
            className="px-5 py-2.5 rounded-xl bg-[#f2eee4] hover:bg-[#e6e0d2] border border-[#e5e0d5] text-[#152847] text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span aria-hidden="true">🏛️</span>
            <span>Back to Museum</span>
          </button>

          <div className="hidden sm:block w-44" />
        </nav>
      </div>
    </div>
  );
};
