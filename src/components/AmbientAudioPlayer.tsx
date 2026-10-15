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
  const manuallyMutedRef = useRef(false);
  const unlockAttemptedRef = useRef(false);

  // Smooth Volume Ramp Helper
  const fadeVolume = useCallback((targetVol: number, durationMs: number = 600) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const steps = 15;
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
          manuallyMutedRef.current = false;
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const pauseSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    manuallyMutedRef.current = true;
    fadeVolume(0, 300);
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

  // Guaranteed Universal Autoplay on First User Interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Pre-initialize and buffer audio
    audio.load();
    audio.volume = TARGET_VOLUME;
    audio.muted = false;

    // 1. Immediate Autoplay Attempt
    const directPlayPromise = audio.play();
    if (directPlayPromise !== undefined) {
      directPlayPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // 2. Omni-Gesture Interaction Unlock Handler (Capture Phase)
    const unlockEvents = [
      'pointerdown',
      'pointerup',
      'touchstart',
      'touchend',
      'mousedown',
      'mouseup',
      'click',
      'keydown',
    ];

    const handleUserInteraction = () => {
      if (manuallyMutedRef.current) return;
      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      currentAudio.muted = false;
      currentAudio.volume = TARGET_VOLUME;
      
      const p = currentAudio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          removeUnlockListeners();
        }).catch(() => {
          // If gesture token was consumed by another element, keep listening
        });
      }
    };

    const removeUnlockListeners = () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction, { capture: true });
        document.removeEventListener(evt, handleUserInteraction, { capture: true });
      });
    };

    // Attach with capture: true to intercept interactions before any stopPropagation()
    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, handleUserInteraction, { capture: true, passive: true });
    });

    return () => {
      removeUnlockListeners();
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Background Ambient Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/topline-ambient-lounge.mp3"
        loop
        preload="auto"
        autoPlay
        playsInline
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onPlaying={() => setIsPlaying(true)}
      >
        <source src="/audio/topline-ambient-lounge.mp3" type="audio/mpeg" />
        <source src="/audio/topline-ambient-lounge.ogg" type="audio/ogg" />
      </audio>

      {/* Floating Sound Control: Pulsing Invite Pill (if muted/waiting) + Round Toggle Button */}
      <div className="flex items-center gap-2">
        {!isPlaying && (
          <button
            onClick={() => playSound(TARGET_VOLUME)}
            aria-label={lang === 'vi' ? 'Chạm để bật âm thanh không gian' : 'Tap to play ambient music'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191919]/90 border border-[#C5A880]/60 text-[#C5A880] text-[11px] font-sans font-medium shadow-xl backdrop-blur-xl animate-pulse cursor-pointer hover:bg-[#C5A880] hover:text-[#191919] transition-all whitespace-nowrap"
          >
            <span>♫</span>
            <span>{lang === 'vi' ? 'Bật Âm Thanh' : 'Play Music'}</span>
          </button>
        )}

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
              : (lang === 'vi' ? 'Âm thanh không gian: Đang tắt (Bấm để bật)' : 'Ambient Sound: Muted (Click to play)')
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
