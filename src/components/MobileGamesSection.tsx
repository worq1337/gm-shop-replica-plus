
import { ChevronRight } from "lucide-react";
import { MobileGame } from "@/types";

interface MobileGamesSectionProps {
  mobileGames: MobileGame[];
}

export function MobileGamesSection({ mobileGames }: MobileGamesSectionProps) {
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
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg sm:text-xl text-white">📱</span>
              )}
            </div>
            <span className="text-xs text-center leading-tight max-w-full truncate">
              {game.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
