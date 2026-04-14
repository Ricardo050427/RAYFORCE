// WooCommerce REST API Client
// Server-side only — uses WOO_KEY and WOO_SECRET

const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL || '';
const WOO_KEY = process.env.WOO_KEY || '';
const WOO_SECRET = process.env.WOO_SECRET || '';

const BASE_URL = `${WOO_URL}/wp-json/wc/v3`;

import fallbackImages from '@/data/images.json';
const imagesData: Record<string, string[]> = fallbackImages;


interface WooRequestOptions {
  params?: Record<string, string | number>;
  cache?: RequestCache;
}

async function wooFetch<T>(endpoint: string, options: WooRequestOptions = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  // Basic Auth
  const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    cache: options.cache || 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`WooCommerce API Error [${response.status}]:`, errorText);
    throw new Error(`WooCommerce API Error: ${response.status}`);
  }

  const data = await response.json();
  return data as T;
}

// --- Types ---

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  permalink: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  image: { src: string; alt: string } | null;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  line_items: {
    id: number;
    name: string;
    quantity: number;
    total: string;
    image: { src: string };
  }[];
}

// Helper to sort products, placing those with images first
function processAndSortProducts(products: WooProduct[]): WooProduct[] {
  // 1. Inject missing images from local backup
  const processed = products.map(p => {
    if ((!p.images || p.images.length === 0) && p.sku) {
      const urls = imagesData[p.sku];
      if (urls && urls.length > 0) {
        return {
          ...p,
          images: urls.map((url, i) => ({ id: -i - 1, src: url, alt: p.name }))
        };
      }
    }
    return p;
  });

  // 2. Sort by images presence
  return processed.sort((a, b) => {
    const aHasImage = a.images && a.images.length > 0 ? 1 : 0;
    const bHasImage = b.images && b.images.length > 0 ? 1 : 0;
    return bHasImage - aHasImage;
  });
}

// --- API Functions ---

// Global Memory Cache for MVP frontend to allow global image sorting
let globalProductsCache: WooProduct[] | null = null;
let isFetchingAll = false;

async function getGlobalProducts(): Promise<WooProduct[]> {
  if (globalProductsCache) return globalProductsCache;
  if (isFetchingAll) {
    while (isFetchingAll) await new Promise(r => setTimeout(r, 200));
    return globalProductsCache || [];
  }
  
  isFetchingAll = true;
  console.log('⏳ Fetching ALL products from WooCommerce to enable global sorting (this may take 15s the first time)...');
  const all: WooProduct[] = [];
  try {
    for (let i = 1; i <= 30; i++) {
       const page = await wooFetch<WooProduct[]>('/products', { params: { per_page: 100, page: i } });
       if (!page || page.length === 0) break;
       all.push(...page);
       console.log(`   ... fetched page ${i} (${all.length} total)`);
       if (page.length < 100) break;
    }
    globalProductsCache = processAndSortProducts(all);
    console.log(`✅ Cache built successfully! ${globalProductsCache.length} products ready for instant pagination.`);
  } catch (e) {
    console.error('Error fetching global catalog', e);
  }
  isFetchingAll = false;
  return globalProductsCache || [];
}

export async function getProducts(params: Record<string, string | number> = {}): Promise<WooProduct[]> {
  const all = await getGlobalProducts();
  const page = Number(params.page || 1);
  const per_page = Number(params.per_page || 20); // Let's respect what the UI asks for
  
  let sorted = [...all]; // It's already globally sorted by image!
  if (params.orderby === 'price') {
     sorted.sort((a,b) => parseFloat(a.price||'0') - parseFloat(b.price||'0'));
  } else if (params.orderby === 'title') {
     sorted.sort((a,b) => a.name.localeCompare(b.name));
  }
  
  const start = (page - 1) * per_page;
  return sorted.slice(start, start + per_page);
}

export async function getProduct(slugOrId: string | number): Promise<WooProduct> {
  const all = await getGlobalProducts();
  const found = all.find(p => p.id === slugOrId || p.slug === slugOrId);
  if (found) return found;
  throw new Error(`Product not found: ${slugOrId}`);
}

export async function searchProducts(query: string, page: number = 1): Promise<WooProduct[]> {
  const all = await getGlobalProducts();
  const q = query.toLowerCase();
  const matched = all.filter(p => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)));
  
  const per_page = 20;
  const start = (page - 1) * per_page;
  return matched.slice(start, start + per_page);
}

export async function getCategories(): Promise<WooCategory[]> {
  return wooFetch<WooCategory[]>('/products/categories', {
    params: { per_page: 100, hide_empty: 1 },
  });
}

export async function getProductsByCategory(categoryId: number, page: number = 1): Promise<WooProduct[]> {
  const all = await getGlobalProducts();
  const matched = all.filter(p => p.categories.some(c => c.id === categoryId));
  
  const per_page = 20;
  const start = (page - 1) * per_page;
  return matched.slice(start, start + per_page);
}

export async function createOrder(orderData: Record<string, unknown>): Promise<WooOrder> {
  const url = `${BASE_URL}/orders`;
  const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`);
  }

  return response.json();
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(num);
}
