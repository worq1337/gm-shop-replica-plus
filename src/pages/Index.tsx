import { Header } from "@/components/Header";
import { GameCard } from "@/components/GameCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SupportChat } from "@/components/SupportChat";
import { PromoBanners } from "@/components/PromoBanners";
import { GameIcons } from "@/components/GameIcons";
import { MobileGamesSection } from "@/components/MobileGamesSection";
import { Button } from "@/components/ui/button";
import { Grid, List, SortAsc } from "lucide-react";
import { useState } from "react";
import { GameItem, Category, MobileGame, GameIcon } from "@/types";

interface IndexProps {
  items: GameItem[];
  categories: Category[];
  mobileGames: MobileGame[];
  gameIcons: GameIcon[];
  onAddItem: (item: Omit<GameItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<GameItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onAddMobileGame: (game: Omit<MobileGame, 'id'>) => void;
  onEditMobileGame: (id: string, game: Partial<MobileGame>) => void;
  onDeleteMobileGame: (id: string) => void;
  onAddGameIcon: (icon: Omit<GameIcon, 'id'>) => void;
  onEditGameIcon: (id: string, icon: Partial<GameIcon>) => void;
  onDeleteGameIcon: (id: string) => void;
}

export default function Index({
  items,
  categories,
  mobileGames,
  gameIcons,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onAddMobileGame,
  onEditMobileGame,
  onDeleteMobileGame,
  onAddGameIcon,
  onEditGameIcon,
  onDeleteGameIcon
}: IndexProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = activeCategory === "all" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        items={items}
        categories={categories}
        mobileGames={mobileGames}
        gameIcons={gameIcons}
        onAddItem={onAddItem}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onAddCategory={onAddCategory}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
        onAddMobileGame={onAddMobileGame}
        onEditMobileGame={onEditMobileGame}
        onDeleteMobileGame={onDeleteMobileGame}
        onAddGameIcon={onAddGameIcon}
        onEditGameIcon={onEditGameIcon}
        onDeleteGameIcon={onDeleteGameIcon}
      />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 max-w-7xl">
        {/* Promo Banners */}
        <PromoBanners />

        {/* Game Icons */}
        <GameIcons gameIcons={gameIcons} />

        {/* Mobile Games Section */}
        <MobileGamesSection mobileGames={mobileGames} />

        {/* Category Filter */}
        <div className="mb-3 sm:mb-6">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        <main>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-6 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg lg:text-2xl font-bold">Товары</h2>
              <span className="text-gray-500 text-xs sm:text-sm">({filteredItems.length})</span>
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center space-x-1 text-xs px-2 sm:px-3 h-7 sm:h-8">
                <SortAsc className="w-3 h-3" />
                <span className="hidden xs:inline">Сортировка</span>
                <span className="xs:hidden">Сорт</span>
              </Button>
            </div>
          </div>

          {/* Items Grid */}
          <div className={`grid gap-2 sm:gap-3 lg:gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
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
              <p className="text-gray-500 text-sm sm:text-base px-4">В этой категории пока нет товаров</p>
            </div>
          )}
        </main>
      </div>

      {/* Support Chat */}
      <SupportChat />

      {/* Footer Section */}
      <footer className="gradient-bg text-white py-6 sm:py-8 md:py-12 mt-8 sm:mt-12">
        <div className="container mx-auto px-3 sm:px-4 text-center max-w-6xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
            Лучшие игровые товары по выгодным ценам
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mb-4 sm:mb-6 px-2">
            Безопасные сделки, мгновенная доставка, гарантия качества
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 lg:space-x-6 text-xs sm:text-sm mb-6 sm:mb-8 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
              <span>1000+ довольных покупателей</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 поддержка</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
              <span>Мгновенная доставка</span>
            </div>
          </div>

          {/* Contact and Copyright Information */}
          <div className="border-t border-white/20 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-center sm:text-left">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Техническая поддержка</h3>
                <p className="text-gray-300 text-xs">
                  Email: <a href="mailto:help@gmshop.pw" className="text-blue-300 hover:text-blue-200 break-all">help@gmshop.pw</a>
                </p>
                <p className="text-gray-300 text-xs">
                  Telegram: <a href="https://t.me/kulacodmyt" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200">@kulacodmyt</a>
                </p>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">О нас</h3>
                <p className="text-gray-300 text-xs">
                  GM Shop - надежный магазин игровых товаров с гарантией качества
                </p>
              </div>

              <div className="space-y-1 sm:space-y-2 sm:col-span-2 lg:col-span-1">
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Правовая информация</h3>
                <p className="text-gray-300 text-xs">
                  © {new Date().getFullYear()} GM Shop. Все права защищены.
                </p>
                <p className="text-gray-300 text-xs">
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
