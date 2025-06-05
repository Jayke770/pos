import { Header } from "@/components/ui/header";
import { Coffee, ListOrdered, ChartNoAxesCombined } from "lucide-react";
export default function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-dvh bg-background overflow-hidden">
            <Header
                menus={[
                    {
                        label: "POS",
                        icon: <Coffee />
                    },
                    {
                        label: "Orders",
                        icon: <ListOrdered />
                    },
                    {
                        label: "Sales",
                        icon: <ChartNoAxesCombined />
                    }
                ]} />
            <div className="lg:px-10 h-full w-full">
                {children}
            </div>
        </div>
    )
}