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
    <div className="fixed top-18 right-4 z-50 max-w-sm bg-white border-2 border-red-600 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-top-4">
      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
        <Smartphone className="w-5 h-5" />
      </div>
      <div className="flex-1 text-xs">
        <strong className="text-slate-900 font-extrabold block text-sm">
          Install RakhtKhoj App
        </strong>
        <p className="text-slate-500 mt-0.5">
          Install as a standalone mobile app for instant 1-tap emergency access with zero app-store download.
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Install App
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="px-2 py-1.5 text-slate-400 hover:text-slate-600 text-[11px]"
          >
            Dismiss
          </button>
        </div>
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className="text-slate-400 hover:text-slate-600 p-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
