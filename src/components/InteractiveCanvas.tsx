'use client';

// Import necessary dependencies
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interface defining the structure of a particle
 * Includes position, size, velocity, and color properties
 */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

/**
 * InteractiveCanvas component that creates an interactive particle animation
 * Includes mouse interaction and particle physics
 */
export default function InteractiveCanvas() {
  // References for canvas and particles
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  // State for drawing and mouse position
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effect for canvas initialization and particle creation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Function to resize canvas to fit container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = 400;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    particlesRef.current = newParticles;

    // Cleanup resize listener
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Effect for particle animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particlesRef.current.forEach(particle => {
        // Update position based on velocity
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Handle wall collisions
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Apply mouse attraction when drawing
        if (isDrawing) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            particle.speedX += dx * 0.001;
            particle.speedY += dy * 0.001;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Request next animation frame
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isDrawing, mousePosition]);

  /**
   * Handle mouse movement on canvas
   * Updates mouse position with proper scaling
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    setMousePosition({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Interactive Canvas</h2>
      <div className="relative">
        {/* Interactive canvas element */}
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] border rounded-lg"
          onMouseMove={handleMouseMove}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
        />
        {/* Interaction instructions */}
        <div className="absolute bottom-4 left-4 text-sm text-gray-500">
          Click and hold to interact with particles
        </div>
      </div>
    </motion.div>
  );
} 