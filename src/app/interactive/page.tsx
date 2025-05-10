'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveCanvas from '@/components/InteractiveCanvas';
import SvgAnimation from '@/components/SvgAnimation';
import AudioPlayer from '@/components/AudioPlayer';

export default function InteractivePage() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <main className="min-h-screen p-8">
      <Navigation />
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Interactive Components</h1>
        <div className="flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="ml-4 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Test Offline Mode
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <InteractiveCanvas />
        <SvgAnimation />
        <div className="md:col-span-2">
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
} 