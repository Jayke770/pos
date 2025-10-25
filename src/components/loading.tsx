import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

export default function Loading({ className }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(" w-full h-full flex justify-center items-center flex-1", className)}>
            <Loader2 className=" size-12 animate-spin text-primary" />
        </motion.div>
    );
}
