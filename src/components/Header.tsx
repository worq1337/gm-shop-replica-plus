
import { useState } from "react";
import { Search, User, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { AuthModal } from "./AuthModal";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold">GM Shop</h1>
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-yellow-300">★★★★★</span>
                <span className="hidden md:inline">5.0 (1000+ отзывов)</span>
                <span className="md:hidden">5.0</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-2 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск..."
                  className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/30 text-sm h-8 sm:h-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 hidden xs:flex">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Войти
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="pb-3 sm:pb-4">
            <div className="flex space-x-3 sm:space-x-6 overflow-x-auto">
              <Button variant="ghost" className="text-white hover:bg-white/20 text-xs sm:text-sm whitespace-nowrap">
                Главная
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 text-xs sm:text-sm whitespace-nowrap">
                Популярные
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 text-xs sm:text-sm whitespace-nowrap">
                Новинки
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 text-xs sm:text-sm whitespace-nowrap">
                Акции
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
