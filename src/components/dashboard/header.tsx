import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
export default function DashboardHeader() {
	return (
		<header className="flex sticky top-0 z-50 h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<SidebarTrigger className="-ml-1" />
			<div className="flex flex-1 items-center gap-2 px-1 sm:px-3">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="pl-8 h-8 sm:h-10 text-sm"
					/>
				</div>
				<Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
					<Bell className="h-4 w-4" />
				</Button>
			</div>
		</header>
	);
}
