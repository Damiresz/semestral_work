'use client';

// Import necessary dependencies
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Geolocation from '@/components/Geolocation';
import WeatherSection from '@/components/WeatherSection';
import FileUploader from '@/components/FileUploader';

/**
 * Interface defining the structure of weather data
 * Includes temperature, humidity, weather description, and wind speed
 */
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

/**
 * Main Home component that serves as the application's landing page
 * Manages online/offline state and weather data fetching
 */
export default function Home() {
  // State for tracking online/offline status
  const [isOnline, setIsOnline] = useState(true);
  // State for storing weather data array
  const [weatherArray, setWeatherArray] = useState<WeatherData[]>([]);
  // Reference for weather section horizontal scroll
  const weatherScrollRef = useRef<HTMLDivElement>(null);

  // Effect for handling online/offline status and fetching weather data
  useEffect(() => {
    // Event handlers for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners for online/offline status
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Function to fetch weather data from API
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

    // Initial weather data fetch
    fetchWeather();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effect for implementing horizontal scroll on wheel event
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
      {/* Navigation component */}
      <Navigation />
      
      {/* Header section with online status indicator */}
      <header className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Interactive Application
        </motion.h1>
        {/* Online status indicator and test button */}
        <div className="flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </header>

      {/* Main content section */}
      <section className="max-w-6xl mx-auto justify-center flex flex-col gap-8">
        {/* Weather section component */}
        <WeatherSection weatherArray={weatherArray} isOnline={isOnline} />
        {/* Geolocation component */}
        {isOnline ? <Geolocation /> : (
          <div className="dark:bg-gray-800 flex flex-col items-center justify-center p-12  rounded-xl shadow-md">
            <svg 
              className="w-20 h-20 text-blue-500 mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
              />
            </svg>
            <h3 className="text-2xl font-bold  mb-3">Map Unavailable</h3>
            <p className="text-gray-300 text-center max-w-md leading-relaxed">
              Unfortunately, the map cannot be loaded in offline mode.<br />
              Please check your internet connection.
            </p>
          </div>
        )}
        {/* File Uploader component */}
       {isOnline && <FileUploader />}
      </section>
    </main>
  );
}
