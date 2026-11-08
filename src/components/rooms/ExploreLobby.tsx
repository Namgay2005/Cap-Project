import React from 'react';
import { ArrowRight, Compass, MessageSquare } from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';

interface ExploreLobbyProps {
  onSelectRoom: (room: MuseumRoom) => void;
  onOpenChat: () => void;
}

const ROOM_CARDS: Array<{
  id: MuseumRoom;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  borderTopClass: string;
  ctaColor: string;
}> = [
  {
    id: 'packets',
    number: 'WING 01',
    icon: '📦',
    title: 'Packets Room',
    subtitle: 'How digital messages break apart & reassemble',
    description:
      'Step through how data splits into packets, inspect Headers, Payloads, and Trailers, watch routers steer traffic, and browse teacher presentations.',
    borderTopClass: 'border-t-[#1e4fd6]',
    ctaColor: 'text-[#1e4fd6]',
  },
  {
    id: 'transmission-media',
    number: 'WING 02',
    icon: '🔌',
    title: 'Transmission Media Room',
    subtitle: 'Wired cables & wireless channels carrying signals',
    description:
      'Explore the 5 Teacher Reference Posters and interactive Museum Exhibit Posters covering Twisted Pair, Coaxial, Fibre Optic, and Wireless media.',
    borderTopClass: 'border-t-[#0d8278]',
    ctaColor: 'text-[#0d8278]',
  },
  {
    id: 'netiquette',
    number: 'WING 03',
    icon: '💬',
    title: 'Netiquette Room',
    subtitle: 'Responsible and respectful behaviour when communicating online',
    description:
      'Explore the Six Rules of Netiquette, test your judgement in the Scenario Gallery, rehearse classroom Roleplay Scripts, and take the Netiquette Quiz.',
    borderTopClass: 'border-t-[#c46b08]',
    ctaColor: 'text-[#c46b08]',
  },
  {
    id: 'mobile-comm',
    number: 'WING 04',
    icon: '📱',
    title: 'Mobile Communication Room',
    subtitle: 'Discover how mobile devices connect people across the world',
    description:
      'Learn how radio waves, cell towers, and SIM cards work together, explore everyday mobile uses, review the 60-mark presentation rubric, and take the quiz.',
    borderTopClass: 'border-t-[#5e35b1]',
    ctaColor: 'text-[#5e35b1]',
  },
];

export const ExploreLobby: React.FC<ExploreLobbyProps> = ({
  onSelectRoom,
  onOpenChat,
}) => {
  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* Grand Museum Rotunda Hero */}
      <section className="bg-[#152847] text-white py-14 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#f6c453]">
            CLASS IX · DIGITAL TECHNOLOGY &amp; INNOVATION · CHAPTER 5
          </p>
          <h1 className="font-serif-title text-3xl sm:text-5xl font-bold tracking-tight mt-3 text-white">
            Virtual Network Museum
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Choose an exhibition wing below to explore interactive computer
            networking models, classroom reference posters, and stamp quizzes.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onSelectRoom('packets')}
              className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <span>Start Guided Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectRoom('welcome')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Meet EduGuide</span>
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask EduGuide AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Exhibition Wing Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#152847]">
              Exhibition Wings
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Visit all four wings in order or jump straight to any topic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROOM_CARDS.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelectRoom(room.id)}
              className={`bg-white rounded-2xl border border-[#e5e0d5] border-t-4 ${room.borderTopClass} hover:border-slate-300 transition-colors p-6 text-left flex flex-col justify-between group shadow-2xs cursor-pointer`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-slate-400">
                      {room.number}
                    </span>
                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847] mt-0.5">
                      {room.title}
                    </h3>
                  </div>
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {room.icon}
                  </span>
                </div>

                <p className="text-sm italic text-slate-500 mt-2">
                  {room.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                  {room.description}
                </p>
              </div>

              <div className="pt-5">
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-bold ${room.ctaColor} group-hover:underline`}
                >
                  <span>Enter Room</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Back to Explore Finale Card */}
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#b8295c] shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#fdf2f8] border border-[#fbcfe8] text-2xl flex items-center justify-center shrink-0">
              <span aria-hidden="true">🎬</span>
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#b8295c]">
                FINAL STOP
              </span>
              <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                Back to Explore — Review, Video Theatre &amp; Reflection Wall
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Finished exploring the four rooms? Review key concepts, watch
                your team&apos;s summary video, and post on the Reflection Wall.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectRoom('explore')}
            className="inline-flex items-center justify-center gap-2 bg-[#b8295c] hover:bg-[#991f4b] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <span>Back to Explore</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
