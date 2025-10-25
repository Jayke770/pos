"use client";
import { DashboardPopularProducts } from "@/components/dashboard/popular-products";
import { DashboardRecentOrders } from "@/components/dashboard/recent-orders";
import { DashboardSales } from "@/components/dashboard/sales";
import { DashboardStats } from "@/components/dashboard/stats";
import { motion } from 'motion/react'
import { useAuthentication } from "@/hooks/auth/useAuth";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
	const router = useRouter();
	const { user, userLoading } = useAuthentication();
	useEffect(() => {
		if (!userLoading && !user) {
			router.push("/");
		}
	}, [user, userLoading]);
	return (
		<>
			{(userLoading || !user) && <Loading />}
			{!userLoading && user && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className=" flex flex-col space-y-4 sm:space-y-6">
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
				</motion.div>
			)}
		</>
	);
}
