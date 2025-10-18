import { SparklesIcon } from './components/icons/SparklesIcon';
import { TagIcon } from './components/icons/TagIcon';
import { AirplaneIcon } from './components/icons/AirplaneIcon';
import { UserIcon } from './components/icons/UserIcon';
import type { Template } from './types';

export const INITIAL_CREDITS = 10;
export const SHARE_REWARD = 20;

export const CAPTION_TEMPLATES: Template[] = [
  {
    id: 'general',
    name: 'General',
    icon: SparklesIcon,
    placeholder: 'e.g., A photo of my golden retriever playing fetch at the beach during sunset.',
  },
  {
    id: 'product_launch',
    name: 'Product Launch',
    icon: TagIcon,
    placeholder: 'e.g., Announcing our new eco-friendly reusable coffee cup, made from recycled materials!',
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: AirplaneIcon,
    placeholder: 'e.g., A breathtaking view from the top of Mount Fuji in Japan.',
  },
  {
    id: 'personal_update',
    name: 'Personal Update',
    icon: UserIcon,
    placeholder: 'e.g., So excited to share that I\'ve started a new journey as a software engineer at...',
  },
];
