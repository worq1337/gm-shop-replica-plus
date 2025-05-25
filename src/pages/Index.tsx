
import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Grid, List, SortAsc } from "lucide-react";
import { useState } from "react";

const gameItems = [
  {
    title: "AK-47 | Redline (Field-Tested)",
    price: "1,250",
    originalPrice: "1,500",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    seller: "ProGamer123",
    rating: 4.9,
    reviews: 234,
    isOnline: true,
    discount: "17%"
  },
  {
    title: "AWP | Dragon Lore (Minimal Wear)",
    price: "85,000",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    seller: "SkinTrader",
    rating: 5.0,
    reviews: 156,
    isOnline: false
  },
  {
    title: "Knife | Karambit Fade (Factory New)",
    price: "45,000",
    originalPrice: "48,000",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    seller: "KnifeExpert",
    rating: 4.8,
    reviews: 89,
    isOnline: true,
    discount: "6%"
  },
  {
    title: "M4A4 | Howl (Field-Tested)",
    price: "12,500",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
    seller: "RareCollector",
    rating: 4.9,
    reviews: 67,
    isOnline: true
  },
  {
    title: "Glock-18 | Fade (Factory New)",
    price: "850",
    originalPrice: "950",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
    seller: "QuickSeller",
    rating: 4.7,
    reviews: 123,
    isOnline: false,
    discount: "11%"
  },
  {
    title: "Steam Wallet Code 1000₽",
    price: "950",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    seller: "SteamDealer",
    rating: 5.0,
    reviews: 456,
    isOnline: true
  },
  {
    title: "CS:GO Prime Account Global Elite",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    seller: "AccountPro",
    rating: 4.6,
    reviews: 78,
    isOnline: true
  },
  {
    title: "Rust Skins Bundle (10 items)",
    price: "1,800",
    originalPrice: "2,200",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
    seller: "RustMaster",
    rating: 4.8,
    reviews: 92,
    isOnline: false,
    discount: "18%"
  }
];

export default function Index() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Лучшие игровые товары по выгодным ценам
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Безопасные сделки, мгновенная доставка, гарантия качества
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>1000+ довольных покупателей</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>24/7 поддержка</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span>Мгновенная доставка</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold">Товары</h2>
                <span className="text-gray-500">({gameItems.length} товаров)</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4" />
                  <span>Сортировка</span>
                </Button>
              </div>
            </div>

            {/* Items Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {gameItems.map((item, index) => (
                <div key={index} className="animate-fade-in">
                  <GameCard {...item} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Загрузить еще
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
