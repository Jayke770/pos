"use client"

import { usePOSStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItemCard } from '@/components/cart/cart-item-card';
import { CheckoutDialog } from '@/components/cart/checkout-dialog';
import { useState } from 'react';
import { ShoppingCart, PackageCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMedia } from 'react-use'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer';
export function CartSection() {
  const { cart } = usePOSStore();
  const mediaQueryMatched = useMedia('(max-width: 1280px)')
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  // const { toast } = useToast();

  const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0);
  const tax = subtotal * 0.0825; // 8.25% tax rate
  const total = subtotal + tax;

  const handleClearCart = () => {
    if (cart.length > 0) {
      usePOSStore.getState().clearCart();
      // toast({
      //   title: "Cart cleared",
      //   description: "All items have been removed from your cart",
      //   variant: "default",
      // });
    }
  };

  return (
    <>
      {mediaQueryMatched ? (
        <Drawer>
          <DrawerContent>
            <DrawerHeader className="pb-2">
              <div className="flex justify-between items-center">
                <DrawerTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Order
                </DrawerTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={cart.length === 0}
                >
                  Clear
                </Button>
              </div>
              <DrawerDescription>
                {cart.length === 0
                  ? "No items in cart"
                  : `${cart.reduce((total, item) => total + item.quantity, 0)} item${cart.reduce((total, item) => total + item.quantity, 0) !== 1 ? 's' : ''}`}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-hidden p-0">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <PackageCheck className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-muted-foreground">Add items to begin an order</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <AnimatePresence>
                    <div className="px-4 py-5 space-y-2 h-96">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CartItemCard item={item} />
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </ScrollArea>
              )}
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8.25%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={cart.length === 0}
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className=' p-4 h-[calc(100dvh-80px)] xl:fade-in  flex justify-center items-center'>
          <Card className="flex h-full flex-col xl:w-[400px]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Order
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={cart.length === 0}
                >
                  Clear
                </Button>
              </div>
              <CardDescription>
                {cart.length === 0
                  ? "No items in cart"
                  : `${cart.reduce((total, item) => total + item.quantity, 0)} item${cart.reduce((total, item) => total + item.quantity, 0) !== 1 ? 's' : ''}`}
              </CardDescription>
            </CardHeader>

            <div className="flex-1 overflow-hidden p-0">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <PackageCheck className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-muted-foreground">Add items to begin an order</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <AnimatePresence>
                    <div className="px-4 py-2 space-y-2">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CartItemCard item={item} />
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </ScrollArea>
              )}
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8.25%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={cart.length === 0}
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </Button>
            </div>
          </Card>
        </div>
      )
      }
    </>
  );
}