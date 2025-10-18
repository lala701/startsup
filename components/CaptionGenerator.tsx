import React, { useState, useEffect } from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { CAPTION_TEMPLATES } from '../constants';

interface CaptionGeneratorProps {
  onGenerate: (description: string, templateName: string) => void;
  isLoading: boolean;
  hasCredits: boolean;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onGenerate, isLoading, hasCredits }) => {
  const [description, setDescription] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(CAPTION_TEMPLATES[0].id);

  const selectedTemplate = CAPTION_TEMPLATES.find(t => t.id === selectedTemplateId) || CAPTION_TEMPLATES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(description, selectedTemplate.name);
  };

  useEffect(() => {
    // Clear description when template changes, but not on initial render
    const isInitialMount = description === '';
    if (!isInitialMount) {
        setDescription('');
    }
  }, [selectedTemplateId]);


  return (
    <div className="p-6 bg-base-200 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-300 mb-3">
            1. Choose a template
          </label>
          <div className="flex flex-wrap gap-2">
            {CAPTION_TEMPLATES.map((template) => {
              const Icon = template.icon;
              const isActive = template.id === selectedTemplateId;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all border-2 ${
                    isActive
                      ? 'bg-brand-primary/20 border-brand-primary text-brand-light'
                      : 'bg-base-300/50 border-transparent hover:bg-base-300 text-gray-400'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="w-5 h-5" />
                  {template.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="post-description" className="block text-lg font-medium text-gray-300">
            2. Describe your post
          </label>
          <textarea
            id="post-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={selectedTemplate.placeholder}
            className="mt-2 w-full h-32 p-3 bg-base-300 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors text-base-content"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !hasCredits}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary bg-ajrak-button-pattern [background-size:10px] text-white font-bold rounded-lg hover:brightness-110 transition-all duration-300 disabled:bg-gray-500 disabled:bg-none disabled:brightness-100 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
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
