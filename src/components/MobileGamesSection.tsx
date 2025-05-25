
import { ChevronRight } from "lucide-react";

interface MobileGame {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

const mobileGames: MobileGame[] = [
  {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop"
  },
  {
    id: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop"
  },
  {
    id: "cod-mobile",
    name: "Call of Duty Mobile",
    icon: "🔫",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop"
  },
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    icon: "⚔️",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=100&h=100&fit=crop"
  },
  {
    id: "clash-royale",
    name: "Clash Royale",
    icon: "👑",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
  },
  {
    id: "brawl-stars",
    name: "Brawl Stars", 
    icon: "⭐",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop"
  }
];

export function MobileGamesSection() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 text-lg">📱</span>
          <h2 className="text-lg sm:text-xl font-bold">Мобильные игры</h2>
          <span className="text-gray-500 text-sm">{mobileGames.length}</span>
        </div>
        <button className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600">
          <span>Все</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
        {mobileGames.map((game) => (
          <div
            key={game.id}
            className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              {game.image ? (
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg sm:text-xl text-white">{game.icon}</span>
              )}
            </div>
            <span className="text-xs text-center leading-tight max-w-full truncate">
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
