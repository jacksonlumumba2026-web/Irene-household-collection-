import { Product, Category, Review, GalleryImage, Stat } from '@/types';

export const WHATSAPP_NUMBER = '254700000000';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const categories: Category[] = [
  { id: 'furniture', name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', productCount: 142 },
  { id: 'kitchen', name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80', productCount: 268 },
  { id: 'curtains', name: 'Curtains', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', productCount: 96 },
  { id: 'lighting', name: 'Lighting', image: 'https://images.unsplash.com/photo-1543198126-cb73e445aa8a?w=800&q=80', productCount: 118 },
  { id: 'mirrors', name: 'Mirrors', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80', productCount: 54 },
  { id: 'wall-art', name: 'Wall Art', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80', productCount: 87 },
  { id: 'storage', name: 'Storage', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80', productCount: 73 },
  { id: 'decor', name: 'Home Accessories', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', productCount: 215 },
];

export const products: Product[] = [
  {
    id: 'p1', name: 'Velvet Lounge Armchair', category: 'Furniture', price: 24500, oldPrice: 32000,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    rating: 4.8, reviewCount: 124, inStock: true, badge: '-23%',
  },
  {
    id: 'p2', name: 'Handwoven Storage Basket Set', category: 'Storage', price: 4200,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    rating: 4.6, reviewCount: 89, inStock: true, isNew: true, badge: 'New',
  },
  {
    id: 'p3', name: 'Gold Rim Ceramic Dinner Set', category: 'Kitchen', price: 8900, oldPrice: 11500,
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    rating: 4.9, reviewCount: 211, inStock: true, badge: '-23%',
  },
  {
    id: 'p4', name: 'Linen Blackout Curtain Pair', category: 'Curtains', price: 6500,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1605346434674-a440ca4dc4c4?w=800&q=80',
    rating: 4.7, reviewCount: 67, inStock: true,
  },
  {
    id: 'p5', name: 'Brass Arc Floor Lamp', category: 'Lighting', price: 13800, oldPrice: 17000,
    image: 'https://images.unsplash.com/photo-1543198126-cb73e445aa8a?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    rating: 4.8, reviewCount: 53, inStock: true, badge: '-19%',
  },
  {
    id: 'p6', name: 'Sunburst Wall Mirror', category: 'Mirrors', price: 9200,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    rating: 4.9, reviewCount: 142, inStock: true, isNew: true, badge: 'New',
  },
  {
    id: 'p7', name: 'Abstract Canvas Triptych', category: 'Wall Art', price: 11200,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1547333101-fadbb59c7c0d?w=800&q=80',
    rating: 4.5, reviewCount: 38, inStock: false,
  },
  {
    id: 'p8', name: 'Marble Top Coffee Table', category: 'Furniture', price: 27800, oldPrice: 34500,
    image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1554295405-abb8fd54f153?w=800&q=80',
    rating: 4.9, reviewCount: 96, inStock: true, badge: '-19%',
  },
];

export const flashSaleProducts: Product[] = [
  { ...products[0], stockCount: 4 },
  { ...products[2], stockCount: 7 },
  { ...products[4], stockCount: 2 },
  { ...products[7], stockCount: 5 },
];

export const bestSellers: Product[] = [products[2], products[5], products[0], products[7], products[4], products[1]];

export const newArrivals: Product[] = products.filter((p) => p.isNew).concat([products[3], products[6]]);

export const reviews: Review[] = [
  {
    id: 'r1', name: 'Wanjiru Kamau', location: 'Nairobi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5, text: 'The quality exceeded my expectations. My living room finally looks like the Pinterest boards I\'ve been saving for years. Delivery was fast and the team was so professional.', product: 'Velvet Lounge Armchair',
  },
  {
    id: 'r2', name: 'Brian Otieno', location: 'Mombasa', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5, text: 'Irene Household Collection has completely changed how I shop for home decor. Premium pieces, fair prices, and excellent customer service every single time.', product: 'Brass Arc Floor Lamp',
  },
  {
    id: 'r3', name: 'Faith Njeri', location: 'Kisumu', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5, text: 'I was skeptical about ordering furniture online but this experience was seamless. The dinner set is even more beautiful in person. Highly recommend!', product: 'Gold Rim Ceramic Dinner Set',
  },
  {
    id: 'r4', name: 'David Mwangi', location: 'Nakuru', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 4, text: 'Beautiful mirror, arrived well packaged with zero damage. Customer support responded within minutes on WhatsApp. Will definitely shop again.', product: 'Sunburst Wall Mirror',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 'g1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', title: 'Warm Minimalist Living Room', height: 'tall' },
  { id: 'g2', image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80', title: 'Modern Kitchen Styling', height: 'short' },
  { id: 'g3', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', title: 'Elegant Bedroom Retreat', height: 'medium' },
  { id: 'g4', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', title: 'Cozy Reading Nook', height: 'short' },
  { id: 'g5', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80', title: 'Sunlit Dining Space', height: 'tall' },
  { id: 'g6', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', title: 'Curated Entryway', height: 'medium' },
];

export const stats: Stat[] = [
  { id: 's1', value: 15, suffix: '+', label: 'Years Experience' },
  { id: 's2', value: 10000, suffix: '+', label: 'Customers' },
  { id: 's3', value: 5000, suffix: '+', label: 'Products' },
  { id: 's4', value: 99, suffix: '%', label: 'Satisfied Customers' },
];

export const brands: string[] = ['Maridadi', 'Nyumbani Living', 'Savannah Home', 'Urban Karibu', 'Coastline Decor', 'Highland Interiors'];

export const instagramPosts: string[] = [
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
];
