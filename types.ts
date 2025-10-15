
export interface Caption {
  caption: string;
  hashtags: string[];
}

export interface Sharer {
  name: string;
  shares: number;
  avatar: string;
}

export type ToastType = 'success' | 'info' | 'error';
