
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

export interface MobileGame {
  id: string;
  title: string;
  image: string;
  description: string;
  isPopular?: boolean;
}

export interface GameIcon {
  id: string;
  title: string;
  image: string;
  description: string;
  category?: string;
}
