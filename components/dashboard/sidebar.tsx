"use client";

import {
	BarChart3,
	Coffee,
	FileText,
	ListOrdered,
	Package,
	Settings,
	ShoppingCart,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { appConfig } from "@/lib/config";

const menuItems = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: BarChart3,
	},
	{
		title: "Orders",
		url: "#",
		icon: ShoppingCart,
	},
	{
		title: "Products",
		url: "/dashboard/products",
		icon: Coffee,
	},
	{
		title: "Inventory",
		url: "/dashboard/inventory",
		icon: Package,
	},
	{
		title: "Categories",
		url: "/dashboard/categories",
		icon: ListOrdered,
	},
	{
		title: "Customers",
		url: "#",
		icon: Users,
	},
	{
		title: "Analytics",
		url: "#",
		icon: TrendingUp,
	},
	{
		title: "Reports",
		url: "#",
		icon: FileText,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();
	const onSetMobile = useCallback(() => setOpenMobile(false), [setOpenMobile]);
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/" className="flex items-center">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<Coffee className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{appConfig.appName}
									</span>
									<span className="truncate text-xs">Coffee Shop</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className=" bg-sidebar">
				<SidebarGroup>
					<SidebarGroupLabel>Main Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										onClick={onSetMobile}
										isActive={pathname === item.url}
										asChild
										tooltip={item.title}
									>
										<Link href={item.url} prefetch>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild tooltip={"Account"}>
							<a href="/" className="flex items-center">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src="/placeholder.svg?height=32&width=32"
										alt="Admin"
									/>
									<AvatarFallback className="rounded-lg">AD</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Admin User</span>
									<span className="truncate text-xs">
										admin@terrynperry.com
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
