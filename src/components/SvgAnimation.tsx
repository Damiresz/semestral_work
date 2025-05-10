import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SvgAnimation() {
  const [svgColor, setSvgColor] = useState('#f59e42');
  const [svgRotate, setSvgRotate] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold mb-4">SVG Animation</h2>
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        style={{ transform: `rotate(${svgRotate}deg)`, transition: 'transform 0.5s, fill 0.5s' }}
        fill={svgColor}
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
      </svg>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => {
          setSvgColor(svgColor === '#f59e42' ? '#6366f1' : '#f59e42');
          setSvgRotate(svgRotate === 0 ? 180 : 0);
        }}
      >
        Change color and rotate
      </button>
    </motion.div>
  );
} 