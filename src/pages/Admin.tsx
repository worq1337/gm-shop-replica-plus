
import { useState } from "react";
import { AdminPanel } from "@/components/AdminPanel";
import { GameItem, Category } from "@/types";

interface AdminProps {
  items: GameItem[];
  categories: Category[];
  onAddItem: (item: Omit<GameItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<GameItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

export default function Admin({
  items,
  categories,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
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
              onAddItem={onAddItem}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              isStandalone={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
