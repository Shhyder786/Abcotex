import React, { useState } from 'react';
import { Product, InquiryFormState } from '../types';
import { Check, ClipboardList, Send, FileCheck, Landmark, ShieldCheck } from 'lucide-react';

interface B2BInquiryFormProps {
  products: Product[];
  preSelectedProductIds?: string[];
  initialIndustry?: string;
  onSuccessSubmit?: (inquiry: any) => void;
}

export default function B2BInquiryForm(props: B2BInquiryFormProps) {
  const { products, preSelectedProductIds = [], initialIndustry = 'Healthcare', onSuccessSubmit } = props;

  const [form, setForm] = useState<InquiryFormState>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: initialIndustry,
    inquiryType: 'Bulk Order',
    message: '',
    productsRequested: preSelectedProductIds,
  });

  const [submittedInquiries, setSubmittedInquiries] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('abcotex_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [latestInquiryId, setLatestInquiryId] = useState('');

  const toggleProductSelect = (productId: string) => {
    setForm((prev) => {
      const productsRequested = prev.productsRequested.includes(productId)
        ? prev.productsRequested.filter((id) => id !== productId)
        : [...prev.productsRequested, productId];
      return { ...prev, productsRequested };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.companyName.trim()) {
      setErrorMsg('Company Name is required.');
      return;
    }
    if (!form.contactName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!form.phone.trim()) {
      setErrorMsg('Contact Phone is required for direct agent callback.');
      return;
    }

    const newId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const inquiryWithMeta = {
      ...form,
      id: newId,
      timestamp: new Date().toISOString(),
      status: 'UNDER B2B REPRODUCE REVIEW',
      agentAssigned: 'Aamir R. (Regional Director)',
    };

    const updated = [inquiryWithMeta, ...submittedInquiries];
    setSubmittedInquiries(updated);
    try {
      localStorage.setItem('abcotex_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage disabled or unreachable:', e);
    }

    setLatestInquiryId(newId);
    setSuccess(true);
    if (onSuccessSubmit) {
      onSuccessSubmit(inquiryWithMeta);
    }

    // Reset standard fields but keep company details for convenience
    setForm((prev) => ({
      ...prev,
      message: '',
      productsRequested: [],
    }));
  };

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-lg" id="b2b-inquiry-box">
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-headline-md text-on-surface text-xl font-bold tracking-tight">B2B Custom Formulation & Supply Request</h3>
              <p className="text-sm text-slate-500 mt-1">Get a custom chemical spec & formal legal quote within 2 hours.</p>
            </div>
            <FileCheck className="text-primary w-8 h-8 shrink-0" />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200/30 font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Legal Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
                placeholder="e.g. Aga Khan Clinical Inc."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Name (B2B Officer) *
              </label>
              <input
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
                placeholder="e.g. Syed Hassan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Corporate Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
                placeholder="e.g. buyer@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Active Phone / Mobile *
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
                placeholder="e.g. +92 330 2528228"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Industry Division
              </label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
              >
                <option value="Healthcare">Healthcare & Hospitals</option>
                <option value="Textile">Textile & Garments Manufacturing</option>
                <option value="Industrial Mfg">Industrial Engineering / Machinery</option>
                <option value="Hospitality">Hospitality & Premium Lodging</option>
                <option value="Pharmaceutical">Pharmaceutical GMP Labs</option>
                <option value="Retail Brands">Retail Supermarkets / Logistics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Inquiry Objective
              </label>
              <select
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
              >
                <option value="Bulk Order">Bulk Logistics Supply Contract</option>
                <option value="Sample Distribution">Laboratory Verification Sample</option>
                <option value="Export Inquiry">High-Volume Export Pricing</option>
                <option value="Custom Formulation">Custom Chemical Synthesis Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deem Interest on Specific Chemical Products (Optional)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-40 overflow-y-auto">
              {products.map((p) => {
                const selected = form.productsRequested.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleProductSelect(p.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium text-left border ${
                      selected
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-slate-750 border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${selected ? 'bg-white text-primary' : 'bg-slate-50 border-slate-300'}`}>
                      {selected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Chemical Specifications / Custom Packaging Needs
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none resize-none"
              placeholder="e.g. We require 50 drums of Sodium Hydrosulfide of BASF origin with ISO certified testing certs attached..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary-container py-3 font-semibold uppercase tracking-wider transition-all rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Submit Corporate B2B Inquiry
          </button>
        </form>
      ) : (
        <div className="text-center py-12 space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-100">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-emerald-200/20">
              Inquiry Dispatched Successfully
            </span>
            <h3 className="font-headline-lg text-2xl font-bold text-on-surface mt-4">Aamir R. Has Received Your Request</h3>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed mt-2">
              Your inquiry reference number is <strong className="text-primary font-mono">{latestInquiryId}</strong>. One of our lead chemical engineers or regional supply coordinators will contact you at your provided email with a formal PDF breakdown within 2 hours.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-left flex items-start gap-3 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-on-surface uppercase tracking-wide">ISO 9001:2015 B2B Protocol Enabled</p>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                We safeguard your commercial details. All SDS documents, pricing tables, and logistics calculations sent to your email are compliant with global REACH chemical transport directives.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 border border-slate-200 text-on-surface text-sm font-semibold uppercase tracking-wide rounded-lg hover:bg-slate-50 transition-colors"
            >
              Submit Another Inquiry
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('submitted-inquiries-list');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-primary text-white text-sm font-semibold uppercase tracking-wide rounded-lg hover:bg-primary-container transition-colors"
            >
              Check Inquiry Status ({submittedInquiries.length})
            </button>
          </div>
        </div>
      )}

      {submittedInquiries.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-6" id="submitted-inquiries-list">
          <div className="flex items-center gap-2 mb-4 justify-between">
            <div className="flex items-center gap-1.5">
              <ClipboardList className="text-primary w-4 h-4" />
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Previous B2B Requests ({submittedInquiries.length})</h4>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your B2B inquiry session history?')) {
                  localStorage.removeItem('abcotex_inquiries');
                  setSubmittedInquiries([]);
                }
              }}
              className="text-[10px] text-red-500 hover:text-red-700 hover:underline uppercase tracking-wider font-semibold font-mono"
            >
              Clear Session Cache
            </button>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {submittedInquiries.map((inq: any) => (
              <div
                key={inq.id}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-primary font-mono text-xs">{inq.id}</span>
                    <span className="text-on-surface font-semibold">{inq.companyName}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-medium lowercase">
                      {inq.inquiryType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Contact: {inq.contactName} ({inq.email}) • Registered: {new Date(inq.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {inq.productsRequested.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                      <span className="text-[10px] text-slate-400 font-bold">Products:</span>
                      {inq.productsRequested.map((pId: string) => {
                        const product = products.find((p) => p.id === pId);
                        return (
                          <span key={pId} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-on-surface font-medium">
                            {product ? product.name : pId}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block bg-primary/10 text-primary font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/20">
                    {inq.status}
                  </span>
                  <p className="text-[10px] text-slate-450 mt-1 font-mono">Assigned: {inq.agentAssigned}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
