'use client';

// Import necessary dependencies
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveCanvas from '@/components/InteractiveCanvas';
import SvgAnimation from '@/components/SvgAnimation';
import AudioPlayer from '@/components/AudioPlayer';

/**
 * InteractivePage component that serves as the interactive components showcase
 * Includes canvas animation, SVG manipulation, and audio player
 */
export default function InteractivePage() {
  // State for online/offline status
  const [isOnline, setIsOnline] = useState(true);

  return (
    <main className="min-h-screen p-8">
      {/* Navigation component */}
      <Navigation />

      {/* Main content section with interactive components */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Interactive canvas component */}
        <InteractiveCanvas />
        {/* SVG animation component */}
        <SvgAnimation />
        {/* Audio player component (full width) */}
        <div className="md:col-span-2">
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
} 