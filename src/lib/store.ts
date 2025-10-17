"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/lib/data";
import type { CartItem, Order, PaymentMethod, Product } from "@/lib/types";

interface POSState {
  cart: CartItem[];
  activeCategory: string | null;
  activeOrder: Order | null;
  recentOrders: Order[];

  setActiveCategory: (categoryId: string | null) => void;
  addToCart: (
    product: Product,
    options?: { customizationId: string; optionIds: string[] }[],
  ) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  updateCartItemOptions: (
    itemId: string,
    options: { customizationId: string; optionIds: string[] }[],
  ) => void;
  updateCartItemNotes: (itemId: string, notes: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  createOrder: (
    paymentMethod: PaymentMethod,
    customerName?: string,
    notes?: string,
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  calculateItemPrice: (
    product: Product,
    options?: { customizationId: string; optionIds: string[] }[],
  ) => number;
}

export const usePOSStore = create<POSState>()(
  persist(
    (set, get) => ({
      cart: [],
      activeCategory: null,
      activeOrder: null,
      recentOrders: [],

      setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),

      addToCart: (product, options = []) => {
        const totalPrice = get().calculateItemPrice(product, options);

        set((state) => ({
          cart: [
            ...state.cart,
            {
              id: `item-${Date.now()}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              options: options,
              totalPrice,
            },
          ],
        }));
      },

      updateCartItem: (itemId, quantity) => {
        set((state) => {
          const updatedCart = state.cart.map((item) => {
            if (item.id === itemId) {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return item;

              const newTotalPrice =
                get().calculateItemPrice(product, item.options) * quantity;

              return {
                ...item,
                quantity,
                totalPrice: newTotalPrice,
              };
            }
            return item;
          });

          return { cart: updatedCart };
        });
      },

      updateCartItemOptions: (itemId, options) => {
        set((state) => {
          const updatedCart = state.cart.map((item) => {
            if (item.id === itemId) {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return item;

              const newTotalPrice =
                get().calculateItemPrice(product, options) * item.quantity;

              return {
                ...item,
                options,
                totalPrice: newTotalPrice,
              };
            }
            return item;
          });

          return { cart: updatedCart };
        });
      },

      updateCartItemNotes: (itemId, notes) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, notes } : item,
          ),
        }));
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },

      clearCart: () => set({ cart: [] }),

      createOrder: (paymentMethod, customerName, notes) => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (total, item) => total + item.totalPrice,
          0,
        );
        const tax = subtotal * 0.0825; // 8.25% tax rate
        const total = subtotal + tax;

        const newOrder: Order = {
          id: `ORD-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          items: [...cart],
          subtotal,
          tax,
          total,
          status: "pending",
          paymentMethod,
          paymentStatus: "paid", // Assume paid for simplicity
          customerName,
          notes,
          timestamp: new Date(),
        };

        set((state) => ({
          activeOrder: newOrder,
          recentOrders: [newOrder, ...state.recentOrders.slice(0, 9)], // Keep last 10 orders
          cart: [], // Clear cart after order
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          activeOrder:
            state.activeOrder?.id === orderId
              ? { ...state.activeOrder, status }
              : state.activeOrder,
          recentOrders: state.recentOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  ...(status === "completed"
                    ? { completedAt: new Date() }
                    : {}),
                }
              : order,
          ),
        }));
      },

      calculateItemPrice: (product, options = []) => {
        let basePrice = product.price;

        if (!product.customizations || !options.length) {
          return basePrice;
        }

        options.forEach((optionChoice) => {
          const customization = product.customizations?.find(
            (c) => c.id === optionChoice.customizationId,
          );

          if (!customization) return;

          optionChoice.optionIds.forEach((optionId) => {
            const option = customization.options.find((o) => o.id === optionId);

            if (option) {
              basePrice += option.price;
            }
          });
        });

        return basePrice;
      },
    }),
    {
      name: "pos-store",
      partialize: (state) => ({
        recentOrders: state.recentOrders,
      }),
    },
  ),
);
