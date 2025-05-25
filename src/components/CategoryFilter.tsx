
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className="flex items-center space-x-2"
      >
        <span>🎯</span>
        <span>Все товары</span>
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center space-x-2"
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
}
