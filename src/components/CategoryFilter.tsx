
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => onCategoryChange("all")}
          size="sm"
          className="flex items-center space-x-1.5 text-xs px-3 h-8"
        >
          <span>🎯</span>
          <span className="hidden xs:inline">Все товары</span>
          <span className="xs:hidden">Все</span>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            size="sm"
            className="flex items-center space-x-1.5 text-xs px-3 h-8"
          >
            <span>{category.icon}</span>
            <span className="hidden sm:inline">{category.name}</span>
            <span className="sm:hidden">{category.name.split(' ')[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
