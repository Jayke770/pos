import DashboardHeader from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<DashboardHeader />
				<div className="p-3 sm:p-4 lg:p-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
