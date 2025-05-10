'use client';

// Import necessary dependencies
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Geolocation component that displays user's current location
 * Includes coordinates display and OpenStreetMap integration
 */
export default function Geolocation() {
  // State for storing location coordinates
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  // State for storing error messages
  const [error, setError] = useState<string>('');

  // Effect for getting user's geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        // Error callback
        (error) => {
          setError('Error getting geolocation: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white w-full dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Geolocation</h2>
      {/* Error message display */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : location ? (
        <div className="space-y-4">
          {/* Coordinates display */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-lg">Latitude: {location.lat}</p>
              <p className="text-lg">Longitude: {location.lng}</p>
            </div>
          </div>
          {/* OpenStreetMap iframe */}
          <div className="mt-4 rounded-lg overflow-hidden border dark:border-gray-700">
            <iframe
              title="OpenStreetMap"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <p>Loading geolocation...</p>
      )}
    </motion.div>
  );
} 