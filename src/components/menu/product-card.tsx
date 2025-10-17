"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductCustomizer } from "@/components/menu/product-customizer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePOSStore } from "@/lib/store";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = usePOSStore();
  const _isMobile = useIsMobile();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleAddToCart = () => {
    if (product.customizations && product.customizations.length > 0) {
      setShowCustomizer(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <Card className=" overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow pt-0 gap-0">
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover h-40"
          />
          {product.popular && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>
        <CardHeader className="pb-2 mt-5">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 h-10">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 pt-0">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="pt-0 mt-auto">
          <Button
            onClick={handleAddToCart}
            className="w-full rounded-full"
            variant="default"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add to Order
          </Button>
        </CardFooter>
      </Card>
      <ProductCustomizer
        product={product}
        open={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
    </>
  );
}
