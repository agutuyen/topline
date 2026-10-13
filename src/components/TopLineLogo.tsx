interface TopLineLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'monogram';
  theme?: 'dark' | 'light';
}

export default function TopLineLogo({
  className = '',
  variant = 'compact',
  theme = 'dark',
}: TopLineLogoProps) {
  const isLight = theme === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#191919]';
  const subColor = isLight ? 'text-white/70' : 'text-[#191919]/70';
  const goldColor = '#C5A880';
  const lColor = isLight ? '#FFFFFF' : '#191919';

  // High-fidelity vector monogram matching logo.jpg
  const MonogramSvg = (
    <svg
      viewBox="0 0 160 140"
      className="h-10 w-auto select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Top Line Monogram TL"
    >
      {/* T - Gold serif letter */}
      <path
        d="M20 20 H92 C88 28 85 36 84 46 H76 C76 34 72 30 60 30 H56 V100 C56 108 60 112 70 112 V120 H30 V112 C40 112 44 108 44 100 V30 H40 C28 30 24 34 24 46 H16 C15 36 12 28 20 20 Z"
        fill={goldColor}
      />
      {/* L - Interlocking charcoal/white letter */}
      <path
        d="M74 44 C82 32 94 24 108 24 V34 C100 34 94 40 94 50 V102 C94 108 98 112 108 112 H136 C144 112 148 106 150 96 H156 L154 126 H72 V118 C82 118 86 114 86 102 V56 C86 50 82 46 74 44 Z"
        fill={lColor}
      />
    </svg>
  );

  if (variant === 'monogram') {
    return <div className={`inline-flex items-center ${className}`}>{MonogramSvg}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {MonogramSvg}
        <div className="flex flex-col text-left">
          <span
            className={`font-serif text-sm sm:text-base tracking-[0.18em] font-medium leading-none ${textColor}`}
          >
            TOP LINE
          </span>
          <span
            className="hidden sm:block text-[8px] tracking-[0.22em] uppercase font-sans font-medium text-[#C5A880] mt-0.5"
          >
            HOSPITALITY FURNITURE
          </span>
        </div>
      </div>
    );
  }

  // Full branding display
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="scale-125 mb-3">{MonogramSvg}</div>
      <h1
        className={`font-serif text-2xl md:text-3xl tracking-[0.25em] font-normal uppercase ${textColor}`}
      >
        TOP LINE
      </h1>
      <div className="w-16 h-px bg-[#C5A880] my-2" />
      <p
        className={`text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-medium text-[#C5A880]`}
      >
        HOSPITALITY FURNITURE
      </p>
    </div>
  );
}
