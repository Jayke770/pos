"use client"

import { useState } from 'react';
import { MenuSection } from '@/components/menu/menu-section';
import { CartSection } from '@/components/cart/cart-section';
import { OrdersSection } from '@/components/orders/orders-section';
import { Header } from '@/components/ui/header';
import { usePOSStore } from '@/lib/store';
import { SalesSection } from '@/components/sales/sales-section';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Coffee, ClipboardList, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('pos');
  const { cart } = usePOSStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'pos', label: 'POS', icon: Coffee },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'sales', label: 'Sales', icon: BarChart },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-[80px] flex-col items-center border-r bg-card">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full p-4 flex flex-col items-center gap-1 hover:bg-accent transition-colors",
                activeTab === item.id && "bg-accent"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-card z-10">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "p-4 flex flex-col items-center gap-1 hover:bg-accent transition-colors flex-1",
                  activeTab === item.id && "bg-accent"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          {activeTab === 'pos' && (
            <div className="h-full">
              {/* Mobile View */}
              <div className="md:hidden h-[calc(100vh-120px)]">
                <Sheet>
                  <div className="flex flex-col h-full">
                    <MenuSection />
                    <SheetTrigger asChild>
                      <Button 
                        className="fixed bottom-20 right-4 h-16 w-16 rounded-full shadow-lg"
                        size="icon"
                      >
                        <ShoppingCart className="h-6 w-6" />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                  </div>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                    <CartSection />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex flex-row gap-4 p-4 h-[calc(100vh-64px)]">
                <div className="flex-1">
                  <MenuSection />
                </div>
                <div className="w-[400px]">
                  <CartSection />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="p-4 h-[calc(100vh-120px)] md:h-[calc(100vh-64px)] overflow-auto">
              <OrdersSection />
            </div>
          )}
          
          {activeTab === 'sales' && (
            <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-64px)] overflow-auto">
              <SalesSection />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}