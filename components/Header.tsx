
import React from 'react';
import { CreditIcon } from './icons/CreditIcon';

interface HeaderProps {
  credits: number;
}

export const Header: React.FC<HeaderProps> = ({ credits }) => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-base-content">
          AI Caption <span className="text-brand-primary">Boost</span>
        </div>
        <div className="flex items-center gap-2 bg-base-300 px-4 py-2 rounded-full text-brand-light font-semibold">
          <CreditIcon className="w-5 h-5" />
          <span>{credits} Credits</span>
        </div>
      </nav>
    </header>
  );
};
