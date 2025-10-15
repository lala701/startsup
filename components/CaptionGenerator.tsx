
import React, { useState } from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface CaptionGeneratorProps {
  onGenerate: (description: string) => void;
  isLoading: boolean;
  hasCredits: boolean;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onGenerate, isLoading, hasCredits }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(description);
  };

  return (
    <div className="p-6 bg-base-200 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="post-description" className="block text-lg font-medium text-gray-300">
          Describe your post...
        </label>
        <textarea
          id="post-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A photo of my golden retriever playing fetch at the beach during sunset."
          className="w-full h-32 p-3 bg-base-300 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors text-base-content"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !hasCredits}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <MagicWandIcon className="w-5 h-5" />
              <span>Generate Captions</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
