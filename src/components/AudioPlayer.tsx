import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AudioPlayer component that provides a full-featured audio player
 * Includes visualization, playback controls, and audio processing
 */
export default function AudioPlayer() {
  // References for audio and canvas elements
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  
  // References for Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [analyserReady, setAnalyserReady] = useState(false);

  // Effect for audio visualization
  useEffect(() => {
    if (!analyserReady) return;
    const canvas = canvasRef.current;
    const analyserNode = analyserRef.current;
    if (!canvas || !analyserNode) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    
    // Configure analyzer
    analyserNode.fftSize = 64;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let animationId: number;
    
    // Draw visualization
    function draw() {
      if (!canvas || !ctx2d || !analyserNode) return;
      analyserNode.getByteFrequencyData(dataArray);
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength);
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx2d.fillStyle = '#3b82f6';
        ctx2d.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [analyserReady]);

  // Effect for updating audio properties
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLoop;
    }
  }, [volume, isMuted, playbackRate, isLoop]);

  // Handle play/pause functionality
  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      // Initialize AudioContext and analyzer on first play
      if (!audioCtxRef.current) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyserNode = ctx.createAnalyser();
        const src = ctx.createMediaElementSource(audioRef.current);
        src.connect(analyserNode);
        analyserNode.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyserNode;
        sourceRef.current = src;
        setAnalyserReady(true);
      }
      // Resume context if suspended
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
  };

  // Handle metadata loading
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    setDuration(isNaN(dur) ? 0 : dur);
    console.log('onLoadedMetadata duration:', dur);
  };

  // Effect for updating duration if initially 0
  useEffect(() => {
    if (duration === 0 && audioRef.current) {
      const interval = setInterval(() => {
        const dur = audioRef.current!.duration;
        if (!isNaN(dur) && dur > 0) {
          setDuration(dur);
          console.log('interval duration update:', dur);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [duration]);

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  // Handle time skip
  const handleSkip = (seconds: number) => {
    if (!audioRef.current || !duration) return;
    let newTime = audioRef.current.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Audio Player</h2>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={'/Bella Ciao.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
      {/* Play/Pause button */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      {/* Visualization canvas */}
      <canvas ref={canvasRef} width={260} height={40} className="w-full mb-2 rounded bg-gray-100 dark:bg-gray-900" />
      {/* Progress bar and skip controls */}
      <div className="flex items-center w-full gap-2 mb-2">
        <button onClick={() => handleSkip(-10)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">-10s</button>
        <div
          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded cursor-pointer mx-2"
          onClick={handleProgressClick}
        >
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: duration > 0 ? `${Math.min((progress / duration) * 100, 100)}%` : '0%' }}
          />
        </div>
        <button onClick={() => handleSkip(10)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">+10s</button>
      </div>
      {/* Time display */}
      <div className="w-full flex justify-between text-xs text-gray-500 mb-2">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      {/* Additional controls */}
      <div className="flex items-center gap-4 w-full mb-2">
        {/* Loop control */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isLoop}
            onChange={() => setIsLoop(l => !l)}
          />
          Repeat
        </label>
        {/* Mute control */}
        <button
          onClick={() => setIsMuted(m => !m)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        {/* Volume control */}
        <label className="flex items-center gap-2">
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={e => {
              setVolume(Number(e.target.value));
              if (Number(e.target.value) === 0) setIsMuted(true);
              else setIsMuted(false);
            }}
            className="w-24"
          />
        </label>
        {/* Playback speed control */}
        <label className="flex items-center gap-2">
          Speed
          <select
            value={playbackRate}
            onChange={e => setPlaybackRate(Number(e.target.value))}
            className="border rounded p-1 bg-white dark:bg-gray-700"
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>
    </motion.div>
  );
}

/**
 * Format time in seconds to MM:SS format
 * @param sec - Time in seconds
 * @returns Formatted time string
 */
function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
} 