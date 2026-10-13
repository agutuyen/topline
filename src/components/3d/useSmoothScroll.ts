import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });


    const updateLenis = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(updateLenis);
    };
    const reqId = requestAnimationFrame(updateLenis);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);
}
