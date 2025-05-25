import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Plus, Edit, Trash2, Upload, X, Save, Package, Bell, MessageSquare, Eye } from "lucide-react";
import { GameItem, Category, MobileGame, GameIcon, Order, ReviewSettings } from "@/types";

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
  onClose?: () => void;
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
}: Omit<AdminPanelProps, 'isStandalone' | 'onClose'>) {
  const [activeTab, setActiveTab] = useState<"categories" | "products" | "orders" | "mobile-games" | "game-icons" | "reviews" | "settings">("categories");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMobileGame, setEditingMobileGame] = useState<MobileGame | null>(null);
  const [editingGameIcon, setEditingGameIcon] = useState<GameIcon | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "1",
      customerName: "Иван Петров",
      customerEmail: "ivan@example.com",
      customerTelegram: "@ivan_petrov",
      itemId: "1",
      itemTitle: "AK-47 | Redline",
      itemPrice: "1,250",
      quantity: 1,
      totalAmount: "1,250",
      status: "pending",
      orderDate: "2024-01-15T10:30:00Z",
      customerMessage: "Срочно нужен скин для турнира",
      category: "csgo"
    },
    {
      id: "2",
      customerName: "Анна Сидорова",
      customerEmail: "anna@example.com",
      itemId: "2",
      itemTitle: "PUBG Mobile UC 1800",
      itemPrice: "1,200",
      quantity: 1,
      totalAmount: "1,200",
      status: "completed",
      orderDate: "2024-01-14T15:20:00Z",
      completedDate: "2024-01-14T16:00:00Z",
      completedPhoto: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      category: "pubg-mobile"
    }
  ]);

  const [reviewSettings, setReviewSettings] = useState<ReviewSettings>({
    telegramGroupLink: "https://t.me/gmshop_reviews",
    autoReviewCount: 5,
    reviewMessage: "Спасибо за покупку! Оставьте отзыв в нашей группе Telegram"
  });

  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    originalPrice: "",
    image: "",
    seller: "",
    rating: 5,
    reviews: 0,
    category: selectedCategory,
    description: "",
    icon: "",
    discount: ""
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    description: "",
    reviewCount: 0,
    telegramGroupLink: ""
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [completedOrderPhoto, setCompletedOrderPhoto] = useState<string>("");

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

  const handleCompleteOrder = (orderId: string) => {
    if (completedOrderPhoto) {
      console.log(`Order ${orderId} completed with photo:`, completedOrderPhoto);
      // Here you would update the order status
    }
  };

  const filteredItems = selectedCategory ? items.filter(item => item.category === selectedCategory) : items;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === "categories" ? "default" : "outline"}
          onClick={() => setActiveTab("categories")}
          size="sm"
        >
          Категории
        </Button>
        <Button
          variant={activeTab === "products" ? "default" : "outline"}
          onClick={() => setActiveTab("products")}
          size="sm"
        >
          Товары
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "outline"}
          onClick={() => setActiveTab("orders")}
          size="sm"
        >
          <Bell className="w-4 h-4 mr-1" />
          Заказы ({orders.filter(o => o.status === 'pending').length})
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
          variant={activeTab === "reviews" ? "default" : "outline"}
          onClick={() => setActiveTab("reviews")}
          size="sm"
        >
          Отзывы
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "outline"}
          onClick={() => setActiveTab("settings")}
          size="sm"
        >
          Настройки
        </Button>
      </div>

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
                <Label>Иконка (emoji)</Label>
                <Input
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  placeholder="🎮"
                />
              </div>

              <div>
                <Label>Ссылка на Telegram группу для отзывов</Label>
                <Input
                  value={newCategory.telegramGroupLink}
                  onChange={(e) => setNewCategory({...newCategory, telegramGroupLink: e.target.value})}
                  placeholder="https://t.me/your_group"
                />
              </div>

              <div>
                <Label>Количество отзывов</Label>
                <Input
                  type="number"
                  value={newCategory.reviewCount}
                  onChange={(e) => setNewCategory({...newCategory, reviewCount: parseInt(e.target.value) || 0})}
                  placeholder="0"
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
                <Button onClick={() => onAddCategory(newCategory)} className="w-full">
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
                />
              </div>

              <div>
                <Label>Иконка (emoji)</Label>
                <Input
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                />
              </div>

              <div>
                <Label>Ссылка на Telegram группу</Label>
                <Input
                  value={editingCategory.telegramGroupLink || ""}
                  onChange={(e) => setEditingCategory({...editingCategory, telegramGroupLink: e.target.value})}
                />
              </div>

              <div>
                <Label>Количество отзывов</Label>
                <Input
                  type="number"
                  value={editingCategory.reviewCount || 0}
                  onChange={(e) => setEditingCategory({...editingCategory, reviewCount: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="col-span-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                />
              </div>

              <div className="col-span-2 flex space-x-2">
                <Button onClick={() => { onEditCategory(editingCategory.id, editingCategory); setEditingCategory(null); }} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
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
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <div className="text-sm text-gray-500">
                      Товаров: {items.filter(item => item.category === category.id).length}
                    </div>
                  </div>
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

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Label>Выберите категорию:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все категории</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              Товаров: {filteredItems.length}
            </span>
          </div>

          {selectedCategory && !editingItem && (
            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <h3 className="col-span-2 font-semibold mb-4">
                Добавить товар в категорию "{categories.find(c => c.id === selectedCategory)?.name}"
              </h3>
              
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
                      <Button type="button" variant="outline" size="sm" onClick={clearImage}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-32 h-24 border rounded overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
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
                <Button onClick={() => {
                  onAddItem({...newItem, category: selectedCategory});
                  setNewItem({
                    title: "", price: "", originalPrice: "", image: "", seller: "", 
                    rating: 5, reviews: 0, category: selectedCategory, description: "", icon: "", discount: ""
                  });
                  clearImage();
                }} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить товар
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">Товары</h3>
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-12 h-8 object-cover rounded" />
                  )}
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-2 text-sm text-gray-500">{item.price} ₽</span>
                    <div className="text-xs text-gray-400">
                      {categories.find(c => c.id === item.category)?.name}
                    </div>
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

      {activeTab === "orders" && (
        <div className="space-y-6">
          <h3 className="font-semibold">Управление заказами</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Товар</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      {order.customerTelegram && (
                        <div className="text-sm text-blue-500">{order.customerTelegram}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.itemTitle}</div>
                      <div className="text-sm text-gray-500">Категория: {order.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.totalAmount} ₽</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'pending' ? 'Ожидает' :
                       order.status === 'processing' ? 'В работе' :
                       order.status === 'completed' ? 'Выполнен' : 'Отменен'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setViewingOrder(order)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button size="sm" variant="default">
                          <Package className="w-3 h-3 mr-1" />
                          Выполнить
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {viewingOrder && (
            <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Заказ #{viewingOrder.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Клиент</Label>
                      <div className="text-sm">
                        <div>{viewingOrder.customerName}</div>
                        <div>{viewingOrder.customerEmail}</div>
                        {viewingOrder.customerTelegram && <div>{viewingOrder.customerTelegram}</div>}
                      </div>
                    </div>
                    <div>
                      <Label>Товар</Label>
                      <div className="text-sm">
                        <div>{viewingOrder.itemTitle}</div>
                        <div>Цена: {viewingOrder.itemPrice} ₽</div>
                        <div>Количество: {viewingOrder.quantity}</div>
                      </div>
                    </div>
                  </div>

                  {viewingOrder.customerMessage && (
                    <div>
                      <Label>Сообщение от клиента</Label>
                      <div className="p-2 bg-gray-50 rounded text-sm">{viewingOrder.customerMessage}</div>
                    </div>
                  )}

                  {viewingOrder.status === 'pending' && (
                    <div className="space-y-4 border-t pt-4">
                      <Label>Загрузить фото выполненного заказа</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => setCompletedOrderPhoto(e.target?.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {completedOrderPhoto && (
                        <img src={completedOrderPhoto} alt="Completed order" className="w-32 h-24 object-cover rounded" />
                      )}
                      <div className="flex space-x-2">
                        <Button onClick={() => handleCompleteOrder(viewingOrder.id)} className="flex-1">
                          <Package className="w-4 h-4 mr-2" />
                          Заказ выполнен
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Отправить в Telegram
                        </Button>
                      </div>
                    </div>
                  )}

                  {viewingOrder.completedPhoto && (
                    <div>
                      <Label>Фото выполненного заказа</Label>
                      <img src={viewingOrder.completedPhoto} alt="Completed" className="w-full max-w-md rounded" />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <h3 className="col-span-2 font-semibold mb-4">Настройки отзывов</h3>
            
            <div>
              <Label>Ссылка на Telegram группу</Label>
              <Input
                value={reviewSettings.telegramGroupLink}
                onChange={(e) => setReviewSettings({...reviewSettings, telegramGroupLink: e.target.value})}
                placeholder="https://t.me/your_group"
              />
            </div>

            <div>
              <Label>Автоматическое количество отзывов</Label>
              <Input
                type="number"
                value={reviewSettings.autoReviewCount}
                onChange={(e) => setReviewSettings({...reviewSettings, autoReviewCount: parseInt(e.target.value) || 0})}
              />
            </div>

            <div className="col-span-2">
              <Label>Сообщение для отзыва</Label>
              <Textarea
                value={reviewSettings.reviewMessage}
                onChange={(e) => setReviewSettings({...reviewSettings, reviewMessage: e.target.value})}
                placeholder="Сообщение, которое увидит клиент"
              />
            </div>

            <div className="col-span-2">
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Сохранить настройки отзывов
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Отзывы по категориям</h3>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <div className="text-sm text-gray-500">
                      Отзывов: {category.reviewCount || 0}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={category.reviewCount || 0}
                    onChange={(e) => onEditCategory(category.id, { reviewCount: parseInt(e.target.value) || 0 })}
                    className="w-20"
                  />
                  {category.telegramGroupLink && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={category.telegramGroupLink} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
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
  isStandalone = false,
  onClose
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
