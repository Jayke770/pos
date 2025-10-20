"use client";

import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
	categories: Category[];
	activeCategory: string | null;
	onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
	categories,
	activeCategory,
	onSelectCategory,
}: CategoryFilterProps) {
	return (
		<ScrollArea className="whitespace-nowrap">
			<div className="flex gap-2">
				<CategoryButton
					active={activeCategory === null}
					onClick={() => onSelectCategory(null)}
					name="All"
				/>

				{categories.map((category) => (
					<CategoryButton
						key={category.id}
						active={activeCategory === category.id}
						onClick={() => onSelectCategory(category.id)}
						name={category.name}
					/>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}

function CategoryButton({
	active,
	onClick,
	name,
}: {
	active: boolean;
	onClick: () => void;
	name: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
				active
					? "bg-primary text-primary-foreground"
					: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			)}
		>
			{name}
			{active && (
				<motion.div
					layoutId="activeCategory"
					className="absolute inset-0 bg-primary rounded-full"
					style={{ zIndex: -1 }}
					transition={{ type: "spring", duration: 0.5 }}
				/>
			)}
		</button>
	);
}
