"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryFilter } from "@/components/menu/category-filter";
import { ProductCard } from "@/components/menu/product-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories, products } from "@/lib/data";
import { usePOSStore } from "@/lib/store";

export function MenuSection() {
  const { activeCategory, setActiveCategory } = usePOSStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter(
        (product) => product.categoryId === activeCategory,
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <ScrollArea className="flex-1 h-[calc(100dvh-180px)]">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-36">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-[50vh] text-center">
              <p className="text-muted-foreground">No products found</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="text-primary text-sm underline mt-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
