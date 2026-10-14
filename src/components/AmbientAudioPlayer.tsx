import { useEffect, useRef, useState, useCallback } from 'react';
import { VolumeX } from 'lucide-react';
import { Language } from '../types';

interface AmbientAudioPlayerProps {
  lang: Language;
}

const TARGET_VOLUME = 0.22; // Comfortable, luxurious background volume

export default function AmbientAudioPlayer({ lang }: AmbientAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume] = useState(TARGET_VOLUME);
  const fadeIntervalRef = useRef<number | null>(null);

  // Smooth Volume Fade Helper
  const fadeVolume = useCallback((targetVol: number, durationMs: number = 1500) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const steps = 30;
    const stepTime = durationMs / steps;
    const startVol = audio.volume;
    const delta = (targetVol - startVol) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      const nextVol = Math.min(1, Math.max(0, startVol + delta * currentStep));
      if (audio) {
        audio.volume = nextVol;
      }
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (targetVol === 0 && audio) {
          audio.pause();
          setIsPlaying(false);
        }
      }
    }, stepTime);
  }, []);

  const startPlayingWithFade = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          fadeVolume(volume, 1800);
          try {
            localStorage.setItem('topline_ambient_sound', 'on');
          } catch {}
        })
        .catch(() => {
          // Autoplay blocked by browser policy until interaction
          setIsPlaying(false);
        });
    }
  }, [fadeVolume, volume]);

  const pauseWithFade = useCallback(() => {
    fadeVolume(0, 800);
    try {
      localStorage.setItem('topline_ambient_sound', 'off');
    } catch {}
  }, [fadeVolume]);

  const toggleSound = () => {
    if (isPlaying) {
      pauseWithFade();
    } else {
      startPlayingWithFade();
    }
  };

  // Browser Autoplay compliance: Listen to first user gesture to initiate sound
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let savedPref: string | null = null;
    try {
      savedPref = localStorage.getItem('topline_ambient_sound');
    } catch {}

    // If user explicitly muted previously, don't auto-start
    if (savedPref === 'off') {
      return;
    }

    const handleFirstGesture = () => {
      if (!hasInteracted) {
        startPlayingWithFade();
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
    };
  }, [hasInteracted, startPlayingWithFade]);

  return (
    <>
      {/* Background Ambient Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/audio/topline-ambient-lounge.mp3" type="audio/mpeg" />
        <source src="/audio/topline-ambient-lounge.ogg" type="audio/ogg" />
      </audio>

      {/* Floating Sound Control Pill */}
      <div className="relative group">
        <button
          onClick={toggleSound}
          aria-label={isPlaying ? (lang === 'vi' ? 'Tắt âm thanh không gian' : 'Mute ambient sound') : (lang === 'vi' ? 'Bật âm thanh không gian' : 'Play ambient sound')}
          title={isPlaying ? (lang === 'vi' ? 'Tắt âm thanh không gian' : 'Mute ambient sound') : (lang === 'vi' ? 'Bật âm thanh không gian' : 'Play ambient sound')}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.35)] cursor-pointer hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'bg-[#191919]/90 border-[#C5A880]/50 text-[#C5A880]'
              : 'bg-[#191919]/75 border-white/20 text-white/75 hover:text-white hover:border-white/40'
          }`}
        >
          {/* Equalizer Wave / Icon */}
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-3.5 px-0.5">
              <span className="w-0.5 h-2 bg-[#C5A880] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3.5 bg-[#C5A880] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-2.5 bg-[#C5A880] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-3 bg-[#C5A880] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-white/60" />
          )}

          {/* Sound Label */}
          <span className="text-xs font-sans font-medium tracking-wide select-none whitespace-nowrap">
            {isPlaying
              ? (lang === 'vi' ? 'Âm Thanh Không Gian' : 'Ambient Lounge')
              : (lang === 'vi' ? 'Bật Âm Thanh' : 'Play Music')}
          </span>
        </button>
      </div>
    </>
  );
}
