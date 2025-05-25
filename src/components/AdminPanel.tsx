import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2, Upload, X, Save } from "lucide-react";
import { GameItem, Category, MobileGame, GameIcon } from "@/types";

interface AdminPanelProps {
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
  isStandalone?: boolean;
}

function AdminPanelContent({
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
}: Omit<AdminPanelProps, 'isStandalone'>) {
  const [activeTab, setActiveTab] = useState<"items" | "categories" | "mobile-games" | "game-icons" | "settings">("items");
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMobileGame, setEditingMobileGame] = useState<MobileGame | null>(null);
  const [editingGameIcon, setEditingGameIcon] = useState<GameIcon | null>(null);

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

  const [newMobileGame, setNewMobileGame] = useState({
    title: "",
    image: "",
    description: "",
    isPopular: false
  });

  const [newGameIcon, setNewGameIcon] = useState({
    title: "",
    image: "",
    description: "",
    category: ""
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "FunPay",
    siteDescription: "Маркетплейс игровых товаров",
    contactEmail: "support@funpay.ru",
    telegramBot: "@funpay_bot",
    currency: "₽",
    commissionRate: "5",
    minPrice: "10",
    maxPrice: "100000"
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        if (editingItem) {
          setEditingItem({...editingItem, image: result});
        } else {
          setNewItem({...newItem, image: result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    if (editingItem) {
      setEditingItem({...editingItem, image: ""});
    } else {
      setNewItem({...newItem, image: ""});
    }
  };

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
    clearImage();
  };

  const handleSaveItem = () => {
    if (editingItem) {
      onEditItem(editingItem.id, editingItem);
      setEditingItem(null);
      clearImage();
    }
  };

  const handleAddCategory = () => {
    onAddCategory(newCategory);
    setNewCategory({
      name: "",
      icon: "",
      description: ""
    });
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      onEditCategory(editingCategory.id, editingCategory);
      setEditingCategory(null);
    }
  };

  const handleAddMobileGame = () => {
    onAddMobileGame(newMobileGame);
    setNewMobileGame({
      title: "",
      image: "",
      description: "",
      isPopular: false
    });
    clearImage();
  };

  const handleSaveMobileGame = () => {
    if (editingMobileGame) {
      onEditMobileGame(editingMobileGame.id, editingMobileGame);
      setEditingMobileGame(null);
      clearImage();
    }
  };

  const handleAddGameIcon = () => {
    onAddGameIcon(newGameIcon);
    setNewGameIcon({
      title: "",
      image: "",
      description: "",
      category: ""
    });
    clearImage();
  };

  const handleSaveGameIcon = () => {
    if (editingGameIcon) {
      onEditGameIcon(editingGameIcon.id, editingGameIcon);
      setEditingGameIcon(null);
      clearImage();
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    console.log('Настройки сохранены:', siteSettings);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap space-x-2 mb-6">
        <Button
          variant={activeTab === "items" ? "default" : "outline"}
          onClick={() => setActiveTab("items")}
          size="sm"
        >
          Товары
        </Button>
        <Button
          variant={activeTab === "categories" ? "default" : "outline"}
          onClick={() => setActiveTab("categories")}
          size="sm"
        >
          Категории
        </Button>
        <Button
          variant={activeTab === "mobile-games" ? "default" : "outline"}
          onClick={() => setActiveTab("mobile-games")}
          size="sm"
        >
          Мобильные игры
        </Button>
        <Button
          variant={activeTab === "game-icons" ? "default" : "outline"}
          onClick={() => setActiveTab("game-icons")}
          size="sm"
        >
          Игровые иконки
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "outline"}
          onClick={() => setActiveTab("settings")}
          size="sm"
        >
          Настройки
        </Button>
      </div>

      {activeTab === "items" && (
        <div className="space-y-6">
          {!editingItem ? (
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

              <div className="col-span-2">
                <Label>Изображение товара</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label 
                      htmlFor="image-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Выбрать изображение</span>
                    </Label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-32 h-24 border rounded overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    Или введите URL изображения:
                  </div>
                  <Input
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label>Продавец</Label>
                <Input
                  value={newItem.seller}
                  onChange={(e) => setNewItem({...newItem, seller: e.target.value})}
                  placeholder="Имя продавца"
                />
              </div>

              <div>
                <Label>Иконка (emoji)</Label>
                <Input
                  value={newItem.icon}
                  onChange={(e) => setNewItem({...newItem, icon: e.target.value})}
                  placeholder="🎮"
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
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-blue-50">
              <h3 className="col-span-2 font-semibold mb-4">Редактировать товар</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  placeholder="Название товара"
                />
              </div>

              <div>
                <Label>Цена</Label>
                <Input
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                  placeholder="1000"
                />
              </div>

              <div>
                <Label>Старая цена (опционально)</Label>
                <Input
                  value={editingItem.originalPrice || ""}
                  onChange={(e) => setEditingItem({...editingItem, originalPrice: e.target.value})}
                  placeholder="1200"
                />
              </div>

              <div>
                <Label>Категория</Label>
                <Select value={editingItem.category} onValueChange={(value) => setEditingItem({...editingItem, category: value})}>
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

              <div className="col-span-2">
                <Label>Изображение товара</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <Label 
                      htmlFor="edit-image-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Изменить изображение</span>
                    </Label>
                    {(imagePreview || editingItem.image) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {(imagePreview || editingItem.image) && (
                    <div className="relative w-32 h-24 border rounded overflow-hidden">
                      <img 
                        src={imagePreview || editingItem.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Input
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label>Продавец</Label>
                <Input
                  value={editingItem.seller}
                  onChange={(e) => setEditingItem({...editingItem, seller: e.target.value})}
                  placeholder="Имя продавца"
                />
              </div>

              <div>
                <Label>Иконка (emoji)</Label>
                <Input
                  value={editingItem.icon || ""}
                  onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                  placeholder="🎮"
                />
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  placeholder="Описание товара"
                />
              </div>

              <div className="col-span-2 flex space-x-2">
                <Button onClick={handleSaveItem} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setEditingItem(null)} className="flex-1">
                  Отменить
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">Управление товарами</h3>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-12 h-8 object-cover rounded"
                    />
                  )}
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-2 text-sm text-gray-500">{item.price} ₽</span>
                  </div>
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
          {!editingCategory ? (
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
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-green-50">
              <h3 className="col-span-2 font-semibold mb-4">Редактировать категорию</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  placeholder="Название категории"
                />
              </div>

              <div>
                <Label>Иконка (emoji или название lucide)</Label>
                <Input
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                  placeholder="🎮 или gamepad"
                />
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                  placeholder="Описание категории"
                />
              </div>

              <div className="col-span-2 flex space-x-2">
                <Button onClick={handleSaveCategory} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setEditingCategory(null)} className="flex-1">
                  Отменить
                </Button>
              </div>
            </div>
          )}

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

      {activeTab === "mobile-games" && (
        <div className="space-y-6">
          {!editingMobileGame ? (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <h3 className="col-span-2 font-semibold mb-4">Добавить мобильную игру</h3>
              
              <div>
                <Label>Название игры</Label>
                <Input
                  value={newMobileGame.title}
                  onChange={(e) => setNewMobileGame({...newMobileGame, title: e.target.value})}
                  placeholder="Название мобильной игры"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={newMobileGame.isPopular}
                  onChange={(e) => setNewMobileGame({...newMobileGame, isPopular: e.target.checked})}
                />
                <Label htmlFor="popular">Популярная игра</Label>
              </div>

              <div className="col-span-2">
                <Label>Изображение игры</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="mobile-game-upload"
                    />
                    <Label 
                      htmlFor="mobile-game-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Выбрать изображение</span>
                    </Label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-32 h-24 border rounded overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Input
                    value={newMobileGame.image}
                    onChange={(e) => setNewMobileGame({...newMobileGame, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={newMobileGame.description}
                  onChange={(e) => setNewMobileGame({...newMobileGame, description: e.target.value})}
                  placeholder="Описание мобильной игры"
                />
              </div>

              <div className="col-span-2">
                <Button onClick={handleAddMobileGame} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить мобильную игру
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-purple-50">
              <h3 className="col-span-2 font-semibold mb-4">Редактировать мобильную игру</h3>
              
              <div>
                <Label>Название игры</Label>
                <Input
                  value={editingMobileGame.title}
                  onChange={(e) => setEditingMobileGame({...editingMobileGame, title: e.target.value})}
                  placeholder="Название мобильной игры"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-popular"
                  checked={editingMobileGame.isPopular || false}
                  onChange={(e) => setEditingMobileGame({...editingMobileGame, isPopular: e.target.checked})}
                />
                <Label htmlFor="edit-popular">Популярная игра</Label>
              </div>

              <div className="col-span-2">
                <Label>Изображение игры</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="edit-mobile-game-upload"
                    />
                    <Label 
                      htmlFor="edit-mobile-game-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Изменить изображение</span>
                    </Label>
                    {(imagePreview || editingMobileGame.image) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {(imagePreview || editingMobileGame.image) && (
                    <div className="relative w-32 h-24 border rounded overflow-hidden">
                      <img 
                        src={imagePreview || editingMobileGame.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Input
                    value={editingMobileGame.image}
                    onChange={(e) => setEditingMobileGame({...editingMobileGame, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingMobileGame.description}
                  onChange={(e) => setEditingMobileGame({...editingMobileGame, description: e.target.value})}
                  placeholder="Описание мобильной игры"
                />
              </div>

              <div className="col-span-2 flex space-x-2">
                <Button onClick={handleSaveMobileGame} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setEditingMobileGame(null)} className="flex-1">
                  Отменить
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">Управление мобильными играми</h3>
            {mobileGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  {game.image && (
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-12 h-8 object-cover rounded"
                    />
                  )}
                  <div>
                    <span className="font-medium">{game.title}</span>
                    {game.isPopular && <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Популярная</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingMobileGame(game)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDeleteMobileGame(game.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "game-icons" && (
        <div className="space-y-6">
          {!editingGameIcon ? (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <h3 className="col-span-2 font-semibold mb-4">Добавить игровую иконку</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={newGameIcon.title}
                  onChange={(e) => setNewGameIcon({...newGameIcon, title: e.target.value})}
                  placeholder="Название игры"
                />
              </div>

              <div>
                <Label>Категория</Label>
                <Input
                  value={newGameIcon.category}
                  onChange={(e) => setNewGameIcon({...newGameIcon, category: e.target.value})}
                  placeholder="Категория (опционально)"
                />
              </div>

              <div className="col-span-2">
                <Label>Изображение иконки</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="game-icon-upload"
                    />
                    <Label 
                      htmlFor="game-icon-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Выбрать изображение</span>
                    </Label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-16 h-16 border rounded overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Input
                    value={newGameIcon.image}
                    onChange={(e) => setNewGameIcon({...newGameIcon, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={newGameIcon.description}
                  onChange={(e) => setNewGameIcon({...newGameIcon, description: e.target.value})}
                  placeholder="Описание игры"
                />
              </div>

              <div className="col-span-2">
                <Button onClick={handleAddGameIcon} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить игровую иконку
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-orange-50">
              <h3 className="col-span-2 font-semibold mb-4">Редактировать игровую иконку</h3>
              
              <div>
                <Label>Название</Label>
                <Input
                  value={editingGameIcon.title}
                  onChange={(e) => setEditingGameIcon({...editingGameIcon, title: e.target.value})}
                  placeholder="Название игры"
                />
              </div>

              <div>
                <Label>Категория</Label>
                <Input
                  value={editingGameIcon.category || ""}
                  onChange={(e) => setEditingGameIcon({...editingGameIcon, category: e.target.value})}
                  placeholder="Категория (опционально)"
                />
              </div>

              <div className="col-span-2">
                <Label>Изображение иконки</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="edit-game-icon-upload"
                    />
                    <Label 
                      htmlFor="edit-game-icon-upload"
                      className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Изменить изображение</span>
                    </Label>
                    {(imagePreview || editingGameIcon.image) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {(imagePreview || editingGameIcon.image) && (
                    <div className="relative w-16 h-16 border rounded overflow-hidden">
                      <img 
                        src={imagePreview || editingGameIcon.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Input
                    value={editingGameIcon.image}
                    onChange={(e) => setEditingGameIcon({...editingGameIcon, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingGameIcon.description}
                  onChange={(e) => setEditingGameIcon({...editingGameIcon, description: e.target.value})}
                  placeholder="Описание игры"
                />
              </div>

              <div className="col-span-2 flex space-x-2">
                <Button onClick={handleSaveGameIcon} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setEditingGameIcon(null)} className="flex-1">
                  Отменить
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">Управление игровыми иконками</h3>
            {gameIcons.map((icon) => (
              <div key={icon.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  {icon.image && (
                    <img 
                      src={icon.image} 
                      alt={icon.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div>
                    <span className="font-medium">{icon.title}</span>
                    {icon.category && <span className="ml-2 text-sm text-gray-500">({icon.category})</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingGameIcon(icon)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDeleteGameIcon(icon.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <h3 className="col-span-2 font-semibold mb-4">Настройки сайта</h3>
            
            <div>
              <Label>Название сайта</Label>
              <Input
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                placeholder="FunPay"
              />
            </div>

            <div>
              <Label>Email поддержки</Label>
              <Input
                value={siteSettings.contactEmail}
                onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                placeholder="support@funpay.ru"
              />
            </div>

            <div className="col-span-2">
              <Label>Описание сайта</Label>
              <Textarea
                value={siteSettings.siteDescription}
                onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                placeholder="Описание вашего сайта"
              />
            </div>

            <div>
              <Label>Телеграм бот</Label>
              <Input
                value={siteSettings.telegramBot}
                onChange={(e) => setSiteSettings({...siteSettings, telegramBot: e.target.value})}
                placeholder="@funpay_bot"
              />
            </div>

            <div>
              <Label>Валюта</Label>
              <Select value={siteSettings.currency} onValueChange={(value) => setSiteSettings({...siteSettings, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="₽">₽ (Рубль)</SelectItem>
                  <SelectItem value="$">$ (Доллар)</SelectItem>
                  <SelectItem value="€">€ (Евро)</SelectItem>
                  <SelectItem value="₴">₴ (Гривна)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Комиссия (%)</Label>
              <Input
                value={siteSettings.commissionRate}
                onChange={(e) => setSiteSettings({...siteSettings, commissionRate: e.target.value})}
                placeholder="5"
              />
            </div>

            <div>
              <Label>Минимальная цена</Label>
              <Input
                value={siteSettings.minPrice}
                onChange={(e) => setSiteSettings({...siteSettings, minPrice: e.target.value})}
                placeholder="10"
              />
            </div>

            <div>
              <Label>Максимальная цена</Label>
              <Input
                value={siteSettings.maxPrice}
                onChange={(e) => setSiteSettings({...siteSettings, maxPrice: e.target.value})}
                placeholder="100000"
              />
            </div>

            <div className="col-span-2">
              <Button onClick={handleSaveSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Сохранить настройки
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminPanel({
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
  onDeleteGameIcon,
  isStandalone = false
}: AdminPanelProps) {
  if (isStandalone) {
    return (
      <AdminPanelContent
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
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white border-white/20 hover:bg-white/20">
          <Settings className="w-4 h-4 mr-2" />
          Админ панель
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Панель администратора</DialogTitle>
        </DialogHeader>
        <AdminPanelContent
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
        />
      </DialogContent>
    </Dialog>
  );
}
