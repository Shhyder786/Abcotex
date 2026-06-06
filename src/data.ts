import { Product, IndustryVertical, CaseStudy
  } from './types';
import product1 from './assets/products/product 1.jpeg';
import product2 from './assets/products/product 2.jpeg';
import product3 from './assets/products/product 3.jpeg';

const PRODUCT_IMAGES = [product1, product2, product3];

const PRODUCTS_RAW: Product[] = [
  // Textile Industry
  {
    id: 'textile-1',
    name: 'Sodium Hydrosulfide (BASF & China origin)',
    category: 'textile',
    description: 'High purity reducing agent for vat and sulfur dyeing.',
    specification: 'Reducing Agent / 90% Min Purity',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
    applications: ['VAT Dyeing', 'Sulfur Dyeing', 'Pretreatment Reducing Agent'],
    dilutionRatio: '1:100'
  },
  {
    id: 'textile-2',
    name: 'Softeners & Silicon Softeners',
    category: 'textile',
    description: 'Macro and micro emulsions for superior fabric hand-feel.',
    specification: 'Amino-functional Micro-emulsions',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    applications: ['Exhaust finishing', 'Padding application', 'Luxury garments'],
    dilutionRatio: '1:50'
  },
  {
    id: 'textile-3',
    name: 'Fixnol',
    category: 'textile',
    description: 'Advanced dye fixing agent for enhanced color fastness.',
    specification: 'Cationic Polyamine Dye Fixer',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=600&q=80',
    applications: ['Cotton dyeing post-treatment', 'Reactive dye washing', 'Wet fastness boost'],
    dilutionRatio: '1:40'
  },
  {
    id: 'textile-4',
    name: 'Washing-off Agents',
    category: 'textile',
    description: 'High-efficiency surfactants for reactive dyeing preparation.',
    specification: 'Non-ionic Surfactant Blend',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    applications: ['Scouring', 'Bleaching preparation', 'Soaping-off agent'],
    dilutionRatio: '1:200'
  },
  {
    id: 'textile-5',
    name: 'Wetting Agents',
    category: 'textile',
    description: 'Fast-wetting agents with low foaming properties.',
    specification: 'Anionic Wetting Agent',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    applications: ['Rapid wetting', 'Mercerizing helper', 'Pretreatment'],
    dilutionRatio: '1:150'
  },
  {
    id: 'textile-6',
    name: 'RC Chemical Powder',
    category: 'textile',
    description: 'Reduction clearing agent for polyester dyeing processes.',
    specification: 'High Stability Hydrosulfite Compound',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80',
    applications: ['Polyester post-clearing', 'Oils emulsion removal', 'Dye shade correction'],
    dilutionRatio: '1:150'
  },
  {
    id: 'textile-7',
    name: 'Hydrogen Peroxide 50%',
    category: 'textile',
    description: 'Industrial grade bleaching and oxidizing agent.',
    specification: 'Aqueous Peroxide / 50% Concentration',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    applications: ['Fabric bleaching', 'Effluent treatment', 'Knit scour-bleaching'],
    dilutionRatio: '1:80'
  },

  // Healthcare & Hospitals
  {
    id: 'healthcare-1',
    name: 'Full range of cleaning and washing chemicals',
    category: 'healthcare',
    description: 'Complete hygiene package for general hospital and ward operations.',
    specification: 'Hospital Grade Pack',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    applications: ['Ward disinfection', 'Laundry sterilization', 'Surface scrubbing'],
    dilutionRatio: '1:50'
  },
  {
    id: 'healthcare-2',
    name: 'Phenyl (Disinfectant)',
    category: 'healthcare',
    description: 'Hospital grade coal-tar disinfectant for floor care.',
    specification: 'Coal-Tar Phenolic Disinfectant Class A',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    applications: ['Infection wards surface sweep', 'General floor sanitation'],
    dilutionRatio: '1:20'
  },
  {
    id: 'healthcare-3',
    name: 'Hand Wash & Hand Sanitizer',
    category: 'healthcare',
    description: 'pH balanced soap and 70% alcohol-based sanitizer.',
    specification: 'WHO Standard sanitization formula',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
    applications: ['Surgical hand hygiene', 'Aseptic soap dispensers'],
    dilutionRatio: '1:1'
  },
  {
    id: 'healthcare-4',
    name: 'Detergent Powder',
    category: 'healthcare',
    description: 'High-strength washing powder for surgical linens.',
    specification: 'Low Foam High Detergency Soap',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    applications: ['Linen industrial operations', 'Boiler suit washing'],
    dilutionRatio: '1:100'
  },
  {
    id: 'healthcare-5',
    name: 'Bleach',
    category: 'healthcare',
    description: 'Stabilized Sodium Hypochlorite for active disinfection.',
    specification: 'Sodium Hypochlorite / 5% Active Chlorine',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    applications: ['Blood spill decontamination', 'Cold water sanitation'],
    dilutionRatio: '1:10'
  },
  {
    id: 'healthcare-6',
    name: 'Room Spray / Air Freshener',
    category: 'healthcare',
    description: 'Organic deodorizer for clinical odor control.',
    specification: 'Aerosolized Organic Deodorizers',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    applications: ['Lobbies', 'Doctor offices', 'Ambiance control'],
    dilutionRatio: '1:1'
  },
  {
    id: 'healthcare-7',
    name: 'Glass Cleaner',
    category: 'healthcare',
    description: 'Streak-free window and mirror cleaning agent.',
    specification: 'Isopropyl Alcohol Infused Cleaner',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1528740561666-bd2479fa0202?auto=format&fit=crop&w=600&q=80',
    applications: ['Glass facades', 'Precision mirrors'],
    dilutionRatio: '1:15'
  },
  {
    id: 'healthcare-8',
    name: 'Vaseline',
    category: 'healthcare',
    description: 'Pure white petroleum jelly for skin protection barrier.',
    specification: 'BP / USP Grade Petroleum Jelly',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    applications: ['Skin protection', 'Moisture barrier'],
    dilutionRatio: '1:1'
  },
  {
    id: 'healthcare-9',
    name: 'Hydrogen Peroxide (H₂O₂)',
    category: 'healthcare',
    description: 'Antiseptic grade hydrogen peroxide solution.',
    specification: 'Antiseptic solution / 6% H2O2',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    applications: ['Wound cleaning', 'Surface disinfection'],
    dilutionRatio: '1:5'
  },
  {
    id: 'healthcare-10',
    name: 'Dishwashing Liquid',
    category: 'healthcare',
    description: 'Concentrated soap for hospital kitchen utility care.',
    specification: 'High Concentration Dish Soap',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80',
    applications: ['Kitchen utility cleaning', 'Heavy-duty grease removal'],
    dilutionRatio: '1:30'
  },

  // Stores & Retail Chains
  {
    id: 'retail-1',
    name: 'General Cleaning & Washing Chemicals',
    category: 'retail',
    description: 'Commercial facility maintenance products packaged for superstores.',
    specification: 'Retail Packaged Cleaners',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    applications: ['Floor maintenance', 'Display shelf sanitation'],
    dilutionRatio: '1:50'
  },
  {
    id: 'retail-2',
    name: 'Phenyl',
    category: 'retail',
    description: 'Standard floor disinfectant and pine deodorizer formulation.',
    specification: 'Commercial Phenolic Floor Disinfectant',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    applications: ['Lobby maintenance', 'General toilet cleaning'],
    dilutionRatio: '1:30'
  },
  {
    id: 'retail-3',
    name: 'Hand Wash & Sanitizer',
    category: 'retail',
    description: 'Gentle hand wash and pocket-sized hand sanitizers.',
    specification: 'Antimicrobial Soap & Sanitizing Gel',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80',
    applications: ['Restroom dispensers', 'POS checkout sanitizing'],
    dilutionRatio: '1:1'
  },
  {
    id: 'retail-4',
    name: 'Detergent Powder',
    category: 'retail',
    description: 'All-fabric washing powder with brightness booster technology.',
    specification: 'Active Detergency Laundry Powder',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    applications: ['All-fabric cleaning', 'Staff uniform washing'],
    dilutionRatio: '1:80'
  },
  {
    id: 'retail-5',
    name: 'Bleach',
    category: 'retail',
    description: 'Commercial sodium hypochlorite bleach for stain extraction.',
    specification: 'Laundry and Surface Bleach',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    applications: ['Stain removal', 'White fabric bleaching'],
    dilutionRatio: '1:20'
  },
  {
    id: 'retail-6',
    name: 'Room Spray / Air Freshener',
    category: 'retail',
    description: 'Premium spray fragrances with active odor counteractants.',
    specification: 'Commercial Room Deodorizers',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    applications: ['Store floor refresh', 'Customer restrooms'],
    dilutionRatio: '1:1'
  },
  {
    id: 'retail-7',
    name: 'Vaseline',
    category: 'retail',
    description: 'Pure petroleum jelly for retail shelves and private labels.',
    specification: 'Pure Petroleum Jelly / Skin Protection',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    applications: ['Moisture barrier', 'Shelf display items'],
    dilutionRatio: '1:1'
  },
  {
    id: 'retail-8',
    name: 'Hydrogen Peroxide',
    category: 'retail',
    description: 'Standard hydrogen peroxide solution for first aid displays.',
    specification: 'Over-the-Counter Hydrogen Peroxide',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    applications: ['First aid displays', 'Mild sanitization'],
    dilutionRatio: '1:5'
  },
  {
    id: 'retail-9',
    name: 'Dishwashing Liquid',
    category: 'retail',
    description: 'Lemon fresh dish wash liquid formulation for store shelves.',
    specification: 'Retail Grade Dish Soap',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80',
    applications: ['Dishware cleaning', 'Grease extraction'],
    dilutionRatio: '1:10'
  },

  // General Cleaning Chemicals
  {
    id: 'general-1',
    name: 'All-purpose Cleaning Chemicals',
    category: 'general',
    description: 'Versatile surface cleansers optimized for multi-material environments.',
    specification: 'Multi-Surface Floor & Wall Cleanser',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    applications: ['General office care', 'Glass panels', 'Metallic surfaces'],
    dilutionRatio: '1:40'
  },
  {
    id: 'general-2',
    name: 'Specialized Washing Chemicals',
    category: 'general',
    description: 'Deep scouring solutions for industrial oils and soot accumulation.',
    specification: 'Heavy Duty Detergent Concentrate',
    statusOrInventory: 'In Stock',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    applications: ['Factory floors', 'Machinery hoods', 'Kitchen soot clearing'],
    dilutionRatio: '1:50'
  }
];

export const PRODUCTS_DATA: Product[] = PRODUCTS_RAW.map((p, i) => ({
  ...p,
  imageUrl: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]
}));

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Hospitals',
    iconName: 'HeartPulse',
    description: 'Clinical-grade disinfectants and hygiene systems for critical patient care environments.',
    detailedNeeds: 'Medical facilities require strictly validated, high-potency biocidal formulations that destroy pathogens on surface contact without deteriorating critical medical apparatus or producing toxic atmospheric residues.',
    recommendedProductIds: ['health-1', 'health-2', 'health-3', 'health-4'],
 
  },
  {
    id: 'textile',
    title: 'Textile & Garments',
    iconName: 'Shirt',
    description: 'Advanced auxiliaries for pretreatment, dyeing, and finishing in large-scale textile mills.',
    detailedNeeds: 'Continuous mills expect high-stability agents for critical fiber swelling, dye reduction, and fixation. Color consistency across bulk dye-lots demands reliable formulation precision.',
    recommendedProductIds: ['textile-1', 'textile-2', 'textile-3', 'textile-4', 'textile-5', 'textile-6'],
 
  },
  {
    id: 'industrial',
    title: 'Industrial Engineering',
    iconName: 'Factory',
    description: 'Heavy-duty degreasers and machine maintenance chemicals for manufacturing floors.',
    detailedNeeds: 'Precision fabrication and high-rpm machine floors battle grease build-ups and metallic dust. Effective alkaline degreasers protect expensive mechanical tooling and maintain safe floor friction coefficients.',
    recommendedProductIds: ['jan-1', 'jan-2', 'textile-6'],
 
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Hotels',
    iconName: 'Building',
    description: 'Complete laundry and housekeeping systems designed for premium guest experiences.',
    detailedNeeds: 'Luxury lounges demand stainless bathrooms, high-loft sanitized linens, and fresh atmosphere aesthetics. Rapid turnaround limits down-time, requiring high-performing, pleasant hygiene solutions.',
    recommendedProductIds: ['health-3', 'health-5', 'health-6', 'jan-3'],
 
  },
  {
    id: 'pharmaceutical',
    title: 'Pharmaceutical Industry',
    iconName: 'FlaskConical',
    description: 'Strictly compliant cleaning agents for high-purity laboratory and production zones.',
    detailedNeeds: 'GMP manufacturing depends on residue-free detergents to prevent batch cross-contamination. Absolute sterile protocols must withstand intense audits with rigorous validation logs.',
    recommendedProductIds: ['health-1', 'health-2', 'health-4', 'jan-3'],
 
  },
  {
    id: 'retail',
    title: 'Retail Chains',
    iconName: 'Store',
    description: 'Scalable facility maintenance programs for supermarkets and large retail environments.',
    detailedNeeds: 'Public superstores present extreme footcount traffic, requiring quick drying, toxicologically benign floor cleansers and high-frequency safe point-of-sale sanitation products.',
    recommendedProductIds: ['health-2', 'health-5', 'jan-1', 'jan-3'],
 
  }
];

export const TRUSTED_CLIENTS = [
  'AGA KHAN UNIVERSITY HOSPITAL',
  'INDUS MOTOR COMPANY (TOYOTA)',
  'GADOON TEXTILE MILLS',
  'NATIONAL FOODS',
  'LUCKY KNITS'
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'E. Coli Pathogen Elimination Protocol',
    client: 'Aga Khan University Hospital',
    industry: 'Clinical Healthcare',
    challenge: 'Pathogen resistance on high-touch metallic surfaces in emergency screening wards.',
    solution: 'Designed and deployed custom-diluted Abcotex Phenyle (Disinfectant) with strict 5% application intervals.',
    results: [
      'Achieved 100% eradication of E. Coli and S. aureus strains in 4 weeks of testing',
      'Zero corrosive damage recorded on medical-grade stainless steel surfaces',
      'Officially validated with PCSIR Laboratory Report #ILD/ATR-565/13'
    ],
    imagePlaceholderColor: '#e0f2fe'
 
  },
  {
    id: 'case-2',
    title: 'Reactive Dye Shade Fixation Optimization',
    client: 'Gadoon Textile Mills',
    industry: 'Textile Manufacturing',
    challenge: 'Washing color bleeding in export knitwear batches leading to high rejection rates.',
    solution: 'Integrated Fixnol polyamine fixer coupled with custom dosage micro-finishers.',
    results: [
      'Reduced color-bleeding defects by 94%',
      'Improved wet and dry rub fastness scores from 3.0 to a reliable 4.5 standard',
      'Decreased post-fixation hot washing cycles, saving 15% in daily water heating fuel'
    ],
    imagePlaceholderColor: '#dbeafe'
 
  },
  {
    id: 'case-3',
    title: 'Bespoke Machine Degreaser Implementation',
    client: 'Indus Motor Company (Toyota)',
    industry: 'Automotive Engineering',
    challenge: 'Stubborn lubricant buildup on metal molding stampers, slowing robotic pick-and-place lines.',
    solution: 'Engineered a highly-emulsified non-ionic surfactant degreaser compound.',
    results: [
      'Stamper maintenance turn-around down-sized from 45 minutes to 12 minutes',
      'Increased robotic line uptime by 8%',
      'Completely eliminated VOC residues standard to legacy toxic petroleum solvents'
    ],
    imagePlaceholderColor: '#fee2e2'
 
  }
];
