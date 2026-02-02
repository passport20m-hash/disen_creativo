
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isManufacturedByUs: boolean;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  purchasedProductIds: string[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved';
  createdAt: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  generatedImageUrl?: string;
  quote?: {
    items: { name: string; price: number }[];
    total: number;
  };
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  companyDescription: string;
  phone: string;
  address: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  stats: SiteStat[];
  shippingPolicy: string;
  warrantyPolicy: string;
  faqs: { q: string; a: string }[];
}
