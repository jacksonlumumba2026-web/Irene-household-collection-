export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  product?: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  title: string;
  height: 'short' | 'medium' | 'tall';
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
