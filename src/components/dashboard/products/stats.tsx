import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductsStatsProps {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  avgMargin: number;
}

export function ProductsStats({
  totalProducts,
  totalValue,
  lowStockItems,
  avgMargin,
}: ProductsStatsProps) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: Package,
      description: "Active products",
    },
    {
      title: "Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      description: "Total stock value",
    },
    {
      title: "Low Stock Alerts",
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      description: "Items need restocking",
      alert: lowStockItems > 0,
    },
    {
      title: "Avg Profit Margin",
      value: `${avgMargin.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Across all products",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className={`h-4 w-4 ${stat.alert ? "text-orange-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-xl sm:text-2xl font-bold ${stat.alert ? "text-orange-600" : ""}`}
            >
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
