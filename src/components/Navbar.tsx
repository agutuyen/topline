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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: lang === 'vi' ? 'Giới Thiệu' : 'About' },
    { href: '#capabilities', label: lang === 'vi' ? 'Năng Lực' : 'Capabilities' },
    { href: '#collections', label: lang === 'vi' ? 'Sản Phẩm' : 'Collections' },
    { href: '#workflow', label: lang === 'vi' ? 'Quy Trình' : 'Workflow' },
    { href: '#clients', label: lang === 'vi' ? 'Dự Án' : 'Projects' },
    { href: '#contact', label: lang === 'vi' ? 'Liên Hệ' : 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group" aria-label="Top Line Furniture Home">
          {/* Compact inline logo - no separate component to keep tight */}
          <svg viewBox="0 0 160 140" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 H92 C88 28 85 36 84 46 H76 C76 34 72 30 60 30 H56 V100 C56 108 60 112 70 112 V120 H30 V112 C40 112 44 108 44 100 V30 H40 C28 30 24 34 24 46 H16 C15 36 12 28 20 20 Z" fill="#C5A880" />
            <path d={`M74 44 C82 32 94 24 108 24 V34 C100 34 94 40 94 50 V102 C94 108 98 112 108 112 H136 C144 112 148 106 150 96 H156 L154 126 H72 V118 C82 118 86 114 86 102 V56 C86 50 82 46 74 44 Z`} fill={scrolled ? '#191919' : '#FFFFFF'} />
          </svg>
          <div className="flex flex-col">
            <span className={`font-serif text-base tracking-[0.14em] font-medium leading-none whitespace-nowrap transition-colors ${scrolled ? 'text-[#191919]' : 'text-white'}`}>
              TOP LINE
            </span>
            <span className="text-[8px] tracking-[0.18em] uppercase font-sans font-medium text-[#C5A880] mt-0.5 whitespace-nowrap">
              HOSPITALITY FURNITURE
            </span>
          </div>
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-[11px] uppercase tracking-[0.1em] font-semibold transition-all duration-200 ${
                scrolled
                  ? 'text-[#191919]/65 hover:text-[#191919] hover:bg-gray-100'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div
            className={`flex items-center rounded-full border text-[10px] font-bold transition-colors overflow-hidden ${
              scrolled
                ? 'bg-gray-100 border-gray-200'
                : 'bg-white/10 border-white/20'
            }`}
          >
            <button
              onClick={() => onToggleLang('vi')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'vi'
                  ? scrolled ? 'bg-[#191919] text-white' : 'bg-[#C5A880] text-[#191919]'
                  : scrolled ? 'text-[#191919]/60 hover:text-[#191919]' : 'text-white/60 hover:text-white'
              }`}
            >
              VI
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? scrolled ? 'bg-[#191919] text-white' : 'bg-[#C5A880] text-[#191919]'
                  : scrolled ? 'text-[#191919]/60 hover:text-[#191919]' : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Hotline - Desktop */}
          <a
            href="tel:0977429979"
            className={`hidden lg:flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              scrolled
                ? 'text-[#191919]/80 hover:bg-gray-100'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Phone className="w-3 h-3" />
            <span>0977.429.979</span>
          </a>

          {/* RFQ CTA */}
          <button
            onClick={onOpenRFQ}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-md text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
              scrolled
                ? 'bg-[#191919] text-white hover:bg-[#C5A880] hover:text-[#191919]'
                : 'bg-[#C5A880] text-[#191919] hover:bg-white'
            }`}
          >
            <span>{lang === 'vi' ? 'Báo Giá' : 'Get Quote'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-md transition-colors cursor-pointer ${
              scrolled ? 'text-[#191919] hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-lg border-t border-gray-100 px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#191919]/80 hover:text-[#C5A880] py-2.5 border-b border-gray-50 uppercase tracking-wider transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <a
                href="tel:0977429979"
                className="text-sm font-semibold text-[#191919] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {lang === 'vi' ? 'Hotline / Zalo: 0977 429 979' : 'Direct Line / WhatsApp: +84 977 429 979'}
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenRFQ(); }}
                className="w-full py-3 bg-[#C5A880] text-[#191919] text-xs font-bold uppercase tracking-wider rounded-lg text-center cursor-pointer hover:bg-[#b89a6e] transition-colors"
              >
                {lang === 'vi' ? 'Yêu Cầu Báo Giá' : 'Request A Quote'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
