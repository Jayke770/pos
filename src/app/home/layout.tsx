import { Header } from "@/components/ui/header";
export default function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-dvh bg-background overflow-hidden">
            <Header />
            <div className="lg:px-10 h-full w-full">
                {children}
            </div>
        </div>
    )
}