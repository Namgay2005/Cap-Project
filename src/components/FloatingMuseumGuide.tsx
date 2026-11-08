import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Send, X, MessageSquare, Compass, Sparkles } from 'lucide-react';
import { MuseumRoom } from './MuseumNavbar';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface EduGuideProps {
  activeRoom: MuseumRoom;
  onSelectRoom: (room: MuseumRoom) => void;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EduGuideAvatarSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soft circular backdrop */}
    <circle cx="132" cy="144" r="108" fill="#dbeafe" fillOpacity="0.65" />

    {/* Waving Right Arm */}
    <path
      d="M188 232 L218 175"
      stroke="#1e3a6e"
      strokeWidth="22"
      strokeLinecap="round"
    />
    {/* Waving Hand */}
    <g transform="translate(206, 118) rotate(12)">
      <ellipse cx="22" cy="38" rx="14" ry="16" fill="#e5a67c" />
      <rect x="8" y="10" width="6.5" height="24" rx="3.2" transform="rotate(-14 8 10)" fill="#e5a67c" />
      <rect x="16" y="4" width="6.5" height="27" rx="3.2" transform="rotate(-4 16 4)" fill="#e5a67c" />
      <rect x="25" y="6" width="6.5" height="26" rx="3.2" transform="rotate(6 25 6)" fill="#e5a67c" />
      <rect x="33" y="13" width="6.2" height="22" rx="3.1" transform="rotate(16 33 13)" fill="#e5a67c" />
      <rect x="3" y="25" width="6.5" height="16" rx="3.2" transform="rotate(-36 3 25)" fill="#dba076" />
    </g>

    {/* Torso / Museum Guide Blazer */}
    <path
      d="M66 266 C68 214, 92 198, 132 198 C172 198, 196 214, 198 266 Z"
      fill="#1b3b6f"
    />
    {/* Inner Cream Shirt */}
    <polygon points="112,200 152,200 132,238" fill="#fef3c7" />
    {/* Blazer Lapels */}
    <polygon points="102,199 132,240 115,248 92,208" fill="#254edb" fillOpacity="0.35" />
    <polygon points="162,199 132,240 149,248 172,208" fill="#254edb" fillOpacity="0.35" />

    {/* Museum ID Badge */}
    <rect x="150" y="226" width="24" height="30" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="154" y="231" width="16" height="8" rx="2" fill="#d97706" />
    <line x1="154" y1="244" x2="170" y2="244" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="154" y1="249" x2="166" y2="249" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

    {/* Neck */}
    <rect x="118" y="176" width="28" height="28" rx="10" fill="#d9986f" />

    {/* Ears */}
    <circle cx="80" cy="134" r="13" fill="#dfa076" />
    <circle cx="184" cy="134" r="13" fill="#dfa076" />

    {/* Head */}
    <rect x="82" y="68" width="100" height="118" rx="46" fill="#e8ab82" />

    {/* Soft Cheek Blush */}
    <circle cx="102" cy="144" r="10" fill="#f48c72" fillOpacity="0.35" />
    <circle cx="162" cy="144" r="10" fill="#f48c72" fillOpacity="0.35" />

    {/* Hair */}
    <path
      d="M78 122 C74 74, 102 48, 140 50 C174 52, 192 78, 186 122 C182 96, 166 84, 142 84 C114 84, 92 98, 78 122 Z"
      fill="#1e293b"
    />
    <path
      d="M92 74 C112 60, 146 60, 168 74 C150 68, 118 70, 92 74 Z"
      fill="#334155"
    />

    {/* Eyebrows */}
    <path d="M104 108 Q114 102 122 107" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M142 107 Q150 102 160 108" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="113" cy="120" r="5" fill="#0f172a" />
    <circle cx="115" cy="118.5" r="1.6" fill="#ffffff" />
    <circle cx="151" cy="120" r="5" fill="#0f172a" />
    <circle cx="153" cy="118.5" r="1.6" fill="#ffffff" />

    {/* Nose */}
    <path d="M132 120 L130 137 Q132 140 136 138" stroke="#c5835a" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Friendly Smile */}
    <path
      d="M114 151 Q132 165 150 151 Z"
      fill="#ffffff"
      stroke="#9f1239"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ROOM_QUICK_PROMPTS: Record<MuseumRoom, string[]> = {
  welcome: [
    'Which room should I visit first?',
    'What is a computer network?',
    'Explain packets in simple words',
  ],
  lobby: [
    'Give me a quick overview of all 4 rooms',
    'Where can I learn about Fibre Optic cables?',
    'How do I earn museum stamps?',
  ],
  explore: [
    'Summarise all 4 rooms for me',
    'Help me answer the Reflection Wall',
    'Quiz me on Chapter 5 Computer Networks',
  ],
  packets: [
    'What are Header, Payload, and Trailer?',
    'Why are files split into packets?',
    'How do packets find the fastest route?',
  ],
  'transmission-media': [
    'Compare UTP vs STP twisted-pair cable',
    'Single-mode vs Multimode fibre optic?',
    'When should we use Wireless over Wired?',
  ],
  netiquette: [
    'What are the top rules of Netiquette?',
    'Why is typing in ALL CAPS discouraged?',
    'How do I stay safe in group chats?',
  ],
  'mobile-comm': [
    'How did mobile networks evolve from 1G to 5G?',
    'How do cell towers hand off a call?',
    'Difference between Wi-Fi, Bluetooth, and Cellular?',
  ],
};

export const MeetEduGuideWelcome: React.FC<{
  onStartTour: () => void;
  onSelectRoom: (room: MuseumRoom) => void;
  onOpenChat: (initialQuestion?: string) => void;
}> = ({ onStartTour, onSelectRoom, onOpenChat }) => {
  const [exhibitsExpanded, setExhibitsExpanded] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#152847] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Subtle museum ambient card */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-white/15">
        {/* Left Guide Portrait Column */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#edf3fb] via-[#f5f7fa] to-[#faf5ea] p-7 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#e5e0d5]">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#1e4fd6] uppercase">
              YOUR PERSONAL GUIDE
            </p>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#152847] mt-1">
              Meet EduGuide
            </h1>
          </div>

          <div className="my-4 flex items-center justify-center">
            <div className="w-56 h-56 sm:w-64 sm:h-64">
              <EduGuideAvatarSvg />
            </div>
          </div>

          <div className="bg-white/95 border border-[#e5e0d5] rounded-full px-4 py-2 text-center shadow-2xs">
            <span className="text-xs font-semibold text-[#152847]">
              DTI · Chapter 5 · Computer Networks
            </span>
          </div>
        </div>

        {/* Right Welcome Content Column */}
        <div className="md:col-span-7 bg-white p-7 sm:p-10 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-[#eff6ff] text-[#1e4fd6] text-xs font-semibold px-3.5 py-1 rounded-full">
              Welcome to the museum
            </span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#152847] tracking-tight">
            Hey there, explorer! <span aria-hidden="true">👋</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed mt-4">
            Welcome to our Virtual Network Museum! I’m your personal guide.
            Together, we’ll discover how computer networks work, explore amazing
            exhibits, and test your knowledge. Ready to begin our journey?
          </p>

          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={onStartTour}
              className="w-full bg-[#152847] hover:bg-[#1e3a66] text-white font-semibold rounded-xl px-6 py-4 flex items-center justify-between transition-colors shadow-sm cursor-pointer"
            >
              <span>Start My Tour</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div>
              <button
                type="button"
                onClick={() => setExhibitsExpanded((prev) => !prev)}
                className="w-full bg-white hover:bg-[#faf8f4] text-[#152847] font-semibold rounded-xl px-6 py-3.5 border border-[#e5e0d5] flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Explore Exhibits</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    exhibitsExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {exhibitsExpanded && (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-[#faf8f4] rounded-xl border border-[#e5e0d5]">
                  <button
                    type="button"
                    onClick={() => onSelectRoom('packets')}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#eff6ff] border border-[#e5e0d5] text-left text-sm font-semibold text-[#152847] transition-colors cursor-pointer"
                  >
                    <span>📦</span>
                    <span>Packets Room</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoom('transmission-media')}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#f0fdfa] border border-[#e5e0d5] text-left text-sm font-semibold text-[#152847] transition-colors cursor-pointer"
                  >
                    <span>🔌</span>
                    <span>Transmission Media</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoom('netiquette')}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#fffbeb] border border-[#e5e0d5] text-left text-sm font-semibold text-[#152847] transition-colors cursor-pointer"
                  >
                    <span>💬</span>
                    <span>Netiquette Room</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoom('mobile-comm')}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#f5f3ff] border border-[#e5e0d5] text-left text-sm font-semibold text-[#152847] transition-colors cursor-pointer"
                  >
                    <span>📱</span>
                    <span>Mobile Communication Room</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoom('explore')}
                    className="sm:col-span-2 flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#fdf2f8] border border-[#e5e0d5] text-sm font-semibold text-[#152847] transition-colors cursor-pointer"
                  >
                    <span>🎬</span>
                    <span>Back to Explore</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                onOpenChat('Can you help me navigate the Virtual Network Museum?')
              }
              className="text-sm font-bold text-[#152847] hover:text-[#1e4fd6] hover:underline cursor-pointer"
            >
              Help Me Navigate
            </button>

            <button
              type="button"
              onClick={() => onSelectRoom('lobby')}
              className="text-xs font-medium text-slate-500 hover:text-[#152847] cursor-pointer"
            >
              Go to Museum Lobby →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FloatingMuseumGuide: React.FC<EduGuideProps> = ({
  activeRoom,
  onSelectRoom,
  isChatOpen,
  setIsChatOpen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "Hi explorer! 👋 I'm EduGuide, your AI museum companion for Chapter 5: Computer Networks. Ask me anything about Packets, Transmission Media, Netiquette, or Mobile Communication!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/eduguide/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          currentRoom: activeRoom,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'EduGuide could not respond right now.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply,
        },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Unable to connect to EduGuide.';
      setErrorText(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendQuestion(input);
  };

  const quickPrompts = ROOM_QUICK_PROMPTS[activeRoom] || ROOM_QUICK_PROMPTS.explore;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Drawer Window */}
      {isChatOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#e5e0d5] overflow-hidden flex flex-col max-h-[540px]">
          {/* Chat Header */}
          <div className="bg-[#152847] text-white px-4 py-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#edf3fb] border border-white/30 overflow-hidden shrink-0">
                <EduGuideAvatarSvg />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-title font-bold text-sm text-white truncate">
                    EduGuide AI Chatbot
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-[#f6c453] shrink-0" />
                </div>
                <p className="text-[11px] text-slate-300 truncate">
                  Personal Museum Guide · Chapter 5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsChatOpen(false);
                  onSelectRoom('welcome');
                }}
                title="Open Meet EduGuide Welcome Screen"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close EduGuide chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8f4] min-h-[250px] max-h-[320px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#152847] text-white rounded-br-sm'
                      : 'bg-white text-slate-800 border border-[#e5e0d5] rounded-bl-sm shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 border border-[#e5e0d5] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-xs font-medium">
                  EduGuide is thinking…
                </div>
              </div>
            )}

            {errorText && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                {errorText}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contextual Quick Prompts */}
          <div className="px-3 py-2 bg-[#f2eee4] border-t border-[#e5e0d5] flex items-center gap-1.5 overflow-x-auto">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={isLoading}
                onClick={() => void sendQuestion(prompt)}
                className="text-[11px] font-medium bg-white hover:bg-[#eff6ff] text-[#152847] border border-[#ded9ce] rounded-lg px-2.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-[#e5e0d5] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EduGuide a question…"
              className="flex-1 text-sm bg-[#faf8f4] border border-[#d6d0c4] rounded-xl px-3.5 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#152847]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-[#152847] hover:bg-[#1e3a66] text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circular EduGuide Avatar Button */}
      <button
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label="Open EduGuide AI Chatbot"
        title="Ask EduGuide AI Chatbot"
        className="relative w-14 h-14 rounded-full bg-[#152847] border-2 border-white shadow-xl hover:scale-105 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e59b14] cursor-pointer flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#dbeafe]">
          <EduGuideAvatarSvg />
        </div>
        {/* Subtle chat indicator badge */}
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#e59b14] border-2 border-white flex items-center justify-center">
          <MessageSquare className="w-2 h-2 text-[#152847]" />
        </span>
      </button>
    </div>
  );
};
