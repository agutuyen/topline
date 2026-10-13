import { useEffect, useRef, useState } from 'react';

interface AmbientVideoBackgroundProps {
  className?: string;
  overlayOpacity?: number;
}

const LUXURY_VIDEOS = [
  // High-resolution architectural woodworking and craftsmanship loops
  'https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-a-piece-of-wood-40439-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-modern-hotel-room-with-comfortable-bed-41847-large.mp4',
];

export default function AmbientVideoBackground({
  className = '',
  overlayOpacity = 0.65,
}: AmbientVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* High-fidelity background video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-90' : 'opacity-40'
        }`}
      />

      {/* Fallback & luxury tone grading overlay */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-[#121212]/95"
        style={{ opacity: overlayOpacity }}
      />

      {/* Warm golden light radial subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />

      {/* Micro-texture grain pattern for tactile furniture feel */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Interactive playback toggle (pointer-events-auto) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden sm:flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 hover:text-white text-xs hover:bg-black/60 transition-all duration-200 cursor-pointer"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-[11px] font-sans tracking-wider uppercase">
            {isPlaying ? 'Video Motion' : 'Paused'}
          </span>
        </button>
      </div>
    </div>
  );
}
