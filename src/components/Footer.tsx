import React from 'react';
import { MuseumRoom } from './MuseumNavbar';

interface FooterProps {
  onSelectRoom?: (room: MuseumRoom) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#152847] text-white py-9 px-4 text-center border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <p className="font-serif-title text-lg font-bold text-white">
          Virtual Network Museum
        </p>
        <p className="text-sm text-slate-300 mt-1">
          Class IX Computer Networks
        </p>
      </div>
    </footer>
  );
};
