import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80 py-3.5'
          : 'bg-linear-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Logo Left */}
        <a href="#" className="flex items-center group cursor-pointer" aria-label="Top Line Furniture Home">
          <TopLineLogo
            variant="compact"
            theme={scrolled ? 'dark' : 'light'}
            className="transition-transform group-hover:scale-102"
          />
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors duration-200 ${
                scrolled
                  ? 'text-[#191919]/70 hover:text-[#191919]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Tools: Language Switcher + RFQ CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Toggle VI / EN */}
          <div
            className={`flex items-center p-0.5 rounded-full border text-xs font-medium transition-colors ${
              scrolled
                ? 'bg-gray-100 border-gray-200 text-[#191919]'
                : 'bg-white/10 border-white/20 text-white'
            }`}
          >
            <button
              onClick={() => onToggleLang('vi')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                lang === 'vi'
                  ? scrolled
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              VI
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? scrolled
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Hotline Quick Call (Desktop) */}
          <a
            href="tel:0977429979"
            className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-[#191919] hover:bg-gray-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>0977.429.979</span>
          </a>

          {/* Primary RFQ CTA */}
          <button
            onClick={onOpenRFQ}
            className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm ${
              scrolled
                ? 'bg-[#191919] text-white hover:bg-[#C5A880] hover:text-[#191919]'
                : 'bg-[#C5A880] text-[#191919] hover:bg-white'
            }`}
          >
            <span>{lang === 'vi' ? 'Báo Giá Dự Án' : 'Request A Quote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-[#191919]' : 'text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#191919] hover:text-[#C5A880] py-1 border-b border-gray-100 uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="tel:0977429979"
                className="text-sm font-semibold text-[#191919] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Hotline / Zalo: 0977 429 979
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 bg-[#191919] text-white text-xs font-semibold uppercase tracking-wider rounded-lg text-center"
              >
                {lang === 'vi' ? 'Yêu Cầu Báo Giá Dự Án' : 'Request A Quote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
