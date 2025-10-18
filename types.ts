import React from 'react';

export interface Caption {
  caption: string;
  hashtags: string[];
}

export type ToastType = 'success' | 'info' | 'error';

// FIX: Add missing Sharer interface used by Leaderboard.tsx
export interface Sharer {
  name: string;
  avatar: string;
  shares: number;
}

export interface Template {
  id: string;
  name: string;
  placeholder: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
