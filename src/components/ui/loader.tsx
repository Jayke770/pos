import { Loader2 } from "lucide-react";

export function AppLoader({ className }: { className: string }) {
    return (
        <div className={className}>
            <Loader2 className=" size-12 animate-spin " />
        </div>
    )
}