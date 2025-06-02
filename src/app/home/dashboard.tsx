"use client"
import { MenuSection } from "@/components/menu/menu-section";
import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sheet, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePOSStore } from "@/lib/store";
import { useState } from "react";
import { CartSection } from "@/components/cart/cart-section";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function HomeDashboard() {
    const [activeTab, setActiveTab] = useState('pos');
    const { cart } = usePOSStore();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    return (
        <div className="flex w-full h-full flex-row lg:gap-2 lg:p-4">
            <MenuSection />
            <CartSection />
        </div>
    )
}