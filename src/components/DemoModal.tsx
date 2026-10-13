import { useState } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    institutionType: 'Regional Bank',
    channels: 'All Channels (Voice, SMS, Email)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          className="absolute top-5 right-5 text-gray-400 hover:text-[#191919] p-1.5 transition-colors duration-200 text-sm"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#191919] font-normal">
              Briefing Requested
            </h3>
            <p className="mt-2 text-sm text-[#191919]/70 leading-relaxed max-w-sm mx-auto">
              Thank you, {formData.name || 'there'}. A member of Boomerang’s banking solutions team will connect with {formData.email || 'you'} within one business hour.
            </p>
            <div className="mt-6 p-4 rounded-lg bg-[#F4F3F3] text-left text-xs text-[#191919]/80 space-y-1">
              <div className="font-medium text-[#191919]">Selected Target:</div>
              <div>{formData.institution || 'Financial Institution'} · {formData.institutionType}</div>
              <div className="text-[#191919]/60">{formData.channels}</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 w-full py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200"
            >
              Return to Page
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              INSTITUTIONAL ACCESS
            </div>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#191919] font-normal">
              Book A Demo
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#191919]/70 leading-relaxed">
              Experience autonomous borrower journeys deployed in production across email, SMS, and natural voice telephony.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#191919]/80 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F4F3F3] border border-transparent rounded-lg focus:outline-hidden focus:border-[#191919] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#191919]/80 mb-1.5">
                  Work Email (Bank / Credit Union / Lending Co.)
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@heritagebank.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F4F3F3] border border-transparent rounded-lg focus:outline-hidden focus:border-[#191919] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#191919]/80 mb-1.5">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Heritage Federal"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F3F3] border border-transparent rounded-lg focus:outline-hidden focus:border-[#191919] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#191919]/80 mb-1.5">
                    Institution Type
                  </label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F3F3] border border-transparent rounded-lg focus:outline-hidden focus:border-[#191919] transition-colors"
                  >
                    <option>Regional Bank</option>
                    <option>Commercial Bank</option>
                    <option>Credit Union</option>
                    <option>Mortgage Originator</option>
                    <option>Auto / Consumer Lender</option>
                    <option>Fintech Platform</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#191919]/80 mb-1.5">
                  Primary Scope
                </label>
                <select
                  value={formData.channels}
                  onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F4F3F3] border border-transparent rounded-lg focus:outline-hidden focus:border-[#191919] transition-colors"
                >
                  <option>All Channels (Voice, SMS, Email)</option>
                  <option>Voice Telephony Agents Only</option>
                  <option>SMS & Digital Messaging</option>
                  <option>Borrower Retention & Originations</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 cursor-pointer"
              >
                Schedule Guided Demo
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
