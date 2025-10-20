"use client";

import { format, parse } from "date-fns";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { DailySales } from "@/lib/types";

interface SalesChartProps {
	data: DailySales[];
}

export function SalesChart({ data }: SalesChartProps) {
	const formattedData = data.map((item) => ({
		...item,
		displayDate: format(parse(item.date, "yyyy-MM-dd", new Date()), "MMM d"),
	}));

	return (
		<div className="h-[300px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={formattedData}
					margin={{
						top: 10,
						right: 10,
						left: 0,
						bottom: 20,
					}}
				>
					<defs>
						<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="hsl(var(--chart-1))"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="hsl(var(--chart-1))"
								stopOpacity={0.1}
							/>
						</linearGradient>
						<linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="hsl(var(--chart-2))"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="hsl(var(--chart-2))"
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
					<XAxis
						dataKey="displayDate"
						tick={{ fontSize: 12 }}
						tickLine={false}
						axisLine={{ stroke: "hsl(var(--border))" }}
					/>
					<YAxis
						yAxisId="left"
						tickFormatter={(value) => `$${value}`}
						tick={{ fontSize: 12 }}
						tickLine={false}
						axisLine={{ stroke: "hsl(var(--border))" }}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						domain={[0, "auto"]}
						tick={{ fontSize: 12 }}
						tickLine={false}
						axisLine={{ stroke: "hsl(var(--border))" }}
					/>
					<Tooltip
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								return (
									<Card className="p-2 border shadow-sm bg-background">
										<p className="font-medium">{label}</p>
										<p className="text-sm text-[hsl(var(--chart-1))]">
											Sales: ${payload[0].value}
										</p>
										<p className="text-sm text-[hsl(var(--chart-2))]">
											Orders: {payload[1].value}
										</p>
									</Card>
								);
							}
							return null;
						}}
					/>
					<Area
						type="monotone"
						dataKey="total"
						stroke="hsl(var(--chart-1))"
						fillOpacity={1}
						fill="url(#colorSales)"
						yAxisId="left"
					/>
					<Area
						type="monotone"
						dataKey="orders"
						stroke="hsl(var(--chart-2))"
						fillOpacity={1}
						fill="url(#colorOrders)"
						yAxisId="right"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
