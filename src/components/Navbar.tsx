import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
import { Language } from '../types';
import TopLineLogo from './TopLineLogo';

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

  // Close drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '#about', label: lang === 'vi' ? 'Về Chúng Tôi' : 'About' },
    { href: '#capabilities', label: lang === 'vi' ? 'Năng Lực' : 'Capabilities' },
    { href: '#collections', label: lang === 'vi' ? 'Bộ Sưu Tập' : 'Collections' },
    { href: '#clients', label: lang === 'vi' ? 'Dự Án' : 'Projects' },
    { href: '#workflow', label: lang === 'vi' ? 'Quy Trình' : 'Workflow' },
    { href: '#contact', label: lang === 'vi' ? 'Liên Hệ' : 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 pointer-events-none">
      <div
        className={`max-w-[1380px] w-full mx-auto transition-all duration-400 pointer-events-auto rounded-full overflow-hidden ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-xl border border-black/10 py-2 sm:py-2.5 px-4 sm:px-6 text-[#191919]'
            : 'bg-black/55 backdrop-blur-2xl border border-white/20 shadow-2xl py-2.5 sm:py-3 px-4 sm:px-6 text-white'
        }`}
      >
        <div className="flex items-center justify-between w-full min-w-0 gap-2 sm:gap-4">
          {/* Brand Logo & Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            aria-label="Top Line Furniture Home"
          >
            <TopLineLogo
              variant="compact"
              theme={scrolled ? 'dark' : 'light'}
              className="scale-95 sm:scale-100 origin-left"
            />
          </a>

          {/* Desktop Navigation Links — Architectural Kerning (Visible from XL) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 shrink min-w-0">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-2.5 2xl:px-3 py-1.5 rounded-full text-[11px] 2xl:text-xs uppercase tracking-[0.14em] font-medium transition-all duration-200 whitespace-nowrap ${
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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

            {/* Direct Phone / Hotline — visible on ultra-wide screens */}
            <a
              href="tel:0977429979"
              className={`hidden 2xl:flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 ${
                scrolled
                  ? 'text-[#191919]/80 hover:text-[#191919] hover:bg-black/5'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
              title="Hotline Kỹ Thuật"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{lang === 'vi' ? '0977.429.979' : '+84 977 429 979'}</span>
            </a>

            {/* Primary Action Button — Request Quote */}
            <button
              onClick={onOpenRFQ}
              className="hidden sm:flex group pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full bg-[#C5A880] text-[#191919] text-[11px] font-semibold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer items-center gap-2 shrink-0 whitespace-nowrap"
            >
              <span className="hidden md:inline">{lang === 'vi' ? 'Báo Giá Dự Án' : 'Request Quote'}</span>
              <span className="md:hidden">{lang === 'vi' ? 'Báo Giá' : 'RFQ'}</span>
              <span className="w-6 h-6 rounded-full bg-[#191919] text-[#C5A880] flex items-center justify-center transition-transform group-hover:translate-x-0.5 shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Mobile Hamburger Trigger (Visible below XL) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-full transition-colors cursor-pointer shrink-0 ${
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
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 pointer-events-auto xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 xl:hidden pointer-events-auto max-w-[1380px] mx-auto mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 p-5 sm:p-6 shadow-2xl text-[#191919] animate-fadeIn">
            <div className="flex flex-col gap-2.5">
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
                  <span>{lang === 'vi' ? 'Hotline: 0977 429 979' : 'Hotline: +84 977 429 979'}</span>
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
        </>
      )}
    </header>
  );
}
