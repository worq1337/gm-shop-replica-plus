
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface GameIcon {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

const gameIcons: GameIcon[] = [
  {
    id: "roblox",
    name: "Roblox", 
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop"
  },
  {
    id: "fortnite",
    name: "Fortnite",
    icon: "🔫", 
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop"
  },
  {
    id: "starcraft",
    name: "StarCraft",
    icon: "⭐",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop"
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    icon: "🗡️",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=100&h=100&fit=crop"
  },
  {
    id: "minecraft",
    name: "Minecraft",
    icon: "⛏️",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
  },
  {
    id: "cs",
    name: "Counter-Strike",
    icon: "🎯",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop"
  },
  {
    id: "arena",
    name: "Arena Breakout",
    icon: "🏟️",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop"
  },
  {
    id: "gta",
    name: "GTA 5 Online",
    icon: "🚗",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop"
  },
  {
    id: "hearthstone",
    name: "Hearthstone",
    icon: "🃏",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop"
  },
  {
    id: "exile",
    name: "Path of Exile",
    icon: "⚔️",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=100&h=100&fit=crop"
  },
  {
    id: "valorant",
    name: "Valorant",
    icon: "🏹",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
  }
];

export function GameIcons() {
  const [showAll, setShowAll] = useState(false);
  const visibleIcons = showAll ? gameIcons : gameIcons.slice(0, 10);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500 text-lg">🎮</span>
          <h2 className="text-lg sm:text-xl font-bold">Игры</h2>
          <span className="text-gray-500 text-sm">{gameIcons.length}</span>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600"
        >
          <span>{showAll ? "Скрыть" : "Показать все"}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3">
        {visibleIcons.map((game) => (
          <div
            key={game.id}
            className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              {game.image ? (
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg sm:text-xl">{game.icon}</span>
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
