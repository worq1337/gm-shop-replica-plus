
import { useState } from "react";
import { AdminPanel } from "@/components/AdminPanel";
import { GameItem, Category, MobileGame, GameIcon } from "@/types";

interface AdminProps {
  items: GameItem[];
  categories: Category[];
  mobileGames: MobileGame[];
  gameIcons: GameIcon[];
  onAddItem: (item: Omit<GameItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<GameItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onAddMobileGame: (game: Omit<MobileGame, 'id'>) => void;
  onEditMobileGame: (id: string, game: Partial<MobileGame>) => void;
  onDeleteMobileGame: (id: string) => void;
  onAddGameIcon: (icon: Omit<GameIcon, 'id'>) => void;
  onEditGameIcon: (id: string, icon: Partial<GameIcon>) => void;
  onDeleteGameIcon: (id: string) => void;
}

export default function Admin({
  items,
  categories,
  mobileGames,
  gameIcons,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onAddMobileGame,
  onEditMobileGame,
  onDeleteMobileGame,
  onAddGameIcon,
  onEditGameIcon,
  onDeleteGameIcon
}: AdminProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Панель администратора</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminPanel
              items={items}
              categories={categories}
              mobileGames={mobileGames}
              gameIcons={gameIcons}
              onAddItem={onAddItem}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              onAddMobileGame={onAddMobileGame}
              onEditMobileGame={onEditMobileGame}
              onDeleteMobileGame={onDeleteMobileGame}
              onAddGameIcon={onAddGameIcon}
              onEditGameIcon={onEditGameIcon}
              onDeleteGameIcon={onDeleteGameIcon}
              isStandalone={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
