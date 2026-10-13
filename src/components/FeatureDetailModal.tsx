interface FeatureDetailModalProps {
  featureKey: 'conversational' | 'connected' | 'compliant' | null;
  onClose: () => void;
  onBookDemo: () => void;
}

const DETAILS = {
  conversational: {
    num: '01',
    title: 'Conversational',
    subtitle: 'Human-grade nuance across high-stakes financial dialogues',
    points: [
      {
        heading: 'Adaptive Reasoning Across Full Lifecycle',
        desc: 'Handles loan pre-qualifications, document collections, payment extensions, and hardship programs with context memory spanning months.',
      },
      {
        heading: 'Low-Latency Voice Telephony (<400ms)',
        desc: 'Streaming bidirectional audio with real-time speech-to-text, sub-second generative turns, and zero awkward robotic pauses.',
      },
      {
        heading: 'Graceful Human Warm Handoff',
        desc: 'Instantly transfers conversation history, borrower sentiment score, and recommended next action directly to loan officers or tier-2 agents.',
      },
    ],
    metric: '94% of standard borrower inquiries resolved end-to-end without agent intervention',
  },
  connected: {
    num: '02',
    title: 'Connected',
    subtitle: 'Native read/write integration with your existing core banking stack',
    points: [
      {
        heading: 'Core Banking & LOS Compatibility',
        desc: 'Direct bidirectional connectors for Jack Henry, FIS, Fiserv, ICE Mortgage (Encompass), and MeridianLink.',
      },
      {
        heading: 'Field-Level Bi-Temporal Data Sync',
        desc: 'Real-time record retrieval and verification with full immutable audit logs that record state before and after every action.',
      },
      {
        heading: 'Omnichannel State Synchronization',
        desc: 'A borrower starting a payment arrangement on SMS can finish on a voice call with identical state and instant continuity.',
      },
    ],
    metric: 'Deploys in under 14 days alongside existing legacy infrastructure without rip-and-replace',
  },
  compliant: {
    num: '03',
    title: 'Compliant',
    subtitle: 'Built from day one for heavily regulated financial governance',
    points: [
      {
        heading: 'CFPB & Dodd-Frank UDAAP Guardrails',
        desc: 'Deterministic rule evaluations ensure zero unauthorized promises, regulatory disclosures are delivered verbatim, and full disclosure records are archived.',
      },
      {
        heading: 'SOC 2 Type II & GLBA Infrastructure',
        desc: 'End-to-end data encryption at rest and in transit. Strict role-based access control and zero-model-retraining data isolation guarantees.',
      },
      {
        heading: 'Inspectable Decision Trails',
        desc: 'Every response is backed by an inspectable step-by-step reasoning trace with source document citations and risk scoring.',
      },
    ],
    metric: '100% transcript archiving and automatic compliance anomaly alerts',
  },
};

export default function FeatureDetailModal({
  featureKey,
  onClose,
  onBookDemo,
}: FeatureDetailModalProps) {
  if (!featureKey) return null;
  const data = DETAILS[featureKey];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative"
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

        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#191919]/50">
          <span>{data.num}</span>
          <span>/</span>
          <span className="uppercase text-[#191919] font-medium tracking-[0.2em]">{data.title}</span>
        </div>

        <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#191919] font-normal leading-snug">
          {data.subtitle}
        </h3>

        <div className="mt-6 space-y-4">
          {data.points.map((pt, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-[#F4F3F3]">
              <div className="text-sm font-medium text-[#191919]">{pt.heading}</div>
              <div className="mt-1 text-xs sm:text-sm text-[#191919]/70 leading-relaxed">{pt.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-lg border border-gray-200/80 bg-white text-xs text-[#191919]/80 flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{data.metric}</span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="flex-1 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 cursor-pointer"
          >
            Book A Demo For This Capability
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
