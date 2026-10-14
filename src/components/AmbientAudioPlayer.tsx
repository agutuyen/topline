import { useEffect, useRef, useState, useCallback } from 'react';
import { VolumeX } from 'lucide-react';
import { Language } from '../types';

interface AmbientAudioPlayerProps {
  lang: Language;
}

// 0.70 ensures clean, warm, clearly audible background music
const TARGET_VOLUME = 0.70;

export default function AmbientAudioPlayer({ lang }: AmbientAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Smooth Volume Ramp Helper
  const fadeVolume = useCallback((targetVol: number, durationMs: number = 800) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const steps = 20;
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

  // Explicit Play Function with Sound Unmuted
  const playSound = useCallback((targetVol = TARGET_VOLUME) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = targetVol;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          try {
            localStorage.setItem('topline_ambient_sound', 'on');
          } catch {}
        })
        .catch(() => {
          // If browser Autoplay Policy blocks unmuted sound without user gesture:
          setIsPlaying(false);

          // Setup omni-gesture unlock listener
          const unlock = () => {
            if (audio) {
              audio.muted = false;
              audio.volume = targetVol;
              audio.play().then(() => {
                setIsPlaying(true);
                try {
                  localStorage.setItem('topline_ambient_sound', 'on');
                } catch {}
              }).catch(() => {});
            }
            removeUnlockListeners();
          };

          const removeUnlockListeners = () => {
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('wheel', unlock);
            window.removeEventListener('keydown', unlock);
          };

          window.addEventListener('pointerdown', unlock, { once: true, passive: true });
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('click', unlock, { once: true, passive: true });
          window.addEventListener('scroll', unlock, { once: true, passive: true });
          window.addEventListener('wheel', unlock, { once: true, passive: true });
          window.addEventListener('keydown', unlock, { once: true, passive: true });
        });
    }
  }, []);

  const pauseSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeVolume(0, 400);
    try {
      localStorage.setItem('topline_ambient_sound', 'off');
    } catch {}
  }, [fadeVolume]);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused && !audio.muted) {
      pauseSound();
    } else {
      playSound(TARGET_VOLUME);
    }
  };

  // Attempt autoplay immediately upon component mount
  useEffect(() => {
    let savedPref: string | null = null;
    try {
      savedPref = localStorage.getItem('topline_ambient_sound');
    } catch {}

    // Default to playing sound unless explicitly disabled by user
    if (savedPref !== 'off') {
      playSound(TARGET_VOLUME);
    }

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
    };
  }, [playSound]);

  return (
    <>
      {/* Background Ambient Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        playsInline
        className="hidden"
      >
        <source src="/audio/topline-ambient-lounge.mp3" type="audio/mpeg" />
        <source src="/audio/topline-ambient-lounge.ogg" type="audio/ogg" />
      </audio>

      {/* Floating Sound Control Button (Icon Only - Symmetrical with Back to Top) */}
      <div className="relative group">
        <button
          onClick={toggleSound}
          aria-label={
            isPlaying
              ? (lang === 'vi' ? 'Tắt âm thanh không gian' : 'Mute ambient sound')
              : (lang === 'vi' ? 'Bật âm thanh không gian' : 'Play ambient sound')
          }
          title={
            isPlaying
              ? (lang === 'vi' ? 'Âm thanh không gian: Đang phát (Bấm để tắt)' : 'Ambient Sound: Playing (Click to mute)')
              : (lang === 'vi' ? 'Âm thanh không gian: Đã tắt (Bấm để bật)' : 'Ambient Sound: Muted (Click to play)')
          }
          className={`relative w-11 h-11 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
            isPlaying
              ? 'bg-[#191919]/90 border-[#C5A880]/60 text-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.25)]'
              : 'bg-[#191919]/80 border-white/20 text-white/60 hover:text-white hover:border-[#C5A880]'
          }`}
        >
          {/* Equalizer Wave / Icon */}
          {isPlaying ? (
            <div className="flex items-center gap-[3px] h-4 px-0.5" aria-hidden="true">
              <span className="w-[2.5px] h-2.5 bg-[#C5A880] rounded-full animate-[pulse_0.75s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-4 bg-[#C5A880] rounded-full animate-[pulse_0.55s_ease-in-out_infinite_0.15s]" />
              <span className="w-[2.5px] h-3 bg-[#C5A880] rounded-full animate-[pulse_0.85s_ease-in-out_infinite_0.35s]" />
              <span className="w-[2.5px] h-3.5 bg-[#C5A880] rounded-full animate-[pulse_0.65s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-white/65 group-hover:text-[#C5A880] transition-colors" />
          )}
        </button>
      </div>
    </>
  );
}
