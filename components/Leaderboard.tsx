import React from 'react';
import type { Sharer } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';

interface LeaderboardProps {
  sharers: Sharer[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ sharers }) => {
  const getTrophyColor = (index: number) => {
    if (index === 0) return 'text-yellow-400'; // Gold
    if (index === 1) return 'text-slate-400'; // Silver
    if (index === 2) return 'text-amber-600';  // Bronze
    return 'text-gray-500';
  };
  
  const getMedalStyles = (index: number) => {
    switch (index) {
      case 0:
        return 'border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/10';
      case 1:
        return 'border-slate-400/30 hover:shadow-lg hover:shadow-slate-400/10';
      case 2:
        return 'border-amber-600/30 hover:shadow-lg hover:shadow-amber-600/10';
      default:
        return 'border-transparent';
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-400/20 rounded-full">
            <TrophyIcon className="w-6 h-6 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold">Sindh's Top Creators</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {sharers.map((sharer, index) => (
          <li 
            key={sharer.name} 
            className={`flex items-center gap-4 p-2 rounded-lg border transition-all duration-300 hover:bg-base-300 ${getMedalStyles(index)}`}
          >
            <span className={`font-bold w-6 text-center text-lg ${getTrophyColor(index)}`}>{index + 1}</span>
            <img 
              src={sharer.avatar} 
              alt={`${sharer.name}'s avatar`} 
              className="w-10 h-10 rounded-full object-cover bg-base-300" 
            />
            <div className="flex-1">
              <p className="font-semibold text-base-content">{sharer.name}</p>
              <p className="text-sm text-gray-400">{sharer.shares}M followers</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};