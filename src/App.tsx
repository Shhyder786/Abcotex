import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Shirt,
  Factory,
  Building,
  FlaskConical,
  Store,
  FileText,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Search,
  Award,
  Truck,
  Settings,
  ShoppingCart,
  Trash2,
  ShoppingBag,
  X
} from 'lucide-react';
import { ActiveTab, Product } from './types';
import { PRODUCTS_DATA, INDUSTRY_VERTICALS, CASE_STUDIES, TRUSTED_CLIENTS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import slider1 from './assets/slider 1.jpeg';
import slider2 from './assets/slider 2.jpeg';
import logoImg from './assets/logo.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search & Filtering for Products catalog
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'textile' | 'healthcare' | 'retail' | 'general'>('all');
  
  // Custom B2B Interactive portal states
  const [selectedProductForForm, setSelectedProductForForm] = useState<string[]>([]);
  const [suggestedIndustry, setSuggestedIndustry] = useState<string>('Healthcare');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  // Slider states and autoplay
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: slider1,
      badge: "ESTABLISHED 1997 | 28 YEARS OF TRUST",
      title: "Premium Chemical Auxiliaries for Textile Mills",
      subtitle: "Formulating swelling agents, Fixnol polyamine fixers, and high-stability softeners optimized for industrial garment mills.",
      primaryBtnText: "Explore Catalog",
      secondaryBtnText: "Request Spec",
      primaryAction: () => navigateToTab('products'),
      secondaryAction: () => handleScrollToInquiry('Textile', [])
    },
    {
      image: slider2,
      badge: "CLINICAL GRADE DISINFECTION",
      title: "PCSIR-certified Hospital & Clinic Sanitizers",
      subtitle: "WHO standard hand hygiene systems and heavy-duty coal-tar phenolic floor disinfectants validated for infection control.",
      primaryBtnText: "Browse Hygiene Care",
      secondaryBtnText: "Direct Inquiry",
      primaryAction: () => {
        setCategoryFilter('healthcare');
        navigateToTab('products');
      },
      secondaryAction: () => handleScrollToInquiry('Healthcare', [])
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay effect
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // E-commerce style B2B Inquiry Bag states
  const [inquiryBag, setInquiryBag] = useState<string[]>([]);
  const [inquiryBagOpen, setInquiryBagOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isInquiryCheckoutOpen, setIsInquiryCheckoutOpen] = useState(false);
  const [isOrderConfirmedOpen, setIsOrderConfirmedOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });

  const toggleInquiryBag = (productId: string) => {
    setInquiryBag((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleInquiryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'ABCO-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmedOrderId(orderId);
    setInquiryBag([]);
    setIsInquiryCheckoutOpen(false);
    setIsOrderConfirmedOpen(true);
    // Reset form
    setCheckoutForm({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      city: '',
      message: ''
    });
  };

  // Handle sticky scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft trigger for contact anchor scroll
  const handleScrollToInquiry = (industryVal?: string, productIds?: string[]) => {
    setActiveTab('about-us');
    if (industryVal) setSuggestedIndustry(industryVal);
    if (productIds) setSelectedProductForForm(productIds);
    
    setTimeout(() => {
      const element = document.getElementById('b2b-inquiry-box');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Switch tabs smoothly and close mobile nav
  const navigateToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products based on state
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.specification.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = categoryFilter === 'all' ? true : p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Helper to deduplicate products when showing all divisions
  const getDeduplicatedProducts = (products: Product[]) => {
    const seen = new Set<string>();
    return products.filter((p) => {
      // Normalize product name to catch duplicate items across categories
      const norm = p.name.toLowerCase()
        .replace(/\(.*\)/g, '') // remove (Disinfectant), (BASF & China origin) etc.
        .replace(/&/g, 'and')
        .replace(/\s+/g, ' ')
        .trim();
      
      let key = norm;
      if (norm.includes('phenyl')) key = 'phenyl';
      if (norm.includes('hand wash') || norm.includes('hand sanitizer')) key = 'hand wash';
      if (norm.includes('detergent')) key = 'detergent';
      if (norm.includes('bleach')) key = 'bleach';
      if (norm.includes('room spray') || norm.includes('air freshener')) key = 'room spray';
      if (norm.includes('vaseline')) key = 'vaseline';
      if (norm.includes('hydrogen peroxide')) key = 'hydrogen peroxide';
      if (norm.includes('dishwashing')) key = 'dishwashing';
      if (norm.includes('general cleaning') || norm.includes('all-purpose cleaning')) key = 'general cleaning';

      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  // Determine final list of products to display
  const displayProducts = categoryFilter === 'all' 
    ? getDeduplicatedProducts(filteredProducts)
    : filteredProducts;

  // Get active category header content
  const getCategoryHeader = () => {
    switch (categoryFilter) {
      case 'textile':
        return {
          title: "Textile Industry Division",
          subtitle: "Precision chemistry formulations for global fabric manufacturing units.",
          tag: "APPLICATIONS: Pretreatment, Dyeing, and Complex Fiber Finishing Optimization"
        };
      case 'healthcare':
        return {
          title: "Healthcare & Hospitals Division",
          subtitle: "Certified biocidal compounds & antiseptic soaps for clinical environments.",
          tag: "APPLICATIONS: HOSPITAL INFECTIONS CONTROL & GENERAL BROAD-SPECTRUM DISINFECTION"
        };
      case 'retail':
        return {
          title: "Stores & Retail Chains Division",
          subtitle: "General cleaning & washing chemicals packaged for high-turnover retail environments.",
          tag: "APPLICATIONS: PRIVATE LABELS, BULK SUPPLY & CONSUMER SHELF STOCK"
        };
      case 'general':
        return {
          title: "General Cleaning Chemicals Division",
          subtitle: "All-purpose and specialized cleaning chemical formulations for broad commercial applications.",
          tag: "APPLICATIONS: Multi-Surface Scouring, Kitchen Care & Heavy Duty Degreasing"
        };
      case 'all':
      default:
        return {
          title: "All Products & Chemical Formulations",
          subtitle: "Explore our comprehensive range of high-performance industrial and commercial chemical solutions.",
          tag: "GLOBAL STANDARDS: PCSIR CERTIFIED, LAB-SUPPORTED & SUSTAINABLE"
        };
    }
  };

  const currentHeader = getCategoryHeader();

  // Get icon component dynamically based on name
  const renderVerticalIcon = (iconName: string, sizeClass = "w-6 h-6") => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className={`${sizeClass} text-primary`} />;
      case 'Shirt': return <Shirt className={`${sizeClass} text-primary`} />;
      case 'Factory': return <Factory className={`${sizeClass} text-primary`} />;
      case 'Building': return <Building className={`${sizeClass} text-primary`} />;
      case 'FlaskConical': return <FlaskConical className={`${sizeClass} text-primary`} />;
      case 'Store': return <Store className={`${sizeClass} text-primary`} />;
      default: return <FlaskConical className={`${sizeClass} text-primary`} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary/20 selection:text-primary">
      <Header
        activeTab={activeTab}
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigateToTab={navigateToTab}
        handleScrollToInquiry={handleScrollToInquiry}
        inquiryCount={inquiryBag.length}
        onOpenInquiryBag={() => setInquiryBagOpen(true)}
      />

      {/* Main content body */}
      <main className="pt-20">
        
        {/* TAB 1: HOME (previously Solutions) */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* E-commerce Hero Image Slider */}
            <section className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] overflow-hidden bg-slate-900">
              {/* Slides */}
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    {/* Background image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover select-none"
                    />
                    {/* Dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="max-w-7xl mx-auto px-6 w-full text-left">
                        <div className="max-w-xl space-y-4 sm:space-y-6">
                          <span className="inline-block bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {slide.badge}
                          </span>
                          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                            {slide.title}
                          </h1>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg">
                            {slide.subtitle}
                          </p>
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={slide.primaryAction}
                              className="bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] hover:brightness-105 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 cursor-pointer border-none"
                            >
                              {slide.primaryBtnText}
                            </button>
                            <button
                              onClick={slide.secondaryAction}
                              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                            >
                              {slide.secondaryBtnText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Slider controls - Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors cursor-pointer border-none flex items-center justify-center"
                aria-label="Previous Slide"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              {/* Slider controls - Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors cursor-pointer border-none flex items-center justify-center"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeSlide ? 'bg-primary w-4' : 'bg-white/40'
                    } cursor-pointer border-none`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </section>
            
                        {/* Core Metrics Strip */}
            <section className="bg-slate-50 py-12 border-y border-slate-200 shadow-inner">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-primary font-black text-2xl sm:text-3xl">28+ Years</span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">Market Success</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-primary font-black text-2xl sm:text-3xl">Strict QA</span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">Laboratory Control</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-primary font-black text-2xl sm:text-3xl">Fast & Reliable</span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">Supply Chain</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-primary font-black text-2xl sm:text-3xl">Custom</span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">Formulations</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured products section removed */}

            {/* Showcase Client Marquee Bar with static/carousel simulation */}
            <section className="py-2xl border-y border-outline-variant/10 bg-surface-container-low overflow-hidden">
              <div className="max-w-7xl mx-auto px-gutter mb-lg text-center animate-pulse">
                <span className="text-[12px] font-bold text-slate-700 tracking-widest uppercase font-mono">
                  TRUSTED BY INDUSTRY LEADERS IN EXPORT & DOMESTIC MARKETS
                </span>
              </div>
              
              <div className="flex gap-[100px] items-center whitespace-nowrap overflow-x-auto py-2 px-gutter no-scrollbar relative max-w-7xl mx-auto justify-around">
                {TRUSTED_CLIENTS.map((client, idx) => (
                  <span 
                    key={idx} 
                    className="text-headline-md font-extrabold text-slate-400/80 hover:text-primary transition-colors tracking-tight font-headline-lg font-sans text-sm md:text-md uppercase"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </section>

            {/* Specialized Industry Verticals Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-on-background">Specialized Industry Verticals</h2>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-3"></div>
                <p className="text-sm text-slate-500 max-w-xl mx-auto mt-4 leading-relaxed">
                  We formulate custom chemical compounds designed carefully around each market's specific hazard limits & operational criteria.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INDUSTRY_VERTICALS.map((vertical) => (
                  <div 
                    key={vertical.id} 
                    className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-primary hover:shadow-xl transition-all group flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 shadow-sm text-primary group-hover:text-white">
                        {renderVerticalIcon(vertical.iconName, "w-6 h-6 transition-colors duration-300 group-hover:text-white")}
                      </div>
                      <h3 className="text-lg font-bold text-on-background mb-2">{vertical.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{vertical.description}</p>
                      
                      {/* Interactive Drawer inside vertical card */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 mb-6 leading-relaxed">
                        <strong>Operational Criteria:</strong> {vertical.detailedNeeds}
                      </div>
                    </div>

                    <div className="pt-4 mt-6 flex justify-between items-center border-t border-slate-100">
                      <button 
                        onClick={() => navigateToTab('products')}
                        className="text-primary font-bold text-xs uppercase tracking-wide hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Browse {vertical.recommendedProductIds.length} Products
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleScrollToInquiry(vertical.title, vertical.recommendedProductIds)}
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all border border-primary/20 hover:border-transparent cursor-pointer"
                      >
                        Request Spec
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* B2B Product-Related Equipment Support Block removed */}



            {/* Quick Consultation Banner */}
            <section className="bg-gradient-to-r from-[#8b5cf6] to-[#0077e6] text-white py-xl md:py-2xl">
              <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-lg">
                <div className="text-center md:text-left">
                  <h2 className="text-headline-lg font-headline-lg font-bold mb-1">Ready to optimize your chemical operations?</h2>
                  <p className="text-body-md opacity-90 max-w-xl">
                    Our lead laboratory engineers are available for immediate custom formulations & technical verification.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-md shrink-0 w-full md:w-auto">
                  <a 
                    href="tel:03302528228" 
                    className="flex items-center gap-md bg-white/10 hover:bg-white/20 p-md rounded-xl transition-all border border-white/10"
                  >
                    <Phone className="w-5 h-5 text-white" />
                    <div>
                      <span className="block text-[10px] text-white/80 uppercase font-bold tracking-wide">Direct Phone</span>
                      <span className="font-bold text-sm">0330-2528228</span>
                    </div>
                  </a>

                  <a 
                    href="mailto:aamir@abcotex.pk" 
                    className="flex items-center gap-md bg-white/10 hover:bg-white/20 p-md rounded-xl transition-all border border-white/10"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    <div>
                      <span className="block text-[10px] text-white/80 uppercase font-bold tracking-wide">Regional Director</span>
                      <span className="font-bold text-sm">aamir@abcotex.pk</span>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG MATCHING SCREEN 2 */}
        {activeTab === 'products' && (
          <div className="animate-fadeIn">
            {/* Products hero and Browse By Division removed */}

            {/* Catalog search/filter Controls */}
            <section className="max-w-7xl mx-auto px-gutter mb-xl mt-8 md:mt-12">
              <div className="bg-surface-container p-md rounded-xl border border-outline-variant/30 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
                
                {/* Text search */}
                <div className="relative w-full md:max-w-4xl">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // keep default behavior: filter handled reactively via input state
                    }}
                    className="w-full max-w-full flex items-center gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3 transition-shadow hover:shadow-md"
                    role="search"
                    aria-label="Product search"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-surface-container-lowest/60">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>

                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 px-4 py-2"
                      placeholder="Search chemical specifications, e.g. Phenyl, Hydrogen Peroxide..."
                      aria-label="Search products"
                    />

                    {productSearch ? (
                      <button
                        type="button"
                        onClick={() => setProductSearch('')}
                        title="Clear search"
                        aria-label="Clear search"
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                      </button>
                    ) : null}

                    <div className="relative ml-2">
                      <label htmlFor="search-category" className="sr-only">Category</label>
                      <select
                        id="search-category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as any)}
                        className="appearance-none bg-slate-50 border border-slate-200 text-sm rounded-md px-3 py-2 pr-8"
                      >
                        <option value="all">All Divisions</option>
                        <option value="textile">Textile Industry</option>
                        <option value="healthcare">Healthcare & Hospitals</option>
                        <option value="retail">Stores & Retail Chains</option>
                        <option value="general">General Cleaning Chemicals</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>

                    <button
                      type="submit"
                      className="ml-3 inline-flex items-center gap-2 bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:brightness-105"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </form>
                </div>

                {/* Category buttons removed; category selection is available in the search dropdown */}
              </div>
            </section>            <div className="max-w-7xl mx-auto px-gutter space-y-2xl">
              
              {/* Dynamic Header & Unified Single Grid */}
              <section className="scroll-mt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-md gap-sm border-b border-outline-variant/35 pb-sm">
                  <div className="text-left">
                    <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold text-xl sm:text-2xl">{currentHeader.title}</h2>
                    <p className="text-on-surface-variant leading-relaxed text-xs">{currentHeader.subtitle}</p>
                  </div>
                  {/* Removed small tag pill for cleaner layout */}
                </div>

                {displayProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:scale-[1.01]"
                      >
                        {/* Top Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-150">
                          <img 
                            src={p.imageUrl} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 right-2.5">
                            <span className="bg-primary/95 text-white text-[9px] px-2.5 py-0.5 rounded font-mono font-bold uppercase shadow-sm">
                              {p.statusOrInventory}
                            </span>
                          </div>
                        </div>

                        {/* Text and Details */}
                        <div className="p-5 flex flex-col justify-between flex-1 text-left">
                          <div className="space-y-2">
                            <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-primary transition-colors leading-snug">
                              {p.name}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                              {p.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[10px] text-slate-400">
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-bold uppercase tracking-wider shrink-0">Specification:</span>
                              <span className="font-semibold text-slate-650 truncate max-w-[130px]" title={p.specification}>{p.specification}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold uppercase tracking-wider">Dilution Ratio:</span>
                              <span className="font-bold text-slate-700 font-mono">{p.dilutionRatio}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => toggleInquiryBag(p.id)}
                                className={`flex-1 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 border ${
                                  inquiryBag.includes(p.id)
                                    ? 'bg-primary text-white border-primary hover:bg-primary-container'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:bg-primary hover:text-white'
                                }`}
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                {inquiryBag.includes(p.id) ? 'In Bag' : 'Add to Inquiry'}
                              </button>
                              <button
                                onClick={() => setSelectedProductDetails(p)}
                                className="px-3 bg-slate-50 hover:bg-slate-150 text-slate-650 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors border border-slate-200 cursor-pointer text-center"
                                title="Quick View Specifications"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500 font-mono text-xs">
                    No chemical matches found in this division.
                  </div>
                )}
              </section>

              {/* Engineering Themed Custom Formulation Callout */}
              <section className="bg-primary-container p-xl sm:p-2xl text-on-primary-container rounded-2xl flex flex-col md:flex-row gap-xl items-center relative overflow-hidden shadow-inner border border-primary/20">
                {/* Abstract graphic watermark illustration of chemical beaker */}
                <div className="absolute right-0 top-0 opacity-10 translate-x-12 -translate-y-12 select-none pointer-events-none">
                  <FlaskConical className="w-[280px] h-[280px]" />
                </div>
                
                <div className="flex-1 z-10 space-y-md text-left">
                  <div className="flex items-center gap-xs">
                    <Settings className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '15s' }} />
                    <h2 className="text-headline-lg font-headline-lg text-white font-extrabold text-xl sm:text-2xl">
                      Custom Formulation & Custom Chemical Synthesis
                    </h2>
                  </div>
                  <p className="text-body-md text-white/95 leading-relaxed max-w-3xl font-medium">
                    Our R&D division has spent nearly three decades designing customized chemical structures for specific industrial requirements. Talk to our technical team today.
                  </p>
                  <div className="flex flex-wrap gap-xs sm:gap-sm pt-2">
                    <span className="bg-white/10 px-md py-1 rounded text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      🔬 R&D Lab Support
                    </span>
                    <span className="bg-white/10 px-md py-1 rounded text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      ✓ PCSIR QA Approved
                    </span>
                    <span className="bg-white/10 px-md py-1 rounded text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      🛢️ 200L Steel Packings
                    </span>
                  </div>
                </div>

                <div className="shrink-0 z-10 w-full md:w-auto text-center">
                  <button 
                    onClick={() => handleScrollToInquiry('Healthcare', [])}
                    className="inline-flex items-center justify-center gap-xs bg-white text-primary hover:bg-surface-bright px-2xl py-lg font-bold text-xs uppercase tracking-widest shadow-lg rounded transition-all w-full md:w-auto cursor-pointer"
                  >
                    Consult B2B Agent
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* TAB 5: ABOUT US (REPRESENTING SCREEN 3) */}
        {activeTab === 'about-us' && (
          <div className="animate-fadeIn">
            {/* narrative narrative section */}
            <section className="py-xl md:py-2xl px-gutter max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
                <div className="lg:col-span-8 text-left space-y-md sm:space-y-lg">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold max-w-xl leading-tight">
                    28 Years of Chemical Excellence & Industrial Trust
                  </h1>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    Since our inception in 1997, ABCOTEX has stood as a beacon of reliability and rigorous chemical precision in Pakistan. For nearly three decades, we have engineered high-performance hygiene solutions and advanced textile auxiliaries that bridge the gap between safety and production efficiency. Our journey is defined by a relentless pursuit of international quality standards and a commitment to protecting the spaces where people work, heal, and live.
                  </p>
                  <p className="text-body-sm text-outline leading-relaxed font-medium">
                    With a robust presence in both localized regional sectors and competitive B2B export markets, ABCOTEX has cultivated a legacy of professional authority. Our manufacturing facility in Karachi is governed by precision batching and rigorous safety hazard protocols, ensuring that every product—from medical-grade disinfectants to textile finishing fixers—meets the exact specifications required by modern healthcare and corporate manufacturing institutions.
                  </p>
                </div>
                
                {/* Visual grid illustration representing screen 3 image */}
                <div className="lg:col-span-4 aspect-square bg-surface-container relative overflow-hidden rounded-2xl shadow-xl border border-outline-variant flex items-center justify-center">
                  <img 
                    alt="ABCOTEX logo"
                    className="max-w-[70%] max-h-[70%] object-contain select-none"
                    src={logoImg}
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    REACH Registered
                  </div>
                </div>
              </div>
            </section>

            {/* Strengths Grid section (infographics moved to right, image removed) */}
            <section className="bg-surface-container-low py-xl sm:py-2xl border-y border-outline-variant/15">
              <div className="px-gutter max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl md:gap-2xl items-start">
                  <div className="flex flex-col justify-center text-left lg:pr-8">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold max-w-md leading-tight">
                      Our Manufacturing & Operational Strengths
                    </h2>
                    <p className="text-body-sm text-on-surface-variant max-w-md mt-sm leading-relaxed mb-md">
                      Our chemical infrastructure in Karachi is designed for high-throughput precision, ensuring that from raw material selection to final shipment legal documentation, every step is optimized for global compliance.
                    </p>
                  </div>

                  {/* Infographics moved to right column */}
                  <div className="flex items-center justify-end">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm w-full">
                      <div className="flex items-start gap-sm p-sm bg-surface-container-lowest border border-outline-variant/20 rounded-lg">
                        <span className="text-primary p-1 bg-primary/10 rounded">
                          <Truck className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wide">Agile Logistics</h4>
                          <p className="text-[11px] text-on-surface-variant leading-tight">Quick dispatch of verification samples.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-sm p-sm bg-surface-container-lowest border border-outline-variant/20 rounded-lg">
                        <span className="text-primary p-1 bg-primary/10 rounded">
                          <FlaskConical className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wide">Material Sourcing</h4>
                          <p className="text-[11px] text-on-surface-variant leading-tight">Careful raw material selection.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-sm p-sm bg-surface-container-lowest border border-outline-variant/20 rounded-lg">
                        <span className="text-primary p-1 bg-primary/10 rounded">
                          <Settings className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wide">Precision Ops</h4>
                          <p className="text-[11px] text-on-surface-variant leading-tight">Precision batching using modern tech.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-sm p-sm bg-surface-container-lowest border border-outline-variant/20 rounded-lg">
                        <span className="text-primary p-1 bg-primary/10 rounded">
                          <ShieldCheck className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wide">Packaging Safety</h4>
                          <p className="text-[11px] text-on-surface-variant leading-tight">Professional lockouts for industrial safety.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications verification hub */}
            <section className="py-xl max-w-7xl mx-auto px-gutter">
              <h2 className="font-headline-lg text-headline-lg text-on-surface text-center font-extrabold mb-xl">
                Verification & Performance Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                <div className="bg-surface-container-lowest border border-outline-variant/35 p-md rounded-xl text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-md shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-on-surface font-headline-md font-bold mb-xs text-sm sm:text-md">PCSIR Laboratory Validation</h3>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Test Report #ILD/ATR-565/13 confirms Abcotex Phenyle is effective at a 5% concentration against pathogens including E. coli, S. aureus, and Pseudomonas aeruginosa.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/35 p-md rounded-xl text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-md shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-on-surface font-headline-md font-bold mb-xs text-sm sm:text-md">Aga Khan Hospital Satisfied Cert.</h3>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Official validation of complete satisfaction with product performance, air deodorizers, premium hand wash, and supply consistency for clinical hospital units.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/35 p-md rounded-xl text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-md shadow-sm">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-on-surface font-headline-md font-bold mb-xs text-sm sm:text-md">Liaquat National Recognition</h3>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Verification of partnership as an active healthcare chemical exhibitor at Karachi Health Products Fairs, confirming institutional safety.
                  </p>
                </div>
              </div>
            </section>

            {/* Target Address & Karachi Map Layout matching Screen 3 bottom */}
            <section className="bg-surface-container-high py-xl border-t border-outline-variant/20">
              <div className="px-gutter max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl md:gap-2xl items-start">
                  
                  {/* Operations addresses list */}
                  <div className="space-y-lg text-left">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold text-xl sm:text-2xl mb-md">
                      Global Headquarters & Karachi Operations
                    </h2>
                    
                    <div className="space-y-md">
                      <div className="flex items-start gap-md">
                        <span className="p-2 bg-surface-container-lowest text-primary rounded shadow-sm shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                            Corporate Head Office
                          </h4>
                          <p className="font-extrabold text-xs text-on-surface">
                            House #W18, East Street, DHA Phase 1, Karachi, Pakistan
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-md">
                        <span className="p-2 bg-surface-container-lowest text-primary rounded shadow-sm shrink-0">
                          <Building className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                            Regional Branch Center
                          </h4>
                          <p className="font-extrabold text-xs text-on-surface">
                            Panama Centre, Office #M-13, Block 13/D-D3, Gulshan-e-Iqbal, Karachi
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-md">
                        <span className="p-2 bg-surface-container-lowest text-primary rounded shadow-sm shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                            Official Digital Domain
                          </h4>
                          <p className="font-extrabold text-xs text-on-surface">
                            www.abcotex.pk
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Karachi Map Image component */}
                    <div className="w-full h-56 rounded-xl overflow-hidden border border-outline-variant shadow-lg relative bg-surface-container">
                      <img 
                        alt="Stylized routing map of Karachi operations and industrial parks" 
                        className="w-full h-full object-cover select-none"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWsIeHNErZ4LkTo1f4cZJUZpy9TlWjT-rAKDNvUSxl0CNCRUii2l7r5lF2kzcu-4MX-Wgo8RrcewtV0upuBN0s-tlPRBhazKvFpuSFL6KJRkuSZhk-v-wrJgeevUanrAXiTtdIyufdVD4SzcY4KBJ4fg-nQSb0f0WLZRrgnusgt0SsQsgce-NU2GzlVJumzuv9q8SUU-ECLxj-eOOv6xcXWZ5rMm4G0RJHNoOnjcyz7joL_B6IPXx57IkbmIhUiXITRbG9n_Qa24QT"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-primary/95 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase shadow-sm">
                        Karachi Operations Map
                      </div>
                    </div>
                  </div>

                  {/* B2B DIRECT CONTACT CARD */}
                  <div 
                    id="b2b-inquiry-box"
                    className="bg-gradient-to-br from-[#8b5cf6] to-[#0077e6] text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 text-left border border-primary/20"
                  >
                    <div>
                      <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                        Direct Procurement Channel
                      </span>
                      <h3 className="text-xl font-extrabold text-white leading-tight">
                        Direct B2B Inquiry & Consultation
                      </h3>
                      <p className="text-sm text-white/85 mt-2 leading-relaxed">
                        Skip the forms. Connect directly with our regional director or technical team to discuss formulations, contract pricing, or request custom samples.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <a 
                        href="tel:03302528228"
                        className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all border border-white/20 hover:scale-[1.01] cursor-pointer"
                      >
                        <Phone className="w-6 h-6 text-white shrink-0" />
                        <div>
                          <span className="block text-[10px] text-white/70 uppercase font-bold tracking-wide">Direct Phone</span>
                          <span className="font-extrabold text-base text-white">0330-2528228</span>
                        </div>
                      </a>

                      <a 
                        href="mailto:aamir@abcotex.pk?subject=B2B%20Chemical%20Inquiry%20-%20ABCOTEX"
                        className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all border border-white/20 hover:scale-[1.01] cursor-pointer"
                      >
                        <Mail className="w-6 h-6 text-white shrink-0" />
                        <div>
                          <span className="block text-[10px] text-white/70 uppercase font-bold tracking-wide">Regional Director</span>
                          <span className="font-extrabold text-base text-white">aamir@abcotex.pk</span>
                        </div>
                      </a>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[11px] text-white/60 leading-normal">
                      <p>
                        * Clicking <strong>Regional Director</strong> will launch your default email client pre-addressed to our procurement division.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer
        navigateToTab={navigateToTab}
        setCategoryFilter={setCategoryFilter}
        handleScrollToInquiry={handleScrollToInquiry}
      />
      {/* Inquiry Bag Slide-over Drawer */}
      {inquiryBagOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Overlay */}
          <div 
            onClick={() => setInquiryBagOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="text-base font-extrabold text-slate-900">Inquiry List</h3>
                <span className="bg-primary/10 text-primary text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                  {inquiryBag.length}
                </span>
              </div>
              <button 
                onClick={() => setInquiryBagOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-655 rounded-lg hover:bg-slate-100 cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {inquiryBag.length > 0 ? (
                PRODUCTS_DATA.filter(p => inquiryBag.includes(p.id)).map((p) => (
                  <div key={p.id} className="flex gap-4 p-3 bg-slate-50 border border-slate-200/60 rounded-xl relative group">
                    <img 
                      src={p.imageUrl} 
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 text-left min-w-0 pr-8">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider block mb-0.5">
                        {p.category}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-800 leading-snug truncate">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">
                        Spec: {p.specification.split('/')[0]}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleInquiryBag(p.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-450">
                    <ShoppingBag className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Your Inquiry List is Empty</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-[240px] leading-relaxed">
                      Browse our chemical catalogs and add products to request custom bulk specifications.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setInquiryBagOpen(false);
                      navigateToTab('products');
                    }}
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    View Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {inquiryBag.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                <p className="text-[11px] text-slate-500 text-left">
                  * All items will be auto-filled into our B2B procurement inquiry.
                </p>
                <button 
                  onClick={() => {
                    setInquiryBagOpen(false);
                    setIsInquiryCheckoutOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/35 text-center flex items-center justify-center gap-2 border-none"
                >
                  Proceed to Bulk Inquiry
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Inquiry Form Modal */}
      {isInquiryCheckoutOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            onClick={() => setIsInquiryCheckoutOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col animate-scaleUp">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="text-left">
                <h3 className="font-extrabold text-base text-slate-900">Request Bulk Spec Sheets & Quote</h3>
                <p className="text-xs text-slate-500 mt-0.5">Please provide your corporate details to submit the inquiry.</p>
              </div>
              <button 
                onClick={() => setIsInquiryCheckoutOpen(false)}
                className="text-slate-400 hover:text-slate-655 p-1 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form & Summary */}
            <form onSubmit={handleInquiryFormSubmit} className="p-6 space-y-6 text-left">
              {/* Selected items summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Inquired Products ({inquiryBag.length})</h4>
                <div className="max-h-24 overflow-y-auto space-y-1.5">
                  {PRODUCTS_DATA.filter(p => inquiryBag.includes(p.id)).map(p => (
                    <div key={p.id} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800 truncate max-w-[340px]">• {p.name}</span>
                      <span className="font-mono text-slate-500 shrink-0">{p.specification.split('/')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Company / Organization</label>
                  <input 
                    required
                    type="text" 
                    value={checkoutForm.companyName}
                    onChange={(e) => setCheckoutForm({...checkoutForm, companyName: e.target.value})}
                    placeholder="E.g., Lucky Knits"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Contact Person Name</label>
                  <input 
                    required
                    type="text" 
                    value={checkoutForm.contactName}
                    onChange={(e) => setCheckoutForm({...checkoutForm, contactName: e.target.value})}
                    placeholder="Your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Contact Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    placeholder="E.g., 0300-1234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Corporate Email</label>
                  <input 
                    required
                    type="email" 
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Business City</label>
                <input 
                  required
                  type="text" 
                  value={checkoutForm.city}
                  onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                  placeholder="Karachi, Lahore, Faisalabad etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Inquiry Message / Special Requirements</label>
                <textarea 
                  value={checkoutForm.message}
                  onChange={(e) => setCheckoutForm({...checkoutForm, message: e.target.value})}
                  placeholder="Describe your testing needs, sample volumes, or custom concentration specifications..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-primary/20 text-center flex items-center justify-center gap-2 border-none"
                >
                  Submit Bulk Inquiry
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Quick View Modal */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            onClick={() => setSelectedProductDetails(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col animate-scaleUp">
            <button 
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-700 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors cursor-pointer shadow z-20 border-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Product Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
              <img 
                src={selectedProductDetails.imageUrl} 
                alt={selectedProductDetails.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white text-[9px] px-3 py-1 rounded font-mono font-bold uppercase shadow-md">
                  {selectedProductDetails.statusOrInventory}
                </span>
              </div>
            </div>

            {/* Text & Specification Details */}
            <div className="p-6 text-left space-y-4">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                  {selectedProductDetails.category} division
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedProductDetails.name}
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedProductDetails.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-2 text-xs">
                <div className="flex justify-between items-center gap-2 border-b border-slate-200/50 pb-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Technical Specification:</span>
                  <span className="font-semibold text-slate-700 text-right">{selectedProductDetails.specification}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Dilution Ratio:</span>
                  <span className="font-bold text-primary font-mono">{selectedProductDetails.dilutionRatio}</span>
                </div>
              </div>

              {selectedProductDetails.applications && selectedProductDetails.applications.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Recommended Applications</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProductDetails.applications.map((app, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-650 text-[9px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    toggleInquiryBag(selectedProductDetails.id);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 border ${
                    inquiryBag.includes(selectedProductDetails.id)
                      ? 'bg-primary text-white border-primary hover:bg-primary-container'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {inquiryBag.includes(selectedProductDetails.id) ? 'Remove From Inquiry' : 'Add To Inquiry'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Success Modal */}
      {isOrderConfirmedOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div 
            onClick={() => setIsOrderConfirmedOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-10 text-center animate-scaleUp">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-extrabold text-slate-950">Inquiry Submitted!</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Your B2B inquiry reference number is <strong className="text-slate-800 font-mono">{confirmedOrderId}</strong>. 
            </p>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We have dispatched this request to our regional laboratory. Our technical consultant will email/call you at your provided details to coordinate specifications and samples.
            </p>
            
            <div className="mt-6">
              <button
                onClick={() => setIsOrderConfirmedOpen(false)}
                className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
