"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TopSellingItem {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

interface TopSellingItemsProps {
  items: TopSellingItem[];
}

export function TopSellingItems({ items }: TopSellingItemsProps) {
  const CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];
  
  const data = items.map((item, index) => ({
    name: item.name,
    value: item.quantity,
    revenue: item.revenue,
  }));

  return (
    <div className="h-[220px] w-full">
      {items.length > 0 ? (
        <ResponsiveContainer width="100%\" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CHART_COLORS[index % CHART_COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background p-2 border shadow-sm rounded-md text-sm">
                      <p className="font-medium">{payload[0].name}</p>
                      <p>{`Quantity: ${payload[0].value}`}</p>
                      <p>{`Revenue: $${payload[0].payload.revenue.toFixed(2)}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No sales data available
        </div>
      )}
    </div>
  );
}