import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
	{
		title: "Today's Revenue",
		value: "$1,247.50",
		change: "+12.5%",
		icon: DollarSign,
		trend: "up",
	},
	{
		title: "Orders Today",
		value: "89",
		change: "+8.2%",
		icon: ShoppingCart,
		trend: "up",
	},
	{
		title: "Active Customers",
		value: "1,234",
		change: "+3.1%",
		icon: Users,
		trend: "up",
	},
	{
		title: "Avg Order Value",
		value: "$14.02",
		change: "-2.4%",
		icon: TrendingUp,
		trend: "down",
	},
];

export function DashboardStats() {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<Card
					key={stat.title}
					className="shadow-sm hover:shadow-md transition-shadow border-none"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
						<p
							className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
						>
							{stat.change} from yesterday
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
