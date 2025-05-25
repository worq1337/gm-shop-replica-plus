
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2 } from "lucide-react";
import { GameItem, Category } from "@/types";

interface AdminPanelProps {
  items: GameItem[];
  categories: Category[];
  onAddItem: (item: Omit<GameItem, 'id'>) => void;
  onEditItem: (id: string, item: Partial<GameItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

export function AdminPanel({
  items,
  categories,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"items" | "categories">("items");
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    originalPrice: "",
    image: "",
    seller: "",
    rating: 5,
    reviews: 0,
    category: "",
    description: "",
    icon: "",
    discount: ""
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    description: ""
  });

  const handleAddItem = () => {
    onAddItem({
      ...newItem,
      isOnline: true
    });
    setNewItem({
      title: "",
      price: "",
      originalPrice: "",
      image: "",
      seller: "",
      rating: 5,
      reviews: 0,
      category: "",
      description: "",
      icon: "",
      discount: ""
    });
  };

  const handleAddCategory = () => {
    onAddCategory(newCategory);
    setNewCategory({
      name: "",
      icon: "",
      description: ""
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white border-white/20 hover:bg-white/20">
          <Settings className="w-4 h-4 mr-2" />
          Админ панель
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Панель администратора</DialogTitle>
        </DialogHeader>

        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "items" ? "default" : "outline"}
            onClick={() => setActiveTab("items")}
          >
            Товары
          </Button>
          <Button
            variant={activeTab === "categories" ? "default" : "outline"}
            onClick={() => setActiveTab("categories")}
          >
            Категории
          </Button>
        </div>

        {activeTab === "items" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <h3 className="col-span-2 font-semibold mb-4">Добавить товар</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="Название товара"
                />
              </div>

              <div>
                <Label>Цена</Label>
                <Input
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  placeholder="1000"
                />
              </div>

              <div>
                <Label>Старая цена (опционально)</Label>
                <Input
                  value={newItem.originalPrice}
                  onChange={(e) => setNewItem({...newItem, originalPrice: e.target.value})}
                  placeholder="1200"
                />
              </div>

              <div>
                <Label>Категория</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Изображение URL</Label>
                <Input
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label>Продавец</Label>
                <Input
                  value={newItem.seller}
                  onChange={(e) => setNewItem({...newItem, seller: e.target.value})}
                  placeholder="Имя продавца"
                />
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Описание товара"
                />
              </div>

              <div className="col-span-2">
                <Button onClick={handleAddItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить товар
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Управление товарами</h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-2 text-sm text-gray-500">{item.price} ₽</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onDeleteItem(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <h3 className="col-span-2 font-semibold mb-4">Добавить категорию</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Название категории"
                />
              </div>

              <div>
                <Label>Иконка (emoji или название lucide)</Label>
                <Input
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  placeholder="🎮 или gamepad"
                />
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Описание категории"
                />
              </div>

              <div className="col-span-2">
                <Button onClick={handleAddCategory} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить категорию
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Управление категориями</h3>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <span className="ml-2">{category.icon}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingCategory(category)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onDeleteCategory(category.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
