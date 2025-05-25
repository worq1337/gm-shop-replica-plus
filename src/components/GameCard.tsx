
import { Star, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  isOnline?: boolean;
  discount?: string;
}

export function GameCard({
  title,
  price,
  originalPrice,
  image,
  seller,
  rating,
  reviews,
  isOnline = false,
  discount
}: GameCardProps) {
  return (
    <Card className="game-card overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
            -{discount}
          </div>
        )}
        <div className="absolute bottom-1 left-1 flex items-center space-x-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
          <Shield className="w-2.5 h-2.5" />
          <span className="text-xs">Проверено</span>
        </div>
      </div>
      
      <CardContent className="p-2 sm:p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-2 line-clamp-2 leading-tight flex-1">
          {title}
        </h3>
        
        <div className="flex flex-col space-y-1 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="truncate">{seller}</span>
            {isOnline && <Clock className="w-2.5 h-2.5 ml-1" />}
          </div>
        </div>

        <div className="flex flex-col space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">{price} ₽</span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through">{originalPrice} ₽</span>
              )}
            </div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs w-full">
            Купить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
