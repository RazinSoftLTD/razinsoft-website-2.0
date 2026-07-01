export interface Product {
  slug: string
  name: string
  tagline: string
  price: number
  extPrice: number
  version: string
  rating: number
  reviews: number
  sales: number
  badge?: 'Best Seller' | 'New' | 'Free'
  image: string
  /** Intrinsic dimensions of the source image — used to reserve space and avoid CLS. */
  imageWidth: number
  imageHeight: number
}

// Data mirrored from own-web.razinsoft.com product catalogue.
// Images are self-hosted under /public/images and optimised by @nuxt/image.
export const products: Product[] = [
  {
    slug: 'ready-ecommerce',
    name: 'Ready eCommerce',
    tagline: 'Complete Multi-Vendor eCommerce CMS',
    price: 49,
    extPrice: 249,
    version: '4.3.2',
    rating: 4.9,
    reviews: 284,
    sales: 750,
    badge: 'Best Seller',
    image: '/images/products/ready-ecommerce.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
  {
    slug: 'ready-lms',
    name: 'Ready LMS',
    tagline: 'Complete eLearning Management System',
    price: 39,
    extPrice: 199,
    version: '3.1.0',
    rating: 4.8,
    reviews: 196,
    sales: 430,
    badge: 'New',
    image: '/images/products/ready-lms.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
  {
    slug: 'ready-ride',
    name: 'Ready Ride',
    tagline: 'Ride Sharing & Taxi Booking Platform',
    price: 59,
    extPrice: 299,
    version: '2.5.1',
    rating: 4.7,
    reviews: 143,
    sales: 310,
    image: '/images/products/ready-ride.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
  {
    slug: 'ready-pos',
    name: 'Ready POS',
    tagline: 'POS with Inventory Management System',
    price: 45,
    extPrice: 229,
    version: '3.0.0',
    rating: 4.8,
    reviews: 167,
    sales: 520,
    image: '/images/products/ready-pos.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
  {
    slug: 'ready-grocery',
    name: 'Ready Grocery',
    tagline: 'Multipurpose Grocery & eCommerce Solution',
    price: 49,
    extPrice: 249,
    version: '2.8.0',
    rating: 4.7,
    reviews: 112,
    sales: 280,
    image: '/images/products/ready-grocery.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
  {
    slug: 'ready-laundry',
    name: 'Ready Laundry',
    tagline: 'Multi-Store Laundry Booking System',
    price: 29,
    extPrice: 149,
    version: '1.9.0',
    rating: 4.6,
    reviews: 87,
    sales: 190,
    image: '/images/products/ready-laundry.jpg',
    imageWidth: 900,
    imageHeight: 600,
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Shared marketing content reused across the product detail pages.
export const suitableFor = [
  'Beauty & Health Shop',
  'Toys & Kids Shop',
  'Home & Furniture Shop',
  "Men's & Women's Fashion Shop",
  'Watch & Jewelry Shop',
  'Electronics & Computers Shop',
  'Sports & Outdoors Shop',
  'Furniture Shop',
  'Clothing Store',
]

export const techStack: Array<{ name: string; tone: string }> = [
  { name: 'Laravel', tone: 'bg-red-50 text-red-600' },
  { name: 'PHP', tone: 'bg-purple-50 text-purple-600' },
  { name: 'Flutter', tone: 'bg-sky-50 text-sky-600' },
  { name: 'MySQL', tone: 'bg-orange-50 text-orange-600' },
  { name: 'REST API', tone: 'bg-emerald-50 text-emerald-600' },
  { name: 'Bootstrap', tone: 'bg-violet-50 text-violet-600' },
  { name: 'Vue.js', tone: 'bg-teal-50 text-teal-600' },
  { name: 'Redis', tone: 'bg-red-50 text-red-600' },
]

export const productInfo: Array<{ label: string; value: string }> = [
  { label: 'License', value: 'Lifetime' },
  { label: 'Updates', value: 'Free Forever' },
  { label: 'Support', value: '6 Months' },
  { label: 'Installation', value: 'Included' },
  { label: 'Customization', value: 'Available' },
]

export interface Feature {
  title: string
  subtitle: string
  desc: string
  top: string
  icon: string
  subText: string
  paths: string[]
}

export const features: Feature[] = [
  { title: 'Multi Vendor Support', subtitle: 'Advanced Commission System', desc: 'Manage unlimited vendors with advanced commission systems, vendor dashboards, and automated payouts.', top: 'border-t-rose-500', icon: 'bg-rose-50 text-rose-600', subText: 'text-rose-600', paths: ['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 15a4 4 0 0 1 4 4v1'] },
  { title: 'Payment Gateway Integration', subtitle: '20+ Payment Methods', desc: 'Support for 20+ payment gateways including PayPal, Stripe, Razorpay, and local payment methods.', top: 'border-t-blue-500', icon: 'bg-blue-50 text-blue-600', subText: 'text-blue-600', paths: ['M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z', 'M3 10h18'] },
  { title: 'Mobile Apps (iOS & Android)', subtitle: 'Native Apps Included', desc: 'Native mobile applications for iOS and Android with push notifications and offline support.', top: 'border-t-purple-500', icon: 'bg-purple-50 text-purple-600', subText: 'text-purple-600', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
  { title: 'Advanced Analytics', subtitle: 'Real-time Reporting', desc: 'Real-time sales analytics, inventory reports, profit/loss statements, and business intelligence.', top: 'border-t-emerald-500', icon: 'bg-emerald-50 text-emerald-600', subText: 'text-emerald-600', paths: ['M3 17l6-6 4 4 7-7', 'M16 8h5v5'] },
  { title: 'Enterprise Security', subtitle: 'GDPR Compliant', desc: 'Bank-level SSL encryption, role-based access control, audit logs, and GDPR compliance.', top: 'border-t-orange-500', icon: 'bg-orange-50 text-orange-600', subText: 'text-orange-600', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z'] },
  { title: 'Inventory Management', subtitle: 'Multi-warehouse Support', desc: 'Stock tracking, low stock alerts, barcode scanning, batch management, and warehouse support.', top: 'border-t-pink-500', icon: 'bg-pink-50 text-pink-600', subText: 'text-pink-600', paths: ['M12 6c4.4 0 8-1.1 8-2.5S16.4 1 12 1 4 2.1 4 3.5 7.6 6 12 6Z', 'M20 6.5v5c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-5M20 11.5v5c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-5'] },
  { title: 'User Role Management', subtitle: 'Custom Permissions', desc: 'Create custom roles with granular permissions, staff management, and activity tracking.', top: 'border-t-red-500', icon: 'bg-red-50 text-red-600', subText: 'text-red-600', paths: ['M6 11V8a6 6 0 0 1 12 0v3', 'M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z'] },
  { title: 'Multi-Language & Currency', subtitle: '50+ Languages', desc: 'Support for 50+ languages and 100+ currencies with automatic conversion and localization.', top: 'border-t-sky-500', icon: 'bg-sky-50 text-sky-600', subText: 'text-sky-600', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  { title: 'API & Integrations', subtitle: 'REST API Included', desc: 'RESTful API, webhook support, and integrations with popular third-party services.', top: 'border-t-violet-500', icon: 'bg-violet-50 text-violet-600', subText: 'text-violet-600', paths: ['M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12'] },
]

export const galleryTabs: Array<{ name: string; label: string; image: string; paths: string[] }> = [
  { name: 'All', label: 'Overview', image: '/images/blog/blog-2.jpg', paths: ['M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'] },
  { name: 'Website', label: 'Homepage', image: '/images/blog/blog-1.jpg', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  { name: 'Admin', label: 'Admin Dashboard', image: '/images/blog/blog-3.jpg', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z'] },
  { name: 'Mobile App', label: 'Mobile App', image: '/images/hero-1.jpg', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
  { name: 'Customer App', label: 'Customer App', image: '/images/hero-2.jpg', paths: ['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 15a4 4 0 0 1 4 4v1'] },
]

export const tryItLive = [
  { title: 'Admin Demo', subtitle: 'Access admin panel', badge: 'Live Demo', tone: 'from-blue-500 to-blue-600', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z'] },
  { title: 'Customer Demo', subtitle: 'View storefront', badge: 'Live Demo', tone: 'from-teal-500 to-emerald-600', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18'] },
  { title: 'Android App', subtitle: 'Download APK', badge: 'Download', tone: 'from-emerald-500 to-green-600', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
  { title: 'iOS App', subtitle: 'Download IPA', badge: 'Download', tone: 'from-purple-500 to-violet-600', paths: ['M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z', 'M11 18h2'] },
]

export const docs: Array<{ title: string; card: string; circle: string; text: string; paths: string[] }> = [
  { title: 'Installation Guide', card: 'bg-blue-50 border-blue-100', circle: 'bg-blue-100 text-blue-600', text: 'text-blue-700', paths: ['M12 3v12m0 0 4-4m-4 4-4-4', 'M5 19h14'] },
  { title: 'User Manual', card: 'bg-emerald-50 border-emerald-100', circle: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-700', paths: ['M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5Z', 'M8 7h7M8 11h7'] },
  { title: 'Video Tutorials', card: 'bg-red-50 border-red-100', circle: 'bg-red-100 text-red-600', text: 'text-red-700', paths: ['M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z', 'm16 10 4-2v8l-4-2'] },
  { title: 'API Documentation', card: 'bg-purple-50 border-purple-100', circle: 'bg-purple-100 text-purple-600', text: 'text-purple-700', paths: ['M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12'] },
  { title: 'FAQ', card: 'bg-amber-50 border-amber-100', circle: 'bg-amber-100 text-amber-600', text: 'text-amber-700', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01'] },
]

export interface Reply { user: string; when: string; text: string; staff?: boolean }
export interface Question { user: string; when: string; on: string; text: string; replies: Reply[] }

export const questions: Question[] = [
  {
    user: 'radison01', when: '5 months ago', on: 'Ready LMS — Complete Learning Management System',
    text: "HTTPS error: I can't access the demo version, my antivirus won't let me in.",
    replies: [
      { user: 'RazinSoft Support', when: '5 months ago', staff: true, text: 'Hi! Our demo runs on a valid SSL certificate. Please whitelist the demo URL in your antivirus, or try a different browser — it should resolve the warning.' },
      { user: 'radison01', when: '5 months ago', text: 'That worked after whitelisting. Thank you!' },
      { user: 'mariam_k', when: '4 months ago', text: 'Same issue here, the whitelist fix worked for me too.' },
    ],
  },
  {
    user: 'johnsmith', when: '3 months ago', on: 'Ready LMS — Complete Learning Management System',
    text: 'Does this support multiple languages? I need it for my international team.',
    replies: [
      { user: 'RazinSoft Support', when: '3 months ago', staff: true, text: 'Yes — 50+ languages and full RTL support are included out of the box, with an admin panel to manage translations.' },
    ],
  },
]

export interface PricingTier {
  name: string
  blurb: string
  price: number
  popular?: boolean
  perks: string[]
}

export const pricingTiers: PricingTier[] = [
  { name: 'Basic', blurb: 'Perfect for small businesses', price: 299, perks: ['Single Domain License', 'Basic Features', 'Email Support', '6 Months Updates', 'Source Code Included'] },
  { name: 'Standard', blurb: 'Most popular choice', price: 599, popular: true, perks: ['5 Domain License', 'All Basic Features', 'Priority Support', '1 Year Updates', 'Free Installation', 'Mobile App Included'] },
  { name: 'Premium', blurb: 'For large enterprises', price: 1199, perks: ['Unlimited Domains', 'All Features Included', '24/7 Priority Support', 'Lifetime Updates', 'Free Customization', 'White Label Rights', 'API Access'] },
]
