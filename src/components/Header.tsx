import React from 'react';
import { Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigateToTab: (tab: ActiveTab) => void;
  handleScrollToInquiry: (industry?: string, productIds?: string[]) => void;
}

const NAV_ITEMS: { tab: ActiveTab; label: string; id: string }[] = [
  { tab: 'home', label: 'Home', id: 'nav-home' },
  { tab: 'about-us', label: 'About Us', id: 'nav-about' },
];

export default function Header({
  activeTab,
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigateToTab,
  handleScrollToInquiry,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200/40`}
    >
      {/* E-commerce Style Announcement Bar */}
      <div className="bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] text-white text-[10px] font-bold tracking-widest py-2 px-gutter text-center uppercase select-none">
        ⚡ ABCOTEX INDUSTRIAL & RETAIL HYGIENE CATALOG — REQUEST FREE SPECS & CUSTOM FORMULATIONS
      </div>

      <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => navigateToTab('home')}
          className="text-lg font-extrabold text-primary tracking-tight flex items-center gap-2 cursor-pointer hover:opacity-95"
          id="brand-logo-btn"
        >
          <span>ABCOTEX</span>
          <span className="text-[10px] bg-slate-100 text-primary px-2 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
            ESTD 1997
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              onClick={() => navigateToTab(item.tab)}
              className={`text-sm tracking-wide px-1 py-1.5 transition-colors cursor-pointer border-b-2 hover:text-primary ${
                activeTab === item.tab
                  ? 'text-primary border-primary font-bold'
                  : 'text-slate-650 border-transparent'
              }`}
              id={item.id}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleScrollToInquiry('Healthcare', [])}
            className="hidden md:block bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] hover:brightness-105 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 cursor-pointer"
            id="nav-contact-btn"
          >
            Contact Us
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-2 z-40 transition-all duration-300">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              onClick={() => navigateToTab(item.tab)}
              className={`text-left p-3 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === item.tab
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleScrollToInquiry('Healthcare', []);
              setMobileMenuOpen(false);
            }}
            className="mt-2 bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] hover:brightness-105 text-white p-3 rounded-lg text-center font-bold uppercase tracking-wider text-xs shadow-md shadow-primary/20 cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
