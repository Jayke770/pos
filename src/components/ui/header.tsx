"use client"
import { ChartNoAxesCombined, Coffee, ListOrdered, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { appConfig } from '@/lib/config';
import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from './separator';
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
export function Header() {
    const isMobile = useIsMobile()
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full transition-all duration-200 lg:px-14",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                    : "bg-transparent"
            )}>
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Coffee className="h-8 w-8" />
                    <h1 className="text-xl font-bold tracking-tight">{appConfig.appName}</h1>
                </div>
                <div className='flex items-center-safe'>
                    {isMobile ? (
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button asChild variant="ghost" className=' cursor-pointer' size={"icon"}>
                                    <motion.button whileTap={{ scale: 0.9 }}>
                                        <Menu />
                                    </motion.button>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle className=' text-center font-bold text-xl'>Menu</DrawerTitle>
                                </DrawerHeader>
                                <div className='flex flex-col px-4'>
                                    {menus?.map(menu => (
                                        <Button
                                            asChild
                                            key={menu.label}
                                            variant="ghost"
                                            size={"lg"}
                                            className=' cursor-pointer'>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className=' flex items-center justify-start w-full '>
                                                <menu.icon />
                                                {menu.label}
                                            </motion.button>
                                        </Button>
                                    ))}
                                    <div className='flex flex-col gap-3 px-4 pb-5 mt-5'>
                                        <Separator />
                                        <Button asChild variant={"destructive"} className=' rounded-full'>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className=' flex items-center justify-start w-full '>
                                                <LogOut />
                                                Log out
                                            </motion.button>
                                        </Button>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ) : menus?.map(menu => (
                        <Button asChild key={menu.label} variant="ghost" className=' cursor-pointer'>
                            <motion.button whileTap={{ scale: 0.9 }}>
                                <menu.icon />
                                {menu.label}
                            </motion.button>
                        </Button>
                    ))}
                </div>
            </div>
        </header>
    );
}