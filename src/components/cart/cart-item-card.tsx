"use client";

import { Edit, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductCustomizer } from "@/components/menu/product-customizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";
import { usePOSStore } from "@/lib/store";
import type { CartItem } from "@/lib/types";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateCartItem, removeFromCart } = usePOSStore();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const product = products.find((p) => p.id === item.productId);

  if (!product) return null;

  // Format options for display
  const optionsText = item.options
    .flatMap((opt) => {
      const customization = product.customizations?.find(
        (c) => c.id === opt.customizationId,
      );
      if (!customization) return [];

      return opt.optionIds
        .map((optId) => {
          const option = customization.options.find((o) => o.id === optId);
          return option
            ? `${option.name}${option.price > 0 ? ` (+$${option.price.toFixed(2)})` : ""}`
            : null;
        })
        .filter(Boolean);
    })
    .join(", ");

  const handleIncrement = () => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-3">
          <div className="flex justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <span className="font-medium">
                  ${item.totalPrice.toFixed(2)}
                </span>
              </div>

              {optionsText && (
                <p className="text-sm text-muted-foreground mt-1">
                  {optionsText}
                </p>
              )}

              {item.notes && (
                <p className="text-xs italic text-muted-foreground mt-1">{`"${item.notes}"`}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={handleDecrement}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-5 text-center">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={handleIncrement}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {product.customizations && product.customizations.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setShowCustomizer(true)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCustomizer && product && (
        <ProductCustomizer
          product={product}
          open={showCustomizer}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </>
  );
}
