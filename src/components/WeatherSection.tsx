import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

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
 * WeatherSection component displays weather information for multiple locations
 * Includes horizontal scrolling and offline mode handling
 */
export default function WeatherSection({ weatherArray, isOnline }: { weatherArray: WeatherData[], isOnline: boolean }) {
  // Reference for horizontal scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Effect for implementing horizontal scroll on wheel event
  useEffect(() => {
    const el = scrollRef.current;
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

  // Offline mode display
  if (!isOnline) {
    return (
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Weather</h2>
          <div className="text-red-500 dark:text-red-400">
            <p className="text-lg">⚠️ Data unavailable in offline mode</p>
            <p className="text-sm mt-2">Please check your internet connection</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-2">
      {/* Horizontal scrollable container for weather cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{ cursor: 'grab' }}
      >
        {/* Weather cards mapping */}
        {weatherArray.length > 0 ? weatherArray.map((weather) => (
          <motion.div
            key={weather.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-[260px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex-shrink-0"
          >
            <h2 className="text-2xl font-semibold mb-4">Weather in {weather.name}</h2>
            <div className="space-y-4">
              {/* Temperature and weather description section */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-gray-500">Feels like {Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div className="text-right">
                  <p className="capitalize">{weather.weather[0].description}</p>
                  <p className="text-sm text-gray-500">Wind: {weather.wind.speed} m/s</p>
                </div>
              </div>
              {/* Humidity information */}
              <div className="pt-4 border-t dark:border-gray-700">
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
            </div>
          </motion.div>
        )) : (
          // Loading skeleton for weather cards
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="min-w-[260px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex-shrink-0 animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 