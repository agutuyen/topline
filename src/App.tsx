/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CollectionsExplorer from './components/CollectionsExplorer';
import MillworkShowcase from './components/MillworkShowcase';
import WorkflowSection from './components/WorkflowSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import RFQModal from './components/RFQModal';
import { Language, ProductItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] =
    useState<ProductItem | null>(null);
  const [rfqProducts, setRfqProducts] = useState<ProductItem[]>([]);

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

      {/* Hero Section with Luxury Video Background */}
      <HeroSection
        lang={lang}
        onOpenRFQ={() => setIsRFQOpen(true)}
        onExploreCollections={scrollToCollections}
      />

      {/* About Section: Manufacturing Base & Corporate Legal Profile */}
      <AboutSection lang={lang} onOpenRFQ={() => setIsRFQOpen(true)} />

      {/* Curated Furniture Collections Explorer */}
      <CollectionsExplorer
        lang={lang}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
        onOpenRFQWithProduct={handleOpenRFQWithProduct}
      />

      {/* Architectural Millwork & Commercial Clients (Taco Bell, Five Guys, KFC) */}
      <MillworkShowcase lang={lang} onOpenRFQ={() => setIsRFQOpen(true)} />

      {/* 5-Step Controlled Workflow: Review, Develop, Produce, Inspect, Pack */}
      <WorkflowSection lang={lang} />

      {/* Footer with Business Registration MST 3703519683 & Contacts */}
      <Footer lang={lang} onOpenRFQ={() => setIsRFQOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        lang={lang}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToRFQ={handleAddProductToRFQ}
      />

      {/* Commercial Project RFQ Modal */}
      <RFQModal
        isOpen={isRFQOpen}
        lang={lang}
        selectedProducts={rfqProducts}
        onClose={() => setIsRFQOpen(false)}
        onRemoveProduct={handleRemoveProductFromRFQ}
      />

      {/* Floating Quick Action Contacts (Hotline & Zalo) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0977429979"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0068FF] text-white text-xs font-semibold shadow-lg hover:scale-105 transition-transform"
          title="Chat Zalo với Giám đốc"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Zalo: 0977 429 979</span>
        </a>

        <a
          href="tel:0977429979"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#191919] text-[#C5A880] text-xs font-semibold shadow-lg hover:bg-black transition-colors"
          title="Gọi Hotline"
        >
          <span>📞</span>
          <span className="font-mono">0977.429.979</span>
        </a>
      </div>
    </div>
  );
}
