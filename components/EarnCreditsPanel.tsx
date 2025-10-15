
import React, { useState } from 'react';
import { ShareIcon } from './icons/ShareIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { FacebookIcon } from './icons/FacebookIcon';

interface EarnCreditsPanelProps {
  onVerifyShare: () => void;
}

export const EarnCreditsPanel: React.FC<EarnCreditsPanelProps> = ({ onVerifyShare }) => {
  const [isShared, setIsShared] = useState(false);
  
  const shareText = "Made my post caption using AI Caption Boost 🪄 — Try it free: aicaptionboost.com";
  const shareUrl = "https://aicaptionboost.com";
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;

  const handleVerify = () => {
    onVerifyShare();
    setIsShared(true);
    // In a real app, this would involve backend verification.
    // Here, we just give the user the reward.
  };
  
  return (
    <div className="bg-gradient-to-br from-base-200 to-base-300 p-6 rounded-xl shadow-lg border border-brand-primary/20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-primary/20 rounded-full">
          <ShareIcon className="w-6 h-6 text-brand-primary" />
        </div>
        <h3 className="text-xl font-bold">Share to Earn Credits!</h3>
      </div>
      <p className="mt-3 text-gray-400">
        Get <span className="font-bold text-brand-light">+20 Bonus Credits</span> instantly when you share our app on social media.
      </p>
      
      <div className="mt-4 p-3 bg-base-100 rounded-md text-gray-300 italic">
        "{shareText}"
      </div>
      
      <div className="mt-4 flex gap-4">
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 px-4 bg-[#1DA1F2] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2">
          <TwitterIcon className="w-5 h-5"/> Tweet
        </a>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 px-4 bg-[#1877F2] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2">
         <FacebookIcon className="w-5 h-5" /> Share
        </a>
      </div>

      <button 
        onClick={handleVerify}
        disabled={isShared}
        className="mt-4 w-full py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isShared ? 'Credits Claimed!' : "I've Shared! Claim Reward"}
      </button>
    </div>
  );
};
