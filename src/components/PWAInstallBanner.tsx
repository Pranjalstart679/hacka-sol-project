import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install on iOS: Tap Share -> "Add to Home Screen". On Android Chrome: Tap 3 dots -> "Install App".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-lg p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-800 text-neutral-300 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Download className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs font-sans">
        <strong className="text-white font-bold block text-sm font-display tracking-tightest">
          Add Rakshya to Home Screen
        </strong>
        <p className="text-neutral-400 mt-0.5 leading-relaxed text-[11px]">
          Install as a lightweight progressive web application for instant emergency access.
        </p>
        <div className="mt-2.5 flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-semibold rounded flex items-center gap-1 transition-colors border border-red-600"
          >
            Install
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="px-2 py-1 text-neutral-400 hover:text-white text-[11px]"
          >
            Dismiss
          </button>
        </div>
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className="text-neutral-400 hover:text-white p-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
