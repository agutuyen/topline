import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface BackToTopProps {
  lang: Language;
}

export default function BackToTop({ lang }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Show button after scrolling past 320px
      if (scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={lang === 'vi' ? 'Trở về đầu trang' : 'Back to top'}
      title={lang === 'vi' ? 'Trở về đầu trang' : 'Back to top'}
      className="group relative w-11 h-11 rounded-full bg-[#191919]/90 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#191919] backdrop-blur-xl border border-white/20 hover:border-[#C5A880] shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 animate-fadeIn"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="19"
          className="stroke-white/10"
          strokeWidth="1.5"
          fill="none"
        />
        <circle
          cx="22"
          cy="22"
          r="19"
          className="stroke-[#C5A880] group-hover:stroke-[#191919] transition-colors"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="119.38"
          strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
          strokeLinecap="round"
        />
      </svg>

      {/* Up Arrow Icon with Lift Motion */}
      <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
