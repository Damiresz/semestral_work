'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Geolocation from '@/components/Geolocation';
import WeatherSection from '@/components/WeatherSection';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export default function Home() {
  const [isOnline, setIsOnline] = useState(true);
  const [weatherArray, setWeatherArray] = useState<WeatherData[]>([]);
  const weatherScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeatherArray(data);
      } catch (error) {
        setWeatherArray([]);
        console.error('Error loading weather:', error);
      }
    };

    fetchWeather();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const el = weatherScrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <Navigation />
      <header className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Interactive Application
        </motion.h1>
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

      <section className="max-w-6xl mx-auto justify-center flex flex-col gap-8">
        <WeatherSection weatherArray={weatherArray} isOnline={isOnline} />
        <Geolocation />
      </section>
    </main>
  );
}
