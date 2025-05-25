import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Grid, List, SortAsc } from "lucide-react";
import { useState } from "react";
import { GameItem, Category } from "@/types";

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

export default function Index() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [gameItems, setGameItems] = useState<GameItem[]>(initialGameItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const filteredItems = activeCategory === "all" 
    ? gameItems 
    : gameItems.filter(item => item.category === activeCategory);

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
    <div className="min-h-screen bg-background">
      <Header 
        items={gameItems}
        categories={categories}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Category Filter */}
        <div className="mb-4 sm:mb-6">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        <main>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h2 className="text-xl sm:text-2xl font-bold">Товары</h2>
              <span className="text-gray-500 text-sm sm:text-base">({filteredItems.length} товаров)</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10">
                <SortAsc className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Сортировка</span>
                <span className="sm:hidden">Сорт.</span>
              </Button>
            </div>
          </div>

          {/* Items Grid */}
          <div className={`grid gap-3 sm:gap-4 md:gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" 
              : "grid-cols-1"
          }`}>
            {filteredItems.map((item) => (
              <div key={item.id} className="animate-fade-in">
                <GameCard {...item} />
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg px-4">В этой категории пока нет товаров</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer Section */}
      <footer className="gradient-bg text-white py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Лучшие игровые товары по выгодным ценам
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 px-4">
            Безопасные сделки, мгновенная доставка, гарантия качества
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 md:space-x-8 text-xs sm:text-sm mb-8 sm:mb-12 space-y-3 sm:space-y-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span>1000+ довольных покупателей</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
              <span>24/7 поддержка</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
              <span>Мгновенная доставка</span>
            </div>
          </div>

          {/* Contact and Copyright Information */}
          <div className="border-t border-white/20 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Техническая поддержка</h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Email: <a href="mailto:help@gmshop.pw" className="text-blue-300 hover:text-blue-200 break-all">help@gmshop.pw</a>
                </p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Telegram: <a href="https://t.me/kulacodmyt" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200">@kulacodmyt</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">О нас</h3>
                <p className="text-gray-300 text-xs sm:text-sm px-2 md:px-0">
                  GM Shop - надежный магазин игровых товаров с гарантией качества и быстрой доставкой
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Правовая информация</h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  © {new Date().getFullYear()} GM Shop. Все права защищены.
                </p>
                <p className="text-gray-300 text-xs mt-2">
                  Защита персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
