import { Header } from "@/components/ui/header";
import { Navigation } from "@/components/ui/navigation";
export default function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-dvh flex bg-background">
            <Navigation />
            <div className=" flex-1 flex flex-col w-dvw">
                <Header />
                {children}
            </div>
        </div>
    )
}