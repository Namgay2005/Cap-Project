import React from 'react';
import { Menu, X } from 'lucide-react';

export type MuseumRoom =
  | 'welcome'
  | 'lobby'
  | 'packets'
  | 'transmission-media'
  | 'netiquette'
  | 'mobile-comm'
  | 'explore';

interface MuseumNavbarProps {
  activeRoom: MuseumRoom;
  onSelectRoom: (room: MuseumRoom) => void;
  completedStamps?: string[];
}

const NAV_ITEMS: Array<{
  id: MuseumRoom;
  label: string;
  icon: string;
  accentBar: string;
}> = [
  {
    id: 'packets',
    label: 'Packets',
    icon: '📦',
    accentBar: 'bg-[#1e4fd6]',
  },
  {
    id: 'transmission-media',
    label: 'Transmission Media',
    icon: '🔌',
    accentBar: 'bg-[#0d8278]',
  },
  {
    id: 'netiquette',
    label: 'Netiquette',
    icon: '💬',
    accentBar: 'bg-[#c46b08]',
  },
  {
    id: 'mobile-comm',
    label: 'Mobile Communication',
    icon: '📱',
    accentBar: 'bg-[#5e35b1]',
  },
  {
    id: 'explore',
    label: 'Back to Explore',
    icon: '🎬',
    accentBar: 'bg-[#b8295c]',
  },
];

export const MuseumNavbar: React.FC<MuseumNavbarProps> = ({
  activeRoom,
  onSelectRoom,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const progressWidth = React.useMemo(() => {
    switch (activeRoom) {
      case 'packets':
        return 'w-1/5 bg-[#1e4fd6]';
      case 'transmission-media':
        return 'w-2/5 bg-[#0d8278]';
      case 'netiquette':
        return 'w-3/5 bg-[#c46b08]';
      case 'mobile-comm':
        return 'w-4/5 bg-[#5e35b1]';
      case 'explore':
        return 'w-full bg-[#b8295c]';
      default:
        return 'w-1/6 bg-[#e59b14]';
    }
  }, [activeRoom]);

  return (
    <header className="sticky top-0 z-40 bg-[#152847] text-white shadow-md">
      {/* Subtle room progress strip along top edge */}
      <div className="h-[3px] w-full bg-[#0f1d35]">
        <div
          className={`h-full transition-opacity duration-200 ${progressWidth}`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand lockup */}
        <button
          type="button"
          onClick={() => onSelectRoom('lobby')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e59b14] rounded-lg py-1 shrink-0 cursor-pointer"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            🏛️
          </span>
          <span className="block leading-tight">
            <span className="block font-serif-title font-bold text-base tracking-tight text-white group-hover:text-[#f6c453] transition-colors whitespace-nowrap">
              Virtual Network
            </span>
            <span className="block text-xs text-slate-300 font-normal">
              Museum
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-3.5 lg:gap-6 h-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoom === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectRoom(item.id)}
                className={`relative h-full inline-flex items-center gap-2 px-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e59b14] ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="text-sm leading-none" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${item.accentBar}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#10203a] border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoom === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectRoom(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
