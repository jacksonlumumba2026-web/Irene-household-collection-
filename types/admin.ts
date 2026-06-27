export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'M-Pesa' | 'Card' | 'Cash on Delivery';
  date: string;
  address: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  avatar: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export type DiscountType = 'percentage' | 'fixed';

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  image: string;
  sku: string;
  category: string;
  stockCount: number;
  lowStockThreshold: number;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
}

export interface TopProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  unitsSold: number;
  revenue: number;
}
