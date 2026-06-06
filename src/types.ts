export type ActiveTab = 'home' | 'products' | 'about-us';

export interface Product {
  id: string;
  name: string;
  category: 'textile' | 'healthcare' | 'retail' | 'general';
  description: string;
  specification: string;
  statusOrInventory: string; // "CERTIFIED" | "CRITICAL" | "In Stock" etc.
  imageUrl: string;
  isFeatured?: boolean;
  applications?: string[];
  safetyDataSheetUrl?: string;
  dilutionRatio?: string; // e.g. "1:50"
}

export interface IndustryVertical {
  id: string;
  title: string;
  iconName: string; // e.g. "HeartPulse", "Shirt", "Factory", "Building", "FlaskConical", "Store"
  description: string;
  detailedNeeds: string;
  recommendedProductIds: string[];
}

export interface InquiryFormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  inquiryType: string;
  message: string;
  productsRequested: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  imagePlaceholderColor: string;
}
