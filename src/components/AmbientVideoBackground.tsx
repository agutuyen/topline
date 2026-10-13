import { useEffect, useRef, useState, useCallback } from 'react';

interface AmbientVideoBackgroundProps {
  className?: string;
  overlayOpacity?: number;
}

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4';

/**
 * Dual-video crossfade loop: two <video> elements alternate.
 * When the active video nears its end (~0.8s before), the standby video
 * starts playing and fades in while the active fades out → seamless loop
 * with no stutter at the join point.
 */
export default function AmbientVideoBackground({
  className = '',
  overlayOpacity = 0.45,
}: AmbientVideoBackgroundProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const crossfading = useRef(false);

  const CROSSFADE_LEAD = 0.8; // seconds before end to start crossfade

  const getActive = useCallback(() =>
    activeSlot === 'A' ? videoARef.current : videoBRef.current
  , [activeSlot]);

  const getStandby = useCallback(() =>
    activeSlot === 'A' ? videoBRef.current : videoARef.current
  , [activeSlot]);

  // Initial autoplay
  useEffect(() => {
    const video = videoARef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  // Crossfade logic on timeupdate
  useEffect(() => {
    const active = getActive();
    if (!active) return;

    const onTimeUpdate = () => {
      if (crossfading.current) return;
      const remaining = active.duration - active.currentTime;
      if (!isFinite(remaining) || remaining > CROSSFADE_LEAD) return;

      crossfading.current = true;
      const standby = getStandby();
      if (!standby) return;

      // Reset standby and start playing
      standby.currentTime = 0;
      standby.play().catch(() => {});

      // After the crossfade duration, swap roles
      setTimeout(() => {
        setActiveSlot((prev) => (prev === 'A' ? 'B' : 'A'));
        // Pause the old active after swap completes
        active.pause();
        active.currentTime = 0;
        crossfading.current = false;
      }, CROSSFADE_LEAD * 1000);
    };

    active.addEventListener('timeupdate', onTimeUpdate);
    return () => active.removeEventListener('timeupdate', onTimeUpdate);
  }, [activeSlot, getActive, getStandby]);

  const togglePlay = () => {
    const video = getActive();
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const videoClasses = 'absolute inset-0 w-full h-full object-cover object-center';

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Dual crossfade video elements */}
      <video
        ref={videoARef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        className={`${videoClasses} transition-opacity duration-700 ${
          activeSlot === 'A' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
        }`}
      />
      <video
        ref={videoBRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className={`${videoClasses} transition-opacity duration-700 ${
          activeSlot === 'B' ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
        }`}
      />

      {/* Fade-in reveal from poster/placeholder */}
      {!loaded && (
        <div className="absolute inset-0 z-[2] bg-gradient-to-br from-[#2a2520] to-[#1a1815]" />
      )}

      {/* Balanced overlay: brighter than original but readable */}
      <div
        className="absolute inset-0 z-[3] bg-gradient-to-b from-black/50 via-black/35 to-[#1a1815]/70"
        style={{ opacity: overlayOpacity }}
      />

      {/* Left-side text protection gradient */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />

      {/* Warm highlight radial for vibrancy */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_30%_30%,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />

      {/* Micro grain texture */}
      <div
        className="absolute inset-0 z-[4] opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Playback toggle */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden sm:flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause background' : 'Play background'}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
