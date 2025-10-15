
import React from 'react';
import type { Sharer } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';

interface LeaderboardProps {
  sharers: Sharer[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ sharers }) => {
  const getTrophyColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-400/20 rounded-full">
            <TrophyIcon className="w-6 h-6 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold">Top Sharers</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {sharers.map((sharer, index) => (
          <li key={sharer.name} className="flex items-center gap-4 p-2 rounded-md hover:bg-base-300 transition-colors">
            <span className={`font-bold w-6 text-center ${getTrophyColor(index)}`}>{index + 1}</span>
            <img src={sharer.avatar} alt={sharer.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-base-content">{sharer.name}</p>
              <p className="text-sm text-gray-400">{sharer.shares} shares</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
