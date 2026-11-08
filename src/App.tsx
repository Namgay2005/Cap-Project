import React, { useState, useEffect } from 'react';
import { MuseumNavbar, MuseumRoom } from './components/MuseumNavbar';
import {
  FloatingMuseumGuide,
  MeetEduGuideWelcome,
} from './components/FloatingMuseumGuide';
import { PacketsRoom } from './components/rooms/PacketsRoom';
import { TransmissionMediaRoom } from './components/rooms/TransmissionMediaRoom';
import { NetiquetteRoom } from './components/rooms/NetiquetteRoom';
import { MobileCommRoom } from './components/rooms/MobileCommRoom';
import { ExploreLobby } from './components/rooms/ExploreLobby';
import { ExitGalleryRoom } from './components/rooms/ExitGalleryRoom';
import { Footer } from './components/Footer';

function roomFromPathname(pathname: string): MuseumRoom {
  const clean = pathname.toLowerCase().replace(/\/+$/, '');
  if (clean === '/packets') return 'packets';
  if (clean === '/transmission-media') return 'transmission-media';
  if (clean === '/netiquette') return 'netiquette';
  if (clean === '/mobile-comm') return 'mobile-comm';
  if (clean === '/explore' || clean === '/exit-gallery') return 'explore';
  if (clean === '/lobby' || clean === '/museum') return 'lobby';
  return 'welcome';
}

function pathForRoom(room: MuseumRoom): string {
  switch (room) {
    case 'packets':
      return '/packets';
    case 'transmission-media':
      return '/transmission-media';
    case 'netiquette':
      return '/netiquette';
    case 'mobile-comm':
      return '/mobile-comm';
    case 'explore':
      return '/explore';
    case 'lobby':
      return '/museum';
    case 'welcome':
    default:
      return '/';
  }
}

export function App() {
  const [activeRoom, setActiveRoom] = useState<MuseumRoom>(() =>
    roomFromPathname(window.location.pathname)
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setActiveRoom(roomFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSelectRoom = (room: MuseumRoom) => {
    setActiveRoom(room);
    const targetPath = pathForRoom(room);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-slate-800">
      <MuseumNavbar activeRoom={activeRoom} onSelectRoom={handleSelectRoom} />

      <main className="flex-1">
        {activeRoom === 'welcome' && (
          <MeetEduGuideWelcome
            onStartTour={() => handleSelectRoom('packets')}
            onSelectRoom={handleSelectRoom}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activeRoom === 'lobby' && (
          <ExploreLobby
            onSelectRoom={handleSelectRoom}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activeRoom === 'packets' && (
          <PacketsRoom onNavigateRoom={handleSelectRoom} />
        )}

        {activeRoom === 'transmission-media' && (
          <TransmissionMediaRoom onNavigateRoom={handleSelectRoom} />
        )}

        {activeRoom === 'netiquette' && (
          <NetiquetteRoom onNavigateRoom={handleSelectRoom} />
        )}

        {activeRoom === 'mobile-comm' && (
          <MobileCommRoom onNavigateRoom={handleSelectRoom} />
        )}

        {activeRoom === 'explore' && (
          <ExitGalleryRoom onNavigateRoom={handleSelectRoom} />
        )}
      </main>

      {activeRoom !== 'welcome' && <Footer onSelectRoom={handleSelectRoom} />}

      <FloatingMuseumGuide
        activeRoom={activeRoom}
        onSelectRoom={handleSelectRoom}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
    </div>
  );
}

export default App;
