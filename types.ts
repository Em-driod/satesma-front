export interface Product {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy' | 'Grains' | 'Other';
  isTopProduct?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  notes?: string;
}
