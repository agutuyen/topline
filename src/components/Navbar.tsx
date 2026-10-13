import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: (newLang: Language) => void;
  onOpenRFQ: () => void;
}

export default function Navbar({ lang, onToggleLang, onOpenRFQ }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: lang === 'vi' ? 'Về Chúng Tôi' : 'About' },
    { href: '#capabilities', label: lang === 'vi' ? 'Năng Lực' : 'Capabilities' },
    { href: '#collections', label: lang === 'vi' ? 'Bộ Sưu Tập' : 'Collections' },
    { href: '#workflow', label: lang === 'vi' ? 'Quy Trình' : 'Workflow' },
    { href: '#clients', label: lang === 'vi' ? 'Dự Án' : 'Projects' },
    { href: '#contact', label: lang === 'vi' ? 'Liên Hệ' : 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`max-w-[1380px] mx-auto transition-all duration-400 pointer-events-auto rounded-full ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-xl border border-black/10 py-2.5 px-5 sm:px-7 text-[#191919]'
            : 'bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl py-3 px-5 sm:px-8 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            aria-label="Top Line Furniture Home"
          >
            {/* Elegant Monogram Mark */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-bold tracking-tight transition-all duration-300 ${
                scrolled
                  ? 'bg-[#191919] text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#191919]'
                  : 'bg-white/15 text-[#C5A880] border border-white/20 group-hover:bg-[#C5A880] group-hover:text-[#191919]'
              }`}
            >
              TL
            </div>

            {/* Brand Wordmark */}
            <div className="flex flex-col">
              <span
                className={`font-serif text-sm sm:text-base font-medium tracking-[0.2em] uppercase leading-none transition-colors ${
                  scrolled ? 'text-[#191919]' : 'text-white'
                }`}
              >
                Top Line
              </span>
              <span className="hidden sm:block text-[9px] font-sans tracking-[0.24em] uppercase text-[#C5A880] mt-0.5 leading-none font-medium">
                Hospitality Furniture
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links — Architectural Kerning */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-[11px] xl:text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 whitespace-nowrap ${
                  scrolled
                    ? 'text-[#191919]/80 hover:text-[#191919] hover:bg-black/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <div
              className={`flex items-center p-0.5 rounded-full border text-[11px] font-medium transition-colors ${
                scrolled
                  ? 'bg-black/5 border-black/10 text-[#191919]'
                  : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              <button
                onClick={() => onToggleLang('vi')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Phone / Hotline */}
            <a
              href="tel:0977429979"
              className={`hidden md:flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full transition-colors ${
                scrolled
                  ? 'text-[#191919]/80 hover:text-[#191919] hover:bg-black/5'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
              title="Hotline Kỹ Thuật"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>0977.429.979</span>
            </a>

            {/* Primary Action Button — Request Quote */}
            <button
              onClick={onOpenRFQ}
              className="hidden sm:flex group pl-4 pr-1.5 py-1.5 rounded-full bg-[#C5A880] text-[#191919] text-[11px] font-semibold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer items-center gap-2.5 whitespace-nowrap"
            >
              <span>{lang === 'vi' ? 'Báo Giá Dự Án' : 'Request Quote'}</span>
              <span className="w-6 h-6 rounded-full bg-[#191919] text-[#C5A880] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors cursor-pointer ${
                scrolled
                  ? 'text-[#191919] hover:bg-black/5'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Expandable Dropdown) */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-[1380px] mx-auto mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 p-6 shadow-2xl text-[#191919] animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl text-sm uppercase tracking-wider font-medium text-[#191919] hover:bg-[#F4F3F0] hover:text-[#C5A880] transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:0977429979"
                className="flex items-center gap-2 text-sm font-mono text-[#191919] px-4 py-2"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Hotline: 0977 429 979</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider rounded-xl text-center shadow-md cursor-pointer"
              >
                {lang === 'vi' ? 'Yêu Cầu Báo Giá Dự Án' : 'Request a Project Quote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
