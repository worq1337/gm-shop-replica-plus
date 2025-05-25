
import { Search, User, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { AdminPanel } from "./AdminPanel";
import { GameItem, Category } from "@/types";

interface HeaderProps {
  items: GameItem[];
  categories: Category[];
  onAddItem: (item: Omit<GameItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<GameItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

export function Header({
  items,
  categories,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: HeaderProps) {
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">GM Shop</h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-yellow-300">★★★★★</span>
              <span>5.0 (1000+ отзывов)</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск игр, товаров..."
                className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/30"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <AdminPanel
              items={items}
              categories={categories}
              onAddItem={onAddItem}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
            />
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <User className="w-5 h-5" />
            </Button>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Войти
            </Button>
          </div>
        </div>

        {/* Navigation - убрал категории отсюда, они теперь будут в основном контенте */}
        <nav className="pb-4">
          <div className="flex space-x-6">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Главная
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Популярные
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Новинки
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Акции
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
