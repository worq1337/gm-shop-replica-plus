
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { GameItem, Category } from "@/types";

const queryClient = new QueryClient();

const initialCategories: Category[] = [
  {
    id: "mobile-games",
    name: "Мобильные игры",
    icon: "📱",
    description: "Игры и товары для мобильных устройств"
  },
  {
    id: "csgo",
    name: "CS:GO",
    icon: "🔫",
    description: "Скины и товары для Counter-Strike"
  },
  {
    id: "dota2",
    name: "Dota 2",
    icon: "⚔️",
    description: "Предметы для Dota 2"
  },
  {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "🎮",
    description: "Скины и UC для PUBG Mobile"
  },
  {
    id: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    description: "Алмазы и скины для Free Fire"
  },
  {
    id: "steam",
    name: "Steam",
    icon: "🎯",
    description: "Steam кошельки и игры"
  },
  {
    id: "accounts",
    name: "Аккаунты",
    icon: "👤",
    description: "Игровые аккаунты"
  }
];

const initialGameItems: GameItem[] = [
  {
    id: "1",
    title: "AK-47 | Redline (Field-Tested)",
    price: "1,250",
    originalPrice: "1,500",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    seller: "ProGamer123",
    rating: 4.9,
    reviews: 234,
    isOnline: true,
    discount: "17%",
    category: "csgo",
    description: "Классический скин AK-47 в хорошем состоянии",
    icon: "🔫"
  },
  {
    id: "2",
    title: "PUBG Mobile UC 1800",
    price: "1,200",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    seller: "MobileGamer",
    rating: 5.0,
    reviews: 156,
    isOnline: true,
    category: "pubg-mobile",
    description: "1800 UC для PUBG Mobile с быстрой доставкой",
    icon: "🎮"
  },
  {
    id: "3",
    title: "Free Fire 💎 2000 алмазов",
    price: "850",
    originalPrice: "950",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    seller: "FireDealer",
    rating: 4.8,
    reviews: 89,
    isOnline: true,
    discount: "11%",
    category: "free-fire",
    description: "2000 алмазов для Free Fire",
    icon: "🔥"
  },
  {
    id: "4",
    title: "Steam Wallet 1000₽",
    price: "950",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
    seller: "SteamDealer",
    rating: 5.0,
    reviews: 456,
    isOnline: true,
    category: "steam",
    description: "Пополнение Steam кошелька на 1000 рублей",
    icon: "🎯"
  },
  {
    id: "5",
    title: "PUBG Mobile Prime Account",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    seller: "AccountPro",
    rating: 4.6,
    reviews: 78,
    isOnline: true,
    category: "accounts",
    description: "Аккаунт PUBG Mobile с премиум подпиской",
    icon: "👤"
  },
  {
    id: "6",
    title: "Call of Duty Mobile CP 1000",
    price: "800",
    originalPrice: "900",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
    seller: "CODMaster",
    rating: 4.7,
    reviews: 123,
    isOnline: false,
    discount: "11%",
    category: "mobile-games",
    description: "1000 CP для Call of Duty Mobile",
    icon: "📱"
  }
];

const App = () => {
  const [gameItems, setGameItems] = useState<GameItem[]>(initialGameItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleAddItem = (newItem: Omit<GameItem, 'id'>) => {
    const item: GameItem = {
      ...newItem,
      id: Date.now().toString()
    };
    setGameItems([...gameItems, item]);
  };

  const handleEditItem = (id: string, updatedItem: Partial<GameItem>) => {
    setGameItems(gameItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setGameItems(gameItems.filter(item => item.id !== id));
  };

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString()
    };
    setCategories([...categories, category]);
  };

  const handleEditCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    ));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  items={gameItems}
                  categories={categories}
                  onAddItem={handleAddItem}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                  onAddCategory={handleAddCategory}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              } 
            />
            <Route 
              path="/secret-admin-panel" 
              element={
                <Admin 
                  items={gameItems}
                  categories={categories}
                  onAddItem={handleAddItem}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                  onAddCategory={handleAddCategory}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
