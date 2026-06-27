import { Order, Customer, Message, Coupon, InventoryItem, RevenuePoint, CategoryBreakdown, TopProduct } from '@/types/admin';
import { products, categories } from '@/lib/data';

export const orders: Order[] = [
  { id: 'ORD-1042', customerName: 'Wanjiru Kamau', customerEmail: 'wanjiru.k@gmail.com', items: [{ productName: 'Velvet Lounge Armchair', quantity: 1, price: 24500 }], total: 24500, status: 'delivered', paymentMethod: 'M-Pesa', date: '2026-06-20', address: 'Kilimani, Nairobi' },
  { id: 'ORD-1043', customerName: 'Brian Otieno', customerEmail: 'brian.otieno@yahoo.com', items: [{ productName: 'Brass Arc Floor Lamp', quantity: 2, price: 13800 }], total: 27600, status: 'shipped', paymentMethod: 'M-Pesa', date: '2026-06-21', address: 'Nyali, Mombasa' },
  { id: 'ORD-1044', customerName: 'Faith Njeri', customerEmail: 'faith.njeri@gmail.com', items: [{ productName: 'Gold Rim Ceramic Dinner Set', quantity: 1, price: 8900 }], total: 8900, status: 'processing', paymentMethod: 'Cash on Delivery', date: '2026-06-22', address: 'Milimani, Kisumu' },
  { id: 'ORD-1045', customerName: 'David Mwangi', customerEmail: 'd.mwangi@outlook.com', items: [{ productName: 'Sunburst Wall Mirror', quantity: 1, price: 9200 }], total: 9200, status: 'pending', paymentMethod: 'M-Pesa', date: '2026-06-23', address: 'Section 58, Nakuru' },
  { id: 'ORD-1046', customerName: 'Grace Wambui', customerEmail: 'gracew@gmail.com', items: [{ productName: 'Marble Top Coffee Table', quantity: 1, price: 27800 }, { productName: 'Woven Planter Basket', quantity: 2, price: 4200 }], total: 36200, status: 'delivered', paymentMethod: 'Card', date: '2026-06-18', address: 'Lavington, Nairobi' },
  { id: 'ORD-1047', customerName: 'Samuel Kiptoo', customerEmail: 'samkiptoo@gmail.com', items: [{ productName: 'Linen Blackout Curtain Pair', quantity: 3, price: 6500 }], total: 19500, status: 'cancelled', paymentMethod: 'M-Pesa', date: '2026-06-17', address: 'Eldoret Town, Eldoret' },
  { id: 'ORD-1048', customerName: 'Mercy Achieng', customerEmail: 'mercy.achieng@gmail.com', items: [{ productName: 'Handwoven Storage Basket Set', quantity: 1, price: 4200 }], total: 4200, status: 'shipped', paymentMethod: 'M-Pesa', date: '2026-06-24', address: 'Bondo Road, Kisumu' },
  { id: 'ORD-1049', customerName: 'Peter Maina', customerEmail: 'pmaina@gmail.com', items: [{ productName: 'Velvet Lounge Armchair', quantity: 1, price: 24500 }], total: 24500, status: 'processing', paymentMethod: 'Card', date: '2026-06-25', address: 'Kileleshwa, Nairobi' },
];

export const customers: Customer[] = [
  { id: 'CUS-001', name: 'Wanjiru Kamau', email: 'wanjiru.k@gmail.com', phone: '+254 712 345 678', location: 'Nairobi', totalOrders: 6, totalSpent: 98400, joinedDate: '2024-02-14', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { id: 'CUS-002', name: 'Brian Otieno', email: 'brian.otieno@yahoo.com', phone: '+254 722 987 654', location: 'Mombasa', totalOrders: 4, totalSpent: 61200, joinedDate: '2024-05-02', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: 'CUS-003', name: 'Faith Njeri', email: 'faith.njeri@gmail.com', phone: '+254 733 222 111', location: 'Kisumu', totalOrders: 3, totalSpent: 28700, joinedDate: '2024-08-19', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { id: 'CUS-004', name: 'David Mwangi', email: 'd.mwangi@outlook.com', phone: '+254 700 555 333', location: 'Nakuru', totalOrders: 2, totalSpent: 17300, joinedDate: '2025-01-10', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { id: 'CUS-005', name: 'Grace Wambui', email: 'gracew@gmail.com', phone: '+254 711 888 222', location: 'Nairobi', totalOrders: 9, totalSpent: 154300, joinedDate: '2023-11-29', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80' },
  { id: 'CUS-006', name: 'Samuel Kiptoo', email: 'samkiptoo@gmail.com', phone: '+254 720 444 999', location: 'Eldoret', totalOrders: 1, totalSpent: 19500, joinedDate: '2025-03-22', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
];

export const messages: Message[] = [
  { id: 'MSG-201', name: 'Lucy Chebet', email: 'lucy.chebet@gmail.com', subject: 'Bulk order inquiry', message: 'Hi, I run a small boutique hotel in Naivasha and would like to discuss a bulk order of bedroom and bathroom accessories. Could someone reach out with wholesale pricing?', date: '2026-06-25', read: false },
  { id: 'MSG-202', name: 'James Odhiambo', email: 'j.odhiambo@gmail.com', subject: 'Delivery to Kisii', message: 'Do you deliver to Kisii county? I want to order the marble coffee table but did not see my town in the delivery checkout options.', date: '2026-06-24', read: false },
  { id: 'MSG-203', name: 'Aisha Hassan', email: 'aisha.hassan@gmail.com', subject: 'Damaged item received', message: 'My ceramic vase arrived with a small chip on the base. Could you advise on the return process? Order ORD-1031.', date: '2026-06-23', read: true },
  { id: 'MSG-204', name: 'Tom Mutiso', email: 'tmutiso@gmail.com', subject: 'Partnership / stockist request', message: 'I own a home decor shop in Thika and would love to discuss becoming a stockist for your candle and ceramics line.', date: '2026-06-21', read: true },
  { id: 'MSG-205', name: 'Esther Nyambura', email: 'esther.n@gmail.com', subject: 'Restock question', message: 'When will the Sunburst Wall Mirror be back in stock? I missed it during the flash sale.', date: '2026-06-20', read: false },
];

export const coupons: Coupon[] = [
  { id: 'CPN-01', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minSpend: 3000, expiryDate: '2026-12-31', usageLimit: 1000, usedCount: 412, active: true },
  { id: 'CPN-02', code: 'FLASH500', discountType: 'fixed', discountValue: 500, minSpend: 5000, expiryDate: '2026-07-15', usageLimit: 300, usedCount: 287, active: true },
  { id: 'CPN-03', code: 'VIP20', discountType: 'percentage', discountValue: 20, minSpend: 15000, expiryDate: '2026-09-30', usageLimit: 150, usedCount: 64, active: true },
  { id: 'CPN-04', code: 'EASTER25', discountType: 'percentage', discountValue: 25, minSpend: 8000, expiryDate: '2026-04-20', usageLimit: 500, usedCount: 500, active: false },
  { id: 'CPN-05', code: 'NEWHOME1000', discountType: 'fixed', discountValue: 1000, minSpend: 10000, expiryDate: '2026-08-31', usageLimit: 200, usedCount: 53, active: true },
];

export const inventory: InventoryItem[] = products.map((p, i) => ({
  productId: p.id,
  productName: p.name,
  image: p.image,
  sku: `IRH-${(1000 + i * 7).toString()}`,
  category: p.category,
  stockCount: p.stockCount ?? [42, 6, 18, 0, 24, 3, 31, 9][i % 8],
  lowStockThreshold: 10,
}));

export const revenueData: RevenuePoint[] = [
  { label: 'Jan', revenue: 612000, orders: 142 },
  { label: 'Feb', revenue: 745000, orders: 168 },
  { label: 'Mar', revenue: 698000, orders: 159 },
  { label: 'Apr', revenue: 812000, orders: 184 },
  { label: 'May', revenue: 934000, orders: 207 },
  { label: 'Jun', revenue: 1086000, orders: 241 },
];

export const categoryBreakdown: CategoryBreakdown[] = categories.map((c) => ({
  name: c.name,
  value: c.productCount,
}));

export const topProducts: TopProduct[] = [
  { id: products[2].id, name: products[2].name, image: products[2].image, category: products[2].category, unitsSold: 312, revenue: 2776800 },
  { id: products[0].id, name: products[0].name, image: products[0].image, category: products[0].category, unitsSold: 248, revenue: 6076000 },
  { id: products[5].id, name: products[5].name, image: products[5].image, category: products[5].category, unitsSold: 201, revenue: 1849200 },
  { id: products[4].id, name: products[4].name, image: products[4].image, category: products[4].category, unitsSold: 176, revenue: 2428800 },
  { id: products[7].id, name: products[7].name, image: products[7].image, category: products[7].category, unitsSold: 154, revenue: 4281200 },
];

export const dashboardStats = {
  totalRevenue: revenueData.reduce((sum, r) => sum + r.revenue, 0),
  totalOrders: orders.length,
  totalCustomers: customers.length,
  totalProducts: products.length,
  revenueChangePct: 16.4,
  ordersChangePct: 9.2,
  customersChangePct: 5.7,
  productsChangePct: 2.1,
};
