'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Geolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
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
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : location ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-lg">Latitude: {location.lat}</p>
              <p className="text-lg">Longitude: {location.lng}</p>
            </div>
          </div>
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