export interface Product {
  id: string;
  name: string;
  tamilName?: string;
  subtitle: string;
  weight: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  image: string;
  badge?: string;
  deliveryInfo: string;
  category: 'Red Rice' | 'Traditional Rice' | 'White / Samba' | 'Immunity & Specialty';
  healthBenefits: string[];
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
}

export interface OrderData {
  orderCode: string;
  customer: CustomerDetails;
  items: {
    productId: string;
    productName: string;
    weight: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  itemsCount: number;
  createdAt: string;
}
