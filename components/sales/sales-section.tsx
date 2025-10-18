"use client";

import { useState } from "react";
import { SalesChart } from "@/components/sales/sales-chart";
import { SalesSummary } from "@/components/sales/sales-summary";
import { TopSellingItems } from "@/components/sales/top-selling-items";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recentOrders, salesData } from "@/lib/data";
import { usePOSStore } from "@/lib/store";

export function SalesSection() {
	const [period, setPeriod] = useState("week");
	const { recentOrders: storeOrders } = usePOSStore();

	// Combine store orders with demo orders
	const allOrders = [...storeOrders, ...recentOrders];

	// Calculate total sales, orders, and average order value
	const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);
	const averageOrderValue = totalSales / (allOrders.length || 1);

	// Count items sold by product ID
	const itemCountByProduct = allOrders
		.flatMap((order) =>
			order.items.map((item) => ({
				productId: item.productId,
				name: item.name,
				quantity: item.quantity,
				revenue: item.totalPrice,
			})),
		)
		.reduce(
			(acc, curr) => {
				if (!acc[curr.productId]) {
					acc[curr.productId] = {
						name: curr.name,
						quantity: 0,
						revenue: 0,
					};
				}
				acc[curr.productId].quantity += curr.quantity;
				acc[curr.productId].revenue += curr.revenue;
				return acc;
			},
			{} as Record<string, { name: string; quantity: number; revenue: number }>,
		);

	// Convert to array and sort by quantity
	const topSellingItems = Object.entries(itemCountByProduct)
		.map(([id, data]) => ({
			id,
			name: data.name,
			quantity: data.quantity,
			revenue: data.revenue,
		}))
		.sort((a, b) => b.quantity - a.quantity)
		.slice(0, 5);

	return (
		<div className="container mx-auto py-4 space-y-6">
			<Tabs defaultValue="overview" className="space-y-4">
				<div className="flex justify-between items-center">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="products">Products</TabsTrigger>
					</TabsList>

					<div>
						<TabsList>
							<TabsTrigger
								value="day"
								onClick={() => setPeriod("day")}
								data-selected={period === "day"}
								className={
									period === "day"
										? "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
										: ""
								}
							>
								Day
							</TabsTrigger>
							<TabsTrigger
								value="week"
								onClick={() => setPeriod("week")}
								data-selected={period === "week"}
								className={
									period === "week"
										? "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
										: ""
								}
							>
								Week
							</TabsTrigger>
							<TabsTrigger
								value="month"
								onClick={() => setPeriod("month")}
								data-selected={period === "month"}
								className={
									period === "month"
										? "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
										: ""
								}
							>
								Month
							</TabsTrigger>
						</TabsList>
					</div>
				</div>

				<TabsContent value="overview" className="space-y-4">
					<SalesSummary
						totalSales={totalSales}
						totalOrders={allOrders.length}
						averageOrderValue={averageOrderValue}
					/>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="md:col-span-2">
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Sales Trend</CardTitle>
								<CardDescription>Daily sales for the period</CardDescription>
							</CardHeader>
							<CardContent>
								<SalesChart data={salesData} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Top Selling Items</CardTitle>
								<CardDescription>Most popular products</CardDescription>
							</CardHeader>
							<CardContent>
								<TopSellingItems items={topSellingItems} />
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="products" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Product Performance</CardTitle>
							<CardDescription>
								See which products are performing best
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{/* Product category performance would go here */}
								<div className="text-center py-8 text-muted-foreground">
									Detailed product analysis will appear here
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
