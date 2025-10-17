import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DashboardPopularProducts } from "@/components/dashboard/popular-products";
import { DashboardRecentOrders } from "@/components/dashboard/recent-orders";
import { DashboardSales } from "@/components/dashboard/sales";
import { DashboardStats } from "@/components/dashboard/stats";
import { AuthOptions } from "@/services/next-auth/auth";

export default async function DashboardPage() {
  const session = await getServerSession(AuthOptions);
  if (!session) redirect("/api/auth/signout");
  if (!["admin", "owner"].includes(session?.user?.role)) redirect("/");
  return (
    <div className=" flex flex-col space-y-4 sm:space-y-6">
      <div className="bg-card rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {"Welcome back! Here's what's happening at your shop today."}
        </p>
      </div>
      <DashboardStats />
      <div className="grid lg:grid-cols-2 gap-3">
        <DashboardSales />
        <DashboardPopularProducts />
      </div>
      <DashboardRecentOrders />
    </div>
  );
}
