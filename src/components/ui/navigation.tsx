"use client"
import { ChartNoAxesCombined, Coffee, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
const menus = [
    {
        label: "POS",
        icon: Coffee
    },
    {
        label: "Orders",
        icon: ListOrdered
    },
    {
        label: "Sales",
        icon: ChartNoAxesCombined
    }
]
export function Navigation() {
    return (
        <header className={"fixed z-20 md:static md:p-4 bottom-0 w-full md:w-auto md:h-full md:left-0 md:top-0 transition-all"}>
            <div className="h-full bg-card backdrop-blur-sm md:bg-card text-card-foreground flex flex-col gap-6 md:rounded-xl md:py-6 shadow-md justify-center w-full">
                <div className=" p-2 flex flex-row md:flex-col gap-2">
                    {menus?.map(menu => (
                        <motion.a
                            key={menu.label}
                                role='button'
                                whileTap={{ scale: 0.9 }}
                                className={cn("w-full p-2 md:p-3 flex rounded-xl flex-col items-center gap-1 hover:bg-accent transition-colors cursor-pointer appearance-none")}>
                                <menu.icon className=" size-4 md:size-6" />
                                <span className="text-xs">{menu.label}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </header>
    );
}