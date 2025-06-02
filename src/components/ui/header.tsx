"use client"

import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { appConfig } from '@/lib/config';
export function Header() {
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
                "sticky top-0 z-40 w-full transition-all duration-200",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
                    : "bg-transparent"
            )}>
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Coffee className="h-8 w-8" />
                    <h1 className="text-xl font-bold tracking-tight">{appConfig.appName}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                        Help
                    </Button>
                </div>
            </div>
        </header>
    );
}