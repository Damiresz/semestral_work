'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CubeAnimation component that displays a rotating 3D cube with gradient effects
 */
export default function CubeAnimation() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState({
    top: '#151515',
    gradient: ['#151515', '#FF0000'],
    glow: '#FF0000'
  });

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to update cube colors
  const updateColors = () => {
    const newColors = {
      top: getRandomColor(),
      gradient: [getRandomColor(), getRandomColor()],
      glow: getRandomColor()
    };
    setColors(newColors);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cubeRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = cubeRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      cubeRef.current.style.transform = `rotateX(${y * 20}deg) rotateY(${x * 20}deg)`;
    };

    const cube = cubeRef.current;
    if (cube) {
      cube.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cube) {
        cube.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateColors();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white relative dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
    >
      <div data-speed="1.2" className="cube_container">
        <h2 className="text-3xl font-bold text-center mb-8 -translate-y-24">Interactive 3D Cube</h2>
        <div className="cube">
          <div className="top" style={{ background: colors.top }}></div>
          <div>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  '--i': i,
                  background: `linear-gradient(${colors.gradient[0]}, ${colors.gradient[1]})`
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div 
          className="top::before" 
          style={{
            background: colors.glow,
            boxShadow: `0 0 80px ${colors.glow}40,
                       0 0 160px ${colors.glow}60,
                       0 0 200px ${colors.glow}80,
                       0 0 300px ${colors.glow}90`
          }}
        />
      </div>
    </motion.div>
  );
} 