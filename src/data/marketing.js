import {
  BadgeCheck,
  Bike,
  Boxes,
  Factory,
  Forklift,
  HeartPulse,
  Lock,
  PackageCheck,
  Route,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Shirt,
  Sofa,
  Sparkles,
  Store,
  Truck,
  UserPlus,
  Warehouse,
  Workflow,
} from 'lucide-react';

export const PLATFORM_APPS = [
  {
    slug: 'retailer-app',
    name: 'Retailer App',
    audience: 'For shopkeepers & traders',
    icon: Store,
    tagline: 'Order in seconds, not phone calls.',
    description:
      'A mobile-first catalog and ordering experience for the retailers and traders who order from distributors and wholesalers every day.',
    features: [
      'Catalog & repeat ordering',
      'WhatsApp & voice ordering',
      'Ledger, statements & loyalty wallet',
      'BNPL and insurance at checkout',
    ],
  },
  {
    slug: 'field-officer-app',
    name: 'Field Officer App',
    audience: 'For sales & territory teams',
    icon: Route,
    tagline: 'The daily route, order booking and attendance, in one app.',
    description:
      "A field-first companion for the sales force that visits retailers, books orders and keeps territory targets on track.",
    features: [
      'Map-based journey plan (PJP)',
      'Visit check-in/out & voice-to-order',
      'Geo-tagged attendance',
      'Live target dashboard',
    ],
  },
  {
    slug: 'rider-app',
    name: 'Rider App',
    audience: 'For delivery & dispatch',
    icon: Bike,
    tagline: 'Optimized stops, proof of delivery, cash reconciled.',
    description:
      'Turn-by-turn delivery execution for owned fleet riders, with proof of delivery and cash collection built in.',
    features: [
      'Optimized multi-stop routing',
      'Navigation hand-off to Google Maps',
      'Photo/signature proof of delivery',
      'Cash collection & failed-delivery reasons',
    ],
  },
  {
    slug: 'distributor-console',
    name: 'Distributor Console',
    audience: 'For distributors & wholesalers',
    icon: Boxes,
    tagline: 'Run the whole distribution business from one screen.',
    description:
      'Order queue, inventory, pricing, credit and delivery planning — the operating console for distributors and wholesalers buying in bulk and selling down the chain.',
    features: [
      'Order queue & inventory',
      'Price list & scheme manager',
      'Credit limits & territory management',
      'Ledgers, aging & sales dashboard',
    ],
  },
  {
    slug: 'manufacturer-portal',
    name: 'Manufacturer Portal',
    audience: 'For brands & manufacturers',
    icon: Factory,
    tagline: 'See sell-through, not just sell-in.',
    description:
      'Visibility into how products actually move through the distribution network, with AI-written sell-through narratives.',
    features: [
      'Catalog & base pricing',
      'Scheme configuration',
      'AI sell-through dashboard',
      'Distributor onboarding requests',
    ],
  },
  {
    slug: 'admin-console',
    name: 'Platform Admin Console',
    audience: 'For platform operators',
    icon: ShieldCheck,
    tagline: 'Every company, territory and dispute, under one roof.',
    description:
      'Cross-company configuration, commission rules, dispute resolution and reporting for the team running the platform.',
    features: [
      'Company, territory & user setup',
      'Commission configuration',
      'Dispute resolution queue',
      '"Ask your data" reporting panel',
    ],
  },
];

export const LOGISTICS_SERVICES = [
  {
    slug: 'warehousing',
    name: 'Warehousing',
    audience: 'Storage that scales with the season',
    icon: Warehouse,
    tagline: 'Space you use, billed the way you’d expect.',
    description:
      'Store inventory across our warehouse network — including cold-chain sub-warehousing — with stock visibility down to the bin and usage-based billing.',
    features: [
      'Shared & dedicated warehouse space',
      'Cold-chain sub-warehousing',
      'Stock visibility down to the bin',
      'Usage-based subscription billing',
    ],
  },
  {
    slug: 'dispatch',
    name: 'Dispatch',
    audience: 'The right vehicle, chosen automatically',
    icon: Forklift,
    tagline: 'Owned fleet or courier — decided per shipment.',
    description:
      'Every shipment is routed to owned fleet or a courier partner automatically, decided by coverage, capacity and cost — not guesswork.',
    features: [
      'Owned-fleet vs. courier decided per shipment',
      'Delivery trip planning by territory',
      'Pick lists & cross-docking',
      'Capacity-aware routing',
    ],
  },
  {
    slug: 'delivery',
    name: 'Delivery',
    audience: 'Last-mile, with proof',
    icon: Truck,
    tagline: 'Every drop reconciled the same night.',
    description:
      'Optimized multi-stop routes, photo or signature proof of delivery, and cash collection reconciled against the invoice the same night.',
    features: [
      'Optimized multi-stop routing',
      'Photo/signature proof of delivery',
      'Cash collection & reconciliation',
      'Failed-delivery reasons captured',
    ],
  },
  {
    slug: 'courier-network',
    name: 'Courier Network',
    audience: 'Rates shopped, bookings automatic',
    icon: Send,
    tagline: 'The cheapest eligible courier, booked for you.',
    description:
      'When a shipment is better served by a courier partner, rates are shopped across our courier network in real time and the cheapest eligible option is booked automatically.',
    features: [
      'Real-time rate shopping',
      'Automatic booking & AWB tracking',
      'COD terms per courier partner',
      'Live status sync back to the order',
    ],
  },
  {
    slug: 'ecommerce-fulfillment',
    name: 'E-commerce Fulfillment',
    audience: 'Fulfillment-as-a-service for online sellers',
    icon: ShoppingBag,
    tagline: 'Plug in your storefront. We handle the warehouse floor.',
    description:
      'Pick, pack and ship every order that comes through your storefront — on the same warehousing and delivery network that runs the rest of Tijarat.',
    features: [
      'Pick, pack & ship per order',
      'Storefront & marketplace integrations',
      'Returns handling',
      'Same-day dispatch cutoffs',
    ],
  },
];

export const PLATFORM_CAPABILITIES = [
  {
    slug: 'trust-intelligence',
    name: 'Trust Intelligence',
    icon: BadgeCheck,
    tagline: 'One score, four decisions.',
    description:
      'The Tijarat Score reads order frequency, repayment timeliness, dispute rate and delivery acceptance to produce a single trust signal — reused for a credit facility for qualified distributors and retailers, BNPL eligibility, insurance pricing and dispatch priority.',
  },
  {
    slug: 'automation',
    name: 'Automation Layer',
    icon: Workflow,
    tagline: 'Everything that can be async, is.',
    description:
      'Notifications, courier booking, reconciliation, SLA escalation and reporting run as automated workflows — so an outage in a partner API can only delay something, never block a sale.',
  },
  {
    slug: 'ai-layer',
    name: 'AI Layer',
    icon: Sparkles,
    tagline: 'An assistant, never a black box.',
    description:
      'Voice ordering in Urdu/Punjabi, natural-language WhatsApp orders, ticket triage, sell-through narratives and a plain-language "ask your data" panel — always advisory, never blocking a transaction.',
  },
];

export const INDUSTRIES = [
  {
    slug: 'food-beverage',
    name: 'Food, Beverage & FMCG',
    icon: ShoppingBasket,
    items: [
      'FMCG & Grocery',
      'Beverages',
      'Confectionery & Snacks',
      'Dairy & Frozen Foods',
      'HORECA & Foodservice',
    ],
  },
  {
    slug: 'fashion-textile',
    name: 'Fashion & Textile',
    icon: Shirt,
    items: ['Textile & Apparel', 'Footwear', 'Leather Goods', 'Fashion Accessories'],
  },
  {
    slug: 'health-beauty',
    name: 'Health & Beauty',
    icon: HeartPulse,
    items: ['Pharmaceuticals & Healthcare', 'Cosmetics & Personal Care', 'Medical Equipment & Supplies'],
  },
  {
    slug: 'industrial-manufacturing',
    name: 'Industrial & Manufacturing',
    icon: Factory,
    items: ['Automobile & Auto Parts', 'Engineering & Hardware', 'Plastics', 'Packaging Materials', 'Chemicals'],
  },
  {
    slug: 'home-lifestyle',
    name: 'Home & Lifestyle',
    icon: Sofa,
    items: ['Furniture & Home Decor', 'Electronics & Appliances', 'Sports & Fitness Equipment', 'Stationery & Office Supplies'],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Register',
    icon: UserPlus,
    description:
      'A retailer, distributor or manufacturer registers — self-serve or assisted by a field officer. One call creates the customer, supplier and portal login together.',
  },
  {
    title: 'Price & territory lock',
    icon: Lock,
    description:
      'Territory-tiered pricing, trade schemes and MRP ceilings apply automatically. Orders outside a distributor’s territory are blocked before they’re placed.',
  },
  {
    title: 'Order',
    icon: ShoppingCart,
    description:
      'From the app, WhatsApp, or spoken in Urdu or Punjabi — every channel resolves to the same structured order for confirmation.',
  },
  {
    title: 'Dispatch',
    icon: Truck,
    description:
      'Owned fleet or third-party courier, chosen automatically by coverage and capacity, with rates shopped across courier partners in real time.',
  },
  {
    title: 'Deliver & get paid',
    icon: PackageCheck,
    description:
      'Proof of delivery, cash collection or digital payment, reconciled automatically against the invoice the same night.',
  },
  {
    title: 'Trust score updates',
    icon: BadgeCheck,
    description:
      'Every transaction feeds the Tijarat Score, refining credit limits, financing eligibility and dispatch priority for next time.',
  },
];
