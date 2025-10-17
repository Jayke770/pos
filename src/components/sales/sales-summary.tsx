import { CreditCard, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SalesSummaryProps {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

export function SalesSummary({
  totalSales,
  totalOrders,
  averageOrderValue,
}: SalesSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Sales"
        value={`$${totalSales.toFixed(2)}`}
        icon={<TrendingUp />}
        trend={"+8.2%"}
        description="vs. last period"
        color="text-green-500"
      />

      <SummaryCard
        title="Total Orders"
        value={totalOrders.toString()}
        icon={<ShoppingCart />}
        trend={"+5.1%"}
        description="vs. last period"
        color="text-blue-500"
      />

      <SummaryCard
        title="Average Order"
        value={`$${averageOrderValue.toFixed(2)}`}
        icon={<CreditCard />}
        trend={"+2.5%"}
        description="vs. last period"
        color="text-purple-500"
      />
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  description?: string;
  color?: string;
}

function SummaryCard({
  title,
  value,
  icon,
  trend,
  description,
  color = "text-primary",
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1">
                <span className={color}>{trend}</span>
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
