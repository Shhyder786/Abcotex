import React from 'react';
import { ActiveTab } from '../types';
import { Phone, Mail } from 'lucide-react';

interface FooterProps {
  navigateToTab: (tab: ActiveTab) => void;
  setCategoryFilter: (filter: 'all' | 'textile' | 'healthcare' | 'janitorial') => void;
  handleScrollToInquiry: (industry?: string, productIds?: string[]) => void;
}

export default function Footer({ navigateToTab, setCategoryFilter, handleScrollToInquiry }: FooterProps) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <div className="text-2xl font-extrabold text-primary tracking-tight">ABCOTEX</div>
            <p className="text-sm text-slate-600 max-w-lg">
              Specialized chemical manufacturers providing industrial chemical solutions & hospital hygiene systems in domestic and export markets since 1997.
            </p>
            {/* contact links moved to Contact & Location column for clearer layout */}
          </div>

          <div className="md:col-span-1 space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Contact & Location</h4>
            <div className="flex flex-col text-sm text-slate-600">
              <p className="mb-1">Head Office: 12 Industrial Estate, SITE, Karachi, Pakistan</p>
              <p className="mb-2">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <a href="tel:+923302528228" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-primary mb-1">
                <Phone className="w-4 h-4" />
                +92 330 2528228
              </a>
              <a href="mailto:aamir@abcotex.pk" className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-primary mb-2">
                <Mail className="w-4 h-4" />
                aamir@abcotex.pk
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Quick Links</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li><button onClick={() => navigateToTab('home')} className="hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => navigateToTab('products')} className="hover:text-primary transition-colors">Products</button></li>
              <li><button onClick={() => navigateToTab('about-us')} className="hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => handleScrollToInquiry(undefined, [])} className="hover:text-primary transition-colors">Request Spec / Inquiry</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div>© {new Date().getFullYear()} ABCOTEX Industrial. All rights reserved.</div>
          <div className="mt-2 md:mt-0">Karachi Chamber of Commerce Member #44802 • ISO Certified Reg: PK-829A-901</div>
        </div>
      </div>
    </footer>
  );
}
