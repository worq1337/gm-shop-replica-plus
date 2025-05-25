
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: "1",
    title: "Новый сезон",
    subtitle: "Ключи Sea of Thieves",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    badge: "Новое",
    badgeColor: "bg-green-500"
  },
  {
    id: "2", 
    title: "SF6 x Overwatch 2",
    subtitle: "Монеты Overwatch 2",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    badge: "Новое",
    badgeColor: "bg-green-500"
  },
  {
    id: "3",
    title: "Новая игра", 
    subtitle: "Ключи Doom: The Dark Ages",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop",
    badge: "Новое",
    badgeColor: "bg-green-500"
  },
  {
    id: "4",
    title: "Сезонный Пропуск",
    subtitle: "Акции Rush Royale", 
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
    badge: "Новое",
    badgeColor: "bg-orange-500"
  },
  {
    id: "5",
    title: "Обновление баннеров",
    subtitle: "Аккаунты Zenless Zone Zero",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    badge: "Новое",
    badgeColor: "bg-orange-500"
  }
];

export function PromoBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;
  const maxIndex = Math.max(0, promoBanners.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-3 sm:gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {promoBanners.map((banner) => (
            <div
              key={banner.id}
              className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 relative group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-gradient-to-br from-purple-600 to-blue-600">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                {banner.badge && (
                  <div className={`absolute top-2 left-2 ${banner.badgeColor} text-white px-2 py-1 rounded text-xs font-bold`}>
                    {banner.badge}
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-orange-400 text-sm">🔥</span>
                    <h3 className="text-sm sm:text-base font-bold">{banner.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm opacity-90">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-lg h-8 w-8"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      {currentIndex < maxIndex && (
        <Button
          variant="outline" 
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-lg h-8 w-8"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
