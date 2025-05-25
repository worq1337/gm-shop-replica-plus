
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
    <Card className="game-card overflow-hidden group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{discount}
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
          <Shield className="w-3 h-3" />
          <span>Проверено</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span>{seller}</span>
            {isOnline && <Clock className="w-3 h-3 ml-1" />}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">{price} ₽</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">{originalPrice} ₽</span>
            )}
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Купить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
