import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const products = [
  { name: "Latte", sold: 45, revenue: "$202.50", percentage: 85 },
  { name: "Cappuccino", sold: 38, revenue: "$171.00", percentage: 72 },
  { name: "Americano", sold: 32, revenue: "$128.00", percentage: 60 },
  { name: "Espresso", sold: 28, revenue: "$84.00", percentage: 53 },
  { name: "Mocha", sold: 24, revenue: "$120.00", percentage: 45 },
];

export function DashboardPopularProducts() {
  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Popular Products Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {products.map((product) => (
          <div key={product.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm sm:text-base">
                {product.name}
              </span>
              <div className="text-right">
                <div className="text-sm font-medium">{product.revenue}</div>
                <div className="text-xs text-muted-foreground">
                  {product.sold} sold
                </div>
              </div>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
