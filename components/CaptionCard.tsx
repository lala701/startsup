
import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import type { Caption } from '../types';


export const CaptionCard: React.FC<Caption> = ({ caption, hashtags }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-base-200 p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-brand-primary/20 hover:shadow-lg relative animate-fade-in">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-base-300 rounded-full hover:bg-brand-primary text-gray-300 hover:text-white transition-colors"
        aria-label="Copy caption and hashtags"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <p className="text-base-content pr-8">{caption}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-base-300 text-brand-light text-sm rounded-md">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
