import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4';

export default function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCapturing = true;
    let animId: number | null = null;
    let videoFrameCallbackId: number | null = null;
    let renderAnimId: number | null = null;
    let frames: HTMLCanvasElement[] = [];
    let lastTime = -1;

    // Ensure audio is muted to permit autoplay
    video.muted = true;
    video.defaultMuted = true;

    // Start video playback
    const startPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        // Autoplay policy fallback: listen for user interaction if strictly blocked
        const onFirstInteract = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', onFirstInteract);
          window.removeEventListener('touchstart', onFirstInteract);
        };
        window.addEventListener('click', onFirstInteract);
        window.addEventListener('touchstart', onFirstInteract);
      }
    };

    startPlay();

    // Frame capture helper
    const captureCurrentFrame = () => {
      if (!isCapturing || !video) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      if (
        videoWidth > 0 &&
        videoHeight > 0 &&
        Math.abs(video.currentTime - lastTime) >= 0.015
      ) {
        lastTime = video.currentTime;

        // Cap capture width at 960px, scale height proportionally
        const targetWidth = Math.min(videoWidth, 960);
        const targetHeight = Math.round((videoHeight / videoWidth) * targetWidth);

        try {
          const offscreen = document.createElement('canvas');
          offscreen.width = targetWidth;
          offscreen.height = targetHeight;
          const ctx = offscreen.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
            frames.push(offscreen);
          }
        } catch {
          // If cross-origin restrictions taint canvas, catch gracefully
        }
      }

      if (!video.ended && isCapturing) {
        if ('requestVideoFrameCallback' in video) {
          videoFrameCallbackId = (video as any).requestVideoFrameCallback(
            captureCurrentFrame
          );
        } else {
          animId = requestAnimationFrame(captureCurrentFrame);
        }
      }
    };

    // Begin capture once metadata or play begins
    const onPlayOrLoaded = () => {
      if (isCapturing) {
        captureCurrentFrame();
      }
    };

    video.addEventListener('loadeddata', onPlayOrLoaded);
    video.addEventListener('play', onPlayOrLoaded);

    // Boomerang ping-pong animation at 30fps
    const startBoomerangPlayback = () => {
      const displayCanvas = canvasRef.current;
      if (!displayCanvas || frames.length === 0) return;

      const firstFrame = frames[0];
      displayCanvas.width = firstFrame.width;
      displayCanvas.height = firstFrame.height;

      const ctx = displayCanvas.getContext('2d');
      if (!ctx) return;

      let currentIndex = 0;
      let direction = 1;
      const fpsInterval = 1000 / 30; // 30fps exact interval
      let lastRenderTime = performance.now();

      const loop = (now: DOMHighResTimeStamp) => {
        const delta = now - lastRenderTime;

        if (delta >= fpsInterval) {
          lastRenderTime = now - (delta % fpsInterval);

          ctx.drawImage(frames[currentIndex], 0, 0);

          // Advance frame index forward to last, then reverse to first, forever
          if (direction === 1) {
            currentIndex++;
            if (currentIndex >= frames.length - 1) {
              currentIndex = frames.length - 1;
              direction = -1;
            }
          } else {
            currentIndex--;
            if (currentIndex <= 0) {
              currentIndex = 0;
              direction = 1;
            }
          }
        }

        renderAnimId = requestAnimationFrame(loop);
      };

      renderAnimId = requestAnimationFrame(loop);
    };

    // When original video completes, switch to ping-pong canvas
    const handleEnded = () => {
      isCapturing = false;
      if (frames.length > 2) {
        setIsReady(true);
        startBoomerangPlayback();
      } else {
        // Fallback: if capture failed due to browser canvas security, loop the video smoothly
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      isCapturing = false;
      if (animId) cancelAnimationFrame(animId);
      if (videoFrameCallbackId && 'cancelVideoFrameCallback' in video) {
        (video as any).cancelVideoFrameCallback(videoFrameCallbackId);
      }
      if (renderAnimId) cancelAnimationFrame(renderAnimId);
      video.removeEventListener('loadeddata', onPlayOrLoaded);
      video.removeEventListener('play', onPlayOrLoaded);
      video.removeEventListener('ended', handleEnded);
      frames = [];
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full scale-[1.15] origin-top overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-top"
          style={{ display: isReady ? 'none' : 'block' }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-top"
          style={{ display: isReady ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
