import { CartSection } from "@/components/cart/cart-section";
import { MenuSection } from "@/components/menu/menu-section";
export default function HomeDashboard() {
  return (
    <div className="flex w-full h-full flex-row lg:gap-2 lg:p-4">
      <MenuSection />
      <CartSection />
    </div>
  );
}
