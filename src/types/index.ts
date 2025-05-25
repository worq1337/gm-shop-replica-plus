
export interface GameItem {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  isOnline?: boolean;
  discount?: string;
  category: string;
  description: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
