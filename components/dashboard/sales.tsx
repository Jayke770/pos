"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const salesData = [
	{ day: "Mon", sales: 1200 },
	{ day: "Tue", sales: 1400 },
	{ day: "Wed", sales: 1100 },
	{ day: "Thu", sales: 1600 },
	{ day: "Fri", sales: 1800 },
	{ day: "Sat", sales: 2200 },
	{ day: "Sun", sales: 1900 },
];

const maxSales = Math.max(...salesData.map((d) => d.sales));

export function DashboardSales() {
	return (
		<Card className="shadow-sm border-none">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
				<CardTitle className="text-lg sm:text-xl">Weekly Sales</CardTitle>
				<Badge variant="secondary">This Week</Badge>
			</CardHeader>
			<CardContent>
				<div className="space-y-3 sm:space-y-4">
					{salesData.map((data) => (
						<div
							key={data.day}
							className="flex items-center space-x-3 sm:space-x-4"
						>
							<div className="w-8 sm:w-12 text-xs sm:text-sm font-medium">
								{data.day}
							</div>
							<div className="flex-1">
								<div className="flex items-center space-x-2">
									<div className="flex-1 bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full transition-all"
											style={{
												width: `${(data.sales / maxSales) * 100}%`,
											}}
										/>
									</div>
									<div className="text-xs sm:text-sm font-medium w-12 sm:w-16 text-right">
										${data.sales}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="mt-4 sm:mt-6 pt-4 border-t">
					<div className="flex justify-between text-xs sm:text-sm">
						<span className="text-muted-foreground">Total this week</span>
						<span className="font-medium">
							${salesData.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
