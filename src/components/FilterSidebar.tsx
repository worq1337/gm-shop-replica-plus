
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

export function FilterSidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Фильтры</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Цена</h3>
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={100}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0 ₽</span>
              <span>10,000 ₽</span>
            </div>
          </div>

          {/* Games */}
          <div>
            <h3 className="font-semibold mb-3">Игры</h3>
            <div className="space-y-2">
              {["CS:GO", "Dota 2", "Rust", "Team Fortress 2", "Steam"].map((game) => (
                <div key={game} className="flex items-center space-x-2">
                  <Checkbox id={game} />
                  <label htmlFor={game} className="text-sm">{game}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Status */}
          <div>
            <h3 className="font-semibold mb-3">Статус продавца</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="online" />
                <label htmlFor="online" className="text-sm">В сети</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="verified" />
                <label htmlFor="verified" className="text-sm">Проверенный</label>
              </div>
            </div>
          </div>

          {/* Item Type */}
          <div>
            <h3 className="font-semibold mb-3">Тип товара</h3>
            <div className="space-y-2">
              {["Скины", "Ключи", "Кейсы", "Аккаунты", "Валюта"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <label htmlFor={type} className="text-sm">{type}</label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Применить фильтры</Button>
        </CardContent>
      </Card>
    </div>
  );
}
