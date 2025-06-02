import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sheet, ShoppingCart } from "lucide-react";
import { Button } from "react-day-picker";

export default function HomeDashboard() {
    return (
        <div className=" p-4">
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
        </div>
    )
}