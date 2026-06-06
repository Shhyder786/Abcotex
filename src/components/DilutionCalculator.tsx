import React, { useState } from 'react';
import { Product } from '../types';
import { HelpCircle, Calculator, Info } from 'lucide-react';

interface DilutionCalculatorProps {
  products: Product[];
}

export default function DilutionCalculator(props: DilutionCalculatorProps) {
  const { products } = props;
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [waterAmount, setWaterAmount] = useState<number>(10); // in Litres
  const [waterUnit, setWaterUnit] = useState<'litres' | 'gallons'>('litres');

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Parse ratio (e.g., "1:50" -> 50)
  const getRatioNumber = (ratioStr?: string): number => {
    if (!ratioStr) return 50;
    const parts = ratioStr.split(':');
    if (parts.length === 2) {
      const num = parseFloat(parts[1]);
      return isNaN(num) ? 50 : num;
    }
    return 50;
  };

  const ratio = getRatioNumber(selectedProduct?.dilutionRatio);
  const waterInML = waterUnit === 'litres' ? waterAmount * 1000 : waterAmount * 3785.41;
  const chemicalRequiredML = Math.round(waterInML / ratio);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6" id="dilution-calculator">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-primary w-5 h-5" />
        <h3 className="font-headline-md text-on-surface text-lg font-bold">B2B Industrial Dilution Calculator</h3>
      </div>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Ensure chemical efficacy & safety compliance. Select any product and specify your clean water reservoir size to calculate the exact chemical dosage required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            1. Select Chemical Agent
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category.toUpperCase()}) - Recommended {p.dilutionRatio}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-on-surface">Standard Protocol:</p>
                <p className="text-xs text-slate-500 leading-normal mt-0.5">
                  {selectedProduct.description} Recommended dilution of {selectedProduct.dilutionRatio} for optimal active biocidal / auxiliary dispersion.
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            2. Reservoir Water Volume
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="0.1"
              step="any"
              value={waterAmount}
              onChange={(e) => setWaterAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="flex-1 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
            />
            <select
              value={waterUnit}
              onChange={(e) => setWaterUnit(e.target.value as 'litres' | 'gallons')}
              className="bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none transition-all"
            >
              <option value="litres">Litres (L)</option>
              <option value="gallons">Gallons (Gal)</option>
            </select>
          </div>

          <div className="mt-4 bg-slate-100 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="text-xs font-semibold text-slate-600">Chemical Dose Required:</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-bold tracking-tight text-primary">{chemicalRequiredML}</span>
              <span className="text-xs font-semibold text-primary">Millilitres (ml)</span>
              <span className="text-xs text-slate-500 ml-2">
                (~{(chemicalRequiredML / 1000).toFixed(2)} L)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-normal">
              Calculated using the strict B2B mathematical standard ratio of 1 part chemical to {ratio} parts water.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
