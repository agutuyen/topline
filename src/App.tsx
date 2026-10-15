/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import CollectionsExplorer from './components/CollectionsExplorer';
import MillworkShowcase from './components/MillworkShowcase';
import WorkflowSection from './components/WorkflowSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import RFQModal from './components/RFQModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsModal from './components/TermsModal';
import ProjectGalleryModal from './components/ProjectGalleryModal';
import { useSmoothScroll } from './components/3d/useSmoothScroll';
import AdminPortal from './components/admin/AdminPortal';
import BackToTop from './components/BackToTop';
import AmbientAudioPlayer from './components/AmbientAudioPlayer';
import { Language, ProductItem, ProjectItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] =
    useState<ProductItem | null>(null);
  const [selectedProjectForGallery, setSelectedProjectForGallery] =
    useState<ProjectItem | null>(null);
  const [rfqProducts, setRfqProducts] = useState<ProductItem[]>([]);

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  useSmoothScroll();

  // Detect #admin in URL and Ctrl+Shift+A shortcut
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);
  // Add product to RFQ list and open modal
  const handleOpenRFQWithProduct = (product: ProductItem) => {
    setRfqProducts((prev) => {
      if (!prev.some((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    setIsRFQOpen(true);
  };

  // Add product without opening modal immediately
  const handleAddProductToRFQ = (product: ProductItem) => {
    setRfqProducts((prev) => {
      if (!prev.some((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    setIsRFQOpen(true);
  };

  const handleRemoveProductFromRFQ = (productId: string) => {
    setRfqProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#191919] font-sans antialiased overflow-x-hidden selection:bg-[#C5A880] selection:text-[#191919]">

      {/* Fixed Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
        onOpenRFQ={() => setIsRFQOpen(true)}
      />

      {/* Main Content Container */}
      <main>
        {/* Hero Section with Luxury Video Background */}
        <HeroSection
          lang={lang}
          onOpenRFQ={() => setIsRFQOpen(true)}
          onExploreCollections={scrollToCollections}
        />

        {/* About Section: Manufacturing Base & Corporate Legal Profile */}
        <AboutSection lang={lang} onOpenRFQ={() => setIsRFQOpen(true)} />

        {/* Capabilities Section: 3 Core Sectors Solutions */}
        <CapabilitiesSection lang={lang} onOpenRFQ={() => setIsRFQOpen(true)} />

        {/* Curated Furniture Collections Explorer */}
        <CollectionsExplorer
          lang={lang}
          onSelectProduct={(product) => setSelectedProductForDetail(product)}
          onOpenRFQWithProduct={handleOpenRFQWithProduct}
        />

        {/* Architectural Millwork & Commercial Clients (Taco Bell, Five Guys, KFC) */}
        <MillworkShowcase
          lang={lang}
          onOpenRFQ={() => setIsRFQOpen(true)}
          onSelectProject={(proj) => setSelectedProjectForGallery(proj)}
        />

        {/* 5-Step Controlled Workflow: Review, Develop, Produce, Inspect, Pack */}
        <WorkflowSection lang={lang} />
      </main>
      <Footer
        lang={lang}
        onOpenRFQ={() => setIsRFQOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        lang={lang}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToRFQ={handleAddProductToRFQ}
      />
      {/* Project Gallery & Inspection Lightbox Modal */}
      <ProjectGalleryModal
        project={selectedProjectForGallery}
        lang={lang}
        onClose={() => setSelectedProjectForGallery(null)}
        onOpenRFQ={() => setIsRFQOpen(true)}
      />

      {/* Commercial Project RFQ Modal */}
      <RFQModal
        isOpen={isRFQOpen}
        lang={lang}
        selectedProducts={rfqProducts}
        onClose={() => setIsRFQOpen(false)}
        onRemoveProduct={handleRemoveProductFromRFQ}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        lang={lang}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Terms of Service Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        lang={lang}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* TopLine ECC Admin Portal Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        lang={lang}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Floating Quick Action Contacts (Hotline & Zalo) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0977429979"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0068FF] text-white text-xs font-semibold shadow-lg hover:scale-105 transition-transform"
          title={lang === 'vi' ? 'Chat Zalo với Giám đốc' : 'Direct Line & WhatsApp'}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{lang === 'vi' ? 'Zalo: 0977 429 979' : 'WhatsApp: +84 977 429 979'}</span>
        </a>

        <a
          href="tel:0977429979"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#191919] text-[#C5A880] text-xs font-semibold shadow-lg hover:bg-black transition-colors"
          title={lang === 'vi' ? 'Gọi Hotline' : 'Direct Call'}
        >
          <span>📞</span>
          <span className="font-mono">{lang === 'vi' ? '0977.429.979' : '+84 977 429 979'}</span>
        </a>
      </div>

      {/* Floating Control Dock: Ambient Sound & Back to Top */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        <BackToTop lang={lang} />
        <AmbientAudioPlayer lang={lang} />
      </div>
    </div>
  );
}
