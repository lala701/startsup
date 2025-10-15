
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CaptionGenerator } from './components/CaptionGenerator';
import { CaptionCard } from './components/CaptionCard';
import { EarnCreditsPanel } from './components/EarnCreditsPanel';
import { Leaderboard } from './components/Leaderboard';
import { TOP_SHARERS, INITIAL_CREDITS, SHARE_REWARD } from './constants';
import { generateCaptions } from './services/geminiService';
import { Toast } from './components/Toast';
import type { Caption, ToastType } from './types';

const App: React.FC = () => {
  const [userCredits, setUserCredits] = useState<number>(INITIAL_CREDITS);
  const [generatedCaptions, setGeneratedCaptions] = useState<Caption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleGenerate = useCallback(async (postDescription: string) => {
    if (userCredits <= 0) {
      setToast({ message: "You're out of credits! Share to earn more.", type: 'error' });
      return;
    }
    if (!postDescription.trim()) {
      setToast({ message: 'Please describe your post first.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setGeneratedCaptions([]);

    try {
      const captions = await generateCaptions(postDescription);
      setGeneratedCaptions(captions);
      setUserCredits(prev => prev - 1);
      setToast({ message: '1 credit used. On to the next one!', type: 'info' });
    } catch (err) {
      setToast({ message: 'Sorry, failed to generate captions.', type: 'error' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userCredits]);

  const handleShareVerification = useCallback(() => {
    setUserCredits(prev => prev + SHARE_REWARD);
    setToast({ message: `+${SHARE_REWARD} credits earned! Keep sharing!`, type: 'success' });
  }, []);

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Header credits={userCredits} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
              AI Caption Boost 🪄
            </h1>
            <p className="text-center text-lg text-gray-400 max-w-2xl mx-auto">
              Generate catchy social media captions, hashtags, and ideas in seconds.
            </p>
            
            <CaptionGenerator onGenerate={handleGenerate} isLoading={isLoading} hasCredits={userCredits > 0} />
            
            {isLoading && (
              <div className="flex justify-center items-center p-8">
                <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {generatedCaptions.length > 0 && (
              <div className="space-y-4 animate-slide-in">
                 <h2 className="text-2xl font-bold text-center">Your AI-Generated Captions</h2>
                {generatedCaptions.map((caption, index) => (
                  <CaptionCard key={index} caption={caption.caption} hashtags={caption.hashtags} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <EarnCreditsPanel onVerifyShare={handleShareVerification} />
            <Leaderboard sharers={TOP_SHARERS} />
          </aside>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Built with React, Tailwind, and Gemini AI. Share to support!</p>
      </footer>
    </div>
  );
};

export default App;
