interface NavInfoModalProps {
  sectionKey: 'product' | 'solutions' | 'pricing' | 'company' | null;
  onClose: () => void;
  onBookDemo: () => void;
}

const SECTION_CONTENT = {
  product: {
    tag: 'PRODUCT PLATFORM',
    title: 'Autonomous Borrower Operations',
    description:
      'Boomerang orchestrates end-to-end multi-channel borrower engagement natively across voice telephony, SMS text messaging, and automated email workflows.',
    details: [
      { label: 'Voice AI Core', desc: 'Sub-400ms ultra-low latency generative voice agents with dynamic acoustic turn-taking.' },
      { label: 'Document Assistant', desc: 'Securely collects, validates, and tags borrower W-2s, paystubs, and bank statements.' },
      { label: 'Servicing & Loss Mitigation', desc: 'Manages repayment schedule changes, hardship intakes, and payment reminders 24/7.' },
    ],
  },
  solutions: {
    tag: 'SOLUTIONS BY INSTITUTION',
    title: 'Engineered For Regulated Institutions',
    description:
      'Purpose-built workflows tailored for community banks, credit unions, mortgage servicers, and commercial auto lending groups.',
    details: [
      { label: 'Retail & Commercial Banks', desc: 'Automate loan inquiries, mortgage pre-flight qualifications, and CD renewal conversations.' },
      { label: 'Credit Unions', desc: 'Deep member-first empathy, seamless core integration with Symitar & Keystone, and credit card servicing.' },
      { label: 'Mortgage Servicers', desc: 'Escrow analysis explanations, year-end 1098 inquiries, and forbearance processing without call center bottlenecks.' },
    ],
  },
  pricing: {
    tag: 'TRANSPARENT ENTERPRISE PRICING',
    title: 'Predictable Volume & Usage Tiers',
    description:
      'Institutional licensing calibrated to active monthly borrowers and verified completed conversations. No hidden per-seat licensing.',
    details: [
      { label: 'Community Tier', desc: 'Designed for institutions under $2B AUM. Includes voice, SMS, email connectors and Jack Henry / Fiserv integration.' },
      { label: 'Regional & Enterprise', desc: 'For top 100 lenders and multi-state banks. Custom SLAs, dedicated VPC deployment, and white-glove core integration.' },
      { label: 'Security & Compliance Pack', desc: 'SOC 2 Type II attestation, custom audit logs, Dodd-Frank UDAAP monitoring, and dedicated compliance support.' },
    ],
  },
  company: {
    tag: 'ABOUT BOOMERANG',
    title: 'Bridging Financial Precision & Modern AI',
    description:
      'Boomerang was founded by veteran financial technologist executives and machine learning researchers with a single mission: to empower institutions to build lasting borrower relationships through reliable, deterministic conversational AI.',
    details: [
      { label: 'Headquarters', desc: 'San Francisco, CA & New York, NY' },
      { label: 'Security Guarantees', desc: 'SOC 2 Type II certified, ISO 27001 compliant, and independent penetration tested annually.' },
      { label: 'Investor Backing', desc: 'Backed by tier-one fintech venture funds and institutional banking strategic partners.' },
    ],
  },
};

export default function NavInfoModal({
  sectionKey,
  onClose,
  onBookDemo,
}: NavInfoModalProps) {
  if (!sectionKey) return null;
  const item = SECTION_CONTENT[sectionKey];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#191919] p-1.5 transition-colors duration-200"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
          {item.tag}
        </div>
        <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
          {item.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#191919]/70 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-6 space-y-3">
          {item.details.map((detail, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#F4F3F3]">
              <div className="text-xs font-semibold text-[#191919]">{detail.label}</div>
              <div className="mt-0.5 text-xs text-[#191919]/70">{detail.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="flex-1 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 cursor-pointer"
          >
            Book A Demo
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 border border-gray-200 text-sm font-medium text-[#191919] rounded-lg hover:bg-[#F4F3F3] transition-colors duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
