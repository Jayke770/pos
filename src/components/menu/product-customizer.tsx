"use client"

import { useState } from 'react';
import { Product, ProductCustomization, ProductOption } from '@/lib/types';
import { usePOSStore } from '@/lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface ProductCustomizerProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductCustomizer({ product, open, onClose }: ProductCustomizerProps) {
  const { addToCart, calculateItemPrice } = usePOSStore();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
  const [notes, setNotes] = useState('');

  // Initialize default selections for required customizations
  useState(() => {
    const defaults: { [key: string]: string[] } = {};

    product.customizations?.forEach(customization => {
      if (customization.required && !customization.multiSelect && customization.options.length > 0) {
        defaults[customization.id] = [customization.options[0].id];
      }
    });

    setSelectedOptions(defaults);
  });

  const handleOptionChange = (customizationId: string, optionId: string, multiSelect: boolean) => {
    setSelectedOptions(prev => {
      const current = prev[customizationId] || [];

      if (multiSelect) {
        // Toggle the selection for multi-select
        return {
          ...prev,
          [customizationId]: current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId]
        };
      } else {
        // Replace selection for single-select
        return {
          ...prev,
          [customizationId]: [optionId]
        };
      }
    });
  };

  const handleAddToCart = () => {
    // Validate required options
    const missingRequired = product.customizations?.some(
      customization => customization.required &&
        (!selectedOptions[customization.id] || selectedOptions[customization.id].length === 0)
    );

    if (missingRequired) {
      return; // Don't proceed if required options are missing
    }

    const options = Object.entries(selectedOptions).map(([customizationId, optionIds]) => ({
      customizationId,
      optionIds
    }));

    addToCart(product, options);
    onClose();

    // Reset state
    setSelectedOptions({});
    setNotes('');
  };

  // Calculate current price with options
  const currentPrice = calculateItemPrice(
    product,
    Object.entries(selectedOptions).map(([customizationId, optionIds]) => ({
      customizationId,
      optionIds
    }))
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Customize {product.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {product.customizations?.map((customization) => (
              <div key={customization.id} className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-base font-medium">
                    {customization.name}
                    {customization.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {customization.multiSelect && (
                    <span className="text-xs text-muted-foreground">Select multiple</span>
                  )}
                </div>

                {customization.multiSelect ? (
                  <div className="space-y-2">
                    {customization.options.map((option) => (
                      <OptionCheckbox
                        key={option.id}
                        option={option}
                        checked={(selectedOptions[customization.id] || []).includes(option.id)}
                        onChange={() => handleOptionChange(customization.id, option.id, true)}
                      />
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={selectedOptions[customization.id]?.[0] || ''}
                    onValueChange={(value) => handleOptionChange(customization.id, value, false)}
                  >
                    {customization.options.map((option) => (
                      <OptionRadio
                        key={option.id}
                        option={option}
                        value={option.id}
                      />
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}

            <div className="space-y-3">
              <Label htmlFor="notes" className="text-base font-medium">Special Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Any special requests or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center pt-4 border-t">
          <div className="text-lg font-semibold">
            Total: ${currentPrice.toFixed(2)}
          </div>
          <Button onClick={handleAddToCart}>Add to Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OptionCheckbox({
  option,
  checked,
  onChange
}: {
  option: ProductOption;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={option.id}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor={option.id} className="flex-1 flex justify-between cursor-pointer">
        <span>{option.name}</span>
        {option.price > 0 && <span>+${option.price.toFixed(2)}</span>}
      </Label>
    </div>
  );
}

function OptionRadio({
  option,
  value
}: {
  option: ProductOption;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="flex-1 flex justify-between cursor-pointer">
        <span>{option.name}</span>
        {option.price > 0 && <span>+${option.price.toFixed(2)}</span>}
      </Label>
    </div>
  );
}