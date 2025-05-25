
import { Search, User, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
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

        {/* Navigation */}
        <nav className="pb-4">
          <div className="flex space-x-6">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Все товары
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              CSGO
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Dota 2
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Rust
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Steam
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              TF2
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
