import React, { useState } from 'react';
import { Product } from '../types';
import { Download, ShieldAlert, FileText, Info, Check, Printer } from 'lucide-react';

interface DataSheetModalProps {
  products: Product[];
}

export default function DataSheetModal(props: DataSheetModalProps) {
  const { products } = props;
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Generate simulated CAS and safety data based on product
  const getSafetyData = (product?: Product) => {
    if (!product) return { cas: '7732-18-5', nfpaHealth: 0, nfpaFire: 0, nfpaReact: 0, hazard: 'Non-hazardous', ecNo: '231-791-2' };
    
    switch (product.category) {
      case 'textile':
        if (product.name.includes('Hydrogen Peroxide')) {
          return { cas: '7722-84-1', nfpaHealth: 3, nfpaFire: 0, nfpaReact: 2, hazard: 'UN 2014, Class 5.1 Oxidizing Substance. Strictly corrosive to skin and eyes.', ecNo: '231-765-0' };
        }
        if (product.name.includes('Sodium Hydrosulfide')) {
          return { cas: '16721-80-5', nfpaHealth: 3, nfpaFire: 1, nfpaReact: 1, hazard: 'UN 2949, Class 8 Corrosive Solid. Emits highly toxic hydrogen sulfide gas on exposure to moisture or acids.', ecNo: '240-778-0' };
        }
        return { cas: '68131-40-8', nfpaHealth: 1, nfpaFire: 1, nfpaReact: 0, hazard: 'Irritant. Harmful if swallowed in industrial concentration.', ecNo: '614-295-4' };
      
      case 'healthcare':
        if (product.name.includes('Phenyle')) {
          return { cas: '8001-58-9', nfpaHealth: 3, nfpaFire: 2, nfpaReact: 0, hazard: 'UN 2022, Toxic Coal Tar Creosote. Severe sensory irritant. Marine pollutant.', ecNo: '263-080-8' };
        }
        if (product.name.includes('Sanitizer')) {
          return { cas: '67-63-0', nfpaHealth: 1, nfpaFire: 3, nfpaReact: 0, hazard: 'UN 1219, Class 3 Highly Flammable Liquid. Vapor causes mild drowsiness.', ecNo: '200-661-7' };
        }
        if (product.name.includes('Bleach')) {
          return { cas: '7681-52-9', nfpaHealth: 2, nfpaFire: 0, nfpaReact: 1, hazard: 'UN 1791, Class 8 Corrosive Liquid. Avoid contact with ammonia compounds.', ecNo: '231-668-3' };
        }
        return { cas: '56-81-5', nfpaHealth: 1, nfpaFire: 0, nfpaReact: 0, hazard: 'Non-toxic, pH balanced sanitary formulation.', ecNo: '200-289-5' };
      
      case 'retail':
      case 'general':
      default:
        if (product.name.includes('Glass')) {
          return { cas: '111-76-2', nfpaHealth: 1, nfpaFire: 0, nfpaReact: 0, hazard: 'Irritant. Keep out of reach of children.', ecNo: '203-905-0' };
        }
        return { cas: '68411-30-3', nfpaHealth: 1, nfpaFire: 0, nfpaReact: 0, hazard: 'Concentrated industrial detergent. Flush eyes immediately on contact.', ecNo: '270-115-0' };
    }
  };

  const safety = getSafetyData(selectedProduct);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg" id="compliance-center">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-primary w-5 h-5" />
        <h3 className="font-headline-md text-on-surface text-lg font-bold">Safety Data Sheet (SDS) & Compliance Portal</h3>
      </div>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Verify environmental clearances & chemical safety levels. Select any product to inspect real CAS numbers, safety details, NFPA 704 indices, and instantly download standardized SDS dossiers.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selection panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Certified Product
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
            >
              <optgroup label="TEXTILE DIVISION" className="font-bold text-xs text-slate-400">
                {products.filter(p => p.category === 'textile').map(p => (
                  <option key={p.id} value={p.id} className="font-normal text-on-surface">{p.name}</option>
                ))}
              </optgroup>
              <optgroup label="HEALTHCARE & HYGIENE" className="font-bold text-xs text-slate-400">
                {products.filter(p => p.category === 'healthcare').map(p => (
                  <option key={p.id} value={p.id} className="font-normal text-on-surface">{p.name}</option>
                ))}
              </optgroup>
              <optgroup label="STORES & RETAIL CHAINS" className="font-bold text-xs text-slate-400">
                {products.filter(p => p.category === 'retail').map(p => (
                  <option key={p.id} value={p.id} className="font-normal text-on-surface">{p.name}</option>
                ))}
              </optgroup>
              <optgroup label="GENERAL CLEANING CHEMICALS" className="font-bold text-xs text-slate-400">
                {products.filter(p => p.category === 'general').map(p => (
                  <option key={p.id} value={p.id} className="font-normal text-on-surface">{p.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">ISO Compliance Badges</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded font-bold text-slate-650 shadow-sm">
                ISO 9001:2015
              </span>
              <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded font-bold text-slate-650 shadow-sm">
                REACH COMPLIANT
              </span>
              <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded font-bold text-slate-650 shadow-sm">
                HAZMAT CERTIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal pt-1">
              Registered in strict compliance with PCSIR and federal hazardous chemical storage & carriage regulations of Pakistan.
            </p>
          </div>
        </div>

        {/* SDS Sheet visualizer */}
        {selectedProduct && (
          <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 text-[11px] font-mono select-none overflow-hidden hover:scale-[1.005] transition-transform shadow-sm">
            <div className="border-b border-dashed border-slate-250 pb-3 mb-4 flex justify-between items-center bg-slate-100 p-3 rounded-lg">
              <div>
                <p className="font-bold text-xs uppercase text-primary">ABCOTEX INDUSTRIAL SDS</p>
                <p className="text-[9px] text-slate-500 mt-0.5 font-sans">VERIFIED HAZARD COMM. STANDARD 29 CFR 1910.1200</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-on-surface">CAS #: {safety.cas}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">EC NO: {safety.ecNo}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold uppercase text-slate-450 text-[10px]">PRODUCT NAME:</p>
                  <p className="text-on-surface font-extrabold text-[12px] mt-0.5">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="font-bold uppercase text-slate-450 text-[10px]">CLASSIFICATION:</p>
                  <p className="text-on-surface uppercase font-bold mt-0.5">{selectedProduct.category} Chemical Agent</p>
                </div>
              </div>

              <div>
                <p className="font-bold uppercase text-slate-450 text-[10px]">SPECIFICATION SHEET PROFILE:</p>
                <p className="text-on-surface mt-0.5 leading-normal">{selectedProduct.specification}</p>
              </div>

              <div className="bg-red-50 p-3 border border-red-200/20 rounded-lg flex items-start gap-4 justify-between">
                <div className="flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold uppercase text-red-700 text-[10px]">SECTION 2: HAZARD RECOGNITION</p>
                    <p className="text-red-950 text-[11px] leading-tight font-medium mt-1 font-sans">
                      {safety.hazard}
                    </p>
                  </div>
                </div>
                
                {/* NFPA 704 Diamond */}
                <div className="relative w-12 h-12 shrink-0 select-none scale-90 sm:scale-100">
                  <div className="absolute top-0 left-3.5 w-5 h-5 bg-red-650 text-white font-bold text-center rounded flex items-center justify-center text-[10px] shadow border border-red-700/20" title="Flammability">
                    {safety.nfpaFire}
                  </div>
                  <div className="absolute top-3.5 left-0 w-5 h-5 bg-blue-600 text-white font-bold text-center rounded flex items-center justify-center text-[10px] shadow border border-blue-700/20" title="Health">
                    {safety.nfpaHealth}
                  </div>
                  <div className="absolute top-3.5 left-7 w-5 h-5 bg-yellow-500 text-black font-bold text-center rounded flex items-center justify-center text-[10px] shadow border border-yellow-600/20" title="Instability">
                    {safety.nfpaReact}
                  </div>
                  <div className="absolute top-7 left-3.5 w-5 h-5 bg-white text-black font-bold text-center rounded flex items-center justify-center text-[10px] shadow border border-slate-300" title="Specific Hazard">
                    W
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-[10px]">
                <div>
                  <p className="font-bold text-slate-450">1ST AID:</p>
                  <p className="text-on-surface leading-tight mt-0.5 font-sans">Flush eyes with water for 15m. Seek clinical medical help.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-450">PPE RECOMMENDED:</p>
                  <p className="text-on-surface leading-tight mt-0.5 font-sans">Respirator (Vapor), Nitrile Gloves, Splashing Goggles.</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={handleDownload}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
                    downloadSuccess
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'bg-primary text-white border-primary hover:bg-primary-container'
                  }`}
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      SDS PDF Generated
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Download SDS PDF
                    </>
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition-all text-on-surface font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Spec
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
